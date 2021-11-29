const AdminPropertyProvider = require('../../objectsProvider/admin/BrokerAdminPropertyProvider');
const ElementProcessor = require('../../core/element/ElementProcessor.js');

class AdminPageObject {
  constructor() {
    this.admin = new AdminPropertyProvider();
    this.elmtProc = new ElementProcessor();
  }

  rdodealTypeNDF() { return this.elmtProc.getEl(this.admin.rdodealTypeNDF()); }

  rdodealTypeFWD() { return this.elmtProc.getEl(this.admin.rdodealTypeFWD()); }

  rdodealTypeSPT() { return this.elmtProc.getEl(this.admin.rdodealTypeSPT()); }

  rdodealTypeNDFSelect() { return this.elmtProc.getEl(this.admin.rdodealTypeNDFSelect()); }

  rdodealTypeFWDSelect() { return this.elmtProc.getEl(this.admin.rdodealTypeFWDSelect()); }

  rdodealTypeSPTSelect() { return this.elmtProc.getEl(this.admin.rdodealTypeSPTSelect()); }

  ddlBrokerDesk() { return this.elmtProc.getEl(this.admin.ddlBrokerDesk()); }

  liBrokerDesk(desk) { return this.elmtProc.getEl(this.admin.liBrokerDesk(desk)); }

  liBrokerName(brokerName) { return this.elmtProc.getEl(this.admin.liBrokerName(brokerName)); }

  lblBrokerDesk(desk) { return this.elmtProc.getEl(this.admin.lblBrokerDesk(desk)); }

  ulBrokerDesk() { return this.elmtProc.getEl(this.admin.ulBrokerDesk()); }

  btnClearBrokerDesk() { return this.elmtProc.getEl(this.admin.btnClearBrokerDesk()); }

  chkAllBrokers() { return this.elmtProc.getEl(this.admin.chkAllBrokers()); }

  chkDMSWebBrokers() { return this.elmtProc.getEl(this.admin.chkDMSWebBrokers()); }

  txtAllBrokerSearch() { return this.elmtProc.getEl(this.admin.txtAllBrokerSearch()); }

  txtDMSWebBrokerSearch() { return this.elmtProc.getEl(this.admin.txtDMSWebBrokerSearch()); }

  ulAllBrokersEmpty() { return this.elmtProc.getEl(this.admin.ulAllBrokersEmpty()); }

  ulDMSWebBrokersEmpty() { return this.elmtProc.getEl(this.admin.ulDMSWebBrokersEmpty()); }

  chkBrokerToMove(broker) { return this.elmtProc.getEl(this.admin.chkBrokerToMove(broker)); }

  chkBrokerToMoveVerify(broker) { return this.elmtProc.getEl(this.admin.chkBrokerToMoveVerify(broker)); }

  brokerToVerify(broker, side) { return this.elmtProc.getEl(this.admin.brokerToVerify(broker, side)); }

  btnAddBroker() { return this.elmtProc.getEl(this.admin.btnAddBroker()); }

  btnRemoveBroker() { return this.elmtProc.getEl(this.admin.btnRemoveBroker()); }

  btnCancel() { return this.elmtProc.getEl(this.admin.btnCancel()); }

  btnApply() { return this.elmtProc.getEl(this.admin.btnApply()); }
}
module.exports = AdminPageObject;
