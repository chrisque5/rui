/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const BackDateModel = require('../../components/ndf/BackDate.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const E2EModel = require('../../models/E2EModel.js');
const Logs = require('../../core/utility/Logs.js');
const LocalUsers = require('../../data/qa/e2e/ndf/UserDetails.js');
const LocalInstrument = require('../../data/qa/e2e/ndf/InstrumentDetails.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const Constants = require('../../data/Constants.js');

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
const backDate = new BackDateModel();
const loginModel = new LoginModel();
const settingsModel = new SettingsModel();
const popUpNavModel = new PopUpNavigationModel();

const e2e = new E2EModel();
const log = new Logs();
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

describe('E2E RTNS scenario for NDF Outright and Spread', () => {
  // 3rd Party Agents
  it('C12388 NDF USD ARS TOM MTF/TEFD (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_N, '', instrument.TENOR_A, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();

    log.log(`RTNS_1 Case Number : RTNS_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('DOG_1', `Test Case Number : C12388 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C12388@@NDF_RTNS_1:NDF_USD_ARS_TOM_${instrument.VENUE_E}_NEW`);
  });

  it('C12389 NDF USD PHP TOD OTF/TEMM  (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_A1, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.selectSellerAgent(users.AGENT_E);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();

    log.log(`RTNS_2 Case Number : RTNS_2 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('RTNS_2', `Test Case Number : C12389 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C12389@@NDF_RTNS_2:NDF_USD_PHP_TOD_${instrument.VENUE_G}_NEW`);
  });

  it('C12390 NDF IDR USD 1M XOFF (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_M, instrument.CURRENCY_M, instrument.TENOR_F, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();

    log.log(`RTNS_3 Case Number : RTNS_3 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('TRNS_3', `Test Case Number : C12390 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C12390@@NDF_RTNS_3:NDF_IDR_USD_1M_${instrument.VENUE_B}_NEW`);
  });

  it('C12391 NDF USD INR 1W TPSEF (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_C, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();

    log.log(`RTNS_4 Case Number : RTNS_4 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('RTNS_4', `Test Case Number : C12391 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C12391@@NDF_RTNS_4:NDF_USD_ARS_TOM_${instrument.VENUE_A}_NEW`);
  });

  it('C12392 NDF USD KRW TOM*1W MTF/TEFD(New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_A, '6.6045', '15', instrument.TENOR_C, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('RTNS_5', `Test Case Number : C12392 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C12392_leg1@@NDF_RTNS_5:NDF_USD_kRW_TOM_TEFD_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C12392_leg2@@NDF_RTNS_5:NDF_USD_KRW_1W_TEFD_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C12393 NDF USD MYR TOD*1W OTF/TEMM (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_H, '', instrument.TENOR_A1, '6.6045', '15', instrument.TENOR_C, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.selectSellerAgent(users.AGENT_E);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('RTNS_6', `Test Case Number : C12393 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C12393_leg1@@NDF_RTNS_6:NDF_USD_MYR_TOD_TEMM_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C12393_leg2@@NDF_RTNS_6:NDF_USD_MYR_1W_TEMM_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C12394 NDF IDR USD 1M*2M XOFF (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_M, instrument.CURRENCY_M, instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('RTNS_7', `Test Case Number : C12394 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C12394_leg1@@NDF_RTNS_7:NDF_IDR_USD_1M_XOFF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C12394_leg2@@NDF_RTNS_7:NDF_IDR_USD_2M_XOFF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C12395 NDF USD PHP 1Y*2Y TPSEF', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_K, '14775', '2', instrument.TENOR_K1, '15590', '2');

    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectcp2SellerTrader(users.CLIENT_L.Client, users.TRADER_M);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('RTNS_8', `Test Case Number : C12395 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C12395_leg1@@NDF_RTNS_8:NDF_USD_PHP_1Y_SEF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C12395_leg2@@NDF_RTNS_8:NDF_USD_PHP_2Y_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C12396 NDF USD CNY 1Y*2Y SEF (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_K, '6.6045', '15', instrument.TENOR_K1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('RTNS_7', `Test Case Number : C12396 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C12396_leg1@@NDF_RTNS_9:NDF_IDR_CNY_1Y_SEF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C12396_leg2@@NDF_RTNS_9:NDF_IDR_CNY_2Y_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C13103 NDF USD INR 1M TPSEF (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();
    const dealId = e2e.getDealId();

    log.log(`RTNS_C13103 Case Number : RTNS_C13103 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('RTNS_C13103', `Test Case Number : C13103 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C13103@@NDF_RTNS_C13103:NDF_USD_INR_1M_${instrument.VENUE_A}_NEW`);
  });

  it('C13104 NDF USD INR 1M TPSEF (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    backDate.selectBackDate();
    backDate.inputBackDateTime('06:05:05');

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();
    const dealId = e2e.getDealId();

    log.log(`RTNS_C13104 Case Number : RTNS_C13104 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('RTNS_C13104', `Test Case Number : RTNS_C13104 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `RTNS_C13104@@RTNS_C13104:NDF_USD_INR_1M_${instrument.VENUE_A}_NEW`);
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
