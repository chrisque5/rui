/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const BlotterModel = require('../../models/blotter/BlotterModel.js');
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const Logs = require('../../core/utility/Logs.js');
const SharedStore = require('../../core/store/SharedStore.js');
const WindowActions = require('../../core/actions/WindowActions.js');
const API = require('../../models/blotter/BlotterApiModel');

const LocalUsers = require('../../data/UserDetails.js');
const LocalInstrument = require('../../data/InstrumentDetails.js');
const QaUsers = require('../../data/qa/UserDetails.js');
const QaInstrument = require('../../data/qa/InstrumentDetails.js');
const QaFwdUsers = require('../../data/qa/fwd/UserDetails.js');
const QaFwdInstrument = require('../../data/qa/fwd/InstrumentDetails.js');
const FwdUsers = require('../../data/fwd/UserDetails.js');
const FwdInstrument = require('../../data/fwd/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');
const BlotterData = require('../../data/blotter/BlotterData.js');
const BlotterDealCreation = require('./fx.deals.spec.js');

let users = null;
let instrument = null;
let fwdUsers = null;
let fwdInstrument = null;
let blotterUrlConst = null;
const dmsLoginPage = null;

let deal04Id = '';
let deal05Id = '';
let deal06Id = '';
let deal08Id = '';
let deal10Id = '';
let deal13Id = '';
let deal15Id = '';
let deal16Id = '';
let deal16PayerStpDetails = '';
let deal16ReceiverStpDetails = '';

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdUsers = QaFwdUsers;
    fwdInstrument = QaFwdInstrument;
    blotterUrlConst = Constants.BLOTTERURLQA;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    blotterUrlConst = Constants.BLOTTERURL;
    break;
}

const blotterModel = new BlotterModel();
const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const sharedStore = new SharedStore();
const windowActions = new WindowActions();
const api = new API();

let deal = null;
let dateFormat = '';

function storeDeals() {
  deal.deal01Id();
  deal.deal03Id();
  deal.deal04Id();
  deal.deal05Id();
  deal.deal06Id();
  deal.deal08Id();
  deal.deal10Id();
  deal.deal13Id();
  deal.deal15Id();
  deal.deal16Id();
  deal04Id = sharedStore.getValueFromStore('deal04Id');
  deal05Id = sharedStore.getValueFromStore('deal05Id');
  deal06Id = sharedStore.getValueFromStore('deal06Id') ? sharedStore.getValueFromStore('deal06Id').toString() : '';
  deal08Id = sharedStore.getValueFromStore('deal08Id') ? sharedStore.getValueFromStore('deal08Id').toString() : '';
  deal10Id = sharedStore.getValueFromStore('deal10Id');
  deal13Id = sharedStore.getValueFromStore('deal13Id');
  deal15Id = sharedStore.getValueFromStore('deal15Id');
  deal16Id = sharedStore.getValueFromStore('deal16Id');
  deal16PayerStpDetails = sharedStore.getValueFromStore('deal16PayerStpDetails');
  deal16ReceiverStpDetails = sharedStore.getValueFromStore('deal16ReceiverStpDetails');
  deal.printAllDeals();
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
  deal = new BlotterDealCreation();
  if (Constants.ENV === 'LOCAL') {
    storeDeals();
  }
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(blotterUrlConst);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  popUpNavModel.closePopUpMessage();
  expect(loginModel.verifyBlotterselected(blotterUrlConst)).to.equal(true);
});

