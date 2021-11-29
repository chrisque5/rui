/* eslint-disable class-methods-use-this */
class StrategyObjectProvider {
  rdoStrategyOutright() { return '[data-testid="rdoStrategyOutright"]@@Enabled_And_Visible||10'; }

  rdoStrategySpread() { return '//input[@data-testid="rdoStrategySpread"]@@Enabled_And_Visible||10'; }

  lblStrategy() { return '//*[@id="strategy"]/span@@Enabled_And_Visible||10'; }
}
module.exports = StrategyObjectProvider;
