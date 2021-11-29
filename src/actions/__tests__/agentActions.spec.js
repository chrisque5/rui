import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadAgents, loadAgentsFailed, loadAgentsSuccess, loadAgentsCancelled, resetAgentData,
} from '../agentActions';
import { actionTypes } from '../../utils/constants';
import agentApi from '../../api/agentApi';

const mockStore = configureMockStore([thunk]);
const dummyAgents = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

describe('ACTION', () => {
  test('loadAgentsSuccess should create a LOAD_AGENTDATA_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_AGENTDATA_SUCCESS, agents: [...dummyAgents] };
    expect(loadAgentsSuccess(dummyAgents)).toEqual(expectedAction);
  });

  test('loadAgentsFailed should create a LOAD_AGENTDATA_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_AGENTDATA_FAILED, agents: [] };
    expect(loadAgentsFailed([])).toEqual(expectedAction);
  });

  test('loadAgentsCancelled should create a LOAD_AGENTDATA_CANCELLED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_AGENTDATA_CANCELLED };
    expect(loadAgentsCancelled()).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadAgents should call LOAD_AGENTDATA_SUCCESS with the correct payload when the call to getAgents is successfully resolved
  and the deal types match`, async () => {
    agentApi.getAgents = jest.fn().mockResolvedValue([...dummyAgents]);

    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
    await store.dispatch(loadAgents('DUMMYDEALTYPE'));

    expect(agentApi.getAgents).toBeCalledWith('DUMMYDEALTYPE');
    expect(agentApi.getAgents).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_AGENTDATA_SUCCESS, agents: [...dummyAgents] });
  });

  test(`loadAgents should call LOAD_AGENTDATA_CANCELLED when the call to getAgents is successfully resolved
  and the deal types do not match`, async () => {
    agentApi.getAgents = jest.fn().mockResolvedValue([...dummyAgents]);

    const store = mockStore();
    await store.dispatch(loadAgents('DUMMYDEALTYPE'));

    expect(agentApi.getAgents).toBeCalledWith('DUMMYDEALTYPE');
    expect(agentApi.getAgents).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_AGENTDATA_CANCELLED });
  });

  test('loadAgents should call LOAD_AGENTDATA_FAILED action when the call to getAgents is rejected', async () => {
    agentApi.getAgents = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadAgents('DUMMYDEALTYPE'));

    expect(agentApi.getAgents).toBeCalledWith('DUMMYDEALTYPE');
    expect(agentApi.getAgents).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_AGENTDATA_FAILED, agents: [] });
  });

  test('resetAgentData should call RESET_BROKERDATA action', async () => {
    const store = mockStore();
    await store.dispatch(resetAgentData());

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.RESET_AGENTDATA });
  });
});
