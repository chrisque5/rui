const Broker = require('../../components/ndf/DeskBroker.js');

class BrokerModel {
  constructor() {
    this.broker = new Broker();
  }

  /** ************************************ Broker ******************************** */

  // Buyer
  selectBuyerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectBuyerBrokerName(brokerDesk, brokerName, autoTab); }

  selectBuyerBrokerBySearchLowerKeys(brokerDesk, brokerName) { this.broker.selectBuyerBrokerBySearchLowerKeys(brokerDesk, brokerName); }

  selectBuyerBrokerBySearchUpperKeys(brokerDesk, brokerName) { this.broker.selectBuyerBrokerBySearchUpperKeys(brokerDesk, brokerName); }

  inputBuyerBrokerByKeys(buyerBroker) { this.broker.inputBuyerBrokerByKeys(buyerBroker); }

  getBuyerBrokerName() { return this.broker.getBuyerBrokerName(); }

  isBuyerBrokerFocus() { return this.broker.isBuyerBrokerFocus(); }

  // 3CP
  selectcp2BuyerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectcp2BuyerBrokerName(brokerDesk, brokerName, autoTab); }

  getcp2BuyerBrokerName() { return this.broker.getcp2BuyerBrokerName(); }

  iscp2BuyerBrokerFocus() { return this.broker.iscp2BuyerBrokerFocus(); }

  // Seller

  selectSellerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectSellerBrokerName(brokerDesk, brokerName, autoTab); }

  selectSellerBrokerBySearchLowerKeys(brokerDesk, brokerName) { this.broker.selectSellerBrokerBySearchLowerKeys(brokerDesk, brokerName); }

  selectSellerBrokerBySearchUpperKeys(brokerDesk, brokerName) { this.broker.selectSellerBrokerBySearchUpperKeys(brokerDesk, brokerName); }

  inputSellerBrokerByKeys(SellerKeys) { this.broker.inputSellerBrokerByKeys(SellerKeys); }

  getSellerBrokerName() { return this.broker.getSellerBrokerName(); }

  isSellerBrokerFocus() { return this.broker.isSellerBrokerFocus(); }

  // 3CP
  selectcp2SellerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectcp2SellerBrokerName(brokerDesk, brokerName, autoTab); }

  getcp2SellerBrokerName() { return this.broker.getcp2SellerBrokerName(); }

  iscp2SellerBrokerFocus() { return this.broker.iscp2SellerBrokerFocus(); }

  /** *********************************** Broker End ***************************** */
}
module.exports = BrokerModel;
