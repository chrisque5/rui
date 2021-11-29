const Constants = require('../../data/Constants.js');

class Logs {
  constructor() {
    this.isDisplayed = Constants.DISPLAYLOGS;
    this.isPipeline = Constants.PIPELINE;
  }

  log(message) {
    if (this.isDisplayed && !this.isPipeline) {
      // eslint-disable-next-line no-console
      console.log(`Log ${new Date().toLocaleString('en-US')} : ${message}`);
    }
  }

  errorLog(message) {
    if (this.isDisplayed) {
      // eslint-disable-next-line no-console
      console.log(`Log ${new Date().toLocaleString('en-US')} : ${message}`);
    }
  }

  e2eLog(message) {
    if (!this.isDisplayed) {
      // eslint-disable-next-line no-console
      console.log(`Log ${new Date().toLocaleString('en-US')} : ${message}`);
    }
  }
}
module.exports = Logs;
