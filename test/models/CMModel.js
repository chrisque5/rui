/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const Logs = require('../core/utility/Logs');
const CMsPageObject = require('../pageobjects/CMPageObject');
const StopWatch = require('../core/utility/StopWatch');
const PopUpModel = require('./PopUpNavigationModel');
const ElementVisibility = require('../core/element/ElementVisibility');
const {
  ClickActions,
  ElementActions,
  GetTextActions,
  InputActions,
  WindowActions,
} = require('../core/actions/ActionsIndex');

class CMModel {
  constructor() {
    this.elVisibility = new ElementVisibility();
    this.log = new Logs();
    this.cm = new CMsPageObject();
    this.watch = new StopWatch();
    this.popUp = new PopUpModel();
    this.clickActions = new ClickActions();
    this.elementActions = new ElementActions();
    this.textActions = new GetTextActions();
    this.inputActions = new InputActions();
    this.winActions = new WindowActions();
  }
  // Fav Star Btn

  clickBuyerStarBtn() { this.clickActions.clickByJScript(this.cm.btnStarBuyer()); }

  clickSellerStarBtn() { this.clickActions.clickByJScript(this.cm.btnStarSeller()); }

  clickBuyerNettBroBtn() { this.clickActions.clickByJScript(this.cm.btnNettBroBuyer()); }

  clickSellerNettBroBtn() { this.clickActions.clickByJScript(this.cm.btnNettBroSeller()); }

  clickcp2BuyerStarBtn() { this.clickActions.clickByJScript(this.cm.btncp2StarBuyer()); }

  clickcp2SellerStarBtn() { this.clickActions.clickByJScript(this.cm.btncp2StarSeller()); }

  // Fav Broker

  selectFavClient(firmName) { this.clickActions.click(this.cm.btnHotListClient(firmName)); }

  // Fav Broker

  selectFavBroker(brokerName) {
    this.winActions.scroll(this.cm.btnHotListBroker(brokerName));
    this.clickActions.click(this.cm.btnHotListBroker(brokerName));
  }

  deleteAllFavBroker() {
    const favBrokerList = this.cm.liHotListBroker();
    const favBrokerArray = [];
    if (favBrokerList === null) {
      this.log.log('Brokers are not available.');
      return;
    }

    const brokerTabs = this.cm.tabHotListBroker(favBrokerList[0]);

    brokerTabs.forEach((tab) => {
      this.log.log(`brokerTabs: ${JSON.stringify(tab)}`);
      favBrokerArray.push(this.textActions.getTxt(tab));
    });
    this.log.log(`favBrokerArray: ${favBrokerArray}`);

    for (let i = 0; i < favBrokerArray.length; i += 1) {
      this.log.log(`Closing broker tab for: ${favBrokerArray[i]}`);
      this.closeFavBroker(favBrokerArray[i].toLowerCase());
      expect('Are you sure you want to hide this Broker tab?').to.equal(this.popUp.getPopUpMessageText());
      this.popUp.closeFavPopUpMessage();
    }
  }

  getFavBrokerText(brokerName) { return this.textActions.getTxt(this.cm.btnHotListBroker(brokerName)); }

  closeFavBroker(brokerName) { this.clickActions.click(this.cm.btnHotListCloseBroker(brokerName)); }

  // Fav Trader
  selectFavTrader(traderName) { this.clickActions.click(this.cm.btnHotListTrader(traderName)); }

  rightClickFavTrader(traderName) {
    this.log.log(`right clicking on ${traderName}`);
    this.clickActions.rightClick(this.cm.btnHotListTrader(traderName));
  }

  verifyMenuVisible() {
    this.watch.startStopWatch(2);
    while (this.watch.isWatchRunning()) {
      const att = this.elementActions.getAttribute(this.cm.mnuRightClick(), 'class');
      if ((att !== null) && (att.includes('ant-dropdown-hidden') === false)) {
        this.log.log('Right click menu visible');
        return true;
      }
    }
    this.log.log('Right click menu not visible');
    return false;
  }

  getFavTraderText(trader) { return this.textActions.getTxt(this.cm.btnHotListTrader(trader)); }

  closeFavTrader(trader) { this.clickActions.click(this.cm.btnCloseHotListTrader(trader)); }

