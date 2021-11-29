const LoginPropertyProvider = require('../objectsProvider/LoginPropertyProvider');
const ElementProcessor = require('../core/element/ElementProcessor.js');

class LoginLogoutPageObject {
  constructor() {
    this.login = new LoginPropertyProvider();
    this.elmtProc = new ElementProcessor();
  }

  username() { return this.elmtProc.getEl(this.login.username()); }

  password() { return this.elmtProc.getEl(this.login.password()); }

  btnSignIn() { return this.elmtProc.getEl(this.login.btnSignIn()); }

  ddlUserDropdown() { return this.elmtProc.getEl(this.login.ddlUserDropdown()); }

  lnkNDF() { return this.elmtProc.getEl(this.login.lnkNDF()); }

  lnkNDFSelected() { return this.elmtProc.getEl(this.login.lnkNDFSelected()); }

  lnkFWD() { return this.elmtProc.getEl(this.login.lnkFWD()); }

  lnkFWDSelected() { return this.elmtProc.getEl(this.login.lnkFWDSelected()); }

  lnkSPT() { return this.elmtProc.getEl(this.login.lnkSPT()); }

  lnkSPTSelected() { return this.elmtProc.getEl(this.login.lnkSPTSelected()); }

  lnkAdmin() { return this.elmtProc.getEl(this.login.lnkAdmin()); }

  lnkAdminSelected() { return this.elmtProc.getEl(this.login.lnkAdminSelected()); }

  lnkBlotter() { return this.elmtProc.getEl(this.login.lnkBlotter()); }

  lnkBlotterNoCheck() { return this.elmtProc.getElWithoutCheck(this.login.lnkBlotter()); }

  lnkBlotterSelected() { return this.elmtProc.getEl(this.login.lnkBlotterSelected()); }

  btnLogout() { return this.elmtProc.getEl(this.login.btnLogout()); }

  btnLogoutConfirm() { return this.elmtProc.getEl(this.login.btnLogoutConfirm()); }

  btnLogoutCancel() { return this.elmtProc.getEl(this.login.btnLogoutCancel()); }

  modalLogout() { return this.elmtProc.getEl(this.login.modalLogout()); }

  txtInsufficientPermissions() { return this.elmtProc.getEl(this.login.txtInsufficientPermissions()); }
}
module.exports = LoginLogoutPageObject;
