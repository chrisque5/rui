/* eslint-disable no-undef */
const expect = require('chai').expect;
const moment = require('moment');
const DealModel = require('../../models/fwd/DealModel.js');
const LoginModel = require('../../models/LoginModel.js');
const PopUpNavigationModel = require('../../models/PopUpNavigationModel');
const SettingsModel = require('../../models/SettingsModel.js');
const BackDate = require('../../components/ndf/BackDate.js');

const StrategyModel = require('../../models/fwd/StrategyModel.js');
const VenueModel = require('../../models/fwd/VenueModel.js');
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
const venue = new VenueModel();
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
  login.login(users.USER_I.UserName, users.USER_I.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

describe('FWD functionality: Validation tests', () => {
  it('C11903 Confirm validation error displayed on Submit click with all fields empty on Forward', () => {
    strategy.clickRdoStrategyForward();
    deal.clickSubmitBtn();
    log.log(`Pop Up Message is : ${popUpNav.getPopUpDescription()}`);
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C11904 Confirm validation error on Submit click with "0" entered for Rate on Forward', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOff();
    deal.placeForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_J, '0', '0.1', '0', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    price.hoverPrice1();
    expect(point.getFieldValidationText('Rate should be larger than 0')).to.equal('Rate should be larger than 0');
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C11905 Confirm validation error on Submit click with "0" entered for Amount on Forward', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOff();
    deal.placeForwardOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_J, '5', '0', '5.5', '0');
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

describe('FWD functionality: Parameterized Amount input field tests', () => {
  it('C11906 Entering a range of values into Amount field on Forward', () => {
    strategy.clickRdoStrategyForward();
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
      ['1000000000   ', '1,000,000,000'],
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

  it('C11907 Entering a range of invalid values into Amount field on Forward', () => {
    strategy.clickRdoStrategyForward();
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

  it('C13029 Entering a range of invalid vales into Rates field on Forward', () => {
    strategy.clickRdoStrategyForward();
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

describe('FWD functionality: Amount, Rate and Points field tests', () => {
  it('C11624 Entering a decimal number in forward Amount 1 and verify value in Amount 2', () => {
    strategy.clickRdoStrategyForward();
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

  it('C11625 Entering a range of invalid numeric values into forward Amount field', () => {
    strategy.clickRdoStrategyForward();
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

  it('C31605 Entering a range of invalid numeric values into forward Amount field when Dealt CCY = CCY2', () => {
    strategy.clickRdoStrategyForward();
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

  it('C11626 Entering a range of invalid numeric values into forward Rate field', () => {
    strategy.clickRdoStrategyForward();
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

  it('C11627 Entering a range of invalid numeric values into forward Points field', () => {
    strategy.clickRdoStrategyForward();
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
describe('FWD functionality: Rate and Points Scaling Factor calculations', () => {
  it('C12065 Calculate Rate 2 by entering Rate 1 and Points', () => {
    strategy.clickRdoStrategyForward();
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

  it('C13031 Calculate Rate 2 by entering Rate 1 and Points and validate precision', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    price.inputPrice('1234.50');
    point.inputPoints('.25242629');
    const exPriceVal = price.calPrice2(1234.50, 0.25242629, instrument.ScalFactor_AT, 'FWD');
    expect(price.getPrice2()).to.equal(exPriceVal);
  }).timeout(30000);

  it('C12066 Calculate Points by entering Rate 1 and Rate 2', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1234.50');
    price.inputPrice2('1124.12345');
    // points = (rate 2 - rate 1) / scaling factor
    expect(point.getPoints()).to.equal('-1103765.5');
  }).timeout(30000);

  it('C13032 Calculate Points by entering Rate 1 and Rate 2 and validate precision', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    price.inputPrice('84.12076797');
    price.inputPrice2('85.12575758');
    const exPoint = point.calPoint(84.12076797, 85.12575758, instrument.ScalFactor_AT, 'FWD');
    expect(point.getPoints()).to.equal(exPoint.toString());
  }).timeout(30000);

  it('C13033 Validate Points value when rates feed is on', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    term.inputTerm(instrument.TENOR_B);
    log.log(price.getPrice());
    log.log(price.getPrice2());
    const exPoint = point.calPoint(parseFloat(price.getPrice()), parseFloat(price.getPrice2()), instrument.ScalFactor_AT, 'FWD');
    expect(point.getPoints()).to.equal(exPoint.toString());
    const exPrice1 = price.calPrice1(parseFloat(price.getPrice2()), point.getPoints(), instrument.ScalFactor_AT, 'FWD');
    expect(price.getPrice()).to.equal(exPrice1.toString());
    const exPrice2 = price.calPrice2(parseFloat(price.getPrice()), exPoint, instrument.ScalFactor_AT, 'FWD');
    expect(exPrice2.toString()).to.equal(price.getPrice2());
  }).timeout(30000);

  it('C12067 Calculate Rate 1 by entering Rate 2 and Points', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOff();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice2('84.123');
    point.inputPoints('22.321');
    // rate1 =  rate2 - points * scaling factor
    expect(price.getPrice()).to.equal('84.1207679');
  }).timeout(30000);

  it('C13034 Calculate Rate 1 by entering Rate 2 and Points and validate precision', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_T);
    price.inputPrice2('84.123');
    point.inputPoints('.25242629');
    const exPriceVal = price.calPrice1(84.123, 0.25242629, instrument.ScalFactor_AT, 'FWD');
    expect(price.getPrice()).to.equal(exPriceVal);
  }).timeout(30000);

  // changing a field
  it('C12068 Changing Rate 1 should recalculate Rate 2 from Rate 1 & Points', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1000.5');
    point.inputPoints('-5.25');
    expect(price.getPrice2()).to.equal('1000.499475');
    price.inputPrice('999.50');
    expect(price.getPrice2()).to.equal('999.499475');
  }).timeout(30000);

  it('C12069 Changing Rate 2 should recalculate Rate 1 from Rate 2 & Points', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1000.5');
    point.inputPoints('-5.25');
    expect(price.getPrice2()).to.equal('1000.499475');
    price.inputPrice2('994.25');
    expect(price.getPrice()).to.equal('994.250525');
  }).timeout(30000);

  it('C12070 Changing Points should recalculate Rate 2 from Rate 1 & Rate 2', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    price.inputPrice('1000.5');
    point.inputPoints('-5.25');
    expect(price.getPrice2()).to.equal('1000.499475');
    point.inputPoints('1.25');
    expect(price.getPrice2()).to.equal('1000.500125');
  }).timeout(30000);
});

describe('FWD functionality: Verify Rate 1, Rate 2 and Points fields should populate on currency and term selection', () => {
  it('C13035 Select term and tab out of rate fields, verify rates/points not recalculated.', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_J);
    price.waitForPrice1(5000);

    let rate1 = price.getPrice();
    let rate2 = price.getPrice2();
    let points = point.getPoints();

    expect(rate1).to.not.equal('');
    expect(rate2).to.not.equal('');
    expect(points).to.not.equal('');

    expect(price.isPrice1Focused()).to.equal(true);

    deal.pressTab();
    expect(rate1).to.equal(price.getPrice());
    expect(rate2).to.equal(price.getPrice2());
    expect(points).to.equal(point.getPoints());

    deal.clickResetBtn();
    term.inputPartialTermByKeys(instrument.TENOR_J);
    amount.clickAmount();
    expect(term.getTerm()).to.equal(instrument.TENOR_J);
    price.waitForPrice1(5000);

    rate1 = price.getPrice();
    rate2 = price.getPrice2();
    points = point.getPoints();

    expect(rate1).to.not.equal('');
    expect(rate2).to.not.equal('');
    expect(points).to.not.equal('');

    price.clickPrice2();
    expect(price.isPrice2Focused()).to.equal(true);
    deal.pressTab();
    expect(rate1).to.equal(price.getPrice());
    expect(rate2).to.equal(price.getPrice2());
    expect(points).to.equal(point.getPoints());
  });
});

describe('FWD functionality: Dates, term, daycount and backdate tests', () => {
  (Constants.ENV === 'QA' ? it.skip : it)('C11958 The Term list should display TN, ON, and SN options in the drop down for forward.', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOn();
    venue.selectExecutionVenue(instrument.VENUE_J);
    const expTerm = ['TN', 'ON', 'SN'];
    expect(true).to.equal(term.termsAvalInTerm1(expTerm));
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_S);

    // ON Date Validation
    term.inputTerm(instrument.TENOR_S);
    log.log(price.getPrice());
    let exNearLegDate = moment().format(dateFormat);
    let exFarLegDate = date.addBusinessDaysFromGivenDay(moment(), '1', instrument.CURRENCY_S, instrument.CURRENCY_A).format(dateFormat);
    expect(term.getTerm()).to.equal(instrument.TENOR_S);
    expect(venue.getExecutionVenue()).to.equal(instrument.VENUE_B);
    expect(dealDate.getValueDate()).to.equal(exNearLegDate);
    expect(dealDate.getValueDate2()).to.equal(exFarLegDate);
    deal.clickResetBtn();

    // TN Date Validation
    venue.selectExecutionVenue(instrument.VENUE_J);
    term.inputTerm(instrument.TENOR_T);
    log.log(price.getPrice());
    log.log(price.getPrice2());
    exNearLegDate = date.addBusinessDaysFromGivenDay(moment(), '1', instrument.CURRENCY_S, instrument.CURRENCY_A);
    exFarLegDate = date.addBusinessDaysFromGivenDay(exNearLegDate.clone(), '1', instrument.CURRENCY_S, instrument.CURRENCY_A).format(dateFormat);
    expect(term.getTerm()).to.equal(instrument.TENOR_T);
    expect(venue.getExecutionVenue()).to.equal(instrument.VENUE_B);
    expect(dealDate.getValueDate()).to.equal(exNearLegDate.format(dateFormat));
    expect(dealDate.getValueDate2()).to.equal(exFarLegDate);
    deal.clickResetBtn();

    // SN Date Validation
    venue.selectExecutionVenue(instrument.VENUE_J);
    term.inputTerm(instrument.TENOR_U);
    log.log(price.getPrice());
    log.log(price.getPrice2());
    exNearLegDate = date.getTradeDate(instrument.CURRENCY_A, instrument.CURRENCY_S);
    exFarLegDate = date.addBusinessDaysFromGivenDay(exNearLegDate.clone(), '1', instrument.CURRENCY_S, instrument.CURRENCY_A).format(dateFormat);
    expect(term.getTerm()).to.equal(instrument.TENOR_U);
    expect(venue.getExecutionVenue()).to.equal(instrument.VENUE_J);
    expect(dealDate.getValueDate()).to.equal(exNearLegDate.format(dateFormat));
    expect(dealDate.getValueDate2()).to.equal(exFarLegDate);
  });

  it('C11959 The Term list should not display TOM and TOD options in the drop down for forward.', () => {
    strategy.clickRdoStrategyForward();
    const expTerm = ['TOM', 'TOD'];
    expect(true).to.equal(term.termsNotAvalInTerm1(expTerm));
  });

  it('C12028 compare value date for FWD and FWD FWD.', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_B);
    log.log(price.getPrice());
    const fwdValueDate = dealDate.getValueDate2();
    const fwdDayCount = dealDate.getDayCount2();

    // Move to FWD FWD
    strategy.clickRdoStrategyFwdForward();
    expect(login.verifyFWDselected()).to.equal(true);
    expect(clientTrader.isPageLoadComplete()).to.be.equal(true);
    term.inputTerm(instrument.TENOR_A1);
    term.inputTerm2(instrument.TENOR_B);
    log.log(price.getPrice());
    log.log(price.getPrice2());
    expect(fwdValueDate).to.equal(dealDate.getValueDate2());
    expect(fwdDayCount).to.equal(dealDate.getDayCount2());
  });

  it('C24186 Daycount should not reset to zero on selecting weekend value date.', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOff();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_B);
    price.inputPrice('1.234');
    price.inputPrice2('1.235');

    // verify rate and point fields populate
    expect(price.getPrice()).to.not.equal('');
    expect(price.getPrice2()).to.not.equal('');
    expect(point.getPoints()).to.not.equal('');

    const valueDate1 = dealDate.getValueDate();
    const valueDate2 = dealDate.getValueDate2();

    const newValueDate1 = date.getNextNonBusinessDateFromDate(valueDate1, dateFormat).format(dateFormat);
    const newValueDate2 = date.getNextNonBusinessDateFromDate(valueDate2, dateFormat).format(dateFormat);
    dealDate.inputValueDate(newValueDate1);
    expect(popUpNav.getPopUpDescription()).to.equal('Date entered is a non-working day. Manually update the dates.');
    popUpNav.closePopUpMessage();
    dealDate.inputValueDate2(newValueDate2);
    expect(popUpNav.getPopUpDescription()).to.equal('Date entered is a non-working day. Manually update the dates.');
    popUpNav.closePopUpMessage();

    expect(dealDate.getDayCount()).to.not.equal('');
    expect(dealDate.getDayCount2()).to.not.equal('');
  });

  it('C24187 Verify Rate field is reset after changing currency with back dated trade checked', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOff();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_B);
    price.inputPrice('1.234');
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

  it('C24188 Verify Backdate date and time fields disabled on when form reset', () => {
    strategy.clickRdoStrategyForward();

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

  it('C24227 Dates before today should be greyed out in date picker', () => {
    strategy.clickRdoStrategyForward();

    dealDate.clickValueDate1();
    const yesterday = date.subtractDateFromToday(1).format('YYYY-MM-DD');
    expect(dealDate.isDateDisabled(yesterday)).to.equal(true);
    dealDate.clickNumDayCount1();

    dealDate.clickValueDate2();
    expect(dealDate.isDateDisabled(yesterday)).to.equal(true);
  });
});

describe('FWD functionality: Move to different fields for Forward by using keyboard', () => {
  it('C12071 Validate the buyer client Trader movement by tab', () => {
    const page = currency.isPageReset();
    expect(true).to.equal(page);
    // Adding one more currency selection, so persist value will not impact the tab movement.
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_R);
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_S);
    expect(true).to.equal(currency.isDealtCCYFocused());
    deal.clickResetBtn();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(12);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C12072 Validate the buyer broker movement by tab', () => {
    expect(true).to.equal(currency.isPageReset());
    term.inputTerm(instrument.TENOR_C);
    expect(true).to.equal(price.isPrice1Focused());
    deal.moveByTab(9);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C12073 Validate the seller client Trader movement by tab', () => {
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(16);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C12074 Validate the seller broker movement by tab', () => {
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(16);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });
});
/*
describe('FWD functionality: Verify currencies in dropdown are in alphabetical order', () => {
  it('C13323 Verify alphabetical order for FWD currencies', () => {
    strategy.clickRdoStrategyForward();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    expect(currency.verifyCurrencyListOrder(currency.getCurrencyListItems())).to.equal(true);
  }).timeout(30000);
});
*/
describe('FWD functionality: Validate behaviour of LHS/RHS switch', () => {
  it('C14582 Validate LHS/RHS functionality for Forwards', () => {
    strategy.clickRdoStrategyForward();
    settings.toggleLRModeOff();
    clientTrader.selectBuyerTrader(users.CLIENT_I.Client, users.TRADER_I);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);

    expect(clientTrader.verifyBuyerCounterPartySide('B')).to.be.equal(true);
    expect(clientTrader.verifySellerCounterPartySide('S')).to.be.equal(true);

    settings.toggleLRModeOn();

    expect(clientTrader.verifyBuyerCounterPartySide('R')).to.be.equal(true);
    expect(clientTrader.verifySellerCounterPartySide('L')).to.be.equal(true);

    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal('');
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} ${users.CLIENT_I.Location} / ${users.TRADER_I}`);
    expect(broker.getSellerBrokerName()).to.be.equal('');
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);

    settings.toggleLRModeOff();
    expect(clientTrader.verifyBuyerCounterPartySide('B')).to.be.equal(true);
    expect(clientTrader.verifySellerCounterPartySide('S')).to.be.equal(true);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} ${users.CLIENT_I.Location} / ${users.TRADER_I}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal('');
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal('');

    clientTrader.selectBuyerTrader(users.CLIENT_I.Client, users.TRADER_I);

    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    clientTrader.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    broker.selectSellerBrokerName(users.DESK_B, users.BROKER_B);

    expect(clientTrader.verifyBuyerCounterPartySide('B')).to.be.equal(true);
    expect(clientTrader.verifySellerCounterPartySide('S')).to.be.equal(true);

    settings.toggleLRModeOn();

    expect(clientTrader.verifyBuyerCounterPartySide('R')).to.be.equal(true);
    expect(clientTrader.verifySellerCounterPartySide('L')).to.be.equal(true);

    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} ${users.CLIENT_I.Location} / ${users.TRADER_I}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);

    settings.toggleLRModeOff();
    expect(clientTrader.verifyBuyerCounterPartySide('B')).to.be.equal(true);
    expect(clientTrader.verifySellerCounterPartySide('S')).to.be.equal(true);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_I.Client} ${users.CLIENT_I.Location} / ${users.TRADER_I}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_B} / ${users.BROKER_B}`);
  }).timeout(60000);
});

describe('FWD functionality: Forward Rates should not populate on weekends.', () => {
  it('C24185 Rates should be blank on weekends.', () => {
    strategy.clickRdoStrategyForward();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_J);

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

describe('FWD functionality: Client/Trader, Desk/Broker, Agent cascader tests.', () => {
  it('C24189 Verify Seller side agent field is reset on trader select', () => {
    strategy.clickRdoStrategyForward();

    clientTrader.selectBuyerTrader(users.CLIENT_B.Client, users.TRADER_B);
    clientTrader.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_NULL.Name);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    agent.selectSellerAgent(users.AGENT_A);

    expect(clientTrader.getBuyerClientTraderLbl()).to.be.equal(`${users.CLIENT_B.Client} ${users.CLIENT_B.Location} / ${users.TRADER_B}`);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} / ${users.TRADER_NULL.DisplayName}`);
    expect(broker.getBuyerBrokerName()).to.be.equal(`${users.DESK_A} / ${users.BROKER_A}`);
    expect(broker.getSellerBrokerName()).to.be.equal(`${users.DESK_F} / ${users.BROKER_L}`);
    expect(agent.getSellerAgentLbl()).to.be.equal(users.AGENT_A);

    clientTrader.selectSellerTrader(users.CLIENT_A.Client, users.TRADER_A);
    expect(clientTrader.getSellerClientTraderLbl()).to.be.equal(`${users.CLIENT_A.Client} ${users.CLIENT_A.Location} / ${users.TRADER_A}`);
    expect(agent.isBuyerAgentEnabled()).to.be.equal(false);
  });
});

describe('FWD functionality: CLS functionality tests.', () => {
  it('C27001 Verify toggle CLS setting on and off checks/unchecks CLS boxes', () => {
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

  it('C27002 Verify CLS checkbox combination Matrix 1', () => {
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

  it('C27003 Verify CLS checkbox combination Matrix 2', () => {
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

  it('C27004 Verify CLS checkbox combination Matrix 3', () => {
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
