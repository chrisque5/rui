import PropTypes from 'prop-types';
import { TimePicker, Form } from 'antd';

const TradeDateTime = ({
  isTradeTimeEnabled, id,
}) => (
  <Form.Item
    className="item-trade-time"
    name={id}
    rules={[{ required: isTradeTimeEnabled, message: 'Trade time required' }]}
  >

    <TimePicker
      disabled={!isTradeTimeEnabled}
      style={{ width: '100%' }}
      placeholder="Trade Time"
      onChange={(time) => time.local()}
    />
  </Form.Item>
);

TradeDateTime.propTypes = {
  isTradeTimeEnabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default TradeDateTime;
