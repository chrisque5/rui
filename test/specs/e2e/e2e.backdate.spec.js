/* eslint-disable no-undef */
/* eslint-disable max-len */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const BackDateModel = require('../../components/ndf/BackDate.js');
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
const backDate = new BackDateModel();
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
                    NDF BACK DATED Deals
*/
describe('NDF BACK Dated SEF Deals', () => {
  it('C13074 NDF USD MYR IM1 NEW', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();

    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_H, '', instrument.TENOR_P, '4.2054', '15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : C13074 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(2, `Test Case Number : C13074 and Deal ID : ${dealId}`);
    sharedStore.setValueToStore('C13074', dealId);
    // Please generate the differences manually for amend.
    e2e.saveDealTestMapping(`${dealId}@@complete:new:leg1`, 'C13074@@backdate:NDF_USD_MYR_IM1_SEF_NEW');
    popUpNavModel.closePopUpMessage();
  });
  it('C13075 NDF USD CNY 1M*2M (New)', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();

    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.6045', '15', instrument.TENOR_F1, '6.605', '15');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealLeg1 = e2e.getLeg1DealId();
    const dealLeg2 = e2e.getLeg2DealId();
    e2e.saveDealTestMap('SPREAD_TC_1', `Test Case Number : C13075 and Leg1 Deal ID : ${dealLeg1} : Leg2 Deal ID : ${dealLeg2}`);
    e2e.saveDealTestMapping(`${dealLeg1}@@complete:new:leg1`, 'C13075_leg1@@backdate:NDF_USD_CNY_1M_SEF_LEG1_NEW');
    e2e.saveDealTestMapping(`${dealLeg2}@@complete:new:leg2`, 'C13075_leg2@@backdate:NDF_USD_CNY_2M_SEF_LEG2_NEW');
    popUpNavModel.closePopUpMessage();
  });

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
