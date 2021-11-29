import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';
import { isSubmitValid, resetCounterpartyValidation } from '../../utils/validation';
import {
  ids, strategies, dealTypes, executionVenueColours,
} from '../../utils/constants';
import alertSound from '../../assets/cashRegister.mp3';
import * as uiActions from '../../actions/uiActions';
import * as dateActions from '../../actions/dateActions';
import * as dealActions from '../../actions/dealActions';
import * as rateActions from '../../actions/rateActions';
import { showSuccessNotification } from '../../utils/notifications';
import { doesArrayExistWithValue } from '../../utils/helper';
import * as userActions from '../../actions/userActions';
import SubmitModal from './SubmitModal';

const TradeCapture = (WrappedComponent) => {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isSubmitInProgress: false,
        prevForm: null,
        showSubmitModal: false,
        dealToSubmit: {},
      };
    }

    componentDidMount = () => {
      // Kind of Hack here. NDF/FWD Containers are class compomnents where as SPT is Functional
      this.form = this.componentRef.form ? this.componentRef.form.current : this.componentRef;
      const strategyType = this.form.getFieldValue(ids.STRATEGY);
      this.props.uiActions.changeStrategyType(strategyType);
    }

    loadPreferences = (dealType) => {
      this.props.userActions.loadPreferences().then(() => {
        const defaults = this.props.user.preferences.defaults;
        if (defaults) {
          this.setDefaults(defaults, dealType);
        }
      });
    }

    getDefaultsForDeal = (dealType, defaults) => {
      let foundDefaults = {};
      if (defaults) {
        const dealDefaults = defaults.dealDefaults;
        if (defaults && doesArrayExistWithValue(dealDefaults)) {
          foundDefaults = dealDefaults.find((aDealDefault) => aDealDefault.key === dealType) || {};
          foundDefaults.lastUsedDealType = defaults.lastDealType;
        }
      }
      return foundDefaults;
    }

    setDefaults = (def, dealType) => {
      this.setCounterPartySelection(dealType);
    }

    setNewDefaults = (newDeal) => {
      const {
        dealType, currency1: baseCurrency, currency2: counterCurrency, dealtCurrency, executionVenue,
      } = newDeal;

      const reformattedNewDefaults = {
        key: dealType,
        baseCurrency,
        counterCurrency,
        dealtCurrency,
        executionVenue,
        lastUsedDealType: dealType,
      };

      const oldDefaults = this.props.user.preferences.defaults;
      const oldDefaultsForDeal = this.getDefaultsForDeal(dealType, oldDefaults);
      if (oldDefaultsForDeal && !_.isEqual(oldDefaultsForDeal, reformattedNewDefaults)) {
        this.props.userActions.updateDefaultPreferences(reformattedNewDefaults);
      }
    }

    setSubmitInProgress = (isSubmitInProgress) => {
      this.setState({ isSubmitInProgress });
    };

    playAudio = () => {
      const audio = new Audio(alertSound);
      audio.play();
    };

    resetForm = () => {
      resetCounterpartyValidation();
      const persistValues = {
        [ids.STRATEGY]: this.form.getFieldValue(ids.STRATEGY),
        [ids.EXECUTION_VENUE]: this.form.getFieldValue(ids.EXECUTION_VENUE),
        [ids.CURRENCY_1]: this.form.getFieldValue(ids.CURRENCY_1),
        [ids.CURRENCY_2]: this.form.getFieldValue(ids.CURRENCY_2),
        [ids.DEALT_CURRENCY]: this.form.getFieldValue(ids.DEALT_CURRENCY),
      };
      this.form.resetFields();
      this.setState((prevState) => ({
        ...prevState,
        prevForm: null,
      }));
      this.props.uiActions.resetUiState();
      this.props.uiActions.toggleIsClsOverride(false);
      this.props.dateActions.resetDates();
      this.form.setFieldsValue(persistValues);
      this.form.getFieldInstance(ids.CURRENCY_1).focus();
      this.setCounterPartySelection(this.props.ui.selectedDealType);
    };

    setCounterPartySelection = (dealType) => {
      if (dealType === dealTypes.FWD && this.props.user.preferences.settings.lrMode === true) {
        this.props.uiActions.changeCounterPartySelection('seller');
      } else {
        this.props.uiActions.changeCounterPartySelection('buyer');
      }
    };

    hideSubmitModal = () => {
      this.setState((prevState) => ({
        ...prevState,
        showSubmitModal: false,
      }));
    };

    isDuplicateDeal = () => {
      const currDeal = this.form.getFieldsValue();
      const prevDeal = this.state.prevForm;

      return (this.state.prevForm && _.isEqual(prevDeal, currDeal));
    }

    validateDeal = async () => {
      let result;
      return this.form.validateFields().then((values) => {
        this.setSubmitInProgress(true);
        const isValid = values && isSubmitValid(values);
        this.setSubmitInProgress(false);
        if (isValid) {
          result = {
            valid: true,
            deal: {
              ...values,
              instrumentId: this.getInstrumentId(),
            },
          };
        } else {
          result = {
            valid: false,
            error: 'Please review validation errors',
          };
        }
        return result;
      }).catch(() => {
        // Client trader has custom validation and not getting triggered using default validatefields.
        this.setSubmitInProgress(true);
        isSubmitValid(this.form.getFieldsValue());
        this.setSubmitInProgress(false);
        return ({
          valid: false,
          error: 'Please review validation errors',
        });
      });
    };

    getInstrumentId = () => {
      const currency1 = this.form.getFieldValue(ids.CURRENCY_1);
      const currency2 = this.form.getFieldValue(ids.CURRENCY_2);

      const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });
      return currencyPair ? currencyPair.instrumentId : null;
    };

    submitDeal = (deal) => {
      this.setState((prevState) => ({
        ...prevState,
        dealToSubmit: deal,
      }));

      if (this.isDuplicateDeal()) {
        this.setState({
          showSubmitModal: true,
        });

        return;
      }

      this.createDeal();
    }

    createDeal = () => {
      const deal = this.state.dealToSubmit;
      this.setNewDefaults(deal);
      this.setSubmitInProgress(true);

      this.props.dealActions.createDeal(deal)
        .then(() => {
          if (!this.props.deal.success) {
            this.setSubmitInProgress(false);
          } else {
            const dealIds = [];

            switch (deal.dealType) {
              case dealTypes.NDF:
                if (deal[ids.STRATEGY] === strategies.NDF.OUTRIGHT) {
                  dealIds.push(this.props.deal.deals[0].dmsDealReference);
                } else if (deal[ids.STRATEGY] === strategies.NDF.SPREAD) {
                  dealIds.push(this.props.deal.deals[0].dmsDealReference, this.props.deal.deals[1].dmsDealReference);
                }
                break;
              case dealTypes.FWD:
              case dealTypes.SPT:
                dealIds.push(this.props.deal.deals[0].dmsDealReference);
                break;
              default:
                dealIds.push('Deal ID not found');
            }

            this.setState({
              prevForm: this.form.getFieldsValue(),
            }, () => {
              showSuccessNotification('Deal created', `Deal successfully created [${dealIds}]`);
            });
            this.setSubmitInProgress(false);
            this.playAudio();
          }
        });
    };

    getSubmitButtonStyle = () => {
      const displayExecutionVenueColours = this.props.user.preferences.settings.displayExecutionVenueColours;
      if (displayExecutionVenueColours === true && this.form) {
        const executionVenue = this.form.getFieldValue(`${ids.EXECUTION_VENUE}`);
        const colour = executionVenueColours.find((element) => element.executionVenue === executionVenue);
        if (colour && colour.VALUE) {
          const text = `Submit ${executionVenue}`;
          return {
            marginLeft: 3, backgroundColor: colour.VALUE, borderColor: colour.VALUE, btnText: text,
          };
        }
      }

      return {
        marginLeft: 3, backgroundColor: '#199bbe', borderColor: '#199bbe', btnText: 'Submit',
      };
    };

    isResponsePending = () => (this.props.dates.isDateResponsePending || this.props.rates.isRateResponsePending)

    isTermSame = (term1 = null, term2 = null) => {
      let isTermSame = false;

      if (term1) {
        const currentTerm1 = this.form.getFieldValue(ids.TERM_1) || '0D';
        isTermSame = term1 === currentTerm1;
      }

      if (term2) {
        const currentTerm2 = this.form.getFieldValue(ids.TERM_2) || '0D';
        isTermSame = term2 === currentTerm2;
      }

      return isTermSame;
    }

    render() {
      return (
        <>
          <WrappedComponent
            ref={(ref) => { this.componentRef = ref; }}
            {...this.props}
            setSubmitInProgress={this.setSubmitInProgress}
            playAudio={this.playAudio}
            resetForm={this.resetForm}
            validateDeal={this.validateDeal}
            submitDeal={this.submitDeal}
            isSubmitInProgress={this.state.isSubmitInProgress}
            loadPreferences={this.loadPreferences}
            setDefaults={this.setDefaults}
            getSubmitButtonStyle={this.getSubmitButtonStyle}
            getDefaultsForDeal={this.getDefaultsForDeal}
            isSubmitButtonDisabled={this.isResponsePending}
            isTermSame={this.isTermSame}
          />
          <SubmitModal
            isModalVisible={this.state.showSubmitModal}
            onAccept={this.createDeal}
            hideModal={this.hideSubmitModal}
          />
        </>
      );
    }
  }

  HOC.propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    dates: PropTypes.shape().isRequired,
    rates: PropTypes.shape().isRequired,
    deal: PropTypes.shape().isRequired,
    ui: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
    uiActions: PropTypes.shape().isRequired,
    dealActions: PropTypes.shape().isRequired,
    dateActions: PropTypes.shape().isRequired,
    userActions: PropTypes.shape().isRequired,
    rateActions: PropTypes.shape().isRequired,
  };

  const mapStateToProps = ({
    currencies, dates, deal, ui, user, rates,
  }) => ({
    currencies,
    dates,
    deal,
    ui,
    user,
    rates,
  });

  const mapDispatchToProps = (dispatch) => ({
    uiActions: bindActionCreators(uiActions, dispatch),
    dateActions: bindActionCreators(dateActions, dispatch),
    dealActions: bindActionCreators(dealActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    rateActions: bindActionCreators(rateActions, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
};

export default TradeCapture;
