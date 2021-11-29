import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import ExecutionVenue from './ExecutionVenue';
import * as executionVenueActions from '../../actions/executionVenueActions';
import * as userActions from '../../actions/userActions';
import * as uiActions from '../../actions/uiActions';
import { ids, dealTypes } from '../../utils/constants';
import { filterSpotExecutionVenues } from '../../utils/helper';

class ExecutionVenueContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.props.executionVenueActions.loadExecutionVenues(this.props.dealType)
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: !prevState.isLoading,
        }));
      });
  }

  componentDidUpdate = () => {
    if (!this.state.isLoading) {
      this.setDefault();
    }
  }

  reduceExecutionVenues = () => {
    if (this.props.dealType === dealTypes.SPT) {
      return filterSpotExecutionVenues(this.props.executionVenues);
    }
    return this.props.executionVenues;
  }

  setDefault = () => {
    const { form } = this.props;
    const reducedExecVenues = this.reduceExecutionVenues();
    const storedVenue = form.getFieldValue(ids.EXECUTION_VENUE);

    if (!storedVenue && reducedExecVenues.length > 0) {
      const [defaultVenue = {}] = reducedExecVenues;
      const { venueId = undefined } = defaultVenue;
      form.setFieldsValue({ executionVenue: venueId });
    }
  }

  addToPreference = () => {
    const executionVenue = this.props.form.getFieldValue(`${ids.EXECUTION_VENUE}`);
    const selectedBrokerDeskId = this.props.userInterface.selectedPreferenceBroker;
    if (!selectedBrokerDeskId || selectedBrokerDeskId === '') {
      Modal.warning({
        title: 'Warning',
        content: 'No Broker tab open to add the favourite. Please open a Broker tab.',
      });
    } else if (executionVenue) {
      this.props.userActions.addExecutionVenuePreference(selectedBrokerDeskId, executionVenue);
    }
  };

  render() {
    return (
      <ExecutionVenue
        {...this.props}
        isLoading={this.state.isLoading}
        options={this.reduceExecutionVenues()}
        addPreferenceClick={this.addToPreference}
      />
    );
  }
}

ExecutionVenueContainer.propTypes = {
  executionVenueActions: PropTypes.shape().isRequired,
  executionVenues: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  userActions: PropTypes.shape().isRequired,
  uiActions: PropTypes.shape().isRequired,
  userInterface: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
  dealType: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  executionVenueActions: bindActionCreators(executionVenueActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
});

const mapStateToProps = (state) => ({
  executionVenues: state.executionVenues,
  userInterface: state.ui,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExecutionVenueContainer);
