/* eslint-disable max-len */
/* eslint-disable no-undef */
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

  placeSptOrder(bassCurrency, currency, dealtCurrency, price, amount) {
    this.currency.selectBaseCurrency(bassCurrency);
    this.currency.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.currency.selectDealtCurrency(dealtCurrency);
    }
    this.price.inputPrice(price);
    this.amount.inputAmount(amount);
    this.log.log(`Outright order placed for currency ==> ${currency} , price ==> ${price} , amount ==> ${amount} .`);
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