(Constants.ENV === 'LOCAL' ? describe : describe.skip)('Blotter STP: Testing local STP status displayed in Blotter', () => {
  function splitValues(string) {
    const values = string ? string.split('@@') : {};
    const stpDetails = {
      DealEntityId: values[0],
      StrategyId: values[1].split('||')[0],
      ChainId: values[1].split('||')[1],
    };
    return stpDetails;
  }

  it('C28654 Verify STP Status for Deal 04 are Payer: ACKFAILURE, Receiver: NOSTP', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal04Id)).to.equal(BlotterData.STP_UNDEFINED.Colour);
    expect(blotterModel.checkSellerStpStatus(deal04Id)).to.equal(BlotterData.STP_UNDEFINED.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal04Id)).to.equal(BlotterData.STP_UNDEFINED.Status_A);
    expect(blotterModel.checkSellerStpTitle(deal04Id)).to.equal(BlotterData.STP_UNDEFINED.Status_B);
  }).timeout(30000);

  it('C28655 Verify STP Status for Deal 05 are Payer: ERROR, Receiver: NOTSENT', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal05Id)).to.equal(BlotterData.STP_UNDEFINED.Colour);
    expect(blotterModel.checkSellerStpStatus(deal05Id)).to.equal(BlotterData.STP_UNDEFINED.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal05Id)).to.equal(BlotterData.STP_UNDEFINED.Status_C);
    expect(blotterModel.checkSellerStpTitle(deal05Id)).to.equal(BlotterData.STP_UNDEFINED.Status_D);
  }).timeout(30000);

  it('C28656 Verify STP Status for Deal 06 are Payer: UNKNOWN, Receiver: TMMSENDPENDING', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal06Id)).to.equal(BlotterData.STP_DARKGRAY.Colour);
    expect(blotterModel.checkSellerStpStatus(deal06Id)).to.equal(BlotterData.STP_UNDEFINED.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal06Id)).to.equal(BlotterData.STP_DARKGRAY.Status_A);
    expect(blotterModel.checkSellerStpTitle(deal06Id)).to.equal(BlotterData.STP_UNDEFINED.Status_E);
  }).timeout(30000);

  it('C28657 Verify STP Status for Deal 08 are Payer: PICKEDUP, Receiver: CONFIRM', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal08Id)).to.equal(BlotterData.STP_YELLOW.Colour);
    expect(blotterModel.checkSellerStpStatus(deal08Id)).to.equal(BlotterData.STP_GREEN.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal08Id)).to.equal(BlotterData.STP_YELLOW.Status_C);
    expect(blotterModel.checkSellerStpTitle(deal08Id)).to.equal(BlotterData.STP_GREEN.Status_C);
  }).timeout(30000);

  it('C28658 Verify STP Status for Deal 10 are Payer: DELIVERED, Receiver: WITHDRAWN', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal10Id)).to.equal(BlotterData.STP_YELLOW.Colour);
    expect(blotterModel.checkSellerStpStatus(deal10Id)).to.equal(BlotterData.STP_RED.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal10Id)).to.equal(BlotterData.STP_YELLOW.Status_A);
    expect(blotterModel.checkSellerStpTitle(deal10Id)).to.equal(BlotterData.STP_RED.Status_D);
  }).timeout(30000);

  it('C28659 Verify STP Status for Deal 13 are Payer: CANCELLED, Receiver: AFFIRMED', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal13Id)).to.equal(BlotterData.STP_RED.Colour);
    expect(blotterModel.checkSellerStpStatus(deal13Id)).to.equal(BlotterData.STP_GREEN.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal13Id)).to.equal(BlotterData.STP_RED.Status_A);
    expect(blotterModel.checkSellerStpTitle(deal13Id)).to.equal(BlotterData.STP_GREEN.Status_A);
  }).timeout(30000);

  it('C28660 Verify STP Status for Deal 15 are Payer: TMMSENT, Receiver: TMMSENDFAILURE', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal15Id)).to.equal(BlotterData.STP_LIGHTGRAY.Colour);
    expect(blotterModel.checkSellerStpStatus(deal15Id)).to.equal(BlotterData.STP_BLACK.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal15Id)).to.equal(BlotterData.STP_LIGHTGRAY.Status_A);
    expect(blotterModel.checkSellerStpTitle(deal15Id)).to.equal(BlotterData.STP_BLACK.Status_A);
  }).timeout(30000);

  it('C28661 Verify STP Status for Deal 16 are Payer: REJECT, Receiver: PENDING', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal16Id)).to.equal(BlotterData.STP_RED.Colour);
    expect(blotterModel.checkSellerStpStatus(deal16Id)).to.equal(BlotterData.STP_YELLOW.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal16Id)).to.equal(BlotterData.STP_RED.Status_B);
    expect(blotterModel.checkSellerStpTitle(deal16Id)).to.equal(BlotterData.STP_YELLOW.Status_B);
  }).timeout(30000);

  it('C28662 Verify changing STP Status for Deal 16 to Payer: CONFIRM, Receiver: CONFIRM', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal16Id)).to.equal(BlotterData.STP_RED.Colour);
    expect(blotterModel.checkSellerStpStatus(deal16Id)).to.equal(BlotterData.STP_YELLOW.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal16Id)).to.equal(BlotterData.STP_RED.Status_B);
    expect(blotterModel.checkSellerStpTitle(deal16Id)).to.equal(BlotterData.STP_YELLOW.Status_B);

    const jSessionId = windowActions.getCurrentJsessionId();
    const payer = splitValues(deal16PayerStpDetails);
    const receiver = splitValues(deal16ReceiverStpDetails);

    api.setStpStatusWithStpChainId(jSessionId, payer.DealEntityId, payer.StrategyId, BlotterData.CONFIRM, payer.ChainId);
    api.setStpStatusWithStpChainId(jSessionId, receiver.DealEntityId, receiver.StrategyId, BlotterData.CONFIRM, receiver.ChainId);

    blotterModel.showTodaysDeals();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    expect(blotterModel.checkBuyerStpStatus(deal16Id)).to.equal(BlotterData.STP_GREEN.Colour);
    expect(blotterModel.checkSellerStpStatus(deal16Id)).to.equal(BlotterData.STP_GREEN.Colour);
    expect(blotterModel.checkBuyerStpTitle(deal16Id)).to.equal(BlotterData.STP_GREEN.Status_C);
    expect(blotterModel.checkSellerStpTitle(deal16Id)).to.equal(BlotterData.STP_GREEN.Status_C);
  }).timeout(30000);
});
