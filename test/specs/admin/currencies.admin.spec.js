/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const AdminModel = require('../../models/admin/AdminModel.js');
const CurrenciesAdminModel = require('../../models/admin/CurrenciesAdminModel.js');
const CurrencyModel = require('../../models/fwd/CurrencyModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const BlotterModel = require('../../models/blotter/BlotterModel');
const StrategyModel = require('../../models/fwd/StrategyModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const Cls = require('../../components/fwd/Cls.js');

const Localusers = require('../../data/UserDetails.js');
const LocalFwdInstrument = require('../../data/fwd/InstrumentDetails.js');
const LocalSptInstrument = require('../../data/spt/InstrumentDetails.js');
const Qausers = require('../../data/qa/UserDetails.js');
const QaFwdInstrument = require('../../data/qa/fwd/InstrumentDetails.js');
const QaSptInstrument = require('../../data/qa/spt/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');

let ndfUsers = null;
let fwdInstrument = null;
let sptInstrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    ndfUsers = Localusers;
    fwdInstrument = LocalFwdInstrument;
    sptInstrument = LocalSptInstrument;
    break;
  case 'QA':
    ndfUsers = Qausers;
    fwdInstrument = QaFwdInstrument;
    sptInstrument = QaSptInstrument;
    break;
  default:
    ndfUsers = Localusers;
    fwdInstrument = LocalFwdInstrument;
    sptInstrument = LocalSptInstrument;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const adminModel = new AdminModel();
const currenciesAdmin = new CurrenciesAdminModel();
const currency = new CurrencyModel();
const popUpNavModel = new PopUpNavigationModel();
const blotterModel = new BlotterModel();
const settings = new SettingsModel();
const strategy = new StrategyModel();
const cls = new Cls();

function moveToAdmin() {
  loginModel.selectAdmin();
  expect(adminModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToCurrenciesTab() {
  adminModel.selectCurrenciesTab();
  expect(adminModel.verifyCurrenciesTabActive()).to.be.equal(true);
}

function moveToFWD() {
  loginModel.selectFWD();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToSPT() {
  loginModel.selectSPT();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(ndfUsers.ADMIN_A.UserName, ndfUsers.ADMIN_A.PassWord);
  loginModel.openUrl('/DMSWeb/reactjs/');
  moveToAdmin();
  moveToCurrenciesTab();
  // set up steps
  currenciesAdmin.clickRdoDealTypeFwd();
  expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
  currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
  if (currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID) === true) {
    currenciesAdmin.unCheckCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
  }
  currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_A_T_ID);
  if (currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_A_T_ID) === true) {
    currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_A_T_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_A_T_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
  }
  currenciesAdmin.clickRdoDealTypeSpt();
  expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);
  currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
  if (currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID) === true) {
    currenciesAdmin.unCheckCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
  }
});

beforeEach(() => {
  loginModel.openUrl('DMSWeb/reactjs/#/admin');
  moveToCurrenciesTab();
});

