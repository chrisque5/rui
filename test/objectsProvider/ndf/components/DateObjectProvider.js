/* eslint-disable class-methods-use-this */
class DateObjectProvider {
  // Fixing Date

  dtpFixingDate1() { return '[data-testid="dtpFixingDate1"]@@Enabled_And_Visible||10'; }

  imgFixingDate() { return '//input[@data-testid="dtpFixingDate1"]@@Enabled_And_Visible||10'; }

  txtFixingDate() { return '//input[@data-testid="dtpFixingDate1"]@@Enabled_And_Visible||10'; }

  dtpFixingDate2() { return '[data-testid="dtpFixingDate2"]@@Enabled_And_Visible||10'; }

  imgFixingDate2() { return '//input[@data-testid="dtpFixingDate2"]@@Enabled_And_Visible||10'; }

  btnYearDate() { return '.ant-calendar-year-select@@Enabled_And_Visible||10'; }

  pnlDate() { return 'ant-calendar-picker-container@@Enabled_And_Visible||.5'; }

  lblYearDate(year) { return `${'//a[@class="ant-calendar-year-panel-year" and text()="TEMP"]'.replace('TEMP', year)}@@Enabled_And_Visible||10`; }

  // Value Date

  dtpValueDate1() { return '[data-testid="dtpValueDate1"]@@Enabled_And_Visible||10'; }

  imgValueDate() { return '//input[@data-testid="dtpValueDate1"]@@Enabled_And_Visible||10'; }

  dtpValueDate2() { return '[data-testid="dtpValueDate2"]@@Enabled_And_Visible||10'; }

  imgValueDate2() { return '//input[@data-testid="dtpValueDate2"]@@Enabled_And_Visible||10'; }

  // Publish Date

  dtpPublishDate1() { return '[data-testid="dtpPublishDate1"]@@Enabled_And_Visible||10'; }

  imgPublishDate() { return '//input[@data-testid="dtpPublishDate1"]@@Enabled_And_Visible||10'; }

  dtpPublishDate2() { return '[data-testid="dtpPublishDate2"]@@Enabled_And_Visible||10'; }

  imgPublishDate2() { return '//input[@data-testid="dtpPublishDate2"]@@Enabled_And_Visible||10'; }

  numDayCount1() { return '[data-testid="numDayCount1"]@@exist||10'; }

  numDayCount2() { return '[data-testid="numDayCount2"]@@exist||10'; }

  // Date Picker

  // eslint-disable-next-line max-len
  lblCalendarDay(dateString) { return `${'//td[@title="DATESTRING"]'.replace('DATESTRING', dateString)}@@Enabled_And_Visible||10`; }
}
module.exports = DateObjectProvider;
