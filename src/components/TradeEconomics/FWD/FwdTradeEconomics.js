import { Component } from 'react';
import PropTypes from 'prop-types';
import * as math from 'mathjs';
import _ from 'lodash';
import moment from 'moment';
import {
  ids, strategies, MAX_LIMITS, actionTypes,
} from '../../../utils/constants';
import { parseValueAsBigNumber } from '../../../utils/helper';
import * as notification from '../../../utils/notifications';

const FwdTradeEconomics = (WrappedComponent) => {
  class HOC extends Component {
    termOnBlur = (term, termId) => {
      const currency1 = this.props.form.getFieldValue(ids.CURRENCY_1);
      const currency2 = this.props.form.getFieldValue(ids.CURRENCY_2);

      if (termId && currency1 && currency2) {
        const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });
        const instrumentId = currencyPair ? currencyPair.instrumentId : null;
        if (this.props.userInterface.termValues[termId] !== term && instrumentId) {
          this.props.setDates(term, instrumentId, termId).then(() => {
            this.setRates();
            this.calulateInterest();
          });
        }
      }
    };

    currencyOnChange = (currency2) => {
      const currency1Value = this.props.form.getFieldValue(ids.CURRENCY_1);
      if (currency1Value) {
        const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1Value, counterCurrency: currency2 });
        const instrumentId = currencyPair ? currencyPair.instrumentId : null;
        const terms = {};
        terms.term1 = this.props.form.getFieldValue(ids.TERM_1) ? this.props.form.getFieldValue(ids.TERM_1) : '0D';
        if (this.props.form.getFieldInstance(ids.TERM_2)) {
          terms.term2 = this.props.form.getFieldValue(ids.TERM_2) ? this.props.form.getFieldValue(ids.TERM_2) : '0D';
        }

        this.props.setDates(terms.term1, instrumentId, ids.TERM_1)
          .then(() => {
            if (terms.term2) {
              this.props.setDates(terms.term2, instrumentId, ids.TERM_2).then(() => {
                this.setRates();
                this.calulateInterest();
              });
            } else {
              this.setRates();
              this.calulateInterest();
            }
          });
      }
    };

    isValueDateWeekend = (valueDate) => {
      let isWeekend = false;
      if ([0, 6].includes(valueDate.day())) {
        notification.showWarningNotification(
          'Date warning',
          'Date entered is a non-working day. Manually update the dates.',
        );
        this.props.form.resetFields([
          ids.RATE_1,
          ids.RATE_2,
          ids.POINTS,
        ]);
        isWeekend = true;
      }
      return isWeekend;
    }

    setFwdTermsAndDayCounts = (valueDate, valueDateId, instrumentId) => {
      if (valueDate && valueDateId) {
        const nearValueDate = valueDateId === ids.VALUE_DATE_1 ? valueDate : this.props.form.getFieldValue(ids.VALUE_DATE_1);
        const farValueDate = valueDateId === ids.VALUE_DATE_2 ? valueDate : this.props.form.getFieldValue(ids.VALUE_DATE_2);
        const tradeDate = this.props.form.getFieldValue(ids.TRADE_DATE) || null;
        const strategy = this.props.form.getFieldValue(ids.STRATEGY);

        this.props.dateActions.getFwdTermsByValueDate(nearValueDate, farValueDate, tradeDate, instrumentId)
          .then((result) => {
            if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
              if (result.error) {
                this.props.dateActions.resetDates();
                throw Error(result.error.message || result.error.statusText);
              }
              throw new Error();
            }

            if (strategy === strategies.FWD.FORWARD) {
              this.props.form.setFieldsValue({
                [ids.DAY_COUNT_1]: this.props.dates.dayCount.near,
                [ids.DAY_COUNT_2]: this.props.dates.dayCount.far,
                [ids.TERM_1]: this.props.dates.term.far,
              });

              this.props.uiActions.changeTermValues({ [ids.TERM_1]: this.props.dates.term.far });
            } else if (strategy === strategies.FWD.FORWARD_FORWARD) {
              this.props.form.setFieldsValue({
                [ids.DAY_COUNT_1]: this.props.dates.dayCount.near,
                [ids.DAY_COUNT_2]: this.props.dates.dayCount.far,
                [ids.TERM_1]: this.props.dates.term.near,
                [ids.TERM_2]: this.props.dates.term.far,
              });

              this.props.uiActions.changeTermValues({
                [ids.TERM_1]: this.props.dates.term.near,
                [ids.TERM_2]: this.props.dates.term.far,
              });
            }
          })
          .then(() => {
            if (!this.isValueDateWeekend(valueDate)) {
              this.setRates();
              this.calulateInterest();
            }
          })
          .catch((e) => {
            if (e.message) {
              notification.showErrorNotification('Date Error', e.message);
            }
          });
      }
    };

    setFwdOutrightTermAndDayCount = (valueDate, instrumentId) => {
      if (valueDate) {
        const tradeDate = this.props.form.getFieldValue(ids.TRADE_DATE) || null;

        this.props.dateActions.getFwdOutrightTermByValueDate(valueDate, tradeDate, instrumentId)
          .then((result) => {
            if (result.type === actionTypes.LOAD_DATES_CANCELLED || result.type === actionTypes.LOAD_DATES_FAILED) {
              if (result.error) {
                this.props.dateActions.resetDates();
                throw Error(result.error.message || result.error.statusText);
              }
              throw new Error();
            }

            this.props.form.setFieldsValue({
              [ids.DAY_COUNT_1]: this.props.dates.dayCount,
              [ids.TERM_1]: this.props.dates.term,
            });

            this.props.uiActions.changeTermValues({ [ids.TERM_1]: this.props.dates.term });
          })
          .then(() => {
            if (!this.isValueDateWeekend(valueDate)) {
              this.setRates();
            }
          })
          .catch((e) => {
            if (e.message) {
              notification.showErrorNotification('Date Error', e.message);
            }
          });
      }
    };

    valueDateOnChange = (valueDate, valueDateId) => {
      if (valueDate && valueDateId) {
        const currency1 = this.props.form.getFieldValue(ids.CURRENCY_1);
        const currency2 = this.props.form.getFieldValue(ids.CURRENCY_2);
        const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });
        const instrumentId = currencyPair ? currencyPair.instrumentId : null;

        if (instrumentId) {
          const strategy = this.props.form.getFieldValue(ids.STRATEGY);

          switch (strategy) {
            case strategies.FWD.FORWARD:
            case strategies.FWD.FORWARD_FORWARD:
              this.setFwdTermsAndDayCounts(valueDate, valueDateId, instrumentId);
              break;
            case strategies.FWD.OUTRIGHT:
              this.setFwdOutrightTermAndDayCount(valueDate, instrumentId);
              break;
            default:
              notification.showErrorNotification('Date Error', 'Date calc called with unsupported strategy type.');
              break;
          }
        }
      }
    };

    calulateInterest = () => {
      const interest = this.props.form.getFieldValue(`${ids.INTEREST}`);
      let amount1 = this.props.form.getFieldValue(`${ids.AMOUNT_1}`);
      if (amount1) {
        amount1 = Number(amount1.replace(/(,*)/g, ''));
      }
      const nearNotional = math.number(parseValueAsBigNumber(amount1));
      const tradeDayCount = this.props.form.getFieldValue(`${ids.DAY_COUNT_2}`);
      const currency1 = this.props.form.getFieldValue(ids.CURRENCY_1);
      const currency2 = this.props.form.getFieldValue(ids.CURRENCY_2);
      const dealtCcy = this.props.form.getFieldValue(ids.DEALT_CURRENCY);
      const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });

      let ccyDayCount = parseInt((dealtCcy === currency1 ? currencyPair.baseCurrencyDayCountYear : currencyPair.counterCurrencyDayCountYear), 10);
      ccyDayCount = (ccyDayCount === 360 || ccyDayCount === 365) ? ccyDayCount : 360;
      let farNotional = 0;

      if (nearNotional && (interest >= 0) && tradeDayCount) {
        farNotional = nearNotional + (nearNotional * (interest / 100) * (tradeDayCount / ccyDayCount));
        farNotional = Number(farNotional.toFixed(MAX_LIMITS.FWD.AMOUNT.PRECISION)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.props.form.setFieldsValue({ [ids.AMOUNT_2]: farNotional });
        this.props.form.validateFields([ids.AMOUNT_2]);
      }

      if (!interest && this.props.userInterface.isInterestEnabled) {
        this.calulateInterestRate();
      }
    };

    calulateInterestRate = () => {
      let nearNotional = this.props.form.getFieldValue(`${ids.AMOUNT_1}`);
      if (nearNotional) {
        nearNotional = Number(nearNotional.replace(/(,*)/g, ''));
      }
      let farNotional = this.props.form.getFieldValue(`${ids.AMOUNT_2}`);
      if (farNotional) {
        farNotional = Number(farNotional.replace(/(,*)/g, ''));
      }

      const tradeDayCount = this.props.form.getFieldValue(`${ids.DAY_COUNT_2}`);
      const currency1 = this.props.form.getFieldValue(ids.CURRENCY_1);
      const currency2 = this.props.form.getFieldValue(ids.CURRENCY_2);
      const dealtCcy = this.props.form.getFieldValue(ids.DEALT_CURRENCY);
      const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });
      if (currencyPair) {
        let ccyDayCount = parseInt((dealtCcy === currency1 ? currencyPair.baseCurrencyDayCountYear : currencyPair.counterCurrencyDayCountYear), 10);
        ccyDayCount = (ccyDayCount === 360 || ccyDayCount === 365) ? ccyDayCount : 360;

        const period = tradeDayCount / ccyDayCount;

        if (nearNotional && farNotional && (nearNotional !== farNotional) && tradeDayCount) {
          const interest = farNotional - nearNotional;
          const interestRate = ((interest / (nearNotional * period)) * 100).toFixed(MAX_LIMITS.FWD.INTEREST.PRECISION);
          this.props.form.setFieldsValue({ [ids.INTEREST]: interestRate });
        }
      }
    };

    setRates = () => {
      if (this.props.user.preferences.settings && this.props.user.preferences.settings.ratesFeed === false) return null;

      if (this.props.form.getFieldValue(ids.IS_TRADE_DATE_ENABLED)) {
        return null;
      }

      const selectedStrategy = this.props.form.getFieldValue(ids.STRATEGY);
      let scalingFactor = 1;
      const term1 = this.props.form.getFieldValue(ids.TERM_1);
      const term2 = this.props.form.getFieldValue(ids.TERM_2);
      const valueDate1 = this.props.form.getFieldValue(ids.VALUE_DATE_1);
      const valueDate2 = this.props.form.getFieldValue(ids.VALUE_DATE_2);
      const currency1 = this.props.form.getFieldValue(ids.CURRENCY_1);
      const currency2 = this.props.form.getFieldValue(ids.CURRENCY_2);
      const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });
      if (currencyPair) {
        scalingFactor = currencyPair.scalingFactor > 0 ? currencyPair.scalingFactor : 1;
      }

      if ((selectedStrategy === strategies.FWD.FORWARD) && (['ON'].includes(term1)) && !this.props.dates.isTodayValidDate) {
        this.props.form.resetFields([ids.RATE_1, ids.RATE_2, ids.POINTS]);
        return null;
      }

      const startDate = (term1 === 'ON') ? moment() : this.props.dates.spotDate;

      switch (selectedStrategy) {
        case strategies.FWD.OUTRIGHT:
          if (term1 && valueDate1) {
            this.props.form.setFieldsValue({ [ids.RATE_1]: null });
            return this.props.rateActions.getRate(currency1, currency2, term1, valueDate1, 'FWD', startDate)
              .then((result) => {
                if (result && result.rates) {
                  if (result.rates.rate && result.rates.rate > -1) {
                    this.props.form.setFieldsValue({ [ids.RATE_1]: this.props.rates.rate });
                  } else if (result.rates.statusCode === 100) {
                    this.props.form.setFieldsValue({ [ids.RATE_1]: '' });
                  } else if (result.rates.rate < 0 || result.rates.statusCode !== 0) {
                    throw new TypeError(result.rates.statusText);
                  }
                }
              }).catch((err) => notification.showWarningNotification('Rate Error', (`${err.message || err.statusText}`)));
          }
          break;
        case strategies.FWD.FORWARD:
          if (term1 && valueDate1 && valueDate2) {
            this.props.form.setFieldsValue({ [ids.RATE_1]: '', [ids.RATE_2]: '', [ids.POINTS]: '' });
            this.props.rateActions.getSpreadRate(currency1, currency2, term1, term1, valueDate1, valueDate2, 'FWD', startDate)
              .then((result) => {
                if (result && result.rates) {
                  if (result.rates.statusCode === 0) {
                    this.props.form.setFieldsValue({ [ids.RATE_1]: this.props.rates.rate });
                    this.props.form.setFieldsValue({ [ids.RATE_2]: this.props.rates.rate2 });
                    this.props.form.setFieldsValue({
                      [ids.POINTS]:
                        ((math.subtract(this.props.rates.rate2, this.props.rates.rate)) / scalingFactor).toPrecision(MAX_LIMITS.FWD.POINTS.PRECISION),
                    });
                  } else if (result.rates.statusCode === 100) {
                    this.props.form.setFieldsValue({ [ids.RATE_1]: '' });
                    this.props.form.setFieldsValue({ [ids.POINTS]: '' });
                    this.props.form.setFieldsValue({ [ids.RATE_2]: '' });
                  } else if (result.rates.rate < 0 || result.rates.statusCode !== 0) {
                    throw new TypeError(result.rates.statusText);
                  }
                }
              }).catch((err) => {
                notification.showWarningNotification(
                  'Rate Error',
                  `${err.message}`,
                );
              });
          }
          break;
        case strategies.FWD.FORWARD_FORWARD:
          if (term1 && valueDate1 && term2 && valueDate2) {
            this.props.form.setFieldsValue({ [ids.RATE_1]: '', [ids.RATE_2]: '', [ids.POINTS]: '' });
            this.props.rateActions.getSpreadRate(currency1, currency2, term1, term2, valueDate1, valueDate2, 'FWD', startDate)
              .then((result) => {
                if (result && result.rates) {
                  if (result.rates.statusCode === 0) {
                    this.props.form.setFieldsValue({ [ids.RATE_1]: this.props.rates.rate });
                    this.props.form.setFieldsValue({ [ids.RATE_2]: this.props.rates.rate2 });
                    this.props.form.setFieldsValue({
                      [ids.POINTS]:
                        ((math.subtract(this.props.rates.rate2, this.props.rates.rate)) / scalingFactor).toPrecision(MAX_LIMITS.FWD.POINTS.PRECISION),
                    });
                  } else if (result.rates.statusCode === 100) {
                    this.props.form.setFieldsValue({ [ids.RATE_1]: '' });
                    this.props.form.setFieldsValue({ [ids.POINTS]: '' });
                    this.props.form.setFieldsValue({ [ids.RATE_2]: '' });
                  } else if (result.rates.rate < 0 || result.rates.statusCode !== 0) {
                    throw new TypeError(result.rates.statusText);
                  }
                }
              }).catch((err) => {
                notification.showWarningNotification(
                  'Rate Error',
                  `${err.message}`,
                );
              });
          }
          break;
        default:
          throw Error('Could not get rate for strategy.');
      }
      return null;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          termOnBlur={this.termOnBlur}
          currencyOnChange={this.currencyOnChange}
          valueDateOnChange={this.valueDateOnChange}
          calulateInterest={this.calulateInterest}
          calulateInterestRate={this.calulateInterestRate}
        />
      );
    }
  }

  HOC.propTypes = {
    form: PropTypes.shape().isRequired,
    currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    uiActions: PropTypes.shape().isRequired,
    dateActions: PropTypes.shape().isRequired,
    rateActions: PropTypes.shape().isRequired,
    userInterface: PropTypes.shape().isRequired,
    dates: PropTypes.shape().isRequired,
    rates: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
    setDates: PropTypes.func.isRequired,
  };

  return HOC;
};

export default FwdTradeEconomics;
