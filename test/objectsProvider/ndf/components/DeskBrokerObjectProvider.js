/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class DeskBrokerObjectProvider {
  /** ************************ Buyer ***************** */
  ddlBuyerBroker() { return '//input[@data-testid="ddlbuyerBroker"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  ddlBuyerBrokerClickToType() { return '//input[@data-testid="ddlbuyerBroker"]@@Enabled_And_Visible||10'; }

  lblBuyerBroker() { return '//input[@data-testid="ddlbuyerBroker"]//preceding-sibling::span@@Enabled_And_Visible||10'; }

  ddlBuyerBrokerFocus() { return '//input[@data-testid="ddlbuyerBroker"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  // 3CP
  ddlcp2BuyerBroker() { return '//input[@data-testid="ddlcp2BuyerBroker"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  lblcp2BuyerBroker() { return '//input[@data-testid="ddlcp2BuyerBroker"]//preceding-sibling::span@@Enabled_And_Visible||10'; }

  ddlcp2BuyerBrokerFocus() { return '//input[@data-testid="ddlcp2BuyerBroker"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  /** ************************ seller ***************** */
  ddlSellerBroker() { return '//input[@data-testid="ddlsellerBroker"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  ddlSellerBrokerClickToType() { return '//input[@data-testid="ddlsellerBroker"]@@Enabled_And_Visible||10'; }

  lblSellerBroker() { return '//input[@data-testid="ddlsellerBroker"]//preceding-sibling::span@@Enabled_And_Visible||10'; }

  ddlSellerBrokerFocus() { return '//input[@data-testid="ddlsellerBroker"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  // 3CP
  ddlcp2SellerBroker() { return '//input[@data-testid="ddlcp2SellerBroker"]//following-sibling::span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  lblcp2SellerBroker() { return '//input[@data-testid="ddlcp2SellerBroker"]//preceding-sibling::span@@Enabled_And_Visible||10'; }

  ddlcp2SellerBrokerFocus() { return '//input[@data-testid="ddlcp2SellerBroker"]//ancestor::span[contains(@class,"ant-cascader-picker")]@@Enabled_And_Visible||10'; }

  /* ***************************** common ********************* */

  liBrokerName(brokerName) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[text()="BROKER_NAME"]'.replace('BROKER_NAME', brokerName)}@@Enabled_And_Visible||10`; }

  liDeskName(brokerDesk) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[text()="DESK_NAME"]'.replace('DESK_NAME', brokerDesk)}@@Enabled_And_Visible||10`; }

  liBrokerNameLower(deskName, brokerName) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[contains(.,"DESK_NAME") and contains(.,"BROKER_NAME")]'.replace('DESK_NAME', deskName).replace('BROKER_NAME', brokerName)}@@Enabled_And_Visible||10`; }

  liBrokerNameUpper(deskName, brokerName) { return `${'//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]//li[text()="DESK_NAME"]//span[text()="BROKER_NAME"]'.replace('DESK_NAME', deskName).replace('BROKER_NAME', brokerName)}@@Enabled_And_Visible||10`; }

  casCadBuyerSeller() { return '//div[contains(@class,"ant-cascader-menus-placement") and not(contains(@class,"ant-cascader-menus-hidden"))]@@Enabled_And_Visible||.5'; }
}
module.exports = DeskBrokerObjectProvider;
