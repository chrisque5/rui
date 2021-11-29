/* eslint-disable no-undef */
const expect = require('chai').expect;
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
  login.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = deal.getDateFormat();
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});

beforeEach(() => {
  moveToFWD();
  log.log(`Logged in user is : ${login.getDdlUserDropdownText()}`);
});

describe('FWD OUT functionality: Validation tests', () => {
  it('C11899 Confirm validation error displayed on Submit click with all fields empty on Fwd outright', () => {
    strategy.clickRdoStrategyOutright();
    deal.clickSubmitBtn();
    log.log(`Pop Up Message is : ${popUpNav.getPopUpDescription()}`);
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C11900 Confirm validation error on Submit click with "0" entered for Rate on Fwd outright', () => {
    strategy.clickRdoStrategyOutright();
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_J, '0', '0.1');
    clientTrader.selectBuyerTrader(users.CLIENT_C.Client, users.TRADER_C);
    clientTrader.selectSellerTrader(users.CLIENT_E.Client, users.TRADER_E);
    broker.selectBuyerBrokerName(users.DESK_A, users.BROKER_A);
    broker.selectSellerBrokerName(users.DESK_F, users.BROKER_L);
    price.hoverPrice1();
    expect(point.getFieldValidationText('Rate should be larger than 0')).to.equal('Rate should be larger than 0');
    deal.clickSubmitBtn();
    expect(popUpNav.getPopUpDescription()).to.include('Please review validation errors');
  }).timeout(30000);

  it('C11901 Confirm validation error on Submit click with "0" entered for Amount on Fwd outright', () => {
    strategy.clickRdoStrategyOutright();
    settings.ratesFeedOff();
    deal.placeOutrightOrder(instrument.CURRENCY_A, instrument.CURRENCY_R, '', instrument.TENOR_J, '5', '0');
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

describe('FWD OUT functionality: Parameterized Amount input field tests', () => {
  it('C11957 Entering a range of values into Amount field on Fwd outright', () => {
    strategy.clickRdoStrategyOutright();
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
    ].forEach(([amountValue1, amountValue2]) => {
      amount.inputAmount(amountValue1);
      if (amountValue1 === '1B' || amountValue1 === '1M') {
        if (amountValue1 === '1B') {
          expect(amount.getAmount()).to.equal('1,000,000,000');
        } else {
          expect(amount.getAmount()).to.equal('1,000,000');
        }
      } else {
        expect(amount.getAmount()).to.equal(amountValue2);
      }
    });
  }).timeout(30000);

  it('C11902 Entering a range of invalid values into Amount field on Fwd outright', () => {
    strategy.clickRdoStrategyOutright();
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
    });
  }).timeout(30000);
});

describe('FWD OUT functionality: Amount and Rate field dp tests', () => {
  it('C11622 Entering a range of invalid numeric values into fwd outright Amount field', () => {
    strategy.clickRdoStrategyOutright();
    [
      ['123,456,789,123', 'BEFORE_DP'],
      ['1234567.1234', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      amount.inputAmount(amountValue);
      if (dp === 'BEFORE_DP') {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPBEFORE)).to.equal(Constants.MAXDPBEFORE);
      } else {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
      }

      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });

  it('C31601 Entering a range of invalid numeric values into fwd outright Amount field when Dealt CCY = CCY2', () => {
    strategy.clickRdoStrategyOutright();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    currency.selectDealtCurrency(instrument.CURRENCY_R);
    [
      ['123,456,789,1234', 'BEFORE_DP'],
      ['1234567.1234', 'AFTER_DP'],
    ].forEach(([amountValue, dp]) => {
      amount.inputAmount(amountValue);
      if (dp === 'BEFORE_DP') {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPBEFORECCY2)).to.equal(Constants.MAXDPBEFORECCY2);
      } else {
        amount.hoverAmount1();
        expect(point.getFieldValidationText(Constants.MAXDPAFTER)).to.equal(Constants.MAXDPAFTER);
      }

      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });

  it('C11623 Entering a range of invalid numeric values into fwd outright Rate field', () => {
    strategy.clickRdoStrategyOutright();
    [
      ['123,456', 'BEFORE_DP'],
      ['12345.123456789', 'AFTER_DP'],
    ].forEach(([priceValue, dp]) => {
      price.inputPrice(priceValue);
      if (dp === 'BEFORE_DP') {
        price.hoverPrice1();
        expect(point.getFieldValidationText(Constants.MAXDPRATEBEFORE)).to.equal(Constants.MAXDPRATEBEFORE);
      } else {
        price.hoverPrice1();
        expect(point.getFieldValidationText(Constants.MAXDPFWDRATEAFTER)).to.equal(Constants.MAXDPFWDRATEAFTER);
      }
      // Move out the focus from the field.
      deal.clickResetBtn();
    });
  });
});

