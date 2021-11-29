const AdminPropertyProvider = require('../../objectsProvider/admin/CurrenciesAdminPropertyProvider');
const ElementProcessor = require('../../core/element/ElementProcessor.js');

class AdminPageObject {
  constructor() {
    this.admin = new AdminPropertyProvider();
    this.elmtProc = new ElementProcessor();
  }

  btnCurrenciesTab() { return this.elmtProc.getEl(this.admin.btnCurrenciesTab()); }

  rdodealTypeNDF() { return this.elmtProc.getEl(this.admin.rdodealTypeNDF()); }

  rdodealTypeFWD() { return this.elmtProc.getEl(this.admin.rdodealTypeFWD()); }

  rdodealTypeSPT() { return this.elmtProc.getEl(this.admin.rdodealTypeSPT()); }

  rdodealTypeNDFSelect() { return this.elmtProc.getEl(this.admin.rdodealTypeNDFSelect()); }

  rdodealTypeFWDSelect() { return this.elmtProc.getEl(this.admin.rdodealTypeFWDSelect()); }

  rdodealTypeSPTSelect() { return this.elmtProc.getEl(this.admin.rdodealTypeSPTSelect()); }

  btnCancel() { return this.elmtProc.getEl(this.admin.btnCancel()); }

  btnApply() { return this.elmtProc.getEl(this.admin.btnApply()); }

  chkCurrency(chkCurrency) { return this.elmtProc.getEl(this.admin.chkCurrency(chkCurrency)); }

  chkCurrencyNoCheck(chkCurrency) { return this.elmtProc.getElWithoutCheck(this.admin.chkCurrency(chkCurrency)); }

  currencyScroll() { return this.elmtProc.getEl(this.admin.currencyScroll()); }
}
module.exports = AdminPageObject;
