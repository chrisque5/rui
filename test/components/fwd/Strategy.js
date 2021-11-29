const Logs = require('../../core/utility/Logs.js');
const StrategyPageObject = require('../../pageobjects/fwd/components/StrategyPageObject.js');
const { ClickActions, ElementActions } = require('../../core/actions/ActionsIndex.js');

class Strategy {
  constructor() {
    this.log = new Logs();
    this.strategyPage = new StrategyPageObject();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
  }

  clickRdoStrategyForward() {
    this.clickActions.click(this.strategyPage.rdoStrategyForward());
    this.log.log('Strategy changes to Forward');
  }

  clickRdoStrategyFwdForward() {
    this.clickActions.click(this.strategyPage.rdoStrategyFwdForward());
    this.log.log('Strategy changes to Forward Forward');
  }

  clickRdoStrategyOutright() {
    this.clickActions.click(this.strategyPage.rdoStrategyOutright());
    this.log.log('Strategy changes to Outright');
  }

  // clickRdoStrategyFwdSpread() {
  //   this.clickActions.click(this.deal.rdoStrategySpread());
  //   this.log.log('Strategy changes to Forward Spread');
  // }

  isOutRightSelected() { return this.elementActions.getAttribute(this.strategyPage.rdoStrategyOutright(), 'checked'); }

  isForwardSelected() { return this.elementActions.getAttribute(this.strategyPage.rdoStrategyForward(), 'checked'); }

  isFwdForwardSelected() { return this.elementActions.getAttribute(this.strategyPage.rdoStrategyFwdForward(), 'checked'); }
}
module.exports = Strategy;
