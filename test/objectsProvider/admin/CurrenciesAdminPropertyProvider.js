/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class AdminPropertyProvider {
  constructor() {
    this.value = '';
  }

  btnCurrenciesTab() { return '//div[@role="tab" and contains(text(),"Currencies")]//..@@Enabled_And_Visible||4'; }

  rdodealTypeNDF() { return '//div[contains(@id,"Currencies")]//input[@data-testid="rdodealTypeNDF"]@@Enabled_And_Visible||5'; }

  rdodealTypeFWD() { return '//div[contains(@id,"Currencies")]//input[@data-testid="rdodealTypeFWD"]@@Enabled_And_Visible||5'; }

  rdodealTypeSPT() { return '//div[contains(@id,"Currencies")]//input[@data-testid="rdodealTypeSPT"]@@Enabled_And_Visible||5'; }

  rdodealTypeNDFSelect() { return '//div[contains(@id,"Currencies")]//input[@data-testid="rdodealTypeNDF"]/ancestor::span[@class="ant-radio ant-radio-checked"]@@Enabled_And_Visible||10'; }

  rdodealTypeFWDSelect() { return '//div[contains(@id,"Currencies")]//input[@data-testid="rdodealTypeFWD"]/ancestor::span[@class="ant-radio ant-radio-checked"]@@Enabled_And_Visible||10'; }

  rdodealTypeSPTSelect() { return '//div[contains(@id,"Currencies")]//input[@data-testid="rdodealTypeSPT"]/ancestor::span[@class="ant-radio ant-radio-checked"]@@Enabled_And_Visible||10'; }

  btnCancel() { return '//button[@data-testid="cocBtnReset"]@@Enabled_And_Visible||10'; }

  btnApply() { return '//button[@data-testid="cocBtnApply"]@@Enabled_And_Visible||10'; }

  chkCurrency(instrumentId) { return `${'//input[@id="INSTID"]'.replace('INSTID', instrumentId)}@@Enabled_And_Visible||5`; }

  currencyScroll() { return '//div[@class="ag-body-viewport ag-layout-normal ag-row-no-animation"]@@Enabled_And_Visible||2'; }
}
module.exports = AdminPropertyProvider;
