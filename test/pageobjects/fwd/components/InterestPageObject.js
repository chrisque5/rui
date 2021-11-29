const InterestObjectProvider = require('../../../objectsProvider/fwd/components/InterestObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class InterestPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.interest = new InterestObjectProvider();
  }

  chkInterest() { return this.elmtProc.getEl(this.interest.chkInterest()); }

  statusChkInterest() { return this.elmtProc.getEl(this.interest.statusChkInterest()); }

  txtInterest() { return this.elmtProc.getEl(this.interest.txtInterest()); }

  txtInterestEnable() { return this.elmtProc.getEl(this.interest.txtInterestEnable()); }
}
module.exports = InterestPageObject;
