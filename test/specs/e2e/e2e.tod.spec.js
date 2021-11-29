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
const sharedStore = new SharedStore();
const e2e = new E2EModel();
const log = new Logs();

const popUpNavModel = new PopUpNavigationModel();
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

/* TOD Test Cases */
describe('TODFIX', () => {
  it('C6475 NDF USD PHP TOD (New)', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_A1, '51.11', '10');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();

    const dealId = e2e.getDealId();
    e2e.saveDealTestMap('TOD_1_Outright', `Test Case Number : C6475 and Deal ID : ${dealId}`);
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C6475@@tod:NDF_USD_PHP_TOD_SEF_LEG1_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('C12746 NDF USD KRW TOD*1M (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_A1, '1211.15', '10', instrument.TENOR_F, '1210.1', '10');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('TOD_2_SPREAD', `Test Case Number : C10088 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    sharedStore.setValueToStore('C12746 - Leg1', dealLeg1);
    sharedStore.setValueToStore('C12746 - Leg2', dealLeg2);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C10088_leg1@@tod:NDF_USD_KRW_TOD_SEF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C10088_leg2@@tod:NDF_USD_KRW_1M_SEF_LEG2_NEW_SPREAD');
    popUpNavModel.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
