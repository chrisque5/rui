import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Form, Button, Row, Col, Divider,
} from 'antd';
import * as dealActions from '../../../actions/dealActions';
import * as rateActions from '../../../actions/rateActions';
import * as uiActions from '../../../actions/uiActions';
import * as userActions from '../../../actions/userActions';
import * as dateActions from '../../../actions/dateActions';
import * as currencyActions from '../../../actions/currencyActions';
import * as clientActions from '../../../actions/clientActions';
import * as brokerActions from '../../../actions/brokerActions';
import * as agentActions from '../../../actions/agentActions';
import * as executionVenueActions from '../../../actions/executionVenueActions';
import {
  ids, strategies, dealTypes, strategyOptions, navMenuItems, actionTypes,
} from '../../../utils/constants';
import TradeCapture from '../TradeCapture';
import Strategy from '../../Strategy/Strategy';
import ExecutionVenueContainer from '../../ExecutionVenue/ExecutionVenueContainer';
import ForwardTradeEconomicsContainer from '../../TradeEconomics/FWD/ForwardTradeEconomics/ForwardTradeEconomicsContainer';
import OutrightTradeSides from '../../TradeSides/OutrightTradeSide/OutrightTradeSides';
import { showErrorNotification, showWarningNotification } from '../../../utils/notifications';
import FwdOutrightTradeEconomicsContainer from '../../TradeEconomics/FWD/OutrightTradeEconomics/FwdOutrightTradeEconomicsContainer';
import BrokersTabContainer from '../../BrokersTab/BrokersTabContainer';
import VolumeMatch from '../../VolumeMatch/VolumeMatch';
import TradeDateContainer from '../../TradeDate/TradeDateContainer';
import TurnTrade from '../../TurnTrade/TurnTrade';
import { findCurrencyPair } from '../../../utils/helper';

class FwdTradeCaptureContainer extends Component {
  form = createRef();

  componentDidMount = () => {
    this.props.uiActions.changeDealType(dealTypes.FWD);
    const defaults = this.props.user.preferences.defaults;
    this.props.setDefaults(defaults, dealTypes.FWD);
    this.props.uiActions.changePage(navMenuItems.FWD.key);
  };

  componentWillUnmount = () => {
    this.props.resetForm();
    this.props.uiActions.changePage('');
    this.props.currencyActions.resetCurrencies();
    this.props.clientActions.resetClientData();
    this.props.brokerActions.resetBrokerData();
    this.props.agentActions.resetAgentData();
    this.props.executionVenueActions.resetExecutionVenues();
  };

  submitValidDeal = (result) => {
    const deal = { ...result.deal };
    const currencyPair = findCurrencyPair(deal.currency1, deal.currency2, this.props.currencies);

    if (deal.strategy === strategies.FWD.FORWARD || deal.strategy === strategies.FWD.FORWARD_FORWARD) {
      deal.tradeDuration = this.props.dates.tradeDuration;
    } else if (deal.strategy === strategies.FWD.OUTRIGHT) {
      deal.durationSpotToEnd = this.props.dates.durationSpotToEnd;
    }

    this.props.submitDeal({
      ...deal,
      currencyPair,
      dealType: dealTypes.FWD,
      spotDate: this.props.dates.spotDate,
    });
  };

