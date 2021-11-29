const Logs = require('../utility/Logs.js');

class GetTextActions {
  constructor() {
    this.log = new Logs();
  }

  getTxt(element) {
    try {
      return element.getText();
    } catch (e) {
      this.log.errorLog(`Error while getting the text : ${e}`);
      return '';
    }
  }

  getVal(element) {
    try {
      return element.getValue();
    } catch (e) {
      this.log.errorLog(`Error while finding the value : ${e}`);
      return undefined;
    }
  }

  getInnerHTML(element) {
    try {
      return element.getHTML(false);
    } catch (e) {
      this.log.errorLog(`Error while getting the innerHTML : ${e}`);
      return '';
    }
  }
}

module.exports = GetTextActions;
