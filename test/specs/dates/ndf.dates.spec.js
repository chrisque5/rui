/* eslint-disable no-eval */
/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../../models/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const SettingsModel = require('../../models/SettingsModel.js');
const Logs = require('../../core/utility/Logs.js');
const moment = require('../../../node_modules/moment/moment.js');
const LocalUsers = require('../../data/UserDetails.js');
const LocalInstrument = require('../../data/InstrumentDetails.js');
const QaUsers = require('../../data/qa/UserDetails.js');
const QaInstrument = require('../../data/qa/InstrumentDetails.js');
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

const dealModel = new DealModel();
const loginModel = new LoginModel();
const log = new Logs();
const settingsModel = new SettingsModel();
const backDateTime = '10:36:01';

let dateFormat = ''; // Date format is mm/dd/yyyy

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = dealModel.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  loginModel.openUrl(Constants.NDFURL);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.verifyNDFselected()).to.be.equal(true);
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('NDF Outright Date Tests', () => {
  it('C28978 Date check for a BRL standard 1 week (1W)', () => {
    const backDateDay = moment('01/02/2019').format(dateFormat);
    const fixingdate = moment('01/09/2019').format(dateFormat);
    const valuedate = moment('01/11/2019').format(dateFormat);
    const publishdate = moment('01/09/2019').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('7');
  });

  it('C28979 Date check for a BRL Carnival Holiday (1M)', () => {
    const backDateDay = moment('03/01/2019').format(dateFormat);
    const fixingdate = moment('04/04/2019').format(dateFormat);
    const valuedate = moment('04/08/2019').format(dateFormat);
    const publishdate = moment('04/04/2019').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_F);
    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('32');
  });

  (Constants.ENV === 'QA' ? it : it.skip)('C28980 Date check for a CNY New Years Holiday (1W)', () => {
    // Please note this test will fail locally due to a difference in holidays between QA and local DB's
    // CNY is missing lunar NYE in QA
    const backDateDay = moment('02/05/2021').format(dateFormat);
    const fixingdate = moment('02/09/2021').format(dateFormat);
    const valuedate = moment('02/18/2021').format(dateFormat);
    const publishdate = moment('02/09/2021').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('9');
  });

  (Constants.ENV === 'LOCAL' ? it : it.skip)('C29406 Date check for a CNY New Years Holiday (1W)', () => {
    // Please note this test will fail in QA due to a difference in holidays between QA and local DB's
    // CNY is missing lunar NYE
    const backDateDay = moment('01/31/2020').format(dateFormat);
    const fixingdate = moment('02/07/2020').format(dateFormat);
    const valuedate = moment('02/11/2020').format(dateFormat);
    const publishdate = moment('02/07/2020').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('7');
  });

  (Constants.ENV === 'QA' ? it : it.skip)('C28981 Date check for a BRL End Of Month Spot Date Test (1W)', () => {
    const backDateDay = moment('02/26/2019').format(dateFormat);
    const fixingdate = moment('03/01/2019').format(dateFormat);
    const valuedate = moment('03/07/2019').format(dateFormat);
    const publishdate = moment('03/01/2019').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    dealModel.selectExecutionVenue('TPSEF');
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('7');
  });

  it('C28982 Date check for a BRL End Of Month Spot Date Test (1M)', () => {
    const backDateDay = moment('02/26/2019').format(dateFormat);
    const fixingdate = moment('03/27/2019').format(dateFormat);
    const valuedate = moment('03/29/2019').format(dateFormat);
    const publishdate = moment('03/27/2019').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_F);
    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('29');
  });

  it('C28983 Date check for a BMF Tenor BRL (BMF3)', () => {
    const backDateDay = moment('07/01/2019').format(dateFormat);
    const fixingdate = moment('09/30/2019').format(dateFormat);
    const valuedate = moment('10/02/2019').format(dateFormat);
    const publishdate = moment('09/30/2019').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_R);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('91');
  });

  it('C28984 Date check for a TOM Tenor CNY (TOM)', () => {
    const backDateDay = moment('01/11/2021').format(dateFormat);
    const fixingdate = moment('01/12/2021').format(dateFormat);
    const valuedate = moment('01/14/2021').format(dateFormat);
    const publishdate = moment('01/12/2021').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_A);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('0');
  });

  it('C28985 Date check for a TOD Tenor and Publish date pushed back only one day KRW (TOD)', () => {
    const backDateDay = moment('02/03/2021').format(dateFormat);
    const fixingdate = moment('02/03/2021').format(dateFormat);
    const valuedate = moment('02/05/2021').format(dateFormat);
    const publishdate = moment('02/04/2021').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_S);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('0');
  });

  it('C28986 Date check for a TOD Tenor and Publish date pushed back 2 days BRL (TOD)', () => {
    const backDateDay = moment('02/03/2021').format(dateFormat);
    const fixingdate = moment('02/03/2021').format(dateFormat);
    const valuedate = moment('02/05/2021').format(dateFormat);
    const publishdate = moment('02/03/2021').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_S);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('0');
  });

  (Constants.ENV === 'LOCAL' ? it : it.skip)('C29408 Date check for 1 day Spot Currency CAD (1W)', () => {
    const backDateDay = moment('02/17/2021').format(dateFormat);
    const fixingdate = moment('02/24/2021').format(dateFormat);
    const valuedate = moment('02/25/2021').format(dateFormat);
    const publishdate = moment('02/24/2021').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_U);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
  });

  it('C31347 Daycount check when strategies are switched', () => {
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_F);
    dealModel.clickRdoStrategySpread();
    expect(dealModel.getDayCount()).to.equal('0');
  });

  (Constants.ENV === 'QA' ? it : it.skip)('C31650 Date check for NDF TOM including Holidays (TOM-IDR)', () => {
    const backDateDay = moment('05/22/2020').format(dateFormat);
    const fixingdate = moment('05/26/2020').format(dateFormat);
    const valuedate = moment('05/28/2020').format(dateFormat);
    const publishdate = moment('05/26/2020').format(dateFormat);
    dealModel.clickRdoStrategyOutright();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_M);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_A);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getDayCount()).to.equal('0');
  });
});