  isFavTraderVisible(brokerName, isVisible) {
    const element = this.cm.btnHotListTrader(brokerName);
    if (isVisible === true) {
      if (element !== null && this.elVisibility.checkVisibility(element, 'enabled_and_visible', '2')) {
        return true;
      }
    } if (isVisible === false) {
      if (element === null || (this.elVisibility.checkVisibility(element, 'notvisible', '2'))) {
        return true;
      }
    }
    return false;
  }

  // Fav Currency
  clickCurrencyPairStarBtn() { this.clickActions.click(this.cm.btnStarCurrency()); }

  selectFavCurrency(currency) { this.clickActions.clickByJScript(this.cm.btnHotListCurrency(currency)); }

  getFavCurrencyText(currency) { return this.textActions.getTxt(this.cm.btnHotListCurrency(currency)); }

  closeFavCurrency(currency) { this.clickActions.click(this.cm.btnCloseHotListCurrency(currency)); }

  isFavCurrencyPairVisible(currency, isVisible) {
    const curElement = this.cm.btnHotListCurrency(currency);
    if (curElement !== null && isVisible === true) {
      if (this.elVisibility.checkVisibility(curElement, 'enabled_and_visible', '2')) {
        return true;
      }
    } if (isVisible === false) {
      if (curElement === null || (this.elVisibility.checkVisibility(curElement, 'notvisible', '2'))) {
        return true;
      }
    }
    return false;
  }

  // Fav Term
  clickTermStarBtn() { this.clickActions.clickByJScript(this.cm.btnStarTerm()); }

  selectFavTerm(term) { this.clickActions.click(this.cm.btnHotListTerm(term)); }

  getFavTermText(term) {
    const element = this.cm.btnHotListTerm(term);
    return this.textActions.getTxt(element);
  }

  closeFavTerm(term) { this.clickActions.clickByJScript(this.cm.btnCloseHotListTerm(term)); }

  isFavTermVisible(term, isVisible) {
    const termElement = this.cm.btnHotListTerm(term);
    if (isVisible === true) {
      if (termElement !== null && this.elVisibility.checkVisibility(termElement, 'enabled_and_visible', '2')) {
        return true;
      }
    } if (isVisible === false) {
      if (termElement === null || (this.elVisibility.checkVisibility(termElement, 'notvisible', '2'))) {
        return true;
      }
    }
    return false;
  }

  // Fav Exec Venue
  clickExecVenueStarBtn() { this.clickActions.clickByJScript(this.cm.btnStarVenue()); }

  getFavVenueText(executionVenue) { return this.textActions.getTxt(this.cm.btnHotListVenue(executionVenue)); }

  selectFavVenue(executionVenue) { this.clickActions.click(this.cm.btnHotListVenue(executionVenue)); }

  closeFavVenue(executionVenue) { this.clickActions.clickByJScript(this.cm.btnCloseHotListVenue(executionVenue)); }

  isFavVenueVisible(executionVenue, isVisible) {
    const venElement = this.cm.btnHotListVenue(executionVenue);

    if (isVisible === true) {
      if (venElement !== null && this.elVisibility.checkVisibility(venElement, 'enabled_and_visible', '2')) {
        return true;
      }
    } if (isVisible === false) {
      if (venElement === null || (this.elVisibility.checkVisibility(venElement, 'notvisible', '2'))) {
        return true;
      }
    }
    return false;
  }

  // Fav Value Date
  clickValueDateStarBtn() { this.clickActions.clickByJScript(this.cm.btnStarValueDate()); }

  getFavValueDateText(valueDate) { return this.textActions.getTxt(this.cm.btnHotListValueDate(valueDate)); }

  selectFavValueDate(favDate) {
    this.clickActions.clickByJScript(this.cm.btnHotListValueDate(favDate));
  }

  closeFavValueDate(executionVenue) { this.clickActions.click(this.cm.btnCloseHotListValueDate(executionVenue)); }

  reNameFavTrader(reName) {
    this.clickReNameBtn();
    this.inputReNameForTrader(reName);
    this.clickReNameSaveBtn();
    this.waitReNameMaskRemoval();
  }

  clickReNameBtn(index) {
    this.clickActions.click(this.cm.reNameBtn(index));
  }

