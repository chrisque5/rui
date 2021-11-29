/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const FWDDealModel = require('../models/fwd/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const CurrencyModel = require('../models/fwd/CurrencyModel.js');
const AdminModel = require('../models/admin/AdminModel.js');
const moment = require('../../node_modules/moment/moment.js');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/UserDetails.js');
const LocalInstrument = require('../data/InstrumentDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const QaInstrument = require('../data/qa/InstrumentDetails.js');
const FwdLocalInstrument = require('../data/fwd/InstrumentDetails.js');
const DateModel = require('../models/DateModel.js');
const Constants = require('../data/Constants.js');
const StrategyModel = require('../models/fwd/StrategyModel.js');

let users = null;
let instrument = null;
let blotterUrlConst = null;
let adminUrlConst = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdInstrument = FwdLocalInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    adminUrlConst = Constants.ADMINURL;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdInstrument = FwdLocalInstrument;
    blotterUrlConst = Constants.BLOTTERURLQA;
    adminUrlConst = Constants.ADMINURLQA;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

const dealModel = new DealModel();
const fwdDealModel = new FWDDealModel();
const strategy = new StrategyModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const currency = new CurrencyModel();
const adminModel = new AdminModel();
const log = new Logs();
const date = new DateModel();
const settingsModel = new SettingsModel();
let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
});

function moveToNdf() {
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.equal(true);
}

function moveToFwd() {
  loginModel.selectFWD();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyFWDselected()).to.equal(true);
}

function validateDefaults(exDefaults, actDefaults) {
  for (let i = 0; i < exDefaults.length; i += 1) {
    log.log(`Verifying ${exDefaults[i]} is equal to ${actDefaults[i]}`);
    expect(exDefaults[i]).to.equal(actDefaults[i]);
  }
}

function validateCurrenciesNotEqual(ndfCurrencies, fwdCurrencies) {
  ndfCurrenciesSort = ndfCurrencies.sort();
  fwdCurrenciesSort = fwdCurrencies.sort();
  for (let i = 0; i < ndfCurrenciesSort.length; i += 1) {
    log.log(`Verifying ${ndfCurrenciesSort[i]} is not equal to ${fwdCurrenciesSort[i]}`);
    expect(ndfCurrenciesSort[i]).to.not.equal(fwdCurrenciesSort[i]);
  }
}

