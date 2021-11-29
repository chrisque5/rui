/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const Logs = require('../core/utility/Logs');
const Strategy = require('../components/ndf/Strategy');
const Venue = require('../components/ndf/Venue');
const Currency = require('../components/ndf/Currency');
const Term = require('../components/ndf/Term');
const Rate = require('../components/ndf/Rate');
const Points = require('../components/ndf/Points');
const Amount = require('../components/ndf/Amount');
const Date = require('../components/ndf/Date');
const ClientTrader = require('../components/ndf/ClientTrader');
const Broker = require('../components/ndf/DeskBroker');
const Agent = require('../components/ndf/Agents');
const BackDate = require('../components/ndf/BackDate');
const DuplicateDeal = require('../components/ndf/DuplicateDeal');
const CM = require('./CMModel');
const PopUp = require('./PopUpNavigationModel');
const Settings = require('./SettingsModel');
const constants = require('../data/Constants');
const BrokerageStrategy = require('../components/ndf/BrokerageStrategy');

const DealPageObject = require('../pageobjects/DealPageObject');
const StopWatch = require('../core/utility/StopWatch');
const {
  GetTextActions,
  ClickActions,
  ElementActions,
  KeyboardActions,
  WindowActions,
} = require('../core/actions/ActionsIndex');

let dateFormat = '';

class DealModel {
  constructor() {
    this.strategy = new Strategy();
    this.venue = new Venue();
    this.currency = new Currency();
    this.term = new Term();
    this.rate = new Rate();
    this.points = new Points();
    this.amount = new Amount();
    this.date = new Date();
    this.clientTrader = new ClientTrader();
    this.broker = new Broker();
    this.agent = new Agent();
    this.cm = new CM();
    this.popUp = new PopUp();
    this.settings = new Settings();
    this.backDate = new BackDate();
    this.duplicateDeal = new DuplicateDeal();
    this.brokerageStrat = new BrokerageStrategy();

    this.clickActions = new ClickActions();
    this.textActions = new GetTextActions();
    this.elementActions = new ElementActions();
    this.keyboardActions = new KeyboardActions();
    this.windowActions = new WindowActions();
    this.log = new Logs();
    this.deal = new DealPageObject();
    this.watch = new StopWatch();
  }

  // Selecting and entering the details

  getDateFormat() {
    const lang = this.windowActions.browserLanguage();
    this.log.log(`Browser Language is set to : ${lang}`);
    dateFormat = lang === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
    return dateFormat;
  }

  refreshPage() {
    this.windowActions.refreshPage();
  }

  /** ********************************* Strategy ***************************** */

  clickRdoStrategyOutright() { this.strategy.clickRdoStrategyOutright(); }

  clickRdoStrategySpread() { this.strategy.clickRdoStrategySpread(); }

  isOutRightSelected() { return this.strategy.isOutRightSelected(); }

  isSpreadSelected() { return this.strategy.isSpreadSelected(); }

  /** ***************************** Strategy End *************************** */
  /** ***************************** Brokerage Strategy *************************** */

  selectBrokerageStrategy(brokeragestrategy) { return this.brokerageStrat.selectBrokerageStrategy(brokeragestrategy); }

  clickBrokerageStrategy() { this.brokerageStrat.clickBrokerageStrategy(); }

  getBrokerageStrategy() { return this.brokerageStrat.getBrokerageStrategy(); }

  clickBrokerageStrategyLbl() { return this.brokerageStrat.clickBrokerageStrategyLbl(); }

  isBrokerageStrategyVisible(brokeragestrategy) { return this.brokerageStrat.isBrokerageStrategyVisible(brokeragestrategy); }

  getBrokerageStrategyListItems() { return this.brokerStrat.getBrokerageStrategyListItems(); }

  getBrokerageStrategyList() { return this.brokerstrat.getBrokerageStrategyList(); }

  /** ***************************** Brokerage Strategy End *************************** */
  /** ***************************** Venue *************************** */

  clickExecutionVenue() { this.venue.clickExecutionVenue(); }

  getExecutionVenue() { return this.venue.getExecutionVenue(); }

  clickExecVenueLbl() { return this.venue.clickExecVenueLbl(); }

  isExecutionVenueVisible(executionVenue) { return this.venue.isExecutionVenueVisible(executionVenue); }

  getExecutionVenueListItems() { return this.venue.getExecutionVenueListItems(); }

  getExecutionVenueList() { return this.venue.getExecutionVenueList(); }

  /** ***************************** Venue End *************************** */

  /** ********************************* Currency ***************************** */

  selectBaseCurrency(baseCurrency, notClick) { this.currency.selectBaseCurrency(baseCurrency, notClick); }

