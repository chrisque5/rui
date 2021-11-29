/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const path = require('path');
const xlsx = require('xlsx');
const BlotterModel = require('../../models/blotter/BlotterModel.js');
const BlotterExModel = require('../../models/blotter/BlotterExModel.js');
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const Logs = require('../../core/utility/Logs.js');
const SharedStore = require('../../core/store/SharedStore.js');
const WindowActions = require('../../core/actions/WindowActions.js');
const BlotterDealCreation = require('./fx.deals.spec.js');
const ExcelReader = require('../../core/utility/ExcelReader.js');

const LocalUsers = require('../../data/UserDetails.js');
const LocalInstrument = require('../../data/InstrumentDetails.js');
const QaUsers = require('../../data/qa/UserDetails.js');
const QaInstrument = require('../../data/qa/InstrumentDetails.js');
const QaFwdUsers = require('../../data/qa/fwd/UserDetails.js');
const QaFwdInstrument = require('../../data/qa/fwd/InstrumentDetails.js');
const FwdUsers = require('../../data/fwd/UserDetails.js');
const FwdInstrument = require('../../data/fwd/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');
const BlotterData = require('../../data/blotter/BlotterData.js');

let users = null;
let instrument = null;
let fwdUsers = null;
let fwdInstrument = null;
let blotterUrlConst = null;
let dmsLoginPage = null;

let deal01Id = '';
let deal02Leg1Id = '';
let deal02Leg2Id = '';
let deal03Id = '';
let deal04Id = '';
let deal05Id = '';
let deal06Id = '';
let deal07Leg1Id = '';
let deal07Leg2Id = '';
let deal08Id = '';
let deal09Id = '';
let deal10Id = '';
let deal11Id = '';
let deal12Id = '';
let deal13Id = '';
let deal14Id = '';
let deal15Id = '';
let deal16Id = '';
let deal01ValueDate = '';
let deal09ValueDate = '';
let deal11ValueDate = '';
let deal12ValueDate = '';
let deal14ValueDate = '';
let deal01Amount = '';
let deal09Amount = '';
let deal11Amount = '';
let deal09Points = '';
let deal11Points = '';
let deal04IdBuyerBrokerage = '';
let deal04IdSellerBrokerage = '';

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdUsers = QaFwdUsers;
    fwdInstrument = QaFwdInstrument;
    blotterUrlConst = Constants.BLOTTERURLQA;
    dmsLoginPage = Constants.DMSWEBURLQA;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
}

const blotterModel = new BlotterModel();
const blotterExModel = new BlotterExModel();
const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const sharedStore = new SharedStore();
const windowActions = new WindowActions();
const excelReader = new ExcelReader();
let deal = null;
let dateFormat = '';
const MATCHER = /(^\d+)(.+$)/i;

