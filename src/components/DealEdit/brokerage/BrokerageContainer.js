import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Card,
} from 'antd';
import _ from 'lodash';
import {
  getBuyerBrokerage, getSellerBrokerage, getDeal, getUpdatedDealObject, getUserFullName,
  getOriginalBuyerBrokerage, getOriginalSellerBrokerage,
} from '../../../utils/selectors';
import {
  loadDealSuccess,
} from '../../../actions/dealActions';
import {
  changeReAllocation, updateDealObject,
} from '../../../actions/uiActions';
import BrokerageAmount from './BrokerageAmount';
import BrokerageAllocations from './BrokerageAllocations';
import { getUniqueID } from '../../../utils/helper';

const BrokerageContainer = ({ form }) => {
  const PAYER = 'payer';
  const RECEIVER = 'receiver';

  const dispatch = useDispatch();
  const buyerBrokerage = useSelector(getBuyerBrokerage);
  const originalBuyerBrokerage = useSelector(getOriginalBuyerBrokerage);
  const originalSellerBrokerage = useSelector(getOriginalSellerBrokerage);
  const sellerBrokerage = useSelector(getSellerBrokerage);
  const updatedDealObject = useSelector(getUpdatedDealObject);
  const deal = useSelector(getDeal);
  const updatedBy = useSelector(getUserFullName);

  // Antd Table requires uniq key on each row.
  const getBrokerageWithKeys = (side) => {
    const brokerage = (side === PAYER) ? buyerBrokerage : sellerBrokerage;
    const updatedAllocations = [];
    if (brokerage && brokerage.allocations) {
      const { allocations } = brokerage;
      if (allocations) {
        allocations.forEach((allocData) => {
          updatedAllocations[updatedAllocations.length] = { ...allocData, key: `${side}-${getUniqueID()}` };
        });
      }
    }
    const updatedBrokerage = { ...brokerage, allocations: updatedAllocations };
    return updatedBrokerage;
  };

  useEffect(() => {
    const { value, path, side } = updatedDealObject;
    if (value && path) {
      dispatch(updateDealObject({}));

      const brokeragePath = ['trades', '0', 'tradeEconomics', side, 'brokerage'];
      const existingDeal = JSON.parse(JSON.stringify(deal));

      if (path.includes('amount') && value === 'ZERO') {
        _.set(existingDeal, [...brokeragePath, path], 0);
        _.set(existingDeal, [...brokeragePath, 'brokerageInfo'], `NET set by ${updatedBy}`);
        _.set(existingDeal, [...brokeragePath, 'brokerageType'], 'ManualNet');
        _.set(existingDeal, [...brokeragePath, 'allocations'], []);
      } else {
        _.set(existingDeal, [...brokeragePath, path], value);
        _.set(existingDeal, [...brokeragePath, 'brokerageInfo'], `Manually set by ${updatedBy}`);
        _.set(existingDeal, [...brokeragePath, 'brokerageType'], 'Manual');
      }

      dispatch(loadDealSuccess(existingDeal));
      if (path.includes('amount') && value !== 'ZERO') {
        dispatch(changeReAllocation(side));
      }
    }
  }, [updatedDealObject, deal, dispatch, updatedBy]);
  return (
    <>
      <Row>
        <Col span={12}>
          <Card title="Buyer Brokerage" style={{ marginRight: 1 }}>
            <BrokerageAmount brokerage={buyerBrokerage} side={PAYER} form={form} originalBrokerage={originalBuyerBrokerage} />
            <BrokerageAllocations
              brokerage={getBrokerageWithKeys(PAYER)}
              side={PAYER}
              form={form}
              originalBrokerage={originalBuyerBrokerage}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Seller Brokerage" style={{ marginLeft: 1 }}>
            <BrokerageAmount brokerage={sellerBrokerage} side={RECEIVER} form={form} originalBrokerage={originalSellerBrokerage} />
            <BrokerageAllocations
              brokerage={getBrokerageWithKeys(RECEIVER)}
              side={RECEIVER}
              form={form}
              originalBrokerage={originalSellerBrokerage}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
BrokerageContainer.propTypes = {
  form: PropTypes.shape().isRequired,
};

export default BrokerageContainer;
