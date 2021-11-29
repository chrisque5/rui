/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const BlotterModel = require('../../models/blotter/BlotterModel');
const BlotterExModel = require('../../models/blotter/BlotterExModel');
const BlotterSearchModel = require('../../models/blotter/BlotterSearchModel');
const DealModel = require('../../models/DealModel');
const LoginModel = require('../../models/LoginModel');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const Logs = require('../../core/utility/Logs');
const SharedStore = require('../../core/store/SharedStore');
const WindowActions = require('../../core/actions/WindowActions');
const DateModel = require('../../models/DateModel');

const LocalUsers = require('../../data/UserDetails');
const QaUsers = require('../../data/qa/UserDetails');
const Constants = require('../../data/Constants');
const BlotterData = require('../../data/blotter/BlotterData');
const BlotterDealCreation = require('./fx.deals.spec');

let users = null;
let blotterUrlConst = null;
let dmsLoginPage = null;

let deal17Id;
let deal18Id;
let deal19Id;
let deal20Id;
let deal21Id;
let deal22Id;
let deal25Id;
let deal26Id;
let deal17IdTradeTime;
let deal17IdTradeDate;
let deal18IdTradeDate;
let deal19IdTradeDate;
let deal20IdTradeDate;
let deal21IdTradeDate;
let deal22IdTradeDate;
// let deal23IdTradeDate;
// let deal24IdTradeDate;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
  case 'QA':
    users = QaUsers;
    blotterUrlConst = Constants.BLOTTERURLQA;
    dmsLoginPage = Constants.DMSWEBURLQA;
    break;
  default:
    users = LocalUsers;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
}

const blotterModel = new BlotterModel();
const blotterExModel = new BlotterExModel();
const blotterSearchModel = new BlotterSearchModel();
const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const sharedStore = new SharedStore();
const windowActions = new WindowActions();
const date = new DateModel();

let deal = null;
let dateFormat = '';
let firstRowDealId = '';
let newFirstRowDealId = '';
let lblDealId = '';
let lblDateFrom = '';
let lblDateTo = '';
let lblBroker = '';
let lblCustomer = '';
let lblTrader = '';
const lblShowResultsFor = 'Showing the results for:';
const lblSearchResultsFor = 'Search results for:';
const MATCHER = /(^\d+)(.+$)/i;

function storeDeals() {
  deal.deal17Id();
  deal.deal18Id();
  deal.deal19Id();
  deal.deal20Id();
  deal.deal21Id();
  deal.deal22Id();
  deal.deal23Id();
  deal.deal24Id();
  deal.deal25Id();
  deal.deal26Id();
  deal17Id = sharedStore.getValueFromStore('deal17Id');
  deal18Id = sharedStore.getValueFromStore('deal18Id');
  deal19Id = sharedStore.getValueFromStore('deal19Id');
  deal20Id = sharedStore.getValueFromStore('deal20Id');
  deal21Id = sharedStore.getValueFromStore('deal21Id');
  deal22Id = sharedStore.getValueFromStore('deal22Id');
  deal23Id = sharedStore.getValueFromStore('deal23Id');
  deal24Id = sharedStore.getValueFromStore('deal24Id');
  deal25Id = sharedStore.getValueFromStore('deal25Id');
  deal26Id = sharedStore.getValueFromStore('deal26Id');
  deal17IdTradeTime = sharedStore.getValueFromStore('deal17IdTradeTime');
  deal17IdTradeDate = sharedStore.getValueFromStore('deal17IdTradeDate');
  deal18IdTradeDate = sharedStore.getValueFromStore('deal18IdTradeDate');
  deal19IdTradeDate = sharedStore.getValueFromStore('deal19IdTradeDate');
  deal20IdTradeDate = sharedStore.getValueFromStore('deal20IdTradeDate');
  deal21IdTradeDate = sharedStore.getValueFromStore('deal21IdTradeDate');
  deal22IdTradeDate = sharedStore.getValueFromStore('deal22IdTradeDate');
  deal23IdTradeDate = sharedStore.getValueFromStore('deal23IdTradeDate');
  deal24IdTradeDate = sharedStore.getValueFromStore('deal24IdTradeDate');
  deal.printAllDeals();
}

function waitForBlotterLoad() {
  firstRowDealId = blotterModel.getFirstRowDealId();
  blotterSearchModel.showBlotterSearch();
  expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
}

function showTodaysDealsAndWaitForBlotterLoad() {
  blotterModel.showTodaysDeals();
  expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
  blotterModel.waitForGrid();
  blotterModel.waitForFirstRowDealIdUpdate(newFirstRowDealId);
}

