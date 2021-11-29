/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class AgentObjectProvider {
  /** ************************
   ************* Buyer *************
  *********************************** */

  ddlBuyerAgent() { return '//div[@data-testid="ddlbuyerAgent"]//span[@class="ant-select-arrow"]//span@@Enabled_And_Visible||10'; }

  btnClearBuyerAgent() { return '//div[@id="buyerAgent"]//i[contains(@class,"ant-select-clear-icon")]@@Enabled_And_Visible||.5'; }

  inputBuyerAgent() { return '//input[@id="buyerAgent"]@@Enabled_And_Visible||10'; }

  lblBuyerAgent() { return '//div[@data-testid="ddlbuyerAgent"]//span[@class="ant-select-selection-item"]@@Enabled_And_Visible||10'; }

  lblOuterBuyerAgent() { return '//div[@data-testid="ddlbuyerAgent"]@@Enabled_And_Visible||10'; }

  lblBuyerAgentEmpty() { return '//div[@data-testid="ddlbuyerAgent"]//span//following-sibling::span@@Enabled_And_Visible||10'; }

  ddlBuyerAgentFocus() { return '//div[@data-testid="ddlbuyerAgent"]//ancestor::div[contains(@class,"ant-select")]@@Enabled_And_Visible||10'; }

  // 3CP
  ddlCP2BuyerAgent() { return '//div[@data-testid="ddlcp2BuyerAgent"]//span[@class="ant-select-arrow"]//span@@Enabled_And_Visible||10'; }

  btnClearCP2BuyerAgent() { return '//div[@id="cp2BuyerAgent"]//i[contains(@class,"ant-select-clear-icon")]@@Enabled_And_Visible||.5'; }

  inputCP2BuyerAgent() { return '//input[@id="cp2BuyerAgent"]@@Enabled_And_Visible||10'; }

  lblCP2BuyerAgent() { return '//div[@data-testid="ddlcp2BuyerAgent"]//span[@class="ant-select-selection-item"]@@Enabled_And_Visible||10'; }

  ddlcp2BuyerAgentFocus() { return '//div[@data-testid="ddlcp2BuyerAgent"]//ancestor::div[contains(@class,"ant-select")]@@Enabled_And_Visible||10'; }

  /** ************************
   ************* seller *************
  *********************************** */

  ddlSellerAgent() { return '//div[@data-testid="ddlsellerAgent"]//span[@class="ant-select-arrow"]//span@@Enabled_And_Visible||10'; }

  btnClearSellerAgent() { return '//div[@id="sellerAgent"]//i[contains(@class,"ant-select-clear-icon")]@@Enabled_And_Visible||.5'; }

  inputSellerAgent() { return '//input[@id="sellerAgent"]@@Enabled_And_Visible||10'; }

  lblSellerAgent() { return '//div[@data-testid="ddlsellerAgent"]//span[@class="ant-select-selection-item"]@@Enabled_And_Visible||10'; }

  lblSellerAgentEmpty() { return '//div[@data-testid="ddlsellerAgent"]//span//following-sibling::span@@Enabled_And_Visible||10'; }

  ddlSellerAgentFocus() { return '//div[@data-testid="ddlsellerAgent"]//ancestor::div[contains(@class,"ant-select")]@@Enabled_And_Visible||10'; }


  // 3CP
  ddlCP2SellerAgent() { return '//div[@data-testid="ddlcp2SellerAgent"]//span[@class="ant-select-arrow"]//span@@Enabled_And_Visible||10'; }

  btnClearCP2SellerAgent() { return '//div[@id="cp2SellerAgent"]//i[contains(@class,"ant-select-clear-icon")]@@Enabled_And_Visible||.5'; }

  inputCP2SellerAgent() { return '//input[@id="cp2SellerAgent"]@@Enabled_And_Visible||10'; }

  lblCP2SellerAgent() { return '//div[@data-testid="ddlcp2SellerAgent"]//span[@class="ant-select-selection-item"]@@Enabled_And_Visible||10'; }

  ddlcp2SellerAgentFocus() { return '//div[@data-testid="ddlcp2SellerAgent"]//ancestor::div[contains(@class,"ant-select")]@@Enabled_And_Visible||10'; }

  /* ***************************** common ********************* */
  liBuyerSellerAgent(agent) { return `${'//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]//div[text()="AGENT"]'.replace('AGENT', agent)}@@Enabled_And_Visible||10`; }

  casCadAgent() { return '//div[contains(@class,"ant-select-dropdown") and not (contains(@class,"ant-select-dropdown-hidden"))]@@Enabled_And_Visible||.5'; }

}
module.exports = AgentObjectProvider;
