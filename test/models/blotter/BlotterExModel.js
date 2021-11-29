/* eslint-disable max-len */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const BlotterData = require('../../data/blotter/BlotterData');
const Logs = require('../../core/utility/Logs');
const LoginLogout = require('../../pageobjects/LoginLogoutPageObject');
const BlotterModel = require('./BlotterModel');
const GridColumnObject = require('../../pageobjects/blotter/components/GridColumnPageObject');
const GridCellObject = require('../../pageobjects/blotter/components/GridCellPageObject');
const StopWatch = require('../../core/utility/StopWatch');
const {
  ClickActions,
  GetTextActions,
  ElementActions,
  WindowActions,
  MouseActions,
} = require('../../core/actions/ActionsIndex');

class BlotterExModel {
  constructor() {
    this.log = new Logs();
    this.LoginLogout = new LoginLogout();
    this.blotter = new BlotterModel();
    this.gridPage = new GridColumnObject();
    this.gridCell = new GridCellObject();
    this.watch = new StopWatch();
    this.clickActions = new ClickActions();
    this.textActions = new GetTextActions();
    this.elementActions = new ElementActions();
    this.windowActions = new WindowActions();
    this.mouseActions = new MouseActions();
  }

  waitForBuyerBrokerApprovalRtu(dealId) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.gridCell.txtBuyerBrokerApprovals(dealId) !== null) {
        this.log.log('Approval has updated for Buyer Broker');
        return true;
      }
      this.log.log('Still waiting for approval to update....');
    }
    this.log.log(`Buyer Broker approval for deal ${dealId} has not updated.`);
    return false;
  }

  waitForBuyerMidOfficeApprovalRtu(dealId) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.gridCell.txtBuyerMidOfficeApprovals(dealId) !== null) {
        this.log.log('Approval has updated for Buyer Mid Office');
        return true;
      }
      this.log.log('Still waiting for approval to update....');
    }
    this.log.log(`Buyer Mid-Office approval for deal ${dealId} has not updated.`);
    return false;
  }

  waitForBuyerTraderApprovalRtu(dealId) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.gridCell.txtBuyerTraderApprovals(dealId) !== null) {
        this.log.log('Approval has updated for Buyer Trader');
        return true;
      }
      this.log.log('Still waiting for approval to update....');
    }
    this.log.log(`Buyer Trader approval for deal ${dealId} has not updated.`);
    return false;
  }

  waitForSellerBrokerApprovalRtu(dealId) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.gridCell.txtSellerBrokerApprovals(dealId) !== null) {
        this.log.log('Approval has updated for Seller Broker');
        return true;
      }
      this.log.log('Still waiting for approval to update....');
    }
    this.log.log(`Seller Broker approval for deal ${dealId} has not updated.`);
    return false;
  }

  waitForSellerMidOfficeApprovalRtu(dealId) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.gridCell.txtSellerMidOfficeApprovals(dealId) !== null) {
        this.log.log('Approval has updated for Seller Mid Office');
        return true;
      }
      this.log.log('Still waiting for approval to update....');
    }
    this.log.log(`Seller Mid-Office approval for deal ${dealId} has not updated.`);
    return false;
  }

  waitForSellerTraderApprovalRtu(dealId) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (this.gridCell.txtSellerTraderApprovals(dealId) !== null) {
        this.log.log('Approval has updated for Seller Trader');
        return true;
      }
      this.log.log('Still waiting for approval to update....');
    }
    this.log.log(`Seller Trader approval for deal ${dealId} has not updated.`);
    return false;
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

  scrollLeftPosition() {
    this.windowActions.scrollLeftPos(this.gridPage.blotterHorizontalScroll());
  }

  getBlotterData() {
    let blotterMap = new Map();
    blotterMap = this.readBlotterData(blotterMap);
    this.scrollDown();
    blotterMap = this.readBlotterData(blotterMap);
    // this.scrollDown();
    // blotterMap = this.readBlotterData(blotterMap);
    // this.scrollUp();
    this.scrollUp();
    this.scrollUp();
    return blotterMap;
  }

  readBlotterData(blotterMap) {
    blotterMap = this.setBlotterData(blotterMap);
    this.scrollRight();
    blotterMap = this.setBlotterData(blotterMap);
    this.scrollRight();
    blotterMap = this.setBlotterData(blotterMap);
    this.scrollRight();
    blotterMap = this.setBlotterData(blotterMap);
    this.scrollLeft();
    this.scrollLeft();
    this.scrollLeft();
    this.scrollLeft();
    return blotterMap;
  }

  setBlotterData(blotterMap) {
    this.blotter.waitForGrid();
    const rows = this.gridPage.rowsBlotter();
    rows.forEach((row) => {
      blotterMap = this.getBlotterRowMap(row, blotterMap);
    });
    return blotterMap;
  }

  getBlotterRowMap(row, blotterMap) {
    let rowMap = '';
    const dealId = this.elementActions.getAttribute(row, 'row-id');
    this.log.log('======================== Next Row ========================');
    this.log.log(`Row ID : ${dealId}`);
    const columns = this.gridPage.rowCells(row);

    if (blotterMap.has(dealId)) {
      rowMap = blotterMap.get(dealId);
    } else {
      rowMap = new Map();
    }

    columns.forEach((cell) => {
      const colId = this.elementActions.getAttribute(cell, 'col-id');
      this.log.log(`Column ID : ${colId}`);
      if (!rowMap.has(colId)) {
        try {
          const value = this.getCellValue(cell, colId);
          rowMap.set(colId, value);
          this.log.log(`Value for Column ID : ${colId} is ${value}`);
        } catch (error) {
          this.log.log(`Error while fatching cell value for ${colId} and Error is : ${error}`);
        }
      }
    });

    blotterMap.set(dealId, rowMap);
    return blotterMap;
  }

  getCellValue(cell, cellId) {
    switch (cellId) {
      case BlotterData.DealId.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.CheckFlag.ColId:
        const isDealUnderInvestigation = this.isUnderInvestigationByElement(cell);
        return isDealUnderInvestigation;
      case BlotterData.DealStatus.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.DealAction.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.DealType.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.Strategy.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.ChainRef.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.TradeDate.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.TradeTime.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.ExecVen.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.ValueDate.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.Amount.ColId:
        return this.textActions.getTxt(cell).replace(/,/g, '');
      case BlotterData.Price.ColId:
        return this.textActions.getTxt(cell).replace(/,/g, '');
      case BlotterData.BuyerCust.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerTrader.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerBroker.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerCust.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerTrader.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerBroker.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerBrokerApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerMidOffApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerTraderApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerBrokerApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerMidOffApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerTraderApp.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerSTP.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerSTP.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerBrokerage.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerBrokerage.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.BuyerBrokerageCCY.ColId:
        return this.textActions.getTxt(cell);
      case BlotterData.SellerBrokerageCCY.ColId:
        return this.textActions.getTxt(cell);
      default:
        return null;
    }
  }

  getCellInfoByRow(element, info) {
    return this.gridCell.getCellElementByRow(element, info);
  }

  isUnderInvestigationByElement(element) {
    const elmt = this.gridCell.chkIsUnderInvestigationByCell(element);
    if (this.elementActions.getAttribute(elmt, 'class').includes('ag-icon-tick')) {
      this.log.log('Under Investigation is ticked.');
      return true;
    } if (this.elementActions.getAttribute(elmt, 'class').includes('ag-icon-cross')) {
      this.log.log('Under Investigation is not ticked.');
      return false;
    }
    return false;
  }

  exportVisibleColumnsExcelFile() {
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealId.Header));
    this.clickActions.rightClick(this.gridCell.gridCellByRowIndex(0, BlotterData.DealId.ColId));
    this.clickActions.click(this.gridPage.mnuExportToExcel());
    this.clickActions.click(this.gridPage.mnuVisibleColumns());
  }

  exportAllColumnsExcelFile() {
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.DealId.Header));
    this.clickActions.rightClick(this.gridCell.gridCellByRowIndex(0, BlotterData.DealId.ColId));
    this.clickActions.click(this.gridPage.mnuExportToExcel());
    this.clickActions.click(this.gridPage.mnuAllColumns());
  }

  createDownloadDirectory(dir) {
    if (!fs.existsSync(dir)) {
      this.log.log(`Directory does not exist - creating directory ${dir}`);
      try {
        fs.mkdirSync(dir);
      } catch (e) {
        this.log.errorLog(`Could not create directory: ${e}`);
      }
    }
  }

  verifyDownloadDirectoryExists(dir) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (fs.existsSync(dir)) {
        this.log.log(`File exists in directory ${dir}`);
        return true;
      }
      this.log.log('File does not yet exist in directory - waiting');
    }
    this.log.log(`File does not yet exist in directory ${dir} - exiting`);
    return false;
  }

  removeDownloadDirectory(dir) {
    const list = fs.readdirSync(dir);
    for (let i = 0; i < list.length; i += 1) {
      const filename = path.join(dir, list[i]);
      const stat = fs.statSync(filename);

      if (filename === '.' || filename === '..') {
        // do nothing
      } else if (stat.isDirectory()) {
        fs.rmdir(filename);
      } else {
        this.log.log(`Removing file in path ${filename}`);
        fs.unlinkSync(filename);
      }
    }
    this.log.log(`Removing directory ${dir}`);
    fs.rmdirSync(dir);
  }

  waitForRowCountToEqualOne(MATCHER) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10) === 1) {
        this.log.log('Row Count has updated to expected Value of 1.');
        return true;
      }
      this.log.log('Row Count has not updated to expected Value of 1.');
    }
    this.log.log('Row Count does not equal expected Value of 1.');
    return false;
  }

  waitForRowCountToUpdate(MATCHER, previousVal) {
    this.watch.startStopWatch(10);
    while (this.watch.isWatchRunning()) {
      if (parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10) !== parseInt(previousVal, 10)) {
        this.log.log(`Row Count has updated and no longer equals ${previousVal}.`);
        return true;
      }
      this.log.log(`Row Count has not updated from the old value of ${previousVal}.`);
    }
    this.log.log(`Row Count has no updated and still equals ${previousVal}.`);
    return false;
  }

  checkUnderInvestigationFlag(dealId) {
    if (this.blotter.isUnderInvestigation(dealId) === false) {
      this.clickActions.clickByJScript(this.gridCell.chkIsUnderInvestigation(dealId));
      this.log.log('Under investigation checked');
    } else if (this.blotter.isUnderInvestigation(dealId) === true) {
      this.log.log('Under investigation already checked');
    }
  }

  unCheckUnderInvestigationFlag(dealId) {
    if (this.blotter.isUnderInvestigation(dealId) === true) {
      this.clickActions.clickByJScript(this.gridCell.chkIsUnderInvestigation(dealId));
      this.log.log('Under investigation unchecked');
    } else if (this.blotter.isUnderInvestigation(dealId) === false) {
      this.log.log('Under investigation already not checked');
    }
  }

  getInvestigationFlagHoverText(dealId) {
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.CheckFlag.Header));
    const hoverTextValue = this.elementActions.getAttribute(this.gridCell.chkIsUnderInvestigation(dealId), 'title');
    this.log.log(`Hover over text value = ${hoverTextValue}`);
    return hoverTextValue;
  }

  getInvestigationFlagHoverTextUpdate(dealId) {
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.CheckFlag.Header));
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      const hoverTextValue = this.elementActions.getAttribute(this.gridCell.chkIsUnderInvestigation(dealId), 'title');
      if (hoverTextValue !== 'Investigation Flag') {
        this.log.log(`Hover over text value = ${hoverTextValue}`);
        return hoverTextValue;
      }
    }
    this.log.log('Hover over text value is unchanged');
    return false;
  }

  getBlotterColumns() {
    const colIds = [];
    const headerRow = this.gridPage.mnuColHeaderRow();
    const columns = this.gridPage.mnuColHeaders(headerRow);
    columns.forEach((column) => {
      colIds.push(this.elementActions.getAttribute(column, 'col-id'));
    });
    return colIds;
  }

  dragColumn(sourceColumn, targetColumn) {
    const source = this.gridPage.tblColumnHeader(sourceColumn);
    const target = this.gridPage.tblColumnHeader(targetColumn);
    this.mouseActions.dragNDrop(source, target, 1000);
  }

  verifyFilterIconVisible(columnId) {
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      const element = this.gridPage.btnColFilterIcon(columnId);
      if (element !== null || element !== undefined) {
        this.log.log(`Column filter icon for ${columnId} column is visible`);
        return true;
      }
      this.log.log('Still waiting for filter icon to be visible....');
    }
    this.log.log(`Column filter icon for ${columnId} column is not visible`);
    return false;
  }

  verifyFilterIconNotVisible(columnId) {
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      const element = this.gridPage.btnColFilterIcon(columnId);
      if (element === null || element === undefined) {
        this.log.log(`Column filter icon for ${columnId} column is not visible`);
        return true;
      }
      this.log.log('Still waiting for filter icon to not be visible....');
    }
    this.log.log(`Column filter icon for ${columnId} column is still visible`);
    return false;
  }
}
module.exports = BlotterExModel;
