const Logs = require('../../core/utility/Logs.js');
const VenuePageObject = require('../../pageobjects/ndf/components/VenuePageObject.js');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex.js');

class Venue {
  constructor() {
    this.log = new Logs();
    this.VenuePage = new VenuePageObject();
    this.clickActions = new ClickActions();
    this.mouseActions = new MouseActions();
    this.textActions = new GetTextActions();
    this.elementActions = new ElementActions();
  }

  clickExecutionVenue() {
    // this.clickActions.clickByJScript(this.VenuePage.ddlExec());
    this.mouseActions.mouseDown(this.VenuePage.ddlExec());
  }

  isExecutionVenueVisible(executionVenue) {
    return this.elementActions.isAvailable(this.VenuePage.txtInputExec(executionVenue));
  }

  selectExecutionVenue(executionVenue) {
    this.mouseActions.mouseDown(this.VenuePage.ddlExec());
    this.clickActions.clickByJScript(this.VenuePage.txtInputExec(executionVenue));
    this.log.log(`Changed execution venue to: ${executionVenue}`);
  }

  getExecutionVenue() {
    const element = this.VenuePage.lblExec();
    const value = this.textActions.getTxt(element);
    return value;
  }

  clickExecVenueLbl() {
    this.clickActions.click(this.VenuePage.txtExec());
  }

  getExecutionVenueListItems() {
    let counter = 0;
    const listText = [];
    const elements = this.VenuePage.liExecutionVenue();
    elements.forEach((element) => {
      listText[counter] = this.textActions.getTxt(element);
      counter += 1;
    });
    this.log.log(`Venue List is: ${listText}`);
    return listText;
  }

  getExecutionVenueList() {
    let counter = 0;
    const listItem = [];
    const elements = this.VenuePage.listExecutionVenue();
    elements.forEach((element) => {
      listItem[counter] = this.textActions.getInnerHTML(element);
      counter += 1;
    });
    this.log.log(`Venue List is: ${listItem}`);
    return listItem;
  }
}
module.exports = Venue;
