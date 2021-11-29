import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';

const DayCount = ({
  id, label, testId,
}) => (
  <Form.Item
    label={label}
    className="item-day-count"
    name={id}
    rules={[{ required: false }]}
    initialValue={0}
  >
    <InputNumber
      size="small"
      data-testid={testId}
      disabled
      style={{ width: '100%' }}
    />
  </Form.Item>
);

DayCount.defaultProps = {
  label: '',
};

DayCount.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
};

export default DayCount;
