/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;

const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const SettingsModel = require('../../models/SettingsModel.js');
const Logs = require('../../core/utility/Logs.js');
const CMModel = require('../../models/CMModel.js');

const DealModel = require('../../models/spt/DealModel.js');
const CurrencyModel = require('../../models/spt/CurrencyModel.js');
const BrokerModel = require('../../models/spt/BrokerModel.js');
const AgentModel = require('../../models/spt/AgentModel.js');
const DateModel = require('../../models/spt/DateModel.js');
const ClientTraderModel = require('../../models/spt/ClientTraderModel.js');
const VenueModel = require('../../models/spt/VenueModel.js');
const PriceModel = require('../../models/spt/PriceModel.js');
const AmountModel = require('../../models/spt/AmountModel.js');
const LocalUsers = require('../../data/spt/UserDetails.js');
const LocalInstrument = require('../../data/spt/InstrumentDetails.js');
const QaUsers = require('../../data/qa/spt/UserDetails.js');
const QaInstrument = require('../../data/qa/spt/InstrumentDetails.js');
const Constants = require('../../data/Constants.js');
const moment = require('../../../node_modules/moment/moment.js');

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

const cmModel = new CMModel();
const deal = new DealModel();
const loginModel = new LoginModel();
const popUpNav = new PopUpNavigationModel();
const settings = new SettingsModel();
const log = new Logs();

const currency = new CurrencyModel();
const broker = new BrokerModel();
const agent = new AgentModel();
const date = new DateModel();
const clientTrader = new ClientTraderModel();
const venue = new VenueModel();
const price = new PriceModel();
const amount = new AmountModel();