  getMainCurrency() { return this.currency.getMainCurrency(); }

  isPageReset() { return this.currency.isPageReset(); }

  selectCurrency(currency) { this.currency.selectCurrency(currency); }

  getCurrency() { return this.currency.getCurrency(); }

  isCurrency2Focused() { return this.currency.isCurrency2Focused(); }

  selectCurrencyWithoutVerification(currencyName) { this.currency.selectCurrencyWithoutVerification(currencyName); }

  selectCurrencyByKeys(currencyName) { this.currency.selectCurrencyByKeys(currencyName); }

  selectDealtCurrency(currencyName) { this.currency.selectDealtCurrency(currencyName); }

  getDealtCurrency() { return this.currency.getDealtCurrency(); }

  isDealtCCYFocused() { return this.currency.isDealtCCYFocused(); }

  selectDealtCurrencyByKeys(currencyName) { this.currency.selectDealtCurrencyByKeys(currencyName); }

  verifyCurrencyCasCadClose(notClick) { return this.currency.verifyCurrencyCasCadClose(notClick); }

  getCurrencyListItems() { return this.currency.getCurrencyListItems(); }

  verifyCurrencyListOrder(currencyList) { return this.currency.verifyCurrencyListOrder(currencyList); }

  clickLblDealtCcy() { return this.currency.clickLblDealtCcy(); }

  /** ***************************** Currency End ************************** */

  /** ********************************* Term ****************************** */

  inputTerm(term) { this.term.inputTerm(term); }

  inputPartialTermByKeys(term) { this.term.inputPartialTermByKeys(term); }

  inputTermWithTab(term) { this.term.inputTermWithTab(term); }

  getTerm() { return this.term.getTerm(); }

  hoverTerm1() { this.term.hoverTerm1(); }

  isTerm1Focused() { return this.term.isTerm1Focused(); }

  inputTerm2(term2) { this.term.inputTerm2(term2); }

  inputTerm2WithTab(term2) { this.term.inputTerm2WithTab(term2); }

  txtInputTerm2(term) { this.term.txtInputTerm2(term); }

  getTerm2() { return this.term.getTerm2(); }

  isTerm2Focused() { return this.term.isTerm2Focused(); }

  validateTermDropdownItems(term) { return this.term.validateTermDropdownItems(term); }

  /** ******************************* Term End **************************** */

  /** ********************************* Price/Rate ************************ */

  inputPrice(price) { this.rate.inputPrice(price); }

  getPrice() { return this.rate.getPrice(); }

  getPriceWithoutWait() { return this.rate.getPriceWithoutWait(); }

  verifyPrice1Empty() { return this.rate.verifyPrice1Empty(); }

  hoverPrice1() { this.rate.hoverPrice1(); }

  waitForPrice1(timeOut) { return this.rate.waitForPrice1(timeOut); }

  isPrice1Focused() { return this.rate.isPrice1Focused(); }

  // Price 2

  inputPrice2(price2) { this.rate.inputPrice2(price2); }

  getPrice2() { return this.rate.getPrice2(); }

  getPrice2WithoutWait() { return this.rate.getPrice2WithoutWait(); }

  hoverPrice2() { return this.rate.hoverPrice2(); }

  verifyPrice2Empty() { return this.rate.verifyPrice2Empty(); }

  waitForPrice2(timeOut) { return this.rate.waitForPrice2(timeOut); }

  isPrice2Focused() { return this.rate.isPrice2Focused(); }

  /** ******************************* Price End *************************** */

  /** ******************************* Point End *************************** */

  inputPoints(points) { this.points.inputPoints(points); }

  getPoints() { return this.points.getPoints(); }

  hoverPoints() { this.points.hoverPoints(); }

  isPointsFocused() { return this.points.isPointsFocused(); }

  getFieldValidationText(text) { return this.points.getFieldValidationText(text); }

  /** ******************************* Point End *************************** */

  /** ********************************* Amount **************************** */
  // Amount 1
  inputAmount(amount) { this.amount.inputAmount(amount); }

  inputAmountWithEnter(amount) { this.amount.inputAmountWithEnter(amount); }

  inputAmountWithoutKeys(amount) { this.amount.inputAmountWithoutKeys(amount); }

  getAmount() { return this.amount.getAmount(); }

  clickAmount() { this.amount.clickAmount(); }

  hoverAmount1() { this.amount.hoverAmount1(); }

  isAmount1Focused() { return this.amount.isAmount1Focused(); }

  // Amount 2
  clickAmount2() { this.amount.clickAmount2(); }

  inputAmount2(amount2) { this.amount.inputAmount2(amount2); }

  inputAmount2WithEnter(amount) { this.amount.inputAmount2WithEnter(amount); }