describe('Currencies Admin: Tests for Currencies admin page', () => {
  it('C27009 Verify warning message when attempting to navigate away from FWD CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    currenciesAdmin.clickRdoDealTypeSpt();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    adminModel.selectBrokersTab();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    adminModel.moveToNdfNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    adminModel.moveToFwdNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    adminModel.moveToSptNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
  });

  it('C27010 Verify warning message when attempting to navigate away from SPT CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    currenciesAdmin.clickRdoDealTypeFwd();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    adminModel.selectBrokersTab();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    adminModel.moveToNdfNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    adminModel.moveToFwdNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    adminModel.moveToSptNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalNo();
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
  });

  it('C27011 Verify navigating to SPT clears FWD CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    currenciesAdmin.clickRdoDealTypeSpt();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
  });

  it('C27012 Verify navigating to Brokers Tab clears FWD CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);

    adminModel.selectBrokersTab();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(adminModel.verifyBrokersTabActive()).to.be.equal(true);

    moveToCurrenciesTab();
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
  });

  it('C27013 Verify navigating to FWD clears SPT CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    currenciesAdmin.clickRdoDealTypeFwd();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
  });

  it('C27014 Verify navigating to Brokers Tab clears SPT CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);

    adminModel.selectBrokersTab();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(adminModel.verifyBrokersTabActive()).to.be.equal(true);

    moveToCurrenciesTab();
    expect(adminModel.verifyCurrenciesTabActive()).to.be.equal(true);
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
  });

  it('C27015 Verify clicking Cancel clears FWD CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
    currenciesAdmin.btnCancelClick();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);

    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
  });

  it('C27016 Verify clicking Cancel clears SPT CCY selection', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
    currenciesAdmin.btnCancelClick();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
  });

  it('C31505 Verify clicking Cancel clears SPT CCY selection after successful selection', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.unCheckCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.btnCancelClick();
    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
    currenciesAdmin.unCheckCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
  });

  it('C31506 Verify clicking Cancel clears FWD CCY selection after successful selection', () => {
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    currenciesAdmin.unCheckCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
    currenciesAdmin.btnCancelClick();
    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
    currenciesAdmin.unCheckCurrencyPair(fwdInstrument.CURRENCY_P_A_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_P_A_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
  });

  it('C27017 Verify CLS box is checked in FWD when currency pair is checked in Currencies Admin', () => {
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_A_T_ID);
    if (currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_A_T_ID) !== true) {
      currenciesAdmin.checkCurrencyPair(fwdInstrument.CURRENCY_A_T_ID);
      expect(currenciesAdmin.verifyCurrencyPairSelected(fwdInstrument.CURRENCY_A_T_ID)).to.equal(true);
      currenciesAdmin.btnApplyClick();
      expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
    }

    moveToFWD();
    settings.toggleClsDefaultsOn();
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(fwdInstrument.CURRENCY_A);
    currency.selectCurrency(fwdInstrument.CURRENCY_T);

    expect(cls.isCls1Selected()).to.equal(true);

    moveToAdmin();
    moveToCurrenciesTab();
    currenciesAdmin.clickRdoDealTypeFwd();
    expect(currenciesAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(fwdInstrument.CURRENCY_A_T_ID);
    currenciesAdmin.unCheckCurrencyPair(fwdInstrument.CURRENCY_A_T_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(fwdInstrument.CURRENCY_A_T_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');

    moveToFWD();
    settings.toggleClsDefaultsOn();
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(fwdInstrument.CURRENCY_A);
    currency.selectCurrency(fwdInstrument.CURRENCY_T);

    expect(cls.isCls1Selected()).to.equal(false);
  });

  it('C27018 Verify CLS box is checked in SPT when currency pair is checked in Currencies Admin', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    if (currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID) !== true) {
      currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
      expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
      currenciesAdmin.btnApplyClick();
      expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
    }

    moveToSPT();
    settings.toggleClsDefaultsOn();
    currency.selectBaseCurrency(sptInstrument.CURRENCY_A);
    currency.selectCurrency(sptInstrument.CURRENCY_S);

    expect(cls.isCls1Selected()).to.equal(true);

    moveToAdmin();
    moveToCurrenciesTab();
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.unCheckCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairDeSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');

    moveToSPT();
    settings.toggleClsDefaultsOn();
    currency.selectBaseCurrency(sptInstrument.CURRENCY_A);
    currency.selectCurrency(sptInstrument.CURRENCY_S);

    expect(cls.isCls1Selected()).to.equal(false);
  });

  it('C27019 Verify active CLS currency persists across user logins', () => {
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    if (currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID) !== true) {
      currenciesAdmin.checkCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
      expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(true);
      currenciesAdmin.btnApplyClick();
      expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');
    }

    moveToSPT();
    settings.toggleClsDefaultsOn();
    currency.selectBaseCurrency(sptInstrument.CURRENCY_A);
    currency.selectCurrency(sptInstrument.CURRENCY_S);

    expect(cls.isCls1Selected()).to.equal(true);

    loginModel.changeUser(ndfUsers.USER_A.UserName, ndfUsers.USER_A.PassWord);

    moveToSPT();
    settings.toggleClsDefaultsOn();
    currency.selectBaseCurrency(sptInstrument.CURRENCY_A);
    currency.selectCurrency(sptInstrument.CURRENCY_S);

    expect(cls.isCls1Selected()).to.equal(true);

    loginModel.changeUser(ndfUsers.ADMIN_A.UserName, ndfUsers.ADMIN_A.PassWord);
    moveToAdmin();
    moveToCurrenciesTab();
    currenciesAdmin.clickRdoDealTypeSpt();
    expect(currenciesAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    currenciesAdmin.bringCurrencyRowIntoView(sptInstrument.CURRENCY_A_S_ID);
    currenciesAdmin.unCheckCurrencyPair(sptInstrument.CURRENCY_A_S_ID);
    expect(currenciesAdmin.verifyCurrencyPairSelected(sptInstrument.CURRENCY_A_S_ID)).to.equal(false);
    currenciesAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Currency Pairs successfully updated');

    loginModel.changeUser(ndfUsers.USER_A.UserName, ndfUsers.USER_A.PassWord);

    moveToSPT();
    settings.toggleClsDefaultsOn();
    currency.selectBaseCurrency(sptInstrument.CURRENCY_A);
    currency.selectCurrency(sptInstrument.CURRENCY_S);

    expect(cls.isCls1Selected()).to.equal(false);
    loginModel.changeUser(ndfUsers.ADMIN_A.UserName, ndfUsers.ADMIN_A.PassWord);
  });
});
