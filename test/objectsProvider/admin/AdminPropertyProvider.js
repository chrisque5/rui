/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class AdminPropertyProvider {
  constructor() {
    this.value = '';
  }

  lnkAdmin() { return '//a//span[text()="Admin"]@@Enabled_And_Visible||4'; }

  lnkAdminSelected() { return '//a//span[text()="Admin"]/ancestor::li@@Enabled_And_Visible||4'; }

  btnBrokersTab() { return '//div[@role="tab" and contains(text(),"Brokers")]//..@@Enabled_And_Visible||4'; }

  btnCurrenciesTab() { return '//div[@role="tab" and contains(text(),"Currencies")]//..@@Enabled_And_Visible||4'; }

  rdodealTypeNDF() { return '[data-testid="rdodealTypeNDF"]@@Enabled_And_Visible||10'; }

  rdodealTypeFWD() { return '[data-testid="rdodealTypeFWD"]@@Enabled_And_Visible||10'; }

  rdodealTypeSPT() { return '[data-testid="rdodealTypeSPT"]@@Enabled_And_Visible||10'; }

  rdodealTypeNDFSelect() { return '//input[@data-testid="rdodealTypeNDF"]/ancestor::span[@class="ant-radio ant-radio-checked"]@@Enabled_And_Visible||10'; }

  rdodealTypeFWDSelect() { return '//input[@data-testid="rdodealTypeFWD"]/ancestor::span[@class="ant-radio ant-radio-checked"]@@Enabled_And_Visible||10'; }

  rdodealTypeSPTSelect() { return '//input[@data-testid="rdodealTypeSPT"]/ancestor::span[@class="ant-radio ant-radio-checked"]@@Enabled_And_Visible||10'; }

  ddlBrokerDesk() { return '//div[@data-testid="ddDesk"]//span[@class="ant-select-arrow"]@@Enabled_And_Visible||10'; }

  liBrokerDesk(desk) { return `${'//div[@id="desk_list"]//following-sibling::div//div[(@class="ant-select-item-option-content") and (contains(.,"DESK"))]'.replace('DESK', desk)}@@Enabled_And_Visible||5`; }

  lblBrokerDesk() { return '//div[@data-testid="ddDesk"]//span[@class="ant-select-selection-item"]@@Enabled_And_Visible||2'; }

  ulBrokerDesk() { return '//div[contains(@class,"ant-select-dropdown") and not(contains(@class,"ant-select-dropdown-hidden"))]@@Enabled_And_Visible||2'; }

  btnClearBrokerDesk() { return '//div[@data-testid="ddDesk"]//span//i[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||0.5'; }

  chkAllBrokers() { return '//span[contains(text(),"All Brokers")]/ancestor::div[@class="ant-transfer-list-header"]//span[@class="ant-checkbox-inner"]@@Enabled_And_Visible||1'; }

  chkDMSWebBrokers() { return '//span[contains(text(),"DMSWeb Broker List")]/ancestor::div[@class="ant-transfer-list-header"]//span[@class="ant-checkbox-inner"]@@Enabled_And_Visible||1'; }

  txtAllBrokerSearch() { return '//span[text()="All Brokers"]//..//..//..//div//input[@class="ant-input ant-transfer-list-search"]@@Enabled_And_Visible||2'; }

  txtDMSWebBrokerSearch() { return '//span[text()="DMSWeb Broker List"]//..//..//..//div//input[@class="ant-input ant-transfer-list-search"]@@Enabled_And_Visible||2'; }

  ulAllBrokersEmpty() { return '//span[text()="All Brokers"]//..//..//..//div[@class="ant-transfer-list-body-not-found"]@@Enabled_And_Visible||2'; }

  ulDMSWebBrokersEmpty() { return '//span[text()="DMSWeb Broker List"]//..//..//..//div[@class="ant-transfer-list-body-not-found"]@@Enabled_And_Visible||2'; }

  chkBrokerToMove(broker) { return `${'//li[@title="TEMP"]//input[@class="ant-checkbox-input"]'.replace('TEMP', broker)}@@Enabled_And_Visible||5`; }

  chkBrokerToMoveVerify(broker) { return `${'//li[@title="TEMP"]//label'.replace('TEMP', broker)}@@Enabled_And_Visible||5`; }

  brokerToVerify(broker, side) { return `${'//span[contains(text(),"SIDE")]/ancestor::div[@class="ant-transfer-list"]//li[@title="BROKER"]'.replace('SIDE', side).replace('BROKER', broker)}@@Enabled_And_Visible||5`; }

  btnAddBroker() { return '//span[@class="anticon anticon-right"]@@Enabled_And_Visible||1'; }

  btnRemoveBroker() { return '//span[@class="anticon anticon-left"]@@Enabled_And_Visible||1'; }

  btnCancel() { return '//button[@data-testid="bocBtnReset"]@@Enabled_And_Visible||10'; }

  btnApply() { return '//button[@data-testid="bocBtnApply"]@@Enabled_And_Visible||10'; }

  modalConfirm() { return '//span[@class="ant-modal-confirm-title" and text()="Confirm"]@@Enabled_And_Visible||2'; }

  btnConfirmYes() { return '//button/span[text()="Yes"]@@Enabled_And_Visible||10'; }

  btnConfirmNo() { return '//button/span[text()="No"]@@Enabled_And_Visible||10'; }
}
module.exports = AdminPropertyProvider;
