import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { actionTypes } from '../../utils/constants';
import userApi from '../../api/userApi';

import {
  addClientTraderPreference, addClientTraderPreferenceFailed, addClientTraderPreferenceSuccess,
  addCurrencyPairPreference,
  addExecutionVenuePreference,
  addTermPreference,
  deleteBrokerPreference, deleteBrokerPreferenceFailed, deleteBrokerPreferenceSuccess,
  deleteClientTraderPreference,
  deleteCurrencyPairPreference,
  deleteExecutionVenuePreference,
  deleteTermPreference,
  editBrokerOrder,
  editClientTraderPreference,
  initUserData,
  loadPreferences, loadPreferencesFailed, loadPreferencesSuccess,
  loadUser, loadUserFailed, loadUserSuccess,
  changePreference,
  preferencesChangeFailed, preferencesChangeSuccess,
  selectPreferredFirm,
  updateDefaultPreferences, updateDefaultPreferencesAction,
} from '../userActions';

const mockStore = configureMockStore([thunk]);
const dummy = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

let store = {};
let actions = {};

beforeEach(() => {
  store = mockStore();
  actions = store.getActions();
});

afterEach(() => {
  store.clearActions();
});

describe('ACTION', () => {
  test('loadUserSuccess should create a LOAD_USER_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_USER_SUCCESS, user: dummy };
    expect(loadUserSuccess(dummy)).toEqual(expectedAction);
  });

  test('loadUserFailed should create a LOAD_USER_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_USER_FAILED, user: dummy };
    expect(loadUserFailed(dummy)).toEqual(expectedAction);
  });

  test('loadPreferencesSuccess should create a LOAD_PREFERENCES_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_PREFERENCES_SUCCESS, payload: { ...dummy } };
    expect(loadPreferencesSuccess(dummy)).toEqual(expectedAction);
  });

  test('loadPreferencesFailed should create a LOAD_PREFERENCES_FAILED action with correct payload', () => {
    const expectedAction = { type: actionTypes.LOAD_PREFERENCES_FAILED, error: dummy };
    expect(loadPreferencesFailed(dummy)).toEqual(expectedAction);
  });

  test('preferencesChangeSuccess should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: [...dummy] } };
    expect(preferencesChangeSuccess(dummy)).toEqual(expectedAction);
  });

  test('preferencesChangeFailed should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.CHANGE_PREFERENCE_FAILED, error: dummy };
    expect(preferencesChangeFailed(dummy)).toEqual(expectedAction);
  });

  test('deleteBrokerPreferenceSuccess should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.DELETE_BROKER_PREFERENCE_SUCCESS, payload: { ...dummy } };
    expect(deleteBrokerPreferenceSuccess(dummy)).toEqual(expectedAction);
  });

  test('deleteBrokerPreferenceFailed should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.DELETE_BROKER_PREFERENCE_FAILED, error: dummy };
    expect(deleteBrokerPreferenceFailed(dummy)).toEqual(expectedAction);
  });

  test('addClientTraderPreferenceSuccess should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS, payload: dummy };
    expect(addClientTraderPreferenceSuccess(dummy)).toEqual(expectedAction);
  });

  test('addClientTraderPreferenceFailed should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_FAILED, error: dummy };
    expect(addClientTraderPreferenceFailed(dummy)).toEqual(expectedAction);
  });

  test('updateDefaultPreferencesAction should create a CHANGE_PREFERENCE_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_DEFAULTS, newDeal: dummy };
    expect(updateDefaultPreferencesAction(dummy)).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  describe('loadUser', () => {
    test('should call LOAD_USER_SUCCESS with the correct payload, when the call to getUser is successfully resolved', async () => {
      userApi.getUser = jest.fn().mockResolvedValue(dummy[0]);

      store = mockStore();
      await store.dispatch(loadUser());

      expect(userApi.getUser).toBeCalledWith();
      expect(userApi.getUser).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.LOAD_USER_SUCCESS, user: dummy[0] });
    });

    test('should call LOAD_USER_FAILED action when the call to getUser is rejected', async () => {
      userApi.getUser = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(loadUser());

      expect(userApi.getUser).toBeCalledWith();
      expect(userApi.getUser).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.LOAD_USER_FAILED, user: {} });
    });
  });

  describe('loadPreferences', () => {
    test('should call LOAD_PREFERENCES_SUCCESS with the correct payload, when the call to getPreferences is successfully resolved', async () => {
      userApi.getPreferences = jest.fn().mockResolvedValue(dummy);

      store = mockStore();
      await store.dispatch(loadPreferences());

      expect(userApi.getPreferences).toBeCalledWith();
      expect(userApi.getPreferences).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.LOAD_PREFERENCES_SUCCESS, payload: { preferences: { ...dummy }, ...dummy } });
    });

    test('should call LOAD_PREFERENCES_FAILED action when the call to getPreferences is rejected', async () => {
      userApi.getPreferences = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(loadPreferences());

      expect(userApi.getPreferences).toBeCalledWith();
      expect(userApi.getPreferences).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.LOAD_PREFERENCES_FAILED, error: {} });
    });
  });

  describe('addClientTraderPreference', () => {
    describe('should call ADD_CLIENTTRADER_PREFERENCE_SUCCESS with the correct payload', () => {
      test('when selectedPreferenceFirm in state and the call to getPreferences is successfully resolved', async () => {
        userApi.addClientTraderPreference = jest.fn().mockResolvedValue({ preferredBrokers: { ...dummy } });

        store = mockStore({ ui: { selectedPreferenceFirm: 6666 } });
        await store.dispatch(addClientTraderPreference([1111, 2222], [3333, 4444], 5555));

        expect(userApi.addClientTraderPreference).toBeCalledWith([1111, 2222], [3333, 4444], 5555);
        expect(userApi.addClientTraderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual(
          {
            type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
            payload: {
              preferences: { preferredBrokers: { ...dummy } },
              preferredBrokers: { ...dummy },
              brokerDeskIds: [1111, 2222],
              brokerId: 2222,
              deskId: 1111,
              tradingCustomerId: 6666,
            },
          },
        );
      });

      test('when selectedPreferenceFirm not in state and the call to getPreferences is successfully resolved', async () => {
        userApi.addClientTraderPreference = jest.fn().mockResolvedValue({ preferredBrokers: { ...dummy } });

        store = mockStore();
        await store.dispatch(addClientTraderPreference([1111, 2222], [3333, 4444], 5555));

        expect(userApi.addClientTraderPreference).toBeCalledWith([1111, 2222], [3333, 4444], 5555);
        expect(userApi.addClientTraderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual(
          {
            type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
            payload: {
              preferences: { preferredBrokers: { ...dummy } },
              preferredBrokers: { ...dummy },
              brokerDeskIds: [1111, 2222],
              brokerId: 2222,
              deskId: 1111,
              tradingCustomerId: null,
            },
          },
        );
      });

      test('when broker desk ids null and the call to getPreferences is successfully resolved', async () => {
        userApi.addClientTraderPreference = jest.fn().mockResolvedValue({ preferredBrokers: { ...dummy } });

        store = mockStore();
        await store.dispatch(addClientTraderPreference([], [3333, 4444], 5555));

        expect(userApi.addClientTraderPreference).toBeCalledWith([], [3333, 4444], 5555);
        expect(userApi.addClientTraderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual(
          {
            type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
            payload: {
              preferences: { preferredBrokers: { ...dummy } },
              preferredBrokers: { ...dummy },
              brokerDeskIds: [],
              brokerId: null,
              deskId: null,
              tradingCustomerId: null,
            },
          },
        );
      });

      test('when no brokers in resposne and the call to getPreferences is successfully resolved', async () => {
        userApi.addClientTraderPreference = jest.fn().mockResolvedValue({ preferredBrokers: {} });

        store = mockStore({ ui: { selectedPreferenceFirm: 6666 } });
        await store.dispatch(addClientTraderPreference([1111, 2222], [3333, 4444], 5555));

        expect(userApi.addClientTraderPreference).toBeCalledWith([1111, 2222], [3333, 4444], 5555);
        expect(userApi.addClientTraderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual(
          {
            type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
            payload: {
              preferences: { preferredBrokers: {} },
              preferredBrokers: {},
              brokerDeskIds: [1111, 2222],
              brokerId: 2222,
              deskId: 1111,
              tradingCustomerId: 6666,
            },
          },
        );
      });
    });

    test('should call ADD_CLIENTTRADER_PREFERENCE_FAILED action when the call to getPreferences is rejected', async () => {
      userApi.addClientTraderPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(addClientTraderPreference([1111, 2222], [3333, 4444], 5555));

      expect(userApi.addClientTraderPreference).toBeCalledWith([1111, 2222], [3333, 4444], 5555);
      expect(userApi.addClientTraderPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('deleteClientTraderPreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to deleteClientTraderPreference is successfully resolved',
      async () => {
        userApi.deleteClientTraderPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(deleteClientTraderPreference([1111, 2222], { clientData: dummy }));

        expect(userApi.deleteClientTraderPreference).toBeCalledWith([1111, 2222], { clientData: dummy });
        expect(userApi.deleteClientTraderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: [...dummy] } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to deleteClientTraderPreference is rejected', async () => {
      userApi.deleteClientTraderPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(deleteClientTraderPreference([1111, 2222], { clientData: dummy }));

      expect(userApi.deleteClientTraderPreference).toBeCalledWith([1111, 2222], { clientData: dummy });
      expect(userApi.deleteClientTraderPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('editClientTraderPreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to editClientTraderPreference is successfully resolved',
      async () => {
        userApi.editClientTraderPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(editClientTraderPreference([1111, 2222], { clientData: dummy }));

        expect(userApi.editClientTraderPreference).toBeCalledWith([1111, 2222], { clientData: dummy });
        expect(userApi.editClientTraderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: [...dummy] } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to editClientTraderPreference is rejected', async () => {
      userApi.editClientTraderPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(editClientTraderPreference([1111, 2222], { clientData: dummy }));

      expect(userApi.editClientTraderPreference).toBeCalledWith([1111, 2222], { clientData: dummy });
      expect(userApi.editClientTraderPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('deleteBrokerPreference', () => {
    test('should call DELETE_BROKER_PREFERENCE_SUCCESS with the correct payload, when the call to deleteBrokerPreference is successfully resolved',
      async () => {
        userApi.deleteBrokerPreference = jest.fn().mockResolvedValue({ preferredBrokers: { ...dummy } });

        store = mockStore();
        await store.dispatch(deleteBrokerPreference([1111, 2222]));

        expect(userApi.deleteBrokerPreference).toBeCalledWith([1111, 2222]);
        expect(userApi.deleteBrokerPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual(
          {
            type: actionTypes.DELETE_BROKER_PREFERENCE_SUCCESS,
            payload: { preferences: { preferredBrokers: { ...dummy } }, preferredBrokers: { ...dummy } },
          },
        );
      });

    test('should call DELETE_BROKER_PREFERENCE_FAILED action when the call to deleteBrokerPreference is rejected', async () => {
      userApi.deleteBrokerPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(deleteBrokerPreference([1111, 2222]));

      expect(userApi.deleteBrokerPreference).toBeCalledWith([1111, 2222]);
      expect(userApi.deleteBrokerPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.DELETE_BROKER_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('editBrokerOrder', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to editBrokerOrderPreference is successfully resolved',
      async () => {
        userApi.editBrokerOrderPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(editBrokerOrder({ id: 2 }, { id: 3 }, 'FAVTYPE', 1111));

        expect(userApi.editBrokerOrderPreference).toBeCalledWith({ id: 2 }, { id: 3 }, 'FAVTYPE', 1111);
        expect(userApi.editBrokerOrderPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call DELETE_BROKER_PREFERENCE_FAILED action when the call to editBrokerOrderPreference is rejected', async () => {
      userApi.editBrokerOrderPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(editBrokerOrder({ id: 2 }, { id: 3 }, 'FAVTYPE', 1111));

      expect(userApi.editBrokerOrderPreference).toBeCalledWith({ id: 2 }, { id: 3 }, 'FAVTYPE', 1111);
      expect(userApi.editBrokerOrderPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('addCurrencyPairPreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to addCurrencyPairPreference is successfully resolved',
      async () => {
        userApi.addCurrencyPairPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(addCurrencyPairPreference([1111, 2222], 'USD', 'GBP', 'EUR'));

        expect(userApi.addCurrencyPairPreference).toBeCalledWith([1111, 2222], 'USD', 'GBP', 'EUR');
        expect(userApi.addCurrencyPairPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to addCurrencyPairPreference is rejected', async () => {
      userApi.addCurrencyPairPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(addCurrencyPairPreference([1111, 2222], 'USD', 'GBP', 'EUR'));

      expect(userApi.addCurrencyPairPreference).toBeCalledWith([1111, 2222], 'USD', 'GBP', 'EUR');
      expect(userApi.addCurrencyPairPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('deleteCurrencyPairPreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to deleteCurrencyPairPreference is successfully resolved',
      async () => {
        userApi.deleteCurrencyPairPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(deleteCurrencyPairPreference([1111, 2222], ['USD', 'GBP']));

        expect(userApi.deleteCurrencyPairPreference).toBeCalledWith([1111, 2222], ['USD', 'GBP']);
        expect(userApi.deleteCurrencyPairPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to deleteCurrencyPairPreference is rejected', async () => {
      userApi.deleteCurrencyPairPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(deleteCurrencyPairPreference([1111, 2222], ['USD', 'GBP']));

      expect(userApi.deleteCurrencyPairPreference).toBeCalledWith([1111, 2222], ['USD', 'GBP']);
      expect(userApi.deleteCurrencyPairPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('addTermPreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to addTermPreference is successfully resolved',
      async () => {
        userApi.addTermPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(addTermPreference([1111, 2222], 'TERM', '2040-01-01 12:00:00'));

        expect(userApi.addTermPreference).toBeCalledWith([1111, 2222], 'TERM', '2040-01-01 12:00:00');
        expect(userApi.addTermPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to addTermPreference is rejected', async () => {
      userApi.addTermPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(addTermPreference([1111, 2222], 'TERM', '2040-01-01 12:00:00'));

      expect(userApi.addTermPreference).toBeCalledWith([1111, 2222], 'TERM', '2040-01-01 12:00:00');
      expect(userApi.addTermPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('deleteTermPreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to deleteTermPreference is successfully resolved',
      async () => {
        userApi.deleteTermPreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(deleteTermPreference([1111, 2222], 'TERM'));

        expect(userApi.deleteTermPreference).toBeCalledWith([1111, 2222], 'TERM');
        expect(userApi.deleteTermPreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to deleteTermPreference is rejected', async () => {
      userApi.deleteTermPreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(deleteTermPreference([1111, 2222], 'TERM'));

      expect(userApi.deleteTermPreference).toBeCalledWith([1111, 2222], 'TERM');
      expect(userApi.deleteTermPreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('changePreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to modifyUserSettings is successfully resolved',
      async () => {
        userApi.modifyUserSettings = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(changePreference([{ id: 1 }, { id: 2 }]));

        expect(userApi.modifyUserSettings).toBeCalledWith([{ id: 1 }, { id: 2 }]);
        expect(userApi.modifyUserSettings).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to deleteTermPreference is rejected', async () => {
      userApi.modifyUserSettings = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(changePreference([{ id: 1 }, { id: 2 }]));

      expect(userApi.modifyUserSettings).toBeCalledWith([{ id: 1 }, { id: 2 }]);
      expect(userApi.modifyUserSettings).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('addExecutionVenuePreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to addExecutionVenuePreference is successfully resolved',
      async () => {
        userApi.addExecutionVenuePreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(addExecutionVenuePreference([1111, 2222], 'VENUE'));

        expect(userApi.addExecutionVenuePreference).toBeCalledWith([1111, 2222], 'VENUE');
        expect(userApi.addExecutionVenuePreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to addExecutionVenuePreference is rejected', async () => {
      userApi.addExecutionVenuePreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(addExecutionVenuePreference([1111, 2222], 'VENUE'));

      expect(userApi.addExecutionVenuePreference).toBeCalledWith([1111, 2222], 'VENUE');
      expect(userApi.addExecutionVenuePreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('deleteExecutionVenuePreference', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to deleteExecutionVenuePreference is successfully resolved',
      async () => {
        userApi.deleteExecutionVenuePreference = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(deleteExecutionVenuePreference([1111, 2222], 'VENUE'));

        expect(userApi.deleteExecutionVenuePreference).toBeCalledWith([1111, 2222], 'VENUE');
        expect(userApi.deleteExecutionVenuePreference).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to deleteExecutionVenuePreference is rejected', async () => {
      userApi.deleteExecutionVenuePreference = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(deleteExecutionVenuePreference([1111, 2222], 'VENUE'));

      expect(userApi.deleteExecutionVenuePreference).toBeCalledWith([1111, 2222], 'VENUE');
      expect(userApi.deleteExecutionVenuePreference).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('updateDefaultPreferences', () => {
    test('should call CHANGE_PREFERENCE_SUCCESS with the correct payload, when the call to updateDefaults is successfully resolved',
      async () => {
        userApi.updateDefaults = jest.fn().mockResolvedValue(dummy);

        store = mockStore();
        await store.dispatch(updateDefaultPreferences({ id: 1 }));

        expect(userApi.updateDefaults).toBeCalledWith({ id: 1 });
        expect(userApi.updateDefaults).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(1);
        const [act] = actions;

        expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences: dummy } });
      });

    test('should call CHANGE_PREFERENCE_FAILED action when the call to deleteTermPreference is rejected', async () => {
      userApi.updateDefaults = jest.fn().mockRejectedValue({});

      store = mockStore();
      await store.dispatch(updateDefaultPreferences({ id: 1 }));

      expect(userApi.updateDefaults).toBeCalledWith({ id: 1 });
      expect(userApi.updateDefaults).toHaveBeenCalledTimes(1);

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_PREFERENCE_FAILED, error: {} });
    });
  });

  describe('initUserData', () => {
    test('should call dispatch the correct actions',
      async () => {
        userApi.getPreferences = jest.fn().mockResolvedValue(dummy);
        userApi.getUser = jest.fn().mockResolvedValue(dummy[0]);

        store = mockStore();
        await store.dispatch(initUserData());

        expect(userApi.getPreferences).toBeCalledWith();
        expect(userApi.getPreferences).toHaveBeenCalledTimes(1);

        expect(userApi.getUser).toBeCalledWith();
        expect(userApi.getUser).toHaveBeenCalledTimes(1);

        actions = store.getActions();
        expect(actions.length).toEqual(2);
        const [act1, act2] = actions;

        expect(act1).toEqual({ type: actionTypes.LOAD_PREFERENCES_SUCCESS, payload: { preferences: { ...dummy }, ...dummy } });
        expect(act2).toEqual({ type: actionTypes.LOAD_USER_SUCCESS, user: dummy[0] });
      });
  });

  describe('selectPreferredFirm', () => {
    test('should call SELECT_PREFERRED_FIRM_COMPLETE with the correct payload when brokers in state', async () => {
      const preferredBrokers = [{ id: 1 }, { id: 2 }];

      store = mockStore({ user: { preferences: { preferredBrokers } } });
      await store.dispatch(selectPreferredFirm({ tradingCustomerCodeLocationCode: 'ABC' }, [1111, 2222]));

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({
        type: actionTypes.SELECT_PREFERRED_FIRM_COMPLETE,
        payload: {
          preferredBrokers, brokerId: 2222, tradingCustomerCodeLocationCode: 'ABC', deskId: 1111,
        },
      });
    });

    test('should call SELECT_PREFERRED_FIRM_COMPLETE with the correct payload when brokers not in state', async () => {
      store = mockStore();
      await store.dispatch(selectPreferredFirm({ tradingCustomerCodeLocationCode: 'ABC' }, [1111, 2222]));

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({
        type: actionTypes.SELECT_PREFERRED_FIRM_COMPLETE,
        payload: {
          preferredBrokers: undefined, brokerId: 2222, tradingCustomerCodeLocationCode: 'ABC', deskId: 1111,
        },
      });
    });
  });
});
