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

describe('E2E RTNS scenario for Forward, FWD Forward and Fwd Outright', () => {

  // 3rd Party Agents
  it('FWD_RTNS_01_C12665 FWD USD HKD 1W TEFD (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_B, '7.76945', '7.5', '13', '', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectBuyerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_RTNS_01_C12665 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_RTNS_01_C12665 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_RTNS_01_C12665@@NCR:FWD_USD_HKD_1W_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_RTNS_02_C12666 FWD USD HKD 1M*2M TEFD (New)', () => {
    strategy.clickRdoStrategyFwdForward();
    deal.selectVolMatch();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_E, '7.7703', '14', '15', instrument.TENOR_E1, '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectBuyerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_RTNS_02_C12666 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_RTNS_02_C12666 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_RTNS_02_C12666@@FWD=>fwd_fwd=>basic:FWD_USD_HKD_1M_2M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_RTNS_03_C12667 FWD GBP USD 1M TEFD (New)', () => {
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, '', instrument.TENOR_E, '1.299375', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectBuyerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_RTNS_03_C12667 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_RTNS_03_C12667 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_RTNS_03_C12667@@FWD=>fwd_outright=>basic:FWD_GBP_USD_1M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_RTNS_04_C12668 FWD USD HKD 1W TEMM (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_B, '7.76945', '7.5', '13', '', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_RTNS_04_C12668 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_RTNS_04_C12668 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_RTNS_04_C12668@@NCR:FWD_RTNS_04${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_RTNS_05_C12669 FWD USD HKD 1M*2M TEMM (New)', () => {
    strategy.clickRdoStrategyFwdForward();
    deal.selectVolMatch();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_E, '7.7703', '14', '15', instrument.TENOR_E1, '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_RTNS_05_C12669 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_RTNS_05_C12669 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_RTNS_05_C12669@@FWD=>fwd_fwd=>basic:FWD_USD_THB_1W_2W_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_RTNS_06_C12670 FWD GBP USD 1M TEMM (New)', () => {
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, '', instrument.TENOR_E, '1.299375', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_RTNS_06_C12690 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_RTNS_06_C12690 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_RTNS_06_C12670@@FWD=>fwd_outright=>basic:FWD_USD_CNH_1M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  // Dealt CCY
  it('FWD_RTNS_07_C12671 FWD USD HKD 1W XOFF (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_Q, instrument.TENOR_B, '7.76945', '7.5', '13', '', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_RTNS_07_C12671 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_RTNS_07_C12671 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_RTNS_07_C12671@@NCR:FWD_RTNS_04${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_RTNS_08_C12672 FWD USD HKD 1M*2M TEMM (New)', () => {
    strategy.clickRdoStrategyFwdForward();
    deal.selectVolMatch();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_Q, instrument.TENOR_E, '7.7703', '14', '15', instrument.TENOR_E1, '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_RTNS_08_C12672 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_RTNS_08_C12672 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_RTNS_08_C12672@@FWD=>fwd_fwd=>basic:FWD_USD_THB_1W_2W_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_RTNS_09_C12673 FWD GBP USD 1M TEMM (New)', () => {
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, instrument.CURRENCY_A, instrument.TENOR_E, '1.299375', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_RTNS_09_C12673 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_RTNS_09_C12673 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_RTNS_09_C12673@@FWD=>fwd_outright=>basic:FWD_USD_CNH_1M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_RTNS_10_C12674 FWD USD HKD 1W TEMM (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_Q, instrument.TENOR_B, '7.76945', '7.5', '13', '', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_RTNS_10_C12674 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_RTNS_10_C12674 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_RTNS_10_C12674@@NCR:FWD_RTNS_04${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_RTNS_11_C12675 FWD USD HKD 1M*2M XOFF (New)', () => {
    strategy.clickRdoStrategyFwdForward();
    deal.selectVolMatch();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_Q, instrument.TENOR_E, '7.7703', '14', '15', instrument.TENOR_E1, '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_RTNS_11_C12675 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_RTNS_11_C12675 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_RTNS_11_C12675@@FWD=>fwd_fwd=>basic:FWD_USD_THB_1W_2W_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_RTNS_12_C12676 FWD GBP USD 1M TEMM (New)', () => {
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, instrument.CURRENCY_A, instrument.TENOR_E, '1.299375', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_RTNS_12_C12676 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_RTNS_12_C12676 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_RTNS_12_C12676@@FWD=>fwd_outright=>basic:FWD_USD_CNH_1M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_RTNS_C13182 FWD USD CNH 1M TEFD (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '7.76945', '7.5', '13', '', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_RTNS_C13182 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_RTNS_C13182 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_RTNS_C13182@@NCR:FWD_RTNS_04${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_RTNS_C13183 FWD USD CNH 1M TEFD (New)', () => {
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    backDate.selectBackDate();
    backDate.inputBackDateTime('06:05:05');

    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_E, '7.76945', '7.5', '13', '', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_RTNS_C13183 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_RTNS_C13183 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_RTNS_C13183@@NCR:FWD_RTNS_04${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
