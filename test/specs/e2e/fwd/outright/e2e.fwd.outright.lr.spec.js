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
const AgentModel = require('../../../../models/fwd/AgentModel');
const BrokerModel = require('../../../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../../../models/fwd/ClientTraderModel.js');

const Logs = require('../../../../core/utility/Logs.js');
const LocalUsers = require('../../../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../../../data/qa/e2e/fwd/UserDetails.js');
const QaInstrument = require('../../../../data/qa/e2e/fwd/InstrumentDetails.js');
const DevUsers = require('../../../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../../../data/fwd/dev/InstrumentDetails.js');
const DateModel = require('../../../../models/DateModel.js');
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
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();

const log = new Logs();
const date = new DateModel();

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

describe('E2E scenario for Forward Outright', () => {
  it('FWDOR_C13444 FWD USD CNH IMM1 XOFF (amend)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleLRModeOn();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_O, '7.016007', '15');
    // L
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    // R
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);

    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWDOR_C13444 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWDOR_C13444 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:amend:leg1`, `FWDOR_C13444@@FWD=>fwd_outright=>basic:FWD_USD_CNH_IMM1_${instrument.VENUE_B}_AMEND`);
    popUpNav.closePopUpMessage();

    /*  const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);

    const newAmount = '16000000';
    const newPrice = '7.017';
    const response = e2e.editE2eFwdOutDeal(jSessionId, dealEntityId, lockSequence, 'Editing deal', newAmount, newPrice);
    expect(parseInt(response.deal.executionChain.dealStrategies[0].size, 10)).to.equal(parseInt(newAmount, 10));
    expect(parseInt(response.deal.executionChain.dealStrategies[0].price, 10)).to.equal(parseInt(newPrice, 10)); */
  }).timeout(30000);

  // dealt CCY
  it('FWDOR_C13445 FWD SGD USD 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleLRModeOn();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_E, '1.35519', '20');
    // L
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    // R
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);

    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWDOR_C13445 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWDOR_C13445 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWDOR_C13445@@FWD=>fwd_outright=>dealt_ccy:FWD_SGD_USD_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  // Agent
  it('FWDOR_C13446 FWD USD THB 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleLRModeOn();
    settings.toggleClsDefaultsOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_T, '', instrument.TENOR_E, '30.215', '20');
    // L
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    // R
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);

    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);

    agent.selectSellerAgent(users.AGENT_A);
    agent.selectBuyerAgent(users.AGENT_E);
    
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWDOR_C13446 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWDOR_C13446 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWDOR_C13446@@FWD=>fwd_outright=>agents:FWD_USD_THB_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
