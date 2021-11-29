/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel');
const LoginModel = require('../../models/LoginModel');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
// const SettingsModel = require('../../models/SettingsModel');
const BlotterModel = require('../../models/blotter/BlotterModel');
const StrategyModel = require('../../models/fwd/StrategyModel');
const VenueModel = require('../../models/fwd/VenueModel');
const WindowActions = require('../../core/actions/WindowActions');
// const CurrencyModel = require('../../models/fwd/CurrencyModel');
// const TermModel = require('../../models/fwd/TermModel');
// const PriceModel = require('../../models/fwd/PriceModel');
// const AmountModel = require('../../models/fwd/AmountModel');
// const DealDateModel = require('../../models/fwd/DateModel');
// const BackDateModel = require('../../models/fwd/BackDateModel');
// const AgentModel = require('../../models/fwd/AgentModel');
// const BrokerModel = require('../../models/fwd/BrokerModel');
// const ClientTraderModel = require('../../models/fwd/ClientTraderModel');

const blotterModel = new BlotterModel();
const BrokerageModel = require('../../models/tradeManagement/BrokerageModel');

const Logs = require('../../core/utility/Logs');
const LocalUsers = require('../../data/UserDetails');
const LocalInstrument = require('../../data/fwd/InstrumentDetails');
const QaUsers = require('../../data/qa/fwd/UserDetails');
const QaInstrument = require('../../data/qa/fwd/InstrumentDetails');
const DevUsers = require('../../data/fwd/dev/UserDetails');

const DevInstrument = require('../../data/fwd/dev/InstrumentDetails');

const windowActions = new WindowActions();
// const DateModel = require('../../models/DateModel');
const Constants = require('../../data/Constants');
// const SettingsModel = require('../models/SettingsModel.js');

let users = null;
let instrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
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
// const settings = new SettingsModel();
const dealModel = new DealModel();
const strategy = new StrategyModel();
const venue = new VenueModel();
/* const currency = new CurrencyModel();
const term = new TermModel();
const price = new PriceModel();
const amount = new AmountModel();
const dealDate = new DealDateModel();
const backDate = new BackDateModel();
const agent = new AgentModel();
const broker = new BrokerModel(); */
// const clientTrader = new ClientTraderModel();
const brokerage = new BrokerageModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
// const date = new DateModel();
let dateFormat = '';
// const settingsModel = new SettingsModel();

// function moveToFWD() {
// login.openUrl(Constants.FWDURL);
// expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
// expect(login.verifyFWDselected()).to.be.equal(true);
// }
function moveToNDF() {
  login.openUrl(Constants.NDFURL);
  // expect(deal.isPageLoadComplete()).to.be.equal(true);
  // expect(login.verifyNDFselected()).to.be.equal(true);
  // deal.selectBaseCurrency('USD');
  // deal.selectDealtCurrency('USD');
}
before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToNDF();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

afterEach(() => {
  windowActions.closeCurrentTab();
  windowActions.switchWindow(blotterUrlConst);
  windowActions.closeCurrentTab();
});

