const Logs = require('../../core/utility/Logs.js');
const CurrencyPageObject = require('../../pageobjects/ndf/components/CurrencyPageObject.js');
const Date = require('./Date.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  ClickActions,
  ElementActions,
  GetTextActions,
  InputActions,
  KeyboardActions,
  MouseActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex.js');

class Currency {
  constructor() {
    this.log = new Logs();
    this.currencyPage = new CurrencyPageObject();
    this.date = new Date();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.windowActions = new WindowActions();
    this.mouseActions = new MouseActions();
    this.watch = new StopWatch();
  }
  /** ******************* Currency1 ************************** */

  selectBaseCurrency(baseCurrency, notClick) {
    // this.mouseActions.mouseDownByActions(this.currencyPage.ddlCurrency1());
    const element = this.currencyPage.ddlCurrency1();
    this.mouseActions.mouseDown(element);
    this.clickActions.clickByJScript(this.currencyPage.liCurrency1(baseCurrency));
    this.log.log(`Changed the Base Currency to : ${baseCurrency}`);
    this.verifyCurrencyCasCadClose(notClick);
  }

  getMainCurrency() {
    let returnValue = '';
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.currencyPage.lblInnerCurrency1());
      this.log.log(`The Main Currency is : ${returnValue}`);
      if (returnValue !== '') {
        return returnValue;
      }
    }
    return returnValue;
  }

  isPageReset() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.currencyPage.lblInnerCurrency1(), 'class');
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is moved to currency1');
        return true;
      }
      this.log.log('Focus is not shifted to currency1,going to click reset btn.');
    }
    this.log.log('Still Focus is not on the Currency Field.');
    return false;
  }

  /** ******************* Currency2 ************************** */
  selectCurrency(currencyName) {
    // this.clickActions.click(this.currencyPage.ddlCurrency2());
    this.mouseActions.mouseDown(this.currencyPage.ddlCurrency2());
    // this.clickActions.clickByJScript(this.currencyPage.txtInputCurrency2(currencyName));
    this.inputActions.inputValue(this.currencyPage.txtInputOuterCurrency2(), currencyName);
    this.log.log(`Changed the currency to : ${currencyName}`);
    this.keyboardActions.enterKeys('Enter');
    this.verifyCurrencyCasCadClose();
  }

  getCurrency() { return this.textActions.getTxt(this.currencyPage.lblCurrency2()); }

  selectCurrencyWithoutVerification(currencyName) {
    this.mouseActions.mouseDown(this.currencyPage.ddlCurrency2());
    this.clickActions.clickByJScript(this.currencyPage.txtInputCurrency2(currencyName));
    this.log.log(`Changed the currency to : ${currencyName}`);
  }

  selectCurrencyByKeys(currencyName) {
    this.keyboardActions.enterKeys('Enter');
    this.clickActions.clickByJScript(this.currencyPage.txtInputCurrency2(currencyName));
    this.log.log(`Changed the currency to : ${currencyName}`);
  }

  isCurrency2Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.currencyPage.lblOuterCurrency2(), 'class');
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on to currency3');
        return true;
      }
      this.log.log('Focus is not shifted to currency3.');
    }
    this.log.log('Still Focus is not on the Currency3 Field.');
    return false;
  }

  /** ******************* Currency3 ************************** */
  selectDealtCurrency(currencyName) {
    // this.mouseActions.moveToObject(this.currencyPage.ddlCurrency3().selector);
    this.mouseActions.mouseDown(this.currencyPage.ddlCurrency3());
    this.clickActions.clickByJScript(this.currencyPage.txtInputCurrency2(currencyName));
    this.log.log(`Changed the dealt currency to : ${currencyName}`);
  }

  selectDealtCurrencyByKeys(currencyName) {
    this.keyboardActions.enterKeys('Enter');
    this.clickActions.clickByJScript(this.currencyPage.txtInputCurrency3(currencyName));
    this.log.log(`Changed the dealt currency to : ${currencyName}`);
  }

  getDealtCurrency() { return this.textActions.getTxt(this.currencyPage.lblCurrency3()); }

  isDealtCCYFocused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.currencyPage.lblCurrency3(), 'class');
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on to currency3');
        return true;
      }
      this.log.log('Focus is not shifted to currency3.');
    }
    this.log.log('Still Focus is not on the Currency3 Field.');
    return false;
  }

  verifyCurrencyCasCadClose(notClick) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const element = this.currencyPage.casCadCurrency();
      if (this.isElementClose(element) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      if (notClick === undefined) {
        this.date.clickNumDayCount1();
      }
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isElementClose(elementObject) {
    try {
      if (elementObject === null || elementObject === undefined || elementObject.error !== undefined) {
        this.log.log('Given Element is closed.');
        return true;
      }
    } catch (error) {
      this.log.log(`Error if element is close : ${error}`);
      return false;
    }
    return false;
  }

  getCurrencyListItems() {
    let counter = 0;
    const listText = [];

    this.mouseActions.mouseDown(this.currencyPage.ddlCurrency2());
    // this.windowActions.pause(500);
    const elements = this.currencyPage.liCurrency2();
    // this.log.log(`Elements: ${JSON.stringify(elements)}`);
    elements.forEach((element) => {
      listText[counter] = this.textActions.getTxt(element);
      // this.log.log(`Single element: ${JSON.stringify(element)}`);
      counter += 1;
    });
    // listText = listText[0].split(/\r\n|\r|\n/);
    this.log.log(`Currencies split into strings: ${listText}`);

    return listText;
  }

  verifyCurrencyListOrder(currencyList) {
    const currencyListSort = [...currencyList];
    currencyListSort.sort();
    if (JSON.stringify(currencyList) === JSON.stringify(currencyListSort.sort())) {
      this.log.log('Currency list is in order.');
      return true;
    }
    this.log.log('Currency list is not in order.');
    return false;
  }

  clickLblDealtCcy() { this.clickActions.click(this.currencyPage.lblDealtCcy()); }
}
module.exports = Currency;
