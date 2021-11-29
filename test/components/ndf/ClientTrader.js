/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs.js');
const ClientTraderPageObject = require('../../pageobjects/ndf/components/ClientTraderPageObject.js');
const Date = require('./Date.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  KeyboardActions,
  WindowActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class ClientTrader {
  constructor() {
    this.log = new Logs();
    this.clientTraderPage = new ClientTraderPageObject();
    this.date = new Date();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.windowActions = new WindowActions();
    this.mouseActions = new MouseActions();
    this.watch = new StopWatch();
  }
  /** ************************* Buyer ************************ */

  selectBuyerTrader(buyerFirmName, buyerTraderName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.clientTraderPage.btnClearBuyerClientTrader());
      this.clickActions.clickByJScript(this.clientTraderPage.ddlBuyerClientTrader());
    }
    this.windowActions.scroll(this.clientTraderPage.liBuyerSellerClientName(buyerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(buyerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(buyerTraderName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  selectBuyerTraderBySearchLowerKeys(buyerFirmName, buyerTraderName) {
    this.clickActions.clickByJScript(this.clientTraderPage.btnClearBuyerClientTrader());
    this.clickActions.click(this.clientTraderPage.ddlBuyerClientTraderClickToType());
    this.keyboardActions.enterKeys(buyerTraderName.toLowerCase());
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientTraderName(`${buyerFirmName}`, `${buyerTraderName}`));
    this.verifyCasCadClose();
  }

  selectBuyerTraderBySearchUpperKeys(buyerFirmName, buyerTraderName) {
    this.clickActions.clickByJScript(this.clientTraderPage.btnClearBuyerClientTrader());
    this.clickActions.click(this.clientTraderPage.ddlBuyerClientTraderClickToType());
    this.keyboardActions.enterKeys(buyerTraderName);
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientTraderNameUpper(`${buyerFirmName}`, `${buyerTraderName}`));
    this.verifyCasCadClose();
  }

  inputBuyerTraderByKeys(buyerTrader) {
    this.clickActions.click(this.clientTraderPage.ddlBuyerClientTraderClickToType());
    this.keyboardActions.enterKeys(buyerTrader);
  }

  getBuyerClientTraderLbl() { return this.textActions.getTxt(this.clientTraderPage.lblBuyerClientTrader()); }

  hoverBuyerInfoIcon() {
    // eslint-disable-next-line radix
    // this.mouseActions.hoverElement(parseInt(this.clientTraderPage.btnInfoBuyerClientTrader().getLocation('x')), parseInt(this.clientTraderPage.btnInfoBuyerClientTrader().getLocation('y')));
    this.mouseActions.moveTo(this.clientTraderPage.btnInfoBuyerClientTrader());
  }

  hoverBuyerClientTrader() {
    /* const x = this.clientTraderPage.lblBuyerClientTrader().getLocation('x');
    const y = this.clientTraderPage.lblBuyerClientTrader().getLocation('y');
    // // eslint-disable-next-line radix
    this.mouseActions.hoverElement(parseInt(x), parseInt(y)); */
    this.mouseActions.moveTo(this.clientTraderPage.lblBuyerClientTrader());
  }

  isAnyErrorOnBuyerTrader() {
    // return this.elementActions.isAvailable(this.clientTraderPage.lblBuyerClientTraderError());
    if (this.textActions.getTxt(this.clientTraderPage.txtBuyerClientTraderError()) !== '') {
      return true;
    }
    return false;
  }

  isBuyerClientTraderFocused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.clientTraderPage.ddlBuyerClientTraderFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on Buyer Client Trader');
        return true;
      }
      this.log.log('Focus is not shifted to Buyer Client Trader.');
    }
    this.log.log('Still Focus is not on the Buyer Client Trader Field.');
    return false;
  }

  // 3CP
  selectcp2BuyerTrader(buyerFirmName, buyerTraderName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.clientTraderPage.btncp2ClearBuyerClientTrader());
      this.clickActions.clickByJScript(this.clientTraderPage.ddlcp2BuyerClientTrader());
    }
    this.windowActions.scroll(this.clientTraderPage.liBuyerSellerClientName(buyerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(buyerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(buyerTraderName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  getcp2BuyerClientTraderLbl() { return this.textActions.getTxt(this.clientTraderPage.lblcp2BuyerClientTrader()); }

  hovercp2BuyerInfoIcon() {
    // eslint-disable-next-line radix
    this.mouseActions.hoverElement(parseInt(this.clientTraderPage.btncp2InfoBuyerClientTrader().getLocation('x')), parseInt(this.clientTraderPage.btncp2InfoBuyerClientTrader().getLocation('y')));
  }

  iscp2BuyerClientTraderFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.clientTraderPage.ddlcp2BuyerClientTraderFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on cp2 Buyer Client Trader');
        return true;
      }
      this.log.log('Focus is not shifted to cp2 Buyer Client Trader.');
    }
    this.log.log('Still Focus is not on the cp2 Buyer Client Trader Field.');
    return false;
  }

  /** ************************* Seller ************************ */
  selectSellerTrader(sellerFirmName, sellerTraderName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.clientTraderPage.btnClearSellerClientTrader());
      this.clickActions.clickByJScript(this.clientTraderPage.ddlSellerClientTrader());
    }
    this.windowActions.scroll(this.clientTraderPage.liBuyerSellerClientName(sellerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(sellerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(sellerTraderName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  selectSellerTraderBySearchLowerKeys(sellerFirmName, sellerTraderName) {
    this.clickActions.clickByJScript(this.clientTraderPage.btnClearSellerClientTrader());
    this.clickActions.click(this.clientTraderPage.ddlSellerClientTraderClickToType());
    this.keyboardActions.enterKeys(sellerTraderName.toLowerCase());
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientTraderName(`${sellerFirmName}`, `${sellerTraderName}`));
    this.verifyCasCadClose();
  }

  selectSellerTraderBySearchUpperKeys(sellerFirmName, sellerTraderName) {
    this.clickActions.clickByJScript(this.clientTraderPage.btnClearSellerClientTrader());
    this.clickActions.click(this.clientTraderPage.ddlSellerClientTraderClickToType());
    this.keyboardActions.enterKeys(sellerTraderName);
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientTraderNameUpper(`${sellerFirmName}`, `${sellerTraderName}`));
    this.verifyCasCadClose();
  }

  inputSellerTraderByKeys(sellerTrader) {
    this.clickActions.click(this.clientTraderPage.ddlSellerClientTraderClickToType());
    this.keyboardActions.enterKeys(sellerTrader);
    this.keyboardActions.enterKeys('Enter');
  }

  getSellerClientTraderLbl() { return this.textActions.getTxt(this.clientTraderPage.lblSellerClientTrader()); }

  hoverSellerInfoIcon() {
    // eslint-disable-next-line radix
    // this.mouseActions.hoverElement(parseInt(this.clientTraderPage.btnInfoSellerClientTrader().getLocation('x')), parseInt(this.clientTraderPage.btnInfoSellerClientTrader().getLocation('y')));
    this.mouseActions.moveTo(this.clientTraderPage.btnInfoSellerClientTrader());
  }

  isSellerClientTraderFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.clientTraderPage.ddlSellerClientTraderFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on Seller Client Trader');
        return true;
      }
      this.log.log('Focus is not shifted to Seller Client Trader.');
    }
    this.log.log('Still Focus is not on the Seller Client Trader Field.');
    return false;
  }

  // 3CP

  selectcp2SellerTrader(sellerFirmName, sellerTraderName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.clientTraderPage.btncp2ClearSellerClientTrader());
      this.clickActions.clickByJScript(this.clientTraderPage.ddlcp2SellerClientTrader());
    }
    this.windowActions.scroll(this.clientTraderPage.liBuyerSellerClientName(sellerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(sellerFirmName));
    this.clickActions.clickByJScript(this.clientTraderPage.liBuyerSellerClientName(sellerTraderName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  getcp2SellerClientTraderLbl() { return this.textActions.getTxt(this.clientTraderPage.lblcp2SellerClientTrader()); }

  hovercp2SellerInfoIcon() {
    // eslint-disable-next-line radix
    this.mouseActions.hoverElement(parseInt(this.clientTraderPage.btncp2InfoSellerClientTrader().getLocation('x')), parseInt(this.clientTraderPage.btncp2InfoSellerClientTrader().getLocation('y')));
  }

  iscp2SellerClientTraderFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.clientTraderPage.ddlcp2SellerClientTraderFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on cp2 Seller Client Trader');
        return true;
      }
      this.log.log('Focus is not shifted to cp2 Seller Client Trader.');
    }
    this.log.log('Still Focus is not on the cp2 Seller Client Trader Field.');
    return false;
  }
 
  /* ******************************** Common ******************************* */

  isPageLoadComplete() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.clientTraderPage.ddlBuyerClientTraderClickToType(), 'placeholder');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue === 'Please select') {
        this.log.log('Page Load Completed.');
        return true;
      }
      this.log.log('Page is still loading.');
    }
    this.log.log('Page is not loaded.');
    return false;
  }

  verifyCasCadClose() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.clientTraderPage.casCadBuyerSeller()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.date.clickNumDayCount1();
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isCasCadClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.clientTraderPage.casCadBuyerSeller()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isCasCadOpen() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.clientTraderPage.casCadBuyerSeller()) === false) {
        this.log.log('Cascad is open.');
        return true;
      }
      this.log.log('Cascad is still not open.');
    }
    this.log.log('Cascad is not open');
    return false;
  }

  isCasCadContainsEmptyTrader() {
    this.clickActions.clickByJScript(this.clientTraderPage.btnClearBuyerClientTrader());
    this.clickActions.clickByJScript(this.clientTraderPage.ddlBuyerClientTrader());
    let counter = 0;
    const elements = this.clientTraderPage.liBuyerSeller();
    const emptyTrader = [];
    elements.forEach((element) => {
      emptyTrader[counter] = this.elementActions.getHTML(element).includes('ant-cascader-menu-item-expand-icon');
      counter += 1;
    });
    if (emptyTrader.length === elements.length) {
      this.verifyCasCadClose();
      return false;
    }
    this.verifyCasCadClose();
    return true;
  }

  /* ******************************** Info PopUp ******************************* */

  getClientInfoPopUpText() {
    let counter = 0;
    const infoText = [];
    const elements = this.clientTraderPage.lblInfoPopUp();
    elements.forEach((element) => {
      infoText[counter] = this.textActions.getTxt(element);
      this.log.log(`element text = ${infoText[counter]}`);
      counter += 1;
    });
    this.verifyInfoPopUpClose();
    this.log.log(infoText);
    return infoText;
  }

  getBuyerCounterPartySideside() { return this.textActions.getTxt(this.clientTraderPage.btnBuyerCounterPartySide()); }

  getSellerCounterPartySideside() { return this.textActions.getTxt(this.clientTraderPage.btnSellerCounterPartySide()); }

  verifyBuyerCounterPartySide(side) {
    let counterParty = '';
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      counterParty = this.getBuyerCounterPartySideside();
      if (counterParty === side) {
        this.log.log('Counter Party Side has found.');
        return true;
      }
    }
    this.log.log('CounterParty is not changed.');
    return false;
  }

  verifySellerCounterPartySide(side) {
    let counterParty = '';
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      counterParty = this.getSellerCounterPartySideside();
      if (counterParty === side) {
        this.log.log('Counter Party Side has found.');
        return true;
      }
    }
    this.log.log('CounterParty is not changed.');
    return false;
  }

  verifyInfoPopUpClose() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.clientTraderPage.lblInfoPopUpClose()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.clickActions.click(this.date.clickNumDayCount1());
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isElementClose(elementObject) {
    if (elementObject === null || elementObject === undefined || this.elementActions.isDisplayed(elementObject) === false) {
      this.log.log('Given Element is closed.');
      return true;
    }
    return false;
  }
}
module.exports = ClientTrader;
