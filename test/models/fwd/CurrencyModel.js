const Currency = require('../../components/ndf/Currency.js');

class CurrencyModel {
  constructor() {
    this.currency = new Currency();
  }

  /** ********************************* Currency ***************************** */

  selectBaseCurrency(baseCurrency) { this.currency.selectBaseCurrency(baseCurrency); }

  getMainCurrency() { return this.currency.getMainCurrency(); }

  isPageReset() { return this.currency.isPageReset(); }

  selectCurrency(currency) { this.currency.selectCurrency(currency); }

  getCurrency() { return this.currency.getCurrency(); }

  isCurrency2Focused() { return this.currency.isCurrency2Focused(); }

  selectCurrencyWithoutVerification(currencyName) { this.currency.selectCurrencyWithoutVerification(currencyName); }

  selectCurrencyByKeys(currencyName) { this.currency.selectCurrencyByKeys(currencyName); }

  selectDealtCurrency(currencyName) { this.currency.selectDealtCurrency(currencyName); }

  getDealtCurrency() { return this.currency.getDealtCurrency(); }

  isDealtCCYFocused() { return this.currency.isDealtCCYFocused(); }

  selectDealtCurrencyByKeys(currencyName) { this.currency.selectDealtCurrencyByKeys(currencyName); }

  verifyCurrencyCasCadClose(notClick) { return this.currency.verifyCurrencyCasCadClose(notClick); }

  getCurrencyListItems() { return this.currency.getCurrencyListItems(); }

  verifyCurrencyListOrder(currencyList) { return this.currency.verifyCurrencyListOrder(currencyList); }

  clickLblDealtCcy() { return this.currency.clickLblDealtCcy(); }

  /** ***************************** Currency End ************************** */
}
module.exports = CurrencyModel;
