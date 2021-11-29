const BackDate = require('../../components/ndf/BackDate.js');

class BackDateModel {
  constructor() {
    this.backDate = new BackDate();
  }

  // Back Dated Trades

  isBackDateSelected() { return this.backDate.isBackDateSelected(); }

  isBackDateTimeActive() { return this.backDate.isBackDateTimeActive(); }

  selectBackDate() { return this.backDate.selectBackDate(); }

  inputBackDate(date) { return this.backDate.inputBackDate(date); }

  getBackDateValue() { return this.backDate.getBackDateValue(); }

  inputBackDateTime(time) { return this.backDate.inputBackDateTime(time); }

  enterBackDate(days, baseCurrency, currency, backDateTime, dateFormat) {
    this.backDate.enterBackDate(days, baseCurrency, currency, backDateTime, dateFormat);
  }

  getBackDateTimeValue() { return this.backDate.getBackDateTimeValue(); }

  isModalBackDateVisible() { return this.backDate.isModalBackDateVisible(); }

  isModalBackDateClose() { return this.backDate.isModalBackDateClose(); }

  verifyModalNewDateString(dateTimeString) { return this.backDate.verifyModalNewDateString(dateTimeString); }

  backDateCancel() { return this.backDate.backDateCancel(); }

  backDateAccept() { return this.backDate.backDateAccept(); }

/** ********************************* Back Dated Trades End **************************** */
}
module.exports = BackDateModel;
