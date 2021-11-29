import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, Select,
} from 'antd';
import { getSelectedDealType, getSelectedStrategyType, getBrokerageStrategies } from '../../utils/selectors';
import { loadBrokerageStrategies } from '../../actions/brokerageStrategyActions';
import { ids } from '../../utils/constants';

const BrokerageStrategy = () => {
  const dispatch = useDispatch();
  const strategies = useSelector(getBrokerageStrategies);
  const dealType = useSelector(getSelectedDealType);
  const strategyType = useSelector(getSelectedStrategyType);

  useEffect(() => {
    dispatch(loadBrokerageStrategies(dealType, strategyType));
  }, [dispatch, dealType, strategyType]);

  return (
    <Form.Item
      rules={[{ required: true }]}
      name={ids.BROKERAGE_STRATEGY}
      className="item-brokerage-type"
      initialValue="Gap Spread"
    >
      <Select data-testid="ddlBrokerageStrategy" name={ids.BROKERAGE_STRATEGY}>
        {strategies.map(
          (key) => <Select.Option key={key} value={key}>{key}</Select.Option>,
        )}
      </Select>
    </Form.Item>
  );
};

export default BrokerageStrategy;
