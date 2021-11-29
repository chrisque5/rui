const CurrenciesAdminPage = require('../../pageobjects/admin/CurrenciesAdminPageObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const Log = require('../../core/utility/Logs.js');
const ElementFinder = require('../../core/element/ElementFinder.js');
const LoginModel = require('../LoginModel.js');
const {
  ClickActions,
  WindowActions,
  ElementActions,
} = require('../../core/actions/ActionsIndex.js');

class CurrenciesAdminModel {
  constructor() {
    this.currencies = new CurrenciesAdminPage();
    this.watch = new StopWatch();
    this.log = new Log();
    this.elFinder = new ElementFinder();
    this.loginModel = new LoginModel();
    this.clickActions = new ClickActions();
    this.windowActions = new WindowActions();
    this.elementActions = new ElementActions();
  }

  moveToNdfNoVerify() {
    this.loginModel.selectNDF();
  }

  moveToFwdNoVerify() {
    this.loginModel.selectFWD();
  }

  moveToSptNoVerify() {
    this.loginModel.selectSPT();
  }

  clickRdoDealTypeNdf() {
    this.clickActions.clickByJScript(this.currencies.rdodealTypeNDF());
  }

  clickRdoDealTypeFwd() {
    this.clickActions.clickByJScript(this.currencies.rdodealTypeFWD());
  }

  clickRdoDealTypeSpt() {
    this.clickActions.clickByJScript(this.currencies.rdodealTypeSPT());
  }

  verifyNdfDealTypeSelected() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.currencies.rdodealTypeNDFSelect(), 'class');
      this.log.log(`NDF radio button attribute value: ${attValue}`);
      if (attValue === 'ant-radio ant-radio-checked') {
        this.log.log('NDF Deal Type successfully selected.');
        return true;
      }
      this.log.log('NDF not yet checked.');
    }
    this.log.log('NDF has not been selected.');
    return false;
  }

  verifyFwdDealTypeSelected() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.currencies.rdodealTypeFWDSelect(), 'class');
      this.log.log(`FWD radio button attribute value: ${attValue}`);
      if (attValue === 'ant-radio ant-radio-checked') {
        this.log.log('FWD Deal Type successfully selected.');
        return true;
      }
      this.log.log('FWD not yet checked.');
    }
    this.log.log('FWD has not been selected.');
    return false;
  }

  verifySptDealTypeSelected() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.currencies.rdodealTypeSPTSelect(), 'class');
      this.log.log(`SPT radio button attribute value: ${attValue}`);
      if (attValue === 'ant-radio ant-radio-checked') {
        this.log.log('SPT Deal Type successfully selected.');
        return true;
      }
      this.log.log('SPT not yet checked.');
    }
    this.log.log('SPT has not been selected.');
    return false;
  }

  btnCancelClick() {
    this.clickActions.clickByJScript(this.currencies.btnCancel());
  }

  btnApplyClick() {
    this.clickActions.clickByJScript(this.currencies.btnApply());
  }

  currencyScrollUp() {
    this.windowActions.scrollUp(this.currencies.currencyScroll(), 250);
  }

  currencyScrollDown() {
    this.windowActions.scrollDown(this.currencies.currencyScroll(), 250);
  }

  bringCurrencyRowIntoView(instrumentId) {
    this.log.log(`Instrument ID = ${instrumentId}`);
    let element = '';
    element = this.currencies.chkCurrencyNoCheck(instrumentId);
    if (this.elFinder.getElement(element) !== null) {
      this.log.log('Currency pair is visible in the DOM');
      return true;
    }
    let count = 0;
    while (count < 10) {
      this.currencyScrollDown();
      this.log.log('Currency pair is still not in view');
      count += 1;
      this.log.log(`count = ${count}`);
      if (this.elFinder.getElement(element) !== null) {
        this.log.log('Currency pair is now visible in the DOM');
        return true;
      }
    }
    this.log.log('Currency pair is not visible in the DOM');
    return false;
  }

  checkCurrencyPair(instrumentId) {
    if (this.verifyCurrencyPairSelected(instrumentId) !== true) {
      this.clickActions.clickByJScript(this.currencies.chkCurrency(instrumentId));
      this.log.log('Currency pair checked');
    } else if (this.verifyCurrencyPairSelected(instrumentId) === true) {
      this.log.log('Currency pair already checked');
    }
  }

  unCheckCurrencyPair(instrumentId) {
    if (this.verifyCurrencyPairSelected(instrumentId) === true) {
      this.clickActions.clickByJScript(this.currencies.chkCurrency(instrumentId));
      this.log.log('Currency pair unchecked');
    } else if (this.verifyCurrencyPairSelected(instrumentId) !== true) {
      this.log.log('Currency pair already not checked');
    }
  }

  verifyCurrencyPairSelected(instrumentId) {
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.currencies.chkCurrency(instrumentId), 'value').includes('true') === true) {
        this.log.log('Currency Pair successfully selected');
        return true;
      }
      this.log.log('Currency Pair not yet selected');
    }
    this.log.log('Currency Pair not selected');
    return false;
  }

  verifyCurrencyPairDeSelected(instrumentId) {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (!this.elementActions.getAttribute(this.currencies.chkCurrency(instrumentId), 'value').includes('true') === true) {
        this.log.log('Currency Pair successfully deselected');
        return true;
      }
      this.log.log('Currency Pair not yet deselected');
    }
    this.log.log('Currency Pair still selected');
    return false;
  }
}
module.exports = CurrenciesAdminModel;