describe('FWD OUT functionality: Dates, term, daycount and backdate tests', () => {
  it('C11961 The Term list should not display TN, ON, SN, TOM and TOD options in the drop down for forward outright.', () => {
    strategy.clickRdoStrategyOutright();
    const expTerm = ['TN', 'ON', 'SN', 'TOM', 'TOD'];
    expect(true).to.equal(term.termsNotAvalInTerm1(expTerm));
  });

  it('C13050 Verify user can edit the value date after call to date calc service.', () => {
    strategy.clickRdoStrategyOutright();

    let termValue = term.getTerm();
    let dayCount = dealDate.getDayCount();
    const valueDate = dealDate.getValueDate();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);

    term.inputTerm(instrument.TENOR_B);
    expect(term.getTerm()).to.not.equal(termValue);
    expect(true).to.be.equal(dealDate.isDayCountUpdated(dayCount));
    expect(dealDate.getValueDate()).to.not.equal(valueDate);

    termValue = term.getTerm();
    dayCount = dealDate.getDayCount();

    dealDate.inputValueDate(date.getBusinessDateFromToday(10).format(dateFormat));
    expect(term.getTerm()).to.not.equal(termValue);
    expect(true).to.be.equal(dealDate.isDayCountUpdated(dayCount));
    expect(dealDate.getValueDate()).to.equal(date.getBusinessDateFromToday(10).format(dateFormat));
  });

  it('C24197 Verify Rate field is reset after changing currency with back dated trade checked', () => {
    strategy.clickRdoStrategyOutright();
    settings.ratesFeedOff();

    expect(backDate.isBackDateSelected()).to.equal(false);
    expect(backDate.isBackDateTimeActive()).to.equal(false);

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectDealtCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_B);
    price.inputPrice('1.234');

    backDate.selectBackDate();

    expect(backDate.isBackDateSelected()).to.equal(true);
    expect(backDate.isBackDateTimeActive()).to.equal(true);
    expect(price.getPrice()).to.equal('1.234');

    currency.selectCurrency(instrument.CURRENCY_S);
    expect(price.getPrice()).to.equal('');
  });

  it('C24198 Verify Backdate date and time fields disabled on when form reset', () => {
    strategy.clickRdoStrategyOutright();

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
});

describe('FWD OUT functionality: Move to different FWD Outright fields by using keyboard', () => {
  it('C13051 Validate the buyer client Trader movement by tab', () => {
    strategy.clickRdoStrategyOutright();
    expect(true).to.equal(currency.isPageReset());
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    // Adding one more currency selection, so persist value will not impact the tab movement.
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_R);
    currency.selectCurrencyWithoutVerification(instrument.CURRENCY_S);
    expect(true).to.equal(currency.isDealtCCYFocused());
    deal.clickResetBtn();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(7);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C13052 Validate the buyer broker movement by tab', () => {
    strategy.clickRdoStrategyOutright();
    expect(true).to.equal(currency.isPageReset());
    term.inputTerm(instrument.TENOR_C);
    expect(true).to.equal(price.isPrice1Focused());
    deal.moveByTab(4);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C13053 Validate the seller client Trader movement by tab', () => {
    strategy.clickRdoStrategyOutright();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(9);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });

  it('C13054 Validate the seller broker movement by tab', () => {
    strategy.clickRdoStrategyOutright();
    expect(true).to.equal(currency.isPageReset());
    deal.moveByTab(10);
    deal.pressEnter();
    expect(true).to.equal(clientTrader.isCasCadOpen());
    deal.moveByTab(1);
    expect(true).to.equal(clientTrader.isCasCadClose());
  });
});

describe('FWD OUT functionality: Forward Outright Rates not populate on weekends.', () => {
  it('C24196 Rates should be blank on weekends.', () => {
    strategy.clickRdoStrategyOutright();
    settings.ratesFeedOn();
    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_R);
    term.inputTerm(instrument.TENOR_J);

    // verify rate and point fields populate
    expect(price.getPrice()).to.not.equal('');

    dealDate.inputValueDate(date.getNextNonBusinessDateFromToday().format(dateFormat));
    expect(popUpNav.getPopUpDescription()).to.equal('Date entered is a non-working day. Manually update the dates.');
    popUpNav.closePopUpMessage();

    expect(price.getPriceWithoutWait()).to.equal('');
  });
});

describe('FWD OUT functionality: CLS Functionality.', () => {
  it('C27023 Verify toggle CLS setting on and off checks/unchecks CLS boxes', () => {
    strategy.clickRdoStrategyOutright();
    settings.toggleClsDefaultsOff();

    currency.selectBaseCurrency(instrument.CURRENCY_A);
    currency.selectCurrency(instrument.CURRENCY_Q);

    expect(cls.isCls1Selected()).to.equal(false);

    settings.toggleClsDefaultsOn();
    expect(cls.isCls1Selected()).to.equal(true);

    settings.toggleClsDefaultsOff();
    expect(cls.isCls1Selected()).to.equal(false);
  });
});
