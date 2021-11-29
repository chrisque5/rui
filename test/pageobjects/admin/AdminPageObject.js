const AdminPropertyProvider = require('../../objectsProvider/admin/AdminPropertyProvider');
const ElementProcessor = require('../../core/element/ElementProcessor.js');

class AdminPageObject {
  constructor() {
    this.admin = new AdminPropertyProvider();
    this.elmtProc = new ElementProcessor();
  }

  btnBrokersTab() { return this.elmtProc.getEl(this.admin.btnBrokersTab()); }

  btnCurrenciesTab() { return this.elmtProc.getEl(this.admin.btnCurrenciesTab()); }

  modalConfirm() { return this.elmtProc.getEl(this.admin.modalConfirm()); }

  modalConfirmNoCheck() { return this.elmtProc.getElWithoutCheck(this.admin.modalConfirm()); }

  btnConfirmYes() { return this.elmtProc.getEl(this.admin.btnConfirmYes()); }

  btnConfirmNo() { return this.elmtProc.getEl(this.admin.btnConfirmNo()); }
}
module.exports = AdminPageObject;
