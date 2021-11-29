import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, Row, Button, Collapse,
} from 'antd';
import * as jsonpatch from 'fast-json-patch';
import {
  showErrorNotification,
} from '../../utils/notifications';
// eslint-disable-next-line import/no-unresolved
import '../../styles/compiled/dms-deal-edit.css';
import {
  loadDeal, loadDealSuccess, editDeal, updateOriginalDeal,
} from '../../actions/dealActions';
import { changeDealType, changeDealEditStatus } from '../../actions/uiActions';
import { loadDealCurrencies } from '../../actions/currencyActions';
import { loadDealBrokers } from '../../actions/brokerActions';
import {
  getUser, getDeal, getIsDealEditInProgress,
} from '../../utils/selectors';
import Forbidden from '../Error/Forbidden';
import NavbarContainer from '../Navbar/NavbarContainer';
import TradeStatusDetails from './tradestatus/TradeStatusDetails';
import BrokerageContainer from './brokerage/BrokerageContainer';
import SaveDesriptionModal from './savedescription/SaveDesriptionModal';

const { Panel } = Collapse;
const DealEdit = ({ match }) => {
  const { params: { dealId } = {} } = match;
  const dispatch = useDispatch();

  const { fullName, permissions = {} } = useSelector(getUser);
  const { validForDealEdit } = permissions;

  const deal = useSelector(getDeal);
  const isEditInProgress = useSelector(getIsDealEditInProgress);

  const [originalDeal, setOriginalDeal] = useState(null);
  const [editDescription, setEditDescription] = useState(null);
  const [isEditDescModalVisible, setIsEditDescModalVisible] = useState(false);

  const [form] = Form.useForm();
  useEffect(() => {
    if (validForDealEdit && dealId) {
      dispatch(loadDeal(dealId));
    }
  }, [dispatch, validForDealEdit, dealId]);

  useEffect(() => {
    const { dmsDealReference, dealType } = deal;
    if (dealType && !originalDeal) {
      dispatch(changeDealType(dealType));
      document.title = `${dmsDealReference} - DMSWeb`;
      dispatch(loadDealCurrencies(dealType));
      dispatch(loadDealBrokers(dealType));
    }
  }, [dispatch, deal, originalDeal]);

  const getButtonStyle = () => ({ marginRight: 3 });

  const getEditButtonStyle = () => ({ marginRight: 3, display: isEditInProgress ? 'none' : 'block' });

  const getDiscardButtonStyle = () => ({ marginRight: 3, display: isEditInProgress ? 'block' : 'none' });

  const validationBrokerage = (brokerage, side) => {
    if (!brokerage.allocations || brokerage.allocations.length === 0) {
      return { isValid: false, message: 'Please add brokerage allocations' };
    }
    let allocationPerc = 0;
    let allocationAmount = 0;
    const brokers = [];
    let duplicateBrokerFound = false;

    // Reversing the array to avoid decimal calculation errors
    const allocations = JSON.parse(JSON.stringify(brokerage.allocations)).reverse();

    allocations.forEach((allocData) => {
      const { brokerGcdPostingId, percentage, amount } = allocData;
      allocationPerc += Number(percentage);
      allocationAmount += Number(amount);
      if (brokers.includes(brokerGcdPostingId)) {
        duplicateBrokerFound = true;
      }
      brokers.push(`${brokerGcdPostingId}`);
    });

    if (duplicateBrokerFound) {
      return { isValid: false, message: `Same Broker can not be added more than once on ${side} side` };
    }
    if (allocationPerc !== 100) {
      return { isValid: false, message: `${side} Allocation % should be equal to 100` };
    }
    if (allocationAmount !== brokerage.amount) {
      return { isValid: false, message: `${side} Brokerage should be equal to 100` };
    }

    return { isValid: true };
  };

  const validationAllocations = () => {
    const buyerBrokerage = deal.trades[0].tradeEconomics.payer.brokerage;
    if (buyerBrokerage && buyerBrokerage.amount && buyerBrokerage.currency) {
      const buyerStatus = validationBrokerage(buyerBrokerage, 'Buyer');
      if (!buyerStatus.isValid) {
        return buyerStatus;
      }
    }
    const sellerBrokerage = deal.trades[0].tradeEconomics.receiver.brokerage;
    if (sellerBrokerage && sellerBrokerage.amount && sellerBrokerage.currency) {
      const sellerStatus = validationBrokerage(sellerBrokerage, 'Seller');
      if (!sellerStatus.isValid) {
        return sellerStatus;
      }
    }
    return { isValid: true };
  };

  const onSave = async () => {
    try {
      await form.validateFields();
      const patch = jsonpatch.compare(originalDeal, deal);
      if (patch && patch.length > 0) {
        const { isValid, message } = validationAllocations();

        if (isValid) {
          setIsEditDescModalVisible(true);
        } else {
          showErrorNotification('Validation Error', message);
        }
      } else {
        showErrorNotification('Validation Error', 'At least one field must be changed before submitting deal');
      }
    } catch {
      showErrorNotification('Validation Error', 'Please review validation errors');
    }
  };

  const onEditDescriptionChange = (value) => {
    setEditDescription(value);
  };

  const onBack = () => {
    setIsEditDescModalVisible(false);
  };

  const onOk = () => {
    setIsEditDescModalVisible(false);
    const updatedDeal = { ...deal, editDescription };
    const patch = jsonpatch.compare(originalDeal, updatedDeal);
    dispatch(editDeal(dealId, patch));
  };

  const onEdit = () => {
    const dealSource = JSON.parse(JSON.stringify(deal));
    dispatch(updateOriginalDeal(dealSource));
    setOriginalDeal(deal);
    dispatch(changeDealEditStatus(true));
  };

  const onDiscard = () => {
    form.resetFields();
    dispatch(loadDealSuccess(originalDeal));
    setOriginalDeal(null);
    dispatch(updateOriginalDeal(null));
    dispatch(changeDealEditStatus(false));
  };

  const onRefresh = () => {
    form.resetFields();
    dispatch(changeDealEditStatus(false));
    setOriginalDeal(null);
    dispatch(loadDealSuccess({}));
    dispatch(updateOriginalDeal(null));
    dispatch(loadDeal(dealId));
  };

  return (
    <>
      <NavbarContainer selectedKey="EDIT" />
      {
        validForDealEdit ? (
          <div className="dms-web-deal-edit">
            {
              deal.dealType && (
              <>
                <Form
                  form={form}
                  preserve={false}
                >
                  <Row type="flex" justify="end" className="action-buttons">
                    <Button
                      type="primary"
                      disabled={!isEditInProgress}
                      style={getButtonStyle()}
                      data-testid="btnDealSave"
                      id="save"
                      onClick={onSave}
                    >
                      Save
                    </Button>
                    <Button
                      type="primary"
                      style={getEditButtonStyle()}
                      data-testid="btnEditDeal"
                      id="editdeal"
                      onClick={onEdit}
                    >
                      Edit Deal
                    </Button>
                    <Button
                      type="primary"
                      style={getDiscardButtonStyle()}
                      data-testid="btnDiscard"
                      id="discard"
                      onClick={onDiscard}
                    >
                      Discard Changes
                    </Button>
                    <Button
                      type="primary"
                      disabled={isEditInProgress}
                      style={getButtonStyle()}
                      data-testid="btnRefresh"
                      id="refresh"
                      onClick={onRefresh}
                    >
                      Refresh
                    </Button>
                    <Button
                      type="primary"
                      disabled={isEditInProgress}
                      style={getButtonStyle()}
                      data-testid="btnCancel"
                      id="cancel"
                    >
                      Cancel Deal
                    </Button>
                  </Row>
                  <Collapse expandIconPosition="right" defaultActiveKey={['1', '2']} style={{ marginBottom: 20 }}>
                    <Panel showArrow={false} key="1" collapsible="disabled" header="Deal Information" className="trade-time-details">
                      <TradeStatusDetails />
                    </Panel>
                    <BrokerageContainer isEditInProgress={isEditInProgress} form={form} key="2" />
                  </Collapse>
                </Form>
                <SaveDesriptionModal onBack={onBack} onOk={onOk} visible={isEditDescModalVisible} onDescriptionChange={onEditDescriptionChange} />
              </>
              )
            }
          </div>
        ) : fullName && <Forbidden />
      }
    </>
  );
};

DealEdit.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default DealEdit;
