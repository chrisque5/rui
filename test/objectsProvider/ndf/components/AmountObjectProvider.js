/* eslint-disable class-methods-use-this */
class AmountObjectProvider {
  /** ******************** Amount1 ************************** */

  txtAmount1() { return '[data-testid="txtAmount1"]@@Enabled_And_Visible||10'; }

  lblAmount1() { return '//input[@data-testid="txtAmount1"]//ancestor::div[contains(@class,"ant-input-number")]@@Enabled_And_Visible||10'; }

  /** ******************** Amount2 ************************** */

  txtAmount2() { return '[data-testid="txtAmount2"]@@Enabled_And_Visible||10'; }

  lblAmount2() { return '//input[@data-testid="txtAmount2"]//ancestor::div[contains(@class,"ant-input-number")]@@Enabled_And_Visible||10'; }
}
module.exports = AmountObjectProvider;
