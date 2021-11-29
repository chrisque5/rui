const expect = require('chai').expect;
const E2EModel = require('../../../models/E2EModel.js');
const DealModel = require('../../../models/spt/DealModel.js');
const LoginModel = require('../../../models/LoginModel.js');
const SettingsModel = require('../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../models/PopUpNavigationModel');
const SharedStore = require('../../../core/store/SharedStore.js');
const BrokerModel = require('../../../models/spt/BrokerModel.js');
const ClientTraderModel = require('../../../models/spt/ClientTraderModel.js');
const Logs = require('../../../core/utility/Logs.js');
const WindowActions = require('../../../core/actions/WindowActions.js');
const API = require('../../../models/blotter/BlotterApiModel');

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
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();
const sharedStore = new SharedStore();
const log = new Logs();
const windowActions = new WindowActions();
const api = new API();
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
  it('C22528 SPT USD CNH 0D (Amend)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, '6.757045', '15000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C22528 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('SPT_C22528', `Test Case Number : C22528 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C22528', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:amend:leg1`, `C22528@@SPT=>basic:SPT_USD_CNH_0D_${instrument.VENUE_B}_Amend`);
    popUpNav.closePopUpMessage();

    /* const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);

    const newAmount = '16000000';
    const newPrice = '6.75705';
    const response = e2e.editE2eSptDeal(jSessionId, dealEntityId, lockSequence, 'Editing deal', newAmount, newPrice);
    expect(parseInt(response.deal.executionChain.dealStrategies[0].size, 10)).to.equal(parseInt(newAmount, 10));
    expect(parseInt(response.deal.executionChain.dealStrategies[0].price, 10)).to.equal(parseInt(newPrice, 10)); */
  });

  it('C22529 SPT USD HKD 0D (Cancel)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    login.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_A, '7.75015', '20000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C22529 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('SPT_C22529', `Test Case Number : C22529 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C22529', dealId);
    e2e.saveDealIdWithTest(`${dealId}@@complete:cancel:leg1`, `C22529@@SPT=>basic:SPT_USD_HKD_0D_${instrument.VENUE_B}_Cancel`);
    popUpNav.closePopUpMessage();

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);
    const response = e2e.cancelE2eDeal(jSessionId, dealEntityId, lockSequence, 'false', 'Test trade cancel');
    expect(response).to.equal(`DMS Deal ID: ${dealEntityId} - cancellation SUCCESS`);
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
