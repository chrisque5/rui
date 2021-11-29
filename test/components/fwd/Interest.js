const Logs = require('../../core/utility/Logs.js');
const InterestPageObject = require('../../pageobjects/fwd/components/InterestPageObject.js');
const {
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
} = require('../../core/actions/ActionsIndex.js');

class Interest {
  constructor() {
    this.log = new Logs();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.interestPage = new InterestPageObject();
    this.keyboardActions = new KeyboardActions();
  }

  selectInterestChkBox() {
    if (this.elementActions.getAttribute(this.interestPage.statusChkInterest(), 'class').includes('ant-checkbox-wrapper-checked') === false) {
      this.clickActions.clickByJScript(this.interestPage.chkInterest());
      this.log.log('Selected the interest check box');
      return;
    }
    this.log.log('Interest Check Box is already selected.');
  }

  isInterestChkBoxSelected() {
    if (this.elementActions.getAttribute(this.interestPage.statusChkInterest(), 'class').includes('ant-checkbox-wrapper-checked') === true) {
      this.log.log('Interest Check box is already selected.');
      return true;
    }
    this.log.log('Interest Check Box is not selected.');
    return false;
  }

  isInterestTxtBoxEnabled() {
    if (this.elementActions.getAttribute(this.interestPage.txtInterestEnable(), 'class').includes('ant-input-number-disabled') === true) {
      this.log.log('Interest txt box is disabled.');
      return false;
    }
    this.log.log('Interest txt box is enabled.');
    return true;
  }

  inputInterest(interest) {
    this.clickActions.click(this.interestPage.txtInterest());
    this.inputActions.clearByBackSpace(this.interestPage.txtInterest().getValue().length);
    this.inputActions.inputValue(this.interestPage.txtInterest(), interest);
    this.keyboardActions.enterKeys('Tab');
  }

  getInterestValue() {
    return this.interestPage.txtInterest().getValue();
  }
}
module.exports = Interest;
