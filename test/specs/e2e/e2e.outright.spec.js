/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const E2EModel = require('../../models/E2EModel.js');
const Logs = require('../../core/utility/Logs.js');
const SharedStore = require('../../core/store/SharedStore.js');
const LocalUsers = require('../../data/qa/e2e/ndf/UserDetails.js');
const LocalInstrument = require('../../data/qa/e2e/ndf/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const WindowActions = require('../../core/actions/WindowActions.js');
const API = require('../../models/blotter/BlotterApiModel');

let users = null;
let instrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = null;
    instrument = null;
    break;
  case 'QA':
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const settingsModel = new SettingsModel();
const e2e = new E2EModel();
const log = new Logs();
const popUpNavModel = new PopUpNavigationModel();
const windowActions = new WindowActions();
const api = new API();
const sharedStore = new SharedStore();
let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('NDF Outright SEF', () => {
  /* it('C6037 NDF USD INR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '11.123', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C6037 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : C6037 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, 'C6037@@outright:NDF_USD_INR_1M_SEF_NEW');
    popUpNavModel.closePopUpMessage();
  }); */

  it('C6038 NDF USD MYR IM1 (Amend)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_H, '', instrument.TENOR_P, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    // NDF_USD_MYR_IM1_AMEND
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C6038 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(2, `Test Case Number : C6038 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C6038', dealId);
    // Please generate the differences manually for amend.
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C6038@@outright:NDF_USD_MYR_IM1_SEF_AMEND');
    popUpNavModel.closePopUpMessage();

    const j/* SessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);

    const newAmount = '16000000';
    const newPrice = '13.456';
    const buyBroCcy = instrument.CURRENCY_A;
    const buyBro = '102';
    const sellBroCcy = instrument.CURRENCY_H;
    const sellBro = '52';
    const response = e2e.editE2eNdfDeal(jSessionId, dealEntityId, lockSequence, 'Editing deal', newAmount, newPrice, buyBroCcy, buyBro, sellBroCcy, sellBro);
    // following verifies response from edit deal REST call
    expect(parseInt(response.deal.executionChain.dealStrategies[0].size, 10)).to.equal(parseInt(newAmount, 10));
    expect(parseInt(response.deal.executionChain.dealStrategies[0].price, 10)).to.equal(parseInt(newPrice, 10));
    expect(response.deal.deal.tradeSides.receiver.brokerage.currency.code).to.equal(instrument.CURRENCY_A);
    expect(response.deal.deal.tradeSides.payer.brokerage.currency.code).to.equal(instrument.CURRENCY_H);
    expect(parseInt(response.deal.deal.tradeSides.receiver.brokerage.amount, 10)).to.equal(parseInt(buyBro, 10));
    expect(parseInt(response.deal.deal.tradeSides.payer.brokerage.amount, 10)).to.equal(parseInt(sellBro, 10)); */
  });

  it('C6041 NDF USD PHP 2Y (Cancel)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_K1, '13.123', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    // NDF_USD_PHP_2Y_CANCEL
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C6041 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(3, `Test Case Number : C6041 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C6041', dealId);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C6041@@outright:NDF_USD_PHP_2Y_SEF_CANCEL');
    popUpNavModel.closePopUpMessage();
    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, dealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, dealId);
    const response = e2e.cancelE2eDeal(jSessionId, dealEntityId, lockSequence, 'false', 'Test trade cancel');
    expect(response).to.equal(`DMS Deal ID: ${dealEntityId} - cancellation SUCCESS`);
  });

  it('C6386 NDF USD COP 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_K, '', instrument.TENOR_F, '3371', '12');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C6386 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(4, `Test Case Number : C6386 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C6386@@outright:NDF_USD_COP_1M_SEF_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
