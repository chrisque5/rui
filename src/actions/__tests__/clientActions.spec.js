import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadClientData, loadClientDataFailed, loadClientDataSuccess, loadClientDataCancelled,
  resetClientData,
} from '../clientActions';
import { actionTypes } from '../../utils/constants';
import clientApi from '../../api/clientApi';

const mockStore = configureMockStore([thunk]);
const dummyClients = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

describe('ACTION', () => {
  test('loadClientDataSuccess should create a LOAD_CLIENTDATA_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_CLIENTDATA_SUCCESS, clientData: [...dummyClients] };
    expect(loadClientDataSuccess(dummyClients)).toEqual(expectedAction);
  });

  test('loadClientDataFailed should create a LOAD_CLIENTDATA_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_CLIENTDATA_FAILED, error: [] };
    expect(loadClientDataFailed([])).toEqual(expectedAction);
  });

  test('loadClientDataCancelled should create a LOAD_CLIENTDATA_CANCELLED action', () => {
    const expectedAction = { type: actionTypes.LOAD_CLIENTDATA_CANCELLED };
    expect(loadClientDataCancelled()).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadClientData should call LOAD_CLIENTDATA_SUCCESS with the correct payload
  when the call to getClientData is successfully resolved and the deal types match`, async () => {
    clientApi.getClientData = jest.fn().mockResolvedValue([...dummyClients]);
    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
    await store.dispatch(loadClientData('DUMMYDEALTYPE'));

    expect(clientApi.getClientData).toBeCalledWith('DUMMYDEALTYPE');
    expect(clientApi.getClientData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_CLIENTDATA_SUCCESS, clientData: [...dummyClients] });
  });

  test(`loadClientData should call LOAD_CLIENTDATA_CANCELLED when the call to getClientData is resolved
  and the deal types do not match`, async () => {
    clientApi.getClientData = jest.fn().mockResolvedValue([...dummyClients]);
    const store = mockStore();
    await store.dispatch(loadClientData('DUMMYDEALTYPE'));

    expect(clientApi.getClientData).toBeCalledWith('DUMMYDEALTYPE');
    expect(clientApi.getClientData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_CLIENTDATA_CANCELLED });
  });

  test('loadClientData should call LOAD_CLIENTDATA_FAILED action when the call to getClientData is rejected', async () => {
    clientApi.getClientData = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadClientData('DUMMYDEALTYPE'));

    expect(clientApi.getClientData).toBeCalledWith('DUMMYDEALTYPE');
    expect(clientApi.getClientData).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_CLIENTDATA_FAILED, error: [] });
  });

  test('resetClientData should call RESET_CURRENCIES action', async () => {
    const store = mockStore();
    await store.dispatch(resetClientData());

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.RESET_CLIENTDATA });
  });
});
