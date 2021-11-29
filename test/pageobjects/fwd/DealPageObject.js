/* eslint-disable max-len */
const DealPropertyProvider = require('../../objectsProvider/fwd/DealPropertyProvider.js');
const ElementProcessor = require('../../core/element/ElementProcessor.js');

class DealPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.dealProperty = new DealPropertyProvider();
  }
}

module.exports = DealPageObject;
