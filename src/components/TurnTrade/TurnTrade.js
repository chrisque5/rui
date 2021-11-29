import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';

const TurnTrade = ({
  id, label,
}) => (
  <Form.Item className="turn-trade" valuePropName="checked" name={id}>
    <Checkbox>{label}</Checkbox>
  </Form.Item>
);

TurnTrade.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TurnTrade;
