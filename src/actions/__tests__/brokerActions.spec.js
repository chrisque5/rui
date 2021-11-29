import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  loadBrokers, loadBrokersFailed, loadBrokersSuccess, loadGcdBrokers,
  loadGcdBrokersFailed, loadGcdBrokersSuccess, updateBrokers, updateBrokersFailed,
  updateBrokersSuccess, loadBrokersCancelled, resetBrokerData,
} from '../brokerActions';
import { actionTypes } from '../../utils/constants';
import brokerApi from '../../api/brokerApi';

const mockStore = configureMockStore([thunk]);
const dummyBrokers = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

describe('ACTION', () => {
  test('loadBrokersSuccess should create a LOAD_BROKERDATA_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BROKERDATA_SUCCESS, brokers: [...dummyBrokers] };
    expect(loadBrokersSuccess(dummyBrokers)).toEqual(expectedAction);
  });

  test('loadBrokersFailed should create a LOAD_BROKERDATA_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_BROKERDATA_FAILED, error: [] };
    expect(loadBrokersFailed([])).toEqual(expectedAction);
  });

  test('loadBrokersCancelled should create a LOAD_BROKERDATA_CANCELLED action', () => {
    const expectedAction = { type: actionTypes.LOAD_BROKERDATA_CANCELLED };
    expect(loadBrokersCancelled()).toEqual(expectedAction);
  });

  test('loadGcdBrokersSuccess should create a LOAD_GCD_BROKERDATA_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_GCD_BROKERDATA_SUCCESS, gcdBrokers: [...dummyBrokers] };
    expect(loadGcdBrokersSuccess(dummyBrokers)).toEqual(expectedAction);
  });

  test('loadGcdBrokersFailed should create a LOAD_GCD_BROKERDATA_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_GCD_BROKERDATA_FAILED, error: [] };
    expect(loadGcdBrokersFailed([])).toEqual(expectedAction);
  });

  test('updateBrokersSuccess should create a UPDATE_BROKER_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_BROKER_SUCCESS, brokerUpdateStatus: true };
    expect(updateBrokersSuccess(true)).toEqual(expectedAction);
  });

  test('updateBrokersFailed should create a UPDATE_BROKER_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_BROKER_FAILED, error: false };
    expect(updateBrokersFailed(false)).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadBrokers should call LOAD_BROKERDATA_SUCCESS with the correct payload when the call to getBrokers is successfully resolved
  and the deal types are the same`, async () => {
    brokerApi.getBrokers = jest.fn().mockResolvedValue([...dummyBrokers]);

    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
    await store.dispatch(loadBrokers('DUMMYDEALTYPE', 'DUMMYDESKID'));

    expect(brokerApi.getBrokers).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYDESKID');
    expect(brokerApi.getBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BROKERDATA_SUCCESS, brokers: [...dummyBrokers] });
  });

  test(`loadBrokers should call LOAD_BROKERDATA_CANCELLED when the call to getBrokers is successfully resolved
  and the deal types do not match`, async () => {
    brokerApi.getBrokers = jest.fn().mockResolvedValue([...dummyBrokers]);

    const store = mockStore();
    await store.dispatch(loadBrokers('DUMMYDEALTYPE', 'DUMMYDESKID'));

    expect(brokerApi.getBrokers).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYDESKID');
    expect(brokerApi.getBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BROKERDATA_CANCELLED });
  });

  test('loadBrokers should call LOAD_BROKERDATA_FAILED action when the call to getBrokers is rejected', async () => {
    brokerApi.getBrokers = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadBrokers('DUMMYDEALTYPE', 'DUMMYDESKID'));

    expect(brokerApi.getBrokers).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYDESKID');
    expect(brokerApi.getBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_BROKERDATA_FAILED, error: [] });
  });

  test('loadGcdBrokers should call LOAD_BROKERDATA_SUCCESS when getBrokers is successfully resolved', async () => {
    brokerApi.getBrokers = jest.fn().mockResolvedValue([...dummyBrokers]);

    const store = mockStore();
    await store.dispatch(loadGcdBrokers('DUMMYDEALTYPE', 'DUMMYDESKID'));

    expect(brokerApi.getBrokers).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYDESKID', true);
    expect(brokerApi.getBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_GCD_BROKERDATA_SUCCESS, gcdBrokers: [...dummyBrokers] });
  });

  test('loadGcdBrokers should call LOAD_GCD_BROKERDATA_FAILED action when the call to getBrokers is rejected', async () => {
    brokerApi.getBrokers = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadGcdBrokers('DUMMYDEALTYPE', 'DUMMYDESKID'));

    expect(brokerApi.getBrokers).toBeCalledWith('DUMMYDEALTYPE', 'DUMMYDESKID', true);
    expect(brokerApi.getBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_GCD_BROKERDATA_FAILED, error: [] });
  });

  test('updateBrokers should call UPDATE_BROKER_SUCCESS with the correct payload, when the call to getBrokers is successfully resolved', async () => {
    brokerApi.updateBrokers = jest.fn().mockResolvedValue(true);
    const formValues = { desk: 'DUMMYDESKID', dealType: 'DUMMYDEALTYPE', selectedBrokers: [] };
    const store = mockStore();
    await store.dispatch(updateBrokers(formValues));

    expect(brokerApi.updateBrokers).toBeCalledWith(formValues);
    expect(brokerApi.updateBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.UPDATE_BROKER_SUCCESS, brokerUpdateStatus: true });
  });

  test('updateBrokers should call UPDATE_BROKER_FAILED action when the call to getBrokers is rejected', async () => {
    brokerApi.updateBrokers = jest.fn().mockRejectedValue(false);
    const formValues = { desk: 'DUMMYDESKID', dealType: 'DUMMYDEALTYPE', selectedBrokers: [] };
    const store = mockStore();
    await store.dispatch(updateBrokers(formValues));

    expect(brokerApi.updateBrokers).toBeCalledWith(formValues);
    expect(brokerApi.updateBrokers).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.UPDATE_BROKER_FAILED, error: false });
  });

  test('resetBrokerData should call RESET_BROKERDATA action', async () => {
    const store = mockStore();
    await store.dispatch(resetBrokerData());

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.RESET_BROKERDATA });
  });
});
