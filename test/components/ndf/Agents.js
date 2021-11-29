const Logs = require('../../core/utility/Logs');
const AgentPageObject = require('../../pageobjects/ndf/components/AgentsPageObject');
const Date = require('./Date');
const StopWatch = require('../../core/utility/StopWatch');
const {
  ClickActions,
  ElementActions,
  GetTextActions,
  KeyboardActions,
  MouseActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex');

class Agents {
  constructor() {
    this.log = new Logs();
    this.agentPage = new AgentPageObject();
    this.date = new Date();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.textActions = new GetTextActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
    this.windowActions = new WindowActions();
    this.watch = new StopWatch();
  }

  /** ******************** Buyer ************************** */
  selectBuyerAgent(agentName, autoTab) {
    if (autoTab !== true) {
      // this.clickActions.clickByJScript(this.agentPage.btnClearBuyerAgent());
      // this.clickActions.clickByJScript(this.agentPage.ddlBuyerAgent());
      this.mouseActions.mouseDown(this.agentPage.ddlBuyerAgent());
    }
    this.windowActions.scroll(this.agentPage.liBuyerSellerAgent(agentName));
    this.clickActions.clickByJScript(this.agentPage.liBuyerSellerAgent(agentName));
    if (autoTab !== true) {
      this.verifyAgentCasCadClose();
    }
  }

  inputBuyerAgentByKeys(buyerAgent) {
    // this.clickActions.clickByJScript(this.agentPage.inputBuyerAgent());
    this.mouseActions.mouseDown(this.agentPage.inputBuyerAgent());
    this.keyboardActions.enterKeys(buyerAgent);
    this.keyboardActions.enterKeys('Enter');
  }

  getBuyerAgentLbl() { return this.textActions.getTxt(this.agentPage.lblBuyerAgent()); }

  clearBuyerAgent() { this.clickActions.clickByJScript(this.agentPage.btnClearBuyerAgent()); }

  verifyNoBuyerAgentSelected() { return this.textActions.getTxt(this.agentPage.lblBuyerAgentEmpty()); }

  isBuyerAgentFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.agentPage.ddlBuyerAgentFocus(), 'class');
      this.log.log(`Buyer Agent attribute value: ${attValue}`);
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on Buyer Agent');
        return true;
      }
      this.log.log('Focus is not shifted to Buyer Agent Trader.');
    }
    this.log.log('Still Focus is not on the Buyer Agent Trader Field.');
    return false;
  }

  isBuyerAgentEnabled() {
    const attribute = this.elementActions.getAttribute(this.agentPage.lblOuterBuyerAgent(), 'class');
    if (attribute.includes('ant-select-disabled')) {
      this.log.log('Buyer Agent is Disabled');
      return false;
    }
    this.log.log('Buyer Agent is Enabled');
    return true;
  }

  // 3CP

  selectCP2BuyerAgent(agentName, autoTab) {
    if (autoTab !== true) {
      // this.clickActions.clickByJScript(this.agentPage.btnClearCP2BuyerAgent());
      // this.clickActions.clickByJScript(this.agentPage.ddlCP2BuyerAgent());
      this.mouseActions.mouseDown(this.agentPage.ddlCP2BuyerAgent());
    }
    this.windowActions.scroll(this.agentPage.liBuyerSellerAgent(agentName));
    this.clickActions.clickByJScript(this.agentPage.liBuyerSellerAgent(agentName));
    if (autoTab !== true) {
      this.verifyAgentCasCadClose();
    }
  }

  inputCP2BuyerAgentByKeys(buyerAgent) {
    // this.clickActions.clickByJScript(this.agentPage.inputCP2BuyerAgent());
    this.mouseActions.mouseDown(this.agentPage.inputCP2BuyerAgent());
    this.keyboardActions.enterKeys(buyerAgent);
    this.keyboardActions.enterKeys('Enter');
  }

  getcp2BuyerAgentLbl() { return this.textActions.getTxt(this.agentPage.lblCP2BuyerAgent()); }

  iscp2BuyerAgentFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.agentPage.ddlcp2BuyerAgentFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on cp2 Buyer Agent');
        return true;
      }
      this.log.log('Focus is not shifted to cp2 Buyer Agent Trader.');
    }
    this.log.log('Still Focus is not on the cp2 Buyer Agent Trader Field.');
    return false;
  }

  /** ******************** Seller ************************** */
  selectSellerAgent(agentName, autoTab) {
    if (autoTab !== true) {
      // this.clickActions.clickByJScript(this.agentPage.btnClearSellerAgent());
      // this.clickActions.clickByJScript(this.agentPage.ddlSellerAgent());
      this.mouseActions.mouseDown(this.agentPage.ddlSellerAgent());
    }
    this.windowActions.scroll(this.agentPage.liBuyerSellerAgent(agentName));
    this.clickActions.clickByJScript(this.agentPage.liBuyerSellerAgent(agentName));
    if (autoTab !== true) {
      this.verifyAgentCasCadClose();
    }
  }

  inputSellerAgentByKeys(sellerAgent) {
    this.mouseActions.mouseDown(this.agentPage.inputSellerAgent());
    this.keyboardActions.enterKeys(sellerAgent);
    this.keyboardActions.enterKeys('Enter');
  }

  getSellerAgentLbl() { return this.textActions.getTxt(this.agentPage.lblSellerAgent()); }

  verifyNoSellerAgentSelected() { return this.textActions.getTxt(this.agentPage.lblSellerAgentEmpty()); }

  isSellerAgentFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.agentPage.ddlSellerAgentFocus(), 'class');
      this.log.log(`Client Trader attribute value: ${attValue}`);
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on Seller Agent');
        return true;
      }
      this.log.log('Focus is not shifted to Seller Agent Trader.');
    }
    this.log.log('Still Focus is not on the Seller Agent Trader Field.');
    return false;
  }

  // 3CP

  selectCP2SellerAgent(agentName, autoTab) {
    if (autoTab !== true) {
      // this.clickActions.clickByJScript(this.agentPage.btnClearCP2SellerAgent());
      // this.clickActions.clickByJScript(this.agentPage.ddlCP2SellerAgent());
      this.mouseActions.mouseDown(this.agentPage.ddlCP2SellerAgent());
    }
    this.windowActions.scroll(this.agentPage.liBuyerSellerAgent(agentName));
    this.clickActions.clickByJScript(this.agentPage.liBuyerSellerAgent(agentName));
    if (autoTab !== true) {
      this.verifyAgentCasCadClose();
    }
  }

  inputCP2SellerAgentByKeys(sellerAgent) {
    // this.clickActions.clickByJScript(this.agentPage.inputCP2SellerAgent());
    this.mouseActions.mouseDown(this.agentPage.inputCP2SellerAgent());
    this.keyboardActions.enterKeys(sellerAgent);
    this.keyboardActions.enterKeys('Enter');
  }

  getcp2SellerAgentLbl() { return this.textActions.getTxt(this.agentPage.lblCP2SellerAgent()); }

  iscp2SellerAgentFocus() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.agentPage.ddlcp2SellerAgentFocus(), 'class');
      this.log.log(`Client Trader info: ${JSON.stringify(this.agentPage.ddlcp2SellerAgentFocus())} attValue = ${attValue}`);
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on cp2 Seller Agent');
        return true;
      }
      this.log.log('Focus is not shifted to cp2 Seller Agent Trader.');
    }
    this.log.log('Still Focus is not on the cp2 Seller Agent Trader Field.');
    return false;
  }

  /* ************************ Common ********************* */
  verifyAgentCasCadClose() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.isElementClose(this.agentPage.casCadAgent()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.clickActions.click(this.date.clickNumDayCount1());
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isAgentCasCadOpen() {
    return this.elementActions.isElementAvailable(this.agentPage.casCadAgent());
  }
}
module.exports = Agents;
