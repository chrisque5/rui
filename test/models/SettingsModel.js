/* eslint-disable max-len */
/* eslint-disable no-undef */
const Logs = require('../core/utility/Logs');
const LoginModel = require('./LoginModel.js');
const SettingsPageObject = require('../pageobjects/SettingsObject');
const StopWatch = require('../core/utility/StopWatch.js');
const PopUpModel = require('./PopUpNavigationModel.js');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  MouseActions,
} = require('../core/actions/ActionsIndex.js');

class SettingsModel {
  constructor() {
    this.log = new Logs();
    this.loginModel = new LoginModel();
    this.settings = new SettingsPageObject();
    this.watch = new StopWatch();
    this.popUp = new PopUpModel();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.mouseActions = new MouseActions();
  }

  clickBtnSettings() {
    this.clickActions.clickByJScript(this.settings.btnSettings());
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isSettingsOpen(!this.settings.isbtnSettingsClose()) === true) {
        this.log.log('Settings Menu is open.');
        return true;
      }
      this.log.log('Settings Menu is not yet open, waiting until open.');
    }
    return false;
  }

  ratesFeedOff() {
    this.clickBtnSettings();
    this.clickDisplayTailorMenu();
    this.log.log(`Rates field value : ${this.getRatesSwitchLabel()}`);
    if (this.getRatesSwitchLabel() === 'ON') {
      this.log.log(`Rates feed current state is '${this.getRatesSwitchLabel()}'`);
      this.clickChkRates();
      this.log.log('Rates feed disabled');
    } else if (this.getRatesSwitchLabel() === 'OFF') {
      this.log.log('Rates feed already disabled');
    }
    this.clickBtnSave();
  }

  ratesFeedOn() {
    this.clickBtnSettings();
    this.clickDisplayTailorMenu();
    if (this.getRatesSwitchLabel() === 'OFF') {
      this.clickChkRates();
      this.log.log('Rates feed enabled');
    } else if (this.getRatesSwitchLabel() === 'ON') {
      this.log.log('Rates feed already enabled');
    }
    this.clickBtnSave();
  }

  toggleTradersOff() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    this.log.log(`Trader field value : ${this.getDisplayTraderFavsLabel()}`);
    if (this.getDisplayTraderFavsLabel() === 'ON') {
      this.log.log(`Trader switch current state is '${this.getDisplayTraderFavsLabel()}'`);
      this.clickChkDisplayTraderFavs();
      this.log.log('Trader switch disabled');
    } else if (this.getDisplayTraderFavsLabel() === 'OFF') {
      this.log.log('Trader switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleTradersOn() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    if (this.getDisplayTraderFavsLabel() === 'OFF') {
      this.clickChkDisplayTraderFavs();
      this.log.log('Trader view enabled');
    } else if (this.getDisplayTraderFavsLabel() === 'ON') {
      this.log.log('Trader view already enabled');
    }
    this.clickBtnSave();
  }

  toggleClientsOff() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    this.log.log(`Firm field value : ${this.getDisplayFirmFavsLabel()}`);
    if (this.getDisplayFirmFavsLabel() === 'ON') {
      this.log.log(`Firm switch current state is '${this.getDisplayFirmFavsLabel()}'`);
      this.clickChkDisplayFirmFavs();
      this.log.log('Firm switch disabled');
    } else if (this.getDisplayFirmFavsLabel() === 'OFF') {
      this.log.log('Firm switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleClientsOn() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    if (this.getDisplayFirmFavsLabel() === 'OFF') {
      this.clickChkDisplayFirmFavs();
      this.log.log('Firm view enabled');
    } else if (this.getDisplayFirmFavsLabel() === 'ON') {
      this.log.log('Firm view already enabled');
    }
    this.clickBtnSave();
  }

  toggleCurrencyPairsOff() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    this.log.log(`Currency field value : ${this.getDisplayCurrencyFavsLabel()}`);
    if (this.getDisplayCurrencyFavsLabel() === 'ON') {
      this.log.log(`Currency switch current state is '${this.getDisplayCurrencyFavsLabel()}'`);
      this.clickChkDisplayCurrencyFavs();
      this.log.log('Currency switch disabled');
    } else if (this.getDisplayCurrencyFavsLabel() === 'OFF') {
      this.log.log('Firm switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleCurrencyPairsOn() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    if (this.getDisplayCurrencyFavsLabel() === 'OFF') {
      this.clickChkDisplayCurrencyFavs();
      this.log.log('Currency view enabled');
    } else if (this.getDisplayCurrencyFavsLabel() === 'ON') {
      this.log.log('Currency view already enabled');
    }
    this.clickBtnSave();
  }

  toggleTermsOff() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    this.log.log(`Term value : ${this.getDisplayTermFavsLabel()}`);
    if (this.getDisplayTermFavsLabel() === 'ON') {
      this.log.log(`Term switch current state is '${this.getDisplayTermFavsLabel()}'`);
      this.clickChkDisplayTermFavs();
      this.log.log('Term switch disabled');
    } else if (this.getDisplayTermFavsLabel() === 'OFF') {
      this.log.log('Firm switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleTermsOn() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    if (this.getDisplayTermFavsLabel() === 'OFF') {
      this.clickChkDisplayTermFavs();
      this.log.log('Term view enabled');
    } else if (this.getDisplayTermFavsLabel() === 'ON') {
      this.log.log('Term view already enabled');
    }
    this.clickBtnSave();
  }

  toggleExecutionVenuesOff() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    this.log.log(`Execution Venue value : ${this.getDisplayExecVenueFavsLabel()}`);
    if (this.getDisplayExecVenueFavsLabel() === 'ON') {
      this.log.log(`Execution Venue switch current state is '${this.getDisplayExecVenueFavsLabel()}'`);
      this.clickChkDisplayExecVenueFavs();
      this.log.log('Execution Venue switch disabled');
    } else if (this.getDisplayExecVenueFavsLabel() === 'OFF') {
      this.log.log('Execution Venue switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleExecutionVenuesOn() {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    if (this.getDisplayExecVenueFavsLabel() === 'OFF') {
      this.clickChkDisplayExecVenueFavs();
      this.log.log('Execution Venue view enabled');
    } else if (this.getDisplayExecVenueFavsLabel() === 'ON') {
      this.log.log('Execution Venue view already enabled');
    }
    this.clickBtnSave();
  }

  toggleExecutionVenueColourOff() {
    this.clickBtnSettings();
    this.clickDisplayGeneralMenu();
    this.log.log(`Execution Venue Colour value : ${this.getDisplayExecVenueColoursLabel()}`);
    if (this.getDisplayExecVenueColoursLabel() === 'ON') {
      this.log.log(`Execution Venue Colours switch current state is '${this.getDisplayExecVenueColoursLabel()}'`);
      this.clickChkDisplayExecVenueColours();
      this.log.log('Execution Venue Colours switch disabled');
    } else if (this.getDisplayExecVenueColoursLabel() === 'OFF') {
      this.log.log('Execution Venue Colours switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleExecutionVenueColourOn() {
    this.clickBtnSettings();
    this.clickDisplayGeneralMenu();
    if (this.getDisplayExecVenueColoursLabel() === 'OFF') {
      this.clickChkDisplayExecVenueColours();
      this.log.log('Execution Venue Colours enabled');
    } else if (this.getDisplayExecVenueColoursLabel() === 'ON') {
      this.log.log('Execution Venue Colours already enabled');
    }
    this.clickBtnSave();
  }

  toggleLRModeOff() {
    this.clickBtnSettings();
    this.clickDisplayFWDTradeCaptureMenu();
    this.log.log(`LR Mode field value : ${this.getLRModeLabel()}`);
    if (this.getLRModeLabel() === 'ON') {
      this.log.log(`LR Mode switch current state is '${this.getLRModeLabel()}'`);
      this.clickChkLRMode();
      this.log.log('LR Mode switch disabled');
    } else if (this.getLRModeLabel() === 'OFF') {
      this.log.log('LR Mode switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleLRModeOn() {
    this.clickBtnSettings();
    this.clickDisplayFWDTradeCaptureMenu();
    if (this.getLRModeLabel() === 'OFF') {
      this.clickChkLRMode();
      this.log.log('LR Mode view enabled');
    } else if (this.getLRModeLabel() === 'ON') {
      this.log.log('LR Mode view already enabled');
    }
    this.clickBtnSave();
  }

  toggleClsDefaultsOff() {
    this.clickBtnSettings();
    this.clickDisplayGeneralMenu();
    this.log.log(`Cls Defaults value : ${this.getDisplayClsDefaultsLabel()}`);
    if (this.getDisplayClsDefaultsLabel() === 'ON') {
      this.log.log(`Cls Defaults switch current state is '${this.getDisplayClsDefaultsLabel()}'`);
      this.clickChkDisplayClsDefaults();
      this.log.log('Cls Defaults switch disabled');
    } else if (this.getDisplayClsDefaultsLabel() === 'OFF') {
      this.log.log('Cls Defaults switch already disabled');
    }
    this.clickBtnSave();
  }

  toggleClsDefaultsOn() {
    this.clickBtnSettings();
    this.clickDisplayGeneralMenu();
    if (this.getDisplayClsDefaultsLabel() === 'OFF') {
      this.clickChkDisplayClsDefaults();
      this.log.log('Cls Defaults enabled');
    } else if (this.getDisplayClsDefaultsLabel() === 'ON') {
      this.log.log('Cls Defaults already enabled');
    }
    this.clickBtnSave();
  }

  verifyDisplayTraderFavDisabled() {
    if (this.elementActions.isElementAvailable(this.settings.chkDisplayTraderFavs()) === false) {
      this.log.log('Trader switch is disabled.');
      return true;
    }
    this.log.log('Trader switch is enabled.');
    return false;
  }

  verifyDisplayTraderFavEnabled() {
    if (this.elementActions.getAttribute(this.settings.chkDisplayTraderFavs(), 'class').includes('ant-switch-disabled') === false) {
      this.log.log('Trader switch is enabled.');
      return true;
    }
    this.log.log('Trader switch is disabled.');
    return false;
  }

  toggleAllFavourites(state) {
    this.clickBtnSettings();
    this.clickDisplayClientManagerMenu();
    const btnState = state === 'ON' ? 'OFF' : 'ON';
    // if state = ON then check switch is OFF first / opposite for state = OFF
    if (this.getDisplayTraderFavsLabel() === btnState) {
      this.clickChkDisplayTraderFavs();
      this.log.log('Trader view clicked');
    }
    if (this.getDisplayFirmFavsLabel() === btnState) {
      this.clickChkDisplayFirmFavs();
      this.log.log('Firm view clicked');
    }
    if (this.getDisplayCurrencyFavsLabel() === btnState) {
      this.clickChkDisplayCurrencyFavs();
      this.log.log('Currency view clicked');
    }
    if (this.getDisplayTermFavsLabel() === btnState) {
      this.clickChkDisplayTermFavs();
      this.log.log('Term view clicked');
    }
    if (this.getDisplayExecVenueFavsLabel() === btnState) {
      this.clickChkDisplayExecVenueFavs();
      this.log.log('Execution Venue view clicked');
    }
    this.clickBtnSave();
  }

  clickChkRates() {
    this.clickActions.clickByJScript(this.settings.chkRatesSwitch());
  }

  clickChkLRMode() {
    this.clickActions.clickByJScript(this.settings.chkLRMode());
  }

  clickChkDisplayFirmFavs() {
    this.clickActions.clickByJScript(this.settings.chkDisplayFirmFavs());
  }

  clickChkDisplayTraderFavs() {
    this.clickActions.clickByJScript(this.settings.chkDisplayTraderFavs());
  }

  clickChkDisplayCurrencyFavs() {
    this.clickActions.clickByJScript(this.settings.chkDisplayCurrencyFavs());
  }

  clickChkDisplayTermFavs() {
    this.clickActions.clickByJScript(this.settings.chkDisplayTermFavs());
  }

  clickChkDisplayExecVenueFavs() {
    this.clickActions.clickByJScript(this.settings.chkDisplayExecVenueFavs());
  }

  clickChkDisplayExecVenueColours() {
    this.clickActions.clickByJScript(this.settings.chkDisplayExecVenueColours());
  }

  clickChkDisplayClsDefaults() {
    this.clickActions.clickByJScript(this.settings.chkDisplayClsDefaults());
  }

  getRatesSwitchLabel() { return this.textActions.getTxt(this.settings.lblRatesSwitch()); }

  getLRModeLabel() { return this.textActions.getTxt(this.settings.lblLRMode()); }

  getDisplayFirmFavsLabel() { return this.textActions.getTxt(this.settings.lblDisplayFirmFavs()); }

  getDisplayTraderFavsLabel() { return this.textActions.getTxt(this.settings.lblDisplayTraderFavs()); }

  getDisplayCurrencyFavsLabel() { return this.textActions.getTxt(this.settings.lblDisplayCurrencyFavs()); }

  getDisplayTermFavsLabel() { return this.textActions.getTxt(this.settings.lblDisplayTermFavs()); }

  getDisplayExecVenueFavsLabel() { return this.textActions.getTxt(this.settings.lblDisplayExecVenueFavs()); }

  getDisplayExecVenueColoursLabel() { return this.textActions.getTxt(this.settings.lblDisplayExecVenueColours()); }

  getDisplayClsDefaultsLabel() { return this.textActions.getTxt(this.settings.lblDisplayClsDefaults()); }

  clickDisplayTailorMenu() {
    this.clickActions.click(this.settings.lblDisplayTailorMenu());
  }

  clickDisplayClientManagerMenu() {
    this.clickActions.click(this.settings.lblDisplayClientManagerMenu());
  }

  clickDisplayGeneralMenu() {
    this.clickActions.click(this.settings.lblDisplayGeneralMenu());
  }

  clickDisplayFWDTradeCaptureMenu() {
    this.clickActions.click(this.settings.lblDisplayFWDTradeCaptureMenu());
  }

  clickBtnBack() {
    this.clickActions.click(this.settings.btnBack());
  }

  clickBtnSave() {
    this.clickActions.click(this.settings.btnSave());
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isSettingsClose(this.settings.isbtnSettingsClose()) === true) {
        this.log.log('Settings saved and window is closed.');
        this.isMaskClose();
        return true;
      }
      this.log.log('Settings window is not closed, trying to close again.');
      this.clickActions.click(this.settings.btnSettingsClose());
    }
    this.log.log('Settings Window is not closed');
    return false;
  }

  closeSettingsWindow() {
    this.clickActions.click(this.settings.btnSettingsClose());
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isSettingsClose(this.settings.isbtnSettingsClose()) === true) {
        this.log.log('Settings window is closed.');
        return true;
      }
      this.log.log('Settings window is not closed, trying to close again.');
      this.clickActions.click(this.settings.btnSettingsClose());
    }
    this.log.log('Settings window not closed yet.');
    return false;
  }

  isSettingsClose(elementObject) {
    return this.popUp.isElementClose(elementObject);
  }

  isSettingsOpen(elementObject) {
    return this.popUp.isElementClose(elementObject);
  }

  isMaskClose() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const pageMask = this.elementActions.getAttribute(this.settings.pageMask(), 'class');
      if (pageMask && pageMask.includes('ant-modal-mask-hidden')) {
        this.log.log('Page mask is hide now.');
        return true;
      }
      this.log.log('Page mask is still visible.');
    }
    return false;
  }

  isDefaultPageDropdownClosed() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.settings.ulDefaultPage(), 'class').includes('ant-select-dropdown-hidden')) {
        this.log.log('Dropdown is closed.');
        return true;
      }
      this.log.log('Dropdown is still visible - waiting.');
    }
    this.log.log('Dropdown is still visible.');
    return false;
  }

  isDropdownClose(elementObject) {
    return this.popUp.isElementClose(elementObject);
  }

  clickDdlDefaultPage() {
    this.mouseActions.mouseDown(this.settings.ddlDefaultPage());
  }

  verifyDefaultPageExists(defaultPage) {
    const element = this.settings.liDefaultPage(defaultPage);
    if (element !== null && element !== undefined && element !== '') {
      this.log.log(`${defaultPage} option exists in Default Page dropdown`);
      return true;
    }
    this.log.log(`${defaultPage} option does not exist in Default Page dropdown`);
    return false;
  }

  selectAndVerifyDefaultEntryPage(defaultPage) {
    this.clickBtnSettings();
    this.clickDisplayGeneralMenu();
    this.clickDdlDefaultPage();
    this.clickActions.clickByJScript(this.settings.liDefaultPage(defaultPage));
    this.log.log(`Changed the default entry page to : ${defaultPage}`);
    this.isDefaultPageDropdownClosed();
    if (this.textActions.getTxt(this.settings.ddlDefaultPageVal()) === defaultPage) {
      this.clickBtnSave();
      return true;
    }
    return false;
  }

  verifyDefaultEntryPageVal(defaultPage) {
    this.clickBtnSettings();
    this.clickDisplayGeneralMenu();
    if (this.textActions.getTxt(this.settings.ddlDefaultPageVal()) === defaultPage) {
      this.clickBtnBack();
      return true;
    }
    this.clickBtnBack();
    return false;
  }
}
module.exports = SettingsModel;
