/* eslint-disable max-len */
const ClientTraderObjectProvider = require('../../../objectsProvider/ndf/components/ClientTraderObjectProvider');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class ClientTraderPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.clientTrader = new ClientTraderObjectProvider();
  }

  /** *************************** Buyer *************************************** */

  btnInfoBuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btnInfoBuyerClientTrader()); }

  btnClearBuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btnClearBuyerClientTrader()); }

  ddlBuyerClientTraderFocus() { return this.elmtProc.getEl(this.clientTrader.ddlBuyerClientTraderFocus()); }

  lblBuyerClientTraderError() { return this.elmtProc.getEl(this.clientTrader.lblBuyerClientTraderError()); }

  txtBuyerClientTraderError() {return this.elmtProc.getEl(this.clientTrader.txtBuyerClientTraderError()); }

  ddlBuyerClientTraderClickToType() { return this.elmtProc.getEl(this.clientTrader.ddlBuyerClientTraderClickToType()); }

  ddlBuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.ddlBuyerClientTrader()); } // clicking on the Buyer drop down Link.

  liBuyerSellerClientName(selectionName) { return this.elmtProc.getEl(this.clientTrader.liBuyerSellerClientName(selectionName)); }// Select the Buyer or Seller Firm and trader name from the drop down list

  lblBuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.lblBuyerClientTrader()); }

  // 3CP

  ddlcp2BuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.ddlcp2BuyerClientTrader()); }

  btncp2ClearBuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btncp2ClearBuyerClientTrader()); }

  btncp2InfoBuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btncp2InfoBuyerClientTrader()); }

  lblcp2BuyerClientTrader() { return this.elmtProc.getEl(this.clientTrader.lblcp2BuyerClientTrader()); }

  ddlcp2BuyerClientTraderFocus() { return this.elmtProc.getEl(this.clientTrader.ddlcp2BuyerClientTraderFocus()); }

  /** *************************** Seller *************************************** */

  btnInfoSellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btnInfoSellerClientTrader()); }

  btnClearSellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btnClearSellerClientTrader()); }

  ddlSellerClientTraderClickToType() { return this.elmtProc.getEl(this.clientTrader.ddlSellerClientTraderClickToType()); }

  ddlSellerClientTraderFocus() { return this.elmtProc.getEl(this.clientTrader.ddlSellerClientTraderFocus()); }

  ddlSellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.ddlSellerClientTrader()); }// click on the Seller drop down link.

  lblSellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.lblSellerClientTrader()); }

  // 3CP

  ddlcp2SellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.ddlcp2SellerClientTrader()); }

  btncp2ClearSellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btncp2ClearSellerClientTrader()); }

  btncp2InfoSellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.btncp2InfoSellerClientTrader()); }

  lblcp2SellerClientTrader() { return this.elmtProc.getEl(this.clientTrader.lblcp2SellerClientTrader()); }

  ddlcp2SellerClientTraderFocus() { return this.elmtProc.getEl(this.clientTrader.ddlcp2SellerClientTraderFocus()); }

  /** ************************* Common ************************** */
  casCadBuyerSeller() { return this.elmtProc.getEl(this.clientTrader.casCadBuyerSeller()); }

  liBuyerSellerClientTraderName(clientName, traderName) { return this.elmtProc.getEl(this.clientTrader.liBuyerSellerClientTraderName(clientName, traderName)); }

  liBuyerSellerClientTraderNameUpper(clientName, traderName) { return this.elmtProc.getEl(this.clientTrader.liBuyerSellerClientTraderNameUpper(clientName, traderName)); }

  liBuyerSeller() { return this.elmtProc.getElements(this.clientTrader.liBuyerSeller()); }

  btnBuyerCounterPartySide() { return this.elmtProc.getEl(this.clientTrader.btnBuyerCounterPartySide()); }

  btnSellerCounterPartySide() { return this.elmtProc.getEl(this.clientTrader.btnSellerCounterPartySide()); }

  /** ************************* Info Popup ************************** */
  lblInfoPopUp() { return this.elmtProc.getElements(this.clientTrader.lblInfoPopUp()); }

  lblInfoPopUpClose() { return this.elmtProc.getEl(this.clientTrader.lblInfoPopUpClose()); }
}
module.exports = ClientTraderPageObject;
