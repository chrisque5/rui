const VenueObjectProvider = require('../../../objectsProvider/ndf/components/VenueObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class VenuePageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.venue = new VenueObjectProvider();
  }

  ddlExec() { return this.elmtProc.getEl(this.venue.ddlExec()); }

  lblExec() { return this.elmtProc.getEl(this.venue.lblExec()); }

  txtExec() { return this.elmtProc.getEl(this.venue.txtExec()); }

  txtInputExec(executionVenue) { return this.elmtProc.getEl(this.venue.txtInputExecutionVenue(executionVenue)); }

  liExecutionVenue() { return this.elmtProc.getElements(this.venue.liExecutionVenue()); }

  listExecutionVenue() {
    return this.elmtProc.getElements(this.venue.listExecutionVenue()); }
}
module.exports = VenuePageObject;
