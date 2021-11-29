/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

class SearchPropertyProvider {
  btnShowSearch() { return '//button[@data-testid="btnShowSearch"]@@Enabled_And_Visible||10'; }

  // Search Deal
  dptDateFrom() { return '//input[@data-testid="dateFrom"]@@Enabled_And_Visible||10'; }

  dptDateTo() { return '//input[@data-testid="dateTo"]@@Enabled_And_Visible||10'; }

  pnlDate() { return 'ant-picker-panel-container@@Enabled_And_Visible||.5'; }

  txtDealId() { return '//input[@data-testid="dealId"]@@Enabled_And_Visible||10'; }

  lblInputValidate(text) { return `${'//div[@class="ant-form-item-explain ant-form-item-explain-error"]//div[text()="TEMP"]'.replace('TEMP', text)}@@displayed||10`; }

  btnClearDealId() { return '//input[@data-testid="dealId"]/parent::span//span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||10'; }

  btnClearBroker() { return '//input[@data-testid="broker"]/parent::span//span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||10'; }

  btnClearCustomer() { return '//input[@data-testid="customer"]/parent::span//span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||10'; }

  btnClearTrader() { return '//input[@data-testid="trader"]/parent::span//span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||10'; }

  // Advanced Search Criteria
  txtBroker() { return '//input[@data-testid="broker"]@@Enabled_And_Visible||10'; }

  txtCustomer() { return '//input[@data-testid="customer"]@@Enabled_And_Visible||10'; }

  txtTrader() { return '//input[@data-testid="trader"]@@Enabled_And_Visible||10'; }

  // Buttons
  btnReset() { return '//button[@data-testid="blotterReset"]@@Enabled_And_Visible||10'; }

  btnSearch() { return '//button[@data-testid="blotterSearch"]@@Enabled_And_Visible||10'; }

  mskGrid() { return '//div[@class="ant-drawer-mask"]@@Enabled_And_Visible||10'; }

  mskSearchDrawer() { return '//div[contains(@class,"ant-drawer-left")]@@Enabled_And_Visible||10'; }

  lblSearchResult() { return '//span[@data-testid="lblSearchResult"]@@Enabled_And_Visible||10'; }

  lblDateBrokerSearch() { return '//span[@data-testid="lblDateBrokerSearch"]@@Enabled_And_Visible||10'; }

  lblCustTraderSearch() { return '//span[@data-testid="lblCustTraderSearch"]@@Enabled_And_Visible||10'; }
}
module.exports = SearchPropertyProvider;
