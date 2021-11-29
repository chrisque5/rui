const expect = require('chai').expect;
const E2EModel = require('../../../models/E2EModel.js');
const DealModel = require('../../../models/fwd/DealModel.js');
const LoginModel = require('../../../models/LoginModel.js');
const SettingsModel = require('../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../models/PopUpNavigationModel');

const StrategyModel = require('../../../models/fwd/StrategyModel.js');
const VenueModel = require('../../../models/fwd/VenueModel.js');
const AgentModel = require('../../../models/fwd/AgentModel');
const BrokerModel = require('../../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../../models/fwd/ClientTraderModel.js');
const BackDateModel = require('../../../models/fwd/BackDateModel.js');

const Logs = require('../../../core/utility/Logs.js');
const LocalUsers = require('../../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../../data/qa/e2e/fwd/UserDetails.js');
const QaInstrument = require('../../../data/qa/e2e/fwd/InstrumentDetails.js');
const DevUsers = require('../../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../../data/fwd/dev/InstrumentDetails.js');
const Constants = require('../../../data/Constants.js');

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

const strategy = new StrategyModel();
const venue = new VenueModel();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();
const backDate = new BackDateModel();

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

describe('E2E MBS2 and DOG scenario for Forward, FWD Forward and Fwd Outright', () => {
  it('FWD_MBS2_01_C12656 FWD USD CNH TN XOFF (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_T, '7.00385', '0.00035', '15', '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_MBS2_01_C12656 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_MBS2_01_C12656 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_MBS2_01_C12656@@NCR:FWD_USD_CNH_TN_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_MBS2_02_C12657 FWD USD CNH 1M*2M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    deal.selectVolMatch();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '6.90405', '50', '12', instrument.TENOR_E1, '', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_MBS2_02_C12657 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_MBS2_02_C12657 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_MBS2_02_C12657@@FWD=>fwd_fwd=>basic:FWD_USD_CNH_1M_2M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_MBS2_03_C12658 FWD USD CNH 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '6.90465', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_MBS2_03_C12658 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_MBS2_03_C12658 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_MBS2_03_C12658@@FWD=>fwd_outright=>basic:FWD_USD_CNH_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);
  // Dealt CCY
  it('FWD_MBS2_04_C12659 FWD USD SGD 1M XOFF (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_E, '1.3462', '-2.77', '20', '', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_MBS2_04_C12659 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_MBS2_04_C12659 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_MBS2_04_C12659@@NCR:FWD_USD_SGD_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_MBS2_05_C12660 FWD USD SGD IMM1*IMM2 XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_O, '1.34561', '-14.68', '15', instrument.TENOR_P, '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_MBS2_05_C12660 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_MBS2_05_C12660 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_MBS2_05_C12660@@FWD=>fwd_fwd=>basic:FWD_USD_SGD_IMM1_IMM2_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_MBS2_06_C12661 FWD USD SGD 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_E, '1.346123', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_MBS2_06_C12661 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_MBS2_06_C12661 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_MBS2_06_C12661@@FWD=>fwd_outright=>basic:FWD_USD_SGD_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  // 3rd Party Agents
  it('FWD_MBS2_07_C12662 FWD USD CNH 1M XOFF (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '7.00265', '0.006483', '1', '', '1');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectSellerAgent(users.AGENT_H);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_MBS2_07_C12662 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_MBS2_07_C12662 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_MBS2_07_C12662@@NCR:FWD_USD_CNH_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_MBS2_08_C12663 FWD USD THB 1W*2W XOFF (New)', () => {
    strategy.clickRdoStrategyFwdForward();
    deal.selectVolMatch();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_T, '', instrument.TENOR_B, '30.195', '0', '3', instrument.TENOR_C, '', '3');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectBuyerAgent(users.AGENT_A);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_MBS2_08_C12663 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_MBS2_08_C12663 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_MBS2_08_C12663@@FWD=>fwd_fwd=>basic:FWD_USD_THB_1W_2W_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_MBS2_09_C12664 FWD USD CNH 1M XOFF (New)', () => {
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '7.0041', '10');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_MBS2_09_C12664 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_MBS2_09_C12664 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_MBS2_09_C12664@@FWD=>fwd_outright=>basic:FWD_USD_CNH_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_MBS2_C13179 FWD USD CNH TN XOFF (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();

    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_T, '7.00385', '0.00035', '15', '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_MBS2_C13179 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_MBS2_C13179 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_MBS2_C13179@@NCR:FWD_USD_CNH_TN_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_MBS2_C13180 FWD USD CNH 1M*2M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();

    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '6.90405', '50', '12', instrument.TENOR_E1, '', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_MBS2_C13180 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_MBS2_C13180 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_MBS2_C13180@@FWD=>fwd_fwd=>basic:FWD_USD_CNH_1M_2M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_MBS2_C13181 FWD USD CNH 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '6.90465', '20');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_MBS2_C13181 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_MBS2_C13181 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_MBS2_C13181@@FWD=>fwd_outright=>basic:FWD_USD_CNH_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);
  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
