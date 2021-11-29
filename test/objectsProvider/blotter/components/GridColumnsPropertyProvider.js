/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

class GridColumnsPropertyProvider {
  blotterScroll() { return '//div[@class="ag-body-viewport ag-layout-normal ag-row-animation"]@@Enabled_And_Visible||2'; }

  blotterHorizontalScroll() { return '//div[@class="ag-body-horizontal-scroll-viewport"]@@Enabled_And_Visible||2'; }

  rowsBlotter() { return '//div[@class="ag-center-cols-container"]//div[@role="row"]@@Enabled_And_Visible||4'; }

  btnRefresh() { return '//button[@data-testid="btnRefresh"]@@Enabled_And_Visible||2'; }

  btnExport() { return '//button[@data-testid="btnExport"]@@Enabled_And_Visible||2'; }

  txtQuickSearch() { return '//div[@data-testid="txtQuickSearch"]@@Enabled_And_Visible||2'; }

  btnDealExpand() { return '//span[@role="columnheader" and text()="Deal"]/parent::div//span[contains(@ref,"agClosed")and not(contains(@class,"ag-hidden"))]@@Enabled_And_Visible||2'; }

  btnDealContract() { return '//span[@role="columnheader" and text()="Deal"]/parent::div//span[contains(@ref,"agOpened")and not(contains(@class,"ag-hidden"))]@@Enabled_And_Visible||2'; }

  btnColumnMenu(columnId) { return `${'//div[@col-id="TEMP"]//span[@ref="eMenu"]'.replace('TEMP', columnId)}@@Enabled_And_Visible||4`; }

  mnuFilterTab() { return '//div[@class="ag-tab-header"]//span[@class="ag-icon ag-icon-filter"]@@Enabled_And_Visible||2'; }

  mnuFilterTabSelect() { return '//div[@class="ag-tab-header"]//span[@class="ag-icon ag-icon-filter"]/parent::span@@Enabled_And_Visible||2'; }

  chkFilterSelectAll() { return '//div[@ref="eSelectAll"]/span@@Enabled_And_Visible||2'; }

  txtFilterSearch() { return '//div/input[@ref="eMiniFilter"]@@Enabled_And_Visible||2'; }

  chkFilterCheckbox(cellValue) { return `${'//span[contains(@class, "ag-filter-value") and text()="TEMP"]/preceding-sibling::div/span'.replace('TEMP', cellValue)}@@Enabled_And_Visible||4`; }

  chkStpFilterCheckbox(stpLabel) { return `${'//span[contains(@title,"TEMP")]//ancestor::label/div/span'.replace('TEMP', stpLabel)}@@Enabled_And_Visible||4`; }

  mnuMenuTab() { return '//div[@class="ag-tab-header"]//span[@class="ag-icon ag-icon-menu"]@@Enabled_And_Visible||2'; }

  mnuMenuTabSelect() { return '//div[@class="ag-tab-header"]//span[@class="ag-icon ag-icon-menu"]/parent::span@@Enabled_And_Visible||2'; }

  mnuColumnsTab() { return '//div[@class="ag-tab-header"]//span[@class="ag-icon ag-icon-columns"]@@Enabled_And_Visible||2'; }

  mnuColumnsTabSelect() { return '//div[@class="ag-tab-header"]//span[@class="ag-icon ag-icon-columns"]/parent::span@@Enabled_And_Visible||2'; }

  mnuPinColumn() { return '//span[contains(@ref,"eName") and text()="Pin Column"]@@Enabled_And_Visible||2'; }

  mnuPinLeft() { return '//div/span[contains(@ref,"eName") and text()="Pin Left"]@@Enabled_And_Visible||2'; }

  mnuPinRight() { return '//div/span[contains(@ref,"eName") and text()="Pin Right"]@@Enabled_And_Visible||2'; }

  mnuNoPin() { return '//div/span[contains(@ref,"eName") and text()="No Pin"]@@Enabled_And_Visible||2'; }

  mnuResetColumns() { return '//div/span[contains(@ref,"eName") and text()="Reset Columns"]@@Enabled_And_Visible||2'; }

  mnuClearColumnFilters() { return '//div/span[contains(@ref,"eName") and text()="Clear Column Filters"]@@Enabled_And_Visible||2'; }

