/* eslint-disable class-methods-use-this */
const Logs = require('../utility/Logs.js');

const log = new Logs();

class SelectActions {
  selectByAttribute(element, attName, attValue) {
    try {
      element.selectByAttribute(attName, attValue);
    } catch (e) {
      log.errorLog(`Error While Selecting the attribute : ${attName} with Value : ${attValue}`);
    }
  }

  selectByIndex(element, indexNumber) {
    try {
      element.selectByIndex(indexNumber);
    } catch (e) {
      log.errorLog(`Error while selecting the index number : ${e}`);
    }
  }

  selectByVisibleText(element, visibleText) {
    try {
      element.selectByVisibleText(visibleText);
    } catch (e) {
      log.errorLog(`Error while selecting the index number : ${e}`);
    }
  }

  isSelected(element) {
    try {
      element.isSelected();
    } catch (e) {
      log.errorLog(`Error while checking the selection of radio/option/checkbox  : ${e}`);
    }
  }
}

module.exports = SelectActions;
