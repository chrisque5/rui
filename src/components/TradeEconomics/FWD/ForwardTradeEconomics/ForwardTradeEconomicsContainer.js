import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as math from 'mathjs';
import TradeEconomics from '../../TradeEconomics';
import FwdTradeEconomics from '../FwdTradeEconomics';
import ForwardTradeEconomics from './ForwardTradeEconomics';
import { ids, strategies, MAX_LIMITS } from '../../../../utils/constants';
import * as dateActions from '../../../../actions/dateActions';
import * as uiActions from '../../../../actions/uiActions';
import * as rateActions from '../../../../actions/rateActions';

class ForwardTradeEconomicsContainer extends Component {
    setDefaultExecutionVenue = () => {
      const term1 = this.props.form.getFieldValue(ids.TERM_1);
      const executionVenues = this.props.form.getFieldInstance(ids.EXECUTION_VENUE).props.children;

      if (this.props.strategy === strategies.FWD.FORWARD) {
        if ((executionVenues.find((i) => i.key === 'XOFF')) && (term1 === 'ON' || term1 === 'TN')) {
          this.props.form.setFieldsValue({
            [ids.EXECUTION_VENUE]: 'XOFF',
          });
        }
      }
    }

    currencyChangeEffects = (currency) => {
      // remove below when FWD tailor rates feed is implemented as it'll override rate2 anyway.
      const currentRate1 = this.props.form.getFieldValue(ids.RATE_1);
      const currentPoints = this.props.form.getFieldValue(ids.POINTS);
      const scalingFactor = this.getScalingFactor(currency);
      this.props.currencyOnChange(currency, scalingFactor);
      if (currentRate1 && currentPoints) {
        this.props.form.setFieldsValue({
          [ids.RATE_2]: math.number(math.add(currentRate1, (currentPoints * scalingFactor).toFixed(MAX_LIMITS.FWD.RATE.PRECISION))),
        });
      }
    }

    getScalingFactor = (currency = null) => {
      const currency1 = this.props.form.getFieldValue(ids.CURRENCY_1);
      const currency2 = currency || this.props.form.getFieldValue(ids.CURRENCY_2);
      const currencyPair = _.find(this.props.currencies, { baseCurrency: currency1, counterCurrency: currency2 });
      if (currencyPair) {
        return currencyPair.scalingFactor > 0 ? currencyPair.scalingFactor : 1;
      }
      return 1;
    }

    render() {
      return (
        <ForwardTradeEconomics
          form={this.props.form}
          spotDate={this.props.dates.spotDate}
          strategy={this.props.strategy}
          termOnBlur={this.props.termOnBlur}
          currencyOnChange={this.currencyChangeEffects}
          valueDateOnChange={this.props.valueDateOnChange}
          calulateInterest={this.props.calulateInterest}
          calulateInterestRate={this.props.calulateInterestRate}
          setDefaultExecutionVenue={this.setDefaultExecutionVenue}
          // From HOC:
          rate1OnChange={(event) => this.props.rate1OnChange(event, this.getScalingFactor())}
          rate2OnChange={(event) => this.props.rate2OnChange(event, this.getScalingFactor())}
          pointsOnChange={(event) => this.props.pointsOnChange(event, this.getScalingFactor())}
        />
      );
    }
}

ForwardTradeEconomicsContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  dates: PropTypes.shape().isRequired,
  strategy: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  pointsOnChange: PropTypes.func.isRequired,
  rate1OnChange: PropTypes.func.isRequired,
  rate2OnChange: PropTypes.func.isRequired,
  termOnBlur: PropTypes.func.isRequired,
  currencyOnChange: PropTypes.func.isRequired,
  valueDateOnChange: PropTypes.func.isRequired,
  calulateInterest: PropTypes.func.isRequired,
  calulateInterestRate: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  currencies, dates, rates, ui, user,
}) => ({
  currencies,
  dates,
  rates,
  userInterface: ui,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  dateActions: bindActionCreators(dateActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  rateActions: bindActionCreators(rateActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FwdTradeEconomics(TradeEconomics(ForwardTradeEconomicsContainer)));
