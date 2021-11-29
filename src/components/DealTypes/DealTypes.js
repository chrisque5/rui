import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import { ids } from '../../utils/constants';

const DealTypes = ({ options, dealTypeChange }) => (
  <Form.Item rules={[{ required: true, message: 'Deal Type required' }]} name={ids.DEAL_TYPE}>
    <Radio.Group>
      <span className="custom-label">Deal Type: </span>
      {options.map((dealType) => (
        <Radio
          key={dealType.name}
          value={dealType.name}
          disabled={dealType.isDisabled}
          data-testid={`rdodealType${dealType.name}`}
          onChange={dealTypeChange}
        >
          {dealType.name}
        </Radio>
      ))}
    </Radio.Group>
  </Form.Item>
);

DealTypes.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dealTypeChange: PropTypes.func.isRequired,
};

export default DealTypes;
