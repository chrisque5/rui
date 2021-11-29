const Venue = require('../../components/ndf/Venue.js');

class VenueModel {
  constructor() {
    this.venue = new Venue();
  }

  clickExecutionVenue() { this.venue.clickExecutionVenue(); }

  selectExecutionVenue(executionVenue) { this.venue.selectExecutionVenue(executionVenue); }

  getExecutionVenue() { return this.venue.getExecutionVenue(); }

  isExecutionVenueVisible(executionVenue) { return this.venue.isExecutionVenueVisible(executionVenue); }
}
module.exports = VenueModel;
