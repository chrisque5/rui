/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const FwdDealModel = require('../models/fwd/DealModel.js');
const SptDealModel = require('../models/spt/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const CMModel = require('../models/CMModel.js');
const StrategyModel = require('../models/fwd/StrategyModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/UserDetails.js');
const LocalInstrument = require('../data/InstrumentDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const QaInstrument = require('../data/qa/InstrumentDetails.js');
const FwdUsers = require('../data/fwd/UserDetails.js');
const FwdInstrument = require('../data/fwd/InstrumentDetails.js');
const FwdQaUsers = require('../data/qa/fwd/UserDetails.js');
const FwdQaInstrument = require('../data/qa/fwd/InstrumentDetails.js');
const SptUsers = require('../data/spt/UserDetails.js');
const SptInstrument = require('../data/spt/InstrumentDetails.js');
const SptQaUsers = require('../data/qa/spt/UserDetails.js');
const SptQaInstrument = require('../data/qa/spt/InstrumentDetails.js');
const Constants = require('../data/Constants.js');
const VenueModel = require('../components/ndf/Venue.js');

let users = null;
let instrument = null;
let fwdUsers = null;
let fwdInstrument = null;
let sptUsers = null;
let sptInstrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    sptUsers = SptUsers;
    sptInstrument = SptInstrument;
    break;
  case 'QA':
    users = QaUsers;
    instrument = QaInstrument;
    fwdUsers = FwdQaUsers;
    fwdInstrument = FwdQaInstrument;
    sptUsers = SptQaUsers;
    sptInstrument = SptQaInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    fwdUsers = FwdUsers;
    fwdInstrument = FwdInstrument;
    sptUsers = SptUsers;
    sptInstrument = SptInstrument;
    break;
}

let desk;
let execVenues;
let nonSefVenues;
let nonSptVenues;
if (ENV === 'LOCAL') {
  desk = 'DESK_D';
  execVenues = [
    instrument.VENUE_A,
    instrument.VENUE_B,
    instrument.VENUE_J,
  ];
  nonSefVenues = instrument.NONSEFVENUES;
  nonSptVenues = instrument.NONSPTVENUES;
} else {
  desk = 'DESK_A';
  execVenues = [
    instrument.VENUE_A,
    instrument.VENUE_B,
    instrument.VENUE_C,
    instrument.VENUE_D,
    instrument.VENUE_E,
    instrument.VENUE_F,
    instrument.VENUE_G,
    instrument.VENUE_H,
    instrument.VENUE_I,
    instrument.VENUE_J,
  ];
  nonSefVenues = instrument.NONSEFVENUES;
  nonSptVenues = instrument.NONSPTVENUES;
}

const dealModel = new DealModel();
const fwdDealModel = new FwdDealModel();
const sptDealModel = new SptDealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const strategy = new StrategyModel();
const venue = new VenueModel();
const cmModel = new CMModel();
const settingsModel = new SettingsModel();
const log = new Logs();
let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_G.UserName, users.USER_G.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  loginModel.selectNDF();
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
  popUpNavModel.closePopUpMessage();
});

afterEach(() => {
  if (loginModel.getDdlUserDropdownText() !== users.USER_G.FullName) {
    loginModel.changeUser(users.USER_G.UserName, users.USER_G.PassWord);
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.be.equal(true);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  }
});

