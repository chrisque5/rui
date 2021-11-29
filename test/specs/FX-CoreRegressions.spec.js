/* eslint-disable no-undef */
/* eslint-disable max-len */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel');
const LoginModel = require('../models/LoginModel');
const SettingsModel = require('../models/SettingsModel');
const DateModel = require('../models/DateModel');
const E2EModel = require('../models/E2EModel');
const Logs = require('../core/utility/Logs');
const moment = require('../../node_modules/moment/moment');
const ndfUsers = require('../data/qa/UserDetails');
const dfInstrument = require('../data/qa/InstrumentDetails');
const fwdUsers = require('../data/qa/fwd/UserDetails');
const fwdInstrument = require('../data/qa/fwd/InstrumentDetails');
const sptUsers = require('../data/qa/spt/UserDetails');
const sptInstrument = require('../data/qa/spt/InstrumentDetails');
const Constants = require('../data/Constants');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const SptDealModel = require('../models/spt/DealModel');
const StrategyModel = require('../models/fwd/StrategyModel');
const FwdDealModel = require('../models/fwd/DealModel');

let users = null;
let instrument = null;
let usersFwd = null;
let instrumentFwd = null;
let usersSpt = null;
let instrumentSpt = null;
const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = null;
    instrument = null;
    usersFwd = null;
    instrumentFwd = null;
    usersSpt = null;
    instrumentSpt = null;
    break;
  case 'QA':
    users = ndfUsers;
    instrument = dfInstrument;
    usersFwd = fwdUsers;
    instrumentFwd = fwdInstrument;
    usersSpt = sptUsers;
    instrumentSpt = sptInstrument;
    break;
  default:
    users = ndfUsers;
    instrument = dfInstrument;
    usersFwd = fwdUsers;
    instrumentFwd = fwdInstrument;
    usersSpt = sptUsers;
    instrumentSpt = sptInstrument;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const settingsModel = new SettingsModel();
const date = new DateModel();
const e2e = new E2EModel();
const log = new Logs();
const popUpNavModel = new PopUpNavigationModel();
const sptdealModel = new SptDealModel();
const strategy = new StrategyModel();
const fwddealModel = new FwdDealModel();
let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

const dealIDs = {
  C11921: '',
  C11922Leg1: '',
  C11922Leg2: '',
  C11923: '',
  C11924: '',
  C11925: '',
  C11928: '',
  C11929: '',
  C11932Leg1: '',
  C11932Leg2: '',
  C11933: '',
  C11934: '',
  C31633: '',
  C19442Leg1: '',
  C19442Leg2: '',
  C24134: '',
  C24136: '',
  C24222: '',
  C24223: '',
  C24224: '',
};

