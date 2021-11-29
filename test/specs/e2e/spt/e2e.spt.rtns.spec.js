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
  it('C22612 SPT GBP USD 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, instrument.CURRENCY_P, '1.2914', '12000000');
    clientTrader.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectBuyerAgent(users.AGENT_E);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : RTNS_C22612 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('RTNS_C22612', dealId);
    e2e.saveDealTestMap('RTNS_C22612', `Test Case Number : C22612 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22613 SPT GBP USD 0D (3rd Party Agents)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, instrument.CURRENCY_P, '1.2914', '12000000');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    agent.selectSellerAgent(users.AGENT_E);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : RTNS_C22613 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('RTNS_C22613', dealId);
    e2e.saveDealTestMap('RTNS_C22613', `Test Case Number : C22613 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22614 SPT USD GBP 0D (Dealt CCY)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_P, instrument.CURRENCY_P, instrument.CURRENCY_A, '1.2914', '12000000');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : RTNS_C22614 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('RTNS_C22614', dealId);
    e2e.saveDealTestMap('RTNS_C22614', `Test Case Number : C22614 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22615 SPT GBP USD 0D)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_P, instrument.CURRENCY_A, instrument.CURRENCY_P, '1.2914', '12000000');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : RTNS_C22615 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('RTNS_C22615', dealId);
    e2e.saveDealTestMap('RTNS_C22615', `Test Case Number : C22615 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22616 SPT CNH USD 0D (Backdated)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    backDate.selectBackDate();
    const backDateDay = date.subtractBusinessDateFromToday(2, instrument.CURRENCY_A, instrument.CURRENCY_S).format(dateFormat);
    backDate.inputBackDate(backDateDay);

    const backDateTime = '10:36:01';
    backDate.inputBackDateTime(backDateTime);
    deal.placeSptOrder(instrument.CURRENCY_S, instrument.CURRENCY_A, instrument.CURRENCY_S, '1.2914', '12000000');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);

    backDate.backDateAccept();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : RTNS_C22616 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('RTNS_C22616', dealId);
    e2e.saveDealTestMap('RTNS_C22616', `Test Case Number : C22616 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('C22617 SPT CNH USD 0D (Backdated Time)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    backDate.selectBackDate();

    const backDateTime = date.subtractHoursFromCurrentTime(2);
    backDate.inputBackDateTime(backDateTime);
    deal.placeSptOrder(instrument.CURRENCY_S, instrument.CURRENCY_A, instrument.CURRENCY_S, '1.2914', '12000000');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);

    backDate.backDateAccept();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : RTNS_C22617 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('RTNS_C22617', dealId);
    e2e.saveDealTestMap('RTNS_C22617', `Test Case Number : C22617 and Deal ID : ${dealId}`);
    popUpNav.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
