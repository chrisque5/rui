const expect = require('chai').expect;
const E2EModel = require('../../../models/E2EModel.js');
const DealModel = require('../../../models/spt/DealModel.js');
const LoginModel = require('../../../models/LoginModel.js');
const SettingsModel = require('../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../models/PopUpNavigationModel');
const SharedStore = require('../../../core/store/SharedStore.js');
const AgentModel = require('../../../models/spt/AgentModel');
const BrokerModel = require('../../../models/spt/BrokerModel.js');
const ClientTraderModel = require('../../../models/spt/ClientTraderModel.js');

const Logs = require('../../../core/utility/Logs.js');
const LocalUsers = require('../../../data/spt/UserDetails.js');
const LocalInstrument = require('../../../data/spt/InstrumentDetails.js');
const QaUsers = require('../../../data/qa/e2e/spt/UserDetails.js');
const QaInstrument = require('../../../data/qa/e2e/spt/InstrumentDetails.js');
const DevUsers = require('../../../data/spt/dev/UserDetails.js');
const DevInstrument = require('../../../data/spt/dev/InstrumentDetails.js');
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
const sharedStore = new SharedStore();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();

const log = new Logs();

let dateFormat = '';

before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  login.openUrl(Constants.SPTURL);
  login.selectSPT();
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(login.verifySPTselected()).to.be.equal(true);
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

describe('E2E scenario for Spot', () => {
  it('C22562 SPT USD THB 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_T, instrument.CURRENCY_A, '31.061', '20000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectBuyerAgent(users.AGENT_E);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    agent.selectSellerAgent(users.AGENT_A);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C22562 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('SPT_C22562', `Test Case Number : C22562 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C22562', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `C22562@@SPT=>agents:SPT_USD_THB_0D_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  });

  it('C22563 SPT USD CNH 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, '6.75736', '10000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    agent.selectSellerAgent(users.AGENT_A);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C22563 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('SPT_C22563', `Test Case Number : C22563 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C22563', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `C22563@@SPT=>agents:SPT_USD_CNH_0D_${instrument.VENUE_B}_NEW`);
    popUpNav.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
