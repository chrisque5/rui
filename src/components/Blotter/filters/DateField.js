import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const DateField = ({
  id, label, testId,
}) => (
  <Form.Item
    label={label}
    className="blotter-date-filter"
    name={id}
    initialValue={moment()}
    rules={[{ required: true, message: 'date required' }]}

  >
    <DatePicker
      suffixIcon
      data-testid={testId}
      format="L"
      allowClear={false}
      style={{ width: '100%' }}
      disabledDate={(current) => current > moment().endOf('day')}
    />
  </Form.Item>
);

DateField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default DateField;
