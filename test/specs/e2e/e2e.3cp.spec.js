/* eslint-disable no-undef */
/* eslint-disable max-len */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const SharedStore = require('../../core/store/SharedStore.js');
const E2EModel = require('../../models/E2EModel.js');
const Logs = require('../../core/utility/Logs.js');
const LocalUsers = require('../../data/qa/e2e/ndf/UserDetails.js');
const LocalInstrument = require('../../data/qa/e2e/ndf/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');

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
const popUpNavModel = new PopUpNavigationModel();
const sharedStore = new SharedStore();

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

describe('3 cp tests', () => {
  it('C10115 NDF USD CNY 1M*2M TPSEF (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_A, instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectcp2SellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_1', `Test Case Number : C10115 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10115_leg1@@3cp:NDF_USD_CNY_1M_SEF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10115_leg2@@3cp:NDF_USD_CNY_2M_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C10118 NDF USD BRL BMF1*1M TPSEF (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, '', instrument.TENOR_R1, '4.0876', '3', instrument.TENOR_F, '4.0923', '3');

    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2SellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_2', `Test Case Number : C10118 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10118_leg1@@3cp:NDF_USD_BRL_BMF1_SEF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10118_leg2@@3cp:NDF_USD_BRL_1M_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('C10241 NDF USD IDR 12M*2Y XOFF', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    dealModel.selectBrokerageStrategy('Liquidity Swap');
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_M, instrument.CURRENCY_A, instrument.TENOR_I, '14775', '2', instrument.TENOR_K1, '15590', '2');

    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2SellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_3', `Test Case Number : C10241 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10241_leg1@@3cp:NDF_USD_IDR_12M_XOFF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10241_leg2@@3cp:NDF_USD_IDR_2Y_XOFF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C10242 NDF USD CNY 1M*2M TIRD (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '7.0375', '10', instrument.TENOR_F1, '7.045', '20');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectcp2SellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_4', `Test Case Number : C10242 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10242_leg1@@3cp:NDF_USD_CNY_1M_TIRD_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10242_leg2@@3cp:NDF_USD_CNY_2M_TIRD_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('C10265 NDF USD KRW IMM1*IMM2 TIRD', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    dealModel.selectBrokerageStrategy('Fix');
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, instrument.CURRENCY_A, instrument.TENOR_P, '1186.93', '3', instrument.TENOR_Q, '1183.24', '3');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_5', `Test Case Number : C10265 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    sharedStore.setValueToStore('C10265 - Leg1', dealLeg1);
    sharedStore.setValueToStore('C10265 - Leg2', dealLeg2);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10265_leg1@@3cp:NDF_USD_KRW_IMM1_TIRD_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10265_leg2@@3cp:NDF_USD_KRW_IMM2_TIRD_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C10266 NDF USD ARS 3M*9M TEIR', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    dealModel.selectBrokerageStrategy('Gap Spread');
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_N, instrument.CURRENCY_A, instrument.TENOR_F2, '67.5', '10', instrument.TENOR_J1, '87.6', '10');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_6', `Test Case Number : C10266 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10266_leg1@@3cp:NDF_USD_ARS_3M_TEIR_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10266_leg2@@3cp:NDF_USD_ARS_9M_TEIR_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C10267 NDF USD ARS 2M*3M 3PA TIRD NEW', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    dealModel.selectBrokerageStrategy('Liquidity Swap');
    settingsModel.ratesFeedOff();
    dealModel.clickThreeCpChk();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_N, instrument.CURRENCY_A, instrument.TENOR_F1, '63.88', '15', instrument.TENOR_F2, '68.2313', '15');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.verifyCasCadClose();
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.verifyCasCadClose();

    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectCP2BuyerAgent(users.AGENT_F);
    dealModel.selectCP2SellerAgent(users.AGENT_E);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_7', `Test Case Number : C10267 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10267_leg1@@3cp:NDF_USD_ARS_2M_3PA_TIRD_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10267_leg2@@3cp:NDF_USD_ARS_3M_3PA_TIRD_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C10268 NDF USD ARS 2M*3M 3PA TPSEF NEW', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.clickThreeCpChk();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_N, '', instrument.TENOR_F1, '63.88', '12', instrument.TENOR_F2, '68.2313', '12');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.verifyCasCadClose();
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.verifyCasCadClose();

    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectCP2BuyerAgent(users.AGENT_F);
    dealModel.selectCP2SellerAgent(users.AGENT_E);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_8', `Test Case Number : C10268 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10268_leg1@@3cp:NDF_USD_ARS_2M_3PA_SEF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10268_leg2@@3cp:NDF_USD_ARS_3M_3PA_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('C10791 NDF USD INR 2M*3M 3PA TEIR NEW', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    dealModel.selectBrokerageStrategy('Fix');
    settingsModel.ratesFeedOff();
    dealModel.clickThreeCpChk();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, instrument.CURRENCY_A, instrument.TENOR_F1, '63.88', '15', instrument.TENOR_F2, '68.2313', '15');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.verifyCasCadClose();
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.verifyCasCadClose();

    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectCP2BuyerAgent(users.AGENT_F);
    dealModel.selectCP2SellerAgent(users.AGENT_E);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_9', `Test Case Number : C10791 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10791_leg1@@3cp:NDF_USD_INR_2M_3PA_TEIR_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10791_leg2@@3cp:NDF_USD_INR_3M_3PA_TEIR_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C10792 NDF USD PHP 2M*3M 3PA XOFF NEW', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.clickThreeCpChk();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_F1, '63.88', '15', instrument.TENOR_F2, '68.2313', '15');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.verifyCasCadClose();
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.verifyCasCadClose();

    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectCP2BuyerAgent(users.AGENT_F);
    dealModel.selectCP2SellerAgent(users.AGENT_E);

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('3CP_SPREAD_10', `Test Case Number : C10792 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C10792_leg1@@3cp:NDF_USD_PHP_2M_3PA_XOFF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C10792_leg2@@3cp:NDF_USD_PHP_3M_3PA_XOFF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
