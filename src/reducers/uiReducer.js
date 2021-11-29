/* eslint-disable no-case-declarations */
import initialState from './initialState';
import { actionTypes } from '../utils/constants';
import { transformPreferences } from '../utils/transformers/index';

/**
 * UI Reducer
 *
 * @param {object} state the state
 * @param {object} action the action that executed
 */
export default function uiReducer(state = initialState.userInterface, action) {
  switch (action.type) {
    case actionTypes.UPDATE_COUNTERPARTY_SELECTION:
      return { ...state, selectedTradeSide: action.selectedRow };
    case actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS:
    case actionTypes.LOAD_PREFERENCES_SUCCESS:
    case actionTypes.UPDATE_PREFERENCE_BROKER_SELECTION:
    case actionTypes.DELETE_BROKER_PREFERENCE_SUCCESS:
    case actionTypes.SELECT_PREFERRED_FIRM_COMPLETE: {
      return {
        ...state,
        ...transformPreferences(action.payload),
      };
    }
    case actionTypes.CHANGE_PREFERENCE_SUCCESS: {
      const { payload } = action;
      const { preferences: { preferredBrokers = [], settings = {} } } = payload;
      const { selectedPreferenceBroker = {}, selectedPreferenceFirm = null } = state;
      const [deskId, brokerId] = selectedPreferenceBroker.split(',');

      let tradingCustomerCodeLocationCode = selectedPreferenceFirm;
      // if the display client id false don't set the selected firm
      if (tradingCustomerCodeLocationCode !== null && settings.displayClients !== null && !settings.displayClients) {
        tradingCustomerCodeLocationCode = null;
      }

      return {
        ...state,
        ...transformPreferences({
          preferredBrokers, brokerId, deskId, tradingCustomerCodeLocationCode,
        }),
      };
    }
    case actionTypes.UPDATE_LAST_TERM_SELECTION:
      return { ...state, lastSetTerm: action.selectedTermId };
    case actionTypes.CHANGE_TERMS:
      return { ...state, termValues: { ...state.termValues, ...action.terms } };
    case actionTypes.CHANGE_DEALTYPE:
      return { ...state, selectedDealType: action.dealType };
    case actionTypes.CHANGE_PAGE:
      return { ...state, currentPage: action.currentPage };
    case actionTypes.CHANGE_STRATEGY:
      return { ...state, selectedStrategyType: action.strategy };
    case actionTypes.RESET_UI_STATE:
      return {
        ...state,
        isThirdCPChecked: false,
        isInterestEnabled: false,
        selectedTradeSide: 'buyer',
        lastSetTerm: '',
        termValues: {},
        clientHoverInfo: {},
        isTradeDateEnabled: false,
      };
    case actionTypes.CHANGE_CLIENT_HOVER_DATA_SUCCESS:
      const side = action.selectedClientData.side ? action.selectedClientData.side : state.selectedTradeSide;
      if (action.selectedClientData === null) {
        return { ...state, clientHoverInfo: { ...state.clientHoverInfo, [side]: null } };
      }
      let matchedClient = {
        ...action.clients.find((client) => client.tradingCustomerId === Number(action.selectedClientData.tradingCustomerId)),
      };
      if (matchedClient && matchedClient.traders) {
        matchedClient.traders = matchedClient.traders.filter(
          (trader) => trader.executingCustomerId === Number(action.selectedClientData.executingCustomerId)
            && trader.traderPostingId === Number(action.selectedClientData.traderPostingId),
        );
      } else {
        matchedClient = null;
      }
      return { ...state, clientHoverInfo: { ...state.clientHoverInfo, [side]: matchedClient } };
    case actionTypes.TOGGLE_THIRD_CP:
      return { ...state, isThirdCPChecked: action.value };
    case actionTypes.TOGGLE_SETTINGS_MODAL:
      return {
        ...state,
        isSettingsModalVisible: !state.isSettingsModalVisible,
      };
    case actionTypes.TOGGLE_RENAME_FAVORITES_POPUP:
      return {
        ...state,
        selectedFavItem: action.selectedFavItem,
        isFavRenamePopupVisible: !state.isFavRenamePopupVisible,
      };
    case actionTypes.TOGGLE_CHANGE_FAVORITES_COLOUR:
      return {
        ...state,
        selectedFavItem: action.selectedFavItem,
        isColourChangePopUpVisible: !state.isColourChangePopUpVisible,
      };
    case actionTypes.ENABLE_INTEREST:
      return { ...state, isInterestEnabled: action.value };
    case actionTypes.TOGGLE_TRADE_DATE_CONFIRM_POPUP:
      return { ...state, isTradeDateConfirmModalVisible: action.payload.isVisible };
    case actionTypes.TOGGLE_IS_TRADE_DATE_ENABLED:
      return { ...state, isTradeDateEnabled: action.payload.isTradeDateEnabled };
    case actionTypes.UPDATE_BLOTTER_GRID_DETAILS:
      return { ...state, blotterGridUpdates: action.blotterGridUpdates };
    case actionTypes.TOGGLE_IS_CLS_OVERRIDE:
      return { ...state, isClsOverride: action.payload.isClsOverride };
    case actionTypes.RESET_ADMIN_TAB_CHANGES:
      return {
        ...state,
        resetAdminTabChanges: action.reset,
      };
    case actionTypes.ENABLE_BROWSER_FORCE_REFRESH:
      return { ...state, isBrowserForceRefreshEnabled: action.isBrowserForceRefreshEnabled };
    case actionTypes.RESET_BLOTTER_SEARCH:
      return { ...state, resetBlotterSearch: action.reset };
    case actionTypes.CHANGE_DEAL_EDIT_STATUS:
      return { ...state, isDealEditInProgress: action.isDealEditInProgress };
    case actionTypes.CHANGE_RE_ALLOCATION_SIDE:
      return { ...state, reAllocationSide: action.reAllocationSide };
    case actionTypes.UPDATE_DEAL_OBJECT:
      return { ...state, updatedDealObject: action.updatedDealObject };
    default:
      return state;
  }
}
