/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class BrokerageObjectProvider {
    //Select Blotter
    mnuBlotter() {return '//li[@data-menu-id="rc-menu-uuid-92859-3-BLOTTER"]//a//span||10';}
    //Right click Blotter 
    //TBC 
    // Select Deal from first row of Blotter (Note: parameterize row index to select other rows)
    grdSelectDeal() {return '//div[@row-index="0"]//div[@col-id="payerBrokerName"]@@Enabled_And_Visible||10';}
    mnuPopUp() {return '//div[@class="ag-menu-list"]//div[@class="ag-menu-option"]//span[text()="View Deal"]@@Enabled_And_Visible||10';}
   
  
    //Trade Management Brokerage Buttons
    btnSave() {return '//button[@data-testid="btnDealSave"]@@Enabled_And_Visible||10';}
    btnEdit() {return '//button[@data-testid="btnEditDeal"]@@Enabled_And_Visible||10'; }
    btnDiscard() {return '//button[@data-testid="btnDiscard"]@@Enabled_And_Visible||10'; }
    btnRefresh() {return '//button[@data-testid="btnRefresh"]@@Enabled_And_Visible||10';}
    btnCancel() {return '//button[@data-testid="btnCancel"]@@Enabled_And_Visible||10';}
  
    //Brokerage Headers
    lblDealHeader() {return '//div[@class="ant-collapse-header"]@@Enabled_And_Visible||10';}
    lblBuyerHeader() {return '//div[text()="Buyer Brokerage"]@@Enabled_And_Visible||10';}
    
    //Deal Information Labels 
    lblRef( ){return '//div[@data-testid="dmsDealReference"]//span//b[text()="DMS Ref: "]@@Enabled_And_Visible||10';}
    lblType() {return '//div[@data-testid="dealType"]//span//b[text()="DMS Type: "]@@Enabled_And_Visible||10;'}
    lblAction() {return '//div[@data-testid="dealAction"]//span//b[text()="DMS Action: "]@@Enabled_And_Visible||10';}
    lblTradeDateTime() {return '//div[@data-testid="tradeDateTime"]//span//b[text()="Trade Date/Time: "]@@Enabled_And_Visible||10';}
    lblExecutionDateTime() {return '//div[@data-testid="executionDateTime"]//span//b[text()="Execution Date/Time: "]@@Enabled_And_Visible||10;'}
    lblStatus() {return '//div[@data-testid="dealStatus"]//span//b[text()="Deal Status: "]@@Enabled_And_Visible||10';}
  
    //Deal Information Values
    //alternative method of passing expected value as parameter ?
    lblRefVal(dmsRef) {return '//div[@data-testid="dmsDealReference"]//span[text()=${dmsRef}]||10';}
    //adding remaining xpaths without parameterising at this point
    lblTypeVal() {return '//div[@data-testid="dealType"]//span[text()="NDF"]||10';}
    lblActionVal() {return '//div[@data-testid="dealAction"]//span[text()="NEW"]||10';}
    lblTradeDatVal() {return '//div[@data-testid="tradeDateTime"]//span[text()="29/09/2021 09:27:10"]||10';}
    lblExecutionDateVal() {return '//div[@data-testid="executionDateTime"]//span[text()="29/09/2021 09:27:10"]||10';}
    lblStatusVal() {return '//div[@data-testid="dealStatus"]//span[text()="APPROVED"]||10';}
  
    //Buyer Brokerage (val..  needs parameterisation)
    lblBuyerAuto() {return '//span[@data-testid="payer-brokerageTypeLabel" and text()= "Auto"]||10';}
    valPayerCurrancy() {return '//div[@data-testid="payer-currencyLabel"]//input[@value="EUR"]||10;'}
    valPayerAmount() {return '//div[@data-testid="payer-amountLabel"]//input[@value="2588593.04"]||10';}
    valBuyerBroker() {return '//div[text()="Buyer Brokerage"]/../../..//div[@class="ant-card-body"]//table//tr//td//span[text()="IAN GABLE"]||10';}
    valBuyerCentre() {return '//div[text()="Buyer Brokerage"]/../../..//div[@class="ant-card-body"]//table//tr//td//span[text()="LONDON NDF"]||10';}
    valBuyerAlloc() {return '//div[text()="Buyer Brokerage"]/../../..//div[@class="ant-card-body"]//table//tr//td//span[text()="100"]||10';}
    valBuyerRecieve() {return '//div[text()="Buyer Brokerage"]/../../..//div[@class="ant-card-body"]//table//tr//td//span[text()="150"]||10';}
    valBuyerUpdated() {return '//div[text()="Buyer Brokerage"]/../../..//div[@class="ant-card-body"]//table//tr//td//span[text()="BELFAST TPEUR TEST BROKER 1"]||10';}
  
    //Seller Brokerage (parameterisation to be added)
    lblSellerAuto() {return '//span[@data-testid="receiver-brokerageTypeLabel" and text()= "Auto"]||10';}
    valSellerCurrancy() {return '//div[@data-testid="receiver-currencyLabel"]//input[@value="USD"]||10;'}
    valSellerAmount() {return '//div[@data-testid="receiver-amountLabel"]//input[@value="6000000"]||10';}
    valSellerBroker() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td//span[text()="IAN GABLE"]||10';}
    valSellerCentre() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td//span[text()="LONDON NDF"]||10';}
    valSellerAlloc() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td[3]//span[text()="100"]||10';}
    valSellerRecieve() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td[4]//span[text()="100"]||10';}
    valSellerUpdated() {return '//div[text()="Seller Brokerage"]/../../..//table//tr//td//span[text()="BELFAST TPEUR TEST BROKER 1"]||10';}
  
   // Edit functionality
   //Buttons
    btnBuyerAdd() {return '//button[@data-testid="btn-100-Add"]||10';}
    btnBuyerDelete() {return '//button[@data-testid="btn100Delete"]||10'; }
    btnSellerAdd() {return '//button[@data-testid="btn-101-Add"]||10'; }
    btnSellerDelete() {return '//button[@data-testid="btn101Delete"]||10';}
    
    //input boxes
    inputManualBuyerAmt() {return '//div[@data-testid="payer-amount"]//input||10';}
    inputManualSellerAmt() {return '//div[@data-testid="receiver-amount"]//input||10';}
  
     //ListBoxes (PAramterisation to be added)
     lstBuyerCurrancy() {return '//div[@data-testid="payer-currency"]||10';}
     lstSelectBuyerCurrancy() {return '//div[@data-testid="100brokerGcdPostingName"]//span[@class="ant-select-arrow"]||10';}
     dllBuyerCurrancy() {return '//div[@data-testid="100brokerGcdPostingName"]//div[@class="ant-select-selector"]//input[@aria-expanded="true"]||10';}
    
     lstSellerCurrancy() {return '//div[@data-testid="receiver-currency"]||10'}
     lstSelectSellerCurrancy() {return '//div[@name="receiver-currency"]//span[@class="ant-select-arrow"]||10';}
  
     //edit first row method 1 - Note parameterization of opt xpaths required for reusability
     lstBuyerBroker() {'//div[@data-testid="200brokerGcdPostingName"]//span[@class="ant-select-arrow"]||10';}
     optBuyerSelectBroker(broker) {'//div[@class="rc-virtual-list-holder-inner"]//div[@title="GARY CHAN"]||10';}
     lstBuyerProfitCentre() {return '////tr[contains(@data-row-key,"payer")][1]//td[3]//span[@class="ant-select-arrow"]||10';}
     optBuyerSelectCentre() {return '//div[@class="rc-virtual-list-holder-inner"]//div[@title="LONDON NDF"]||10';}
     inputBuyerAlloc() {return '//input[contains(@id,"payer")and(contains(@id,"percentage"))]||10';}
     inputBuyerReceive() {return '//td//input[contains(@id,"payer")and(contains(@id,"amount"))]||10';}
     inputBuyAmount() {return '//td//input[contains(@id,"payer")and(contains(@id,"amount"))]||10';}
  
     //edit rows method 2 - note requires either parameterization of row and col or multiple xpath defs with hardcoded row, col
     //lists with dropdown arrows 
     lstBuyerArrow(row,col)  {return '//div[text()="Buyer Brokerage"]/../../..//table//tbody//tr[1]//td[2]//span[@class="ant-select-arrow"]||10';}
     lstSellerArrow(row,col) {return '//div[text()="Seller Brokerage"]/../../..//table//tbody//tr[1]//td[2]//span[@class="ant-select-arrow"]||10';}
     //lists with no arrows
    lstBuyer(row,col) {return '//tr[contains(@data-row-key,"payer")][1]//td[4]//input||10';}
    lstSeller(row,col) {return '//tr[contains(@data-row-key,"receiver")][1]//td[5]//input||10';}
    
  }
  module.exports = BrokerageObjectProvider;
  