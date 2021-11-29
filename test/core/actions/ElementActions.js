const Logs = require('../utility/Logs.js');

class ElementActions {
  constructor() {
    this.log = new Logs();
  }

  getAttribute(element, attributeName) {
    try {
      return element.getAttribute(attributeName);
    } catch (e) {
      this.log.errorLog(`Error while finding the attribute : ${e}`);
      return null;
    }
  }

  getCssProperty(element, cssProperty) {
    try {
      return element.getCssProperty(cssProperty);
    } catch (e) {
      this.log.errorLog(`Error while finding the css property.${e}`);
      return '';
    }
  }

  getHTML(element) {
    try {
      return element.getHTML();
    } catch (e) {
      this.log.errorLog(`Error while finding the HTML DOM Value of the element ${e}`);
      return '';
    }
  }

  getLocation(element) {
    try {
      return element.getLocation();
    } catch (e) {
      this.log.errorLog(`Error while finding the coordinate : ${e}`);
      return '';
    }
  }

  getCoordinate(element, coordinate) {
    try {
      return element.getLocation(coordinate);
    } catch (e) {
      this.log.errorLog(`Error while finding the coordinate : ${coordinate}`);
      return '';
    }
  }

  getProperty(element, property) {
    try {
      return element.getProperty(property);
    } catch (e) {
      this.log.errorLog(`Error while finding the property ${property} : ${e}`);
      return '';
    }
  }

  getSize(element) {
    try {
      return element.getSize();
    } catch (e) {
      this.log.errorLog(`Error while finding the size of the element :${e}`);
      return '';
    }
  }

  getTagName(element) {
    try {
      return element.getTagName();
    } catch (e) {
      this.log.errorLog(`Error while finding the tagName : ${e}`);
      return '';
    }
  }

  isDisplayed(element) {
    try {
      return element.isDisplayed();
    } catch (e) {
      this.log.errorLog(`Error while checking the element is Displayed : ${e}`);
      return false;
    }
  }

  isEnabled(element) {
    try {
      return element.isEnabled();
    } catch (e) {
      this.log.errorLog(`Error while checking the element is Enabled : ${e}`);
      return false;
    }
  }

  isAvailable(element) {
    try {
      return element.isExisting();
    } catch (e) {
      this.log.errorLog(`Error while checking the element is existing in the DOM : ${e}`);
      return false;
    }
  }

  isFocused(element) {
    try {
      return element.hasFocus();
    } catch (e) {
      this.log.errorLog(`Error while finding the focus of the element : ${e}`);
      return undefined;
    }
  }

  isSelected(element) {
    try {
      return element.isSelected();
    } catch (e) {
      this.log.errorLog(`Error while checking the element is selected : ${e}`);
    }
    return null;
  }

  isInViewPort(element) {
    try {
      return element.isDisplayedInViewport();
    } catch (e) {
      this.log.errorLog(`Error while checking Displayed In View Port : ${e}`);
    }
    return null;
  }

  waitforVal(element, timeOut) {
    try {
      element.waitUntil(function getText() {
        return this.getText() !== '';
      }, {
        timeout: timeOut,
        timeoutMsg: `Value not displayed even after ${timeOut}s`,
      });
      // return element.waitForValue(timeOut);
    } catch (e) {
      this.log.errorLog(`Error while waiting for the value : ${e}`);
      return undefined;
    }
    this.log.errorLog('Error while waiting for the value');
    return undefined;
  }

  waitForDisplayed(element) {
    try {
      element.waitForDisplayed({ timeOut: 20000 });
    } catch (e) {
      this.log.errorLog(`Error while waiting for the value : ${e}`);
    }
  }

  isElementClose(elementObject) {
    if (elementObject === null || elementObject === undefined) {
      this.log.errorLog('Given Element is closed.');
      return true;
    }
    return false;
  }

  isElementAvailable(elementObject) {
    if (elementObject === null || elementObject === undefined) {
      this.log.errorLog('Given Element is not Available.');
      return false;
    }
    return true;
  }
}

module.exports = ElementActions;
