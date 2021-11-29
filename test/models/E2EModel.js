const PopUpNavigationModel = require('./PopUpNavigationModel');
const Logs = require('../core/utility/Logs.js');
const StopWatch = require('../core/utility/StopWatch.js');
const E2EApi = require('../api/E2EApi.js');
const API = require('./blotter/BlotterApiModel');
const BackEndApi = require('../api/BackEndApi');

const dealMap = new Map();
const diffMap = new Map();
const dealTestMap = new Map();

class E2EModel {
  constructor() {
    this.popUpNavModel = new PopUpNavigationModel();
    this.log = new Logs();
    this.watch = new StopWatch();
    this.e2eApi = new E2EApi();
    this.api = new API();
    this.backEndApi = new BackEndApi();
  }

  getDealId() {
    const dealMsg = this.popUpNavModel.getPopUpDescription();
    const dealId = dealMsg.substring(dealMsg.lastIndexOf('[') + 1, dealMsg.lastIndexOf(']'));
    this.log.log(`deal ID is : ${dealId}`);
    return dealId;
  }

  getLeg2DealId() {
    const dealMsg = this.popUpNavModel.getPopUpDescription();
    // const dealId = dealMsg.substring(dealMsg.lastIndexOf(',') + 1, dealMsg.lastIndexOf(']'));
    const dealId = this.getSpreadDealId(dealMsg)[1];
    this.log.log(`deal ID is : ${dealId}`);
    return dealId;
  }

  getLeg1DealId() {
    const dealMsg = this.popUpNavModel.getPopUpDescription();
    // const dealId = dealMsg.substring(dealMsg.lastIndexOf('[') + 1, dealMsg.lastIndexOf(','));
    const dealId = this.getSpreadDealId(dealMsg)[0];
    this.log.log(`deal ID is : ${dealId}`);
    return dealId;
  }

  getSpreadDealId(dealMsg) {
    const dealId1 = dealMsg.substring(dealMsg.lastIndexOf('[') + 1, dealMsg.lastIndexOf(','));
    const dealId2 = dealMsg.substring(dealMsg.lastIndexOf(',') + 1, dealMsg.lastIndexOf(']'));
    this.log.log(`Deal ID 1 : ${dealId1} and Deal ID 2 : ${dealId2}`);
    const l = dealId1 > dealId2 ? dealId2 : dealId1;
    const h = dealId1 > dealId2 ? dealId1 : dealId2;
    return [l, h];
  }

  saveDealId(bmlPath, dealId) {
    dealMap.set(bmlPath, dealId);
    this.log.log(`saved the deal ID : ${dealId}`);
  }

  saveDealTestMap(key, value) {
    dealTestMap.set(key, value);
    this.log.log(`saved the deal ID : ${key}`);
  }

  async saveDifferences(dealId, messageState, dealType, leg, bmlPath) {
    this.saveDealId(bmlPath, dealId);
    const messageKey = `${dealId}:${messageState}:${dealType}:${leg}`;
    const isAvailable = await this.isBMLAvailable(messageKey);

    let diff = '';
    if (isAvailable === true) {
      try {
        diff = await this.e2eApi.compareBmlMessage(messageKey, bmlPath);
      } catch (error) {
        this.log.log(`Error while generating the differences : ${error}`);
        diff = error.message;
      }
      diffMap.set(bmlPath, diff);
      this.log.log(`Differences for Deal Id : ${dealId} is : ${diff}`);
      this.log.log(`saved the Differences for Deal ID : ${dealId}`);
    } else {
      this.log.log(`Error while finding the Differences for Deal ID : ${dealId}`);
    }
  }

  compareDifferences(dealId, messageState, dealType, leg, bmlPath) {
    this.saveDealId(bmlPath, dealId);
    this.saveDifferences(dealId, messageState, dealType, leg, bmlPath);
    this.log.log(`Compare the Differences for Deal ID : ${dealId}`);
  }

  saveDealIdWithTest(dealId, testId) {
    this.saveDealTestMapping(dealId, testId);
  }

  async saveDealTestMapping(dealId, testId) {
    let result;
    try {
      result = await this.e2eApi.saveDealMapping(dealId, testId);
      this.log.log(`Response from the server : ${result}`);
    } catch (error) {
      this.log.log(`Error while adding the result mapping : ${error}`);
      return error.message;
    }
    return result;
  }

  showAllDifferences() {
    dealTestMap.forEach((value, key) => {
      this.log.e2eLog(`${key} : ${value}`);
    });

    /* diffMap.forEach((key, value) => {
      this.log.log(`Differences for ${key} : is ${value}`);
      this.log.log(Promise.resolve(value).then((val) => {
        this.log.log(val);
      }));
    }); */
  }

  async isBMLAvailable(key) {
    let isAvailable = false;
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning() && isAvailable === false) {
      try {
        // eslint-disable-next-line no-await-in-loop
        isAvailable = await this.checkBMLAvailable(key);
        if (isAvailable === true) {
          return true;
        }
        setTimeout(() => {
        // this.log.log('Sleeping for one sec.');
        }, 1000);
      } catch (error) {
        isAvailable = false;
      }
    }
    return isAvailable;
  }

  async checkBMLAvailable(key) {
    try {
      const result = await this.e2eApi.isBMLAvailable(key);
      if (result !== null && result !== undefined && result !== '') {
        return result;
      }
    } catch (error) {
      this.log.log(`Error while trying to find the deal is available : ${error}`);
      return false;
    }
    return false;
  }

  cancelE2eDeal(jSessionCookie, dmsDealId, dealLockSequenceId, chainCancel, cancelReason) {
    return this.backEndApi.cancelDeal(jSessionCookie, dmsDealId, dealLockSequenceId, chainCancel, cancelReason);
  }

  editE2eNdfDeal(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue, buyBroCcy, buyBroAmount, sellBroCcy, sellBroAmount) {
    this.log.log(`Attempting amount edit deal with dmsDealId: ${dmsDealId}`);
    return this.backEndApi.editAmountPriceBro(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue, buyBroCcy, buyBroAmount, sellBroCcy, sellBroAmount);
  }

  editE2eFwdDeal(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue1, newPriceValue2) {
    this.log.log(`Attempting amount edit deal with dmsDealId: ${dmsDealId}`);
    return this.backEndApi.editFwdAmountPrice(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue1, newPriceValue2);
  }

  editE2eFwdOutDeal(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue1) {
    this.log.log(`Attempting amount edit deal with dmsDealId: ${dmsDealId}`);
    return this.backEndApi.editAmountPrice(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue1);
  }

  editE2eSptDeal(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue1) {
    this.log.log(`Attempting amount edit deal with dmsDealId: ${dmsDealId}`);
    return this.backEndApi.editAmountPrice(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue1);
  }
}
module.exports = E2EModel;
