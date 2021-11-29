import { actionTypes } from '../utils/constants';

export function changeCounterPartySelectionAction(selectedRow) {
  return { type: actionTypes.UPDATE_COUNTERPARTY_SELECTION, selectedRow };
}

export function changeCounterPartySelection(selectedRow) {
  return (dispatch) => dispatch(changeCounterPartySelectionAction(selectedRow));
}

export function changeSelectedPreferenceBrokerAction(payload) {
  return { type: actionTypes.UPDATE_PREFERENCE_BROKER_SELECTION, payload };
}

export function changeSelectedPreferenceBroker(brokerDeskKey) {
  return (dispatch, getState) => {
    const state = getState();
    const { user: { preferences: { preferredBrokers } = {} } = {} } = state;
    const [deskId, brokerId] = brokerDeskKey.split(',');

    const payload = {
      preferredBrokers, brokerId, deskId,
    };

    dispatch(changeSelectedPreferenceBrokerAction(payload));
  };
}

export function changeLastTermSelectionAction(selectedTermId) {
  return { type: actionTypes.UPDATE_LAST_TERM_SELECTION, selectedTermId };
}

export function changeLastTermSelection(selectedTermId) {
  return (dispatch) => dispatch(changeLastTermSelectionAction(selectedTermId));
}

export function changeTermValuesAction(terms) {
  return { type: actionTypes.CHANGE_TERMS, terms };
}

export function changeTermValues(terms) {
  return (dispatch) => dispatch(changeTermValuesAction(terms));
}

export function changeStrategyTypeAction(strategy) {
  return { type: actionTypes.CHANGE_STRATEGY, strategy };
}

export function changeStrategyType(strategy) {
  return (dispatch) => dispatch(changeStrategyTypeAction(strategy));
}

export function changeDealTypeAction(dealType) {
  return { type: actionTypes.CHANGE_DEALTYPE, dealType };
}

export function changeDealType(dealType) {
  return (dispatch) => dispatch(changeDealTypeAction(dealType));
}

export function changePageAction(currentPage) {
  return { type: actionTypes.CHANGE_PAGE, currentPage };
}

export function changePage(currentPage) {
  return (dispatch) => dispatch(changePageAction(currentPage));
}

export function resetUiStateAction() {
  return { type: actionTypes.RESET_UI_STATE };
}

export function resetUiState() {
  return (dispatch) => dispatch(resetUiStateAction());
}

export function changeClientHoverDataSuccess(selectedClientData, clients) {
  return {
    type: actionTypes.CHANGE_CLIENT_HOVER_DATA_SUCCESS,
    selectedClientData,
    clients,
  };
}

export function changeClientHoverData(selectedClientData) {
  return (dispatch, getState) => {
    const { clients } = getState();
    dispatch(changeClientHoverDataSuccess(selectedClientData, clients));
  };
}

export function toggleThirdCPAction(value) {
  return { type: actionTypes.TOGGLE_THIRD_CP, value };
}

export function toggleThirdCP(value) {
  return (dispatch) => dispatch(toggleThirdCPAction(value));
}

export function toggleSettingsModalAction() {
  return { type: actionTypes.TOGGLE_SETTINGS_MODAL };
}

export function toggleSettingsModal() {
  return (dispatch) => dispatch(toggleSettingsModalAction());
}

export function toggleRenameFavoritesPopupAction(selectedFavItem) {
  return { type: actionTypes.TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem };
}

export function toggleRenameFavoritesPopup(selectedFavItem) {
  return (dispatch) => dispatch(toggleRenameFavoritesPopupAction(selectedFavItem));
}

export function toggleChangeFavoritesColourPopupAction(selectedFavItem) {
  return { type: actionTypes.TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem };
}

export function toggleChangeFavoritesColourPopup(selectedFavItem) {
  return (dispatch) => dispatch(toggleChangeFavoritesColourPopupAction(selectedFavItem));
}

export function enableInterestAction(value) {
  return { type: actionTypes.ENABLE_INTEREST, value };
}

export function enableInterest(value) {
  return (dispatch) => dispatch(enableInterestAction(value));
}

export function toggleTradeDateSubmitPopupAction(isVisible) {
  return { type: actionTypes.TOGGLE_TRADE_DATE_CONFIRM_POPUP, payload: { isVisible } };
}

export function toggleTradeDateSubmitPopup(isVisible) {
  return (dispatch) => dispatch(toggleTradeDateSubmitPopupAction(isVisible));
}

export function toggleIsTradeDateEnabledAction(isTradeDateEnabled) {
  return { type: actionTypes.TOGGLE_IS_TRADE_DATE_ENABLED, payload: { isTradeDateEnabled } };
}

export function toggleIsTradeDateEnabled(isTradeDateEnabled) {
  return (dispatch) => dispatch(toggleIsTradeDateEnabledAction(isTradeDateEnabled));
}

export function updateBlotterGridDetails(blotterGridUpdates) {
  return {
    type: actionTypes.UPDATE_BLOTTER_GRID_DETAILS,
    blotterGridUpdates,
  };
}

export function toggleIsClsOverrideAction(isClsOverride) {
  return { type: actionTypes.TOGGLE_IS_CLS_OVERRIDE, payload: { isClsOverride } };
}

export function toggleIsClsOverride(isClsOverride) {
  return (dispatch) => dispatch(toggleIsClsOverrideAction(isClsOverride));
}

export function resetAdminTabChangesAction(reset) {
  return { type: actionTypes.RESET_ADMIN_TAB_CHANGES, reset };
}

export function resetAdminTabChanges(reset) {
  return (dispatch) => dispatch(resetAdminTabChangesAction(reset));
}

export function enableBrowserForceRefreshAction(isBrowserForceRefreshEnabled) {
  return { type: actionTypes.ENABLE_BROWSER_FORCE_REFRESH, isBrowserForceRefreshEnabled };
}

export function enableBrowserForceRefresh(isBrowserForceRefreshEnabled) {
  return (dispatch) => dispatch(enableBrowserForceRefreshAction(isBrowserForceRefreshEnabled));
}

export function resetBlotterSearchAction(reset) {
  return { type: actionTypes.RESET_BLOTTER_SEARCH, reset };
}

export function resetBlotterSearch(reset) {
  return (dispatch) => dispatch(resetBlotterSearchAction(reset));
}

export function changeDealEditStatusAction(isDealEditInProgress) {
  return { type: actionTypes.CHANGE_DEAL_EDIT_STATUS, isDealEditInProgress };
}

export function changeDealEditStatus(isDealEditInProgress) {
  return (dispatch) => dispatch(changeDealEditStatusAction(isDealEditInProgress));
}

export function changeReAllocationAction(reAllocationSide) {
  return { type: actionTypes.CHANGE_RE_ALLOCATION_SIDE, reAllocationSide };
}

export function changeReAllocation(reAllocationSide) {
  return (dispatch) => dispatch(changeReAllocationAction(reAllocationSide));
}

export function updateDealObjectAction(updatedDealObject) {
  return { type: actionTypes.UPDATE_DEAL_OBJECT, updatedDealObject };
}

export function updateDealObject(updatedDealObject) {
  return (dispatch) => dispatch(updateDealObjectAction(updatedDealObject));
}
