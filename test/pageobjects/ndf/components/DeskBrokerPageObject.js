/* eslint-disable max-len */
const BrokerObjectProvider = require('../../../objectsProvider/ndf/components/DeskBrokerObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class DeskBrokerPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.broker = new BrokerObjectProvider();
  }

  /** ****************** Buyer ****************** */
  ddlBuyerBroker() { return this.elmtProc.getEl(this.broker.ddlBuyerBroker()); } // Click on the Buyer Broker link.

  ddlBuyerBrokerClickToType() { return this.elmtProc.getEl(this.broker.ddlBuyerBrokerClickToType()); }

  lblBuyerBroker() { return this.elmtProc.getEl(this.broker.lblBuyerBroker()); }

  ddlBuyerBrokerFocus() { return this.elmtProc.getEl(this.broker.ddlBuyerBrokerFocus()); }

  // 3CP
  ddlcp2BuyerBroker() { return this.elmtProc.getEl(this.broker.ddlcp2BuyerBroker()); }

  lblcp2BuyerBroker() { return this.elmtProc.getEl(this.broker.lblcp2BuyerBroker()); }

  ddlcp2BuyerBrokerFocus() { return this.elmtProc.getEl(this.broker.ddlcp2BuyerBrokerFocus()); }

  /** ****************** Seller ****************** */
  ddlSellerBroker() { return this.elmtProc.getEl(this.broker.ddlSellerBroker()); }// click on the Seller Broker Link.

  ddlSellerBrokerClickToType() { return this.elmtProc.getEl(this.broker.ddlSellerBrokerClickToType()); }


  lblSellerBroker() { return this.elmtProc.getEl(this.broker.lblSellerBroker()); }

  ddlSellerBrokerFocus() { return this.elmtProc.getEl(this.broker.ddlSellerBrokerFocus()); }

  // 3CP
  ddlcp2SellerBroker() { return this.elmtProc.getEl(this.broker.ddlcp2SellerBroker()); }

  lblcp2SellerBroker() { return this.elmtProc.getEl(this.broker.lblcp2SellerBroker()); }

  ddlcp2SellerBrokerFocus() { return this.elmtProc.getEl(this.broker.ddlcp2SellerBrokerFocus()); }


  /** ****************** Common ****************** */
  liBrokerName(brokerName) { return this.elmtProc.getEl(this.broker.liBrokerName(brokerName)); }// select the broker drop down value.

  liDeskName(brokerDesk) { return this.elmtProc.getEl(this.broker.liDeskName(brokerDesk)); }// select the broker drop down value.

  liBrokerNameLower(brokerDesk, brokerName) { return this.elmtProc.getEl(this.broker.liBrokerNameLower(brokerDesk, brokerName)); }// select the broker drop down value lower case search.

  liBrokerNameUpper(brokerDesk, brokerName) { return this.elmtProc.getEl(this.broker.liBrokerNameUpper(brokerDesk, brokerName)); }// select the broker drop down value upper case search.

  casCadBuyerSeller() { return this.elmtProc.getEl(this.broker.casCadBuyerSeller()); }
}
module.exports = DeskBrokerPageObject;
