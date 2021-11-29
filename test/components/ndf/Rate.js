const Logs = require('../../core/utility/Logs.js');
const RatePageObject = require('../../pageobjects/ndf/components/RatePageObject.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class Rate {
  constructor() {
    this.log = new Logs();
    this.ratePage = new RatePageObject();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
    this.watch = new StopWatch();
  }
  /** ********************** Rate1/Price1 ************************** */

  inputPrice(price) {
    this.clickPrice1();
    this.inputActions.clearByBackSpace(this.ratePage.txtPrice1().getValue().length);
    this.inputActions.inputValue(this.ratePage.txtPrice1(), price);
    this.keyboardActions.enterKeys('Enter');
  }

  getPrice() {
    let returnValue = '';
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getVal(this.ratePage.txtPrice1());
      if (returnValue !== '') {
        return returnValue;
      }
    }
    return returnValue;
  }

  getPriceWithoutWait() {
    return this.textActions.getVal(this.ratePage.txtPrice1());
  }

  verifyPrice1Empty() {
    let returnValue = '';
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getVal(this.ratePage.txtPrice1());
      if (returnValue !== '') {
        return returnValue;
      }
    }
    return returnValue;
  }

  hoverPrice1() {
    // eslint-disable-next-line radix
    const element = this.ratePage.txtPrice1();
    this.mouseActions.moveTo(element);
    // this.mouseActions.hoverElement(parseInt(this.ratePage.txtPrice1().getLocation('x')), parseInt(this.ratePage.txtPrice1().getLocation('y')));
  }

  clickPrice1() {
    this.clickActions.click(this.ratePage.txtPrice1());
  }

  clickPrice2() {
    this.clickActions.click(this.ratePage.txtPrice2());
  }

  waitForPrice1(timeOut) { return this.elementActions.waitforVal(this.ratePage.txtPrice1(), timeOut); }

  isPrice1Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.ratePage.lblPrice1(), 'class');
      if (attValue.includes('ant-input-number-focused')) {
        this.log.log('Focus is on to price1');
        return true;
      }
      this.log.log('Focus is not shifted to price1.');
    }
    this.log.log('Still Focus is not on the price1 Field.');
    return false;
  }

  /** ********************** Rate1/Price1 End **************************** */

  /** ********************** Rate2/Price2 Start ************************** */

  inputPrice2(price2) {
    this.clickPrice2();
    this.inputActions.clearByBackSpace(this.ratePage.txtPrice2().getValue().length);
    this.inputActions.inputValue(this.ratePage.txtPrice2(), price2);
    this.keyboardActions.enterKeys('Enter');
  }

  getPrice2() {
    let returnValue = '';
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getVal(this.ratePage.txtPrice2());
      if (returnValue !== '') {
        return returnValue;
      }
    }
    return returnValue;
  }

  getPrice2WithoutWait() { return this.textActions.getVal(this.ratePage.txtPrice2()); }

  hoverPrice2() {
    // eslint-disable-next-line radix
    this.mouseActions.hoverElement(parseInt(this.ratePage.txtPrice2().getLocation('x')), parseInt(this.ratePage.txtPrice2().getLocation('y')));
  }

  verifyPrice2Empty() {
    let returnValue = '';
    this.watch.startStopWatch(5);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getVal(this.ratePage.txtPrice2());
      if (returnValue !== '') {
        return returnValue;
      }
    }
    return returnValue;
  }

  waitForPrice2(timeOut) { return this.elementActions.waitforVal(this.ratePage.txtPrice2(timeOut)); }

  isPrice2Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.ratePage.lblPrice2(), 'class');
      if (attValue.includes('ant-input-number-focused')) {
        this.log.log('Focus is on to price2');
        return true;
      }
      this.log.log('Focus is not shifted to price2.');
    }
    this.log.log('Still Focus is not on the price2 Field.');
    return false;
  }
}
module.exports = Rate;
