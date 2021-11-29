import PropTypes from 'prop-types';
import { InfoCircleFilled } from '@ant-design/icons';
import {
  Checkbox, Form, Tooltip,
} from 'antd';

const TradeDateEnabled = ({
  id, onChange,
}) => (
  <Form.Item
    className="trade-date-enabled"
    valuePropName="checked"
    name={id}
    initialValue={false}
  >
    <Checkbox onChange={onChange} data-testid={`chk-${id}`}>
      <span className="label-text">Override Trade Date</span>
      <Tooltip
        title="Override Trade Date/Time"
        mouseEnterDelay={0.3}
        overlayStyle={{ fontSize: '0.8em', padding: 0, margin: 0 }}
      >
        <InfoCircleFilled />
      </Tooltip>

    </Checkbox>
  </Form.Item>

);

TradeDateEnabled.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TradeDateEnabled;
