const Points = require('../../components/ndf/Points.js');
const Logs = require('../../core/utility/Logs.js');

class PointModel {
  constructor() {
    this.points = new Points();
    this.log = new Logs();
  }

  /** ******************************* Point End *************************** */

  inputPoints(points) { this.points.inputPoints(points); }

  getPoints() { return this.points.getPoints(); }

  hoverPoints() { this.points.hoverPoints(); }

  isPointsFocused() { return this.points.isPointsFocused(); }

  getFieldValidationText(text) { return this.points.getFieldValidationText(text); }

  // points = (rate 2 - rate 1) / scaling factor
  calPoint(price1, price2, scalFactor, strategy) {
    const value = (price2 - price1) / scalFactor;
    this.log.log(`Points value calculated as : ${value}`);
    if (value % 1 !== 0) {
      if (strategy === 'FWD') {
        return parseFloat(value.toFixed(8));
      }
      return parseFloat(value.toFixed(6));
    }
    return parseFloat(value.toFixed(0));
  }

  /** ******************************* Point End *************************** */
}
module.exports = PointModel;
