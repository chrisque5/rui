/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class ClientTraderObjectProvider {
  /** ************************* Buyer ************************** */

  btnInfoBuyerClientTrader() { return '//input[@data-testid="ddlbuyerClientTrader"]//following-sibling::span[contains(@class,"client-data-tip")]@@Enabled_And_Visible||5'; }

  lblBuyerClientTraderError() { return '//input[@data-testid="ddlbuyerClientTrader"]//..//..//..//following-sibling::div@@Enabled_And_Visible||.5'; }

  txtBuyerClientTraderError() { return '//input[@data-testid="ddlbuyerClientTrader"]//..//..//..//following-sibling::div/div@@Enabled_And_Visible||.5'; }

  btnClearBuyerClientTrader() { return '//input[@data-testid="ddlbuyerClientTrader"]//following-sibling::span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||.5'; }

  ddlBuyerClientTraderClickToType() { return '//input[@data-testid="ddlbuyerClientTrader"]@@Enabled_And_Visible||10'; }

  ddlBuyerClientTrader() { return '//input[@data-testid="ddlbuyerClientTrader"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  liBuyerSellerClientName(firmClientName) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[text()="FIRM_NAME"]'.replace('FIRM_NAME', firmClientName)}@@Enabled_And_Visible||10`; }

  lblBuyerClientTrader() { return '//input[@data-testid="ddlbuyerClientTrader"]//preceding-sibling::span@@Enabled_And_Visible||10'; }

  ddlBuyerClientTraderFocus() { return '//input[@data-testid="ddlbuyerClientTrader"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  // 3CP


  ddlcp2BuyerClientTrader() { return '//input[@data-testid="ddlcp2BuyerClientTrader"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  btncp2ClearBuyerClientTrader() { return '//input[@data-testid="ddlcp2BuyerClientTrader"]//following-sibling::span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||.5'; }

  btncp2InfoBuyerClientTrader() { return '//input[@data-testid="ddlcp2buyerClientTrader"]//following-sibling::span[contains(@class,"client-data-tip")]@@Enabled_And_Visible||5'; }

  lblcp2BuyerClientTrader() { return '//input[@data-testid="ddlcp2BuyerClientTrader"]//preceding-sibling::span@@havetext||10'; }

  ddlcp2BuyerClientTraderFocus() { return '//input[@data-testid="ddlcp2BuyerClientTrader"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  /** ************************* Seller ************************** */

  btnInfoSellerClientTrader() { return '//input[@data-testid="ddlsellerClientTrader"]//following-sibling::span[contains(@class,"client-data-tip")]@@Enabled_And_Visible||5'; }

  btnClearSellerClientTrader() { return '//input[@data-testid="ddlsellerClientTrader"]//following-sibling::span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||.5'; }

  ddlSellerClientTraderClickToType() { return '//input[@data-testid="ddlsellerClientTrader"]@@Enabled_And_Visible||10'; }

  ddlSellerClientTrader() { return '//input[@data-testid="ddlsellerClientTrader"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  lblSellerClientTrader() { return '//input[@data-testid="ddlsellerClientTrader"]//preceding-sibling::span@@Enabled_And_Visible||10'; }

  casCadBuyerSeller() { return '//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]@@Enabled_And_Visible||.5'; }

  ddlSellerClientTraderFocus() { return '//input[@data-testid="ddlsellerClientTrader"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  // 3CP

  ddlcp2SellerClientTrader() { return '//input[@data-testid="ddlcp2SellerClientTrader"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  btncp2ClearSellerClientTrader() { return '//input[@data-testid="ddlcp2SellerClientTrader"]//following-sibling::span[contains(@class,"anticon-close-circle")]@@Enabled_And_Visible||.5'; }

  btncp2InfoSellerClientTrader() { return '//input[@data-testid="ddlcp2sellerClientTrader"]//following-sibling::span[contains(@class,"client-data-tip")]@@Enabled_And_Visible||5'; }

  lblcp2SellerClientTrader() { return '//input[@data-testid="ddlcp2SellerClientTrader"]//preceding-sibling::span@@havetext||10'; }

  ddlcp2SellerClientTraderFocus() { return '//input[@data-testid="ddlcp2SellerClientTrader"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  /** ************************* Common ************************** */

  liBuyerSellerClientTraderName(clientName, traderName) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[contains(.,"CLIENT_NAME") and contains(.,"TRADER_NAME")]'.replace('CLIENT_NAME', clientName).replace('TRADER_NAME', traderName)}@@Enabled_And_Visible||10`; }

  liBuyerSellerClientTraderNameUpper(clientName, traderName) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[text()="CLIENT_NAME"]//span[text()="TRADER_NAME"]'.replace('CLIENT_NAME', clientName).replace('TRADER_NAME', traderName)}@@Enabled_And_Visible||10`; }

  liBuyerSeller() { return '//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li@@havetext||10'; }

  /** ************************* Info Popup ************************** */

  lblInfoPopUp() { return '//div[contains(@class,"ant-popover-placement-top") and not (contains(@class,"ant-popover-hidden"))]//div[@class="client-info-popover"]//div@@havetext||5'; }

  lblInfoPopUpClose() { return '//div[contains(@class,"ant-popover-placement-top") and not (contains(@class,"ant-popover-hidden"))]//div[@class="client-info-popover"]@@Enabled_And_Visible||.5'; }

  btnBuyerCounterPartySide() { return '[data-testid="btnbuyerCounterPartySide"]@@Enabled_And_Visible||10';  }

  btnSellerCounterPartySide() { return '[data-testid="btnsellerCounterPartySide"]@@Enabled_And_Visible||10'; }
}
module.exports = ClientTraderObjectProvider;
