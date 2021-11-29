const Logs = require('../../core/utility/Logs.js');
const DatePageObject = require('../../pageobjects/ndf/components/DatePageObject.js');
const CurrencyPageObject = require('../../pageobjects/ndf/components/CurrencyPageObject.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
} = require('../../core/actions/ActionsIndex.js');

class Date {
  constructor() {
    this.log = new Logs();
    this.datePage = new DatePageObject();
    this.currencyPage = new CurrencyPageObject();
    this.watch = new StopWatch();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
  }

  // Fixing Date
  inputFixingDate(date) {
    this.clickActions.click(this.datePage.imgFixingDate());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.datePage.txtFixingDate(), date);
    this.keyboardActions.enterKeys('Enter');
    this.isDatePanelClose();
  }

  getfixingDate() { return this.textActions.getVal(this.datePage.dtpFixingDate1()); }

  inputFixingDate2(date) {
    this.clickActions.click(this.datePage.imgFixingDate2());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.datePage.txtFixingDate(), date);
    this.keyboardActions.enterKeys('Enter');
  }

  getfixingDate2() { return this.textActions.getVal(this.datePage.dtpFixingDate2()); }

  // Value Date

  clickValueDate1() { this.clickActions.click(this.datePage.imgValueDate()); }

  clickValueDate2() { this.clickActions.click(this.datePage.imgValueDate2()); }

  inputValueDate(date) {
    this.clickActions.click(this.datePage.imgValueDate());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.datePage.imgValueDate(), date);
    // UI is making 2 calls to date service, after typing date string and on enter key press
    this.keyboardActions.enterKeys('Enter');
    this.isDatePanelClose();
  }

  verifyAndInputValueDate(date) {
    this.watch.startStopWatch(6);
    while (this.watch.isWatchRunning()) {
      this.inputValueDate(date);
      const dd = this.getValueDate();
      if (dd !== '' && dd === date) {
        this.log.log('Date has been updated.');
        return true;
      }
      this.log.log('Date is still not updated, waiting for update.');
    }
    this.log.log('Date is not updated.');
    return false;
  }

  getValueDate() { return this.textActions.getVal(this.datePage.dtpValueDate1()); }

  isValueDateUpdated(oldValue) {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.getValueDate() !== oldValue) {
        this.log.log('Value Date 1 has been updated.');
        return true;
      }
      this.log.log('Value Date 1 is still not updated, waiting for update.');
    }
    this.log.log('Value Date 1 not updated.');
    return false;
  }

  inputValueDate2(date) {
    this.clickActions.click(this.datePage.imgValueDate2());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.datePage.imgValueDate2(), date);
    // UI is making 2 calls to date service, after typing date string and on enter key press
    this.keyboardActions.enterKeys('Enter');
  }

  getValueDate2() { return this.textActions.getVal(this.datePage.dtpValueDate2()); }

  // Publish Date

  getPublishDate() { return this.textActions.getVal(this.datePage.dtpPublishDate1()); }

  inputPublishDate(date) {
    this.clickActions.click(this.datePage.imgPublishDate());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.datePage.imgPublishDate(), date);
    this.keyboardActions.enterKeys('Enter');
  }

  isValueDate2Updated(oldValue) {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.getValueDate2() !== oldValue) {
        this.log.log('Value Date 2 has been updated.');
        return true;
      }
      this.log.log('Value Date 2 is still not updated, waiting for update.');
    }
    this.log.log('Value Date 2 not updated.');
    return false;
  }

  getPublishDate2() { return this.textActions.getVal(this.datePage.dtpPublishDate2()); }

  inputPublishDate2(date) {
    this.clickActions.click(this.datePage.imgPublishDate2());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.datePage.imgPublishDate2(), date);
    this.keyboardActions.enterKeys('Enter');
  }

  // Day Count

  clickNumDayCount1() { this.clickActions.click(this.datePage.numDayCount1()); }

  getDayCount() { return this.textActions.getVal(this.datePage.numDayCount1()); }

  getDayCount2() { return this.textActions.getVal(this.datePage.numDayCount2()); }

  isDatePanelClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.datePage.pnlDate()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isDayCountUpdated(oldValue) {
    this.watch.startStopWatch(6);
    while (this.watch.isWatchRunning()) {
      const dayCount = this.getDayCount();
      if (dayCount !== '' && dayCount !== oldValue) {
        this.log.log('Day count 1 has been updated.');
        return true;
      }
      this.log.log('Day count 1 is still not updated, waiting for update.');
    }
    this.log.log('Day count 1 not updated.');
    return false;
  }

  isDayCount2Updated(oldValue) {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.getDayCount2() !== oldValue) {
        this.log.log('Day count 2 has been updated.');
        return true;
      }
      this.log.log('Day count 2 is still not updated, waiting for update.');
    }
    this.log.log('Day count 2 not updated.');
    return false;
  }

  isElementClose(elementObject) {
    if (elementObject === null || elementObject === undefined || elementObject.error !== undefined) {
      this.log.log('Given Element is closed.');
      return true;
    }
    return false;
  }

  isDateDisabled(dateString) {
    this.log.log(`Today's date is ${dateString}`);
    const chkState = this.elementActions.getAttribute(this.datePage.lblCalendarDay(dateString), 'class');
    if (chkState.includes('ant-picker-cell-disabled')) {
      return true;
    }
    return false;
  }
}
module.exports = Date;
