/* eslint-disable max-len */
const Logs = require('../../core/utility/Logs.js');
const API = require('../../api/BackEndApi');
const WindowActions = require('../../core/actions/WindowActions.js');

let cookie = '';
let venues = '';
let clients = '';
let brokers = '';
let agents = '';

class BlotterApiModel {
  constructor() {
    this.api = new API();
    this.log = new Logs();
    this.windowActions = new WindowActions();
  }

  setCookie() {
    cookie = this.windowActions.getCurrentJsessionId();
    this.log.log(`Cookie value is : ${cookie}`);
    return cookie;
  }

  getCurrencyMap(currency1, currency2, dealtCurrency, settlementCurrency, dealType) {
    const currencyMap = new Map();
    currencyMap.set('currency1', currency1);
    currencyMap.set('currency2', currency2);
    currencyMap.set('dealtCurrency', dealtCurrency);
    currencyMap.set('settlementCurrency', settlementCurrency);
    const currencyId = this.api.getCurrencyCode(cookie, currency2, dealType);
    currencyMap.set('instrumentId', currencyId);
    if (dealType === 'FWD') {
      const scalingFactor = this.api.getScalingFactor(cookie, currency2, dealType);
      currencyMap.set('scalingFactor', scalingFactor);
    }
    return currencyMap;
  }

  getCurrencyCode(sessionCookie, currency, dealType) {
    return this.api.getCurrencyCode(sessionCookie, currency, dealType);
  }

  setClientInfo(dealType) {
    venues = this.api.getVenueData(cookie, dealType);
    clients = this.api.getClientData(cookie, dealType);
    brokers = this.api.getBrokerData(cookie, dealType);
    agents = this.api.getAgentData(cookie, dealType);
  }

  getTermDates(currencyId, tenor, dealType, strategy) {
    const dateMap = this.api.getTermDates(cookie, currencyId, tenor, dealType, strategy);
    return dateMap;
  }

  getFWDTermDates(currencyId, term1, term2) {
    const dateMap = this.api.getFWDTermDates(cookie, currencyId, term1, term2);
    return dateMap;
  }

  getFWDOutrightTermDates(currencyId, term) {
    const dateMap = this.api.getFWDOutrightTermDates(cookie, currencyId, term);
    return dateMap;
  }

  getSPTTermDates(currencyId) {
    const dateMap = this.api.getSPTTermDates(cookie, currencyId);
    return dateMap;
  }

  getBuyerPartyMap(client, trader, brokerDesk, broker, agent) {
    const partyMap = new Map();
    const buyerClientGcdId = this.api.getClientGCDId(clients, client);
    partyMap.set('buyerClientGcdId', buyerClientGcdId);

    if (agent === '') {
      const buyerTraderGcdId = this.api.getTraderGCDId(clients, client, trader);
      partyMap.set('buyerTraderGcdId', buyerTraderGcdId);
      const executingCustomerGcdId = this.api.getExecutingCustomerGcdId(clients, client, trader);
      partyMap.set('buyerExecutingCustomerGcdId', executingCustomerGcdId);
    } else {
      partyMap.set('buyerTraderGcdId', null);
      partyMap.set('buyerExecutingCustomerGcdId', null);
    }
    const buyerBrokerGcdid = this.api.getBrokerGcdId(brokers, brokerDesk, broker);
    partyMap.set('buyerBrokerGcdid', buyerBrokerGcdid);

    if (agent && agent !== '') {
      const agentShortName = agent.split('(')[0].trim();
      const agentLocation = agent.substring(agent.lastIndexOf('(') + 1, agent.lastIndexOf(')'));
      const buyerAgentGcdid = this.api.getAgentGcdId(agents, agentShortName, agentLocation);
      partyMap.set('buyerAgentGcdid', buyerAgentGcdid);
    } else {
      partyMap.set('buyerAgentGcdid', null);
    }
    return partyMap;
  }

