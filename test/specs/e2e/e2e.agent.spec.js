/* eslint-disable no-undef */
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
const e2e = new E2EModel();
const log = new Logs();
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
  it('C10122 NDF USD INR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F, '11.123', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C10122 and Deal ID : ${dealId}`);

    e2e.saveDealTestMap('AGENT_OUTRIGHT_TC_1', `Test Case Number : C10122 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C10122@@agents:NDF_USD_INR_1M_SEF_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C10127 NDF USD BRL BMF1*1M (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, '', instrument.TENOR_R1, '18.18', '3', instrument.TENOR_F, '18.1805', '3');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('AGENT_SPREAD_TC_2', `Test Case Number : C10127 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C10127_leg1@@agents:NDF_USD_BRL_BMF1_SEF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C10127_leg2@@agents:NDF_USD_BRL_1M_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C10793 NDF USD IDR 1M (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_M, '', instrument.TENOR_F, '14195', '10');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.selectSellerAgent(users.AGENT_A);
    dealModel.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C10793 and Deal ID : ${dealId}`);

    e2e.saveDealTestMap('AGENT_OUTRIGHT_TC_1', `Test Case Number : C10793 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C10793@@agents:C10793_NDF_USD_IDR_1M_SEF_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C12089 NDF USD INR 2M*3M 3PA XOFF NEW', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_F1, '63.88', '12', instrument.TENOR_F2, '68.2313', '12');

    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_E);
    dealModel.verifyCasCadClose();

    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('AGENT_C12089', `Test Case Number : C12089 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    sharedStore.setValueToStore('C12089 - Leg1', dealLeg1);
    sharedStore.setValueToStore('C12089 - Leg2', dealLeg2);
    e2e.saveDealIdWithTest(`${dealLeg1}@@complete:new:leg1`, 'C12089_leg1@@agents:NDF_USD_INR_2M_3M_XOFF_LEG1_NEW');
    e2e.saveDealIdWithTest(`${dealLeg2}@@complete:new:leg2`, 'C12089_leg2@@agents:NDF_USD_INR_3M_3M_XOFF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
