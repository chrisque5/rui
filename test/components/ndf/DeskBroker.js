const Logs = require('../../core/utility/Logs.js');
const BrokerPageObject = require('../../pageobjects/ndf/components/DeskBrokerPageObject.js');
const Date = require('./Date.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  KeyboardActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex.js');

class DeskBroker {
  constructor() {
    this.log = new Logs();
    this.brokerPage = new BrokerPageObject();
    this.date = new Date();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.windowActions = new WindowActions();
    this.watch = new StopWatch();
  }

  /** ******************** Buyer ************************** */
  selectBuyerBrokerName(brokerDesk, brokerName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
    }
    this.windowActions.scroll(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  selectBuyerBrokerBySearchLowerKeys(brokerDesk, brokerName) {
    this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
    this.clickActions.click(this.brokerPage.ddlBuyerBrokerClickToType());
    this.keyboardActions.enterKeys(brokerName.toLowerCase());
    this.clickActions.clickByJScript(this.brokerPage.liBrokerNameLower(`${brokerDesk}`, `${brokerName}`));
    this.verifyCasCadClose();
  }

  selectBuyerBrokerBySearchUpperKeys(brokerDesk, brokerName) {
    this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
    this.clickActions.click(this.brokerPage.ddlBuyerBrokerClickToType());
    this.keyboardActions.enterKeys(brokerName);
    this.clickActions.clickByJScript(this.brokerPage.liBrokerNameUpper(`${brokerDesk}`, `${brokerName}`));
    this.verifyCasCadClose();
  }

  inputBuyerBrokerByKeys(buyerBroker) {
    this.clickActions.click(this.brokerPage.ddlBuyerBrokerClickToType());
    this.keyboardActions.enterKeys(buyerBroker);
  }

  getBuyerBrokerName() { return this.textActions.getTxt(this.brokerPage.lblBuyerBroker()); }

  isBuyerBrokerFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokerPage.ddlBuyerBrokerFocus(), 'class');
      this.log.log(`Buyer Broker attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on Buyer Broker');
        return true;
      }
      this.log.log('Focus is not shifted to Buyer Broker.');
    }
    this.log.log('Still Focus is not on the Buyer Broker Field.');
    return false;
  }

  // 3CP

  selectcp2BuyerBrokerName(brokerDesk, brokerName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.brokerPage.ddlcp2BuyerBroker());
      this.windowActions.scroll(this.brokerPage.liBrokerName(brokerDesk));
    }
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  getcp2BuyerBrokerName() { return this.textActions.getTxt(this.brokerPage.lblcp2BuyerBroker()); }

  iscp2BuyerBrokerFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokerPage.ddlcp2BuyerBrokerFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on cp2 Buyer Broker');
        return true;
      }
      this.log.log('Focus is not shifted to cp2 Buyer Broker.');
    }
    this.log.log('Still Focus is not on the cp2 Buyer Broker Field.');
    return false;
  }

  /** ******************** Seller ************************** */
  selectSellerBrokerName(brokerDesk, brokerName, autoTab) {
    if (autoTab !== true) {
      this.clickActions.clickByJScript(this.brokerPage.ddlSellerBroker());
    }
    this.windowActions.scroll(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  selectSellerBrokerBySearchLowerKeys(brokerDesk, brokerName) {
    this.clickActions.clickByJScript(this.brokerPage.ddlSellerBroker());
    this.clickActions.click(this.brokerPage.ddlSellerBrokerClickToType());
    this.keyboardActions.enterKeys(brokerName.toLowerCase());
    this.clickActions.clickByJScript(this.brokerPage.liBrokerNameLower(`${brokerDesk}`, `${brokerName}`));
    this.verifyCasCadClose();
  }

  selectSellerBrokerBySearchUpperKeys(brokerDesk, brokerName) {
    this.clickActions.clickByJScript(this.brokerPage.ddlSellerBroker());
    this.clickActions.click(this.brokerPage.ddlSellerBrokerClickToType());
    this.keyboardActions.enterKeys(brokerName);
    this.clickActions.clickByJScript(this.brokerPage.liBrokerNameUpper(`${brokerDesk}`, `${brokerName}`));
    this.verifyCasCadClose();
  }

  inputSellerBrokerByKeys(SellerKeys) {
    this.clickActions.click(this.brokerPage.ddlSellerBrokerClickToType());
    this.keyboardActions.enterKeys(SellerKeys);
  }

  getSellerBrokerName() { return this.textActions.getTxt(this.brokerPage.lblSellerBroker()); }

  isSellerBrokerFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokerPage.ddlSellerBrokerFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on Seller Broker');
        return true;
      }
      this.log.log('Focus is not shifted to Seller Broker.');
    }
    this.log.log('Still Focus is not on the Seller Broker Field.');
    return false;
  }

  // 3CP

  selectcp2SellerBrokerName(brokerDesk, brokerName, autoTab) {
    if (autoTab !== true) {
      this.windowActions.scroll(this.brokerPage.ddlcp2SellerBroker());
      this.clickActions.clickByJScript(this.brokerPage.ddlcp2SellerBroker());
    }
    this.windowActions.scroll(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerName));
    if (autoTab !== true) {
      this.verifyCasCadClose();
    }
  }

  getcp2SellerBrokerName() { return this.textActions.getTxt(this.brokerPage.lblcp2SellerBroker()); }

  iscp2SellerBrokerFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokerPage.ddlcp2SellerBrokerFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-cascader-picker-focused')) {
        this.log.log('Focus is on cp2 Seller Broker');
        return true;
      }
      this.log.log('Focus is not shifted to cp2 Seller Broker.');
    }
    this.log.log('Still Focus is not on the cp2 Seller Broker Field.');
    return false;
  }

  /** ******************** Common ************************** */
  verifyCasCadClose() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.brokerPage.casCadBuyerSeller()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.date.clickNumDayCount1();
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

  verifyBrokerNotInList(brokerDesk, brokerName) {
    this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
    this.windowActions.scroll(this.brokerPage.liBrokerName(brokerDesk));
    this.clickActions.clickByJScript(this.brokerPage.liBrokerName(brokerDesk));
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.brokerPage.liBrokerName(brokerName)) === true) {
        this.log.log('Broker is not available in the dropdown list.');
        this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
        return true;
      }
    }
    this.log.log('Broker is still available in the dropdown list.');
    return false;
  }

  verifyDeskNotInList(brokerDesk) {
    this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.brokerPage.liDeskName(brokerDesk)) === true) {
        this.log.log('Desk is not available in the dropdown list.');
        this.clickActions.clickByJScript(this.brokerPage.ddlBuyerBroker());
        return true;
      }
    }
    this.log.log('Desk is still available in the dropdown list.');
    return false;
  }
}
module.exports = DeskBroker;
