const SettingsProvider = require('../objectsProvider/SettingsPropertyProvider.js');
const ElementProcessor = require('../core/element/ElementProcessor.js');

class SettingsPageObject {
  constructor() {
    this.settings = new SettingsProvider();
    this.elmtProc = new ElementProcessor();
  }

  btnSettings() { return this.elmtProc.getEl(this.settings.btnSettings()); }

  pageMask() { return this.elmtProc.getEl(this.settings.pageMask()); }

  chkRatesSwitch() { return this.elmtProc.getEl(this.settings.chkRatesSwitch()); }

  chkLRMode() { return this.elmtProc.getEl(this.settings.chkLRMode()); }

  chkDisplayFirmFavs() { return this.elmtProc.getEl(this.settings.chkDisplayFirmFavs()); }

  chkDisplayTraderFavs() { return this.elmtProc.getEl(this.settings.chkDisplayTraderFavs()); }

  chkDisplayCurrencyFavs() { return this.elmtProc.getEl(this.settings.chkDisplayCurrencyFavs()); }

  chkDisplayTermFavs() { return this.elmtProc.getEl(this.settings.chkDisplayTermFavs()); }

  chkDisplayExecVenueFavs() { return this.elmtProc.getEl(this.settings.chkDisplayExecVenueFavs()); }

  chkDisplayExecVenueColours() { return this.elmtProc.getEl(this.settings.chkDisplayExecVenueColours()); }

  chkDisplayClsDefaults() { return this.elmtProc.getEl(this.settings.chkDisplayClsDefaults()); }

  btnBack() { return this.elmtProc.getEl(this.settings.btnBack()); }

  btnSave() { return this.elmtProc.getEl(this.settings.btnSave()); }

  btnSettingsClose() { return this.elmtProc.getEl(this.settings.btnSettingsClose()); }

  isbtnSettingsClose() { return this.elmtProc.getEl(this.settings.isbtnSettingsClose()); }

  isDropdownClose() { return this.elmtProc.getEl(this.settings.isDropdownClose()); }

  lblRatesSwitch() { return this.elmtProc.getEl(this.settings.lblRatesSwitch()); }

  lblLRMode() { return this.elmtProc.getEl(this.settings.lblLRMode()); }

  lblDisplayFirmFavs() { return this.elmtProc.getEl(this.settings.lblDisplayFirmFavs()); }

  lblDisplayTraderFavs() { return this.elmtProc.getEl(this.settings.lblDisplayTraderFavs()); }

  lblDisplayCurrencyFavs() { return this.elmtProc.getEl(this.settings.lblDisplayCurrencyFavs()); }

  lblDisplayTermFavs() { return this.elmtProc.getEl(this.settings.lblDisplayTermFavs()); }

  lblDisplayExecVenueFavs() { return this.elmtProc.getEl(this.settings.lblDisplayExecVenueFavs()); }

  lblDisplayExecVenueColours() { return this.elmtProc.getEl(this.settings.lblDisplayExecVenueColours()); }

  lblDisplayClsDefaults() { return this.elmtProc.getEl(this.settings.lblDisplayClsDefaults()); }

  lblDisplayTailorMenu() { return this.elmtProc.getEl(this.settings.lblDisplayTailorMenu()); }

  lblDisplayClientManagerMenu() { return this.elmtProc.getEl(this.settings.lblDisplayClientManagerMenu()); }

  lblDisplayGeneralMenu() { return this.elmtProc.getEl(this.settings.lblDisplayGeneralMenu()); }

  lblDisplayFWDTradeCaptureMenu() { return this.elmtProc.getEl(this.settings.lblDisplayFWDTradeCaptureMenu()); }

  ddlDefaultPage() { return this.elmtProc.getEl(this.settings.ddlDefaultPage()); }

  ddlDefaultPageVal() { return this.elmtProc.getEl(this.settings.ddlDefaultPageVal()); }

  liDefaultPage(defaultPage) { return this.elmtProc.getEl(this.settings.liDefaultPage(defaultPage)); }

  ulDefaultPage() { return this.elmtProc.getEl(this.settings.ulDefaultPage()); }
}
module.exports = SettingsPageObject;
