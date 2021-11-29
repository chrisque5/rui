/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class LoginPropertyProvider {
  constructor() {
    this.value = '';
  }

  ddlUserDropdown() { this.value = '[data-testid="ddlUserDropdown"]@@havetext||10'; return this.value; }

  lnkNDF() { return '//a//span[text()="NDF"]@@Enabled_And_Visible||4'; }

  lnkNDFSelected() { return '//a//span[text()="NDF"]/ancestor::li@@Enabled_And_Visible||4'; }

  lnkFWD() { return '//a//span[text()="FWD"]@@Enabled_And_Visible||4'; }

  lnkFWDSelected() { return '//a//span[text()="FWD"]/ancestor::li@@Enabled_And_Visible||4'; }

  lnkSPT() { return '//a//span[text()="SPT"]@@Enabled_And_Visible||4'; }

  lnkSPTSelected() { return '//a//span[text()="SPT"]/ancestor::li@@Enabled_And_Visible||4'; }

  lnkAdmin() { return '//a//span[text()="Admin"]@@Enabled_And_Visible||4'; }

  lnkAdminSelected() { return '//a//span[text()="Admin"]/ancestor::li@@Enabled_And_Visible||4'; }

  lnkBlotter() { return '//a//span[text()="Blotter"]@@Enabled_And_Visible||4'; }

  lnkBlotterSelected() { return '//a//span[text()="Blotter"]/ancestor::li@@Enabled_And_Visible||4'; }

  btnLogout() { this.value = '[data-testid="btnLogout"]@@Enabled_And_Visible||10'; return this.value; }

  btnLogoutConfirm() { this.value = '[data-testid="btnLogoutConfirm"]@@Enabled_And_Visible||10'; return this.value; }

  btnLogoutCancel() { this.value = '//button[@class="ant-btn"]/span[text()="Cancel"]@@Enabled_And_Visible||10'; return this.value; }

  modalLogout() { this.value = '//span[@class="ant-modal-confirm-title" and text()="Confirm Logout"]@@Enabled_And_Visible||10'; return this.value; }

  username() { this.value = '#inputEmail@@enabled||10'; return this.value; }

  password() { this.value = '#inputPassword@@Enabled_And_Visible||10'; return this.value; }

  btnSignIn() { this.value = '#btnSignIn@@Enabled_And_Visible||10'; return this.value; }

  txtInsufficientPermissions() { this.value = '//h3[@class="subtitle" and text()="Insufficient Permissions"]@@Enabled_And_Visible||10'; return this.value; }
}
module.exports = LoginPropertyProvider;
