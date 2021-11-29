const LoginLogout = require('../pageobjects/LoginLogoutPageObject');
const StopWatch = require('../core/utility/StopWatch.js');
const Log = require('../core/utility/Logs.js');
const ElementVisibility = require('../core/element/ElementVisibility.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  WindowActions,
  KeyboardActions,
  MouseActions,
  ElementActions,
} = require('../core/actions/ActionsIndex.js');

const Constants = require('../data/Constants.js');

class LoginModel {
  constructor() {
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.windowActions = new WindowActions();
    this.keyboardActions = new KeyboardActions();
    this.LoginLogout = new LoginLogout();
    this.mouseActions = new MouseActions();
    this.elementActions = new ElementActions();
    this.windowActions = new WindowActions();
    this.watch = new StopWatch();
    this.log = new Log();
    this.elVisibility = new ElementVisibility();
  }

  openUrl(url) {
    this.windowActions.openUrl(url);
  }

  getDdlUserDropdownText() { return this.textActions.getTxt(this.LoginLogout.ddlUserDropdown()); }

  clickDdlUserDropDown() {
    this.clickActions.click(this.LoginLogout.ddlUserDropdown());
    // eslint-disable-next-line radix
    // eslint-disable-next-line max-len
    // this.mouseActions.hoverElement(parseInt(this.LoginLogout.ddlUserDropdown().getLocation('x')), parseInt(this.LoginLogout.ddlUserDropdown().getLocation('y')));
  }

  waitForDdlUserDropdownText() {
    this.watch.startStopWatch(5);
    let userName = '';
    while (this.watch.isWatchRunning()) {
      userName = this.textActions.getTxt(this.LoginLogout.ddlUserDropdown());
      if (userName !== undefined || userName !== null || userName !== '') {
        this.log.log('Username visible - success');
        return true;
      }
      this.log.log('Username not visible yet');
    }
    this.log.log('Username has not became visible - problem during login?');
    return false;
  }

  changeUser(userName, password) {
    if (userName === 'belfasttpeur4') {
      this.logout();
      this.login(userName, password);
    } else {
      this.logout();
      this.login(userName, password);
      this.getDdlUserDropdownText();
    }
  }

  login(userName, password) {
    this.inputActions.inputByJScript(this.LoginLogout.username(), userName);
    this.inputActions.inputByJScript(this.LoginLogout.password(), password);
    this.clickActions.clickByJScript(this.LoginLogout.btnSignIn());
  }

  clickBtnLogout() {
    this.clickActions.clickByJScript(this.LoginLogout.btnLogout());
  }

  clickBtnLogoutConfirm() {
    this.clickActions.clickByJScript(this.LoginLogout.btnLogoutConfirm());
  }

  clickBtnLogoutCancel() {
    this.clickActions.clickByJScript(this.LoginLogout.btnLogoutCancel());
  }

  logout() {
    this.clickDdlUserDropDown();
    this.clickBtnLogout();
    this.isModalLogoutVisible();
    this.clickBtnLogoutConfirm();
    this.isLoginPageReload();
  }

  logoutWithoutConfirm() {
    this.clickDdlUserDropDown();
    this.clickBtnLogout();
    this.isModalLogoutVisible();
    this.clickBtnLogoutConfirm();
  }

