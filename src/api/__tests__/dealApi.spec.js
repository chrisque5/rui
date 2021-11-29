import moment from 'moment';
import { api } from '../../utils/constants';
import dealApi from '../dealApi';
import restApi from '../restApi';
import { mapFormToFwdChain, mapFormToNdfChain, mapFormToSptChain } from '../../utils/dealSubmit/index';
import * as notifications from '../../utils/notifications';

const mockReturn = { data: [{ id: 1, name: 'Mock Data 1' }, { id: 2, name: 'Mock Data 2' }] };

const setup = (date) => {
  const dateToUse = new Date(date);
  global.Date = jest.fn(() => dateToUse);
};

const showErrorNotificationSpy = jest.spyOn(notifications, 'showErrorNotification');
const showWarningNotificationSpy = jest.spyOn(notifications, 'showWarningNotification');
const showSuccessNotificationSpy = jest.spyOn(notifications, 'showSuccessNotification');

afterEach(() => {
  showErrorNotificationSpy.mockClear();
  showWarningNotificationSpy.mockClear();
  showSuccessNotificationSpy.mockClear();
});

const defaultNdfFormValues = {
  amount1: '1,000,000',
  buyerBroker: [2039, 13660],
  buyerClientTrader: [109056, '68385,109059'],
  currency1: 'USD',
  currency2: 'CNY',
  cls1: false,
  dayCount1: 7,
  dealtCurrency: 'USD',
  dealType: 'NDF',
  executionVenue: 'IMM',
  fixingDate1: '2019-10-16',
  forwardStart: { near: false, far: '2019-10-16' },
  instrumentId: 9603,
  isTradeDateEnabled: false,
  points: 0.57,
  publishDate1: '2019-10-16',
  rate1: 1.2,
  sellerBroker: [2039, 13660],
  sellerClientTrader: [105844, '66088,143863'],
  spotDate: '15/04/2020',
  term1: '1M',
  tradeDate: null,
  tradeTime: null,
  valueDate1: '2019-10-16',
  volumeMatch: false,
};

const defaultNdfCurrencyPair = {
  baseCurrency: 'USD',
  counterCurrency: 'CNY',
  instrumentId: 4302,
  baseCurrencyDayCountYear: '360',
  counterCurrencyDayCountYear: '360',
  primaryExerciseCurrencies: 'CNY',
  secondaryExerciseCurrencies: '',
  primaryDeliveryCurrencies: 'CNY',
  secondaryDeliveryCurrencies: 'USD',
};

const defaultFwdFormValues = {
  amount1: '1,000,000',
  buyerBroker: [2039, 13660],
  buyerClientTrader: [105844, '66088,143863'],
  currency1: 'GBP',
  currency2: 'USD',
  cls1: false,
  cls2: false,
  dayCount1: 0,
  dealtCurrency: 'GBP',
  dealType: 'FWD',
  instrumentId: 10300,
  isTradeDateEnabled: false,
  points: '0.94000000',
  rate1: '1.25050000',
  scalingFactor: 0.0001,
  sellerBroker: [2039, 13660],
  sellerClientTrader: [109056, '68385,109059'],
  spotDate: '15/04/2020',
  term1: '1W',
  tradeDate: null,
  tradeDuration: { near: 7, far: 14 },
  tradeTime: null,
  turnTrade: false,
  valueDate1: moment('2020-04-15', 'YYYY-MM-DD'),
  volumeMatch: false,
  executionVenue: 'XOFF',
};

const defaultFwdCurrencyPair = {
  baseCurrency: 'GBP',
  counterCurrency: 'USD',
  instrumentId: 4315,
  baseCurrencyDayCountYear: '365',
  counterCurrencyDayCountYear: '365',
  scalingFactor: 0.0001,
  primaryExerciseCurrencies: '',
  secondaryExerciseCurrencies: '',
  primaryDeliveryCurrencies: 'GBP',
  secondaryDeliveryCurrencies: 'USD',
};

const defaultSptFormValues = {
  strategy: 'Spot',
  isTradeDateEnabled: false,
  tradeDate: null,
  tradeTime: null,
  volumeMatch: false,
  executionVenue: 'XOFF',
  currency1: 'GBP',
  currency2: 'USD',
  dealtCurrency: 'GBP',
  rate1: '1.35',
  amount1: '1,000,000',
  valueDate1: moment('2020-09-10', 'YYYY-MM-DD'),
  dayCount1: 2,
  cls1: false,
  buyerClientTrader: [164920, '43635,164920'],
  buyerBroker: [2039, 13661],
  buyerAgent: null,
  sellerClientTrader: [164923, '43638,164923'],
  sellerBroker: [8132, 49340],
  sellerAgent: null,
  instrumentId: 4354,
  dealType: 'SPT',
  spotDate: moment('2020-09-10', 'YYYY-MM-DD'),
  durationSpotToEnd: 0,
  displayTenor: '0D',
};

