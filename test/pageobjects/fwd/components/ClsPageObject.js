const ClsObjectProvider = require('../../../objectsProvider/fwd/components/ClsObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class ClsPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.cls = new ClsObjectProvider();
  }

  chkCls1() { return this.elmtProc.getEl(this.cls.chkCls1()); }

  chkCls2() { return this.elmtProc.getEl(this.cls.chkCls2()); }

  chkClsState1() { return this.elmtProc.getEl(this.cls.chkClsState1()); }

  chkClsState2() { return this.elmtProc.getEl(this.cls.chkClsState2()); }
}
module.exports = ClsPageObject;
