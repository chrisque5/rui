const Term = require('../../components/ndf/Term.js');

class TermModel {
  constructor() {
    this.term = new Term();
  }

  /** ********************************* Term ****************************** */

  inputTerm(term) { this.term.inputTerm(term); }

  inputPartialTermByKeys(term) { this.term.inputPartialTermByKeys(term); }

  inputTermWithTab(term) { this.term.inputTermWithTab(term); }

  getTerm() { return this.term.getTerm(); }

  hoverTerm1() { this.term.hoverTerm1(); }

  isTerm1Focused() { return this.term.isTerm1Focused(); }

  termsAvalInTerm1(expTermList) { return this.term.termsAvalInTerm1(expTermList); }

  termsNotAvalInTerm1(expTermList) { return this.term.termsNotAvalInTerm1(expTermList); }

  inputTerm2(term2) { this.term.inputTerm2(term2); }

  inputTerm2WithTab(term2) { this.term.inputTerm2WithTab(term2); }

  txtInputTerm2(term) { this.term.txtInputTerm2(term); }

  getTerm2() { return this.term.getTerm2(); }

  isTerm2Focused() { return this.term.isTerm2Focused(); }

  validateTermDropdownItems(term) { return this.term.validateTermDropdownItems(term); }

  termsAvalInTerm2(expTermList) { return this.term.termsAvalInTerm2(expTermList); }

  termsNotAvalInTerm2(expTermList) { return this.term.termsNotAvalInTerm2(expTermList); }

  /** ******************************* Term End **************************** */
}
module.exports = TermModel;
