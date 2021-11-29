import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import currencyApi from '../../api/currencyApi';
import { actionTypes } from '../../utils/constants';
import {
  loadCurrencies, loadCurrenciesFailed, loadCurrenciesSuccess,
  updateCLSFlags, loadCurrenciesCancelled, resetCurrencies,
} from '../currencyActions';

const mockStore = configureMockStore([thunk]);
const dummyCurrencies = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];
const enableCaching = false;

describe('ACTION', () => {
  test('loadCurrenciesSuccess should create a LOAD_CURRENCIES_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_CURRENCIES_SUCCESS, currencies: [...dummyCurrencies] };
    expect(loadCurrenciesSuccess(dummyCurrencies)).toEqual(expectedAction);
  });

  test('loadCurrenciesFailed should create a LOAD_CURRENCIES_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_CURRENCIES_FAILED, error: [] };
    expect(loadCurrenciesFailed([])).toEqual(expectedAction);
  });

  test('loadCurrenciesCancelled should create a LOAD_CURRENCIES_CANCELLED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_CURRENCIES_CANCELLED };
    expect(loadCurrenciesCancelled()).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test(`loadCurrencies should call LOAD_CURRENCIES_SUCCESS with the correct payload when the call to getCurrencies is successfully resolved
  and the deal types match`, async () => {
    currencyApi.getCurrencies = jest.fn().mockResolvedValue([...dummyCurrencies]);

    const store = mockStore({ ui: { selectedDealType: 'DUMMYDEALTYPE' } });
    await store.dispatch(loadCurrencies('DUMMYDEALTYPE', enableCaching));

    expect(currencyApi.getCurrencies).toBeCalledWith('DUMMYDEALTYPE', enableCaching);
    expect(currencyApi.getCurrencies).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_CURRENCIES_SUCCESS, currencies: [...dummyCurrencies] });
  });

  test(`loadCurrencies should call LOAD_CURRENCIES_CANCELLED when the call to getCurrencies is successfully resolved
  and the deal types do not match`, async () => {
    currencyApi.getCurrencies = jest.fn().mockResolvedValue([...dummyCurrencies]);

    const store = mockStore();
    await store.dispatch(loadCurrencies('DUMMYDEALTYPE', enableCaching));

    expect(currencyApi.getCurrencies).toBeCalledWith('DUMMYDEALTYPE', enableCaching);
    expect(currencyApi.getCurrencies).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_CURRENCIES_CANCELLED });
  });

  test('loadCurrencies should call LOAD_CURRENCIES_FAILED action when the call to getCurrencies is rejected', async () => {
    currencyApi.getCurrencies = jest.fn().mockRejectedValue([]);

    const store = mockStore();
    await store.dispatch(loadCurrencies('DUMMYDEALTYPE', enableCaching));

    expect(currencyApi.getCurrencies).toBeCalledWith('DUMMYDEALTYPE', enableCaching);
    expect(currencyApi.getCurrencies).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.LOAD_CURRENCIES_FAILED, error: [] });
  });

  test('updateCLSFlags should call UPDATE_CURRENCY_PAIR_CLS_SUCCESS action when the call to updateCLSFlags is resolved', async () => {
    currencyApi.updateCLSFlags = jest.fn().mockResolvedValue(true);
    const store = mockStore();
    await store.dispatch(updateCLSFlags(dummyCurrencies));

    expect(currencyApi.updateCLSFlags).toBeCalledWith(dummyCurrencies);
    expect(currencyApi.updateCLSFlags).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.UPDATE_CURRENCY_PAIR_CLS_SUCCESS, currencies: true });
  });

  test('updateCLSFlags should call UPDATE_CURRENCY_PAIR_CLS_FAILED action when the call to updateCLSFlags is rejected', async () => {
    currencyApi.updateCLSFlags = jest.fn().mockRejectedValue(false);
    const store = mockStore();
    await store.dispatch(updateCLSFlags(dummyCurrencies));

    expect(currencyApi.updateCLSFlags).toBeCalledWith(dummyCurrencies);
    expect(currencyApi.updateCLSFlags).toHaveBeenCalledTimes(1);

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.UPDATE_CURRENCY_PAIR_CLS_FAILED, error: false });
  });

  describe('resetCurrencies()', () => {
    test('resetCurrencies should call RESET_CURRENCIES action', async () => {
      const store = mockStore();
      await store.dispatch(resetCurrencies());

      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.RESET_CURRENCIES });
    });
  });
});
