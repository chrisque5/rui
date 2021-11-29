/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const Logs = require('../core/utility/Logs.js');
const API = require('../models/blotter/BlotterApiModel');
const BlotterModel = require('../models/blotter/BlotterModel.js');
const BlotterRtuModel = require('../models/blotter/BlotterRtuModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const WindowActions = require('../core/actions/WindowActions.js');
const ClientTrader = require('../components/ndf/ClientTrader.js');

const LocalUsers = require('../data/UserDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const Constants = require('../data/Constants.js');

let users = null;
let ndfUrlConst = null;
let fwdUrlConst = null;
let sptUrlConst = null;
let blotterUrlConst = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    blotterUrlConst = Constants.BLOTTERURL;
    ndfUrlConst = Constants.NDFURL;
    fwdUrlConst = Constants.FWDURL;
    sptUrlConst = Constants.SPTURL;
    break;
  case 'QA':
    users = QaUsers;
    blotterUrlConst = Constants.BLOTTERURLQA;
    ndfUrlConst = Constants.NDFURL;
    fwdUrlConst = Constants.FWDURL;
    sptUrlConst = Constants.SPTURL;
    break;
  default:
    users = LocalUsers;
    blotterUrlConst = Constants.BLOTTERURL;
    ndfUrlConst = Constants.NDFURL;
    fwdUrlConst = Constants.FWDURL;
    sptUrlConst = Constants.SPTURL;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const log = new Logs();
const api = new API();
const blotterModel = new BlotterModel();
const blotterRtuModel = new BlotterRtuModel();
const popUpNavModel = new PopUpNavigationModel();
const windowActions = new WindowActions();
const clientTrader = new ClientTrader();

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  const windowUrl = windowActions.getUrl();
  if (windowUrl !== blotterUrlConst) {
    loginModel.openUrl(blotterUrlConst);
  }
  blotterModel.waitForGrid();
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  popUpNavModel.closePopUpMessage();
  expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
});

function moveToNdf() {
  loginModel.openUrl(ndfUrlConst);
  clientTrader.isPageLoadComplete();
  expect(loginModel.verifyNDFselected()).to.equal(true);
}

function moveToFwd() {
  loginModel.openUrl(fwdUrlConst);
  clientTrader.isPageLoadComplete();
  expect(loginModel.verifyFWDselected()).to.equal(true);
}

function moveToSpt() {
  loginModel.openUrl(sptUrlConst);
  clientTrader.isPageLoadComplete();
  expect(loginModel.verifySPTselected()).to.equal(true);
}

function moveToBlotter() {
  loginModel.selectBlotter();
  expect(loginModel.verifyBlotterselected()).to.equal(true);
}

