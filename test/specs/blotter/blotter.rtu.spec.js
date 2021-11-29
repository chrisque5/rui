/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const BlotterModel = require('../../models/blotter/BlotterModel');
const BlotterExModel = require('../../models/blotter/BlotterExModel');
const BlotterRtuModel = require('../../models/blotter/BlotterRtuModel');
const BlotterSearchModel = require('../../models/blotter/BlotterSearchModel');
const DealModel = require('../../models/DealModel');
const FwdModel = require('../../models/fwd/DealModel');
const LoginModel = require('../../models/LoginModel');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const Logs = require('../../core/utility/Logs');
const WindowActions = require('../../core/actions/WindowActions');
const E2EModel = require('../../models/E2EModel');
const API = require('../../models/blotter/BlotterApiModel');
const DateModel = require('../../models/DateModel');
const Strategy = require('../../components/fwd/Strategy');
const SettingsModel = require('../../models/SettingsModel');

const LocalUsers = require('../../data/UserDetails');
const LocalInstrument = require('../../data/InstrumentDetails');
const QaUsers = require('../../data/qa/UserDetails');
const QaInstrument = require('../../data/qa/InstrumentDetails');
const FwdUsers = require('../../data/fwd/UserDetails');
const FwdInstrument = require('../../data/fwd/InstrumentDetails');
const QaFwdUsers = require('../../data/qa/fwd/UserDetails');
const QaFwdInstrument = require('../../data/qa/fwd/InstrumentDetails');
const Constants = require('../../data/Constants');

let users = null;
let instrument = null;
let fwdUsers = null;
let fwdInstrument = null;
let blotterUrlConst = null;
let baseUrlConst = null;
let dateFormat = '';
let windowUrl = '';
const MATCHER = /(^\d+)(.+$)/i;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    baseUrlConst = Constants.BASEURL;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdUsers = QaFwdUsers;
    fwdInstrument = QaFwdInstrument;
    blotterUrlConst = Constants.BLOTTERURLQA;
    baseUrlConst = Constants.BASEURLQA;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    break;
}

const blotterModel = new BlotterModel();
const blotterExModel = new BlotterExModel();
const blotterRtuModel = new BlotterRtuModel();
const blotterSearchModel = new BlotterSearchModel();
const dealModel = new DealModel();
const fwdModel = new FwdModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const windowActions = new WindowActions();
const e2e = new E2EModel();
const api = new API();
const date = new DateModel();
const strategy = new Strategy();
const settingsmodel = new SettingsModel();

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
  windowUrl = windowActions.getUrl();
  if (windowUrl === blotterUrlConst) {
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    blotterModel.waitForGrid();
  }
});

beforeEach(() => {
  windowUrl = windowActions.getUrl();
  if (windowUrl !== blotterUrlConst) {
    loginModel.openUrl(blotterUrlConst);
  }
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  popUpNavModel.closePopUpMessage();
  expect(loginModel.verifyBlotterselected()).to.equal(true);
});

afterEach(() => {
  windowUrl = windowActions.getUrl();
  if (windowUrl === Constants.NDFURL) {
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrlConst);
  } else if (windowUrl === undefined || windowUrl === null || windowUrl === '') {
    windowActions.newWindow(blotterUrlConst);
  }
});

