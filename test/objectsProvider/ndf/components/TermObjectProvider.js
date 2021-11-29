/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class TermObjectProvider {
  /** ********************** Term1 ******************** */

  txtInputTerm1() { return '#term1@@Enabled_And_Visible||10'; }

  lblTerm1() { return '#term1@@Enabled_And_Visible||10'; }

  outerTerm1() { return '//div[@data-testid="ddlInputTerm1"]@@Enabled_And_Visible||10'; }

  /** ********************** Term2 ******************** */

  txtInputTerm2() { return '#term2@@Enabled_And_Visible||10'; }

  lblTerm2() { return '#term2@@Enabled_And_Visible||10'; }

  outerTerm2() { return '//div[@data-testid="ddlInputTerm2"]@@Enabled_And_Visible||10'; }

  liTerm(term) { return `${'//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[contains(@class,"ant-select-item-option-content") and text()="TEMP"]'.replace('TEMP', term)}@@Enabled_And_Visible||10`; }

  termList() { return '//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[@class="ant-select-item-option-content"]@@havetext||10'; }
}
module.exports = TermObjectProvider;
