/* eslint-disable max-len */
/* eslint-disable no-undef */
const BlotterData = require('../../data/blotter/BlotterData.js');
const Logs = require('../../core/utility/Logs');
const BlotterModel = require('./BlotterModel.js');
const BlotterExModel = require('./BlotterExModel.js');
const ElementVisibility = require('../../core/element/ElementVisibility.js');
const LoginLogout = require('../../pageobjects/LoginLogoutPageObject');
const GridColumnObject = require('../../pageobjects/blotter/components/GridColumnPageObject');
const GridCellObject = require('../../pageobjects/blotter/components/GridCellPageObject');
const FilterPageObject = require('../../pageobjects/blotter/components/FilterPageObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const ElementFinder = require('../../core/element/ElementFinder.js');
const {
  ClickActions,
  GetTextActions,
  KeyboardActions,
  InputActions,
  ElementActions,
  WindowActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class BlotterRtuModel {
  constructor() {
    this.log = new Logs();
    this.blotterExModel = new BlotterExModel();
    this.blotterModel = new BlotterModel();
    this.elVisibility = new ElementVisibility();
    this.LoginLogout = new LoginLogout();
    this.gridPage = new GridColumnObject();
    this.gridCell = new GridCellObject();
    this.filterPage = new FilterPageObject();
    this.watch = new StopWatch();
    this.elFinder = new ElementFinder();
    this.clickActions = new ClickActions();
    this.textActions = new GetTextActions();
    this.keyboardActions = new KeyboardActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.windowActions = new WindowActions();
    this.mouseActions = new MouseActions();
  }

  hoverRtuIcon() {
    const element = this.gridPage.chkRtuIcon();
    this.mouseActions.moveTo(element);
  }

  getRtuPopOvertext() {
    this.watch.startStopWatch(6);
    while (this.watch.isWatchRunning()) {
      const popUpText = this.textActions.getTxt(this.gridPage.lblRtuPopOver());
      if (popUpText !== undefined && popUpText !== null && popUpText !== '') {
        this.log.log(`Pop up text = ${popUpText}`);
        return popUpText;
      }
      this.log.log('Waiting for pop up text value...gg');
    }
    this.log.log('Problem finding pop up text');
    return null;
  }

  verifyRtuIconColourGreen() {
    this.watch.startStopWatch(15);
    while (this.watch.isWatchRunning()) {
      const attr = this.elementActions.getAttribute(this.gridPage.chkRtuOuterGreenIcon(), 'fill');
      if (attr === '#52C41A') {
        this.log.log('Icon is green, SSE is connected');
        return true;
      }
    }
    this.log.log('Icon is not green');
    return false;
  }

  verifyRtuIconColourRed() {
    this.watch.startStopWatch(6);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.gridPage.chkRtuInnerRedIcon(), 'fill').includes('red') === true) {
        this.log.log('Icon is red, SSE is not connected');
        return true;
      }
    }
    this.log.log('Icon is not red');
    return false;
  }

  verifyRtuIconColourAmber() {
    this.elementActions.waitForDisplayed(this.gridPage.chkRtuAmberIcon());
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.gridPage.chkRtuAmberIcon(), 'style').includes('color: rgb(255, 126, 0);') === true) {
        this.log.log('Icon is amber, SSE is connecting');
        return true;
      }
    }
    this.log.log('Icon is not amber');
    return false;
  }

  waitForDealCancelUpdate(dealId) {
    this.watch.startStopWatch(5);
    let dealAction = '';
    while (this.watch.isWatchRunning()) {
      dealAction = this.blotterModel.getDealAction(dealId);
      if (dealAction === 'CANCEL') {
        this.log.log(`Deal Action for ${dealId} has updated to CANCEL`);
        return true;
      }
      this.log.log('Still waiting for deal to cancel....');
    }
    this.log.log(`Deal Action for ${dealId} has NOT updated to CANCEL`);
    return false;
  }

  waitForAmountEditUpdate(dealId, prevAmount) {
    this.watch.startStopWatch(5);
    let amount = '';
    while (this.watch.isWatchRunning()) {
      amount = this.blotterModel.getAmount(dealId);
      if (amount !== prevAmount) {
        this.log.log(`Amount for ${dealId} has updated to ${amount}`);
        return true;
      }
      this.log.log('Still waiting for deal to update....');
    }
    this.log.log(`Amount for ${dealId} has NOT updated`);
    return false;
  }

  waitForPriceEditUpdate(dealId, prevPrice) {
    this.watch.startStopWatch(5);
    let price = '';
    while (this.watch.isWatchRunning()) {
      price = this.blotterModel.getPrice(dealId);
      if (price !== prevPrice) {
        this.log.log(`Price for ${dealId} has updated to ${price}`);
        return true;
      }
      this.log.log('Still waiting for deal to update....');
    }
    this.log.log(`Price for ${dealId} has NOT updated`);
    return false;
  }

  waitForBuyerBrokerageEditUpdate(dealId, prevBuyerBrokerage) {
    this.watch.startStopWatch(5);
    let buyerBrokerage = '';
    while (this.watch.isWatchRunning()) {
      buyerBrokerage = this.blotterModel.getBuyerBrokerage(dealId);
      if (buyerBrokerage !== prevBuyerBrokerage) {
        this.log.log(`BuyerBrokerage for ${dealId} has updated to ${buyerBrokerage}`);
        return true;
      }
      this.log.log('Still waiting for deal to update....');
    }
    this.log.log(`BuyerBrokerage for ${dealId} has NOT updated`);
    return false;
  }

  waitForSellerBrokerageEditUpdate(dealId, prevSellerBrokerage) {
    this.watch.startStopWatch(5);
    let sellerBrokerage = '';
    while (this.watch.isWatchRunning()) {
      sellerBrokerage = this.blotterModel.getSellerBrokerage(dealId);
      if (sellerBrokerage !== prevSellerBrokerage) {
        this.log.log(`SellerBrokerage for ${dealId} has updated to ${sellerBrokerage}`);
        return true;
      }
      this.log.log('Still waiting for deal to update....');
    }
    this.log.log(`SellerBrokerage for ${dealId} has NOT updated`);
    return false;
  }

  waitForInvestigationFlagCheck(dealId) {
    this.watch.startStopWatch(5);
    let chkInvestigate = '';
    while (this.watch.isWatchRunning()) {
      chkInvestigate = this.blotterModel.isUnderInvestigation(dealId);
      if (chkInvestigate === true) {
        this.log.log(`Deal ${dealId} under investigation flag is checked`);
        return true;
      }
      this.log.log('Still waiting for deal to update....');
    }
    this.log.log(`Deal ${dealId} under investigation flag is not checked`);
    return false;
  }

  waitForInvestigationFlagUncheck(dealId) {
    this.watch.startStopWatch(5);
    let chkInvestigate = '';
    while (this.watch.isWatchRunning()) {
      chkInvestigate = this.blotterModel.isUnderInvestigation(dealId);
      if (chkInvestigate === false) {
        this.log.log(`Deal ${dealId} under investigation flag has been unchecked`);
        return true;
      }
      this.log.log('Still waiting for deal to update....');
    }
    this.log.log(`Deal ${dealId} under investigation flag is checked`);
    return false;
  }
}
module.exports = BlotterRtuModel;
