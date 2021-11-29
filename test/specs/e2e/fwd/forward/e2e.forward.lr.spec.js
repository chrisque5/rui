const expect = require('chai').expect;
const E2EModel = require('../../../../models/E2EModel.js');
const DealModel = require('../../../../models/fwd/DealModel.js');
const LoginModel = require('../../../../models/LoginModel.js');
const SettingsModel = require('../../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../../models/PopUpNavigationModel');

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

const strategy = new StrategyModel();
const venue = new VenueModel();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();

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
  it('FWD_C13408 FWD USD HKD ON XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleLRModeOn();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_S, '7.80055', '0', '20', '', '20');
    // L
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    // R
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);

    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_C13408 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_C13408 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_C13408@@FWD=>fwd=>basic:FWD_USD_HKD_ON_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  // Deal CCY
  it('FWD_C13409 FWD SGD USD 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleLRModeOn();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_E, '7.80055', '0', '20', '', '20');
    // L
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    // R
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);

    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_C13409 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_C13409 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_C13409@@FWD=>fwd=>dealt_ccy:FWD_USD_SGD_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_C13410 FWD USD THB 1M XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleLRModeOn();
    settings.toggleClsDefaultsOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_T, '', instrument.TENOR_E, '30.2', '0.0045', '20', '', '20');
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
    log.log(`Test Case Number : FWD_C13410 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_C13410 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_C13410@@FWD=>fwd=>agents:FWD_USD_THB_1M_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
