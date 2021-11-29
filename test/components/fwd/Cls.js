const Logs = require('../../core/utility/Logs.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const ClsPageObject = require('../../pageobjects/fwd/components/ClsPageObject.js');
const { ClickActions, ElementActions } = require('../../core/actions/ActionsIndex.js');

class Cls {
  constructor() {
    this.log = new Logs();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.clsPage = new ClsPageObject();
    this.watch = new StopWatch();
  }

  selectCls1() {
    if (!this.isCls1Selected()) {
      this.clickActions.click(this.clsPage.chkCls1());
    } else {
      this.log.log('Cls is already selected.');
    }
  }

  selectCls2() {
    if (!this.isCls2Selected()) {
      this.clickActions.click(this.clsPage.chkCls2());
    } else {
      this.log.log('Cls is already selected.');
    }
  }

  deSelectCls1() {
    if (this.isCls1Selected()) {
      this.clickActions.click(this.clsPage.chkCls1());
    } else {
      this.log.log('Cls is already deselected.');
    }
  }

  deSelectCls2() {
    if (this.isCls2Selected()) {
      this.clickActions.click(this.clsPage.chkCls2());
    } else {
      this.log.log('Cls is already deselected.');
    }
  }

  isCls1Selected() {
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      const chkState = this.elementActions.getAttribute(this.clsPage.chkClsState1(), 'class');
      if (chkState.includes('ant-checkbox-checked')) {
        this.log.log('CLS1 checkbox is checked');
        return true;
      }
      this.log.log('CLS1 checkbox is still not checked');
    }
    this.log.log('CLS1 checkbox is not checked');
    return false;
  }

  isCls2Selected() {
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      const chkState = this.elementActions.getAttribute(this.clsPage.chkClsState2(), 'class');
      if (chkState.includes('ant-checkbox-checked')) {
        this.log.log('CLS2 checkbox is checked');
        return true;
      }
      this.log.log('CLS2 checkbox is still not checked');
    }
    this.log.log('CLS2 checkbox is not checked');
    return false;
  }
}
module.exports = Cls;
