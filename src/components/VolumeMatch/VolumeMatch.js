import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';

const VolumeMatch = ({
  id, label,
}) => (
  <Form.Item className="volume-match" valuePropName="checked" name={id}>
    <Checkbox>{label}</Checkbox>
  </Form.Item>
);

VolumeMatch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default VolumeMatch;
