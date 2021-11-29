import PropTypes from 'prop-types';
import { Form, InputNumber } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Rate = ({
  id, label, testId, rateOnChange, handleKeyDown, validator, isRateResponsePending,
}) => (
  <div className="rate-wrapper">
    {isRateResponsePending && <LoadingOutlined spin className="rate-loading-indicator" />}
    <Form.Item label={label} className="item-rate" rules={[{ validator }]} name={id}>
      <InputNumber
        size="small"
        data-testid={testId}
        style={{ width: '100%' }}
        min={0}
        maxLength={15}
        onBlur={rateOnChange}
        disabled={isRateResponsePending}
        onKeyDown={(e) => handleKeyDown(e, id)}
        onClick={(e) => e.target.select()}
      />
    </Form.Item>
  </div>
);

Rate.defaultProps = {
  rateOnChange: () => { },
  label: '',
};

Rate.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  rateOnChange: PropTypes.func,
  handleKeyDown: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  isRateResponsePending: PropTypes.bool.isRequired,
};

export default Rate;
