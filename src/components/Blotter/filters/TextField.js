import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const TextField = ({
  id, label, testId, onChange, handleKeyDown,
}) => (
  <Form.Item
    label={label}
    name={id}
    style={{ marginBottom: 5 }}
  >
    <Input
      data-testid={testId}
      allowClear
      onChange={(event) => onChange(event, id)}
      onKeyDown={handleKeyDown}
    />
  </Form.Item>
);
TextField.defaultProps = {
  onChange: () => { },
};
TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  handleKeyDown: PropTypes.func.isRequired,
};

export default TextField;
