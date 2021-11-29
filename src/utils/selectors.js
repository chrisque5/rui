/**
 * user
 */
export const getUser = (state) => state.user || {};
export const getUserFullName = (state) => getUser(state).fullName || '';
export const getUserDeskId = (state) => getUser(state).deskId || null;
export const getUserPreferences = (state) => getUser(state).preferences || {};
export const getUserPreferenceSettings = (state) => getUserPreferences(state).settings || {};
export const getUserPreferenceSettingsRatesFeed = (state) => getUserPreferenceSettings(state).ratesFeed || false;
export const getUserPreferenceSettingsClsDefaults = (state) => {
  const { displayClsDefaults = true } = getUserPreferenceSettings(state) || {};
  return displayClsDefaults;
};
export const getUserPreferencesDefaults = (state) => getUserPreferences(state).defaults || {};
export const getLastDealType = (state) => getUserPreferencesDefaults(state).lastDealType || '';
export const getUserPermissions = (state) => getUser(state).permissions || {};

/**
 * ui
 */
export const getUi = (state) => state.ui || {};
export const getIsSettingsModalVisible = (state) => getUi(state).isSettingsModalVisible || false;
export const getIsTradeDateSubmitModalVisible = (state) => getUi(state).isTradeDateConfirmModalVisible || false;
export const getIsTradeDateEnabled = (state) => getUi(state).isTradeDateEnabled || false;
export const getIsClsOverride = (state) => getUi(state).isClsOverride || false;
export const getSelectedDealType = (state) => getUi(state).selectedDealType || '';
export const getSelectedStrategyType = (state) => getUi(state).selectedStrategyType || '';
export const getCurrentPage = (state) => getUi(state).currentPage || '';

export const getBlotterGridUpdates = (state) => getUi(state).blotterGridUpdates || {};
export const getResetAdminTabChanges = (state) => getUi(state).resetAdminTabChanges || false;
export const getIsBrowserForceRefreshEnabled = (state) => getUi(state).isBrowserForceRefreshEnabled || false;
export const getResetBlotterSearch = (state) => getUi(state).resetBlotterSearch || false;
export const getIsDealEditInProgress = (state) => getUi(state).isDealEditInProgress || false;
export const getReAllocationSide = (state) => getUi(state).reAllocationSide || '';
export const getUpdatedDealObject = (state) => getUi(state).updatedDealObject || {};

/**
 * brokers
 */
export const getBrokers = (state) => state.brokers || [];

/**
 * desks
 */
export const getDesks = (state) => state.desks || [];

/**
 * gcdBrokers
 */
export const getGcdBrokers = (state) => state.gcdBrokers || [];

/**
 * gcdBrokers
 */
export const getBrokerUpdateStatus = (state) => state.brokerUpdateStatus || false;

/**
 * currencies
 */
export const getCurrencies = (state) => state.currencies || [];

/**
 * dates
 */
export const getDates = (state) => state.dates || {};
export const getIsDateResponsePending = (state) => getDates(state).isDateResponsePending || false;

/**
 * rates
 */
export const getRates = (state) => state.rates || {};
export const getIsRateResponsePending = (state) => getRates(state).isRateResponsePending || false;

/**
 * blotter
 */
export const getBlotter = (state) => state.blotter || {};
export const getBlotterDeals = (state) => getBlotter(state).data || [];
export const getBlotterIsDataLoading = (state) => getBlotter(state).isDataLoading || false;
export const getBlotterLastUpdated = (state) => getBlotter(state).lastUpdated || null;
export const getBlotterInsertedDealIds = (state) => getBlotter(state).insertedDealIds || [];
export const getRtuBlotterCount = (state) => getBlotter(state).rtuBlotterCount || '';
export const getBlotterSearchParams = (state) => getBlotter(state).searchParams || {};

/**
 * System Settings
 */

export const getSystemSettings = (state) => state.systemSettings || {};
export const getDateRangeLimit = (state) => getSystemSettings(state).blotterSearchDateRangeLimit || '365';
export const getLicenseKey = (state) => getSystemSettings(state).licenseKey || '';

/**
 * SSE
 */
export const getSSE = (state) => state.sse || {};
export const getSSEStatus = (state) => getSSE(state).status || '';
export const getSSESessionId = (state) => getSSE(state).sessionId || null;

/**
 * Broker Strategies
 */
export const getBrokerageStrategies = (state) => state.brokerageStrategies || [];

export const getDeal = (state) => state.deal || {};
export const getOriginalDeal = (state) => state.originalDeal || null;
export const getBuyerPrimaryBroker = (state) => ((getDeal(state).trades && getDeal(state).trades[0]) ? {
  brokerGcdPostingId: getDeal(state).trades[0].tradeEconomics.payer.brokerGcdPostingId,
  brokerGcdPostingName: getDeal(state).trades[0].tradeEconomics.payer.brokerGcdPostingName,
} : {});
export const getBuyerBrokerage = (state) => (getDeal(state).trades[0] ? getDeal(state).trades[0].tradeEconomics.payer.brokerage : {});

export const getSellerPrimaryBroker = (state) => ((getDeal(state).trades && getDeal(state).trades[0]) ? {
  brokerGcdPostingId: getDeal(state).trades[0].tradeEconomics.receiver.brokerGcdPostingId,
  brokerGcdPostingName: getDeal(state).trades[0].tradeEconomics.receiver.brokerGcdPostingName,
} : {});
export const getSellerBrokerage = (state) => (getDeal(state).trades[0] ? getDeal(state).trades[0].tradeEconomics.receiver.brokerage : {});
export const getOriginalBuyerBrokerage = (state) => (getOriginalDeal(state) ? getOriginalDeal(state).trades[0].tradeEconomics.payer.brokerage : {});
export const getOriginalSellerBrokerage = (state) => (getOriginalDeal(state)
  ? getOriginalDeal(state).trades[0].tradeEconomics.receiver.brokerage : {});
