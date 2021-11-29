const DuplicateDealObjectProvider = require('../../../objectsProvider/ndf/components/DuplicateDealObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class DuplicateDealPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.duplicateDeal = new DuplicateDealObjectProvider();
  }

  modalDuplicateDeal() {    
    return this.elmtProc.getEl(this.duplicateDeal.modalDuplicateDeal());
  }  

  btnCancel() { return this.elmtProc.getEl(this.duplicateDeal.btnCancel()); }

  btnSubmitAgain() { return this.elmtProc.getEl(this.duplicateDeal.btnSubmitAgain()); }
}
module.exports = DuplicateDealPageObject;
