/* eslint-disable max-len */
/* eslint-disable no-undef */
const BlotterModel = require('./BlotterModel');
const ClickActions = require('../../core/actions/ClickActions');
const GetTextActions = require('../../core/actions/GetTextActions');
const KeyboardActions = require('../../core/actions/KeyboardActions');
const InputActions = require('../../core/actions/InputActions');
const ElementActions = require('../../core/actions/ElementActions');
const WindowActions = require('../../core/actions/WindowActions');
const MouseActions = require('../../core/actions/MouseMovementActions');
const Logs = require('../../core/utility/Logs');
const ElementVisibility = require('../../core/element/ElementVisibility');
const LoginLogout = require('../../pageobjects/LoginLogoutPageObject');
const GridColumnObject = require('../../pageobjects/blotter/components/GridColumnPageObject');
const GridCellObject = require('../../pageobjects/blotter/components/GridCellPageObject');
const FilterPageObject = require('../../pageobjects/blotter/components/FilterPageObject');
const SearchPageObject = require('../../pageobjects/blotter/components/SearchPageObject');
const StopWatch = require('../../core/utility/StopWatch');
const PopUpModel = require('../PopUpNavigationModel');
const ElementFinder = require('../../core/element/ElementFinder');
const Date = require('../../components/ndf/Date');
const BlotterData = require('../../data/blotter/BlotterData');

class BlotterSearchModel {
  constructor() {
    this.blotter = new BlotterModel();
    this.clickActions = new ClickActions();
    this.textActions = new GetTextActions();
    this.keyboardActions = new KeyboardActions();
    this.inputActions = new InputActions();
    this.elementActions = new ElementActions();
    this.windowActions = new WindowActions();
    this.mouseActions = new MouseActions();
    this.log = new Logs();
    this.elVisibility = new ElementVisibility();
    this.LoginLogout = new LoginLogout();
    this.gridPage = new GridColumnObject();
    this.gridCell = new GridCellObject();
    this.filterPage = new FilterPageObject();
    this.searchPage = new SearchPageObject();
    this.watch = new StopWatch();
    this.popUp = new PopUpModel();
    this.elFinder = new ElementFinder();
    this.date = new Date();
  }

  showBlotterSearch() {
    this.clickActions.clickByJScript(this.searchPage.btnShowSearch());
  }

  verifyBlotterSearchVisible() {
    this.watch.startStopWatch(10);
    const chkState = this.elementActions.getAttribute(this.searchPage.mskSearchDrawer(), 'class');
    while (this.watch.isWatchRunning()) {
      if (chkState.includes('ant-drawer-open')) {
        this.log.log('Blotter Search pane is now visible.');
        return true;
      }
    }
    this.log.log('Blotter Search pane not visible.');
    return false;
  }

  clickResetButton() {
    this.clickActions.click(this.searchPage.btnReset());
  }

  clickSearchButton() {
    this.clickActions.click(this.searchPage.btnSearch());
  }

  clickGridMask() {
    this.clickActions.click(this.searchPage.mskGrid());
  }

  clickDealIdClear() {
    this.clickActions.click(this.searchPage.btnClearDealId());
  }

  clickBrokerClear() {
    this.clickActions.click(this.searchPage.btnClearBroker());
  }

  clickCustomerClear() {
    this.clickActions.click(this.searchPage.btnClearCustomer());
  }

  clickTraderClear() {
    this.clickActions.click(this.searchPage.btnClearTrader());
  }

  isDatePanelClose() { return this.date.isDatePanelClose(); }

  getDateFrom() {
    const dateFrom = this.textActions.getVal(this.searchPage.dptDateFrom());
    this.log.log(`Date from = ${dateFrom}`);
    return dateFrom;
  }

