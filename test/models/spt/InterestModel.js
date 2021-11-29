const Interest = require('../../components/fwd/Interest.js');
const Log = require('../../core/utility/Logs.js');

class InterestModel {
  constructor() {
    this.interest = new Interest();
    this.log = new Log();
  }

  selectInterestChkBox() {
    this.interest.selectInterestChkBox();
  }

  inputInterest(interest) {
    this.interest.inputInterest(interest);
  }

  getInterestValue() {
    return this.interest.getInterestValue();
  }

  isInterestChkBoxSelected() {
    return this.interest.isInterestChkBoxSelected();
  }

  isInterestTxtBoxEnabled() {
    return this.interest.isInterestTxtBoxEnabled();
  }

  getAmountAfterInterest(notionalLeg1, rate, dayCount, ccyDayCount) {
    // Far Leg Notional = Near Leg Notional + (Near Leg Notional *(Rate /100) * (Trade Day Count / CCY Day Count))
    // CCY Day Count value is 360
    if (ccyDayCount === undefined) {
      ccyDayCount = 360;
    }
    const notionalLeg2 = notionalLeg1 + (notionalLeg1 * (rate / 100) * (dayCount / ccyDayCount));
    this.log.log(`NotionalLeg 2 value is : ${notionalLeg2}`);
    if (notionalLeg2 % 1 !== 0) {
      return notionalLeg2.toFixed(3);
    }
    return notionalLeg2.toFixed(0);
  }

  getAmountInterest(nearNotional, farNotional, tradeDayCount, ccyDayCount) {
    let interest = ((farNotional - nearNotional) / (nearNotional * (tradeDayCount / ccyDayCount))) * 100;
    this.log.log(`Interest calculation is : ${interest}`);
    interest = parseFloat(interest.toFixed(3));
    if (interest % 1 !== 0) {
      return interest.toFixed(3);
    }
    return interest.toFixed(0);
  }
}
module.exports = InterestModel;
