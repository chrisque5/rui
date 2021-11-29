import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Select, Table, Button, InputNumber, Input, Tooltip,
} from 'antd';
import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { showWarningNotification } from 'utils/notifications';
import {
  getIsDealEditInProgress, getUserFullName, getBrokers, getReAllocationSide,
  getSelectedDealType, getBuyerPrimaryBroker, getSellerPrimaryBroker,
} from '../../../utils/selectors';
import { getUniqueID, showPreviousValueToolTip } from '../../../utils/helper';
import { isInputNumberValid } from '../../../utils/validation';
import {
  changeReAllocation, updateDealObject,
} from '../../../actions/uiActions';

const BrokerageAllocations = ({
  brokerage = {}, side, form, originalBrokerage = {},
}) => {
  const dispatch = useDispatch();
  const ALLOCATION_PERCENTAGE = 'ALLOCATION_PERCENTAGE';
  const BROKERAGE_AMOUNT = 'BROKERAGE_AMOUNT';
  const { allocations } = brokerage;
  const originalAllocations = originalBrokerage.allocations;

  const isEditInProgress = useSelector(getIsDealEditInProgress);
  const updatedBy = useSelector(getUserFullName);
  const brokers = useSelector(getBrokers);
  const reAllocationSide = useSelector(getReAllocationSide);
  const dealType = useSelector(getSelectedDealType);

  const primaryBroker = useSelector(side === 'payer' ? getBuyerPrimaryBroker : getSellerPrimaryBroker);

  const truncateTo2Decimal = (number) => (number ? Math.floor(number * 100) / 100 : 0);

  const getProfitCenters = useCallback((id) => {
    const selectedBroker = brokers.find((broker) => (broker && id && broker.id.toString() === id.toString()));
    return selectedBroker && selectedBroker.profitCentres ? selectedBroker.profitCentres : [];
  }, [brokers]);

  const getDefaultProfitCenter = useCallback((id) => {
    const profitCenters = getProfitCenters(id);

    let profitCentreId = '';
    let profitCentreName = '';

    if (profitCenters && profitCenters.length > 0) {
      const defaultProfitCenter = profitCenters.find((center) => center.defaultMapping === true);
      if (defaultProfitCenter) {
        profitCentreId = defaultProfitCenter.profitCentreId;
        profitCentreName = defaultProfitCenter.profitCentreName;
      }
    }
    return { profitCentreId, profitCentreName };
  }, [getProfitCenters]);

  const addNewAllocation = useCallback(() => {
    const updatedAllocations = JSON.parse(JSON.stringify(allocations));
    const newId = Math.floor(1000 + Math.random() * 9000) + updatedAllocations.length;
    const newBrokerAllocation = {
      updatedBy,
      key: `${side}-${getUniqueID()}`,
      id: newId,
      ...(allocations.length === 0
        && {
          ...primaryBroker,
          ...(getDefaultProfitCenter(primaryBroker.brokerGcdPostingId)),
        }),
    };

    updatedAllocations.push(newBrokerAllocation);
    return updatedAllocations;
  }, [updatedBy, side, allocations, getDefaultProfitCenter, primaryBroker]);

  const recalculateAllocations = useCallback((currentAllocations) => {
    let newAllocations = currentAllocations;

    // Sets Primary Broker as the first broker when no allocations
    if (newAllocations.length === 0) {
      newAllocations = addNewAllocation();
    }

    const { amount = 0 } = brokerage;
    const noOfRows = newAllocations.length;
    const updatedAllocations = [];
    const percentage = truncateTo2Decimal(Number((100 / noOfRows)));
    const splitAmount = truncateTo2Decimal(Number((amount / noOfRows)));
    let percLeft = 100;
    let amountLeft = amount;
    newAllocations.forEach((allocData) => {
      // Antd Table requires uniqe key on each row and every edit
      updatedAllocations[updatedAllocations.length] = {
        ...allocData, percentage, amount: splitAmount, key: `${side}-${getUniqueID()}`,
      };
      percLeft -= percentage;
      amountLeft -= splitAmount;
    });

    // Setting Max Share to Primary Broker
    if (newAllocations.length > 0) {
      updatedAllocations[0].percentage = truncateTo2Decimal((updatedAllocations[0].percentage + percLeft).toFixed(2));
      updatedAllocations[0].amount = truncateTo2Decimal((updatedAllocations[0].amount + amountLeft).toFixed(2));
    }

    // Need to remove row key before sending server so that it will not show in PATCH
    const filteredAllocs = updatedAllocations.map(({ key, ...rest }) => ({ ...rest }));

    dispatch(updateDealObject({ value: filteredAllocs, path: 'allocations', side }));
  }, [brokerage, addNewAllocation, side, dispatch]);

  const addRow = (event) => {
    event.preventDefault();
    if (allocations.length < 20) {
      const updatedAllocations = addNewAllocation();
      recalculateAllocations(updatedAllocations);
    } else {
      showWarningNotification('Validation Error', 'Cannot add more than 20 Brokers.');
    }
  };

  const removeRow = (event, record) => {
    event.preventDefault();
    const filteredAllocations = allocations.filter((rowData) => rowData.id !== record.id);
    recalculateAllocations(filteredAllocations);
  };

  const addRowBtn = (record) => (
    <Button
      shape="circle"
      style={{ background: 'none', border: 'none' }}
      onClick={(e) => addRow(e)}
      data-testid={`btn-${record.id}-Add`}
      icon={<PlusCircleFilled style={{ color: 'green', cursor: 'pointer' }} />}
    />
  );
  const removeRowBtn = (record) => (
    <Button
      shape="circle"
      style={{ background: 'none', border: 'none' }}
      onClick={(e) => removeRow(e, record)}
      data-testid={`btn-${record.id}-Delete`}
      icon={<MinusCircleFilled style={{ color: 'red', cursor: 'pointer' }} />}
    />
  );

  const getAddRowHeaderBtn = () => {
    if (allocations && allocations.length === 0 && isEditInProgress) {
      return addRowBtn({ id: getUniqueID() });
    }
    return '';
  };

  const reRenderAllocations = (updatedAllocations) => {
    const filteredAllocs = updatedAllocations.map(({ key, ...rest }) => ({ ...rest }));
    dispatch(updateDealObject({ value: filteredAllocs, path: 'allocations', side }));
  };

  const calculateBrokerage = async (rowData) => {
    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await form.validateFields([`${rowData.key}-percentage`]);
      const percentage = form.getFieldValue(`${rowData.key}-percentage`);
      const rowIndex = allocations.findIndex((data) => data.id === rowData.id);
      if (percentage !== allocations[rowIndex].percentage) {
        const calculatedBrokerageAmt = truncateTo2Decimal((brokerage.amount * percentage) / 100);
        const updatedAllocations = JSON.parse(JSON.stringify(allocations));
        const updateDetails = {
          ...updatedAllocations[rowIndex], updatedBy, amount: calculatedBrokerageAmt, percentage, key: `${side}-${getUniqueID()}`,
        };
        updatedAllocations[rowIndex] = updateDetails;
        reRenderAllocations(updatedAllocations);
      }
    } catch { }
  };

  const calculatePercentage = async (rowData) => {
    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await form.validateFields([`${rowData.key}-amount`]);
      const amount = form.getFieldValue(`${rowData.key}-amount`);
      const rowIndex = allocations.findIndex((data) => data.id === rowData.id);
      if (amount !== allocations[rowIndex].amount && brokerage.amount > 0) {
        const calculatedPercentage = truncateTo2Decimal((amount / brokerage.amount) * 100);
        const updatedAllocations = JSON.parse(JSON.stringify(allocations));
        const updateDetails = {
          ...updatedAllocations[rowIndex], updatedBy, amount, percentage: calculatedPercentage, key: `${side}-${getUniqueID()}`,
        };
        updatedAllocations[rowIndex] = updateDetails;
        reRenderAllocations(updatedAllocations);
      }
    } catch { }
  };

  const onBrokerChange = ({ key, value }, rowData) => {
    const updatedAllocations = JSON.parse(JSON.stringify(allocations));
    const rowIndex = updatedAllocations.findIndex((data) => data.id === rowData.id);
    const profitCenters = getProfitCenters(key);
    let profitCentreId = '';
    let profitCentreName = '';
    if (profitCenters && profitCenters.length > 0) {
      const defaultProfitCenter = profitCenters.find((center) => center.defaultMapping === true);
      if (defaultProfitCenter) {
        profitCentreId = defaultProfitCenter.profitCentreId;
        profitCentreName = defaultProfitCenter.profitCentreName;
      }
    }

    const updateDetails = {
      ...updatedAllocations[rowIndex],
      updatedBy,
      brokerGcdPostingId: key,
      brokerGcdPostingName: value,
      key: `${side}-${getUniqueID()}`,
      profitCentreId,
      profitCentreName,
    };
    updatedAllocations[rowIndex] = updateDetails;
    reRenderAllocations(updatedAllocations);
  };

  const onProfitCenterChange = ({ key, value }, rowData) => {
    const updatedAllocations = JSON.parse(JSON.stringify(allocations));
    const rowIndex = updatedAllocations.findIndex((data) => data.id === rowData.id);

    const updateDetails = {
      ...updatedAllocations[rowIndex], updatedBy, profitCentreId: key, profitCentreName: value, key: `${side}-${getUniqueID()}`,
    };
    updatedAllocations[rowIndex] = updateDetails;
    reRenderAllocations(updatedAllocations);
  };

  const validator = (rule, inputvalue, validationRule, field) => {
    if (inputvalue) {
      let value = inputvalue.toString().replace(/(,*)/g, '');
      if (Number.isNaN(Number(value))) {
        return Promise.reject(new Error(`Invalid ${field}`));
      }
      value = Number(value);
      const decimals = (validationRule === ALLOCATION_PERCENTAGE) ? 2 : 4;
      const numberFormatStatus = isInputNumberValid(validationRule, value, dealType, decimals);
      if (!numberFormatStatus.isValid) {
        return Promise.reject(new Error(numberFormatStatus.message));
      }
      if (validationRule === ALLOCATION_PERCENTAGE && value > 100) {
        return Promise.reject(new Error(`${field} should not be larger than 100`));
      }

      if (validationRule === BROKERAGE_AMOUNT && value > brokerage.amount) {
        return Promise.reject(new Error(`Receive Brokerage should not be larger than ${brokerage.amount}`));
      }

      if (value > 0) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(`${field} should be larger than 0`));
    }
    return Promise.reject(new Error(`${field} required`));
  };

  const actionCol = {
    title: getAddRowHeaderBtn(),
    dataIndex: 'deleteButton',
    key: 'deleteButton',
    width: 40,
    render: (text, record) => {
      const rowIndex = allocations.findIndex((data) => data.id === record.id);
      return (
        <div>
          {addRowBtn(record)}
          {!(record.brokerGcdPostingId === primaryBroker.brokerGcdPostingId && rowIndex === 0) && removeRowBtn(record)}
        </div>
      );
    },
  };

  const getOriginalRecord = (record) => {
    const originalRecordIndex = originalAllocations ? originalAllocations.findIndex((data) => data.id === record.id) : -1;
    const originalRecord = originalRecordIndex > -1 ? originalAllocations[originalRecordIndex] : { };
    return originalRecord;
  };

  const getColumns = () => {
    const columns = [];

    if (isEditInProgress) {
      columns.push(actionCol);
    }

    const brokerageCols = [
      {
        title: 'Broker',
        dataIndex: 'brokerGcdPostingName',
        className: 'brokerage-column',
        render: (text, record) => {
          if (isEditInProgress) {
            const rowIndex = allocations.findIndex((data) => data.id === record.id);
            const { brokerGcdPostingName } = getOriginalRecord(record);
            return (
              <Tooltip {...showPreviousValueToolTip(text, brokerGcdPostingName)}>
                <Form.Item
                  name={`${record.key}-brokerGcdPostingName`}
                  initialValue={text}
                  rules={[{ required: true, message: 'Broker is required' }]}
                >
                  {(record.brokerGcdPostingId === primaryBroker.brokerGcdPostingId && rowIndex === 0) ? (
                    <Input readOnly title={primaryBroker.brokerGcdPostingName} value={primaryBroker.brokerGcdPostingName} />
                  ) : (
                    <Select
                      showSearch
                      dropdownMatchSelectWidth={false}
                      name={`${record.id}brokerGcdPostingName`}
                      data-testid={`${record.id}-brokerGcdPostingName`}
                      onChange={(value, option) => onBrokerChange(option, record)}
                    >
                      {brokers && brokers.map(
                        ({ id, name }) => (
                          <Select.Option
                            key={id}
                            value={name}
                          >
                            {name}
                          </Select.Option>
                        ),
                      )}
                    </Select>

                  )}

                </Form.Item>
              </Tooltip>
            );
          }
          return <span title={text}>{text}</span>;
        },
      }, {
        title: 'Profit Center',
        dataIndex: 'profitCentreName',
        className: 'brokerage-column',
        render: (text, record) => {
          if (isEditInProgress) {
            const rowIndex = allocations.findIndex((data) => data.id === record.id);
            const defaultProfitCenterName = getDefaultProfitCenter(primaryBroker.brokerGcdPostingId).profitCentreName;
            const originalRecord = getOriginalRecord(record);
            return (
              <Tooltip {...showPreviousValueToolTip(text, originalRecord.profitCentreName)}>
                <Form.Item
                  name={`${record.key}-profitCenter`}
                  initialValue={text}
                  rules={[{ required: true, message: 'Profit Center is required' }]}
                >
                  {!(record.brokerGcdPostingId === primaryBroker.brokerGcdPostingId && rowIndex === 0) ? (
                    <Select
                      showSearch
                      dropdownMatchSelectWidth={false}
                      data-testid={`${record.id}-profitCenter`}
                      onChange={(value, option) => onProfitCenterChange(option, record)}
                    >
                      {getProfitCenters(record.brokerGcdPostingId).map(
                        ({ profitCentreId, profitCentreName }) => (
                          <Select.Option
                            key={profitCentreId}
                            value={profitCentreName}
                          >
                            {profitCentreName}
                          </Select.Option>
                        ),
                      )}
                    </Select>
                  ) : (
                    <Input readOnly title={defaultProfitCenterName} value={defaultProfitCenterName} />
                  )}
                </Form.Item>
              </Tooltip>
            );
          }
          return <span title={text}>{text}</span>;
        },
      }, {
        title: 'Allocation %',
        dataIndex: 'percentage',
        width: 30,
        render: (text, record) => {
          if (isEditInProgress) {
            const { percentage } = getOriginalRecord(record);
            return (
              <Tooltip {...showPreviousValueToolTip(text, percentage)}>
                <Form.Item
                  name={`${record.key}-percentage`}
                  initialValue={text}
                  rules={[{ validator: (rule, inputvalue) => validator(rule, inputvalue, ALLOCATION_PERCENTAGE, 'Allocation %') }]}
                >
                  <InputNumber size="small" data-testid={`${record.id}-percentage`} onBlur={() => calculateBrokerage(record)} maxLength={6} />
                </Form.Item>
              </Tooltip>
            );
          }
          return <span title={text}>{text}</span>;
        },
      }, {
        title: 'Receive Brokerage',
        dataIndex: 'amount',
        width: 90,
        render: (text, record) => {
          if (isEditInProgress) {
            const { amount } = getOriginalRecord(record);
            return (
              <Tooltip {...showPreviousValueToolTip(text, amount)}>
                <Form.Item
                  name={`${record.key}-amount`}
                  initialValue={text}
                  rules={[{ validator: (rule, inputvalue) => validator(rule, inputvalue, BROKERAGE_AMOUNT, 'Brokerage') }]}
                >
                  <InputNumber size="small" data-testid={`${record.id}-brokerage`} onBlur={() => calculatePercentage(record)} maxLength={17} />
                </Form.Item>
              </Tooltip>
            );
          }
          return <span title={text}>{text}</span>;
        },
      }, {
        title: 'Updated By',
        dataIndex: 'updatedBy',
        className: 'brokerage-column',
        render: (text) => <span title={text}>{text}</span>,
      },
    ];

    columns.push(...brokerageCols);
    return columns;
  };

  useEffect(() => {
    if (reAllocationSide === side) {
      dispatch(changeReAllocation(''));
      const existingAllocations = JSON.parse(JSON.stringify(allocations));
      recalculateAllocations(existingAllocations);
    }
  }, [dispatch, allocations, reAllocationSide, recalculateAllocations, side]);

  return (
    <div className="brokerage-allocations">
      <Table
        dataSource={allocations}
        columns={getColumns()}
        bordered
        pagination={false}
        key={side}
        rowKey={(record) => record.key}
        style={{ marginBottom: 25 }}
      />
    </div>
  );
};

BrokerageAllocations.defaultProps = {
  originalBrokerage: {},
};

BrokerageAllocations.propTypes = {
  brokerage: PropTypes.shape().isRequired,
  side: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  originalBrokerage: PropTypes.shape(),
};

export default BrokerageAllocations;
