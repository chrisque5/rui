import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isInputNumberValid } from '../../utils/validation';
import { ids } from '../../utils/constants';
import Rate from './Rate';
import { getIsRateResponsePending } from '../../utils/selectors';

const RateContainer = ({
  form, id, label, testId, dealType, rateOnChange,
}) => {
  const isRateResponsePending = useSelector(getIsRateResponsePending);

  const handleKeyDown = (event, elemId) => {
    if (event.key === 'Enter') {
      if (elemId === ids.RATE_1) {
        if (form.getFieldInstance(ids.POINTS)) {
          form.getFieldInstance(ids.POINTS).focus();
        } else {
          form.getFieldInstance(ids.AMOUNT_1).focus();
        }
      } else {
        form.getFieldInstance(ids.AMOUNT_2).focus();
      }
    }
  };

  const validator = (rule, value) => {
    if (value || value === 0) {
      const numberFormatStatus = isInputNumberValid('RATE', value, dealType);
      if (!numberFormatStatus.isValid) {
        return Promise.reject(new Error(numberFormatStatus.message));
      } if (value > 0) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Rate should be larger than 0'));
    }
    return Promise.reject(new Error('Rate required'));
  };

  return (
    <Rate
      form={form}
      id={id}
      label={label}
      testId={testId}
      rateOnChange={rateOnChange}
      handleKeyDown={handleKeyDown}
      validator={validator}
      isRateResponsePending={isRateResponsePending}
    />
  );
};

RateContainer.defaultProps = {
  label: '',
  rateOnChange: () => { },
};

RateContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  rateOnChange: PropTypes.func,
  dealType: PropTypes.string.isRequired,
};

export default RateContainer;
