/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
class SettingsPropertyProvider {
  constructor() {
    this.value = '';
  }

  btnSettings() { this.value = '[data-testid="btnSettings"]@@Enabled_And_Visible||10'; return this.value; }

  pageMask() { this.value = '//div[contains(@class,"ant-modal-mask")]@@Enabled_And_Visible||.5'; return this.value; }

  chkRatesSwitch() { this.value = '[data-testid="chkSwitch-ratesFeed"]@@Enabled_And_Visible||2'; return this.value; }

  chkLRMode() { this.value = '[data-testid="chkSwitch-lrMode"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayFirmFavs() { this.value = '[data-testid="chkSwitch-displayClients"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayTraderFavs() { this.value = '[data-testid="chkSwitch-displayClientFavourites"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayCurrencyFavs() { this.value = '[data-testid="chkSwitch-displayCurrencyFavourites"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayTermFavs() { this.value = '[data-testid="chkSwitch-displayTermFavourites"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayExecVenueFavs() { this.value = '[data-testid="chkSwitch-displayExecutionVenueFavourites"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayExecVenueColours() { this.value = '[data-testid="chkSwitch-displayExecutionVenueColours"]@@Enabled_And_Visible||2'; return this.value; }

  chkDisplayClsDefaults() { this.value = '[data-testid="chkSwitch-displayClsDefaults"]@@Enabled_And_Visible||2'; return this.value; }

  lblRatesSwitch() { return '[data-testid="chkSwitch-ratesFeed"]@@havetext||2'; }

  lblLRMode() { return '[data-testid="chkSwitch-lrMode"]@@havetext||2'; }

  lblDisplayFirmFavs() { return '[data-testid="chkSwitch-displayClients"]@@havetext||2'; }

  lblDisplayTraderFavs() { return '[data-testid="chkSwitch-displayClientFavourites"]@@havetext||2'; }

  lblDisplayCurrencyFavs() { return '[data-testid="chkSwitch-displayCurrencyFavourites"]@@havetext||2'; }

  lblDisplayTermFavs() { return '[data-testid="chkSwitch-displayTermFavourites"]@@havetext||2'; }

  lblDisplayExecVenueFavs() { return '[data-testid="chkSwitch-displayExecutionVenueFavourites"]@@havetext||2'; }

  lblDisplayExecVenueColours() { return '[data-testid="chkSwitch-displayExecutionVenueColours"]@@havetext||2'; }

  lblDisplayClsDefaults() { return '[data-testid="chkSwitch-displayClsDefaults"]@@havetext||2'; }

  lblDisplayTailorMenu() { return '//div[@role="tab" and contains(text(),"Tailor Rates Feed")]@@Enabled_And_Visible||4'; }

  lblDisplayClientManagerMenu() { return '//div[@role="tab" and contains(text(),"Client Manager")]@@Enabled_And_Visible||4'; }

  lblDisplayGeneralMenu() { return '//div[@role="tab" and contains(text(),"General")]@@Enabled_And_Visible||4'; }

  lblDisplayFWDTradeCaptureMenu() { return '//div[@role="tab" and contains(text(),"FWD Trade Capture")]@@Enabled_And_Visible||4'; }

  ddlDefaultPage() { return '//div[@data-testid="select-defaultEntryPage"]/span[@class="ant-select-arrow"]@@Enabled_And_Visible||2'; }

  ddlDefaultPageVal() { return '//div[@data-testid="select-defaultEntryPage"]//span[contains(@class,"ant-select-selection-item")]@@Enabled_And_Visible||2'; }

  liDefaultPage(defaultPage) { return `${'//div[@class="ant-select-item-option-content" and text()="TEMP"]'.replace('TEMP', defaultPage)}@@Enabled_And_Visible||10`; }

  ulDefaultPage() { return '//div[contains(@class,"ant-select-dropdown")]@@Enabled_And_Visible||2'; }

  btnBack() { this.value = '[data-testid="btnBack"]@@Enabled_And_Visible||10'; return this.value; }

  btnSave() { this.value = '[data-testid="btnSave"]@@Enabled_And_Visible||10'; return this.value; }

  btnSettingsClose() { return '.anticon anticon-close ant-modal-close-icon@@Enabled_And_Visible||1'; }

  isbtnSettingsClose() { return '.anticon anticon-close ant-modal-close-icon@@Enabled_And_Visible||.5'; }

  isDropdownClose() { return '//div[contains(@class,"ant-menu-submenu-popup") and not (contains(@class,"ant-menu-submenu-hidden"))]@@Enabled_And_Visible||.5'; }
}
module.exports = SettingsPropertyProvider;
