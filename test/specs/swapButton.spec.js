/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
// const moment = require('../../node_modules/moment/moment.js');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/UserDetails.js');
const LocalInstrument = require('../data/InstrumentDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const QaInstrument = require('../data/qa/InstrumentDetails.js');
const DateModel = require('../models/DateModel.js');
const Constants = require('../data/Constants.js');

let users = null;
let instrument = null;

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

const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const date = new DateModel();
const settingsModel = new SettingsModel();
let dateFormat = '';

function moveToNDF() {
  loginModel.openUrl(Constants.NDFURL);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
  dealModel.selectBaseCurrency('USD');
  dealModel.selectDealtCurrency('USD');
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToNDF();
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

// ************************************** Swap Button **************************************** //
describe('NDF Outright: Swap button tests', () => {
  it('C10668 Entering Buyer Side details only then clicking Swap', () => {
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_B, users.BROKER_B);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
  });

  it('C10669 Entering Seller Side details only then clicking Swap', () => {
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal('');

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
  });

  it('C10670 Entering Buyer Trader only then clicking Swap', () => {
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
  });

  it('C10671 Entering Buyer Broker only then clicking Swap', () => {
    dealModel.selectBuyerBrokerName(users.DESK_B, users.BROKER_B);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
  });

  it('C10672 Entering Seller Trader only then clicking Swap', () => {
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
  });

  it('C10673 Entering Seller Broker only then clicking Swap', () => {
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal('');

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
  });

  it('C10674 Entering Buyer and Seller Side details then clicking Swap', () => {
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
  });

  it('C10675 Entering Buyer and Seller Side details in spread then clicking 3 CPs button', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_B, users.BROKER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);

    dealModel.clickThreeCpChk();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);

    dealModel.clickSwapBtn2();

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
  });
});
