/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel');
const LoginModel = require('../models/LoginModel');
const SettingsModel = require('../models/SettingsModel');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const moment = require('../../node_modules/moment/moment');
const Logs = require('../core/utility/Logs');
const LocalUsers = require('../data/UserDetails');
const LocalInstrument = require('../data/InstrumentDetails');
const QaUsers = require('../data/qa/UserDetails');
const QaInstrument = require('../data/qa/InstrumentDetails');
const DateModel = require('../models/DateModel');
const Constants = require('../data/Constants');

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
  dealModel.selectBaseCurrency('USD');
  dealModel.selectDealtCurrency('USD');
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_L.UserName, users.USER_L.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

// *******************************************Spread********************************************* //
describe('NDF Spread tests', () => {
  it('C5789 Enter values for trade and submit', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.selectExecutionVenue('TPSD');
    expect(dealModel.getExecutionVenue()).to.equal('TPSD');

    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Fix');

    const fixingDate1 = dealModel.getfixingDate(); // store before changing term
    const valueDate1 = dealModel.getValueDate();
    const publishDate1 = dealModel.getPublishDate();
    const fixingDate2 = dealModel.getfixingDate2();
    const valueDate2 = dealModel.getValueDate2();
    const publishDate2 = dealModel.getPublishDate2();
    const dayCount1 = dealModel.getDayCount(); // store day count value to compare against
    const dayCount2 = dealModel.getDayCount2();

    expect(dealModel.getBrokerageStrategy()).to.equal('Fix');
    expect(dealModel.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    expect(dealModel.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');
    expect(dealModel.getDealtCurrency()).to.equal(instrument.CURRENCY_B);
    dealModel.selectVolMatch();
    expect(true).to.equal(dealModel.isVolMatchSelected());

    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    // adding steps to check lower case term multiplier with tab key press
    dealModel.inputTermWithTab(instrument.TENOR_F.toLowerCase());
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_F);
    expect(dealModel.isSpreadSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal('TPSD');
    dealModel.inputTerm2WithTab(instrument.TENOR_H.toLowerCase());

    expect(dealModel.getCurrency()).to.equal(instrument.CURRENCY_B);
    dealModel.waitForPrice1(5000);
    expect(dealModel.getPrice()).to.not.equal('');
    expect(dealModel.getAmount()).to.equal('100,000');
    expect(dealModel.getTerm2()).to.equal(instrument.TENOR_H);
    expect(dealModel.getPrice2()).to.not.equal('');
    expect(dealModel.getAmount2()).to.equal('150,000');
    expect(dealModel.getPoints()).to.not.equal('');
    if (dealModel.getPrice() === dealModel.getPrice2()) {
      expect(dealModel.getPoints()).to.equal('0');
    } else {
      expect(dealModel.getPoints()).to.not.equal('0');
    }
    expect(dealModel.getfixingDate()).to.not.equal(fixingDate1);
    expect(dealModel.getfixingDate2()).to.not.equal(fixingDate2);
    expect(dealModel.getValueDate()).to.not.equal(valueDate1);
    expect(dealModel.getValueDate2()).to.not.equal(valueDate2);
    expect(dealModel.getPublishDate()).to.not.equal(publishDate1);
    expect(dealModel.getPublishDate2()).to.not.equal(publishDate2);
    expect(dealModel.getDayCount()).to.not.equal(dayCount1);
    expect(dealModel.getDayCount2()).to.not.equal(dayCount2);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();

    dealModel.clickResetBtn();

    expect(dealModel.isSpreadSelected()).to.equal('true');
    expect(dealModel.getBrokerageStrategy()).to.equal('Gap Spread');
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
    expect(dealModel.getfixingDate()).to.equal(fixingDate1);
    expect(dealModel.getfixingDate2()).to.equal(fixingDate2);
    expect(dealModel.getValueDate()).to.equal(valueDate1);
    expect(dealModel.getValueDate2()).to.equal(valueDate2);
    expect(dealModel.getPublishDate()).to.equal(publishDate1);
    expect(dealModel.getPublishDate2()).to.equal(publishDate2);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
    expect(dealModel.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(dealModel.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(300000); // timeout extended for spread deal

  it.skip('C5790 validate Tom Trade dates.', () => {
    // This test is skipped as it is now covered under the ndf.dates.spec.js  spec file
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Liquidity Swap');
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '1.5', instrument.TENOR_F, '1.255');
    dealModel.inputPrice('');
    dealModel.inputTerm(instrument.TENOR_A);
    expect(dealModel.getBrokerageStrategy()).to.equal('Liquidity Swap');
    expect(dealModel.getPrice()).to.not.equal('');
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_A);

    const exTradeDate1 = date.getTomTradeDate(instrument.CURRENCY_A, instrument.CURRENCY_B);
    const exValueDate1 = date.getValueDate(exTradeDate1.clone(), '0d', instrument.CURRENCY_B);
    const exFixingDate1 = date.getFixingDate(exValueDate1.clone(), instrument.CURRENCY_B);
    const exValueDate2 = date.getValueDate(exTradeDate1.clone(), instrument.TENOR_F, instrument.CURRENCY_B);
    const exFixingDate2 = date.getFixingDate(exValueDate2.clone(), instrument.CURRENCY_B);

    const fixingDate1 = dealModel.getfixingDate();
    const valueDate1 = dealModel.getValueDate();
    const publishDate1 = dealModel.getPublishDate();
    const fixingDate2 = dealModel.getfixingDate2();
    const valueDate2 = dealModel.getValueDate2();
    const publishDate2 = dealModel.getPublishDate2();

    expect(exFixingDate1.format(dateFormat)).equal(fixingDate1);
    expect(exFixingDate2.format(dateFormat)).equal(fixingDate2);
    expect(exFixingDate1.format(dateFormat)).equal(publishDate1);
    expect(exFixingDate2.format(dateFormat)).equal(publishDate2);
    expect(exValueDate1.format(dateFormat)).equal(valueDate1);
    expect(exValueDate2.format(dateFormat)).equal(valueDate2);
  });

  it('C5791 User can submit another spread after changing a field', function spreadChangeFieldSubmit() {
    this.retries(3);
    moveToNDF();
    settingsModel.ratesFeedOff();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Fix');
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, instrument.CURRENCY_A, instrument.TENOR_K, '1.5', '0.1', instrument.TENOR_M, '1.255', '0.15');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    [
      ['currency', instrument.CURRENCY_B],
      ['term', instrument.TENOR_K1],
      ['term2', instrument.TENOR_N],
      ['price', '1.25'],
      ['price2', '1.45'],
      ['points', '0.123'],
      ['amount', '1.35'],
      ['amount2', '2.35'],
      ['fixingdate', (moment().add(14, 'd'))],
      ['valuedate', (date.addBusinessDays(moment(), 21))],
      ['buyerclient', users.CLIENT_C.Client, users.TRADER_C],
      ['sellerclient', users.CLIENT_D.Client, users.TRADER_D],
      ['buybroker', users.DESK_D, users.BROKER_C.Name],
      ['sellbroker', users.DESK_C, users.BROKER_E],
      ['dealtCurrency', instrument.CURRENCY_B],
      ['executionVenue', 'XOFF'],
    ].forEach(([fieldToChange, newValueOne, newValueTwo]) => {
      dealModel.changeValue(fieldToChange, newValueOne, newValueTwo);
      dealModel.clickSubmitBtn();

      expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
      popUpNavModel.closePopUpMessage();
    });
  }).timeout(400000);

  it('C5792 Enter values for trade with 3 CP selected and submit', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue('XOFF');
    dealModel.clickThreeCpChk();
    const fixingDate = dealModel.getfixingDate(); // get date before changing term

    expect(dealModel.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    expect(dealModel.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.selectBaseCurrency(instrument.CURRENCY_O, true);
    expect(true).to.equal(dealModel.isCurrency2Focused());
    expect(dealModel.getCurrency()).to.equal('');
    expect(dealModel.getfixingDate()).to.equal(fixingDate);

    // resetting currency to USD due to error on submit
    popUpNavModel.closePopUpMessage();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);

    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_A, instrument.TENOR_F, '1.5', instrument.TENOR_K, '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.selectcp2BuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2BuyerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectcp2SellerBrokerName(users.DESK_D, users.BROKER_C.Name);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_D} / ${users.BROKER_C.Name}`);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(80000);

  it('C8593 Spread Deal error on trader selection with Agent Field', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    // dealModel.inputBuyerAgentByKeys(users.AGENT_A);
    expect(false).to.be.equal(dealModel.isBuyerAgentEnabled());

    dealModel.clickSubmitBtn();
    expect('Deal created').to.be.equal(popUpNavModel.getPopUpMessage());
  }).timeout(120000);

  it('C8588 Submit Spread and 3cp Deal With Buyer Agent Fields and verify the Submit btn color', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    settingsModel.toggleExecutionVenueColourOn();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue('TPSEF');

    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.inputBuyerAgentByKeys(users.AGENT_A);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getBuyerAgentLbl());
    expect(dealModel.verifySubmitBtnState(`SUBMIT ${eval('instrument.VENUE_A')}`, `${eval(`Constants.${instrument.VENUE_A}.Colour`)}`)).to.equal(true);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    dealModel.clickThreeCpChk();

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getcp2SellerAgentLbl());

    dealModel.selectcp2BuyerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    dealModel.inputCP2BuyerAgentByKeys(users.AGENT_C);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(users.AGENT_C).to.be.equal(dealModel.getcp2BuyerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');
    popUpNavModel.closePopUpMessage();

    dealModel.selectcp2BuyerTrader(users.CLIENT_E.Client, users.TRADER_NULL.Name);
    dealModel.inputCP2BuyerAgentByKeys(users.AGENT_C);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(80000);

  it('C8589 Submit Spread and 3cp Deal With Seller Agent Fields', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    settingsModel.toggleExecutionVenueColourOff();
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectSellerAgent(users.AGENT_A);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getSellerAgentLbl());
    expect(dealModel.verifySubmitBtnState('SUBMIT', Constants.DEFAULT.Colour)).to.equal(true);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    dealModel.clickThreeCpChk();

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getcp2BuyerAgentLbl());

    // currently failing due to validation logic on UI
    dealModel.selectcp2SellerTrader(users.CLIENT_I.Client, users.TRADER_NULL.Name);
    dealModel.selectCP2SellerAgent(users.AGENT_C);
    dealModel.verifyCasCadClose();
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(users.AGENT_C).to.be.equal(dealModel.getcp2SellerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(60000);

  it('C12998 Submit Spread Deal With Buyer and Seller Agent Fields.', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickLblDealtCcy();

    dealModel.clickSubmitBtn();
    expect('Validation Error').to.be.equal(popUpNavModel.getPopUpMessage());
    popUpNavModel.closePopUpMessage();

    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.inputSellerAgentByKeys(users.AGENT_C);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getBuyerAgentLbl());
    expect(users.AGENT_C).to.be.equal(dealModel.getSellerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
  });

  it('C8590 Submit Spread and 3cp Deal With Buyer and Seller Agent Fields', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '0.1', instrument.TENOR_H, '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.inputBuyerAgentByKeys(users.AGENT_A);
    dealModel.selectSellerAgent(users.AGENT_C);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getBuyerAgentLbl());
    expect(users.AGENT_C).to.be.equal(dealModel.getSellerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
    dealModel.clickThreeCpChk();

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(users.AGENT_C).to.be.equal(dealModel.getcp2BuyerAgentLbl());
    expect(users.AGENT_A).to.be.equal(dealModel.getcp2SellerAgentLbl());

    // currently failing due to validation logic on UI
    dealModel.selectcp2SellerTrader(users.CLIENT_I.Client, users.TRADER_NULL.Name);

    dealModel.inputCP2BuyerAgentByKeys(users.AGENT_C);
    dealModel.selectCP2SellerAgent(users.AGENT_D);

    expect(users.AGENT_C).to.be.equal(dealModel.getcp2BuyerAgentLbl());
    expect(users.AGENT_D).to.be.equal(dealModel.getcp2SellerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');

    // TPDMS-2117
    dealModel.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    dealModel.clearBuyerAgent();
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(120000);

  it('C13295 User can submit a spread using a date in the past', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBrokerageStrategy('Gap Spread');
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();

    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);

    dealModel.selectBackDate();

    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);

    const backDateDay = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    expect(dealModel.getBackDateValue()).to.equal(date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat));

    const backDateTime = '10:36:01';
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_A, instrument.TENOR_K, '1.5', '0.1', instrument.TENOR_M, '1.255', '0.15');

    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateCancel();
    expect(dealModel.isModalBackDateClose()).to.equal(true);

    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    backDateFormatted = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format('Do MMMM YYYY');
    expect(dealModel.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    dealModel.backDateAccept();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
  });
});
