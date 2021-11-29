import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const Amount = ({
  onLoseFocus, id, label, testId, onFieldFocus, handleKeyDown, validator,
}) => (
  <Form.Item
    label={label}
    className="item-amount"
    name={id}
    rules={[{ validator }]}
  >
    <Input
      size="small"
      data-testid={testId}
      style={{ width: '100%' }}
      min={0}
      onBlur={onLoseFocus}
      onFocus={onFieldFocus}
      onKeyDown={(e) => handleKeyDown(e, id)}
      onClick={(e) => e.target.select()}
    />
  </Form.Item>
);

Amount.propTypes = {
  onLoseFocus: PropTypes.func.isRequired,
  onFieldFocus: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

export default Amount;
