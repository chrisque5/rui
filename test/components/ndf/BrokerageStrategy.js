const Logs = require('../../core/utility/Logs.js');
const BrokerageStratPageObject = require('../../pageobjects/ndf/components/BrokerageStratPageObject.js');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class BrokerageStrategy {
  constructor() {
    this.log = new Logs();
    this.BrokerageStratPage = new BrokerageStratPageObject();
    this.clickActions = new ClickActions();
    this.mouseActions = new MouseActions();
    this.textActions = new GetTextActions();
    this.elementActions = new ElementActions();
  }

  clickBrokerageStrategy() {
    this.mouseActions.mouseDown(this.BrokerageStratPage.ddlBrokerageStrat());
  }

  isBrokerageStrategyVisible(brokeragestrategy) {
    return this.elementActions.isAvailable(this.BrokerageStratpage.txtBrokerageStrat(brokeragestrategy));
  }

  selectBrokerageStrategy(brokeragestrategy) {
    this.mouseActions.mouseDown(this.BrokerageStratPage.ddlBrokerageStrat());
    this.clickActions.clickByJScript(this.BrokerageStratPage.txtInputBrokerageStrat(brokeragestrategy));
    this.log.log(`Changed Brokerage Strategy to: ${brokeragestrategy}`);
  }

  getBrokerageStrategy() {
    const element = this.BrokerageStratPage.lblBrokerageStrat();
    return this.textActions.getTxt(element);
  }

  clickBrokerageStrategyLbl() {
    this.clickActions.click(this.BrokerageStratPage.txtBrokerageStrat());
  }

  getBrokerageStrategyListItems() {
    const listText = [];
    const elements = this.BrokerageStratPage.liBrokerageStrat();
    elements.forEach((element) => {
      listText.push(this.textActions.getTxt(element));
    });
    this.log.log(`Brokerage Strategy List is: ${listText}`);
    return listText;
  }

  getBrokerageStrategyList() {
    const listItem = [];
    const elements = this.BrokerageStratPage.listBrokeragestrat();
    elements.forEach((element) => {
      listItem.push = (this.textActions.getInnerHTML(element));
    });
    this.log.log(`Brokerage Strategy List is: ${listItem}`);
    return listItem;
  }
}
module.exports = BrokerageStrategy;