  submitDealWithCustomDate = () => {
    this.props.validateDeal().then((result) => {
      if (result.valid) {
        this.submitValidDeal(result);
      } else {
        showErrorNotification('Validation Error', result.error);
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.validateDeal().then((result) => {
      if (result.valid) {
        if (this.form.current.getFieldValue(ids.IS_TRADE_DATE_ENABLED)) {
          this.props.uiActions.toggleTradeDateSubmitPopup(true);
          return;
        }

        this.submitValidDeal(result);
      } else {
        showErrorNotification('Validation Error', result.error);
      }
    });
  };

  setFwdDates = (strategy, term, tradeDate, instrumentId) => {
    let nearTerm;
    let farTerm;

    if (strategy === strategies.FWD.FORWARD) {
      if (['ON', 'TN', 'SN'].includes(term)) {
        nearTerm = this.form.current.getFieldValue(ids.TERM_1);
      }
      farTerm = this.form.current.getFieldValue(ids.TERM_1) || '0D';
    } else if (strategy === strategies.FWD.FORWARD_FORWARD) {
      nearTerm = this.form.current.getFieldValue(ids.TERM_1) || '0D';
      farTerm = this.form.current.getFieldValue(ids.TERM_2) || '0D';
    }

    return this.props.dateActions.getFwdDatesByTerm(nearTerm, farTerm, tradeDate, instrumentId)
      .then((result) => {
        if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
          if (result.error) {
            this.props.dateActions.resetDates();
            throw Error(result.error.message || result.error.statusText);
          }
          throw new Error();
        }

        if (strategy === strategies.FWD.FORWARD && term === 'ON' && !this.props.dates.isTodayValidDate) {
          showWarningNotification('Date Warning', 'Today is not a valid business day.');
        }

        if ((strategy === strategies.FWD.FORWARD && this.props.isTermSame(farTerm))
        || (strategy === strategies.FWD.FORWARD_FORWARD && this.props.isTermSame(nearTerm, farTerm))) {
          this.form.current.setFieldsValue({
            [ids.VALUE_DATE_1]: this.props.dates.valueDate.near,
            [ids.VALUE_DATE_2]: this.props.dates.valueDate.far,
            [ids.DAY_COUNT_1]: this.props.dates.dayCount.near,
            [ids.DAY_COUNT_2]: this.props.dates.dayCount.far,
          });
        }
      })
      .catch((e) => {
        if (e.message) {
          showErrorNotification('Date Error', e.message);
        }
      });
  };

  setFwdOutrightDates = (term, tradeDate, instrumentId) => (
    this.props.dateActions.getFwdOutrightDatesByTerm(term, tradeDate, instrumentId)
      .then((result) => {
        if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
          if (result.error) {
            this.props.dateActions.resetDates();
            throw Error(result.error.message || result.error.statusText);
          }
          throw new Error();
        }

        if (this.props.isTermSame(term)) {
          this.form.current.setFieldsValue({
            [ids.VALUE_DATE_1]: this.props.dates.valueDate,
            [ids.DAY_COUNT_1]: this.props.dates.dayCount,
          });
        }
      })
      .catch((e) => {
        if (e.message) {
          showErrorNotification('Date Error', e.message);
        }
      })
  );

  setDates = (term, instrumentId) => {
    if (term && instrumentId) {
      const strategy = this.form.current.getFieldValue(ids.STRATEGY);
      const tradeDate = this.form.current.getFieldValue(ids.TRADE_DATE) || null;

      switch (strategy) {
        case strategies.FWD.FORWARD:
        case strategies.FWD.FORWARD_FORWARD:
          return this.setFwdDates(strategy, term, tradeDate, instrumentId);
        case strategies.FWD.OUTRIGHT:
          return this.setFwdOutrightDates(term, tradeDate, instrumentId);
        default:
          showErrorNotification('Date Error', 'Date calc called with unsupported strategy type.');
          break;
      }
    }
    return null;
  };

  showTradeEconomics = () => {
    if (this.form.current) {
      const strategy = this.form.current.getFieldValue(ids.STRATEGY);
      switch (strategy) {
        case strategies.FWD.FORWARD:
        case strategies.FWD.FORWARD_FORWARD:
          return (
            <ForwardTradeEconomicsContainer
              form={this.form.current}
              strategy={strategy}
              setDates={this.setDates}
            />
          );
        case strategies.FWD.OUTRIGHT:
          return (
            <FwdOutrightTradeEconomicsContainer
              form={this.form.current}
              strategy={strategy}
              setDates={this.setDates}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };

  showTradeSides = (strategy) => {
    if (this.form.current) {
      switch (strategy) {
        case strategies.FWD.FORWARD:
        case strategies.FWD.FORWARD_FORWARD:
        case strategies.FWD.OUTRIGHT:
          return (
            <OutrightTradeSides form={this.form.current} dealType={dealTypes.FWD} />
          );
        default:
          return null;
      }
    }
    return null;
  };

  onStrategyChangeAfterEffects = () => {
    this.props.resetForm();
    const defaults = this.props.user.preferences.defaults;
    this.props.setDefaults(defaults, dealTypes.FWD);
  };

  tradeDateOnChange = async (value, id) => {
    const currency1Value = this.form.current.getFieldValue(ids.CURRENCY_1);
    const currency2Value = this.form.current.getFieldValue(ids.CURRENCY_2);

    const { instrumentId } = this.props.currencies.find((currency) => (
      currency.baseCurrency === currency1Value && currency.counterCurrency === currency2Value)) || {};

    if (instrumentId) {
      // set the trade date explicitly since antd doesn't set the value on change yet
      this.form.current.setFieldsValue({ [id]: value });

      const terms = {};
      terms.term1 = this.form.current.getFieldValue(ids.TERM_1) ? this.form.current.getFieldValue(ids.TERM_1) : '0D';
      if (this.form.current.getFieldInstance(ids.TERM_2)) {
        terms.term2 = this.form.current.getFieldValue(ids.TERM_2) ? this.form.current.getFieldValue(ids.TERM_2) : '0D';
      }

      await this.setDates(terms.term1, instrumentId, ids.TERM_1);
      if (terms.term2) {
        this.setDates(terms.term2, instrumentId, ids.TERM_2);
      }
    }
  };

  render() {
    const selectedStrategy = this.form.current ? this.form.current.getFieldValue(ids.STRATEGY) : strategies.FWD.FORWARD;
    const defaults = this.props.getDefaultsForDeal(dealTypes.FWD, this.props.user.preferences.defaults);
    return (
      <div className="dms-trade-capture">
        <Form
          hideRequiredMark
          ref={this.form}
          initialValues={{
            [ids.STRATEGY]: (strategyOptions.FWD)[0].name,
            [ids.CURRENCY_1]: defaults.baseCurrency,
            [ids.CURRENCY_2]: defaults.counterCurrency,
            [ids.DEALT_CURRENCY]: defaults.dealtCurrency,
            [ids.EXECUTION_VENUE]: defaults.executionVenue,
          }}
        >
          {
            this.form.current
              && (
                <>
                  <BrokersTabContainer form={this.form.current} />
                  <Row type="flex" className="strategy-venue">
                    <Col span={8}>
                      <Strategy form={this.form.current} options={strategyOptions.FWD} onChangeAfterEffects={this.onStrategyChangeAfterEffects} />
                    </Col>
                    <Col span={6}>
                      <Row className="trade-date">
                        <TradeDateContainer
                          form={this.form.current}
                          tradeDateOnChange={this.tradeDateOnChange}
                          submitDealWithCustomDate={this.submitDealWithCustomDate}
                        />
                      </Row>
                    </Col>
                    <Col span={3}>
                      <VolumeMatch id={ids.VOLUME_MATCH} form={this.form.current} label="Volume Match" />
                    </Col>
                    <Col span={3}>
                      {
                selectedStrategy !== strategies.FWD.OUTRIGHT
                && <TurnTrade id={ids.TURN_TRADE} form={this.form.current} label="Turn Trade" />
              }
                    </Col>
                    <Col span={4}>
                      <ExecutionVenueContainer form={this.form.current} dealType={dealTypes.FWD} />
                    </Col>
                  </Row>

                  <Divider style={{ marginTop: 2, marginBottom: 2 }} />

                  <div className="trade-economics">{this.showTradeEconomics()}</div>
                  <div className="trade-sides">{this.showTradeSides(selectedStrategy)}</div>
                </>
              )
          }
          <Row type="flex" justify="end" className="action-buttons">
            <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues[ids.EXECUTION_VENUE] !== currentValues[ids.EXECUTION_VENUE]}>
              {() => (
                <>
                  <Button style={{ marginRight: 3 }} data-testid="btnReset" id="reset" onClick={this.props.resetForm}>Reset</Button>
                  {' '}
                  <Button
                    style={this.props.getSubmitButtonStyle()}
                    htmlType="button"
                    disabled={this.props.isSubmitButtonDisabled()}
                    loading={this.props.isSubmitInProgress}
                    onClick={this.handleSubmit}
                    type="primary"
                    data-testid="btnSubmit"
                    id="submit"
                  >
                    {this.props.getSubmitButtonStyle().btnText}
                  </Button>
                </>
              )}
            </Form.Item>
          </Row>
        </Form>
      </div>
    );
  }
}

FwdTradeCaptureContainer.propTypes = {
  dates: PropTypes.shape().isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  uiActions: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  resetForm: PropTypes.func.isRequired,
  setDefaults: PropTypes.func.isRequired,
  validateDeal: PropTypes.func.isRequired,
  submitDeal: PropTypes.func.isRequired,
  isSubmitInProgress: PropTypes.bool.isRequired,
  isSubmitButtonDisabled: PropTypes.func.isRequired,
  getSubmitButtonStyle: PropTypes.func.isRequired,
  dateActions: PropTypes.shape().isRequired,
  getDefaultsForDeal: PropTypes.func.isRequired,
  currencyActions: PropTypes.shape().isRequired,
  clientActions: PropTypes.shape().isRequired,
  brokerActions: PropTypes.shape().isRequired,
  agentActions: PropTypes.shape().isRequired,
  executionVenueActions: PropTypes.shape().isRequired,
  isTermSame: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  dates, deal, rates, user,
}) => ({
  dates,
  deal,
  rates,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  dealActions: bindActionCreators(dealActions, dispatch),
  rateActions: bindActionCreators(rateActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  dateActions: bindActionCreators(dateActions, dispatch),
  currencyActions: bindActionCreators(currencyActions, dispatch),
  clientActions: bindActionCreators(clientActions, dispatch),
  brokerActions: bindActionCreators(brokerActions, dispatch),
  agentActions: bindActionCreators(agentActions, dispatch),
  executionVenueActions: bindActionCreators(executionVenueActions, dispatch),
});

const WrappedComponent = TradeCapture(FwdTradeCaptureContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
