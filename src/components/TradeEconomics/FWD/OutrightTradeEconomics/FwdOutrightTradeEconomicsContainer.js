import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TradeEconomics from '../../TradeEconomics';
import FwdOutrightTradeEconomics from './FwdOutrightTradeEconomics';
import FwdTradeEconomics from '../FwdTradeEconomics';
import * as dateActions from '../../../../actions/dateActions';
import * as uiActions from '../../../../actions/uiActions';
import * as rateActions from '../../../../actions/rateActions';

// eslint-disable-next-line react/prefer-stateless-function
class FwdOutrightTradeEconomicsContainer extends Component {
  render() {
    return (
      <FwdOutrightTradeEconomics
        form={this.props.form}
        termOnBlur={this.props.termOnBlur}
        currencyOnChange={this.props.currencyOnChange}
        valueDateOnChange={this.props.valueDateOnChange}
      />
    );
  }
}

FwdOutrightTradeEconomicsContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  termOnBlur: PropTypes.func.isRequired,
  currencyOnChange: PropTypes.func.isRequired,
  valueDateOnChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  ui, currencies, dates, rates, user,
}) => ({
  currencies,
  userInterface: ui,
  dates,
  rates,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  dateActions: bindActionCreators(dateActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  rateActions: bindActionCreators(rateActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FwdTradeEconomics(TradeEconomics(FwdOutrightTradeEconomicsContainer)));
