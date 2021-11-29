import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadRtuBlotterCount, loadRtuBlotterCountSuccess, loadRtuBlotterCountFailed,
} from '../blotterActions';
import { actionTypes } from '../../utils/constants';
import blotterApi from '../../api/blotterApi';

const mockStore = configureMockStore([thunk]);
const payload = { rtuBlotterCount: 1 };

describe('Blotter ACTION', () => {
  test('loadRtuBlotterCountSuccess should create a LOAD_BLOTTER_RTU_COUNT_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BLOTTER_RTU_COUNT_SUCCESS, payload };
    expect(loadRtuBlotterCountSuccess(payload)).toEqual(expectedAction);
  });

  test('loadRtuBlotterCountFailed should create a LOAD_BLOTTER_RTU_COUNT_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BLOTTER_RTU_COUNT_FAILED, payload };
    expect(loadRtuBlotterCountFailed(payload)).toEqual(expectedAction);
  });

  test('loadRtuBlotterCount should call LOAD_BLOTTER_RTU_COUNT_SUCCESS with the correct payload successfully resolved', async () => {
    blotterApi.getRtuBlotterCount = jest.fn().mockResolvedValue(1);

    const store = mockStore({ blotter: { rtuBlotterCount: 1 } });
    await store.dispatch(loadRtuBlotterCount());

    expect(blotterApi.getRtuBlotterCount).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BLOTTER_RTU_COUNT_SUCCESS, payload });
  });

  test('loadRtuBlotterCount should call LOAD_BLOTTER_RTU_COUNT_FAILED when the call to getRtuBlotterCount is rejected', async () => {
    blotterApi.getRtuBlotterCount = jest.fn().mockRejectedValue(payload);

    const store = mockStore();
    await store.dispatch(loadRtuBlotterCount());

    expect(blotterApi.getRtuBlotterCount).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BLOTTER_RTU_COUNT_FAILED, payload });
  });
});
