const Amount = require('../../components/ndf/Amount');

class AmountModel {
  constructor() {
    this.amount = new Amount();
  }

  /** ********************************* Amount **************************** */
  // Amount 1
  inputAmount(amount) { this.amount.inputAmount(amount); }

  inputAmountWithEnter(amount) { this.amount.inputAmountWithEnter(amount); }

  inputAmountWithoutKeys(amount) { this.amount.inputAmountWithoutKeys(amount); }

  getAmount() { return this.amount.getAmount(); }

  clickAmount() { this.amount.clickAmount(); }

  hoverAmount1() { this.amount.hoverAmount1(); }

  isAmount1Focused() { return this.amount.isAmount1Focused(); }

  // Amount 2
  clickAmount2() { this.amount.clickAmount2(); }

  inputAmount2(amount2) { this.amount.inputAmount2(amount2); }

  inputAmount2WithEnter(amount) { this.amount.inputAmount2WithEnter(amount); }

  getAmount2() { return this.amount.getAmount2(); }

  getAmount2WithoutWait() { return this.amount.getAmount2WithoutWait(); }

  hoverAmount2() { this.amount.hoverAmount2(); }

  isAmount2Focused() { return this.amount.isAmount2Focused(); }

  /** ******************************* Amount End ************************** */
}
module.exports = AmountModel;
