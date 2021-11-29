/* eslint-disable no-undef */
const Logs = require('../utility/Logs.js');

class KeyboardActions {
  constructor() {
    this.log = new Logs();
  }

  enterKeys(key) {
    try {
      browser.keys([key]);
    } catch (e) {
      this.log.errorLog(`Error while pressing the key ${key} with exception : ${e}`);
    }
  }
}
module.exports = KeyboardActions;
