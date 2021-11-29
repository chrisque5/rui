const Logs = require('../../core/utility/Logs.js');
const StrategyPageObject = require('../../pageobjects/ndf/components/StrategyPageObject.js');
const { ClickActions, ElementActions } = require('../../core/actions/ActionsIndex.js');

class Strategy {
  constructor() {
    this.log = new Logs();
    this.strategyPage = new StrategyPageObject();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
  }

  clickRdoStrategyOutright() {
    this.clickActions.click(this.strategyPage.rdoStrategyOutright());
  }

  clickRdoStrategySpread() {
    this.clickActions.clickByJScript(this.strategyPage.rdoStrategySpread());
  }

  isOutRightSelected() { return this.elementActions.getAttribute(this.strategyPage.rdoStrategyOutright(), 'checked'); }

  isSpreadSelected() { return this.elementActions.getAttribute(this.strategyPage.rdoStrategySpread(), 'checked'); }
}
module.exports = Strategy;
