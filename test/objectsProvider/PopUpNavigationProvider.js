/* eslint-disable class-methods-use-this */
class PopUpNavigationProvider {
  popUpMessage() { return '.ant-notification-notice-message@@Enabled_And_Visible||2'; }

  popUpDescription() { return '.ant-notification-notice-description@@Enabled_And_Visible||10'; }

  availPopUpDescription() { return '.ant-notification-notice-description@@Enabled_And_Visible||.5'; }

  btnPopUpClose() { return '.ant-notification-notice-close@@Enabled_And_Visible||1'; }

  btnPopUpCloseAll() { return '(//button[@data-testid="btnCloseAll"])[1]@@Enabled_And_Visible||1'; }

  isbtnPopUpClose() { return '.ant-notification-notice-close@@notvisible||1'; }

  txtError() { return '#txtError@@Enabled_And_Visible||10'; }

  lnkReturnLogin() { return '#lnkReturnLogin@@Enabled_And_Visible||10'; }

  btnHotListClose() { return '//div[@class="ant-modal-confirm-btns"]//span[text()="Yes"]@@Enabled_And_Visible||1'; }

  btnConfirmationClose() { return '//div[@class="ant-modal-confirm-btns"]//span[text()="OK"]@@Enabled_And_Visible||1'; }

  lblHotListPopUpMessage() { return '//div[@class="ant-modal-confirm-content"]@@haveText||10'; }
}
module.exports = PopUpNavigationProvider;
