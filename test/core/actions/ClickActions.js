/* eslint-disable no-undef */
/* eslint-disable max-len */
const Logs = require('../utility/Logs.js');
const ApiClient = require('../../api/ApiClient');
const WindowActions = require('../actions/WindowActions');

class ClickActions {
  constructor() {
    this.log = new Logs();
    this.api = new ApiClient();
    this.winActions = new WindowActions();
  }

  click(element) {
    try {
      element.click();
    } catch (e) {
      this.log.errorLog(`Error while click on the element ${e}`);
    }
  }

  // To DO
  clickByJScript(element) {
    try {
      browser.execute('arguments[0].click();', element);
      this.log.log('Clicked by JavaScript.');
    } catch (e) {
      this.log.errorLog(`Error while click by javascript ${e}`);
    }
  }

  clickByJScriptRest(elementId) {
    try {
      const scriptValue = 'arguments[0].click();';
      const data = { script: scriptValue, args: [{ ELEMENT: elementId }] };
      const session = this.winActions.getSessionId();
      const visible = browser.call(async () => this.callRestJScriptApi(session, data));
      if (visible.status !== undefined && visible.status === 200) {
        this.log.log('Successfully Click by Jscript rest call.');
      }
    } catch (e) {
      log.errorLog(`Error while checking the visibility of element : ${e}`);
    }
  }

  async callRestJScriptApi(session, data) {
    let val;
    const url = `http://127.0.0.1:9515/session/${session}/execute`;
    // http://127.0.0.1:9515/session/08217ab0db6db47a937c8154b83ac6b1/execute
    try {
      val = await this.api.request(url, 'POST', data)
        .then(response => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while execute the rest call : ${error}`);
    }
    return Promise.resolve(val);
  }

  dblClick(element) {
    try {
      element.doubleClick();
    } catch (e) {
      this.log.errorLog(`Error while double click on the element ${e}`);
    }
  }

  rightClick(element) {
    try {
      // browser.rightClick(element.selector);
      element.click({ button: 'right' });
    } catch (error) {
      this.log.errorLog(`Error while performing the right click. ${error}`);
    }
  }
}
module.exports = ClickActions;
