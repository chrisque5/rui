/* eslint-disable max-len */
/* eslint-disable no-undef */
const BlotterData = require('../../data/blotter/BlotterData.js');
const Logs = require('../../core/utility/Logs');
const ElementVisibility = require('../../core/element/ElementVisibility.js');
const LoginLogout = require('../../pageobjects/LoginLogoutPageObject');
const GridColumnObject = require('../../pageobjects/blotter/components/GridColumnPageObject');
const GridCellObject = require('../../pageobjects/blotter/components/GridCellPageObject');
const FilterPageObject = require('../../pageobjects/blotter/components/FilterPageObject');
const StopWatch = require('../../core/utility/StopWatch.js');
const ElementFinder = require('../../core/element/ElementFinder.js');
const {
  ClickActions,
  GetTextActions,
  KeyboardActions,
  InputActions,
  ElementActions,
  WindowActions,
} = require('../../core/actions/ActionsIndex.js');

class BlotterModel {
  constructor() {
    this.log = new Logs();
    this.elVisibility = new ElementVisibility();
    this.LoginLogout = new LoginLogout();
    this.gridPage = new GridColumnObject();
    this.gridCell = new GridCellObject();
    this.filterPage = new FilterPageObject();
    this.watch = new StopWatch();
    this.elFinder = new ElementFinder();
    this.clickActions = new ClickActions();
    this.textActions = new GetTextActions();
    this.keyboardActions = new KeyboardActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.windowActions = new WindowActions();
  }

  isOverlayClosed(elementObject) {
    if (elementObject === null || elementObject === undefined || this.elementActions.isDisplayed(elementObject) === false) {
      this.log.log('Given Element is closed.');
      return true;
    }
    return false;
  }

