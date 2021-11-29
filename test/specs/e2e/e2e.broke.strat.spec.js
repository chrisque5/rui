/* eslint-disable no-undef */
/* eslint-disable max-len */
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

/*
                    NDF Brokerage Strategy Spread SEF Deals
*/
describe('NDF Brokerage Strategy Spread Deals', () => {
  it('C34721 NDF USD CNY 1M*3M (Liquidity Swap)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Liquidity Swap');
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '30', instrument.TENOR_F2, '6.605', '30');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('BROKE_STRAT_1', `Test Case Number : C34721 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    sharedStore.setValueToStore('C34721 - Leg1', dealLeg1);
    sharedStore.setValueToStore('C34721 - Leg2', dealLeg2);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C34721_leg1@@broke_strat:NDF_USD_CNY_1M_XOFF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C34721_leg2@@broke_strat:NDF_USD_CNY_3M_XOFF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C34722 NDF USD CNY 1M*3M (Fix)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Fix');
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '30', instrument.TENOR_F2, '6.605', '30');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('BROKE_STRAT_2', `Test Case Number : C34722 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    sharedStore.setValueToStore('C34722 - Leg1', dealLeg1);
    sharedStore.setValueToStore('C34722 - Leg2', dealLeg2);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C34722_leg1@@broke_strat:NDF_USD_CNY_1M_TPSEF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C34722_leg2@@broke_strat:NDF_USD_CNY_3M_TPSEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C34723 NDF USD CNY 1M*6M (Gap Spread)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '30', instrument.TENOR_J, '6.605', '30');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('BROKE_STRAT_3', `Test Case Number : C34723 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    sharedStore.setValueToStore('C34723 - Leg1', dealLeg1);
    sharedStore.setValueToStore('C34723 - Leg2', dealLeg2);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C34723_leg1@@broke_strat:NDF_USD_CNY_1M_TEFD_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C34723_leg2@@broke_strat:NDF_USD_CNY_6M_TEFD_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
