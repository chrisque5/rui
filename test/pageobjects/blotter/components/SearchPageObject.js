/* eslint-disable max-len */
const SearchPropertyProvider = require('../../../objectsProvider/blotter/components/SearchPropertyProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class SearchPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.filterProperty = new SearchPropertyProvider();
  }

  btnShowSearch() { return this.elmtProc.getEl(this.filterProperty.btnShowSearch()); }

  btnMenufold() { return this.elmtProc.getEl(this.filterProperty.btnMenufold()); }

  dptDateFrom() { return this.elmtProc.getEl(this.filterProperty.dptDateFrom()); }

  dptDateTo() { return this.elmtProc.getEl(this.filterProperty.dptDateTo()); }

  pnlDate() { return this.elmtProc.getEl(this.filterProperty.pnlDate()); }

  txtDealId() { return this.elmtProc.getEl(this.filterProperty.txtDealId()); }

  lblInputValidate(text) { return this.elmtProc.getEl(this.filterProperty.lblInputValidate(text)); }

  btnClearDealId() { return this.elmtProc.getEl(this.filterProperty.btnClearDealId()); }

  btnClearBroker() { return this.elmtProc.getEl(this.filterProperty.btnClearBroker()); }

  btnClearCustomer() { return this.elmtProc.getEl(this.filterProperty.btnClearCustomer()); }

  btnClearTrader() { return this.elmtProc.getEl(this.filterProperty.btnClearTrader()); }

  txtBroker() { return this.elmtProc.getEl(this.filterProperty.txtBroker()); }

  txtCustomer() { return this.elmtProc.getEl(this.filterProperty.txtCustomer()); }

  txtTrader() { return this.elmtProc.getEl(this.filterProperty.txtTrader()); }

  btnReset() { return this.elmtProc.getEl(this.filterProperty.btnReset()); }

  btnSearch() { return this.elmtProc.getEl(this.filterProperty.btnSearch()); }

  mskGrid() { return this.elmtProc.getEl(this.filterProperty.mskGrid()); }

  mskSearchDrawer() { return this.elmtProc.getEl(this.filterProperty.mskSearchDrawer()); }

  lblSearchResult() { return this.elmtProc.getEl(this.filterProperty.lblSearchResult()); }

  lblDateBrokerSearch() { return this.elmtProc.getEl(this.filterProperty.lblDateBrokerSearch()); }

  lblCustTraderSearch() { return this.elmtProc.getEl(this.filterProperty.lblCustTraderSearch()); }
}

module.exports = SearchPageObject;
