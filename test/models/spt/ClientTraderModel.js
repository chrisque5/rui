/* eslint-disable max-len */
const ClientTrader = require('../../components/ndf/ClientTrader.js');

class ClientTraderModel {
  constructor() {
    this.clientTrader = new ClientTrader();
  }

  /** ******************************* Client/Trader ************************** */
  // Buyer
  selectBuyerTrader(buyerFirmName, buyerTraderName, autoTab) { this.clientTrader.selectBuyerTrader(buyerFirmName, buyerTraderName, autoTab); }

  selectBuyerTraderBySearchLowerKeys(buyerFirmName, buyerTraderName) { this.clientTrader.selectBuyerTraderBySearchLowerKeys(buyerFirmName, buyerTraderName); }

  selectBuyerTraderBySearchUpperKeys(buyerFirmName, buyerTraderName) { this.clientTrader.selectBuyerTraderBySearchUpperKeys(buyerFirmName, buyerTraderName); }

  inputBuyerTraderByKeys(buyerTrader) { this.clientTrader.inputBuyerTraderByKeys(buyerTrader); }

  getBuyerClientTraderLbl() { return this.clientTrader.getBuyerClientTraderLbl(); }

  hoverBuyerInfoIcon() { this.clientTrader.hoverBuyerInfoIcon(); }

  hoverBuyerClientTrader() { this.clientTrader.hoverBuyerClientTrader(); }

  isBuyerClientTraderFocused() { return this.clientTrader.isBuyerClientTraderFocused(); }

  isAnyErrorOnBuyerTrader() { return this.clientTrader.isAnyErrorOnBuyerTrader(); }

  // 3CP
  selectcp2BuyerTrader(buyerFirmName, buyerTraderName, autoTab) { this.clientTrader.selectcp2BuyerTrader(buyerFirmName, buyerTraderName, autoTab); }

  getcp2BuyerClientTraderLbl() { return this.clientTrader.getcp2BuyerClientTraderLbl(); }

  hovercp2BuyerInfoIcon() { this.clientTrader.hovercp2BuyerInfoIcon(); }

  iscp2BuyerClientTraderFocus() { return this.clientTrader.iscp2BuyerClientTraderFocus(); }

  // Seller

  selectSellerTrader(sellerFirmName, sellerTraderName, autoTab) { this.clientTrader.selectSellerTrader(sellerFirmName, sellerTraderName, autoTab); }

  selectSellerTraderBySearchLowerKeys(sellerFirmName, sellerTraderName) { this.clientTrader.selectSellerTraderBySearchLowerKeys(sellerFirmName, sellerTraderName); }

  selectSellerTraderBySearchUpperKeys(sellerFirmName, sellerTraderName) { this.clientTrader.selectSellerTraderBySearchUpperKeys(sellerFirmName, sellerTraderName); }

  inputSellerTraderByKeys(sellerTrader) { this.clientTrader.inputSellerTraderByKeys(sellerTrader); }

  getSellerClientTraderLbl() { return this.clientTrader.getSellerClientTraderLbl(); }

  hoverSellerInfoIcon() { this.clientTrader.hoverSellerInfoIcon(); }

  isSellerClientTraderFocus() { return this.clientTrader.isSellerClientTraderFocus(); }

  // 3CP
  selectcp2SellerTrader(sellerFirmName, sellerTraderName, autoTab) { this.clientTrader.selectcp2SellerTrader(sellerFirmName, sellerTraderName, autoTab); }

  getcp2SellerClientTraderLbl() { return this.clientTrader.getcp2SellerClientTraderLbl(); }

  hovercp2SellerInfoIcon() { this.clientTrader.hovercp2SellerInfoIcon(); }

  iscp2SellerClientTraderFocus() { return this.clientTrader.iscp2SellerClientTraderFocus(); }

  // common

  isPageLoadComplete() { return this.clientTrader.isPageLoadComplete(); }

  verifyCasCadClose() { return this.clientTrader.verifyCasCadClose(); }

  isCasCadClose() { return this.clientTrader.isCasCadClose(); }

  isCasCadOpen() { return this.clientTrader.isCasCadOpen(); }

  getClientInfoPopUpText() { return this.clientTrader.getClientInfoPopUpText(); }

  verifyInfoPopUpClose() { return this.clientTrader.verifyInfoPopUpClose(); }

  // get button text
  getBuyerCounterPartySideside() {
    return this.clientTrader.getBuyerCounterPartySideside();
  }

  verifyBuyerCounterPartySide(side) {
    return this.clientTrader.verifyBuyerCounterPartySide(side);
  }

  getSellerCounterPartySideside() {
    return this.clientTrader.getSellerCounterPartySideside();
  }

  verifySellerCounterPartySide(side) {
    return this.clientTrader.verifySellerCounterPartySide(side);
  }

  /** ******************************* Client/Trader End ************************** */
}
module.exports = ClientTraderModel;