  getSellerPartyMap(partyMap, client, trader, brokerDesk, broker, agent) {
    const sellerClientGcdId = this.api.getClientGCDId(clients, client);
    partyMap.set('sellerClientGcdId', sellerClientGcdId);

    if (agent === '') {
      const sellerTraderGcdId = this.api.getTraderGCDId(clients, client, trader);
      partyMap.set('sellerTraderGcdId', sellerTraderGcdId);
      const executingCustomerGcdId = this.api.getExecutingCustomerGcdId(clients, client, trader);
      partyMap.set('sellerExecutingCustomerGcdId', executingCustomerGcdId);
    } else {
      partyMap.set('sellerTraderGcdId', null);
      partyMap.set('sellerExecutingCustomerGcdId', null);
    }

    const sellerBrokerGcdid = this.api.getBrokerGcdId(brokers, brokerDesk, broker);
    partyMap.set('sellerBrokerGcdid', sellerBrokerGcdid);
    if (agent !== '') {
      const agentShortName = agent.split('(')[0].trim();
      const agentLocation = agent.substring(agent.lastIndexOf('(') + 1, agent.lastIndexOf(')'));
      const sellerAgentGcdid = this.api.getAgentGcdId(agents, agentShortName, agentLocation);
      partyMap.set('sellerAgentGcdid', sellerAgentGcdid);
    } else {
      partyMap.set('sellerAgentGcdid', null);
    }
    return partyMap;
  }

  getBrokerageDetails(brokerage, executingCustomerId) {
    return this.api.getBrokerageDetails(brokerage, executingCustomerId);
  }