  getAmount2() { return this.amount.getAmount2(); }

  hoverAmount2() { this.amount.hoverAmount2(); }

  getAmount2WithoutWait() { return this.amount.getAmount2WithoutWait(); }

  isAmount2Focused() { return this.amount.isAmount2Focused(); }

  /** ******************************* Amount End ************************** */

  /** ********************************* Date **************************** */
  // Fixing Date
  inputFixingDate(date) { this.date.inputFixingDate(date); }

  getfixingDate() { return this.date.getfixingDate(); }

  inputFixingDate2(date) { this.date.inputFixingDate2(date); }

  getfixingDate2() { return this.date.getfixingDate2(); }

  // Value Date
  inputValueDate(date) { this.date.inputValueDate(date); }

  getValueDate() { return this.date.getValueDate(); }

  isValueDateUpdated(oldValue) { return this.date.isValueDateUpdated(oldValue); }

  inputValueDate2(date) { this.date.inputValueDate2(date); }

  getValueDate2() { return this.date.getValueDate2(); }

  // Publish Date

  inputPublishDate(date) { this.date.inputPublishDate(date); }

  getPublishDate() { return this.date.getPublishDate(); }

  inputPublishDate2(date) { this.date.inputPublishDate2(date); }

  getPublishDate2() { return this.date.getPublishDate2(); }

  // Day Count

  getDayCount() { return this.date.getDayCount(); }

  getDayCount2() { return this.date.getDayCount2(); }

  isDayCountUpdated(oldValue) { return this.date.isDayCountUpdated(oldValue); }

  isDatePanelClose() { return this.date.isDatePanelClose(); }
  /** ******************************* Date End ************************** */

  /** ******************************* Client/Trader ************************** */
  // Buyer
  selectBuyerTrader(buyerFirmName, buyerTraderName, autoTab) { this.clientTrader.selectBuyerTrader(buyerFirmName, buyerTraderName, autoTab); }

  selectBuyerTraderBySearchLowerKeys(buyerFirmName, buyerTraderName) { this.clientTrader.selectBuyerTraderBySearchLowerKeys(buyerFirmName, buyerTraderName); }

  selectBuyerTraderBySearchUpperKeys(buyerFirmName, buyerTraderName) { this.clientTrader.selectBuyerTraderBySearchUpperKeys(buyerFirmName, buyerTraderName); }

  inputBuyerTraderByKeys(buyerTrader) { this.clientTrader.inputBuyerTraderByKeys(buyerTrader); }

  getBuyerClientTraderLbl() { return this.clientTrader.getBuyerClientTraderLbl(); }

  hoverBuyerInfoIcon() { this.clientTrader.hoverBuyerInfoIcon(); }

  hoverBuyerClientTrader() { this.clientTrader.hoverBuyerClientTrader(); }

  isBuyerClientTraderFocused() { return this.clientTrader.isBuyerClientTraderFocused(); }

  isAnyErrorOnBuyerTrader() { return this.clientTrader.isAnyErrorOnBuyerTrader(); }

  // 3CP
  selectcp2BuyerTrader(buyerFirmName, buyerTraderName, autoTab) { this.clientTrader.selectcp2BuyerTrader(buyerFirmName, buyerTraderName, autoTab); }

  getcp2BuyerClientTraderLbl() { return this.clientTrader.getcp2BuyerClientTraderLbl(); }

  hovercp2BuyerInfoIcon() { this.clientTrader.hovercp2BuyerInfoIcon(); }

  iscp2BuyerClientTraderFocus() { return this.clientTrader.iscp2BuyerClientTraderFocus(); }

  // Seller

  selectSellerTrader(sellerFirmName, sellerTraderName, autoTab) { this.clientTrader.selectSellerTrader(sellerFirmName, sellerTraderName, autoTab); }

  selectSellerTraderBySearchLowerKeys(sellerFirmName, sellerTraderName) { this.clientTrader.selectSellerTraderBySearchLowerKeys(sellerFirmName, sellerTraderName); }

  selectSellerTraderBySearchUpperKeys(sellerFirmName, sellerTraderName) { this.clientTrader.selectSellerTraderBySearchUpperKeys(sellerFirmName, sellerTraderName); }

  inputSellerTraderByKeys(sellerTrader) { this.clientTrader.inputSellerTraderByKeys(sellerTrader); }

  getSellerClientTraderLbl() { return this.clientTrader.getSellerClientTraderLbl(); }

  hoverSellerInfoIcon() { this.clientTrader.hoverSellerInfoIcon(); }

  isSellerClientTraderFocus() { return this.clientTrader.isSellerClientTraderFocus(); }

  // 3CP
  selectcp2SellerTrader(sellerFirmName, sellerTraderName, autoTab) { this.clientTrader.selectcp2SellerTrader(sellerFirmName, sellerTraderName, autoTab); }

