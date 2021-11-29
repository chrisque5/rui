/* eslint-disable no-undef */
const Logs = require('../utility/Logs.js');

class ElementFinder {
  constructor() {
    this.log = new Logs();
  }

  getElement(info) {
    try {
      this.log.log(`Finding new element by using info : ${info}`);
      const val = $(info);
      if (val.error !== undefined) {
        this.log.errorLog(`Error while finding the element from the DOM/WebPage : ${val.error.message}`);
        return null;
      }
      this.log.log(`Returning value : ${JSON.stringify(val.selector)}`);
      return val;
    } catch (e) {
      this.log.errorLog(`Error while finding the element from the DOM/WebPage : ${e}`);
    }
    return null;
  }

  getChildElement(element, info) {
    try {
      this.log.log(`Finding new child element by using info : ${info}`);
      const val = element.$(info);
      if (val.error !== undefined) {
        this.log.errorLog(`Error while finding the child element from the DOM/WebPage : ${val.error.message}`);
        return null;
      }
      return val;
    } catch (e) {
      this.log.errorLog(`Error while finding the child element from the DOM/WebPage : ${e}`);
    }
    return null;
  }

  getChildElements(element, info) {
    try {
      this.log.log(`Finding new child element by using info : ${info}`);
      const val = element.$$(info);
      if (val.error !== undefined) {
        this.log.errorLog(`Error while finding the child element from the DOM/WebPage : ${val.error.message}`);
        return null;
      }
      return val;
    } catch (e) {
      this.log.errorLog(`Error while finding the child element from the DOM/WebPage : ${e}`);
    }
    return null;
  }

  getElements(info) {
    try {
      this.log.log(`Finding new elements by using info : ${info}`);
      return $$(info);
    } catch (e) {
      this.log.errorLog(`Error while finding the element from the DOM/WebPage : ${e}`);
    }
    return null;
  }

  findElements(info) {
    try {
      this.log.log(`Finding new elements by using info : ${info}`);
      // return $$(info);
      const elements = browser.findElements('xpath', info);
      return elements;
    } catch (e) {
      this.log.errorLog(`Error while finding the element from the DOM/WebPage : ${e}`);
    }
    return null;
  }
}
module.exports = ElementFinder;
