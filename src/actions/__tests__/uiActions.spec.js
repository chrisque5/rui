import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { actionTypes } from '../../utils/constants';

import {
  changeClientHoverData, changeClientHoverDataSuccess,
  changeCounterPartySelection, changeCounterPartySelectionAction,
  changeDealType, changeDealTypeAction,
  changeLastTermSelection, changeLastTermSelectionAction,
  changeSelectedPreferenceBroker, changeSelectedPreferenceBrokerAction,
  changeStrategyType, changeStrategyTypeAction,
  changeTermValues, changeTermValuesAction,
  enableInterest, enableInterestAction,
  resetUiState, resetUiStateAction,
  toggleChangeFavoritesColourPopup, toggleChangeFavoritesColourPopupAction,
  toggleRenameFavoritesPopup, toggleRenameFavoritesPopupAction,
  toggleSettingsModal, toggleSettingsModalAction,
  toggleThirdCP, toggleThirdCPAction,
  toggleTradeDateSubmitPopup, toggleTradeDateSubmitPopupAction,
} from '../uiActions';

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
  test('changeCounterPartySelectionAction should create a UPDATE_COUNTERPARTY_SELECTION action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_COUNTERPARTY_SELECTION, selectedRow: dummy };
    expect(changeCounterPartySelectionAction(dummy)).toEqual(expectedAction);
  });

  test('changeSelectedPreferenceBrokerAction should create a UPDATE_PREFERENCE_BROKER_SELECTION action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_PREFERENCE_BROKER_SELECTION, payload: dummy };
    expect(changeSelectedPreferenceBrokerAction(dummy)).toEqual(expectedAction);
  });

  test('changeLastTermSelectionAction should create a UPDATE_LAST_TERM_SELECTION action with correct payload', () => {
    const expectedAction = { type: actionTypes.UPDATE_LAST_TERM_SELECTION, selectedTermId: dummy };
    expect(changeLastTermSelectionAction(dummy)).toEqual(expectedAction);
  });

  test('changeTermValuesAction should create a CHANGE_TERMS action with correct payload', () => {
    const expectedAction = { type: actionTypes.CHANGE_TERMS, terms: dummy };
    expect(changeTermValuesAction(dummy)).toEqual(expectedAction);
  });

  test('changeStrategyTypeAction should create a CHANGE_STRATEGY action with correct payload', () => {
    const expectedAction = { type: actionTypes.CHANGE_STRATEGY, strategy: dummy };
    expect(changeStrategyTypeAction(dummy)).toEqual(expectedAction);
  });

  test('changeDealTypeAction should create a CHANGE_DEALTYPE action with correct payload', () => {
  // dealType },
    const expectedAction = { type: actionTypes.CHANGE_DEALTYPE, dealType: dummy };
    expect(changeDealTypeAction(dummy)).toEqual(expectedAction);
  });

  test('resetUiStateAction should create a RESET_UI_STATE action', () => {
    const expectedAction = { type: actionTypes.RESET_UI_STATE };
    expect(resetUiStateAction()).toEqual(expectedAction);
  });

  test('changeClientHoverDataSuccess should create a CHANGE_CLIENT_HOVER_DATA_SUCCESS action with correct payload', () => {
    const expectedAction = { type: actionTypes.CHANGE_CLIENT_HOVER_DATA_SUCCESS, selectedClientData: dummy, clients: dummy };
    expect(changeClientHoverDataSuccess(dummy, dummy)).toEqual(expectedAction);
  });

  test('toggleThirdCPAction should create a TOGGLE_THIRD_CP action with correct payload', () => {
    const expectedAction = { type: actionTypes.TOGGLE_THIRD_CP, value: true };
    expect(toggleThirdCPAction(true)).toEqual(expectedAction);
  });

  test('toggleSettingsModalAction should create a TOGGLE_SETTINGS_MODAL action', () => {
    const expectedAction = { type: actionTypes.TOGGLE_SETTINGS_MODAL };
    expect(toggleSettingsModalAction()).toEqual(expectedAction);
  });

  test('toggleRenameFavoritesPopupAction should create a TOGGLE_RENAME_FAVORITES_POPUP action with correct payload', () => {
    const expectedAction = { type: actionTypes.TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem: dummy };
    expect(toggleRenameFavoritesPopupAction(dummy)).toEqual(expectedAction);
  });

  test('toggleChangeFavoritesColourPopupAction should create a TOGGLE_CHANGE_FAVORITES_COLOUR action with correct payload', () => {
    const expectedAction = { type: actionTypes.TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem: dummy };
    expect(toggleChangeFavoritesColourPopupAction(dummy)).toEqual(expectedAction);
  });

  test('enableInterestAction should create a ENABLE_INTEREST action with correct payload', () => {
    const expectedAction = { type: actionTypes.ENABLE_INTEREST, value: true };
    expect(enableInterestAction(true)).toEqual(expectedAction);
  });

  test('toggleTradeDateSubmitPopupAction should create a TOGGLE_TRADE_DATE_CONFIRM_POPUP action with correct payload', () => {
    const expectedAction = { type: actionTypes.TOGGLE_TRADE_DATE_CONFIRM_POPUP, payload: { isVisible: true } };
    expect(toggleTradeDateSubmitPopupAction(true)).toEqual(expectedAction);
  });
});

