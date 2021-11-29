/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel');
const LoginModel = require('../models/LoginModel');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const CMModel = require('../models/CMModel');
const Logs = require('../core/utility/Logs');
const LocalUsers = require('../data/UserDetails');
const LocalInstrument = require('../data/InstrumentDetails');
const QaUsers = require('../data/qa/UserDetails');
const QaInstrument = require('../data/qa/InstrumentDetails');
const Constants = require('../data/Constants');
const moment = require('../../node_modules/moment/moment');

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
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

let desk = '';
if (ENV === 'LOCAL') {
  desk = 'DESK_D';
} else {
  desk = 'DESK_A';
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const cmModel = new CMModel();
const log = new Logs();
let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  dealModel.selectBaseCurrency(instrument.CURRENCY_A);
});

// ************************************** Client Manager **************************************** //

describe('NDF Favourites: Client Manager Currency, Term, Trader and Broker Favorites Test', () => {
  function addTermToFav(termList, isValidate) {
    for (let i = 0; i < termList.length; i += 1) {
      dealModel.inputTerm(termList[i]);
      dealModel.clickTermStarBtn();
      if (isValidate) {
        const favText = dealModel.getFavTermText(termList[i]);
        expect(termList[i]).to.equal(favText);
      }
    }
  }

  function addValueDateToFav(dateList, isValidate) {
    for (let i = 0; i < dateList.length; i += 1) {
      log.log(`***************************dateList[i] is : ${dateList[i]}***************************`);
      dealModel.inputValueDate(dateList[i].format(dateFormat));
      dealModel.clickValueDateStarBtn();
      popUpNavModel.closePopUpMessage();
      if (isValidate) {
        expect(dateList[i]).to.equal(dealModel.getFavValueDateText(dateList[i]));
      }
    }
  }

  function verifyCloseFavTerm(termList) {
    for (let i = 0; i < termList.length; i += 1) {
      expect(termList[i]).to.equal(dealModel.getFavTermText(termList[i]));
      dealModel.closeFavTerm(termList[i]);
      popUpNavModel.closeFavPopUpMessage();
    }
  }

  function addCurrencyPairToFav(currencyPairList, isValidate) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      dealModel.selectCurrency(currencyPairList[i]);
      dealModel.clickCurrencyPairStarBtn();
      if (isValidate) {
        // eslint-disable-next-line max-len
        expect(`${instrument.CURRENCY_A}${currencyPairList[i]}`).to.equal(dealModel.getFavCurrencyText(`${instrument.CURRENCY_A}${currencyPairList[i]}`));
      }
    }
  }

  function addExecVenueToFav(execVenueList, isValidate) {
    for (let i = 0; i < execVenueList.length; i += 1) {
      dealModel.selectExecutionVenue(execVenueList[i]);
      dealModel.clickExecVenueStarBtn();
      if (isValidate) {
        // eslint-disable-next-line max-len
        expect(execVenueList[i]).to.equal(dealModel.getFavVenueText(execVenueList[i]));
      }
    }
  }

  function verifyCloseFavVenue(venueList) {
    for (let i = 0; i < venueList.length; i += 1) {
      log.log(`Closing venue list item: ${venueList[i]}***************************`);
      expect(venueList[i]).to.equal(dealModel.getFavVenueText(venueList[i]));
      dealModel.closeFavVenue(venueList[i]);
      popUpNavModel.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavCurrency(currencyPairList) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(`${instrument.CURRENCY_A}${currencyPairList[i]}`).to.equal(dealModel.getFavCurrencyText(`${instrument.CURRENCY_A}${currencyPairList[i]}`));
      dealModel.closeFavCurrency(`${instrument.CURRENCY_A}${currencyPairList[i]}`);
      popUpNavModel.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavValueDate(dateList) {
    for (let i = 0; i < dateList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(dateList[i].format(dateFormat)).to.equal(dealModel.getFavValueDateText(dateList[i].format(dateFormat)));
      dealModel.closeFavValueDate(dateList[i].format(dateFormat));
      popUpNavModel.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavTrader(traderName) {
    expect(traderName).to.equal(dealModel.getFavTraderText(traderName));
    dealModel.closeFavTrader(traderName);
    popUpNavModel.closeFavPopUpMessage();
  }

  function verifyCloseFavBroker(brokerNameExp, brokerNameAc) {
    expect(brokerNameExp).to.equal(dealModel.getFavBrokerText(brokerNameAc));
    dealModel.closeFavBroker(brokerNameAc);
    expect('Are you sure you want to hide this Broker tab?').to.equal(popUpNavModel.getPopUpMessageText());
    popUpNavModel.closeFavPopUpMessage();
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
      dealModel.hoverBuyerInfoIcon();
    } else if (clientType.toLowerCase() === 'seller') {
      dealModel.hoverSellerInfoIcon();
    } else if (clientType.toLowerCase() === 'cp2buyer') {
      dealModel.hovercp2BuyerInfoIcon();
    } else if (clientType.toLowerCase() === 'cp2seller') {
      dealModel.hovercp2SellerInfoIcon();
    }
    const infoText = dealModel.getClientInfoPopUpText();
    validateClientTraderInfo(infoText, client, trader);
  }

  function validateClientHoverAgent(clientType, clientId, message) {
    if (clientType.toLowerCase() === 'buyer') {
      dealModel.hoverBuyerInfoIcon();
    } else if (clientType.toLowerCase() === 'seller') {
      dealModel.hoverSellerInfoIcon();
    }
    const infoText = dealModel.getClientInfoPopUpText();

    expect(infoText[0]).to.contain(clientId);
    expect(infoText[2]).to.contain(message);
  }

  it('C6338 Add Broker, Trader, Currency pair, Execution Venue, and Term to favorites', () => {
    dealModel.clickRdoStrategySpread();
    dealModel.clickThreeCpChk();

    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);

    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.clickBuyerStarBtn();
    expect(users.BROKER_C.FavName).to.equal(dealModel.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));
    popUpNavModel.verifyNoPopUpMessage();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_D]);

    // refresh page here and verify no null pointer exception
    dealModel.refreshPage();
    popUpNavModel.verifyNoPopUpMessage();
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    expect(users.BROKER_C.FavName).to.equal(dealModel.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));
    verifyCloseFavCurrency([instrument.CURRENCY_D]);

    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.clickBuyerStarBtn();
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase()); // First added broker needs to be clicked.
    expect(users.TRADER_A_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_A_FavName));

    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_J);
    dealModel.clickBuyerStarBtn();
    expect(users.TRADER_J_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_J_FavName));

    dealModel.selectBuyerTrader(users.CLIENT_K.Client, users.TRADER_L);
    dealModel.clickBuyerStarBtn();
    expect(users.TRADER_L_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_L_FavName));

    dealModel.clickRdoStrategySpread();
    dealModel.clickThreeCpChk();
    // select cp2 buyer trader then broker C then add to favs
    dealModel.selectcp2BuyerTrader(users.CLIENT_F.Client, users.TRADER_F);
    dealModel.selectcp2BuyerBrokerName(users.DESK_C, users.BROKER_D.Name);
    dealModel.clickcp2BuyerStarBtn();

    // select cp2 buyer trader then broker C then add to favs
    dealModel.selectcp2SellerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.selectcp2SellerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.clickcp2SellerStarBtn();

    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    addTermToFav([instrument.TENOR_C, instrument.TENOR_K, instrument.TENOR_F, instrument.TENOR_E, instrument.TENOR_A, instrument.TENOR_N], true);
    addValueDateToFav([(moment().add(7, 'd')), (moment().add(14, 'd')), (moment().add(21, 'd')), (moment().add(28, 'd'))]);
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_D, instrument.CURRENCY_B, instrument.CURRENCY_E, instrument.CURRENCY_F], true);
    addExecVenueToFav(['TPSEF', 'XOFF', 'TPSD'], true);
  }).timeout(120000);

  it('C13079 Add and ReName the trader.', () => {
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    // Removing Existing ReName IF Any
    try {
      verifyCloseFavTrader(users.TRADER_K_ReName);
    } catch (e) {
      log.log('Fav trade is not already added.');
    }

    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    cmModel.clickBuyerStarBtn();
    expect(users.TRADER_K_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_K_FavName));

    cmModel.clickBuyerStarBtn();
    expect(Constants.FAV_ALREADY_WARNING).to.equal(popUpNavModel.getPopUpDescriptionAvailable());
    popUpNavModel.closePopUpMessage();

    // ReName
    dealModel.rightClickFavTrader(users.TRADER_K_FavName);
    cmModel.reNameFavTrader(users.TRADER_K_ReName);
    expect(users.TRADER_K_ReName).to.equal(dealModel.getFavTraderText(users.TRADER_K_ReName));

    dealModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    // Removing Existing ReName IF Any
    try {
      verifyCloseFavTrader(users.TRADER_D_ReName);
    } catch (e) {
      log.log('Fav trade is not already added.');
    }

    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectSellerBrokerName(users.DESK_C, users.BROKER_D.Name);
    cmModel.clickSellerStarBtn();
    expect(users.TRADER_D_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_D_FavName));
    expect(users.BROKER_C.FavName).to.equal(dealModel.getFavBrokerText(users.BROKER_C.Name.toLowerCase()));
    expect(users.BROKER_D.FavName).to.equal(dealModel.getFavBrokerText(users.BROKER_D.Name.toLowerCase()));

    cmModel.clickSellerStarBtn();
    expect(Constants.FAV_ALREADY_WARNING).to.equal(popUpNavModel.getPopUpDescriptionAvailable());
    popUpNavModel.closePopUpMessage();

    // ReName
    dealModel.rightClickFavTrader(users.TRADER_D_FavName);
    cmModel.reNameFavTrader(users.TRADER_D_ReName);
    expect(users.TRADER_D_ReName).to.equal(dealModel.getFavTraderText(users.TRADER_D_ReName));
  });

  it('C11985 add agent as favorites.', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.clickResetBtn();
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    try {
      verifyCloseFavTrader(users.AGENT_A_FavName);
    } catch (e) {
      log.log('Agent is not added already.');
    }
    // validation without agent field
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    validateClientHoverAgent('buyer', users.CLIENT_A.Client, 'No trader has been selected.');

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    validateClientHoverAgent('buyer', users.CLIENT_A.Client, 'No trader has been selected.');

    dealModel.clickBuyerStarBtn();
    expect('Adding client to favorites without agent is not supported').to.equal(popUpNavModel.getPopUpDescription());
    popUpNavModel.closePopUpMessage();

    // Adding agent as favorites
    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.clickBuyerAgentStarBtn();
    // dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    expect(users.AGENT_A_FavName).to.equal(dealModel.getFavTraderText(users.AGENT_A_FavName));
    dealModel.clickResetBtn();
  });

  it('C38582 add the same agent with different client as favorites.', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.clickResetBtn();

    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerBrokerName(users.DESK_F, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.clickBuyerAgentStarBtn();
    expect(users.AGENT_A_FavName).to.equal(dealModel.getFavTraderText(users.AGENT_A_FavName));

    dealModel.selectSellerTrader(users.CLIENT_P.Client, users.TRADER_L);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_A);
    cmModel.clickSellerStarBtn();
    expect(users.TRADER_L_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_L_FavName));

    dealModel.selectSellerTrader(users.CLIENT_P.Client, users.TRADER_NULL.Name);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_A);
    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.clickSellerStarBtn();
    expect(users.AGENT_A_FavName).to.equal(dealModel.getFavTraderText(users.AGENT_A_FavName));
    dealModel.clickResetBtn();
  });

  it('C12999 Verify grouping traders by Client.', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.clickResetBtn();
    dealModel.toggleAllFavourites('ON');

    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.selectFavClient(users.CLIENT_J_FavName);
    expect(dealModel.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, true)).to.equal(true);

    // remove a trader while firm selected
    verifyCloseFavTrader(users.TRADER_K_ReName);
    expect(dealModel.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    // re-add and re-name trader while firm still selected
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C.Name);
    dealModel.selectBuyerTrader(users.CLIENT_J.Client, users.TRADER_K);
    dealModel.clickBuyerStarBtn();
    expect(users.TRADER_K_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_K_FavName));
    dealModel.rightClickFavTrader(users.TRADER_K_FavName);
    cmModel.reNameFavTrader(users.TRADER_K_ReName);
    expect(users.TRADER_K_ReName).to.equal(dealModel.getFavTraderText(users.TRADER_K_ReName));

    // move to another client
    dealModel.selectFavClient(users.CLIENT_H_FavName);
    expect(dealModel.verifyClientBtnFavActive(users.CLIENT_H_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_H_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    // move back to original client and verify rename
    dealModel.selectFavClient(users.CLIENT_J_FavName);
    expect(dealModel.verifyClientBtnFavActive(users.CLIENT_J_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, true)).to.equal(true);

    dealModel.selectFavClient(users.CLIENT_K_FavName);
    expect(dealModel.verifyClientBtnFavActive(users.CLIENT_K_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_A_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);

    dealModel.selectFavClient(users.CLIENT_A_FavName);
    expect(dealModel.verifyClientBtnFavActive(users.CLIENT_A_FavName)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_H_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_L_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.AGENT_A_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_A_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_K_ReName, false)).to.equal(true);
  });

  it('C11986 verify toggle favorites', () => {
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.toggleAllFavourites('ON');
    // verify toggle favourites
    dealModel.toggleClientsOff();
    expect(cmModel.isFavTraderVisible(users.CLIENT_J_FavName, false)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    // verify traders button enabled
    dealModel.clickBtnSettings();
    dealModel.clickDisplayClientManagerMenu();
    expect(dealModel.verifyDisplayTraderFavEnabled()).to.equal(true);
    dealModel.clickBtnBack();

    dealModel.toggleTradersOff();
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, false)).to.equal(true);
    dealModel.toggleTradersOn();
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    dealModel.toggleClientsOn();
    expect(cmModel.isFavTraderVisible(users.CLIENT_J_FavName, true)).to.equal(true);
    expect(cmModel.isFavTraderVisible(users.TRADER_J_FavName, true)).to.equal(true);

    // verify traders button disabled
    dealModel.clickBtnSettings();
    dealModel.clickDisplayClientManagerMenu();
    expect(dealModel.verifyDisplayTraderFavDisabled()).to.equal(true);
    dealModel.clickBtnBack();

    dealModel.toggleCurrencyPairsOff();
    expect(cmModel.isFavCurrencyPairVisible(`${instrument.CURRENCY_A}${instrument.CURRENCY_D}`, false)).to.equal(true);
    dealModel.toggleCurrencyPairsOn();
    expect(cmModel.isFavCurrencyPairVisible(`${instrument.CURRENCY_A}${instrument.CURRENCY_D}`, true)).to.equal(true);

    dealModel.toggleTermsOff();
    expect(cmModel.isFavTermVisible(instrument.TENOR_C, false)).to.equal(true);
    dealModel.toggleTermsOn();
    expect(cmModel.isFavTermVisible(instrument.TENOR_C, true)).to.equal(true);

    dealModel.toggleExecutionVenuesOff();
    expect(cmModel.isFavTermVisible('TPSEF', false)).to.equal(true);
    dealModel.toggleExecutionVenuesOn();
    expect(cmModel.isFavTermVisible('TPSEF', true)).to.equal(true);
  });

  it('C6339 Submit Deal by using Broker, Trader, Currency, Execution Venue, and Term from Favorites', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.toggleAllFavourites('ON');
    dealModel.ratesFeedOff();
    // customer override problem where you need to add a favourite before you can use the favourites
    addCurrencyPairToFav([instrument.CURRENCY_B], false);

    dealModel.selectFavVenue('TPSD');
    expect(dealModel.getExecutionVenue()).to.equal('TPSD');

    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    // Adding the same trader two times,first time hove icon is not visible.
    dealModel.selectBuyerSide();
    dealModel.selectFavTrader(users.TRADER_K_ReName);
    dealModel.selectBuyerSide();
    dealModel.selectFavTrader(users.TRADER_K_ReName);

    validateClientHoverInfo('buyer', users.CLIENT_J, users.TRADER_K_DETAIL);
    dealModel.selectSellerSide();
    dealModel.selectFavTrader(users.TRADER_L_FavName);
    validateClientHoverInfo('seller', users.CLIENT_K, users.TRADER_L_DETAIL);

    dealModel.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_B}`);
    dealModel.selectFavTrader(users.TRADER_A_FavName);
    const valueDate = dealModel.getValueDate();
    // verify value date selection from fav
    dealModel.selectFavValueDate((moment().add(7, 'd')).format(dateFormat));
    expect(true).to.equal(dealModel.isValueDateUpdated(valueDate));
    expect(dealModel.getValueDate()).to.equal((moment().add(7, 'd')).format(dateFormat));
    dealModel.selectFavTerm(instrument.TENOR_K);
    dealModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    dealModel.selectFavTrader(users.TRADER_D_ReName);
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());

    validateClientHoverInfo('buyer', users.CLIENT_A, users.TRADER_A_DETAIL);
    validateClientHoverInfo('seller', users.CLIENT_D, users.TRADER_D_DETAIL);

    dealModel.inputPrice('1.5');
    dealModel.inputAmount('1');
    popUpNavModel.closePopUpMessage();
    expect(dealModel.getCurrency()).to.equal(instrument.CURRENCY_B);
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_K);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);
    dealModel.clickSubmitBtn();
    const message = popUpNavModel.getPopUpMessage();
    popUpNavModel.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(80000);

  it('C11987 submit outright deal by using Broker, Agent, currency, Venue and Term from favorites', () => {
    dealModel.clickRdoStrategyOutright();
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.toggleAllFavourites('ON');
    dealModel.ratesFeedOff();
    dealModel.clickResetBtn();
    // customer override problem where you need to add a favourite before you can use the favourites
    addCurrencyPairToFav([instrument.CURRENCY_B], false);

    dealModel.selectFavVenue('TPSD');
    expect(dealModel.getExecutionVenue()).to.equal('TPSD');

    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.selectBuyerSide();
    dealModel.selectFavTrader(users.TRADER_K_ReName);

    dealModel.selectSellerSide();
    dealModel.selectFavTrader(users.AGENT_A_FavName);
    dealModel.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_B}`);

    dealModel.selectFavTerm(instrument.TENOR_K);
    dealModel.inputPrice('1.5');
    dealModel.inputAmount('1');
    expect(dealModel.getCurrency()).to.equal(instrument.CURRENCY_B);
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_K);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(users.AGENT_A).to.equal(dealModel.getSellerAgentLbl());
    dealModel.clickSubmitBtn();
    const message = popUpNavModel.getPopUpMessage();
    popUpNavModel.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(80000);

  it('C10667 Submit Spread Deal by using Broker, Trader, Currency, Execution Venue, and Term from Favorites', () => {
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.toggleAllFavourites('ON');
    dealModel.ratesFeedOff();
    dealModel.clickRdoStrategySpread();
    dealModel.clickResetBtn();
    dealModel.clickThreeCpChk();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    dealModel.selectExecutionVenue('TPSEF');
    // problem where you need to add a favourite before you can use the favourites
    addCurrencyPairToFav([instrument.CURRENCY_B], false);
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.selectFavTrader(users.TRADER_K_ReName);
    dealModel.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_B}`);
    dealModel.selectFavTerm(instrument.TENOR_K);
    dealModel.selectFavTerm(instrument.TENOR_N);
    dealModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    dealModel.selectSellerSide();
    dealModel.selectFavTrader(users.TRADER_D_ReName);
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.selectcp2BuyerSide();
    dealModel.selectFavTrader(users.TRADER_H_FavName);
    dealModel.selectcp2SellerSide();
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.selectFavTrader(users.TRADER_K_ReName);
    dealModel.inputPrice('1.75');
    dealModel.inputPrice2('3.25');
    dealModel.inputAmount('1.5');
    dealModel.inputAmount2('2.5');

    expect(dealModel.getCurrency()).to.equal(instrument.CURRENCY_B);
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_K);

    // Buyer Client Hover Validation
    validateClientHoverInfo('buyer', users.CLIENT_J, users.TRADER_K_DETAIL);

    // Seller Client Hover Validation
    validateClientHoverInfo('seller', users.CLIENT_D, users.TRADER_D_DETAIL);

    // // Buyer CP2 Client Hover Validation
    // validateClientHoverInfo('buyer', users.CLIENT_H.Client, users.TRADER_H);

    // // Seller CP2 Client Hover Validation
    // validateClientHoverInfo('seller', users.CLIENT_F.Client, users.TRADER_F);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_D.Client} ${users.CLIENT_D.Location} / ${users.TRADER_D}`);

    expect(dealModel.getcp2BuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_H.Client} ${users.CLIENT_H.Location} / ${users.TRADER_H}`);
    expect(dealModel.getcp2SellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);

    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_C} / ${users.BROKER_D.Name}`);

    expect(dealModel.getcp2BuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getcp2SellerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);

    dealModel.clickSubmitBtn();
    const message = popUpNavModel.getPopUpMessage();
    log.log(`Popup Message Equals: ${message}`);
    popUpNavModel.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(60000);

  it('C11988 Submit Spread Deal by using Broker, Agent, Currency, Execution Venue, and Term from Favorites', () => {
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.toggleAllFavourites('ON');
    dealModel.clickResetBtn();
    dealModel.ratesFeedOff();
    dealModel.clickRdoStrategySpread();
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    // customer override problem where you need to add a favourite before you can use the favourites
    addCurrencyPairToFav([instrument.CURRENCY_B], false);

    dealModel.selectFavCurrency(`${instrument.CURRENCY_A}${instrument.CURRENCY_B}`);
    dealModel.selectFavTerm(instrument.TENOR_K);
    dealModel.selectFavTerm(instrument.TENOR_N);
    dealModel.selectFavVenue('TPSEF');
    expect(dealModel.getExecutionVenue()).to.equal('TPSEF');
    dealModel.inputPrice('1.75');
    dealModel.inputPrice2('3.25');
    dealModel.inputAmount('1.5');
    dealModel.inputAmount2('2.5');

    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.selectBuyerSide();
    dealModel.selectFavTrader(users.AGENT_A_FavName);

    dealModel.selectSellerSide();
    dealModel.selectFavTrader(users.TRADER_K_ReName);

    expect(dealModel.getCurrency()).to.equal(instrument.CURRENCY_B);
    expect(dealModel.getTerm()).to.equal(instrument.TENOR_K);

    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_J.Client} ${users.CLIENT_J.Location} / ${users.TRADER_K}`);

    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${eval(`users.${desk}`)} / ${users.BROKER_C.Name}`);

    dealModel.clickSubmitBtn();
    const message = popUpNavModel.getPopUpMessage();
    log.log(`Popup Message Equals: ${message}`);
    popUpNavModel.closePopUpMessage();
    expect(message).to.be.equal('Deal created');
  }).timeout(60000);

  it('C6340 Relaunch, Verify and Close Currency, Term, Execution Venue, Trader and Broker Favorites', () => {
    dealModel.selectFavBroker(users.BROKER_C.Name.toLowerCase());
    dealModel.toggleAllFavourites('ON');
    // TPDMS-2185 Below user don't have permission add user as Favorites.
    // dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    // dealModel.selectBuyerBrokerName(users.DESK_E, users.BROKER_K);
    // dealModel.clickBuyerStarBtn();

    const venues = ['TPSEF', 'XOFF', 'TPSD'];
    verifyCloseFavVenue(venues);
    verifyCloseFavValueDate([(moment().add(7, 'd')), (moment().add(14, 'd')), (moment().add(21, 'd')), (moment().add(28, 'd'))]);
    verifyCloseFavTerm([instrument.TENOR_C, instrument.TENOR_K, instrument.TENOR_F, instrument.TENOR_E, instrument.TENOR_A]);
    verifyCloseFavCurrency([instrument.CURRENCY_D, instrument.CURRENCY_B, instrument.CURRENCY_E, instrument.CURRENCY_F]);
    verifyCloseFavTrader(users.TRADER_A_FavName);
    verifyCloseFavTrader(users.TRADER_J_FavName);
    verifyCloseFavTrader(users.TRADER_K_ReName);
    verifyCloseFavTrader(users.TRADER_H_FavName);
    verifyCloseFavBroker(users.BROKER_C.FavName, users.BROKER_C.Name.toLowerCase());
    // dealModel.selectFavBroker('angie low'); Focus is moving now TPDMS-1820
    dealModel.selectFavBroker(users.BROKER_D.Name.toLowerCase());
    verifyCloseFavTrader(users.TRADER_D_ReName);
    verifyCloseFavTrader(users.TRADER_F_FavName);
    verifyCloseFavBroker(users.BROKER_D.FavName, users.BROKER_D.Name.toLowerCase());
  }).timeout(120000);

  it('C13080 Validate Favorites warning while adding without broker selection ', () => {
    dealModel.deleteAllFavBroker();
    addTermToFav([instrument.TENOR_C], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNavModel.getPopUpMessageText());
    popUpNavModel.closeConfirmationPopUpMessage();
    addCurrencyPairToFav([instrument.CURRENCY_D], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNavModel.getPopUpMessageText());
    popUpNavModel.closeConfirmationPopUpMessage();
    addExecVenueToFav(['TPSEF'], false);
    expect('No Broker tab open to add the favourite. Please open a Broker tab.').to.be.equal(popUpNavModel.getPopUpMessageText());
    popUpNavModel.closeConfirmationPopUpMessage();
  }).timeout(20000);
});
