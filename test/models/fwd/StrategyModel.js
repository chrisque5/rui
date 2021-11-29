const Strategy = require('../../components/fwd/Strategy.js');

class StrategyModel {
  constructor() {
    this.strategy = new Strategy();
  }

  /** ********************************* Strategy ***************************** */

  clickRdoStrategyForward() { this.strategy.clickRdoStrategyForward(); }

  clickRdoStrategyFwdForward() { this.strategy.clickRdoStrategyFwdForward(); }

  clickRdoStrategyOutright() { this.strategy.clickRdoStrategyOutright(); }

  isOutRightSelected() { return this.strategy.isOutRightSelected(); }

  isForwardSelected() { return this.strategy.isForwardSelected(); }

  isFwdForwardSelected() { return this.strategy.isFwdForwardSelected(); }

  /** ***************************** Strategy End *************************** */
}
module.exports = StrategyModel;
