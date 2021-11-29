import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import { setTodayOnNull } from '../../utils/helper';

const TradeDate = ({
  form, tradeDateOnChange, isTradeDateEnabled, id,
}) => (
  <Form.Item
    className="item-trade-date"
    name={id}
    rules={[{ required: isTradeDateEnabled, message: 'Trade date required' }]}
  >

    <DatePicker
      suffixIcon
      disabled={!isTradeDateEnabled}
      format="L"
      onChange={(value) => { setTodayOnNull(form, id, value); tradeDateOnChange(value, id); }}
      allowClear={false}
      disabledDate={(current) => current > moment().endOf('day')}
      style={{ paddingRight: '5px', width: '95%' }}
      placeholder="Trade Date"
    />
  </Form.Item>
);

TradeDate.propTypes = {
  form: PropTypes.shape().isRequired,
  isTradeDateEnabled: PropTypes.bool.isRequired,
  tradeDateOnChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TradeDate;
