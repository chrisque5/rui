const Logs = require('../core/utility/Logs');
const PopUpNavigationPageObject = require('../pageobjects/PopUpNavigationPageObject');
const StopWatch = require('../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  WindowActions,
} = require('../core/actions/ActionsIndex.js');

class PopUpNavigationModel {
  constructor() {
    this.log = new Logs();
    this.popUpNav = new PopUpNavigationPageObject();
    this.watch = new StopWatch();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.windowActions = new WindowActions();
  }

  getPopUpMessage(message) {
    let returnValue = '';
    this.watch.startStopWatch(22);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.popUpNav.popUpMessage());
      this.log.log(`Notification Message is : ${returnValue}`);
      if (returnValue.includes(message)) {
        return returnValue;
      }
    }
    return returnValue;
  }

  getPopUpDescription(message) {
    let returnValue = '';
    this.watch.startStopWatch(30);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.popUpNav.popUpDescription());
      this.log.log(`Notification Description is : ${returnValue}`);
      if (returnValue.includes(message)) {
        return returnValue;
      }
    }
    return returnValue;
  }

  getPopUpDescriptionAvailable() {
    let returnValue = '';
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.popUpNav.availPopUpDescription());
      this.log.log(`Notification Message is : ${returnValue}`);
    }
    return returnValue;
  }

  closePopUpMessage() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const elementId = this.popUpNav.isrestbtnPopUpClose();
      if (elementId === null) {
        this.log.log('Pop up is closed.');
        return true;
      }
      this.clickActions.clickByJScriptRest(elementId);
      this.log.log('Pop up is not closed, trying to close again.');
    }
    this.log.log('Pop is not closed yet.');
    return false;
  }

  closeAllPopUpMessage() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const elementId = this.popUpNav.isrestbtnPopUpCloseAll();
      if (elementId === null) {
        this.log.log('Pop ups are all closed.');
        return true;
      }
      this.clickActions.clickByJScriptRest(elementId);
      this.log.log('Pop ups are not closed, trying to close again.');
    }
    this.log.log('Pop ups are not closed yet.');
    return false;
  }

  isPopUpMessageClose(elementObject) {
    return this.isElementClose(elementObject);
  }

  isElementClose(elementObject) {
    if (elementObject === null || elementObject === undefined || this.elementActions.isDisplayed(elementObject) === false) {
      this.log.log('Given Element is closed.');
      return true;
    }
    return false;
  }

  isElementAvailable(elementObject) {
    if (elementObject !== null && elementObject !== undefined) {
      this.log.log('Given Element is present.');
      return true;
    }
    return false;
  }

  getErrorMessage() {
    const errorMessage = this.textActions.getTxt(this.popUpNav.txtError());
    this.log.log(`Error Message is : ${errorMessage}`);
    return errorMessage;
  }

  clickReturnLogin() {
    this.clickActions.click(this.popUpNav.lnkReturnLogin());
  }

  closeFavPopUpMessage() {
    const localWatch = new StopWatch();
    localWatch.startStopWatch(10);
    while (localWatch.isWatchRunning()) {
      const elementId = this.popUpNav.btnHotListCloseVisible();
      if (elementId !== null) {
        // this.clickActions.clickByJScript(this.popUpNav.btnHotListClose());
        this.clickActions.clickByJScriptRest(elementId);
        this.watch.startStopWatch(3);
        while (this.watch.isWatchRunning()) {
          if (this.popUpNav.btnHotListCloseVisible() === null) {
            this.log.log('Hot List Pop up is closed.');
            return true;
          }
        }
      }
      this.log.log('Hot List Pop up is not closed, trying to close again.');
      this.windowActions.pause(200);
    }
    return false;
  }

  closeConfirmationPopUpMessage() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      const elementId = this.popUpNav.btnRestConfirmationClose();
      if (elementId === null) {
        this.log.log('Confirmation Pop up is closed.');
        return true;
      }
      this.log.log('Confirmation Pop up is not closed, trying to close again.');
      this.clickActions.clickByJScriptRest(elementId);
      this.windowActions.pause(200);
    }
    this.log.log('Confirmation Pop is not closed yet.');
    return false;
  }

  verifyNoPopUpMessage() {
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.popUpNav.popUpMessage()) === true) {
        this.log.log('Confirmation error message Pop up is not visible.');
        return true;
      }
    }
    this.log.log('Confirmation error message Pop displayed, test failed.');
    return false;
  }

  verifyPopUpMessageTimeOut() {
    this.watch.startStopWatch(6);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.popUpNav.popUpMessage()) === true) {
        this.log.log('Confirmation error message Pop up is not visible.');
        return true;
      }
    }
    this.log.log('Confirmation error message Pop up is still displayed, test failed.');
    return false;
  }

  getPopUpMessageText() {
    return this.textActions.getTxt(this.popUpNav.lblHotListPopUpMessage());
  }

  dblClickPopUpMessageText() {
    return this.clickActions.dblClick(this.popUpNav.popUpDescription());
  }
}
module.exports = PopUpNavigationModel;
