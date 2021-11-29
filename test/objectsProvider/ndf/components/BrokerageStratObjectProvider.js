/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class BrokerageStratObjectProvider {
  ddlBrokerageStrat() { return '//div[@data-testid="ddlBrokerageStrategy"]//span[@class="ant-select-arrow"]@@Enabled_And_Visible||10'; }

  lblBrokerageStrat() { return '//div[@data-testid="ddlBrokerageStrategy"]//span[@class="ant-select-selection-item"]@@displayed||10'; }

  txtBrokerageStrat() { return '//span[text()="Strategy"]@@Enabled_And_Visible||10'; }

  txtInputBrokerageStrat(brokeragestrategy) { return `${'//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[contains(@class,"ant-select-item-option-content") and text()="TEMP"]'.replace('TEMP', brokeragestrategy)}@@Enabled_And_Visible||10`; }

  listBrokerageStrat() { return '//div[contains(@data-testid,"ddlBrokerageStrategy")]//span[@class="ant-select-selection-item"]@@havetext||10'; }
}
module.exports = BrokerageStratObjectProvider;