describe('Page Navigation tests: Testing scenarios around navigating between DMS Web pages', () => {
  (ENV === 'LOCAL' ? it.skip : it)('C30751 Verify SSE does not attempt to connect when blotter count ≥ 5', () => {
    for (i = 0; i < 4; i += 1) {
      windowActions.newWindowByJScript(blotterUrlConst);
      windowActions.pause(1000);
    }
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
    let blotterCount = windowActions.getWindowHandles().length;
    expect(parseInt(blotterCount, 10)).to.equal(5);
    windowActions.newWindowByJScript(Constants.NDFURL);
    windowActions.switchWindow('NDF - DMSWeb');
    windowActions.openUrl(blotterUrlConst);
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Max Blotter Limit');
    const currentWindowHandle = windowActions.getWindowHandle();
    blotterCount = windowActions.getWindowHandles().length;
    expect(parseInt(blotterCount, 10)).to.be.greaterThan(5);
    handles = windowActions.getWindowHandles();
    windowActions.switchToWindow(handles[0]);
    loginModel.selectNDF();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    expect(loginModel.verifyNDFselected()).to.be.equal(true);
    windowActions.switchToWindow(currentWindowHandle);
    windowActions.refreshPage();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    expect(blotterRtuModel.verifyRtuIconColourGreen()).to.equal(true);
    blotterRtuModel.hoverRtuIcon();
    expect(blotterRtuModel.getRtuPopOvertext()).to.equal('Status: Connected');
    blotterCount = windowActions.getWindowHandles().length;
    windowActions.switchToWindow(handles[0]);
    expect(loginModel.verifyNDFselected()).to.be.equal(true);
    loginModel.selectBlotter();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Max Blotter Limit');
    expect(blotterRtuModel.verifyRtuIconColourRed()).to.equal(true);
    blotterRtuModel.hoverRtuIcon();
    expect(blotterRtuModel.getRtuPopOvertext()).to.equal('Status: Disconnected');
  }).timeout(600000);

  (ENV === 'QA' ? it.skip : it)('C30751 Verify SSE does not attempt to connect when blotter count ≥ 5', () => {
    for (i = 0; i < 4; i += 1) {
      windowActions.newWindowByJScript(blotterUrlConst);
      windowActions.pause(1000);
    }
    expect(popUpNavModel.verifyNoPopUpMessage()).to.equal(true);
    const jSessionId = windowActions.getCurrentJsessionId();
    let blotterCount = api.getBlotterCount(jSessionId);
    expect(parseInt(blotterCount, 10)).to.equal(5);
    windowActions.newWindowByJScript(Constants.NDFURL);
    windowActions.switchWindow('NDF - DMSWeb');
    windowActions.openUrl(blotterUrlConst);
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Max Blotter Limit');
    const currentWindowHandle = windowActions.getWindowHandle();
    blotterCount = api.getBlotterCount(jSessionId);
    expect(parseInt(blotterCount, 10)).to.equal(5);
    const handles = windowActions.getWindowHandles();
    log.log(handles);
    windowActions.switchToWindow(handles[0]);
    loginModel.selectNDF();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    expect(loginModel.verifyNDFselected()).to.be.equal(true);
    windowActions.pause(1000);
    blotterCount = api.getBlotterCount(jSessionId);
    expect(parseInt(blotterCount, 10)).to.equal(4);
    windowActions.switchToWindow(currentWindowHandle);
    windowActions.refreshPage();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    expect(blotterRtuModel.verifyRtuIconColourGreen()).to.equal(true);
    blotterRtuModel.hoverRtuIcon();
    expect(blotterRtuModel.getRtuPopOvertext()).to.equal('Status: Connected');
    blotterCount = api.getBlotterCount(jSessionId);
    expect(parseInt(blotterCount, 10)).to.equal(5);
    windowActions.switchToWindow(handles[0]);
    expect(loginModel.verifyNDFselected()).to.be.equal(true);
    loginModel.selectBlotter();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Max Blotter Limit');
    blotterCount = api.getBlotterCount(jSessionId);
    expect(parseInt(blotterCount, 10)).to.equal(5);
    expect(blotterRtuModel.verifyRtuIconColourRed()).to.equal(true);
    blotterRtuModel.hoverRtuIcon();
    expect(blotterRtuModel.getRtuPopOvertext()).to.equal('Status: Disconnected');
  }).timeout(600000);

  it('C31153 Verify open login tabs are refreshed when user logs in', () => {
    windowActions.newWindowByJScript(ndfUrlConst);
    moveToBlotter();
    moveToSpt();
    moveToNdf();
    moveToFwd();
    windowActions.switchWindow(blotterUrlConst);

    windowActions.newWindowByJScript(fwdUrlConst);
    moveToBlotter();
    moveToFwd();
    moveToNdf();
    moveToSpt();
    windowActions.switchWindow(blotterUrlConst);

    windowActions.newWindowByJScript(sptUrlConst);
    moveToBlotter();
    moveToFwd();
    moveToSpt();
    moveToNdf();
    windowActions.switchWindow(blotterUrlConst);

    let handles = windowActions.getWindowHandles();
    windowActions.switchToWindow(handles[2]);
    moveToBlotter();
    windowActions.switchToWindow(handles[1]);
    moveToBlotter();
    windowActions.switchToWindow(handles[0]);
    moveToSpt();
    moveToBlotter();
    windowActions.switchToWindow(handles[3]);
    moveToBlotter();
    loginModel.logoutWithoutConfirm();
    windowActions.pause(3000);
    handles = windowActions.getWindowHandles();
    expect(handles.length).to.be.greaterThan(1);
    windowActions.switchToWindow(handles[0]);
    expect(loginModel.isLoginPageReload()).to.equal(true);
    windowActions.switchToWindow(handles[1]);
    expect(loginModel.isLoginPageReload()).to.equal(true);
    loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
    windowActions.switchToWindow(handles[0]);
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    windowActions.switchToWindow(handles[1]);
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    windowActions.closeCurrentTab();
  }).timeout(600000);
});
