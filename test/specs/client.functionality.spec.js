/* eslint-disable no-eval */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const moment = require('../../node_modules/moment/moment.js');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/UserDetails.js');
const LocalInstrument = require('../data/InstrumentDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const QaInstrument = require('../data/qa/InstrumentDetails.js');
const DateModel = require('../models/DateModel.js');
const Constants = require('../data/Constants.js');

let users = null;
let instrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

let desk = '';
if (ENV === 'LOCAL') {
  desk = 'DESK_D';
} else {
  desk = 'DESK_A';
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const date = new DateModel();
const settingsModel = new SettingsModel();
let dateFormat = '';

function moveToNDF() {
  loginModel.openUrl(Constants.NDFURL);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_K.UserName, users.USER_K.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

afterEach(() => {
  if (loginModel.getDdlUserDropdownText() !== users.USER_K.FullName) {
    loginModel.changeUser(users.USER_K.UserName, users.USER_K.PassWord);
  }
});

describe('Client functionality: Cascader search by text using spaces', () => {
  it('C10661 Enter search terms in cascaders with words separated by spaces', () => {
    moveToNDF();
    dealModel.selectBuyerTraderBySearchLowerKeys(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTraderBySearchLowerKeys(users.CLIENT_B.Client, users.TRADER_B);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);

    dealModel.selectBuyerTraderBySearchUpperKeys(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTraderBySearchUpperKeys(users.CLIENT_D.Client, users.TRADER_D);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);

    dealModel.selectBuyerTraderBySearchLowerKeys(users.TRADER_A, users.CLIENT_A.Client);
    dealModel.selectSellerTraderBySearchLowerKeys(users.TRADER_B, users.CLIENT_B.Client);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);

    dealModel.selectBuyerTraderBySearchUpperKeys(users.TRADER_C, users.CLIENT_C.Client);
    dealModel.selectSellerTraderBySearchUpperKeys(users.TRADER_D, users.CLIENT_D.Client);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);

    dealModel.selectBuyerBrokerBySearchLowerKeys(eval(`users.${desk}`), users.BROKER_C.Name);
    dealModel.selectSellerBrokerBySearchLowerKeys(users.DESK_C, users.BROKER_D.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    dealModel.selectBuyerBrokerBySearchUpperKeys(users.DESK_C, users.BROKER_D.Name);
    dealModel.selectSellerBrokerBySearchUpperKeys(eval(`users.${desk}`), users.BROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);

    dealModel.selectBuyerBrokerBySearchLowerKeys(users.BROKER_C.Name, eval(`users.${desk}`));
    dealModel.selectSellerBrokerBySearchLowerKeys(users.BROKER_D.Name, users.DESK_C);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    dealModel.selectBuyerBrokerBySearchUpperKeys(users.BROKER_D.Name, users.DESK_C);
    dealModel.selectSellerBrokerBySearchUpperKeys(users.BROKER_C.Name, `${eval(`users.${desk}`)}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
  }).timeout(30000);
});

function validate3CPErrorOnBuyerClient() {
  dealModel.hoverBuyerClientTrader();
  expect(dealModel.getFieldValidationText('Choose 3 different Counterparties for 3 CPs')).to.equal('Choose 3 different Counterparties for 3 CPs');
}
describe('Client functionality: 3 CP button tests', () => {
  it('C10113 Validating 3 different Counter parties for 3 CPs by changing cp2 Buyer and Seller trader', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.clickThreeCpChk();

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);

    // trade economics must be entered first or validation error message is not as expected
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    popUpNavModel.closePopUpMessage();
    validate3CPErrorOnBuyerClient();

    dealModel.selectcp2BuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    dealModel.hoverBuyerClientTrader();
    expect(false).to.be.equal(dealModel.isAnyErrorOnBuyerTrader());

    dealModel.selectcp2SellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    // trade economics must be entered first or validation error message is not as expected
    dealModel.clickSubmitBtn();
    validate3CPErrorOnBuyerClient();
  });

  it('C10114 Validating 3 different Counter parties for 3 CPs by changing Buyer and Seller trader', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.clickThreeCpChk();

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    // trade economics must be entered first or validation error message is not as expected
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    popUpNavModel.closePopUpMessage();
    validate3CPErrorOnBuyerClient();

    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    dealModel.hoverBuyerClientTrader();
    expect(false).to.be.equal(dealModel.isAnyErrorOnBuyerTrader());

    dealModel.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    // trade economics must be entered first or validation error message is not as expected
    dealModel.clickSubmitBtn();
    validate3CPErrorOnBuyerClient();
  });

  it('C10112 Select Buyer/Seller side Client/Trader then verify they change independently', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.clickThreeCpChk();

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.selectcp2BuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectcp2SellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectcp2BuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectcp2SellerBrokerName(users.DESK_D, users.BROKER_C.Name);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_D} / ${users.BROKER_C.Name}`);

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_G);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_D} / ${users.BROKER_C.Name}`);

    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerBrokerName(users.DESK_D, users.BROKER_H);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_D} / ${users.BROKER_C.Name}`);

    dealModel.selectcp2BuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectcp2BuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_G}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_D} / ${users.BROKER_H}`);

    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2SellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_G}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_D} / ${users.BROKER_H}`);
  }).timeout(60000);
});