describe('ACTION CREATOR', () => {
  test('changeCounterPartySelection should call UPDATE_COUNTERPARTY_SELECTION with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(changeCounterPartySelection(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.UPDATE_COUNTERPARTY_SELECTION, selectedRow: dummy });
  });

  describe('changeSelectedPreferenceBroker', () => {
    test('with default state, should call UPDATE_PREFERENCE_BROKER_SELECTION with the correct payload', async () => {
      store = mockStore();
      await store.dispatch(changeSelectedPreferenceBroker('1111,2222'));

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      const payload = {
        brokerId: '2222',
        deskId: '1111',
        preferredBrokers: undefined,
      };

      expect(act).toEqual({ type: actionTypes.UPDATE_PREFERENCE_BROKER_SELECTION, payload });
    });

    test('with non-default state should call UPDATE_PREFERENCE_BROKER_SELECTION with the correct payload', async () => {
      const state = {
        user: {
          preferences: {
            preferredBrokers: [{ id: 1 }, { id: 2 }],
          },
        },
      };

      store = mockStore(state);
      await store.dispatch(changeSelectedPreferenceBroker('1111,2222'));

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      const payload = {
        brokerId: '2222',
        deskId: '1111',
        preferredBrokers: [{ id: 1 }, { id: 2 }],
      };

      expect(act).toEqual({ type: actionTypes.UPDATE_PREFERENCE_BROKER_SELECTION, payload });
    });
  });

  test('changeLastTermSelection should call UPDATE_LAST_TERM_SELECTION with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(changeLastTermSelection(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.UPDATE_LAST_TERM_SELECTION, selectedTermId: dummy });
  });

  test('changeTermValues should call CHANGE_TERMS with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(changeTermValues(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.CHANGE_TERMS, terms: dummy });
  });

  test('changeStrategyType should call CHANGE_STRATEGY with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(changeStrategyType(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.CHANGE_STRATEGY, strategy: dummy });
  });

  test('changeDealType should call CHANGE_DEALTYPE with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(changeDealType(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.CHANGE_DEALTYPE, dealType: dummy });
  });

  test('resetUiState should call RESET_UI_STATE with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(resetUiState());

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.RESET_UI_STATE });
  });

  describe('changeClientHoverData', () => {
    test('with default state, should call CHANGE_CLIENT_HOVER_DATA_SUCCESS with the correct payload', async () => {
      store = mockStore({ clients: [] });
      await store.dispatch(changeClientHoverData(dummy));

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({ type: actionTypes.CHANGE_CLIENT_HOVER_DATA_SUCCESS, selectedClientData: dummy, clients: [] });
    });

    test('with non-default state, should call CHANGE_CLIENT_HOVER_DATA_SUCCESS with the correct payload', async () => {
      const state = { clients: [{ id: 11 }, { id: 21 }, { id: 31 }] };

      store = mockStore(state);
      await store.dispatch(changeClientHoverData(dummy));

      actions = store.getActions();
      expect(actions.length).toEqual(1);
      const [act] = actions;

      expect(act).toEqual({
        type: actionTypes.CHANGE_CLIENT_HOVER_DATA_SUCCESS,
        selectedClientData: dummy,
        clients: [{ id: 11 }, { id: 21 }, { id: 31 }],
      });
    });
  });

  test('toggleThirdCP should call UPDATE_COUNTERPARTY_SELECTION with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(toggleThirdCP(true));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.TOGGLE_THIRD_CP, value: true });
  });

  test('toggleSettingsModal should call TOGGLE_SETTINGS_MODAL with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(toggleSettingsModal());

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.TOGGLE_SETTINGS_MODAL });
  });

  test('toggleRenameFavoritesPopup should call TOGGLE_RENAME_FAVORITES_POPUP with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(toggleRenameFavoritesPopup(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem: dummy });
  });

  test('toggleChangeFavoritesColourPopup should call TOGGLE_CHANGE_FAVORITES_COLOUR with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(toggleChangeFavoritesColourPopup(dummy));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem: dummy });
  });

  test('enableInterest should call ENABLE_INTEREST with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(enableInterest(true));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.ENABLE_INTEREST, value: true });
  });

  test('toggleTradeDateSubmitPopup should call TOGGLE_TRADE_DATE_CONFIRM_POPUP with the correct payload', async () => {
    store = mockStore();
    await store.dispatch(toggleTradeDateSubmitPopup(true));

    actions = store.getActions();
    expect(actions.length).toEqual(1);
    const [act] = actions;

    expect(act).toEqual({ type: actionTypes.TOGGLE_TRADE_DATE_CONFIRM_POPUP, payload: { isVisible: true } });
  });
});
