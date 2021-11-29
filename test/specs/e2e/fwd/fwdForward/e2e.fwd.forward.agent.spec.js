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

const strategy = new StrategyModel();
const venue = new VenueModel();
const agent = new AgentModel();
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

describe('E2E scenario for Forward third party agents ', () => {
  it('FWD_FWD_05_C12510 FWD USD THB 1W*2W XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    settings.toggleClsDefaultsOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_T, '', instrument.TENOR_B, '30.203485', '0.0015', '3', instrument.TENOR_C, '', '3');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    agent.selectBuyerAgent(users.AGENT_A);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_05_C12510 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_05_C12510 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C12510', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_05_C12510@@FWD=>fwd_fwd=>agents:FWD_USD_THB_1W_2W_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_06_C12511 FWD USD CNH 1Y*2Y XOFF (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_J, '7.073803', '0.086646', '10', instrument.TENOR_J1, '', '10');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    agent.selectBuyerAgent(users.AGENT_A);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_06_C12511 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_06_C12511 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C12511', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_06_C12511@@FWD=>fwd_fwd=>agents:FWD_USD_CNH_1Y_2Y_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