function moveToNDF() {
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToFWD() {
  loginModel.selectFWD();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

describe('NDF Deals for FX Regression', () => {
  it('C11921 NDF Test Case 1 - NDF USD CNY 1M', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealIDs.C11921 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11921 and Deal ID : ${dealIDs.C11921}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11922 NDF Test Case 2 - NDF USD INR TOM*1M', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_A, '20', '10', instrument.TENOR_F, '20', '10');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    dealIDs.C11922Leg1 = e2e.getLeg1DealId();
    dealIDs.C11922Leg2 = e2e.getLeg2DealId();
    log.errorLog(`Test Case Number : C11922 and Deal ID Leg 1 : ${dealIDs.C11922Leg1}`);
    log.errorLog(`Test Case Number : C11922 and Deal ID Leg 2 : ${dealIDs.C11922Leg2}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11923 NDF Test Case 3 - NDF USD CNY 1M', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_M.Client, users.TRADER_O);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealIDs.C11923 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11923 and Deal ID : ${dealIDs.C11923}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11924 NDF Test Case 4 - NDF USD CNY 1M', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealIDs.C11924 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11924 and Deal ID : ${dealIDs.C11924}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11925 NDF Test Case 5 - NDF USD CNY 1M (trade date + 1)', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    const backDateDay = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    dealModel.inputBackDate(backDateDay);

    const backDateTime = '10:36:01';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    backDateFormatted = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format('Do MMMM YYYY');
    expect(dealModel.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    dealModel.backDateAccept();
    dealIDs.C11925 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11925 and Deal ID : ${dealIDs.C11925}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11928 NDF Test Case 6 - NDF USD CNY 1M', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealIDs.C11928 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11928 and Deal ID : ${dealIDs.C11928}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11929 NDF Test Case 7 - NDF USD CNY 1M', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealIDs.C11929 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11929 and Deal ID : ${dealIDs.C11929}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11932 NDF Test Case 8 - NDF USD BRL 1M*2M 3 CP', () => {
    // Brokerage Strategy Default test
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, '', instrument.TENOR_F, '3.4111', '5', instrument.TENOR_F1, '3.5341', '5');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2BuyerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    dealIDs.C11932Leg1 = e2e.getLeg1DealId();
    dealIDs.C11932Leg2 = e2e.getLeg2DealId();
    log.errorLog(`Test Case Number : C11932 and Deal ID Leg 1 : ${dealIDs.C11932Leg1}`);
    log.errorLog(`Test Case Number : C11932 and Deal ID Leg 2 : ${dealIDs.C11932Leg2}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11933 NDF Test Case 9 - NDF USD CNY 1M (trade date + 1)', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    const backDateDay = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    dealModel.inputBackDate(backDateDay);

    const backDateTime = '10:36:01';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_M.Client, users.TRADER_O);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    backDateFormatted = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format('Do MMMM YYYY');
    expect(dealModel.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    dealModel.backDateAccept();
    dealIDs.C11933 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11933 and Deal ID : ${dealIDs.C11933}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C11934 NDF Test Case 10 - NDF USD CNY 3M MiFID', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_E);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F2, '5', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealIDs.C11934 = e2e.getDealId();
    log.errorLog(`Test Case Number : C11934 and Deal ID : ${dealIDs.C11934}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C31633 NDF Test Case 11 - NDF USD CNY 41D Dates', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    const backDateDay = moment('04/29/2021').format(dateFormat);
    const backDateTime = '10:36:01';
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_C, '5', '100');

    dealModel.inputFixingDate('01/05/2021');
    dealModel.inputPublishDate('01/05/2021');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_G);
    dealModel.clickSubmitBtn();
    dealModel.backDateAccept();
    dealIDs.C31633 = e2e.getDealId();
    log.errorLog(`Test Case Number : C31633 and Deal ID : ${dealIDs.C31633}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C19422 NDF Test Case 12 - NDF USD INR TOM*1M - Brokerage Strategy Test', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Fix');
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_G, '', instrument.TENOR_A, '20', '10', instrument.TENOR_F, '20', '10');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    dealIDs.C19442Leg1 = e2e.getLeg1DealId();
    dealIDs.C19442Leg2 = e2e.getLeg2DealId();
    log.errorLog(`Test Case Number : C19422 and Deal ID Leg 1 : ${dealIDs.C19442Leg1}`);
    log.errorLog(`Test Case Number : C19422 and Deal ID Leg 2 : ${dealIDs.C19442Leg2}`);
    popUpNavModel.closePopUpMessage();
  });
});

describe('SPT Deals for FX Regression', () => {
  it('C24134 SPT Test Case 1 - Verify Spot Deal', () => {
    loginModel.selectSPT();
    dealModel.selectExecutionVenue(instrumentSpt.VENUE_B);
    settingsModel.ratesFeedOff();
    sptdealModel.placeSptOrder(instrumentSpt.CURRENCY_A, instrumentSpt.CURRENCY_Q, instrumentSpt.CURRENCY_A, '0.1', '0.15');
    dealModel.selectBuyerTrader(usersSpt.CLIENT_A.Client, usersSpt.TRADER_A);
    dealModel.selectSellerTrader(usersSpt.CLIENT_B.Client, usersSpt.TRADER_B);
    dealModel.selectBuyerBrokerName(usersSpt.DESK_F, usersSpt.BROKER_L);
    dealModel.selectSellerBrokerName(usersSpt.DESK_F, usersSpt.BROKER_M);
    dealModel.clickSubmitBtn();
    dealIDs.C24134 = e2e.getDealId();
    log.errorLog(`Test Case Number : C24134 and Deal ID : ${dealIDs.C24134}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C24136 SPT Test Case 2 - Verify CLS Functionality', () => {
    loginModel.selectSPT();
    dealModel.selectExecutionVenue(instrumentSpt.VENUE_B);
    settingsModel.ratesFeedOff();
    sptdealModel.placeSptOrder(instrumentSpt.CURRENCY_A, instrumentSpt.CURRENCY_Q, instrumentSpt.CURRENCY_A, '0.1', '0.15');
    dealModel.selectBuyerTrader(usersSpt.CLIENT_A.Client, usersSpt.TRADER_A);
    dealModel.selectSellerTrader(usersSpt.CLIENT_B.Client, usersSpt.TRADER_B);
    dealModel.selectBuyerBrokerName(usersSpt.DESK_F, usersSpt.BROKER_L);
    dealModel.selectSellerBrokerName(usersSpt.DESK_F, usersSpt.BROKER_M);
    dealModel.clickSubmitBtn();
    dealIDs.C24136 = e2e.getDealId();
    log.errorLog(`Test Case Number : C24134 and Deal ID : ${dealIDs.C24136}`);
    popUpNavModel.closePopUpMessage();
  });
});

describe('FWD Deals for FX Regression', () => {
  it('C24222 FWD Test Case 1 - IMM Spot-to-end Test', () => {
    moveToFWD();
    settingsModel.ratesFeedOff();
    strategy.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('XOFF');
    fwddealModel.placeOutrightOrder(instrumentFwd.CURRENCY_A, instrumentFwd.CURRENCY_S, instrumentFwd.CURRENCY_A, instrumentFwd.TENOR_O, '6', '0.12');
    dealModel.selectBuyerTrader(usersFwd.CLIENT_A.Client, usersFwd.TRADER_A);
    dealModel.selectSellerTrader(usersFwd.CLIENT_C.Client, usersFwd.TRADER_C);
    dealModel.selectBuyerBrokerName(usersFwd.DESK_F, usersFwd.BROKER_L);
    dealModel.selectSellerBrokerName(usersFwd.DESK_F, usersFwd.BROKER_M);
    dealModel.clickSubmitBtn();
    dealIDs.C24222 = e2e.getDealId();
    log.errorLog(`Test Case Number : C24222 and Deal ID : ${dealIDs.C24222}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C24223 FWD Test Case 2 - Verify CLS Functionality - FWD Deal', () => {
    moveToFWD();
    settingsModel.ratesFeedOff();
    strategy.clickRdoStrategyForward();
    dealModel.selectExecutionVenue('XOFF');
    dealModel.clickBuyerNettBroBtn();
    fwddealModel.placeForwardOrder(instrumentFwd.CURRENCY_A, instrumentFwd.CURRENCY_S, instrumentFwd.CURRENCY_A, instrumentFwd.TENOR_O, '6', '0.12', '6.1', '0.12');
    dealModel.selectBuyerTrader(usersFwd.CLIENT_A.Client, usersFwd.TRADER_A);
    dealModel.selectSellerTrader(usersFwd.CLIENT_C.Client, usersFwd.TRADER_C);
    dealModel.selectBuyerBrokerName(usersFwd.DESK_F, usersFwd.BROKER_L);
    dealModel.selectSellerBrokerName(usersFwd.DESK_F, usersFwd.BROKER_M);
    dealModel.clickSubmitBtn();
    dealIDs.C24223 = e2e.getDealId();
    log.errorLog(`Test Case Number : C24223 and FWD Deal ID : ${dealIDs.C24223}`);
    popUpNavModel.closePopUpMessage();
  });

  it('C24224 FWD Test Case 3 - Verify Turn Trade Flag - FWD Deal', () => {
    moveToFWD();
    settingsModel.ratesFeedOff();
    strategy.clickRdoStrategyFwdForward();
    dealModel.selectExecutionVenue('XOFF');
    dealModel.clickBuyerNettBroBtn();
    dealModel.clickSellerNettBroBtn();
    dealModel.selectTurnTrade();
    fwddealModel.placeFwdForwardOrder(instrumentFwd.CURRENCY_A, instrumentFwd.CURRENCY_S, instrumentFwd.CURRENCY_A, instrumentFwd.TENOR_O, '6', '0.11', instrumentFwd.TENOR_P, '6.1', '0.11');
    dealModel.selectBuyerTrader(usersFwd.CLIENT_A.Client, usersFwd.TRADER_A);
    dealModel.selectSellerTrader(usersFwd.CLIENT_C.Client, usersFwd.TRADER_C);
    dealModel.selectBuyerBrokerName(usersFwd.DESK_F, usersFwd.BROKER_L);
    dealModel.selectSellerBrokerName(usersFwd.DESK_F, usersFwd.BROKER_M);
    dealModel.clickSubmitBtn();
    dealIDs.C24224 = e2e.getDealId();
    log.errorLog(`Test Case Number : C24224 and Deal ID : ${dealIDs.C24224}`);
    popUpNavModel.closePopUpMessage();
  });

  it('Log out test case IDs', () => {
    log.errorLog(`NDF Test Case 1   : C11921 and Deal ID         : ${dealIDs.C11921}`);
    log.errorLog(`NDF Test Case 2   : C11922 and Deal ID Leg 1   : ${dealIDs.C11922Leg1}`);
    log.errorLog(`NDF Test Case 2   : C11922 and Deal ID Leg 2   : ${dealIDs.C11922Leg2}`);
    log.errorLog(`NDF Test Case 3   : C11923 and Deal ID         : ${dealIDs.C11923}`);
    log.errorLog(`NDF Test Case 4   : C11924 and Deal ID         : ${dealIDs.C11924}`);
    log.errorLog(`NDF Test Case 5   : C11925 and Deal ID         : ${dealIDs.C11925}`);
    log.errorLog(`NDF Test Case 6   : C11928 and Deal ID         : ${dealIDs.C11928}`);
    log.errorLog(`NDF Test Case 7   : C11929 and Deal ID         : ${dealIDs.C11929}`);
    log.errorLog(`NDF Test Case 8   : C11932 and Deal ID Leg 1   : ${dealIDs.C11932Leg1}`);
    log.errorLog(`NDF Test Case 8   : C11932 and Deal ID Leg 2   : ${dealIDs.C11932Leg2}`);
    log.errorLog(`NDF Test Case 9   : C11933 and Deal ID         : ${dealIDs.C11933}`);
    log.errorLog(`NDF Test Case 10  : C11934 and Deal ID         : ${dealIDs.C11934}`);
    log.errorLog(`NDF Test Case 11  : C31633 and Deal ID         : ${dealIDs.C31633}`);
    log.errorLog(`NDF Test Case 12  : C19442 and Deal ID Leg 1   : ${dealIDs.C19442Leg1}`);
    log.errorLog(`NDF Test Case 12  : C19442 and Deal ID Leg 2   : ${dealIDs.C19442Leg2}`);
    log.errorLog(`SPT Test Case 1   : C24134 and Deal ID         : ${dealIDs.C24134}`);
    log.errorLog(`SPT Test Case 2   : C24136 and Deal ID         : ${dealIDs.C24136}`);
    log.errorLog(`FWD Test Case 1   : C24222 and Deal ID         : ${dealIDs.C24222}`);
    log.errorLog(`FWD Test Case 2   : C24223 and Deal ID         : ${dealIDs.C24223}`);
    log.errorLog(`FWD Test Case 3   : C24224 and Deal ID         : ${dealIDs.C24224}`);
  });
});
