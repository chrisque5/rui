/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const Logs = require('../../core/utility/Logs');
const { WindowActions, KeyboardActions } = require('../../core/actions/ActionsIndex.js');

// Models
const CurrencyModel = require('./CurrencyModel.js');
const PriceModel = require('./PriceModel.js');
const PointModel = require('./PointModel.js');
const TermModel = require('./TermModel.js');
const AmountModel = require('./AmountModel.js');
const NdfDealModel = require('../DealModel.js');

let dateFormat = '';

class DealModel {
  constructor() {
    this.log = new Logs();
    this.windowActions = new WindowActions();
    this.keyboardActions = new KeyboardActions();

    this.currency = new CurrencyModel();
    this.price = new PriceModel();
    this.point = new PointModel();
    this.term = new TermModel();
    this.amount = new AmountModel();
    this.dealModel = new NdfDealModel();
  }

  // Selecting and entering the details

  getDateFormat() {
    const lang = this.windowActions.browserLanguage();
    this.log.log(`Browser Language is set to : ${lang}`);
    dateFormat = lang === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
    return dateFormat;
  }

  refreshPage() {
    this.windowActions.refreshPage();
  }

  placeOutrightOrder(baseCurrency, currency, dealtCurrency, term, price, amount) {
    this.currency.selectBaseCurrency(baseCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.term.inputTerm(term);
    this.price.inputPrice(price);
    this.amount.inputAmount(amount);
    this.log.log(`Outright order placed for currency ==> ${currency} , term ==> ${term} , price ==> ${price} , amount ==> ${amount} .`);
  }

  placeOutrightOrderWithRates(baseCurrency, currency, dealtCurrency, term, amount) {
    this.currency.selectBaseCurrency(baseCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.term.inputTerm(term);
    this.log.log(`Auto Populated rate/price is : ${this.price.getPrice()}`);
    this.amount.inputAmount(amount);
    this.log.log(`Outright order placed for currency ==> ${currency} , term ==> ${term} , price ==> ${this.price.getPrice()} , amount ==> ${amount} .`);
  }

  placeFwdForwardOrder(baseCurrency, currency, dealtCurrency, term1, price1, amount1, term2, price2, amount2) {
    this.currency.selectBaseCurrency(baseCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.term.inputTerm(term1);
    this.term.inputTerm2(term2);
    this.price.inputPrice(price1);
    this.amount.inputAmount(amount1);
    this.price.inputPrice2(price2);
    this.amount.inputAmount2(amount2);
  }

  placeFwdForwardOrderDetails(baseCurrency, currency, dealtCurrency, term1, price1, points, amount1, term2, price2, amount2) {
    if (baseCurrency !== '') {
      this.currency.selectBaseCurrency(baseCurrency);
    }

    if (currency !== '') {
      this.currency.selectCurrency(currency);
    }

    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }

    if (term1 !== '') {
      this.term.inputTerm(term1);
    }

    if (term2 !== '') {
      this.term.inputTerm2(term2);
    }

    if (price1 !== '') {
      this.price.inputPrice(price1);
    }

    if (points !== '') {
      this.point.inputPoints(points);
    }

    if (amount1 !== '') {
      this.amount.inputAmount(amount1);
    }

    if (price2 !== '') {
      this.price.inputPrice2(price2);
    }

    if (amount2 !== '') {
      this.amount.inputAmount2(amount2);
    }
  }

  placeFwdForwardOrderWithRates(baseCurrency, currency, dealtCurrency, term1, amount1, term2, amount2) {
    this.currency.selectBaseCurrency(baseCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.term.inputTermWithTab(term1);
    this.amount.inputAmount(amount1);
    this.term.inputTerm2WithTab(term2);
    this.log.log(`Auto Populated rate1/price1 is : ${this.price.getPrice()}`);
    this.log.log(`Auto Populated rate2/price2 is : ${this.price.getPrice2()}`);
    this.amount.inputAmount2(amount2);
  }

  placeForwardOrder(baseCurrency, currency, dealtCurrency, term1, price1, amount1, price2, amount2) {
    this.currency.selectBaseCurrency(baseCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.term.inputTerm(term1);
    this.price.inputPrice(price1);
    this.amount.inputAmount(amount1);
    this.price.inputPrice2(price2);
    this.amount.inputAmount2(amount2);
  }

  placeForwardOrderDetails(baseCurrency, currency, dealtCurrency, term1, price1, points, amount1, price2, amount2) {
    if (baseCurrency !== '') {
      this.currency.selectBaseCurrency(baseCurrency);
    }

    if (currency !== '') {
      this.currency.selectCurrency(currency);
    }

    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }

    if (term1 !== '') {
      this.term.inputTerm(term1);
    }

    if (price1 !== '') {
      this.price.inputPrice(price1);
    }

    if (points !== '') {
      this.point.inputPoints(points);
    }

    if (amount1 !== '') {
      this.amount.inputAmount(amount1);
    }

    if (price2 !== '') {
      this.price.inputPrice2(price2);
    }

    if (amount2 !== '') {
      this.amount.inputAmount2(amount2);
    }
  }

  placeForwardOrderWithRates(baseCurrency, currency, dealtCurrency, term1, amount1, amount2) {
    this.currency.selectBaseCurrency(baseCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.term.inputTerm(term1);
    this.amount.inputAmount(amount1);
    this.log.log(`Auto Populated rate1/price1 is : ${this.price.getPrice()}`);
    this.log.log(`Auto Populated rate2/price2 is : ${this.price.getPrice2()}`);
    this.amount.inputAmount2(amount2);
  }

  changeValue(fieldName, value1, value2) {
    switch (fieldName) {
      case 'currency':
        this.selectCurrency(value1);
        this.selectDealtCurrency(value1);
        if (this.getTerm() !== '') {
          expect(this.getPrice()).to.not.equal('');
        }
        break;
      case 'term':
        this.inputTerm(value1);
        expect(this.getPrice()).to.not.equal('');
        this.log.log(`Price 1 value equals ${this.getPrice()}`);
        break;
      case 'price':
        this.inputPrice(value1);
        break;
      case 'amount':
        this.inputAmount(value1);
        break;
      case 'term2':
        this.inputTerm2(value1);
        expect(this.getPrice()).to.not.equal('');
        this.log.log(`Price 1 value equals ${this.getPrice()}`);
        break;
      case 'price2':
        this.inputPrice2(value1);
        break;
      case 'amount2':
        this.inputAmount2(value1);
        break;
      case 'spotdate':
        this.inputSpotDate(value1.format(dateFormat));
        break;
      case 'valuedate':
        this.inputValueDate(value1.format(dateFormat));
        break;
      case 'buyerclient':
        this.selectBuyerTrader(value1, value2);
        break;
      case 'sellerclient':
        this.selectSellerTrader(value1, value2);
        break;
      case 'buybroker':
        this.selectBuyerBrokerName(value1, value2);
        break;
      case 'sellbroker':
        this.selectSellerBrokerName(value1, value2);
        break;
      case 'dealtCurrency':
        this.selectDealtCurrency(value1);
        break;
      case 'executionVenue':
        this.selectExecutionVenue(value1);
        break;
      default:
        log.log(`Please Check your operation, not found the matching one : ${fieldName}`);
    }
  }

  // Buttons and checkbox
  isVolMatchSelected() {
    return this.dealModel.isVolMatchSelected();
  }

  selectVolMatch() {
    this.dealModel.selectVolMatch();
  }

  isTurnTradeSelected() {
    return this.dealModel.isTurnTradeSelected();
  }

  selectTurnTrade() {
    this.dealModel.selectTurnTrade();
  }

  clickSwapBtn() {
    this.dealModel.clickSwapBtn();
  }

  clickSwapBtn2() {
    this.dealModel.clickSwapBtn2();
  }

  clickThreeCpChk() {
    this.dealModel.clickThreeCpChk();
  }

  clickSubmitBtn() {
    this.dealModel.clickSubmitBtn();
  }

  verifySubmitBtnState(text, colour) {
    return this.dealModel.verifySubmitBtnState(text, colour);
  }

  clickResetBtn() {
    this.dealModel.clickResetBtn();
  }

  selectBuyerSide() {
    this.dealModel.selectBuyerSide();
  }

  selectSellerSide() {
    this.dealModel.selectSellerSide();
  }

  selectcp2BuyerSide() {
    this.dealModel.selectcp2BuyerSide();
  }

  selectcp2SellerSide() {
    this.dealModel.selectcp2SellerSide();
  }

  // End Hot list Functionality

  moveByTab(times) {
    for (let index = 0; index < times; index += 1) {
      this.pressTab();
    }
  }

  pressKey(times, key) {
    for (let index = 0; index < times; index += 1) {
      this.keyboardActions.enterKeys(key);
    }
  }

  pressEnter() {
    this.keyboardActions.enterKeys('Enter');
  }

  pressTab() {
    this.keyboardActions.enterKeys('Tab');
  }

  moveToPreviousField() {
    this.keyboardActions.enterKeys(['Shift', 'Tab']);
  }
}
module.exports = DealModel;
