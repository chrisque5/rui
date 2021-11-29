// const { thomsonCrossSectionDependencies } = require('mathjs');
const Brokerage = require('../../components/tradeManagement/Brokerage');

class BrokerageModel {
  constructor() {
    this.brokerage = new Brokerage();
  }

  /* ******************
  Open Deal from blotter, get Deal ID
 ****************** */
  openDeal(brokerage) { this.brokerage.openDeal(brokerage); }

  waitForEdit(brokerage) { this.brokerage.waitForEdit(brokerage); }

  getDealId(brokerage) { return this.brokerage.getDealId(brokerage); }

  getdealRef(brokerage) { return this.brokerage.getdealRef(brokerage); }

  /* ******************
  Open Deal from blotter using double click, get Deal ID
 ****************** */
  openDealDoubleClick() { this.brokerage.openDealDoubleClick(); }

  /* ******************
  Verify all values on Trade management home page
 ****************** */
  getDmsType(brokerage) { return this.brokerage.getDmsType(brokerage); }

  getDmsAction(brokerage) { return this.brokerage.getDmsAction(brokerage); }

  getCurrentDateTime(brokerage) { return this.brokerage.getCurrentDate(brokerage); }

  getTradeDate(brokerage) { return this.brokerage.getTradeDate(brokerage); }

  getDealStatus(brokerage) { return this.brokerage.getDealStatus(brokerage); }

  getBuyerCurrency(brokerage) { return this.brokerage.getBuyerCurrency(brokerage); }

  getBuyerAmount(brokerage) { return this.brokerage.getBuyerAmount(brokerage); }

  getBuyerBroker(brokerage) { return this.brokerage.getBuyerBroker(brokerage); }

  getBuyerCenter(brokerage) { return this.brokerage.getBuyerCenter(brokerage); }

  getBuyerAlloc(brokerage) { return this.brokerage.getBuyerAlloc(brokerage); }

  getBuyerReceive(brokerage) { return this.brokerage.getBuyerReceive(brokerage); }

  getBuyerUpdatedBy(brokerage) { return this.brokerage.getBuyerUpdatedBy(brokerage); }

  getSellerCurrancy(brokerage) { return this.brokerage.getSellerCurrancy(brokerage); }

  getSellerAmount(brokerage) { return this.brokerage.getSellerAmount(brokerage); }

  getSellerBroker(brokerage) { return this.brokerage.getSellerBroker(brokerage); }

  getSellerCentre(brokerage) { return this.brokerage.getSellerCentre(brokerage); }

  getSellerAlloc(brokerage) { return this.brokerage.getSellerAlloc(brokerage); }

  getSellerReceive(brokerage) { return this.brokerage.getSellerReceive(brokerage); }

  getSellerUpdatedBy(brokerage) { return this.brokerage.getSellerUpdatedBy(brokerage); }

  /* ******************
  Methods to add New Buyer and Seller Brokerage rows * Includes Edit Deal Button click
 ****************** */
  addBuyerBrokerage(brokerage) { return this.brokerage.addNewBuyerBrokerage(brokerage); }

  addSellerBrokerage(brokerage) { return this.brokerage.addNewSellerBrokerage(brokerage); }

  /* ******************
  Click the Edit Deal button
 ****************** */
  clickEditbtn(brokerage) { this.brokerage.clickEditButton(brokerage); }

  /* ******************
  Edit the Buyer side of Deal - Currency and Brokerage
 ****************** */
  editBuyerCurr(brokerage) { this.brokerage.editBuyerCurr(brokerage); }

  editInputBuyerBrokerage(brokerageValue) { this.brokerage.editInputBuyerBrokerage(brokerageValue); }

  editInputSellerBrokerage(brokerageValue) { this.brokerage.editInputSellerBrokerage(brokerageValue); }

  /* ******************
  Edit the Buyer side of Deal - After adding a new Buyer
 ****************** */
  editBuyerBroker(brokerage) { this.brokerage.editBuyerBroker(brokerage); }

  editBuyerCentre(brokerage) { this.brokerage.editBuyerCentre(brokerage); }

  getEditBuyerAlloc(brokerage) { this.brokerage.getEditBuyerAlloc(brokerage); }

  editBuyerBrokerage(brokerage) { this.brokerage.editBuyerBrokerage(brokerage); }

  /* ******************
  Edit the Seller side of Deal - Currency and Brokerage
 ****************** */
  editSellerCurrency(brokerage) { this.brokerage.editSellerCurrency(brokerage); }

  editInputSeller(brokerage) { this.brokerage.editInputSeller(brokerage); }

  /* ******************
  Edit the Seller  side of Deal - After adding a new Buyer
 ****************** */
  editSellerBroker(brokerage) { this.brokerage.editSellerBroker(brokerage); }

  editSellerCentre(brokerage) { this.brokerage.editSellerCentre(brokerage); }

  getEditSellerAlloc(brokerage) { this.brokerage.getEditSellerAlloc(brokerage); }

  editSellerBrokerage(brokerage) { this.brokerage.editSellerBrokerage(brokerage); }

  /* ******************
  Pop up after selecting Save Button, add text, click Ok,
 ****************** */
  saveEdits(brokerage) { this.brokerage.saveEdits(brokerage); }

  getBuyerBrokerageType(brokerage) { return this.brokerage.getBuyerBrokerageType(brokerage); }

  getBuyerBrokerageTypeEdit() { return this.brokerage.getBuyerBrokerageTypeEdit(); }

  verifyBrokerEmptyTable() { return this.brokerage.verifyBrokerEmptyTable(); }

  verifyBrokerageExplanation() { return this.brokerage.verifyBrokerageExplanation(); }

  getSellerBrokerageType() { return this.brokerage.getSellerBrokerageType(); }

  getSellerBrokerageTypeEdit() { return this.brokerage.getSellerBrokerageTypeEdit(); }

  verifyBrokerExplanationSeller() { return this.brokerage.verifyBrokerExplanationSeller(); }
}

module.exports = BrokerageModel;