const defaultSptCurrencyPair = {
  baseCurrency: 'GBP',
  counterCurrency: 'USD',
  instrumentId: 4354,
  baseCurrencyDayCountYear: '360',
  counterCurrencyDayCountYear: '360',
  scalingFactor: 0.0001,
  primaryExerciseCurrencies: 'USD',
  secondaryExerciseCurrencies: 'GBP',
  primaryDeliveryCurrencies: 'USD',
  secondaryDeliveryCurrencies: 'GBP',
};

describe('dealApi.createDeal creates an NDF Outright deal', () => {
  setup('16 October 2019 15:49:11 UTC');

  const expected = {
    dealType: 'NDF',
    instrumentId: 9603,
    isBackDated: false,
    strategy: 'outright',
    tradeTime: '2019-10-16T15:49:11.000Z',
    volumeMatch: false,
    deals: [{
      dealGroupId: 1,
      forwardStart: false,
      points: 0.57,
      trades: [{
        CLS: false,
        dayCount: 7,
        displayTenor: '1M',
        durationMultiplier: '1',
        durationPeriod: 'M',
        fixingDate: '2019-10-16',
        notionalAmount: 1000000,
        price: 1.2,
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'USD',
          currency2: 'CNY',
          dealtCurrency: 'USD',
          settlementCurrency: 'USD',
          executionVenue: 'IMM',
          primaryDeliveryCurrencies: 'CNY',
          primaryExerciseCurrencies: 'CNY',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 109059,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 143863,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
        },
      }],
    }],
  };

  test('with the correct mapped properties when override trade date true and volume match true', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({
      ...defaultNdfFormValues, currencyPair: defaultNdfCurrencyPair, strategy: 'Outright', isTradeDateEnabled: true, volumeMatch: true,
    });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected, isBackDated: true, volumeMatch: true });
  });

  test('with the correct mapped properties when override trade date false', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({
      ...defaultNdfFormValues, currencyPair: defaultNdfCurrencyPair, strategy: 'Outright',
    });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected });
  });
});

describe('dealApi.createDeal creates an NDF Spread deal ', () => {
  setup('16 October 2019 15:49:11 UTC');

  const formValues = {
    ...defaultNdfFormValues,
    currencyPair: defaultNdfCurrencyPair,
    strategy: 'Spread',
    isTradeDateEnabled: false,
    volumeMatch: false,
    term2: '1W',
    rate2: 77.03,
    amount2: '1,000,000',
    fixingDate2: moment('2020-05-14', 'YYYY-MM-DD'),
    valueDate2: moment('2020-05-18', 'YYYY-MM-DD'),
    publishDate2: moment('2020-05-14', 'YYYY-MM-DD'),
    dayCount2: 32,
    cp2BuyerClientTrader: [105844, '66088,143863'],
    cp2BuyerBroker: [2039, 13660],
    cp2SellerClientTrader: [164927, '43640,164927'],
    cp2SellerBroker: [2044, 57810],
  };

  const expected = {
    dealType: 'NDF',
    instrumentId: 9603,
    isBackDated: false,
    strategy: 'spread',
    tradeTime: '2019-10-16T15:49:11.000Z',
    volumeMatch: false,
    deals: [{
      dealGroupId: 1,
      forwardStart: false,
      points: 0.57,
      trades: [{
        CLS: false,
        dayCount: 7,
        displayTenor: '1M',
        durationMultiplier: '1',
        durationPeriod: 'M',
        fixingDate: '2019-10-16',
        notionalAmount: 1000000,
        price: 1.2,
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'USD',
          currency2: 'CNY',
          dealtCurrency: 'USD',
          settlementCurrency: 'USD',
          executionVenue: 'IMM',
          primaryDeliveryCurrencies: 'CNY',
          primaryExerciseCurrencies: 'CNY',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: undefined,
            executingCustomerGcdId: 109059,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: undefined,
            executingCustomerGcdId: 143863,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },

        },

      }],
    }, {
      dealGroupId: 2,
      forwardStart: '2019-10-16',
      points: 0.57,
      trades: [{
        CLS: undefined,
        dayCount: 32,
        displayTenor: '1W',
        durationMultiplier: '1',
        durationPeriod: 'W',
        fixingDate: '2019-10-16',
        notionalAmount: 1000000,
        price: 77.03,
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'USD',
          currency2: 'CNY',
          dealtCurrency: 'USD',
          settlementCurrency: 'USD',
          executionVenue: 'IMM',
          primaryDeliveryCurrencies: 'CNY',
          primaryExerciseCurrencies: 'CNY',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: undefined,
            executingCustomerGcdId: 143863,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 57810,
            brokerageStrategy: undefined,
            executingCustomerGcdId: 164927,
            traderGcdPostingId: 43640,
            tradingCustomerGcdId: 164927,
          },
        },
      }],
    }],
  };

  test('with the correct mapped properties when override trade date true and volume match true', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues, isTradeDateEnabled: true, volumeMatch: true });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected, isBackDated: true, volumeMatch: true });
  });

  test('with the correct mapped properties when override trade date false', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected });
  });
});

