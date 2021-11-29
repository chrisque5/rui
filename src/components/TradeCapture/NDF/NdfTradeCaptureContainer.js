import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Form, Button, Row, Col, Divider,
} from 'antd';
import * as math from 'mathjs';
import moment from 'moment';
import BrokerageStrategy from 'components/BrokerageStrategy/BrokerageStrategy';
import * as dateActions from '../../../actions/dateActions';
import * as rateActions from '../../../actions/rateActions';
import * as uiActions from '../../../actions/uiActions';
import * as userActions from '../../../actions/userActions';
import * as currencyActions from '../../../actions/currencyActions';
import * as clientActions from '../../../actions/clientActions';
import * as brokerActions from '../../../actions/brokerActions';
import * as agentActions from '../../../actions/agentActions';
import * as executionVenueActions from '../../../actions/executionVenueActions';
import {
  dealTypes, ids, navMenuItems, strategies, strategyOptions, actionTypes,
} from '../../../utils/constants';
import Strategy from '../../Strategy/Strategy';
import ExecutionVenueContainer from '../../ExecutionVenue/ExecutionVenueContainer';
import OutrightTradeEconomics from '../../TradeEconomics/NDF/OutrightTradeEconomics/OutrightTradeEconomics';
import SpreadTradeEconomicsContainer from '../../TradeEconomics/NDF/SpreadTradeEconomics/SpreadTradeEconomicsContainer';
import SpreadTradeSides from '../../TradeSides/SpreadTradeSide/SpreadTradeSides';
import OutrightTradeSides from '../../TradeSides/OutrightTradeSide/OutrightTradeSides';
import TradeCapture from '../TradeCapture';
import BrokersTabContainer from '../../BrokersTab/BrokersTabContainer';
import VolumeMatch from '../../VolumeMatch/VolumeMatch';
import { findCurrencyPair } from '../../../utils/helper';
import TradeDateContainer from '../../TradeDate/TradeDateContainer';
import * as notification from '../../../utils/notifications';

class NdfTradeCaptureContainer extends Component {
  form = createRef();

  componentDidMount = () => {
    this.props.uiActions.changeDealType(dealTypes.NDF);
    const defaults = this.props.user.preferences.defaults;
    this.props.setDefaults(defaults, dealTypes.NDF);
    this.props.uiActions.changePage(navMenuItems.NDF.key);
  }

  componentWillUnmount = () => {
    this.props.resetForm();
    this.props.uiActions.changePage('');
    this.props.currencyActions.resetCurrencies();
    this.props.clientActions.resetClientData();
    this.props.brokerActions.resetBrokerData();
    this.props.agentActions.resetAgentData();
    this.props.executionVenueActions.resetExecutionVenues();
  }

  isValidValueDate = (requestValueDate, responseValueDate, dayCountFromSpot) => (
    moment(requestValueDate).isSame(moment(responseValueDate), 'day')
    && dayCountFromSpot >= 0
  )

  handleInvalidValueDate = () => {
    notification.showWarningNotification(
      'Date Warning',
      'Value Date is a non-working day or before Spot Date. Manually update all other dates and rate.',
    );
  }

  termOnBlur = (term, termId) => {
    const currency1 = this.form.current.getFieldValue(ids.CURRENCY_1);
    const currency2 = this.form.current.getFieldValue(ids.CURRENCY_2);

    if (termId && currency1 && currency2) {
      if (this.props.userInterface.termValues[termId] !== term) {
        this.setDates(currency1, currency2);
      }
    }
  }

  currencyOnChange = () => {
    const currency1 = this.form.current.getFieldValue(ids.CURRENCY_1);
    const currency2 = this.form.current.getFieldValue(ids.CURRENCY_2);

    if (currency1 && currency2) { this.setDates(currency1, currency2); }
  }

  tradeDateOnChange = (value, id) => {
    const currency1 = this.form.current.getFieldValue(ids.CURRENCY_1);
    const currency2 = this.form.current.getFieldValue(ids.CURRENCY_2);

    // set the trade date explicitly since antd doesn't set the value on change yet
    this.form.current.setFieldsValue({ [id]: value });

    if (currency1 && currency2) { this.setDates(currency1, currency2); }
  }

