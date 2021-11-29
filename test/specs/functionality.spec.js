/* eslint-disable max-len */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const PopUpNavigationModel = require('../models/PopUpNavigationModel');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/UserDetails.js');
const LocalInstrument = require('../data/InstrumentDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const QaInstrument = require('../data/qa/InstrumentDetails.js');
const DateModel = require('../models/DateModel.js');
const Constants = require('../data/Constants.js');
const ClientTraderModel = require('../models/fwd/ClientTraderModel.js');

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

const dealModel = new DealModel();
const loginModel = new LoginModel();
const popUpNavModel = new PopUpNavigationModel();
const log = new Logs();
const date = new DateModel();
const settingsModel = new SettingsModel();

const clientTraderModel = new ClientTraderModel();
let dateFormat = '';

function moveToNDF() {
  loginModel.openUrl(Constants.NDFURL);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
}

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_J.UserName, users.USER_J.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('NDF functionality: Validation tests', () => {
  it('C5652 Confirm validation error displayed on Submit click with all fields empty', () => {
    moveToNDF();
    dealModel.clickSubmitBtn();
    log.log(`Pop Up Message is : ${popUpNavModel.getPopUpDescription()}`);
    expect(popUpNavModel.getPopUpDescription()).to.include('Please review validation errors');
    dealModel.clickRdoStrategySpread();
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C5653 Confirm validation error on Submit click with "0" entered for Rate', () => {
    moveToNDF();
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '0', '0.1');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.hoverPrice1();
    expect(dealModel.getFieldValidationText('Rate should be larger than 0')).to.equal('Rate should be larger than 0');
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C5655 Confirm validation error on Submit click with "0" entered for Amount', () => {
    moveToNDF();
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.25', '0');
    dealModel.hoverAmount1();
    expect(dealModel.getFieldValidationText('Amount should be larger than 0')).to.equal('Amount should be larger than 0');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C5656 Confirm validation error on Submit click with "-1" entered for Amount', () => {
    moveToNDF();
    settingsModel.ratesFeedOff();
    dealModel.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_K, '1.25', '-1');
    dealModel.hoverAmount1();
    expect(dealModel.getFieldValidationText('Amount should be larger than 0')).to.equal('Amount should be larger than 0');
    dealModel.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    dealModel.selectSellerTrader(users.CLIENT_D.Client, users.TRADER_D);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    dealModel.clickSubmitBtn();
    expect(popUpNavModel.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);
});

describe('NDF functionality: Parameterized Term input field tests', () => {
  (Constants.ENV === 'QA' ? it.skip : it)('C5769 Entering a range of values into Term field', () => {
    moveToNDF();
    const fixingDate = dealModel.getfixingDate(); // get date before changing term
    const valueDate = dealModel.getValueDate();
    const dayCount = dealModel.getDayCount(); // get day count value to compare against
    let varDayCount = dayCount;
    // settingsModel.ratesFeedOff();
    settingsModel.ratesFeedOn();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    [
      [instrument.TENOR_A],
      [instrument.TENOR_G],
      [instrument.TENOR_F],
      [instrument.TENOR_H.toLowerCase()],
      [instrument.TENOR_I],
      [instrument.TENOR_L],
      [instrument.TENOR_M],
      [instrument.TENOR_N],
      [instrument.TENOR_B],
      [instrument.TENOR_D],
      [instrument.TENOR_O],
      [instrument.TENOR_P.toLowerCase()],
      [instrument.TENOR_Q],
      [instrument.TENOR_R],
      [instrument.TENOR_S],
      [instrument.TENOR_U],
      [instrument.TENOR_V],
      ['T'],
    ].forEach(([termValue]) => {
      if (termValue === 'T') {
        dealModel.inputPartialTermByKeys('T');
        expect(dealModel.validateTermDropdownItems(instrument.TENOR_A)).to.be.equal(true);
        expect(dealModel.validateTermDropdownItems(instrument.TENOR_S)).to.be.equal(true);
        dealModel.inputPartialTermByKeys('T');
        dealModel.pressKey(1, '\uE015'); // arrow down
        dealModel.pressEnter();
        expect(dealModel.getTerm()).to.be.equal(instrument.TENOR_S);
      } else {
        dealModel.inputTerm(termValue);
        // put in below line to deal with issue in TPDMS-1889. Remove if it gets fixed
        dealModel.clickLblDealtCcy();
        log.log(`Auto Populated rate1/price1 is : ${dealModel.getPrice()}`);
        expect(dealModel.getTerm()).to.equal(termValue.toUpperCase());

        if (termValue === instrument.TENOR_S) { // TOD
          expect(true).to.be.equal(dealModel.isDayCountUpdated(varDayCount));
          varDayCount = dealModel.getDayCount();
          expect(dealModel.getfixingDate()).to.equal(fixingDate);
          expect(dealModel.getValueDate()).to.not.equal(valueDate);
          expect(dealModel.getDayCount()).to.equal('0');
        } else if (termValue === instrument.TENOR_A) { // TOM
          expect(dealModel.getfixingDate()).to.not.equal(fixingDate);
          expect(dealModel.getValueDate()).to.not.equal(valueDate);
          expect(dealModel.getDayCount()).to.equal('0');
        } else {
          expect(true).to.be.equal(dealModel.isDayCountUpdated(varDayCount));
          varDayCount = dealModel.getDayCount();
          expect(dealModel.getfixingDate()).to.not.equal(fixingDate);
          expect(dealModel.getValueDate()).to.not.equal(valueDate);
          expect(dealModel.getDayCount()).to.not.equal(dayCount);
        }
      }
    });
  });

  it('C5770 Entering invalid values into Term field', () => {
    moveToNDF();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    [
      ['3.6'],
      ['abc'],
      ['5g'],
      ['a@b'],
    ].forEach(([termValue]) => {
      dealModel.inputTermWithTab(termValue);
      if (termValue === '') {
        dealModel.hoverTerm1();
        expect(dealModel.getFieldValidationText('Term required')).to.equal('Term required');
      } else {
        dealModel.hoverTerm1();
        expect(dealModel.getFieldValidationText('Invalid term value')).to.equal('Invalid term value');
      }
    });
  }).timeout(30000);
});

describe('NDF functionality: Calculate Fixing Date from custom Value Date entry', () => {
  it('C5771 Calculate Fixing Date from custom Value Date entry & verify warning for holiday', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D); // Move currency on top bcz currency is persisted now.
    let fixingDate1 = dealModel.getfixingDate(); // store before changing term
    let valueDate1 = dealModel.getValueDate();
    let publishDate1 = dealModel.getPublishDate();
    let fixingDate2 = dealModel.getfixingDate2();
    let valueDate2 = dealModel.getValueDate2();
    let publishDate2 = dealModel.getPublishDate2();
    let dayCount1 = dealModel.getDayCount(); // store day count value to compare against
    let dayCount2 = dealModel.getDayCount2();
    let term1 = dealModel.getTerm(); // store term value to compare against
    let term2 = dealModel.getTerm2();

    // manually enter non-business day for valueDate1 & 2, verify warning & field values
    dealModel.inputValueDate(date.getNextNonBusinessDateFromToday().format(dateFormat));
    // eslint-disable-next-line max-len
    // expect(popUpNavModel.getPopUpDescription()).to.equal('Value Date entered does not match value date returned. Please enter Dates manually');
    expect(popUpNavModel.getPopUpDescription()).to.equal('Value Date is a non-working day or before Spot Date. Manually update all other dates and rate.');
    popUpNavModel.closePopUpMessage();

    expect(dealModel.getfixingDate()).to.equal(fixingDate1);
    expect(dealModel.getValueDate()).to.not.equal(valueDate1);
    expect(dealModel.getPublishDate()).to.equal(publishDate1);
    expect(dealModel.getDayCount()).to.not.equal(dayCount1);
    expect(dealModel.getTerm()).to.not.equal(term1);
    // log.log(`Fixing Date After changed.${dealModel.getfixingDate()}`);
    // log.log(`Value Date After changed.${dealModel.getValueDate()}`);
    // log.log(`Publish Date After changed.${dealModel.getPublishDate()}`);
    // log.log(`Day Count After changed.${dealModel.getDayCount()}`);
    // log.log(`Term After changed.${dealModel.getTerm()}`);

    dealModel.inputValueDate2(date.getNextNonBusinessDateFromToday().format(dateFormat));
    // eslint-disable-next-line max-len
    const des = popUpNavModel.getPopUpDescriptionAvailable();
    expect(des).to.equal('Value Date is a non-working day or before Spot Date. Manually update all other dates and rate.');
    popUpNavModel.closePopUpMessage();

    expect(dealModel.getfixingDate2()).to.equal(fixingDate2);
    expect(dealModel.getValueDate2()).to.not.equal(valueDate2);
    expect(dealModel.getPublishDate2()).to.equal(publishDate2);
    expect(dealModel.getDayCount2()).to.not.equal(dayCount2);
    expect(dealModel.getTerm2()).to.not.equal(term2);
    log.log(`Fixing Date 2 After changed.${dealModel.getfixingDate2()}`);
    log.log(`Value Date 2 After changed.${dealModel.getValueDate2()}`);
    log.log(`Publish Date 2 After changed.${dealModel.getPublishDate2()}`);
    log.log(`Day Count 2 After changed.${dealModel.getDayCount2()}`);
    log.log(`Term After 2 changed.${dealModel.getTerm2()}`);

    dealModel.clickResetBtn();
    // dealModel.clickRdoStrategySpread();

    fixingDate1 = dealModel.getfixingDate(); // store before changing term
    valueDate1 = dealModel.getValueDate();
    publishDate1 = dealModel.getPublishDate();
    fixingDate2 = dealModel.getfixingDate2();
    valueDate2 = dealModel.getValueDate2();
    publishDate2 = dealModel.getPublishDate2();
    dayCount1 = dealModel.getDayCount(); // store day count value to compare against
    dayCount2 = dealModel.getDayCount2();
    term1 = dealModel.getTerm(); // store term value to compare against
    term2 = dealModel.getTerm2();

    dealModel.selectCurrency(instrument.CURRENCY_B);

    // manually enter valid business day for valueDate1 & 2, verify field values
    // number of days needs changed if landing on ccy holiday
    // dealModel.inputValueDate(date.getBusinessDateFromToday(5).format(dateFormat));
    dealModel.inputValueDate(date.addBusinessDateFromToday(5, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat));
    expect(true).to.be.equal(dealModel.isDatePanelClose());
    expect(dealModel.getfixingDate()).to.not.equal(fixingDate1);
    expect(dealModel.getValueDate()).to.not.equal(valueDate1);
    expect(dealModel.getPublishDate()).to.not.equal(publishDate1);
    expect(dealModel.getDayCount()).to.not.equal(dayCount1);
    expect(dealModel.getTerm()).to.not.equal(term1);
    // expect(dealModel.getPrice()).to.not.equal('');
    log.log(`Fixing Date After changed.${dealModel.getfixingDate()}`);
    log.log(`Value Date After changed.${dealModel.getValueDate()}`);
    log.log(`Publish Date After changed.${dealModel.getPublishDate()}`);
    log.log(`Day Count After changed.${dealModel.getDayCount()}`);
    log.log(`Term After changed.${dealModel.getTerm()}`);

    dealModel.inputValueDate2(date.addBusinessDateFromToday(5, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat));
    expect(true).to.be.equal(dealModel.isDatePanelClose());
    expect(dealModel.getfixingDate2()).to.not.equal(fixingDate2);
    expect(dealModel.getValueDate2()).to.not.equal(valueDate2);
    expect(dealModel.getPublishDate2()).to.not.equal(publishDate2);
    expect(dealModel.getDayCount2()).to.not.equal(dayCount2);
    expect(dealModel.getTerm2()).to.not.equal(term2);
    expect(dealModel.getPrice2()).to.not.equal('');
    log.log(`Fixing Date 2 After changed.${dealModel.getfixingDate2()}`);
    log.log(`Value Date 2 After changed.${dealModel.getValueDate2()}`);
    log.log(`Publish Date 2 After changed.${dealModel.getPublishDate2()}`);
    log.log(`Day Count 2 After changed.${dealModel.getDayCount2()}`);
    log.log(`Term After 2 changed.${dealModel.getTerm2()}`);

    term = dealModel.getTerm().replace(/\D/g, '');
    expect(term).to.equal(dealModel.getDayCount());
    term2 = dealModel.getTerm2().replace(/\D/g, '');
    expect(term2).to.equal(dealModel.getDayCount2());
  }).timeout(300000);

  it('C11893 Calculate and amend Publish Date for outright', () => {
    let exTradeDate1 = '';
    let exValueDate1 = '';
    let exFixingDate1 = '';
    let exPublishDate1 = '';
    [
      instrument.CURRENCY_B,
      instrument.CURRENCY_C,
    ].forEach((currency) => {
      moveToNDF();
      settingsModel.ratesFeedOn();
      dealModel.clickRdoStrategyOutright();
      dealModel.selectExecutionVenue('TPSEF');
      dealModel.placeOutrightOrderWithRates(instrument.CURRENCY_A, currency, currency, instrument.TENOR_C, '1.5');

      // This is actually returning the spot date for certain currencies, see getDaysDifference() in DateModel.js
      exTradeDate1 = date.getTradeDate(instrument.CURRENCY_A, currency);
      // Following date calculations will be incorrect if based on Trade Date, should be Spot Date
      exValueDate1 = date.getValueDate(exTradeDate1.clone(), instrument.TENOR_C, currency);
      exFixingDate1 = date.getFixingDate(exValueDate1.clone(), currency);
      exPublishDate1 = date.getPublishDate(exValueDate1.clone(), currency);

      const fixingDate1 = dealModel.getfixingDate();
      const valueDate1 = dealModel.getValueDate();
      const publishDate1 = dealModel.getPublishDate();

      expect(exFixingDate1.format(dateFormat)).equal(fixingDate1);
      expect(exValueDate1.format(dateFormat)).equal(valueDate1);
      expect(exPublishDate1.format(dateFormat)).equal(publishDate1);
    });

    // TPDMS-2074 publish date
    nextPublishDate1 = date.getNextBusinessDate(exFixingDate1.clone(), '1d').format(dateFormat);
    dealModel.inputPublishDate(nextPublishDate1);
    expect(dealModel.getPublishDate()).equal(nextPublishDate1);
  });

  (ENV === 'QA' ? it.skip : it)('C11894 Calculate and amend Publish Date for spread', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('TPSEF');
    dealModel.placeSpreadOrderWithRates(instrument.CURRENCY_A, instrument.CURRENCY_B, instrument.CURRENCY_B, instrument.TENOR_C, '1.5', instrument.TENOR_D, '1.255');

    // This is actually returning the spot date for certain currencies, see getDaysDifference() in DateModel.js
    const exTradeDate1 = date.getTradeDate(instrument.CURRENCY_A, instrument.CURRENCY_B);
    const exValueDate1 = date.getValueDate(exTradeDate1.clone(), instrument.TENOR_C, instrument.CURRENCY_B);
    // Following date calculations will be incorrect if based on Trade Date, should be Spot Date
    const exFixingDate1 = date.getFixingDate(exValueDate1.clone(), instrument.CURRENCY_B);
    const exValueDate2 = date.getValueDate(exTradeDate1.clone(), instrument.TENOR_D, instrument.CURRENCY_B);
    const exFixingDate2 = date.getFixingDate(exValueDate2.clone(), instrument.CURRENCY_B);
    const fixingDate1 = dealModel.getfixingDate();
    const valueDate1 = dealModel.getValueDate();
    const publishDate1 = dealModel.getPublishDate();
    const fixingDate2 = dealModel.getfixingDate2();
    const valueDate2 = dealModel.getValueDate2();
    const publishDate2 = dealModel.getPublishDate2();

    expect(exFixingDate1.format(dateFormat)).equal(fixingDate1);
    expect(exFixingDate2.format(dateFormat)).equal(fixingDate2);
    expect(exFixingDate1.format(dateFormat)).equal(publishDate1);
    expect(exFixingDate2.format(dateFormat)).equal(publishDate2);
    expect(exValueDate1.format(dateFormat)).equal(valueDate1);
    expect(exValueDate2.format(dateFormat)).equal(valueDate2);

    // TPDMS-2074 publish date
    nextPublishDate1 = date.getNextBusinessDate(exFixingDate1.clone(), '1d').format(dateFormat);
    nextPublishDate2 = date.getNextBusinessDate(exFixingDate2.clone(), '1d').format(dateFormat);
    dealModel.inputPublishDate(nextPublishDate1);
    expect(dealModel.getPublishDate()).equal(nextPublishDate1);
    dealModel.inputPublishDate2(nextPublishDate2);
    expect(dealModel.getPublishDate2()).equal(nextPublishDate2);
  });
});

