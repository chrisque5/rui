/* eslint-disable max-len */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const path = require('path');
const xlsx = require('xlsx');
const BlotterModel = require('../../models/blotter/BlotterModel');
const BlotterExModel = require('../../models/blotter/BlotterExModel');
const DealModel = require('../../models/DealModel');
const LoginModel = require('../../models/LoginModel');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const Logs = require('../../core/utility/Logs');
const SharedStore = require('../../core/store/SharedStore');
const WindowActions = require('../../core/actions/WindowActions');
const BlotterDealCreation = require('./fx.deals.spec');
const ExcelReader = require('../../core/utility/ExcelReader');

const LocalUsers = require('../../data/UserDetails');
const QaUsers = require('../../data/qa/UserDetails');
const QaFwdUsers = require('../../data/qa/fwd/UserDetails');
const FwdUsers = require('../../data/fwd/UserDetails');
const Constants = require('../../data/Constants');
const BlotterData = require('../../data/blotter/BlotterData');

let users = null;
let fwdUsers = null;
let blotterUrlConst = null;
let dmsLoginPage = null;

let deal08Id = '';
let deal09Id = '';
let deal11Id = '';
let deal16Id = '';
let deal11Points = '';

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    fwdUsers = FwdUsers;
    blotterUrlConst = Constants.BLOTTERURL;
    dmsLoginPage = Constants.DMSWEBURL;
    break;
  case 'QA':
    users = QaUsers;
    fwdUsers = QaFwdUsers;
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
const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const sharedStore = new SharedStore();
const windowActions = new WindowActions();
const excelReader = new ExcelReader();
let deal = null;
let dateFormat = '';
const MATCHER = /(^\d+)(.+$)/i;

function storeDeals() {
  deal.deal08Id();
  deal.deal09Id();
  deal.deal11Id();
  deal.deal16Id();
  deal08Id = sharedStore.getValueFromStore('deal08Id') ? sharedStore.getValueFromStore('deal08Id').toString() : '';
  deal09Id = sharedStore.getValueFromStore('deal09Id');
  deal11Id = sharedStore.getValueFromStore('deal11Id');
  deal16Id = sharedStore.getValueFromStore('deal16Id');
  deal11Points = sharedStore.getValueFromStore('deal11Points');
  deal.printAllDeals();
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
  deal = new BlotterDealCreation();
  storeDeals();
});

