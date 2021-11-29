import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox } from 'antd';
import * as uiActions from '../../../actions/uiActions';
import CounterPartiesContainer from '../../CounterParties/CounterPartiesContainer';
import { reset3CpsValidation } from '../../../utils/validation';

class SpreadTradeSides extends Component {
  onToggleThirdCP = (e) => {
    const isChecked = e.target.checked;
    const currentBuyerClientTrader = this.props.form.getFieldValue('buyerClientTrader');
    this.props.uiActions.toggleThirdCP(isChecked);
    this.props.uiActions.changeCounterPartySelection(currentBuyerClientTrader && isChecked ? 'cp2Buyer' : 'buyer');
    reset3CpsValidation();
    if (isChecked) {
      this.setThirdCPs();
    }
  };

  setThirdCPs = () => {
    const currentSellerClientTrader = this.props.form.getFieldValue('sellerClientTrader');
    const currentBuyerClientTrader = this.props.form.getFieldValue('buyerClientTrader');
    const currentBuyerBroker = this.props.form.getFieldValue('buyerBroker');
    const currentSellerBroker = this.props.form.getFieldValue('sellerBroker');
    const currentBuyerAgent = this.props.form.getFieldValue('buyerAgent');
    const currentSellerAgent = this.props.form.getFieldValue('sellerAgent');

    setTimeout(() => {
      this.props.form.setFieldsValue({
        cp2BuyerClientTrader: currentSellerClientTrader,
        cp2BuyerBroker: currentSellerBroker,
        cp2SellerClientTrader: currentBuyerClientTrader,
        cp2SellerBroker: currentBuyerBroker,
        cp2BuyerAgent: currentSellerAgent,
        cp2SellerAgent: currentBuyerAgent,
      });
      this.setHoverInfo('cp2Buyer');
      this.setHoverInfo('cp2Seller');
    });
  };

  setHoverInfo = (side) => {
    const client = this.props.form.getFieldValue(`${side}ClientTrader`);
    if (client) {
      const tradingCustomerId = client[0];
      const traderPostingId = client[1].split(',')[0];
      const executingCustomerId = client[1].split(',')[1];
      this.props.uiActions.changeClientHoverData({
        tradingCustomerId, traderPostingId, executingCustomerId, side,
      });
    } else {
      this.props.uiActions.changeClientHoverData({
        side,
      });
    }
  };

  render() {
    return (
      <>
        <CounterPartiesContainer
          columnData={[{ title: 'Buyer', formId: 'buyer' }, { title: 'Seller', formId: 'seller' }]}
          form={this.props.form}
          dealType={this.props.dealType}
        />
        {this.props.isThirdCPChecked && (
          <CounterPartiesContainer
            columnData={[{ title: 'Buyer', formId: 'cp2Buyer' }, { title: 'Seller', formId: 'cp2Seller' }]}
            form={this.props.form}
            dealType={this.props.dealType}
          />
        )}
        {
          <Checkbox
            data-testid="chkThreeCp"
            className="toggle-3cp"
            checked={this.props.isThirdCPChecked}
            onChange={this.onToggleThirdCP}
          >
            3 CPs
          </Checkbox>
        }
      </>
    );
  }
}

SpreadTradeSides.propTypes = {
  form: PropTypes.shape().isRequired,
  isThirdCPChecked: PropTypes.bool.isRequired,
  uiActions: PropTypes.shape().isRequired,
  dealType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ ui }) => ({
  isThirdCPChecked: ui.isThirdCPChecked,
});

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpreadTradeSides);
