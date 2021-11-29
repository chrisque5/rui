/* eslint-disable class-methods-use-this */
class StrategyObjectProvider {
  rdoStrategyForward() { return '[data-testid="rdoStrategyForward"]@@Enabled_And_Visible||10'; }

  rdoStrategyFwdForward() { return '[data-testid="rdoStrategyForward Forward"]@@Enabled_And_Visible||10'; }

  rdoStrategyOutright() { return '[data-testid="rdoStrategyOutright"]@@Enabled_And_Visible||10'; }

  // rdoStrategyFwdSpread() { return '[data-testid="rdoStrategyForwardSpread"]@@Enabled_And_Visible||10'; }
}
module.exports = StrategyObjectProvider;
