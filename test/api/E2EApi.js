
const ApiClient = require('../api/ApiClient');
const Logs = require('../core/utility/Logs');

const url = 'http://localhost:8090/';

module.exports = class E2EApi {
  constructor() {
    this.log = new Logs();
    this.apiClient = new ApiClient();
  }

  startListener(env) {
    let data = '';
    try {
      data = this.apiClient.request(`${url}start/${env.toLowerCase()}`, 'GET', null)
        .then(response => response.data)
        .catch((error) => { throw (error); });
    } catch (e) {
      this.log.log('Error while start the listener Api.');
    }
    return data;
  }

  /*
    messageKey => 9151503:validated:new and bmlPath => NDF_USD_INR_1M_NEW(path in the server bml folder)
    http://localhost:8090/message/compare/9151503:validated:new/NDF_USD_INR_1M_NEW
  */

  compareBmlMessage(messageKey, bmlPath) {
    return this.apiClient.request(`${url}message/compare/${messageKey.toLowerCase()}/${bmlPath.toUpperCase()}`, 'GET', null)
      .then(response => response.data)
      .catch((error) => { throw (error); });
  }

  isBMLAvailable(messageKey) {
    return this.apiClient.request(`${url}message/findkey/${messageKey.toLowerCase()}`, 'GET', null)
      .then(response => response.data)
      .catch((error) => { throw (error); });
  }

  saveDealMapping(dealId, testId) {
    return this.apiClient.request(`${url}message/save/${dealId}/${testId.toLowerCase()}`, 'GET', null)
      .then(response => response.data)
      .catch((error) => { throw (error); });
  }
};
