/* eslint-disable no-undef */
/* eslint-disable max-len */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
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
  it('C10269 NDF USD MYR IM1 (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_H, '', instrument.TENOR_P, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`Test1 Case Number : Test1 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('Venue_TC_1', `Test Case Number : C10269 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C10269@@venue:NDF_USD_MYR_IM1_XOFF_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C9862 NDF USD CNY 1M*2M (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('Venue_TC_2', `Test Case Number : C9862 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C9862_leg1@@venue:NDF_USD_CNY_1M_XOFF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C9862_leg2@@venue:NDF_USD_CNY_2M_XOFF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('C10270 NDF USD MYR IM1 (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_H, '', instrument.TENOR_P, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();

    log.log(`Test Case Number : C10270 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('Venue_TC_3', `Test Case Number : C10270 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C10270@@venue:NDF_USD_MYR_IM1_TIRD_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C9863 NDF USD CNY 1M*2M (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('SPREAD_TC_4', `Test Case Number : C9863 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C9863_leg1@@venue:NDF_USD_CNY_1M_TIRD_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C9863_leg2@@venue:NDF_USD_CNY_2M_TIRD_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('C10272 NDF USD MYR IM1 (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_H, '', instrument.TENOR_P, '12.123', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();

    log.log(`Test Case Number : Test4 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap('Venue_TC_5', `Test Case Number : C10272 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C10272@@venue:NDF_USD_MYR_IM1_TEIR_NEW');
    popUpNavModel.closePopUpMessage();
  });
  /*
  it('C9864 NDF USD CNY 1M*2M (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_G);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('SPREAD_TC_6', `Test Case Number : C9864 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C9864_leg1@@venue:NDF_USD_CNY_1M_TEIR_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C9864_leg2@@venue:NDF_USD_CNY_2M_TEIR_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });
*/
  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
