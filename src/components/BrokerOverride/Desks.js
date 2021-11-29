import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const Desks = ({
  desks, deskOnSelect, id,
}) => (
  <div style={{ width: 250 }}>
    <div>Desks: </div>
    <Form.Item rules={[{ required: true, message: 'Desk required' }]} name={id}>
      <Select
        autoFocus
        allowClear
        name={id}
        onChange={deskOnSelect}
        data-testid="ddDesk"
        showSearch
        optionFilterProp="children"
      >
        {desks && desks.map(
          (desk) => <Select.Option key={desk.key} value={desk.key}>{`${desk.displayValue} - ${desk.key}`}</Select.Option>,
        )}
      </Select>
    </Form.Item>
  </div>
);

Desks.propTypes = {
  desks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  id: PropTypes.string.isRequired,
  deskOnSelect: PropTypes.func.isRequired,
};
export default Desks;
