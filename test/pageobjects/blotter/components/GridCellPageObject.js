/* eslint-disable max-len */
const GridCellPropertyProvider = require('../../../objectsProvider/blotter/components/GridCellPropertyProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class GridCellPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.gridCellProperty = new GridCellPropertyProvider();
  }

  gridRow(dealId) { return this.elmtProc.getEl(this.gridCellProperty.gridRow(dealId)); }

  imgBuyerStpStatus(dealId) { return this.elmtProc.getEl(this.gridCellProperty.imgBuyerStpStatus(dealId)); }

  imgBuyerStpStatusNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.imgBuyerStpStatus(dealId)); }

  imgSellerStpStatus(dealId) { return this.elmtProc.getEl(this.gridCellProperty.imgSellerStpStatus(dealId)); }

  imgSellerStpStatusNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.imgSellerStpStatus(dealId)); }

  mskOverlayWrapper() { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.mskOverlayWrapper()); }

  rowZeroCell(columnId) { return this.elmtProc.getEl(this.gridCellProperty.rowZeroCell(columnId)); }

  gridCellByRowIndex(rowIndex, columnId) { return this.elmtProc.getEl(this.gridCellProperty.gridCellByRowIndex(rowIndex, columnId)); }

  stpStatusByRowIndex(rowIndex, columnId) { return this.elmtProc.getEl(this.gridCellProperty.stpStatusByRowIndex(rowIndex, columnId)); }

  chkIsUnderInvestigation(dealId) { return this.elmtProc.getEl(this.gridCellProperty.chkIsUnderInvestigation(dealId)); }

  chkIsUnderInvestigationByCell(cellElement) { return this.elmtProc.getChildElement(cellElement, './/span[@classname="is-under-investigation-cell"]//span'); }

  txtCheckFlag(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtCheckFlag(dealId)); }

  txtDealIDNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtDealID(dealId)); }

  txtDealStatus(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtDealStatus(dealId)); }

  txtDealAction(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtDealAction(dealId)); }

  txtDealType(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtDealType(dealId)); }

  txtStrategy(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtStrategy(dealId)); }

  txtChainReference(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtChainReference(dealId)); }

  txtTradeDate(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtTradeDate(dealId)); }

  txtTradeDateByIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtTradeDateByIndex(index)); }

  txtTradeTime(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtTradeTime(dealId)); }

  txtExecVenue(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtExecVenue(dealId)); }

  txtValueDate(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtValueDate(dealId)); }

  txtAmount(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtAmount(dealId)); }

  txtPrice(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtPrice(dealId)); }

  txtBuyerCustomer(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerCustomer(dealId)); }

  txtBuyerCustomerLong(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerCustomerLong(dealId)); }

  txtBuyerCustomerByRowIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerCustomerByRowIndex(index)); }

  txtBuyerTrader(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerTrader(dealId)); }

  txtBuyerTraderLong(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerTraderLong(dealId)); }

  txtBuyerTraderByRowIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerTraderByRowIndex(index)); }

  txtBuyerBroker(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerBroker(dealId)); }

  txtBuyerBrokerLong(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerBrokerLong(dealId)); }

  txtBuyerBrokerByRowIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerBrokerByRowIndex(index)); }

  txtSellerCustomer(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerCustomer(dealId)); }

  txtSellerCustomerLong(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerCustomerLong(dealId)); }

  txtSellerCustomerByRowIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerCustomerByRowIndex(index)); }

  txtSellerTrader(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerTrader(dealId)); }

  txtSellerTraderLong(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerTraderLong(dealId)); }

  txtSellerTraderByRowIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerTraderByRowIndex(index)); }

  txtSellerBroker(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerBroker(dealId)); }

  txtSellerBrokerLong(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerBrokerLong(dealId)); }

  txtSellerBrokerByRowIndex(index) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerBrokerByRowIndex(index)); }

  txtBuyerOverallApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerOverallApprovals(dealId)); }

  txtBuyerOverallApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtBuyerOverallApprovals(dealId)); }

  txtSellerOverallApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerOverallApprovals(dealId)); }

  txtSellerOverallApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtSellerOverallApprovals(dealId)); }

  txtBuyerBrokerApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerBrokerApprovals(dealId)); }

  txtBuyerBrokerApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtBuyerBrokerApprovals(dealId)); }

  txtBuyerMidOfficeApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerMidOfficeApprovals(dealId)); }

  txtBuyerMidOfficeApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtBuyerMidOfficeApprovals(dealId)); }

  txtBuyerTraderApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerTraderApprovals(dealId)); }

  txtBuyerTraderApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtBuyerTraderApprovals(dealId)); }

  txtSellerBrokerApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerBrokerApprovals(dealId)); }

  txtSellerBrokerApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtSellerBrokerApprovals(dealId)); }

  txtSellerMidOfficeApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerMidOfficeApprovals(dealId)); }

  txtSellerMidOfficeApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtSellerMidOfficeApprovals(dealId)); }

  txtSellerTraderApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerTraderApprovals(dealId)); }

  txtSellerTraderApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.txtSellerTraderApprovals(dealId)); }

  btnBuyerBrokerApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.btnBuyerBrokerApprovals(dealId)); }

  btnBuyerBrokerApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.btnBuyerBrokerApprovals(dealId)); }

  btnBuyerMidOfficeApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.btnBuyerMidOfficeApprovals(dealId)); }

  btnBuyerMidOfficeApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.btnBuyerMidOfficeApprovals(dealId)); }

  btnBuyerTraderApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.btnBuyerTraderApprovals(dealId)); }

  btnBuyerTraderApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.btnBuyerTraderApprovals(dealId)); }

  btnSellerBrokerApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.btnSellerBrokerApprovals(dealId)); }

  btnSellerBrokerApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.btnSellerBrokerApprovals(dealId)); }

  btnSellerMidOfficeApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.btnSellerMidOfficeApprovals(dealId)); }

  btnSellerMidOfficeApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.btnSellerMidOfficeApprovals(dealId)); }

  btnSellerTraderApprovals(dealId) { return this.elmtProc.getEl(this.gridCellProperty.btnSellerTraderApprovals(dealId)); }

  btnSellerTraderApprovalsNoCheck(dealId) { return this.elmtProc.getElWithoutCheck(this.gridCellProperty.btnSellerTraderApprovals(dealId)); }

  txtBuyerSTP(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerSTP(dealId)); }

  txtSellerSTP(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerSTP(dealId)); }

  txtBuyerBrokerage(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerBrokerage(dealId)); }

  txtSellerBrokerage(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerBrokerage(dealId)); }

  txtBuyerBrokerageCcy(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtBuyerBrokerageCcy(dealId)); }

  txtSellerBrokerageCcy(dealId) { return this.elmtProc.getEl(this.gridCellProperty.txtSellerBrokerageCcy(dealId)); }

  getCellElementByRow(element, cellInfo) { return this.elmtProc.getChildElement(element, cellInfo); }
}

module.exports = GridCellPageObject;
