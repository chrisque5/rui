/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
const jp = require('jsonpath-plus');
const ApiClient = require('./ApiClient');
const Logs = require('../core/utility/Logs');
const Constants = require('../data/Constants');
const moment = require('../../node_modules/moment/moment');

let cookie = '';
let url = '';
let host = '';

if (Constants.ENV === 'LOCAL') {
  url = 'http://localhost:8080/DMSWeb';
  host = 'localhost';
} else if (Constants.ENV === 'QA') {
  url = 'http://ldndmstestapp:8080/DMSWeb';
  host = 'ldndmstestapp';
}

const format = 'YYYY-MM-DD';

class BackEndApi {
  constructor() {
    this.log = new Logs();
    this.apiClient = new ApiClient();
  }

  async getHomePage() {
    let data;
    try {
      data = await this.apiClient.request(`${url}`, 'GET', null, { Connection: 'keep-alive' })
        .then((response) => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log('Error while start the listener Api.');
    }
    cookie = data.headers['set-cookie'];
    this.log.log(`cookie value is : ${cookie}`);
    return cookie;
  }

  loginRequest(username, password) {
    const data = browser.call(async () => this.loginRestRequest(username, password));
    const sessionCookie = data.headers['set-cookie'][0].split(';')[0];
    this.log.log(`cookie value is : ${sessionCookie}`);
    return sessionCookie;
  }

  async loginRestRequest(username, password) {
    let data;
    try {
      data = await this.apiClient.requestWithHeader(
        `${url}/j_security_check`,
        'POST',
        `j_username=${username}&j_password=${password}`, {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      )
        .then((response) => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while start the listener Api Erro : ${error}`);
    }
    return Promise.resolve(data);
  }

  getUserAccess(sessionCookie) {
    const data = browser.call(async () => this.requestWithoutBody('/services/user/accessInformation', sessionCookie, 'GET'));
    this.log.log(data);
  }

  getCurrencyCode(sessionCookie, currency, dealType) {
    const data = browser.call(async () => this.requestWithoutBody(`/services/currencyPairList?dealType=${dealType}`, sessionCookie, 'GET'));
    const currencies = data.data;
    this.log.log(`Currency Response is ${currencies}`);
    const currencyId = jp.JSONPath({ path: `$..[?(@.counterCurrency=='${currency}')].instrumentId`, json: currencies });
    this.log.log(currencyId[0]);
    return currencyId[0];
  }

  getScalingFactor(sessionCookie, currency, dealType) {
    const data = browser.call(async () => this.requestWithoutBody(`/services/currencyPairList?dealType=${dealType}`, sessionCookie, 'GET'));
    const currencies = data.data;
    this.log.log(`Currency Response is ${currencies}`);
    const scalingFactor = jp.JSONPath({ path: `$..[?(@.counterCurrency=='${currency}')].scalingFactor`, json: currencies });
    this.log.log(scalingFactor[0]);
    return scalingFactor[0];
  }

  getClientGCDId(clients, clientName) {
    const query = `$..[?(@ && @.tradingCustomerLegalName=="${clientName}")].tradingCustomerId`;
    this.log.log(`query for client : ${query}`);
    const clientGCDId = jp.JSONPath({ path: query, json: clients });
    return clientGCDId[0];
  }

  getTraderGCDId(clients, clientName, traderName) {
    const query = `$..[?(@ && @.tradingCustomerLegalName=="${clientName}")].traders[?(@.traderPostingDisplayName=="${traderName}")].traderPostingId`;
    this.log.log(`query for client : ${query}`);
    const traderGCDId = jp.JSONPath({ path: query, json: clients });
    return traderGCDId[0];
  }

  getExecutingCustomerGcdId(clients, clientName, traderName) {
    const query = `$..[?(@ && @.tradingCustomerLegalName=="${clientName}")].traders[?(@.traderPostingDisplayName=="${traderName}")].executingCustomerId`;
    this.log.log(`query for trader : ${query}`);
    const traderGCDId = jp.JSONPath({ path: query, json: clients });
    return traderGCDId[0];
  }

  getBrokerageDetails(brokerage, executingCustomerId) {
    const queryForCurrency = `$..brokerage[?(@.id==${executingCustomerId})].currency`;
    const queryForAmount = `$..brokerage[?(@.id==${executingCustomerId})].grossBrokerageCharge`;
    const currency = jp.JSONPath({ path: queryForCurrency, json: brokerage });
    const amount = jp.JSONPath({ path: queryForAmount, json: brokerage });
    this.log.log(`query for brokerage details : ${queryForCurrency} ${queryForAmount}`);
    return `${currency[0]}:${amount[0]}`;
  }

  getBrokerGcdId(brokers, brokerDeskName, brokerName) {
    const query = `$..[?(@.deskName=="${brokerDeskName}" && @.name=="${brokerName}")].id`;
    this.log.log(`query for broker gcd ID : ${query}`);
    const brokerGcdId = jp.JSONPath({ path: query, json: brokers });
    return brokerGcdId[0];
  }

  getAgentGcdId(agents, agentShortName, agentLocation) {
    const query = `$..[?(@ && @.shortName=="${agentShortName}" && @.locationName=="${agentLocation}")].id`;
    this.log.log(`query for agent gcd ID : ${query}`);
    const agentGcdId = jp.JSONPath({ path: query, json: agents });
    return agentGcdId[0];
  }

  getTermDates(sessionCookie, currencyId, term, dealType, strategy) {
    const dateMap = new Map();
    const tDate = moment().format('YYYY-MM-DD');
    let endpoint = '';
    if (dealType === 'NDF') {
      endpoint = '/services/dates/ndf/dates/for/';
    } else if (dealType === 'FWD') {
      endpoint = '/services/dates/fwd/tenors';
    }
    const body = {
      tenor: term, tradeDate: tDate, fxOptionId: currencyId, displayTenor: term, treatedAsTom: false, dealType, strategy,
    };
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dates = data.data;
    const fixingdate = jp.JSONPath({ path: '$.fxoLegReponse.fxValueDate.unadjustedDate', json: dates });
    const publishdate = jp.JSONPath({ path: '$.fxoLegReponse.publishDate.unadjustedDate', json: dates });
    const valuedate = jp.JSONPath({ path: '$.fxoLegReponse.fxValueDate.unadjustedDate', json: dates });
    const spotdate = jp.JSONPath({ path: '$.fxoLegReponse.spotDate', json: dates });
    const tenorPeriod = jp.JSONPath({ path: '$.fxoLegReponse.term.tenorPeriod', json: dates });
    const tenorPeriodMultiplier = jp.JSONPath({ path: '$.fxoLegReponse.term.tenorPeriodMultiplier', json: dates });
    const dayCount = this.getDayCount(spotdate[0], valuedate[0]);
    const tradeTime = `${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
    dateMap.set('fixingdate', new moment(fixingdate, 'x').format(format));
    dateMap.set('publishdate', new moment(publishdate, 'x').format(format));
    dateMap.set('valuedate', new moment(valuedate, 'x').format(format));
    dateMap.set('spotdate', new moment(spotdate, 'x').format(format));
    dateMap.set('tenorPeriod', this.getTenorPeriod(tenorPeriod[0]));
    dateMap.set('tenorPeriodMultiplier', tenorPeriodMultiplier[0]);
    dateMap.set('dayCount', dayCount);
    dateMap.set('tradeTime', tradeTime);
    return dateMap;
  }

  getFWDTermDates(sessionCookie, currencyId, term1, term2) {
    const dateMap = new Map();
    const tDate = moment().format('YYYY-MM-DD');
    const endpoint = '/services/dates/fwd/tenors';

    const body = {
      nearDisplayTenor: term1, farDisplayTenor: term2, tradeDate: tDate, fxOptionId: currencyId,
    };
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dates = data.data;
    const nearDayCount = jp.JSONPath({ path: '$.nearDayCount', json: dates });
    const farDayCount = jp.JSONPath({ path: '$.farDayCount', json: dates });
    const spotDate = jp.JSONPath({ path: '$.spotDate', json: dates });
    const nearDurationSpotToEnd = jp.JSONPath({ path: '$.nearDurationSpotToEnd', json: dates });
    const farDurationSpotToEnd = jp.JSONPath({ path: '$.farDurationSpotToEnd', json: dates });
    const nearValueDate = jp.JSONPath({ path: '$.nearValueDate', json: dates });
    const farValueDate = jp.JSONPath({ path: '$.farValueDate', json: dates });
    const fwdTodayIsValidDate = jp.JSONPath({ path: '$.fwdTodayIsValidDate', json: dates });
    const tradeTime = `${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;

    dateMap.set('nearDayCount', nearDayCount[0]);
    dateMap.set('nearDurationPeriod', this.getDurationPeriod(term1));
    dateMap.set('nearDurationMultiplier', this.getDurationMultiplier(term1));
    dateMap.set('farDayCount', farDayCount[0]);
    dateMap.set('spotDate', spotDate[0]);
    dateMap.set('publishDate', tDate);
    dateMap.set('nearDurationSpotToEnd', nearDurationSpotToEnd[0]);
    dateMap.set('farDurationSpotToEnd', farDurationSpotToEnd[0]);
    dateMap.set('farDurationPeriod', this.getDurationPeriod(term2));
    dateMap.set('farDurationMultiplier', this.getDurationMultiplier(term2));
    dateMap.set('nearValueDate', nearValueDate[0]);
    dateMap.set('farValueDate', farValueDate[0]);
    dateMap.set('fwdTodayIsValidDate', fwdTodayIsValidDate[0]);
    dateMap.set('tradeTime', tradeTime);
    return dateMap;
  }

  getFWDOutrightTermDates(sessionCookie, currencyId, term) {
    const dateMap = new Map();
    const tDate = moment().format('YYYY-MM-DD');
    const endpoint = '/services/dates/fwd/outright/tenors';

    const body = { displayTenor: term, tradeDate: tDate, fxOptionId: currencyId };
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dates = data.data;
    const dayCount = jp.JSONPath({ path: '$.dayCount', json: dates });
    const spotDate = jp.JSONPath({ path: '$.spotDate', json: dates });
    const durationSpotToEnd = jp.JSONPath({ path: '$.durationSpotToEnd', json: dates });
    const valueDate = jp.JSONPath({ path: '$.valueDate', json: dates });
    const fwdTodayIsValidDate = jp.JSONPath({ path: '$.fwdTodayIsValidDate', json: dates });
    const tradeTime = `${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;

    dateMap.set('dayCount', dayCount[0]);
    dateMap.set('durationPeriod', this.getDurationPeriod(term));
    dateMap.set('durationMultiplier', this.getDurationMultiplier(term));
    dateMap.set('spotDate', spotDate[0]);
    dateMap.set('publishDate', tDate);
    dateMap.set('durationSpotToEnd', durationSpotToEnd[0]);
    dateMap.set('valueDate', valueDate[0]);
    dateMap.set('fwdTodayIsValidDate', fwdTodayIsValidDate[0]);
    dateMap.set('tradeTime', tradeTime);
    return dateMap;
  }

  getSPTTermDates(sessionCookie, currencyId) {
    const dateMap = new Map();
    const tDate = moment().format('YYYY-MM-DD');
    const endpoint = '/services/dates/spt/tenors';

    const body = { tradeDate: tDate, fxOptionId: currencyId };
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dates = data.data;
    const dayCountFromTrade = jp.JSONPath({ path: '$.dayCountFromTrade', json: dates });
    const spotDate = jp.JSONPath({ path: '$.spotDate', json: dates });
    const dayCountFromSpot = jp.JSONPath({ path: '$.dayCountFromSpot', json: dates });
    const valueDate = jp.JSONPath({ path: '$.valueDate', json: dates });
    const displayTenor = jp.JSONPath({ path: '$.displayTenor', json: dates });
    const tradeTime = `${moment().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;

    dateMap.set('dayCountFromTrade', dayCountFromTrade[0]);
    dateMap.set('spotDate', spotDate[0]);
    dateMap.set('publishDate', tDate);
    dateMap.set('dayCountFromSpot', dayCountFromSpot[0]);
    dateMap.set('valueDate', valueDate[0]);
    dateMap.set('displayTenor', displayTenor[0]);
    dateMap.set('tradeTime', tradeTime);
    return dateMap;
  }

  getTenorPeriod(period) {
    if (period === 'MONTHS') {
      return 'M';
    } if (period === 'Year') {
      return 'Y';
    } if (period === 'WEEKS') {
      return 'W';
    }
    this.log.log('Problem getting period multiplier');
    return null;
  }

  getDurationPeriod(term) {
    if (term.includes('M')) {
      return 'M';
    } if (term.includes('Y')) {
      return 'Y';
    } if (term.includes('W')) {
      return 'W';
    } if (term.includes('D')) {
      return 'D';
    }
    this.log.log('Problem getting duration period');
    return null;
  }

  getDurationMultiplier(term) {
    this.log.log('Getting duration multiplier');
    return term.split(/M|Y|W|D/)[0];
  }

  getVenueData(sessionCookie, dealType) {
    const endpoint = `/services/executionVenues/?dealtype=${dealType}`;
    const data = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const venues = data.data;
    return venues;
  }

  getBrokerData(sessionCookie, dealType) {
    const endpoint = `/services/brokers/?dealtype=${dealType}`;
    const data = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const brokers = data.data;
    return brokers;
  }

  getClientData(sessionCookie, dealType) {
    const endpoint = `/services/clients/?dealtype=${dealType}`;
    const data = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const clients = data.data;
    return clients;
  }

  getAgentData(sessionCookie, dealType) {
    const endpoint = `/services/agents/?dealtype=${dealType}`;
    const data = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const agents = data.data;
    return agents;
  }

  getDayCount(spotDate, valueDate) {
    const dayCount = moment(valueDate).diff(moment(spotDate), 'days');
    this.log.log(`Day Count is : ${dayCount}`);
    return dayCount;
  }

  createOutrightDeal(sessionCookie, strategy, dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const body = this.getOutrightDealBodyJson(strategy, dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    const endpoint = '/services/deals';
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dealId = data.data.deals;
    return dealId;
  }

  createOutrightDealWithBrokrage(sessionCookie, strategy, dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const body = this.getOutrightDealBodyJson(strategy, dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    const endpoint = '/services/deals';
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dealId = data.data;
    return dealId;
  }

  createForwardDeal(sessionCookie, strategy, dealType, term1, term2, price1, price2, points, amount1, amount2, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const body = this.getFWDDealBodyJson(strategy, dealType, term1, term2, price1, price2, points, amount1, amount2, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    const endpoint = '/services/deals';
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dealId = data.data.deals;
    return dealId;
  }

  createForwardOutrightDeal(sessionCookie, strategy, dealType, term, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const body = this.getFWDOutrightJson(strategy, dealType, term, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    const endpoint = '/services/deals';
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dealId = data.data.deals;
    return dealId;
  }

  createSptDeal(sessionCookie, strategy, dealType, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    const body = this.getSpotJson(strategy, dealType, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap);
    const endpoint = '/services/deals';
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'POST', body));
    const dealId = data.data.deals;
    return dealId;
  }

  async requestWithoutBody(endpoint, cookieVal, method) {
    let data;
    const header = this.createNormalHeader(cookieVal);
    this.log.log(`header Value is : ${JSON.stringify(header)}`);
    try {
      data = await this.apiClient.requestWithoutBody(`${url}${endpoint}`, method, header)
        .then((response) => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while start the listener Api : ${error}`);
    }
    return Promise.resolve(data);
  }

  async requestWithBody(endpoint, cookieVal, method, body) {
    let data;
    const header = this.createNormalHeader(cookieVal);
    this.log.log(`header Value is : ${JSON.stringify(header)}`);
    try {
      data = await this.apiClient.requestWithHeader(`${url}${endpoint}`, method, body, header)
        .then((response) => response)
        .catch((error) => { throw (error); });
    } catch (error) {
      this.log.log(`Error while start the listener Api : ${error}`);
    }
    return Promise.resolve(data);
  }

  createNormalHeader(cc) {
    const header = {
      Connection: 'keep-alive', Cookie: cc, 'Cache-Control': 'no-cache', Accept: '*/*', 'Accept-Encoding': 'gzip, deflate, br', Host: `${host}:8080`,
    };
    this.log.log(`Header : ${JSON.stringify(header)}`);
    return header;
  }

  getOutrightDealBodyJson(strategy, dealType, tenor, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    this.log.log('Getting Outright Deal Body JSON');
    const body = {
      strategy,
      dealType,
      tradeTime: dateMap.get('tradeTime'),
      isBackDated: dealSettingMap.get('isBackDated'),
      instrumentId: currencyMap.get('instrumentId'),
      volumeMatch: dealSettingMap.get('volumeMatch'),
      deals: [{
        dealGroupId: 1,
        forwardStart: dealSettingMap.get('forwardStart'),
        trades: [{
          fixingDate: dateMap.get('publishdate'),
          publishDate: dateMap.get('publishdate'),
          spotDate: dateMap.get('spotdate'),
          tradeEconomics: {
            currency1: currencyMap.get('currency1'),
            currency2: currencyMap.get('currency2'),
            dealtCurrency: currencyMap.get('dealtCurrency'),
            executionVenue: venue,
            settlementCurrency: currencyMap.get('settlementCurrency'),
            payer: {
              tradingCustomerGcdId: partyMap.get('buyerClientGcdId'), brokerGcdPostingId: partyMap.get('buyerBrokerGcdid'), traderGcdPostingId: partyMap.get('buyerTraderGcdId'), executingCustomerGcdId: partyMap.get('buyerExecutingCustomerGcdId'), agentCustomerGcdId: partyMap.get('buyerAgentGcdid'),
            },
            receiver: {
              tradingCustomerGcdId: partyMap.get('sellerClientGcdId'), brokerGcdPostingId: partyMap.get('sellerBrokerGcdid'), traderGcdPostingId: partyMap.get('sellerTraderGcdId'), executingCustomerGcdId: partyMap.get('sellerExecutingCustomerGcdId'), agentCustomerGcdId: partyMap.get('sellerAgentGcdid'),
            },
          },
          valueDate: dateMap.get('valuedate'),
          price,
          dayCount: dateMap.get('dayCount'),
          notionalAmount: amount,
          durationPeriod: dateMap.get('tenorPeriod'),
          durationMultiplier: dateMap.get('tenorPeriodMultiplier').toString(),
          displayTenor: tenor,
        }],
      }],
    };
    return body;
  }

  getFWDDealBodyJson(strategy, dealType, term1, term2, price1, price2, points, amount1, amount2, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    this.log.log('Getting FWD Deal Body JSON');
    const body = {
      strategy,
      dealType,
      tradeTime: dateMap.get('tradeTime'),
      isBackDated: dealSettingMap.get('isBackDated'),
      instrumentId: currencyMap.get('instrumentId'),
      volumeMatch: dealSettingMap.get('volumeMatch'),
      deals: [{
        isTurnTrade: dealSettingMap.get('isTurnTrade'),
        points,
        scalingFactor: currencyMap.get('scalingFactor'),
        trades: [{
          durationSpotToEnd: dateMap.get('nearDurationSpotToEnd'),
          publishDate: dateMap.get('publishDate'),
          spotDate: dateMap.get('spotDate'),
          tradeEconomics: {
            currency1: currencyMap.get('currency1'),
            currency2: currencyMap.get('currency2'),
            dealtCurrency: currencyMap.get('dealtCurrency'),
            executionVenue: venue,
            settlementCurrency: currencyMap.get('settlementCurrency'),
            payer: {
              tradingCustomerGcdId: partyMap.get('buyerClientGcdId'), brokerGcdPostingId: partyMap.get('buyerBrokerGcdid'), traderGcdPostingId: partyMap.get('buyerTraderGcdId'), executingCustomerGcdId: partyMap.get('buyerClientGcdId'), agentCustomerGcdId: partyMap.get('buyerAgentGcdid'),
            },
            receiver: {
              tradingCustomerGcdId: partyMap.get('sellerClientGcdId'), brokerGcdPostingId: partyMap.get('sellerBrokerGcdid'), traderGcdPostingId: partyMap.get('sellerTraderGcdId'), executingCustomerGcdId: partyMap.get('sellerClientGcdId'), agentCustomerGcdId: partyMap.get('sellerAgentGcdid'),
            },
          },
          durationPeriod: dateMap.get('nearDurationPeriod'),
          durationMultiplier: dateMap.get('nearDurationMultiplier'),
          displayTenor: term1,
          valueDate: dateMap.get('nearValueDate'),
          price: price1,
          dayCount: dateMap.get('nearDayCount'),
          notionalAmount: amount1,
          CLS: dealSettingMap.get('cls1'),
        },
        {
          durationSpotToEnd: dateMap.get('farDurationSpotToEnd'),
          publishDate: dateMap.get('publishDate'),
          spotDate: dateMap.get('spotDate'),
          tradeEconomics: {
            currency1: currencyMap.get('currency1'),
            currency2: currencyMap.get('currency2'),
            dealtCurrency: currencyMap.get('dealtCurrency'),
            executionVenue: venue,
            settlementCurrency: currencyMap.get('settlementCurrency'),
            payer: {
              tradingCustomerGcdId: partyMap.get('sellerClientGcdId'), brokerGcdPostingId: partyMap.get('sellerBrokerGcdid'), traderGcdPostingId: partyMap.get('sellerTraderGcdId'), executingCustomerGcdId: partyMap.get('sellerClientGcdId'), agentCustomerGcdId: partyMap.get('sellerAgentGcdid'),
            },
            receiver: {
              tradingCustomerGcdId: partyMap.get('buyerClientGcdId'), brokerGcdPostingId: partyMap.get('buyerBrokerGcdid'), traderGcdPostingId: partyMap.get('buyerTraderGcdId'), executingCustomerGcdId: partyMap.get('buyerClientGcdId'), agentCustomerGcdId: partyMap.get('buyerAgentGcdid'),
            },
          },
          durationPeriod: dateMap.get('farDurationPeriod'),
          durationMultiplier: dateMap.get('farDurationMultiplier'),
          displayTenor: term2,
          valueDate: dateMap.get('farValueDate'),
          price: price2,
          dayCount: dateMap.get('farDayCount'),
          notionalAmount: amount2,
          CLS: dealSettingMap.get('cls2'),
        }],
      }],
    };
    return body;
  }

  getFWDOutrightJson(strategy, dealType, term, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    this.log.log('Getting FWD Out Deal Body JSON');
    const body = {
      strategy,
      dealType,
      tradeTime: dateMap.get('tradeTime'),
      isBackDated: dealSettingMap.get('isBackDated'),
      instrumentId: currencyMap.get('instrumentId'),
      volumeMatch: dealSettingMap.get('volumeMatch'),
      deals: [{
        isTurnTrade: dealSettingMap.get('isTurnTrade'),
        scalingFactor: currencyMap.get('scalingFactor'),
        trades: [{
          durationSpotToEnd: dateMap.get('durationSpotToEnd'),
          publishDate: dateMap.get('publishDate'),
          spotDate: dateMap.get('spotDate'),
          tradeEconomics: {
            currency1: currencyMap.get('currency1'),
            currency2: currencyMap.get('currency2'),
            dealtCurrency: currencyMap.get('dealtCurrency'),
            executionVenue: venue,
            settlementCurrency: currencyMap.get('settlementCurrency'),
            payer: {
              tradingCustomerGcdId: partyMap.get('buyerClientGcdId'), brokerGcdPostingId: partyMap.get('buyerBrokerGcdid'), traderGcdPostingId: partyMap.get('buyerTraderGcdId'), executingCustomerGcdId: partyMap.get('buyerClientGcdId'), agentCustomerGcdId: partyMap.get('buyerAgentGcdid'),
            },
            receiver: {
              tradingCustomerGcdId: partyMap.get('sellerClientGcdId'), brokerGcdPostingId: partyMap.get('sellerBrokerGcdid'), traderGcdPostingId: partyMap.get('sellerTraderGcdId'), executingCustomerGcdId: partyMap.get('sellerClientGcdId'), agentCustomerGcdId: partyMap.get('sellerAgentGcdid'),
            },
          },
          durationPeriod: dateMap.get('durationPeriod'),
          durationMultiplier: dateMap.get('durationMultiplier'),
          displayTenor: term,
          valueDate: dateMap.get('valueDate'),
          price,
          dayCount: dateMap.get('dayCount'),
          notionalAmount: amount,
          CLS: dealSettingMap.get('cls'),
        }],
      }],
    };
    return body;
  }

  getSpotJson(strategy, dealType, price, amount, venue, currencyMap, dateMap, partyMap, dealSettingMap) {
    this.log.log('Getting SPT Deal Body JSON');
    const body = {
      strategy,
      dealType,
      tradeTime: dateMap.get('tradeTime'),
      isBackDated: dealSettingMap.get('isBackDated'),
      instrumentId: currencyMap.get('instrumentId'),
      volumeMatch: dealSettingMap.get('volumeMatch'),
      deals: [{
        trades: [{
          publishDate: dateMap.get('publishDate'),
          spotDate: dateMap.get('spotDate'),
          tradeEconomics: {
            currency1: currencyMap.get('currency1'),
            currency2: currencyMap.get('currency2'),
            dealtCurrency: currencyMap.get('dealtCurrency'),
            executionVenue: venue,
            settlementCurrency: currencyMap.get('settlementCurrency'),
            payer: {
              tradingCustomerGcdId: partyMap.get('buyerClientGcdId'), brokerGcdPostingId: partyMap.get('buyerBrokerGcdid'), traderGcdPostingId: partyMap.get('buyerTraderGcdId'), executingCustomerGcdId: partyMap.get('buyerClientGcdId'), agentCustomerGcdId: partyMap.get('buyerAgentGcdid'),
            },
            receiver: {
              tradingCustomerGcdId: partyMap.get('sellerClientGcdId'), brokerGcdPostingId: partyMap.get('sellerBrokerGcdid'), traderGcdPostingId: partyMap.get('sellerTraderGcdId'), executingCustomerGcdId: partyMap.get('sellerClientGcdId'), agentCustomerGcdId: partyMap.get('sellerAgentGcdid'),
            },
          },
          valueDate: dateMap.get('valueDate'),
          price,
          dayCount: dateMap.get('dayCountFromTrade'),
          notionalAmount: amount,
          CLS: dealSettingMap.get('cls'),
          durationMultiplier: '0',
          durationPeriod: 'D',
          durationSpotToEnd: 0,
        }],
      }],
    };
    return body;
  }

  cancelDeal(sessionCookie, dmsDealIdVal, dealLockSequenceIdVal, chainCancelVal, cancelReasonVal) {
    const body = {
      dmsDealId: dmsDealIdVal,
      dealLockSequenceId: dealLockSequenceIdVal,
      chainCancel: chainCancelVal,
      cancelReason: cancelReasonVal,
    };
    const endpoint = '/services/deals/cancelDeal';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const data = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    const returnMessage = data.data.returnMessage;
    return returnMessage;
  }

  editAmount(sessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue) {
    const body = {
      id: dmsDealId,
      lockSequence: dealLockSequenceId,
      comment: {
        value: comment,
      },
      tradeEconomic: {
        value: {
          tradeEconomics: {
            value: {
              fxCurrency1Amount: {
                value: newAmountValue,
              },
            },
          },
        },
      },
    };
    const endpoint = '/services/deals';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: { returnMessage = '' } } = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    return returnMessage;
  }

  editPrice(sessionCookie, dmsDealId, dealLockSequenceId, comment, newPriceValue) {
    const body = {
      id: dmsDealId,
      lockSequence: dealLockSequenceId,
      comment: {
        value: comment,
      },
      tradeEconomic: {
        value: {
          tradeEconomics: {
            value: {
              exchangeRate: {
                value: newPriceValue,
              },
            },
          },
        },
      },
    };
    const endpoint = '/services/deals';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: { returnMessage = '' } } = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    return returnMessage;
  }

  editBuyerBrokerage(sessionCookie, dmsDealId, dealLockSequenceId, comment, broCcy, amount) {
    const body = {
      id: dmsDealId,
      lockSequence: dealLockSequenceId,
      comment: {
        value: comment,
      },
      tradeEconomic: {
        value: {
          tradeEconomics: {
            value: {
              receiver: {
                value: {
                  brokerage: {
                    value: {
                      currency: {
                        value: {
                          code: {
                            value: broCcy,
                          },
                        },
                      },
                      amount: {
                        value: amount,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const endpoint = '/services/deals';
    this.log.log(`Calling endpoint : ${endpoint} with body: ${JSON.stringify(body)}`);
    const { data: { returnMessage = '' } } = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    return returnMessage;
  }

  editSellerBrokerage(sessionCookie, dmsDealId, dealLockSequenceId, comment, broCcy, amount) {
    const body = {
      id: dmsDealId,
      lockSequence: dealLockSequenceId,
      comment: {
        value: comment,
      },
      tradeEconomic: {
        value: {
          tradeEconomics: {
            value: {
              payer: {
                value: {
                  brokerage: {
                    value: {
                      currency: {
                        value: {
                          code: {
                            value: broCcy,
                          },
                        },
                      },
                      amount: {
                        value: amount,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const endpoint = '/services/deals';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: { returnMessage = '' } } = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    return returnMessage;
  }

  editAmountPriceBro(sessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPriceValue, buyBroCcy, buyBroAmount, sellBroCcy, sellBroAmount) {
    const body = {
      id: dmsDealId,
      lockSequence: dealLockSequenceId,
      comment: {
        value: comment,
      },
      tradeEconomic: {
        value: {
          tradeEconomics: {
            value: {
              fxCurrency1Amount: {
                value: newAmountValue,
              },
              exchangeRate: {
                value: newPriceValue,
              },
              receiver: {
                value: {
                  brokerage: {
                    value: {
                      currency: {
                        value: {
                          code: {
                            value: buyBroCcy,
                          },
                        },
                      },
                      amount: {
                        value: buyBroAmount,
                      },
                    },
                  },
                },
              },
              payer: {
                value: {
                  brokerage: {
                    value: {
                      currency: {
                        value: {
                          code: {
                            value: sellBroCcy,
                          },
                        },
                      },
                      amount: {
                        value: sellBroAmount,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const endpoint = '/services/deals';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data } = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    return data;
  }

  editAmountPrice(sessionCookie, dmsDealId, dealLockSequenceId, comment, newAmountValue, newPrice1Value) {
    const body = {
      id: dmsDealId,
      lockSequence: dealLockSequenceId,
      comment: {
        value: comment,
      },
      tradeEconomic: {
        value: {
          tradeEconomics: {
            value: {
              fxCurrency1Amount: {
                value: newAmountValue,
              },
              exchangeRate: {
                value: newPrice1Value,
              },
            },
          },
        },
      },
    };
    const endpoint = '/services/deals';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data } = browser.call(async () => this.requestWithBody(endpoint, sessionCookie, 'PUT', body));
    return data;
  }

  getKeysDmsWeb(sessionCookie) {
    const endpoint = '/services/rtu/keys/dmsweb';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: keys } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    return keys;
  }

  getRtuSessionParameters(sessionCookie, key) {
    const endpoint = `/services/rtu/${key}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: parameters } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    return parameters;
  }

  terminateRtuSession(sessionCookie, key) {
    const endpoint = `/services/rtu/terminate/${key}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: response } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'DELETE'));
    return response;
  }

  setStpStatus(sessionCookie, dealEntityId, strategyId, statusArray) {
    const dealId = `dealid=${dealEntityId}`;
    const strategyid = `&strategyid=${strategyId}`;
    const status = `&status=${statusArray[0]}`;
    const roundelColour = `&roundelColour=${statusArray[1]}`;
    const publishReason = `&publishReason=${statusArray[2]}`;
    const messageType = `&messageType=${statusArray[3]}`;
    const endpoint = `/services/stp/update?${dealId}${strategyid}${status}${roundelColour}${publishReason}${messageType}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: response } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'PUT'));
    this.log.log(`Response is : ${JSON.stringify(response)}`);
    return response;
  }

  setStpStatusWithStpChainId(sessionCookie, dealEntityId, strategyId, statusArray, stpChainId) {
    const dealId = `dealid=${dealEntityId}`;
    const strategyid = `&strategyid=${strategyId}`;
    const status = `&status=${statusArray[0]}`;
    const roundelColour = `&roundelColour=${statusArray[1]}`;
    const publishReason = `&publishReason=${statusArray[2]}`;
    const messageType = `&messageType=${statusArray[3]}`;
    const chainId = `&chainId=${stpChainId}`;

    const endpoint = `/services/stp/update?${dealId}${strategyid}${status}${roundelColour}${publishReason}${messageType}${chainId}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: response } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'PUT'));
    return response;
  }

  dealServiceGetStrategyIds(sessionCookie, dmsDealReference) {
    const endpoint = `/services/deals?productType=FX&dmsDealReference=${dmsDealReference}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: response } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const payerStrategyId = response.executionChains[0].deals[0].trades[0].tradeEconomics.payer.strategyId;
    const receiverStrategyId = response.executionChains[0].deals[0].trades[0].tradeEconomics.receiver.strategyId;
    const stpStrategyIds = {
      payerStrategyId,
      receiverStrategyId,
    };
    this.log.log(`STP Strategy IDs : ${JSON.stringify(stpStrategyIds)}`);
    return stpStrategyIds;
  }

  dealServiceGetLockSequence(sessionCookie, dmsDealReference) {
    const endpoint = `/services/deals?productType=FX&dmsDealReference=${dmsDealReference}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: response } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const lockSequence = response.executionChains[0].deals[0].lockSequence;
    this.log.log(`Deal Service Get lockSequence : ${JSON.stringify(lockSequence)}`);
    return lockSequence;
  }

  dealServiceGetDmsDealId(sessionCookie, dmsDealReference) {
    const endpoint = `/services/deals?productType=FX&dmsDealReference=${dmsDealReference}`;
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: response } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    const dealEntityId = response.executionChains[0].deals[0].dealEntityId;
    this.log.log(`Deal Service Get lockSequence : ${JSON.stringify(dealEntityId)}`);
    return dealEntityId;
  }

  getBlotterCount(sessionCookie) {
    const endpoint = '/services/rtu/blottercount';
    this.log.log(`Calling endpoint : ${endpoint}`);
    const { data: { numberOfBlotters } } = browser.call(async () => this.requestWithoutBody(endpoint, sessionCookie, 'GET'));
    return numberOfBlotters;
  }
}

module.exports = BackEndApi;
