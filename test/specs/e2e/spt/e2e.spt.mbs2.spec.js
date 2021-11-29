const expect = require('chai').expect;
const E2EModel = require('../../../models/E2EModel.js');
const DealModel = require('../../../models/spt/DealModel.js');
const LoginModel = require('../../../models/LoginModel.js');
const SettingsModel = require('../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../models/PopUpNavigationModel');
const BackDate = require('../../../components/ndf/BackDate.js');
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
const DateModel = require('../../../models/DateModel.js');
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
const backDate = new BackDate();
const sharedStore = new SharedStore();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();

const log = new Logs();
const date = new DateModel();

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
  it('C22573 SPT USD CNH 0D', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_P, '6.90465', '20000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_G, users.BROKER_N);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : MBS2_C22573 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('MBS2_C22573', dealId);
    e2e.saveDealTestMap('MBS2_C22573', `Test Case Number : C22573 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22574 SPT SGD USD 0D (DEALT CCY)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, '1.346123', '20000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : MBS2_C22574 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('MBS2_C22574', dealId);
    e2e.saveDealTestMap('MBS2_C22574', `Test Case Number : C22574 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22575 SPT USD CNH 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, '6.75823', '10000000');
    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectBuyerAgent(users.AGENT_E);
    clientTrader.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_I);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : MBS2_C22575 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('MBS2_C22575', dealId);
    e2e.saveDealTestMap('MBS2_C22575', `Test Case Number : C22575 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22576 SPT USD THB 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_T, instrument.CURRENCY_A, '31', '3000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    agent.selectBuyerAgent(users.AGENT_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectSellerBrokerName(users.DESK_H, users.BROKER_O);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : MBS2_C22576 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('MBS2_C22576', dealId);
    e2e.saveDealTestMap('MBS2_C22576', `Test Case Number : C22576 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22577 SPT USD CNH 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, '6.75877', '10000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : MBS2_C22577 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('MBS2_C22577', dealId);
    e2e.saveDealTestMap('MBS2_C22577', `Test Case Number : C22577 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22578 SPT USD CNH 0D (Backdated)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    backDate.selectBackDate();
    const backDateDay = date.subtractBusinessDateFromToday(2, instrument.CURRENCY_A, instrument.CURRENCY_S).format(dateFormat);
    backDate.inputBackDate(backDateDay);

    const backDateTime = '10:36:01';
    backDate.inputBackDateTime(backDateTime);
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, '6.75848', '20000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_I, users.BROKER_P);
    broker.selectSellerBrokerName(users.DESK_I, users.BROKER_Q);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);

    backDate.backDateAccept();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : MBS2_C22578 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('MBS2_C22578', dealId);
    e2e.saveDealTestMap('MBS2_C22578', `Test Case Number : C22578 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