describe('dealApi.createDeal creates a FWD Forward deal', () => {
  setup('16 October 2019 15:49:11 UTC');

  const formValues = {
    ...defaultFwdFormValues,
    currencyPair: defaultFwdCurrencyPair,
    strategy: 'Forward',
    rate2: '1.25072000',
    amount2: '11,000,000',
    valueDate2: moment('2020-04-22', 'YYYY-MM-DD'),
    dayCount2: 7,
    term2: '2W',
    tradeDuration: {
      near: 0,
      far: 7,
    },
  };

  const expected = {
    dealType: 'FWD',
    instrumentId: 10300,
    isBackDated: false,
    strategy: 'forward',
    tradeTime: '2019-10-16T15:49:11.000Z',
    volumeMatch: false,
    deals: [{
      isTurnTrade: false,
      points: '0.94000000',
      scalingFactor: 0.0001,
      trades: [{
        CLS: false,
        dayCount: 0,
        displayTenor: '0D',
        durationMultiplier: '0',
        durationPeriod: 'D',
        durationSpotToEnd: 0,
        notionalAmount: 1000000,
        price: '1.25050000',
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'GBP',
          currency2: 'USD',
          dealtCurrency: 'GBP',
          settlementCurrency: 'GBP',
          executionVenue: 'XOFF',
          primaryDeliveryCurrencies: 'GBP',
          primaryExerciseCurrencies: '',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 143863,
            nettBrokerageCharge: false,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 109059,
            nettBrokerageCharge: false,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
        },
      }, {
        CLS: false,
        dayCount: 7,
        displayTenor: '1W',
        durationMultiplier: '1',
        durationPeriod: 'W',
        durationSpotToEnd: 7,
        notionalAmount: 11000000,
        price: '1.25072000',
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'GBP',
          currency2: 'USD',
          dealtCurrency: 'GBP',
          settlementCurrency: 'GBP',
          executionVenue: 'XOFF',
          primaryDeliveryCurrencies: 'GBP',
          primaryExerciseCurrencies: '',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 109059,
            nettBrokerageCharge: false,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 143863,
            nettBrokerageCharge: false,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
        },
      }],
    }],
  };

  test('with the correct mapped properties when override trade date true and volume match true', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues, isTradeDateEnabled: true, volumeMatch: true });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected, isBackDated: true, volumeMatch: true });
  });

  test('with the correct mapped properties when override trade date false', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected });
  });
});

