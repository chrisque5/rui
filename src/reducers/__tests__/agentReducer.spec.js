import { actionTypes } from '../../utils/constants';
import reducer from '../agentReducer';

const testAgents1 = [{
  shortName: '42 FIN SERV S.R.O',
  locationName: 'PRA',
  companyName: '42 FINANCIAL SERVICES S.R.O, PRA',
  leiCode: null,
  reutersCode: ' ',
  id: 170447,
}, {
  shortName: 'A-J STEVENS',
  locationName: 'HKG',
  companyName: 'A-J STEVENS, HKG',
  leiCode: 'K8MS7FD7N5Z2WQ51AZ71',
  reutersCode: ' ',
  id: 103309,
}];

const testAgents2 = [{
  shortName: 'HARLOW (LONDON) LTD',
  locationName: 'LON',
  companyName: 'HARLOW (LONDON) LIMITED, LON',
  leiCode: null,
  reutersCode: ' ',
  id: 211388,
}];

test('LOAD_AGENTDATA_SUCCESS action returns agents from action.', () => {
  const reducerOutput = reducer(testAgents1, { type: actionTypes.LOAD_AGENTDATA_SUCCESS, agents: testAgents2 });
  expect(reducerOutput).toEqual(testAgents2);
});

test('LOAD_AGENTDATA_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testAgents1, { type: actionTypes.LOAD_AGENTDATA_FAILED, error: {} });
  expect(reducerOutput).toEqual(testAgents1);
});

test('LOAD_AGENTDATA_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testAgents1, { type: actionTypes.LOAD_AGENTDATA_CANCELLED });
  expect(reducerOutput).toEqual(testAgents1);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testAgents1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testAgents1);
});

test('DEFAULT action sets correct initial state [] for agents.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, agents: undefined });
  expect(reducerOutput).toEqual([]);
});

test('RESET_AGENTDATA action returns current state.', () => {
  const reducerOutput = reducer(testAgents1, { type: actionTypes.RESET_AGENTDATA });
  expect(reducerOutput).toEqual([]);
});
