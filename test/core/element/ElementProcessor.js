/* eslint-disable radix */
/* eslint-disable class-methods-use-this */

const Logs = require('../utility/Logs.js');
const StopWatch = require('../utility/StopWatch.js');
const ElementFinder = require('./ElementFinder.js');
const ElementVisibility = require('./ElementVisibility.js');
const ApiClient = require('../../api/ApiClient');

const log = new Logs();
const watch = new StopWatch();
const elFinder = new ElementFinder();
const elVisibility = new ElementVisibility();
const api = new ApiClient();

class ElementProcessor {
  getEl(info) {
    log.log('======================== Processing New Element =======================');
    log.log(`Finding the New Element on the page with information : ${info}`);
    const values = info.split('@@');
    if (values.length === 2) {
      let element = null;
      const visibility = values[1].split('||')[0];
      const maxTime = values[1].split('||')[1];
      log.log(`Maximum wait time is :${parseFloat(maxTime)}`);
      watch.startStopWatch(parseFloat(maxTime));
      while (watch.isWatchRunning() && (element === null)) {
        try {
          log.log(`Element Info is  : ${values[0]}`);
          element = elFinder.getElement(values[0]);
          log.log('Going to check the visiblity of element.');
          if (element !== null && elFinder !== undefined) {
            if (elVisibility.checkVisibility(element, visibility, parseFloat(maxTime))) {
              log.log(`Found and Validate the visibility (${visibility}) of the Element .`);
              log.log('======================== Finished Element Processing =======================');
              return element;
            }
            element = null;
          } else {
            log.log('Element is still Null/undefined/NoSuchElement. continue searching for the element.');
            element = null;
          }
        } catch (e) {
          log.errorLog(`Error while finding the element : ${e}`);
          element = null;
        }
      }
      log.errorLog('======================== Finished Process Not Able To Find Element =======================');
      return null;
    }
    log.errorLog(`Please check the element information : ${info}`);

    return null;
  }

  getElWithoutCheck(info) {
    log.log('======================== Processing New Element Without Checks =======================');
    log.log(`Finding the New Element on the page with information : ${info}`);
    const values = info.split('@@');
    if (values.length === 2) {
      const element = values[0];
      log.log(`Returning element with the selector : ${element}`);
      return element;
    }
    return null;
  }

  getChildElement(element, selector) {
    log.log('======================== Processing Child Element From Parent =======================');
    try {
      return elFinder.getChildElement(element, selector);
    } catch (error) {
      log.log(`Error while finding the child element : ${error}`);
    }
    return null;
  }

  getChildElements(element, selector) {
    log.log('======================== Processing Child Element From Parent =======================');
    try {
      return elFinder.getChildElements(element, selector);
    } catch (error) {
      log.log(`Error while finding the child element : ${error}`);
    }
    return null;
  }

  getElements(info) {
    log.log('======================== Processing New Elements =======================');
    log.log(`Finding the New Element on the page with information : ${info}`);
    const values = info.split('@@');
    if (values.length === 2) {
      let elements = null;
      const visibility = values[1].split('||')[0];
      const maxTime = values[1].split('||')[1];
      watch.startStopWatch(parseFloat(maxTime));
      while (watch.isWatchRunning() && (elements === null || elements.error !== undefined)) {
        try {
          log.log(`Elements Info is  : ${values[0]}`);
          elements = elFinder.getElements(values[0]);
          if (elements !== null && elFinder !== undefined && elements.error === undefined) {
            if (elVisibility.checkVisibility(elements[0], visibility, parseFloat(maxTime))) {
              log.log(`Found and Validate the visibility (${visibility}) of the Element .`);
              log.log('======================== Finished Element Processing =======================');
              return elements;
            }
            elements = null;
          } else {
            log.log('Elements is still Null/undefined/NoSuchElement. continue searching for the element.');
          }
        } catch (e) {
          log.errorLog(`Error while finding the elements : ${e}`);
        }
      }
      log.errorLog('======================== Finished Process Not Able To Find Elements =======================');
      return elements;
    }
    log.errorLog(`Please check the elements information : ${info}`);

    return null;
  }

  findElements(info) {
    log.log('======================== Processing New Elements =======================');
    log.log(`Finding the New Element on the page with information : ${info}`);
    const values = info.split('@@');
    if (values.length === 2) {
      let elements = null;
      const visibility = values[1].split('||')[0];
      const maxTime = values[1].split('||')[1];
      elements = elFinder.findElements(values[0]);
      return elements;
    }
    log.errorLog(`Please check the elements information : ${info}`);

    return null;
  }

  getRestElement(info, selector) {
    log.log('======================== Processing New Elements =======================');
    log.log(`Finding the New Element on the page with information : ${info}`);
    const values = info.split('@@');
    if (values.length === 2) {
      let element = null;
      const visibility = values[1].split('||')[0];
      const maxTime = values[1].split('||')[1];

      log.log(`Elements Info is  : ${values[0]}`);
      element = elFinder.getElements(values[0]);
      const data = { using: selector, value: values[0] };
      const session = browser.sessionId;
      element = browser.call(async () => this.callElementApi(session, data));
      if (element !== undefined) {
        const el = element.data.value.ELEMENT;
        const visible = elVisibility.checkVisibilityByRest(el, visibility, maxTime);
        if (visible === true) {
          return el;
        }
      }
      return null;
    }
    return null;
  }

  async callElementApi(session, data) {
    let val;
    const url = `http://127.0.0.1:9515/session/${session}/element`;
    try {
      val = await api.request(url, 'POST', data)
        .then(response => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while start the listener Api : ${error}`);
    }
    return Promise.resolve(val);
  }

  async callIsDisplayApi(session, data) {
    let val;
    const url = `http://127.0.0.1:9515/session/${session}/element`;
    try {
      val = await api.request(url, 'GET', data)
        .then(response => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while start the listener Api : ${error}`);
    }
    return val;
  }
}
module.exports = ElementProcessor;
