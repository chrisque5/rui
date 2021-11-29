import { actionTypes } from '../utils/constants';
import userApi from '../api/userApi';

export function loadUserSuccess(user) {
  return { type: actionTypes.LOAD_USER_SUCCESS, user };
}

export function loadUserFailed(user) {
  return { type: actionTypes.LOAD_USER_FAILED, user };
}

export function loadUser() {
  return ((dispatch) => userApi.getUser()
    .then((response) => dispatch(loadUserSuccess(response)))
    .catch((error) => dispatch(loadUserFailed(error)))
  );
}

export function loadPreferencesSuccess(preferences) {
  return { type: actionTypes.LOAD_PREFERENCES_SUCCESS, payload: { ...preferences } };
}

export function loadPreferencesFailed(error) {
  return { type: actionTypes.LOAD_PREFERENCES_FAILED, error };
}

export function loadPreferences() {
  return ((dispatch) => userApi.getPreferences()
    .then((response) => dispatch(loadPreferencesSuccess({ preferences: { ...response }, ...response })))
    .catch((error) => dispatch(loadPreferencesFailed(error)))
  );
}

export function preferencesChangeSuccess(preferences) {
  return { type: actionTypes.CHANGE_PREFERENCE_SUCCESS, payload: { preferences } };
}

export function preferencesChangeFailed(error) {
  return { type: actionTypes.CHANGE_PREFERENCE_FAILED, error };
}

export function deleteBrokerPreferenceSuccess(preferences) {
  return { type: actionTypes.DELETE_BROKER_PREFERENCE_SUCCESS, payload: { ...preferences } };
}

export function deleteBrokerPreferenceFailed(error) {
  return { type: actionTypes.DELETE_BROKER_PREFERENCE_FAILED, error };
}

export function addClientTraderPreferenceSuccess(payload) {
  return { type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS, payload };
}

export function addClientTraderPreferenceFailed(error) {
  return { type: actionTypes.ADD_CLIENTTRADER_PREFERENCE_FAILED, error };
}

export function updateDefaultPreferencesAction(newDeal) {
  return { type: actionTypes.UPDATE_DEFAULTS, newDeal };
}

export function addClientTraderPreference(brokerDeskIds, clientTraderIds, agentId) {
  return async (dispatch, getState) => {
    try {
      const response = await userApi.addClientTraderPreference(brokerDeskIds, clientTraderIds, agentId);

      const state = getState();
      const { ui = {} } = state;
      const { selectedPreferenceFirm = null } = ui;
      const { preferredBrokers = [] } = response;
      const [deskId = null, id = null] = brokerDeskIds;

      const payload = {
        preferences: response, brokerDeskIds, preferredBrokers, brokerId: id, deskId, tradingCustomerId: selectedPreferenceFirm,
      };

      return dispatch(addClientTraderPreferenceSuccess(payload));
    } catch (error) {
      return dispatch(addClientTraderPreferenceFailed(error));
    }
  };
}

export function deleteClientTraderPreference(brokerDeskIds, clientData) {
  return ((dispatch) => userApi.deleteClientTraderPreference(brokerDeskIds, clientData)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function editClientTraderPreference(brokerDeskIds, clientTraderId) {
  return ((dispatch) => userApi.editClientTraderPreference(brokerDeskIds, clientTraderId)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function deleteBrokerPreference(brokerDeskIds) {
  return ((dispatch) => userApi.deleteBrokerPreference(brokerDeskIds)
    .then((response) => dispatch(deleteBrokerPreferenceSuccess({ preferences: { ...response }, ...response })))
    .catch((error) => dispatch(deleteBrokerPreferenceFailed(error)))
  );
}

export function editBrokerOrder(newOrder, existingOrder, favType, selectedBroker) {
  return ((dispatch) => userApi.editBrokerOrderPreference(
    newOrder, existingOrder, favType, selectedBroker,
  ).then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function addCurrencyPairPreference(brokerDeskIds, currency1, currency2, dealtCurrency) {
  return ((dispatch) => userApi.addCurrencyPairPreference(brokerDeskIds, currency1, currency2, dealtCurrency)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function deleteCurrencyPairPreference(brokerDeskIds, currencyPair) {
  return ((dispatch) => userApi.deleteCurrencyPairPreference(brokerDeskIds, currencyPair)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function addTermPreference(brokerDeskIds, term, valueDate) {
  return ((dispatch) => userApi.addTermPreference(brokerDeskIds, term, valueDate)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function deleteTermPreference(brokerDeskIds, term) {
  return ((dispatch) => userApi.deleteTermPreference(brokerDeskIds, term)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function changePreference(newSettings) {
  return ((dispatch) => userApi.modifyUserSettings(newSettings)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function addExecutionVenuePreference(brokerDeskIds, executionVenue) {
  return ((dispatch) => userApi.addExecutionVenuePreference(brokerDeskIds, executionVenue)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function deleteExecutionVenuePreference(brokerDeskIds, executionVenue) {
  return ((dispatch) => userApi.deleteExecutionVenuePreference(brokerDeskIds, executionVenue)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function updateDefaultPreferences(newDeal) {
  return ((dispatch) => userApi.updateDefaults(newDeal)
    .then((response) => dispatch(preferencesChangeSuccess(response)))
    .catch((error) => dispatch(preferencesChangeFailed(error)))
  );
}

export function initUserData() {
  return (dispatch) => dispatch(loadPreferences()).then(() => dispatch(loadUser()));
}

/**
 * When a firm has been selected, load the clients for that firm
 */
export function selectPreferredFirmComplete(payload) {
  return { type: actionTypes.SELECT_PREFERRED_FIRM_COMPLETE, payload };
}

export function selectPreferredFirm(selectedFirm = {}, brokerDeskIds) {
  return (dispatch, getState) => {
    const state = getState();
    const { user: { preferences: { preferredBrokers } = {} } = {} } = state;
    const [deskId, brokerId] = brokerDeskIds;
    const { tradingCustomerCodeLocationCode } = selectedFirm;

    const payload = {
      preferredBrokers, brokerId, deskId, tradingCustomerCodeLocationCode,
    };

    dispatch(selectPreferredFirmComplete(payload));
  };
}
