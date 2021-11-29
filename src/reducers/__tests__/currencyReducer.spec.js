import { actionTypes } from '../../utils/constants';
import reducer from '../currencyReducer';

const testCurrencies1 = [{
  baseCurrency: 'EUR',
  counterCurrency: 'GBP',
  instrumentId: 10301,
  baseCurrencyDayCountYear: '360',
  counterCurrencyDayCountYear: '360',
  scalingFactor: 0.00010000,
}, {
  baseCurrency: 'EUR',
  counterCurrency: 'USD',
  instrumentId: 10600,
  baseCurrencyDayCountYear: '360',
  counterCurrencyDayCountYear: '360',
  scalingFactor: 0.00010000,
}, {
  baseCurrency: 'GBP',
  counterCurrency: 'USD',
  instrumentId: 10300,
  baseCurrencyDayCountYear: '365',
  counterCurrencyDayCountYear: '360',
  scalingFactor: 0.00010000,
}, {
  baseCurrency: 'USD',
  counterCurrency: 'CAD',
  instrumentId: 10602,
  baseCurrencyDayCountYear: '360',
  counterCurrencyDayCountYear: '360',
  scalingFactor: 0.00010000,
}];

const testCurrencies2 = [{
  baseCurrency: 'USD',
  counterCurrency: 'CAD',
  instrumentId: 10602,
  baseCurrencyDayCountYear: '360',
  counterCurrencyDayCountYear: '360',
  scalingFactor: 0.00010000,
}];

test('LOAD_CURRENCIES_SUCCESS action returns currencies from action.', () => {
  const reducerOutput = reducer(testCurrencies1, { type: actionTypes.LOAD_CURRENCIES_SUCCESS, currencies: testCurrencies2 });
  expect(reducerOutput).toEqual(testCurrencies2);
});

test('LOAD_CURRENCIES_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testCurrencies1, { type: actionTypes.LOAD_CURRENCIES_FAILED, error: {} });
  expect(reducerOutput).toEqual(testCurrencies1);
});

test('LOAD_CURRENCIES_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testCurrencies1, { type: actionTypes.LOAD_CURRENCIES_CANCELLED });
  expect(reducerOutput).toEqual(testCurrencies1);
});

test('RESET_CURRENCIES action returns initial state.', () => {
  const reducerOutput = reducer(testCurrencies1, { type: actionTypes.RESET_CURRENCIES });
  expect(reducerOutput).toEqual([]);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testCurrencies1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testCurrencies1);
});

test('DEFAULT action sets correct initial state [] for currencies.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, currencies: undefined });
  expect(reducerOutput).toEqual([]);
});
