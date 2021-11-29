/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs.js');
const BackDateObject = require('../../pageobjects/ndf/components/BackDateObject');
const Currency = require('./Currency.js');
const Date = require('./Date.js');
const DateModel = require('../../models/DateModel.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex.js');

class BackDate {
  constructor() {
    this.log = new Logs();
    this.backDatePage = new BackDateObject();
    this.date = new Date();
    this.dateModel = new DateModel();
    this.currency = new Currency();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.windowActions = new WindowActions();
    this.watch = new StopWatch();
  }

  isBackDateDateActive() {
    const chkState = this.elementActions.getAttribute(this.backDatePage.chkBackDateDateState(), 'class');
    if (chkState.includes('has-success')) {
      return true;
    }
    return false;
  }

  isBackDateTimeActive() {
    const chkState = this.elementActions.getAttribute(this.backDatePage.chkBackDateTimeState(), 'class');
    if (chkState.includes('has-success')) {
      return true;
    }
    return false;
  }

  isBackDateSelected() {
    const chkState = this.elementActions.getAttribute(this.backDatePage.chkBackDateState(), 'class');
    if (chkState.includes('ant-checkbox-checked')) {
      return true;
    }
    return false;
  }

  selectBackDate() {
    if (!this.isBackDateSelected()) {
      this.clickActions.click(this.backDatePage.chkBackDate());
    } else {
      this.log.log('Back date is already selected.');
    }
  }

  inputBackDate(date) {
    this.clickActions.click(this.backDatePage.dptBackDate());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.backDatePage.txtBackDate(), date);
    this.keyboardActions.enterKeys('Enter');
  }
  
  inputBackDateTime(time) {
    this.clickActions.click(this.backDatePage.tmpBackDateTime());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.backDatePage.txtBackDateTime(), time);
    this.clickActions.click(this.backDatePage.btnBackDateTimeAccept());
    this.currency.clickLblDealtCcy();
  }

  getBackDateValue() { return this.textActions.getVal(this.backDatePage.dptBackDate()); }

  getBackDateTimeValue() { return this.textActions.getVal(this.backDatePage.tmpBackDateTime()); }

  enterBackDate(days, baseCurrency, currency, backDateTime, dateFormat) {
    this.selectBackDate();
    const backDateDay = this.dateModel.subtractBusinessDateFromToday(days, baseCurrency, currency).format(dateFormat);
    this.inputBackDate(backDateDay);
    this.inputBackDateTime(backDateTime);
  }

  isModalBackDateVisible() {
    const element = this.backDatePage.modalBackDate();
    if (element !== null && element !== undefined) {
      return true;
    }
    return false;
  }

  isModalBackDateClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      this.windowActions.pause(500);
      if (this.isModalBackDateVisible() === false) {
        this.log.log('Back Date Modal is closed.');
        return true;
      }
    }
    this.log.log('Back Date Modal is not closed yet.');
    return false;
  }

  verifyModalNewDateString(dateTimeString) {
    let returnValue = '';
    this.watch.startStopWatch(15);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.backDatePage.modalNewDateString(dateTimeString));
      this.log.log(`Date and time string is : ${returnValue}`);
      if (returnValue.includes(dateTimeString)) {
        return returnValue;
      }
    }
    return returnValue;
  }

  backDateCancel() {
    this.clickActions.clickByJScript(this.backDatePage.btnCancel());
  }

  backDateAccept() {
    this.clickActions.clickByJScript(this.backDatePage.btnAccept());
  }
}
module.exports = BackDate;