describe('Client functionality: Auto-tab to next field tests', () => {
  it('C10662 Auto-tab to next field when entering a trade for outright strategy', () => {
    moveToNDF();
    AutoTab = true;
    settingsModel.ratesFeedOff();
    dealModel.clickRdoStrategyOutright();

    dealModel.selectBaseCurrency(instrument.CURRENCY_O, true);
    expect(dealModel.isCurrency2Focused()).to.be.equal(true);
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_K);
    expect(true).to.be.equal(dealModel.verifyCurrencyCasCadClose(true));
    expect(dealModel.getCurrency()).to.be.equal(instrument.CURRENCY_K);
    expect(dealModel.isDealtCCYFocused()).to.be.equal(true);
    dealModel.selectDealtCurrency(instrument.CURRENCY_K);
    expect(dealModel.getDealtCurrency()).to.be.equal(instrument.CURRENCY_K);
    expect(dealModel.isTerm1Focused()).to.be.equal(true);
    dealModel.inputTerm(instrument.TENOR_A);
    expect(dealModel.isPrice1Focused()).to.be.equal(true);
    dealModel.inputPrice(1.2);
    // Below isAmount1Focused is not working, need to find some other solution.
    // expect(dealModel.isAmount1Focused()).to.be.equal(true);
    dealModel.inputAmountWithEnter(2.1);
    expect(dealModel.isBuyerClientTraderFocused()).to.be.equal(true);
    dealModel.selectBuyerTrader(users.CLIENT_B.Client, users.TRADER_B, AutoTab);
    expect(dealModel.isBuyerBrokerFocus()).to.be.equal(true);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A, AutoTab);
    // TPDMS-2183 Agent Drop down should not open.
    expect(false).to.equal(dealModel.isAgentCasCadOpen());
    expect(dealModel.isSellerClientTraderFocus()).to.be.equal(true);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.isSellerBrokerFocus()).to.be.equal(true);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L, AutoTab);
    expect(dealModel.isSellerAgentFocus()).to.be.equal(true);
  }).timeout(30000);

  it('C10663 Auto-tab to next field when entering a trade for spread strategy', () => {
    moveToNDF();
    AutoTab = true;
    settingsModel.ratesFeedOff();
    dealModel.clickRdoStrategySpread();

    dealModel.selectBaseCurrency(instrument.CURRENCY_O, true);
    expect(dealModel.isCurrency2Focused()).to.be.equal(true);
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_K);
    expect(dealModel.isDealtCCYFocused()).to.be.equal(true);
    expect(true).to.be.equal(dealModel.verifyCurrencyCasCadClose(true));
    dealModel.selectDealtCurrency(instrument.CURRENCY_K);
    expect(dealModel.isTerm1Focused()).to.be.equal(true);
    dealModel.inputTerm(instrument.TENOR_A);
    expect(dealModel.isPrice1Focused()).to.be.equal(true);
    dealModel.inputPrice(1.2);
    expect(dealModel.isPointsFocused()).to.be.equal(true);
    dealModel.inputPoints(0.4);
    // Below isAmount1Focused is not working, need to find some other solution.
    // expect(dealModel.isAmount1Focused()).to.be.equal(true);
    dealModel.inputAmountWithEnter(2.1);
    expect(dealModel.isTerm2Focused()).to.be.equal(true);
    dealModel.inputTerm2(instrument.TENOR_F);
    // dealModel.pressTab();
    expect(dealModel.isPrice2Focused()).to.be.equal(true);
    dealModel.inputPrice2(3.1);
    // Below isAmount2Focused is not working, need to find some other solution.
    // expect(dealModel.isAmount2Focused()).to.be.equal(true);
    dealModel.inputAmount2WithEnter(2.1);
    expect(dealModel.isBuyerClientTraderFocused()).to.be.equal(true);
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.isBuyerBrokerFocus()).to.be.equal(true);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A, AutoTab);
    expect(dealModel.isBuyerAgentFocus()).to.be.equal(true);
    dealModel.selectBuyerAgent(users.AGENT_A, AutoTab);
    expect(dealModel.isSellerClientTraderFocus()).to.be.equal(true);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.isSellerBrokerFocus()).to.be.equal(true);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L, AutoTab);
    expect(dealModel.isSellerAgentFocus()).to.be.equal(true);
  }).timeout(60000);

  it('C10664 Auto-tab to next field when entering a trade for spread strategy with 3CP', () => {
    moveToNDF();
    AutoTab = true;
    settingsModel.ratesFeedOff();
    dealModel.clickRdoStrategySpread();
    dealModel.clickThreeCpChk();

    dealModel.selectBaseCurrency(instrument.CURRENCY_O, true);
    expect(dealModel.isCurrency2Focused()).to.be.equal(true);
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_K);
    expect(dealModel.isDealtCCYFocused()).to.be.equal(true);
    expect(true).to.be.equal(dealModel.verifyCurrencyCasCadClose(true));
    dealModel.selectDealtCurrency(instrument.CURRENCY_K);
    expect(dealModel.isTerm1Focused()).to.be.equal(true);
    dealModel.inputTerm(instrument.TENOR_A);
    expect(dealModel.isPrice1Focused()).to.be.equal(true);
    dealModel.inputPrice(1.2);
    expect(dealModel.isPointsFocused()).to.be.equal(true);
    dealModel.inputPoints(0.4);
    // Below isAmount1Focused is not working, need to find some other solution.
    // expect(dealModel.isAmount1Focused()).to.be.equal(true);
    dealModel.inputAmountWithEnter(2.1);
    expect(dealModel.isTerm2Focused()).to.be.equal(true);
    dealModel.inputTerm2(instrument.TENOR_F);
    // dealModel.pressTab();
    expect(dealModel.isPrice2Focused()).to.be.equal(true);
    dealModel.inputPrice2(3.1);
    // Below isAmount2Focused is not working, need to find some other solution.
    // expect(dealModel.isAmount2Focused()).to.be.equal(true);
    dealModel.inputAmount2WithEnter(2.1);
    expect(dealModel.isBuyerClientTraderFocused()).to.be.equal(true);
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.isBuyerBrokerFocus()).to.be.equal(true);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A, AutoTab);
    expect(dealModel.isBuyerAgentFocus()).to.be.equal(true);
    dealModel.selectBuyerAgent(users.AGENT_A, AutoTab);
    expect(dealModel.isSellerClientTraderFocus()).to.be.equal(true);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.isSellerBrokerFocus()).to.be.equal(true);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L, AutoTab);
    expect(dealModel.isSellerAgentFocus()).to.be.equal(true);
    dealModel.selectBuyerAgent(users.AGENT_C, AutoTab);

    expect(dealModel.iscp2BuyerClientTraderFocus()).to.be.equal(true);
    dealModel.selectcp2BuyerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.iscp2BuyerBrokerFocus()).to.be.equal(true);
    dealModel.selectcp2BuyerBrokerName(users.DESK_F, users.BROKER_L, AutoTab);
    expect(dealModel.iscp2BuyerAgentFocus()).to.be.equal(true);
    dealModel.selectCP2BuyerAgent(users.AGENT_A, AutoTab);
    expect(dealModel.iscp2SellerClientTraderFocus()).to.be.equal(true);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name, AutoTab);
    expect(dealModel.iscp2SellerBrokerFocus()).to.be.equal(true);
    dealModel.selectcp2SellerBrokerName(users.DESK_A, users.BROKER_A, AutoTab);
    expect(dealModel.iscp2SellerAgentFocus()).to.be.equal(true);
    dealModel.selectCP2BuyerAgent(users.AGENT_C, AutoTab);
  }).timeout(30000);
});

