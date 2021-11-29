/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs');
const BrokeragePageObject = require('../../pageobjects/tradeManagement/BrokeragePageObject');
const StopWatch = require('../../core/utility/StopWatch');
// this.elVisibility = new ElementVisibility();
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
  MouseActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex');

class Brokerage {
  constructor() {
    this.log = new Logs();
    this.brokeragePage = new BrokeragePageObject();
    this.watch = new StopWatch();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
    this.windowActions = new WindowActions();
  }

  rightClickBlotter() {
    this.clickActions.clickByJScript(this.brokeragePage.openDeal());
  }

  closeNotification() {
    this.clickActions.click(this.brokeragePage.closeNotification());
  }
 
  openDeal() {
    // this.clickActions.dblClick(this.brokeragePage.openDeal());
    this.clickActions.rightClick(this.brokeragePage.grdSelectDeal());  
    this.windowActions.pause(1000);
    this.clickActions.click(this.brokeragePage.mnuPopUp());
  // this.windowActions.pause(9000);
  }

  openDealDoubleClick() {
    this.windowActions.pause(1000);
    this.clickActions.dblClick(this.brokeragePage.grdSelectDeal());
    // this.clickActions.click(this.brokeragePage.grdSelectDeal());
  }

  waitForEdit() {
    const hand = this.windowActions.getWindowHandles();
    this.windowActions.switchToWindow(hand[1]);
    this.log.log('Waiting for Trade Management Page');
    this.windowActions.pause(1000);
    this.elementActions.waitForDisplayed(this.brokeragePage.btnEdit());
    /*  if (this.elementActions.waitForDisplayed(this.brokeragePage.btnEdit))
     {
      this.log.log('TRade Management is visible');
      return true;
     } */
    /*  if (this.elVisibility.checkVisibility(this.brokeragePage.lblDealHeader, 'enabled_and_visible', '10')) {
      this.log.log('TRade Management is visible');
      return true;
    } */
    // return false;
  }

  verifyBlotterVisible() {
    if (this.elVisibility.checkVisibility(this.brokeragePage.isBlotterVisible, 'enabled_and_visible', '10')) {
      this.log.log('Blotter is visible');
      return true;
    }
    return false;
  }

  getDealId() { return this.textActions.getInnerHTML(this.brokeragePage.grdGetDealId()); }

  // Verify Data on entry to Trade Managemnt page 
  getdealRef() { return this.textActions.getTxt(this.brokeragePage.lblRefVal()); }

  getDmsType() { return this.textActions.getTxt(this.brokeragePage.lblTypeVal()); }
  
  getDmsAction() { return this.textActions.getTxt(this.brokeragePage.lblActionVal()); }
 
  getTradeDate() {
    let tradeDate = this.textActions.getTxt(this.brokeragePage.lblTradeDateVal());
    tradeDate = tradeDate.slice(0, -3);
    // tradeDate = trimDate(tradeDate);
    return tradeDate;
  }
 
  getDealStatus() { return this.textActions.getTxt(this.brokeragePage.lblStatusVal()); }

  getBuyerCurrency() { return this.textActions.getVal(this.brokeragePage.valPayerCurrancy()); }

  getBuyerAmount() { return this.textActions.getVal(this.brokeragePage.valPayerAmount()); }

  getBuyerBroker() { return this.textActions.getTxt(this.brokeragePage.valBuyerBroker()); }

  getBuyerCenter() { return this.textActions.getTxt(this.brokeragePage.valBuyerCentre()); }

  getBuyerAlloc() { return this.textActions.getTxt(this.brokeragePage.valBuyerAlloc()); }

  getBuyerReceive() { return this.textActions.getTxt(this.brokeragePage.valBuyerRecieve()); }

  getBuyerUpdatedBy() { return this.textActions.getTxt(this.brokeragePage.valBuyerUpdated()); }
  
  getSellerCurrancy() { return this.textActions.getVal(this.brokeragePage.valSellerCurrancy()); }

  getSellerAmount() { return this.textActions.getVal(this.brokeragePage.valSellerAmount()); }

  getSellerBroker() { return this.textActions.getTxt(this.brokeragePage.valSellerBroker()); }

  getSellerCentre() { return this.textActions.getTxt(this.brokeragePage.valSellerCentre()); }

  getSellerAlloc() { return this.textActions.getTxt(this.brokeragePage.valSellerAlloc()); }

  getSellerReceive() { return this.textActions.getTxt(this.brokeragePage.valSellerRecieve()); }

  getSellerUpdatedBy() { return this.textActions.getTxt(this.brokeragePage.valSellerUpdated()); }
 
  clickEditButton() { this.clickActions.click(this.brokeragePage.btnEdit()); }

  // Add new Brokerage on buyer side 
  addNewBuyerBrokerage() {
    this.clickActions.click(this.brokeragePage.btnEdit());
    this.clickActions.click(this.brokeragePage.btnBuyerAdd());
  }

  // Add new Brokerage on seller side 
  addNewSellerBrokerage() {
    this.clickActions.click(this.brokeragePage.btnEdit());
    this.clickActions.click(this.brokeragePage.btnSellerAdd());
  }