describe('Defaults: Verify currency pair, dealt currency and execution venue defaults across NDF and FWD', () => {
  it('C12051 Submit deals for NDF and FWD across different logins and verify defaults persist', () => {
    moveToNdf();

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    const ndfCurrencies = currency.getCurrencyListItems();

    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('XOFF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, instrument.CURRENCY_D, instrument.TENOR_F, '1.23', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    // Store values from ccy pair, dealt ccy and venue in local NDF broker 1 variables
    const ndfBroker1exDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];

    moveToFwd();

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    const fwdCurrencies = currency.getCurrencyListItems();
    validateCurrenciesNotEqual(ndfCurrencies, fwdCurrencies);

    strategy.clickRdoStrategyForward();
    dealModel.selectExecutionVenue('TPSD');
    fwdDealModel.placeForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_Q, instrument.TENOR_C, '1.3', '11', '1.45', '12');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    // Store values from ccy pair, dealt ccy and venue in local FWD broker 1 variables
    const fwdBroker1exDefaults = [dealModel.getMainCurrency().toString(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];
    // Switch to user 2 verify no values selected for ccy pair, dealt ccy and venue defaulted to TPSD
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    moveToNdf();

    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSD');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, instrument.CURRENCY_C, instrument.TENOR_F, '1.23', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    // Store values from ccy pair, dealt ccy and venue in local NDF broker 1 variables
    const ndfBroker2exDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];

    moveToFwd();

    strategy.clickRdoStrategyForward();
    dealModel.selectExecutionVenue('XOFF');

    fwdDealModel.placeForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_C, '1.2', '10', '1.25', '11');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    const fwdBroker2exDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];

    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    moveToFwd();

    const fwdBroker1actDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];
    validateDefaults(fwdBroker1exDefaults, fwdBroker1actDefaults);

    moveToNdf();

    const ndfBroker1actDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];
    validateDefaults(ndfBroker1exDefaults, ndfBroker1actDefaults);

    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    moveToFwd();
    const fwdBroker2actDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];
    validateDefaults(fwdBroker2exDefaults, fwdBroker2actDefaults);

    moveToNdf();

    const ndfBroker2actDefaults = [dealModel.getMainCurrency(), dealModel.getCurrency(), dealModel.getDealtCurrency(), dealModel.getExecutionVenue()];
    validateDefaults(ndfBroker2exDefaults, ndfBroker2actDefaults);
  }).timeout(180000);

  it('C12052 Verify execution venue defaults to XOFF for ON and TN in Forwards', () => {
    moveToFwd();
    strategy.clickRdoStrategyForward();
    dealModel.selectExecutionVenue('TPSD');
    expect(dealModel.getExecutionVenue()).to.equal('TPSD');

    dealModel.inputTerm(fwdInstrument.TENOR_S);
    expect(dealModel.getExecutionVenue()).to.equal('XOFF');

    dealModel.selectExecutionVenue('TPSD');
    expect(dealModel.getExecutionVenue()).to.equal('TPSD');

    dealModel.inputTerm(fwdInstrument.TENOR_T);
    expect(dealModel.getExecutionVenue()).to.equal('XOFF');

    dealModel.inputTerm(fwdInstrument.TENOR_C);
    expect(dealModel.getExecutionVenue()).to.equal('XOFF');
  }).timeout(180000);

  it('C28387 Login as belfasttpeur3 and verify default page dropdown options', () => {
    loginModel.changeUser(users.USER_C.UserName, users.USER_C.PassWord);
    log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
    settingsModel.clickBtnSettings();
    settingsModel.clickDisplayGeneralMenu();
    settingsModel.clickDdlDefaultPage();
    expect(settingsModel.verifyDefaultPageExists('NDF')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('FWD')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('SPT')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('Blotter')).to.equal(false);
    expect(settingsModel.verifyDefaultPageExists('Admin')).to.equal(false);
    settingsModel.clickBtnBack();
  }).timeout(60000);

  it('C28388 Login as belfasttsin4 and verify default page dropdown options', () => {
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
    if (loginModel.verifyBlotterselected(blotterUrlConst) === true) {
      popUpNavModel.closePopUpMessage();
    }
    settingsModel.clickBtnSettings();
    settingsModel.clickDisplayGeneralMenu();
    settingsModel.clickDdlDefaultPage();
    expect(settingsModel.verifyDefaultPageExists('NDF')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('FWD')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('SPT')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('Blotter')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('Admin')).to.equal(false);
    settingsModel.clickBtnBack();
  }).timeout(60000);

  it('C28389 Login as admin and verify default page dropdown options', () => {
    loginModel.changeUser(users.ADMIN_A.UserName, users.ADMIN_A.PassWord);
    log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
    if (loginModel.verifyBlotterselected(blotterUrlConst) === true) {
      popUpNavModel.closePopUpMessage();
    }
    settingsModel.clickBtnSettings();
    settingsModel.clickDisplayGeneralMenu();
    settingsModel.clickDdlDefaultPage();
    expect(settingsModel.verifyDefaultPageExists('NDF')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('FWD')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('SPT')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('Blotter')).to.equal(true);
    expect(settingsModel.verifyDefaultPageExists('Admin')).to.equal(true);
    settingsModel.clickBtnBack();
  }).timeout(60000);

  it('C28390 Set default landing page for belfasttpsin4 to NDF then reset', () => {
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    if (loginModel.verifyBlotterselected(blotterUrlConst) === true) {
      popUpNavModel.closePopUpMessage();
    }
    expect(settingsModel.selectAndVerifyDefaultEntryPage('NDF')).to.equal(true);
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    expect(loginModel.verifyNDFselected()).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('NDF')).to.equal(true);
    expect(settingsModel.selectAndVerifyDefaultEntryPage('Blotter')).to.equal(true);
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('Blotter')).to.equal(true);
  }).timeout(60000);

  it('C28391 Set default landing page for belfasttpsin4 to FWD then reset', () => {
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    if (loginModel.verifyBlotterselected(blotterUrlConst) === true) {
      popUpNavModel.closePopUpMessage();
    }
    expect(settingsModel.selectAndVerifyDefaultEntryPage('FWD')).to.equal(true);
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    expect(loginModel.verifyFWDselected()).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('FWD')).to.equal(true);
    expect(settingsModel.selectAndVerifyDefaultEntryPage('Blotter')).to.equal(true);
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('Blotter')).to.equal(true);
  }).timeout(60000);

  it('C28392 Set default landing page for belfasttpsin4 to SPT then reset', () => {
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    if (loginModel.verifyBlotterselected(blotterUrlConst) === true) {
      popUpNavModel.closePopUpMessage();
    }
    expect(settingsModel.selectAndVerifyDefaultEntryPage('SPT')).to.equal(true);
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('SPT')).to.equal(true);
    expect(settingsModel.selectAndVerifyDefaultEntryPage('Blotter')).to.equal(true);
    loginModel.changeUser(users.USER_H.UserName, users.USER_H.PassWord);
    expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('Blotter')).to.equal(true);
  }).timeout(60000);

  it('C28393 Set default landing page for admin user to Admin then reset', () => {
    loginModel.changeUser(users.ADMIN_A.UserName, users.ADMIN_A.PassWord);
    if (loginModel.verifyBlotterselected(blotterUrlConst) === true) {
      popUpNavModel.closePopUpMessage();
    }
    expect(settingsModel.selectAndVerifyDefaultEntryPage('Admin')).to.equal(true);
    loginModel.changeUser(users.ADMIN_A.UserName, users.ADMIN_A.PassWord);
    expect(loginModel.verifyAdminUrlselected(adminUrlConst)).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('Admin')).to.equal(true);
    expect(settingsModel.selectAndVerifyDefaultEntryPage('Blotter')).to.equal(true);
    loginModel.changeUser(users.ADMIN_A.UserName, users.ADMIN_A.PassWord);
    expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
    expect(settingsModel.verifyDefaultEntryPageVal('Blotter')).to.equal(true);
  }).timeout(60000);
});
