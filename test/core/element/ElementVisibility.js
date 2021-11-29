/* eslint-disable radix */
/* eslint-disable class-methods-use-this */
const Logs = require('../utility/Logs.js');
const StopWatch = require('../utility/StopWatch.js');
const ApiClient = require('../../api/ApiClient');
const WindowActions = require('../actions/WindowActions');

const log = new Logs();
const watch = new StopWatch();
const api = new ApiClient();
const winActions = new WindowActions();

class ElementVisibility {
  checkVisibility(element, condition, timeout) {
    return this.verifyVisibility(element, condition, timeout);
  }

  checkVisibilityByRest(element, condition, timeout) {
    return this.verifyVisibilityByRest(element, condition, timeout);
  }

  verifyVisibility(element, condition, timeout) {
    switch (condition.toLowerCase()) {
      case 'displayed': {
        return this.waitForDisplayed(element, timeout);
      }
      case 'clickable': {
        return this.waitForClickable(element, timeout);
      }
      case 'enabled': {
        return this.waitForEnabled(element, timeout);
      }
      case 'exist': {
        return this.waitForExist(element, timeout);
      }
      case 'enabled_and_visible': {
        return this.enableAndVisible(element, timeout);
      }
      case 'havetext': {
        return this.haveText(element, timeout);
      }
      case 'notvisible': {
        return this.notVisible(element, timeout);
      }
      default: {
        log.errorLog(`Please check the visibility condition : ${condition}`);
        return false;
      }
    }
  }

  verifyVisibilityByRest(element, condition, timeout) {
    switch (condition.toLowerCase()) {
      case 'enabled_and_visible': {
        return this.enableAndVisibleByRest(element, winActions.getSessionId(), timeout);
      }
      default: {
        log.errorLog(`Please check the visibility condition : ${condition}`);
        return false;
      }
    }
  }

  waitForDisplayed(element, timeout) {
    return element.waitForDisplayed(parseInt(timeout));
  }

  waitForClickable(element, timeout) {
    return element.waitForClickable(parseInt(timeout));
  }

  waitForEnabled(element, timeout) {
    return element.waitForEnabled(parseInt(timeout) * 1000);
  }

  waitForExist(element, timeout) {
    return element.waitForExist(parseInt(timeout));
  }

  enableAndVisible(element, timeout) {
    watch.startStopWatch(timeout);
    while (watch.isWatchRunning()) {
      try {
        log.log(`Checking if ${JSON.stringify(element.selector)} is enabled`);
        if (element.isEnabled()) {
          return true;
        }
      } catch (e) {
        log.errorLog(`Error while checking the visibility of element : ${e}`);
      }
    }
    return false;
  }

  enableAndVisibleByRest(element, session, timeout) {
    watch.startStopWatch(timeout);
    while (watch.isWatchRunning()) {
      try {
        const visible = browser.call(async () => this.callRestVisibilityApi(session, element, 'enabled'));
        if (visible.data.value !== undefined && visible.data.value === true) {
          return true;
        }
      } catch (e) {
        log.errorLog(`Error while checking the visibility of element : ${e}`);
      }
      winActions.pause(200);
    }
    return false;
  }

  notVisible(element, timeout) {
    watch.startStopWatch(timeout);
    while (watch.isWatchRunning()) {
      try {
        if (!(element.isDisplayed())) {
          return true;
        }
      } catch (e) {
        log.errorLog(`Element is still visible : ${e}`);
      }
    }
    return false;
  }

  haveText(element, timeout) {
    try {
      log.log('Validating Enable and have text at same time.');
      if ((element.isEnabled()) && ((element.getText()) !== '')) {
        return true;
      }
    } catch (e) {
      log.errorLog(`Error while checking the visibility of element : ${e}`);
    }
    return false;
  }

  async callRestVisibilityApi(session, element, condition) {
    let val;
    const url = `http://127.0.0.1:9515/session/${session}/element/${element}/${condition}`;
    //  http://127.0.0.1:9515/session/eb9cc252a7b61657293a56b0fdb99779/element/0.06625329968226401-2/enabled
    try {
      val = await api.request(url, 'GET', null)
        .then(response => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while start the listener Api : ${error}`);
    }
    return Promise.resolve(val);
  }
}
module.exports = ElementVisibility;