describe('dealApi.createDeal creates a FWD Forward Forward deal', () => {
  setup('16 October 2019 15:49:11 UTC');

  const formValues = {
    ...defaultFwdFormValues,
    currencyPair: defaultFwdCurrencyPair,
    strategy: 'Forward Forward',
    rate2: 1.250594,
    amount2: '1,000,000',
    valueDate2: moment('2020-04-29', 'YYYY-MM-DD'),
    dayCount2: 14,
    term2: '2W',
  };

  const expected = {
    dealType: 'FWD',
    instrumentId: 10300,
    isBackDated: false,
    strategy: 'forward',
    tradeTime: '2019-10-16T15:49:11.000Z',
    volumeMatch: false,
    deals: [{
      isTurnTrade: false,
      points: '0.94000000',
      scalingFactor: 0.0001,
      trades: [{
        CLS: false,
        dayCount: 0,
        displayTenor: '1W',
        durationMultiplier: '1',
        durationPeriod: 'W',
        durationSpotToEnd: 7,
        notionalAmount: 1000000,
        price: '1.25050000',
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'GBP',
          currency2: 'USD',
          dealtCurrency: 'GBP',
          settlementCurrency: 'GBP',
          executionVenue: 'XOFF',
          primaryDeliveryCurrencies: 'GBP',
          primaryExerciseCurrencies: '',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 143863,
            nettBrokerageCharge: false,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 109059,
            nettBrokerageCharge: false,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
        },
      },
      {
        CLS: false,
        dayCount: 14,
        displayTenor: '2W',
        durationMultiplier: '2',
        durationPeriod: 'W',
        durationSpotToEnd: 14,
        notionalAmount: 1000000,
        price: 1.250594,
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'GBP',
          currency2: 'USD',
          dealtCurrency: 'GBP',
          settlementCurrency: 'GBP',
          executionVenue: 'XOFF',
          primaryDeliveryCurrencies: 'GBP',
          primaryExerciseCurrencies: '',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 109059,
            nettBrokerageCharge: false,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 143863,
            nettBrokerageCharge: false,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
        },
      }],
    }],
  };

  test('with the correct mapped properties when override trade date true and volume match true', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues, isTradeDateEnabled: true, volumeMatch: true });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected, isBackDated: true, volumeMatch: true });
  });

  test('with the correct mapped properties when override trade date false', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected });
  });
});

describe('dealApi.createDeal creates a FWD Outright deal ', () => {
  setup('16 October 2019 15:49:11 UTC');

  const formValues = {
    ...defaultFwdFormValues, currencyPair: defaultFwdCurrencyPair, strategy: 'Outright', durationSpotToEnd: 7,
  };

  const expected = {
    dealType: 'FWD',
    instrumentId: 10300,
    isBackDated: false,
    tradeTime: '2019-10-16T15:49:11.000Z',
    volumeMatch: false,
    strategy: 'outright',
    deals: [{
      scalingFactor: 0.0001,
      isTurnTrade: false,
      points: '0.94000000',
      trades: [{
        CLS: false,
        dayCount: 0,
        displayTenor: '1W',
        durationMultiplier: '1',
        durationPeriod: 'W',
        durationSpotToEnd: 7,
        notionalAmount: 1000000,
        price: '1.25050000',
        publishDate: '2019-10-16',
        valueDate: '2019-10-16',
        spotDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'GBP',
          currency2: 'USD',
          dealtCurrency: 'GBP',
          settlementCurrency: 'GBP',
          executionVenue: 'XOFF',
          primaryDeliveryCurrencies: 'GBP',
          primaryExerciseCurrencies: '',
          secondaryDeliveryCurrencies: 'USD',
          secondaryExerciseCurrencies: '',
          payer: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 143863,
            nettBrokerageCharge: false,
            traderGcdPostingId: 66088,
            tradingCustomerGcdId: 105844,
          },
          receiver: {
            agentCustomerGcdId: null,
            brokerGcdPostingId: 13660,
            brokerageStrategy: null,
            executingCustomerGcdId: 109059,
            nettBrokerageCharge: false,
            traderGcdPostingId: 68385,
            tradingCustomerGcdId: 109056,
          },
        },
      }],
    }],
  };

  test('with the correct mapped properties when override trade date true and volume match true', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues, isTradeDateEnabled: true, volumeMatch: true });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected, isBackDated: true, volumeMatch: true });
  });

  test('with the correct mapped properties when override trade date false', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected });
  });
});

