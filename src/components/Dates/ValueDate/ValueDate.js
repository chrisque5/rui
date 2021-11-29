import PropTypes from 'prop-types';
import { StarFilled, LoadingOutlined } from '@ant-design/icons';
import {
  Form, DatePicker, Tooltip,
} from 'antd';
import moment from 'moment';
import { setTodayOnNull } from '../../../utils/helper';

const spinIcon = <LoadingOutlined spin />;

const ValueDate = ({
  form, id, label, testId, valueDateOnChange, addPreferenceClick, spotDate, isPending,
}) => {
  const disabledDate = (current) => {
    // All dates in current DatePicker view are evaluated against this function to establish valid dates
    if (spotDate && current) {
      const validFrom = moment.isMoment(spotDate) ? spotDate : moment();
      return current.valueOf() < validFrom.startOf('day');
    }
    return false;
  };

  return (
    <Form.Item
      label={label && (
        <>
          {label}
          <Tooltip
            title={`Add ${label} to client manager`}
            mouseEnterDelay={0.3}
            overlayStyle={
              { fontSize: '0.8em', padding: 0, margin: 0 }
            }
          >
            <StarFilled
              data-testid="addPreference"
              className="star-icon"
              onClick={addPreferenceClick}
            />
          </Tooltip>
        </>
      )}
      className="item-value-date"
      rules={[{ required: true, message: 'Value date required' }]}
      name={id}
      initialValue={moment()}
    >
      <DatePicker
        suffixIcon={isPending && spinIcon}
        disabled={isPending}
        data-testid={testId}
        format="L"
        allowClear={false}
        onChange={(value) => {
          setTodayOnNull(form, id, value);
          if (value) { valueDateOnChange(value || moment(), id); }
        }}
        style={{ width: '100%' }}
        tabIndex="-1"
        disabledDate={disabledDate}
      />
    </Form.Item>
  );
};

ValueDate.defaultProps = {
  label: '',
  spotDate: null,
};

ValueDate.propTypes = {
  form: PropTypes.shape().isRequired,
  spotDate: PropTypes.shape(),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  valueDateOnChange: PropTypes.func.isRequired,
  addPreferenceClick: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};

export default ValueDate;
