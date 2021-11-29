/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const AdminModel = require('../../models/admin/AdminModel.js');
const BrokerAdminModel = require('../../models/admin/BrokerAdminModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const WindowActions = require('../../core/actions/WindowActions.js');

const LocalNdfUsers = require('../../data/UserDetails.js');
const LocalFwdUsers = require('../../data/fwd/UserDetails.js');
const LocalSptUsers = require('../../data/spt/UserDetails.js');
const QaNdfUsers = require('../../data/qa/UserDetails.js');
const QaFwdUsers = require('../../data/qa/fwd/UserDetails.js');
const QaSptUsers = require('../../data/qa/spt/UserDetails.js');
const Constants = require('../../data/Constants.js');

let ndfUsers = null;
let fwdUsers = null;
let sptUsers = null;
let adminUrlConst = null;
let windowUrl = null;

const DMSWebBrokers = 'DMSWeb Broker List';
const AllBrokers = 'All Brokers';

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    ndfUsers = LocalNdfUsers;
    fwdUsers = LocalFwdUsers;
    sptUsers = LocalSptUsers;
    adminUrlConst = Constants.ADMINURL;
    break;
  case 'QA':
    ndfUsers = QaNdfUsers;
    fwdUsers = QaFwdUsers;
    sptUsers = QaSptUsers;
    adminUrlConst = Constants.ADMINURLQA;
    break;
  default:
    ndfUsers = LocalNdfUsers;
    fwdUsers = LocalFwdUsers;
    sptUsers = LocalSptUsers;
    adminUrlConst = Constants.ADMINURL;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const adminModel = new AdminModel();
const brokerAdmin = new BrokerAdminModel();
const popUpNavModel = new PopUpNavigationModel();
const windowActions = new WindowActions();

function moveToAdmin() {
  loginModel.selectAdmin();
  expect(adminModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToBrokersTab() {
  adminModel.selectBrokersTab();
  expect(adminModel.verifyBrokersTabActive()).to.be.equal(true);
}

function moveToNDF() {
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToFWD() {
  loginModel.selectFWD();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function moveToSPT() {
  loginModel.selectSPT();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
}

function verifyBrokerSetup() {
  brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
  expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
  if (brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers) !== true) {
    brokerAdmin.removeBrokerByClick(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);
    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();
  }
  if (brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C1.Name} - ${ndfUsers.ADDBROKER_C1.GCD_ID}`, DMSWebBrokers) !== true) {
    brokerAdmin.addBrokerByClick(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C1.Name} - ${sptUsers.ADDBROKER_C1.GCD_ID}`, DMSWebBrokers)).to.equal(true);
    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();
  }
  brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);
  expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);
  if (brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_B.Name} - ${ndfUsers.ADDBROKER_B.GCD_ID}`, AllBrokers) !== true) {
    brokerAdmin.removeBrokerByClick(`${fwdUsers.ADDBROKER_B.Name} - ${fwdUsers.ADDBROKER_B.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_B.Name} - ${sptUsers.ADDBROKER_B.GCD_ID}`, AllBrokers)).to.equal(true);
    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();
  }
  brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);
  expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);
  if (brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_Z.Name} - ${ndfUsers.ADDBROKER_Z.GCD_ID}`, AllBrokers) !== true) {
    brokerAdmin.selectAllBrokersToRemove();
    brokerAdmin.clickButtonRemove();
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_Z.Name} - ${sptUsers.ADDBROKER_Z.GCD_ID}`, AllBrokers)).to.equal(true);
    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();
  }
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(ndfUsers.ADMIN_A.UserName, ndfUsers.ADMIN_A.PassWord);
  moveToAdmin();
  moveToBrokersTab();
  brokerAdmin.clickRdoDealTypeNdf();
  brokerAdmin.verifyNdfDealTypeSelected();
  verifyBrokerSetup();
  brokerAdmin.clickRdoDealTypeFwd();
  verifyBrokerSetup();
  brokerAdmin.clickRdoDealTypeSpt();
  verifyBrokerSetup();
});

beforeEach(() => {
  windowUrl = windowActions.getUrl();
  if (windowUrl !== adminUrlConst) {
    moveToAdmin();
  }
  moveToBrokersTab();
});

/* ----- Functionality tests ----- */
describe('Broker Admin: Functionality tests', () => {
  it('C17730 Verify validation on Apply click with no desk selected', () => {
    windowActions.refreshPage();
    if (windowUrl !== adminUrlConst) {
      moveToAdmin();
    }
    moveToBrokersTab();
    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Validation Error');

    // TODO
    // add step to verify hover over Desks Dropdown
  });

  it('C17731 Verify Cancel click with desk selected and brokers selected and added to DMS Web', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    brokerAdmin.verifyNdfDealTypeSelected();
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnCancelClick();
    expect(brokerAdmin.getSelectedDesk()).to.equal('');
    expect(brokerAdmin.verifyAllBrokersListEmpty()).to.equal(true);
    expect(brokerAdmin.verifyDMSWebBrokersListEmpty()).to.equal(true);
  });

  it('C17742 Verify Cancel click with desk selected and brokers selected and removed from DMS Web', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.removeBrokerByClick(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnCancelClick();
    expect(brokerAdmin.getSelectedDesk()).to.equal('');
    expect(brokerAdmin.verifyAllBrokersListEmpty()).to.equal(true);
    expect(brokerAdmin.verifyDMSWebBrokersListEmpty()).to.equal(true);
  });

  it('C17743 Verify changing deal type from NDF to FWD with desk selected and brokers selected does not reset desk', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);

    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerToMoveNotChecked(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
  });

  it('C17744 Verify changing deal type from FWD to NDF with desk selected and brokers selected does not reset desk', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);

    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerToMoveNotChecked(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
  });

  it('C17745 Verify changing deal type from NDF to FWD with desk selected and brokers moved across resets transfer list but not desk choice', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.clickRdoDealTypeFwd();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerToMoveNotChecked(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);
  });

  it('C17746 Verify changing deal type from FWD to NDF with desk selected and brokers moved across resets transfer list but not desk choice', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.clickRdoDealTypeNdf();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerToMoveNotChecked(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);
  });

  it('C20738 Verify changing deal type from FWD to SPT with desk selected and brokers moved across resets transfer list but not desk choice', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.clickRdoDealTypeSpt();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerToMoveNotChecked(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);
  });

  it('C20739 Verify changing deal type from SPT to NDF with desk selected and brokers moved across resets transfer list but not desk choice', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.clickRdoDealTypeNdf();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerToMoveNotChecked(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);
  });

  it('C17747 Verify navigating to NDF tab resets the page', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    adminModel.moveToNdfNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    moveToAdmin();
    moveToBrokersTab();
    expect(brokerAdmin.getSelectedDesk()).to.equal('');
    expect(brokerAdmin.verifyAllBrokersListEmpty()).to.equal(true);
    expect(brokerAdmin.verifyDMSWebBrokersListEmpty()).to.equal(true);
  });

  it('C17748 Verify navigating to FWD tab resets the page', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    adminModel.moveToFwdNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    moveToAdmin();
    moveToBrokersTab();
    expect(brokerAdmin.getSelectedDesk()).to.equal('');
    expect(brokerAdmin.verifyAllBrokersListEmpty()).to.equal(true);
    expect(brokerAdmin.verifyDMSWebBrokersListEmpty()).to.equal(true);
  });

  it('C20740 Verify navigating to SPT tab resets the page', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    adminModel.moveToSptNoVerify();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    moveToAdmin();
    moveToBrokersTab();
    expect(brokerAdmin.getSelectedDesk()).to.equal('');
    expect(brokerAdmin.verifyAllBrokersListEmpty()).to.equal(true);
    expect(brokerAdmin.verifyDMSWebBrokersListEmpty()).to.equal(true);
  });

  it('CXXX Verify clicking Currencies tab with desk selected and brokers moved across resets selection', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.equal(true);
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.selectBrokerToMove(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerToMoveChecked(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`)).to.equal(true);
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    adminModel.selectCurrenciesTab();
    expect(adminModel.isModalConfirmVisible()).to.equal(true);
    adminModel.clickModalYes();
    expect(adminModel.verifyCurrenciesTabActive()).to.equal(true);
    moveToBrokersTab();
    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);
  });
});

