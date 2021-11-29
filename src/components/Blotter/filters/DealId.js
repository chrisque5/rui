import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const DealId = ({
  id, label, testId, validator, handleKeyDown,
}) => (
  <Form.Item
    label={label}
    className="dealid"
    name={id}
    style={{ marginBottom: 5 }}
    rules={[{ validator }]}
  >
    <Input
      data-testid={testId}
      maxLength={19}
      allowClear
      onKeyDown={handleKeyDown}
      type="number"
      className="dealid"
    />
  </Form.Item>
);

DealId.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  validator: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default DealId;
