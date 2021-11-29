/* eslint-disable no-undef */
const expect = require('chai').expect;
const moment = require('moment');
const DealModel = require('../../models/fwd/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const SettingsModel = require('../../models/SettingsModel.js');
const BackDate = require('../../components/ndf/BackDate.js');

const StrategyModel = require('../../models/fwd/StrategyModel.js');
const CurrencyModel = require('../../models/fwd/CurrencyModel.js');
const TermModel = require('../../models/fwd/TermModel.js');
const PriceModel = require('../../models/fwd/PriceModel.js');
const PointModel = require('../../models/fwd/PointModel.js');
const AmountModel = require('../../models/fwd/AmountModel.js');
const DealDateModel = require('../../models/fwd/DateModel.js');
const AgentModel = require('../../models/fwd/AgentModel');
const BrokerModel = require('../../models/fwd/BrokerModel.js');
const ClientTraderModel = require('../../models/fwd/ClientTraderModel.js');
const Cls = require('../../components/fwd/Cls.js');

const Logs = require('../../core/utility/Logs.js');
const LocalUsers = require('../../data/fwd/UserDetails.js');
const LocalInstrument = require('../../data/fwd/InstrumentDetails.js');
const QaUsers = require('../../data/qa/fwd/UserDetails.js');
const QaInstrument = require('../../data/qa/fwd/InstrumentDetails.js');
const DevUsers = require('../../data/fwd/dev/UserDetails.js');
const DevInstrument = require('../../data/fwd/dev/InstrumentDetails.js');
const DateModel = require('../../models/DateModel.js');
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
const backDate = new BackDate();

const strategy = new StrategyModel();
const currency = new CurrencyModel();
const term = new TermModel();
const price = new PriceModel();
const point = new PointModel();
const amount = new AmountModel();
const dealDate = new DealDateModel();
const agent = new AgentModel();
const broker = new BrokerModel();
const clientTrader = new ClientTraderModel();
const cls = new Cls();

const log = new Logs();
const date = new DateModel();
let dateFormat = '';

function moveToFWD() {
  login.openUrl(Constants.FWDURL);
  expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
  expect(login.verifyFWDselected()).to.be.equal(true);
}

before(() => {
  login.openUrl('/DMSWeb');
  login.login(users.USER_H.UserName, users.USER_H.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

describe('FWD FWD functionality: Validation tests', () => {
  it('C11908 Confirm validation error displayed on Submit click with all fields empty on Fwd forward', () => {
    strategy.clickRdoStrategyFwdForward();
    deal.clickSubmitBtn();
    log.log(`Pop Up Message is : ${popUpNav.getPopUpDescription()}`);
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C11909 Confirm validation error on Submit click with "0" entered for Rate on Fwd forward', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOff();
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_J, '0', '0.1', instrument.TENOR_M, '0', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    price.hoverPrice1();
    expect(point.getFieldValidationText('Rate should be larger than 0')).to.equal('Rate should be larger than 0');
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C11910 Confirm validation error on Submit click with "0" entered for Amount on Fwd forward', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOff();
    deal.placeFwdForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_J, '5', '0', instrument.TENOR_M, '5.5', '0');
    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    amount.hoverAmount1();
    expect(point.getFieldValidationText('Amount should be larger than 0')).to.equal('Amount should be larger than 0');
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);
});

describe('FWD FWD functionality: Parameterized Amount input field tests', () => {
  it('C11911 Entering a range of values into Amount field on Fwd forward', () => {
    strategy.clickRdoStrategyFwdForward();
    [
      ['1', '1,000,000'],
      ['0.1', '100,000'],
      ['1.001', '1,001,000'],
      ['1.003', '1,003,000'],
      ['1B', '1,000,000,000'],
      ['1M', '1,000,000'],
      ['0.000001', '1'],
      ['1000000', '1,000,000'],
      ['1000000000', '1,000,000,000'],
      ['1000000000    ', '1,000,000,000'],
    ].forEach(([amountValue1, amountValue2]) => {
      amount.inputAmount(amountValue1);
      if (amountValue1 === '1B' || amountValue1 === '1M') {
        if (amountValue1 === '1B') {
          expect(amount.getAmount()).to.equal('1,000,000,000');
          expect(amount.getAmount2()).to.equal('1,000,000,000');
        } else {
          expect(amount.getAmount()).to.equal('1,000,000');
          expect(amount.getAmount2()).to.equal('1,000,000');
        }
      } else {
        expect(amount.getAmount2()).to.equal(amountValue2);
      }
    });
  }).timeout(30000);

  it('C11912 Entering a range of invalid values into Amount field on Fwd forward', () => {
    strategy.clickRdoStrategyFwdForward();
    [
      ['abc'],
      ['M1'],
      ['@.,:'],
      ['0'],
      ['-1'],
      [''],
    ].forEach(([amountValue]) => {
      amount.inputAmountWithoutKeys(amountValue);
      if (amountValue === '') {
        amount.hoverAmount1();
        expect(point.getFieldValidationText('Amount required')).to.equal('Amount required');
      } else if (amountValue === '0' || amountValue === '-1') {
        amount.hoverAmount1();
        expect(point.getFieldValidationText('Amount should be larger than 0')).to.equal('Amount should be larger than 0');
      } else {
        amount.hoverAmount1();
        expect(point.getFieldValidationText('Invalid Amount')).to.equal('Invalid Amount');
      }
      price.hoverPrice1(); // Moving out the hover from the Amount1 Field.
      expect(amount.getAmount2WithoutWait()).to.equal('');
    });
  }).timeout(30000);

  it('C13018 Entering a range of invalid vales into Rates field on Forward Forward', () => {
    strategy.clickRdoStrategyFwdForward();
    [
      [Constants.MAXRATEFAKEEDATA],
      ['abc'],
      ['MA'],
      ['@.,:'],
      ['0'],
    ].forEach(([priceValue]) => {
      price.inputPrice(priceValue);
      if (priceValue === Constants.MAXRATEFAKEEDATA) {
        price.hoverPrice1();
        expect(point.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
        expect(Constants.MAXRATEEDATA).to.equal(price.getPrice());
      } else if (priceValue === '0' || priceValue === '-1') {
        price.hoverPrice1();
        expect(point.getFieldValidationText('Rate should be larger than 0')).to.equal('Rate should be larger than 0');
      } else {
        price.hoverPrice1();
        expect(point.getFieldValidationText('Rate required')).to.equal('Rate required');
      }
    });
  });
});

describe('FWD FWD functionality: Amount, Rate and Point field tests', () => {
  it('C11628 Entering a decimal number in fwd forward Amount 1 and verify value in Amount 2', () => {
    strategy.clickRdoStrategyFwdForward();
    amount.inputAmount('0.1');
    expect(amount.getAmount2()).to.equal('100,000');
    amount.clickAmount();

    expect(amount.getAmount()).to.equal('100,000');
    expect(amount.getAmount2()).to.equal('100,000');
    amount.clickAmount2();
    // known bug - amount 1 multiplies by 1M again for value below 1M
    expect(amount.getAmount()).to.equal('100,000');
    expect(amount.getAmount2()).to.equal('100,000');
  }).timeout(30000);

  it('C11629 Entering a range of invalid numeric values into fwd forward Amount field', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    [
      ['123,456,789,123', 'BEFORE_DP', 'AMOUNT_1'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_1'],
      ['123,456,789,123', 'BEFORE_DP', 'AMOUNT_2'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_2'],
    ].forEach(([amountValue, dp, field]) => {
      if (field === 'AMOUNT_1') {
        amount.inputAmount(amountValue);
        if (dp === 'BEFORE_DP') {
          amount.hoverAmount1();
          expect(point.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
        } else {
          amount.hoverAmount1();
          expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      } else {
        amount.inputAmount2(amountValue);
        if (dp === 'BEFORE_DP') {
          amount.hoverAmount2();
          expect(point.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
        } else {
          amount.hoverAmount2();
          expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      }
      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });

  it('C31604 Entering a range of invalid numeric values into fwd forward Amount field when Dealt CCY is CCY2', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    currency.selectDealtCurrency(instrument.CURRENCY_R);
    [
      ['123,456,789,1234', 'BEFORE_DP', 'AMOUNT_1'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_1'],
      ['123,456,789,1234', 'BEFORE_DP', 'AMOUNT_2'],
      ['1234567.1234', 'AFTER_DP', 'AMOUNT_2'],
    ].forEach(([amountValue, dp, field]) => {
      if (field === 'AMOUNT_1') {
        amount.inputAmount(amountValue);
        if (dp === 'BEFORE_DP') {
          amount.hoverAmount1();
          expect(point.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
        } else {
          amount.hoverAmount1();
          expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      } else {
        amount.inputAmount2(amountValue);
        if (dp === 'BEFORE_DP') {
          amount.hoverAmount2();
          expect(point.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
        } else {
          amount.hoverAmount2();
          expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
        }
      }
      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });

  it('C11630 Entering a range of invalid numeric values into fwd forward Rate field', () => {
    strategy.clickRdoStrategyFwdForward();
    [
      ['123,456', 'BEFORE_DP', 'RATE_1'],
      ['12345.123456789', 'AFTER_DP', 'RATE_1'],
      ['123,456', 'BEFORE_DP', 'RATE_2'],
      ['12345.123456789', 'AFTER_DP', 'RATE_2'],
    ].forEach(([priceValue, dp, field]) => {
      if (field === 'RATE_1') {
        price.inputPrice(priceValue);
        if (dp === 'BEFORE_DP') {
          price.hoverPrice1();
          expect(point.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
        } else {
          price.hoverPrice1();
          expect(point.getFieldValidationText(Constants.MAXDPFWDRATEAFTER)).to.equal(Constants.MAXDPFWDRATEAFTER);
        }
      } else {
        price.inputPrice2(priceValue);
        if (dp === 'BEFORE_DP') {
          price.hoverPrice2();
          expect(point.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
        } else {
          price.hoverPrice2();
          expect(point.getFieldValidationText(Constants.MAXDPFWDRATEAFTER)).to.equal(Constants.MAXDPFWDRATEAFTER);
        }
      }
      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });

  it('C11631 Entering a range of invalid numeric values into fwd forward Points field', () => {
    strategy.clickRdoStrategyFwdForward();
    [
      ['123,456', 'BEFORE_DP'],
      ['12345.123456789', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      point.inputPoints(amountValue);
      if (dp === 'BEFORE_DP') {
        point.hoverPoints();
        expect(point.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
      } else {
        point.hoverPoints();
        expect(point.getFieldValidationText(Constants.MAXDPFWDRATEAFTER)).to.equal(Constants.MAXDPFWDRATEAFTER);
      }
    });
  });
});

// Scaling factor used for calculations EURGBP = 0.0001;
describe('FWD FWD functionality: Rate and Points Scaling Factor calculations', () => {
  it('C12053 Calculate Rate 2 by entering Rate 1 and Points', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1234.50');
    point.inputPoints('50.25');
    // expect rate 2 = points * scaling factor +  rate 1
    expect(price.getPrice2()).to.equal('1234.505025');
    point.inputPoints(' ');
    point.hoverPoints();
    expect(point.getFieldValidationText('Points required')).to.equal('Points required');
  }).timeout(30000);

  it('C12054 Calculate Rate 2 by entering Rate 1 and Points and validate precision', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    price.inputPrice('1234.50');
    point.inputPoints('.25242629');
    const exPriceVal = price.calPrice2(1234.50, 0.25242629, instrument.ScalFactor_AT, 'FWD');
    expect(price.getPrice2()).to.equal(exPriceVal);
  }).timeout(30000);

  it('C12055 Calculate Points by entering Rate 1 and Rate 2', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1234.50');
    price.inputPrice2('1124.12345');
    // points = (rate 2 - rate 1) / scaling factor
    expect(point.getPoints()).to.equal('-1103765.5');
  }).timeout(30000);

  it('C12056 Calculate Points by entering Rate 1 and Rate 2 and validate precision', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    price.inputPrice('84.12076797');
    price.inputPrice2('85.12575758');
    const exPoint = point.calPoint(84.12076797, 85.12575758, instrument.ScalFactor_AT, 'FWD');
    expect(point.getPoints()).to.equal(exPoint.toString());
  }).timeout(30000);

  it('C12057 Validate Points value when rates feed is on', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    term.inputTerm(instrument.TENOR_B);
    term.inputTerm2(instrument.TENOR_C);
    log.log(price.getPrice());
    log.log(price.getPrice2());
    const exPoint = point.calPoint(parseFloat(price.getPrice()), parseFloat(price.getPrice2()), instrument.ScalFactor_AT, 'FWD');
    expect(point.getPoints()).to.equal(exPoint.toString());
    const exPrice1 = price.calPrice1(parseFloat(price.getPrice2()), point.getPoints(), instrument.ScalFactor_AT, 'FWD');
    expect(price.getPrice()).to.equal(exPrice1.toString());
    const exPrice2 = price.calPrice2(parseFloat(price.getPrice()), exPoint, instrument.ScalFactor_AT, 'FWD');
    expect(exPrice2.toString()).to.equal(price.getPrice2());
  }).timeout(30000);

  it('C12058 Calculate Rate 1 by entering Rate 2 and Points', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOff();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice2('84.123');
    point.inputPoints('22.321');
    // rate1 =  rate2 - points * scaling factor
    expect(price.getPrice()).to.equal('84.1207679');
  }).timeout(30000);

  it('C12059 Calculate Rate 1 by entering Rate 2 and Points and validate precision', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    price.inputPrice2('84.123');
    point.inputPoints('.25242629');
    const exPriceVal = price.calPrice1(84.123, 0.25242629, instrument.ScalFactor_AT, 'FWD');
    expect(price.getPrice()).to.equal(exPriceVal);
  }).timeout(30000);

  // changing a field
  it('C11960 Changing Rate 1 should recalculate Rate 2 from Rate 1 & Points', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1000.5');
    point.inputPoints('-5.25');
    expect(price.getPrice2()).to.equal('1000.499475');
    price.inputPrice('999.50');
    expect(price.getPrice2()).to.equal('999.499475');
  }).timeout(30000);

  it('C12027 Changing Rate 2 should recalculate Rate 1 from Rate 2 & Points', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1000.5');
    point.inputPoints('-5.25');
    expect(price.getPrice2()).to.equal('1000.499475');
    price.inputPrice2('994.25');
    expect(price.getPrice()).to.equal('994.250525');
  }).timeout(30000);

  it('C12060 Changing Points should recalculate Rate 2 from Rate 1 & Rate 2', () => {
    strategy.clickRdoStrategyFwdForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1000.5');
    point.inputPoints('-5.25');
    expect(price.getPrice2()).to.equal('1000.499475');
    point.inputPoints('1.25');
    expect(price.getPrice2()).to.equal('1000.500125');
  }).timeout(30000);
});

describe('FWD FWD functionality: Verify Rate 1, Rate 2 and Points fields should populate on currency and term selection', () => {
  it('C12061 Select terms and tab out of both rate fields, verify rates/points not recalculated.', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOn();
    deal.clickResetBtn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_J);
    term.inputTerm2(instrument.TENOR_J1);
    price.waitForPrice1(5000);
    // verify rate and point fields populate
    let rate1 = price.getPrice();
    let rate2 = price.getPrice2();
    let points = point.getPoints();

    expect(rate1).to.not.equal('');
    expect(rate2).to.not.equal('');
    expect(points).to.not.equal('');
    // verify focus on rate 2
    expect(price.isPrice2Focused()).to.equal(true);
    // tab in and out
    deal.pressTab();
    expect(rate1).to.equal(price.getPrice());
    expect(rate2).to.equal(price.getPrice2());
    expect(points).to.equal(point.getPoints());
    // reset page and enter terms in different order
    deal.clickResetBtn();
    term.inputTerm2(instrument.TENOR_J1);
    term.inputTerm(instrument.TENOR_J);
    price.waitForPrice1(5000);
    // verify rate and point fields populate
    rate1 = price.getPrice();
    rate2 = price.getPrice2();
    points = point.getPoints();

    expect(rate1).to.not.equal('');
    expect(rate2).to.not.equal('');
    expect(points).to.not.equal('');
    // verify focus on rate 1
    expect(price.isPrice1Focused()).to.equal(true);
    // tab in and out
    deal.pressTab();
    expect(rate1).to.equal(price.getPrice());
    expect(rate2).to.equal(price.getPrice2());
    expect(points).to.equal(point.getPoints());
  });
});

describe('FWD FWD functionality: Dates, term, daycount and backdate tests', () => {
  it('C12062 The Term list should not display TN, ON, SN, TOM and TOD options in the drop down for forward forward.', () => {
    strategy.clickRdoStrategyFwdForward();
    const expTerm = ['TN', 'ON', 'SN', 'TOM', 'TOD'];
    expect(true).to.equal(term.termsNotAvalInTerm1(expTerm));
    expect(true).to.equal(term.termsNotAvalInTerm2(expTerm));
  });

  it('C12063 Verify after changing value date 2, Term 2 does not equal day count 2.', () => {
    strategy.clickRdoStrategyFwdForward();

    let termValue = term.getTerm();
    let term2Value = term.getTerm2();
    let dayCount = dealDate.getDayCount();
    let dayCount2 = dealDate.getDayCount2();
    const valueDate = dealDate.getValueDate();
    const valueDate2 = dealDate.getValueDate2();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);

    term.inputTerm(instrument.TENOR_J);
    term.inputTerm2(instrument.TENOR_J1);
    expect(term.getTerm()).to.not.equal(termValue);
    expect(term.getTerm2()).to.not.equal(term2Value);
    expect(true).to.be.equal(dealDate.isDayCountUpdated(dayCount));
    expect(true).to.be.equal(dealDate.isDayCount2Updated(dayCount2));
    expect(true).to.be.equal(dealDate.isValueDateUpdated(valueDate));
    expect(true).to.be.equal(dealDate.isValueDate2Updated(valueDate2));
    expect(dealDate.getValueDate()).to.not.equal(valueDate);
    expect(dealDate.getValueDate2()).to.not.equal(valueDate2);

    termValue = term.getTerm();
    term2Value = term.getTerm2();
    dayCount = dealDate.getDayCount();
    dayCount2 = dealDate.getDayCount2();

    const newValueDate2 = date.addBusinessDays(moment(dealDate.getValueDate()), 2).format(dateFormat);
    dealDate.inputValueDate2(newValueDate2);

    termValue = term.getTerm().replace(/\D/g, '');
    term2Value = term.getTerm2().replace(/\D/g, '');
    expect(termValue).to.not.equal(dealDate.getDayCount2());
    expect(parseInt(term2Value, 10)).to.be.above(parseInt(termValue, 10));
  });

  it('C12076 Verify consistency of day count.', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_F);
    term.inputTerm2(instrument.TENOR_H);
    log.log(price.getPrice());
    log.log(price.getPrice2());
    const valueDate1 = moment(dealDate.getValueDate(), dateFormat);
    const dayCount1 = dealDate.getDayCount();

    const newValueDate = date.addDays(valueDate1.clone(), 15).format(dateFormat);
    dealDate.inputValueDate(newValueDate);
    expect(dealDate.isDayCountUpdated(dayCount1)).to.equal(true);
    const updatedDayCount1 = dealDate.getDayCount();
    const oldValueDate = valueDate1.format(dateFormat);
    dealDate.verifyAndInputValueDate(oldValueDate);
    expect(dealDate.isDayCountUpdated(updatedDayCount1)).to.equal(true);
    expect(dayCount1).to.equal(dealDate.getDayCount());
  });

  it('C24193 Verify Rate field is reset after changing currency with back dated trade checked', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOff();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_B);
    price.inputPrice('1.234');
    term.inputTerm2(instrument.TENOR_C);
    price.inputPrice2('1.235');

    backDate.selectBackDate();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);
    expect(price.getPrice()).to.equal('1.234');
    expect(price.getPrice2()).to.equal('1.235');
    expect(point.getPoints()).to.not.equal('');

    currency.selectCurrency(instrument.CURRENCY_S);
    expect(price.getPrice()).to.equal('');
    expect(price.getPrice2()).to.equal('');
    expect(point.getPoints()).to.equal('');
  });

  it('C24194 Verify Backdate date and time fields disabled on when form reset', () => {
    strategy.clickRdoStrategyFwdForward();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateDateActive()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    backDate.selectBackDate();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateDateActive()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);

    deal.clickResetBtn();
    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateDateActive()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);
  });

  it('C24228 Dates before today should be greyed out in date picker', () => {
    strategy.clickRdoStrategyFwdForward();

    dealDate.clickValueDate1();
    const yesterday = date.subtractDateFromToday(1).format('YYYY-MM-DD');
    expect(dealDate.isDateDisabled(yesterday)).to.equal(true);
    dealDate.clickNumDayCount1();

    dealDate.clickValueDate2();
    expect(dealDate.isDateDisabled(yesterday)).to.equal(true);
  });
});

describe('FWD FWD functionality: Move to different fields for FWD Forward by using keyboard', () => {
  it('C12077 Validate the buyer client Trader movement by tab', () => {
    strategy.clickRdoStrategyFwdForward();
    expect(true).to.equal(currency.isPageReset());
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    // Adding one more currency selection, so persist value will not impact the tab movement.
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_R);
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_S);
    expect(true).to.equal(currency.isDealtCCYFocused());
    deal.clickResetBtn();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(11);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C12078 Validate the buyer broker movement by tab', () => {
    strategy.clickRdoStrategyFwdForward();
    expect(true).to.equal(currency.isPageReset());
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_C);
    expect(true).to.equal(price.isPrice1Focused());
    term.inputTerm2(instrument.TENOR_C);
    expect(true).to.equal(price.isPrice2Focused());
    deal.moveByTab(3);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C12079 Validate the seller client Trader movement by tab', () => {
    strategy.clickRdoStrategyFwdForward();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(14);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C12080 Validate the seller broker movement by tab', () => {
    strategy.clickRdoStrategyFwdForward();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(15);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });
});

