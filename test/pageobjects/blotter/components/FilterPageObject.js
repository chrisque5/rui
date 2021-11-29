/* eslint-disable max-len */
const FilterPropertyProvider = require('../../../objectsProvider/blotter/components/FilterPropertyProvider.js');
const ElementProcessor = require('../../../core/element/ElementProcessor.js');

class FilterPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.filterProperty = new FilterPropertyProvider();
  }

  txtQuickFilterSearch() { return this.elmtProc.getEl(this.filterProperty.txtQuickFilterSearch()); }

  btnClearQuickFilter() { return this.elmtProc.getEl(this.filterProperty.btnClearQuickFilter()); }
}

module.exports = FilterPageObject;
