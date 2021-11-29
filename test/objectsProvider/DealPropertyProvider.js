/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
class DealPropertyProvider {
  chkVolMatch() { return '#volumeMatch@@Enabled_And_Visible||10'; }

  chkVolMatchState() { return '//input[@id="volumeMatch"]/..@@Enabled_And_Visible||10'; }

  chkTurnTrade() { return '#turnTrade@@Enabled_And_Visible||10'; }

  chkTurnTradeState() { return '//input[@id="turnTrade"]/..@@Enabled_And_Visible||10'; }

  btnBuyer() { return '[data-testid="btnbuyerCounterPartySide"]@@Enabled_And_Visible||10'; }

  btnSeller() { return '[data-testid="btnsellerCounterPartySide"]@@Enabled_And_Visible||10'; }

  btncp2Buyer() { return '[data-testid="btncp2BuyerCounterPartySide"]@@Enabled_And_Visible||10'; }

  btncp2Seller() { return '[data-testid="btncp2SellerCounterPartySide"]@@Enabled_And_Visible||10'; }

  // Fav Btn

  btnBuyerFave() { return '[data-testid="btnBuyerFave"]@@Enabled_And_Visible||10'; }

  btnSellerFave() { return '[data-testid="btnSellerFave"]@@Enabled_And_Visible||10'; }

  btnSwap() { return '(//span[@data-testid="btnSwap"])[1]@@Enabled_And_Visible||10'; }

  btnSwap2() { return '(//span[@data-testid="btnSwap"])[2]@@Enabled_And_Visible||10'; }

  chkThreeCp() { return '[data-testid="chkThreeCp"]@@Enabled_And_Visible||10'; }

  // Deal Submit
  btnSubmit() { return '[data-testid="btnSubmit"]@@Enabled_And_Visible||10'; }

  btnReset() { return '[data-testid="btnReset"]@@Enabled_And_Visible||10'; }

  // Deal Notification
  msgNotification(message) { return `.ant-notification-notice-message=${message}@@Enabled_And_Visible||10`; }
}
module.exports = DealPropertyProvider;
