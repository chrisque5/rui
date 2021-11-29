/* eslint-disable max-len */
const PointsObjectProvider = require('../../../objectsProvider/ndf/components/PointsObjectProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class PointsPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.points = new PointsObjectProvider();
  }

  txtPoints() { return this.elmtProc.getEl(this.points.txtPoints()); }

  lblPoints() { return this.elmtProc.getEl(this.points.lblPoints()); }

  lblInputValidate(text) { return this.elmtProc.getEl(this.points.lblInputValidate(text)); }
}
module.exports = PointsPageObject;