  isModalLogoutVisible() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const element = this.LoginLogout.modalLogout();
      if (element !== null && element !== undefined) {
        this.log.log('Logout Modal is Visible.');
        return true;
      }
    }
    this.log.log('Logout Modal is not visible.');
    return false;
  }

  isModalLogoutClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      this.windowActions.pause(500);
      if (this.isModalLogoutVisible() === false) {
        this.log.log('Logout Modal is closed.');
        return true;
      }
    }
    this.log.log('Logout Modal is not closed yet.');
    return false;
  }

  verifyInsufficientPermissions() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const element = this.LoginLogout.txtInsufficientPermissions();
      if (element !== null && element !== undefined) {
        this.log.log('Insufficient permissions visible.');
        return true;
      }
      this.log.log('Insufficient permissions still not visible.');
    }
    this.log.log('Insufficient permissions not visible.');
    return false;
  }

  selectNDF() {
    this.clickActions.clickByJScript(this.LoginLogout.lnkNDF());
  }

  selectFWD() {
    this.clickActions.clickByJScript(this.LoginLogout.lnkFWD());
  }

  selectSPT() {
    this.clickActions.clickByJScript(this.LoginLogout.lnkSPT());
  }

  selectAdmin() {
    this.clickActions.clickByJScript(this.LoginLogout.lnkAdmin());
  }

  selectBlotter() {
    this.clickActions.clickByJScript(this.LoginLogout.lnkBlotter());
  }

  verifyNdfTabVisible() {
    if (this.elVisibility.checkVisibility(this.LoginLogout.lnkNDF(), 'enabled_and_visible', '2')) {
      this.log.log('Ndf Tab visible');
      return true;
    }
    return false;
  }

  verifyFwdTabVisible() {
    if (this.elVisibility.checkVisibility(this.LoginLogout.lnkFWD(), 'enabled_and_visible', '2')) {
      this.log.log('Fwd Tab visible');
      return true;
    }
    return false;
  }

  verifySptTabVisible() {
    if (this.elVisibility.checkVisibility(this.LoginLogout.lnkSPT(), 'enabled_and_visible', '2')) {
      this.log.log('Spt Tab visible');
      return true;
    }
    return false;
  }

  verifyBlotterTabVisible() {
    if (this.elVisibility.checkVisibility(this.LoginLogout.lnkBlotter(), 'enabled_and_visible', '2')) {
      this.log.log('Blotter Tab visible');
      return true;
    }
    return false;
  }

  verifyNDFselected() {
    const attValue = this.elementActions.getAttribute(this.LoginLogout.lnkNDFSelected(), 'class');
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (attValue.includes('ant-menu-item-selected') === true) {
        this.log.log('NDF successfully selected');
        return true;
      }
      this.log.log('NDF not yet selected');
    }
    this.log.log(`NDF not selected - attribute value = ${attValue}`);
    return false;
  }

  verifyFWDselected() {
    const attValue = this.elementActions.getAttribute(this.LoginLogout.lnkFWDSelected(), 'class');
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (attValue.includes('ant-menu-item-selected') === true) {
        this.log.log('FWD successfully selected');
        return true;
      }
      this.log.log('FWD not yet selected');
    }
    this.log.log(`FWD not selected - attribute value = ${attValue}`);
    return false;
  }

  verifySPTselected() {
    const attValue = this.elementActions.getAttribute(this.LoginLogout.lnkSPTSelected(), 'class');
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (attValue.includes('ant-menu-item-selected') === true) {
        this.log.log('SPT successfully selected');
        return true;
      }
      this.log.log('SPT not yet selected');
    }
    this.log.log(`SPT not selected - attribute value = ${attValue}`);
    return false;
  }

  verifyAdminselected() {
    const attValue = this.elementActions.getAttribute(this.LoginLogout.lnkNDFSelected(), 'class');
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (attValue.includes('ant-menu-item-selected') === true) {
        this.log.log('Admin successfully selected');
        return true;
      }
      this.log.log('Admin not yet selected');
    }
    this.log.log(`Admin not selected - attribute value = ${attValue}`);
    return false;
  }

  verifyAdminUrlselected(adminUrl) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const currentUrl = this.windowActions.getUrl();
      if (currentUrl === adminUrl) {
        this.log.log('Admin successfully selected');
        this.log.log(`${this.windowActions.getUrl()} URL matches ${adminUrl}`);
        return true;
      }
      this.log.log('Admin not yet selected');
      this.log.log(`${this.windowActions.getUrl()} does not match ${adminUrl}`);
    }
    this.log.log('Admin not selected');
    return false;
  }

  verifyBlotterselected() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.LoginLogout.lnkBlotterSelected(), 'class').includes('ant-menu-item-selected') === true) {
        this.log.log('Blotter successfully selected');
        return true;
      }
      this.log.log('Blotters not yet selected');
    }
    this.log.log('Blotter not selected');
    return false;
  }

  isLoginPageReload() {
    this.windowActions.switchWindow(Constants.DMSWEBURL);
    this.elementActions.waitForDisplayed(this.LoginLogout.username());
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.LoginLogout.username(), 'placeholder');
      this.log.log(`User Name attribute value: ${attValue}`);
      if (attValue && attValue.includes('Username')) {
        this.log.log('Focus is on UserName Field');
        return true;
      }
      this.log.log('Login Page is loading....');
    }
    this.log.log('Login Page is not able to load.');
    return false;
  }
}
module.exports = LoginModel;
