/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

class GridCellPropertyProvider {
  gridRow(dealId) { return `${'//div[@role="rowgroup"]/div[@row-id="TEMP"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  imgBuyerStpStatus(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="payerSTPStatusGroup"]//span[contains(@class, "stp-traffic")]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  imgSellerStpStatus(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="receiverSTPStatusGroup"]//span[contains(@class, "stp-traffic")]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  mskOverlayWrapper() { return '//span[text()="Please wait while the data is loading"]@@Enabled_And_Visible||2'; }

  rowZeroCell(columnId) { return `${'//div[@row-index="0"]//div[@col-id="COLUMN"]'.replace('COLUMN', columnId)}@@Enabled_And_Visible||4`; }

  gridCellByRowIndex(rowIndex, columnId) { return `${'//div[@row-index="ROW"]//div[@col-id="COLUMN"]'.replace('ROW', rowIndex).replace('COLUMN', columnId)}@@Enabled_And_Visible||4`; }

  stpStatusByRowIndex(rowIndex, columnId) { return `${'//div[@row-index="ROW"]//div[@col-id="COLUMN"]//span[contains(@class, "stp-traffic")]'.replace('ROW', rowIndex).replace('COLUMN', columnId)}@@Enabled_And_Visible||4`; }

  chkIsUnderInvestigation(dealId) { return `${'//div[@row-id="TEMP"]//input[@class="custom-checkbox"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtCheckFlag(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="isDealUnderInvestigation"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtDealID(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="dealId"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtDealStatus(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="dealStatus"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtDealAction(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="dealAction"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtDealType(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="dealType"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtStrategy(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="tradeStrategy"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtChainReference(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="chainId"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtTradeDate(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="tradeDate"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtTradeDateByIndex(index) { return `${'(//div[@col-id="tradeDate"])[INDEX]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtTradeTime(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="tradeTime"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtExecVenue(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="executionVenueType"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtValueDate(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="valueDate"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtAmount(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="notionalAmount"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtPrice(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="price"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerCustomer(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerCustomerName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerCustomerLong(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerCustomerLongName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerCustomerByRowIndex(index) { return `${'//div[@row-index="INDEX"]//div[@col-id="payerCustomerName"]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtBuyerTrader(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerTraderName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerTraderLong(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerTraderLongName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerTraderByRowIndex(index) { return `${'//div[@row-index="INDEX"]//div[@col-id="payerTraderName"]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtBuyerBroker(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerBrokerName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerBrokerLong(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerBrokerLongName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerBrokerByRowIndex(index) { return `${'//div[@row-index="INDEX"]//div[@col-id="payerBrokerName"]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtSellerCustomer(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverCustomerName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerCustomerLong(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverCustomerLongName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerCustomerByRowIndex(index) { return `${'//div[@row-index="INDEX"]//div[@col-id="receiverCustomerName"]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtSellerTrader(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverTraderName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerTraderLong(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverTraderLongName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerTraderByRowIndex(index) { return `${'//div[@row-index="INDEX"]//div[@col-id="receiverTraderName"]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtSellerBroker(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverBrokerName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerBrokerLong(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverBrokerLongName"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerBrokerByRowIndex(index) { return `${'//div[@row-index="INDEX"]//div[@col-id="receiverBrokerName"]'.replace('INDEX', index)}@@Enabled_And_Visible||4`; }

  txtBuyerOverallApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="payerOverallApprovalStatus"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerOverallApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="receiverOverallApprovalStatus"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerBrokerApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="payerBrokerApprovalState"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerMidOfficeApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="payerMidOfficeApprovalState"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerTraderApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="payerTraderApprovalState"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerBrokerApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="receiverBrokerApprovalState"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerMidOfficeApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="receiverMidOfficeApprovalState"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerTraderApprovals(dealId) { return `${'//div[@row-id="TEMP"]//div[@col-id="receiverTraderApprovalState"]/span/label'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  btnBuyerBrokerApprovals(dealId) { return `${'//button[@data-testid="approval-TEMP-payer-broker-pending"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  btnBuyerMidOfficeApprovals(dealId) { return `${'//button[@data-testid="approval-TEMP-payer-mid_office-pending"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  btnBuyerTraderApprovals(dealId) { return `${'//button[@data-testid="approval-TEMP-payer-trader-pending"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  btnSellerBrokerApprovals(dealId) { return `${'//button[@data-testid="approval-TEMP-receiver-broker-pending"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  btnSellerMidOfficeApprovals(dealId) { return `${'//button[@data-testid="approval-TEMP-receiver-mid_office-pending"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  btnSellerTraderApprovals(dealId) { return `${'//button[@data-testid="approval-TEMP-receiver-trader-pending"]'.replace('TEMP', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerSTP(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerSTPStatusGroup"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerSTP(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverSTPStatusGroup"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerBrokerage(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerBrokerageAmount"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerBrokerage(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverBrokerageAmount"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtBuyerBrokerageCcy(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="payerBrokerageCurrency"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }

  txtSellerBrokerageCcy(dealId) { return `${'//div[@row-id="DEAL"]//div[@col-id="receiverBrokerageCurrency"]'.replace('DEAL', dealId)}@@Enabled_And_Visible||4`; }
}
module.exports = GridCellPropertyProvider;
