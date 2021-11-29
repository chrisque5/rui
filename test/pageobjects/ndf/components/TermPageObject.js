const TermObjectProvider = require('../../../objectsProvider/ndf/components/TermObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class TermPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.term = new TermObjectProvider();
  }

  /** ********************** Term1 ******************** */
  txtInputTerm1() { return this.elmtProc.getEl(this.term.txtInputTerm1()); }

  lblTerm1() { return this.elmtProc.getEl(this.term.lblTerm1()); }

  outerTerm1() { return this.elmtProc.getEl(this.term.outerTerm1()); }

  /** ********************** Term2 ******************** */

  txtInputTerm2() { return this.elmtProc.getEl(this.term.txtInputTerm2()); }

  lblTerm2() { return this.elmtProc.getEl(this.term.lblTerm2()); }

  outerTerm2() { return this.elmtProc.getEl(this.term.outerTerm2()); }

  liTerm(term) { return this.elmtProc.getEl(this.term.liTerm(term)); }

  termList() { return this.elmtProc.getElements(this.term.termList()); }
}
module.exports = TermPageObject;
