import { actionTypes } from '../../utils/constants';
import reducer from '../deskReducer';

const testDesks = {
  desks: [{
    deskName: "ACME IDB LON - FRA'S",
    deskId: 8013,
  }, {
    deskName: 'ACME IDB LON - SWAPS',
    deskId: 8012,
  }, {
    deskName: "ACME IDB NYK - FRA'S",
    deskId: 8015,
  }, {
    deskName: 'ACME IDB NYK - SWAPS',
    deskId: 8014,
  }, {
    deskName: 'ASIA JPY AUCTION',
    deskId: 8104,
  }],
};

const reducedDesks = [{
  displayValue: "ACME IDB LON - FRA'S",
  key: 8013,
}, {
  displayValue: 'ACME IDB LON - SWAPS',
  key: 8012,
}, {
  displayValue: "ACME IDB NYK - FRA'S",
  key: 8015,
}, {
  displayValue: 'ACME IDB NYK - SWAPS',
  key: 8014,
}, {
  displayValue: 'ASIA JPY AUCTION', key: 8104,
}];

test('LOAD_DESKS_SUCCESS action returns desks from action.', () => {
  const reducerOutput = reducer(testDesks, { type: actionTypes.LOAD_DESKS_SUCCESS, payload: testDesks });
  expect(reducerOutput).toEqual(reducedDesks);
});

test('LOAD_DESKS_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testDesks, { type: actionTypes.LOAD_DESKS_FAILED, error: {} });
  expect(reducerOutput).toEqual(testDesks);
});

test('LOAD_DESKS_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testDesks, { type: actionTypes.LOAD_DESKS_CANCELLED });
  expect(reducerOutput).toEqual(testDesks);
});

test('DEFAULT action sets correct initial state [] for desks.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, desks: undefined });
  expect(reducerOutput).toEqual([]);
});
