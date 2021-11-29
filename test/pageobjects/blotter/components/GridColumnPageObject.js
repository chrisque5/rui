/* eslint-disable max-len */
const GridColumnsPropertyProvider = require('../../../objectsProvider/blotter/components/GridColumnsPropertyProvider');
const ElementProcessor = require('../../../core/element/ElementProcessor');

class GridColumnPageObject {
  constructor() {
    this.elmtProc = new ElementProcessor();
    this.gridProperty = new GridColumnsPropertyProvider();
  }

  blotterScroll() { return this.elmtProc.getEl(this.gridProperty.blotterScroll()); }

  blotterHorizontalScroll() { return this.elmtProc.getEl(this.gridProperty.blotterHorizontalScroll()); }

  rowsBlotter() { return this.elmtProc.getElements(this.gridProperty.rowsBlotter()); }

  rowCells(row) { return this.elmtProc.getChildElements(row, './/div[@role="gridcell"]'); }

  btnRefresh() { return this.elmtProc.getEl(this.gridProperty.btnRefresh()); }

  btnExport() { return this.elmtProc.getEl(this.gridProperty.btnExport()); }

  txtQuickSearch() { return this.elmtProc.getEl(this.gridProperty.txtQuickSearch()); }

  btnDealExpand() { return this.elmtProc.getEl(this.gridProperty.btnDealExpand()); }

  btnDealContract() { return this.elmtProc.getEl(this.gridProperty.btnDealContract()); }

  btnColumnMenu(columnId) { return this.elmtProc.getEl(this.gridProperty.btnColumnMenu(columnId)); }

  mnuFilterTab() { return this.elmtProc.getEl(this.gridProperty.mnuFilterTab()); }

  mnuFilterTabSelect() { return this.elmtProc.getEl(this.gridProperty.mnuFilterTabSelect()); }

  chkFilterSelectAll() { return this.elmtProc.getEl(this.gridProperty.chkFilterSelectAll()); }

  txtFilterSearch() { return this.elmtProc.getEl(this.gridProperty.txtFilterSearch()); }

  chkFilterCheckbox(cellValue) { return this.elmtProc.getEl(this.gridProperty.chkFilterCheckbox(cellValue)); }

  chkStpFilterCheckbox(stpLabel) { return this.elmtProc.getEl(this.gridProperty.chkStpFilterCheckbox(stpLabel)); }

  mnuMenuTab() { return this.elmtProc.getEl(this.gridProperty.mnuMenuTab()); }

  mnuMenuTabSelect() { return this.elmtProc.getEl(this.gridProperty.mnuMenuTabSelect()); }

  mnuColumnsTab() { return this.elmtProc.getEl(this.gridProperty.mnuColumnsTab()); }

  mnuColumnsTabSelect() { return this.elmtProc.getEl(this.gridProperty.mnuColumnsTabSelect()); }

  mnuPinColumn() { return this.elmtProc.getEl(this.gridProperty.mnuPinColumn()); }

  mnuPinLeft() { return this.elmtProc.getEl(this.gridProperty.mnuPinLeft()); }

  mnuPinRight() { return this.elmtProc.getEl(this.gridProperty.mnuPinRight()); }

  mnuNoPin() { return this.elmtProc.getEl(this.gridProperty.mnuNoPin()); }

  mnuResetColumns() { return this.elmtProc.getEl(this.gridProperty.mnuResetColumns()); }

  mnuClearColumnFilters() { return this.elmtProc.getEl(this.gridProperty.mnuClearColumnFilters()); }

  chkColumnHide(columnName) { return this.elmtProc.getEl(this.gridProperty.chkColumnHide(columnName)); }

  btnApprovalExpand() { return this.elmtProc.getEl(this.gridProperty.btnApprovalExpand()); }

  btnApprovalContract() { return this.elmtProc.getEl(this.gridProperty.btnApprovalContract()); }

  lblRowCount() { return this.elmtProc.getEl(this.gridProperty.lblRowCount()); }

  lblFilteredRows() { return this.elmtProc.getEl(this.gridProperty.lblFilteredRows()); }

  tblColumnHeader(columnHeader) { return this.elmtProc.getEl(this.gridProperty.tblColumnHeader(columnHeader)); }

  tblColumnHeaderNoCheck(columnHeader) { return this.elmtProc.getElWithoutCheck(this.gridProperty.tblColumnHeader(columnHeader)); }

  tblColumnHeaderGroup(columnHeader) { return this.elmtProc.getEl(this.gridProperty.tblColumnHeaderGroup(columnHeader)); }

  tblColumnHeaderGroupNoCheck(columnHeader) { return this.elmtProc.getElWithoutCheck(this.gridProperty.tblColumnHeaderGroup(columnHeader)); }

  txtShowHideSearch() { return this.elmtProc.getEl(this.gridProperty.txtShowHideSearch()); }

  tblPinnedLeftHeader() { return this.elmtProc.getEl(this.gridProperty.tblPinnedLeftHeader()); }

  tblPinnedRightHeader() { return this.elmtProc.getEl(this.gridProperty.tblPinnedRightHeader()); }

  tblLeftPinnedColumn(columnHeader) { return this.elmtProc.getEl(this.gridProperty.tblLeftPinnedColumn(columnHeader)); }

  tblLeftPinnedColumnNoCheck(columnHeader) { return this.elmtProc.getElWithoutCheck(this.gridProperty.tblRightPinnedColumn(columnHeader)); }

  tblRightPinnedColumn(columnHeader) { return this.elmtProc.getEl(this.gridProperty.tblRightPinnedColumn(columnHeader)); }

  tblRightPinnedColumnNoCheck(columnHeader) { return this.elmtProc.getElWithoutCheck(this.gridProperty.tblRightPinnedColumn(columnHeader)); }

  lblLastUpdated() { return this.elmtProc.getEl(this.gridProperty.lblLastUpdated()); }

  btnShowToday() { return this.elmtProc.getEl(this.gridProperty.btnShowToday()); }

  mnuExportToExcel() { return this.elmtProc.getEl(this.gridProperty.mnuExportToExcel()); }

  mnuVisibleColumns() { return this.elmtProc.getEl(this.gridProperty.mnuVisibleColumns()); }

  mnuAllColumns() { return this.elmtProc.getEl(this.gridProperty.mnuAllColumns()); }

  mnuClearColumnFiltersContextMenu() { return this.elmtProc.getEl(this.gridProperty.mnuClearColumnFiltersContextMenu()); }

  chkRtuIcon() { return this.elmtProc.getEl(this.gridProperty.chkRtuIcon()); }

  lblRtuPopOver() { return this.elmtProc.getEl(this.gridProperty.lblRtuPopOver()); }

  chkRtuOuterGreenIcon() { return this.elmtProc.getEl(this.gridProperty.chkRtuOuterGreenIcon()); }

  chkRtuInnerRedIcon() { return this.elmtProc.getEl(this.gridProperty.chkRtuInnerRedIcon()); }

  chkRtuAmberIcon() { return this.elmtProc.getEl(this.gridProperty.chkRtuAmberIcon()); }

  mnuColHeaderRow() { return this.elmtProc.getEl(this.gridProperty.mnuColHeaderRow()); }

  mnuColHeaders(headerRow) { return this.elmtProc.getChildElements(headerRow, './div[@col-id]'); }

  btnColFilterIcon(columnId) { return this.elmtProc.getEl(this.gridProperty.btnColFilterIcon(columnId)); }
}

module.exports = GridColumnPageObject;
