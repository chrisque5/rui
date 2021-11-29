/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/fwd/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');

const StrategyModel = require('../../models/fwd/StrategyModel.js');
const VenueModel = require('../../models/fwd/VenueModel.js');
const CurrencyModel = require('../../models/fwd/CurrencyModel.js');
const TermModel = require('../../models/fwd/TermModel.js');
const PriceModel = require('../../models/fwd/PriceModel.js');
const PointModel = require('../../models/fwd/PointModel.js');
const AmountModel = require('../../models/fwd/AmountModel.js');
const DealDateModel = require('../../models/fwd/DateModel.js');
const BackDateModel = require('../../models/fwd/BackDateModel.js');
const InterestModel = require('../../models/fwd/InterestModel.js');
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
const point = new PointModel();
const amount = new AmountModel();
const dealDate = new DealDateModel();
const backDate = new BackDateModel();
const interest = new InterestModel();
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
  login.login(users.USER_G.UserName, users.USER_G.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

// *******************************************Forward Forward********************************************* //
describe('FWD FWD tests: Submit Basic NDF Spread Deal', () => {
  it('C13020 Submit trade with rates Feed On and interest disabled.', () => {
    settings.ratesFeedOn();
    settings.toggleClsDefaultsOn();
    strategy.clickRdoStrategyFwdForward();
    clientTrader.isPageLoadComplete();
    deal.selectVolMatch();
    expect(true).to.equal(deal.isVolMatchSelected());

    // venue.selectExecutionVenue('TPSEF');
    // expect(venue.getExecutionVenue()).to.equal('TPSEF');

    venue.selectExecutionVenue('TPSD');
    expect(venue.getExecutionVenue()).to.equal('TPSD');

    const valueDate1 = dealDate.getValueDate();
    const valueDate2 = dealDate.getValueDate2();
    const dayCount1 = dealDate.getDayCount();
    const dayCount2 = dealDate.getDayCount2();

    deal.placeFwdForwardOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_Q, instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');

    clientTrader.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    // adding steps to check lower case term multiplier with tab key press
    term.inputTermWithTab(instrument.TENOR_F.toLowerCase());
    term.inputTerm2WithTab(instrument.TENOR_H.toLowerCase());

    expect(strategy.isFwdForwardSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal('TPSD');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(term.getTerm()).to.equal(instrument.TENOR_F);
    expect(price.getPrice()).to.not.equal('');
    expect(amount.getAmount()).to.equal('100,000');
    expect(term.getTerm2()).to.equal(instrument.TENOR_H);
    expect(price.getPrice2()).to.not.equal('');
    expect(amount.getAmount2()).to.equal('150,000');
    expect(point.getPoints()).to.not.equal('');
    if (price.getPrice() === price.getPrice2()) {
      expect(point.getPoints()).to.equal('0');
    } else {
      expect(point.getPoints()).to.not.equal('0');
    }

    expect(interest.isInterestChkBoxSelected()).to.equal(false);
    expect(interest.isInterestTxtBoxEnabled()).to.equal(false);

    expect(dealDate.getValueDate()).to.not.equal(valueDate1);
    expect(dealDate.getValueDate2()).to.not.equal(valueDate2);
    expect(dealDate.getDayCount()).to.not.equal(dayCount1);
    expect(dealDate.getDayCount2()).to.not.equal(dayCount2);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    deal.clickSwapBtn();

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
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

    expect(strategy.isFwdForwardSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal(execVenue);
    expect(currency.getMainCurrency()).to.equal(currency1);
    expect(currency.getCurrency()).to.equal(currency2);
    expect(currency.getDealtCurrency()).to.equal(currency3);
    expect(term.getTerm()).to.equal('');
    expect(term.getTerm2()).to.equal('');
    expect(price.getPrice()).to.equal('');
    expect(amount.getAmount()).to.equal('');
    expect(point.getPoints()).to.equal('');
    expect(price.getPrice2()).to.equal('');
    expect(amount.getAmount2()).to.equal('');
    expect(dealDate.getValueDate()).to.equal(valueDate1);
    expect(dealDate.getValueDate2()).to.equal(valueDate2);

    expect(dealDate.getDayCount()).to.equal('0');
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal('');
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal('');
    expect(broker.getBuyerBrokerName()).to.be.equal('');
    expect(broker.getSellerBrokerName()).to.be.equal('');
    expect(agent.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(agent.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(300000); // timeout extended for spread deal

  it('C13021 Submit trade with rates feed on and interest field enable', () => {
    settings.ratesFeedOn();
    strategy.clickRdoStrategyFwdForward();
    expect(venue.getExecutionVenue()).to.not.equal('');
    venue.selectExecutionVenue('XOFF');

    const valueDate = dealDate.getValueDate();
    const valueDate2 = dealDate.getValueDate2();
    // const dayCount1 = dealDate.getDayCount();
    const dayCount2 = dealDate.getDayCount2();

    deal.placeFwdForwardOrderWithRates(instrument.CURRENCY_P, instrument.CURRENCY_A, '', instrument.TENOR_C, '0.1', instrument.TENOR_D, '0.15');

    interest.selectInterestChkBox();
    interest.inputInterest('10');

    clientTrader.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(strategy.isFwdForwardSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal('XOFF');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_A);
    expect(term.getTerm()).to.equal(instrument.TENOR_C);
    expect(term.getTerm2()).to.equal(instrument.TENOR_D);

    expect(price.getPrice()).to.not.equal('');
    expect(amount.getAmount()).to.equal('100,000');
    expect(price.getPrice2()).to.not.equal('');

    expect(interest.isInterestChkBoxSelected()).to.equal(true);
    expect(interest.isInterestTxtBoxEnabled()).to.equal(true);
    // TPDMS-2222 for GBP(instrument.CURRENCY_P) in QA/local value should be 365 required.
    // eslint-disable-next-line radix
    let expAmount2 = interest.getAmountAfterInterest(parseInt(amount.getAmount().replace(',', '')), 10, parseInt(dealDate.getDayCount2()), 365);
    let actAmount2 = amount.getAmount2().replace(/,/g, '');
    expect(actAmount2).to.equal(expAmount2);
    expect(point.getPoints()).to.not.equal('');
    if (price.getPrice() === price.getPrice2()) {
      expect(point.getPoints()).to.equal('0');
    } else {
      expect(point.getPoints()).to.not.equal('0');
    }

    interest.inputInterest('15');
    expect(interest.isInterestChkBoxSelected()).to.equal(true);
    expect(interest.isInterestTxtBoxEnabled()).to.equal(true);

    // eslint-disable-next-line radix
    expAmount2 = interest.getAmountAfterInterest(parseInt(amount.getAmount().replace(',', '')), 15, parseInt(dealDate.getDayCount2()), 365);
    actAmount2 = amount.getAmount2().replace(/,/g, '');
    expect(actAmount2).to.equal(expAmount2);

    amount.inputAmount2('0.15');
    expect(amount.getAmount2()).to.equal('150,000');
    // eslint-disable-next-line radix
    const expInterest = interest.getAmountInterest(parseInt(amount.getAmount().replace(',', '')), parseInt(amount.getAmount2().replace(',', '')), parseInt(dealDate.getDayCount2()), 365);
    expect(parseFloat(expInterest).toFixed(3)).to.be.equal(interest.getInterestValue());

    expect(dealDate.getValueDate()).to.not.equal(valueDate);
    expect(dealDate.getValueDate2()).to.not.equal(valueDate2);
    // expect(dealDate.getDayCount()).to.not.equal(dayCount1);
    expect(dealDate.getDayCount2()).to.not.equal(dayCount2);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  }).timeout(300000);

  it('C13022 Submit trade with rates feed off and interest field enable and disabled', () => {
    settings.ratesFeedOff();
    strategy.clickRdoStrategyFwdForward();
    expect(venue.getExecutionVenue()).to.not.equal('');
    venue.selectExecutionVenue('XOFF');

    const valueDate = dealDate.getValueDate();
    const valueDate2 = dealDate.getValueDate2();
    // const dayCount1 = dealDate.getDayCount();
    const dayCount2 = dealDate.getDayCount2();

    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, instrument.CURRENCY_R, instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');
    interest.selectInterestChkBox();
    interest.inputInterest('10');

    clientTrader.selectBuyerTrader(users.CLIENT_G.Client, users.TRADER_G);
    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(strategy.isFwdForwardSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal('XOFF');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_R);
    expect(currency.getDealtCurrency()).to.equal(instrument.CURRENCY_R);
    expect(term.getTerm()).to.equal(instrument.TENOR_C);
    expect(term.getTerm2()).to.equal(instrument.TENOR_E);

    expect(price.getPrice()).to.equal('7');
    expect(amount.getAmount()).to.equal('100,000');
    expect(price.getPrice2()).to.equal('7.25');
    // eslint-disable-next-line radix
    const expAmount2 = interest.getAmountAfterInterest(parseInt(amount.getAmount().replace(',', '')), 10, parseInt(dealDate.getDayCount2()));
    const actAmount2 = amount.getAmount2().replace(/,/g, '');
    expect(actAmount2).to.equal(expAmount2);
    expect(point.getPoints()).to.not.equal('');

    amount.inputAmount2('0.15');
    expect(amount.getAmount2()).to.equal('150,000');
    expect(interest.isInterestChkBoxSelected()).to.equal(true);
    expect(interest.isInterestTxtBoxEnabled()).to.equal(true);
    // eslint-disable-next-line radix
    const expInterest = interest.getAmountInterest(parseInt(amount.getAmount().replace(',', '')), parseInt(amount.getAmount2().replace(',', '')), parseInt(dealDate.getDayCount2()), 360);
    expect(expInterest).to.be.equal(interest.getInterestValue());
    expect(dealDate.getValueDate()).to.not.equal(valueDate);
    expect(dealDate.getValueDate2()).to.not.equal(valueDate2);
    // expect(dealDate.getDayCount()).to.not.equal(dayCount1);
    expect(dealDate.getDayCount2()).to.not.equal(dayCount2);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_G.Client} ${users.CLIENT_G.Location} / ${users.TRADER_G}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  }).timeout(300000);

  it('C13023 Submit trade with rates feed off, interest field disabled and same counter party with different trader.', () => {
    settings.ratesFeedOff();
    strategy.clickRdoStrategyFwdForward();
    expect(venue.getExecutionVenue()).to.not.equal('');
    venue.selectExecutionVenue('XOFF');

    const valueDate = dealDate.getValueDate();
    const valueDate2 = dealDate.getValueDate2();
    // const dayCount1 = dealDate.getDayCount();
    const dayCount2 = dealDate.getDayCount2();

    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');

    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(strategy.isFwdForwardSelected()).to.equal('true');
    expect(venue.getExecutionVenue()).to.equal('XOFF');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(term.getTerm()).to.equal(instrument.TENOR_C);
    expect(term.getTerm2()).to.equal(instrument.TENOR_E);

    expect(price.getPrice()).to.equal('7');
    expect(amount.getAmount()).to.equal('100,000');
    expect(price.getPrice2()).to.equal('7.25');

    expect(amount.getAmount2()).to.equal('150,000');
    expect(point.getPoints()).to.not.equal('');

    expect(dealDate.getValueDate()).to.not.equal(valueDate);
    expect(dealDate.getValueDate2()).to.not.equal(valueDate2);
    // expect(dealDate.getDayCount()).to.not.equal(dayCount1);
    expect(dealDate.getDayCount2()).to.not.equal(dayCount2);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  }).timeout(300000);

  it('C13024 Submit trade with rates feed On, interest field disabled and same counter party with same trader.', () => {
    settings.ratesFeedOn();
    strategy.clickRdoStrategyFwdForward();
    settings.toggleExecutionVenueColourOn();
    venue.selectExecutionVenue('XOFF');
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');

    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    clientTrader.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_J);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(deal.verifySubmitBtnState(`SUBMIT ${eval('instrument.VENUE_B')}`, `${eval(`Constants.${instrument.VENUE_B}.Colour`)}`)).to.equal(true);

    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  }).timeout(300000);
});

describe('FWD FWD tests: Submit Forward Forward deals with Agent Fields', () => {
  it('C13025 Fwd Forward Deal error on trader selection with Buyer Agent Field.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    // agent.inputBuyerAgentByKeys(users.AGENT_A);
    expect(false).to.be.equal(agent.isBuyerAgentEnabled());

    deal.clickSubmitBtn();
    expect('Deal created').to.be.equal(popUpNav.getPopUpMessage());
  }).timeout(30000);

  it('C13026 Submit Forward Forward Deal With Buyer Agent Field with interest enable.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');
    interest.selectInterestChkBox();
    interest.inputInterest('10');

    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.inputBuyerAgentByKeys(users.AGENT_A);

    // eslint-disable-next-line radix
    const expAmount2 = interest.getAmountAfterInterest(100000, 10, parseInt(dealDate.getDayCount2()));
    // Remove below decimal fixed after validation related to the decimal level changes.
    const actAmount2 = amount.getAmount2().replace(/,/g, '');
    expect(actAmount2).to.equal(expAmount2);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(agent.getBuyerAgentLbl());
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(60000);

  it('C13027 Submit Forward Forward Deal With Seller Agent Field.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    strategy.clickRdoStrategyFwdForward();
    settings.toggleExecutionVenueColourOff();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectSellerAgent(users.AGENT_A);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(agent.getSellerAgentLbl());
    expect(deal.verifySubmitBtnState('SUBMIT', Constants.DEFAULT.Colour)).to.equal(true);
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(60000);

  it('C13028 Submit Forward Forward Deal With Buyer and Seller Agent Fields.', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');
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
  }).timeout(60000);
});

describe('FWD FWD tests: Back dated Forward Forward trades tests', () => {
  it('C13298 User can submit a FWD FWD using a date in the past', () => {
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    backDate.selectBackDate();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);

    const backDateDay = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_S).format(dateFormat);
    backDate.inputBackDate(backDateDay);

    expect(backDate.getBackDateValue()).to.equal(date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_S).format(dateFormat));

    const backDateTime = '10:36:01';
    backDate.inputBackDateTime(backDateTime);
    expect(backDate.getBackDateTimeValue()).to.equal(backDateTime);

    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');

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

    backDateFormatted = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_S).format('Do MMMM YYYY');
    expect(backDate.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    backDate.backDateAccept();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  });
});

describe('FWD FWD tests: Turn Trade Forward Forward trades tests', () => {
  it('C13491 User can submit a Turn Trade deal', () => {
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue('XOFF');
    settings.ratesFeedOff();

    expect(deal.isTurnTradeSelected()).to.equal(false);

    deal.selectTurnTrade();
    expect(deal.isTurnTradeSelected()).to.equal(true);

    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_C, '7', '0.1', instrument.TENOR_E, '7.25', '0.15');

    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    popUpNav.closePopUpMessage();
  });
});
