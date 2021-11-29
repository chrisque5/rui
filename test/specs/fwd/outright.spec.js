/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/fwd/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const SettingsModel = require('../../models/SettingsModel.js');

const StrategyModel = require('../../models/fwd/StrategyModel.js');
const VenueModel = require('../../models/fwd/VenueModel.js');
const CurrencyModel = require('../../models/fwd/CurrencyModel.js');
const TermModel = require('../../models/fwd/TermModel.js');
const PriceModel = require('../../models/fwd/PriceModel.js');
const AmountModel = require('../../models/fwd/AmountModel.js');
const DealDateModel = require('../../models/fwd/DateModel.js');
const BackDateModel = require('../../models/fwd/BackDateModel.js');
const AgentModel = require('../../models/fwd/AgentModel');
const BrokerModel = require('../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../models/fwd/ClientTraderModel.js');

const Logs = require('../../core/utility/Logs.js');
const LocalUsers = require('../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../data/qa/fwd/UserDetails.js');
const QaInstrument = require('../../data/qa/fwd/InstrumentDetails.js');
const DevUsers = require('../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../data/fwd/dev/InstrumentDetails.js');
const DateModel = require('../../models/DateModel.js');
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
const login = new LoginModel();
const popUpNav = new PopUpNavigationModel();
const settings = new SettingsModel();

const strategy = new StrategyModel();
const venue = new VenueModel();
const currency = new CurrencyModel();
const term = new TermModel();
const price = new PriceModel();
const amount = new AmountModel();
const dealDate = new DealDateModel();
const backDate = new BackDateModel();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();

const log = new Logs();
const date = new DateModel();
let dateFormat = '';

function moveToFWD() {
  login.openUrl(Constants.FWDURL);
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(login.verifyFWDselected()).to.be.equal(true);
}

before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_E.UserName, users.USER_E.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

afterEach(() => {
  if (login.getDdlUserDropdownText() !== users.USER_E.FullName) {
    login.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
  }
});

describe('FWD Outright: Permissions tests', () => {
  it('C13064 Log in as belfasttpeur1 and verify user has full access', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    settings.ratesFeedOff();
    strategy.clickRdoStrategyOutright();
    clientTrader.isPageLoadComplete();
    settings.toggleExecutionVenueColourOn();
    deal.selectVolMatch();
    expect(true).to.equal(deal.isVolMatchSelected());

    venue.clickExecutionVenue();
    // expect(venue.isExecutionVenueVisible('TPSEF')).to.be.equal(true);
    expect(venue.isExecutionVenueVisible('XOFF')).to.be.equal(true);
    expect(venue.isExecutionVenueVisible('TPSD')).to.be.equal(true);
    venue.clickExecutionVenue();
    venue.selectExecutionVenue('XOFF');

    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_K, '1.5', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(deal.verifySubmitBtnState(`SUBMIT ${eval('instrument.VENUE_B')}`, `${eval(`Constants.${instrument.VENUE_B}.Colour`)}`)).to.equal(true);
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C13065 Submit deal with same counter party with same trader', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    settings.ratesFeedOff();
    strategy.clickRdoStrategyOutright();
    clientTrader.isPageLoadComplete();
    settings.toggleExecutionVenueColourOff();

    venue.selectExecutionVenue('XOFF');
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_K, '1.5', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_J);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(deal.verifySubmitBtnState('SUBMIT', Constants.DEFAULT.Colour)).to.equal(true);
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C13066 Log in as belfasttpeur2 and verify users deal submit, exec venue permissions and same counter party with different trader.', () => {
    login.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    login.selectFWD();
    // try/catch in case person running test suite has incorrect permissions setup
    try {
      expect(login.getDdlUserDropdownText()).to.equal(users.USER_B.FullName);
    } catch (err) {
      log.log('Check user permissions setup. Belfast user 2 should have entry and submit permissions');
      login.openUrl('/DMSWeb');
      login.login('belfasttpeur1', 'p');
      expect('Permissions').to.equal('correct');
    }
    settings.ratesFeedOn();
    strategy.clickRdoStrategyOutright();

    venue.clickExecutionVenue();

    expect(venue.isExecutionVenueVisible('TPSEF')).to.be.equal(false);
    expect(venue.isExecutionVenueVisible('XOFF')).to.be.equal(true);
    expect(venue.isExecutionVenueVisible('TPSD')).to.be.equal(true);
    venue.clickExecutionVenue();
    venue.selectExecutionVenue('TPSD');

    // disabled after setting up the base currency in local
    // dealModel.selectBaseCurrency(instrument.CURRENCY_O);
    // expect(true).to.equal(dealModel.isCurrency2Focused());
    // expect(dealModel.getCurrency()).to.equal('');

    deal.placeOutrightOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_S, instrument.TENOR_F, '2.5');

    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    expect(instrument.CURRENCY_S).to.equal(currency.getDealtCurrency());
    expect(instrument.CURRENCY_S).to.equal(currency.getCurrency());
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(50000);

  (ENV === 'QA' ? it.skip : it)('C13067 Log in as belfasttpeur3 and verify users deal submit permissions (none)', () => {
    login.changeUser(users.USER_C.UserName, users.USER_C.PassWord);
    login.selectFWD();
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_C.FullName);

    settings.ratesFeedOff();
    strategy.clickRdoStrategyOutright();

    venue.selectExecutionVenue('XOFF');
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_J, '1.00', '1.1');
    clientTrader.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    clientTrader.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_F.Client} ${users.CLIENT_F.Location} / ${users.TRADER_F}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpDescription()).to.include('Permissions : Submit deal disabled in production environment.');
  }).timeout(300000);
});