describe('Common functionality: Common Functionality tests', () => {
  function verifyTraderAvailable(traderList) {
    for (let i = 0; i < traderList.length; i += 1) {
      expect(cmModel.verifyFavTraderBtnColour(traderList[i], Constants.UNAVAILABLE)).to.equal(false);
    }
  }

  function verifyCurrencyAvailable(currencyList) {
    for (let i = 0; i < currencyList.length; i += 1) {
      expect(cmModel.verifyFavCurrencyBtnColour(currencyList[i], Constants.UNAVAILABLE)).to.equal(false);
    }
  }

  function verifyTermAvailable(termList) {
    for (let i = 0; i < termList.length; i += 1) {
      expect(cmModel.verifyFavTermBtnColour(termList[i], Constants.UNAVAILABLE)).to.equal(false);
    }
  }

  function verifyExecVenueFavColour(venueList, isAvailable, isColoured) {
    if (!isAvailable) {
      for (let i = 0; i < venueList.length; i += 1) {
        expect(cmModel.verifyFavExecVenueBtnColour(venueList[i], Constants.UNAVAILABLE)).to.equal(true);
      }
    } else if (isAvailable && isColoured) {
      for (let i = 0; i < venueList.length; i += 1) {
        expect(cmModel.verifyFavExecVenueBtnColour(venueList[i], `${eval(`Constants.${venueList[i]}.Colour`)}`)).to.equal(true);
      }
    } else if (isAvailable && !isColoured) {
      for (let i = 0; i < venueList.length; i += 1) {
        expect(cmModel.verifyFavExecVenueBtnColour(venueList[i], Constants.DEFAULT.Colour)).to.equal(true);
      }
    }
  }

  function verifySubmitBtnColourText(venueList, isActive) {
    if (isActive) {
      for (let i = 0; i < venueList.length; i += 1) {
        venue.selectExecutionVenue(venueList[i]);
        expect(dealModel.verifySubmitBtnState(`SUBMIT ${venueList[i]}`, `${eval(`Constants.${venueList[i]}.Colour`)}`)).to.equal(true);
      }
    } else {
      for (let i = 0; i < venueList.length; i += 1) {
        venue.selectExecutionVenue(venueList[i]);
        expect(dealModel.verifySubmitBtnState('SUBMIT', Constants.DEFAULT.Colour)).to.equal(true);
      }
    }
  }

  function addCurrencyPairToFav(currencyPairList) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      dealModel.selectCurrency(currencyPairList[i]);
      dealModel.clickCurrencyPairStarBtn();
    }
  }

  function addTermToFav(termList, isValidate) {
    for (let i = 0; i < termList.length; i += 1) {
      dealModel.inputTerm(termList[i]);
      dealModel.clickTermStarBtn();
      if (isValidate) {
        expect(termList[i]).to.equal(dealModel.getFavTermText(termList[i]));
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

  function verifyCloseFavBroker(brokerNameExp, brokerNameAc) {
    expect(brokerNameExp).to.equal(dealModel.getFavBrokerText(brokerNameAc));
    dealModel.closeFavBroker(brokerNameAc);
    expect('Are you sure you want to hide this Broker tab?').to.equal(popUpNavModel.getPopUpMessageText());
    popUpNavModel.closeFavPopUpMessage();
  }

  function verifyCloseFavTrader(traderName) {
    expect(traderName).to.equal(dealModel.getFavTraderText(traderName));
    dealModel.closeFavTrader(traderName);
    popUpNavModel.closeFavPopUpMessage();
  }

  function verifyCloseFavCurrency(currencyPairList) {
    for (let i = 0; i < currencyPairList.length; i += 1) {
      // eslint-disable-next-line max-len
      expect(currencyPairList[i]).to.equal(dealModel.getFavCurrencyText(currencyPairList[i]));
      dealModel.closeFavCurrency(currencyPairList[i]);
      popUpNavModel.closeFavPopUpMessage();
    }
  }

  function verifyCloseFavTerm(termList) {
    for (let i = 0; i < termList.length; i += 1) {
      expect(termList[i]).to.equal(dealModel.getFavTermText(termList[i]));
      dealModel.closeFavTerm(termList[i]);
      popUpNavModel.closeFavPopUpMessage();
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

  function verifyTermWarning(termList) {
    for (let i = 0; i < termList.length; i += 1) {
      cmModel.selectFavTerm(termList[i]);
      expect(popUpNavModel.getPopUpDescription()).to.equal('Selected term is not available for selection here.');
      popUpNavModel.closePopUpMessage();
    }
  }

  function verifyCurrencyWarning(currencyList) {
    for (let i = 0; i < currencyList.length; i += 1) {
      cmModel.selectFavCurrency(currencyList[i]);
      expect(popUpNavModel.getPopUpDescription()).to.equal('Selected currency is not available for selection here.');
      popUpNavModel.closePopUpMessage();
    }
  }

  function verifyTraderWarning(traderList) {
    for (let i = 0; i < traderList.length; i += 1) {
      cmModel.selectFavTrader(traderList[i]);
      log.log(`Attempting to select trader: ${traderList[i]}`);
      expect(popUpNavModel.getPopUpDescription()).to.equal('Selected counterparty is not available for selection here.');
      popUpNavModel.closePopUpMessage();
    }
  }

  function verifyVenueWarning(venues) {
    for (let i = 0; i < venues.length; i += 1) {
      cmModel.selectFavVenue(venues[i]);
      expect(popUpNavModel.getPopUpDescription()).to.equal('Selected execution venue is not available for selection here.');
      popUpNavModel.closePopUpMessage();
    }
  }

  it('C12474 Add NDF traders, currencies, terms and execution venues to favs from NDF tab and verify availability', () => {
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);
    settingsModel.toggleExecutionVenueColourOff();

    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C1.Name);
    // NDF only trader
    dealModel.selectBuyerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.clickBuyerStarBtn();
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    expect(users.TRADER_D_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_D_FavName));
    // Trader common to NDF, FWD and SPT
    dealModel.selectBuyerTrader(users.CLIENT_K.Client, users.TRADER_L);
    dealModel.clickBuyerStarBtn();
    expect(users.TRADER_L_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_L_FavName));
    // Trader common to NDF, FWD and SPT
    dealModel.selectBuyerTrader(users.CLIENT_H.Client, users.TRADER_H);
    dealModel.clickBuyerStarBtn();
    expect(users.TRADER_H_FavName).to.equal(dealModel.getFavTraderText(users.TRADER_H_FavName));
    // Trader common to NDF, FWD and SPT
    dealModel.selectBuyerTrader(users.CLIENT_I.Client, users.TRADER_NULL.Name);
    dealModel.selectBuyerAgent(users.AGENT_A);
    dealModel.clickBuyerAgentStarBtn();
    expect(users.AGENT_A_FavName).to.equal(dealModel.getFavTraderText(users.AGENT_A_FavName));

    addTermToFav([instrument.TENOR_A, instrument.TENOR_S, instrument.TENOR_K], true);
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    addCurrencyPairToFav([instrument.CURRENCY_B, instrument.CURRENCY_D, instrument.CURRENCY_C, instrument.CURRENCY_S], true);
    dealModel.selectBaseCurrency(instrument.CURRENCY_O);
    addCurrencyPairToFav([instrument.CURRENCY_K], true);
    addExecVenueToFav(execVenues, true);

    verifyTraderAvailable([users.TRADER_D_FavName, users.TRADER_L_FavName, users.TRADER_H_FavName, users.AGENT_A_FavName]);
    verifyTermAvailable([instrument.TENOR_A, instrument.TENOR_S, instrument.TENOR_K]);
    verifyCurrencyAvailable([
      `${instrument.CURRENCY_A}${instrument.CURRENCY_B}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_D}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_C}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_S}`,
      `${instrument.CURRENCY_O}${instrument.CURRENCY_K}`,
    ]);
    verifyExecVenueFavColour(execVenues, true, false);
  });

  it('C12475 Add FWD traders, currencies, and terms to favs from FWD tab and verify availability', () => {
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);
    // FWD only trader
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_L.Client, fwdUsers.TRADER_M);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C1.Name);
    dealModel.clickBuyerStarBtn();
    expect(fwdUsers.TRADER_M_FavName).to.equal(dealModel.getFavTraderText(fwdUsers.TRADER_M_FavName));
    // Trader common to both NDF and FWD
    dealModel.selectBuyerTrader(fwdUsers.CLIENT_J.Client, fwdUsers.TRADER_J);
    dealModel.clickBuyerStarBtn();
    expect(fwdUsers.TRADER_J_FavName).to.equal(dealModel.getFavTraderText(fwdUsers.TRADER_J_FavName));

    dealModel.selectBaseCurrency(fwdInstrument.CURRENCY_A);
    addTermToFav([fwdInstrument.TENOR_S, fwdInstrument.TENOR_T, fwdInstrument.TENOR_U, fwdInstrument.TENOR_G], true);
    dealModel.selectBaseCurrency(fwdInstrument.CURRENCY_P);
    addCurrencyPairToFav([fwdInstrument.CURRENCY_D], true);
    dealModel.selectBaseCurrency(fwdInstrument.CURRENCY_A);
    addCurrencyPairToFav([fwdInstrument.CURRENCY_Q, fwdInstrument.CURRENCY_R, fwdInstrument.CURRENCY_T], true);
    // click execution venue label as cursor hovers over term star button partially blocking fav buttons
    venue.clickExecVenueLbl();

    verifyTraderAvailable([users.TRADER_M_FavName]);
    verifyTermAvailable([fwdInstrument.TENOR_S, fwdInstrument.TENOR_T, fwdInstrument.TENOR_U]);
    verifyCurrencyAvailable([
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_Q}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_R}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_T}`,
      `${fwdInstrument.CURRENCY_P}${fwdInstrument.CURRENCY_D}`,
    ]);
    verifyExecVenueFavColour(nonSefVenues, true, false);
  });

  it('C25767 Add SPT traders and currencies to favs from SPT tab and verify availability', () => {
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C1.Name);
    // SPT only trader
    dealModel.selectBuyerTrader(sptUsers.CLIENT_L.Client, sptUsers.TRADER_M);
    dealModel.clickBuyerStarBtn();
    expect(sptUsers.TRADER_M_FavName).to.equal(dealModel.getFavTraderText(sptUsers.TRADER_M_FavName));
    // Trader common to both NDF, FWD and SPT
    dealModel.selectBuyerTrader(sptUsers.CLIENT_J.Client, sptUsers.TRADER_J);
    dealModel.clickBuyerStarBtn();
    expect(sptUsers.TRADER_J_FavName).to.equal(dealModel.getFavTraderText(sptUsers.TRADER_J_FavName));

    dealModel.selectBaseCurrency(sptInstrument.CURRENCY_Y);
    addCurrencyPairToFav([sptInstrument.CURRENCY_E], true);
    // click execution venue label as cursor hovers over term star button partially blocking fav buttons
    venue.clickExecVenueLbl();

    verifyTraderAvailable([sptUsers.TRADER_M_FavName]);
    verifyCurrencyAvailable([`${sptInstrument.CURRENCY_Y}${sptInstrument.CURRENCY_E}`]);
    verifyExecVenueFavColour(['XOFF'], true, false);
  });
  /* Setup for the following tests complete by here */
  it('C13000 Verify background colour of out of scope favourites in NDF', () => {
    settingsModel.toggleExecutionVenueColourOff();
    loginModel.selectNDF();
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    expect(loginModel.verifyNDFselected()).to.equal(true);

    // verify greyed out favs in NDF for FWD favs
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_S, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_T, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_U, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_Q}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_R}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_T}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${fwdInstrument.CURRENCY_P}${fwdInstrument.CURRENCY_D}`, Constants.UNAVAILABLE)).to.equal(true);
    // verify greyed out favs in NDF for SPT favs
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${sptInstrument.CURRENCY_Y}${sptInstrument.CURRENCY_E}`, Constants.UNAVAILABLE)).to.equal(true);

    // verify common favourites are not greyed out
    verifyTraderAvailable([
      users.TRADER_L_FavName,
      users.TRADER_H_FavName,
      users.AGENT_A_FavName,
      fwdUsers.TRADER_J_FavName,
      sptUsers.TRADER_J_FavName,
    ]);
    verifyTermAvailable([instrument.TENOR_A, instrument.TENOR_S, instrument.TENOR_K]);
    verifyCurrencyAvailable([
      `${instrument.CURRENCY_A}${instrument.CURRENCY_B}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_D}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_C}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_S}`,
      `${instrument.CURRENCY_O}${instrument.CURRENCY_K}`,
    ]);
  });

  it('C25768 Verify background colour of out of scope favourites in FWD', () => {
    settingsModel.toggleExecutionVenueColourOff();
    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());

    // verify grey background in FWD for NDF favs
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(instrument.TENOR_A, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(instrument.TENOR_S, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_A}${instrument.CURRENCY_B}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_A}${instrument.CURRENCY_D}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_A}${instrument.CURRENCY_C}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_O}${instrument.CURRENCY_K}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavExecVenueBtnColour('TPSEF', Constants.UNAVAILABLE)).to.equal(true);
    // verify grey background in FWD for SPT favs
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${sptInstrument.CURRENCY_Y}${sptInstrument.CURRENCY_E}`, Constants.UNAVAILABLE)).to.equal(true);

    // verify common favs are available
    verifyTraderAvailable([
      users.TRADER_L_FavName,
      users.TRADER_H_FavName,
      users.AGENT_A_FavName,
      fwdUsers.TRADER_J_FavName,
      sptUsers.TRADER_J_FavName,
    ]);
    verifyTermAvailable([instrument.TENOR_K, fwdInstrument.TENOR_G]);
    verifyCurrencyAvailable([`${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_S}`]);
    verifyExecVenueFavColour(nonSefVenues, true, false);

    // select FWD FWD and FWD Out and verify ON TN SN greyed out
    strategy.clickRdoStrategyFwdForward();
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_S, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_T, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_U, Constants.UNAVAILABLE)).to.equal(true);

    strategy.clickRdoStrategyOutright();
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_S, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_T, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_U, Constants.UNAVAILABLE)).to.equal(true);
  });

  it('C25769 Verify background colour of out of scope favourites in SPT', () => {
    settingsModel.toggleExecutionVenueColourOff();
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());

    // verify grey background in SPT for NDF favs
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(instrument.TENOR_A, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(instrument.TENOR_S, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(instrument.TENOR_K, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_A}${instrument.CURRENCY_B}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_A}${instrument.CURRENCY_D}`, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${instrument.CURRENCY_O}${instrument.CURRENCY_K}`, Constants.UNAVAILABLE)).to.equal(true);
    nonSptVenues.forEach((element) => {
      expect(cmModel.verifyFavExecVenueBtnColour(element, Constants.UNAVAILABLE)).to.equal(true);
    });
    // verify grey background in SPT for FWD favs
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_S, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_T, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_U, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTermBtnColour(fwdInstrument.TENOR_G, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavCurrencyBtnColour(`${fwdInstrument.CURRENCY_P}${fwdInstrument.CURRENCY_D}`, Constants.UNAVAILABLE)).to.equal(true);

    // verify common favs are available
    verifyTraderAvailable([
      users.TRADER_L_FavName,
      users.TRADER_H_FavName,
      users.AGENT_A_FavName,
      fwdUsers.TRADER_J_FavName,
      sptUsers.TRADER_J_FavName,
    ]);
    verifyCurrencyAvailable([
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_S}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_C}`,
    ]);
    verifyExecVenueFavColour(nonSptVenues, false);
  });

  it('C13001 Verify warning message for out of scope favourites in NDF', () => {
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    // verify warning message for FWD & SPT favs in NDF
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);

    verifyTermWarning([fwdInstrument.TENOR_S, fwdInstrument.TENOR_T, fwdInstrument.TENOR_U]);
    verifyCurrencyWarning([
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_Q}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_R}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_T}`,
      `${fwdInstrument.CURRENCY_P}${fwdInstrument.CURRENCY_D}`,
      `${sptInstrument.CURRENCY_Y}${sptInstrument.CURRENCY_E}`,
    ]);
    verifyTraderWarning([fwdUsers.TRADER_M_FavName, sptUsers.TRADER_M_FavName]);
  });

  it('C25770 Verify warning message for out of scope favourites in FWD', () => {
    // verify warning message for NDF & SPT favs in FWD
    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);

    verifyTermWarning([instrument.TENOR_A, instrument.TENOR_S]);
    cmModel.selectFavVenue('TPSEF');
    expect(popUpNavModel.getPopUpDescription()).to.equal('Selected execution venue is not available for selection here.');
    popUpNavModel.closePopUpMessage();
    verifyCurrencyWarning([
      `${instrument.CURRENCY_A}${instrument.CURRENCY_B}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_D}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_C}`,
      `${instrument.CURRENCY_O}${instrument.CURRENCY_K}`,
      `${sptInstrument.CURRENCY_Y}${sptInstrument.CURRENCY_E}`,
    ]);
    verifyTraderWarning([users.TRADER_D_FavName, sptUsers.TRADER_M_FavName]);
  });

  it('C25771 Verify warning message for out of scope favourites in SPT', () => {
    // verify warning message for NDF & FWD favs in SPT
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);

    verifyTermWarning([instrument.TENOR_A, instrument.TENOR_S, fwdInstrument.TENOR_S, fwdInstrument.TENOR_T, fwdInstrument.TENOR_U]);
    verifyVenueWarning(nonSptVenues);
    verifyCurrencyWarning([
      `${instrument.CURRENCY_O}${instrument.CURRENCY_K}`,
      `${fwdInstrument.CURRENCY_P}${fwdInstrument.CURRENCY_D}`,
    ]);
    verifyTraderWarning([users.TRADER_D_FavName, fwdUsers.TRADER_M_FavName]);
  });

  it('C13003 Change and verify favourite trader/agent colours in NDF tab', () => {
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);
    dealModel.toggleAllFavourites('ON');
    settingsModel.toggleExecutionVenueColourOff();
    // select broker tab
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());

    // Trader D is NDF only
    dealModel.rightClickFavTrader(users.TRADER_D_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(true);
    cmModel.clickEditColourBtn();
    expect(cmModel.isColourModalOpen()).to.equal(true);
    cmModel.dblClickColourBtn(Constants.COLOUR_1.DisplayName);
    expect(cmModel.isColourModalClose()).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.COLOUR_1.Colour)).to.equal(true);

    // fwd Trader M is FWD only
    dealModel.rightClickFavTrader(fwdUsers.TRADER_M_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(false);
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);

    // spt Trader M is SPT only
    dealModel.rightClickFavTrader(sptUsers.TRADER_M_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(false);
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);

    dealModel.rightClickFavTrader(users.TRADER_L_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(true);
    cmModel.clickEditColourBtn();
    expect(cmModel.isColourModalOpen()).to.equal(true);
    cmModel.clickColourBtn(Constants.COLOUR_3.DisplayName);
    expect(cmModel.isColourModalClose()).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_L_FavName, Constants.COLOUR_3.Colour)).to.equal(true);

    dealModel.rightClickFavTrader(users.TRADER_H_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(true);
    cmModel.clickEditColourBtn();
    expect(cmModel.isColourModalOpen()).to.equal(true);
    cmModel.clickColourBtn(Constants.COLOUR_4.DisplayName);
    expect(cmModel.isColourModalClose()).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_H_FavName, Constants.COLOUR_4.Colour)).to.equal(true);

    dealModel.rightClickFavTrader(users.AGENT_A_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(true);
    cmModel.clickEditColourBtn();
    expect(cmModel.isColourModalOpen()).to.equal(true);
    cmModel.clickColourBtn(Constants.COLOUR_5.DisplayName);
    expect(cmModel.isColourModalClose()).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.AGENT_A_FavName, Constants.COLOUR_5.Colour)).to.equal(true);
  });

  it('C25772 Change and verify favourite trader/agent colours in FWD tab', () => {
    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);

    dealModel.rightClickFavTrader(fwdUsers.TRADER_M_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(true);
    cmModel.clickEditColourBtn();
    expect(cmModel.isColourModalOpen()).to.equal(true);
    cmModel.clickColourBtn(Constants.COLOUR_2.DisplayName);
    expect(cmModel.isColourModalClose()).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.COLOUR_2.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);

    // ndf Trader D is NDF only
    dealModel.rightClickFavTrader(users.TRADER_D_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(false);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);

    // spt Trader M is SPT only
    dealModel.rightClickFavTrader(sptUsers.TRADER_M_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(false);
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);

  });

  it('C25773 Change and verify favourite trader/agent colours in SPT tab', () => {
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);

    dealModel.rightClickFavTrader(sptUsers.TRADER_M_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(true);
    cmModel.clickEditColourBtn();
    expect(cmModel.isColourModalOpen()).to.equal(true);
    cmModel.clickColourBtn(Constants.COLOUR_6.DisplayName);
    expect(cmModel.isColourModalClose()).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.COLOUR_6.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);

    // ndf Trader D is NDF only
    dealModel.rightClickFavTrader(users.TRADER_D_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(false);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);

    // fwd Trader M is FWD only
    dealModel.rightClickFavTrader(fwdUsers.TRADER_M_FavName);
    expect(cmModel.verifyMenuVisible()).to.equal(false);
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
  });

  it('C13004 Change user and verify favourite trader/agent colours in FWD, NDF and SPT tabs', () => {
    // login as different user and verify persistence across logins
    loginModel.changeUser(users.USER_B.UserName, users.USER_B.PassWord);
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);

    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C1.Name);
    dealModel.clickBuyerStarBtn();
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    expect(users.BROKER_C1.FavName).to.equal(dealModel.getFavBrokerText(users.BROKER_C1.Name.toLowerCase()));
    dealModel.selectFavBroker(users.BROKER_C1.Name.toLowerCase());
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.COLOUR_1.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_L_FavName, Constants.COLOUR_3.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_H_FavName, Constants.COLOUR_4.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.AGENT_A_FavName, Constants.COLOUR_5.Colour)).to.equal(true);

    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);

    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.COLOUR_2.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);

    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    expect(dealModel.isPageLoadComplete()).to.be.equal(true);

    expect(cmModel.verifyFavTraderBtnColour(sptUsers.TRADER_M_FavName, Constants.COLOUR_6.Colour)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(users.TRADER_D_FavName, Constants.UNAVAILABLE)).to.equal(true);
    expect(cmModel.verifyFavTraderBtnColour(fwdUsers.TRADER_M_FavName, Constants.UNAVAILABLE)).to.equal(true);
    loginModel.changeUser(users.USER_G.UserName, users.USER_G.PassWord);
  });

  it('C24397 Change user and verify and remove the favorites.', () => {
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);

    verifyCloseFavVenue(execVenues);
    verifyCloseFavTerm([instrument.TENOR_A, instrument.TENOR_S, instrument.TENOR_K]);
    verifyCloseFavTerm([fwdInstrument.TENOR_S, fwdInstrument.TENOR_T, fwdInstrument.TENOR_U, fwdInstrument.TENOR_G]);
    // eslint-disable-next-line max-len
    verifyCloseFavCurrency([
      `${instrument.CURRENCY_A}${instrument.CURRENCY_B}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_D}`,
      `${instrument.CURRENCY_A}${instrument.CURRENCY_C}`,
      `${instrument.CURRENCY_O}${instrument.CURRENCY_K}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_Q}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_R}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_S}`,
      `${fwdInstrument.CURRENCY_A}${fwdInstrument.CURRENCY_T}`,
      `${fwdInstrument.CURRENCY_P}${fwdInstrument.CURRENCY_D}`,
      `${sptInstrument.CURRENCY_Y}${sptInstrument.CURRENCY_E}`,
    ]);

    verifyCloseFavTrader(users.TRADER_D_FavName);
    verifyCloseFavTrader(users.TRADER_L_FavName);
    verifyCloseFavTrader(users.TRADER_H_FavName);
    verifyCloseFavTrader(users.AGENT_A_FavName);
    verifyCloseFavTrader(fwdUsers.TRADER_M_FavName);
    verifyCloseFavTrader(fwdUsers.TRADER_J_FavName);
    verifyCloseFavTrader(sptUsers.TRADER_M_FavName);
    verifyCloseFavBroker(users.BROKER_C1.FavName, users.BROKER_C1.Name.toLowerCase());
  });

  it('C13006 Select different execution venues and verify submit button colours and text', () => {
    dealModel.deleteAllFavBroker();
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);
    settingsModel.toggleExecutionVenueColourOff();
    verifySubmitBtnColourText(execVenues, false);

    settingsModel.toggleExecutionVenueColourOn();
    verifySubmitBtnColourText(execVenues, true);

    // Verify for FWD
    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);
    settingsModel.toggleExecutionVenueColourOff();
    verifySubmitBtnColourText(execVenues, false);

    settingsModel.toggleExecutionVenueColourOn();
    verifySubmitBtnColourText(nonSefVenues, true);

    // Verify for SPT
    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);
    settingsModel.toggleExecutionVenueColourOff();
    verifySubmitBtnColourText(['XOFF'], false);

    settingsModel.toggleExecutionVenueColourOn();
    verifySubmitBtnColourText(['XOFF'], true);
  });

  it('C13007 Verify execution venue favourite button colours when Display Execution Venue Colours active', () => {
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);
    settingsModel.toggleExecutionVenueColourOn();
    dealModel.selectBuyerBrokerName(`${eval(`users.${desk}`)}`, users.BROKER_C1.Name);
    dealModel.clickBuyerStarBtn();
    addExecVenueToFav(execVenues, true);

    verifyExecVenueFavColour(execVenues, true, true);

    loginModel.selectFWD();
    expect(loginModel.verifyFWDselected()).to.equal(true);

    expect(cmModel.verifyFavExecVenueBtnColour('TPSEF', Constants.UNAVAILABLE)).to.equal(true);
    verifyExecVenueFavColour(nonSefVenues, true, true);

    loginModel.selectSPT();
    expect(loginModel.verifySPTselected()).to.equal(true);

    verifyExecVenueFavColour(nonSptVenues, false);
    verifyExecVenueFavColour(['XOFF'], true, true);

    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);
    verifyCloseFavVenue(execVenues);
  });

  it('C20875 Submit Outright, FWD & SPT and verify Clear All button.', () => {
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    loginModel.selectNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.5', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpMessage()).to.be.equal('Deal created');
    dealModel.waitForSubmitBtnClickable();

    loginModel.selectFWD();
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    strategy.clickRdoStrategyForward();
    venue.selectExecutionVenue(instrument.VENUE_B);
    fwdDealModel.placeForwardOrderDetails(instrument.CURRENCY_A, instrument.CURRENCY_Q, '', instrument.TENOR_J1, '7.80085', '0.0245', '20', '', '20');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();
    dealModel.waitForSubmitBtnClickable();

    loginModel.selectSPT();
    expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_G.FullName);
    sptDealModel.placeSptOrder(instrument.CURRENCY_A, instrument.CURRENCY_Q, instrument.CURRENCY_A, '0.1', '0.15');
    dealModel.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();
    dealModel.waitForSubmitBtnClickable();
    expect(popUpNavModel.closeAllPopUpMessage()).to.equal(true);
  }).timeout(60000);

  it('C24398 Clicking Logout Cancel button closes Logout Modal', () => {
    loginModel.selectNDF();
    expect(loginModel.verifyNDFselected()).to.equal(true);
    loginModel.clickDdlUserDropDown();
    loginModel.clickBtnLogout();
    expect(loginModel.isModalLogoutVisible()).to.equal(true);
    loginModel.clickBtnLogoutCancel();
    expect(loginModel.isModalLogoutClose()).to.equal(true);
  });
});
