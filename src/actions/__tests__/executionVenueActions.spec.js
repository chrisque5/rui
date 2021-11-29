import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadExecutionVenues, loadExecutionVenuesFailed, loadExecutionVenuesSuccess, loadExecutionVenuesCancelled,
  resetExecutionVenues,
} from '../executionVenueActions';
import { actionTypes } from '../../utils/constants';
import executionVenueApi from '../../api/executionVenueApi';

const mockStore = configureMockStore([thunk]);
const dummyExecutionVenues = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

describe('ACTION', () => {
  test('loadExecutionVenuesSuccess should create a LOAD_EXECUTIONVENUES_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_EXECUTIONVENUES_SUCCESS, executionVenues: [...dummyExecutionVenues] };
    expect(loadExecutionVenuesSuccess(dummyExecutionVenues)).toEqual(expectedAction);
  });

  test('loadExecutionVenuesFailed should create a LOAD_EXECUTIONVENUES_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_EXECUTIONVENUES_FAILED, error: [] };
    expect(loadExecutionVenuesFailed([])).toEqual(expectedAction);
  });

  test('loadExecutionVenuesCancelled should create a LOAD_EXECUTIONVENUES_CANCELLED action', () => {
    const expectedAction = { type: actionTypes.LOAD_EXECUTIONVENUES_CANCELLED };
    expect(loadExecutionVenuesCancelled()).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadExecutionVenues should call LOAD_EXECUTIONVENUES_SUCCESS with the correct payload when getExecutionVenues is successfully resolved
  and the deal types match`, async () => {
    executionVenueApi.getExecutionVenues = jest.fn().mockResolvedValue([...dummyExecutionVenues]);

    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
    await store.dispatch(loadExecutionVenues('DUMMYDEALTYPE'));

    expect(executionVenueApi.getExecutionVenues).toBeCalledWith('DUMMYDEALTYPE');
    expect(executionVenueApi.getExecutionVenues).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_EXECUTIONVENUES_SUCCESS, executionVenues: [...dummyExecutionVenues] });
  });

  test(`loadExecutionVenues should call LOAD_EXECUTIONVENUES_CANCELLED when getExecutionVenues is successfully resolved
  and the deal types do not match`, async () => {
    executionVenueApi.getExecutionVenues = jest.fn().mockResolvedValue([...dummyExecutionVenues]);

    const store = mockStore();
    await store.dispatch(loadExecutionVenues('DUMMYDEALTYPE'));

    expect(executionVenueApi.getExecutionVenues).toBeCalledWith('DUMMYDEALTYPE');
    expect(executionVenueApi.getExecutionVenues).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_EXECUTIONVENUES_CANCELLED });
  });

  test('loadExecutionVenues should call LOAD_EXECUTIONVENUES_FAILED action when the call to getExecutionVenues is rejected', async () => {
    executionVenueApi.getExecutionVenues = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadExecutionVenues('DUMMYDEALTYPE'));

    expect(executionVenueApi.getExecutionVenues).toBeCalledWith('DUMMYDEALTYPE');
    expect(executionVenueApi.getExecutionVenues).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_EXECUTIONVENUES_FAILED, error: [] });
  });

  test('resetAgentData should call RESET_EXECUTIONVENUES action', async () => {
    const store = mockStore();
    await store.dispatch(resetExecutionVenues());

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.RESET_EXECUTIONVENUES });
  });
});
