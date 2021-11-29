import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadDeskDataSuccess, loadDeskDataCancelled, loadDeskDataFailed, loadDesks,
} from '../deskActions';
import { actionTypes } from '../../utils/constants';
import deskApi from '../../api/deskApi';

const mockStore = configureMockStore([thunk]);

const dummyDesk = [{ deskName: 'DESKNAME', deskId: 0 }];

describe('Desk Actions', () => {
  test('loadDeskDataSuccess should create a LOAD_DESKS_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_DESKS_SUCCESS, payload: { desks: dummyDesk } };
    expect(loadDeskDataSuccess(dummyDesk)).toEqual(expectedAction);
  });

  test('loadDeskDataCancelled should create a LOAD_DESKS_CANCELLED action', () => {
    const expectedAction = { type: actionTypes.LOAD_DESKS_CANCELLED };
    expect(loadDeskDataCancelled()).toEqual(expectedAction);
  });

  test('loadDeskDataFailed should create a LOAD_DESKS_FAILED action', () => {
    const expectedAction = { type: actionTypes.LOAD_DESKS_FAILED, error: {} };
    expect(loadDeskDataFailed({})).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadDesks should call LOAD_DESKS_SUCCESS with the correct payload when the call to getDeskData is successfully resolved
  and the deal types match`, async () => {
    deskApi.getDeskData = jest.fn().mockResolvedValue([...dummyDesk]);

    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
    await store.dispatch(loadDesks('DUMMYDEALTYPE'));

    expect(deskApi.getDeskData).toBeCalledWith('DUMMYDEALTYPE');
    expect(deskApi.getDeskData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_DESKS_SUCCESS, payload: { desks: dummyDesk } });
  });

  test(`loadDesks should call LOAD_DESKS_CANCELLED when the call to getDeskData is successfully resolved
  and the deal types do not match`, async () => {
    deskApi.getDeskData = jest.fn().mockResolvedValue([...dummyDesk]);

    const store = mockStore();
    await store.dispatch(loadDesks('DUMMYDEALTYPE'));

    expect(deskApi.getDeskData).toBeCalledWith('DUMMYDEALTYPE');
    expect(deskApi.getDeskData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_DESKS_CANCELLED });
  });

  test('loadDesks should call LOAD_DESKS_FAILED action when the call to getDeskData is rejected', async () => {
    deskApi.getDeskData = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadDesks('DUMMYDEALTYPE'));

    expect(deskApi.getDeskData).toBeCalledWith('DUMMYDEALTYPE');
    expect(deskApi.getDeskData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_DESKS_FAILED, error: [] });
  });
});
