/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel');
const API = require('../../models/blotter/BlotterApiModel');
const FwdDealModel = require('../../models/fwd/DealModel');
const SptDealModel = require('../../models/spt/DealModel');
const DealDateModel = require('../../models/fwd/DateModel');
const LoginModel = require('../../models/LoginModel');
const SettingsModel = require('../../models/SettingsModel');
const E2EModel = require('../../models/E2EModel');
const Logs = require('../../core/utility/Logs');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const StrategyModel = require('../../models/fwd/StrategyModel');
const SharedStore = require('../../core/store/SharedStore');
const PointModel = require('../../models/fwd/PointModel');
const DateModel = require('../../models/DateModel');
const BlotterData = require('../../data/blotter/BlotterData');

const LocalUsers = require('../../data/UserDetails');
const LocalInstrument = require('../../data/InstrumentDetails');
const QaUsers = require('../../data/qa/UserDetails');
const QaInstrument = require('../../data/qa/InstrumentDetails');
const FwdUsers = require('../../data/fwd/UserDetails');
const FwdInstrument = require('../../data/fwd/InstrumentDetails');
const QaFwdUsers = require('../../data/qa/fwd/UserDetails');
const QaFwdInstrument = require('../../data/qa/fwd/InstrumentDetails');
const SptUsers = require('../../data/spt/UserDetails');
const SptInstrument = require('../../data/spt/InstrumentDetails');
const QaSptUsers = require('../../data/qa/spt/UserDetails');
const QaSptInstrument = require('../../data/qa/spt/InstrumentDetails');
const Constants = require('../../data/Constants');

let users = null;
let instrument = null;
let fwdUsers = null;
let fwdInstrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    sptUsers = SptUsers;
    sptInstrument = SptInstrument;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdUsers = QaFwdUsers;
    fwdInstrument = QaFwdInstrument;
    sptUsers = QaSptUsers;
    sptInstrument = QaSptInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}
let dateFormat = '';
let cookie = '';

const dealIDs = {
  deal01Id: '',
  deal02Leg1Id: '',
  deal02Leg2Id: '',
  deal03Id: '',
  deal03dmsDealId: '',
  deal04Id: '',
  deal05Id: '',
  deal06Id: '',
  deal07Leg1Id: '',
  deal07Leg2Id: '',
  deal08Id: '',
  deal09Id: '',
  deal10Id: '',
  deal11Id: '',
  deal12Id: '',
  deal13Id: '',
  deal14Id: '',
  deal15Id: '',
  deal16Id: '',
  deal17Id: '',
  deal18Id: '',
  deal19Id: '',
  deal21Id: '',
  deal22Id: '',
  deal23Id: '',
  deal24Id: '',
  deal25Id: '',
  deal26Id: '',
};
const dealModel = new DealModel();
const fwdDealModel = new FwdDealModel();
const sptDealModel = new SptDealModel();
const dealDate = new DealDateModel();
const loginModel = new LoginModel();
const settingsModel = new SettingsModel();
const popUpNavModel = new PopUpNavigationModel();
const strategy = new StrategyModel();
const sharedStore = new SharedStore();
const point = new PointModel();
const date = new DateModel();
const e2e = new E2EModel();
const api = new API();
const log = new Logs();

function before() {
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
  // creating API user
  cookie = api.setCookie();
  log.log(`Cookie value is : ${cookie}`);
}

