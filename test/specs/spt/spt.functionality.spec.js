/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const SettingsModel = require('../../models/SettingsModel.js');
const Logs = require('../../core/utility/Logs.js');

const DealModel = require('../../models/spt/DealModel.js');
const CurrencyModel = require('../../models/spt/CurrencyModel.js');
const BrokerModel = require('../../models/spt/BrokerModel.js');
const AgentModel = require('../../models/spt/AgentModel.js');
const DateModel = require('../../models/spt/DateModel.js');
const ClientTraderModel = require('../../models/spt/ClientTraderModel.js');
const VenueModel = require('../../models/spt/VenueModel.js');
const PriceModel = require('../../models/spt/PriceModel.js');
const AmountModel = require('../../models/spt/AmountModel.js');
const BackDateModel = require('../../models/spt/BackDateModel.js');
const DateCalModel = require('../../models/DateModel.js');
const Cls = require('../../components/fwd/Cls.js');
const PointModel = require('../../models/spt/PointModel.js');
const LocalUsers = require('../../data/spt/UserDetails.js');
const LocalInstrument = require('../../data/spt/InstrumentDetails.js');
const QaUsers = require('../../data/qa/spt/UserDetails.js');
const QaInstrument = require('../../data/qa/spt/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');

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
  case 'DEV':
    users = DevUsers;
    instrument = DevInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

const deal = new DealModel();
const loginModel = new LoginModel();
const settings = new SettingsModel();
const log = new Logs();

const currency = new CurrencyModel();
const broker = new BrokerModel();
const agent = new AgentModel();
const cls = new Cls();
const clientTrader = new ClientTraderModel();
const point = new PointModel();
const amount = new AmountModel();

let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.SPTURL);
  loginModel.selectSPT();
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifySPTselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('Spot functionality: Functionality Tests', () => {
  it('C24190 Verify Buyer side agent field is reset on trader select', () => {
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectBuyerAgent(users.AGENT_A);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(agent.getBuyerAgentLbl()).to.be.equal(users.AGENT_A);

    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(agent.isBuyerAgentEnabled()).to.be.equal(false);
  });

  it('C24191 Verify Seller side agent field is reset on trader select', () => {
    clientTrader.selectBuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    clientTrader.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectSellerAgent(users.AGENT_A);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(agent.getSellerAgentLbl()).to.be.equal(users.AGENT_A);

    clientTrader.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(agent.isBuyerAgentEnabled()).to.be.equal(false);
  });

  it('C27022 Verify toggle CLS setting on and off checks/unchecks CLS boxes', () => {
    settings.toggleClsDefaultsOff();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);

    expect(cls.isCls1Selected()).to.equal(false);

    settings.toggleClsDefaultsOn();
    expect(cls.isCls1Selected()).to.equal(true);

    settings.toggleClsDefaultsOff();
    expect(cls.isCls1Selected()).to.equal(false);
  });

  it('C31606 Entering a range of invalid numeric values into Spt Amount field', () => {
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    [
      ['123,456,789,123', 'BEFORE_DP'],
      ['1234567.1234', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      amount.inputAmount(amountValue);
      if (dp === 'BEFORE_DP') {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
      } else {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
      }

      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });

  it('C31607 Entering a range of invalid numeric values into Spt Amount field when Dealt CCY = CCY2', () => {
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);
    currency.selectDealtCurrency(instrument.CURRENCY_Q);
    [
      ['123,456,789,1234', 'BEFORE_DP'],
      ['1234567.1234', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      amount.inputAmount(amountValue);
      if (dp === 'BEFORE_DP') {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
      } else {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
      }

      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });
});
