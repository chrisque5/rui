/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

class CMPropertyProvider {
  reNameBtn() { return '//div[contains(@class,"ant-dropdown") and not (contains(@class,"ant-dropdown-hidden"))]//span[contains(@class, "anticon anticon-edit")]@@Enabled_And_Visible||10'; }

  // reNameBtn(index) { return `${'(//i[contains(@class, "anticon anticon-edit")])[INDEX]'.replace('INDEX', index)}@@Enabled_And_Visible||10`; }

  editColourBtn() { return '//div[contains(@class,"ant-dropdown")and not(contains(@class,"ant-dropdown-hidden"))]//span[contains(@class, "anticon anticon-bg-colors")]@@Enabled_And_Visible||10'; }

  reNameInput() { return '//input[@data-testid="editFav"]@@Enabled_And_Visible||10'; }

  reNameSaveBtn() { return '//button[@class="ant-btn ant-btn-primary"]//span[text()="Save"]@@Enabled_And_Visible||10'; }

  reNameCancelBtn() { return '//button[@class="ant-btn"]//span[text()="Cancel"]@@Enabled_And_Visible||10'; }

  pageMask() { return '//div[@class="ant-modal-mask"]@@Enabled_And_Visible||.5'; }

  btnFavColour(colour) { return `${'//span[@class="ant-tag ant-tag-has-color colour-tag" and text()="TEMP"]'.replace('TEMP', colour)}@@Enabled_And_Visible||10`; }

  mnuRightClick() { return '//div[contains(@class,"ant-dropdown")and not(contains(@class,"ant-dropdown-hidden"))]//span[contains(@class, "anticon anticon-edit")]@@Enabled_And_Visible||2'; }

  btnColourModalClose() { return '//button[contains(@class, "ant-modal-close")]@@Enabled_And_Visible||1'; }

  // Hot List Area
  btnHotListClient(firmName) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[contains(@class,"ant-tag") and text()="TEMP"]'.replace('TEMP', firmName)}@@Enabled_And_Visible||2`; }

  btnHotListBroker(brokerName) { return `${'//div[@role="tab" and text()="TEMP"]'.replace('TEMP', brokerName)}@@Enabled_And_Visible||2`; }

  liHotListBroker() { return '//div[@class="ant-tabs-nav-list"]@@Enabled_And_Visible||2'; }

  btnHotListCloseBroker(brokerName) { return `${'//div[@role="tab" and text()="TEMP"]'.replace('TEMP', brokerName)}//following-sibling::button//span@@Enabled_And_Visible||10`; }

  btnStarBuyer() { return '[data-testid="btnbuyerFavorite"]@@Enabled_And_Visible||10'; }

  btnStarSeller() { return '[data-testid="btnsellerFavorite"]@@Enabled_And_Visible||10'; }

  btnNettBroBuyer() { return '[data-testid="chkbuyerNettBrokerage"]@@Enabled_And_Visible||10'; }

  btnNettBroSeller() { return '[data-testid="chksellerNettBrokerage"]@@Enabled_And_Visible||10'; }

  btncp2StarBuyer() { return '[data-testid="btncp2BuyerFavorite"]@@Enabled_And_Visible||10'; }

  btncp2StarSeller() { return '[data-testid="btncp2SellerFavorite"]@@Enabled_And_Visible||10'; }

  btnHotListTrader(trader) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[contains(@class,"ant-tag") and text()="TEMP"]'.replace('TEMP', trader)}@@Enabled_And_Visible||2`; }

  // btnHotListTrader(trader) { return `${'//div[@class="client-list"]//div[contains(@class,"ant-tag") and text()="TEMP"]'.replace('TEMP', trader)}@@Enabled_And_Visible||10`; }

  btnCloseHotListTrader(trader) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[contains(@class,"ant-tag") and text()="TEMP"]//span'.replace('TEMP', trader)}@@Enabled_And_Visible||2`; }

  btnStarCurrency() { return '//div[@class="ccy-label"]//span@@Enabled_And_Visible||10'; }

  btnHotListCurrency(currencyPair) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[@class="ant-tag" and text()="TEMP"]'.replace('TEMP', currencyPair)}@@Enabled_And_Visible||2`; }

  btnCloseHotListCurrency(currencyPair) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[@class="ant-tag" and text()="TEMP"]//span'.replace('TEMP', currencyPair)}@@Enabled_And_Visible||10`; }

  btnStarTerm() { return '//label[@for="term1"]//span[contains(@class,"star-icon")]@@Enabled_And_Visible||10'; }

  btnHotListTerm(term) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[@class="ant-tag" and text()="TEMP"]'.replace('TEMP', term)}@@Enabled_And_Visible||2`; }

  btnCloseHotListTerm(term) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[@class="ant-tag" and text()="TEMP"]//span'.replace('TEMP', term)}@@Enabled_And_Visible||10`; }

  btnStarVenue() { return '//label[@for="executionVenue"]//span[contains(@class,"star-icon")]@@Enabled_And_Visible||10'; }

  btnHotListVenue(executionVenue) { return `${'//div[contains(@class,"ant-tabs-tabpane-active")]//span[@class="ant-tag" and text()="TEMP"]'.replace('TEMP', executionVenue)}@@Enabled_And_Visible||2`; }

  btnCloseHotListVenue(executionVenue) { return `${'//span[@class="ant-tag" and text()="TEMP"]//span'.replace('TEMP', executionVenue)}@@Enabled_And_Visible||10`; }

  btnStarValueDate() { return '//label[@for="valueDate1"]//span@@Enabled_And_Visible||10'; }

  btnHotListValueDate(valueDate) { return `${'//span[@class="ant-tag" and text()="TEMP"]'.replace('TEMP', valueDate)}@@havetext||2`; }

  btnCloseHotListValueDate(valueDate) { return `${'//span[@class="ant-tag" and text()="TEMP"]//span'.replace('TEMP', valueDate)}@@Enabled_And_Visible||10`; }

  btnToggleTraders(index) { return `${'(//*[name()="svg" and contains(@data-icon,"bank")])[INDEX]'.replace('INDEX', index)}@@Enabled_And_Visible||10`; }

  btnToggleCurrencyPairs(index) { return `${'(//*[name()="svg" and contains(@data-icon,"dollar")])[INDEX]'.replace('INDEX', index)}@@Enabled_And_Visible||10`; }

  btnToggleTerms(index) { return `${'(//*[name()="svg" and contains(@data-icon,"calendar")])[INDEX]'.replace('INDEX', index)}@@Enabled_And_Visible||10`; }

  btnToggleExecutionVenues(index) { return `${'(//*[name()="svg" and contains(@data-icon,"book")])[INDEX]'.replace('INDEX', index)}@@Enabled_And_Visible||10`; }

  // Hot List Area End
}
module.exports = CMPropertyProvider;
