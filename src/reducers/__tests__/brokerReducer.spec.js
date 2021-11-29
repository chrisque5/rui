import { actionTypes } from '../../utils/constants';
import reducer from '../brokerReducer';

const testBrokers1 = [{
  id: 100114,
  name: 'BELFAST TPEUR TEST BROKER 1',
  deskId: 8158,
  deskName: 'BELFAST RATES TPEUR DESK',
}, {
  id: 100117,
  name: 'BELFAST TPEUR TEST BROKER 4',
  deskId: 8158,
  deskName: 'BELFAST RATES TPEUR DESK',
}, {
  id: 100116,
  name: 'BELFAST TPEUR TEST BROKER 3',
  deskId: 8158,
  deskName: 'BELFAST RATES TPEUR DESK',
}, {
  id: 100115,
  name: 'BELFAST TPEUR TEST BROKER 2',
  deskId: 8158,
  deskName: 'BELFAST RATES TPEUR DESK',
}];

const testBrokers2 = [{
  id: 100114,
  name: 'BELFAST TPEUR TEST BROKER 1',
  deskId: 8158,
  deskName: 'BELFAST RATES TPEUR DESK',
}, {
  id: 100117,
  name: 'BELFAST TPEUR TEST BROKER 4',
  deskId: 8158,
  deskName: 'BELFAST RATES TPEUR DESK',
}];

test('LOAD_BROKERDATA_SUCCESS action returns brokers from action.', () => {
  const reducerOutput = reducer(testBrokers1, { type: actionTypes.LOAD_BROKERDATA_SUCCESS, brokers: testBrokers2 });
  expect(reducerOutput).toEqual(testBrokers2);
});

test('LOAD_BROKERDATA_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testBrokers1, { type: actionTypes.LOAD_BROKERDATA_FAILED, error: {} });
  expect(reducerOutput).toEqual(testBrokers1);
});

test('LOAD_BROKERDATA_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testBrokers1, { type: actionTypes.LOAD_BROKERDATA_CANCELLED });
  expect(reducerOutput).toEqual(testBrokers1);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testBrokers1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testBrokers1);
});

test('DEFAULT action sets correct initial state [] for brokers.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, brokers: undefined });
  expect(reducerOutput).toEqual([]);
});

test('RESET_BROKERDATA action returns initial state.', () => {
  const reducerOutput = reducer(testBrokers1, { type: actionTypes.RESET_BROKERDATA });
  expect(reducerOutput).toEqual([]);
});
