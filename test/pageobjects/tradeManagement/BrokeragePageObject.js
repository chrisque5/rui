/* eslint-disable max-len */
const BrokerageObjectProvider = require('../../objectsProvider/tradeManagement/BrokerageObjectProvider');
const ElementProcessor = require('../../core/element/ElementProcessor');
// const { element } = require('prop-types');

class BrokeragePageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.brokerage = new BrokerageObjectProvider();
  }

  mnuBlotter() { return this.elmtProc.getEl(this.brokerage.mnuBlotter()); }

  grdSelectDeal() { return this.elmtProc.getEl(this.brokerage.grdSelectDeal()); }

  grdGetDealId() { return this.elmtProc.getEl(this.brokerage.grdGetDealId()); }

  mnuPopUp() { return this.elmtProc.getEl(this.brokerage.mnuPopUp()); }

  // buttons
  btnSave() { return this.elmtProc.getEl(this.brokerage.btnSave()); }

  btnEdit() { return this.elmtProc.getEl(this.brokerage.btnEdit()); }

  btnDiscard() { return this.elmtProc.getEl(this.brokerage.btnDiscard()); }

  btnRefresh() { return this.elmtProc.getEl(this.brokerage.btnRefresh()); }

  btnCancel() { return this.elmtProc.getEl(this.brokerage.btnCancel()); }

  // headers
  lblDealHeader() { return this.elmtProc.getEl(this.brokerage.lblDealHeader()); }

  lblBuyerHeader() { return this.elmtProc.getEl(this.brokerage.lblBuyerHeader()); }

  // labels
  lblRef() { return this.elmtProc.getEl(this.brokerage.lblRef()); }

  lblType() { return this.elmtProc.getEl(this.brokerage.lblType()); }

  lblAction() { return this.elmtProc.getEl(this.brokerage.lblAction()); }

  lblTradeDateTime() { return this.elmtProc.getEl(this.brokerage.lblTradeDateTime()); }

  lblExecutionDateTime() { return this.elmtProc.getEl(this.brokerage.lblExecutionDateTime()); }

  lblStatus() { return this.elmtProc.getEl(this.brokerage.lblStatus()); }

  // Deal information Values
  lblRefVal(dmsRef) { return this.elmtProc.getEl(this.brokerage.lblRefVal(dmsRef)); }

  lblActionVal() { return this.elmtProc.getEl(this.brokerage.lblActionVal()); }

  // Parameters to be added
  lblTypeVal() { return this.elmtProc.getEl(this.brokerage.lblTypeVal()); }

  lblTradeDateVal() { return this.elmtProc.getEl(this.brokerage.lblTradeDateVal()); }

  lblExecutionDateVal() { return this.elmtProc.getEl(this.brokerage.lblExecutionDateVal()); }

  lblStatusVal() { return this.elmtProc.getEl(this.brokerage.lblStatusVal()); }

  // Buyer Brokerage (Parameters to be added)
  lblBuyerBrokerageType() { return this.elmtProc.getEl(this.brokerage.lblBuyerBrokerageType()); }

  lblBuyerBrokerageTypeEdit() { return this.elmtProc.getEl(this.brokerage.lblBuyerBrokerageTypeEdit()); }

  valPayerCurrancy() { return this.elmtProc.getEl(this.brokerage.valPayerCurrancy()); }

  valPayerAmount() { return this.elmtProc.getEl(this.brokerage.valPayerAmount()); }

  valBuyerBroker() { return this.elmtProc.getEl(this.brokerage.valBuyerBroker()); }

  valBuyerCentre() { return this.elmtProc.getEl(this.brokerage.valBuyerCentre()); }

  valBuyerAlloc() { return this.elmtProc.getEl(this.brokerage.valBuyerAlloc()); }

  valBuyerRecieve() { return this.elmtProc.getEl(this.brokerage.valBuyerRecieve()); }

  valBuyerUpdated() { return this.elmtProc.getEl(this.brokerage.valBuyerUpdated()); }

  // Seller Brokerage (parameterisation to be added)
  lblSellerAuto() { return this.elmtProc.getEl(this.brokerage.lblSellerAuto()); }

  lblSellerBrokerageTypeEdit() { return this.elmtProc.getEl(this.brokerage.lblSellerBrokerageTypeEdit()); }

  valSellerCurrancy() { return this.elmtProc.getEl(this.brokerage.valSellerCurrancy()); }

  valSellerAmount() { return this.elmtProc.getEl(this.brokerage.valSellerAmount()); }

  valSellerBroker() { return this.elmtProc.getEl(this.brokerage.valSellerBroker()); }

  valSellerCentre() { return this.elmtProc.getEl(this.brokerage.valSellerCentre()); }

  valSellerAlloc() { return this.elmtProc.getEl(this.brokerage.valSellerAlloc()); }

  valSellerRecieve() { return this.elmtProc.getEl(this.brokerage.valSellerRecieve()); }

  valSellerUpdated() { return this.elmtProc.getEl(this.brokerage.valSellerUpdated()); }

  // Edit
  btnBuyerAdd() { return this.elmtProc.getEl(this.brokerage.btnBuyerAdd()); }

  btnBuyerDelete() { return this.elmtProc.getEl(this.brokerage.btnBuyerDelete()); }

  btnSellerAdd() { return this.elmtProc.getEl(this.brokerage.btnSellerAdd()); }

  btnSellerDelete() { return this.elmtProc.getEl(this.brokerage.btnSellerDelete()); }

  // input boxes edit
  inputManualBuyerAmt() { return this.elmtProc.getEl(this.brokerage.inputManualBuyerAmt()); }

  inputManualSellerAmt() { return this.elmtProc.getEl(this.brokerage.inputManualSellerAmt()); }

  // ListBoxes (PAramterisation to be added)
  lstBuyerCurrancy() { return this.elmtProc.getEl(this.brokerage.lstBuyerCurrancy()); }

  inptBuyerCurrency() { return this.elmtProc.getEl(this.brokerage.inptBuyerCurrency()); }

  lstSelectBuyerCurrency() { return this.elmtProc.getEl(this.brokerage.lstSelectBuyerCurrency()); }

  dllBuyerCurrancy() { return this.elmtProc.getEl(this.brokerage.dllBuyerCurrency()); }

  lstSellerCurrancy() { return this.elmtProc.getEl(this.brokerage.lstSellerCurrancy()); }

  lstSelectSellerCurrancy() { return this.elmtProc.getEl(this.brokerage.lstSelectSellerCurrency()); }

  // Edit Table Rows
  // with dropdown arrows
  dllBuyerBroker() { return this.elmtProc.getEl(this.brokerage.dllBuyerBroker()); }

  dllBuyerCentre() { return this.elmtProc.getEl(this.brokerage.dllBuyerCentre()); }

  inputBuyerAlloc() { return this.elmtProc.getEl(this.brokerage.inputBuyerAlloc()); }

  inputBuyerBrokerage() { return this.elmtProc.getEl(this.brokerage.inptBuyerBrokerage()); }

  // seller edit
  dllSellerCurrency() { return this.elmtProc.getEl(this.brokerage.dllSellerCurrency()); }

  dllSellerBroker() { return this.elmtProc.getEl(this.brokerage.dllSellerBroker()); }

  dllSellerCentre() { return this.elmtProc.getEl(this.brokerage.dllSellerCentre()); }

  inputSellerAlloc() { return this.elmtProc.getEl(this.brokerage.inputSellerAlloc()); }

  inputSellerBrokerage() { return this.elmtProc.getEl(this.brokerage.inputSellerBrokerage()); }

  // no arrows
  // lstBuyer(row,col) {return this.elmtProc.getEl(this.brokerage.lstBuyer(row,col));}

  // lstSeller(row,col) {return this.elmtProc.getEl(this.brokerage.lstSeller(row,col));}

  windowClick() { return this.elmtProc.getEl(this.brokerage.windowClick()); }

  txtAreaSave() { return this.elmtProc.getEl(this.brokerage.txtAreaSave()); }

  btnEditnOk() { return this.elmtProc.getEl(this.brokerage.btnEditOk()); }

  brokerEmptyTable() { return this.elmtProc.getEl(this.brokerage.brokerEmptyTable()); }

  brokerageExplanation() { return this.elmtProc.getEl(this.brokerage.brokerageExplanation()); }

  brokerageExplanationSeller() { return this.elmtProc.getEl(this.brokerage.brokerageExplanationSeller()); }

  /* openBlotter() {return this.elmtProc.getEl(this.brokerage.openBlotter()); }
  openDeal() {return this.elmtProc.getEl(this.brokerage.selectDeal()); }
  isBlotterVisible(){return this.elmtProc.getEl(this.brokergae.isBlotterVisible);}
  waitForEdit(){return this.elmtProc.getEl(this.brokerage.dealHeader());}
  menuPopUp(){return this.elmtProc.getEl(this.brokerage.menuPopUp());}
  closeNotification(){return this.elmtProc.getEl(this.brokerage.closeNotification());}
  btnEdit(){return this.elmtProc.getEl(this.brokerage.btnEdit());}
 */
}
module.exports = BrokeragePageObject;
