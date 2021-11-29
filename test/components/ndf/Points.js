/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs.js');
const PointsPageObject = require('../../pageobjects/ndf/components/PointsPageObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class Points {
  constructor() {
    this.log = new Logs();
    this.pointsPage = new PointsPageObject();
    this.watch = new StopWatch();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
  }

  inputPoints(points) {
    this.clickActions.click(this.pointsPage.txtPoints());
    this.inputActions.clearByBackSpace(this.pointsPage.txtPoints().getValue().length);
    this.inputActions.inputValue(this.pointsPage.txtPoints(), points);
    this.keyboardActions.enterKeys('Enter');
  }

  hoverPoints() {
    // eslint-disable-next-line radix
    this.mouseActions.hoverElement(parseInt(this.pointsPage.txtPoints().getLocation('x')), parseInt(this.pointsPage.txtPoints().getLocation('y')));
  }

  getPoints() {
    let returnValue = '';
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getVal(this.pointsPage.txtPoints());
      if (returnValue !== '') {
        return returnValue;
      }
    }
    return returnValue;
  }

  isPointsFocused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.pointsPage.lblPoints(), 'class');
      if (attValue.includes('ant-input-number-focused')) {
        this.log.log('Focus is on Points');
        return true;
      }
      this.log.log('Focus is not shifted to Points.');
    }
    this.log.log('Still Focus is not on the Points Field.');
    return false;
  }

  getFieldValidationText(text) {
    let returnValue = '';
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.pointsPage.lblInputValidate(text));
      if (returnValue !== '' && returnValue !== null) {
        return returnValue;
      }
    }
    return returnValue;
  }
}
module.exports = Points;
