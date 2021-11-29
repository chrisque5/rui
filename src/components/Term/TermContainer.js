import { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Term from './Term';
import { ids } from '../../utils/constants';
import * as userActions from '../../actions/userActions';
import * as uiActions from '../../actions/uiActions';
import { isValidTerm } from '../../utils/helper';

const Option = AutoComplete.Option;

class TermContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      defaultTerms: ['1W', '1M', '2M', '3M', '6M', '9M', '1Y', '2Y'],
      selections: ['IMM1', 'IMM2', 'IMM3', 'IMM4', 'BMF1', 'BMF2', 'BMF3', 'BMF4', ...this.props.additionalTerms],
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.additionalTerms !== prevProps.additionalTerms) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selections: this.props.additionalTerms });
    }
  }

  handleSearch = (field) => {
    let searchOutput = [];
    let value = '';
    if (field) {
      if (field.target) {
        value = '';// Shouldn't have any search value onFocus
      } else {
        value = field;
      }
    }
    if (value && value !== '') {
      const formattedValue = value.toUpperCase();

      if (!Number.isNaN(Number(formattedValue))) {
        searchOutput = [
          `${formattedValue}D`,
          `${formattedValue}W`,
          `${formattedValue}M`,
          `${formattedValue}Y`];
      } else {
        this.state.selections.forEach((item) => {
          if (item.startsWith(formattedValue)) {
            searchOutput.push(item);
          }
        });
      }
      // When Nothing matches add the search text to options. If valid value it get's selected automatically when user click enter/tab.
      if (searchOutput.length === 0) {
        searchOutput[0] = value;
      }
      const searchResults = searchOutput.map((term) => <Option key={term}>{term}</Option>);
      this.setState({ searchResults });
    } else {
      this.defaultTerms();
    }
  };

  defaultTerms = () => {
    const defaultOutput = [...this.props.additionalTerms, ...this.state.defaultTerms];
    const searchResults = defaultOutput.map((term) => <Option key={term}>{term}</Option>);
    this.setState({ searchResults });
  };

  addToPreference = () => {
    const term = this.props.form.getFieldValue(`${ids.TERM_1}`);
    const selectedBrokerDeskId = this.props.userInterface.selectedPreferenceBroker;
    if (!selectedBrokerDeskId || selectedBrokerDeskId === '') {
      Modal.warning({
        title: 'Warning',
        content: 'No Broker tab open to add the favourite. Please open a Broker tab.',
      });
    } else if (term && isValidTerm(term, this.state.selections)) {
      this.props.userActions.addTermPreference(selectedBrokerDeskId, term, null);
    }
  }

  handleKeyDown = (event, id) => {
    // Behaviour specifically for Tabbing out of Term
    if (event.shiftKey && event.key === 'Tab') return; // don't capture shift+tab
    const term = event.target.value;
    if (event.key === 'Tab') {
      if (isValidTerm(term, this.state.selections)) {
        this.termOnSelect(term.toUpperCase(), id);
      }
    }
  }

  validator = (rule, value) => {
    if (value) {
      if (isValidTerm(value, this.state.selections)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Invalid term value'));
    }
    return Promise.reject(new Error('Term required'));
  }

  termOnBlur = (field, termId) => {
    let value = '';
    if (field && field.target) {
      value = field.target.value;
    } else {
      value = field;
    }
    const term = value && value.toUpperCase();

    if (term && isValidTerm(term, this.state.selections)) {
      this.props.form.setFieldsValue({
        [termId]: term,
      });
      this.props.onBlurAfterEffects(term, termId);
    }

    this.props.uiActions.changeTermValues({
      [termId]: term,
    });
  };

  termOnSelect = (value, termId) => {
    this.props.form.getFieldInstance(termId).focus();
    const term = value && value.toUpperCase();
    if (value && isValidTerm(value, this.state.selections)) {
      this.props.uiActions.changeLastTermSelection(termId);
      setTimeout(() => {
        this.props.form.setFieldsValue({
          [termId]: term,
        });
        if (termId === ids.TERM_2) {
          this.props.form.getFieldInstance(ids.RATE_2).focus();
        } else {
          this.props.form.getFieldInstance(ids.RATE_1).focus();
          this.props.setDefaultExecutionVenue();
        }
      }, 50); // Delay required to focusout as it's taking time commit the value into autoselect
    }
  }

  render() {
    return (
      <Term
        form={this.props.form}
        termSearch={this.handleSearch}
        id={this.props.id}
        label={this.props.label}
        testId={this.props.testId}
        searchResults={this.state.searchResults}
        termOnSelect={this.termOnSelect}
        termOnBlur={this.termOnBlur}
        addPreferenceClick={this.addToPreference}
        handleKeyDown={this.handleKeyDown}
        validator={this.validator}
      />
    );
  }
}

TermContainer.defaultProps = {
  label: '',
  additionalTerms: [],
  onBlurAfterEffects: () => { },
  setDefaultExecutionVenue: () => { },
};

TermContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  testId: PropTypes.string.isRequired,
  userActions: PropTypes.shape().isRequired,
  uiActions: PropTypes.shape().isRequired,
  userInterface: PropTypes.shape().isRequired,
  additionalTerms: PropTypes.arrayOf(PropTypes.string),
  onBlurAfterEffects: PropTypes.func,
  setDefaultExecutionVenue: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userInterface: state.ui,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TermContainer);
