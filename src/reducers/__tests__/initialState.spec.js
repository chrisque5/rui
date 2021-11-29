import initialState from '../initialState';

const {
  currencies, dates, rates, clients, brokers, agents, executionVenues, deal,
  userInterface, user, blotter, sse, systemSettings, brokerageStrategies, originalDeal,
} = initialState;

jest.mock('moment', () => (() => '2099–01–0111:11:11+00:00'));

test('initialState returns a defined object', () => {
  expect(initialState).toBeDefined();
  expect(typeof initialState).toBe('object');
});

test('initialState returns the expected number of keys', () => {
  expect(Object.keys(initialState).length).toEqual(18);
});

test('currencies returns an empty array', () => {
  expect(currencies.length).toEqual(0);
});

test('dates returns the expected number of keys', () => {
  expect(Object.keys(dates).length).toEqual(8);
});

test('dates initialises with the correct values', () => {
  const {
    fixingDate, valueDate, spotDate, publishDate, forwardStart, dayCount, tradeDuration,
  } = dates;

  expect(fixingDate).toMatchObject({});
  expect(valueDate).toMatchObject({});
  expect(spotDate).toMatchObject({});
  expect(publishDate).toMatchObject({});
  expect(forwardStart).toMatchObject({});
  expect(dayCount).toMatchObject({});
  expect(tradeDuration).toMatchObject({});
});

test('rates returns the expected number of keys', () => {
  expect(Object.keys(rates).length).toEqual(3);
});

test('rates initialises with the correct values', () => {
  expect(rates.rate).toEqual('');
  expect(rates.points).toEqual('');
  expect(rates.isRateResponsePending).toBeFalsy();
});

test('clients returns an empty array', () => {
  expect(clients.length).toEqual(0);
});

test('brokers returns an empty array', () => {
  expect(brokers.length).toEqual(0);
});

test('agents returns an empty array', () => {
  expect(agents.length).toEqual(0);
});

test('executionVenues returns an empty array', () => {
  expect(executionVenues.length).toEqual(0);
});

test('deal returns the expected number of keys', () => {
  expect(Object.keys(deal).length).toEqual(15);
});

test('deal initialises with the correct values', () => {
  expect(deal.dealId).toEqual('');
  expect(deal.dealState).toEqual('');
  expect(deal.valueDate).toEqual('');
  expect(deal.fixingDate).toEqual('');
  expect(deal.tradeDate).toEqual('');
  expect(deal.tradeTime).toEqual('');
  expect(deal.currency1).toEqual('');
  expect(deal.currency2).toEqual('');
  expect(deal.settlementCurrency).toEqual('');
  expect(deal.durationPeriod).toEqual('');
  expect(deal.durationMultiplier).toEqual('');
  expect(deal.price).toEqual('');
  expect(deal.notionalAmount).toEqual('');
  expect(deal.executionVenue).toEqual('');
  expect(deal.success).toBeFalsy();
});

test('originalDeal returns the expected initial state', () => {
  expect(originalDeal).toEqual(null);
});

test('userInterface returns the expected number of keys', () => {
  expect(Object.keys(userInterface).length).toEqual(26);
});

test('userInterface initialises with the correct values', () => {
  expect(userInterface.isThirdCPChecked).toBeFalsy();
  expect(userInterface.isInterestEnabled).toBeFalsy();
  expect(userInterface.selectedTradeSide).toEqual('buyer');
  expect(userInterface.selectedPreferenceBroker).toEqual('');
  expect(userInterface.selectedPreferenceFirms.length).toEqual(0);
  expect(userInterface.selectedPreferenceClients.length).toEqual(0);
  expect(userInterface.selectedPreferenceFirm).toEqual(null);
  expect(userInterface.lastSetTerm).toEqual('');
  expect(userInterface.termValues).toEqual({});
  expect(userInterface.clientHoverInfo).toEqual({});
  expect(userInterface.isSettingsModalVisible).toBeFalsy();
  expect(userInterface.isFavRenamePopupVisible).toBeFalsy();
  expect(userInterface.selectedFavItem).toEqual({});
  expect(userInterface.selectedDealType).toEqual('');
  expect(userInterface.selectedStrategyType).toEqual('');
  expect(userInterface.isTradeDateConfirmModalVisible).toBeFalsy();
  expect(userInterface.isTradeDateEnabled).toBeFalsy();
  expect(userInterface.blotterGridUpdates).toEqual({});
  expect(userInterface.resetAdminTabChanges).toBeFalsy();
  expect(userInterface.isBrowserForceRefreshEnabled).toBeFalsy();
  expect(userInterface.resetBlotterSearch).toBeFalsy();
  expect(userInterface.currentPage).toEqual('');
  expect(userInterface.isDealEditInProgress).toBeFalsy();
  expect(userInterface.isReAllocationRequired).toBeFalsy();
  expect(userInterface.updatedDealObject).toEqual({});
});

test('user returns the expected number of keys', () => {
  expect(Object.keys(user).length).toEqual(3);
});

test('user initialises with the correct values', () => {
  expect(user.fullName).toEqual('');
  expect(Object.keys(user.preferences).length).toEqual(2);
  expect(user.preferences.settings).toEqual({});
  expect(user.preferences.defaults).toEqual({ defaultEntryPage: 'NA' });
  expect(user.permissions).toEqual({});
});

test('blotter initialises with the correct values', () => {
  expect(Object.keys(blotter).length).toEqual(6);
  expect(blotter.isDataLoading).toEqual(false);
  expect(blotter.lastUpdated).toEqual(null);
  expect(blotter.insertedDealIds).toEqual([]);
  expect(blotter.rtuBlotterCount).toEqual('');
  expect(Object.keys(blotter.data).length).toEqual(0);
  expect(blotter.searchParams).toEqual({});
});

test('sse initialises with the correct values', () => {
  expect(Object.keys(sse).length).toEqual(3);
  expect(sse.status).toEqual('');
  expect(sse.sessionId).toEqual(null);
  expect(sse.isReconnecting).toEqual(false);
});

test('systemSettings initialises with the correct values', () => {
  expect(Object.keys(systemSettings).length).toEqual(2);
  expect(systemSettings.blotterSearchDateRangeLimit).toEqual('365');
  expect(systemSettings.licenseKey).toEqual('');
});

test('brokerageStrategies returns an empty array', () => {
  expect(brokerageStrategies.length).toEqual(0);
});
