const StrategyObjectProvider = require('../../../objectsProvider/ndf/components/StrategyObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class StrategyPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.strategy = new StrategyObjectProvider();
  }

  rdoStrategyOutright() { return this.elmtProc.getEl(this.strategy.rdoStrategyOutright()); }

  rdoStrategySpread() { return this.elmtProc.getEl(this.strategy.rdoStrategySpread()); }

  lblStrategy() { return this.elmtProc.getEl(this.strategy.lblStrategy()); }
}
module.exports = StrategyPageObject;
