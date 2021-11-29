import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ids, strategies } from '../../utils/constants';
import { isInputNumberValid } from '../../utils/validation';
import { formatAmount } from '../../utils/helper';
import Amount from './Amount';

class AmountContainer extends Component {
  onFieldFocus = (e) => {
    e.target.previousValue = e.target.value;
  };

  isNotValidAlphaNumeric = (value) => {
    const validNotation = ['m', 'b'];
    const lastChar = value.charAt(value.length - 1).toLowerCase();
    return ((value.length === 1)
    || (value.length > 1 && Number.isNaN(Number(value.substring(0, value.length - 1))))
    || (!validNotation.includes(lastChar)));
  };

  onAmountLoseFocus = (e) => {
    const inputValue = e.target.value.replace(/(,*)/g, '');
    if (e.target.previousValue === e.target.value
      || (Number.isNaN(Number(inputValue)) && this.isNotValidAlphaNumeric(inputValue))) {
      return;
    }
    if (inputValue) {
      setTimeout(() => {
        const strategy = this.props.form.getFieldValue(ids.STRATEGY);

        switch (strategy) {
          case strategies.NDF.OUTRIGHT:
          case strategies.FWD.OUTRIGHT:
          case strategies.SPT.SPOT:
            this.props.form.setFieldsValue({
              [this.props.id]: formatAmount(inputValue),
            });
            this.props.form.validateFields([this.props.id]);
            break;
          case strategies.NDF.SPREAD:
          case strategies.FWD.FORWARD:
          case strategies.FWD.FORWARD_FORWARD:
            if (this.props.id === ids.AMOUNT_1) {
              this.props.form.setFieldsValue({
                [ids.AMOUNT_1]: formatAmount(inputValue),
              });
              this.props.form.validateFields([ids.AMOUNT_1]);
              if (this.props.isInterestEnabled) {
                this.props.calulateInterest();
              } else {
                this.props.form.setFieldsValue({
                  [ids.AMOUNT_2]: formatAmount(inputValue),
                });
                this.props.form.validateFields([ids.AMOUNT_2]);
              }
            } else if (this.props.id === ids.AMOUNT_2
                && inputValue !== this.props.form.getFieldValue(ids.AMOUNT_1)) {
              this.props.form.setFieldsValue({
                [ids.AMOUNT_2]: formatAmount(inputValue),
              });
              this.props.form.validateFields([ids.AMOUNT_2]);
              if (this.props.isInterestEnabled) {
                this.props.calulateInterestRate();
              }
            }
            break;
          default:
            break;
        }
      });
    }
  };

  handleKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      if (id === ids.AMOUNT_1) {
        if (this.props.form.getFieldInstance(ids.TERM_2)) {
          this.props.form.getFieldInstance(ids.TERM_2).focus();
        } else {
          this.props.form.getFieldInstance('buyerClientTrader').focus();
          this.props.form.getFieldInstance('buyerClientTrader').handlePopupVisibleChange(true);
        }
      } else {
        this.props.form.getFieldInstance('buyerClientTrader').focus();
        this.props.form.getFieldInstance('buyerClientTrader').handlePopupVisibleChange(true);
      }
    }
  };

  validator = (rule, inputvalue) => {
    const dealtCurrency = this.props.form.getFieldValue(ids.DEALT_CURRENCY);
    const baseCurrency = this.props.form.getFieldValue(ids.CURRENCY_1);
    const validationRule = dealtCurrency === baseCurrency ? 'AMOUNT' : 'AMOUNT_EXT';

    if (inputvalue) {
      let value = inputvalue.replace(/(,*)/g, '');
      if (Number.isNaN(Number(value))) {
        if (this.isNotValidAlphaNumeric(value)) {
          return Promise.reject(new Error('Invalid Amount'));
        }
        return Promise.resolve();
      }
      value = Number(value);
      const numberFormatStatus = isInputNumberValid(validationRule, value, this.props.dealType);
      if (!numberFormatStatus.isValid) {
        return Promise.reject(new Error(numberFormatStatus.message));
      } if (value > 0) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Amount should be larger than 0'));
    }
    return Promise.reject(new Error('Amount required'));
  }

  render() {
    return (
      <Amount
        form={this.props.form}
        onLoseFocus={this.onAmountLoseFocus}
        id={this.props.id}
        label={this.props.label}
        testId={this.props.testId}
        onFieldFocus={this.onFieldFocus}
        handleKeyDown={this.handleKeyDown}
        validator={this.validator}
      />
    );
  }
}

AmountContainer.defaultProps = {
  label: '',
  calulateInterest: () => { },
  calulateInterestRate: () => { },
};

AmountContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  isInterestEnabled: PropTypes.bool.isRequired,
  calulateInterest: PropTypes.func,
  calulateInterestRate: PropTypes.func,
  dealType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ ui }) => ({
  isInterestEnabled: ui.isInterestEnabled,
});

export default connect(mapStateToProps)(AmountContainer);
