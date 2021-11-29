const AmountObjectProvider = require('../../../objectsProvider/ndf/components/AmountObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class AmountPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.amount = new AmountObjectProvider();
  }

  txtAmount1() { return this.elmtProc.getEl(this.amount.txtAmount1()); }

  lblAmount1() { return this.elmtProc.getEl(this.amount.lblAmount1()); }

  txtAmount2() { return this.elmtProc.getEl(this.amount.txtAmount2()); }

  lblAmount2() { return this.elmtProc.getEl(this.amount.lblAmount2()); }
}
module.exports = AmountPageObject;