// Setup - Run before each test
function beforeEach() {
  popUpNavModel.closePopUpMessage();
  loginModel.openUrl(Constants.NDFURL);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToNDF() {
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToFWD() {
  loginModel.selectFWD();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToSPT() {
  loginModel.selectSPT();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

class BlotterDealCreation {
  constructor() {
    before();
  }

  /* NDF Deal Creation */
  deal01Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    sharedStore.setValueToStore('deal01Amount', dealModel.getAmount().replace(/,/g, ''));
    sharedStore.setValueToStore('deal01ValueDate', dealDate.getValueDate());
    dealModel.clickSubmitBtn();
    dealIDs.deal01Id = e2e.getDealId();
    log.log(`deal01 ID : ${dealIDs.deal01Id}`);
    sharedStore.setValueToStore('deal01Id', dealIDs.deal01Id);
    popUpNavModel.closePopUpMessage();
  }

  deal02Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, '', instrument.TENOR_A, '20', '10', instrument.TENOR_F, '20', '10');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    dealIDs.deal02Leg1Id = e2e.getLeg1DealId();
    dealIDs.deal02Leg2Id = e2e.getLeg2DealId();
    log.log(`deal02 ID Leg 1 : ${dealIDs.deal02Leg1Id}`);
    log.log(`deal02 ID Leg 2 : ${dealIDs.deal02Leg2Id}`);
    sharedStore.setValueToStore('deal02Leg1Id', dealIDs.deal02Leg1Id);
    sharedStore.setValueToStore('deal02Leg2Id', dealIDs.deal02Leg2Id);
    popUpNavModel.closePopUpMessage();
  }

  deal03Id() {
    const currencyMap = api.getCurrencyMap(instrument.CURRENCY_A, instrument.CURRENCY_C, instrument.CURRENCY_A, instrument.CURRENCY_A, 'NDF');
    api.setClientInfo('NDF');
    const dealSettingMap = api.getDealSettingsMap(false, false, false, '', '');

    const dateMap = api.getTermDates(currencyMap.get('instrumentId'), instrument.TENOR_C, 'NDF', 'OUTRIGHT');
    let partyMap = api.getBuyerPartyMap(users.CLIENT_A.Client, '', users.DESK_C, users.BROKER_J, users.AGENT_A);
    partyMap = api.getSellerPartyMap(partyMap, users.CLIENT_B.Client, users.TRADER_B_DETAIL.TraderName, users.DESK_C, users.BROKER_D.Name, '');

    const dealId = api.createOutrightDeal('NDF', instrument.TENOR_C, 6.2945, 1000000, instrument.VENUE_J, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal03Id = dealId[0].dmsDealReference;
    dealIDs.deal03dmsDealId = dealId[0].dealId;
    sharedStore.setValueToStore('deal03Id', dealIDs.deal03Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'QA') {
      browser.pause(5000); // artificial wait to allow STP to complete to update lockSequence
    }
    const lockSequence = api.dealServiceGetLockSequence(cookie, dealIDs.deal03Id);
    const result = api.cancelDeal(cookie, dealIDs.deal03dmsDealId, lockSequence, 'false', 'Test trade cancel');
    log.log(`Result of Cancel Deal REST call is: ${result}`);
  }

  deal04Id() {
    const currencyMap = api.getCurrencyMap(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, instrument.CURRENCY_A, 'NDF');
    const dealSettingMap = api.getDealSettingsMap(false, false, false, '', '');

    const dateMap = api.getTermDates(currencyMap.get('instrumentId'), instrument.TENOR_F, 'NDF', 'OUTRIGHT');
    let partyMap = api.getBuyerPartyMap(users.CLIENT_P.Client, users.TRADER_P_DETAIL.TraderName, users.DESK_F, users.BROKER_L, '');
    partyMap = api.getSellerPartyMap(partyMap, users.CLIENT_Q.Client, users.TRADER_Q_DETAIL.TraderName, users.DESK_F, users.BROKER_L, '');

    const data = api.createOutrightDealWithBrokrage('NDF', instrument.TENOR_F, 6.2945, 1000000, instrument.VENUE_A, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal04Id = data.deals[0].dmsDealReference.toString();
    const deal04DealEntityId = data.deals[0].dealId.toString();
    log.log(`Next is the deal. ${deal04DealEntityId}`);
    const buyerBrokerage = api.getBrokerageDetails(data, partyMap.get('buyerExecutingCustomerGcdId'));
    const sellerBrokerage = api.getBrokerageDetails(data, partyMap.get('sellerExecutingCustomerGcdId'));
    sharedStore.setValueToStore('deal04Id', dealIDs.deal04Id);
    sharedStore.setValueToStore('deal04IdBuyerBrokerage', buyerBrokerage);
    sharedStore.setValueToStore('deal04IdSellerBrokerage', sellerBrokerage);
    log.log(`Next is the deal. ${dealIDs.deal04Id}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal04Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, data.deals[0].dealId, payerStrategyId, BlotterData.ACKFAILURE);
      const receiverStpChainId = api.setStpStatus(cookie, data.deals[0].dealId, receiverStrategyId, BlotterData.NO_STP);
      log.log(`STP Chain IDs for ${dealIDs.deal04Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  deal05Id() {
    const currencyMap = api.getCurrencyMap(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_A, instrument.CURRENCY_A, 'NDF');
    const dealSettingMap = api.getDealSettingsMap(false, false, false, '', '');
    const dateMap = api.getTermDates(currencyMap.get('instrumentId'), instrument.TENOR_F, 'NDF', 'OUTRIGHT');
    let partyMap = api.getBuyerPartyMap(users.CLIENT_A.Client, users.TRADER_A_DETAIL.TraderName, users.DESK_C, users.BROKER_J, '');
    partyMap = api.getSellerPartyMap(partyMap, users.CLIENT_H.Client, users.TRADER_H_DETAIL.TraderName, users.DESK_C, users.BROKER_D.Name, '');

    const dealId = api.createOutrightDeal('NDF', instrument.TENOR_F, 6.2945, 1000000, instrument.VENUE_B, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal05Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal05Id', dealIDs.deal05Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal05Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.ERROR);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.NOTSENT);
      log.log(`STP Chain IDs for ${dealIDs.deal05Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  deal06Id() {
    const currencyMap = api.getCurrencyMap(instrument.CURRENCY_A, instrument.CURRENCY_I, instrument.CURRENCY_A, instrument.CURRENCY_A, 'NDF');
    // VolMatch is true
    const dealSettingMap = api.getDealSettingsMap(true, false, false, '', '');
    const dateMap = api.getTermDates(currencyMap.get('instrumentId'), instrument.TENOR_F, 'NDF', 'OUTRIGHT');
    let partyMap = api.getBuyerPartyMap(users.CLIENT_H.Client, users.TRADER_H_DETAIL.TraderName, users.DESK_C, users.BROKER_J, '');
    partyMap = api.getSellerPartyMap(partyMap, users.CLIENT_J.Client, users.TRADER_K_DETAIL.TraderName, users.DESK_C, users.BROKER_D.Name, '');

    const dealId = api.createOutrightDeal('NDF', instrument.TENOR_F, 6.2945, 1000000, instrument.VENUE_J, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal06Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal06Id', dealIDs.deal06Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal06Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.UNKNOWN);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.TMM_SENDPENDING);
      log.log(`STP Chain IDs for ${dealIDs.deal06Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  deal07Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, '', instrument.TENOR_F, '3.4111', '5', instrument.TENOR_F1, '3.5341', '5');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickThreeCpChk();
    dealModel.selectcp2BuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectcp2SellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectcp2BuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectcp2SellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    dealIDs.deal07Leg1Id = e2e.getLeg1DealId();
    dealIDs.deal07Leg2Id = e2e.getLeg2DealId();
    log.log(`deal07 ID Leg 1 : ${dealIDs.deal07Leg1Id}`);
    log.log(`deal07 ID Leg 2 : ${dealIDs.deal07Leg2Id}`);
    sharedStore.setValueToStore('deal07Leg1Id', dealIDs.deal07Leg1Id);
    sharedStore.setValueToStore('deal07Leg2Id', dealIDs.deal07Leg2Id);
    popUpNavModel.closePopUpMessage();
  }

  /* FWD Deal creation */
  deal08Id() {
    const currencyMap = api.getCurrencyMap(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_Q, fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_A, 'FWD');
    api.setClientInfo('FWD');
    // VolMatch is true
    const dealSettingMap = api.getFWDDealSettingsMap(false, false, false, false, false, '', '');
    const dateMap = api.getFWDTermDates(currencyMap.get('instrumentId'), '0D', fwdInstrument.TENOR_E);
    let partyMap = api.getBuyerPartyMap(fwdUsers.CLIENT_A.Client, fwdUsers.TRADER_A_DETAIL.TraderName, fwdUsers.DESK_C, fwdUsers.BROKER_J, '');
    partyMap = api.getSellerPartyMap(partyMap, fwdUsers.CLIENT_B.Client, fwdUsers.TRADER_B_DETAIL.TraderName, fwdUsers.DESK_C, fwdUsers.BROKER_D.Name, '');

    const dealId = api.createForwardDeal('forward', 'FWD', '0D', fwdInstrument.TENOR_E, 7.80055, 7.80645, 59, 20000000, 20000000, fwdInstrument.VENUE_B, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal08Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal08Id', dealIDs.deal08Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal08Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.PICKED_UP);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.CONFIRM);
      log.log(`STP Chain IDs for ${dealIDs.deal08Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  deal09Id() {
    beforeEach();
    moveToFWD();
    strategy.clickRdoStrategyForward();
    dealModel.selectExecutionVenue(fwdInstrument.VENUE_J);
    settingsModel.ratesFeedOff();
    settingsModel.toggleLRModeOn();
    fwdDealModel.placeForwardOrderDetails(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_R, '', fwdInstrument.TENOR_U, '7.80055', '-0.6753', '20', '', '30');
    // L
    dealModel.selectSellerTrader(fwdUsers.CLIENT_C.Client, fwdUsers.TRADER_C);
    // R
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_A.Client, fwdUsers.TRADER_A);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    sharedStore.setValueToStore('deal09ValueDate', dealDate.getValueDate2());
    sharedStore.setValueToStore('deal09Points', point.getPoints());
    sharedStore.setValueToStore('deal09Amount', dealModel.getAmount2());

    dealModel.clickSubmitBtn();
    dealIDs.deal09Id = e2e.getDealId();
    log.log(`deal09 ID : ${dealIDs.deal09Id}`);
    sharedStore.setValueToStore('deal09Id', dealIDs.deal09Id);
    popUpNavModel.closePopUpMessage();
  }

  deal10Id() {
    const currencyMap = api.getCurrencyMap(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_A, 'FWD');
    api.setClientInfo('FWD');
    // VolMatch is true
    const dealSettingMap = api.getFWDDealSettingsMap(true, false, false, false, false, '', '');
    const dateMap = api.getFWDTermDates(currencyMap.get('instrumentId'), fwdInstrument.TENOR_E, fwdInstrument.TENOR_E1);
    let partyMap = api.getBuyerPartyMap(fwdUsers.CLIENT_A.Client, fwdUsers.TRADER_A_DETAIL.TraderName, fwdUsers.DESK_C, fwdUsers.BROKER_J, '');
    partyMap = api.getSellerPartyMap(partyMap, fwdUsers.CLIENT_E.Client, fwdUsers.TRADER_E_DETAIL.TraderName, fwdUsers.DESK_C, fwdUsers.BROKER_D.Name, '');

    const dealId = api.createForwardDeal('forward', 'FWD', fwdInstrument.TENOR_E, fwdInstrument.TENOR_E1, 7.0186993, 7.01870004, 0.007367, 12000000, 12000000, fwdInstrument.VENUE_B, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal10Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal10Id', dealIDs.deal10Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal10Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.DELIVERED);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.WITHDRAWN);
      log.log(`STP Chain IDs for ${dealIDs.deal10Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  deal11Id() {
    beforeEach();
    moveToFWD();
    strategy.clickRdoStrategyFwdForward();
    dealModel.selectExecutionVenue(fwdInstrument.VENUE_B);
    settingsModel.ratesFeedOff();
    settingsModel.toggleLRModeOff();
    dealModel.selectTurnTrade();
    fwdDealModel.placeFwdForwardOrderDetails(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_R, '', fwdInstrument.TENOR_E, '7.0186993', '0.007367', '12', fwdInstrument.TENOR_E1, '', '12');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    sharedStore.setValueToStore('deal11Points', point.getPoints());
    sharedStore.setValueToStore('deal11ValueDate', dealDate.getValueDate2());
    sharedStore.setValueToStore('deal11Amount', dealModel.getAmount2());

    dealModel.clickSubmitBtn();
    dealIDs.deal11Id = e2e.getDealId();
    log.log(`deal11 ID : ${dealIDs.deal11Id}`);
    sharedStore.setValueToStore('deal11Id', dealIDs.deal11Id);
    popUpNavModel.closePopUpMessage();
  }

  deal12Id() {
    beforeEach();
    moveToFWD();
    strategy.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(fwdInstrument.VENUE_B);
    settingsModel.ratesFeedOff();
    fwdDealModel.placeOutrightOrder(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, '', fwdInstrument.TENOR_O, '7.016007', '15');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    sharedStore.setValueToStore('deal12ValueDate', dealDate.getValueDate());
    dealModel.clickSubmitBtn();
    dealIDs.deal12Id = e2e.getDealId();
    log.log(`deal12 ID : ${dealIDs.deal12Id}`);
    sharedStore.setValueToStore('deal12Id', dealIDs.deal12Id);
    popUpNavModel.closePopUpMessage();
  }

  deal13Id() {
    const currencyMap = api.getCurrencyMap(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_A, 'FWD');
    api.setClientInfo('FWD');
    // VolMatch is true
    const dealSettingMap = api.getFWDOutrightDealSettingsMap(false, false, false, false, '', '');
    const dateMap = api.getFWDOutrightTermDates(currencyMap.get('instrumentId'), fwdInstrument.TENOR_E);
    let partyMap = api.getBuyerPartyMap(fwdUsers.CLIENT_A.Client, fwdUsers.TRADER_A_DETAIL.TraderName, fwdUsers.DESK_C, fwdUsers.BROKER_J, '');
    partyMap = api.getSellerPartyMap(partyMap, fwdUsers.CLIENT_B.Client, '', fwdUsers.DESK_C, fwdUsers.BROKER_D.Name, fwdUsers.AGENT_A);

    const dealId = api.createForwardOutrightDeal('outright', 'FWD', fwdInstrument.TENOR_E, 7.0041, 10000000, fwdInstrument.VENUE_B, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal13Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal13Id', dealIDs.deal13Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal13Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.CANCELLED);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.AFFIRMED);
      log.log(`STP Chain IDs for ${dealIDs.deal13Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  /* Spot deal creation */
  deal14Id() {
    beforeEach();
    moveToSPT();
    sptDealModel.placeSptOrder(sptInstrument.CURRENCY_A, sptInstrument.CURRENCY_Q, sptInstrument.CURRENCY_A, '0.1', '0.15');
    dealModel.selectExecutionVenue(sptInstrument.VENUE_B);
    dealModel.selectBuyerTrader(sptUsers.CLIENT_G.Client, sptUsers.TRADER_G);
    dealModel.selectBuyerBrokerName(sptUsers.DESK_C, sptUsers.BROKER_J);
    dealModel.selectSellerTrader(sptUsers.CLIENT_H.Client, sptUsers.TRADER_H);
    dealModel.selectSellerBrokerName(sptUsers.DESK_C, sptUsers.BROKER_D.Name);
    sharedStore.setValueToStore('deal14ValueDate', dealDate.getValueDate());
    sptDealModel.clickSubmitBtn();
    dealIDs.deal14Id = e2e.getDealId();
    log.log(`deal14 ID : ${dealIDs.deal14Id}`);
    sharedStore.setValueToStore('deal14Id', dealIDs.deal14Id);
    popUpNavModel.closePopUpMessage();
  }

  deal15Id() {
    const currencyMap = api.getCurrencyMap(sptInstrument.CURRENCY_A, sptInstrument.CURRENCY_Q, sptInstrument.CURRENCY_A, sptInstrument.CURRENCY_A, 'SPT');
    api.setClientInfo('SPT');

    const dealSettingMap = api.getSPTDealSettingsMap(false, false, false, '', '');
    const dateMap = api.getSPTTermDates(currencyMap.get('instrumentId'));
    let partyMap = api.getBuyerPartyMap(sptUsers.CLIENT_G.Client, '', sptUsers.DESK_C, sptUsers.BROKER_J, users.AGENT_A);
    partyMap = api.getSellerPartyMap(partyMap, sptUsers.CLIENT_B.Client, '', sptUsers.DESK_C, sptUsers.BROKER_D.Name, users.AGENT_B);
    const dealId = api.createSptDeal('spot', 'SPT', 0.1, 150000, sptInstrument.VENUE_B, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal15Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal15Id', dealIDs.deal15Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal15Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.TMM_SENT);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.TMM_SENDFAILURE);
      log.log(`STP Chain IDs for ${dealIDs.deal15Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  deal16Id() {
    const currencyMap = api.getCurrencyMap(sptInstrument.CURRENCY_A, sptInstrument.CURRENCY_Q, sptInstrument.CURRENCY_A, sptInstrument.CURRENCY_A, 'SPT');

    const dealSettingMap = api.getSPTDealSettingsMap(false, false, false, '', '');
    const dateMap = api.getSPTTermDates(currencyMap.get('instrumentId'));
    let partyMap = api.getBuyerPartyMap(sptUsers.CLIENT_G.Client, sptUsers.TRADER_G_DETAIL.TraderName, sptUsers.DESK_C, sptUsers.BROKER_J, '');
    partyMap = api.getSellerPartyMap(partyMap, sptUsers.CLIENT_H.Client, sptUsers.TRADER_H_DETAIL.TraderName, sptUsers.DESK_C, sptUsers.BROKER_D.Name, '');

    const dealId = api.createSptDeal('spot', 'SPT', 0.1, 150000, sptInstrument.VENUE_B, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal16Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal16Id', dealIDs.deal16Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
    if (Constants.ENV === 'LOCAL') {
      const stpStrategyIds = api.dealServiceGetStrategyIds(cookie, dealIDs.deal16Id);
      const payerStrategyId = stpStrategyIds.payerStrategyId;
      const receiverStrategyId = stpStrategyIds.receiverStrategyId;
      const payerStpChainId = api.setStpStatus(cookie, dealId[0].dealId, payerStrategyId, BlotterData.REJECT);
      const receiverStpChainId = api.setStpStatus(cookie, dealId[0].dealId, receiverStrategyId, BlotterData.PENDING);
      sharedStore.setValueToStore('deal16PayerStpDetails', `${dealId[0].dealId}@@${payerStrategyId}||${payerStpChainId}`);
      sharedStore.setValueToStore('deal16ReceiverStpDetails', `${dealId[0].dealId}@@${receiverStrategyId}||${receiverStpChainId}`);
      log.log(`STP Chain IDs for ${dealIDs.deal16Id} are Payer: ${payerStpChainId} Receiver: ${receiverStpChainId}`);
    }
  }

  /* Backdate deal creation */
  // Minus 1 year in the past
  deal17Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();

    const backDateDay = date.subtractDateFromToday(date.calculateDaysIfLeapYear(365)).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal17IdTradeDate', backDateDay);

    const backDateTime = '10:36:01 AM';
    dealModel.inputBackDateTime(backDateTime);
    sharedStore.setValueToStore('deal17IdTradeTime', backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal17Id = e2e.getDealId();
    log.log(`deal17 ID : ${dealIDs.deal17Id}`);
    sharedStore.setValueToStore('deal17Id', dealIDs.deal17Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 364 days in the past
  deal18Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_B);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();

    const backDateDay = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal18IdTradeDate', backDateDay);

    const backDateTime = '10:36:02';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.selectSellerBrokerName(users.DESK_D, users.BROKER_C.Name);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal18Id = e2e.getDealId();
    log.log(`deal18 ID : ${dealIDs.deal18Id}`);
    sharedStore.setValueToStore('deal18Id', dealIDs.deal18Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 1 year + 1 day in the past
  deal19Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();

    const backDateDay = date.subtractDateFromToday(date.calculateDaysIfLeapYear(366)).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal19IdTradeDate', backDateDay);

    const backDateTime = '10:36:03';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal19Id = e2e.getDealId();
    log.log(`deal19 ID : ${dealIDs.deal19Id}`);
    sharedStore.setValueToStore('deal19Id', dealIDs.deal19Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 1 year + 3 days in the past
  deal20Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();

    const backDateDay = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal20IdTradeDate', backDateDay);

    const backDateTime = '10:36:04';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal20Id = e2e.getDealId();
    log.log(`deal20 ID : ${dealIDs.deal20Id}`);
    sharedStore.setValueToStore('deal20Id', dealIDs.deal20Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 1 day in the past
  deal21Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    const backDateDay = date.subtractDateFromToday(1).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal21IdTradeDate', backDateDay);

    const backDateTime = '10:36:05';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_K.Client, users.TRADER_L);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal21Id = e2e.getDealId();
    log.log(`deal21 ID : ${dealIDs.deal21Id}`);
    sharedStore.setValueToStore('deal21Id', dealIDs.deal21Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 2 days in the past
  deal22Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    const backDateDay = date.subtractDateFromToday(2).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal22IdTradeDate', backDateDay);

    const backDateTime = '10:36:06';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal22Id = e2e.getDealId();
    log.log(`deal22 ID : ${dealIDs.deal22Id}`);
    sharedStore.setValueToStore('deal22Id', dealIDs.deal22Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 1 week in the past
  deal23Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    const backDateDay = date.subtractDateFromToday(7).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal23IdTradeDate', backDateDay);

    const backDateTime = '10:36:07';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal22Id = e2e.getDealId();
    log.log(`deal23 ID : ${dealIDs.deal23Id}`);
    sharedStore.setValueToStore('deal23Id', dealIDs.deal23Id);
    popUpNavModel.closePopUpMessage();
  }

  // Minus 1 week in the past
  deal24Id() {
    beforeEach();
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectVolMatch();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    settingsModel.ratesFeedOff();
    dealModel.selectBackDate();
    const backDateDay = date.subtractDateFromToday(7).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    sharedStore.setValueToStore('deal24IdTradeDate', backDateDay);

    const backDateTime = '10:36:08';
    dealModel.inputBackDateTime(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateAccept();
    dealIDs.deal22Id = e2e.getDealId();
    log.log(`deal24 ID : ${dealIDs.deal24Id}`);
    sharedStore.setValueToStore('deal24Id', dealIDs.deal24Id);
    popUpNavModel.closePopUpMessage();
  }

  deal25Id() {
    const currencyMap = api.getCurrencyMap(instrument.CURRENCY_A, instrument.CURRENCY_C, instrument.CURRENCY_A, instrument.CURRENCY_A, 'NDF');
    api.setClientInfo('NDF');
    const dealSettingMap = api.getDealSettingsMap(false, false, false, '', '');

    const dateMap = api.getTermDates(currencyMap.get('instrumentId'), instrument.TENOR_C, 'NDF', 'OUTRIGHT');
    let partyMap = api.getBuyerPartyMap(users.CLIENT_A.Client, users.TRADER_A_DETAIL.TraderName, users.DESK_C, users.BROKER_J, users.AGENT_A);
    partyMap = api.getSellerPartyMap(partyMap, users.CLIENT_B.Client, users.TRADER_B_DETAIL.TraderName, users.DESK_C, users.BROKER_D.Name, '');

    const dealId = api.createOutrightDeal('NDF', instrument.TENOR_C, 6.2945, 1000000, instrument.VENUE_J, currencyMap, dateMap, partyMap, dealSettingMap);
    dealIDs.deal25Id = dealId[0].dmsDealReference;
    sharedStore.setValueToStore('deal25Id', dealIDs.deal25Id);
    log.log(`Next is the deal. ${dealId[0].dmsDealReference}`);
  }

  deal26Id() {
    beforeEach();
    loginModel.changeUser(users.USER_J.UserName, users.USER_J.PassWord);
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_A);
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_G, users.BROKER_O);
    dealModel.selectSellerBrokerName(users.DESK_G, users.BROKER_P);
    dealModel.clickSubmitBtn();
    dealIDs.deal26Id = e2e.getDealId();
    log.log(`deal26 ID : ${dealIDs.deal26Id}`);
    sharedStore.setValueToStore('deal26Id', dealIDs.deal26Id);
    popUpNavModel.closePopUpMessage();
    loginModel.changeUser(users.USER_A.UserName, users.USER_A.PassWord);
  }

  printAllDeals() {
    log.errorLog(`Create Blotter deal_01 : Deal ID            : ${dealIDs.deal01Id}`);
    log.errorLog(`Create Blotter deal_02 : Deal ID Leg 1      : ${dealIDs.deal02Leg1Id}`);
    log.errorLog(`Create Blotter deal_02 : Deal ID Leg 2      : ${dealIDs.deal02Leg2Id}`);
    log.errorLog(`Create Blotter deal_03 : Deal ID            : ${dealIDs.deal03Id}`);
    log.errorLog(`Create Blotter deal_04 : Deal ID            : ${dealIDs.deal04Id}`);
    log.errorLog(`Create Blotter deal_05 : Deal ID            : ${dealIDs.deal05Id}`);
    log.errorLog(`Create Blotter deal_06 : Deal ID            : ${dealIDs.deal06Id}`);
    log.errorLog(`Create Blotter deal_07 : Deal ID Leg 1      : ${dealIDs.deal07Leg1Id}`);
    log.errorLog(`Create Blotter deal_07 : Deal ID Leg 2      : ${dealIDs.deal07Leg2Id}`);
    log.errorLog(`Create Blotter deal_08 : Deal ID            : ${dealIDs.deal08Id}`);
    log.errorLog(`Create Blotter deal_09 : Deal ID            : ${dealIDs.deal09Id}`);
    log.errorLog(`Create Blotter deal_10 : Deal ID            : ${dealIDs.deal10Id}`);
    log.errorLog(`Create Blotter deal_11 : Deal ID            : ${dealIDs.deal11Id}`);
    log.errorLog(`Create Blotter deal_12 : Deal ID            : ${dealIDs.deal12Id}`);
    log.errorLog(`Create Blotter deal_13 : Deal ID            : ${dealIDs.deal13Id}`);
    log.errorLog(`Create Blotter deal_14 : Deal ID            : ${dealIDs.deal14Id}`);
    log.errorLog(`Create Blotter deal_15 : Deal ID            : ${dealIDs.deal15Id}`);
    log.errorLog(`Create Blotter deal_16 : Deal ID            : ${dealIDs.deal16Id}`);
    log.errorLog(`Create Blotter deal_17 : Deal ID            : ${dealIDs.deal17Id}`);
    log.errorLog(`Create Blotter deal_18 : Deal ID            : ${dealIDs.deal18Id}`);
    log.errorLog(`Create Blotter deal_19 : Deal ID            : ${dealIDs.deal19Id}`);
    log.errorLog(`Create Blotter deal_20 : Deal ID            : ${dealIDs.deal20Id}`);
    log.errorLog(`Create Blotter deal_21 : Deal ID            : ${dealIDs.deal21Id}`);
    log.errorLog(`Create Blotter deal_22 : Deal ID            : ${dealIDs.deal22Id}`);
    log.errorLog(`Create Blotter deal_23 : Deal ID            : ${dealIDs.deal23Id}`);
    log.errorLog(`Create Blotter deal_24 : Deal ID            : ${dealIDs.deal24Id}`);
    log.errorLog(`Create Blotter deal_25 : Deal ID            : ${dealIDs.deal25Id}`);
    log.errorLog(`Create Blotter deal_26 : Deal ID            : ${dealIDs.deal26Id}`);
    log.errorLog(`Create Blotter deal17IdTradeTime            : ${sharedStore.getValueFromStore('deal17IdTradeTime')}`);
    log.errorLog(`Create Blotter deal17IdTradeDate            : ${sharedStore.getValueFromStore('deal17IdTradeDate')}`);
    log.errorLog(`Create Blotter deal18IdTradeDate            : ${sharedStore.getValueFromStore('deal18IdTradeDate')}`);
    log.errorLog(`Create Blotter deal19IdTradeDate            : ${sharedStore.getValueFromStore('deal19IdTradeDate')}`);
    log.errorLog(`Create Blotter deal20IdTradeDate            : ${sharedStore.getValueFromStore('deal20IdTradeDate')}`);
    log.errorLog(`Create Blotter deal21IdTradeDate            : ${sharedStore.getValueFromStore('deal21IdTradeDate')}`);
    log.errorLog(`Create Blotter deal22IdTradeDate            : ${sharedStore.getValueFromStore('deal22IdTradeDate')}`);
    log.errorLog(`Create Blotter deal23IdTradeDate            : ${sharedStore.getValueFromStore('deal23IdTradeDate')}`);
    log.errorLog(`Create Blotter deal24IdTradeDate            : ${sharedStore.getValueFromStore('deal24IdTradeDate')}`);
    log.errorLog(`Create Blotter deal01ValueDate              : ${sharedStore.getValueFromStore('deal01ValueDate')}`);
    log.errorLog(`Create Blotter deal09ValueDate              : ${sharedStore.getValueFromStore('deal09ValueDate')}`);
    log.errorLog(`Create Blotter deal11ValueDate              : ${sharedStore.getValueFromStore('deal11ValueDate')}`);
    log.errorLog(`Create Blotter deal12ValueDate              : ${sharedStore.getValueFromStore('deal12ValueDate')}`);
    log.errorLog(`Create Blotter deal14ValueDate              : ${sharedStore.getValueFromStore('deal14ValueDate')}`);
    log.errorLog(`Create Blotter deal01Amount                 : ${sharedStore.getValueFromStore('deal01Amount')}`);
    log.errorLog(`Create Blotter deal09Points                 : ${sharedStore.getValueFromStore('deal09Points')}`);
    log.errorLog(`Create Blotter deal11Points                 : ${sharedStore.getValueFromStore('deal11Points')}`);
    log.errorLog(`Create Blotter deal09Amount                 : ${sharedStore.getValueFromStore('deal09Amount')}`);
    log.errorLog(`Create Blotter deal11Amount                 : ${sharedStore.getValueFromStore('deal11Amount')}`);
    log.errorLog(`Create Blotter deal04IdBuyerBrokerage       : ${sharedStore.getValueFromStore('deal04IdBuyerBrokerage')}`);
    log.errorLog(`Create Blotter deal04IdSellerBrokerage      : ${sharedStore.getValueFromStore('deal04IdSellerBrokerage')}`);
    log.errorLog(`Create Blotter deal16PayerStpDetails        : ${sharedStore.getValueFromStore('deal16PayerStpDetails')}`);
    log.errorLog(`Create Blotter deal16ReceiverStpDetails     : ${sharedStore.getValueFromStore('deal16ReceiverStpDetails')}`);
  }
}
module.exports = BlotterDealCreation;
