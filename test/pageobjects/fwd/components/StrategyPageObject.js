const StrategyObjectProvider = require('../../../objectsProvider/fwd/components/StrategyObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class StrategyPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.strategy = new StrategyObjectProvider();
  }

  rdoStrategyForward() { return this.elmtProc.getEl(this.strategy.rdoStrategyForward()); }

  rdoStrategyFwdForward() { return this.elmtProc.getEl(this.strategy.rdoStrategyFwdForward()); }

  rdoStrategyOutright() { return this.elmtProc.getEl(this.strategy.rdoStrategyOutright()); }

  rdoStrategySpread() { return this.elmtProc.getEl(this.strategy.rdoStrategySpread()); }
}
module.exports = StrategyPageObject;
