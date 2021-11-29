const expect = require('chai').expect;
const E2EModel = require('../../../../models/E2EModel.js');
const DealModel = require('../../../../models/fwd/DealModel.js');
const LoginModel = require('../../../../models/LoginModel.js');
const SettingsModel = require('../../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../../models/PopUpNavigationModel');
const WindowActions = require('../../../../core/actions/WindowActions.js');
const API = require('../../../../models/blotter/BlotterApiModel');

const StrategyModel = require('../../../../models/fwd/StrategyModel.js');
const VenueModel = require('../../../../models/fwd/VenueModel.js');
const InterestModel = require('../../../../models/fwd/InterestModel.js');
const BrokerModel = require('../../../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../../../models/fwd/ClientTraderModel.js');
const SharedStore = require('../../../../core/store/SharedStore.js');

const Logs = require('../../../../core/utility/Logs.js');
const LocalUsers = require('../../../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../../../data/qa/e2e/fwd/UserDetails.js');
const QaInstrument = require('../../../../data/qa/e2e/fwd/InstrumentDetails.js');
const DevUsers = require('../../../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../../../data/fwd/dev/InstrumentDetails.js');
const Constants = require('../../../../data/Constants.js');

let users = null;
let instrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    break;
  case 'DEV':
    users = DevUsers;
    instrument = DevInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

const e2e = new E2EModel();
const deal = new DealModel();
const login = new LoginModel();
const popUpNav = new PopUpNavigationModel();
const settings = new SettingsModel();
const windowActions = new WindowActions();
const api = new API();

const strategy = new StrategyModel();
const venue = new VenueModel();
const interest = new InterestModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();
const sharedStore = new SharedStore();

const log = new Logs();

let dateFormat = '';

function moveToFWD() {
  login.openUrl(Constants.FWDURL);
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(login.verifyFWDselected()).to.be.equal(true);
}

before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

describe('E2E scenario for Forward', () => {
  it('FWD_01_C12494 FWD USD HKD ON XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_S, '7.80055', '0', '20', '', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_01_C12494 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_01_C12494 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_01_C12494@@FWD=>fwd=>basic:FWD_USD_HKD_ON_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_02_C12495 FWD USD CNH TN XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_T, '7.00385', '0.00035', '15', '', '15');
    interest.selectInterestChkBox();
    interest.inputInterest(5);
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_02_C12495 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_02_C12495 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_02_C12495@@FWD=>fwd=>basic:FWD_USD_CNH_TN_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_03_C12496 FWD USD HKD SN XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_U, '7.80075', '0.00015', '20', '', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_03_C12496 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_03_C12496 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C12496', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_03_C12496@@FWD=>fwd=>basic:FWD_USD_HKD_SN_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_04_C12497 FWD USD CNH IMM1 XOFF (Amend)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_O, '7.00325', '0.018694', '15', '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_04_C12497 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_04_C12497 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C12497', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:amend:leg1`, `FWD_04_C12497@@FWD=>fwd=>basic:FWD_USD_CNH_IMM1_${instrument.VENUE_B}_AMEND`);
    popUpNav.closePopUpMessage();

    /* const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);

    const newAmount = '16000000';
    const newPrice1 = '7.00330';
    const newPrice2 = '7.0033019';
    const response = e2e.editE2eFwdDeal(jSessionId, dealEntityId, lockSequence, 'Editing deal', newAmount, newPrice1, newPrice2);
    expect(parseInt(response.deal.executionChain.dealStrategies[0].size, 10)).to.equal(parseInt(newAmount, 10));
    expect(parseInt(response.deal.executionChain.dealStrategies[0].price, 10)).to.equal(parseInt(newPrice1, 10));
    expect(parseInt(response.deal.executionChain.dealStrategies[0].price, 10)).to.equal(parseInt(newPrice2, 10)); */
  }).timeout(30000);

  it('FWD_05_C12498 FWD USD HKD 2Y XOFF (Cancel)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_J1, '7.80085', '0.0245', '20', '', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_05_C12498 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_05_C12498 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C12498', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:cancel:leg1`, `FWD_05_C12498@@FWD=>fwd=>basic:FWD_USD_HKD_2Y_${instrument.VENUE_B}_CANCEL`);
    popUpNav.closePopUpMessage();

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);

    const response = e2e.cancelE2eDeal(jSessionId, dealEntityId, lockSequence, 'false', 'Test trade cancel');
    expect(response).to.equal(`DMS Deal ID: ${dealEntityId} - cancellation SUCCESS`);
  }).timeout(30000);

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