describe('Trade Management - Brokerage', () => {
  it('C43175 Verify and Edit NDF (Outright) Deal', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_H, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_P.Client, users.TRADER_P);
    dealModel.selectSellerTrader(users.CLIENT_Q.Client, users.TRADER_Q);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    //  const currentDate = brokerage.getCurrentDateTime();
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    login.openUrl(blotterUrlConst);
    expect(login.verifyBlotterselected()).to.equal(true);
    blotterModel.waitForGrid();
    popUpNavModel.closePopUpMessage();
    const dealId = brokerage.getDealId();
    // **Open Deal by double click
    brokerage.openDealDoubleClick();
    // **open Deal by right click
    // brokerage.openDeal();
    brokerage.waitForEdit();
    // Verify Deal Information section
    expect(brokerage.getdealRef()).to.be.equal(dealId);
    expect(brokerage.getDmsType()).to.be.equal('NDF');
    expect(brokerage.getDmsAction()).to.be.equal('NEW');
    // to be completed - date format
    // expect(brokerage.getTradeDate()).to.be.equal(currentDate);
    expect(brokerage.getDealStatus()).to.be.equal('APPROVED');
    // Verify Buyer section
    expect(brokerage.getBuyerCurrency()).to.be.equal('USD');
    expect(brokerage.getBuyerBroker()).to.be.equal(users.BROKER_A);
    //  add get buyer amount
    expect(brokerage.getBuyerCenter()).to.be.equal('LONDON NDF');
    expect(brokerage.getBuyerAmount()).to.be.not.equal(' ');
    expect(brokerage.getBuyerAlloc()).to.be.equal('100');
    expect(brokerage.getBuyerReceive()).to.be.not.equal(' ');
    expect(brokerage.getBuyerUpdatedBy()).to.be.equal(users.USER_A.FullName);
    // Verify Seller section
    expect(brokerage.getSellerCurrancy()).to.be.equal('USD');
    expect(brokerage.getSellerAmount()).to.be.not.equal(' ');
    expect(brokerage.getSellerBroker()).to.be.equal(users.BROKER_A);
    expect(brokerage.getSellerCentre()).to.be.equal('LONDON NDF');
    expect(brokerage.getSellerAlloc()).to.be.equal('100');
    expect(brokerage.getSellerReceive()).to.be.not.equal(' ');
    expect(brokerage.getSellerUpdatedBy()).to.be.equal(users.USER_A.FullName);
    // Edit the deal Information data
    // buyer side edit
    brokerage.clickEditbtn();
    brokerage.editBuyerCurr();
    brokerage.editInputBuyerBrokerage('4.22');
    // seller side edit
    brokerage.clickEditbtn();
    brokerage.editSellerCurrency();
    brokerage.editInputSeller();
    brokerage.saveEdits();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal Updated');
    popUpNavModel.closePopUpMessage();
    // add new buyer brokerage
    brokerage.addBuyerBrokerage();
    // Edit Deal on Buyer side
    brokerage.editBuyerBroker();
    brokerage.editBuyerCentre();
    brokerage.editBuyerBrokerage();
    brokerage.saveEdits();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal Updated');
    popUpNavModel.closePopUpMessage();
    expect(brokerage.getBuyerAlloc()).to.be.equal('50');
    // expect(brokerage.getEditBuyerAlloc()).to.be.equal('50'); // ** Issue getting value from element
    /* **************
      verify edits - methods should all be place
    ************** */
    // add new Seller Brokerage
    brokerage.addSellerBrokerage();
    // edit deal on Seller side
    brokerage.editSellerBroker();
    brokerage.editSellerCentre();
    brokerage.editSellerBrokerage();
    brokerage.saveEdits();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal Updated');
    popUpNavModel.closePopUpMessage();
    expect(brokerage.getSellerAlloc()).to.be.equal('50');
    // expect(brokerage.getEditSellerAlloc()).to.be.equal('50'); // ** Issue getting value from element
    /* **************
      verify edits-methods should all be place
    ************** */
  }).timeout(180000);

  it('C43808 Verify Brokerage can be set to Zero (NDF Outright Deal)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue('XOFF');
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_S, '', instrument.TENOR_H, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_P.Client, users.TRADER_P);
    dealModel.selectSellerTrader(users.CLIENT_Q.Client, users.TRADER_Q);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_A, users.BROKER_A);
    //  const currentDate = brokerage.getCurrentDateTime();
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpMessage()).to.be.equal('Deal created');
    login.openUrl(blotterUrlConst);
    expect(login.verifyBlotterselected()).to.equal(true);
    blotterModel.waitForGrid();
    popUpNavModel.closePopUpMessage();
    const dealId = brokerage.getDealId();
    brokerage.openDealDoubleClick();
    brokerage.waitForEdit();
    expect(brokerage.getdealRef()).to.be.equal(dealId);
    // Buyer Side - Brokerage Edits
    expect(brokerage.getBuyerBrokerageType()).to.be.equal('AUTO');
    brokerage.clickEditbtn();
    brokerage.editInputBuyerBrokerage('0');
    expect(brokerage.getBuyerBrokerageTypeEdit()).to.be.equal('MANUAL_NET');
    expect(brokerage.verifyBrokerEmptyTable()).to.equal(true);
    brokerage.editInputBuyerBrokerage('10');
    expect(brokerage.getBuyerBrokerageTypeEdit()).to.be.equal('MANUAL');
    expect(brokerage.verifyBrokerEmptyTable()).to.equal(false);
    expect(brokerage.verifyBrokerageExplanation()).to.equal(true);
    // Seller Side - Brokerage Edits
    expect(brokerage.getSellerBrokerageTypeEdit()).to.be.equal('AUTO');
    brokerage.editInputSellerBrokerage('0');
    expect(brokerage.getSellerBrokerageTypeEdit()).to.be.equal('MANUAL_NET');
    expect(brokerage.verifyBrokerEmptyTable()).to.equal(true);
    brokerage.editInputSellerBrokerage('10');
    expect(brokerage.getSellerBrokerageTypeEdit()).to.be.equal('MANUAL');
    expect(brokerage.verifyBrokerEmptyTable()).to.equal(false);
    expect(brokerage.verifyBrokerExplanationSeller()).to.equal(true);
    brokerage.saveEdits();
  }).timeout(180000);
});
