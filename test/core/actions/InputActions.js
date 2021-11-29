/* eslint-disable no-undef */
const Logs = require('../utility/Logs.js');

class InputActions {
  constructor() {
    this.log = new Logs();
  }

  inputValue(element, value) {
    try {
      this.log.log(`Going to Input Value : ${value}`);
      if (element !== null && element !== undefined) {
        element.setValue(value);
        this.log.log(`${value} is entered successfully.`);
      } else {
        throw new Error('Element is null or undefined while entering the value.');
      }
    } catch (e) {
      this.log.errorLog(`Error while entering value : ${e}`);
    }
  }

  clearValue(element) {
    try {
      element.clearValue();
    } catch (e) {
      this.log.errorLog(`Error while clearing the value : ${e}`);
    }
  }

  clearByBackSpace(backSpaceNumber) {
    try {
      for (let i = 0; i <= backSpaceNumber; i += 1) {
        browser.keys(['Backspace']);
        browser.keys(['Delete']);
      }
    } catch (error) {
      this.log.errorLog('Error while entering backspace key.');
    }
  }

  elementClear(element) {
    try {
      element.clearElement();
    } catch (e) {
      this.log.errorLog(`Error while clearing the value : ${e}`);
    }
  }

  inputByJScript(element, val) {
    try {
      browser.execute('arguments[0].setAttribute("value", arguments[1]);', element, val);
    } catch (e) {
      this.log.errorLog(`Error while input by javascript ${e}`);
    }
  }
}
module.exports = InputActions;