describe('dealApi.createDeal creates a SPT deal', () => {
  setup('16 October 2019 15:49:11 UTC');

  const formValues = {
    ...defaultSptFormValues,
    currencyPair: defaultSptCurrencyPair,
  };

  const expected = {
    strategy: 'spot',
    dealType: 'SPT',
    tradeTime: '2019-10-16T15:49:11.000Z',
    isBackDated: false,
    instrumentId: 4354,
    volumeMatch: false,
    deals: [{
      trades: [{
        CLS: false,
        dayCount: 2,
        notionalAmount: 1000000,
        durationMultiplier: '0',
        durationPeriod: 'D',
        durationSpotToEnd: 0,
        price: '1.35',
        publishDate: '2019-10-16',
        spotDate: '2019-10-16',
        valueDate: '2019-10-16',
        tradeEconomics: {
          currency1: 'GBP',
          currency2: 'USD',
          primaryExerciseCurrencies: 'USD',
          secondaryExerciseCurrencies: 'GBP',
          primaryDeliveryCurrencies: 'USD',
          secondaryDeliveryCurrencies: 'GBP',
          dealtCurrency: 'GBP',
          executionVenue: 'XOFF',
          settlementCurrency: 'GBP',
          payer: {
            tradingCustomerGcdId: 164920,
            brokerGcdPostingId: 13661,
            brokerageStrategy: null,
            traderGcdPostingId: 43635,
            executingCustomerGcdId: 164920,
            agentCustomerGcdId: null,
          },
          receiver: {
            tradingCustomerGcdId: 164923,
            brokerGcdPostingId: 49340,
            brokerageStrategy: null,
            traderGcdPostingId: 43638,
            executingCustomerGcdId: 164923,
            agentCustomerGcdId: null,
          },
        },
      }],
    }],
  };

  test('with the correct mapped properties when override trade date true and volume match true', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues, isTradeDateEnabled: true, volumeMatch: true });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected, isBackDated: true, volumeMatch: true });
  });

  test('with the correct mapped properties when override trade date false', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await dealApi.createDeal({ ...formValues });
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(`${api.ADD_DEAL}`, 'POST', { ...expected });
  });
});

test('mapFormToFwdChain is a function', () => {
  expect(mapFormToFwdChain).toBeDefined();
  expect(typeof mapFormToFwdChain).toBe('function');
});

test('mapFormToNdfChain is a function', () => {
  expect(mapFormToNdfChain).toBeDefined();
  expect(typeof mapFormToNdfChain).toBe('function');
});

test('mapFormToSptChain is a function', () => {
  expect(mapFormToSptChain).toBeDefined();
  expect(typeof mapFormToSptChain).toBe('function');
});

describe('dealApi.getBlotterDeals request', () => {
  const params = { sessionId: 'abcd123', subscribeToUpdates: true };
  test('returns an empty array the request is resolved and returnCode < 0, ', async () => {
    restApi.request = jest.fn().mockResolvedValue({ data: { returnCode: -3, returnMessage: 'Dummy Error' } });

    const response = await dealApi.getBlotterDeals(params);
    expect(response.length).toBe(0);
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_DEALS}`, 'GET', null, false, params);
    expect(restApi.request).toHaveBeenCalledTimes(1);

    expect(showErrorNotificationSpy).toHaveBeenCalledTimes(1);
    expect(showErrorNotificationSpy).toBeCalledWith('Error', 'An error occurred with the request - Dummy Error');
  });

  test('returns an empty array the request is resolved and no data returned, ', async () => {
    restApi.request = jest.fn().mockResolvedValue({});

    const response = await dealApi.getBlotterDeals(params);
    expect(response.length).toBe(0);
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_DEALS}`, 'GET', null, false, params);
    expect(restApi.request).toHaveBeenCalledTimes(1);

    expect(showWarningNotificationSpy).toHaveBeenCalledTimes(1);
    expect(showWarningNotificationSpy).toBeCalledWith('No results', 'No deals were found. Please check your search criteria');
  });

  test('returns correct response when the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue({ data: { executionChains: [...mockReturn.data] } });

    const response = await dealApi.getBlotterDeals(params);
    expect(response.length).toBe(2);
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_DEALS}`, 'GET', null, false, params);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error when the request is rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(new Error('error'));

    try {
      await dealApi.getBlotterDeals(params);
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_DEALS}`, 'GET', null, false, params);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('dealApi.approveDealStage request', () => {
  const approvalData = {
    dealEntityId: 1098, lockSequence: 0, approvalPosition: 'BROKER', isApproved: true, strategyId: 1098,
  };
  const mockRetData = {
    data: {
      messages: [],
      errors: [],
      updatedLockSequence: 0,
    },
  };
  test('returns correct response when the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockRetData);
    const response = await dealApi.approveDealStage(approvalData);
    expect(restApi.request).toBeCalledWith(`${api.APPROVE_DEAL_STAGE}`, 'POST', approvalData);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockRetData.data);
  });

  test('returns error response when the request is resolved and deal is getting edited', async () => {
    const errorMsg = 'Deal 1212 is currently being edited by BELFAST TPEUR TEST BROKER 1 and therefore cannot be approved.';
    restApi.request = jest.fn().mockResolvedValue({
      data: {
        messages: [],
        errors: [errorMsg],
      },
    });
    const response = await dealApi.approveDealStage(approvalData);
    expect(restApi.request).toBeCalledWith(`${api.APPROVE_DEAL_STAGE}`, 'POST', approvalData);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(response.errors).toEqual([errorMsg]);
    expect(showWarningNotificationSpy).toHaveBeenCalledTimes(1);
  });
});

