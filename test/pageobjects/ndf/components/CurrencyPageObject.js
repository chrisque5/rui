const CurrencyObjectProvider = require('../../../objectsProvider/ndf/components/CurrencyObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class CurrencyPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.currency = new CurrencyObjectProvider();
  }

  /** ********************** Currency1[Main Currency] *************************** */
  ddlCurrency1() { return this.elmtProc.getEl(this.currency.ddlCurrency1()); }

  lblCurrency1() { return this.elmtProc.getEl(this.currency.lblCurrency1()); }

  lblInnerCurrency1() { return this.elmtProc.getEl(this.currency.lblInnerCurrency1()); }

  // eslint-disable-next-line max-len
  liCurrency1(currency) { return this.elmtProc.getEl(this.currency.liCurrency1(currency)); }

  /** ********************** Currency2 *************************** */
  ddlCurrency2() { return this.elmtProc.getEl(this.currency.ddlCurrency2()); }

  txtInputCurrency2(currency) { return this.elmtProc.getEl(this.currency.txtInputCurrency2(currency)); }

  lblCurrency2() { return this.elmtProc.getEl(this.currency.lblCurrency2()); }

  lblOuterCurrency2() { return this.elmtProc.getEl(this.currency.lblOuterCurrency2()); }

  txtInputOuterCurrency2() { return this.elmtProc.getEl(this.currency.txtInputOuterCurrency2()); }

  liCurrency2() { return this.elmtProc.getElements(this.currency.liCurrency2()); }


  /** ********************** Currency3 *************************** */
  ddlCurrency3() { return this.elmtProc.getEl(this.currency.ddlCurrency3()); }

  lblOuterCurrency3() { return this.elmtProc.getEl(this.currency.lblOuterCurrency3()); }

  lblCurrency3() { return this.elmtProc.getEl(this.currency.lblCurrency3()); }

  txtInputCurrency3(currency) { return this.elmtProc.getEl(this.currency.txtInputCurrency2(currency)); }

  casCadCurrency() { return this.elmtProc.getEl(this.currency.casCadCurrency()); }

  lblDealtCcy() { return this.elmtProc.getEl(this.currency.lblDealtCcy()); }
}
module.exports = CurrencyPageObject;