beforeEach(() => {
  loginModel.openUrl(blotterUrlConst);
  dateFormat = dealModel.getDateFormat();
  expect(loginModel.verifyBlotterselected()).to.equal(true);
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
  popUpNavModel.closePopUpMessage();
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

describe('Blotter: Reading and verifying deal data from the Blotter grid', () => {
  it('C18996 Log in as belfasttpeur3 and verify user cannot view Blotter tab', () => {
    loginModel.changeUser(users.USER_C.UserName, users.USER_C.PassWord);
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_C.FullName);
    expect(loginModel.verifyBlotterTabVisible()).to.equal(false);
    loginModel.openUrl(blotterUrlConst);
    expect(loginModel.verifyInsufficientPermissions()).to.equal(true);
    loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
  }).timeout(36000);

  it('C23903 Verify Blotter opens in same browser tab with menu bar', () => {
    loginModel.selectNDF();
    const tradeCaptureUrl = windowActions.getUrl();
    loginModel.selectBlotter();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    const blotterUrl = windowActions.getUrl();
    expect(blotterUrl).to.not.equal(tradeCaptureUrl);
    expect(loginModel.verifyBlotterTabVisible()).to.equal(true);
    expect(loginModel.verifyNdfTabVisible()).to.equal(true);
    expect(loginModel.verifyFwdTabVisible()).to.equal(true);
    expect(loginModel.verifySptTabVisible()).to.equal(true);
  }).timeout(180000);

  it('C20698 Verify pinning columns left and right', () => {
    blotterModel.waitForGrid();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    expect(blotterModel.verifyNoColumnPinnedLeft()).to.equal(true);
    expect(blotterModel.verifyNoColumnPinnedRight()).to.equal(true);

    blotterModel.pinColumnLeft(BlotterData.Strategy.Header, BlotterData.Strategy.ColId);
    blotterModel.pinColumnLeft(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId);
    blotterModel.pinColumnLeft(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId);
    blotterModel.pinColumnRight(BlotterData.DealStatus.Header, BlotterData.DealStatus.ColId);
    blotterModel.pinColumnRight(BlotterData.DealType.Header, BlotterData.DealType.ColId);

    expect(blotterModel.verifyNoColumnPinnedLeft()).to.equal(false);
    expect(blotterModel.verifyNoColumnPinnedRight()).to.equal(false);
    expect(blotterModel.isPinnedLeft(BlotterData.Strategy.Header, BlotterData.Strategy.ColId)).to.equal(true);
    expect(blotterModel.isPinnedLeft(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId)).to.equal(true);
    expect(blotterModel.isPinnedLeft(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId)).to.equal(true);
    expect(blotterModel.isPinnedRight(BlotterData.DealStatus.Header, BlotterData.DealStatus.ColId)).to.equal(true);
    expect(blotterModel.isPinnedRight(BlotterData.DealType.Header, BlotterData.DealType.ColId)).to.equal(true);

    blotterModel.unpinColumn(BlotterData.Strategy.Header, BlotterData.Strategy.ColId); // left
    blotterModel.unpinColumn(BlotterData.DealStatus.Header, BlotterData.DealStatus.ColId); // right
    expect(blotterModel.verifyNoColumnPinnedLeft()).to.equal(false);
    expect(blotterModel.verifyNoColumnPinnedRight()).to.equal(false);
    expect(blotterModel.isPinnedLeft(BlotterData.Strategy.Header, BlotterData.Strategy.ColId)).to.equal(false);
    expect(blotterModel.isPinnedRight(BlotterData.DealStatus.Header, BlotterData.DealStatus.ColId)).to.equal(false);

    blotterModel.resetColumns(BlotterData.DealAction.Header, BlotterData.DealAction.ColId); // use a column header here that is not hidden
    expect(blotterModel.verifyNoColumnPinnedLeft()).to.equal(true);
    expect(blotterModel.verifyNoColumnPinnedRight()).to.equal(true);
    expect(blotterModel.isPinnedLeft(BlotterData.Strategy.Header, BlotterData.Strategy.ColId)).to.equal(false);
    expect(blotterModel.isPinnedLeft(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId)).to.equal(false);
    expect(blotterModel.isPinnedLeft(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId)).to.equal(false);
    expect(blotterModel.isPinnedRight(BlotterData.DealStatus.Header, BlotterData.DealStatus.ColId)).to.equal(false);
    expect(blotterModel.isPinnedRight(BlotterData.DealType.Header, BlotterData.DealType.ColId)).to.equal(false);
  }).timeout(600000);

  it('C20699 Verify Expand/Contract preceeds pinning columns left and right', () => {
    blotterModel.waitForGrid();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    expect(blotterModel.verifyNoColumnPinnedLeft()).to.equal(true);
    expect(blotterModel.verifyNoColumnPinnedRight()).to.equal(true);

    blotterModel.pinColumnLeft(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId);
    blotterModel.pinColumnLeft(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId);
    expect(blotterModel.isPinnedLeft(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId)).to.equal(true);
    expect(blotterModel.isPinnedLeft(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId)).to.equal(true);

    blotterModel.clickDealExpand();
    blotterModel.pinColumnRight(BlotterData.ChainRef.Header, BlotterData.ChainRef.ColId);
    expect(blotterModel.isPinnedRight(BlotterData.ChainRef.Header, BlotterData.ChainRef.ColId)).to.equal(true);

    blotterModel.clickDealContract();
    expect(blotterModel.isNotPinnedRight(BlotterData.ChainRef.Header, BlotterData.ChainRef.ColId)).to.equal(true);
    expect(blotterModel.verifyColumnHidden(BlotterData.ChainRef.Header, BlotterData.ChainRef.ColId)).to.equal(true);

    blotterModel.clickDealExpand();
    expect(blotterModel.verifyColumnHidden(BlotterData.ChainRef.Header, BlotterData.ChainRef.ColId)).to.equal(false);

    blotterModel.resetColumns(BlotterData.DealAction.Header, BlotterData.DealAction.ColId);
    expect(blotterModel.verifyNoColumnPinnedLeft()).to.equal(true);
    expect(blotterModel.verifyNoColumnPinnedRight()).to.equal(true);
    expect(blotterModel.isPinnedLeft(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId)).to.equal(false);
    expect(blotterModel.isPinnedRight(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId)).to.equal(false);
    expect(blotterModel.isPinnedRight(BlotterData.ChainRef.Header, BlotterData.ChainRef.ColId)).to.equal(false);
    blotterModel.clickDealContract();
  }).timeout(600000);

  it('C20700 Filtering multiple columns by cell values', () => {
    let newRowCount = '';
    let filteredRows = '';
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    const rowCount = blotterModel.getRowCount();
    deal08Strategy = blotterModel.getStrategy(deal08Id);
    blotterModel.filterColumnByCellValue(BlotterData.Strategy.Header, BlotterData.Strategy.ColId, deal08Strategy);
    blotterModel.filterColumnByCellValue(BlotterData.BuyerApp.Header, BlotterData.BuyerApp.ColId, 'APPROVED');

    blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount);
    newRowCount = blotterModel.getRowCount().split(' of ');
    filteredRows = blotterModel.getFilteredRows();

    expect(rowCount).to.not.equal(newRowCount[0]);
    expect(newRowCount[0]).to.equal(filteredRows);
    expect(blotterModel.verifyFilteredCells(newRowCount[0], BlotterData.Strategy.Header, BlotterData.Strategy.ColId, deal08Strategy)).to.equal(true);
    expect(blotterModel.verifyFilteredCells(newRowCount[0], BlotterData.BuyerApp.Header, BlotterData.BuyerApp.ColId, 'APPROVED')).to.equal(true);

    blotterModel.removeColumnFilter(BlotterData.Strategy.Header, BlotterData.Strategy.ColId);
    blotterModel.removeColumnFilter(BlotterData.BuyerApp.Header, BlotterData.BuyerApp.ColId);

    blotterExModel.waitForRowCountToUpdate(MATCHER, newRowCount[0]);
    expect(rowCount).to.equal(blotterModel.getRowCount());
  }).timeout(120000);

  it('C20701 Verify filter icon no longer visibile on clicking Today when filters are active', () => {
    let newRowCount = '';
    let filteredRows = '';
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    const rowCount = blotterModel.getRowCount();
    deal08Strategy = blotterModel.getStrategy(deal08Id);
    // deal08Strategy = 'NDF.USD.CNH.1M';
    blotterModel.filterColumnByCellValue(BlotterData.Strategy.Header, BlotterData.Strategy.ColId, deal08Strategy);

    blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount);
    newRowCount = blotterModel.getRowCount().split(' of ');
    filteredRows = blotterModel.getFilteredRows();

    expect(rowCount).to.not.equal(newRowCount[0]);
    expect(newRowCount[0]).to.equal(filteredRows);
    expect(blotterExModel.verifyFilterIconVisible(BlotterData.Strategy.ColId)).to.equal(true);

    blotterModel.showTodaysDeals();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    expect(rowCount).to.equal(blotterModel.getRowCount());
    expect(blotterExModel.verifyFilterIconNotVisible(BlotterData.Strategy.ColId)).to.equal(true);
  }).timeout(120000);

  it('C31546 Verify Deal ID and Deal Type columns cannot be hidden', () => {
    blotterModel.waitForGrid();
    expect(blotterModel.verifyHideColumnDisabled(BlotterData.DealId.Header, BlotterData.DealId.ColId)).to.equal(true);
    expect(blotterModel.verifyHideColumnDisabled(BlotterData.DealType.Header, BlotterData.DealType.ColId)).to.equal(true);
  }).timeout(80000);

  it('C28677 Verify Show/Hide column groups funtionality', () => {
    blotterModel.waitForGrid();
    blotterModel.hideColumnGroup('Approvals');
    expect(blotterModel.verifyColumnGroupHidden('Approvals')).to.equal(true);

    blotterModel.showColumnGroup('Approvals');
    expect(blotterModel.verifyColumnGroupHidden('Approvals')).to.equal(false);

    blotterModel.hideColumnGroup('STP');
    expect(blotterModel.verifyColumnGroupHidden('STP')).to.equal(true);

    blotterModel.showColumnGroup('STP');
    expect(blotterModel.verifyColumnGroupHidden('STP')).to.equal(false);

    blotterModel.hideColumnGroup('Brokerage');
    expect(blotterModel.verifyColumnGroupHidden('Brokerage')).to.equal(true);

    blotterModel.showColumnGroup('Brokerage');
    expect(blotterModel.verifyColumnGroupHidden('Brokerage')).to.equal(false);
  }).timeout(80000);

  it('C20702 Verify Show/Hide columns functionality', () => {
    blotterModel.waitForGrid();
    blotterModel.hideColumn(BlotterData.Strategy.Header, BlotterData.Strategy.ColId);
    blotterModel.hideColumn(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId);
    expect(blotterModel.verifyColumnHidden(BlotterData.Strategy.Header)).to.equal(true);
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerBrokerage.Header)).to.equal(true);

    blotterModel.showColumn(BlotterData.Strategy.Header);
    expect(blotterModel.verifyColumnHidden(BlotterData.Strategy.Header)).to.equal(false);
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerBrokerage.Header)).to.equal(true);

    blotterModel.showColumn(BlotterData.BuyerBrokerage.Header);
    expect(blotterModel.verifyColumnHidden(BlotterData.Strategy.Header)).to.equal(false);
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerBrokerage.Header)).to.equal(false);
  }).timeout(120000);

  it('C31190 Verify searching for column then Show/Hide functionality', () => {
    blotterModel.waitForGrid();
    blotterModel.hideColumnBySearch(BlotterData.BuyerBrokerage.Header, BlotterData.BuyerBrokerage.ColId);
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerBrokerage.Header)).to.equal(true);

    blotterModel.showColumnBySearch(BlotterData.BuyerBrokerage.Header);
    expect(blotterModel.verifyColumnHidden(BlotterData.BuyerBrokerage.Header)).to.equal(false);
  }).timeout(120000);

  it('C20796 Verify Blotter updates on Update Blotter click', () => {
    blotterModel.waitForGrid();
    const lastUpdated = blotterModel.getLastUpdated();
    let newLastUpdated = '';
    browser.pause(1000);
    blotterModel.showTodaysDeals();
    blotterModel.waitForGrid();
    newLastUpdated = blotterModel.getLastUpdated();
    log.log(`lastUpdated = ${lastUpdated}`);
    log.log(`newLastUpdated = ${newLastUpdated}`);
    expect(lastUpdated).to.not.equal(newLastUpdated);
  }).timeout(60000);

  it('C22206 Verify user can export visible columns in Blotter to Excel File', () => {
    windowActions.refreshPage();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    popUpNavModel.closePopUpMessage();
    blotterExModel.createDownloadDirectory(global.downloadDir);
    blotterModel.waitForGrid();

    if (blotterExModel.verifyDownloadDirectoryExists(global.downloadDir)) {
      blotterExModel.exportVisibleColumnsExcelFile();
    }

    try {
      expect(blotterExModel.verifyDownloadDirectoryExists(path.join(global.downloadDir, 'export.xlsx'))).to.equal(true);
      const workbook = xlsx.readFile(path.join(global.downloadDir, 'export.xlsx'));
      const dealSheet = workbook.SheetNames;
      const sheetJson = xlsx.utils.sheet_to_json((workbook.Sheets[dealSheet[0]]));

      const deal09Contents = JSON.stringify(excelReader.getBlotterRowColumns(deal09Id, sheetJson));
      const deal16Contents = JSON.stringify(excelReader.getBlotterRowColumns(deal16Id, sheetJson));
      const deal11Contents = JSON.stringify(excelReader.getBlotterRowColumns(deal11Id, sheetJson));
      expect(deal09Contents).to.contain(deal09Id);
      expect(deal16Contents).to.contain(deal16Id);
      expect(deal11Contents).to.not.contain(deal11Points);
    } catch (error) {
      blotterExModel.removeDownloadDirectory(global.downloadDir);
      log.errorLog(`Error in assertions: ${error}`);
      expect(`File to exist in temp directory ${error}`).to.equal(true);
    }
    blotterExModel.removeDownloadDirectory(global.downloadDir);
  }).timeout(120000);

  it('C22207 Verify user can export Blotter to Excel File', () => {
    windowActions.refreshPage();
    expect(loginModel.verifyBlotterselected()).to.equal(true);
    popUpNavModel.closePopUpMessage();
    blotterExModel.createDownloadDirectory(global.downloadDir);
    blotterModel.waitForGrid();

    if (blotterExModel.verifyDownloadDirectoryExists(global.downloadDir)) {
      blotterExModel.exportAllColumnsExcelFile();
    }

    try {
      expect(blotterExModel.verifyDownloadDirectoryExists(path.join(global.downloadDir, 'export.xlsx'))).to.equal(true);
      const workbook = xlsx.readFile(path.join(global.downloadDir, 'export.xlsx'));
      const dealSheet = workbook.SheetNames;
      const sheetJson = xlsx.utils.sheet_to_json((workbook.Sheets[dealSheet[0]]));
      const deal09Contents = JSON.stringify(excelReader.getBlotterRowColumns(deal09Id, sheetJson));
      const deal08Contents = JSON.stringify(excelReader.getBlotterRowColumns(deal08Id, sheetJson));
      const deal11Contents = JSON.stringify(excelReader.getBlotterRowColumns(deal11Id, sheetJson));

      expect(deal09Contents).to.contain(deal09Id);
      expect(deal09Contents).to.contain(fwdUsers.CLIENT_A_BLOTTER);
      expect(deal09Contents).to.contain(fwdUsers.TRADER_A_BLOTTER);
      expect(deal09Contents).to.contain(fwdUsers.BROKER_D_BLOTTER);
      expect(deal09Contents).to.contain(fwdUsers.CLIENT_C_BLOTTER);
      expect(deal09Contents).to.contain(fwdUsers.TRADER_C_BLOTTER);
      expect(deal09Contents).to.contain(fwdUsers.BROKER_J_BLOTTER);

      expect(deal08Contents).to.contain(deal08Id);
      expect(deal08Contents).to.contain(fwdUsers.CLIENT_A_BLOTTER);
      expect(deal08Contents).to.contain(fwdUsers.TRADER_A_BLOTTER);
      expect(deal08Contents).to.contain(fwdUsers.BROKER_J_BLOTTER);
      expect(deal08Contents).to.contain(fwdUsers.CLIENT_B_BLOTTER);
      expect(deal08Contents).to.contain(fwdUsers.TRADER_B_BLOTTER);
      expect(deal08Contents).to.contain(fwdUsers.BROKER_D_BLOTTER);
      expect(deal11Contents).to.contain(deal11Points);
    } catch (error) {
      blotterExModel.removeDownloadDirectory(global.downloadDir);
      log.errorLog(`Error in assertions: ${error}`);
      expect(`File to exist in temp directory ${error}`).to.equal(true);
    }
    blotterExModel.removeDownloadDirectory(global.downloadDir);
  }).timeout(120000);

  it('C31168 Verify clicking Today button after browser refresh does not clear grid', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    const firstRowDealId = blotterModel.getFirstRowDealId();
    expect(firstRowDealId).to.not.equal('');
    windowActions.refreshPage();
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    blotterModel.showTodaysDeals();
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    expect(blotterModel.getFirstRowDealId()).to.equal(firstRowDealId);
  }).timeout(120000);

  it('C31186 Reorder Columns & verify reset columns restores original ordering', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterModel.resetColumns(BlotterData.DealAction.Header, BlotterData.DealAction.ColId);
    const columns = blotterExModel.getBlotterColumns();
    blotterExModel.dragColumn(BlotterData.DealType.Header, BlotterData.DealStatus.Header);
    blotterExModel.dragColumn(BlotterData.DealAction.Header, BlotterData.Strategy.Header);
    blotterExModel.dragColumn(BlotterData.DealId.Header, BlotterData.BuyerTrader.Header);
    // Refresh page as column position doesn't change on drag, uses aria-colindex instead
    windowActions.refreshPage();
    const columnsNewOrder = blotterExModel.getBlotterColumns();
    expect(JSON.stringify(columns)).to.not.equal(JSON.stringify(columnsNewOrder));
    blotterModel.resetColumns(BlotterData.DealAction.Header, BlotterData.DealAction.ColId);
    const columnsReset = blotterExModel.getBlotterColumns();
    expect(JSON.stringify(columns)).to.equal(JSON.stringify(columnsReset));
  }).timeout(120000);

  it('C31345 Verify clear all column filters from AG Grid column filter menu', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    let newRowCount = '';
    let filteredRows = '';
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    const rowCount = blotterModel.getRowCount();
    deal08Strategy = blotterModel.getStrategy(deal08Id);
    blotterModel.filterColumnByCellValue(BlotterData.Strategy.Header, BlotterData.Strategy.ColId, deal08Strategy);
    blotterModel.filterColumnByCellValue(BlotterData.BuyerApp.Header, BlotterData.BuyerApp.ColId, 'APPROVED');

    blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount);
    newRowCount = blotterModel.getRowCount().split(' of ');
    filteredRows = blotterModel.getFilteredRows();

    expect(rowCount).to.not.equal(newRowCount[0]);
    expect(newRowCount[0]).to.equal(filteredRows);
    expect(blotterModel.verifyFilteredCells(newRowCount[0], BlotterData.Strategy.Header, BlotterData.Strategy.ColId, deal08Strategy)).to.equal(true);
    expect(blotterModel.verifyFilteredCells(newRowCount[0], BlotterData.BuyerApp.Header, BlotterData.BuyerApp.ColId, 'APPROVED')).to.equal(true);

    blotterModel.clearAllColumnFiltersFromMenu(BlotterData.Strategy.Header, BlotterData.Strategy.ColId);
    blotterExModel.waitForRowCountToUpdate(MATCHER, newRowCount[0]);
    expect(rowCount).to.equal(blotterModel.getRowCount());
  }).timeout(120000);

  it('C31346 Verify clear all column filters from right click context menu', () => {
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    let newRowCount = '';
    let filteredRows = '';
    expect(blotterModel.waitForOverlayNotVisible()).to.equal(true);
    blotterModel.waitForGrid();
    blotterExModel.waitForRowCountToUpdate(MATCHER, 0);
    const rowCount = blotterModel.getRowCount();
    blotterModel.filterColumnByCellValue(BlotterData.DealType.Header, BlotterData.DealType.ColId, 'FWD');
    blotterModel.filterColumnByCellValue(BlotterData.BuyerCust.Header, BlotterData.BuyerCust.ColId, fwdUsers.CLIENT_A_BLOTTER);

    blotterExModel.waitForRowCountToUpdate(MATCHER, rowCount);
    newRowCount = blotterModel.getRowCount().split(' of ');
    filteredRows = blotterModel.getFilteredRows();

    expect(rowCount).to.not.equal(newRowCount[0]);
    expect(newRowCount[0]).to.equal(filteredRows);
    expect(blotterModel.verifyFilteredCells(newRowCount[0], BlotterData.DealType.Header, BlotterData.DealType.ColId, 'FWD')).to.equal(true);
    expect(blotterModel.verifyFilteredCells(newRowCount[0], BlotterData.BuyerCust.Header, BlotterData.BuyerCust.ColId, fwdUsers.CLIENT_A_BLOTTER)).to.equal(true);

    blotterModel.clearAllColumnFiltersFromRightClick();
    blotterExModel.waitForRowCountToUpdate(MATCHER, newRowCount[0]);
    expect(rowCount).to.equal(blotterModel.getRowCount());
  }).timeout(120000);
});