  setOutrightTerm = (instrumentId, tradeDate, valueDate1) => {
    this.props.dateActions.getNdfOutrightDatesByValueDate(valueDate1, instrumentId, tradeDate)
      .then((result) => {
        if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
          if (result.error) {
            this.props.dateActions.resetDates();
            throw Error(result.error.message || result.error.statusText);
          }
          throw new Error();
        }

        const {
          term, dayCount, fixingDate, publishDate, valueDate,
        } = this.props.dates;

        const term1 = dayCount >= 0 ? term : '0D';
        const dayCount1 = dayCount >= 0 ? dayCount : 0;

        this.form.current.setFieldsValue({ term1, dayCount1 });
        this.props.uiActions.changeTermValues({ term1 });

        const isValidDate = this.isValidValueDate(valueDate1, valueDate, dayCount);

        if (isValidDate) {
          this.form.current.setFieldsValue({
            [ids.FIXING_DATE_1]: fixingDate,
            [ids.PUBLISH_DATE_1]: publishDate,
          });
          this.setRates();
        } else {
          this.form.current.resetFields([ids.RATE_1]);
          this.handleInvalidValueDate();
        }
      })
      .catch((e) => {
        if (e.message) {
          notification.showErrorNotification('Date Error', e.message);
        }
      });
  }

  setSpreadTerm = (instrumentId, tradeDate, valueDateId) => {
    const valueDate1 = this.form.current.getFieldValue(ids.VALUE_DATE_1);
    const valueDate2 = this.form.current.getFieldValue(ids.VALUE_DATE_2);
    let isTreatedAsTom = false;

    if (valueDateId === ids.VALUE_DATE_2) {
      isTreatedAsTom = this.form.current.getFieldValue(ids.TERM_1) === 'TOM';
    }

    this.props.dateActions.getNdfSpreadDatesByValueDate(valueDate1, valueDate2, instrumentId, tradeDate, isTreatedAsTom)
      .then((result) => {
        if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
          if (result.error) {
            this.props.dateActions.resetDates();
            throw Error(result.error.message || result.error.statusText);
          }
          throw new Error();
        }

        const {
          term, dayCount, fixingDate, publishDate, valueDate,
        } = this.props.dates;

        if (valueDateId === ids.VALUE_DATE_1) {
          const term1 = dayCount.near >= 0 ? term.near : '0D';
          const dayCount1 = dayCount.near >= 0 ? dayCount.near : 0;

          this.form.current.setFieldsValue({ term1, dayCount1 });
          this.props.uiActions.changeTermValues({ term1 });

          if (this.isValidValueDate(valueDate1, valueDate.near, dayCount.near)) {
            this.form.current.setFieldsValue({
              [ids.FIXING_DATE_1]: fixingDate.near,
              [ids.PUBLISH_DATE_1]: publishDate.near,
            });
            this.setRates();
          } else {
            this.form.current.resetFields([ids.RATE_1, ids.RATE_2, ids.POINTS]);
            this.handleInvalidValueDate();
          }
        }

        if (valueDateId === ids.VALUE_DATE_2) {
          const term2 = dayCount.far >= 0 ? term.far : '0D';
          const dayCount2 = dayCount.far >= 0 ? dayCount.far : 0;

          this.form.current.setFieldsValue({ term2, dayCount2 });
          this.props.uiActions.changeTermValues({ term2 });

          if (this.isValidValueDate(valueDate2, valueDate.far, dayCount.far)) {
            this.form.current.setFieldsValue({
              [ids.FIXING_DATE_2]: fixingDate.far,
              [ids.PUBLISH_DATE_2]: publishDate.far,
            });
            this.setRates();
          } else {
            this.form.current.resetFields([ids.RATE_1, ids.RATE_2, ids.POINTS]);
            this.handleInvalidValueDate();
          }
        }
      })
      .catch((e) => {
        if (e.message) {
          notification.showErrorNotification('Date Error', e.message);
        }
      });
  }

  valueDateOnChange = (valueDate, valueDateId) => {
    const currency1 = this.form.current.getFieldValue(ids.CURRENCY_1);
    const currency2 = this.form.current.getFieldValue(ids.CURRENCY_2);

    const { instrumentId = null } = findCurrencyPair(currency1, currency2, this.props.currencies) || {};

    if (instrumentId) {
      const { selectedStrategyType } = this.props.userInterface;
      const tradeDate = this.form.current.getFieldValue(ids.TRADE_DATE) || null;

      switch (selectedStrategyType) {
        case strategies.NDF.OUTRIGHT:
          this.setOutrightTerm(instrumentId, tradeDate, valueDate);
          break;
        case strategies.NDF.SPREAD:
          this.setSpreadTerm(instrumentId, tradeDate, valueDateId);
          break;
        default:
          break;
      }
    }
  };

  setOutrightDates = (instrumentId, tradeDate) => {
    const term = this.form.current.getFieldValue(ids.TERM_1) || '0D';

    this.props.dateActions.getNdfOutrightDatesByTerm(term, instrumentId, tradeDate)
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
            [ids.FIXING_DATE_1]: this.props.dates.fixingDate,
            [ids.VALUE_DATE_1]: this.props.dates.valueDate,
            [ids.PUBLISH_DATE_1]: this.props.dates.publishDate,
            [ids.DAY_COUNT_1]: this.props.dates.dayCount,
          });
        }
      })
      .then(() => this.setRates())
      .catch((e) => {
        if (e.message) {
          notification.showErrorNotification('Date Error', e.message);
        }
      });
  };

  setSpreadDates = (instrumentId, tradeDate) => {
    const term1 = this.form.current.getFieldValue(ids.TERM_1) || '0D';
    const term2 = this.form.current.getFieldValue(ids.TERM_2) || '0D';

    if (term1 && term2) {
      this.props.dateActions.getNdfSpreadDatesByTerm(term1, term2, instrumentId, tradeDate)
        .then((result) => {
          if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
            if (result.error) {
              this.props.dateActions.resetDates();
              throw Error(result.error.message || result.error.statusText);
            }
            throw new Error();
          }

          if (this.props.isTermSame(term1, term2)) {
            this.form.current.setFieldsValue({
              [ids.FIXING_DATE_1]: this.props.dates.fixingDate.near,
              [ids.FIXING_DATE_2]: this.props.dates.fixingDate.far,
              [ids.VALUE_DATE_1]: this.props.dates.valueDate.near,
              [ids.VALUE_DATE_2]: this.props.dates.valueDate.far,
              [ids.PUBLISH_DATE_1]: this.props.dates.publishDate.near,
              [ids.PUBLISH_DATE_2]: this.props.dates.publishDate.far,
              [ids.DAY_COUNT_1]: this.props.dates.dayCount.near,
              [ids.DAY_COUNT_2]: this.props.dates.dayCount.far,
            });
          }
        })
        .then(() => this.setRates())
        .catch((e) => {
          if (e.message) {
            notification.showErrorNotification('Date Error', e.message);
          }
        });
    }
  }

  setDates = (currency1, currency2) => {
    const { instrumentId = null } = findCurrencyPair(currency1, currency2, this.props.currencies) || {};

    if (instrumentId) {
      const { selectedStrategyType } = this.props.userInterface;
      const tradeDate = this.form.current.getFieldValue(ids.TRADE_DATE) || null;

      switch (selectedStrategyType) {
        case strategies.NDF.OUTRIGHT:
          this.setOutrightDates(instrumentId, tradeDate);
          break;
        case strategies.NDF.SPREAD:
          this.setSpreadDates(instrumentId, tradeDate);
          break;
        default:
          break;
      }
    }
  };

  setRates = () => {
    if (
      (this.props.user.preferences.settings && this.props.user.preferences.settings.ratesFeed === false)
      || this.form.current.getFieldValue(ids.IS_TRADE_DATE_ENABLED)
    ) { return null; }

    const selectedStrategy = this.form.current.getFieldValue(ids.STRATEGY);
    const term1 = this.form.current.getFieldValue(ids.TERM_1);
    const term2 = this.form.current.getFieldValue(ids.TERM_2);
    const valueDate1 = this.form.current.getFieldValue(ids.VALUE_DATE_1);
    const valueDate2 = this.form.current.getFieldValue(ids.VALUE_DATE_2);
    const currency1 = this.form.current.getFieldValue(ids.CURRENCY_1);
    const currency2 = this.form.current.getFieldValue(ids.CURRENCY_2);

    switch (selectedStrategy) {
      case strategies.NDF.OUTRIGHT:
        if (term1 && valueDate1) {
          this.form.current.setFieldsValue({ [ids.RATE_1]: null });
          return this.props.rateActions.getRate(currency1, currency2, term1, valueDate1, 'NDF')
            .then((result) => {
              if (result && result.rates) {
                if (result.rates.rate && result.rates.rate > -1) {
                  this.form.current.setFieldsValue({ [ids.RATE_1]: this.props.rates.rate });
                } if (result.rates.statusCode === 100) {
                  this.form.current.setFieldsValue({ [ids.RATE_1]: '' });
                } if (result.rates.rate < 0 || result.rates.statusCode !== 0) {
                  throw new TypeError(result.rates.statusText);
                }
              }
            }).catch((err) => notification.showWarningNotification('Rate Error', (`${err.message || err.statusText}`)));
        }
        break;
      case strategies.NDF.SPREAD:
        if (term1 && valueDate1 && term2 && valueDate2) {
          this.form.current.setFieldsValue({ [ids.RATE_1]: '', [ids.RATE_2]: '', [ids.POINTS]: '' });
          this.props.rateActions.getSpreadRate(currency1, currency2, term1, term2, valueDate1, valueDate2, 'NDF')
            .then((result) => {
              if (result && result.rates) {
                if (result.rates.statusCode === 0) {
                  this.form.current.setFieldsValue({ [ids.RATE_1]: this.props.rates.rate });
                  this.form.current.setFieldsValue({ [ids.POINTS]: this.props.rates.points });
                  this.form.current.setFieldsValue({
                    [ids.RATE_2]: math.number(math.add(
                      math.bignumber(this.props.rates.rate),
                      math.bignumber(this.props.rates.points),
                    )),
                  });
                } else if (result.rates.statusCode === 100) {
                  this.form.current.setFieldsValue({ [ids.RATE_1]: '' });
                  this.form.current.setFieldsValue({ [ids.POINTS]: '' });
                  this.form.current.setFieldsValue({ [ids.RATE_2]: '' });
                } else if (result.rates.rate < 0 || result.rates.statusCode !== 0) {
                  throw new TypeError(result.rates.statusText);
                }
              }
            }).catch((err) => notification.showWarningNotification('Rate Warning', (`${err.message || err.statusText}`), 5));
        }
        break;
      default:
        throw Error('Could not get rate for strategy.');
    }
    return null;
  };

  submitValidDeal = ({ deal }) => {
    const currencyPair = findCurrencyPair(deal.currency1, deal.currency2, this.props.currencies);

    this.props.submitDeal({
      ...deal,
      currencyPair,
      dealType: dealTypes.NDF,
      spotDate: this.props.dates.spotDate,
      forwardStart: this.props.dates.forwardStart,
    });
  }

  submitDealWithCustomDate = () => {
    this.props.validateDeal().then((result) => {
      if (result.valid) {
        this.submitValidDeal(result);
      } else {
        notification.showErrorNotification('Validation Error', result.error);
      }
    });
  }

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
        notification.showErrorNotification('Validation Error', result.error);
      }
    });
  }

  showTradeEconomics = () => {
    if (this.form.current) {
      const selectedStrategy = this.form.current.getFieldValue(ids.STRATEGY);
      switch (selectedStrategy) {
        case strategies.NDF.OUTRIGHT:
          return (
            <OutrightTradeEconomics
              form={this.form.current}
              termOnBlur={this.termOnBlur}
              currencyOnChange={this.currencyOnChange}
              valueDateOnChange={this.valueDateOnChange}
            />
          );
        case strategies.NDF.SPREAD:
          return (
            <SpreadTradeEconomicsContainer
              form={this.form.current}
              termOnBlur={this.termOnBlur}
              currencyOnChange={this.currencyOnChange}
              valueDateOnChange={this.valueDateOnChange}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };

  showTradeSides = () => {
    if (this.form.current) {
      const selectedStrategy = this.form.current.getFieldValue(ids.STRATEGY);
      switch (selectedStrategy) {
        case strategies.NDF.OUTRIGHT:
          return (
            <OutrightTradeSides form={this.form.current} dealType={dealTypes.NDF} />
          );
        case strategies.NDF.SPREAD:
          return (
            <SpreadTradeSides form={this.form.current} dealType={dealTypes.NDF} isSubmitInProgress={this.props.isSubmitInProgress} />
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
    this.props.setDefaults(defaults, dealTypes.NDF);
  }

  render() {
    const defaults = this.props.getDefaultsForDeal(dealTypes.NDF, this.props.user.preferences.defaults);
    const selectedStrategy = this.form.current && this.form.current.getFieldValue(ids.STRATEGY);

    return (
      <div className="dms-trade-capture">
        <Form
          hideRequiredMark
          ref={this.form}
          initialValues={{
            [ids.STRATEGY]: (strategyOptions.NDF)[0].name,
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
                  <Col span={4}>
                    <Strategy form={this.form.current} options={strategyOptions.NDF} onChangeAfterEffects={this.onStrategyChangeAfterEffects} />
                  </Col>
                  <Col span={4}>
                    {selectedStrategy === strategies.NDF.SPREAD && <BrokerageStrategy />}
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
                  <Col span={4} offset={3}>
                    <ExecutionVenueContainer form={this.form.current} dealType={dealTypes.NDF} />
                  </Col>

                </Row>
                <Divider style={{ marginTop: 2, marginBottom: 2 }} />

                <div className="trade-economics">{this.showTradeEconomics()}</div>
                <div className="trade-sides">{this.showTradeSides()}</div>
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

NdfTradeCaptureContainer.propTypes = {
  dates: PropTypes.shape().isRequired,
  dateActions: PropTypes.shape().isRequired,
  uiActions: PropTypes.shape().isRequired,
  rates: PropTypes.shape().isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  user: PropTypes.shape().isRequired,
  rateActions: PropTypes.shape().isRequired,
  userInterface: PropTypes.shape().isRequired,
  resetForm: PropTypes.func.isRequired,
  setDefaults: PropTypes.func.isRequired,
  validateDeal: PropTypes.func.isRequired,
  submitDeal: PropTypes.func.isRequired,
  isSubmitInProgress: PropTypes.bool.isRequired,
  isSubmitButtonDisabled: PropTypes.func.isRequired,
  getSubmitButtonStyle: PropTypes.func.isRequired,
  getDefaultsForDeal: PropTypes.func.isRequired,
  currencyActions: PropTypes.shape().isRequired,
  clientActions: PropTypes.shape().isRequired,
  brokerActions: PropTypes.shape().isRequired,
  agentActions: PropTypes.shape().isRequired,
  executionVenueActions: PropTypes.shape().isRequired,
  isTermSame: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  dates, rates, user, currencies, ui,
}) => ({
  currencies,
  dates,
  rates,
  user,
  userInterface: ui,
});

const mapDispatchToProps = (dispatch) => ({
  dateActions: bindActionCreators(dateActions, dispatch),
  rateActions: bindActionCreators(rateActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  currencyActions: bindActionCreators(currencyActions, dispatch),
  clientActions: bindActionCreators(clientActions, dispatch),
  brokerActions: bindActionCreators(brokerActions, dispatch),
  agentActions: bindActionCreators(agentActions, dispatch),
  executionVenueActions: bindActionCreators(executionVenueActions, dispatch),
});

const WrappedComponent = TradeCapture(NdfTradeCaptureContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
