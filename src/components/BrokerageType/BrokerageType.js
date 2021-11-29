import {
  Form, Select,
} from 'antd';
import { ids, brokerageTypes } from '../../utils/constants';

const BrokerageType = () => (
  <Form.Item
    rules={[{ required: true }]}
    name={ids.BROKERAGE_TYPE}
    className="item-brokerage-type"
    initialValue={brokerageTypes.GAP_SPREAD}
  >
    <Select data-testid="ddlBrokerageType">
      {Object.keys(brokerageTypes).map((key) => (
        <Select.Option key={key} value={brokerageTypes[key]}>{brokerageTypes[key]}</Select.Option>
      ))}
    </Select>
  </Form.Item>
);

export default BrokerageType;
