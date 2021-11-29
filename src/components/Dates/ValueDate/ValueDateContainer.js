import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import moment from 'moment';
import ValueDate from './ValueDate';
import * as userActions from '../../../actions/userActions';
import { ids } from '../../../utils/constants';
import { getIsDateResponsePending } from '../../../utils/selectors';

class ValueDateContainer extends Component {
  addToPreference = () => {
    const valueDate = moment(this.props.form.getFieldValue(`${ids.VALUE_DATE_1}`)).format('L');
    const selectedBrokerDeskId = this.props.userInterface.selectedPreferenceBroker;
    if (!selectedBrokerDeskId || selectedBrokerDeskId === '') {
      Modal.warning({
        title: 'Warning',
        content: 'No Broker tab open to add the favourite. Please open a Broker tab.',
      });
    } else if (valueDate) {
      this.props.userActions.addTermPreference(selectedBrokerDeskId, null, valueDate);
    }
  };

  valueDateOnChange = (value, valueDateId) => {
    // no local onChange events here.
    this.props.onChangeAfterEffects(value, valueDateId);
  }

  render() {
    return (
      <ValueDate
        form={this.props.form}
        id={this.props.id}
        label={this.props.label}
        testId={this.props.testId}
        valueDateOnChange={this.valueDateOnChange}
        addPreferenceClick={this.addToPreference}
        spotDate={this.props.spotDate}
        isPending={this.props.isDateResponsePending}
      />
    );
  }
}

ValueDateContainer.defaultProps = {
  label: '',
  onChangeAfterEffects: () => { },
  spotDate: null,
};

ValueDateContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  spotDate: PropTypes.shape(),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  onChangeAfterEffects: PropTypes.func,
  userActions: PropTypes.shape().isRequired,
  userInterface: PropTypes.shape().isRequired,
  isDateResponsePending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userInterface: state.ui,
  isDateResponsePending: getIsDateResponsePending(state),
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ValueDateContainer);
