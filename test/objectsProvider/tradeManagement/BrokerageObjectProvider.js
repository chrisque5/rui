/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class BrokerageObjectProvider {
  // Select Blotter
  mnuBlotter() { return '//li[@data-menu-id="rc-menu-uuid-92859-3-BLOTTER"]//a//span||10'; }

  // Right click Blotter
  // TBC
  // Select Deal from first row of Blotter (Note: parameterize row index to select other rows)
  grdSelectDeal() { return '//div[@row-index="0"]//div[@col-id="payerBrokerName"]@@Enabled_And_Visible||10'; }

  grdGetDealId() { return '//div[@row-index="0"]//div[@col-id="dmsDealReference"]@@Enabled_And_Visible||10'; }

  mnuPopUp() { return '//div[@class="ag-menu-list"]//div[@class="ag-menu-option"]//span[text()="View Deal"]@@Enabled_And_Visible||10'; }

  // Trade Management Brokerage Buttons
  btnSave() { return '//button[@data-testid="btnDealSave"]@@Enabled_And_Visible||10'; }

  btnEdit() { return '//div//button[@data-testid="btnEditDeal"]@@Enabled_And_Visible||10'; }

  btnDiscard() { return '//button[@data-testid="btnDiscard"]@@Enabled_And_Visible||10'; }

  btnRefresh() { return '//button[@data-testid="btnRefresh"]@@Enabled_And_Visible||10'; }

  btnCancel() { return '//button[@data-testid="btnCancel"]@@Enabled_And_Visible||10'; }

  // Brokerage Headers
  lblDealHeader() { return '//div[@class="ant-collapse-header"]@@Enabled_And_Visible||10'; }

  lblBuyerHeader() { return '//div[text()="Buyer Brokerage"]@@Enabled_And_Visible||10'; }

  // Deal Information Labels
  lblRef() { return '//div[@data-testid="dmsDealReference"]//span//b[text()="DMS Ref: "]@@Enabled_And_Visible||10'; }

  lblType() { return '//div[@data-testid="dealType"]//span//b[text()="DMS Type: "]@@Enabled_And_Visible||10;'; }

  lblAction() { return '//div[@data-testid="dealAction"]//span//b[text()="DMS Action: "]@@Enabled_And_Visible||10'; }

  lblTradeDateTime() { return '//div[@data-testid="tradeDateTime"]//span//b[text()="Trade Date/Time: "]@@Enabled_And_Visible||10'; }

  lblExecutionDateTime() { return '//div[@data-testid="executionDateTime"]//span//b[text()="Execution Date/Time: "]@@Enabled_And_Visible||10;'; }

  lblStatus() { return '//div[@data-testid="dealStatus"]//span//b[text()="Deal Status: "]@@Enabled_And_Visible||10'; }

  // Deal Information Values
  lblRefVal() { return '//div[@data-testid="dmsDealReference"]//span/following-sibling::span@@Enabled_And_Visible||10'; }

  lblTypeVal() { return '//div[@data-testid="dealType"]//span/following-sibling::span@@Enabled_And_Visible||10'; }

  lblActionVal() { return '//div[@data-testid="dealAction"]//span/following-sibling::span@@Enabled_And_Visible||10'; }

  lblTradeDateVal() { return '//div[@data-testid="tradeDateTime"]//span/following-sibling::span@@Enabled_And_Visible||10'; }

  lblExecutionDateVal() { return '//div[@data-testid="executionDateTime"]//span[text()="29/09/2021 09:27:10"]||10'; }

  lblStatusVal() { return '//div[@data-testid="dealStatus"]//span/following-sibling::span@@Enabled_And_Visible||10'; }

  // Buyer Brokerage
  lblBuyerBrokerageType() { return '//span[@data-testid="payer-brokerageTypeLabel"]@@Enabled_And_Visible||10'; }

  lblBuyerBrokerageTypeEdit() { return '//span[@data-testid="payer-brokerageType"]@@Enabled_And_Visible||10'; }

  valPayerCurrancy() { return '//input[@data-testid="payer-currencyLabel"]@@Enabled_And_Visible||10;'; }

  valPayerAmount() { return '//input[@data-testid="payer-amount"]@@Enabled_And_Visible||10'; }

  // Buyer Side verification paths
  valBuyerBroker() { return '//tr[contains(@data-row-key,"payer")][1]//td[1]//span@@Enabled_And_Visible||10'; }

  valBuyerCentre() { return '//tr[contains(@data-row-key,"payer")][1]//td[2]//span@@Enabled_And_Visible||10'; }

  valBuyerAlloc() { return '//tr[contains(@data-row-key,"payer")][1]//td[3]//span@@Enabled_And_Visible||10'; }

  valBuyerRecieve() { return '//tr[contains(@data-row-key,"payer")][1]//td[4]//span@@Enabled_And_Visible||10'; }

  valBuyerUpdated() { return '//tr[contains(@data-row-key,"payer")][1]//td[5]//span@@Enabled_And_Visible||10'; }

  // Seller Brokerage (parameterisation to be added)
  lblSellerAuto() { return '//span[@data-testid="receiver-brokerageTypeLabel"]@@Enabled_And_Visible||10'; }

  lblSellerBrokerageTypeEdit() { return '//span[@data-testid="receiver-brokerageType"]@@Enabled_And_Visible||10'; }

  valSellerCurrancy() { return '//input[@data-testid="receiver-currencyLabel"]@@Enabled_And_Visible||10;'; }

  valSellerAmount() { return '//input[@data-testid="receiver-amountLabel"]@@Enabled_And_Visible||10'; }

  valSellerBroker() { return '//tr[contains(@data-row-key,"receiver")][1]//td[1]//span@@Enabled_And_Visible||10'; }

  valSellerCentre() { return '//tr[contains(@data-row-key,"receiver")][1]//td[2]//span@@Enabled_And_Visible||10'; }

  valSellerAlloc() { return '//tr[contains(@data-row-key,"receiver")][1]//td[3]//span@@Enabled_And_Visible||10'; }

  valSellerRecieve() { return '//tr[contains(@data-row-key,"receiver")][1]//td[4]//span@@Enabled_And_Visible||10'; }

  valSellerUpdated() { return '//tr[contains(@data-row-key,"receiver")][1]//td[5]//span@@Enabled_And_Visible||10'; }
  // valSellerBroker() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td//span[text()="IAN GABLE"]||10';}
  // valSellerCentre() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td//span[text()="LONDON NDF"]||10';}
  // valSellerAlloc() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td[3]//span[text()="100"]||10';}
  // valSellerRecieve() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td[4]//span[text()="100"]||10';}
  // valSellerUpdated() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td//span[text()="BELFAST TPEUR TEST BROKER 1"]||10';}

  // Edit functionality
  // Buttons
  btnBuyerAdd() { return '//tr[contains(@data-row-key,"payer")]//button[contains(@data-testid,"Add")]@@Enabled_And_Visible||10'; }

  btnBuyerDelete() { return '//button[@data-testid="btn100Delete"]||10'; }

  btnSellerAdd() { return '//tr[contains(@data-row-key,"receiver")]//button[contains(@data-testid,"Add")]@@Enabled_And_Visible||10'; }

  btnSellerDelete() { return '//button[@data-testid="btn101Delete"]||10'; }

  btnEditOk() { return '//button[@data-testid="btnOk"]@@Enabled_And_Visible||10'; }

  // input boxes
  inputManualBuyerAmt() { return '//input[@data-testid="payer-amount"]@@Enabled_And_Visible||10'; }

  inputManualSellerAmt() { return '//input[@data-testid="receiver-amount"]@@Enabled_And_Visible||10'; }

  // ListBoxes (PAramterisation to be added)
  inptBuyerCurrency() { return 'div[@class="rc-virtual-list-holder-inner"]@@Enabled_And_Visible||10'; }
  // inptBuyerCurrency() {return '//div[@class="rc-virtual-list-holder-inner"]@@Enabled_And_Visible||10';}

  dllBuyerCurrency() { return '//div[@data-testid="payer-currency"]//following-sibling::span//span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  dllSellerCurrency() { return '//div[@data-testid="receiver-currency"]//following-sibling::span//span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  lstSellerCurrancy() { return '//div[@data-testid="receiver-currency"]||10'; }

  // edit first row method 1 - Note parameterization of opt xpaths required for reusability
  lstBuyerBroker() { '//div[@data-testid="200brokerGcdPostingName"]//span[@class="ant-select-arrow"]||10'; }

  // optBuyerSelectBroker(broker) { '//div[@class="rc-virtual-list-holder-inner"]//div[@title="GARY CHAN"]||10'; }

  lstBuyerProfitCentre() { return '////tr[contains(@data-row-key,"payer")][1]//td[3]//span[@class="ant-select-arrow"]||10'; }

  optBuyerSelectCentre() { return '//div[@class="rc-virtual-list-holder-inner"]//div[@title="LONDON NDF"]||10'; }

  // inputBuyerAlloc() {return '//input[contains(@id,"payer")and(contains(@id,"percentage"))]||10';}
  inputBuyerReceive() { return '//td//input[contains(@id,"payer")and(contains(@id,"amount"))]||10'; }

  inputBuyAmount() { return '//td//input[contains(@id,"payer")and(contains(@id,"amount"))]||10'; }

  // edit rows method 2 - note requires either parameterization of row and col or multiple xpath defs with hardcoded row, col

  dllBuyerBroker() { return '//tr[contains(@data-row-key,"payer")][2]//td[2]//following-sibling::span//span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  dllBuyerCentre() { return '//tr[contains(@data-row-key,"payer")][2]//td[3]//following-sibling::span//span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  inputBuyerAlloc() { return '//tr[contains(@data-row-key,"payer")][2]//td[3]//span@@Enabled_And_Visible||10'; }

  inptBuyerBrokerage() { return '//tr[contains(@data-row-key,"payer")][2]//td[5]//input@@Enabled_And_Visible||10'; }

  // seller
  dllSellerBroker() { return '//tr[contains(@data-row-key,"receiver")][2]//td[2]//following-sibling::span//span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  dllSellerCentre() { return '//tr[contains(@data-row-key,"receiver")][2]//td[3]//following-sibling::span//span[contains(@class,"anticon-down")]@@Enabled_And_Visible||10'; }

  inputSellerAlloc() { return '//tr[contains(@data-row-key,"receiver")][2]//td[3]//span@@Enabled_And_Visible||10'; }

  inputSellerBrokerage() { return '//tr[contains(@data-row-key,"receiver")][2]//td[5]//input@@Enabled_And_Visible||10'; }

  // lstSellerArrow(row,col) {return '//div[text()="Seller Brokerage"]/../../..//table//tbody//tr[1]//td[2]//span[@class="ant-select-arrow"]||10';}
  // lists with no arrows
  // lstBuyer(row, col) { return '//tr[contains(@data-row-key,"payer")][1]//td[4]//input||10'; }

  // lstSeller(row, col) { return '//tr[contains(@data-row-key,"receiver")][1]//td[5]//input||10'; }

  windowClick() { return '//div[text()="Buyer Brokerage"]//input@@Enabled_And_Visible||10'; }

  txtAreaSave() { return '//div//textarea[@data-testid="editDescription"]@@Enabled_And_Visible||10'; }

  brokerEmptyTable() { return '//div[@class="ant-table ant-table-bordered ant-table-empty"]@@Enabled_And_Visible||10'; }

  brokerageExplanation() { return '//div[@title="Manually set by BELFAST TPEUR TEST BROKER 1"]/../../../..//div[text()="Buyer Brokerage"]@@Enabled_And_Visible||10'; }

  brokerageExplanationSeller() { return '//div[@title="Manually set by BELFAST TPEUR TEST BROKER 1"]/../../../..//div[text()="Seller Brokerage"]@@Enabled_And_Visible||10'; }
}
module.exports = BrokerageObjectProvider;
