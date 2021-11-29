const Constants = require('../../data/Constants.js');
const jp = require('jsonpath-plus');

class ExcelReader {
  constructor() {
    this.isPipeline = Constants.PIPELINE;
  }
  /**
   * 
   const query = `$..[?(@.tradingCustomerLegalName=="${clientName}")].tradingCustomerId`;
    console.log(`query for client : ${query}`);
    const clientGCDId = jp.JSONPath({path: query, json: clients});
    return clientGCDId[0];
   */

  getBlotterRowColumns( dealId, sheetJson) {
    const query = `$..[?(@.__EMPTY==${dealId})]`;
    const row = jp.JSONPath({path: query, json: sheetJson});
    return row;
  }
}
module.exports = ExcelReader;