  // Edit buyer side
  editBuyerCurr() {
    this.clickActions.click(this.brokeragePage.btnEdit());
    this.editDll(this.brokeragePage.dllBuyerCurrancy(), 'EUR');
    // this.mouseActions.mouseDown(this.brokeragePage.dllBuyerCurrancy());
    // this.windowActions.pause(4000);
    // this.keyboardActions.enterKeys("USD");
    // this.keyboardActions.enterKeys('Enter');
  }

  editInputBuyerBrokerage(brokerageValue) { this.editInput(this.brokeragePage.inputManualBuyerAmt(), brokerageValue); }

  editInputSellerBrokerage(brokerageValue) { this.editInput(this.brokeragePage.inputManualSellerAmt(), brokerageValue); }

  editBuyerBroker() {
    this.clickActions.click(this.brokeragePage.windowClick());
    // this.windowActions.pause(1000);
    // this.clickActions.click(this.brokeragePage.dllBuyerBroker());
    // this.editDll(this.brokeragePage.dllBuyerBroker(),"WENDY WOO")
    this.windowActions.moveToObject(this.brokeragePage.dllBuyerBroker());
    this.mouseActions.mouseDown(this.brokeragePage.dllBuyerBroker());
    this.windowActions.pause(500);
    this.keyboardActions.enterKeys('CINDY WOO');
    this.keyboardActions.enterKeys('Enter');
    this.windowActions.pause(500);
  }
  
  editBuyerCentre() { this.editDll(this.brokeragePage.dllBuyerCentre(), 'NFT-NON-DELIVERABLE FORWARD-TWD'); }

  getEditBuyerAlloc() { return this.textActions.getTxt(this.brokeragePage.inputBuyerAlloc()); }

  editBuyerBrokerage() { this.editInput(this.brokeragePage.inputBuyerBrokerage(), '2.11'); }

  // Edit Seller side

  editSellerCurrency() { this.editDll(this.brokeragePage.dllSellerCurrency(), 'EUR'); }

  editInputSeller() { this.editInput(this.brokeragePage.inputManualSellerAmt(), '50000000'); }

  editSellerBroker() { this.editDll(this.brokeragePage.dllSellerBroker(), 'CINDY WOO'); }

  editSellerCentre() { this.editDll(this.brokeragePage.dllSellerCentre(), 'NFT-NON-DELIVERABLE FORWARD-TWD'); }

  getEditSellerAlloc() { return this.elementActions.getProperty(this.brokeragePage.inputSellerAlloc(), 'title'); }

  editSellerBrokerage() { this.editInput(this.brokeragePage.inputSellerBrokerage(), '25000000'); }

  // getBuyerBrokerageType() { return this.textActions.getVal(this.brokeragePage.lblBuyerBrokerageType()); }

  getBuyerBrokerageType() { return this.elementActions.getAttribute(this.brokeragePage.lblBuyerBrokerageType(), 'innerText'); }

  getSellerBrokerageType() { return this.elementActions.getAttribute(this.brokeragePage.lblSellerAuto(), 'innerText'); }

  getBuyerBrokerageTypeEdit() { 
    this.clickActions.click(this.brokeragePage.lblBuyerHeader());
    return this.elementActions.getAttribute(this.brokeragePage.lblBuyerBrokerageTypeEdit(), 'innerText'); 
  }

  getSellerBrokerageTypeEdit() {
    this.clickActions.click(this.brokeragePage.lblBuyerHeader());
    return this.elementActions.getAttribute(this.brokeragePage.lblSellerBrokerageTypeEdit(), 'innerText');
  }

  verifyBrokerEmptyTable() { return this.elementActions.isElementAvailable(this.brokeragePage.brokerEmptyTable()); }

  verifyBrokerageExplanation() { return this.elementActions.isElementAvailable(this.brokeragePage.brokerageExplanation()); }

  verifyBrokerExplanationSeller() { return this.elementActions.isElementAvailable(this.brokeragePage.brokerageExplanationSeller()); }

  editInput(element, value) {
    this.windowActions.moveToObject(element);
    this.mouseActions.mouseDown(element);
    this.windowActions.pause(500);
    this.inputActions.clearByBackSpace(element.getValue().length);
    this.windowActions.pause(500);
    this.inputActions.inputValue(element, value);
    this.keyboardActions.enterKeys('Enter');
    this.windowActions.pause(500);
  }

  editDll(element, value) {
    this.windowActions.pause(500);
    this.windowActions.moveToObject(element);
    this.mouseActions.mouseDown(element);
    this.windowActions.pause(500);
    this.keyboardActions.enterKeys(value);
    this.keyboardActions.enterKeys('Enter');
    this.windowActions.pause(500);
  }

  saveEdits() {
    this.clickActions.click(this.brokeragePage.btnSave());
    this.elementActions.waitForDisplayed(this.brokeragePage.txtAreaSave());
    this.keyboardActions.enterKeys('Test editing the Deal');
    this.clickActions.click(this.brokeragePage.btnEditnOk());
    this.windowActions.pause(500);
  }

  /* ***********
  Requires Fix
  *********** */
  /*  getCurrentDate() {
    let d = new Date().toLocaleString('en-gb').replace(',', '');
    // let d = new Date(options);
    // d = d.replace(",","");
  
    const dateArr = d.split('/');
    d = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
    d = d.slice(0, -6);

    // let d = moment( new Date() );
  
    return d;
  }

  trimDate(d) {
    d = d.slice(0, -3);
    return d;
  } */
}
module.exports = Brokerage;