describe('FWD FWD functionality: Forward Forward Rates field should not populate on weekends.', () => {
  it('C24192 Rates should be blank on weekends.', () => {
    strategy.clickRdoStrategyFwdForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_J);
    term.inputTerm2(instrument.TENOR_J1);

    // verify rate and point fields populate
    expect(price.getPrice()).to.not.equal('');
    expect(price.getPrice2()).to.not.equal('');
    expect(point.getPoints()).to.not.equal('');

    dealDate.inputValueDate(date.getNextNonBusinessDateFromToday().format(dateFormat));
    expect(popUpNav.getPopUpDescription()).to.equal('Date entered is a non-working day. Manually update the dates.');
    popUpNav.closePopUpMessage();

    expect(price.getPriceWithoutWait()).to.equal('');
    expect(price.getPrice2WithoutWait()).to.equal('');
  });
});

describe('FWD FWD functionality: Client/Trader, Desk/Broker, Agent cascader tests.', () => {
  it('C24195 Verify Buyer side agent field is reset on trader select', () => {
    strategy.clickRdoStrategyFwdForward();

    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    clientTrader.selectSellerTrader(users.CLIENT_B.Client, users.TRADER_B);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectBuyerAgent(users.AGENT_A);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(agent.getBuyerAgentLbl()).to.be.equal(users.AGENT_A);

    clientTrader.selectBuyerTrader(users.CLIENT_A.Client, users.TRADER_A);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(agent.isBuyerAgentEnabled()).to.be.equal(false);
  });
});

