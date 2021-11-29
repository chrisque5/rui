/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class CurrencyObjectProvider {

  /** ********************** Currency1[Main Currency] *************************** */
  ddlCurrency1() { return '//div[@data-testid="ddlCurrency1"]//span[@class="ant-select-arrow"]@@Enabled_And_Visible||10'; }

  lblCurrency1() { return '[id="currency1"]@@Enabled_And_Visible||10'; }

  lblInnerCurrency1() { return '[data-testid="ddlCurrency1"]@@Enabled_And_Visible||10'; }

  liCurrency1(currency) { return `${'//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[contains(@class,"ant-select-item-option-content") and text()="TEMP"]'.replace('TEMP', currency)}@@Enabled_And_Visible||10`; }

  /** ********************** Currency2 *************************** */
  ddlCurrency2() { return '//div[@data-testid="ddlCurrency2"]//span[@class="ant-select-arrow"]@@Enabled_And_Visible||10'; }

  txtInputCurrency2(currency) { return `${'//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[contains(@class,"ant-select-item-option-content") and text()="TEMP"]'.replace('TEMP', currency)}@@Enabled_And_Visible||10`; }

  lblOuterCurrency2() { return '//div[@data-testid="ddlCurrency2"]@@Enabled_And_Visible||10'; }

  lblCurrency2() { return '[data-testid="ddlCurrency2"]@@Enabled_And_Visible||10'; }

  txtInputOuterCurrency2() { return '//input[@id="currency2"]@@Enabled_And_Visible||10'; }

  /** ********************** Currency3 *************************** */
  ddlCurrency3() { return '//div[@data-testid="ddlCurrency3"]//span[@class="ant-select-arrow"]@@Enabled_And_Visible||10'; }

  casCadCurrency() { return '//div[contains(@class,"ant-select-dropdown-placement") and not(contains(@class,"ant-select-dropdown-hidden"))]@@Enabled_And_Visible||.5'; }

  lblOuterCurrency3() { return '[id="dealtCurrency"]@@Enabled_And_Visible||10'; }

  lblCurrency3() { return '[data-testid="ddlCurrency3"]@@Enabled_And_Visible||10'; }

  liCurrency2() { return '//div[contains(@class, "ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[@class="ant-select-item-option-content"]@@havetext||10'; }

  lblDealtCcy() { return '//label[contains(@for,"dealtCurrency")]@@Enabled_And_Visible||2'; }
}
module.exports = CurrencyObjectProvider;
