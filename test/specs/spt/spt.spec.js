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
const DateModel = require('../../models/spt/DateModel.js');
const ClientTraderModel = require('../../models/spt/ClientTraderModel.js');
const AgentModel = require('../../models/spt/AgentModel.js');
const VenueModel = require('../../models/spt/VenueModel.js');
const PriceModel = require('../../models/spt/PriceModel.js');
const AmountModel = require('../../models/spt/AmountModel.js');
const BackDateModel = require('../../models/spt/BackDateModel.js');
const DateCalModel = require('../../models/DateModel.js');
const Cls = require('../../components/fwd/Cls.js');
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
const popUpNav = new PopUpNavigationModel();
const settings = new SettingsModel();
const log = new Logs();

const currency = new CurrencyModel();
const broker = new BrokerModel();
const date = new DateModel();
const dateCal = new DateCalModel();
const cls = new Cls();
const clientTrader = new ClientTraderModel();
const agent = new AgentModel();
const venue = new VenueModel();
const price = new PriceModel();
const amount = new AmountModel();
const backDate = new BackDateModel();

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

afterEach(() => {
  if (loginModel.getDdlUserDropdownText() !== users.USER_A.FullName) {
    loginModel.changeUser(users.USER_A.UserName, users.USER_A.PassWord);
  }
});

describe('Spot Tests: Permissions tests', () => {
  it('C20703 Log in as belfasttpeur1 and verify user can view Spot tab', () => {
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    expect(loginModel.verifySptTabVisible()).to.equal(true);
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
  }).timeout(30000);

  (ENV === 'QA' ? it.skip : it)('C27135 Log in as belfasttpeur3 and verify user can view Spot tab but not submit a deal', () => {
    loginModel.changeUser(users.USER_C.UserName, users.USER_C.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_C.FullName);
    expect(loginModel.verifySptTabVisible()).to.equal(true);
    loginModel.selectSPT();
    settings.ratesFeedOff();
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_A, '6.757045', '15000000');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpDescription()).to.include('Permissions : Submit deal disabled in production environment.');
  }).timeout(30000);
});

describe('Spot Tests: Deal Page Component tests', () => {
  it('C20704 Verify user can view Currency Pair list', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    expect(currency.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
  }).timeout(30000);

  it('C20705 Verify user can view Broker list', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    broker.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
  }).timeout(30000);

  it('C20706 Verify datecalc field', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    expect(currency.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    const valueDate = date.getValueDate();
    date.inputValueDate(dateCal.getBusinessDateFromToday(10).format(dateFormat));
    expect(date.getValueDate()).to.not.equal(valueDate);
  }).timeout(30000);

  it('C20707 Verify user can view Client list', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    clientTrader.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
  }).timeout(30000);
});

describe('Spot Tests: Submit Basic SPT Deal', () => {
  it('C20708 Submit basic SPT deal', () => {
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    expect(loginModel.verifySptTabVisible()).to.equal(true);
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);

    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_A, '0.1', '0.15');

    expect(currency.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_R);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    expect(price.getPrice()).to.not.equal('');
    expect(amount.getAmount()).to.equal('150,000');
    expect(venue.getExecutionVenue()).to.not.equal('');
    // venue.selectExecutionVenue('XOFF');
    expect(venue.getExecutionVenue()).to.equal('XOFF');
    deal.selectVolMatch();
    expect(true).to.equal(deal.isVolMatchSelected());

    cls.selectCls1();
    expect(true).to.equal(cls.isCls1Selected());

    clientTrader.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);

    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  }).timeout(300000);
});

describe('Spot Tests: Back dated Spot trades tests', () => {
  it('C23961 User can submit a Spot Deal using a date in the past', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    settings.ratesFeedOn();
    backDate.selectBackDate();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Rate Error');
    popUpNav.closePopUpMessage();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);

    const backDateDay = dateCal.subtractBusinessDateFromToday(1, instrument.CURRENCY_Q, instrument.CURRENCY_A).format(dateFormat);
    backDate.inputBackDate(backDateDay);
    // eslint-disable-next-line max-len
    expect(backDate.getBackDateValue()).to.equal(dateCal.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_Q).format(dateFormat));

    const backDateTime = '10:36:01';
    backDate.inputBackDateTime(backDateTime);
    expect(backDate.getBackDateTimeValue()).to.equal(backDateTime);
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_A, '0.1', '0.15');
    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);

    backDate.backDateCancel();
    expect(backDate.isModalBackDateClose()).to.equal(true);

    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);

    backDateFormatted = dateCal.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format('Do MMMM YYYY');
    expect(backDate.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    backDate.backDateAccept();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  }).timeout(300000);

  it('C23962 Rate Field Blanks on change of Currency when Backdated is checked', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    settings.ratesFeedOn();
    backDate.selectBackDate();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Rate Error');
    popUpNav.closePopUpMessage();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    expect(currency.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_S);
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_S);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);

    expect(price.getPrice()).to.be.equal('');
  }).timeout(300000);

  it('C25710 Verify Reset button for SPT', () => {
    loginModel.selectSPT();
    settings.ratesFeedOff();

    // // Capture the values on the screen before the reset
    const execVenue = venue.getExecutionVenue();
    const initialValueDate = date.getValueDate();
    const initialDayCount = date.getDayCount();

    backDate.selectBackDate();
    const backDateDay = dateCal.subtractBusinessDateFromToday(1, instrument.CURRENCY_Q, instrument.CURRENCY_A).format(dateFormat);
    backDate.inputBackDate(backDateDay);
    deal.selectVolMatch();

    // Capture the values after backdated trade
    const newValueDate = date.getValueDate();
    const newDayCount = date.getDayCount();

    // Setting up the deal
    deal.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_A, '0.1', '0.15');
    clientTrader.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_A, users.BROKER_A);

    // Ensuring all the deal setup is correct
    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(deal.isVolMatchSelected()).to.equal(true);
    expect(currency.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    expect(price.getPrice()).to.equal('0.1');
    expect(amount.getAmount()).to.equal('150,000');
    expect(venue.getExecutionVenue()).to.equal('XOFF');
    expect(date.getDayCount()).to.equal(newDayCount);
    expect(date.getValueDate()).to.equal(newValueDate);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);

    deal.clickSubmitBtn();
    backDate.backDateAccept();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();

    deal.clickResetBtn();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(deal.isVolMatchSelected()).to.equal(false);
    expect(venue.getExecutionVenue()).to.equal(execVenue);
    expect(currency.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    expect(price.getPrice()).to.equal('');
    expect(amount.getAmount()).to.equal('');
    expect(date.getValueDate()).to.equal(initialValueDate);
    expect(date.getDayCount()).to.equal(initialDayCount);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal('');
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal('');
    expect(broker.getBuyerBrokerName()).to.be.equal('');
    expect(broker.getSellerBrokerName()).to.be.equal('');
    expect(agent.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(agent.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(300000);
});
