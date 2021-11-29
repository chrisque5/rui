const DateObjectProvider = require('../../../objectsProvider/ndf/components/DateObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class DatePageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.date = new DateObjectProvider();
  }

  // Fixing Date

  dtpFixingDate1() { return this.elmtProc.getEl(this.date.dtpFixingDate1()); }

  imgFixingDate() { return this.elmtProc.getEl(this.date.imgFixingDate()); }

  imgFixingDate2() { return this.elmtProc.getEl(this.date.imgFixingDate2()); }

  txtFixingDate() { return this.elmtProc.getEl(this.date.txtFixingDate()); }

  pnlDate() { return this.elmtProc.getEl(this.date.pnlDate()); }

  dtpFixingDate2() { return this.elmtProc.getEl(this.date.dtpFixingDate2()); }

  // Value Date

  dtpValueDate1() { return this.elmtProc.getEl(this.date.dtpValueDate1()); }

  imgValueDate() { return this.elmtProc.getEl(this.date.imgValueDate()); }

  imgValueDate2() { return this.elmtProc.getEl(this.date.imgValueDate2()); }

  dtpValueDate2() { return this.elmtProc.getEl(this.date.dtpValueDate2()); }

  // Publish Date

  dtpPublishDate1() { return this.elmtProc.getEl(this.date.dtpPublishDate1()); }

  dtpPublishDate2() { return this.elmtProc.getEl(this.date.dtpPublishDate2()); }

  imgPublishDate() { return this.elmtProc.getEl(this.date.imgPublishDate()); }

  imgPublishDate2() { return this.elmtProc.getEl(this.date.imgPublishDate2()); }

  // Day Count

  numDayCount1() { return this.elmtProc.getEl(this.date.numDayCount1()); }

  numDayCount2() { return this.elmtProc.getEl(this.date.numDayCount2()); }

  // Date Picker

  lblCalendarDay(dateString) { return this.elmtProc.getEl(this.date.lblCalendarDay(dateString)); }
}
module.exports = DatePageObject;
