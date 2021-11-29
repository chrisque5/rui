const Date = require('../../components/ndf/Date.js');

class DateModel {
  constructor() {
    this.date = new Date();
  }

  /** ********************************* Date **************************** */
  // Fixing Date
  inputFixingDate(date) { this.date.inputFixingDate(date); }

  getfixingDate() { return this.date.getfixingDate(); }

  inputFixingDate2(date) { this.date.inputFixingDate2(date); }

  getfixingDate2() { return this.date.getfixingDate2(); }

  // Value Date
  clickValueDate1() { this.date.clickValueDate1(); }

  clickValueDate2() { this.date.clickValueDate2(); }

  inputValueDate(date) { this.date.inputValueDate(date); }

  verifyAndInputValueDate(date) { return this.date.verifyAndInputValueDate(date); }

  getValueDate() { return this.date.getValueDate(); }

  isValueDateUpdated(oldValue) { return this.date.isValueDateUpdated(oldValue); }

  inputValueDate2(date) { this.date.inputValueDate2(date); }

  getValueDate2() { return this.date.getValueDate2(); }

  isValueDate2Updated(oldValue) { return this.date.isValueDate2Updated(oldValue); }

  // Publish Date

  getPublishDate() { return this.date.getPublishDate(); }

  getPublishDate2() { return this.date.getPublishDate2(); }

  // Day Count

  getDayCount() { return this.date.getDayCount(); }

  getDayCount2() { return this.date.getDayCount2(); }

  isDayCountUpdated(oldValue) { return this.date.isDayCountUpdated(oldValue); }

  isDayCount2Updated(oldValue) { return this.date.isDayCount2Updated(oldValue); }

  isDatePanelClose() { return this.date.isDatePanelClose(); }

  clickNumDayCount1() { this.date.clickNumDayCount1(); }
  /** ******************************* Date End ************************** */
}
module.exports = DateModel;