describe('NDF functionality: Move to different fields by using keyboard', () => {
  it('C5772 Validate the buyer client Trader movement by tab', () => {
    moveToNDF();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    // Adding one more currency selection, so persist value will not impact the tab movement.
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_C);
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_B);
    expect(true).to.equal(dealModel.isDealtCCYFocused());
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.moveByTab(6);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5773 Validate the buyer broker movement by tab', () => {
    moveToNDF();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    expect(true).to.equal(dealModel.isPrice1Focused());
    dealModel.moveByTab(2);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5774 Validate the seller client Trader movement by tab', () => {
    moveToNDF();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.moveByTab(9);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5775 Validate the seller broker movement by tab', () => {
    moveToNDF();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.moveByTab(9);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5776 Validate the buyer client Trader movement by tab', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    // Adding one more currency selection, so persist value will not impact the tab movement.
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_C);
    dealModel.selectCurrencyWithoutVerification(instrument.CURRENCY_B);
    expect(true).to.equal(dealModel.isDealtCCYFocused());
    dealModel.clickResetBtn();
    dealModel.moveByTab(10);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5777 Validate the buyer broker movement by tab', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    expect(true).to.equal(dealModel.isPrice1Focused());
    dealModel.inputTerm2(instrument.TENOR_C);
    expect(true).to.equal(dealModel.isPrice2Focused());
    dealModel.moveByTab(2);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5782 Validate the seller client Trader movement by tab', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.moveByTab(13);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });

  it('C5783 Validate the seller broker movement by tab', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.clickResetBtn();
    expect(true).to.equal(dealModel.isPageReset());
    dealModel.moveByTab(13);
    dealModel.pressEnter();
    expect(true).to.equal(dealModel.isCasCadOpen());
    dealModel.moveByTab(1);
    expect(true).to.equal(dealModel.isCasCadClose());
  });
});

