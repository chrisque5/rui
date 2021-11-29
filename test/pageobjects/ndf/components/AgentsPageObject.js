/* eslint-disable max-len */
const AgentObjectProvider = require('../../../objectsProvider/ndf/components/AgentObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class AgentsPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.agent = new AgentObjectProvider();
  }

  /** ************************
   ************* Buyer *************
  *********************************** */

  ddlBuyerAgent() { return this.elmtProc.getEl(this.agent.ddlBuyerAgent()); }

  btnClearBuyerAgent() { return this.elmtProc.getEl(this.agent.btnClearBuyerAgent()); }

  inputBuyerAgent() { return this.elmtProc.getEl(this.agent.inputBuyerAgent()); }

  lblBuyerAgent() { return this.elmtProc.getEl(this.agent.lblBuyerAgent()); }

  lblOuterBuyerAgent() { return this.elmtProc.getEl(this.agent.lblOuterBuyerAgent()); }

  lblBuyerAgentEmpty() { return this.elmtProc.getEl(this.agent.lblBuyerAgentEmpty()); }

  ddlBuyerAgentFocus() { return this.elmtProc.getEl(this.agent.ddlBuyerAgentFocus()); }

  // 3CP
  ddlCP2BuyerAgent() { return this.elmtProc.getEl(this.agent.ddlCP2BuyerAgent()); }

  btnClearCP2BuyerAgent() { return this.elmtProc.getEl(this.agent.btnClearCP2BuyerAgent()); }

  inputCP2BuyerAgent() { return this.elmtProc.getEl(this.agent.inputCP2BuyerAgent()); }

  lblCP2BuyerAgent() { return this.elmtProc.getEl(this.agent.lblCP2BuyerAgent()); }

  ddlcp2BuyerAgentFocus() { return this.elmtProc.getEl(this.agent.ddlcp2BuyerAgentFocus()); }

  /** ************************
   ************* Seller *************
  *********************************** */
  ddlSellerAgent() { return this.elmtProc.getEl(this.agent.ddlSellerAgent()); }

  btnClearSellerAgent() { return this.elmtProc.getEl(this.agent.btnClearSellerAgent()); }

  inputSellerAgent() { return this.elmtProc.getEl(this.agent.inputSellerAgent()); }

  lblSellerAgent() { return this.elmtProc.getEl(this.agent.lblSellerAgent()); }

  lblSellerAgentEmpty() { return this.elmtProc.getEl(this.agent.lblSellerAgentEmpty()); }

  ddlSellerAgentFocus() { return this.elmtProc.getEl(this.agent.ddlSellerAgentFocus()); }

  // 3CP

  ddlCP2SellerAgent() { return this.elmtProc.getEl(this.agent.ddlCP2SellerAgent()); }

  btnClearCP2SellerAgent() { return this.elmtProc.getEl(this.agent.btnClearCP2SellerAgent()); }

  inputCP2SellerAgent() { return this.elmtProc.getEl(this.agent.inputCP2SellerAgent()); }

  lblCP2SellerAgent() { return this.elmtProc.getEl(this.agent.lblCP2SellerAgent()); }

  ddlcp2SellerAgentFocus() { return this.elmtProc.getEl(this.agent.ddlcp2SellerAgentFocus()); }

  /** ****************** Common ****************** */
  liBuyerSellerAgent(agent) { return this.elmtProc.getEl(this.agent.liBuyerSellerAgent(agent)); }

  casCadAgent() { return this.elmtProc.getEl(this.agent.casCadAgent()); }
}
module.exports = AgentsPageObject;
