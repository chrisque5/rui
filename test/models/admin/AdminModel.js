const LoginModel = require('../LoginModel.js');
const BrokerAdminPage = require('../../pageobjects/admin/BrokerAdminPageObject');
const CurrenciesAdminPage = require('../../pageobjects/admin/CurrenciesAdminPageObject');
const AdminPage = require('../../pageobjects/admin/AdminPageObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const Log = require('../../core/utility/Logs.js');
const SettingsPageObject = require('../../pageobjects/SettingsObject');
const { ClickActions, WindowActions, ElementActions } = require('../../core/actions/ActionsIndex.js');

class AdminModel {
  constructor() {
    this.loginModel = new LoginModel();
    this.brokers = new BrokerAdminPage();
    this.currencies = new CurrenciesAdminPage();
    this.admin = new AdminPage();
    this.watch = new StopWatch();
    this.log = new Log();
    this.settings = new SettingsPageObject();
    this.clickActions = new ClickActions();
    this.windowActions = new WindowActions();
    this.elementActions = new ElementActions();
  }

  selectBrokersTab() {
    this.clickActions.clickByJScript(this.admin.btnBrokersTab());
  }

  selectCurrenciesTab() {
    this.clickActions.clickByJScript(this.admin.btnCurrenciesTab());
  }

  verifyBrokersTabActive() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.admin.btnBrokersTab(), 'class').includes('ant-tabs-tab-active')) {
        this.log.log('Brokers tab is active');
        return true;
      }
      this.log.log('Brokers tab is not yet active');
    }
    this.log.log('Brokers tab is not active');
    return false;
  }

  verifyCurrenciesTabActive() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.admin.btnCurrenciesTab(), 'class').includes('ant-tabs-tab-active')) {
        this.log.log('Currencies tab is active');
        return true;
      }
      this.log.log('Currencies tab is not yet active');
    }
    this.log.log('Currencies tab is not active');
    return false;
  }

  moveToNdfNoVerify() {
    this.loginModel.selectNDF();
  }

  moveToFwdNoVerify() {
    this.loginModel.selectFWD();
  }

  moveToSptNoVerify() {
    this.loginModel.selectSPT();
  }

  isPageLoadComplete() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.admin.btnBrokersTab(), 'class');
      this.log.log(`Broker Tab attribute value: ${attValue}`);
      if (attValue === 'ant-tabs-tab ant-tabs-tab-active') {
        this.log.log('Page Load Completed.');
        return true;
      }
      this.log.log('Page is still loading.');
    }
    this.log.log('Page is not loaded.');
    return false;
  }

  isModalConfirmVisible() {
    this.watch.startStopWatch(1);
    while (this.watch.isWatchRunning()) {
      const element = this.admin.modalConfirm();
      if (element !== null || element !== undefined) {
        this.log.log('Confirm Modal is visible.');
        return true;
      }
      this.log.log('Confirm Modal is visible - waiting.');
    }
    this.log.log('Confirm Modal is not visible.');
    return false;
  }

  isModalConfirmClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const element = this.admin.modalConfirmNoCheck();
      if (element === null || element === undefined) {
        this.log.log('Confirm Modal is closed.');
        return true;
      }
    }
    this.log.log('Confirm Modal is not closed yet.');
    return false;
  }

  clickModalYes() {
    this.clickActions.clickByJScript(this.admin.btnConfirmYes());
    this.isModalConfirmClose();
  }

  clickModalNo() {
    this.clickActions.clickByJScript(this.admin.btnConfirmNo());
    this.isModalConfirmClose();
  }
}
module.exports = AdminModel;