describe('NDF functionality: Rate and Points tests', () => {
  it('C5784 Calculate Rate 2 by entering Rate 1 and Points', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice('1234.50');
    dealModel.inputPoints('50.25');
    expect(dealModel.getPrice2()).to.equal('1284.75');
    dealModel.inputPoints(' ');
    dealModel.hoverPoints();
    expect(dealModel.getFieldValidationText('Points required')).to.equal('Points required');
  }).timeout(30000);

  it('C5785 Calculate Points by entering Rate 1 and Rate 2', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice('1234.50');
    dealModel.inputPrice2('1124.12345');
    expect(dealModel.getPoints()).to.equal('-110.37655');
  }).timeout(30000);

  it('C5786 Calculate Rate 1 by entering Rate 2 and Points', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice2('84.54321');
    dealModel.inputPoints('-22.12345');
    expect(dealModel.getPrice()).to.equal('106.66666');
  }).timeout(30000);

  // changing a field
  it('C5787 Changing Rate 1 should recalculate Rate 2 from Rate 1 & Points', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice('1000.5');
    dealModel.inputPoints('-5.25');
    expect(dealModel.getPrice2()).to.equal('995.25');
    // calculates points instead of Rate2 if you put a trailing zero in here:
    dealModel.inputPrice('999.50');
    expect(dealModel.getPrice2()).to.equal('994.25');
  }).timeout(30000);

  it('C5788 Changing Rate 2 should recalculate Rate 1 from Rate 2 & Points', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice('1000.5');
    dealModel.inputPoints('-5.25');
    expect(dealModel.getPrice2()).to.equal('995.25');
    dealModel.inputPrice2('994.25');
    expect(dealModel.getPrice()).to.equal('999.5');
  }).timeout(30000);

  it('C5793 Changing Points should recalculate Rate 2 from Rate 1 & Rate 2', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice('1000.5');
    dealModel.inputPoints('-5.25');
    expect(dealModel.getPrice2()).to.equal('995.25');
    dealModel.inputPoints('1.25');
    expect(dealModel.getPrice2()).to.equal('1001.75');
  }).timeout(30000);

  it('C5794 Entering Rate 1 value to 6dp should result in Rate2 to 6dp', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputPrice('1001.123456');
    dealModel.inputPoints('12.5');
    expect(dealModel.getPrice2()).to.equal('1013.623456');
  }).timeout(30000);
});

