/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import { Form, Checkbox, InputNumber } from 'antd';

const Interest = ({
  label, id, testId, enableInterest, onEnableInterest, interestOnChange, handleKeyDown,
}) => (
  <div className="item-interest">
    <label htmlFor="chkInterest" className="label">{`${label}:`}</label>
    <Checkbox id="chkInterest" className="toggle" checked={enableInterest} onChange={onEnableInterest} />
    <Form.Item
      className="interest"
      name={id}
      rules={[{ required: enableInterest, message: 'Interest required' }]}
    >
      <InputNumber
        size="small"
        data-testid={testId}
        step={1}
        onBlur={interestOnChange}
        disabled={!enableInterest}
        style={{ width: '100%' }}
        min={0}
          // max={100}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.target.select()}
      />
    </Form.Item>
  </div>
);

Interest.propTypes = {
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  enableInterest: PropTypes.bool.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  onEnableInterest: PropTypes.func.isRequired,
  interestOnChange: PropTypes.func.isRequired,
};

export default Interest;
