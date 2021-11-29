/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const FwdDealModel = require('../models/fwd/DealModel.js');
const SptDealModel = require('../models/spt/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const BrokerAdminModel = require('../models/admin/BrokerAdminModel.js');
const AdminModel = require('../models/admin/AdminModel.js');
const BlotterSearchModel = require('../models/blotter/BlotterSearchModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const StrategyModel = require('../models/fwd/StrategyModel.js');
const VenueModel = require('../components/ndf/Venue.js');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/UserDetails.js');
const LocalInstrument = require('../data/InstrumentDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const QaInstrument = require('../data/qa/InstrumentDetails.js');
const FwdUsers = require('../data/fwd/UserDetails.js');
const FwdInstrument = require('../data/fwd/InstrumentDetails.js');
const FwdQaUsers = require('../data/qa/fwd/UserDetails.js');
const FwdQaInstrument = require('../data/qa/fwd/InstrumentDetails.js');
const SptUsers = require('../data/spt/UserDetails.js');
const SptInstrument = require('../data/spt/InstrumentDetails.js');
const SptQaUsers = require('../data/qa/spt/UserDetails.js');
const SptQaInstrument = require('../data/qa/spt/InstrumentDetails.js');
const Constants = require('../data/Constants.js');

let users = null;
// let instrument = null;
// let fwdUsers = null;
// let fwdInstrument = null;
// let sptUsers = null;
// let sptInstrument = null;
let blotterUrlConst = null;
// let dmsLoginPage = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    sptUsers = SptUsers;
    sptInstrument = SptInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdUsers = FwdQaUsers;
    fwdInstrument = FwdQaInstrument;
    sptUsers = SptQaUsers;
    sptInstrument = SptQaInstrument;
    blotterUrlConst = Constants.BLOTTERURLQA;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    sptUsers = SptUsers;
    sptInstrument = SptInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
}

const dealModel = new DealModel();
const fwdDealModel = new FwdDealModel();
const sptDealModel = new SptDealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const brokerAdmin = new BrokerAdminModel();
const adminModel = new AdminModel();
const blotterSearchModel = new BlotterSearchModel();
const settingsModel = new SettingsModel();
const strategy = new StrategyModel();
const venue = new VenueModel();
const log = new Logs();

let dateFormat = '';

function moveToNdf() {
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.equal(true);
}

function moveToFwd() {
  loginModel.selectFWD();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyFWDselected()).to.equal(true);
}

function moveToSpt() {
  loginModel.selectSPT();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifySPTselected()).to.equal(true);
}

function moveToAdmin() {
  loginModel.selectAdmin();
  expect(adminModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToBlotter() {
  loginModel.openUrl(blotterUrlConst);
  expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.ADMIN_A.UserName, users.ADMIN_A.PassWord); /* Login as STAYLOR */
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToNdf();
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('Error Functionality tests for NDF', () => { // testing from NDF tab
  it('C27089 Verify NDF Tab Validation Errors Popup is removed after 5 seconds', () => {
    moveToNdf();
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    expect(popUpNavModel.verifyPopUpMessageTimeOut()).to.equal(true);
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
  });
});

describe('Error Functionality tests for FWD', () => { // testing from FWD tab
  it('C27092 Verify FWD Tab Validation Errors Popup is removed after 5 seconds', () => {
    moveToFwd();
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    expect(popUpNavModel.verifyPopUpMessageTimeOut()).to.equal(true);
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
  });
});

describe('Error Functionality tests for SPT', () => { // testing from SPT tab
  it('C27095 Verify SPT Tab Validation Errors Popup is removed after 5 seconds', () => {
    moveToSpt();
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    expect(popUpNavModel.verifyPopUpMessageTimeOut()).to.equal(true);
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
  });
});

describe('Error Functionality tests for Admin', () => { // testing from Admin tab
  it('C27098 Verify Admin Tab Validation Errors Popup is removed after 5 seconds', () => {
    moveToAdmin();
    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    expect(popUpNavModel.verifyPopUpMessageTimeOut()).to.equal(true);
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
  });
});

describe('Error Functionality tests for Blotter', () => { // testing from Blotter tab
  it('C27101 Verify Blotter Tab Validation Errors Popup is removed after 5 seconds', () => {
    moveToBlotter();
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.inputDealId('9223372036854775807');
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('No results');
    expect(popUpNavModel.verifyPopUpMessageTimeOut()).to.equal(true);
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
  });
});

describe('Verify Deal Creation Popup remains for Deal Creation when we switch tabs', () => {
  it('C28649 Verify Deal Creation popup remians when we create an NDF deal and navigate away from the NDF tab', () => {
    moveToNdf();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_A, instrument.TENOR_F, '1.23', '3000000');

    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();

    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToFwd();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToSpt();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToAdmin();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  });

  it('C28650 Verify Deal Creation popup remians when we create a FWD deal and navigate away from the FWD tab', () => {
    moveToFwd();
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    // eslint-disable-next-line max-len
    fwdDealModel.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_J1, '7.80085', '0.0245', '20', '', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();

    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToSpt();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToAdmin();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToNdf();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  });

  it('C28651 Verify Deal Creation popup remians when we create a SPT deal and navigate away from the SPT tab', () => {
    moveToSpt();
    sptDealModel.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_A, '0.1', '0.15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();

    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToAdmin();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToNdf();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    moveToFwd();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  });
});
