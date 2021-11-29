import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Select, Form, InputNumber, Input, Tooltip,
} from 'antd';
import { showPreviousValueToolTip } from 'utils/helper';
import { isInputNumberValid } from '../../../utils/validation';
import { getIsDealEditInProgress, getCurrencies, getSelectedDealType } from '../../../utils/selectors';
import {
  updateDealObject,
} from '../../../actions/uiActions';

const BrokerageAmount = ({
  brokerage = {}, side, form, originalBrokerage = {},
}) => {
  const dispatch = useDispatch();

  const {
    brokerageType, currency, amount, brokerageInfo,
  } = brokerage;

  const isEditInProgress = useSelector(getIsDealEditInProgress);
  const currencies = useSelector(getCurrencies);
  const dealType = useSelector(getSelectedDealType);

  const onAmountChange = async () => {
    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await form.validateFields([`${side}-amount`]);
      let value = form.getFieldValue(`${side}-amount`);
      if (value !== amount) {
        if (value === 0) {
          value = 'ZERO'; // Number 0 is not triggering UseEffect in Container
        }
        dispatch(updateDealObject({ value, path: 'amount', side }));
      }
    } catch {
    }
  };

  const onCurrencyChange = (value) => {
    if (value !== currency) {
      dispatch(updateDealObject({ value, path: ['currency'], side }));
      if (amount) {
        const selectedCcy = currencies.find((ccyObj) => ccyObj.code === value);
        const decimals = selectedCcy && selectedCcy.decimalPlaces ? selectedCcy.decimalPlaces : 0;
        const formattedAmount = Number(amount.toFixed(decimals));
        form.setFieldsValue({
          [`${side}-amount`]: formattedAmount,
        });
        setTimeout(() => {
          dispatch(updateDealObject({ value: formattedAmount, path: 'amount', side }));
        });
      }
      form.validateFields([`${side}-amount`]);
    }
  };

  useEffect(() => {
    form.validateFields([`${side}-currency`]);
  }, [amount, form, side]);

  const amountValidator = (rule, inputvalue) => {
    const validationRule = 'BROKERAGE_AMOUNT';
    if (inputvalue === 0) {
      return Promise.resolve();
    } if (inputvalue) {
      const selectedCcy = currencies.find((ccyObj) => ccyObj.code === currency);
      const decimals = selectedCcy && selectedCcy.decimalPlaces ? selectedCcy.decimalPlaces : 0;
      const numberFormatStatus = isInputNumberValid(validationRule, inputvalue, dealType, decimals);
      if (!numberFormatStatus.isValid) {
        return Promise.reject(new Error(numberFormatStatus.message));
      }
      return Promise.resolve();
    }
    if (currency) {
      return Promise.reject(new Error('Amount required'));
    }
    return Promise.resolve();
  };

  const currencyValidator = (rule, inputvalue) => {
    if (amount && amount > 0 && !inputvalue) {
      return Promise.reject(new Error('Currency required'));
    }
    return Promise.resolve();
  };

  const getBrokerageType = () => {
    if (brokerageType === 'ManualNet') {
      return 'Manual_Net';
    }
    return brokerageType;
  };

  const getAmountCcyEditContainer = () => (
    <Row style={{ maxWidth: 400 }}>
      <Col>
        <span style={{ textTransform: 'uppercase' }} data-testid={`${side}-brokerageType`}>{getBrokerageType()}</span>
      </Col>
      <Col style={{ marginLeft: 10, marginRight: 10 }}>
        <Tooltip {...showPreviousValueToolTip(currency, originalBrokerage.currency)}>
          <Form.Item
            name={`${side}-currency`}
            label=""
            className="deal-ccy"
            initialValue={currency}
            rules={[{ validator: currencyValidator }]}
          >
            <Select
              showSearch
              name={`${side}-currency`}
              onChange={onCurrencyChange}
              data-testid={`${side}-currency`}
            >
              {currencies && currencies.map(
                (ccy) => <Select.Option key={ccy.code} value={ccy.code}>{ccy.code}</Select.Option>,
              )}
            </Select>
          </Form.Item>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...showPreviousValueToolTip(amount, originalBrokerage.amount)}>
          <Form.Item
            name={`${side}-amount`}
            id={`${side}-amount`}
            label=""
            initialValue={amount}
            rules={[{ validator: amountValidator }]}
          >
            <InputNumber
              onBlur={onAmountChange}
              size="small"
              style={{ maxWidth: 125 }}
              maxLength={17}
              data-testid={`${side}-amount`}
            />
          </Form.Item>
        </Tooltip>
      </Col>
    </Row>
  );

  const getAmountCcyDisplayContainer = () => (
    <Row style={{ maxWidth: 400 }}>
      <Col>
        <span style={{ textTransform: 'uppercase' }} data-testid={`${side}-brokerageTypeLabel`}>{getBrokerageType()}</span>
      </Col>
      <Col style={{ width: 40, marginLeft: 10, marginRight: 10 }}>
        <Form.Item
          name={`${side}-currency`}
          className="label"
          initialValue={currency}
        >
          <Input readOnly data-testid={`${side}-currencyLabel`} />
        </Form.Item>
      </Col>
      <Col style={{ width: 120 }}>
        <Form.Item
          name={`${side}-amountLabel`}
          className="label"
          initialValue={amount}
        >
          <InputNumber readOnly data-testid={`${side}-amountLabel`} />
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <div className="brokerage-amount-panel">
      {isEditInProgress ? getAmountCcyEditContainer() : getAmountCcyDisplayContainer()}
      <Row>
        <Col
          title={brokerageInfo}
          style={{
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 10,
          }}
        >
          {brokerageInfo}
        </Col>
      </Row>
    </div>
  );
};
BrokerageAmount.defaultProps = {
  brokerage: {},
  originalBrokerage: {},
};

BrokerageAmount.propTypes = {
  brokerage: PropTypes.shape(),
  side: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  originalBrokerage: PropTypes.shape(),
};

export default BrokerageAmount;
