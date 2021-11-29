/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const moment = require('moment');
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
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

function validateVenueList(permission) {
  dealModel.clickExecutionVenue();
  // const listText = dealModel.getExecutionVenueListItems();
  const listText = dealModel.getExecutionVenueList();

  switch (permission) {
    case 'admin':
      expect(listText).to.contain('TPSEF');
      instrument.NONSEFVENUES.forEach((venue) => {
        log.log(`Validating Venue for : ${venue}`);
        expect(listText).to.contain(venue);
      });
      break;
    case 'NonSEF':
      expect(listText).to.not.contain('TPSEF');
      instrument.NONSEFVENUES.forEach((venue) => {
        log.log(`Validating Venue for : ${venue}`);
        expect(listText).to.contain(venue);
      });
      break;
    case 'SEF':
      expect(listText).to.contain('TPSEF');
      instrument.NONSEFVENUES.forEach((venue) => {
        log.log(`Validating Venue for : ${venue}`);
        expect(listText).to.not.contain(venue);
      });
      break;
    default:
      expect(listText).to.contain('TPSEF');
      break;
  }
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_I.UserName, users.USER_I.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

afterEach(() => {
  if (loginModel.getDdlUserDropdownText() !== users.USER_I.FullName) {
    loginModel.changeUser(users.USER_I.UserName, users.USER_I.PassWord);
  }
});

describe('NDF Outright: Permissions tests', () => {
  it('C5637 Log in as belfasttpus1 and verify user has full access', () => {
    moveToNDF();
    settingsModel.ratesFeedOff();
    settingsModel.toggleExecutionVenueColourOn();
    dealModel.clickRdoStrategyOutright();

    // verify belfasttpeur1 can see SEF and Non-SEF venues
    validateVenueList('admin');

    dealModel.selectExecutionVenue('TPSEF');
    dealModel.selectVolMatch();
    expect(true).to.equal(dealModel.isVolMatchSelected());
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.verifySubmitBtnState(`SUBMIT ${eval('instrument.VENUE_A')}`, `${eval(`Constants.${instrument.VENUE_A}.Colour`)}`)).to.equal(true);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(60000);

  it('C12997 Submit deal with same counter party with same trader', () => {
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_I.FullName);
    moveToNDF();
    settingsModel.ratesFeedOff();
    settingsModel.toggleExecutionVenueColourOff();
    dealModel.clickRdoStrategyOutright();
    dealModel.clickExecutionVenue();
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_J);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.verifySubmitBtnState('SUBMIT', Constants.DEFAULT.Colour)).to.equal(true);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C27133 Log in as belfasttpeur2 and verify exec venue permissions', () => {
    loginModel.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_B.FullName);
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    validateVenueList('NonSEF');
  }).timeout(60000);

  it('C5638 Log in as belfasttpeur2 and verify users deal submit and same counter party with different trader.', () => {
    loginModel.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_B.FullName);

    moveToNDF();
    settingsModel.ratesFeedOff();
    dealModel.clickRdoStrategyOutright();
    popUpNavModel.closePopUpMessage();
    dealModel.selectExecutionVenue('TPSD');

    expect(dealModel.getMainCurrency()).to.equal(instrument.CURRENCY_A);
    expect(dealModel.getDealtCurrency()).to.equal(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.selectBaseCurrency(instrument.CURRENCY_O, true);
    expect(true).to.equal(dealModel.isCurrency2Focused());
    expect(dealModel.getCurrency()).to.equal('');
    // resetting currency to USD due to error on submit
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_A, instrument.TENOR_F, '1.5', '2.5');
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    dealModel.selectSellerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_J}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(60000);

  (ENV === 'QA' ? it.skip : it)('C27134 Log in as belfasttpsin2 and verify exec venue permissions', () => {
    loginModel.changeUser(users.USER_F.UserName, users.USER_F.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_F.FullName);
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    validateVenueList('SEF');
  }).timeout(60000);

  (ENV === 'QA' ? it.skip : it)('C5639 Log in as belfasttpeur3 and verify users deal submit permissions (none)', () => {
    loginModel.changeUser(users.USER_C.UserName, users.USER_C.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_C.FullName);
    moveToNDF();

    settingsModel.ratesFeedOff();
    dealModel.clickRdoStrategyOutright();
    popUpNavModel.closePopUpMessage();
    dealModel.selectExecutionVenue('XOFF');

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, instrument.CURRENCY_A, instrument.TENOR_J, '1.00', '1.1');
    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    // Moving this validation up bcz sometimes for user 3 client list comes blank.
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_E.Client} ${users.CLIENT_E.Location} / ${users.TRADER_E}`);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_F.Client} ${users.CLIENT_F.Location} / ${users.TRADER_F}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpDescription()).to.include('Permissions : Submit deal disabled in production environment.');
  }).timeout(60000);

  it('C5640 Log in as belfasttpeur4 and verify user has no view permissions', () => {
    loginModel.changeUser(users.USER_D.UserName, users.USER_D.PassWord);
    expect(popUpNavModel.getErrorMessage()).to.be.equal(Constants.LOGIN_WARNING_MESSAGE);
    popUpNavModel.clickReturnLogin();
    loginModel.login(users.USER_I.UserName, users.USER_I.PassWord);
  }).timeout(30000);
});

describe('NDF Outright: Submit Basic NDF Outright Deal', () => {
  it('C5641 Enter values for trade and submit', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('XOFF');
    const fixingDate = dealModel.getfixingDate();
    const valueDate = dealModel.getValueDate();
    const publishDate = dealModel.getPublishDate();
    const dayCount = dealModel.getDayCount();

    dealModel.inputTerm(instrument.TENOR_K);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    // confirm no error message when tenor entered before currency
    expect(popUpNavModel.verifyNoPopUpMessage()).to.be.equal(true);
    dealModel.selectDealtCurrency(instrument.CURRENCY_B);
    dealModel.inputAmount(0.1);

    expect(dealModel.isCasCadContainsEmptyTrader()).to.equal(false);
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(dealModel.isOutRightSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal('XOFF');
    expect(dealModel.getCurrency()).to.equal(instrument.CURRENCY_B);
    expect(dealModel.getDealtCurrency()).to.equal(instrument.CURRENCY_B);
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_K);
    expect(dealModel.getAmount()).to.equal('100,000');
    expect(dealModel.getfixingDate()).to.not.equal(fixingDate);
    expect(dealModel.getValueDate()).to.not.equal(valueDate);
    expect(dealModel.getPublishDate()).to.not.equal(publishDate);
    expect(dealModel.getDayCount()).to.not.equal(dayCount);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    dealModel.clickSwapBtn();

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);

    dealModel.clickSubmitBtn();

    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();

    // following are not affected by reset button
    const currency1 = dealModel.getMainCurrency();
    const currency2 = dealModel.getCurrency();
    const currency3 = dealModel.getDealtCurrency();
    const execVenue = dealModel.getExecutionVenue();

    dealModel.clickResetBtn();

    expect(dealModel.isOutRightSelected()).to.equal('true');
    expect(dealModel.getExecutionVenue()).to.equal(execVenue);
    expect(dealModel.getMainCurrency()).to.equal(currency1);
    expect(dealModel.getCurrency()).to.equal(currency2);
    expect(dealModel.getDealtCurrency()).to.equal(currency3);
    expect(dealModel.getTerm()).to.equal('');
    expect(dealModel.getPrice()).to.equal('');
    expect(dealModel.getAmount()).to.equal('');
    expect(dealModel.getfixingDate()).to.equal(fixingDate);
    expect(dealModel.getValueDate()).to.equal(valueDate);
    expect(dealModel.getPublishDate()).to.equal(publishDate);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal('');
    expect(dealModel.getBuyerBrokerName()).to.be.equal('');
    expect(dealModel.getSellerBrokerName()).to.be.equal('');
    expect(dealModel.verifyNoBuyerAgentSelected()).to.be.equal('Please select');
    expect(dealModel.verifyNoSellerAgentSelected()).to.be.equal('Please select');
  }).timeout(300000);
});

describe('NDF Outright: Submit Outright deals with Agent Fields', () => {
  it('C8592 Outright Deal error on trader selection with Buyer Agent Field.', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    // dealModel.inputBuyerAgentByKeys(users.AGENT_A);

    expect(false).to.be.equal(dealModel.agent.isBuyerAgentEnabled());

    dealModel.clickSubmitBtn();
    expect('Deal created').to.be.equal(popUpNavModel.getPopUpMessage());
  }).timeout(30000);

  it('C8585 Submit Outright Deal With Buyer Agent Field.', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    // dealModel.verifyCasCadClose();
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    dealModel.clickSubmitBtn();
    expect('Validation Error').to.be.equal(popUpNavModel.getPopUpMessage());
    popUpNavModel.closePopUpMessage();

    dealModel.inputBuyerAgentByKeys(users.AGENT_A);
    expect(users.AGENT_A).to.be.equal(dealModel.getBuyerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C8586 Submit Outright Deal With Seller Agent Field.', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);

    dealModel.clickExecVenueLbl();
    dealModel.clickSubmitBtn();
    expect('Validation Error').to.be.equal(popUpNavModel.getPopUpMessage());
    popUpNavModel.closePopUpMessage();

    dealModel.selectSellerAgent(users.AGENT_A);
    expect(users.AGENT_A).to.be.equal(dealModel.getSellerAgentLbl());

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(30000);

  it('C8587 Submit Outright Deal With Buyer and Seller Agent Fields.', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.selectSellerAgent(users.AGENT_C);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(users.AGENT_A).to.be.equal(dealModel.getBuyerAgentLbl());
    expect(users.AGENT_C).to.be.equal(dealModel.getSellerAgentLbl());
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
  }).timeout(60000);
});

describe('NDF Outright: Resubmit after changing a field parameterized tests', () => {
  it('C5642 User can submit another outright after changing a field', function outrightChangeFieldSubmit() {
    this.retries(3);
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '1.23', '2500000');

    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();

    dealModel.clickSubmitBtn();
    expect(dealModel.isDuplicateDealModalVisible()).to.equal(true);
    
    dealModel.duplicateDealCancel();
    expect(dealModel.isDuplicateDealModalClose()).to.equal(true);

    dealModel.clickSubmitBtn();
    expect(dealModel.isDuplicateDealModalVisible()).to.equal(true);

    dealModel.duplicateDealSubmitAgain();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();

    [
      ['currency', instrument.CURRENCY_C],
      ['term', instrument.TENOR_C],
      ['price', '1.25'],
      ['amount', '1.35'],
      ['fixingdate', (moment().add(14, 'd'))],
      ['valuedate', (moment().add(21, 'd'))],
      ['buyerclient', users.CLIENT_C.Client, users.TRADER_C],
      ['sellerclient', users.CLIENT_D.Client, users.TRADER_D],
      ['buybroker', users.DESK_D, users.BROKER_C.Name],
      ['sellbroker', users.DESK_C, users.BROKER_E],
      ['dealtCurrency', instrument.CURRENCY_C],
      ['executionVenue', 'XOFF'],
    ].forEach(([fieldToChange, newValueOne, newValueTwo]) => {
      dealModel.changeValue(fieldToChange, newValueOne, newValueTwo);
      /* if (fieldToChange === 'currency') {
        expect(dealModel.getPrice()).to.equal('');
        dealModel.inputPrice('1.34');
      } */
      dealModel.clickSubmitBtn();

      expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
      popUpNavModel.closePopUpMessage();

      dealModel.clickSubmitBtn();
      expect(dealModel.isDuplicateDealModalVisible()).to.equal(true);
      dealModel.duplicateDealCancel();
      expect(dealModel.isDuplicateDealModalClose()).to.equal(true);
    });
  }).timeout(240000);
});

describe('NDF Outright: Back dated Outright trades tests', () => {
  it('C13294 User can submit an outright using a date in the past', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();

    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);

    dealModel.selectBackDate();

    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);

    const backDateDay = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    dealModel.inputBackDate(backDateDay);
    expect(dealModel.getBackDateValue()).to.equal(date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat));

    const backDateTime = '10:36:01';
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_F, '1.23', '2500000');

    dealModel.selectBuyerTrader(users.CLIENT_E.Client, users.TRADER_E);
    dealModel.selectSellerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);

    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    dealModel.backDateCancel();
    expect(dealModel.isModalBackDateClose()).to.equal(true);

    dealModel.clickSubmitBtn();
    expect(dealModel.isModalBackDateVisible()).to.equal(true);

    backDateFormatted = date.subtractBusinessDateFromToday(1, instrument.CURRENCY_A, instrument.CURRENCY_B).format('Do MMMM YYYY');
    expect(dealModel.verifyModalNewDateString(`${backDateFormatted} ${backDateTime}`)).to.equal(`${backDateFormatted} ${backDateTime}`);

    dealModel.backDateAccept();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    popUpNavModel.closePopUpMessage();
  });
});
