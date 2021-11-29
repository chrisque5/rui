import { actionTypes } from '../../utils/constants';
import reducer from '../rateReducer';

const initialRateState = {
  rate: '',
  points: '',
};

const testRates1 = {
  rate: 1.380100,
  rate2: 1.380065,
  points: -0.000035,
  statusCode: 0,
  statusText: 'No Status Description received from Tailor',
  notionalAmountCurrency: 'USD',
  contraCurrency: 'SGD',
  adjustedEndDate: '07/02/2020',
  adjustedEndDate2: '09/03/2020',
};

const testRates2 = {
  rate: 6.977600,
  rate2: 7.122600,
  points: 0.145000,
  statusCode: 0,
  statusText: 'No Status Description received from Tailor',
  notionalAmountCurrency: 'USD',
  contraCurrency: 'CNH',
  adjustedEndDate: '07/02/2020',
  adjustedEndDate2: '07/02/2022',
  isRateResponsePending: false,
};

test('LOAD_RATES_SUCCESS action returns rates from action.', () => {
  const reducerOutput = reducer(testRates1, { type: actionTypes.LOAD_RATES_SUCCESS, rates: testRates2 });
  expect(reducerOutput).toEqual(testRates2);
});

test('LOAD_RATES_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testRates1, { type: actionTypes.LOAD_RATES_FAILED, error: {} });
  expect(reducerOutput).toEqual({ ...testRates1, isRateResponsePending: false });
});

test('LOAD_RATES_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testRates1, { type: actionTypes.LOAD_RATES_CANCELLED });
  expect(reducerOutput).toEqual({ ...testRates1, isRateResponsePending: false });
});

test('LOAD_RATES_IN_PROGRESS action returns current state.', () => {
  const reducerOutput = reducer(testRates1, { type: actionTypes.LOAD_RATES_IN_PROGRESS, error: {} });
  expect(reducerOutput).toEqual({ ...testRates1, isRateResponsePending: true });
});
test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testRates1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testRates1);
});

test('DEFAULT action sets correct initial state for rates.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, rates: undefined });
  expect(reducerOutput).toEqual({ ...initialRateState, isRateResponsePending: false });
});
