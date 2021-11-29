/* eslint-disable class-methods-use-this */
class RateObjectProvider {
  txtPrice1() { return '[data-testid="txtPrice1"]@@Enabled_And_Visible||10'; }

  lblPrice1() { return '//input[@data-testid="txtPrice1"]/../..@@Enabled_And_Visible||10'; }

  lblPrice2() { return '//input[@data-testid="txtPrice2"]/../..@@Enabled_And_Visible||10'; }

  txtPrice2() { return '[data-testid="txtPrice2"]@@Enabled_And_Visible||10'; }
}
module.exports = RateObjectProvider;
