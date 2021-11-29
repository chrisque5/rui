/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const BackDateModel = require('../../components/ndf/BackDate.js');
const E2EModel = require('../../models/E2EModel.js');
const Logs = require('../../core/utility/Logs.js');
const LocalUsers = require('../../data/qa/e2e/ndf/UserDetails.js');
const LocalInstrument = require('../../data/qa/e2e/ndf/InstrumentDetails.js');
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

describe('NDF Execution Venues Deals', () => {
// ****************************** DOG ******************************* */

  it('C11913 NDF USD INR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`DOG_1 Case Number : DOG_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('DOG_1', `Test Case Number : C11913 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11913@@dog:NDF_USD_INR_1M_${instrument.VENUE_E}_NEW`);
  });

  it('C11980 NDF USD CNY 1M*2M TEFD', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');

    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_2', `Test Case Number : DOG_2 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11980_leg1@@dog:NDF_USD_CNY_1M_${instrument.VENUE_E}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11980_leg2@@dog:NDF_USD_CNY_2M_${instrument.VENUE_E}_LEG2_NEW`);
  });

  it('C11981 NDF USD INR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '4.183612', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`DOG_3 Case Number : DOG_3 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('DOG_3', `Test Case Number : C11981 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11981@@dog:NDF_USD_INR_1M_${instrument.VENUE_G}_NEW`);
  });

  it('C11982 NDF USD CNY 1M*2M TEMM', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_4', `Test Case Number : C11982 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11982_leg1@@dog:NDF_USD_CNY_1M_${instrument.VENUE_G}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11982_leg2@@dog:NDF_USD_CNY_2M_${instrument.VENUE_G}_LEG2_NEW`);
  });

  // 3CP

  it('C11983 NDF USD CNY 1M*2M TEFD', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '7.0375', '10', instrument.TENOR_F1, '7.045', '20');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectcp2SellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2BuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectcp2SellerBrokerName(users.DESK_F, users.BROKER_M);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_3CP_5', `Test Case Number : DOG_3CP_5 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11983_leg1@@dog:NDF_USD_CNY_1M_${instrument.VENUE_E}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11983_leg2@@dog:NDF_USD_CNY_2M_${instrument.VENUE_E}_LEG2_NEW`);
  });

  it('C11984 NDF USD ARS 3M*9M TEIR', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_N, '', instrument.TENOR_F2, '67.5', '10', instrument.TENOR_J1, '87.6', '10');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2BuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectcp2SellerBrokerName(users.DESK_F, users.BROKER_M);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_3CP_6', `Test Case Number : DOG_3CP_6 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11984_leg1@@dog:NDF_USD_ARS_3M_${instrument.VENUE_G}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11984_leg2@@dog:NDF_USD_ARS_9M_${instrument.VENUE_G}_LEG2_NEW`);
  });

  it('C13076 NDF USD INR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();

    log.log(`DOG_C13076 Case Number : DOG_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('DOG_1', `Test Case Number : C13076 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C13076@@dog:NDF_USD_INR_1M_${instrument.VENUE_E}_NEW`);
  });

  // ****************************** MBS2 ******************************* */

  it('C11874 NDF USD KRW 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_F, '1156.1', '1.25');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`mbs2_1 Case Number : mbs2_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('mbs2_1', `Test Case Number : C10269 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11874@@mbs2:NDF_USD_KRW_1M_${instrument.VENUE_B}_NEW`);
  });

  it('C11875 NDF USD CNY 1M*2M XOFF', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_4', `Test Case Number : C11982 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11875_leg1@@mbs2:NDF_USD_CNY_1M_${instrument.VENUE_B}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11875_leg2@@mbs2:NDF_USD_CNY_2M_${instrument.VENUE_B}_LEG2_NEW`);
  });

  // TOMFIX

  it('C11876 NDF USD PHP TOM (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_A, '1.123', '10');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`mbs2_1 Case Number : mbs2_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('mbs2_1', `Test Case Number : C11876 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11876@@mbs2:NDF_USD_PHP_TOM_${instrument.VENUE_B}_NEW`);
  });

  // TODFIX

  it('C11877 NDF USD PHP TOD (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_A1, '51.11', '10');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`mbs2_1 Case Number : mbs2_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('mbs2_1', `Test Case Number : C11876 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11877@@mbs2:NDF_USD_PHP_TOM_${instrument.VENUE_B}_NEW`);
  });

  // DEALT_CCY

  it('C11878 NDF.INR.USD.1M XOFF (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, instrument.CURRENCY_G, instrument.TENOR_F, '11.123', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();
    e2e.saveDealTestMap('DEALT_CCY_1_Outright', `Test Case Number : C10098 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11878@@mbs2:NDF_INR_USD_1M_${instrument.VENUE_B}_NEW`);
  });

  // 3 CP

  it('C11879 NDF USD IDR 1Y*2Y XOFF', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_M, '', instrument.TENOR_K, '14775', '20', instrument.TENOR_K1, '15590', '20');

    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2SellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_3CP_5', `Test Case Number : DOG_3CP_5 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11879_leg1@@dog:NDF_USD_IDR_1Y_${instrument.VENUE_B}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11879_leg2@@dog:NDF_USD_IDR_2Y_${instrument.VENUE_B}_LEG2_NEW`);
  });

  // 3rd Party Agent

  it('C11880 NDF USD INR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '11.123', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectBuyerAgent(users.AGENT_G);
    dealModel.selectSellerAgent(users.AGENT_H);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`mbs2_2 Case Number : mbs2_2 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('mbs2_2', `Test Case Number : C10269 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11880@@mbs2:NDF_USD_INR_1M_${instrument.VENUE_B}_NEW`);
  });

  it('C11882 NDF USD PHP 2M*3M 3PA XOFF NEW', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_F1, '51.17', '15', instrument.TENOR_F2, '51.22', '15');

    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.verifyCasCadClose();
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.verifyCasCadClose();

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_10', `Test Case Number : C11882 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C11882_leg1@@mbs2:NDF_USD_PHP_2M_3PA_${instrument.VENUE_B}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C11882_leg2@@mbs2:NDF_USD_PHP_3M_3PA_${instrument.VENUE_B}_LEG2_NEW`);
  });

  it('C11881 NDF USD IDR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_M, '', instrument.TENOR_F, '14060', '1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerAgent(users.AGENT_H);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`mbs2_2 Case Number : mbs2_2 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('mbs2_2', `Test Case Number : C11881 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C11881@@mbs2:NDF_USD_IDR_1M_${instrument.VENUE_B}_NEW`);
  });

  it('C13077 NDF USD KRW 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_F, '1156.1', '1.25');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_I);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_J);

    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();

    log.log(`mbs2_C13077 Case Number : mbs2_1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('mbs2_1', `Test Case Number : C13077 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, `C13077@@mbs2:NDF_USD_KRW_1M_${instrument.VENUE_B}_NEW`);
  });

  it('C13078 NDF USD CNY 1M*2M XOFF', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_I);

    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('DOG_4', `Test Case Number : C13078 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, `C13078_leg1@@mbs2:NDF_USD_CNY_1M_${instrument.VENUE_B}_LEG1_NEW`);
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, `C13078_leg2@@mbs2:NDF_USD_CNY_2M_${instrument.VENUE_B}_LEG2_NEW`);
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
