import { Component } from 'react';
import PropTypes from 'prop-types';
import TradeEconomics from '../../TradeEconomics';
import SpreadTradeEconomics from './SpreadTradeEconomics';

// eslint-disable-next-line react/prefer-stateless-function
class SpreadTradeEconomicsContainer extends Component {
  render() {
    return (
      <SpreadTradeEconomics
        {...this.props}
        // From HOC:
        rate1OnChange={this.props.rate1OnChange}
        rate2OnChange={this.props.rate2OnChange}
        pointsOnChange={this.props.pointsOnChange}
      />
    );
  }
}

SpreadTradeEconomicsContainer.propTypes = {
  form: PropTypes.shape().isRequired,
  pointsOnChange: PropTypes.func.isRequired,
  rate1OnChange: PropTypes.func.isRequired,
  rate2OnChange: PropTypes.func.isRequired,
};

export default TradeEconomics(SpreadTradeEconomicsContainer);
