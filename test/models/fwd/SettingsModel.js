const Settings = require('../../components/fwd/Settings');

class SettingsyModel {
  constructor() {
    this.settings = new Settings();
  }

  /** ********************************* Strategy ***************************** */

  clickCls1() { this.settings.clickCls1(); }

  clickCls2() { this.settings.clickCls2(); }

  /** ***************************** Strategy End *************************** */
}
module.exports = SettingsyModel;