describe('FWD FWD functionality: CLS functionality tests.', () => {
  it('C27005 Verify toggle CLS setting on and off checks/unchecks CLS boxes', () => {
    strategy.clickRdoStrategyForward();
    settings.toggleClsDefaultsOff();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);

    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);

    settings.toggleClsDefaultsOn();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(true);

    settings.toggleClsDefaultsOff();
    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);
  });

  it('C27006 Verify CLS checkbox combination Matrix 1', () => {
    strategy.clickRdoStrategyForward();
    settings.toggleClsDefaultsOff();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);

    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);

    cls.selectCls1();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(true);

    cls.deSelectCls1();
    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(true);

    cls.deSelectCls2();
    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);
  });

  it('C27007 Verify CLS checkbox combination Matrix 2', () => {
    strategy.clickRdoStrategyForward();
    settings.toggleClsDefaultsOff();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);

    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);

    cls.selectCls2();
    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(true);

    cls.selectCls1();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(true);

    cls.deSelectCls2();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(false);

    cls.selectCls2();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(true);
  });

  it('C27008 Verify CLS checkbox combination Matrix 3', () => {
    strategy.clickRdoStrategyForward();
    settings.toggleClsDefaultsOff();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);

    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);

    cls.selectCls1();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(true);

    cls.deSelectCls2();
    expect(cls.isCls1Selected()).to.equal(true);
    expect(cls.isCls2Selected()).to.equal(false);

    cls.deSelectCls1();
    expect(cls.isCls1Selected()).to.equal(false);
    expect(cls.isCls2Selected()).to.equal(false);
  });
});