  getcp2SellerClientTraderLbl() { return this.clientTrader.getcp2SellerClientTraderLbl(); }

  hovercp2SellerInfoIcon() { this.clientTrader.hovercp2SellerInfoIcon(); }

  iscp2SellerClientTraderFocus() { return this.clientTrader.iscp2SellerClientTraderFocus(); }

  // common

  isPageLoadComplete() { return this.clientTrader.isPageLoadComplete(); }

  verifyCasCadClose() { return this.clientTrader.verifyCasCadClose(); }

  isCasCadClose() { return this.clientTrader.isCasCadClose(); }

  isCasCadOpen() { return this.clientTrader.isCasCadOpen(); }

  getClientInfoPopUpText() { return this.clientTrader.getClientInfoPopUpText(); }

  verifyInfoPopUpClose() { return this.clientTrader.verifyInfoPopUpClose(); }

  isCasCadContainsEmptyTrader() { return this.clientTrader.isCasCadContainsEmptyTrader(); }

  /** ******************************* Client/Trader End ************************** */

  /** ************************************ Broker ******************************** */

  // Buyer
  selectBuyerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectBuyerBrokerName(brokerDesk, brokerName, autoTab); }

  selectBuyerBrokerBySearchLowerKeys(brokerDesk, brokerName) { this.broker.selectBuyerBrokerBySearchLowerKeys(brokerDesk, brokerName); }

  selectBuyerBrokerBySearchUpperKeys(brokerDesk, brokerName) { this.broker.selectBuyerBrokerBySearchUpperKeys(brokerDesk, brokerName); }

  inputBuyerBrokerByKeys(buyerBroker) { this.broker.inputBuyerBrokerByKeys(buyerBroker); }

  getBuyerBrokerName() { return this.broker.getBuyerBrokerName(); }

  isBuyerBrokerFocus() { return this.broker.isBuyerBrokerFocus(); }

  // 3CP
  selectcp2BuyerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectcp2BuyerBrokerName(brokerDesk, brokerName, autoTab); }

  getcp2BuyerBrokerName() { return this.broker.getcp2BuyerBrokerName(); }

  iscp2BuyerBrokerFocus() { return this.broker.iscp2BuyerBrokerFocus(); }

  // Seller

  selectSellerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectSellerBrokerName(brokerDesk, brokerName, autoTab); }

  selectSellerBrokerBySearchLowerKeys(brokerDesk, brokerName) { this.broker.selectSellerBrokerBySearchLowerKeys(brokerDesk, brokerName); }

  selectSellerBrokerBySearchUpperKeys(brokerDesk, brokerName) { this.broker.selectSellerBrokerBySearchUpperKeys(brokerDesk, brokerName); }

  inputSellerBrokerByKeys(SellerKeys) { this.broker.inputSellerBrokerByKeys(SellerKeys); }

  getSellerBrokerName() { return this.broker.getSellerBrokerName(); }

  isSellerBrokerFocus() { return this.broker.isSellerBrokerFocus(); }

  // 3CP
  selectcp2SellerBrokerName(brokerDesk, brokerName, autoTab) { this.broker.selectcp2SellerBrokerName(brokerDesk, brokerName, autoTab); }

  getcp2SellerBrokerName() { return this.broker.getcp2SellerBrokerName(); }

  iscp2SellerBrokerFocus() { return this.broker.iscp2SellerBrokerFocus(); }

  verifyBrokerNotInList(brokerDesk, brokerName) { return this.broker.verifyBrokerNotInList(brokerDesk, brokerName); }

  verifyDeskNotInList(brokerDesk) { return this.broker.verifyDeskNotInList(brokerDesk); }

  /** *********************************** Broker End ***************************** */

  /** ************************************ Agent ******************************** */

  // Buyer
  selectBuyerAgent(agentName, autoTab) {
    this.agent.selectBuyerAgent(agentName, autoTab);
  }

  inputBuyerAgentByKeys(buyerAgent) {
    this.agent.inputBuyerAgentByKeys(buyerAgent);
  }

  getBuyerAgentLbl() { return this.agent.getBuyerAgentLbl(); }

  clearBuyerAgent() { this.agent.clearBuyerAgent(); }

  verifyNoBuyerAgentSelected() { return this.agent.verifyNoBuyerAgentSelected(); }

  isBuyerAgentFocus() { return this.agent.isBuyerAgentFocus(); }

  isBuyerAgentEnabled() { return this.agent.isBuyerAgentEnabled(); }

  // 3CP

  selectCP2BuyerAgent(agentName, autoTab) { this.agent.selectCP2BuyerAgent(agentName, autoTab); }

  inputCP2BuyerAgentByKeys(buyerAgent) { this.agent.inputCP2BuyerAgentByKeys(buyerAgent); }

  getcp2BuyerAgentLbl() { return this.agent.getcp2BuyerAgentLbl(); }

  iscp2BuyerAgentFocus() { return this.agent.iscp2BuyerAgentFocus(); }

  // Seller
  selectSellerAgent(agentName, autoTab) {
    this.agent.selectSellerAgent(agentName, autoTab);
  }

  inputSellerAgentByKeys(sellerAgent) {
    this.agent.inputSellerAgentByKeys(sellerAgent);
  }

  getSellerAgentLbl() { return this.agent.getSellerAgentLbl(); }

  verifyNoSellerAgentSelected() { return this.agent.verifyNoSellerAgentSelected(); }

  isSellerAgentFocus() { return this.agent.isSellerAgentFocus(); }

  // 3CP

  selectCP2SellerAgent(agentName, autoTab) { this.agent.selectCP2SellerAgent(agentName, autoTab); }

  inputCP2SellerAgentByKeys(sellerAgent) { this.agent.inputCP2SellerAgentByKeys(sellerAgent); }

  getcp2SellerAgentLbl() { return this.agent.getcp2SellerAgentLbl(); }

  iscp2SellerAgentFocus() { return this.agent.iscp2SellerAgentFocus(); }

  // Common
  verifyAgentCasCadClose() { return this.agent.verifyAgentCasCadClose(); }

  isAgentCasCadOpen() { return this.agent.isAgentCasCadOpen(); }

  /** ************************************ Agent End **************************** */

  /** ************************************ Client Manager ******************************** */
  // Fav Star Btn
  clickBuyerStarBtn() {
    this.cm.clickBuyerStarBtn();
    this.closeFavPopUpWarning();
  }

  clickSellerStarBtn() {
    this.cm.clickSellerStarBtn();
    this.closeFavPopUpWarning();
  }

  clickcp2BuyerStarBtn() {
    this.cm.clickcp2BuyerStarBtn();
    this.closeFavPopUpWarning();
  }

  clickcp2SellerStarBtn() {
    this.cm.clickcp2SellerStarBtn();
    this.closeFavPopUpWarning();
  }

  clickBuyerAgentStarBtn() {
    this.cm.clickBuyerStarBtn();
    this.closeFavAgentPopUpWarning();
  }

  closeFavPopUpWarning() {
    const favWarning = this.popUp.getPopUpDescriptionAvailable();
    if (favWarning === constants.FAV_ALREADY_WARNING) {
      this.popUp.closePopUpMessage();
    }
  }

  closeFavAgentPopUpWarning() {
    const favWarning = this.popUp.getPopUpDescriptionAvailable();
    if (favWarning === constants.FAV_AGENT_ALREADY_WARNING) {
      this.popUp.closePopUpMessage();
    }
  }

  // Nett Bro Btn

  clickBuyerNettBroBtn() {
    this.cm.clickBuyerNettBroBtn();
  }

  clickSellerNettBroBtn() {
    this.cm.clickSellerNettBroBtn();
  }

  // Fav Client

  selectFavClient(firmName) { this.cm.selectFavClient(firmName); }

  // Fav Broker

  selectFavBroker(brokerName) { this.cm.selectFavBroker(brokerName); }

  deleteAllFavBroker() { this.cm.deleteAllFavBroker(); }

  getFavBrokerText(brokerName) { return this.cm.getFavBrokerText(brokerName); }

  closeFavBroker(brokerName) { this.cm.closeFavBroker(brokerName); }

  // Fav Trader

  selectFavTrader(traderName) { this.cm.selectFavTrader(traderName); }

  rightClickFavTrader(traderName) { this.cm.rightClickFavTrader(traderName); }

  getFavTraderText(trader) { return this.cm.getFavTraderText(trader); }

  closeFavTrader(trader) { this.cm.closeFavTrader(trader); }

  changeFavTraderColour(colour) { this.cm.changeFavTraderColour(colour); }

  verifyFavTraderBtnBorderColour(traderName, colour) { this.cm.verifyFavTraderBtnBorderColour(traderName, colour); }

  // Fav Currency
  clickCurrencyPairStarBtn() { this.cm.clickCurrencyPairStarBtn(); }

  selectFavCurrency(currency) { this.cm.selectFavCurrency(currency); }

  getFavCurrencyText(currency) { return this.cm.getFavCurrencyText(currency); }

  closeFavCurrency(currency) { this.cm.closeFavCurrency(currency); }

  verifyFavCurrencyBtnBorderColour(currency, colour) { this.cm.verifyFavCurrencyBtnBorderColour(currency, colour); }

  // Fav Term
  clickTermStarBtn() { this.cm.clickTermStarBtn(); }

  selectFavTerm(term) { this.cm.selectFavTerm(term); }

  getFavTermText(term) {
    return this.cm.getFavTermText(term);
  }

  closeFavTerm(term) { this.cm.closeFavTerm(term); }

  dragNdropFavTrader(sourceTrader, targetTrader) { this.cm.dragNdropFavTrader(sourceTrader, targetTrader); }

  verifyFavTermBtnBorderColour(term, colour) { this.cm.verifyFavTermBtnBorderColour(term, colour); }

  // Fav Venue

  clickExecVenueStarBtn() { this.cm.clickExecVenueStarBtn(); }

  getFavVenueText(executionVenue) { return this.cm.getFavVenueText(executionVenue); }

  selectFavVenue(executionVenue) { this.cm.selectFavVenue(executionVenue); }

  closeFavVenue(executionVenue) { this.cm.closeFavVenue(executionVenue); }

  // Fav ValueDate

  clickValueDateStarBtn() { this.cm.clickValueDateStarBtn(); }

  getFavValueDateText(ValueDate) { return this.cm.getFavValueDateText(ValueDate); }

  selectFavValueDate(valueDate) { this.cm.selectFavValueDate(valueDate); }

  closeFavValueDate(valueDate) { this.cm.closeFavValueDate(valueDate); }

  // Toggle Fav buttons

  ratesFeedOff() { this.settings.ratesFeedOff(); }

  ratesFeedOn() { this.settings.ratesFeedOn(); }

  toggleClientsOn() { this.settings.toggleClientsOn(); }

  toggleClientsOff() { this.settings.toggleClientsOff(); }

  toggleTradersOn() { this.settings.toggleTradersOn(); }

  toggleTradersOff() { this.settings.toggleTradersOff(); }

  toggleCurrencyPairsOn() { this.settings.toggleCurrencyPairsOn(); }

  toggleCurrencyPairsOff() { this.settings.toggleCurrencyPairsOff(); }

  toggleTermsOn() { this.settings.toggleTermsOn(); }

  toggleTermsOff() { this.settings.toggleTermsOff(); }

  toggleExecutionVenuesOn() { this.settings.toggleExecutionVenuesOn(); }

  toggleExecutionVenuesOff() { this.settings.toggleExecutionVenuesOff(); }

  toggleAllFavourites(state) { this.settings.toggleAllFavourites(state); }

  verifyDisplayTraderFavEnabled() { return this.settings.verifyDisplayTraderFavEnabled(); }

  verifyDisplayTraderFavDisabled() { return this.settings.verifyDisplayTraderFavDisabled(); }

  clickBtnSettings() { this.settings.clickBtnSettings(); }

  clickBtnBack() { this.settings.clickBtnBack(); }

  verifyClientBtnFavActive(firmName) { return this.cm.verifyClientBtnFavActive(firmName); }

  clickDisplayTailorMenu() { return this.settings.clickDisplayTailorMenu(); }

  clickDisplayClientManagerMenu() { return this.settings.clickDisplayClientManagerMenu(); }

  clickDisplayGeneralMenu() { return this.settings.clickDisplayGeneralMenu(); }

  clickDisplayFWDTradeCaptureMenu() { return this.settings.clickDisplayFWDTradeCaptureMenu(); }

  /** ************************************ Client Manager End **************************** */

  // Back Dated Trades

  isBackDateSelected() { return this.backDate.isBackDateSelected(); }

  isBackDateDateActive() { return this.backDate.isBackDateDateActive(); }

  isBackDateTimeActive() { return this.backDate.isBackDateTimeActive(); }

  selectBackDate() { return this.backDate.selectBackDate(); }

  inputBackDate(date) { return this.backDate.inputBackDate(date); }

  getBackDateValue() { return this.backDate.getBackDateValue(); }

  inputBackDateTime(time) { return this.backDate.inputBackDateTime(time); }

  getBackDateTimeValue() { return this.backDate.getBackDateTimeValue(); }

  isModalBackDateVisible() { return this.backDate.isModalBackDateVisible(); }

  isModalBackDateClose() { return this.backDate.isModalBackDateClose(); }

  verifyModalNewDateString(dateTimeString) { return this.backDate.verifyModalNewDateString(dateTimeString); }

  backDateCancel() { return this.backDate.backDateCancel(); }

  backDateAccept() { return this.backDate.backDateAccept(); }

  /** ********************************* Back Dated Trades End **************************** */

  placeOutrightOrder(bassCurrency, currency, dealtCurrency, term, price, amount) {
    this.selectBaseCurrency(bassCurrency);
    this.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.selectDealtCurrency(dealtCurrency);
    }
    this.inputTerm(term);
    // this.log.log(`Auto Populated rate/price is : ${this.getPrice()}`);
    this.inputPrice(price);
    this.inputAmount(amount);
    this.log.log(`Outright order placed for currency ==> ${currency} , term ==> ${term} , price ==> ${price} , amount ==> ${amount} .`);
  }

  placeOutrightOrderWithRates(bassCurrency, currency, dealtCurrency, term, amount) {
    this.selectBaseCurrency(bassCurrency);
    this.selectCurrency(currency);
    this.selectDealtCurrency(dealtCurrency);
    this.inputTerm(term);
    this.log.log(`Auto Populated rate/price is : ${this.getPrice()}`);
    this.inputAmount(amount);
    this.log.log(`Outright order placed for currency ==> ${currency} , term ==> ${term} , price ==> ${this.getPrice()} , amount ==> ${amount} .`);
  }

  placeSpreadOrder(bassCurrency, currency, dealtCurrency, term1, price1, amount1, term2, price2, amount2) {
    this.selectBaseCurrency(bassCurrency);
    this.selectCurrency(currency);
    if (dealtCurrency !== '') {
      this.selectDealtCurrency(dealtCurrency);
    }
    this.inputTerm(term1);
    this.inputPrice(price1);
    this.inputAmount(amount1);
    this.inputTerm2(term2);
    this.inputPrice2(price2);
    this.inputAmount2(amount2);
  }

  placeSpreadOrderWithRates(bassCurrency, currency, dealtCurrency, term1, amount1, term2, amount2) {
    this.selectBaseCurrency(bassCurrency);
    this.selectCurrency(currency);
    this.selectDealtCurrency(dealtCurrency);
    this.inputTerm(term1);
    expect(this.getTerm()).to.equal(term1);
    this.windowActions.pause(500);
    this.inputAmount(amount1);
    this.inputTerm2(term2);
    expect(this.getTerm2()).to.equal(term2);
    this.log.log(`Auto Populated rate1/price1 is : ${this.getPrice()}`);
    this.log.log(`Auto Populated rate2/price2 is : ${this.getPrice2()}`);
    this.inputAmount2(amount2);
  }

  selectExecutionVenue(executionVenue) {
    this.venue.selectExecutionVenue(executionVenue);
  }

  changeValue(fieldName, value1, value2) {
    switch (fieldName) {
      case 'currency':
        this.selectCurrency(value1);
        if (this.getTerm() !== '') {
          this.inputPrice(4.5);
          const isSpread = this.isSpreadSelected();
          if (isSpread === 'true') {
            this.inputPoints('0.005');
          }
          expect(this.getPrice()).to.not.equal('');
        }
        break;
      case 'term':
        this.inputTerm(value1);
        expect(this.getPrice()).to.not.equal('');
        this.log.log(`Price 1 value equals ${this.getPrice()}`);
        break;
      case 'price':
        this.inputPrice(value1);
        break;
      case 'amount':
        this.inputAmount(value1);
        break;
      case 'term2':
        this.inputTerm2(value1);
        expect(this.getPrice()).to.not.equal('');
        this.log.log(`Price 1 value equals ${this.getPrice()}`);
        break;
      case 'price2':
        this.inputPrice2(value1);
        break;
      case 'points':
        this.inputPoints(value1);
        break;
      case 'amount2':
        this.inputAmount2(value1);
        break;
      case 'fixingdate':
        this.inputFixingDate(value1.format(dateFormat));
        break;
      case 'valuedate':
        this.inputValueDate(value1.format(dateFormat));
        this.popUp.closePopUpMessage();
        this.log.log(`Auto Populated rate1/price1 is : ${this.getPrice()}`);
        break;
      case 'fixingdate2':
        this.inputFixingDate2(value1.format(dateFormat));
        break;
      case 'valuedate2':
        this.inputValueDate2(value1.format(dateFormat));
        break;
      case 'buyerclient':
        this.selectBuyerTrader(value1, value2);
        break;
      case 'sellerclient':
        this.selectSellerTrader(value1, value2);
        break;
      case 'buybroker':
        this.selectBuyerBrokerName(value1, value2);
        break;
      case 'sellbroker':
        this.selectSellerBrokerName(value1, value2);
        break;
      case 'dealtCurrency':
        this.selectDealtCurrency(value1);
        break;
      case 'executionVenue':
        this.selectExecutionVenue(value1);
        break;
      default:
        this.log.log(`Please Check your operation, not found the matching one : ${fieldName}`);
    }
  }

  // Fetching Values from the page.
  isVolMatchSelected() {
    const chkState = this.elementActions.getAttribute(this.deal.chkVolMatchState(), 'class');
    if (chkState.includes('ant-checkbox-checked')) {
      return true;
    }
    return false;
  }

  clickVolMatch() {
    this.clickActions.click(this.deal.chkVolMatch());
  }

  selectVolMatch() {
    if (!this.isVolMatchSelected()) {
      this.clickActions.click(this.deal.chkVolMatch());
    } else {
      this.log.log('Volume Match is already selected.');
    }
  }

  deSelectVolMatch() {
    if (this.isVolMatchSelected()) {
      this.clickActions.click(this.deal.chkVolMatch());
    } else {
      this.log.log('Volume Match is already selected.');
    }
  }

  isTurnTradeSelected() {
    const chkState = this.elementActions.getAttribute(this.deal.chkTurnTradeState(), 'class');
    if (chkState.includes('ant-checkbox-checked')) {
      return true;
    }
    return false;
  }

  selectTurnTrade() {
    if (!this.isTurnTradeSelected()) {
      this.clickActions.click(this.deal.chkTurnTrade());
    } else {
      this.log.log('Turn Trade is already selected.');
    }
  }

  clickSwapBtn() {
    this.clickActions.click(this.deal.btnSwap());
  }

  clickSwapBtn2() {
    this.clickActions.click(this.deal.btnSwap2());
  }

  clickThreeCpChk() {
    this.clickActions.click(this.deal.chkThreeCp());
  }

  clickSubmitBtn() {
    this.clickActions.click(this.deal.btnSubmit());
  }

  clickResetBtn() {
    this.clickActions.clickByJScript(this.deal.btnReset());
  }

  verifySubmitBtnState(text, colour) {
    this.watch.startStopWatch(4);
    while (this.watch.isWatchRunning()) {
      const attr = this.elementActions.getAttribute(this.deal.btnSubmit(), 'style');
      const textVal = this.textActions.getTxt(this.deal.btnSubmit());
      this.log.log(`Attribute is : ${attr} and Text Value is : ${textVal}`);
      if (attr.includes(`background-color: rgb(${colour});`) === true && textVal.includes(text) === true) {
        this.log.log(`Submit button has ${colour} background and text = ${text}`);
        return true;
      }
    }
    this.log.log(`Submit button does not have ${colour} background and text != ${text}`);
    return false;
  }

  waitForSubmitBtnClickable() {
    this.watch.startStopWatch(15);
    while (this.watch.isWatchRunning()) {
      const attr = this.elementActions.getAttribute(this.deal.btnSubmit(), 'ant-click-animating-without-extra-node');
      this.log.log(`Attribute is : ${attr}`);
      if (attr.includes('false')) {
        this.log.log('Submit button is clickable again');
        return true;
      }
    }
    this.log.log('Submit button is not clickable');
    return false;
  }
  // Hot List Functionality

  selectBuyerSide() {
    this.clickActions.click(this.deal.btnBuyer());
  }

  selectSellerSide() {
    this.clickActions.click(this.deal.btnSeller());
  }

  selectcp2BuyerSide() {
    this.clickActions.click(this.deal.btncp2Buyer());
  }

  selectcp2SellerSide() {
    this.clickActions.click(this.deal.btncp2Seller());
  }

  // End Hot list Functionality

  isElementClose(elementObject) {
    if (elementObject === null || elementObject === undefined || elementObject.type === 'NoSuchElement') {
      this.log.log('Given Element is closed.');
      return true;
    }
    return false;
  }

  moveByTab(times) {
    for (let index = 0; index < times; index += 1) {
      this.pressTab();
    }
  }

  pressKey(times, key) {
    for (let index = 0; index < times; index += 1) {
      this.keyboardActions.enterKeys(key);
    }
  }

  pressEnter() {
    this.keyboardActions.enterKeys('Enter');
  }

  pressEsc() {
    this.keyboardActions.enterKeys('Escape');
  }

  pressTab() {
    this.keyboardActions.enterKeys('Tab');
  }

  moveToPreviousField() {
    this.keyboardActions.enterKeys(['Shift', 'Tab']);
  }

  rightClickSubmitButton() {
    this.clickActions.rightClick(this.deal.btnSubmit());
  }

  // Duplicate Deal tests

  isDuplicateDealModalVisible() { return this.duplicateDeal.isDuplicateDealModalVisible(); }

  isDuplicateDealModalClose() { return this.duplicateDeal.isDuplicateDealModalClose(); }

  duplicateDealCancel() { return this.duplicateDeal.duplicateDealCancel(); }

  duplicateDealSubmitAgain() { return this.duplicateDeal.duplicateDealSubmitAgain(); }

  /** ********************************* Duplicate Deal tests End **************************** */
}
module.exports = DealModel;