describe('NDF functionality: Parameterized Amount input field tests', () => {
  it('C5795 Entering a range of values into Amount field', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    [
      ['1', '1,000,000'],
      ['1.001', '1,001,000'],
      ['1.003', '1,003,000'],
      ['0.1', '100,000'],
      ['1B', '1,000,000,000'],
      ['1M', '1,000,000'],
      ['0.000001', '1'],
      ['1000000', '1,000,000'],
      ['1000000000', '1,000,000,000'],
    ].forEach(([amountValue1, amountValue2]) => {
      dealModel.inputAmount(amountValue1);
      if (amountValue1 === '1B' || amountValue1 === '1M') {
        if (amountValue1 === '1B') {
          expect(dealModel.getAmount()).to.equal('1,000,000,000');
          expect(dealModel.getAmount2()).to.equal('1,000,000,000');
        } else {
          expect(dealModel.getAmount()).to.equal('1,000,000');
          expect(dealModel.getAmount2()).to.equal('1,000,000');
        }
      } else {
        expect(dealModel.getAmount2()).to.equal(amountValue2);
      }
    });
  }).timeout(30000);

  it('C5796 Entering a range of invalid values into Amount field', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    [
      ['abc'],
      ['M1'],
      ['@.,:'],
      ['0'],
      ['-1'],
      [''],
    ].forEach(([amountValue]) => {
      dealModel.inputAmountWithoutKeys(amountValue);
      if (amountValue === '') {
        dealModel.hoverAmount1();
        expect(dealModel.getFieldValidationText('Amount required')).to.equal('Amount required');
      } else if (amountValue === '0' || amountValue === '-1') {
        expect(dealModel.getFieldValidationText('Amount should be larger than 0')).to.equal('Amount should be larger than 0');
      } else {
        dealModel.hoverAmount1();
        expect(dealModel.getFieldValidationText('Invalid Amount')).to.equal('Invalid Amount');
      }
      dealModel.hoverPrice1(); // Moving out the hover from the Amount1 Field.
      expect(dealModel.getAmount2WithoutWait()).to.equal('');
    });
  }).timeout(30000);
});

