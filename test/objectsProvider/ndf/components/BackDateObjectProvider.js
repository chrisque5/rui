/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class BackDateObjectProvider {
  chkBackDate() { return '#isTradeDateEnabled@@Enabled_And_Visible||10'; }

  chkBackDateState() { return '//input[@id="isTradeDateEnabled"]/ancestor::span[contains(@class,"ant-checkbox")]@@Enabled_And_Visible||10'; }

  dptBackDate() { return '//input[@id="tradeDate"]@@Enabled_And_Visible||10'; }

  txtBackDate() { return '//input[@id="tradeDate"]@@Enabled_And_Visible||10'; }

  tmpBackDateTime() { return '//input[@id="tradeTime"]@@Enabled_And_Visible||10'; }

  txtBackDateTime() { return '//input[@id="tradeTime"]@@Enabled_And_Visible||10'; }

  btnBackDateTimeAccept() { return '//button//span[text()="Ok"]@@Enabled_And_Visible||10'; }

  chkBackDateDateState() { return '//input[@id="tradeDate"]//ancestor::div[contains(@class,"item-trade-date") and not (contains(@class,"ant-form-item-control-wrapper"))]@@Enabled_And_Visible||10'; }

  chkBackDateTimeState() { return '//input[@id="tradeTime"]//ancestor::div[contains(@class,"item-trade-time") and not (contains(@class,"ant-form-item-control-wrapper"))]@@Enabled_And_Visible||10'; }

  btnClearBackDateTime() { return '//span[@class="ant-time-picker"]/i[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||10'; }

  imgBackDate() { return '//input[@data-testid="dtpFixingDate1"]@@Enabled_And_Visible||10'; }

  modalBackDate() { return '//div[contains(@class, "ant-modal-title") and text()="Confirm Trade Date/Time"]@@Enabled_And_Visible||2'; }

  modalNewDateString(dateTimeString) { return `${'//span[@class="modal-times"]/span[text()="TEMP"]'.replace('TEMP', dateTimeString)}@@Enabled_And_Visible||10`; }

  btnCancel() { return '[data-testid="trade-date-modal-cancel"]@@Enabled_And_Visible||10'}

  btnAccept() { return '[data-testid="trade-date-modal-save"]@@Enabled_And_Visible||10'}
}
module.exports = BackDateObjectProvider;
