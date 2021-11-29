import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { setTodayOnNull } from '../../../utils/helper';
import { getIsDateResponsePending } from '../../../utils/selectors';

const spinIcon = <LoadingOutlined spin />;

const FixingDate = ({
  form, id, label, testId,
}) => {
  const isPending = useSelector(getIsDateResponsePending);

  return (
    <Form.Item
      label={label}
      className="item-fixing-date"
      name={id}
      rules={[{ required: true, message: 'Fixing date required' }]}
      initialValue={moment()}
    >
      <DatePicker
        suffixIcon={isPending && spinIcon}
        disabled={isPending}
        data-testid={testId}
        format="L"
        onChange={(value) => setTodayOnNull(form, id, value)}
        allowClear={false}
        tabIndex="-1"
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};

FixingDate.defaultProps = {
  label: '',
};

FixingDate.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
};

export default FixingDate;
