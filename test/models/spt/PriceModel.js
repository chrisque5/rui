const Rate = require('../../components/ndf/Rate');
const Logs = require('../../core/utility/Logs.js');

class PriceModel {
  constructor() {
    this.rate = new Rate();
    this.log = new Logs();
  }

  /** ********************************* Price/Rate ************************ */

  inputPrice(price) { this.rate.inputPrice(price); }

  getPrice() { return this.rate.getPrice(); }

  getPriceWithoutWait() { return this.rate.getPriceWithoutWait(); }

  verifyPrice1Empty() { return this.rate.verifyPrice1Empty(); }

  hoverPrice1() { this.rate.hoverPrice1(); }

  waitForPrice1() { return this.rate.waitForPrice1(); }

  isPrice1Focused() { return this.rate.isPrice1Focused(); }

  clickPrice1() { return this.rate.clickPrice1(); }

  calPrice1(price2, points, scalFactor, strategy) {
    const value = price2 - (points * scalFactor);
    this.log.log(`Price 1 value is calculated as : ${value}`);
    if (value % 1 !== 0) {
      if (strategy === 'FWD') {
        return parseFloat(value.toFixed(8)).toString();
      }
      return parseFloat(value.toFixed(6)).toString();
    }
    return parseFloat(value.toFixed(0)).toString();
  }


  // Price 2

  inputPrice2(price2) { this.rate.inputPrice2(price2); }

  getPrice2() { return this.rate.getPrice2(); }

  getPrice2WithoutWait() { return this.rate.getPrice2WithoutWait(); }

  verifyPrice2Empty() { return this.rate.verifyPrice2Empty(); }

  hoverPrice2() { this.rate.hoverPrice2(); }

  waitForPrice2() { return this.rate.waitForPrice2(); }

  isPrice2Focused() { return this.rate.isPrice2Focused(); }

  clickPrice2() { return this.rate.clickPrice2(); }

  calPrice2(price1, points, scalFactor, strategy) {
    const value = (points * scalFactor) + price1;
    this.log.log(`Price 2 value is calculated as : ${value}`);
    if (value % 1 !== 0) {
      if (strategy === 'FWD') {
        return parseFloat(value.toFixed(8)).toString();
      }
      return parseFloat(value.toFixed(6)).toString();
    }
    return parseFloat(value.toFixed(0)).toString();
  }

  /** ******************************* Price End *************************** */
}
module.exports = PriceModel;