  inputReNameForTrader(traderName) {
    this.clickActions.clickByJScript(this.cm.reNameInput());
    this.inputActions.clearByBackSpace(this.cm.reNameInput().getValue().length);
    this.inputActions.inputValue(this.cm.reNameInput(), traderName);
  }

  clickReNameSaveBtn() {
    this.clickActions.clickByJScript(this.cm.reNameSaveBtn());
  }

  clickReNameCancelBtn() {
    this.clickActions.click(this.cm.reNameCancelBtn());
  }

  clickEditColourBtn(index) {
    const elementClrBrn = this.cm.editColourBtn(index);
    this.clickActions.click(elementClrBrn);
    this.log.log('Successfully clicked on editColourBtn');
  }

  clickColourBtn(colour) {
    this.clickActions.clickByJScript(this.cm.btnFavColour(colour));
    this.log.log(`Successfully clicked on ${colour} button`);
  }

  dblClickColourBtn(colour) {
    const elmt = this.cm.btnFavColour(colour);
    this.clickActions.click(elmt);
    this.clickActions.click(elmt);
    // this.clickActions.dblClick(this.cm.btnFavColour(colour));
    this.log.log(`Successfully clicked on ${colour} button`);
  }

  isColourModalClose() {
    this.watch.startStopWatch(1);
    while (this.watch.isWatchRunning()) {
      const elementId = this.cm.btnRestColourModalClose();
      if (elementId === null) {
        this.log.log('Colour Modal is closed.');
        return true;
      }
    }
    return false;
  }

  isColourModalOpen() {
    this.watch.startStopWatch(1);
    while (this.watch.isWatchRunning()) {
      const elementId = this.cm.btnRestColourModalClose();
      if (elementId !== null) {
        this.log.log('Colour Modal is open.');
        return true;
      }
    }
    return false;
  }

  verifyFavTraderBtnColour(traderName, colour) {
    this.watch.startStopWatch(6);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.cm.btnHotListTrader(traderName), 'style').includes(`background-color: rgb(${colour});`) === true) {
        this.log.log(`${traderName} fav button has ${colour} background`);
        return true;
      }
    }
    this.log.log(`${traderName} fav button does not have ${colour} background`);
    return false;
  }

  verifyFavCurrencyBtnColour(currency, colour) {
    this.watch.startStopWatch(1);
    while (this.watch.isWatchRunning()) {
      const ccyBtn = this.elementActions.getAttribute(this.cm.btnHotListCurrency(currency), 'style');
      if (ccyBtn && ccyBtn.includes(`background-color: rgb(${colour});`) === true) {
        this.log.log(`${currency} fav button has ${colour} background`);
        return true;
      }
    }
    this.log.log(`${currency} fav button does not have ${colour} background`);
    return false;
  }

  verifyFavTermBtnColour(term, colour) {
    this.watch.startStopWatch(1);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.cm.btnHotListTerm(term), 'style').includes(`background-color: rgb(${colour});`) === true) {
        this.log.log(`${term} fav button has ${colour} background`);
        return true;
      }
    }
    this.log.log(`${term} fav button does not have ${colour} background`);
    return false;
  }

  verifyFavExecVenueBtnColour(venue, colour) {
    this.watch.startStopWatch(3);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.getAttribute(this.cm.btnHotListVenue(venue), 'style').includes(`background-color: rgb(${colour});`) === true) {
        this.log.log(`${venue} fav button has ${colour} background`);
        return true;
      }
    }
    this.log.log(`${venue} fav button does not have ${colour} background`);
    return false;
  }

  dragNdropFavTrader(sourceTrader, targetTrader) {
    const source = this.cm.btnHotListTrader(sourceTrader);
    const target = this.cm.btnHotListTrader(targetTrader);
    this.mouseActions.dragNDropByActions(source, target);
  }

  waitReNameMaskRemoval() {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      if (this.elementActions.isAvailable(this.cm.pageMask()) === false) {
        return true;
      }
    }
    return false;
  }

  verifyClientBtnFavActive(firmName) {
    if (this.elementActions.getAttribute(this.cm.btnHotListClient(firmName), 'class').includes('active') === true) {
      this.log.log('Client/Firm button is enabled.');
      return true;
    }
    this.log.log('Client/Firm button is disabled.');
    return false;
  }
}
module.exports = CMModel;
