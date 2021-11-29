const CM = require('../CMModel.js');

class ClientManagerModel {
  constructor() {
    this.cm = new CM();
  }

  /** ************************************ Client Manager ******************************** */
  // Fav Start Btn
  clickBuyerStarBtn() { this.cm.clickBuyerStarBtn(); }

  clickSellerStarBtn() { this.cm.clickSellerStarBtn(); }

  clickcp2BuyerStarBtn() { this.cm.clickcp2BuyerStarBtn(); }

  clickcp2SellerStarBtn() { this.cm.clickcp2SellerStarBtn(); }

  // Fav Broker

  selectFavBroker(brokerName) { this.cm.selectFavBroker(brokerName); }

  getFavBrokerText(brokerName) { return this.cm.getFavBrokerText(brokerName); }

  closeFavBroker(brokerName) { this.cm.closeFavBroker(brokerName); }

  // Fav Trader

  selectFavTrader(traderName) { this.cm.selectFavTrader(traderName); }

  rightClickFavTrader(traderName) { this.cm.rightClickFavTrader(traderName); }

  getFavTraderText(trader) { return this.cm.getFavTraderText(trader); }

  closeFavTrader(trader) { this.cm.closeFavTrader(trader); }

  // Fav Currency
  clickCurrencyPairStarBtn() { this.cm.clickCurrencyPairStarBtn(); }

  selectFavCurrency(currency) { this.cm.selectFavCurrency(currency); }

  getFavCurrencyText(currency) { return this.cm.getFavCurrencyText(currency); }

  closeFavCurrency(currency) { this.cm.closeFavCurrency(currency); }

  // Fav Term
  clickTermStarBtn() { this.cm.clickTermStarBtn(); }

  selectFavTerm(term) { this.cm.selectFavTerm(term); }

  getFavTermText(term) { return this.cm.getFavTermText(term); }

  closeFavTerm(term) { this.cm.closeFavTerm(term); }

  dragNdropFavTrader(sourceTrader, targetTrader) { this.cm.dragNdropFavTrader(sourceTrader, targetTrader); }

  /** ************************************ Client Manager End **************************** */
}
module.exports = ClientManagerModel;