describe('Blotter RTU: Verifying Blotter RTU functionality', function blotterRtuTests() {
  this.retries(3);
  it('C28542 Verify Blotter Real Time Update for NDF deal creation', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    const tradeCaptureUrl = windowActions.getUrl();

    dealModel.clickRdoStrategyOutright();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const newDealId = e2e.getDealId();
    expect(newDealId).to.equal(newFirstRowDealId);
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
  }).timeout(120000);

  it('C28785 Verify Blotter RTU does not come through for deal outside of search with broker filter', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    let firstRowDealId = blotterModel.getFirstRowDealId();

    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    const dateFrom = date.subtractDateFromToday(1).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputBroker(fwdUsers.BROKER_A);
    const rowCount = blotterModel.getRowCount();
    blotterSearchModel.clickSearchButton();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.FWDURL);
    windowActions.switchWindow(Constants.FWDURL);
    const tradeCaptureUrl = windowActions.getUrl();

    strategy.clickRdoStrategyForward();
    fwdModel.placeForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_F, '6.2945', '100', '6.9542', '200');
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_H.Client, fwdUsers.TRADER_H);
    dealModel.selectSellerTrader(fwdUsers.CLIENT_B.Client, fwdUsers.TRADER_B);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId)).to.equal(false);
    let newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    popUpNavModel.closePopUpMessage();
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_A, fwdUsers.BROKER_A);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.waitForFirstRowDealIdUpdate(newFirstRowDealId)).to.equal(true);
    newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const newDealId = e2e.getDealId();
    expect(newDealId).to.equal(newFirstRowDealId);
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.clickResetButton();
    blotterSearchModel.clickGridMask();
  }).timeout(120000);

  it('C28786 Verify Blotter RTU does not come through for deal outside of search with customer filter', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    let firstRowDealId = blotterModel.getFirstRowDealId();

    blotterModel.showTodaysDeals();

    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    const dateFrom = date.subtractDateFromToday(1).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputCustomer(fwdUsers.CLIENT_C_BLOTTER);
    const rowCount = blotterModel.getRowCount();
    blotterSearchModel.clickSearchButton();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.FWDURL);
    windowActions.switchWindow(Constants.FWDURL);
    const tradeCaptureUrl = windowActions.getUrl();

    strategy.clickRdoStrategyForward();
    fwdModel.placeForwardOrder(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, '', fwdInstrument.TENOR_E, '6.2945', '100', '6.9542', '200');
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_H.Client, fwdUsers.TRADER_H);
    dealModel.selectSellerTrader(fwdUsers.CLIENT_B.Client, fwdUsers.TRADER_B);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId)).to.equal(false);
    let newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    popUpNavModel.closePopUpMessage();
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_C.Client, fwdUsers.TRADER_C);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.waitForFirstRowDealIdUpdate(newFirstRowDealId)).to.equal(true);
    newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const newDealId = e2e.getDealId();
    expect(newDealId).to.equal(newFirstRowDealId);
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.clickResetButton();
    blotterSearchModel.clickGridMask();
  }).timeout(120000);

  it('C28787 Verify Blotter RTU does not come through for deal outside of search with trader filter', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    let firstRowDealId = blotterModel.getFirstRowDealId();

    blotterModel.showTodaysDeals();

    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    const dateFrom = date.subtractDateFromToday(1).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    blotterSearchModel.inputTrader(users.TRADER_C_BLOTTER);
    const rowCount = blotterModel.getRowCount();
    blotterSearchModel.clickSearchButton();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    expect(blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount)).to.equal(true);
    firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.FWDURL);
    windowActions.switchWindow(Constants.FWDURL);
    const tradeCaptureUrl = windowActions.getUrl();

    strategy.clickRdoStrategyForward();
    fwdModel.placeForwardOrder(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, '', fwdInstrument.TENOR_E, '6.2945', '100', '6.9542', '200');
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_H.Client, fwdUsers.TRADER_H);
    dealModel.selectSellerTrader(fwdUsers.CLIENT_B.Client, fwdUsers.TRADER_B);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId)).to.equal(false);
    let newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    popUpNavModel.closePopUpMessage();
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_C.Client, fwdUsers.TRADER_C);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.waitForFirstRowDealIdUpdate(newFirstRowDealId)).to.equal(true);
    newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const newDealId = e2e.getDealId();
    expect(newDealId).to.equal(newFirstRowDealId);
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.clickResetButton();
    blotterSearchModel.clickGridMask();
  }).timeout(120000);

  it('C28543 Verify Blotter Real Time Update for NDF deal creation after RTU session terminate', () => {
    blotterModel.waitForGrid();
    expect(blotterRtuModel.verifyRtuIconColourGreen()).to.equal(true);

    const jSessionId = windowActions.getCurrentJsessionId();
    const rtuSessionKey = api.getKeysDmsWeb(jSessionId);
    const response = api.terminateRtuSession(jSessionId, rtuSessionKey);
    log.log(`Response = ${JSON.stringify(response)}`);
    expect(response).to.contain('SUCCESS');

    expect(blotterRtuModel.verifyRtuIconColourRed()).to.equal(true);
    expect(blotterRtuModel.verifyRtuIconColourAmber()).to.equal(true);
    expect(blotterRtuModel.verifyRtuIconColourGreen()).to.equal(true);

    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    const tradeCaptureUrl = windowActions.getUrl();

    dealModel.clickRdoStrategyOutright();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const newDealId = e2e.getDealId();
    expect(newDealId).to.equal(newFirstRowDealId);
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
  }).timeout(120000);

  it('C28544 Verify retrieving RTU search parameters for active Deal ID Search', () => {
    blotterModel.waitForGrid();
    blotterModel.showTodaysDeals();

    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);

    dealModel.clickRdoStrategyOutright();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_I, '', instrument.TENOR_F, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    const newDealId = e2e.getDealId();

    windowActions.switchWindow(blotterUrlConst);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);
    expect(newDealId).to.equal(newFirstRowDealId);
    windowActions.switchWindow(Constants.NDFURL);
    windowActions.closeCurrentTab();

    windowActions.switchWindow(blotterUrlConst);
    blotterSearchModel.showBlotterSearch();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.searchDealId(newDealId);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(newFirstRowDealId);

    const jSessionId = windowActions.getCurrentJsessionId();
    const rtuSessionKey = api.getKeysDmsWeb(jSessionId);
    const sessionParams = api.getSessionParams(jSessionId, rtuSessionKey);
    expect(sessionParams.dmsDealReference).to.equal(parseInt(newDealId, 10));
    expect(sessionParams.productType).to.equal('FX');
    expect(sessionParams.sessionId).to.equal(rtuSessionKey);
    expect(sessionParams.rtuType).to.equal('SSE');
    expect(sessionParams.loginName).to.equal(users.USER_E.UserName);
  }).timeout(120000);

  it('C28584 Verify retrieving RTU search parameters for active date Search', () => {
    blotterModel.waitForGrid();
    blotterModel.showTodaysDeals();
    const firstRowDealId = blotterModel.getFirstRowDealId();
    blotterSearchModel.showBlotterSearch();
    popUpNavModel.closePopUpMessage();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    const dateFrom = date.subtractDateFromToday(2).format(dateFormat);
    blotterSearchModel.inputDateFrom(dateFrom);
    const dateTo = date.subtractDateFromToday(1).format(dateFormat);
    blotterSearchModel.inputDateTo(dateTo);
    blotterSearchModel.clickSearchButton();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);

    const dateFromUnix = date.convertToUnixStartOfDay(dateFrom, dateFormat);
    const dateToUnix = date.convertToUnixEndOfDay(dateTo, dateFormat);
    const jSessionId = windowActions.getCurrentJsessionId();
    const rtuSessionKey = api.getKeysDmsWeb(jSessionId);
    const sessionParams = api.getSessionParams(jSessionId, rtuSessionKey);
    expect(sessionParams.tradeDateFrom).to.equal(parseInt(dateFromUnix, 10));
    expect(sessionParams.tradeDateTo).to.equal(parseInt(dateToUnix, 10));
    expect(sessionParams.productType).to.equal('FX');
    expect(sessionParams.sessionId).to.equal(rtuSessionKey);
    expect(sessionParams.rtuType).to.equal('SSE');
    expect(sessionParams.loginName).to.equal(users.USER_E.UserName);
  }).timeout(120000);

  it('C28671 Verify SSE warning after opening 5 blotter tabs', () => {
    blotterModel.waitForGrid();
    for (i = 0; i < 4; i += 1) {
      windowActions.newWindowByJScript(blotterUrlConst);
      windowActions.pause(500);
    }
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
    windowActions.newWindowByJScript(`${baseUrlConst}${Constants.NDFURL}`);
    windowActions.switchWindow('NDF - DMSWeb');
    windowActions.openUrl(blotterUrlConst);
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Max Blotter Limit');
  });

  it('C29383 Verify price value is consistent across Blotter and Blotter Search windows for NDF Spread', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    const tradeCaptureUrl = windowActions.getUrl();

    dealModel.clickRdoStrategySpread();
    settingsmodel.ratesFeedOff();
    dealModel.placeSpreadOrder(instrument.CURRENCY_A, instrument.CURRENCY_D, instrument.CURRENCY_A, instrument.TENOR_C, '6.294', '1.5', instrument.TENOR_F, '1.255', '1.5');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const ndfDealIdLeg1 = e2e.getLeg1DealId();
    const ndfDealIdLeg2 = e2e.getLeg2DealId();
    const ndfDealRate1 = dealModel.getPrice();
    const ndfDealRate2 = dealModel.getPrice2();
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    expect(ndfDealRate1).to.equal(blotterModel.getPrice(ndfDealIdLeg1));
    expect(ndfDealRate2).to.equal(blotterModel.getPrice(ndfDealIdLeg2));

    blotterSearchModel.showBlotterSearch();
    popUpNavModel.closePopUpMessage();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.searchDealIdByKeys(ndfDealIdLeg1);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(ndfDealIdLeg1);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    expect(parseFloat(blotterModel.getPrice(ndfDealIdLeg1))).to.equal(parseFloat(ndfDealRate1));

    blotterSearchModel.showBlotterSearch();
    popUpNavModel.closePopUpMessage();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.searchDealIdByKeys(ndfDealIdLeg2);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(ndfDealIdLeg2);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    expect(parseFloat(blotterModel.getPrice(ndfDealIdLeg2))).to.equal(parseFloat(ndfDealRate2));
  }).timeout(120000);

  it('C29384 Verify Blotter Real Time Update for Cancel Deal', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();

    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);
    expect(blotterModel.getDealAction(newDealId)).to.equal('NEW');

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, newDealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, newDealId);

    const response = api.cancelDeal(jSessionId, dealEntityId, lockSequence, 'false', 'Test trade cancel');
    expect(response).to.equal(`DMS Deal ID: ${dealEntityId} - cancellation SUCCESS`);
    expect(blotterRtuModel.waitForDealCancelUpdate(newDealId)).to.equal(true);
  }).timeout(120000);

  it('C30795 Verify Blotter Real Time Update for edit Amount', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    const amount = '1500000';
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, '6.2945', amount);
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();

    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);
    expect(blotterModel.getDealAction(newDealId)).to.equal('NEW');

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, newDealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, newDealId);

    blotterModel.clickDealExpand();
    expect(parseInt(blotterModel.getAmount(newDealId).replace(/,/g, ''), 10)).to.equal(parseInt(amount, 10));

    const newAmount = '2500000';
    api.editAmount(jSessionId, dealEntityId, lockSequence, 'Amount edit test', newAmount);

    expect(blotterRtuModel.waitForAmountEditUpdate(newDealId, amount)).to.equal(true);
    expect(parseInt(blotterModel.getAmount(newDealId).replace(/,/g, ''), 10)).to.equal(parseInt(newAmount, 10));
  }).timeout(120000);

  it('C30796 Verify Blotter Real Time Update for edit Price', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    const price = '6.459';
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, price, '1500000');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();

    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);
    expect(blotterModel.getDealAction(newDealId)).to.equal('NEW');

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, newDealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, newDealId);

    blotterModel.clickDealExpand();
    expect(parseFloat(blotterModel.getPrice(newDealId))).to.equal(parseFloat(price));

    const newPrice = '7.459';
    api.editPrice(jSessionId, dealEntityId, lockSequence, 'Price edit test', newPrice);

    expect(blotterRtuModel.waitForPriceEditUpdate(newDealId, price)).to.equal(true);
    expect(parseFloat(blotterModel.getPrice(newDealId))).to.equal(parseFloat(newPrice));
  }).timeout(120000);

  it('C30797 Verify Blotter Real Time Update for edit Buyer Brokerage', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, '6.459', '1500000');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();

    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);
    expect(blotterModel.getDealAction(newDealId)).to.equal('NEW');

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, newDealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, newDealId);

    const buyerBro = blotterModel.getBuyerBrokerage(newDealId);
    const newBuyerBroCcy = instrument.CURRENCY_A;
    const newBuyerBro = '500';

    api.editBuyerBrokerage(jSessionId, dealEntityId, lockSequence, 'Buyer bro edit test', newBuyerBroCcy, newBuyerBro);
    expect(blotterRtuModel.waitForBuyerBrokerageEditUpdate(newDealId, buyerBro)).to.equal(true);
    expect(blotterModel.getBuyerBrokerageCcy(newDealId)).to.equal(newBuyerBroCcy);
    expect(blotterModel.getBuyerBrokerage(newDealId)).to.equal(newBuyerBro);
  }).timeout(120000);

  it('C30798 Verify Blotter Real Time Update for edit Seller Brokerage', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, '6.459', '1500000');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();

    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    blotterModel.showTodaysDeals();
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);
    expect(blotterModel.getDealAction(newDealId)).to.equal('NEW');

    const jSessionId = windowActions.getCurrentJsessionId();
    windowActions.pause(2000);
    const lockSequence = api.dealServiceGetLockSequence(jSessionId, newDealId);
    const dealEntityId = api.dealServiceGetDmsDealId(jSessionId, newDealId);

    const sellerBro = blotterModel.getSellerBrokerage(newDealId);
    const newSellerBroCcy = instrument.CURRENCY_C;
    const newSellerBro = '450';

    api.editSellerBrokerage(jSessionId, dealEntityId, lockSequence, 'Seller bro edit test', newSellerBroCcy, newSellerBro);
    expect(blotterRtuModel.waitForSellerBrokerageEditUpdate(newDealId, sellerBro)).to.equal(true);
    expect(blotterModel.getSellerBrokerageCcy(newDealId)).to.equal(newSellerBroCcy);
    expect(blotterModel.getSellerBrokerage(newDealId)).to.equal(newSellerBro);
  }).timeout(120000);

  it('C29420 Verify Amount value is consistent across Blotter and Blotter Search windows for FWD Deal', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.FWDURL);
    windowActions.switchWindow(Constants.FWDURL);
    const tradeCaptureUrl = windowActions.getUrl();

    strategy.clickRdoStrategyForward();
    settingsmodel.ratesFeedOff();
    fwdModel.placeForwardOrder(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, '', fwdInstrument.TENOR_E, '6.2945', '100', '6.9542', '200');
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_H.Client, fwdUsers.TRADER_H);
    dealModel.selectSellerTrader(fwdUsers.CLIENT_B.Client, fwdUsers.TRADER_B);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const fwdDealId = e2e.getDealId();
    const fwdDealAmount2 = dealModel.getAmount2();
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    expect(fwdDealAmount2).to.equal(blotterModel.getAmount(fwdDealId));

    blotterSearchModel.showBlotterSearch();
    popUpNavModel.closePopUpMessage();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.searchDealIdByKeys(fwdDealId);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(fwdDealId);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    expect(parseFloat(blotterModel.getAmount(fwdDealId))).to.equal(parseFloat(fwdDealAmount2));
  }).timeout(120000);

  it('C29421 Verify Amount value is consistent across Blotter and Blotter Search windows for FWDFWD Deal', () => {
    blotterModel.waitForGrid();
    const blotterUrl = windowActions.getUrl();
    blotterModel.showTodaysDeals();
    const firstRowDealId = blotterModel.getFirstRowDealId();

    windowActions.newWindow(Constants.FWDURL);
    windowActions.switchWindow(Constants.FWDURL);
    const tradeCaptureUrl = windowActions.getUrl();

    strategy.clickRdoStrategyFwdForward();
    settingsmodel.ratesFeedOff();
    fwdModel.placeFwdForwardOrder(fwdInstrument.CURRENCY_A, fwdInstrument.CURRENCY_S, '', fwdInstrument.TENOR_B, '6.2945', '100', fwdInstrument.TENOR_E, '6.9542', '200');
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_H.Client, fwdUsers.TRADER_H);
    dealModel.selectSellerTrader(fwdUsers.CLIENT_B.Client, fwdUsers.TRADER_B);
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_J);
    dealModel.selectSellerBrokerName(fwdUsers.DESK_C, fwdUsers.BROKER_D.Name);
    dealModel.clickSubmitBtn();

    windowActions.switchWindow(blotterUrl);
    blotterModel.waitForFirstRowDealIdUpdate(firstRowDealId);
    const newFirstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal(newFirstRowDealId);

    windowActions.switchWindow(tradeCaptureUrl);
    const fwdfwdDealId = e2e.getDealId();
    const fwdfwdDealAmount2 = dealModel.getAmount2();
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    expect(fwdfwdDealAmount2).to.equal(blotterModel.getAmount(fwdfwdDealId));

    blotterSearchModel.showBlotterSearch();
    popUpNavModel.closePopUpMessage();
    expect(blotterSearchModel.verifyBlotterSearchVisible()).to.equal(true);
    blotterSearchModel.searchDealIdByKeys(fwdfwdDealId);
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.waitForFirstRowDealIdUpdate(fwdfwdDealId);
    expect(blotterExModel.waitForRowCountToEqualOne(MATCHER)).to.equal(true);
    expect(parseFloat(blotterModel.getAmount(fwdfwdDealId))).to.equal(parseFloat(fwdfwdDealAmount2));
  }).timeout(120000);

  it('C31128 Verify Blotter Real Time Update for Investigation Flag update & text colour', () => {
    blotterModel.waitForGrid();
    blotterModel.showTodaysDeals();
    const blotterUrl = windowActions.getUrl();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(false);
    blotterExModel.checkUnderInvestigationFlag(newDealId);
    blotterRtuModel.waitForInvestigationFlagCheck(newDealId);
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(true);
    const colourYellow = 'rgb(255, 191, 0)';
    expect(blotterModel.verifyRowTextColour(newDealId, colourYellow)).to.equal(true);
    blotterExModel.unCheckUnderInvestigationFlag(newDealId);
    blotterRtuModel.waitForInvestigationFlagUncheck(newDealId);
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(false);
  }).timeout(120000);

  it('C31129 Verify Persistence of Investigation Flag across logins', () => {
    blotterModel.waitForGrid();
    blotterModel.showTodaysDeals();
    const blotterUrl = windowActions.getUrl();

    windowActions.newWindow(Constants.NDFURL);
    windowActions.switchWindow(Constants.NDFURL);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue(instrument.VENUE_J);
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_C, '', instrument.TENOR_C, '6.2945', '100');
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_C, users.BROKER_J);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    const newDealId = e2e.getDealId();
    windowActions.closeCurrentTab();
    windowActions.switchWindow(blotterUrl);

    blotterExModel.checkUnderInvestigationFlag(newDealId);
    blotterRtuModel.waitForInvestigationFlagCheck(newDealId);
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(true);
    const hoverTextValue = blotterExModel.getInvestigationFlagHoverTextUpdate(newDealId);
    loginModel.changeUser(users.USER_A.UserName, users.USER_A.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(true);
    expect(blotterExModel.getInvestigationFlagHoverTextUpdate(newDealId)).to.equal(hoverTextValue);
    blotterExModel.unCheckUnderInvestigationFlag(newDealId);
    blotterRtuModel.waitForInvestigationFlagUncheck(newDealId);
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(false);

    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
    if (loginModel.verifyBlotterselected() !== true) {
      loginModel.selectBlotter();
    }
    expect(blotterModel.isUnderInvestigation(newDealId)).to.equal(false);
  }).timeout(120000);
});
