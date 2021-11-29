const BrokerageStratObjectProvider = require('../../../objectsProvider/ndf/components/BrokerageStratObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class BrokerageStratPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.brokeragestrat = new BrokerageStratObjectProvider();
  }

  ddlBrokerageStrat() { return this.elmtProc.getEl(this.brokeragestrat.ddlBrokerageStrat()); }

  lblBrokerageStrat() { return this.elmtProc.getEl(this.brokeragestrat.lblBrokerageStrat()); }

  txtBrokerageStrat() { return this.elmtProc.getEl(this.brokeragestrat.txtBrokerageStrat()); }

  txtInputBrokerageStrat(brokeragestrategy) { return this.elmtProc.getEl(this.brokeragestrat.txtInputBrokerageStrat(brokeragestrategy)); }

  liBrokerageStrat() { return this.elmtProc.getElements(this.brokeragestart.liBrokerageStrat()); }
}
module.exports = BrokerageStratPageObject;