  inputDateFrom(date) {
    this.clickActions.click(this.searchPage.dptDateFrom());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.searchPage.dptDateFrom(), date);
    this.keyboardActions.enterKeys('Enter');
    this.isDatePanelClose();
  }

  getDateTo() {
    const dateTo = this.textActions.getVal(this.searchPage.dptDateTo());
    this.log.log(`Date from = ${dateTo}`);
    return dateTo;
  }

  inputDateTo(date) {
    this.clickActions.click(this.searchPage.dptDateTo());
    this.inputActions.clearByBackSpace(10);
    this.inputActions.inputValue(this.searchPage.dptDateTo(), date);
    this.keyboardActions.enterKeys('Enter');
    this.isDatePanelClose();
  }

  getDealIdSearch() {
    const dealId = this.textActions.getVal(this.searchPage.txtDealId());
    this.log.log(`Deal ID = ${dealId}`);
    return dealId;
  }

  inputDealId(deal) {
    if (this.getDealIdSearch() !== '') {
      this.clickDealIdClear();
    }
    this.clickActions.click(this.searchPage.txtDealId());
    this.inputActions.inputValue(this.searchPage.txtDealId(), deal);
  }

  searchDealId(deal) {
    this.inputDealId(deal);
    this.clickSearchButton();
  }

  hoverhoverDealId() {
    const element = this.searchPage.txtDealId();
    this.mouseActions.moveTo(element);
  }

  getFieldValidationText(text) {
    let returnValue = '';
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning() && returnValue === '') {
      returnValue = this.textActions.getTxt(this.searchPage.lblInputValidate(text));
      if (returnValue !== '' && returnValue !== null) {
        return returnValue;
      }
    }
    return returnValue;
  }

  searchDealIdByKeys(deal) {
    this.inputDealId(deal);
    this.keyboardActions.enterKeys('Enter');
  }

  getBrokerText() {
    const txtBroker = this.textActions.getVal(this.searchPage.txtBroker());
    this.log.log(`Broker text = ${txtBroker}`);
    return txtBroker;
  }

  inputBroker(broker) {
    if (this.getBrokerText() !== '') {
      this.clickBrokerClear();
    }
    this.clickActions.click(this.searchPage.txtBroker());
    this.inputActions.inputValue(this.searchPage.txtBroker(), broker);
  }

  getCustomerText() {
    const txtCustomer = this.textActions.getVal(this.searchPage.txtCustomer());
    this.log.log(`Broker text = ${txtCustomer}`);
    return txtCustomer;
  }

  inputCustomer(customer) {
    if (this.getCustomerText() !== '') {
      this.clickCustomerClear();
    }
    this.clickActions.click(this.searchPage.txtCustomer());
    this.inputActions.inputValue(this.searchPage.txtCustomer(), customer);
  }

  getTraderText() {
    const txtTrader = this.textActions.getVal(this.searchPage.txtTrader());
    this.log.log(`Broker text = ${txtTrader}`);
    return txtTrader;
  }

  getSearchResultText() {
    const txtSearchResult = this.textActions.getTxt(this.searchPage.lblSearchResult());
    this.log.log(`lblSearchResult text = ${txtSearchResult}`);
    return txtSearchResult;
  }

  getDateBrokerText() {
    const txtDateBrokerResult = this.textActions.getTxt(this.searchPage.lblDateBrokerSearch());
    this.log.log(`lblDateBrokerSearch text = ${txtDateBrokerResult}`);
    return txtDateBrokerResult;
  }

  getCustTraderSearchText() {
    const txtCustTraderSearch = this.textActions.getTxt(this.searchPage.lblCustTraderSearch());
    this.log.log(`lblCustTraderSearch text = ${txtCustTraderSearch}`);
    return txtCustTraderSearch;
  }

  inputTrader(trader) {
    if (this.getTraderText() !== '') {
      this.clickTraderClear();
    }
    this.clickActions.click(this.searchPage.txtTrader());
    this.inputActions.inputValue(this.searchPage.txtTrader(), trader);
  }

  searchBroker(broker) {
    this.inputBroker(broker);
    this.clickSearchButton();
  }

  searchBrokerByKeys(broker) {
    this.inputBroker(broker);
    this.keyboardActions.enterKeys('Enter');
  }

  searchCustomer(customer) {
    this.inputCustomer(customer);
    this.clickSearchButton();
  }

  searchCustomerByKeys(customer) {
    this.inputCustomer(customer);
    this.keyboardActions.enterKeys('Enter');
  }

  searchTrader(trader) {
    this.inputTrader(trader);
    this.clickSearchButton();
  }

  searchTraderByKeys(trader) {
    this.inputTrader(trader);
    this.keyboardActions.enterKeys('Enter');
  }

  verifyTradeDateRange(index, dateFrom, dateTo) {
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.TradeDate.Header));
    const list = [];
    for (let i = 1; i <= index; i += 1) {
      this.log.log(`Checking row ${i} of ${index}`);
      list.push(this.textActions.getTxt(this.gridCell.txtTradeDateByIndex(index)));
      this.blotter.scrollDown();
    }
    this.blotter.scrollDown();
    this.log.log(`Checking final row ${index} of ${index}`);
    list.push(this.textActions.getTxt(this.gridCell.txtTradeDateByIndex(index)));

    function dateToNum(d) {
      // Convert date "DD/MM/YYYY" to YYYYMMDD int
      d = d.split('/'); return Number(d[2] + d[1] + d[0]);
    }
    list.sort((a, b) => dateToNum(a) - dateToNum(b));
    const dateFromInt = dateToNum(dateFrom);
    const dateToInt = dateToNum(dateTo);

    if (list[0] < dateFromInt || list[list.length - 1] > dateToInt) {
      this.log.log('Search results contain dates outside of date range. Please check ');
      return false;
    }
    return true;
  }

  verifyFirstAndLastBrokerSearch(rowCount, brokerName, MATCHER) {
    const brokerList = [];
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerBroker.Header));

    this.blotter.filterColumnByCellValue(BlotterData.SellerBroker.Header, BlotterData.SellerBroker.ColId, brokerName);

    const index1 = parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10);
    if (index1 !== 0) {
      brokerList.push(this.textActions.getTxt(this.gridCell.txtSellerBrokerByRowIndex(1)));
      this.blotter.scrollDownByRows(index1);
      brokerList.push(this.textActions.getTxt(this.gridCell.txtSellerBrokerByRowIndex(index1 - 1)));
    }

    this.blotter.removeColumnFilter(BlotterData.SellerBroker.Header, BlotterData.SellerBroker.ColId);

    this.blotter.filterColumnByCellValue(BlotterData.BuyerBroker.Header, BlotterData.BuyerBroker.ColId, brokerName);

    const index2 = parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10);
    if (index2 !== 0) {
      brokerList.push(this.textActions.getTxt(this.gridCell.txtBuyerBrokerByRowIndex(1)));
      this.blotter.scrollDownByRows(index2);
      brokerList.push(this.textActions.getTxt(this.gridCell.txtBuyerBrokerByRowIndex(index2 - 1)));
    }
    this.blotter.removeColumnFilter(BlotterData.BuyerBroker.Header, BlotterData.BuyerBroker.ColId);

    this.log.log(`Checking that ${index1} + ${index2} is equal to ${rowCount}`);
    if (index1 + index2 !== parseInt(rowCount, 10)) { return false; }

    for (let i = 0; i < brokerList.length; i += 1) {
      this.log.log(`Comparing ${brokerList[i]} with ${brokerName}`);
      if (brokerList[i] !== brokerName) {
        this.log.log(`Search results do not all contain ${brokerName}`);
        return false;
      }
    }
    return true;
  }

  verifyFirstAndLastCustomerSearch(rowCount, customerName, MATCHER) {
    const customerList = [];
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerCust.Header));

    this.blotter.filterColumnByCellValue(BlotterData.SellerCust.Header, BlotterData.SellerCust.ColId, customerName);
    const index1 = parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10);
    if (index1 !== 0) {
      customerList.push(this.textActions.getTxt(this.gridCell.txtSellerCustomerByRowIndex(1)));
      this.blotter.scrollDownByRows(index1);
      customerList.push(this.textActions.getTxt(this.gridCell.txtSellerCustomerByRowIndex(index1 - 1)));
    }

    this.blotter.removeColumnFilter(BlotterData.SellerCust.Header, BlotterData.SellerCust.ColId);

    this.blotter.filterColumnByCellValue(BlotterData.BuyerCust.Header, BlotterData.BuyerCust.ColId, customerName);
    const index2 = parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10);
    if (index2 !== 0) {
      customerList.push(this.textActions.getTxt(this.gridCell.txtBuyerCustomerByRowIndex(1)));
      this.blotter.scrollDownByRows(index2);
      customerList.push(this.textActions.getTxt(this.gridCell.txtBuyerCustomerByRowIndex(index2 - 1)));
    }
    this.blotter.removeColumnFilter(BlotterData.BuyerCust.Header, BlotterData.BuyerCust.ColId);

    this.log.log(`Checking that ${index1} + ${index2} is equal to ${rowCount}`);
    if (index1 + index2 !== parseInt(rowCount, 10)) { return false; }

    for (let i = 0; i < customerList.length; i += 1) {
      this.log.log(`Comparing ${customerList[i]} with ${customerName}`);
      if (customerList[i] !== customerName) {
        this.log.log(`Search results do not all contain ${customerName}`);
        return false;
      }
    }
    return true;
  }

  verifyFirstAndLastTraderSearch(rowCount, traderName, MATCHER) {
    const traderList = [];
    this.blotter.bringColumnIntoView(this.gridPage.tblColumnHeaderNoCheck(BlotterData.SellerTrader.Header));

    this.blotter.filterColumnByCellValue(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId, traderName);
    const index1 = parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10);
    if (index1 !== 0) {
      traderList.push(this.textActions.getTxt(this.gridCell.txtSellerTraderByRowIndex(1)));
      this.blotter.scrollDownByRows(index1);
      traderList.push(this.textActions.getTxt(this.gridCell.txtSellerTraderByRowIndex(index1 - 1)));
    }

    this.blotter.removeColumnFilter(BlotterData.SellerTrader.Header, BlotterData.SellerTrader.ColId);

    this.blotter.filterColumnByCellValue(BlotterData.BuyerTrader.Header, BlotterData.BuyerTrader.ColId, traderName);
    const index2 = parseInt(this.blotter.getRowCount().replace(MATCHER, '$1'), 10);
    if (index2 !== 0) {
      traderList.push(this.textActions.getTxt(this.gridCell.txtBuyerTraderByRowIndex(1)));
      this.blotter.scrollDownByRows(index2);
      traderList.push(this.textActions.getTxt(this.gridCell.txtBuyerTraderByRowIndex(index2 - 1)));
    }
    this.blotter.removeColumnFilter(BlotterData.BuyerTrader.Header, BlotterData.BuyerTrader.ColId);

    this.log.log(`Checking that ${index1} + ${index2} is equal to ${rowCount}`);
    if (index1 + index2 !== parseInt(rowCount, 10)) { return false; }

    for (let i = 0; i < traderList.length; i += 1) {
      this.log.log(`Comparing ${traderList[i]} with ${traderName}`);
      if (traderList[i] !== traderName) {
        this.log.log(`Search results do not all contain ${traderName}`);
        return false;
      }
    }
    return true;
  }
}
module.exports = BlotterSearchModel;