function storeDeals() {
  deal.deal01Id();
  deal.deal02Id();
  deal.deal03Id();
  deal.deal04Id();
  deal.deal05Id();
  deal.deal06Id();
  deal.deal07Id();
  deal.deal08Id();
  deal.deal09Id();
  deal.deal10Id();
  deal.deal11Id();
  deal.deal12Id();
  deal.deal13Id();
  deal.deal14Id();
  deal.deal15Id();
  deal.deal16Id();
  deal01Id = sharedStore.getValueFromStore('deal01Id');
  deal02Leg1Id = sharedStore.getValueFromStore('deal02Leg1Id');
  deal02Leg2Id = sharedStore.getValueFromStore('deal02Leg2Id');
  deal03Id = sharedStore.getValueFromStore('deal03Id');
  deal04Id = sharedStore.getValueFromStore('deal04Id');
  deal04IdBuyerBrokerage = sharedStore.getValueFromStore('deal04IdBuyerBrokerage');
  deal04IdSellerBrokerage = sharedStore.getValueFromStore('deal04IdSellerBrokerage');
  deal05Id = sharedStore.getValueFromStore('deal05Id');
  deal06Id = sharedStore.getValueFromStore('deal06Id') ? sharedStore.getValueFromStore('deal06Id').toString() : '';
  deal07Leg1Id = sharedStore.getValueFromStore('deal07Leg1Id');
  deal07Leg2Id = sharedStore.getValueFromStore('deal07Leg2Id');
  deal08Id = sharedStore.getValueFromStore('deal08Id') ? sharedStore.getValueFromStore('deal08Id').toString() : '';
  deal09Id = sharedStore.getValueFromStore('deal09Id');
  deal10Id = sharedStore.getValueFromStore('deal10Id');
  deal11Id = sharedStore.getValueFromStore('deal11Id');
  deal12Id = sharedStore.getValueFromStore('deal12Id');
  deal13Id = sharedStore.getValueFromStore('deal13Id');
  deal14Id = sharedStore.getValueFromStore('deal14Id');
  deal15Id = sharedStore.getValueFromStore('deal15Id');
  deal16Id = sharedStore.getValueFromStore('deal16Id');
  deal01ValueDate = sharedStore.getValueFromStore('deal01ValueDate');
  deal09ValueDate = sharedStore.getValueFromStore('deal09ValueDate');
  deal11ValueDate = sharedStore.getValueFromStore('deal11ValueDate');
  deal12ValueDate = sharedStore.getValueFromStore('deal12ValueDate');
  deal14ValueDate = sharedStore.getValueFromStore('deal14ValueDate');
  deal01Amount = sharedStore.getValueFromStore('deal01Amount');
  deal09Points = sharedStore.getValueFromStore('deal09Points');
  deal11Points = sharedStore.getValueFromStore('deal11Points');
  deal09Amount = sharedStore.getValueFromStore('deal09Amount');
  deal11Amount = sharedStore.getValueFromStore('deal11Amount');
  deal.printAllDeals();
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
  deal = new BlotterDealCreation();
  storeDeals();
});

beforeEach(() => {
  loginModel.openUrl(blotterUrlConst);
  dateFormat = dealModel.getDateFormat();
  expect(loginModel.verifyBlotterselected()).to.equal(true);
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
  popUpNavModel.closePopUpMessage();
});

afterEach(() => {
  const windowUrl = windowActions.getUrl();
  if (windowUrl === dmsLoginPage) {
    loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  } else if (windowUrl === undefined || windowUrl === null || windowUrl === '') {
    try {
      windowActions.switchWindow(dmsLoginPage);
      loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    } catch (error) {
      windowActions.newWindow(dmsLoginPage);
      loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    }
  }
  if (loginModel.getDdlUserDropdownText() !== users.USER_E.FullName) {
    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
  }
});

