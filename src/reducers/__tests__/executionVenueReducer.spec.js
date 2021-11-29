import { actionTypes } from '../../utils/constants';
import reducer from '../executionVenueReducer';

const testExecutionVenues1 = [{
  id: null,
  lockSequence: null,
  venueId: 'XOFF',
  productType: 'FX',
  venueType: 'OffFacility',
  reportingRegime: 'DoddFrankAct',
}, {
  id: null,
  lockSequence: null,
  venueId: 'IMMM',
  productType: 'FX',
  venueType: 'MTF',
  reportingRegime: 'MiFIR',
}, {
  id: null,
  lockSequence: null,
  venueId: 'IOMM',
  productType: 'FX',
  venueType: 'OTF',
  reportingRegime: 'MiFIR',
}, {
  id: null,
  lockSequence: null,
  venueId: 'TEFD',
  productType: 'FX',
  venueType: 'MTF',
  reportingRegime: 'MiFIR',
}];

const testExecutionVenues2 = [{
  id: null,
  lockSequence: null,
  venueId: 'XOFF',
  productType: 'FX',
  venueType: 'OffFacility',
  reportingRegime: 'DoddFrankAct',
}, {
  id: null,
  lockSequence: null,
  venueId: 'IMMM',
  productType: 'FX',
  venueType: 'MTF',
  reportingRegime: 'MiFIR',
}];

test('LOAD_EXECUTIONVENUES_SUCCESS action returns execution venues from action.', () => {
  const reducerOutput = reducer(testExecutionVenues1, { type: actionTypes.LOAD_EXECUTIONVENUES_SUCCESS, executionVenues: testExecutionVenues2 });
  expect(reducerOutput).toEqual(testExecutionVenues2);
});

test('LOAD_EXECUTIONVENUES_FAILED action wipes current state to [].', () => {
  const reducerOutput = reducer([], { type: actionTypes.LOAD_EXECUTIONVENUES_FAILED, error: {} });
  expect(reducerOutput).toEqual([]);
});

test('LOAD_EXECUTIONVENUES_CANCELLED action returns current state', () => {
  const reducerOutput = reducer([], { type: actionTypes.LOAD_EXECUTIONVENUES_CANCELLED });
  expect(reducerOutput).toEqual([]);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testExecutionVenues1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testExecutionVenues1);
});

test('DEFAULT action sets correct initial state [] for execution venues.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, executionVenues: undefined });
  expect(reducerOutput).toEqual([]);
});

test('RESET_EXECUTIONVENUES action returns current state', () => {
  const reducerOutput = reducer([], { type: actionTypes.RESET_EXECUTIONVENUES });
  expect(reducerOutput).toEqual([]);
});