describe('NDF Spread Dates Tests', () => {
  it('C28987 Date check for a standard 1W-1M (BRL)', () => {
    const backDateDay = moment('08/01/2019').format(dateFormat);
    const fixingdate = moment('08/08/2019').format(dateFormat);
    const fixingdate2 = moment('09/03/2019').format(dateFormat);
    const valuedate = moment('08/12/2019').format(dateFormat);
    const valuedate2 = moment('09/05/2019').format(dateFormat);
    const publishdate = moment('08/08/2019').format(dateFormat);
    const publishdate2 = moment('09/03/2019').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputTerm2(instrument.TENOR_F);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('7');
    expect(dealModel.getDayCount2()).to.equal('31');
  });

  it('C28988 Date check for a Non LATAM TOM-1W Trade (KRW)', () => {
    const backDateDay = moment('01/18/2021').format(dateFormat);
    const fixingdate = moment('01/19/2021').format(dateFormat);
    const fixingdate2 = moment('01/26/2021').format(dateFormat);
    const valuedate = moment('01/21/2021').format(dateFormat);
    const valuedate2 = moment('01/28/2021').format(dateFormat);
    const publishdate = moment('01/20/2021').format(dateFormat);
    const publishdate2 = moment('01/27/2021').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_A);
    dealModel.inputTerm2(instrument.TENOR_C);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getDayCount2()).to.equal('7');
  });

  it('C28989 Date check for a LATAM TOM-1W Trade (BRL)', () => {
    const backDateDay = moment('01/19/2021').format(dateFormat);
    const fixingdate = moment('01/20/2021').format(dateFormat);
    const fixingdate2 = moment('01/26/2021').format(dateFormat);
    const valuedate = moment('01/22/2021').format(dateFormat);
    const valuedate2 = moment('01/28/2021').format(dateFormat);
    const publishdate = moment('01/20/2021').format(dateFormat);
    const publishdate2 = moment('01/26/2021').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_A);
    dealModel.inputTerm2(instrument.TENOR_C);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getDayCount2()).to.equal('7');
  });

  it('C28990 Date check for a 3D-2W Trade (CNY)', () => {
    const backDateDay = moment('12/07/2020').format(dateFormat);
    const fixingdate = moment('12/10/2020').format(dateFormat);
    const fixingdate2 = moment('12/21/2020').format(dateFormat);
    const valuedate = moment('12/14/2020').format(dateFormat);
    const valuedate2 = moment('12/23/2020').format(dateFormat);
    const publishdate = moment('12/10/2020').format(dateFormat);
    const publishdate2 = moment('12/21/2020').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_B);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_B1);
    dealModel.inputTerm2(instrument.TENOR_D);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('5');
    expect(dealModel.getDayCount2()).to.equal('14');
  });

  it('C28991 Date check for a 1W-40D Trade (BRL)', () => {
    const backDateDay = moment('01/18/2021').format(dateFormat);
    const fixingdate = moment('01/25/2021').format(dateFormat);
    const fixingdate2 = moment('02/25/2021').format(dateFormat);
    const valuedate = moment('01/27/2021').format(dateFormat);
    const valuedate2 = moment('03/02/2021').format(dateFormat);
    const publishdate = moment('01/26/2021').format(dateFormat);
    const publishdate2 = moment('02/26/2021').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_C);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputTerm2(instrument.TENOR_E1);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('7');
    expect(dealModel.getDayCount2()).to.equal('41');
  });

  it('C28992 Date check for a 1W-BMF3 Trade (BRL)', () => {
    const backDateDay = moment('02/19/2021').format(dateFormat);
    const fixingdate = moment('02/26/2021').format(dateFormat);
    const fixingdate2 = moment('04/30/2021').format(dateFormat);
    const valuedate = moment('03/02/2021').format(dateFormat);
    const valuedate2 = moment('05/04/2021').format(dateFormat);
    const publishdate = moment('02/26/2021').format(dateFormat);
    const publishdate2 = moment('04/30/2021').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    dealModel.selectExecutionVenue('TPSD');
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_C);
    dealModel.inputTerm2(instrument.TENOR_R);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('7');
    expect(dealModel.getDayCount2()).to.equal('70');
  });

  (Constants.ENV === 'QA' ? it : it.skip)('C28993 Date check for a IMM1-1Y Trade (BRL)', () => {
    const backDateDay = moment('02/19/2021').format(dateFormat);
    const fixingdate = moment('03/15/2021').format(dateFormat);
    const fixingdate2 = moment('02/21/2022').format(dateFormat);
    const valuedate = moment('03/17/2021').format(dateFormat);
    const valuedate2 = moment('02/23/2022').format(dateFormat);
    const publishdate = moment('03/15/2021').format(dateFormat);
    const publishdate2 = moment('02/21/2022').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_P);
    dealModel.inputTerm2(instrument.TENOR_K);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('22');
    expect(dealModel.getDayCount2()).to.equal('365');
  });

  it('C31348 Daycount check when strategies are switched', () => {
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_D);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_F);
    dealModel.clickRdoStrategyOutright();
    expect(dealModel.getDayCount()).to.equal('0');
  });

  (Constants.ENV === 'QA' ? it : it.skip)('C31651 Date check for NDF TOM-1W including Holidays (INR)', () => {
    const backDateDay = moment('10/09/2020').format(dateFormat);
    const fixingdate = moment('10/12/2020').format(dateFormat);
    const fixingdate2 = moment('10/19/2020').format(dateFormat);
    const valuedate = moment('10/14/2020').format(dateFormat);
    const valuedate2 = moment('10/21/2020').format(dateFormat);
    const publishdate = moment('10/12/2020').format(dateFormat);
    const publishdate2 = moment('10/19/2020').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_G);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_A);
    dealModel.inputTerm2(instrument.TENOR_C);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getDayCount2()).to.equal('7');
  });

  (Constants.ENV === 'QA' ? it : it.skip)('C31652 Date check for NDF(3CP) TOM-1W including Holidays (ARS)', () => {
    const backDateDay = moment('09/04/2020').format(dateFormat);
    const fixingdate = moment('09/08/2020').format(dateFormat);
    const fixingdate2 = moment('09/14/2020').format(dateFormat);
    const valuedate = moment('09/10/2020').format(dateFormat);
    const valuedate2 = moment('09/16/2020').format(dateFormat);
    const publishdate = moment('09/08/2020').format(dateFormat);
    const publishdate2 = moment('09/14/2020').format(dateFormat);
    dealModel.clickRdoStrategySpread();
    dealModel.clickThreeCpChk();
    settingsModel.ratesFeedOff();
    expect(dealModel.isBackDateSelected()).to.equal(false);
    expect(dealModel.isBackDateTimeActive()).to.equal(false);
    dealModel.selectBackDate();
    expect(dealModel.isBackDateSelected()).to.equal(true);
    expect(dealModel.isBackDateTimeActive()).to.equal(true);
    dealModel.inputBackDate(backDateDay);
    dealModel.inputBackDateTime(backDateTime);
    expect(dealModel.getBackDateValue()).to.equal(backDateDay);
    expect(dealModel.getBackDateTimeValue()).to.equal(backDateTime);

    dealModel.selectBaseCurrency(instrument.CURRENCY_A);
    dealModel.selectCurrency(instrument.CURRENCY_N);
    dealModel.selectDealtCurrency(instrument.CURRENCY_A);
    dealModel.inputTerm(instrument.TENOR_A);
    dealModel.inputTerm2(instrument.TENOR_C);

    expect(dealModel.getfixingDate()).to.equal(fixingdate);
    expect(dealModel.getfixingDate2()).to.equal(fixingdate2);
    expect(dealModel.getValueDate()).to.equal(valuedate);
    expect(dealModel.getValueDate2()).to.equal(valuedate2);
    expect(dealModel.getPublishDate()).to.equal(publishdate);
    expect(dealModel.getPublishDate2()).to.equal(publishdate2);
    expect(dealModel.getDayCount()).to.equal('0');
    expect(dealModel.getDayCount2()).to.equal('7');
  });
});
