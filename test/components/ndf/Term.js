/* eslint-disable no-undef */
/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs.js');
const TermPageObject = require('../../pageobjects/ndf/components/TermPageObject.js');
const StopWatch = require('../../core/utility/StopWatch.js');
const {
  GetTextActions,
  ClickActions,
  InputActions,
  ElementActions,
  KeyboardActions,
  MouseActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex.js');

class Term {
  constructor() {
    this.log = new Logs();
    this.termPage = new TermPageObject();
    this.textActions = new GetTextActions();
    this.clickActions = new ClickActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.mouseActions = new MouseActions();
    this.windowActions = new WindowActions();
    this.watch = new StopWatch();
  }

  /** ********************** Term1 ******************** */
  inputTerm(term) {
    // this.clickActions.click(this.termPage.txtInputTerm1());
    this.mouseActions.mouseDown(this.termPage.txtInputTerm1());
    browser.call(this.inputActions.clearByBackSpace(10));
    this.inputActions.inputValue(this.termPage.txtInputTerm1(), term);
    this.keyboardActions.enterKeys('Enter');
    this.windowActions.pause(500);
  }

  inputPartialTermByKeys(term) {
    this.mouseActions.mouseDown(this.termPage.txtInputTerm1());
    this.inputActions.clearByBackSpace(8);
    this.keyboardActions.enterKeys(term);
    this.windowActions.pause(500);
  }

  inputTermWithTab(term) {
    this.mouseActions.mouseDown(this.termPage.txtInputTerm1());
    this.inputActions.clearByBackSpace(8);
    this.inputActions.inputValue(this.termPage.txtInputTerm1(), term);
    this.keyboardActions.enterKeys('Tab');
    this.windowActions.pause(500);
  }

  getTerm() { return this.textActions.getVal(this.termPage.txtInputTerm1()); }

  hoverTerm1() {
    // eslint-disable-next-line radix
    this.mouseActions.hoverElement(parseInt(this.termPage.txtInputTerm1().getLocation('x')), parseInt(this.termPage.txtInputTerm1().getLocation('y')));
  }

  isTerm1Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.termPage.outerTerm1(), 'class');
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on Term 1');
        return true;
      }
      this.log.log('Focus is not shifted to Term 1.');
    }
    this.log.log('Still Focus is not on the Term 1 Field.');
    return false;
  }

  termsAvalInTerm1(expTermList) {
    this.mouseActions.buttonDown(this.termPage.txtInputTerm1());
    const acTermList = this.findTerms();
    this.keyboardActions.enterKeys('Tab');
    return this.isTermsAvailable(expTermList, acTermList);
  }

  termsNotAvalInTerm1(expTermList) {
    this.clickActions.click(this.termPage.txtInputTerm1());
    const acTermList = this.findTerms();
    this.keyboardActions.enterKeys('Tab');
    return this.isTermsNotAvailable(expTermList, acTermList);
  }

  /** ********************** Term2 ******************** */

  inputTerm2(term2) {
    this.mouseActions.mouseDown(this.termPage.txtInputTerm2());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.termPage.txtInputTerm2(), term2);
    this.keyboardActions.enterKeys('Enter');
    this.windowActions.pause(500);
  }

  inputTerm2WithTab(term2) {
    this.mouseActions.mouseDown(this.termPage.txtInputTerm2());
    this.inputActions.clearByBackSpace(8);
    this.inputActions.inputValue(this.termPage.txtInputTerm2(), term2);
    this.keyboardActions.enterKeys('Tab');
    this.windowActions.pause(500);
  }

  txtInputTerm2(term) {
    this.inputActions.clearByBackSpace(8);
    this.inputActions.inputValue(this.termPage.txtInputTerm2(), term);
    this.windowActions.pause(500);
  }

  getTerm2() { return this.textActions.getVal(this.termPage.txtInputTerm2()); }

  isTerm2Focused() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attValue = this.elementActions.getAttribute(this.termPage.outerTerm2(), 'class');
      if (attValue.includes('ant-select-focused')) {
        this.log.log('Focus is on Term 2');
        return true;
      }
      this.log.log('Focus is not shifted to Term 2.');
    }
    this.log.log('Still Focus is not on the Term 2 Field.');
    return false;
  }

  validateTermDropdownItems(term) {
    return this.elementActions.isAvailable(this.termPage.liTerm(term));
  }

  termsAvalInTerm2(expTermList) {
    this.clickActions.click(this.termPage.txtInputTerm2());
    const acTermList = this.findTerms();
    this.keyboardActions.enterKeys('Tab');
    return this.isTermsAvailable(expTermList, acTermList);
  }

  termsNotAvalInTerm2(expTermList) {
    this.clickActions.click(this.termPage.txtInputTerm2());
    const acTermList = this.findTerms();
    this.keyboardActions.enterKeys('Tab');
    return this.isTermsNotAvailable(expTermList, acTermList);
  }

  /** ********************** Common ******************** */

  isTermsAvailable(expTermList, acTermList) {
    this.log.log(`Expected Term List : ${expTermList} and Actual Term List : ${acTermList}`);
    // eslint-disable-next-line consistent-return
    expTermList.forEach((term) => {
      if (!(acTermList.includes(term))) {
        return false;
      }
    });
    return true;
  }

  isTermsNotAvailable(expTermList, acTermList) {
    this.log.log(`Expected Term List : ${expTermList} and Actual Term List : ${acTermList}`);
    // eslint-disable-next-line consistent-return
    expTermList.forEach((term) => {
      if (acTermList.includes(term)) {
        return false;
      }
    });
    return true;
  }

  findTerms() {
    const actTermList = [];
    let counter = 0;
    const termElementList = this.termPage.termList();
    termElementList.forEach((element) => {
      actTermList[counter] = this.textActions.getTxt(element);
      counter += 1;
    });

    return actTermList;
  }
}
module.exports = Term;
