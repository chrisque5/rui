/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class VenueObjectProvider {
  ddlExec() { return '//div[@data-testid="ddlExecutionVenue"]//span[@class="ant-select-arrow"]@@Enabled_And_Visible||10'; }

  lblExec() { return '//div[@data-testid="ddlExecutionVenue"]//span[@class="ant-select-selection-item"]@@displayed||10'; }

  txtExec() { return '//span[text()="Venue"]@@Enabled_And_Visible||10'; }

  txtInputExecutionVenue(executionVenue) { return `[data-testid="ddlExecutionVenue_${executionVenue}"]@@Enabled_And_Visible||2`; }

  liExecutionVenue() { return '//ul[contains(@class, "ant-select-dropdown-menu-vertical") and not (contains(@class,"ant-select-dropdown-hidden"))]@@Enabled_And_Visible||10'; }

  listExecutionVenue() { return '//div[contains(@data-testid,"ddlExecutionVenue_")]//div[@class="ant-select-item-option-content"]@@havetext||10'; }
}
module.exports = VenueObjectProvider;
