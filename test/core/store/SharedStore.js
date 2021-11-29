/* eslint-disable class-methods-use-this */
const Logs = require('../utility/Logs');

const log = new Logs();
const globalStore = {};
class SharedStore {
  setValueToStore(key, value) {
    try {
      log.log(`Storing key ${key} with value ${value} to Shared Store`);
      // browser.sharedStore.set(key, value);
      // using "@wdio/shared-store-service": "^6.1.4", library to store the data.Exchange data between main process and workers (specs)

      globalStore[key] = value;
    } catch (e) {
      log.errorLog(`Error While storing the key value pair : ${key} / ${value}`);
    }
    return undefined;
  }

  getValueFromStore(key) {
    try {
      log.log(`Getting value for key ${key} from Shared Store`);
      // return browser.sharedStore.get(key);
      // using "@wdio/shared-store-service": "^6.1.4", library to store the data.Exchange data between main process and workers (specs)
      return globalStore[key];
    } catch (e) {
      log.errorLog(`Error While getting the value for : ${key}`);
    }
    return undefined;
  }
}

module.exports = SharedStore;