describe('NDF functionality: Amount field tests', () => {
  it('C10660 Entering a decimal number in Amount 1 and verify value in Amount 2', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.inputAmount('0.1');
    expect(dealModel.getAmount2()).to.equal('100,000');
    dealModel.clickAmount();

    expect(dealModel.getAmount()).to.equal('100,000');
    expect(dealModel.getAmount2()).to.equal('100,000');
    dealModel.clickAmount2();
    // known bug - amount 1 multiplies by 1M again for value below 1M
    expect(dealModel.getAmount()).to.equal('100,000');
    expect(dealModel.getAmount2()).to.equal('100,000');
  }).timeout(30000);

  it('C11617 Entering a range of invalid numeric values into outright Amount field', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    [
      ['123,456,789,123', 'BEFORE_DP'],
      ['1234567.1234', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      dealModel.inputAmountWithoutKeys(amountValue);
      if (dp === 'BEFORE_DP') {
        dealModel.hoverAmount1();
        expect(dealModel.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
      } else {
        dealModel.hoverAmount1();
        expect(dealModel.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
      }
    });
  });

  it('C31589 Entering a range of invalid numeric values into outright Amount field when DealtCCY = CCY2', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.selectDealtCurrency(instrument.CURRENCY_C);
    [
      ['123,456,789,1234', 'BEFORE_DP'],
      ['1234567.1234', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      dealModel.inputAmountWithoutKeys(amountValue);
      if (dp === 'BEFORE_DP') {
        dealModel.hoverAmount1();
        expect(dealModel.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
      } else {
        dealModel.hoverAmount1();
        expect(dealModel.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
      }
    });
  });

  it('C11618 Entering a range of invalid numeric values into spread Amount field', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    [
      ['123,456,789,123', 'BEFORE_DP', 'AMOUNT_1'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_1'],
      ['123,456,789,123', 'BEFORE_DP', 'AMOUNT_2'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_2'],
    ].forEach(([amountValue, dp, field]) => {
      if (field === 'AMOUNT_1') {
        dealModel.inputAmount(amountValue);
        if (dp === 'BEFORE_DP') {
          dealModel.hoverAmount1();
          expect(dealModel.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
        } else {
          dealModel.hoverAmount1();
          expect(dealModel.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      } else {
        dealModel.inputAmount2(amountValue);
        if (dp === 'BEFORE_DP') {
          dealModel.hoverAmount2();
          expect(dealModel.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
        } else {
          dealModel.hoverAmount2();
          expect(dealModel.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      }
      // Move out the focus from the field.
      dealModel.clickResetBtn();
    });
  });

  it('C31594 Entering a range of invalid numeric values into spread Amount field when Dealt CCY = CCY2', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.selectDealtCurrency(instrument.CURRENCY_C);
    [
      ['123,456,789,1234', 'BEFORE_DP', 'AMOUNT_1'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_1'],
      ['123,456,789,1234', 'BEFORE_DP', 'AMOUNT_2'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_2'],
    ].forEach(([amountValue, dp, field]) => {
      if (field === 'AMOUNT_1') {
        dealModel.inputAmount(amountValue);
        if (dp === 'BEFORE_DP') {
          dealModel.hoverAmount1();
          expect(dealModel.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
        } else {
          dealModel.hoverAmount1();
          expect(dealModel.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      } else {
        dealModel.inputAmount2(amountValue);
        if (dp === 'BEFORE_DP') {
          dealModel.hoverAmount2();
          expect(dealModel.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
        } else {
          dealModel.hoverAmount2();
          expect(dealModel.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      }
      // Move out the focus from the field.
      dealModel.clickResetBtn();
    });
  });

  it('C11619 Entering a range of invalid numeric values into outright Rate field', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    [
      ['123,456', 'BEFORE_DP'],
      ['12345.1234567', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      dealModel.inputPrice(amountValue);
      if (dp === 'BEFORE_DP') {
        dealModel.hoverPrice1();
        expect(dealModel.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
      } else {
        dealModel.hoverPrice1();
        expect(dealModel.getFieldValidationText(Constants.MAXDPRATEAFTER)).to.equal(Constants.MAXDPRATEAFTER);
      }
    });
  });

  it('C11620 Entering a range of invalid numeric values into spread Rate field', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    [
      ['123,456', 'BEFORE_DP', 'RATE_1'],
      ['12345.1234567', 'AFTER_DP', 'RATE_1'],
      ['123,456', 'BEFORE_DP', 'RATE_2'],
      ['12345.1234567', 'AFTER_DP', 'RATE_2'],
    ].forEach(([priceValue, dp, field]) => {
      if (field === 'RATE_1') {
        dealModel.inputPrice(priceValue);
        if (dp === 'BEFORE_DP') {
          dealModel.hoverPrice1();
          expect(dealModel.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
        } else {
          dealModel.hoverPrice1();
          expect(dealModel.getFieldValidationText(Constants.MAXDPRATEAFTER)).to.equal(Constants.MAXDPRATEAFTER);
        }
      } else {
        dealModel.inputPrice2(priceValue);
        if (dp === 'BEFORE_DP') {
          dealModel.hoverPrice2();
          expect(dealModel.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
        } else {
          dealModel.hoverPrice2();
          expect(dealModel.getFieldValidationText(Constants.MAXDPRATEAFTER)).to.equal(Constants.MAXDPRATEAFTER);
        }
      }
      // Move out the focus from the field.
      dealModel.clickResetBtn();
    });
  });

  it('C11621 Entering a range of invalid numeric values into spread Points field', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    [
      ['123,456', 'BEFORE_DP'],
      ['12345.1234567', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      dealModel.inputPoints(amountValue);
      if (dp === 'BEFORE_DP') {
        dealModel.hoverPoints();
        expect(dealModel.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
      } else {
        dealModel.hoverPoints();
        expect(dealModel.getFieldValidationText(Constants.MAXDPRATEAFTER)).to.equal(Constants.MAXDPRATEAFTER);
      }
    });
  });

  it('C31267 Ensure no trailing zeros in Price 2 field after Price 1 or Points edit for PHP', () => {
    moveToNDF();
    settingsModel.ratesFeedOn();
    dealModel.clickRdoStrategySpread();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_I);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputTerm2(instrument.TENOR_F);
    dealModel.waitForPrice1(5000);
    const origPrice2 = dealModel.getPrice2();
    dealModel.inputPrice('49.51');
    const price2 = dealModel.getPrice2();
    expect(origPrice2).to.not.equal(price2);
    expect(price2.toString()).to.be.equal(price2);
    dealModel.inputPoints('0.18');
    dealModel.waitForPrice1(5000);
    expect(price2.toString()).to.be.equal(price2);
  }).timeout(30000);
});

describe('NDF functionality: Verify currencies in dropdown are in alphabetical order', () => {
  it('C13322 Verify alphabetical order for NDF Outright currencies', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    expect(dealModel.verifyCurrencyListOrder(dealModel.getCurrencyListItems())).to.equal(true);
  }).timeout(30000);
});

describe('NDF functionality: Reset button behaviour', () => {
  it('C24175 Should not receive any warning message on selecting any valid value date after clicking reset button on NDF Outright', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    const businessDate = date.addBusinessDateFromToday(5, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    dealModel.inputValueDate(businessDate);
    expect(true).to.be.equal(dealModel.isDatePanelClose());
    expect(businessDate).to.be.equal(dealModel.getValueDate());

    dealModel.clickResetBtn();
    dealModel.inputValueDate(businessDate);
    expect(true).to.be.equal(dealModel.isDatePanelClose());
    expect(businessDate).to.be.equal(dealModel.getValueDate());
    expect(true).to.be.equal(popUpNavModel.verifyNoPopUpMessage());
  });

  it('C24176 Should not receive any warning message on selecting any valid value date after clicking reset button on NDF Spread', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOn();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputTerm2(instrument.TENOR_F);
    dealModel.waitForPrice1(5000);
    dealModel.waitForPrice2(5000);

    const businessDate = date.addBusinessDateFromToday(5, instrument.CURRENCY_A, instrument.CURRENCY_B).format(dateFormat);
    dealModel.inputValueDate(businessDate);
    expect(true).to.be.equal(dealModel.isDatePanelClose());
    expect(businessDate).to.be.equal(dealModel.getValueDate());

    dealModel.clickResetBtn();
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputTerm2(instrument.TENOR_F);
    dealModel.waitForPrice1(5000);
    dealModel.waitForPrice2(5000);

    dealModel.inputValueDate(businessDate);
    expect(true).to.be.equal(dealModel.isDatePanelClose());
    expect(businessDate).to.be.equal(dealModel.getValueDate());
    expect(true).to.be.equal(popUpNavModel.verifyNoPopUpMessage());
  });
});

describe('NDF functionality: Validate behaviour of LHS/RHS switch', () => {
  it('C14583 Validate LHS/RHS has no impact on Outright', () => {
    loginModel.selectNDF();

    dealModel.selectBuyerTrader(users.CLIENT_I.Client, users.TRADER_I);
    dealModel.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    dealModel.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    dealModel.selectSellerBrokerName(users.DESK_B, users.BROKER_B);

    expect(clientTraderModel.getBuyerCounterPartySideside()).to.be.equal('B');
    expect(clientTraderModel.getSellerCounterPartySideside()).to.be.equal('S');

    settingsModel.toggleLRModeOn();

    expect(clientTraderModel.getBuyerCounterPartySideside()).to.be.equal('B');
    expect(clientTraderModel.getSellerCounterPartySideside()).to.be.equal('S');

    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} ${users.CLIENT_I.Location} / ${users.TRADER_I}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);

    settingsModel.toggleLRModeOff();
    expect(clientTraderModel.getBuyerCounterPartySideside()).to.be.equal('B');
    expect(clientTraderModel.getSellerCounterPartySideside()).to.be.equal('S');

    expect(dealModel.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(dealModel.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} ${users.CLIENT_I.Location} / ${users.TRADER_I}`);
    expect(dealModel.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(dealModel.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
  }).timeout(60000);
});

describe('NDF functionality: NDF Rates should not populate on weekends.', () => {
  it('C24177 Outright rates should be blank on weekends.', () => {
    loginModel.selectNDF();
    dealModel.clickRdoStrategyOutright();
    dealModel.ratesFeedOn();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.inputTerm(instrument.TENOR_J);

    // verify rate and point fields populate
    expect(dealModel.getPrice()).to.not.equal('');

    dealModel.inputValueDate(date.getNextNonBusinessDateFromToday().format(dateFormat));
    expect(popUpNavModel.getPopUpDescription()).to.equal(Constants.NDF_VALUE_DATE_WARNING);
    popUpNavModel.closePopUpMessage();

    expect(dealModel.getPriceWithoutWait()).to.equal('');
  });

  it('C24178 Spread rates should be blank on weekends.', () => {
    loginModel.selectNDF();
    dealModel.clickRdoStrategySpread();
    dealModel.ratesFeedOn();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.inputTerm(instrument.TENOR_J);
    dealModel.inputTerm2(instrument.TENOR_J1);

    // verify rate and point fields populate
    expect(dealModel.getPrice()).to.not.equal('');
    expect(dealModel.getPrice2()).to.not.equal('');
    expect(dealModel.getPoints()).to.not.equal('');

    dealModel.inputValueDate(date.getNextNonBusinessDateFromToday().format(dateFormat));
    expect(popUpNavModel.getPopUpDescription()).to.equal(Constants.NDF_VALUE_DATE_WARNING);
    popUpNavModel.closePopUpMessage();

    expect(dealModel.getPriceWithoutWait()).to.equal('');
    expect(dealModel.getPrice2WithoutWait()).to.equal('');
  });
});

describe('NDF functionality: Back Dated Trade Functionality.', () => {
  it('C24179 Verify Rate field is reset after changing currency with back dated trade checked', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();

    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputPrice('1.234');

    dealModel.selectBackDate();

    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    expect(dealModel.getPrice()).to.equal('1.234');

    dealModel.selectCurrency(instrument.CURRENCY_B);
    expect(dealModel.getPrice()).to.equal('');
  });

  it('C24180 Verify Rate field is reset after changing currency with back dated trade checked', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();

    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputPrice('1.234');
    dealModel.inputTerm2(instrument.TENOR_D);
    dealModel.inputPrice2('1.235');

    dealModel.selectBackDate();

    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    expect(dealModel.getPrice()).to.equal('1.234');
    expect(dealModel.getPrice2()).to.equal('1.235');
    expect(dealModel.getPoints()).to.not.equal('');

    dealModel.selectCurrency(instrument.CURRENCY_B);
    expect(dealModel.getPrice()).to.equal('');
    expect(dealModel.getPrice2()).to.equal('');
    expect(dealModel.getPoints()).to.equal('');
  });

  it('C24181 Verify Backdate date and time fields disabled on when form reset for outright', () => {
    moveToNDF();
    dealModel.clickRdoStrategyOutright();

    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateDateActive()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);

    dealModel.selectBackDate();

    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateDateActive()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);

    dealModel.clickResetBtn();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateDateActive()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
  });

  it('C24182 Verify Backdate date and time fields disabled on when form reset', () => {
    moveToNDF();
    dealModel.clickRdoStrategySpread();

    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateDateActive()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);

    dealModel.selectBackDate();

    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateDateActive()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);

    dealModel.clickResetBtn();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateDateActive()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
  });
});
