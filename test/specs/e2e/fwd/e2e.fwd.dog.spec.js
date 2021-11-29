const expect = require('chai').expect;
const E2EModel = require('../../../models/E2EModel.js');
const DealModel = require('../../../models/fwd/DealModel.js');
const LoginModel = require('../../../models/LoginModel.js');
const SettingsModel = require('../../../models/SettingsModel.js');
const PopUpNavigationModel = require('../../../models/PopUpNavigationModel');

const StrategyModel = require('../../../models/fwd/StrategyModel.js');
const VenueModel = require('../../../models/fwd/VenueModel.js');
const BrokerModel = require('../../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../../models/fwd/ClientTraderModel.js');
const BackDateModel = require('../../../models/fwd/BackDateModel.js');

const Logs = require('../../../core/utility/Logs.js');
const LocalUsers = require('../../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../../data/qa/e2e/fwd/UserDetails.js');
const QaInstrument = require('../../../data/qa/e2e/fwd/InstrumentDetails.js');
const DevUsers = require('../../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../../data/fwd/dev/InstrumentDetails.js');
const Constants = require('../../../data/Constants.js');

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

const e2e = new E2EModel();
const deal = new DealModel();
const login = new LoginModel();
const popUpNav = new PopUpNavigationModel();
const settings = new SettingsModel();

const strategy = new StrategyModel();
const venue = new VenueModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();
const backDate = new BackDateModel();

const log = new Logs();

let dateFormat = '';

function moveToFWD() {
  login.openUrl(Constants.FWDURL);
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(login.verifyFWDselected()).to.be.equal(true);
}

before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

describe('E2E MBS2 and DOG scenario for Forward, FWD Forward and Fwd Outright', () => {
  it('FWD_DOG_01_C12524 FWD USD HKD 1M TEFD (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_E, '7.80045', '0.001', '15', '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_DOG_01_C12524 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_DOG_01_C12524 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_DOG_01_C12524@@NCR:FWD_USD_HKD_1M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_DOG_02_C12525 FWD USD SGD 1M*2M TEFD (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_E, '1.348675', '-3.05', '12', instrument.TENOR_E1, '', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_DOG_02_C12525 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_DOG_02_C12525 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_DOG_02_C12525@@FWD=>fwd_fwd=>basic:FWD_USD_SGD_1M_2M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_DOG_03_C12526 FWD USD SGD 1M TEFD (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_E, '1.349175', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_DOG_03_C12526 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_DOG_03_C12526 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_DOG_03_C12526@@FWD=>fwd_outright=>basic:FWD_USD_SGD_1M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_DOG_04_C12527 FWD USD HKD 1M TEMM (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_E, '7.80045', '0.001', '15', '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_DOG_04_C12527 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_DOG_04_C12527 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_DOG_04_C12527@@NCR:FWD_USD_HKD_1M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_FWD_DOG_05_C12528 FWD USD SGD 1M*2M TEMM (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_E, '1.348675', '-3.05', '12', instrument.TENOR_E1, '', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_FWD_DOG_05_C12528 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_FWD_DOG_05_C12528 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_FWD_DOG_05_C12528@@FWD=>fwd_fwd=>basic:FWD_USD_SGD_1M_2M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_OUT_DOG_06_C12529 FWD USD SGD 1M TEMM (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_E, '1.349175', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_OUT_DOG_06_C12529 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_OUT_DOG_06_C12529 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_OUT_DOG_06_C12529@@FWD=>fwd_outright=>basic:FWD_USD_SGD_1M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_DOG_C13175 FWD USD HKD 1M TEFD (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_E, '7.80045', '0.001', '15', '', '15');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_DOG_C13175 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_DOG_C13175 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_DOG_C13175@@NCR:FWD_USD_HKD_1M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_DOG_C13176 FWD USD SGD 1M*2M TEFD (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyFwdForward();
    venue.selectExecutionVenue(instrument.VENUE_E);
    settings.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeFwdForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_E, '1.348675', '-3.05', '12', instrument.TENOR_E1, '', '12');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_DOG_C13176 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_DOG_C13176 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_DOG_C13176@@FWD=>fwd_fwd=>basic:FWD_USD_SGD_1M_2M_${instrument.VENUE_E}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('FWD_DOG_C13177 FWD USD SGD 1M TEMM (New)', () => {
    expect(login.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
    strategy.clickRdoStrategyOutright();
    venue.selectExecutionVenue(instrument.VENUE_G);
    settings.ratesFeedOff();
    backDate.enterBackDate(2, instrument.CURRENCY_A, instrument.CURRENCY_B, '10:36:01', dateFormat);
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_E, '1.349175', '13');
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_F, users.BROKER_L);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_M);
    deal.clickSubmitBtn();
    expect(backDate.isModalBackDateVisible()).to.equal(true);
    backDate.backDateAccept();

    const dealId = e2e.getDealId();
    log.log(`Test Case Number : FWD_DOG_C13177 and Deal ID : ${dealId}`);
    e2e.saveDealTestMap(1, `Test Case Number : FWD_DOG_C13177 and Deal ID : ${dealId}`);
    e2e.saveDealIdWithTest(`${dealId}@@complete:new:leg1`, `FWD_DOG_C13177@@FWD=>fwd_outright=>basic:FWD_USD_SGD_1M_${instrument.VENUE_G}_NEW`);
    popUpNav.closePopUpMessage();
  }).timeout(30000);

  it('show all differences', () => {
    browser.pause(2000);
    e2e.showAllDifferences();
  });
});