  waitForOverlayNotVisible() {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.isOverlayClosed(this.gridCell.mskOverlayWrapper()) === true) {
        this.log.log('Overlay mask is no longer visible.');
        return true;
      }
      this.log.log('Overlay mask is still visible in the DOM, waiting for it to close.');
    }
    this.log.log('Overlay mask is still visible in the DOM.');
    return false;
  }

  waitForGrid() {
    this.log.log('Waiting for grid');
    this.windowActions.pause(1000);
    this.elementActions.waitForDisplayed(this.gridCell.rowZeroCell(BlotterData.CheckFlag.ColId));
  }

  showTodaysDeals() {
    this.clickActions.clickByJScript(this.gridPage.btnShowToday());
  }

  reloadBlotterDealsAndMoveToGridLeft() {
    this.showTodaysDeals();
    for (let i = 0; i < 5; i += 1) {
      this.scrollLeft();
    }
  }

  clickDealExpand() {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderGroupNoCheck(BlotterData.DealGroup));
    this.clickActions.clickByJScript(this.gridPage.btnDealExpand());
  }

  clickDealContract() {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderGroupNoCheck(BlotterData.DealGroup));
    this.clickActions.clickByJScript(this.gridPage.btnDealContract());
  }

  clickColumnMenu(columnId) {
    this.clickActions.clickByJScript(this.gridPage.btnColumnMenu(columnId));
  }

  clickFilterTab() {
    this.clickActions.clickByJScript(this.gridPage.mnuFilterTab());
  }

  clickMenuTab() {
    this.clickActions.clickByJScript(this.gridPage.mnuMenuTab());
  }

  clickColumnsTab() {
    this.clickActions.clickByJScript(this.gridPage.mnuColumnsTab());
  }

  checkFilterTabSelected() {
    if (this.elementActions.getAttribute(this.gridPage.mnuFilterTabSelect(), 'class').includes('ag-tab-selected')) {
      return true;
    }
    return false;
  }

  checkMenuTabSelected() {
    if (this.elementActions.getAttribute(this.gridPage.mnuMenuTabSelect(), 'class').includes('ag-tab-selected')) {
      return true;
    }
    return false;
  }

  checkColumnsTabSelected() {
    if (this.elementActions.getAttribute(this.gridPage.mnuColumnsTabSelect(), 'class').includes('ag-tab-selected')) {
      return true;
    }
    return false;
  }

  filterColumnByCellValue(columnName, columnId, cellValue) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnId);
    if (!this.checkFilterTabSelected()) {
      this.clickFilterTab();
    }
    this.clearFilterSelectAll();
    this.log.log(`Value of cellValue = ${cellValue}`);
    this.enterFilterSearch(cellValue);
    this.clickFilterCheckbox(cellValue);
    this.clearFilterSearch();
    // to close menu
    this.clickFilterTab();
  }

  filterStpColumnByStatus(columnName, columnId, stpLabel) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnId);
    if (!this.checkFilterTabSelected()) {
      this.clickFilterTab();
    }
    this.clearFilterSelectAll();
    this.clickStpFilterCheckbox(stpLabel);
    // to close menu
    this.clickFilterTab();
  }

  removeColumnFilter(columnName, columnId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnId);
    if (!this.checkFilterTabSelected()) {
      this.clickFilterTab();
    }
    this.clearFilterSelection();
    // to close menu
    this.clickFilterTab();
  }

  clearAllColumnFiltersFromMenu(columnName, columnID) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnID);
    if (!this.checkMenuTabSelected()) {
      this.clickMenuTab();
    }
    this.clickClearColumnFilters();
  }

  clearAllColumnFiltersFromRightClick() {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealId.Header));
    this.clickActions.rightClick(this.gridCell.gridCellByRowIndex(0, BlotterData.DealId.ColId));
    this.clickActions.click(this.gridPage.mnuClearColumnFiltersContextMenu());
  }

  clearFilterSelectAll() {
    while (!this.elementActions.getAttribute(this.gridPage.chkFilterSelectAll(), 'class').includes('ag-icon-checkbox-unchecked')) {
      this.clickFilterSelectAll();
    }
  }

  clearFilterSelection() {
    while (!this.elementActions.getAttribute(this.gridPage.chkFilterSelectAll(), 'class').includes('ag-icon-checkbox-checked')) {
      this.clickFilterSelectAll();
    }
  }

  clickFilterSelectAll() {
    this.clickActions.clickByJScript(this.gridPage.chkFilterSelectAll());
  }

  clickFilterCheckbox(cellValue) {
    this.clickActions.clickByJScript(this.gridPage.chkFilterCheckbox(cellValue));
  }

  clickStpFilterCheckbox(stpLabel) {
    this.clickActions.clickByJScript(this.gridPage.chkStpFilterCheckbox(stpLabel));
  }

  enterFilterSearch(cellValue) {
    this.log.log(`Value of cellValue = ${cellValue}`);
    this.clickActions.clickByJScript(this.gridPage.txtFilterSearch());
    this.inputActions.inputValue(this.gridPage.txtFilterSearch(), cellValue);
  }

  clearFilterSearch() {
    this.clickActions.clickByJScript(this.gridPage.txtFilterSearch());
    this.inputActions.clearByBackSpace(30);
  }

  verifyFilteredCells(rowCount, columnHeader, columnId, cellValue) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnHeader));
    let increment = 1;
    if (rowCount > 20) { increment = 2; }
    for (let i = 0; i < rowCount; i += increment) {
      this.log.log(`Checking row ${i} of ${rowCount}`);
      if (!this.textActions.getTxt(this.gridCell.gridCellByRowIndex(i, columnId)) === cellValue) {
        this.log.log(`Row ${i} of ${rowCount} does not contain ${cellValue} please check again`);
        return false;
      }
    }
    return true;
  }

  enterQuickSearch(searchTerm) {
    this.log.log(`Value of searchTerm = ${searchTerm}`);
    this.clickActions.click(this.filterPage.txtQuickFilterSearch());
    this.inputActions.inputValue(this.filterPage.txtQuickFilterSearch(), searchTerm);
  }

  clearQuickSearch() {
    this.clickActions.clickByJScript(this.filterPage.btnClearQuickFilter());
  }

  verifyFilteredStpCells(rowCount, columnHeader, columnId, stpStatus) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnHeader));
    for (let i = 0; i < rowCount; i += 1) {
      this.log.log(`Checking row ${i} of ${rowCount}`);
      if (!this.elementActions.getAttribute(this.gridCell.stpStatusByRowIndex(i, columnId), 'class').includes(stpStatus)) {
        this.log.log(`Row ${i} of ${rowCount} does not contain ${stpStatus} please check again`);
        return false;
      }
    }
    return true;
  }

  clickPinColumn() {
    this.clickActions.clickByJScript(this.gridPage.mnuPinColumn());
  }

  clickPinLeft() {
    this.clickActions.clickByJScript(this.gridPage.mnuPinLeft());
  }

  clickPinRight() {
    this.clickActions.clickByJScript(this.gridPage.mnuPinRight());
  }

  clickNoPin() {
    this.clickActions.clickByJScript(this.gridPage.mnuNoPin());
  }

  clickResetColumns() {
    this.clickActions.clickByJScript(this.gridPage.mnuResetColumns());
  }

  clickClearColumnFilters() {
    this.clickActions.clickByJScript(this.gridPage.mnuClearColumnFilters());
  }

  clickRowCount() {
    this.clickActions.click(this.gridPage.lblRowCount());
  }

  pinColumnLeft(columnName, columnID) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnID);
    if (!this.checkMenuTabSelected()) {
      this.clickMenuTab();
    }
    this.clickPinColumn();
    this.clickPinLeft();
    this.clickRowCount();
  }

  pinColumnRight(columnName, columnID) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnID);
    if (!this.checkMenuTabSelected()) {
      this.clickMenuTab();
    }
    this.clickPinColumn();
    this.clickPinRight();
    this.clickRowCount();
  }

  unpinColumn(columnName, columnID) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnID);
    if (!this.checkMenuTabSelected()) {
      this.clickMenuTab();
    }
    this.clickPinColumn();
    this.clickNoPin();
  }

  resetColumns(columnName, columnID) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnID);
    if (!this.checkMenuTabSelected()) {
      this.clickMenuTab();
    }
    this.clickResetColumns();
  }

  clickColumnCheckBox(columnName) {
    this.clickActions.clickByJScript(this.gridPage.chkColumnHide(columnName));
  }

  hideColumnGroup(columnName) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealType.Header));
    this.clickColumnMenu(BlotterData.Strategy.ColId); // click any visible column menu button
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    while (!this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-unchecked')) {
      this.clickColumnCheckBox(columnName);
    }
    // to close menu
    this.clickColumnsTab();
  }

  showColumnGroup(columnName) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealType.Header));
    this.clickColumnMenu(BlotterData.DealType.ColId); // need to click the menu on a still visible column
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    while (!this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-checked')) {
      this.clickColumnCheckBox(columnName);
    }
    // to close menu
    this.clickColumnsTab();
  }

  searchColumn(columnName) {
    this.clickActions.clickByJScript(this.gridPage.txtShowHideSearch());
    this.keyboardActions.enterKeys(columnName);
  }

  hideColumn(columnName, columnId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnId);
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    while (!this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-unchecked')) {
      this.clickColumnCheckBox(columnName);
    }
    // to close menu
    this.clickColumnsTab();
  }

  verifyHideColumnDisabled(columnName, columnId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnId);
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    if (this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-checked-readonly')) {
      this.clickColumnsTab();
      return true;
    }
    this.clickColumnsTab();
    return false;
  }

  hideColumnBySearch(columnName, columnId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnName));
    this.clickColumnMenu(columnId);
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    this.searchColumn(columnName);
    while (!this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-unchecked')) {
      this.clickColumnCheckBox(columnName);
    }
    // to close menu
    this.clickColumnsTab();
  }

  showColumn(columnName) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealType.Header));
    this.clickColumnMenu(BlotterData.DealType.ColId); // DealType always visible
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    while (!this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-checked')) {
      this.clickColumnCheckBox(columnName);
    }
    // to close menu
    this.clickColumnsTab();
  }

  showColumnBySearch(columnName) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealType.Header));
    this.clickColumnMenu(BlotterData.DealType.ColId); // need to click the menu on a still visible column
    if (!this.checkColumnsTabSelected()) {
      this.clickColumnsTab();
    }
    this.searchColumn(columnName);
    while (!this.elementActions.getAttribute(this.gridPage.chkColumnHide(columnName), 'class').includes('ag-icon-checkbox-checked')) {
      this.clickColumnCheckBox(columnName);
    }
    // to close menu
    this.clickColumnsTab();
  }

  verifyColumnHidden(columnHeader) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(columnHeader));
    const header = this.gridPage.tblColumnHeader(columnHeader);
    if (!this.elVisibility.checkVisibility(header, 'enabled_and_visible', '1')) {
      this.log.log(`${columnHeader} column successfully hidden`);
      return true;
    }
    this.log.log(`${columnHeader} column not hidden`);
    return false;
  }

  verifyColumnGroupHidden(columnHeader) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderGroupNoCheck(columnHeader));
    const header = this.gridPage.tblColumnHeaderGroup(columnHeader);
    this.bringColumnIntoView(header);
    if (!this.elVisibility.checkVisibility(header, 'enabled_and_visible', '1')) {
      this.log.log(`${columnHeader} column successfully hidden`);
      return true;
    }
    this.log.log(`${columnHeader} column not hidden`);
    return false;
  }

  verifyNoColumnPinnedLeft() {
    const header = this.gridPage.tblPinnedLeftHeader();
    if (this.elementActions.getAttribute(header, 'class').includes('ag-hidden')) {
      this.log.log('No columns pinned to the left.');
      return true;
    }
    this.log.log('Pinned left column header is visible, some column(s) must be pinned.');
    return false;
  }

  verifyNoColumnPinnedRight() {
    const header = this.gridPage.tblPinnedRightHeader();
    if (this.elementActions.getAttribute(header, 'class').includes('ag-hidden')) {
      this.log.log('No columns pinned to the right');
      return true;
    }
    this.log.log('Pinned right column header is visible, some column(s) must be pinned');
    return false;
  }

  isPinnedLeft(columnHeader) {
    const pinnedColumn = this.gridPage.tblLeftPinnedColumn(columnHeader);
    if (this.elVisibility.checkVisibility(pinnedColumn, 'enabled_and_visible', '1')) {
      this.log.log(`${columnHeader} is pinned left`);
      return true;
    }
    this.log.log(`${columnHeader} is not pinned left`);
    return false;
  }

  isPinnedRight(columnHeader) {
    const pinnedColumn = this.gridPage.tblRightPinnedColumn(columnHeader);
    // while (this.elFinder.getElement(element) === null && count < 30) {this.log.log(`Element = ${element}`);
    if (this.elVisibility.checkVisibility(pinnedColumn, 'enabled_and_visible', '1')) {
      this.log.log(`${columnHeader} is pinned right`);
      return true;
    }
    this.log.log(`${columnHeader} is not pinned right`);
    return false;
  }

  isNotPinnedLeft(columnHeader) {
    const pinnedColumn = this.gridPage.tblLeftPinnedColumnNoCheck(columnHeader);
    if (this.elFinder.getElement(pinnedColumn) === null) {
      this.log.log(`${columnHeader} is not pinned left`);
      return true;
    }
    this.log.log(`${columnHeader} is pinned left`);
    return false;
  }

  isNotPinnedRight(columnHeader) {
    const pinnedColumn = this.gridPage.tblRightPinnedColumnNoCheck(columnHeader);
    if (this.elFinder.getElement(pinnedColumn) === null) {
      this.log.log(`${columnHeader} is not pinned right`);
      return true;
    }
    this.log.log(`${columnHeader} is pinned right`);
    return false;
  }

  isUnderInvestigation(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.CheckFlag.Header));
    const chkFlag = this.elementActions.getAttribute(this.gridCell.chkIsUnderInvestigation(dealId), 'value');
    if (chkFlag && chkFlag.includes('true')) {
      this.log.log('Under Investigation is ticked.');
      return true;
    } if (!chkFlag || chkFlag && chkFlag.includes('false')) {
      this.log.log('Under Investigation is not ticked.');
      return false;
    }
    return false;
  }

  isCellHidden(element, columnGroup) {
    switch (columnGroup) {
      case 'Deal':
        if (this.elVisibility.checkVisibility(this.gridPage.btnDealExpand(), 'enabled_and_visible', '1') === true) {
          this.log.log('Deal is not expanded');
          return true;
        }
        return false;
      case 'Approvals':
        if (this.elVisibility.checkVisibility(this.gridPage.btnApprovalExpand(), 'enabled_and_visible', '1') === true) {
          this.log.log('Approvals are not expanded');
          return true;
        }
        return false;
      default:
        if (this.elVisibility.checkVisibility(element, 'enabled_and_visible', '1') === false) {
          this.log.log(`${element} is not visible on the DOM`);
          return true;
        }
        return false;
    }
  }

  verifyRowTextColour(dealId, colour) {
    const attValue = this.elementActions.getAttribute(this.gridCell.gridRow(dealId), 'style');
    if (attValue.includes(`color: ${colour}`)) {
      this.log.log(`attValue = ${attValue}`);
      return true;
    }
    this.log.log(`attValue = ${attValue}`);
    return false;
  }

  checkBuyerStpStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.imgBuyerStpStatusNoCheck(dealId));
    const stpStatusAttr = this.elementActions.getAttribute(this.gridCell.imgBuyerStpStatus(dealId), 'class');
    const stpStatus = stpStatusAttr.replace('stp-traffic-icon ', '');
    this.log.log(`STP Status = ${stpStatus}`);
    return stpStatus;
  }

  checkSellerStpStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.imgSellerStpStatusNoCheck(dealId));
    const stpStatusAttr = this.elementActions.getAttribute(this.gridCell.imgSellerStpStatus(dealId), 'class');
    const stpStatus = stpStatusAttr.replace('stp-traffic-icon ', '');
    this.log.log(`STP Status = ${stpStatus}`);
    return stpStatus;
  }

  checkBuyerStpTitle(dealId) {
    this.bringColumnIntoView(this.gridCell.imgBuyerStpStatusNoCheck(dealId));
    const title = this.elementActions.getAttribute(this.gridCell.imgBuyerStpStatus(dealId), 'title');
    this.log.log(`STP Title = ${title}`);
    return title;
  }

  checkSellerStpTitle(dealId) {
    this.bringColumnIntoView(this.gridCell.imgSellerStpStatusNoCheck(dealId));
    const title = this.elementActions.getAttribute(this.gridCell.imgSellerStpStatus(dealId), 'title');
    this.log.log(`STP Title = ${title}`);
    return title;
  }

  getDealStatus(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealStatus.Header));
    const dealStatus = this.textActions.getTxt(this.gridCell.txtDealStatus(dealId));
    this.log.log(`Deal State = ${dealStatus}`);
    return dealStatus;
  }

  getFirstRowDealId() {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealId.Header));
    const firstRowDealId = this.textActions.getTxt(this.gridCell.gridCellByRowIndex(0, BlotterData.DealId.ColId));
    this.log.log(`First Row Deal ID = ${firstRowDealId}`);
    return firstRowDealId;
  }

  getDealAction(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealAction.Header));
    const dealAction = this.textActions.getTxt(this.gridCell.txtDealAction(dealId));
    this.log.log(`Deal Action = ${dealAction}`);
    return dealAction;
  }

  getDealType(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealType.Header));
    const dealType = this.textActions.getTxt(this.gridCell.txtDealType(dealId));
    this.log.log(`Deal Type = ${dealType}`);
    return dealType;
  }

  getStrategy(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.Strategy.Header));
    const strategy = this.textActions.getTxt(this.gridCell.txtStrategy(dealId));
    this.log.log(`Trade Strategy = ${strategy}`);
    return strategy;
  }

  getChainReference(dealId) {
    if (this.isCellHidden(this.gridCell.txtChainReference(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.ChainRef.Header));
    const chainId = this.textActions.getTxt(this.gridCell.txtChainReference(dealId));
    this.log.log(`Chain Reference = ${chainId}`);
    return chainId;
  }

  getTradeDate(dealId) {
    if (this.isCellHidden(this.gridCell.txtTradeDate(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.TradeDate.Header));
    const tradeDate = this.textActions.getTxt(this.gridCell.txtTradeDate(dealId));
    this.log.log(`Trade Date = ${tradeDate}`);
    return tradeDate;
  }

  getTradeTime(dealId) {
    if (this.isCellHidden(this.gridCell.txtTradeTime(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.TradeTime.Header));
    const tradeTime = this.textActions.getTxt(this.gridCell.txtTradeTime(dealId));
    this.log.log(`Trade Time = ${tradeTime}`);
    return tradeTime;
  }

  getExecutionVenue(dealId) {
    if (this.isCellHidden(this.gridCell.txtExecVenue(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.ExecVen.Header));
    const executionVenueType = this.textActions.getTxt(this.gridCell.txtExecVenue(dealId));
    this.log.log(`Execution Venue = ${executionVenueType}`);
    return executionVenueType;
  }

  getValueDate(dealId) {
    if (this.isCellHidden(this.gridCell.txtValueDate(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.ValueDate.Header));
    const valueDate = this.textActions.getTxt(this.gridCell.txtValueDate(dealId));
    this.log.log(`Value Date = ${valueDate}`);
    return valueDate;
  }

  getAmount(dealId) {
    if (this.isCellHidden(this.gridCell.txtAmount(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.Amount.Header));
    const notionalAmount = this.textActions.getTxt(this.gridCell.txtAmount(dealId));
    this.log.log(`Amount = ${notionalAmount}`);
    return notionalAmount;
  }

  getPrice(dealId) {
    if (this.isCellHidden(this.gridCell.txtPrice(dealId), 'Deal')) {
      this.clickDealExpand();
    }
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.Price.Header));
    const points = this.textActions.getTxt(this.gridCell.txtPrice(dealId));
    this.log.log(`Deal Price = ${points}`);
    return points;
  }

  getBuyerCustomer(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerCust.Header));
    const payerCustomerName = this.textActions.getTxt(this.gridCell.txtBuyerCustomer(dealId));
    this.log.log(`Buyer Customer = ${payerCustomerName}`);
    return payerCustomerName;
  }

  getBuyerCustomerLong(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerCustLong.Header));
    const payerCustomerLongName = this.textActions.getTxt(this.gridCell.txtBuyerCustomerLong(dealId));
    this.log.log(`Buyer CustomerLong = ${payerCustomerLongName}`);
    return payerCustomerLongName;
  }

  getBuyerTrader(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerTrader.Header));
    const payerTraderName = this.textActions.getTxt(this.gridCell.txtBuyerTrader(dealId));
    this.log.log(`Buyer TraderName = ${payerTraderName}`);
    return payerTraderName;
  }

  getBuyerTraderLong(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerTraderLong.Header));
    const payerTraderLongName = this.textActions.getTxt(this.gridCell.txtBuyerTraderLong(dealId));
    this.log.log(`Buyer Trader LongName = ${payerTraderLongName}`);
    return payerTraderLongName;
  }

  getBuyerBroker(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerBroker.Header));
    const payerBrokerName = this.textActions.getTxt(this.gridCell.txtBuyerBroker(dealId));
    this.log.log(`Buyer Broker = ${payerBrokerName}`);
    return payerBrokerName;
  }

  getBuyerBrokerLong(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerBrokerLong.Header));
    const payerBrokerLongName = this.textActions.getTxt(this.gridCell.txtBuyerBrokerLong(dealId));
    this.log.log(`Buyer Broker Long = ${payerBrokerLongName}`);
    return payerBrokerLongName;
  }
  
  getSellerCustomer(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerCust.Header));
    const receiverCustomerName = this.textActions.getTxt(this.gridCell.txtSellerCustomer(dealId));
    this.log.log(`Seller Customer = ${receiverCustomerName}`);
    return receiverCustomerName;
  }
  
  getSellerCustomerLong(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerCustLong.Header));
    const receiverCustomerLongName = this.textActions.getTxt(this.gridCell.txtSellerCustomerLong(dealId));
    this.log.log(`Seller Customer Long Name= ${receiverCustomerLongName}`);
    return receiverCustomerLongName;
  }
  
  getSellerTrader(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerTrader.Header));
    const receiverTraderName = this.textActions.getTxt(this.gridCell.txtSellerTrader(dealId));
    this.log.log(`Seller TraderName = ${receiverTraderName}`);
    return receiverTraderName;
  }

  getSellerTraderLong(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerTraderLong.Header));
    const receiverTraderLongName = this.textActions.getTxt(this.gridCell.txtSellerTraderLong(dealId));
    this.log.log(`Seller Trader Long Name = ${receiverTraderLongName}`);
    return receiverTraderLongName;
  }

  getSellerBroker(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerBroker.Header));
    const receiverBrokerName = this.textActions.getTxt(this.gridCell.txtSellerBroker(dealId));
    this.log.log(`Seller Broker = ${receiverBrokerName}`);
    return receiverBrokerName;
  }

  getSellerBrokerLong(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerBrokerLong.Header));
    const receiverBrokerLongName = this.textActions.getTxt(this.gridCell.txtSellerBrokerLong(dealId));
    this.log.log(`Seller Broker Long = ${receiverBrokerLongName}`);
    return receiverBrokerLongName;
  }

  clickApprovalExpand() {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderGroupNoCheck(BlotterData.ApprovalsGroup));
    this.clickActions.clickByJScript(this.gridPage.btnApprovalExpand());
  }

  clickApprovalContract() {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderGroupNoCheck(BlotterData.ApprovalsGroup));
    this.clickActions.clickByJScript(this.gridPage.btnApprovalContract());
  }

  getBuyerOverallApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtBuyerOverallApprovalsNoCheck(dealId));
    const buyerApprovalStatus = this.textActions.getTxt(this.gridCell.txtBuyerOverallApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerApprovalStatus}`);
    return buyerApprovalStatus;
  }

  getSellerOverallApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtSellerOverallApprovalsNoCheck(dealId));
    const sellerApprovalStatus = this.textActions.getTxt(this.gridCell.txtSellerOverallApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerApprovalStatus}`);
    return sellerApprovalStatus;
  }

  getBuyerBrokerApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtBuyerBrokerApprovalsNoCheck(dealId));
    const buyerBrokerStatus = this.textActions.getTxt(this.gridCell.txtBuyerBrokerApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerBrokerStatus}`);
    return buyerBrokerStatus;
  }

  getBuyerMidOfficeApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtBuyerMidOfficeApprovalsNoCheck(dealId));
    const buyerMidOfficeStatus = this.textActions.getTxt(this.gridCell.txtBuyerMidOfficeApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerMidOfficeStatus}`);
    return buyerMidOfficeStatus;
  }

  getBuyerTraderApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtBuyerTraderApprovalsNoCheck(dealId));
    const buyerTraderStatus = this.textActions.getTxt(this.gridCell.txtBuyerTraderApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerTraderStatus}`);
    return buyerTraderStatus;
  }

  getSellerBrokerApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtSellerBrokerApprovalsNoCheck(dealId));
    const sellerBrokerStatus = this.textActions.getTxt(this.gridCell.txtSellerBrokerApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerBrokerStatus}`);
    return sellerBrokerStatus;
  }

  getSellerMidOfficeApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtSellerMidOfficeApprovalsNoCheck(dealId));
    const sellerMidOfficeStatus = this.textActions.getTxt(this.gridCell.txtSellerMidOfficeApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerMidOfficeStatus}`);
    return sellerMidOfficeStatus;
  }

  getSellerTraderApprovalStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.txtSellerTraderApprovalsNoCheck(dealId));
    const sellerTraderStatus = this.textActions.getTxt(this.gridCell.txtSellerTraderApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerTraderStatus}`);
    return sellerTraderStatus;
  }

  getBuyerBrokerApprovalPendingBtnStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.btnBuyerBrokerApprovalsNoCheck(dealId));
    const buyerBrokerStatus = this.textActions.getTxt(this.gridCell.btnBuyerBrokerApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerBrokerStatus}`);
    return buyerBrokerStatus;
  }

  getBuyerMidOfficeApprovalPendingBtnStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.btnBuyerMidOfficeApprovalsNoCheck(dealId));
    const buyerMidOfficeStatus = this.textActions.getTxt(this.gridCell.btnBuyerMidOfficeApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerMidOfficeStatus}`);
    return buyerMidOfficeStatus;
  }

  getBuyerTraderApprovalPendingBtnStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.btnBuyerTraderApprovalsNoCheck(dealId));
    const buyerTraderStatus = this.textActions.getTxt(this.gridCell.btnBuyerTraderApprovals(dealId));
    this.log.log(`Buyer Approval Status = ${buyerTraderStatus}`);
    return buyerTraderStatus;
  }

  getSellerBrokerApprovalPendingBtnStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.btnSellerBrokerApprovalsNoCheck(dealId));
    const sellerBrokerStatus = this.textActions.getTxt(this.gridCell.btnSellerBrokerApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerBrokerStatus}`);
    return sellerBrokerStatus;
  }

  getSellerMidOfficeApprovalPendingBtnStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.btnSellerMidOfficeApprovalsNoCheck(dealId));
    const sellerMidOfficeStatus = this.textActions.getTxt(this.gridCell.btnSellerMidOfficeApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerMidOfficeStatus}`);
    return sellerMidOfficeStatus;
  }

  getSellerTraderApprovalPendingBtnStatus(dealId) {
    this.bringColumnIntoView(this.gridCell.btnSellerTraderApprovalsNoCheck(dealId));
    const sellerTraderStatus = this.textActions.getTxt(this.gridCell.btnSellerTraderApprovals(dealId));
    this.log.log(`Seller Approval Status = ${sellerTraderStatus}`);
    return sellerTraderStatus;
  }

  approveBuyerBroker(dealId) {
    this.bringColumnIntoView(this.gridCell.btnBuyerBrokerApprovalsNoCheck(dealId));
    this.clickBuyerBrokerPending(dealId);
  }

  approveBuyerMidOffice(dealId) {
    this.bringColumnIntoView(this.gridCell.btnBuyerMidOfficeApprovalsNoCheck(dealId));
    this.clickBuyerMidOfficePending(dealId);
  }

  approveBuyerTrader(dealId) {
    this.bringColumnIntoView(this.gridCell.btnBuyerTraderApprovalsNoCheck(dealId));
    this.clickBuyerTraderPending(dealId);
  }

  approveSellerBroker(dealId) {
    this.bringColumnIntoView(this.gridCell.btnSellerBrokerApprovalsNoCheck(dealId));
    this.clickSellerBrokerPending(dealId);
  }

  approveSellerMidOffice(dealId) {
    this.bringColumnIntoView(this.gridCell.btnSellerMidOfficeApprovalsNoCheck(dealId));
    this.clickSellerMidOfficePending(dealId);
  }

  approveSellerTrader(dealId) {
    this.bringColumnIntoView(this.gridCell.btnSellerTraderApprovalsNoCheck(dealId));
    this.clickSellerTraderPending(dealId);
  }

  clickBuyerBrokerPending(dealId) {
    this.clickActions.click(this.gridCell.btnBuyerBrokerApprovals(dealId));
  }

  clickBuyerMidOfficePending(dealId) {
    this.clickActions.click(this.gridCell.btnBuyerMidOfficeApprovals(dealId));
  }

  clickBuyerTraderPending(dealId) {
    this.clickActions.click(this.gridCell.btnBuyerTraderApprovals(dealId));
  }

  clickSellerBrokerPending(dealId) {
    this.clickActions.click(this.gridCell.btnSellerBrokerApprovals(dealId));
  }

  clickSellerMidOfficePending(dealId) {
    this.clickActions.click(this.gridCell.btnSellerMidOfficeApprovals(dealId));
  }

  clickSellerTraderPending(dealId) {
    this.clickActions.click(this.gridCell.btnSellerTraderApprovals(dealId));
  }

  getBuyerBrokerage(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerBrokerage.Header));
    const buyerBrokerage = this.textActions.getTxt(this.gridCell.txtBuyerBrokerage(dealId));
    this.log.log(`Buyer Brokerage = ${buyerBrokerage}`);
    return buyerBrokerage;
  }

  getSellerBrokerage(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerBrokerage.Header));
    const sellerBrokerage = this.textActions.getTxt(this.gridCell.txtSellerBrokerage(dealId));
    this.log.log(`Seller Brokerage = ${sellerBrokerage}`);
    return sellerBrokerage;
  }

  getBuyerBrokerageCcy(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.BuyerBrokerageCCY.Header));
    const buyerBrokerage = this.textActions.getTxt(this.gridCell.txtBuyerBrokerageCcy(dealId));
    this.log.log(`Buyer Brokerage = ${buyerBrokerage}`);
    return buyerBrokerage;
  }

  getSellerBrokerageCcy(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerBrokerageCCY.Header));
    const sellerBrokerage = this.textActions.getTxt(this.gridCell.txtSellerBrokerageCcy(dealId));
    this.log.log(`Seller Brokerage = ${sellerBrokerage}`);
    return sellerBrokerage;
  }

  getRowCount() {
    const rowCount = this.textActions.getTxt(this.gridPage.lblRowCount());
    this.log.log(`Row rount is = ${rowCount}`);
    return rowCount;
  }

  getFilteredRows() {
    const filteredRows = this.textActions.getTxt(this.gridPage.lblFilteredRows());
    this.log.log(`Filtered row rount is = ${filteredRows}`);
    return filteredRows;
  }

  getLastUpdated() {
    const lastUpdated = this.textActions.getTxt(this.gridPage.lblLastUpdated());
    this.log.log(`Last updated = ${lastUpdated}`);
    return lastUpdated;
  }

  clickGridCellForTabbing() {
    try {
      this.clickActions.click(this.gridCell.rowZeroCell(BlotterData.BuyerCust.ColId));
    } catch (error) {
      this.clickActions.click(this.gridCell.rowZeroCell(BlotterData.SellerCust.ColId));
    }
  }

  scrollRight() {
    this.windowActions.scrollRight(this.gridPage.blotterHorizontalScroll(), 600);
  }

  scrollLeft() {
    this.windowActions.scrollLeft(this.gridPage.blotterHorizontalScroll(), 600);
  }

  scrollUp() {
    this.windowActions.scrollUp(this.gridPage.blotterScroll(), 250);
  }

  scrollDown() {
    this.windowActions.scrollDown(this.gridPage.blotterScroll(), 250);
  }

  scrollDownByRows(rows) {
    this.windowActions.scrollDown(this.gridPage.blotterScroll(), rows * 25);
  }

  waitForFirstRowDealIdUpdate(dealId) {
    this.watch.startStopWatch(15);
    let newFirstRowDealId = '';
    while (this.watch.isWatchRunning()) {
      newFirstRowDealId = this.getFirstRowDealId();
      if (newFirstRowDealId !== dealId
      && newFirstRowDealId !== null
      && newFirstRowDealId !== ''
      && newFirstRowDealId !== undefined) {
        this.log.log(`Deal ID on Row 0 has updated from ${dealId} to ${newFirstRowDealId}`);
        return true;
      }
      this.log.log('Still waiting for Row 0 Deal ID to update....');
    }
    this.log.log(`Deal ID on Row 0 has not updated from ${dealId}`);
    return false;
  }

  bringColumnIntoView(element) {
    if (typeof element === 'string') {
      this.log.log(`Element = ${element}`);
      if (this.elFinder.getElement(element) !== null) {
        this.log.log('Element is now visible in the DOM');
        return true;
      }
      let count = 0;
      while (count < 3) {
        this.scrollRight();
        this.log.log('Element is still not in view');
        count += 1;
        this.log.log(`count = ${count}`);
        if (this.elFinder.getElement(element) !== null) {
          this.log.log('Element is now visible in the DOM');
          return true;
        }
      }
      count += 1;
      while (count > 0) {
        this.scrollLeft();
        this.log.log('Element is still not in view');
        count -= 1;
        this.log.log(`count = ${count}`);
        if (this.elFinder.getElement(element) !== null) {
          this.log.log('Element is now visible in the DOM');
          return true;
        }
      }
      this.log.log('Element is not visible in the DOM');
      return false;
    }
    this.log.log(`Element = ${element}`);
    if (this.isCellHidden(element) === false) {
      this.log.log('Element is now visible in the DOM');
      return true;
    }
    let count = 0;
    while (count < 3) {
      this.scrollRight();
      this.log.log('Element is still not in view');
      count += 1;
      this.log.log(`count = ${count}`);
      if (this.isCellHidden(element) === false) {
        this.log.log('Element is now visible in the DOM');
        return true;
      }
    }
    count += 1;
    while (count > 0) {
      this.scrollRight();
      this.log.log('Element is still not in view');
      count -= 1;
      this.log.log(`count = ${count}`);
      if (this.isCellHidden(element) === false) {
        this.log.log('Element is now visible in the DOM');
        return true;
      }
    }
    this.log.log('Element is not visible in the DOM');
    return false;
  }

  bringRowIntoView(dealId) {
    this.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealId.Header));
    this.log.log(`Deal ID = ${dealId}`);
    if (this.elFinder.getElement(this.gridCell.txtDealIDNoCheck(dealId)) !== null) {
      this.log.log('Deal ID is now visible in the DOM');
      return true;
    }
    let count = 0;
    while (count < 30) {
      this.scrollDown();
      this.log.log('Deal ID is still not in view');
      count += 1;
      this.log.log(`count = ${count}`);
      if (this.elFinder.getElement(this.gridCell.txtDealIDNoCheck(dealId)) !== null) {
        this.log.log('Deal ID is now visible in the DOM');
        return true;
      }
    }
    this.log.log('Deal ID is not visible in the DOM');
    return false;
  }
}
module.exports = BlotterModel;
