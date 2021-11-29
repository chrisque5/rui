const PopUpNavigationProvider = require('../objectsProvider/PopUpNavigationProvider.js');
const ElementProcessor = require('../core/element/ElementProcessor.js');

class PopUpNavigationPageObject {
  constructor() {
    this.popUp = new PopUpNavigationProvider();
    this.elmtProc = new ElementProcessor();
  }

  popUpMessage() { return this.elmtProc.getEl(this.popUp.popUpMessage()); }

  popUpDescription() { return this.elmtProc.getEl(this.popUp.popUpDescription()); }

  availPopUpDescription() { return this.elmtProc.getEl(this.popUp.availPopUpDescription()); }

  btnPopUpClose() { return this.elmtProc.getEl(this.popUp.btnPopUpClose()); }

  isbtnPopUpClose() { return this.elmtProc.getEl(this.popUp.isbtnPopUpClose()); }

  isrestbtnPopUpClose() { return this.elmtProc.getRestElement(this.popUp.btnPopUpClose(), 'css selector'); }

  isrestbtnPopUpCloseAll() { return this.elmtProc.getRestElement(this.popUp.btnPopUpCloseAll(), 'xpath'); }

  txtError() { return this.elmtProc.getEl(this.popUp.txtError()); }

  lnkReturnLogin() { return this.elmtProc.getEl(this.popUp.lnkReturnLogin()); }

  btnHotListClose() {
    const element = this.elmtProc.getEl(this.popUp.btnHotListClose());
    return element;
  }

  btnHotListCloseVisible() {
    const element = this.elmtProc.getRestElement(this.popUp.btnHotListClose(), 'xpath');
    return element;
  }

  btnConfirmationClose() { return this.elmtProc.getEl(this.popUp.btnConfirmationClose()); }

  btnRestConfirmationClose() { return this.elmtProc.getRestElement(this.popUp.btnConfirmationClose(), 'xpath'); }

  lblHotListPopUpMessage() { return this.elmtProc.getEl(this.popUp.lblHotListPopUpMessage()); }
}
module.exports = PopUpNavigationPageObject;
