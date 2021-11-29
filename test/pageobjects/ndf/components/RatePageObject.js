const RateObjectProvider = require('../../../objectsProvider/ndf/components/RateObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class RatePageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.rate = new RateObjectProvider();
  }

  txtPrice1() { return this.elmtProc.getEl(this.rate.txtPrice1()); }

  lblPrice1() { return this.elmtProc.getEl(this.rate.lblPrice1()); }

  lblPrice2() { return this.elmtProc.getEl(this.rate.lblPrice2()); }

  txtPrice2() { return this.elmtProc.getEl(this.rate.txtPrice2()); }
}
module.exports = RatePageObject;
