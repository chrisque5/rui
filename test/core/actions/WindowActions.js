/* eslint-disable no-undef */
const Logs = require('../utility/Logs.js');
const KeyboardActions = require('./KeyboardActions.js');

class WindowActions {
  constructor() {
    this.log = new Logs();
    this.keyboardActions = new KeyboardActions();
  }

  scrollInToView(element) {
    try {
      element.scrollInToView();
    } catch (e) {
      this.log.errorLog(`Error while scrolling in to the view : ${e}`);
    }
  }

  scroll(element) {
    try {
      browser.execute((elmt) => {
        elmt.scrollIntoView();
      }, element);
    } catch (e) {
      this.log.errorLog(`Error while scroll in to the page : ${e}`);
    }
  }

  scrollRight(element, px) {
    try {
      browser.execute(`arguments[0].scrollLeft +=${px};`, element);
    } catch (e) {
      this.log.errorLog(`Error while move horizontal by javascript ${e}`);
    }
  }

  scrollLeft(element, px) {
    try {
      browser.execute(`arguments[0].scrollLeft -=${px};`, element);
    } catch (e) {
      this.log.errorLog(`Error while move horizontal by javascript ${e}`);
    }
  }

  scrollUp(element, px) {
    try {
      browser.execute(`arguments[0].scrollBy(0,-${px});`, element);
    } catch (e) {
      this.log.errorLog(`Error while move Vertical by javascript ${e}`);
    }
  }

  scrollDown(element, px) {
    try {
      browser.execute(`arguments[0].scrollBy(0,${px});`, element);
    } catch (e) {
      this.log.errorLog(`Error while move Vertical by javascript ${e}`);
    }
  }

  scrollLeftPos(element) {
    try {
      browser.execute('arguments[0].scrollLeft;', element);
    } catch (e) {
      this.log.errorLog(`Error while finding scrollleft ${e}`);
    }
  }

  openUrl(url) {
    try {
      browser.url(url);
    } catch (e) {
      this.log.errorLog(`Error while opening the URL : ${e}`);
    }
  }

  getUrl() {
    try {
      const url = browser.getUrl();
      this.log.errorLog(`Fetched URL : ${url}`);
      return url;
    } catch (e) {
      this.log.errorLog(`Error while opening the URL : ${e}`);
    }
    return undefined;
  }

  switchWindow(url) {
    try {
      this.log.errorLog(`Switching window to : ${url}`);
      browser.switchWindow(url);
    } catch (error) {
      this.log.errorLog(`Error while switching window/tab : ${error}`);
    }
  }

  switchToWindow(handle) {
    try {
      this.log.errorLog(`Switching window to : ${handle}`);
      browser.switchToWindow(handle);
    } catch (error) {
      this.log.errorLog(`Error while switching window/tab : ${error}`);
    }
  }

  getWindowHandle() {
    try {
      const handle = browser.getWindowHandle();
      this.log.errorLog(`Fetched window handles ${handle}`);
      return handle;
    } catch (error) {
      this.log.errorLog(`Error while fetching window handles : ${error}`);
    }
    return undefined;
  }

  getWindowHandles() {
    try {
      const handles = browser.getWindowHandles();
      this.log.errorLog(`Fetched window handles ${handles}`);
      return handles;
    } catch (error) {
      this.log.errorLog(`Error while fetching window handles : ${error}`);
    }
    return undefined;
  }

  newWindow(url) {
    try {
      this.log.errorLog(`Opening new window with URL : ${url}`);
      browser.newWindow(url);
    } catch (error) {
      this.log.errorLog(`Error while opening window : ${error}`);
    }
  }

  newWindowByJScript(url) {
    try {
      this.log.errorLog(`Opening new window with URL : ${url}`);
      browser.execute((URL) => {
        window.open(URL);
      }, url);
    } catch (error) {
      this.log.errorLog(`Error while opening window : ${error}`);
    }
  }

  closeCurrentTab() {
    try {
      this.log.errorLog('Closing current tab');
      browser.execute('window.close()');
    } catch (error) {
      this.log.errorLog(`Error while closing tab : ${error}`);
    }
  }

  moveToObject(element) {
    try {
      browser.moveToObject(element);
    } catch (error) {
      this.log.errorLog(`Error while moving to the object.${error}`);
    }
  }

  browserLanguage() {
    try {
      return browser.execute(() => navigator.language);
    } catch (error) {
      this.log.errorLog(`Error while finding the browser language : ${error}`);
    }
    return undefined;
  }

  refreshPage() {
    try {
      browser.refresh();
    } catch (error) {
      this.log.errorLog(`Error while refreshing the page : ${error}`);
    }
  }

  pause(mills) {
    try {
      browser.pause(mills);
    } catch (error) {
      this.log.errorLog(`Error while refreshing the page : ${error}`);
    }
  }

  getSessionId() {
    const session = browser.sessionId;
    this.log.log(`Current session id is : ${session}`);
    return session;
  }

  getCookies() {
    const session = browser.getCookies();
    this.log.log(`All cookies are : ${session[0].value}`);
    return session;
  }

  getCurrentJsessionId() {
    const sessionId = browser.getCookies(['JSESSIONID']);
    this.log.log(`sessionId value is : ${JSON.stringify(sessionId)}`);
    const jsession = `JSESSIONID=${sessionId[0].value}`;
    this.log.log(`Cookie value is : ${jsession}`);
    return jsession;
  }
}

module.exports = WindowActions;