  chkColumnHide(columnName) { return `${'//span[text()="TEMP"]/preceding-sibling::div//span[contains(@class,"checkbox")]'.replace('TEMP', columnName)}@@Enabled_And_Visible||4`; }

  btnApprovalExpand() { return '//span[@role="columnheader" and text()="Approvals"]/parent::div//span[contains(@ref,"agClosed")and not(contains(@class,"ag-hidden"))]@@Enabled_And_Visible||2'; }

  btnApprovalContract() { return '//span[@role="columnheader" and text()="Approvals"]/parent::div//span[contains(@ref,"agOpened")and not(contains(@class,"ag-hidden"))]@@Enabled_And_Visible||2'; }

  lblRowCount() { return '//div[contains(@class, "ag-status-panel-total-and-filtered-row-count")]/span[@class="ag-name-value-value"]@@Enabled_And_Visible||2'; }

  lblFilteredRows() { return '//div[contains(@class, "ag-status-panel-filtered-row-count")]/span[@ref="eValue"]@@Enabled_And_Visible||2'; }

  tblColumnHeader(columnHeader) { return `${'//span[@ref="eText" and text()="TEMP"]'.replace('TEMP', columnHeader)}@@Enabled_And_Visible||4`; }

  tblColumnHeaderGroup(columnHeader) { return `${'//span[@ref="agLabel" and text()="TEMP"]'.replace('TEMP', columnHeader)}@@Enabled_And_Visible||4`; }

  txtShowHideSearch() { return '//input[@class="ag-primary-cols-filter"]@@Enabled_And_Visible||2'; }

  tblPinnedLeftHeader() { return '//div[contains(@class,"ag-pinned-left-header")]@@Enabled_And_Visible||2'; }

  tblPinnedRightHeader() { return '//div[contains(@class,"ag-pinned-right-header")]@@Enabled_And_Visible||2'; }

  tblLeftPinnedColumn(columnHeader) { return `${'//div[contains(@class,"ag-pinned-left-header")]//span[@ref="eText" and text()="TEMP"]'.replace('TEMP', columnHeader)}@@Enabled_And_Visible||4`; }

  tblRightPinnedColumn(columnHeader) { return `${'//div[contains(@class,"ag-pinned-right-header")]//span[@ref="eText" and text()="TEMP"]'.replace('TEMP', columnHeader)}@@Enabled_And_Visible||4`; }

  lblLastUpdated() { return '//span[@data-testid="blotter-last-updated"]@@Enabled_And_Visible||2'; }

  btnShowToday() { return '//button[@data-testid="btnToday"]@@Enabled_And_Visible||10'; }

  mnuExportToExcel() { return '//span[contains(@ref,"eName") and text()="Export To Excel"]@@Enabled_And_Visible||2'; }

  mnuVisibleColumns() { return '//span[contains(@ref,"eName") and text()="Visible Columns"]@@Enabled_And_Visible||2'; }

  mnuAllColumns() { return '//span[contains(@ref,"eName") and text()="All Columns"]@@Enabled_And_Visible||2'; }

  mnuClearColumnFiltersContextMenu() { return '//span[contains(@ref,"eName") and text()="Clear Column Filters"]@@Enabled_And_Visible||2'; }

  chkRtuIcon() { return '//div[@data-testid="chkRtuIcon"]@@Enabled_And_Visible||2'; }

  lblRtuPopOver() { return '//div[@class="ant-popover-inner-content"]//span@@Enabled_And_Visible||2'; }

  chkRtuOuterGreenIcon() { return '(//div[@data-testid="chkRtuIcon"]//*[name()="svg"]/*[name()="path"])[1]@@Enabled_And_Visible||2'; }

  chkRtuInnerRedIcon() { return '(//div[@data-testid="chkRtuIcon"]//*[name()="svg"]/*[name()="path"])[2]@@Enabled_And_Visible||2'; }

  chkRtuAmberIcon() { return '//span[@data-testid="connectingIcon"]@@Enabled_And_Visible||2'; }

  mnuColHeaderRow() { return '//div[@role="rowgroup"]/div[@aria-rowindex="2"]@@Enabled_And_Visible||2'; }

  btnColFilterIcon(columnId) { return `${'//div[@col-id="TEMP"]//span[@ref="eFilter" and not(contains(@class,"ag-hidden"))]'.replace('TEMP', columnId)}@@Enabled_And_Visible||4`; }
}
module.exports = GridColumnsPropertyProvider;
