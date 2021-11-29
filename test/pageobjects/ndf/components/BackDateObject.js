const BackDateObjectProvider = require('../../../objectsProvider/ndf/components/BackDateObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class DatePageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.backDate = new BackDateObjectProvider();
  }

  chkBackDate() { return this.elmtProc.getEl(this.backDate.chkBackDate()); }

  chkBackDateState() { return this.elmtProc.getEl(this.backDate.chkBackDateState()); }

  dptBackDate() { return this.elmtProc.getEl(this.backDate.dptBackDate()); }

  txtBackDate() { return this.elmtProc.getEl(this.backDate.txtBackDate()); }

  tmpBackDateTime() { return this.elmtProc.getEl(this.backDate.tmpBackDateTime()); }

  txtBackDateTime() { return this.elmtProc.getEl(this.backDate.txtBackDateTime()); }

  btnBackDateTimeAccept() { return this.elmtProc.getEl(this.backDate.btnBackDateTimeAccept()); }

  chkBackDateDateState() { return this.elmtProc.getEl(this.backDate.chkBackDateDateState()); }

  chkBackDateTimeState() { return this.elmtProc.getEl(this.backDate.chkBackDateTimeState()); }

  btnClearBackDateTime() { return this.elmtProc.getEl(this.backDate.btnClearBackDateTime()); }

  modalBackDate() {
    // const element = await this.elmtProc.getRestElement(this.backDate.modalBackDate(), 'xpath');
    // return element;
    return this.elmtProc.getEl(this.backDate.modalBackDate());
  }

  modalNewDateString(dateTimeString) { return this.elmtProc.getEl(this.backDate.modalNewDateString(dateTimeString)); }

  btnCancel() { return this.elmtProc.getEl(this.backDate.btnCancel()); }

  btnAccept() { return this.elmtProc.getEl(this.backDate.btnAccept()); }
}
module.exports = DatePageObject;