describe('Client functionality: Settings Tests', () => {
  it('C10665 Open settings, toggle Rates feed and verify persistence across logins', () => {
    moveToNDF();
    settingsModel.ratesFeedOff();
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.inputTerm(instrument.TENOR_H);
    expect(dealModel.verifyPrice1Empty()).to.equal('');

    settingsModel.ratesFeedOn();
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.inputTerm(instrument.TENOR_K);
    dealModel.waitForPrice1(5000);
    expect(dealModel.getPrice()).to.not.equal('');
    log.log(`Auto Populated rate/price is : ${dealModel.getPrice()}`);

    loginModel.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_B.FullName);
    moveToNDF();

    loginModel.changeUser(users.USER_K.UserName, users.USER_K.PassWord);
    moveToNDF();
    settingsModel.clickBtnSettings();
    settingsModel.clickDisplayTailorMenu();
    expect(settingsModel.getRatesSwitchLabel()).to.be.equal('ON');
    settingsModel.clickChkRates();
    expect(settingsModel.getRatesSwitchLabel()).to.be.equal('OFF');
  }).timeout(120000);
});

describe('Client functionality: Validate behaviour of populated fields after switching between strategies', () => {
  it('C10795 Fill out form for outright and switch to spread, validate correct fields have been reset', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('XOFF');

    const todaysDate = dealModel.getfixingDate();

    dealModel.placeOutrightOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.inputBuyerAgentByKeys(users.AGENT_A);
    dealModel.inputSellerAgentByKeys(users.AGENT_C);

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();

    dealModel.clickRdoStrategySpread();

    expect(dealModel.isSpreadSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);
    expect(dealModel.getMainCurrency()).to.equal(currency1);
    expect(dealModel.getCurrency()).to.equal(currency2);
    expect(dealModel.getDealtCurrency()).to.equal(currency3);
    expect(dealModel.getTerm()).to.equal('');
    expect(dealModel.getPrice()).to.equal('');
    expect(dealModel.getAmount()).to.equal('');
    expect(dealModel.getPoints()).to.equal('');
    expect(dealModel.getTerm2()).to.equal('');
    expect(dealModel.getPrice2()).to.equal('');
    expect(dealModel.getAmount2()).to.equal('');
    expect(dealModel.getfixingDate()).to.equal(todaysDate);
    expect(dealModel.getfixingDate2()).to.equal(todaysDate);
    expect(dealModel.getValueDate()).to.equal(todaysDate);
    expect(dealModel.getValueDate2()).to.equal(todaysDate);
    expect(dealModel.getPublishDate()).to.equal(todaysDate);
    expect(dealModel.getPublishDate2()).to.equal(todaysDate);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
    expect(dealModel.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(dealModel.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(60000);

  it('C11872 Submit deal from outright and switch to spread, validate correct fields have been reset', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('XOFF');

    const todaysDate = dealModel.getfixingDate();

    dealModel.placeOutrightOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();

    // TPDMS-2181
    dealModel.clickResetBtn();
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);

    dealModel.placeOutrightOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    // TPDMS-2181
    dealModel.clickSubmitBtn();

    dealModel.clickRdoStrategySpread();

    expect(dealModel.isSpreadSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);
    expect(dealModel.getMainCurrency()).to.equal(currency1);
    expect(dealModel.getCurrency()).to.equal(currency2);
    expect(dealModel.getDealtCurrency()).to.equal(currency3);
    expect(dealModel.getTerm()).to.equal('');
    expect(dealModel.getPrice()).to.equal('');
    expect(dealModel.getAmount()).to.equal('');
    expect(dealModel.getPoints()).to.equal('');
    expect(dealModel.getTerm2()).to.equal('');
    expect(dealModel.getPrice2()).to.equal('');
    expect(dealModel.getAmount2()).to.equal('');
    expect(dealModel.getfixingDate()).to.equal(todaysDate);
    expect(dealModel.getfixingDate2()).to.equal(todaysDate);
    expect(dealModel.getValueDate()).to.equal(todaysDate);
    expect(dealModel.getValueDate2()).to.equal(todaysDate);
    expect(dealModel.getPublishDate()).to.equal(todaysDate);
    expect(dealModel.getPublishDate2()).to.equal(todaysDate);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
    expect(dealModel.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(dealModel.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(60000);

  it('C11873 Date Calc and Tailor Call being made after reset and re enter the trade economics.', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('XOFF');

    const todaysDate = dealModel.getfixingDate();

    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();
    const valueDate1 = dealModel.getValueDate();
    const valueDate2 = dealModel.getValueDate2();

    dealModel.clickResetBtn();

    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');

    expect(dealModel.isSpreadSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);
    expect(dealModel.getMainCurrency()).to.equal(currency1);
    expect(dealModel.getCurrency()).to.equal(currency2);
    expect(dealModel.getDealtCurrency()).to.equal(currency3);
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_C);
    expect(dealModel.getTerm2()).to.equal(instrument.TENOR_D);
    expect(dealModel.getValueDate()).to.equal(valueDate1);
    expect(dealModel.getValueDate2()).to.equal(valueDate2);
  }).timeout(60000);

  it('C10796 Fill out form for spread and switch to outright, validate correct fields have been reset', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('XOFF');

    const todaysDate = dealModel.getfixingDate();

    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.inputBuyerAgentByKeys(users.AGENT_A);
    dealModel.inputSellerAgentByKeys(users.AGENT_C);

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();

    dealModel.clickRdoStrategyOutright();

    expect(dealModel.isOutRightSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);
    expect(dealModel.getMainCurrency()).to.equal(currency1);
    expect(dealModel.getCurrency()).to.equal(currency2);
    expect(dealModel.getDealtCurrency()).to.equal(currency3);
    expect(dealModel.getTerm()).to.equal('');
    expect(dealModel.getPrice()).to.equal('');
    expect(dealModel.getAmount()).to.equal('');
    expect(dealModel.getfixingDate()).to.equal(todaysDate);
    expect(dealModel.getValueDate()).to.equal(todaysDate);
    expect(dealModel.getPublishDate()).to.equal(todaysDate);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
    expect(dealModel.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(dealModel.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(60000);

  it('C10797 Fill out form for 3CP spread and switch to outright, validate correct fields have been reset', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('XOFF');

    const todaysDate = dealModel.getfixingDate();

    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.inputBuyerAgentByKeys(users.AGENT_A);
    dealModel.inputSellerAgentByKeys(users.AGENT_C);

    dealModel.clickThreeCpChk();

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();

    dealModel.clickRdoStrategyOutright();

    expect(dealModel.isOutRightSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);
    expect(dealModel.getMainCurrency()).to.equal(currency1);
    expect(dealModel.getCurrency()).to.equal(currency2);
    expect(dealModel.getDealtCurrency()).to.equal(currency3);
    expect(dealModel.getTerm()).to.equal('');
    expect(dealModel.getPrice()).to.equal('');
    expect(dealModel.getAmount()).to.equal('');
    expect(dealModel.getfixingDate()).to.equal(todaysDate);
    expect(dealModel.getValueDate()).to.equal(todaysDate);
    expect(dealModel.getPublishDate()).to.equal(todaysDate);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
    expect(dealModel.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(dealModel.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(60000);
});

describe('Client functionality: Client/Trader, Desk/Broker, Agent cascader tests.', () => {
  it('C24183 Verify Buyer side agent field is reset on trader select', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectBuyerAgent(users.AGENT_A);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getBuyerAgentLbl()).to.be.equal(users.AGENT_A);

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.isBuyerAgentEnabled()).to.be.equal(false);
  });

  it('C24184 Verify Seller side agent field is reset on trader select', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();

    dealModel.selectBuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerAgent(users.AGENT_A);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getSellerAgentLbl()).to.be.equal(users.AGENT_A);

    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.isBuyerAgentEnabled()).to.be.equal(false);
  });
});