describe('Blotter: Reading and verifying deal data from the Blotter grid', function blotterTests() {
  this.retries(3);
  it.skip('C18995 Read in data from Blotter and store in BlotterMap', () => {
    blotterModel.clickApprovalExpand();
    blotterModel.clickDealExpand();
    if (ENV === 'QA') {
      blotterModel.showTodaysDeals();
      blotterModel.waitForGrid();
      rtuBlotterMap = blotterExModel.getBlotterData();
    } else {
      rtuBlotterMap = blotterExModel.getBlotterData();
    }
  }).timeout(820000);

  it('C20681 Verify correct date used for NDF Value date', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getValueDate(deal01Id)).to.equal(deal01ValueDate);
  }).timeout(1200000);

  it('C20682 Verify correct date used for FWD & FWD FWD Value date', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getValueDate(deal09Id)).to.equal(deal09ValueDate);
    expect(blotterModel.getValueDate(deal11Id)).to.equal(deal11ValueDate);
  }).timeout(120000);

  it('C20683 Verify correct date used for FWD OUT Value date', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getValueDate(deal12Id)).to.equal(deal12ValueDate);
  }).timeout(120000);

  it('C20684 Verify correct date used for SPT Value date', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getValueDate(deal14Id)).to.equal(deal14ValueDate);
  }).timeout(120000);

  it('C20685 Verify correct for Check Flag an NDF deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.isUnderInvestigation(deal01Id)).to.equal(false);
  }).timeout(120000);

  it('C20686 Verify correct Deal Status for an NDF deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealStatus(deal01Id)).to.equal('VALIDATED');
  }).timeout(120000);

  it('C20687 Verify correct Deal Action for an NDF deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealAction(deal01Id)).to.equal('NEW');
  }).timeout(120000);

  it('C20688 Verify correct Execution Venue for an NDF deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getExecutionVenue(deal01Id)).to.equal('SEF');
  }).timeout(120000);

  it('C20689 Verify correct Amount for an NDF deal', () => {
    if(deal01Id){
      blotterModel.waitForGrid();
      expect(parseInt(blotterModel.getAmount(deal01Id).replace(/,/g, ''), 10)).to.equal(parseInt(deal01Amount.replace(/,/g, ''), 10));
    }
  }).timeout(120000);

  it('C24479 Verify correct amount used for FWD & FWD FWD amount', () => {
    blotterModel.waitForGrid();
    if(deal09Id && deal09Amount){
      expect(parseInt(blotterModel.getAmount(deal09Id).replace(/,/g, ''), 10)).to.equal(parseInt(deal09Amount.replace(/,/g, ''), 10));
    }

    if(deal11Id && deal11Amount){
      expect(parseInt(blotterModel.getAmount(deal11Id).replace(/,/g, ''), 10)).to.equal(parseInt(deal11Amount.replace(/,/g, ''), 10));
    }
  }).timeout(120000);

  it('C20690 Verify Blotter uses FWD and FWD FWD points value for Price', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealType(deal09Id)).to.equal('FWD');
    expect(blotterModel.getDealType(deal11Id)).to.equal('FWD');
    expect(parseFloat(blotterModel.getPrice(deal09Id))).to.equal(parseFloat(deal09Points));
    expect(parseFloat(blotterModel.getPrice(deal11Id))).to.equal(parseFloat(deal11Points));
  }).timeout(120000);

  it('C23905 Verify Blotter uses Brokerage Currency and price', () => {
    if(deal04IdBuyerBrokerage) {
      blotterModel.waitForGrid();
      expect(blotterModel.getBuyerBrokerage(deal04Id)).to.equal(deal04IdBuyerBrokerage.split(':')[1]);
      expect(blotterModel.getSellerBrokerage(deal04Id)).to.equal(deal04IdSellerBrokerage.split(':')[1]);
      expect(blotterModel.getBuyerBrokerageCcy(deal04Id)).to.equal(deal04IdBuyerBrokerage.split(':')[0]);
      expect(blotterModel.getSellerBrokerageCcy(deal04Id)).to.equal(deal04IdSellerBrokerage.split(':')[0]);
    }
  }).timeout(120000);

  it('C20691 Verify Buyer/Seller are the correct way round for a FWD deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getBuyerCustomer(deal08Id)).to.equal(fwdUsers.CLIENT_A_BLOTTER);
    expect(blotterModel.getBuyerTrader(deal08Id)).to.equal(fwdUsers.TRADER_A_BLOTTER);
    expect(blotterModel.getBuyerBroker(deal08Id)).to.equal(fwdUsers.BROKER_J_BLOTTER);
    expect(blotterModel.getSellerCustomer(deal08Id)).to.equal(fwdUsers.CLIENT_B_BLOTTER);
    expect(blotterModel.getSellerTrader(deal08Id)).to.equal(fwdUsers.TRADER_B_BLOTTER);
    expect(blotterModel.getSellerBroker(deal08Id)).to.equal(fwdUsers.BROKER_D_BLOTTER);
  }).timeout(120000);

  it('C29394 Verify Buyer & Seller Long Names for a FWD deal', () => {
    blotterModel.waitForGrid();
    blotterModel.showColumn(BlotterData.BuyerCustLong.Header);
    blotterModel.showColumn(BlotterData.BuyerTraderLong.Header);
    blotterModel.showColumn(BlotterData.BuyerBrokerLong.Header);
    blotterModel.showColumn(BlotterData.SellerCustLong.Header);
    blotterModel.showColumn(BlotterData.SellerTraderLong.Header);
    blotterModel.showColumn(BlotterData.SellerBrokerLong.Header);
    expect(blotterModel.getBuyerCustomerLong(deal08Id)).to.equal(fwdUsers.CLIENT_A_BLOTTER_LONGNAME);
    expect(blotterModel.getBuyerTraderLong(deal08Id)).to.equal(fwdUsers.TRADER_A_BLOTTER_LONGNAME);
    expect(blotterModel.getBuyerBrokerLong(deal08Id)).to.equal(fwdUsers.BROKER_J_BLOTTER_LONGNAME);
    expect(blotterModel.getSellerCustomerLong(deal08Id)).to.equal(fwdUsers.CLIENT_B_BLOTTER_LONGNAME);
    expect(blotterModel.getSellerTraderLong(deal08Id)).to.equal(fwdUsers.TRADER_B_BLOTTER_LONGNAME);
    expect(blotterModel.getSellerBrokerLong(deal08Id)).to.equal(fwdUsers.BROKER_D_BLOTTER_LONGNAME);
    blotterModel.hideColumn(BlotterData.BuyerCustLong.Header, BlotterData.BuyerCustLong.ColId);
    blotterModel.hideColumn(BlotterData.BuyerTraderLong.Header, BlotterData.BuyerTraderLong.ColId);
    blotterModel.hideColumn(BlotterData.BuyerBrokerLong.Header, BlotterData.BuyerBrokerLong.ColId);
    blotterModel.hideColumn(BlotterData.SellerCustLong.Header, BlotterData.SellerCustLong.ColId);
    blotterModel.hideColumn(BlotterData.SellerTraderLong.Header, BlotterData.SellerTraderLong.ColId);
    blotterModel.hideColumn(BlotterData.SellerBrokerLong.Header, BlotterData.SellerBrokerLong.ColId);
  }).timeout(120000);

  it('C20692 Verify Buyer/Seller are the correct way round for a FWD LHS/RHS deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getBuyerCustomer(deal09Id)).to.equal(fwdUsers.CLIENT_A_BLOTTER);
    expect(blotterModel.getBuyerTrader(deal09Id)).to.equal(fwdUsers.TRADER_A_BLOTTER);
    expect(blotterModel.getBuyerBroker(deal09Id)).to.equal(fwdUsers.BROKER_D_BLOTTER);
    expect(blotterModel.getSellerCustomer(deal09Id)).to.equal(fwdUsers.CLIENT_C_BLOTTER);
    expect(blotterModel.getSellerTrader(deal09Id)).to.equal(fwdUsers.TRADER_C_BLOTTER);
    expect(blotterModel.getSellerBroker(deal09Id)).to.equal(fwdUsers.BROKER_J_BLOTTER);
  }).timeout(120000);

  it('C29395 Verify Buyer Trader field is blank for a deal where an Agent is used', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getBuyerTrader(deal03Id)).to.equal('');
  }).timeout(120000);

  it('C29396 Verify Seller Trader field is blank for a deal where an Agent is used', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getSellerTrader(deal13Id)).to.equal('');
  }).timeout(120000);

  it('C29397 Verify Buyer and Seller Trader fields are blank for a deal where agents are used', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getBuyerTrader(deal15Id)).to.equal('');
    expect(blotterModel.getSellerTrader(deal15Id)).to.equal('');
  }).timeout(120000);

  it('C20693 Verify Approvals for an Auto-Approved deal', () => {
    blotterModel.waitForGrid();
    blotterModel.clickApprovalExpand();
    expect(blotterModel.getBuyerBrokerApprovalStatus(deal08Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal08Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerTraderApprovalStatus(deal08Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerBrokerApprovalStatus(deal08Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal08Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerTraderApprovalStatus(deal08Id)).to.equal('APPROVED');
  }).timeout(120000);

  it('C20694 Verify Approvals for a non-Auto-Approved deal', () => {
    blotterModel.waitForGrid();
    blotterModel.clickApprovalExpand();
    expect(blotterModel.getBuyerBrokerApprovalPendingBtnStatus(deal06Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerMidOfficeApprovalPendingBtnStatus(deal06Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerTraderApprovalPendingBtnStatus(deal06Id)).to.equal('PENDING');
    expect(blotterModel.getSellerBrokerApprovalPendingBtnStatus(deal06Id)).to.equal('PENDING');
    expect(blotterModel.getSellerMidOfficeApprovalPendingBtnStatus(deal06Id)).to.equal('PENDING');
    expect(blotterModel.getSellerTraderApprovalPendingBtnStatus(deal06Id)).to.equal('PENDING');
  }).timeout(120000);

  it('C20695 Verify Approvals for an seller side only Auto-Approved deal', () => {
    blotterModel.waitForGrid();
    blotterModel.clickApprovalExpand();
    expect(blotterModel.getBuyerBrokerApprovalPendingBtnStatus(deal01Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerMidOfficeApprovalPendingBtnStatus(deal01Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerTraderApprovalPendingBtnStatus(deal01Id)).to.equal('PENDING');
    expect(blotterModel.getSellerBrokerApprovalStatus(deal01Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal01Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerTraderApprovalStatus(deal01Id)).to.equal('APPROVED');
  }).timeout(120000);

  it('C20696 Verify Approvals for an buyer side only Auto-Approved deal', () => {
    blotterModel.waitForGrid();
    // blotterModel.clickApprovalContract();
    expect(blotterModel.getBuyerOverallApprovalStatus(deal05Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerOverallApprovalStatus(deal05Id)).to.equal('PENDING');
    blotterModel.clickApprovalExpand();
    expect(blotterModel.getBuyerBrokerApprovalStatus(deal05Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal05Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerTraderApprovalStatus(deal05Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerBrokerApprovalPendingBtnStatus(deal05Id)).to.equal('PENDING');
    expect(blotterModel.getSellerMidOfficeApprovalPendingBtnStatus(deal05Id)).to.equal('PENDING');
    expect(blotterModel.getSellerTraderApprovalPendingBtnStatus(deal05Id)).to.equal('PENDING');
    blotterModel.clickApprovalContract();
  }).timeout(120000);

  it('C22171 Verify belfasttpeur1 can approve a Non SEF deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealStatus(deal06Id)).to.equal('VALIDATED');
    expect(blotterModel.getExecutionVenue(deal06Id)).to.equal('OffFacility');
    blotterModel.clickApprovalExpand();
    blotterModel.approveBuyerBroker(deal06Id);
    expect(blotterExModel.waitForBuyerBrokerApprovalRtu(deal06Id)).to.equal(true);
    blotterModel.approveBuyerMidOffice(deal06Id);
    expect(blotterExModel.waitForBuyerMidOfficeApprovalRtu(deal06Id)).to.equal(true);
    blotterModel.approveBuyerTrader(deal06Id);
    expect(blotterExModel.waitForBuyerTraderApprovalRtu(deal06Id)).to.equal(true);
    blotterModel.approveSellerBroker(deal06Id);
    expect(blotterExModel.waitForSellerBrokerApprovalRtu(deal06Id)).to.equal(true);
    blotterModel.approveSellerMidOffice(deal06Id);
    expect(blotterExModel.waitForSellerMidOfficeApprovalRtu(deal06Id)).to.equal(true);
    blotterModel.approveSellerTrader(deal06Id);
    expect(blotterExModel.waitForSellerTraderApprovalRtu(deal06Id)).to.equal(true);

    expect(blotterModel.getBuyerBrokerApprovalStatus(deal06Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal06Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerTraderApprovalStatus(deal06Id)).to.equal('APPROVED');

    expect(blotterModel.getSellerBrokerApprovalStatus(deal06Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal06Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerTraderApprovalStatus(deal06Id)).to.equal('APPROVED');
    blotterModel.clickApprovalContract();
    expect(blotterModel.getDealStatus(deal06Id)).to.equal('APPROVED');
  }).timeout(120000);

  it('C22172 Verify belfasttpeur1 can approve Leg 1 of a SEF Spread deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealStatus(deal02Leg1Id)).to.equal('VALIDATED');
    expect(blotterModel.getExecutionVenue(deal02Leg1Id)).to.equal('SEF');
    blotterModel.clickApprovalExpand();
    blotterModel.approveBuyerBroker(deal02Leg1Id);
    expect(blotterExModel.waitForBuyerBrokerApprovalRtu(deal02Leg1Id)).to.equal(true);
    blotterModel.approveBuyerMidOffice(deal02Leg1Id);
    expect(blotterExModel.waitForBuyerMidOfficeApprovalRtu(deal02Leg1Id)).to.equal(true);
    blotterModel.approveBuyerTrader(deal02Leg1Id);
    expect(blotterExModel.waitForBuyerTraderApprovalRtu(deal02Leg1Id)).to.equal(true);
    blotterModel.approveSellerBroker(deal02Leg1Id);
    expect(blotterExModel.waitForSellerBrokerApprovalRtu(deal02Leg1Id)).to.equal(true);
    blotterModel.approveSellerMidOffice(deal02Leg1Id);
    expect(blotterExModel.waitForSellerMidOfficeApprovalRtu(deal02Leg1Id)).to.equal(true);
    blotterModel.approveSellerTrader(deal02Leg1Id);
    expect(blotterExModel.waitForSellerTraderApprovalRtu(deal02Leg1Id)).to.equal(true);

    expect(blotterModel.getBuyerBrokerApprovalStatus(deal02Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal02Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerTraderApprovalStatus(deal02Leg1Id)).to.equal('APPROVED');

    expect(blotterModel.getSellerBrokerApprovalStatus(deal02Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal02Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerTraderApprovalStatus(deal02Leg1Id)).to.equal('APPROVED');
    blotterModel.clickApprovalContract();
    expect(blotterModel.getDealStatus(deal02Leg1Id)).to.equal('APPROVED');
  }).timeout(120000);

  it('C22173 Verify belfasttpeur1 can approve Leg 2 of a SEF Spread deal', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealStatus(deal02Leg2Id)).to.equal('VALIDATED');
    expect(blotterModel.getExecutionVenue(deal02Leg2Id)).to.equal('SEF');
    blotterModel.clickApprovalExpand();
    blotterModel.approveBuyerBroker(deal02Leg2Id);
    expect(blotterExModel.waitForBuyerBrokerApprovalRtu(deal02Leg2Id)).to.equal(true);
    expect(blotterModel.getBuyerBrokerApprovalStatus(deal02Leg2Id)).to.equal('APPROVED');
    blotterModel.approveBuyerMidOffice(deal02Leg2Id);
    expect(blotterExModel.waitForBuyerMidOfficeApprovalRtu(deal02Leg2Id)).to.equal(true);
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal02Leg2Id)).to.equal('APPROVED');
    blotterModel.approveBuyerTrader(deal02Leg2Id);
    expect(blotterExModel.waitForBuyerTraderApprovalRtu(deal02Leg2Id)).to.equal(true);
    expect(blotterModel.getBuyerTraderApprovalStatus(deal02Leg2Id)).to.equal('APPROVED');
    blotterModel.approveSellerBroker(deal02Leg2Id);
    expect(blotterExModel.waitForSellerBrokerApprovalRtu(deal02Leg2Id)).to.equal(true);
    expect(blotterModel.getSellerBrokerApprovalStatus(deal02Leg2Id)).to.equal('APPROVED');
    blotterModel.approveSellerMidOffice(deal02Leg2Id);
    expect(blotterExModel.waitForSellerMidOfficeApprovalRtu(deal02Leg2Id)).to.equal(true);
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal02Leg2Id)).to.equal('APPROVED');
    blotterModel.approveSellerTrader(deal02Leg2Id);
    expect(blotterExModel.waitForSellerTraderApprovalRtu(deal02Leg2Id)).to.equal(true);
    expect(blotterModel.getSellerTraderApprovalStatus(deal02Leg2Id)).to.equal('APPROVED');
    blotterModel.clickApprovalContract();
    expect(blotterModel.getDealStatus(deal02Leg2Id)).to.equal('APPROVED');
  }).timeout(120000);

  it('C22174 Verify belfasttpeur2 can only approve Non SEF deals', () => {
    loginModel.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    blotterModel.waitForGrid();
    expect(blotterModel.getDealStatus(deal12Id)).to.equal('VALIDATED');
    expect(blotterModel.getExecutionVenue(deal12Id)).to.equal('OffFacility');

    // verify Non SEF deal pending labels ARE buttons
    blotterModel.clickApprovalExpand();
    expect(blotterModel.getBuyerBrokerApprovalPendingBtnStatus(deal12Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerMidOfficeApprovalPendingBtnStatus(deal12Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerTraderApprovalPendingBtnStatus(deal12Id)).to.equal('PENDING');

    expect(blotterModel.getSellerBrokerApprovalPendingBtnStatus(deal12Id)).to.equal('PENDING');
    expect(blotterModel.getSellerMidOfficeApprovalPendingBtnStatus(deal12Id)).to.equal('PENDING');
    expect(blotterModel.getSellerTraderApprovalPendingBtnStatus(deal12Id)).to.equal('PENDING');

    blotterModel.approveBuyerBroker(deal12Id);
    expect(blotterExModel.waitForBuyerBrokerApprovalRtu(deal12Id)).to.equal(true);
    blotterModel.approveBuyerMidOffice(deal12Id);
    expect(blotterExModel.waitForBuyerMidOfficeApprovalRtu(deal12Id)).to.equal(true);
    blotterModel.approveBuyerTrader(deal12Id);
    expect(blotterExModel.waitForBuyerTraderApprovalRtu(deal12Id)).to.equal(true);
    blotterModel.approveSellerBroker(deal12Id);
    expect(blotterExModel.waitForSellerBrokerApprovalRtu(deal12Id)).to.equal(true);
    blotterModel.approveSellerMidOffice(deal12Id);
    expect(blotterExModel.waitForSellerMidOfficeApprovalRtu(deal12Id)).to.equal(true);
    blotterModel.approveSellerTrader(deal12Id);
    expect(blotterExModel.waitForSellerTraderApprovalRtu(deal12Id)).to.equal(true);

    expect(blotterModel.getBuyerBrokerApprovalStatus(deal12Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal12Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerTraderApprovalStatus(deal12Id)).to.equal('APPROVED');

    expect(blotterModel.getSellerBrokerApprovalStatus(deal12Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal12Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerTraderApprovalStatus(deal12Id)).to.equal('APPROVED');
    blotterModel.clickApprovalContract();
    expect(blotterModel.getDealStatus(deal12Id)).to.equal('APPROVED');

    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
  }).timeout(120000);

  it('C22175 Verify belfasttpsin2 can only approve SEF deals', () => {
    loginModel.changeUser(users.USER_F.UserName, users.USER_F.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    blotterModel.waitForGrid();
    expect(blotterModel.getDealStatus(deal07Leg1Id)).to.equal('VALIDATED');
    expect(blotterModel.getExecutionVenue(deal07Leg1Id)).to.equal('SEF');

    // verify Non SEF deal pending labels ARE buttons
    blotterModel.clickApprovalExpand();
    expect(blotterModel.getBuyerBrokerApprovalPendingBtnStatus(deal07Leg1Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerMidOfficeApprovalPendingBtnStatus(deal07Leg1Id)).to.equal('PENDING');
    expect(blotterModel.getBuyerTraderApprovalPendingBtnStatus(deal07Leg1Id)).to.equal('PENDING');

    expect(blotterModel.getSellerBrokerApprovalPendingBtnStatus(deal07Leg1Id)).to.equal('PENDING');
    expect(blotterModel.getSellerMidOfficeApprovalPendingBtnStatus(deal07Leg1Id)).to.equal('PENDING');
    expect(blotterModel.getSellerTraderApprovalPendingBtnStatus(deal07Leg1Id)).to.equal('PENDING');

    blotterModel.approveBuyerBroker(deal07Leg1Id);
    expect(blotterExModel.waitForBuyerBrokerApprovalRtu(deal07Leg1Id)).to.equal(true);
    blotterModel.approveBuyerMidOffice(deal07Leg1Id);
    expect(blotterExModel.waitForBuyerMidOfficeApprovalRtu(deal07Leg1Id)).to.equal(true);
    blotterModel.approveBuyerTrader(deal07Leg1Id);
    expect(blotterExModel.waitForBuyerTraderApprovalRtu(deal07Leg1Id)).to.equal(true);
    blotterModel.approveSellerBroker(deal07Leg1Id);
    expect(blotterExModel.waitForSellerBrokerApprovalRtu(deal07Leg1Id)).to.equal(true);
    blotterModel.approveSellerMidOffice(deal07Leg1Id);
    expect(blotterExModel.waitForSellerMidOfficeApprovalRtu(deal07Leg1Id)).to.equal(true);
    blotterModel.approveSellerTrader(deal07Leg1Id);
    expect(blotterExModel.waitForSellerTraderApprovalRtu(deal07Leg1Id)).to.equal(true);

    expect(blotterModel.getBuyerBrokerApprovalStatus(deal07Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerMidOfficeApprovalStatus(deal07Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getBuyerTraderApprovalStatus(deal07Leg1Id)).to.equal('APPROVED');

    expect(blotterModel.getSellerBrokerApprovalStatus(deal07Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerMidOfficeApprovalStatus(deal07Leg1Id)).to.equal('APPROVED');
    expect(blotterModel.getSellerTraderApprovalStatus(deal07Leg1Id)).to.equal('APPROVED');
    blotterModel.clickApprovalContract();
    expect(blotterModel.getDealStatus(deal07Leg1Id)).to.equal('APPROVED');

    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
  }).timeout(120000);

  it('C22176 Verify belfasttpeur2 can only view Non SEF deals', () => {
    loginModel.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    blotterModel.waitForGrid();

    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');

    blotterModel.clickDealExpand();
    expect(blotterModel.verifyFilteredCells(rowCount, BlotterData.ExecVen.Header, BlotterData.ExecVen.ColId, 'OffFacility')).to.equal(true);

    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
  }).timeout(180000);

  it('C22177 Verify belfasttpsin2 can only view SEF deals', () => {
    loginModel.changeUser(users.USER_F.UserName, users.USER_F.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    blotterModel.waitForGrid();

    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');

    blotterModel.clickDealExpand();
    expect(blotterModel.verifyFilteredCells(rowCount, BlotterData.ExecVen.Header, BlotterData.ExecVen.ColId, 'SEF')).to.equal(true);

    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
  }).timeout(180000);

  it('C20697 Verify correct Deal Type for each deal type', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.getDealType(deal01Id)).to.equal('NDF');
    expect(blotterModel.getDealType(deal09Id)).to.equal('FWD');
    expect(blotterModel.getDealType(deal12Id)).to.equal('OUT');
    expect(blotterModel.getDealType(deal14Id)).to.equal('SPT');
  }).timeout(120000);

  it('C20794 Quicksearch by deal type - SPT', () => {
    let newRowCount = '';
    let filteredRows = '';
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    if (ENV === 'QA') {
      popUpNavModel.closePopUpMessage(); // no RTU popup obscures quicksearch
    }
    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    blotterModel.enterQuickSearch('SPT');

    blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount);
    newRowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    filteredRows = blotterModel.getFilteredRows();
    log.log(`newRowCount = ${newRowCount}`);
    log.log(`filteredRows = ${filteredRows}`);

    expect(rowCount).to.not.equal(newRowCount);
    expect(newRowCount).to.equal(filteredRows);
    expect(blotterModel.verifyFilteredCells(newRowCount, BlotterData.DealType.Header, BlotterData.DealType.ColId, 'SPT')).to.equal(true);

    blotterModel.clearQuickSearch();
    blotterExModel.waitForRowCountToUpdate(MATCHER, newRowCount);
    expect(rowCount).to.equal(blotterModel.getRowCount().replace(MATCHER, '$1'));
  }).timeout(60000);

  it('C20795 Quicksearch by Seller Customer', () => {
    let newRowCount = '';
    let filteredRows = '';
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    if (ENV === 'QA') {
      popUpNavModel.closePopUpMessage(); // no RTU popup obscures quicksearch
    }
    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    blotterModel.enterQuickSearch(fwdUsers.CLIENT_A_BLOTTER);

    blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount);
    newRowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    filteredRows = blotterModel.getFilteredRows();
    log.log(`newRowCount = ${newRowCount}`);
    log.log(`filteredRows = ${filteredRows}`);

    expect(rowCount).to.not.equal(newRowCount);
    expect(newRowCount).to.equal(filteredRows);
    expect(blotterModel.verifyFilteredCells(newRowCount, BlotterData.SellerCust.Header, BlotterData.SellerCust.ColId, fwdUsers.CLIENT_A_BLOTTER)).to.equal(true);

    blotterModel.clearQuickSearch();

    blotterExModel.waitForRowCountToUpdate(MATCHER, newRowCount);
    expect(rowCount).to.equal(blotterModel.getRowCount().replace(MATCHER, '$1'));
  }).timeout(1200000);

  it('C24481 Verify cancelled deals are displayed in red text', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    expect(blotterModel.getDealAction(deal03Id)).to.equal('CANCEL');
    const colourRed = 'rgb(219, 5, 5)';
    expect(blotterModel.verifyRowTextColour(deal03Id, colourRed)).to.equal(true);
  }).timeout(120000);
});