let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_E.UserName, users.USER_E.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.SPTURL);
  loginModel.selectSPT();
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifySPTselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('Spot favourites: Client Manager Currency, Trader and Broker Favorites Test', () => {
  function addValueDateToFav(dateList, isValidate) {
    for (let i = 0; i < dateList.length; i += 1) {
      log.log(`***************************dateList[i] is : ${dateList[i]}***************************`);
      date.inputValueDate(dateList[i].format(dateFormat));
      cmModel.clickValueDateStarBtn();
      popUpNav.closePopUpMessage();
      if (isValidate) {
        expect(dateList[i]).to.equal(cmModel.getFavValueDateText(dateList[i]));
      }
    }
  }

  function addCurrencyPairToFav(currencyPairList, isValidate) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      currency.selectCurrency(currencyPairList[i]);
      cmModel.clickCurrencyPairStarBtn();
      if (isValidate) {
        // eslint-disable-next-line max-len
        expect(`${instrument.CURRENCY_A}${currencyPairList[i]}`).to.equal(cmModel.getFavCurrencyText(`${instrument.CURRENCY_A}${currencyPairList[i]}`));
      }
    }
  }

  function addExecVenueToFav(execVenueList, isValidate) {
    for (let i = 0; i < execVenueList.length; i += 1) {
      venue.selectExecutionVenue(execVenueList[i]);
      cmModel.clickExecVenueStarBtn();
      if (isValidate) {
        // eslint-disable-next-line max-len
        expect(execVenueList[i]).to.equal(cmModel.getFavVenueText(execVenueList[i]));
      }
    }
  }

  function verifyCloseFavVenue(venueList) {
    for (let i = 0; i < venueList.length; i += 1) {
      log.log(`Closing venue list item: ${venueList[i]}***************************`);
      expect(venueList[i]).to.equal(cmModel.getFavVenueText(venueList[i]));
      cmModel.closeFavVenue(venueList[i]);
      popUpNav.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavCurrency(currencyPairList) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(`${instrument.CURRENCY_A}${currencyPairList[i]}`).to.equal(cmModel.getFavCurrencyText(`${instrument.CURRENCY_A}${currencyPairList[i]}`));
      cmModel.closeFavCurrency(`${instrument.CURRENCY_A}${currencyPairList[i]}`);
      popUpNav.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavValueDate(dateList) {
    for (let i = 0; i < dateList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(dateList[i].format(dateFormat)).to.equal(cmModel.getFavValueDateText(dateList[i].format(dateFormat)));
      cmModel.closeFavValueDate(dateList[i].format(dateFormat));
      popUpNav.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavTrader(traderName) {
    expect(traderName).to.equal(cmModel.getFavTraderText(traderName));
    cmModel.closeFavTrader(traderName);
    popUpNav.closeFavPopUpMessage();
  }

  function verifyCloseFavBroker(brokerNameExp, brokerNameAc) {
    expect(brokerNameExp).to.equal(cmModel.getFavBrokerText(brokerNameAc));
    cmModel.closeFavBroker(brokerNameAc);
    expect('Are you sure you want to hide this Broker tab?').to.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeFavPopUpMessage();
  }

  function validateClientTraderInfo(infoText, clientId, traderId) {
    // Client Info
    log.log(`${JSON.stringify(infoText)}`);
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

  it('C24506 Add Broker, Trader, Currency pair and Execution Venue to favorites', () => {
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);

    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    cmModel.clickBuyerStarBtn();
    expect(users.BROKER_C.FavName).to.equal(cmModel.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));
    popUpNav.verifyNoPopUpMessage();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_T]);

    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    expect(users.BROKER_C.FavName).to.equal(cmModel.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));
    verifyCloseFavCurrency([instrument.CURRENCY_T]);

    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    cmModel.clickBuyerStarBtn();
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase()); // First added broker needs to be clicked.
    expect(users.TRADER_C_FavName).to.equal(cmModel.getFavTraderText(users.TRADER_C_FavName));

    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    cmModel.clickBuyerStarBtn();
    expect(users.TRADER_J_FavName).to.equal(cmModel.getFavTraderText(users.TRADER_J_FavName));

    clientTrader.selectBuyerTrader(users.CLIENT_K.Client, users.TRADER_L);
    cmModel.clickBuyerStarBtn();
    expect(users.TRADER_L_FavName).to.equal(cmModel.getFavTraderText(users.TRADER_L_FavName));

    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    addValueDateToFav([(moment().add(7, 'd')), (moment().add(14, 'd')), (moment().add(21, 'd')), (moment().add(28, 'd'))]);
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_T, instrument.CURRENCY_Q, instrument.CURRENCY_E, instrument.CURRENCY_S], true);
    addExecVenueToFav(['XOFF'], true);
  }).timeout(120000);

  it('C24507 Add and ReName the trader.', () => {
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    // Removing Existing ReName IF Any
    try {
      verifyCloseFavTrader(users.TRADER_K_ReName);
    } catch (e) {
      log.log('Fav trade is not already added.');
    }

    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    cmModel.clickBuyerStarBtn();
    expect(users.TRADER_K_FavName).to.equal(cmModel.getFavTraderText(users.TRADER_K_FavName));

    cmModel.clickBuyerStarBtn();
    expect(Constants.FAV_ALREADY_WARNING).to.equal(popUpNav.getPopUpDescriptionAvailable());
    popUpNav.closePopUpMessage();

    // ReName
    cmModel.rightClickFavTrader(users.TRADER_K_FavName);
    cmModel.reNameFavTrader(users.TRADER_K_ReName);
    expect(users.TRADER_K_ReName).to.equal(cmModel.getFavTraderText(users.TRADER_K_ReName));

    cmModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    // Removing Existing ReName IF Any
    try {
      verifyCloseFavTrader(users.TRADER_D_ReName);
    } catch (e) {
      log.log('Fav trade is not already added.');
    }

    clientTrader.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    broker.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    cmModel.clickSellerStarBtn();
    expect(users.TRADER_D_FavName).to.equal(cmModel.getFavTraderText(users.TRADER_D_FavName));
    expect(users.BROKER_C.FavName).to.equal(cmModel.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));
    expect(users.BROKER_D.FavName).to.equal(cmModel.getFavBrokerText(users.BROKER_D.Name.toLowerCase()));

    cmModel.clickSellerStarBtn();
    expect(Constants.FAV_ALREADY_WARNING).to.equal(popUpNav.getPopUpDescriptionAvailable());
    popUpNav.closePopUpMessage();

    // ReName
    cmModel.rightClickFavTrader(users.TRADER_D_FavName);
    cmModel.reNameFavTrader(users.TRADER_D_ReName);
    expect(users.TRADER_D_ReName).to.equal(cmModel.getFavTraderText(users.TRADER_D_ReName));
  });

  it('C24508 Add agent as favorites.', () => {
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    try {
      verifyCloseFavTrader(users.AGENT_A_FavName);
    } catch (e) {
      log.log('Agent is not added already.');
    }
    // validation without agent field
    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    validateClientHoverAgent('buyer', users.CLIENT_A.Client, 'No trader has been selected.');

    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    validateClientHoverAgent('buyer', users.CLIENT_A.Client, 'No trader has been selected.');

    cmModel.clickBuyerStarBtn();
    expect('Adding client to favorites without agent is not supported').to.equal(popUpNav.getPopUpDescription());
    popUpNav.closePopUpMessage();

    // Adding agent as favorites
    agent.selectBuyerAgent(users.AGENT_A);
    cmModel.clickBuyerStarBtn();
    // cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    expect(users.AGENT_A_FavName).to.equal(cmModel.getFavTraderText(users.AGENT_A_FavName));
    deal.clickResetBtn();
  });

  it('C24509 Verify grouping traders by Client', () => {
    settings.toggleAllFavourites('ON');

    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    cmModel.selectFavClient(users.CLIENT_J_FavName);
    expect(cmModel.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_C_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, true)).to.equal(true);

    // remove a trader while firm selected
    verifyCloseFavTrader(users.TRADER_K_ReName);
    expect(cmModel.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_C_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    // re-add and re-name trader while firm still selected
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_C.Name);
    clientTrader.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    cmModel.clickBuyerStarBtn();
    expect(users.TRADER_K_FavName).to.equal(cmModel.getFavTraderText(users.TRADER_K_FavName));
    cmModel.rightClickFavTrader(users.TRADER_K_FavName);
    cmModel.reNameFavTrader(users.TRADER_K_ReName);
    expect(users.TRADER_K_ReName).to.equal(cmModel.getFavTraderText(users.TRADER_K_ReName));

    // move to another client
    cmModel.selectFavClient(users.CLIENT_A_FavName);
    expect(cmModel.verifyClientBtnFavActive(users.CLIENT_A_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    // move back to original client and verify rename
    cmModel.selectFavClient(users.CLIENT_J_FavName);
    expect(cmModel.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_C_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, true)).to.equal(true);

    cmModel.selectFavClient(users.CLIENT_K_FavName);
    expect(cmModel.verifyClientBtnFavActive(users.CLIENT_K_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_C_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);
  });

  it('C24510 Verify toggle favorites', () => {
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    settings.toggleAllFavourites('ON');
    // verify toggle favourites
    settings.toggleClientsOff();
    expect(cmModel.isFavTraderVisible(users.CLIENT_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    // verify traders button enabled
    settings.clickBtnSettings();
    settings.clickDisplayClientManagerMenu();
    expect(settings.verifyDisplayTraderFavEnabled()).to.equal(true);
    settings.clickBtnBack();

    settings.toggleTradersOff();
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    settings.toggleTradersOn();
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    settings.toggleClientsOn();
    expect(cmModel.isFavTraderVisible(users.CLIENT_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    // verify traders button disabled
    settings.clickBtnSettings();
    settings.clickDisplayClientManagerMenu();
    expect(settings.verifyDisplayTraderFavDisabled()).to.equal(true);
    settings.clickBtnBack();

    settings.toggleCurrencyPairsOff();
    expect(cmModel.isFavCurrencyPairVisible(`${instrument.CURRENCY_A}${instrument.CURRENCY_T}`, false)).to.equal(true);
    settings.toggleCurrencyPairsOn();
    expect(cmModel.isFavCurrencyPairVisible(`${instrument.CURRENCY_A}${instrument.CURRENCY_T}`, true)).to.equal(true);

    settings.toggleExecutionVenuesOff();
    expect(cmModel.isFavTermVisible('XOFF', false)).to.equal(true);
    settings.toggleExecutionVenuesOn();
    expect(cmModel.isFavTermVisible('XOFF', true)).to.equal(true);
  });

  it('C24511 Submit Deal by using Broker, Trader, Currency and Execution Venue from Favorites', () => {
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    settings.toggleAllFavourites('ON');
    settings.ratesFeedOff();
    // customer override problem where you need to add a favourite before you can use the favourites
    addCurrencyPairToFav([instrument.CURRENCY_Q], false);

    cmModel.selectFavVenue('XOFF');
    expect(venue.getExecutionVenue()).to.equal('XOFF');

    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    // Adding the same trader two times,first time hove icon is not visible.
    deal.selectBuyerSide();
    cmModel.selectFavTrader(users.TRADER_K_ReName);
    deal.selectBuyerSide();
    cmModel.selectFavTrader(users.TRADER_K_ReName);

    validateClientHoverInfo('buyer', users.CLIENT_J, users.TRADER_K_DETAIL);
    deal.selectSellerSide();
    cmModel.selectFavTrader(users.TRADER_L_FavName);
    validateClientHoverInfo('seller', users.CLIENT_K, users.TRADER_L_DETAIL);

    cmModel.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_Q}`);
    cmModel.selectFavTrader(users.TRADER_C_FavName);
    const valueDate = date.getValueDate();
    // verify value date selection from fav
    cmModel.selectFavValueDate((moment().add(7, 'd')).format(dateFormat));
    popUpNav.closePopUpMessage();
    expect(true).to.equal(date.isValueDateUpdated(valueDate));
    expect(date.getValueDate()).to.equal((moment().add(7, 'd')).format(dateFormat));
    cmModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    cmModel.selectFavTrader(users.TRADER_D_ReName);
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    validateClientHoverInfo('buyer', users.CLIENT_C, users.TRADER_C_DETAIL);
    validateClientHoverInfo('seller', users.CLIENT_D, users.TRADER_D_DETAIL);

    price.inputPrice('1.5');
    amount.inputAmount('1');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_C.Client} ${users.CLIENT_C.Location} / ${users.TRADER_C}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    deal.clickSubmitBtn();
    const message = popUpNav.getPopUpMessage();
    popUpNav.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(80000);

  it('C24512 Submit deal by using Broker, Agent, currency and Venue from favorites', () => {
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    settings.toggleAllFavourites('ON');
    settings.ratesFeedOff();
    deal.clickResetBtn();
    // customer override problem where you need to add a favourite before you can use the favourites
    addCurrencyPairToFav([instrument.CURRENCY_Q], false);

    cmModel.selectFavVenue('XOFF');
    expect(venue.getExecutionVenue()).to.equal('XOFF');

    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    deal.selectBuyerSide();
    cmModel.selectFavTrader(users.TRADER_K_ReName);

    deal.selectSellerSide();
    cmModel.selectFavTrader(users.AGENT_A_FavName);
    cmModel.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_Q}`);

    price.inputPrice('1.5');
    amount.inputAmount('1');
    expect(currency.getCurrency()).to.equal(instrument.CURRENCY_Q);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_C.Name}`);
    expect(users.AGENT_A).to.equal(agent.getSellerAgentLbl());
    deal.clickSubmitBtn();
    const message = popUpNav.getPopUpMessage();
    popUpNav.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(80000);

  it('C24513 Relaunch, Verify and Close Currency, Execution Venue, Trader and Broker Favorites', () => {
    cmModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    settings.toggleAllFavourites('ON');

    verifyCloseFavVenue(['XOFF']);
    verifyCloseFavValueDate([(moment().add(7, 'd')), (moment().add(14, 'd')), (moment().add(21, 'd')), (moment().add(28, 'd'))]);
    verifyCloseFavCurrency([instrument.CURRENCY_T, instrument.CURRENCY_Q, instrument.CURRENCY_E, instrument.CURRENCY_S]);
    verifyCloseFavTrader(users.TRADER_C_FavName);
    verifyCloseFavTrader(users.TRADER_J_FavName);
    verifyCloseFavTrader(users.TRADER_K_ReName);
    verifyCloseFavBroker(users.BROKER_C.FavName, users.BROKER_C.Name.toLowerCase());
    cmModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    verifyCloseFavTrader(users.TRADER_D_ReName);
    verifyCloseFavBroker(users.BROKER_D.FavName, users.BROKER_D.Name.toLowerCase());
  }).timeout(120000);

  it('C24514 Validate Favorites warning while adding without broker selection ', () => {
    cmModel.deleteAllFavBroker();
    addCurrencyPairToFav([instrument.CURRENCY_T], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeConfirmationPopUpMessage();
    addExecVenueToFav(['XOFF'], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNav.getPopUpMessageText());
    popUpNav.closeConfirmationPopUpMessage();
  }).timeout(60000);
});