describe('dealApi.enableInvestigationChkFlag request', () => {
  const mockReqData = { dmsDealId: 6000, isDealUnderInvestigation: true };
  const mockResData = {
    isDealUnderInvestigation: true,
    investigatingTime: 1616141484495,
    investigatingUserFullName: 'STEPHEN TAYLOR',
    dealId: 6000,
  };

  test('returns correct response when the request is resolved', async () => {
    restApi.request = jest.fn().mockResolvedValue({ ...mockResData });
    const response = await dealApi.enableInvestigationChkFlag(mockReqData);
    expect(restApi.request).toBeCalledWith(`${api.TOGGLE_DEAL_INVESTIGATION_FLAG}`, 'PUT', mockReqData);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(response).toEqual({});
  });
});

describe('dealApi.editDeal Updates deal successfully', () => {
  const dealId = 400;
  const dmsDealReference = 404;
  const patch = [{ op: 'replace', path: '/trades/0/tradeEconomics/payer/brokerage/allocations/2/amount', value: 50 }];

  test('deal updated successfully with valid data', async () => {
    const mockresponse = {
      data: {
        returnMessage: 'OK', errors: [], returnCode: 0, deal: { dealId, dmsDealReference },
      },
    };
    restApi.request = jest.fn().mockResolvedValue(mockresponse);
    const response = await dealApi.editDeal(dealId, patch);
    expect(response.returnMessage).toEqual(mockresponse.returnMessage);
    expect(restApi.request).toBeCalledWith(`${api.EDIT_DEAL}${dealId}/update`, 'PATCH', patch);
    expect(showSuccessNotificationSpy).toHaveBeenCalled();
    expect(showSuccessNotificationSpy).toBeCalledWith('Deal Updated', `Deal(${dmsDealReference}) updated successfully`);
  });

  test('Show notification for an error from server', async () => {
    const mockresponse = { data: { returnMessage: 'Invalid fields listed below', returnCode: -3 } };

    restApi.request = jest.fn().mockResolvedValue(mockresponse);
    try {
      await dealApi.editDeal(dealId, patch);
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.EDIT_DEAL}${dealId}/update`, 'PATCH', patch);
      expect(showErrorNotificationSpy).toBeCalledWith('Deal Error', mockresponse.data.returnMessage, 10);
    }
  });

  test('Show notification for multiple errors from server', async () => {
    const mockresponse = {
      data: {
        returnMessage: 'Invalid fields listed below',
        errors: ['Invalid Brokerage Data: Invalid currency', 'Invalid Brokerage Data: Invalid Amount'],
        returnCode: -3,
      },
    };
    restApi.request = jest.fn().mockResolvedValue(mockresponse);
    try {
      await dealApi.editDeal(dealId, patch);
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.EDIT_DEAL}${dealId}/update`, 'PATCH', patch);
      expect(showErrorNotificationSpy).toHaveBeenCalled();
    }
  });
});

describe('dealApi.getDeal returns correct Deal Object ', () => {
  const dealId = 400;

  test('Deal Object returned successfully with valid dealId', async () => {
    const mockresponse = {
      data: {
        returnMessage: 'OK', errors: [], returnCode: 0, deal: { dealId },
      },
    };
    restApi.request = jest.fn().mockResolvedValue(mockresponse);
    const response = await dealApi.getDeal(dealId);
    expect(restApi.request).toBeCalledWith(`${api.LOAD_DEAL}/${dealId}`, 'GET');
    expect(response.returnMessage).toEqual(mockresponse.returnMessage);
  });

  test('Show Erro notification for an error from server', async () => {
    const mockresponse = { data: { returnMessage: 'Invalid Deal Id' } };
    restApi.request = jest.fn().mockResolvedValue(mockresponse);
    const response = await dealApi.getDeal(dealId);
    expect(restApi.request).toBeCalledWith(`${api.LOAD_DEAL}/${dealId}`, 'GET');
    expect(response).toEqual({});
    expect(showErrorNotificationSpy).toBeCalledWith('Error', 'Deal Not found');
  });
});
