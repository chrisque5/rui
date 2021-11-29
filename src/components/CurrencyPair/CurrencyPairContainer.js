import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import _ from 'lodash';
import CurrencyPair from './CurrencyPair';
import * as userActions from '../../actions/userActions';
import { toggleIsClsOverride } from '../../actions/uiActions';
import * as currencyActions from '../../actions/currencyActions';
import { ids, dealTypes } from '../../utils/constants';
import { doesArrayExistWithValue, findCurrencyPair } from '../../utils/helper';
import {
  getCurrencies, getUi, getUserPreferenceSettingsRatesFeed, getIsTradeDateEnabled, getUserPreferenceSettingsClsDefaults, getIsClsOverride,
} from '../../utils/selectors';

class CurrencyPairContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dealtCurrencies: [] };
  }

  async componentDidMount() {
    await this.props.currencyActions.loadCurrencies(this.props.dealType);
    this.setState((prevState) => ({ ...prevState, isLoading: !prevState.isLoading }));
    const currency2 = this.props.form.getFieldValue(`${ids.CURRENCY_2}`);
    if (currency2) { this.updatedealtCurrencyList(currency2, ids.CURRENCY_2); }
    this.setCLS();
  }

  componentDidUpdate(prevProps) {
    const { userInterface: { selectedStrategyType }, isClsDefaultsEnabled } = this.props;

    if (selectedStrategyType !== prevProps.userInterface.selectedStrategyType
      || isClsDefaultsEnabled !== prevProps.userInterface.isClsDefaultsEnabled) {
      this.setCLS();
    }
  }

  addToPreference = () => {
    const currency1 = this.props.form.getFieldValue(`${ids.CURRENCY_1}`);
    const currency2 = this.props.form.getFieldValue(`${ids.CURRENCY_2}`);
    const dealtCurrency = this.props.form.getFieldValue(`${ids.DEALT_CURRENCY}`);
    const selectedBrokerDeskId = this.props.userInterface.selectedPreferenceBroker;
    if (!selectedBrokerDeskId || selectedBrokerDeskId === '') {
      Modal.warning({
        title: 'Warning',
        content: 'No Broker tab open to add the favourite. Please open a Broker tab.',
      });
    } else if (currency1 && currency2) {
      this.props.userActions.addCurrencyPairPreference(selectedBrokerDeskId, currency1, currency2, dealtCurrency);
    }
  };

  resetRateIfFeedDisabled = () => {
    if (!this.props.ratesFeed || this.props.isTradeDateEnabled) {
      const fieldIds = [ids.RATE_1];

      if (this.props.form.getFieldInstance(ids.RATE_2)) fieldIds.push(ids.RATE_2);
      if (this.props.form.getFieldInstance(ids.POINTS)) fieldIds.push(ids.POINTS);

      this.props.form.resetFields(fieldIds);
    }
  };

  currency1OnChange = async (newCurrency1) => {
    this.props.form.setFieldsValue({ [ids.CURRENCY_2]: null });
    this.props.form.getFieldInstance(ids.CURRENCY_2).focus();
    this.props.form.setFieldsValue({ [ids.DEALT_CURRENCY]: newCurrency1 });
    this.updatedealtCurrencyList(newCurrency1, ids.CURRENCY_1);
    this.resetRateIfFeedDisabled();
    await this.props.toggleIsClsOverride(false);
    this.setCLS();
  };

  currency2OnChange = async (newCurrency2) => {
    const currency1Value = this.props.form.getFieldValue(ids.CURRENCY_1);
    this.props.onChangeAfterEffects(newCurrency2);
    this.props.form.getFieldInstance(ids.DEALT_CURRENCY).focus();
    this.props.form.setFieldsValue({ [ids.DEALT_CURRENCY]: currency1Value });
    this.updatedealtCurrencyList(newCurrency2, ids.CURRENCY_2);
    this.resetRateIfFeedDisabled();
    await this.props.toggleIsClsOverride(false);
    this.setCLS();
  };

  setCLS = () => {
    const {
      dealType, currencies, form, isClsDefaultsEnabled, isClsOverride,
    } = this.props;

    if (!isClsDefaultsEnabled && !isClsOverride) {
      form.resetFields([ids.CLS_1, ids.CLS_2]);
    } else if (!isClsOverride && (dealType === dealTypes.FWD || dealType === dealTypes.SPT)) {
      const baseCurrency = form.getFieldValue(ids.CURRENCY_1);
      const counterCurrency = form.getFieldValue(ids.CURRENCY_2);
      const { isCLS = false } = findCurrencyPair(baseCurrency, counterCurrency, currencies) || {};

      form.setFieldsValue({
        [ids.CLS_1]: isCLS,
        [ids.CLS_2]: isCLS,
      });
    }
  };

  updatedealtCurrencyList = (newValue, ccyType) => {
    const dealtCurrencyList = [];
    if (ccyType === ids.CURRENCY_1) {
      dealtCurrencyList[0] = newValue;
      dealtCurrencyList[1] = this.props.form.getFieldValue(ids.CURRENCY_2);
    } else {
      dealtCurrencyList[0] = this.props.form.getFieldValue(ids.CURRENCY_1);
      dealtCurrencyList[1] = newValue;
    }
    this.setState({ dealtCurrencies: dealtCurrencyList });
  };

  dealtCurrencyOnChange = () => {
    const nextField = this.props.dealType === dealTypes.SPT ? ids.RATE_1 : ids.TERM_1;
    const amount1 = this.props.form.getFieldValue(ids.AMOUNT_1);
    const amount2 = this.props.form.getFieldValue(ids.AMOUNT_2);

    if (amount1 && amount1 !== '') {
      this.props.form.validateFields([ids.AMOUNT_1]);
    }

    if (amount2 && amount2 !== '') {
      this.props.form.validateFields([ids.AMOUNT_2]);
    }

    this.props.form.getFieldInstance(nextField).focus();
    setTimeout(() => {
      this.props.calulateInterest();
    });
  };

  getBaseCurrencies = () => {
    const allCurrencies = this.props.currencies;
    if (doesArrayExistWithValue(allCurrencies)) {
      return _.uniq(_.map(allCurrencies, (currencyPair) => currencyPair.baseCurrency));
    }
    return [];
  }

  getCounterCurrencies = () => {
    if (this.props.form) {
      const ccy1 = this.props.form.getFieldValue(ids.CURRENCY_1);
      const allCurrencies = this.props.currencies;
      if (doesArrayExistWithValue(allCurrencies)) {
        return allCurrencies.filter((i) => i.baseCurrency === ccy1).map((i) => i.counterCurrency);
      }
    }
    return [];
  }

  render() {
    return (
      <CurrencyPair
        addPreferenceClick={this.addToPreference}
        currency1Id={ids.CURRENCY_1}
        currency2Id={ids.CURRENCY_2}
        dealtCurrencyId={ids.DEALT_CURRENCY}
        testId={this.props.testId}
        label={this.props.label}
        currency1OnChange={this.currency1OnChange}
        currency2OnChange={this.currency2OnChange}
        dealtCurrencyOnChange={this.dealtCurrencyOnChange}
        currencies={this.props.currencies}
        baseCurrencies={this.getBaseCurrencies()}
        counterCurrencies={this.getCounterCurrencies()}
        form={this.props.form}
        dealtCurrencies={this.state.dealtCurrencies}
        isLoading={this.state.isLoading}
      />
    );
  }
}

CurrencyPairContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  testId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  userActions: PropTypes.shape().isRequired,
  userInterface: PropTypes.shape().isRequired,
  onChangeAfterEffects: PropTypes.func,
  currencyActions: PropTypes.shape().isRequired,
  dealType: PropTypes.string.isRequired,
  calulateInterest: PropTypes.func,
  ratesFeed: PropTypes.bool.isRequired,
  isTradeDateEnabled: PropTypes.bool.isRequired,
  isClsDefaultsEnabled: PropTypes.bool.isRequired,
  isClsOverride: PropTypes.bool.isRequired,
  toggleIsClsOverride: PropTypes.func.isRequired,
};

CurrencyPairContainer.defaultProps = {
  onChangeAfterEffects: () => { },
  calulateInterest: () => { },
};

const mapStateToProps = (state) => ({
  currencies: getCurrencies(state),
  userInterface: getUi(state),
  ratesFeed: getUserPreferenceSettingsRatesFeed(state),
  isClsDefaultsEnabled: getUserPreferenceSettingsClsDefaults(state),
  isTradeDateEnabled: getIsTradeDateEnabled(state),
  isClsOverride: getIsClsOverride(state),
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch),
  currencyActions: bindActionCreators(currencyActions, dispatch),
  toggleIsClsOverride: bindActionCreators(toggleIsClsOverride, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPairContainer);
