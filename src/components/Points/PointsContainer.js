import { Component } from 'react';
import PropTypes from 'prop-types';
import { ids } from '../../utils/constants';
import Points from './Points';
import { isInputNumberValid } from '../../utils/validation';

class PointsContainer extends Component {
    handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.props.form.getFieldInstance(ids.AMOUNT_1).focus();
      }
    };

    validator = (rule, value) => {
      if (value || value === 0) {
        const numberFormatStatus = isInputNumberValid('POINTS', value, this.props.dealType);
        if (!numberFormatStatus.isValid) {
          return Promise.reject(new Error(numberFormatStatus.message));
        }
        return Promise.resolve();
      }
      return Promise.reject(new Error('Points required'));
    };

    render() {
      return (
        <Points
          form={this.props.form}
          id={this.props.id}
          label={this.props.label}
          testId={this.props.testId}
          pointsOnChange={this.props.pointsOnChange}
          handleKeyDown={this.handleKeyDown}
          validator={this.validator}
        />
      );
    }
}

PointsContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  pointsOnChange: PropTypes.func.isRequired,
  dealType: PropTypes.string.isRequired,
};

export default PointsContainer;
