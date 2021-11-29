/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const moment = require('moment');
const Logs = require('../../core/utility/Logs.js');
const API = require('../../models/blotter/BlotterApiModel');
const LocalUsers = require('../../data/UserDetails');
const LocalInstrument = require('../../data/InstrumentDetails.js');
const QaUsers = require('../../data/qa/UserDetails.js');
const QaInstrument = require('../../data/qa/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');

const api = new API();
const log = new Logs();
let cookie = '';
let venues = '';
let clients ='';
let brokers = '';

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

before(() => {
  cookie = api.setCookie(users.USER_A.UserName, users.USER_A.PassWord);
  log.log(`Cookie value is : ${cookie}`);
});

describe('Spec file for testing API - Not actually ran in testing UI', () => {
  it('CTEST1 Verify creating an NDF deal and logging out values from the response', () => {
    const dealSettingMap = api.getDealSettingsMap(false, false, false, '', '');
    const currencyMap = api.getCurrencyMap(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, instrument.CURRENCY_A, 'NDF');
    api.setClientInfo('NDF');

    const dateMap = api.getTermDates(currencyMap.get('instrumentId'), instrument.TENOR_F, 'NDF', 'OUTRIGHT');
    let partyMap = api.getBuyerPartyMap(users.CLIENT_P.Client, users.TRADER_P_DETAIL.TraderName, users.DESK_F, users.BROKER_L, '');
    partyMap = api.getSellerPartyMap(partyMap, users.CLIENT_Q.Client, users.TRADER_Q_DETAIL.TraderName, users.DESK_F, users.BROKER_L, '');

    const data = api.createOutrightDealWithBrokrage('NDF', instrument.TENOR_F, 6.976, 500000, 'TPSEF', currencyMap, dateMap, partyMap, dealSettingMap);

    log.log(`Next is the deal. ${JSON.stringify(data)}`);
    log.log(`Deal Id ${data.deals[0].dmsDealReference}`);
    log.log(`Deal chain Id ${data.deals[0].dmsDealReference}`);
    log.log(`Buyer Brokerage Amount ${data.brokerage[0].grossBrokerageCharge}`);
    log.log(`Buyer Brokerage Currency ${data.brokerage[0].currency}`);

    log.log(`Seller Brokerage Amount ${data.brokerage[1].grossBrokerageCharge}`);
    log.log(`Seller Brokerage Currency ${data.brokerage[1].currency}`);
  }).timeout(30000);

  it('CTEST2 Verify cancelling a deal and logging out success message from the response', () => {
    const dmsDealId = '405';
    const dealLockSequenceId = '0';
    const chainCancel = 'false';
    const cancelReason = 'Testing testing 1 2 3';
    const data = api.cancelDeal(dmsDealId, dealLockSequenceId, chainCancel, cancelReason);

    const returnMessage = JSON.stringify(data);
    log.log(`The return message is : ${returnMessage}`);
    expect(returnMessage).to.contain('cancellation SUCCESS');
  }).timeout(30000);
});