function searchAndWaitForBlotterLoad() {
  blotterSearchModel.clickSearchButton();
  expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
  blotterModel.waitForGrid();
  blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
  deal = new BlotterDealCreation();
  storeDeals();
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(blotterUrlConst);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  popUpNavModel.closePopUpMessage();
  expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
});

afterEach(() => {
  const windowUrl = windowActions.getUrl();
  if (windowUrl === dmsLoginPage) {
    loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  } else if (windowUrl === undefined || windowUrl === null || windowUrl === '') {
    try {
      windowActions.switchWindow(dmsLoginPage);
      loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    } catch (error) {
      windowActions.newWindow(dmsLoginPage);
      loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    }
  }
  if (loginModel.getDdlUserDropdownText() !== users.USER_E.FullName) {
    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
  }
});

describe('Blotter Search: Searching for and verifying results in the Blotter', function blotterSearchTests() {
  this.retries(1);
  it('C24467 Verify show hide of blotter search in AntD drawer component', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.clickGridMask();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(false);
  }).timeout(30000);

  it('C23888 Verify searching a date range of 1 year gives Validation Error', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    popUpNavModel.closePopUpMessage();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);

    blotterSearchModel.showBlotterSearch();
    blotterSearchModel.clickResetButton();
    blotterSearchModel.showBlotterSearch();

    const newDateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(366)).format(dateFormat);
    blotterSearchModel.inputDateFrom(newDateFrom);
    expect(blotterSearchModel.getDateFrom()).to.equal(newDateFrom);
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Date range cannot be greater than 365 days');
    popUpNavModel.closePopUpMessage();
  }).timeout(60000);

  it('C23889 Verify searching a date range of 1 year in the past retrieves deals', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    const rowCount = blotterModel.getRowCount();

    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    searchAndWaitForBlotterLoad();
    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);

    blotterModel.clickDealExpand();
    blotterModel.enterQuickSearch(deal17Id);
    expect(blotterModel.getTradeDate(deal17Id)).to.equal(deal17IdTradeDate);
    expect(blotterModel.getTradeTime(deal17Id)).to.equal(deal17IdTradeTime);
    blotterModel.clearQuickSearch();
    blotterModel.enterQuickSearch(deal18Id);
    expect(blotterModel.getTradeDate(deal18Id)).to.equal(deal18IdTradeDate);
    blotterModel.clearQuickSearch();
    blotterModel.enterQuickSearch(deal19Id);
    expect(blotterModel.getTradeDate(deal19Id)).to.equal(deal19IdTradeDate);
    blotterModel.clearQuickSearch();
    blotterModel.enterQuickSearch(deal20Id);
    expect(blotterModel.getTradeDate(deal20Id)).to.equal(deal20IdTradeDate);
    blotterModel.clearQuickSearch();
  }).timeout(300000);

  it('C23890 Verify searching a date range of 2 days until 1 day in the past retrieves deals', () => {
    blotterModel.waitForGrid();
    firstRowDealId = blotterModel.getFirstRowDealId();
    blotterSearchModel.showBlotterSearch();
    popUpNavModel.closePopUpMessage();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    const dateFrom = date.subtractDateFromToday(2).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(1).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    searchAndWaitForBlotterLoad();

    blotterModel.clickDealExpand();
    blotterModel.enterQuickSearch(deal21Id);
    expect(blotterModel.getTradeDate(deal21Id)).to.equal(deal21IdTradeDate);
    blotterModel.clearQuickSearch();
    blotterModel.enterQuickSearch(deal22Id);
    expect(blotterModel.getTradeDate(deal22Id)).to.equal(deal22IdTradeDate);
    blotterModel.clearQuickSearch();
  }).timeout(60000);

  it('C23891 Verify searching 1 day 1 week in the past only shows deals from that day', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    searchAndWaitForBlotterLoad();

    blotterModel.clickDealExpand();
    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    expect(blotterSearchModel.verifyTradeDateRange(parseInt(rowCount, 10), dateFrom, dateTo)).to.equal(true);
    blotterModel.clickDealContract();
  }).timeout(240000);

  it('C23892 Verify searching by deal ID by clicking search retrieves that deal only', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    blotterSearchModel.searchDealId(deal17Id);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);

    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    expect(parseInt(rowCount, 10)).to.equal(1);
    expect(blotterModel.getFirstRowDealId()).to.equal(deal17Id);
  }).timeout(30000);

  it('C23893 Verify searching by deal ID by pressing return retrieves that deal only', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    blotterSearchModel.searchDealIdByKeys(deal19Id);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);

    const rowCount = blotterModel.getRowCount().replace(MATCHER, '$1');
    expect(parseInt(rowCount, 10)).to.equal(1);
    expect(blotterModel.getFirstRowDealId()).to.equal(deal19Id);
  }).timeout(30000);

  it('C23895 Verify searching by date range and broker returns deals using only that broker', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputBroker(users.BROKER_B1);
    let rowCount = blotterModel.getRowCount();
    searchAndWaitForBlotterLoad();
    blotterModel.clickDealExpand();

    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    rowCount = blotterModel.getRowCount();
    expect(blotterSearchModel.verifyFirstAndLastBrokerSearch(rowCount, users.BROKER_B1, MATCHER)).to.equal(true);
  }).timeout(240000);

  it('C23896 Verify searching by date range and customer returns deals using only that customer', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputCustomer(users.CLIENT_C_BLOTTER);
    let rowCount = blotterModel.getRowCount();
    searchAndWaitForBlotterLoad();

    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    rowCount = blotterModel.getRowCount();
    expect(blotterSearchModel.verifyFirstAndLastCustomerSearch(rowCount, users.CLIENT_C_BLOTTER, MATCHER)).to.equal(true);
  }).timeout(240000);

  it('C23897 Verify searching by date range and trader returns deals using only that trader', () => {
    blotterModel.waitForGrid();
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputTrader(users.TRADER_B_BLOTTER);
    let rowCount = blotterModel.getRowCount();
    searchAndWaitForBlotterLoad();

    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    rowCount = blotterModel.getRowCount();
    expect(blotterSearchModel.verifyFirstAndLastTraderSearch(rowCount, users.TRADER_B_BLOTTER, MATCHER)).to.equal(true);
  }).timeout(240000);

  it('C29398 Verify searching by date range and broker long name returns deals using only that broker', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerBrokerLong.Header)).to.equal(true);
    expect(blotterModel.verifyColumnHidden(BlotterData.SellerBrokerLong.Header)).to.equal(true);
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputBroker(users.BROKER_B1_LONGNAME);
    let rowCount = blotterModel.getRowCount();
    searchAndWaitForBlotterLoad();
    blotterModel.clickDealExpand();

    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    rowCount = blotterModel.getRowCount();
    expect(blotterSearchModel.verifyFirstAndLastBrokerSearch(rowCount, users.BROKER_B1, MATCHER)).to.equal(true);
  }).timeout(240000);

  it('C29399 Verify searching by date range and customer long name returns deals using only that customer', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerCustLong.Header)).to.equal(true);
    expect(blotterModel.verifyColumnHidden(BlotterData.SellerCustLong.Header)).to.equal(true);
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputCustomer(users.CLIENT_C_BLOTTER_LONGNAME);
    let rowCount = blotterModel.getRowCount();
    searchAndWaitForBlotterLoad();
    blotterModel.clickDealExpand();

    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    rowCount = blotterModel.getRowCount();
    expect(blotterSearchModel.verifyFirstAndLastCustomerSearch(rowCount, users.CLIENT_C_BLOTTER, MATCHER)).to.equal(true);
  }).timeout(240000);

  it('C29400 Verify searching by date range and trader long name returns deals using only that trader', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerTraderLong.Header)).to.equal(true);
    expect(blotterModel.verifyColumnHidden(BlotterData.SellerTraderLong.Header)).to.equal(true);
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputTrader(users.TRADER_B_BLOTTER_LONGNAME);
    let rowCount = blotterModel.getRowCount();
    searchAndWaitForBlotterLoad();

    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    rowCount = blotterModel.getRowCount();
    expect(blotterSearchModel.verifyFirstAndLastTraderSearch(rowCount, users.TRADER_B_BLOTTER, MATCHER)).to.equal(true);
  }).timeout(240000);

  it('C23898 Verify clicking reset button resets all search fields for date range search', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    const defaultDateFrom = blotterSearchModel.getDateFrom();
    const defaultDateTo = blotterSearchModel.getDateTo();
    const dateFrom = date.subtractDateFromToday(date.calculateDaysIfLeapYear(368)).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(date.calculateDaysIfLeapYear(364)).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.inputBroker(users.BROKER_B1);
    blotterSearchModel.inputCustomer(users.CLIENT_C_BLOTTER);
    blotterSearchModel.inputTrader(users.TRADER_B_BLOTTER);

    expect(blotterSearchModel.getDateFrom()).to.equal(dateFrom);
    expect(blotterSearchModel.getDateTo()).to.equal(dateTo);
    expect(blotterSearchModel.getBrokerText()).to.equal(users.BROKER_B1);
    expect(blotterSearchModel.getCustomerText()).to.equal(users.CLIENT_C_BLOTTER);
    expect(blotterSearchModel.getTraderText()).to.equal(users.TRADER_B_BLOTTER);

    blotterSearchModel.clickResetButton();
    expect(blotterSearchModel.getDateFrom()).to.equal(defaultDateFrom);
    expect(blotterSearchModel.getDateTo()).to.equal(defaultDateTo);
    expect(blotterSearchModel.getBrokerText()).to.equal('');
    expect(blotterSearchModel.getCustomerText()).to.equal('');
    expect(blotterSearchModel.getTraderText()).to.equal('');
  }).timeout(30000);

  it('C23899 Verify clicking reset button resets all search fields for Deal ID search', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.inputDealId('1234');
    expect(blotterSearchModel.getDealIdSearch()).to.equal('1234');
    expect(blotterSearchModel.getBrokerText()).to.equal('');
    expect(blotterSearchModel.getCustomerText()).to.equal('');
    expect(blotterSearchModel.getTraderText()).to.equal('');

    blotterSearchModel.clickResetButton();
    expect(blotterSearchModel.getDealIdSearch()).to.equal('');
    expect(blotterSearchModel.getBrokerText()).to.equal('');
    expect(blotterSearchModel.getCustomerText()).to.equal('');
    expect(blotterSearchModel.getTraderText()).to.equal('');
  }).timeout(30000);

  it('C23900 Verify only 19 digits can be entered in Deal ID field', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.inputDealId('1234567890123456789');
    blotterSearchModel.hoverhoverDealId();
    expect(blotterSearchModel.getFieldValidationText('Invalid ID value')).to.equal('');
    blotterSearchModel.inputDealId('12345678901234567890');
    blotterSearchModel.hoverhoverDealId();
    expect(blotterSearchModel.getFieldValidationText('Invalid ID value')).to.equal('Invalid ID value');
  }).timeout(30000);

  it('C24425 Verify notification when no deals returned', () => {
    blotterModel.waitForGrid();
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.inputDealId('9223372036854775807');
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('No deals were found. Please check your search criteria');
    popUpNavModel.closePopUpMessage();
  }).timeout(30000);

  it('C24477 Verify validation when max value entered to Deal ID search', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.inputDealId('93');
    blotterSearchModel.hoverhoverDealId();
    expect(blotterSearchModel.getFieldValidationText('Invalid ID value')).to.equal('');
    blotterSearchModel.inputDealId('9223372036854775808');
    blotterSearchModel.hoverhoverDealId();
    expect(blotterSearchModel.getFieldValidationText('Invalid ID value')).to.equal('Invalid ID value');
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('Invalid ID value');
    popUpNavModel.closePopUpMessage();
  }).timeout(30000);

  it('C24478 Verify user can only see deals based on their desk group permissions', () => {
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    // blotterModel.waitForGrid();
    firstRowDealId = blotterModel.getFirstRowDealId();
    blotterSearchModel.inputDealId(deal25Id);
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterModel.getFirstRowDealId().toString()).to.equal(deal25Id.toString());

    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.inputDealId(deal26Id);
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('No deals were found. Please check your search criteria');

    loginModel.changeUser(users.USER_J.UserName, users.USER_J.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    blotterModel.waitForGrid();
    firstRowDealId = blotterModel.getFirstRowDealId();

    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.inputDealId(deal25Id);
    popUpNavModel.closePopUpMessage();
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterModel.getFirstRowDealId().toString()).to.equal(deal25Id.toString());

    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.inputDealId(deal26Id);
    blotterSearchModel.clickSearchButton();
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    blotterModel.waitForFirstRowDealIdUpdate(deal25Id.toString());
    expect(blotterModel.getFirstRowDealId().toString()).to.equal(deal26Id.toString());
    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
  }).timeout(60000);

  it('C30727 Verify search criteria displayed when searching deal ID', () => {
    blotterModel.waitForGrid();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
    waitForBlotterLoad();
    blotterSearchModel.inputDealId(deal25Id);
    lblDealId = blotterSearchModel.getDealIdSearch();
    searchAndWaitForBlotterLoad();
    newFirstRowDealId = blotterModel.getFirstRowDealId();

    expect(blotterSearchModel.getSearchResultText()).to.equal(lblSearchResultsFor);
    expect(blotterSearchModel.getDateBrokerText()).to.equal(`Deal ID: ${lblDealId}`);
    showTodaysDealsAndWaitForBlotterLoad();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
  }).timeout(240000);

  it('C30728 Verify search criteria displayed when searching date range', () => {
    blotterModel.waitForGrid();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    lblDateFrom = blotterSearchModel.getDateFrom();
    lblDateTo = blotterSearchModel.getDateTo();
    searchAndWaitForBlotterLoad();
    newFirstRowDealId = blotterModel.getFirstRowDealId();

    expect(blotterSearchModel.getSearchResultText()).to.equal(lblSearchResultsFor);
    expect(blotterSearchModel.getDateBrokerText()).to.equal(`Trade Date From: ${lblDateFrom} To: ${lblDateTo}`);
    showTodaysDealsAndWaitForBlotterLoad();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
  }).timeout(240000);

  it('C30729 Verify search criteria displayed when searching date range and broker', () => {
    blotterModel.waitForGrid();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputBroker(users.BROKER_B1);
    lblDateFrom = blotterSearchModel.getDateFrom();
    lblDateTo = blotterSearchModel.getDateTo();
    lblBroker = blotterSearchModel.getBrokerText();
    searchAndWaitForBlotterLoad();
    newFirstRowDealId = blotterModel.getFirstRowDealId();

    expect(blotterSearchModel.getSearchResultText()).to.equal(lblSearchResultsFor);
    expect(blotterSearchModel.getDateBrokerText()).to.equal(`Trade Date From: ${lblDateFrom} To: ${lblDateTo}, Broker: ${lblBroker}`);
    showTodaysDealsAndWaitForBlotterLoad();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
  }).timeout(240000);

  it('C30730 Verify search criteria displayed when searching date range and customer', () => {
    blotterModel.waitForGrid();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputCustomer(users.CLIENT_C_BLOTTER);
    lblDateFrom = blotterSearchModel.getDateFrom();
    lblDateTo = blotterSearchModel.getDateTo();
    lblCustomer = blotterSearchModel.getCustomerText();
    searchAndWaitForBlotterLoad();
    newFirstRowDealId = blotterModel.getFirstRowDealId();

    expect(blotterSearchModel.getSearchResultText()).to.equal(lblSearchResultsFor);
    expect(blotterSearchModel.getDateBrokerText()).to.equal(`Trade Date From: ${lblDateFrom} To: ${lblDateTo}`);
    expect(blotterSearchModel.getCustTraderSearchText()).to.equal(`Customer: ${lblCustomer}`);
    showTodaysDealsAndWaitForBlotterLoad();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
  }).timeout(240000);

  it('C30731 Verify search criteria displayed when searching date range and trader', () => {
    blotterModel.waitForGrid();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputTrader(users.TRADER_B_BLOTTER);
    lblDateFrom = blotterSearchModel.getDateFrom();
    lblDateTo = blotterSearchModel.getDateTo();
    lblTrader = blotterSearchModel.getTraderText();
    searchAndWaitForBlotterLoad();

    expect(blotterSearchModel.getSearchResultText()).to.equal(lblSearchResultsFor);
    expect(blotterSearchModel.getDateBrokerText()).to.equal(`Trade Date From: ${lblDateFrom} To: ${lblDateTo}`);
    expect(blotterSearchModel.getCustTraderSearchText()).to.equal(`Trader: ${lblTrader}`);
    showTodaysDealsAndWaitForBlotterLoad();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
  }).timeout(240000);

  it('C30732 Verify search criteria displayed when searching date range, broker, customer and trader', () => {
    blotterModel.waitForGrid();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
    waitForBlotterLoad();
    const dateFrom = date.subtractDateFromToday(7).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputBroker(users.BROKER_B1);
    blotterSearchModel.inputCustomer(users.CLIENT_C_BLOTTER);
    blotterSearchModel.inputTrader(users.TRADER_B_BLOTTER);
    lblDateFrom = blotterSearchModel.getDateFrom();
    lblDateTo = blotterSearchModel.getDateTo();
    lblBroker = blotterSearchModel.getBrokerText();
    lblCustomer = blotterSearchModel.getCustomerText();
    lblTrader = blotterSearchModel.getTraderText();
    searchAndWaitForBlotterLoad();

    expect(blotterSearchModel.getSearchResultText()).to.equal(lblSearchResultsFor);
    expect(blotterSearchModel.getDateBrokerText()).to.equal(`Trade Date From: ${lblDateFrom} To: ${lblDateTo}, Broker: ${lblBroker}`);
    expect(blotterSearchModel.getCustTraderSearchText()).to.equal(`Customer: ${lblCustomer}, Trader: ${lblTrader}`);
    showTodaysDealsAndWaitForBlotterLoad();
    expect(blotterSearchModel.getSearchResultText()).to.equal(`${lblShowResultsFor}`);
    expect(blotterSearchModel.getDateBrokerText()).to.equal('TODAY');
  }).timeout(240000);
});
