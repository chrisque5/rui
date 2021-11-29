import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../../actions/uiActions';
import { ids } from '../../utils/constants';
import Interest from './Interest';

class InterestContainer extends Component {
  onEnableInterest = (e) => {
    const checked = e.target.checked;

    if (!checked) {
      this.props.form.resetFields([this.props.id]);
      this.props.form.setFieldsValue({
        [ids.AMOUNT_2]: this.props.form.getFieldValue(ids.AMOUNT_1),
      });
      this.props.form.validateFields([ids.AMOUNT_2]);
    } else {
      this.props.calulateInterestRate();
    }
    this.props.uiActions.enableInterest(checked);
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.form.getFieldInstance('buyerClientTrader').focus();
      this.props.form.getFieldInstance('buyerClientTrader').handlePopupVisibleChange(true);
    }
  }

  render() {
    return (
      <Interest
        form={this.props.form}
        label={this.props.label}
        id={this.props.id}
        testId={this.props.testId}
        enableInterest={this.props.isInterestEnabled}
        handleKeyDown={this.handleKeyDown}
        onEnableInterest={this.onEnableInterest}
        interestOnChange={this.props.calulateInterest}
      />
    );
  }
}

InterestContainer.defaultProps = {
  label: '',
  calulateInterest: () => { },
  calulateInterestRate: () => { },
};

InterestContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  isInterestEnabled: PropTypes.bool.isRequired,
  uiActions: PropTypes.shape().isRequired,
  calulateInterest: PropTypes.func,
  calulateInterestRate: PropTypes.func,
};

const mapStateToProps = ({ ui }) => ({
  isInterestEnabled: ui.isInterestEnabled,
});

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestContainer);
