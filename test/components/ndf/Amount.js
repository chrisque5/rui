const Logs = require('../../core/utility/Logs.js');
const AmountPageObject = require('../../pageobjects/ndf/components/AmountPageObject.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class Amount {
  constructor() {
    this.log = new Logs();
    this.amountPage = new AmountPageObject();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
    this.watch = new StopWatch();
  }

  /** ******************** Amount1 ************************** */
  clickAmount() {
    this.clickActions.click(this.amountPage.txtAmount1());
  }

  inputAmount(amount) {
    this.clickActions.click(this.amountPage.txtAmount1());
    this.inputActions.clearByBackSpace(this.amountPage.txtAmount1().getValue().length);
    this.inputActions.inputValue(this.amountPage.txtAmount1(), amount);
    this.keyboardActions.enterKeys('Tab');
  }

  inputAmountWithEnter(amount) {
    this.clickActions.click(this.amountPage.txtAmount1());
    this.inputActions.clearByBackSpace(this.amountPage.txtAmount1().getValue().length);
    this.inputActions.inputValue(this.amountPage.txtAmount1(), amount);
    this.keyboardActions.enterKeys('Enter');
  }

  inputAmountWithoutKeys(amount) {
    this.clickActions.click(this.amountPage.txtAmount1());
    this.inputActions.clearByBackSpace(this.amountPage.txtAmount1().getValue().length);
    this.inputActions.inputValue(this.amountPage.txtAmount1(), amount);
  }

  getAmount() {
    let returnValue = null;
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === null) {
      returnValue = this.textActions.getVal(this.amountPage.txtAmount1());
      if (returnValue !== null) {
        return returnValue;
      }
    }
    return returnValue;
  }

  hoverAmount1() {
    const element = this.amountPage.txtAmount1();
    this.mouseActions.moveTo(element);
    // eslint-disable-next-line radix
    // this.mouseActions.hoverElement(parseInt(this.amountPage.txtAmount1().getLocation('x')), parseInt(this.amountPage.txtAmount1().getLocation('y')));
  }

  isAmount1Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.amountPage.lblAmount1(), 'class');
      if (attValue.includes('ant-input-number-focused')) {
        this.log.log('Focus is on Amount1');
        return true;
      }
      this.log.log('Focus is not shifted to Amount1.');
    }
    this.log.log('Still Focus is not on the Amount1 Field.');
    return false;
  }

  /** ******************** Amount2 ************************** */
  clickAmount2() {
    this.clickActions.click(this.amountPage.txtAmount2());
  }

  inputAmount2(amount2) {
    this.clickActions.click(this.amountPage.txtAmount2());
    this.inputActions.clearByBackSpace(this.amountPage.txtAmount2().getValue().length);
    this.inputActions.inputValue(this.amountPage.txtAmount2(), amount2);
    this.keyboardActions.enterKeys('Tab');
  }

  inputAmount2WithEnter(amount) {
    this.clickActions.click(this.amountPage.txtAmount2());
    this.inputActions.clearByBackSpace(this.amountPage.txtAmount2().getValue().length);
    this.inputActions.inputValue(this.amountPage.txtAmount2(), amount);
    this.keyboardActions.enterKeys('Enter');
  }

  getAmount2() {
    let returnValue = null;
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === null) {
      returnValue = this.textActions.getVal(this.amountPage.txtAmount2());
      if (returnValue !== null) {
        return returnValue;
      }
    }
    return returnValue;
  }

  hoverAmount2() {
    const element = this.amountPage.txtAmount2();
    this.mouseActions.moveTo(element);
    // eslint-disable-next-line radix
    // this.mouseActions.hoverElement(parseInt(this.amountPage.txtAmount2().getLocation('x')), parseInt(this.amountPage.txtAmount2().getLocation('y')));
  }

  getAmount2WithoutWait() {
    return this.textActions.getVal(this.amountPage.txtAmount2());
  }

  isAmount2Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.amountPage.lblAmount2(), 'class');
      if (attValue.includes('ant-input-number-focused')) {
        this.log.log('Focus is on Amount2');
        return true;
      }
      this.log.log('Focus is not shifted to Amount2.');
    }
    this.log.log('Still Focus is not on the Amount2 Field.');
    return false;
  }
}
module.exports = Amount;
