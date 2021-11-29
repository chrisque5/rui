import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Form, InputNumber } from 'antd';
import { getIsRateResponsePending } from '../../utils/selectors';

const Points = ({
  id, label, testId, pointsOnChange, handleKeyDown, validator,
}) => {
  const isRatePending = useSelector(getIsRateResponsePending);
  return (
    <Form.Item
      label={label}
      className="item-points"
      name={id}
      rules={[{ validator }]}
    >
      <InputNumber
        size="small"
        data-testid={testId}
        style={{ width: '100%' }}
        step={1}
        disabled={isRatePending}
        onBlur={pointsOnChange}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.target.select()}
      />
    </Form.Item>
  );
};

Points.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  pointsOnChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

export default Points;