/* ----- NDF Broker Tests ----- */

describe('Broker Admin: Add Brokers to NDF tests', () => {
  it('C17749 Add a broker using the mouse to an NDF Desk and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    moveToNDF();
    dealModel.selectBuyerBrokerName(ndfUsers.DESK_C, ndfUsers.ADDBROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${ndfUsers.DESK_C} / ${ndfUsers.ADDBROKER_C.Name}`);
  }).timeout(60000);

  it('C17750 Add a broker using the keyboard to an NDF Desk and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);

    brokerAdmin.addBrokerBySearch(ndfUsers.ADDBROKER_B.Name, ndfUsers.ADDBROKER_B.GCD_ID);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_B.Name} - ${ndfUsers.ADDBROKER_B.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);

    moveToNDF();
    dealModel.selectBuyerBrokerName(ndfUsers.DESK_B, ndfUsers.ADDBROKER_B.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${ndfUsers.DESK_B} / ${ndfUsers.ADDBROKER_B.Name}`);
  }).timeout(60000);

  it('C17751 Add a desk full of brokers to NDF and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);

    brokerAdmin.selectAllBrokersToAdd();
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_Z.Name} - ${ndfUsers.ADDBROKER_Z.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);

    moveToNDF();
    dealModel.selectBuyerBrokerName(ndfUsers.DESK_Z, ndfUsers.ADDBROKER_Z.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${ndfUsers.DESK_Z} / ${ndfUsers.ADDBROKER_Z.Name}`);
  }).timeout(60000);

  /* ----- Remove Brokers ----- */

  it('C17752 Remove a broker using the mouse from an NDF Desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.removeBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    moveToNDF();
    expect(dealModel.verifyBrokerNotInList(ndfUsers.DESK_C, ndfUsers.ADDBROKER_C.Name)).to.equal(true);
  }).timeout(60000);

  it('C17753 Remove a broker using the keyboard from an NDF Desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);

    brokerAdmin.removeBrokerBySearch(ndfUsers.ADDBROKER_B.Name, ndfUsers.ADDBROKER_B.GCD_ID);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_B.Name} - ${ndfUsers.ADDBROKER_B.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_B} - ${ndfUsers.DESKGCD_ID.DESK_B}`);

    moveToNDF();
    expect(dealModel.verifyBrokerNotInList(ndfUsers.DESK_B, ndfUsers.ADDBROKER_B.Name)).to.equal(true);
  }).timeout(60000);

  it('C17754 Remove a desk full of brokers from a NDF and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);

    brokerAdmin.selectAllBrokersToRemove();
    brokerAdmin.clickButtonRemove();
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_Z.Name} - ${ndfUsers.ADDBROKER_Z.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_Z} - ${ndfUsers.DESKGCD_ID.DESK_Z}`);

    moveToNDF();
    expect(dealModel.verifyDeskNotInList(ndfUsers.DESK_Z)).to.equal(true);
  }).timeout(60000);
});

/* ----- FWD Broker Tests ----- */

describe('Broker Admin: Add Brokers to FWD tests', () => {
  it('C17755 Add a broker using the mouse to a FWD Desk and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    moveToFWD();
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.ADDBROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${fwdUsers.DESK_C} / ${fwdUsers.ADDBROKER_C.Name}`);
  }).timeout(60000);

  it('C17756 Add a broker using the keyboard to a FWD Desk and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_B} - ${fwdUsers.DESKGCD_ID.DESK_B}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_B} - ${fwdUsers.DESKGCD_ID.DESK_B}`);

    brokerAdmin.addBrokerBySearch(fwdUsers.ADDBROKER_B.Name, fwdUsers.ADDBROKER_B.GCD_ID);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_B.Name} - ${fwdUsers.ADDBROKER_B.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_B} - ${fwdUsers.DESKGCD_ID.DESK_B}`);

    moveToFWD();
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_B, fwdUsers.ADDBROKER_B.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${fwdUsers.DESK_B} / ${fwdUsers.ADDBROKER_B.Name}`);
  }).timeout(60000);

  it('C17757 Add a desk full of brokers to FWD and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_Z} - ${fwdUsers.DESKGCD_ID.DESK_Z}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_Z} - ${fwdUsers.DESKGCD_ID.DESK_Z}`);

    brokerAdmin.selectAllBrokersToAdd();
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_Z.Name} - ${fwdUsers.ADDBROKER_Z.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_Z} - ${fwdUsers.DESKGCD_ID.DESK_Z}`);

    moveToFWD();
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_Z, fwdUsers.ADDBROKER_Z.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${fwdUsers.DESK_Z} / ${fwdUsers.ADDBROKER_Z.Name}`);
  }).timeout(60000);

  /* ----- Remove Brokers ----- */

  it('C17758 Remove a broker using the mouse from a FWD Desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.removeBrokerByClick(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    moveToFWD();
    expect(dealModel.verifyBrokerNotInList(fwdUsers.DESK_C, fwdUsers.ADDBROKER_C.Name)).to.equal(true);
  }).timeout(60000);

  it('C17759 Remove a broker using the keyboard from a FWD Desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_B} - ${fwdUsers.DESKGCD_ID.DESK_B}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_B} - ${fwdUsers.DESKGCD_ID.DESK_B}`);

    brokerAdmin.removeBrokerBySearch(fwdUsers.ADDBROKER_B.Name, fwdUsers.ADDBROKER_B.GCD_ID);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_B.Name} - ${fwdUsers.ADDBROKER_B.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_B} - ${fwdUsers.DESKGCD_ID.DESK_B}`);

    moveToFWD();
    expect(dealModel.verifyBrokerNotInList(fwdUsers.DESK_B, fwdUsers.ADDBROKER_B.Name)).to.equal(true);
  }).timeout(60000);

  it('C17760 Remove a desk full of brokers from a fwd and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_Z} - ${fwdUsers.DESKGCD_ID.DESK_Z}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_Z} - ${fwdUsers.DESKGCD_ID.DESK_Z}`);

    brokerAdmin.selectAllBrokersToRemove();
    brokerAdmin.clickButtonRemove();
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_Z.Name} - ${fwdUsers.ADDBROKER_Z.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_Z} - ${fwdUsers.DESKGCD_ID.DESK_Z}`);

    moveToFWD();
    expect(dealModel.verifyDeskNotInList(fwdUsers.DESK_Z)).to.equal(true);
  }).timeout(60000);
});

describe('Broker Admin: Add Brokers to SPT tests', () => {
  it('C20741 Add a broker using the mouse to a SPT Desk and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    moveToSPT();
    dealModel.selectBuyerBrokerName(sptUsers.DESK_C, sptUsers.ADDBROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${sptUsers.DESK_C} / ${sptUsers.ADDBROKER_C.Name}`);
  }).timeout(60000);

  it('C20742 Add a broker using the keyboard to a SPT Desk and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_B} - ${sptUsers.DESKGCD_ID.DESK_B}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_B} - ${sptUsers.DESKGCD_ID.DESK_B}`);

    brokerAdmin.addBrokerBySearch(sptUsers.ADDBROKER_B.Name, sptUsers.ADDBROKER_B.GCD_ID);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_B.Name} - ${sptUsers.ADDBROKER_B.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_B} - ${sptUsers.DESKGCD_ID.DESK_B}`);

    moveToSPT();
    dealModel.selectBuyerBrokerName(sptUsers.DESK_B, sptUsers.ADDBROKER_B.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${sptUsers.DESK_B} / ${sptUsers.ADDBROKER_B.Name}`);
  }).timeout(60000);

  it('C20743 Add a desk full of brokers to SPT and verify they appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_Z} - ${sptUsers.DESKGCD_ID.DESK_Z}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_Z} - ${sptUsers.DESKGCD_ID.DESK_Z}`);

    brokerAdmin.selectAllBrokersToAdd();
    brokerAdmin.clickButtonAdd();
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_Z.Name} - ${sptUsers.ADDBROKER_Z.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_Z} - ${sptUsers.DESKGCD_ID.DESK_Z}`);

    moveToSPT();
    dealModel.selectBuyerBrokerName(sptUsers.DESK_Z, sptUsers.ADDBROKER_Z.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${sptUsers.DESK_Z} / ${sptUsers.ADDBROKER_Z.Name}`);
  }).timeout(60000);

  /* ----- Remove Brokers ----- */

  it('C20745 Remove a broker using the mouse from a SPT Desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.removeBrokerByClick(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    moveToSPT();
    expect(dealModel.verifyBrokerNotInList(sptUsers.DESK_C, sptUsers.ADDBROKER_C.Name)).to.equal(true);
  }).timeout(60000);

  it('C20746 Remove a broker using the keyboard from a SPT Desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_B} - ${sptUsers.DESKGCD_ID.DESK_B}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_B} - ${sptUsers.DESKGCD_ID.DESK_B}`);

    brokerAdmin.removeBrokerBySearch(sptUsers.ADDBROKER_B.Name, sptUsers.ADDBROKER_B.GCD_ID);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_B.Name} - ${sptUsers.ADDBROKER_B.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_B} - ${sptUsers.DESKGCD_ID.DESK_B}`);

    moveToSPT();
    expect(dealModel.verifyBrokerNotInList(sptUsers.DESK_B, sptUsers.ADDBROKER_B.Name)).to.equal(true);
  }).timeout(60000);

  it('C20747 Remove a desk full of brokers from a SPT desk and verify they do not appear in the broker dropdown', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_Z} - ${sptUsers.DESKGCD_ID.DESK_Z}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_Z} - ${sptUsers.DESKGCD_ID.DESK_Z}`);

    brokerAdmin.selectAllBrokersToRemove();
    brokerAdmin.clickButtonRemove();
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_Z.Name} - ${sptUsers.ADDBROKER_Z.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_Z} - ${sptUsers.DESKGCD_ID.DESK_Z}`);

    moveToSPT();
    expect(dealModel.verifyDeskNotInList(sptUsers.DESK_Z)).to.equal(true);
  }).timeout(60000);
});

describe('Broker Admin: Moving multiple brokers across at once', () => {
  it('C17761 Add a broker to and simultaneously remove a broker from an NDF desk 1', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.removeBrokerByClick(`${ndfUsers.ADDBROKER_C1.Name} - ${ndfUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C1.Name} - ${ndfUsers.ADDBROKER_C1.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    moveToNDF();
    dealModel.selectBuyerBrokerName(ndfUsers.DESK_C, ndfUsers.ADDBROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${ndfUsers.DESK_C} / ${ndfUsers.ADDBROKER_C.Name}`);
    expect(dealModel.verifyBrokerNotInList(ndfUsers.DESK_C, ndfUsers.ADDBROKER_C1.Name)).to.equal(true);
  });

  it('C17762 Add a broker to and simultaneously remove a broker from an NDF desk 2', () => {
    brokerAdmin.clickRdoDealTypeNdf();
    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${ndfUsers.ADDBROKER_C1.Name} - ${ndfUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C1.Name} - ${ndfUsers.ADDBROKER_C1.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.removeBrokerByClick(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${ndfUsers.ADDBROKER_C.Name} - ${ndfUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyNdfDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${ndfUsers.DESK_C} - ${ndfUsers.DESKGCD_ID.DESK_C}`);

    moveToNDF();
    dealModel.selectBuyerBrokerName(ndfUsers.DESK_C, ndfUsers.ADDBROKER_C1.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${ndfUsers.DESK_C} / ${ndfUsers.ADDBROKER_C1.Name}`);
    expect(dealModel.verifyBrokerNotInList(ndfUsers.DESK_C, ndfUsers.ADDBROKER_C.Name)).to.equal(true);
  });

  it('C17763 Add a broker to and simultaneously remove a broker from a FWD desk 1', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.removeBrokerByClick(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    moveToFWD();
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.ADDBROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${fwdUsers.DESK_C} / ${fwdUsers.ADDBROKER_C.Name}`);
    expect(dealModel.verifyBrokerNotInList(fwdUsers.DESK_C, fwdUsers.ADDBROKER_C1.Name)).to.equal(true);
  });

  it('C17764 Add a broker to and simultaneously remove a broker from a FWD desk 2', () => {
    brokerAdmin.clickRdoDealTypeFwd();
    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C1.Name} - ${fwdUsers.ADDBROKER_C1.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.removeBrokerByClick(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${fwdUsers.ADDBROKER_C.Name} - ${fwdUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifyFwdDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${fwdUsers.DESK_C} - ${fwdUsers.DESKGCD_ID.DESK_C}`);

    moveToFWD();
    dealModel.selectBuyerBrokerName(fwdUsers.DESK_C, fwdUsers.ADDBROKER_C1.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${fwdUsers.DESK_C} / ${fwdUsers.ADDBROKER_C1.Name}`);
    expect(dealModel.verifyBrokerNotInList(fwdUsers.DESK_C, fwdUsers.ADDBROKER_C.Name)).to.equal(true);
  });

  it('C20750 Add a broker to and simultaneously remove a broker from a SPT desk 1', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.removeBrokerByClick(`${sptUsers.ADDBROKER_C1.Name} - ${sptUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C1.Name} - ${sptUsers.ADDBROKER_C1.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    moveToSPT();
    dealModel.selectBuyerBrokerName(sptUsers.DESK_C, sptUsers.ADDBROKER_C.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${sptUsers.DESK_C} / ${sptUsers.ADDBROKER_C.Name}`);
    expect(dealModel.verifyBrokerNotInList(sptUsers.DESK_C, sptUsers.ADDBROKER_C1.Name)).to.equal(true);
  });

  it('C20751 Add a broker to and simultaneously remove a broker from a SPT desk 2', () => {
    brokerAdmin.clickRdoDealTypeSpt();
    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);

    brokerAdmin.selectDeskByKeys(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    brokerAdmin.addBrokerByClick(`${sptUsers.ADDBROKER_C1.Name} - ${sptUsers.ADDBROKER_C1.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C1.Name} - ${sptUsers.ADDBROKER_C1.GCD_ID}`, DMSWebBrokers)).to.equal(true);

    brokerAdmin.removeBrokerByClick(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`);
    expect(brokerAdmin.verifyBrokerInList(`${sptUsers.ADDBROKER_C.Name} - ${sptUsers.ADDBROKER_C.GCD_ID}`, AllBrokers)).to.equal(true);

    brokerAdmin.btnApplyClick();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('DMSWeb Broker List');
    expect(popUpNavModel.getPopUpDescription()).to.be.equal('DMSWeb Broker List successfully updated');
    popUpNavModel.closePopUpMessage();

    expect(brokerAdmin.verifySptDealTypeSelected()).to.be.equal(true);
    expect(brokerAdmin.getSelectedDesk()).to.equal(`${sptUsers.DESK_C} - ${sptUsers.DESKGCD_ID.DESK_C}`);

    moveToSPT();
    dealModel.selectBuyerBrokerName(sptUsers.DESK_C, sptUsers.ADDBROKER_C1.Name);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${sptUsers.DESK_C} / ${sptUsers.ADDBROKER_C1.Name}`);
    expect(dealModel.verifyBrokerNotInList(sptUsers.DESK_C, sptUsers.ADDBROKER_C.Name)).to.equal(true);
  });
});
