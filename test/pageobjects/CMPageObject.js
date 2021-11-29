const CMPropertyProvider = require('../objectsProvider/CMPropertyProvider');
const ElementProcessor = require('../core/element/ElementProcessor');

class CMPageObject {
  constructor() {
    this.cm = new CMPropertyProvider();
    this.elmtProc = new ElementProcessor();
  }

  reNameBtn() { return this.elmtProc.getEl(this.cm.reNameBtn()); }

  editColourBtn() { return this.elmtProc.getEl(this.cm.editColourBtn()); }

  reNameInput() { return this.elmtProc.getEl(this.cm.reNameInput()); }

  reNameSaveBtn() { return this.elmtProc.getEl(this.cm.reNameSaveBtn()); }

  reNameCancelBtn() { return this.elmtProc.getEl(this.cm.reNameCancelBtn()); }

  pageMask() { return this.elmtProc.getEl(this.cm.pageMask()); }

  btnFavColour(colour) { return this.elmtProc.getEl(this.cm.btnFavColour(colour)); }

  mnuRightClick() { return this.elmtProc.getEl(this.cm.mnuRightClick()); }

  btnColourModalClose() { return this.elmtProc.getEl(this.cm.btnColourModalClose()); }

  btnRestColourModalClose() { return this.elmtProc.getRestElement(this.cm.btnColourModalClose(), 'xpath'); }

  // Hot List Users

  btnHotListClient(firmName) { return this.elmtProc.getEl(this.cm.btnHotListClient(firmName)); }

  btnHotListBroker(brokerName) { return this.elmtProc.getEl(this.cm.btnHotListBroker(brokerName)); }

  liHotListBroker() { return this.elmtProc.getElements(this.cm.liHotListBroker()); }

  tabHotListBroker(tabList) { return this.elmtProc.getChildElements(tabList, './/div[@role="tab"]'); }

  btnHotListCloseBroker(brokerName) { return this.elmtProc.getEl(this.cm.btnHotListCloseBroker(brokerName)); }

  btnStarBuyer() { return this.elmtProc.getEl(this.cm.btnStarBuyer()); }

  btnStarSeller() { return this.elmtProc.getEl(this.cm.btnStarSeller()); }

  btnNettBroBuyer() { return this.elmtProc.getEl(this.cm.btnNettBroBuyer()); }

  btnNettBroSeller() { return this.elmtProc.getEl(this.cm.btnNettBroSeller()); }

  btncp2StarBuyer() { return this.elmtProc.getEl(this.cm.btncp2StarBuyer()); }

  btncp2StarSeller() { return this.elmtProc.getEl(this.cm.btncp2StarSeller()); }

  btnHotListTrader(traderName) { return this.elmtProc.getEl(this.cm.btnHotListTrader(traderName)); }

  btnCloseHotListTrader(traderName) { return this.elmtProc.getEl(this.cm.btnCloseHotListTrader(traderName)); }

  btnStarCurrency() { return this.elmtProc.getEl(this.cm.btnStarCurrency()); }

  btnHotListCurrency(currencyPair) { return this.elmtProc.getEl(this.cm.btnHotListCurrency(currencyPair)); }

  btnCloseHotListCurrency(currencyPair) { return this.elmtProc.getEl(this.cm.btnCloseHotListCurrency(currencyPair)); }

  btnStarTerm() { return this.elmtProc.getEl(this.cm.btnStarTerm()); }

  btnHotListTerm(term) { return this.elmtProc.getEl(this.cm.btnHotListTerm(term)); }

  btnCloseHotListTerm(term) { return this.elmtProc.getEl(this.cm.btnCloseHotListTerm(term)); }

  btnStarVenue() { return this.elmtProc.getEl(this.cm.btnStarVenue()); }

  btnHotListVenue(executionVenue) { return this.elmtProc.getEl(this.cm.btnHotListVenue(executionVenue)); }

  btnCloseHotListVenue(executionVenue) { return this.elmtProc.getEl(this.cm.btnCloseHotListVenue(executionVenue)); }

  btnStarValueDate() { return this.elmtProc.getEl(this.cm.btnStarValueDate()); }

  btnHotListValueDate(valueDate) { return this.elmtProc.getEl(this.cm.btnHotListValueDate(valueDate)); }

  btnCloseHotListValueDate(valueDate) { return this.elmtProc.getEl(this.cm.btnCloseHotListValueDate(valueDate)); }

  btnToggleTraders(index) { return this.elmtProc.getEl(this.cm.btnToggleTraders(index)); }

  btnToggleCurrencyPairs(index) { return this.elmtProc.getEl(this.cm.btnToggleCurrencyPairs(index)); }

  btnToggleTerms(index) { return this.elmtProc.getEl(this.cm.btnToggleTerms(index)); }

  btnToggleExecutionVenues(index) { return this.elmtProc.getEl(this.cm.btnToggleExecutionVenues(index)); }

  // End hot list users
}
module.exports = CMPageObject;
