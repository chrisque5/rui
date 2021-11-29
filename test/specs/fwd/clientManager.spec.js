/* eslint-disable no-undef */
const expect = require('chai').expect;
const moment = require('moment');
const DealModel = require('../../models/fwd/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const SettingsModel = require('../../models/SettingsModel.js');
const CM = require('../../models/CMModel');

const StrategyModel = require('../../models/fwd/StrategyModel.js');
const VenueModel = require('../../models/fwd/VenueModel.js');
const CurrencyModel = require('../../models/fwd/CurrencyModel.js');
const TermModel = require('../../models/fwd/TermModel.js');
const PriceModel = require('../../models/fwd/PriceModel.js');
const AmountModel = require('../../models/fwd/AmountModel.js');
const DealDateModel = require('../../models/fwd/DateModel.js');
const AgentModel = require('../../models/fwd/AgentModel');
const BrokerModel = require('../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../models/fwd/ClientTraderModel.js');

const Logs = require('../../core/utility/Logs.js');
const LocalUsers = require('../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../data/qa/fwd/UserDetails.js');
const QaInstrument = require('../../data/qa/fwd/InstrumentDetails.js');
const DevUsers = require('../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../data/fwd/dev/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');

let users = null;
let instrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    break;
  case 'DEV':
    users = DevUsers;
    instrument = DevInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

const deal = new DealModel();
const login = new LoginModel();
const popUpNav = new PopUpNavigationModel();
const settings = new SettingsModel();
const cm = new CM();

const strategy = new StrategyModel();
const venue = new VenueModel();
const currency = new CurrencyModel();
const term = new TermModel();
const price = new PriceModel();
const amount = new AmountModel();
const dealDate = new DealDateModel();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();

const log = new Logs();
let dateFormat = '';

function moveToFWD() {
  login.openUrl(Constants.FWDURL);
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(login.verifyFWDselected()).to.be.equal(true);
}

before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_J.UserName, users.USER_J.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

// ************************************** Client Manager **************************************** //
describe('FWD favourites: Client Manager Currency, Term, Trader and Broker Favorites Test', () => {
  function addTermToFav(termList, isValidate) {
    for (let i = 0; i < termList.length; i += 1) {
      term.inputTerm(termList[i]);
      cm.clickTermStarBtn();
      if (isValidate) {
        expect(termList[i]).to.equal(cm.getFavTermText(termList[i]));
      }
    }
  }

  function addValueDateToFav(dateList, isValidate) {
    for (let i = 0; i < dateList.length; i += 1) {
      log.log(`***************************dateList[i] is : ${dateList[i]}***************************`);
      dealDate.inputValueDate(dateList[i].format(dateFormat));
      cm.clickValueDateStarBtn();
      popUpNav.closePopUpMessage();
      if (isValidate) {
        expect(dateList[i]).to.equal(cm.getFavValueDateText(dateList[i]));
      }
    }
  }

  function verifyCloseFavTerm(termList) {
    for (let i = 0; i < termList.length; i += 1) {
      expect(termList[i]).to.equal(cm.getFavTermText(termList[i]));
      cm.closeFavTerm(termList[i]);
      popUpNav.closeFavPopUpMessage();
    }
  }

  function addCurrencyPairToFav(currencyPairList, isValidate) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      currency.selectCurrency(currencyPairList[i]);
      cm.clickCurrencyPairStarBtn();
      if (isValidate) {
        // eslint-disable-next-line max-len
        expect(`${instrument.CURRENCY_A}${currencyPairList[i]}`).to.equal(cm.getFavCurrencyText(`${instrument.CURRENCY_A}${currencyPairList[i]}`));
      }
    }
  }

  function addExecVenueToFav(execVenueList, isValidate) {
    for (let i = 0; i < execVenueList.length; i += 1) {
      venue.selectExecutionVenue(execVenueList[i]);
      cm.clickExecVenueStarBtn();
      if (isValidate) {
        // eslint-disable-next-line max-len
        expect(execVenueList[i]).to.equal(cm.getFavVenueText(execVenueList[i]));
      }
    }
  }

  function verifyCloseFavVenue(venueList) {
    for (let i = 0; i < venueList.length; i += 1) {
      log.log(`Closing venue list item: ${venueList[i]}***************************`);
      expect(venueList[i]).to.equal(cm.getFavVenueText(venueList[i]));
      cm.closeFavVenue(venueList[i]);
      popUpNav.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavCurrency(currencyPairList) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(`${instrument.CURRENCY_A}${currencyPairList[i]}`).to.equal(cm.getFavCurrencyText(`${instrument.CURRENCY_A}${currencyPairList[i]}`));
      cm.closeFavCurrency(`${instrument.CURRENCY_A}${currencyPairList[i]}`);
      popUpNav.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavValueDate(dateList) {
    for (let i = 0; i < dateList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(dateList[i].format(dateFormat)).to.equal(cm.getFavValueDateText(dateList[i].format(dateFormat)));
      cm.closeFavValueDate(dateList[i].format(dateFormat));
      popUpNav.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavTrader(traderName) {
    expect(traderName).to.equal(cm.getFavTraderText(traderName));
    cm.closeFavTrader(traderName);
    popUpNav.closeFavPopUpMessage();
  }

  function verifyCloseFavBroker(brokerNameExp, brokerNameAc) {
    expect(brokerNameExp).to.equal(cm.getFavBrokerText(brokerNameAc));
    cm.closeFavBroker(brokerNameAc);
    expect('Are you sure you want to hide this Broker tab?').to.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeFavPopUpMessage();
  }

  function validateClientTraderInfo(infoText, clientId, traderId) {
    // Client Info
    expect(infoText[0]).to.contain(clientId.Client);
    expect(infoText[1]).to.contain(clientId.GCD);
    expect(infoText[1]).to.contain(clientId.Reuters_Code);
    if (clientId.LEI_Code !== 'NA') {
      expect(infoText[1]).to.contain(clientId.LEI_Code);
    }

    // Trader Info
    expect(infoText[2]).to.contain(traderId.TraderName);
    expect(infoText[3]).to.contain(traderId.TraderGCD);
    expect(infoText[4]).to.contain(traderId.ExeCustName);
    expect(infoText[5]).to.contain(traderId.ExeCustGCD);
    expect(infoText[5]).to.contain(traderId.ExeCustReuters_Code);
    if (traderId.ExeLEI_Code !== 'NA') {
      expect(infoText[5]).to.contain(traderId.ExeLEI_Code);
    }
  }

  function validateClientHoverInfo(clientType, client, trader) {
    if (clientType.toLowerCase() === 'buyer') {
      clientTrader.hoverBuyerInfoIcon();
    } else if (clientType.toLowerCase() === 'seller') {
      clientTrader.hoverSellerInfoIcon();
    }

    const infoText = clientTrader.getClientInfoPopUpText();

    validateClientTraderInfo(infoText, client, trader);
  }

  function validateClientHoverAgent(clientType, clientId, message) {
    if (clientType.toLowerCase() === 'buyer') {
      clientTrader.hoverBuyerInfoIcon();
    } else if (clientType.toLowerCase() === 'seller') {
      clientTrader.hoverSellerInfoIcon();
    }

    const infoText = clientTrader.getClientInfoPopUpText();

    expect(infoText[0]).to.contain(clientId);
    expect(infoText[2]).to.contain(message);
  }

  function closeFavPopUpWarning() {
    const favWarning = popUpNav.getPopUpDescriptionAvailable();
    if (favWarning === Constants.FAV_ALREADY_WARNING) {
      popUpNav.closePopUpMessage();
    }
  }

  function closeFavAgentPopUpWarning() {
    const favWarning = popUpNav.getPopUpDescriptionAvailable();
    if (favWarning === Constants.FAV_AGENT_ALREADY_WARNING) {
      popUpNav.closePopUpMessage();
    }
  }

  function clickBuyerStarBtn() {
    cm.clickBuyerStarBtn();
    closeFavPopUpWarning();
  }

  function clickSellerStarBtn() {
    cm.clickSellerStarBtn();
    closeFavPopUpWarning();
  }

  function clickBuyerAgentStarBtn() {
    cm.clickBuyerStarBtn();
    closeFavAgentPopUpWarning();
  }

  it('C13008 Add Broker, Trader, Currency pair, Execution Venue, and Term to favorites', () => {
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);

    expect(login.getDdlUserDropdownText()).to.equal(users.USER_J.FullName);

    clientTrader.selectBuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    clickBuyerStarBtn();
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase()); // First added broker needs to be clicked.
    expect(users.TRADER_B_FavName).to.equal(cm.getFavTraderText(users.TRADER_B_FavName));

    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    clickBuyerStarBtn();
    expect(users.TRADER_J_FavName).to.equal(cm.getFavTraderText(users.TRADER_J_FavName));

    clientTrader.selectBuyerTrader(users.CLIENT_K.Client, users.TRADER_L);
    clickBuyerStarBtn();
    expect(users.TRADER_L_FavName).to.equal(cm.getFavTraderText(users.TRADER_L_FavName));

    clientTrader.selectBuyerTrader(users.CLIENT_F.Client, users.TRADER_F);
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_D.Name);
    clickBuyerStarBtn();

    clientTrader.selectSellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    broker.selectSellerBrokerName(users.DESK_A, users.BROKER_C.Name);
    clickSellerStarBtn();

    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    addTermToFav([instrument.TENOR_C, instrument.TENOR_K, instrument.TENOR_F, instrument.TENOR_E, instrument.TENOR_B], true);
    addValueDateToFav([(moment().add(7, 'd')), (moment().add(14, 'd')), (moment().add(21, 'd')), (moment().add(28, 'd'))]);
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_Q, instrument.CURRENCY_R], true);

    // For NDF specific currency
    login.selectNDF();
    clientTrader.isPageLoadComplete();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_D, instrument.CURRENCY_C], true);

    // Move Back to FWD
    login.selectFWD();
    clientTrader.isPageLoadComplete();

    if (ENV === 'LOCAL') {
      addExecVenueToFav(['XOFF', 'TPSD'], true);
    } else {
      addExecVenueToFav(['XOFF', 'TIRD', 'TPSD'], true);
    }
  }).timeout(120000);

  it('C13009 Add and ReName the trader.', () => {
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    // Removing Existing ReName IF Any
    try {
      verifyCloseFavTrader(users.TRADER_K_ReName);
    } catch (e) {
      log.log('Fav trade is not already added.');
    }

    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    clickBuyerStarBtn();
    expect(users.TRADER_K_FavName).to.equal(cm.getFavTraderText(users.TRADER_K_FavName));

    cm.clickBuyerStarBtn();
    expect(Constants.FAV_ALREADY_WARNING).to.equal(popUpNav.getPopUpDescriptionAvailable());
    popUpNav.closePopUpMessage();

    // ReName
    cm.rightClickFavTrader(users.TRADER_K_FavName);
    cm.reNameFavTrader(users.TRADER_K_ReName, 1);
    expect(users.TRADER_K_ReName).to.equal(cm.getFavTraderText(users.TRADER_K_ReName));
    expect(users.BROKER_C.FavName).to.equal(cm.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));

    cm.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    // Removing Existing ReName IF Any
    try {
      verifyCloseFavTrader(users.TRADER_C_ReName);
    } catch (e) {
      log.log('Fav trade is not already added.');
    }

    clientTrader.selectSellerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    clickSellerStarBtn();
    expect(users.BROKER_D.FavName).to.equal(cm.getFavBrokerText(users.BROKER_D.Name.toLowerCase()));

    cm.clickSellerStarBtn();
    expect(Constants.FAV_ALREADY_WARNING).to.equal(popUpNav.getPopUpDescriptionAvailable());
    popUpNav.closePopUpMessage();

    // ReName
    cm.rightClickFavTrader(users.TRADER_C_FavName);
    cm.reNameFavTrader(users.TRADER_C_ReName, 2);
    expect(users.TRADER_C_ReName).to.equal(cm.getFavTraderText(users.TRADER_C_ReName));
  });

  it('C13010 Add agent, dealtCCY as favorites and validate NDF currency warning.', () => {
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    settings.toggleAllFavourites('ON');
    strategy.clickRdoStrategyOutright();
    deal.clickResetBtn();
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    currency.selectBaseCurrency(instrument.CURRENCY_A);

    try {
      verifyCloseFavTrader(users.AGENT_A_FavName);
    } catch (e) {
      log.log('Agent is not added already.');
    }
    // validation without agent field
    clientTrader.selectBuyerTrader(users.CLIENT_B.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    validateClientHoverAgent('buyer', users.CLIENT_B.Client, 'No trader has been selected.');
    clickBuyerStarBtn();
    expect('Adding client to favorites without agent is not supported').to.equal(popUpNav.getPopUpDescription());
    popUpNav.closePopUpMessage();

    // Adding agent as favorites
    agent.selectBuyerAgent(users.AGENT_A);
    clickBuyerAgentStarBtn();
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    expect(users.AGENT_A_FavName).to.equal(cm.getFavTraderText(users.AGENT_A_FavName));

    // Selecting NDF Currency to FWD and validating the warning.
    cm.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_C}`);
    expect('Selected currency is not available for selection here.').to.equal(popUpNav.getPopUpDescription());
    popUpNav.closePopUpMessage();

    // ADD Currency and dealtCCY
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_S);
    currency.selectDealtCurrency(instrument.CURRENCY_S);
    expect(instrument.CURRENCY_S).to.equal(currency.getDealtCurrency());
    cm.clickCurrencyPairStarBtn();

    cm.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_S}`);
    expect(instrument.CURRENCY_S).to.equal(currency.getCurrency());
    expect(instrument.CURRENCY_S).to.equal(currency.getDealtCurrency());
    deal.clickResetBtn();
  });

  it('C13011 Verify grouping traders by Client.', () => {
    strategy.clickRdoStrategyOutright();
    deal.clickResetBtn();
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);

    settings.toggleAllFavourites('ON');

    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    cm.selectFavClient(users.CLIENT_J_FavName);
    expect(cm.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_B_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_K_ReName, true)).to.equal(true);

    cm.selectFavClient(users.CLIENT_H_FavName);
    expect(cm.verifyClientBtnFavActive(users.CLIENT_H_FavName)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_H_FavName, true)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_B_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    cm.selectFavClient(users.CLIENT_K_FavName);
    expect(cm.verifyClientBtnFavActive(users.CLIENT_K_FavName)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_L_FavName, true)).to.equal(true);
    expect(cm.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_B_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    cm.selectFavClient(users.CLIENT_B_FavName);
    expect(cm.verifyClientBtnFavActive(users.CLIENT_B_FavName)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.AGENT_A_FavName, true)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_B_FavName, true)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);
  });

  it('C13012 verify toggle favorites', () => {
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    settings.toggleAllFavourites('ON');
    // verify toggle favourites
    settings.toggleClientsOff();
    expect(cm.isFavTraderVisible(users.CLIENT_J_FavName, false)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    // verify traders button enabled
    settings.clickBtnSettings();
    settings.clickDisplayClientManagerMenu();
    expect(settings.verifyDisplayTraderFavEnabled()).to.equal(true);
    settings.clickBtnBack();

    settings.toggleTradersOff();
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    settings.toggleTradersOn();
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    settings.toggleClientsOn();
    expect(cm.isFavTraderVisible(users.CLIENT_J_FavName, true)).to.equal(true);
    expect(cm.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    // verify traders button disabled
    settings.clickBtnSettings();
    settings.clickDisplayClientManagerMenu();
    expect(settings.verifyDisplayTraderFavDisabled()).to.equal(true);
    settings.clickBtnBack();

    settings.toggleCurrencyPairsOff();
    expect(cm.isFavCurrencyPairVisible(`${instrument.CURRENCY_A}${instrument.CURRENCY_R}`, false)).to.equal(true);
    settings.toggleCurrencyPairsOn();
    expect(cm.isFavCurrencyPairVisible(`${instrument.CURRENCY_A}${instrument.CURRENCY_R}`, true)).to.equal(true);

    settings.toggleTermsOff();
    expect(cm.isFavTermVisible(instrument.TENOR_B, false)).to.equal(true);
    settings.toggleTermsOn();
    expect(cm.isFavTermVisible(instrument.TENOR_B, true)).to.equal(true);

    settings.toggleExecutionVenuesOff();
    expect(cm.isFavTermVisible('XOFF', false)).to.equal(true);
    settings.toggleExecutionVenuesOn();
    expect(cm.isFavTermVisible('XOFF', true)).to.equal(true);
  });

  it('C13013 Submit Deal for FWD Outright by using Broker, Trader, Currency, Execution Venue, and Term from Favorites', () => {
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    deal.clickResetBtn();
    const favDate = (moment().add(28, 'd')).format(dateFormat);
    strategy.clickRdoStrategyOutright();
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    settings.ratesFeedOff();
    settings.toggleAllFavourites('ON');

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_R], false);

    cm.selectFavVenue('TPSD');
    expect(venue.getExecutionVenue()).to.equal('TPSD');

    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    // Adding the same trader two times,first time hove icon is not visible.
    deal.selectBuyerSide();
    cm.selectFavTrader(users.TRADER_K_ReName);
    deal.selectBuyerSide();
    cm.selectFavTrader(users.TRADER_K_ReName);

    validateClientHoverInfo('buyer', users.CLIENT_J, users.TRADER_K_DETAIL);
    deal.selectSellerSide();
    cm.selectFavTrader(users.TRADER_L_FavName);
    // Remove the below commented validation for TPDMS-1863, once the change available.
    validateClientHoverInfo('seller', users.CLIENT_K, users.TRADER_L_DETAIL);

    cm.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_R}`);
    cm.selectFavTrader(users.TRADER_B_FavName);

    cm.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    cm.selectFavTrader(users.TRADER_C_ReName);
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    // validateClientHoverInfo('buyer', users.CLIENT_B, users.TRADER_B_DETAIL);
    validateClientHoverInfo('seller', users.CLIENT_C, users.TRADER_C_DETAIL);
    deal.selectSellerSide();
    cm.selectFavTrader(users.AGENT_A_FavName);

    // verify value date selection from fav
    cm.selectFavValueDate(favDate);
    popUpNav.closePopUpMessage();
    expect(dealDate.getValueDate()).to.equal(favDate);

    price.inputPrice('1.5');
    amount.inputAmount('1');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_R);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(users.AGENT_A).to.equal(agent.getSellerAgentLbl());
    deal.clickSubmitBtn();
    const message = popUpNav.getPopUpMessage();
    popUpNav.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(80000);

  it('C13014 Submit FWD Deal by using Broker, Trader, Currency, Execution Venue, and Term from Favorites', () => {
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    deal.clickResetBtn();
    settings.toggleAllFavourites('ON');
    strategy.clickRdoStrategyForward();
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    settings.ratesFeedOn();
    cm.selectFavVenue('XOFF');

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_R], false);
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    cm.selectFavTrader(users.TRADER_K_ReName);
    cm.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_R}`);
    cm.selectFavTerm(instrument.TENOR_K);
    cm.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    deal.selectSellerSide();
    cm.selectFavTrader(users.TRADER_C_ReName);
    amount.inputAmount('1.5');
    amount.inputAmount2('2.5');

    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_R);
    expect(term.getTerm()).to.equal(instrument.TENOR_K);

    // Buyer Client Hover Validation
    validateClientHoverInfo('buyer', users.CLIENT_J, users.TRADER_K_DETAIL);

    // Seller Client Hover Validation
    validateClientHoverInfo('seller', users.CLIENT_C, users.TRADER_C_DETAIL);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    deal.clickSubmitBtn();
    const message = popUpNav.getPopUpMessage();
    popUpNav.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(60000);

  it('C13015 Submit FWD FWD Deal by using Broker, Trader, Currency, Execution Venue, and Term from Favorites', () => {
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    deal.clickResetBtn();
    settings.toggleAllFavourites('ON');
    strategy.clickRdoStrategyFwdForward();
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    settings.ratesFeedOn();
    cm.selectFavVenue('XOFF');

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_R], false);
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    cm.selectFavTrader(users.TRADER_K_ReName);
    cm.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_R}`);
    cm.selectFavTerm(instrument.TENOR_K);
    cm.selectFavTerm(instrument.TENOR_B);
    cm.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    deal.selectSellerSide();
    cm.selectFavTrader(users.TRADER_C_ReName);
    amount.inputAmount('1.5');
    amount.inputAmount2('2.5');

    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_R);
    expect(term.getTerm()).to.equal(instrument.TENOR_K);
    expect(term.getTerm2()).to.equal(instrument.TENOR_B);

    // Buyer Client Hover Validation
    validateClientHoverInfo('buyer', users.CLIENT_J, users.TRADER_K_DETAIL);

    // Seller Client Hover Validation
    validateClientHoverInfo('seller', users.CLIENT_C, users.TRADER_C_DETAIL);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    deal.clickSubmitBtn();
    const message = popUpNav.getPopUpMessage();
    popUpNav.closePopUpMessage();
    deal.clickResetBtn();
    expect(message).to.be.equal('Deal created');
  }).timeout(60000);

  it('C13016 Relaunch, Verify and Close Currency, Term, Execution Venue, Trader and Broker Favorites', () => {
    login.changeUser(users.USER_J.UserName, users.USER_J.PassWord);
    moveToFWD();
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    clickBuyerStarBtn();
    broker.selectBuyerBrokerName(users.DESK_C, users.BROKER_D.Name);
    clickBuyerStarBtn();
    cm.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    deal.clickResetBtn();

    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    settings.toggleAllFavourites('ON');
    let venues;
    if (ENV === 'LOCAL') {
      venues = ['XOFF', 'TPSD'];
    } else {
      venues = ['XOFF', 'TIRD', 'TPSD'];
    }

    verifyCloseFavVenue(venues);
    verifyCloseFavValueDate([(moment().add(7, 'd')), (moment().add(14, 'd')), (moment().add(21, 'd')), (moment().add(28, 'd'))]);
    verifyCloseFavTerm([instrument.TENOR_C, instrument.TENOR_K, instrument.TENOR_F, instrument.TENOR_E]);
    verifyCloseFavCurrency([instrument.CURRENCY_Q, instrument.CURRENCY_R, instrument.CURRENCY_S]);
    verifyCloseFavTrader(users.TRADER_B_FavName);
    verifyCloseFavTrader(users.TRADER_J_FavName);
    verifyCloseFavTrader(users.TRADER_K_ReName);
    verifyCloseFavTrader(users.TRADER_H_FavName);
    verifyCloseFavBroker(users.BROKER_C.FavName, users.BROKER_C.Name.toLowerCase());
    cm.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    verifyCloseFavTrader(users.TRADER_C_ReName);
    verifyCloseFavTrader(users.TRADER_F_FavName);
    verifyCloseFavBroker(users.BROKER_D.FavName, users.BROKER_D.Name.toLowerCase());
  }).timeout(120000);

  it('C13017 Validate Favorites warning while adding without broker selection', () => {
    cm.deleteAllFavBroker();
    addTermToFav([instrument.TENOR_C], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeConfirmationPopUpMessage();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_Q], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeConfirmationPopUpMessage();
    addExecVenueToFav(['XOFF'], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeConfirmationPopUpMessage();
  }).timeout(40000);
});
