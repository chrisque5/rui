const Agent = require('../../components/ndf/Agents.js');

class AgentModel {
  constructor() {
    this.agent = new Agent();
  }

  /** ************************************ Agent ******************************** */

  // Buyer
  selectBuyerAgent(agentName, autoTab) {
    this.agent.selectBuyerAgent(agentName, autoTab);
  }

  inputBuyerAgentByKeys(buyerAgent) {
    this.agent.inputBuyerAgentByKeys(buyerAgent);
  }

  getBuyerAgentLbl() { return this.agent.getBuyerAgentLbl(); }

  verifyNoBuyerAgentSelected() { return this.agent.verifyNoBuyerAgentSelected(); }

  isBuyerAgentFocus() { return this.agent.isBuyerAgentFocus(); }

  isBuyerAgentEnabled() { return this.agent.isBuyerAgentEnabled(); }

  // 3CP

  selectCP2BuyerAgent(agentName, autoTab) { this.agent.selectCP2BuyerAgent(agentName, autoTab); }

  inputCP2BuyerAgentByKeys(buyerAgent) { this.agent.inputCP2BuyerAgentByKeys(buyerAgent); }

  getcp2BuyerAgentLbl() { return this.agent.getcp2BuyerAgentLbl(); }

  iscp2BuyerAgentFocus() { return this.agent.iscp2BuyerAgentFocus(); }

  // Seller
  selectSellerAgent(agentName, autoTab) {
    this.agent.selectSellerAgent(agentName, autoTab);
  }

  inputSellerAgentByKeys(sellerAgent) {
    this.agent.inputSellerAgentByKeys(sellerAgent);
  }

  getSellerAgentLbl() { return this.agent.getSellerAgentLbl(); }

  verifyNoSellerAgentSelected() { return this.agent.verifyNoSellerAgentSelected(); }

  isSellerAgentFocus() { return  this.agent.isSellerAgentFocus(); }

  // 3CP

  selectCP2SellerAgent(agentName, autoTab) { this.agent.selectCP2SellerAgent(agentName, autoTab); }

  inputCP2SellerAgentByKeys(sellerAgent) { this.agent.inputCP2SellerAgentByKeys(sellerAgent); }

  getcp2SellerAgentLbl() { return this.agent.getcp2SellerAgentLbl(); }

  iscp2SellerAgentFocus() { return this.agent.iscp2SellerAgentFocus(); }

  // Common
  verifyAgentCasCadClose() { return this.agent.verifyAgentCasCadClose(); }

  /** ************************************ Agent End **************************** */
}
module.exports = AgentModel;
