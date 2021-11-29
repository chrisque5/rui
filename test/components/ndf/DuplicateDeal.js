/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs.js');
const DuplicateDealObject = require('../../pageobjects/ndf/components/DuplicateDealObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex.js');

class DuplicateDeal {
  constructor() {
    this.log = new Logs();
    this.duplicateDealPage = new DuplicateDealObject();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.windowActions = new WindowActions();
    this.watch = new StopWatch();
  }  

  isDuplicateDealModalVisible() {
    const element = this.duplicateDealPage.modalDuplicateDeal();
    if (element !== null && element !== undefined) {
      return true;
    }
    return false;
  }

  isDuplicateDealModalClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      this.windowActions.pause(500);
      if (this.isDuplicateDealModalVisible() === false) {
        this.log.log('Duplicate Deal Modal is closed.');
        return true;
      }
    }
    this.log.log('Duplicate Deal Modal is not closed yet.');
    return false;
  }

  duplicateDealCancel() {
    this.clickActions.clickByJScript(this.duplicateDealPage.btnCancel());
  }

  duplicateDealSubmitAgain() {
    this.clickActions.clickByJScript(this.duplicateDealPage.btnSubmitAgain());
  }
}
module.exports = DuplicateDeal;
