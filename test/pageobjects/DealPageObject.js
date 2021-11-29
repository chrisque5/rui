/* eslint-disable max-len */
const DealPropertyProvider = require('../objectsProvider/DealPropertyProvider.js');
const ElementProcessor = require('../core/element/ElementProcessor.js');

class DealPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.dealProperty = new DealPropertyProvider();
  }

  chkVolMatch() { return this.elmtProc.getEl(this.dealProperty.chkVolMatch()); }

  chkVolMatchState() { return this.elmtProc.getEl(this.dealProperty.chkVolMatchState()); }

  chkTurnTrade() { return this.elmtProc.getEl(this.dealProperty.chkTurnTrade()); }

  chkTurnTradeState() { return this.elmtProc.getEl(this.dealProperty.chkTurnTradeState()); }

  btnBuyer() { return this.elmtProc.getEl(this.dealProperty.btnBuyer()); }

  btnSeller() { return this.elmtProc.getEl(this.dealProperty.btnSeller()); }

  ddlUserDropdown() { return this.elmtProc.getEl(this.dealProperty.ddlUserDropdown()); }

  btncp2Buyer() { return this.elmtProc.getEl(this.dealProperty.btncp2Buyer()); }

  btncp2Seller() { return this.elmtProc.getEl(this.dealProperty.btncp2Seller()); }

  btnSwap() { return this.elmtProc.getEl(this.dealProperty.btnSwap()); }

  btnSwap2() { return this.elmtProc.getEl(this.dealProperty.btnSwap2()); }

  chkThreeCp() { return this.elmtProc.getEl(this.dealProperty.chkThreeCp()); }

  btnSubmit() { return this.elmtProc.getEl(this.dealProperty.btnSubmit()); }

  btnReset() { return this.elmtProc.getEl(this.dealProperty.btnReset()); }

  msgNotification() { return this.elmtProc.getEl(this.dealProperty.msgNotification('Deal created')); }
}

module.exports = DealPageObject;