describe('FWD Outright: Submit Basic FWD Outright Deal', () => {
  it('C13069 Enter values for trade and submit', () => {
    login.selectFWD();
    settings.ratesFeedOn();
    settings.toggleClsDefaultsOn();

    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    const spotDate = dealDate.getValueDate();
    const dayCount = dealDate.getDayCount();

    term.inputTerm(instrument.TENOR_K);
    currency.selectCurrency(instrument.CURRENCY_Q);
    // confirm no error message when tenor entered before currency
    expect(popUpNav.verifyNoPopUpMessage()).to.be.equal(true);

    amount.inputAmount(0.1);

    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(strategy.isOutRightSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal('XOFF');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    expect(term.getTerm()).to.equal(instrument.TENOR_K);
    expect(amount.getAmount()).to.equal('100,000');
    expect(dealDate.getValueDate()).to.not.equal(spotDate);
    expect(dealDate.getDayCount()).to.not.equal(dayCount);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    deal.clickSwapBtn();

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);

    deal.clickSubmitBtn();

    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();

    // following are not affected by reset button
    const currency1 = currency.getMainCurrency();
    const currency2 = currency.getCurrency();
    const currency3 = currency.getDealtCurrency();
    const execVenue = venue.getExecutionVenue();

    deal.clickResetBtn();

    expect(strategy.isOutRightSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal(execVenue);
    expect(currency.getMainCurrency()).to.equal(currency1);
    expect(currency.getCurrency()).to.equal(currency2);
    expect(currency.getDealtCurrency()).to.equal(currency3);
    expect(term.getTerm()).to.equal('');
    expect(price.getPrice()).to.equal('');
    expect(amount.getAmount()).to.equal('');
    expect(dealDate.getValueDate()).to.equal(spotDate);

    expect(dealDate.getDayCount()).to.equal('0');
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal('');
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal('');
    expect(broker.getBuyerBrokerName()).to.be.equal('');
    expect(broker.getSellerBrokerName()).to.be.equal('');
    expect(agent.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(agent.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(300000);
});
describe('FWD Outright: Submit Outright deals with Agent Fields', () => {
  it('C13070 Outright Deal error on trader selection with Buyer Agent Field.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_H, '1.5', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    // agent.inputBuyerAgentByKeys(users.AGENT_A);
    expect(false).to.be.equal(agent.isBuyerAgentEnabled());

    deal.clickSubmitBtn();
    expect('Deal created').to.be.equal(popUpNav.getPopUpMessage());
  }).timeout(30000);

  it('C13071 Submit Outright Deal With Buyer Agent Field.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOn();
    deal.placeOutrightOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_H, '0.1');

    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.inputBuyerAgentByKeys(users.AGENT_A);
    // dealModel.verifyCasCadClose();
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(agent.getBuyerAgentLbl());
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C13072 Submit Outright Deal With Seller Agent Field.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, instrument.CURRENCY_S, instrument.TENOR_H, '1.5', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectSellerAgent(users.AGENT_A);

    expect(instrument.CURRENCY_S).to.equal(currency.getDealtCurrency());
    expect(instrument.CURRENCY_S).to.equal(currency.getCurrency());
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(agent.getSellerAgentLbl());
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C13073 Submit Outright Deal With Buyer and Seller Agent Fields.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_H, '1.5', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectBuyerAgent(users.AGENT_A);
    agent.selectSellerAgent(users.AGENT_C);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(agent.getBuyerAgentLbl());
    expect(users.AGENT_C).to.be.equal(agent.getSellerAgentLbl());
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);
});

describe('FWD Outright: Back dated FWD Outright trades tests', () => {
  it('C13296 User can submit a FWD outright using a date in the past', () => {
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    backDate.selectBackDate();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);

    const backDateDay = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    backDate.inputBackDate(backDateDay);
    expect(backDate.getBackDateValue()).to.equal(date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat));

    const backDateTime = '10:36:01';
    backDate.inputBackDateTime(backDateTime);
    expect(backDate.getBackDateTimeValue()).to.equal(backDateTime);

    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, '', instrument.TENOR_H, '1.5', '0.1');

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

    backDateFormatted = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format('Do MMMM YYYY');
    expect(backDate.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    backDate.backDateAccept();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  });
});