  createOutrightDeal(dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const dealId = this.api.createOutrightDeal(cookie, 'outright', dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    return dealId;
  }

  createOutrightDealWithBrokrage(dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const dealId = this.api.createOutrightDealWithBrokrage(cookie, 'outright', dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    return dealId;
  }

  createForwardDeal(strategy, dealType, term1, term2, price1, price2, points, amount1, amount2, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const dealId = this.api.createForwardDeal(cookie, strategy, dealType, term1, term2, price1, price2, points, amount1, amount2, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    return dealId;
  }

  createForwardOutrightDeal(strategy, dealType, term, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const dealId = this.api.createForwardOutrightDeal(cookie, strategy, dealType, term, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    return dealId;
  }

  createSptDeal(strategy, dealType, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const dealId = this.api.createSptDeal(cookie, strategy, dealType, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    return dealId;
  }

  getDealSettingsMap(volumeMatch, forwardStart, isBackDated, backDate, backDateTime) {
    this.log.log('Getting Deal Settings Map');
    const dealMapSettings = new Map();
    dealMapSettings.set('volumeMatch', volumeMatch);
    dealMapSettings.set('isBackDated', isBackDated);
    dealMapSettings.set('forwardStart', forwardStart);
    if (isBackDated === true) {
      dealMapSettings.set('backDate', backDate);
      dealMapSettings.set('backDateTime', backDateTime);
    }
    return dealMapSettings;
  }

  getFWDDealSettingsMap(volumeMatch, isTurnTrade, cls1, cls2, isBackDated, backDate, backDateTime) {
    this.log.log('Getting FWD Deal Settings Map');
    const dealMapSettings = new Map();
    dealMapSettings.set('volumeMatch', volumeMatch);
    dealMapSettings.set('isBackDated', isBackDated);
    dealMapSettings.set('isTurnTrade', isTurnTrade);
    dealMapSettings.set('cls1', cls1);
    dealMapSettings.set('cls2', cls2);
    if (isBackDated === true) {
      dealMapSettings.set('backDate', backDate);
      dealMapSettings.set('backDateTime', backDateTime);
    }
    return dealMapSettings;
  }

  getFWDOutrightDealSettingsMap(volumeMatch, isTurnTrade, cls, isBackDated, backDate, backDateTime) {
    this.log.log('Getting FWD Out Deal Settings Map');
    const dealMapSettings = new Map();
    dealMapSettings.set('volumeMatch', volumeMatch);
    dealMapSettings.set('isBackDated', isBackDated);
    dealMapSettings.set('isTurnTrade', isTurnTrade);
    dealMapSettings.set('cls', cls);
    if (isBackDated === true) {
      dealMapSettings.set('backDate', backDate);
      dealMapSettings.set('backDateTime', backDateTime);
    }
    return dealMapSettings;
  }

  getSPTDealSettingsMap(volumeMatch, cls, isBackDated, backDate, backDateTime) {
    this.log.log('Getting FWD Out Deal Settings Map');
    const dealMapSettings = new Map();
    dealMapSettings.set('volumeMatch', volumeMatch);
    dealMapSettings.set('isBackDated', isBackDated);
    dealMapSettings.set('cls', cls);
    if (isBackDated === true) {
      dealMapSettings.set('backDate', backDate);
      dealMapSettings.set('backDateTime', backDateTime);
    }
    return dealMapSettings;
  }

  cancelDeal(jSessionCookie, dmsDealId, dealLockSequenceId, chainCancel, cancelReason) {
    this.log.log(`Attempting to cancel deal with dmsDealId: ${dmsDealId}`);
    return this.api.cancelDeal(jSessionCookie, dmsDealId, dealLockSequenceId, chainCancel, cancelReason);
  }

  editAmount(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue) {
    this.log.log(`Attempting amount edit deal with dmsDealId: ${dmsDealId}`);
    return this.api.editAmount(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue);
  }

  editPrice(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newPriceValue) {
    this.log.log(`Attempting price edit deal with dmsDealId: ${dmsDealId}`);
    return this.api.editPrice(jSessionCookie, dmsDealId, dealLockSequenceId, comment, newPriceValue);
  }

  editBuyerBrokerage(jSessionCookie, dmsDealId, dealLockSequenceId, comment, currency, amount) {
    this.log.log(`Attempting buyer bro edit deal with dmsDealId: ${dmsDealId}`);
    return this.api.editBuyerBrokerage(jSessionCookie, dmsDealId, dealLockSequenceId, comment, currency, amount);
  }

  editSellerBrokerage(jSessionCookie, dmsDealId, dealLockSequenceId, comment, currency, amount) {
    this.log.log(`Attempting seller bro edit deal with dmsDealId: ${dmsDealId}`);
    return this.api.editSellerBrokerage(jSessionCookie, dmsDealId, dealLockSequenceId, comment, currency, amount);
  }

  getKeysDmsWeb(jSessionCookie) {
    this.log.log('About to call /services/rtu/keys/dmsweb');
    const success = this.api.getKeysDmsWeb(jSessionCookie);
    this.log.log(`Returning Blotter RTU Keys : ${JSON.stringify(success)}`);
    return success;
  }

  getSessionParams(jSessionCookie, key) {
    this.log.log(`About to call /services/rtu/${key}`);
    const success = this.api.getRtuSessionParameters(jSessionCookie, key);
    this.log.log(`Returning Blotter RTU Session Params : ${JSON.stringify(success)}`);
    return success;
  }

  terminateRtuSession(jSessionCookie, key) {
    this.log.log(`About to call /services/rtu/terminate/${key}`);
    const success = this.api.terminateRtuSession(jSessionCookie, key);
    return success;
  }

  setStpStatus(jSessionCookie, dealEntityId, strategyId, statusArray) {
    this.log.log(`About to call /services/stp/update for dealid=${dealEntityId}`);
    const success = this.api.setStpStatus(jSessionCookie, dealEntityId, strategyId, statusArray);
    const chainId = success.chainId;
    return chainId;
  }

  setStpStatusWithStpChainId(jSessionCookie, dealEntityId, strategyId, statusArray, stpChainId) {
    this.log.log(`About to call /services/stp/update for dealid=${dealEntityId}`);
    const success = this.api.setStpStatus(jSessionCookie, dealEntityId, strategyId, statusArray, stpChainId);
    const chainId = success.chainId;
    return chainId;
  }

  dealServiceGetStrategyIds(jSessionCookie, dmsDealReference) {
    this.log.log('About to call /services/deals');
    const stpStrategyIds = this.api.dealServiceGetStrategyIds(jSessionCookie, dmsDealReference);
    return stpStrategyIds;
  }

  dealServiceGetLockSequence(jSessionCookie, dmsDealReference) {
    this.log.log('About to call /services/deals');
    const lockSequence = this.api.dealServiceGetLockSequence(jSessionCookie, dmsDealReference);
    return lockSequence;
  }

  dealServiceGetDmsDealId(jSessionCookie, dmsDealReference) {
    this.log.log('About to call /services/deals');
    const lockSequence = this.api.dealServiceGetDmsDealId(jSessionCookie, dmsDealReference);
    return lockSequence;
  }

  getBlotterCount(jSessionCookie) {
    this.log.log('About to call /services/rtu/blottercount');
    const blotterCount = this.api.getBlotterCount(jSessionCookie);
    this.log.log(`Blotter Count = ${blotterCount}`);
    return blotterCount;
  }
}
module.exports = BlotterApiModel;
