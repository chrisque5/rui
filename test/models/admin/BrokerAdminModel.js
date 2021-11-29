const AdminPage = require('../../pageobjects/admin/AdminPageObject');
const BrokersAdminPage = require('../../pageobjects/admin/BrokerAdminPageObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const Log = require('../../core/utility/Logs.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  WindowActions,
  KeyboardActions,
  MouseActions,
  ElementActions,
} = require('../../core/actions/ActionsIndex.js');

class BrokersAdminModel {
  constructor() {
    this.admin = new AdminPage();
    this.brokers = new BrokersAdminPage();
    this.watch = new StopWatch();
    this.log = new Log();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.windowActions = new WindowActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
    this.elementActions = new ElementActions();
  }

  clickRdoDealTypeNdf() {
    this.clickActions.clickByJScript(this.brokers.rdodealTypeNDF());
  }

  clickRdoDealTypeFwd() {
    this.clickActions.clickByJScript(this.brokers.rdodealTypeFWD());
  }

  clickRdoDealTypeSpt() {
    this.clickActions.clickByJScript(this.brokers.rdodealTypeSPT());
  }

  verifyNdfDealTypeSelected() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.rdodealTypeNDFSelect(), 'class');
      this.log.log(`NDF radio button attribute value: ${attValue}`);
      if (attValue === 'ant-radio ant-radio-checked') {
        this.log.log('NDF Deal Type successfully selected.');
        return true;
      }
      this.log.log('NDF not yet checked.');
    }
    this.log.log('NDF has not been selected.');
    return false;
  }

  verifyFwdDealTypeSelected() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.rdodealTypeFWDSelect(), 'class');
      this.log.log(`FWD radio button attribute value: ${attValue}`);
      if (attValue === 'ant-radio ant-radio-checked') {
        this.log.log('FWD Deal Type successfully selected.');
        return true;
      }
      this.log.log('FWD not yet checked.');
    }
    this.log.log('FWD has not been selected.');
    return false;
  }

  verifySptDealTypeSelected() {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.rdodealTypeSPTSelect(), 'class');
      this.log.log(`SPT radio button attribute value: ${attValue}`);
      if (attValue === 'ant-radio ant-radio-checked') {
        this.log.log('SPT Deal Type successfully selected.');
        return true;
      }
      this.log.log('SPT not yet checked.');
    }
    this.log.log('SPT has not been selected.');
    return false;
  }

  clickddlDesks() {
    // this.clickActions.clickByJScript(this.brokers.ddlBrokerDesk());
    this.mouseActions.mouseDown(this.brokers.ddlBrokerDesk());
  }

  clearddlDesks() {
    this.clickActions.clickByJScript(this.brokers.btnClearBrokerDesk());
  }

  selectDeskByClick(desk) {
    this.clearddlDesks();
    this.clickddlDesks();
    this.windowActions.scroll(this.brokers.liBrokerDesk(desk));
    this.clickActions.clickByJScript(this.brokers.liBrokerDesk(desk));
    this.verifyDropdownClose();
  }

  selectDeskByKeys(desk) {
    this.clearddlDesks();
    this.clickddlDesks();
    this.keyboardActions.enterKeys(desk.toLowerCase());
    this.keyboardActions.enterKeys('Enter');
    this.verifyDropdownClose();
  }

  getSelectedDesk() {
    return this.textActions.getTxt(this.brokers.lblBrokerDesk());
  }

  verifyDropdownClose() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.isElementClose(this.brokers.ulBrokerDesk()) === true) {
        this.log.log('Element is no more available in the dom.');
        return true;
      }
      this.log.log('Element is still visible in the element, waiting for it get close.');
    }
    this.log.log('Still Element is visible in the DOM.');
    return false;
  }

  isElementClose(elementObject) {
    if (elementObject === null || elementObject === undefined || elementObject.type === 'NoSuchElement') {
      this.log.log('Given Element is closed.');
      return true;
    }
    return false;
  }

  selectAllBrokersToAdd() {
    this.clickActions.clickByJScript(this.brokers.chkAllBrokers());
  }

  selectAllBrokersToRemove() {
    this.clickActions.clickByJScript(this.brokers.chkDMSWebBrokers());
  }

  selectBrokerToMove(broker) {
    this.clickActions.clickByJScript(this.brokers.chkBrokerToMove(broker));
  }

  clickButtonAdd() {
    this.clickActions.clickByJScript(this.brokers.btnAddBroker());
  }

  clickButtonRemove() {
    this.clickActions.clickByJScript(this.brokers.btnRemoveBroker());
  }

  addBrokerBySearch(broker, gcdId) {
    // this.clickActions.clickByJScript(this.brokers.txtAllBrokerSearch());
    // this.keyboardActions.enterKeys(broker.toLowerCase());
    this.inputActions.inputValue(this.brokers.txtAllBrokerSearch(), broker.toLowerCase());
    this.clickActions.clickByJScript(this.brokers.chkBrokerToMove(`${broker} - ${gcdId}`));
    this.clickButtonAdd();
  }

  removeBrokerBySearch(broker, gcdId) {
    // this.clickActions.clickByJScript(this.brokers.txtDMSWebBrokerSearch());
    // this.keyboardActions.enterKeys(broker.toLowerCase());
    this.inputActions.inputValue(this.brokers.txtDMSWebBrokerSearch(), broker.toLowerCase());
    this.clickActions.clickByJScript(this.brokers.chkBrokerToMove(`${broker} - ${gcdId}`));
    this.clickButtonRemove();
  }

  addBrokerByClick(broker) {
    this.selectBrokerToMove(broker);
    this.clickButtonAdd();
  }

  removeBrokerByClick(broker) {
    this.selectBrokerToMove(broker);
    this.clickButtonRemove();
  }

  verifyBrokerInList(broker, side) {
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.brokers.brokerToVerify(broker, side), 'title').includes(broker) === true) {
        this.log.log(`${broker} successfully added to ${side}`);
        return true;
      }
      this.log.log(`${broker} not yet added to ${side}`);
    }
    this.log.log(`Unable to add ${broker} to ${side}`);
    return false;
  }

  verifyAllBrokersListEmpty() {
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.ulAllBrokersEmpty(), 'class');
      this.log.log(`Transfer List attribute value: ${attValue}`);
      if (attValue === 'ant-transfer-list-body-not-found') {
        this.log.log('List is Empty.');
        return true;
      }
    }
    this.log.log('List is not Empty.');
    return false;
  }

  verifyBrokerToMoveChecked(broker) {
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.chkBrokerToMoveVerify(broker), 'class');
      this.log.log(`Broker checkbox attribute value: ${attValue}`);
      if (attValue === 'ant-checkbox-wrapper ant-checkbox-wrapper-checked ant-transfer-list-checkbox') {
        this.log.log(`${broker} checkbox has been checked`);
        return true;
      }
    }
    this.log.log(`${broker} checkbox has not been checked`);
    return false;
  }

  verifyBrokerToMoveNotChecked(broker) {
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.chkBrokerToMoveVerify(broker), 'class');
      this.log.log(`Broker checkbox attribute value: ${attValue}`);
      if (attValue !== 'ant-checkbox-wrapper ant-checkbox-wrapper-checked') {
        this.log.log(`${broker} checkbox is not checked`);
        return true;
      }
    }
    this.log.log(`${broker} checkbox is still checked`);
    return false;
  }

  verifyDMSWebBrokersListEmpty() {
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.brokers.ulDMSWebBrokersEmpty(), 'class');
      this.log.log(`Transfer List attribute value: ${attValue}`);
      if (attValue === 'ant-transfer-list-body-not-found') {
        this.log.log('List is Empty.');
        return true;
      }
    }
    this.log.log('List is not Empty.');
    return false;
  }

  btnCancelClick() {
    this.clickActions.clickByJScript(this.brokers.btnCancel());
  }

  btnApplyClick() {
    this.clickActions.clickByJScript(this.brokers.btnApply());
  }
}
module.exports = BrokersAdminModel;
