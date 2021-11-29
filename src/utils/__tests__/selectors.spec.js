import * as selectors from '../selectors';
import { getIsDateResponsePending, getIsRateResponsePending } from '../selectors';

const state = {
  currencies: [],
  dates: {
    fixingDate: '2099–01–0111:11:11+00:00',
    valueDate: '2099–01–0111:11:11+00:00',
    spotDate: '2099–01–0111:11:11+00:00',
    publishDate: {
      near: '2099–01–0111:11:11+00:00',
      far: '2099–01–0111:11:11+00:00',
    },
    forwardStart: {
      near: '2099–01–0111:11:11+00:00',
      far: '2099–01–0111:11:11+00:00',
    },
    isDateResponsePending: false,
  },
  rates: {
    rate: '',
    points: '',
    isRateResponsePending: false,
  },
  clients: [],
  brokers: [],
  desks: [],
  gcdBrokers: [],
  agents: [],
  executionVenues: [],
  originalDeal: null,
  deal: {
    dealId: '',
    dealState: '',
    valueDate: '',
    fixingDate: '',
    tradeDate: '',
    tradeTime: '',
    currency1: '',
    currency2: '',
    settlementCurrency: '',
    durationPeriod: '',
    durationMultiplier: '',
    price: '',
    notionalAmount: '',
    executionVenue: '',
    success: false,
    trades: [
      {
        valueDate: '2021-11-15T00:00:00.000+08',
        publishDate: '2021-11-11T00:00:00.000+08',
        notionalAmount: '1000000.00',
        tradeEconomics: {
          dealtCurrency: 'USD',
          executionVenue: 'TPSEF',
          settlementCurrency: 'USD',
          payer: {
            tradingCustomerGcdId: 164920,
            brokerGcdPostingId: 13660,
            executingCustomerGcdId: 164920,
            agentCustomerGcdId: 103309,
            executingCustomerName: 'AMERICAN PRESIDENT B',
            tradingCustomerName: 'AMERICAN PRESIDENT B',
            brokerGcdPostingName: 'IAN GABLE',
            agentCustomerGcdName: 'A-J STEVENS',
            brokerage: {
              id: 205,
              brokerageInfo: 'Manually set by BELFAST TPEUR TEST BROKER 1',
              brokerageType: 'Manual',
              brokerageRequirement: 'None',
              strategyId: 205,
              currency: 'USD',
              amount: 100,
              allocations: [
                {
                  percentage: 100,
                  amount: 100,
                  brokerGcdPostingId: 13660,
                  brokerGcdPostingName: 'IAN GABLE',
                  profitCentreId: 441,
                  profitCentreName: 'LONDON NDF',
                  updatedBy: 'BELFAST TPEUR TEST BROKER 1',
                  id: 106,
                  allocationAddedBySplit: false,
                },
              ],
              splits: 1,
            },
            executingCustomerLeiCode: 'IZSMS0HNZRZODZE35N63',
            tradingCustomerLeiCode: 'IZSMS0HNZRZODZE35N63',
            owningAgentLeiCode: '549300MU2MYJLOY6IJ51',
            executingCustomerLocation: 'LON',
            tradingCustomerLocation: 'LON',
            owningAgentGcdId: 105825,
            owningAgentName: 'TP (EUROPE)LTD X TD',
            owningAgentLocation: 'LON',
            executionType: 'VOICE',
            aggressorProvider: 'AGGRESSOR',
            jurisdiction: 'CFTC',
            dfCapacity: 'Non-SD_Non-MSP',
            priceDiscoveryType: 'RFQ',
            creditIssuer: 'NOT_APPLICABLE',
            deskName: 'LON ASIAN NDF',
            nettBrokerageCharge: false,
          },
          receiver: {
            tradingCustomerGcdId: 164920,
            brokerGcdPostingId: 13660,
            executingCustomerGcdId: 164920,
            agentCustomerGcdId: 170447,
            executingCustomerName: 'AMERICAN PRESIDENT B',
            tradingCustomerName: 'AMERICAN PRESIDENT B',
            brokerGcdPostingName: 'IAN GABLE',
            agentCustomerGcdName: '42 FIN SERV S.R.O',
            brokerage: {
              id: 204,
              brokerageInfo: 'Manually set by BELFAST TPEUR TEST BROKER 1',
              brokerageType: 'Manual',
              brokerageRequirement: 'None',
              strategyId: 204,
              currency: 'USD',
              amount: 100,
              allocations: [
                {
                  percentage: 100,
                  amount: 100,
                  brokerGcdPostingId: 13660,
                  brokerGcdPostingName: 'IAN GABLE',
                  profitCentreId: 441,
                  profitCentreName: 'LONDON NDF',
                  updatedBy: 'BELFAST TPEUR TEST BROKER 1',
                  id: 105,
                  allocationAddedBySplit: false,
                },
              ],
              splits: 1,
            },
            executingCustomerLeiCode: 'IZSMS0HNZRZODZE35N63',
            tradingCustomerLeiCode: 'IZSMS0HNZRZODZE35N63',
            owningAgentLeiCode: '549300MU2MYJLOY6IJ51',
            executingCustomerLocation: 'LON',
            tradingCustomerLocation: 'LON',
            owningAgentGcdId: 105825,
            owningAgentName: 'TP (EUROPE)LTD X TD',
            owningAgentLocation: 'LON',
            executionType: 'VOICE',
            aggressorProvider: 'PROVIDER',
            jurisdiction: 'CFTC',
            dfCapacity: 'Non-SD_Non-MSP',
            priceDiscoveryType: 'RFQ',
            creditIssuer: 'NOT_APPLICABLE',
            deskName: 'LON ASIAN NDF',
            nettBrokerageCharge: false,
          },
          currency1: 'USD',
          currency2: 'CNY',
          currency1amount: 1000000,
          currency2amount: 6468500,
          exchangeRate: 6.4685,
          tradingCurrency: 'USD',
        },
        tradeId: 202,
        displayTenor: '1M',
        fixingDate: '2021-11-11T09:00:00.000+08',
        CLS: false,
      },
    ],
  },
  ui: {
    isThirdCPChecked: false,
    isInterestEnabled: false,
    selectedTradeSide: 'buyer',
    selectedPreferenceBroker: '',
    selectedPreferenceFirms: [],
    selectedPreferenceClients: [],
    selectedPreferenceFirm: null,
    lastSetTerm: '',
    termValues: {},
    clientHoverInfo: {},
    isSettingsModalVisible: false,
    isFavRenamePopupVisible: false,
    selectedFavItem: {},
    selectedDealType: '',
    selectedStrategyType: '',
    isTradeDateConfirmModalVisible: false,
    isTradeDateEnabled: false,
    blotterGridUpdates: {},
    isClsOverride: false,
    resetAdminTabChanges: false,
    isBrowserForceRefreshEnabled: false,
    resetBlotterSearch: false,
    currentPage: '',
    isDealEditInProgress: false,
    reAllocationSide: '',
    updatedDealObject: {},
  },
  user: {
    permissions: {
      isValidForNdf: true,
    },
    fullName: '',
    preferences: {
      settings: {
        ratesFeed: true,
        displayClsDefaults: false,
      },
      defaults: {
        lastDealType: 'TEST',
      },
    },
  },
  blotter: {
    data: [],
    insertedDealIds: [777],
    isDataLoading: false,
    lastUpdated: '2099–01–0111:11:11+00:00',
    rtuBlotterCount: '',
    searchParams: {},
  },
  sse: {
    status: '',
    sessionId: null,
    isReconnecting: false,
  },
  systemSettings: {
    blotterSearchDateRangeLimit: '365',
    licenseKey: '',
  },
  brokerageStrategies: [],
};

test('selectors return the correct number of keys', () => {
  expect(Object.keys(selectors).length).toEqual(56);
});

describe('when no parameter passed to selector ', () => {
  Object.entries(selectors).forEach(([name, fn]) => {
    test(`${name}() throws an error`, () => {
      expect(() => fn()).toThrow();
    });
  });
});

describe('getUi returns the correct part of the state for test', () => {
  test('getUi() === {}', () => {
    expect(selectors.getUi({})).toEqual({});
  });

  test('getUi({ui}) === ui', () => {
    expect(selectors.getUi(state)).toBe(state.ui);
  });
});

describe('getUser returns the correct part of the state for test', () => {
  test('getUser() === {}', () => {
    expect(selectors.getUser({})).toEqual({});
  });

  test('getUser({user}) === user', () => {
    expect(selectors.getUser(state)).toBe(state.user);
  });
});

describe('getUserPreferences returns the correct part of the state for test', () => {
  test('getUserPreferences() === {}', () => {
    expect(selectors.getUserPreferences({})).toEqual({});
  });

  test('getUserPreferences({user: { preferences }}}) === preferences', () => {
    expect(selectors.getUserPreferences(state)).toBe(state.user.preferences);
  });
});

describe('getUserPermissions returns the correct part of the state for test', () => {
  test('getUserPermissions() === {}', () => {
    expect(selectors.getUserPermissions({})).toEqual({});
  });

  test('getUserPermissions({user: { permissions }}}) === permissions', () => {
    expect(selectors.getUserPermissions(state)).toBe(state.user.permissions);
  });
});

describe('getUserPreferenceSettings returns the correct part of the state for test', () => {
  test('getUserPreferenceSettings() === {}', () => {
    expect(selectors.getUserPreferenceSettings({})).toEqual({});
  });

  test('getUserPreferenceSettings({user: { preferences: { settings }}}}) === settings', () => {
    expect(selectors.getUserPreferenceSettings(state)).toBe(state.user.preferences.settings);
  });
});

describe('getUserPreferenceSettingsRatesFeed returns the correct part of the state for test', () => {
  test('getUserPreferenceSettingsRatesFeed() === {}', () => {
    expect(selectors.getUserPreferenceSettingsRatesFeed({})).toEqual(false);
  });

  test('getUserPreferenceSettingsRatesFeed({ user: { preferences: { settings: { ratesFeed }}}} === ratesFeed', () => {
    expect(selectors.getUserPreferenceSettingsRatesFeed(state)).toBe(state.user.preferences.settings.ratesFeed);
  });
});

describe('getUserPreferenceSettingsClsDefaults returns the correct part of the state for test', () => {
  test('getUserPreferenceSettingsClsDefaults() === {}', () => {
    expect(selectors.getUserPreferenceSettingsClsDefaults({})).toEqual(true);
  });

  test('getUserPreferenceSettingsClsDefaults({ user: { preferences: { settings: { clsDefaults }}}} === displayClsDefaults', () => {
    expect(selectors.getUserPreferenceSettingsClsDefaults(state)).toBe(state.user.preferences.settings.displayClsDefaults);
  });
});

describe('getUserPreferencesDefaults returns the correct part of the state for test', () => {
  test('getUserPreferencesDefaults() === {}', () => {
    expect(selectors.getUserPreferencesDefaults({})).toEqual({});
  });

  test('getUserPreferencesDefaults({user: { preferences: { defaults }}}}) === defaults', () => {
    expect(selectors.getUserPreferencesDefaults(state)).toBe(state.user.preferences.defaults);
  });
});

describe('getIsSettingsModalVisible returns the correct part of the state for test', () => {
  test('getIsSettingsModalVisible() === {}', () => {
    expect(selectors.getIsSettingsModalVisible({})).toEqual(false);
  });

  test('getIsSettingsModalVisible({ui: { isSettingsModalVisible }}}) === isSettingsModalVisible', () => {
    expect(selectors.getIsSettingsModalVisible(state)).toBe(state.ui.isSettingsModalVisible);
  });
});

describe('getIsTradeDateSubmitModalVisible returns the correct part of the state for test', () => {
  test('getIsTradeDateSubmitModalVisible() === {}', () => {
    expect(selectors.getIsTradeDateSubmitModalVisible({})).toEqual(false);
  });

  test('getIsTradeDateSubmitModalVisible({ui: { isTradeDateConfirmModalVisible }}}) === isTradeDateConfirmModalVisible', () => {
    expect(selectors.getIsTradeDateSubmitModalVisible(state)).toBe(state.ui.isTradeDateConfirmModalVisible);
  });
});

describe('getIsTradeDateEnabled returns the correct part of the state for test', () => {
  test('getIsTradeDateEnabled() === {}', () => {
    expect(selectors.getIsTradeDateEnabled(state)).toEqual(false);
  });

  test('getIsTradeDateEnabled({ui: { isTradeDateEnabled }}}) === isTradeDateEnabled', () => {
    expect(selectors.getIsTradeDateEnabled(state)).toBe(state.ui.isTradeDateEnabled);
  });
});

describe('getIsClsOverride returns the correct part of the state for test', () => {
  test('getIsClsOverride() === false', () => {
    expect(selectors.getIsClsOverride(state)).toEqual(false);
  });

  test('getIsClsOverride({ui: { isClsOverride }}) === isClsOverride', () => {
    expect(selectors.getIsClsOverride(state)).toBe(state.ui.isClsOverride);
  });
});

describe('getSelectedDealType returns the correct part of the state for test', () => {
  test('getSelectedDealType === ""', () => {
    expect(selectors.getSelectedDealType(state)).toEqual('');
  });

  test('getSelectedDealType({ui: {selectedDealType}}) === selectedDealType', () => {
    expect(selectors.getSelectedDealType(state)).toBe(state.ui.selectedDealType);
  });
});

describe('getSelectedStrategyType returns the correct part of the state for test', () => {
  test('getSelectedStrategyType === ""', () => {
    expect(selectors.getSelectedStrategyType(state)).toEqual('');
  });

  test('getSelectedStrategyType({ui: {selectedStrategyType}}) === selectedStrategyType', () => {
    expect(selectors.getSelectedStrategyType(state)).toBe(state.ui.selectedStrategyType);
  });
});

describe('getCurrentPage returns the correct part of the state for test', () => {
  test('getCurrentPage === ""', () => {
    expect(selectors.getSelectedDealType({})).toEqual('');
  });

  test('getCurrentPage({ui: {currentPage}}) === currentPage', () => {
    expect(selectors.getCurrentPage(state)).toBe(state.ui.currentPage);
  });
});

describe('getLastDealType returns the correct part of the state for test', () => {
  test('getLastDealType() === {}', () => {
    expect(selectors.getLastDealType({})).toEqual('');
  });

  test('getLastDealType({user: { preferences: { defaults: { lastDealType } }}}}) === getLastDealType', () => {
    expect(selectors.getLastDealType(state)).toBe(state.user.preferences.defaults.lastDealType);
  });
});

describe('getBlotter returns the correct part of the state for test', () => {
  test('getBlotter() === {}', () => {
    expect(selectors.getBlotter({})).toEqual({});
  });

  test('getBlotter({data: [], isDataLoading: false}) === getBlotter', () => {
    expect(selectors.getBlotter(state)).toEqual(state.blotter);
  });
});

describe('getBlotterDeals returns the correct part of the state for test', () => {
  test('getBlotterDeals() === {}', () => {
    expect(selectors.getBlotterDeals({})).toEqual([]);
  });

  test('getBlotterDeals({data: [], isDataLoading: false}) === getBlotterDeals', () => {
    expect(selectors.getBlotterDeals(state)).toEqual(state.blotter.data);
  });
});

describe('getBlotterIsDataLoading returns the correct part of the state for test', () => {
  test('getBlotterIsDataLoading() === {}', () => {
    expect(selectors.getBlotterIsDataLoading({})).toEqual(false);
  });

  test('getBlotterIsDataLoading({data: [], isDataLoading: false}) === getBlotterIsDataLoading', () => {
    expect(selectors.getBlotterIsDataLoading(state)).toEqual(state.blotter.isDataLoading);
  });
});

describe('getBlotterLastUpdated returns the correct part of the state for test', () => {
  test('getBlotterLastUpdated() === {}', () => {
    expect(selectors.getBlotterLastUpdated({})).toEqual(null);
  });

  test('getBlotterLastUpdated({data: [], isDataLoading: false, lastUpdated: "2099–01–0111:11:11+00:00"}) === getBlotterIsDataLoading', () => {
    expect(selectors.getBlotterLastUpdated(state)).toEqual(state.blotter.lastUpdated);
  });
});

describe('getBlotterInsertedDealIds returns the correct part of the state for test', () => {
  test('getBlotterInsertedDealIds() === {}', () => {
    expect(selectors.getBlotterInsertedDealIds({})).toEqual([]);
  });

  test('getBlotterInsertedDealIds({data: [], etc: { ... }, insertedDealIds: [777]}) === getBlotterInsertedDealIds', () => {
    expect(selectors.getBlotterInsertedDealIds(state)).toEqual(state.blotter.insertedDealIds);
  });
});

describe('getRtuBlotterCount returns the correct part of the state for test', () => {
  test('getRtuBlotterCount() === {}', () => {
    expect(selectors.getRtuBlotterCount({})).toEqual('');
  });

  test('getRtuBlotterCount({ rtuBlotterCount: ""}) === getRtuBlotterCount', () => {
    expect(selectors.getRtuBlotterCount(state)).toEqual(state.blotter.rtuBlotterCount);
  });
});

describe('getBlotterSearchParams returns the correct part of the state for test', () => {
  test('getBlotterSearchParams() === {}', () => {
    expect(selectors.getBlotterSearchParams({})).toEqual({});
  });

  test('getBlotterSearchParams({ }) === getBlotterSearchParams', () => {
    expect(selectors.getBlotterSearchParams(state)).toEqual(state.blotter.searchParams);
  });
});

describe('getDates returns the correct part of the state for test', () => {
  test('getDates() === {}', () => {
    expect(selectors.getDates({})).toEqual({});
  });

  test('getDates(state) === state.dates', () => {
    expect(selectors.getDates(state)).toEqual(state.dates);
  });
});

describe('getIsDateResponsePending returns the correct part of the state for test', () => {
  test('getIsDateResponsePending() === false', () => {
    expect(getIsDateResponsePending({})).toEqual(false);
  });

  test('getIsDateResponsePending(state) === state.dates.isDateResponsePending', () => {
    expect(getIsDateResponsePending(state)).toEqual(state.dates.isDateResponsePending);
  });
});

describe('getRates returns the correct part of the state for test', () => {
  test('getRates() === {}', () => {
    expect(selectors.getRates({})).toEqual({});
  });

  test('getRates(state) === state.rates', () => {
    expect(selectors.getRates(state)).toEqual(state.rates);
  });
});

describe('getIsRateResponsePending returns the correct part of the state for test', () => {
  test('getIsRateResponsePending() === false', () => {
    expect(getIsRateResponsePending({})).toEqual(false);
  });

  test('getIsRateResponsePending(state) === state.rates.isRateResponsePending', () => {
    expect(getIsDateResponsePending(state)).toEqual(state.rates.isRateResponsePending);
  });
});

describe('getResetBlotterSearch returns the correct part of the state for test', () => {
  test('getResetBlotterSearch() === false', () => {
    expect(selectors.getResetBlotterSearch({})).toEqual(false);
  });

  test('getResetBlotterSearch({ui: { resetBlotterSearch }}) === getResetBlotterSearch', () => {
    expect(selectors.getResetBlotterSearch(state)).toEqual(state.ui.resetBlotterSearch);
  });
});

describe('getSystemSettings returns the correct part of the state for test', () => {
  test('getSystemSettings({getSystemSettings: { }}) === getSystemSettings', () => {
    expect(selectors.getSystemSettings(state)).toEqual(state.systemSettings);
  });

  test('getDateRangeLimit({getSystemSettings}) === getDateRangeLimit', () => {
    expect(selectors.getDateRangeLimit(state)).toEqual(state.systemSettings.blotterSearchDateRangeLimit);
  });

  test('getLicenseKey({getSystemSettings}) === getLicenseKey', () => {
    expect(selectors.getLicenseKey(state)).toEqual(state.systemSettings.licenseKey);
  });
});

describe('getSSEStatus returns the correct part of the state for test', () => {
  test('getSSEStatus() === {}', () => {
    expect(selectors.getSSEStatus({})).toEqual('');
  });

  test('getSSEStatus({status: "Connected", isConnected: true}) === getSSEStatus', () => {
    expect(selectors.getSSEStatus(state)).toEqual(state.sse.status);
  });
});

describe('getSSESessionId returns the correct part of the state for test', () => {
  test('getSSESessionId() === {}', () => {
    expect(selectors.getSSESessionId({})).toEqual(null);
  });

  test('getSSESessionId({sessionId: "1234-abc", status: "Connected", isConnected: true}) === getSSESessionId', () => {
    expect(selectors.getSSESessionId(state)).toEqual(state.sse.sessionId);
  });
});

describe('getBrokerageStrategies returns the correct part of the state for test', () => {
  test('getBrokerageStrategies() === {}', () => {
    expect(selectors.getBrokerageStrategies({})).toEqual([]);
  });

  test('getBrokerageStrategies({brokerageStrategies: ["Gap Spread","Liquidity Swap","Fix"]}) === getBrokerageStrategies', () => {
    expect(selectors.getBrokerageStrategies(state)).toEqual(state.brokerageStrategies);
  });
});

describe('getIsDealEditInProgress returns the correct part of the state for test', () => {
  test('getIsDealEditInProgress() === false', () => {
    expect(selectors.getIsDealEditInProgress({})).toBeFalsy();
  });

  test('getIsDealEditInProgress({}) === getIsDealEditInProgress', () => {
    expect(selectors.getIsDealEditInProgress(state)).toEqual(state.ui.isDealEditInProgress);
  });
});

describe('getReAllocationSide returns the correct part of the state for test', () => {
  test('getReAllocationSide() === ""', () => {
    expect(selectors.getReAllocationSide({})).toEqual('');
  });

  test('getReAllocationSide({}) === getReAllocationSide', () => {
    expect(selectors.getReAllocationSide(state)).toEqual(state.ui.reAllocationSide);
  });
});

describe('getUpdatedDealObject returns the correct part of the state for test', () => {
  test('getUpdatedDealObject() === {}', () => {
    expect(selectors.getUpdatedDealObject({})).toEqual({});
  });

  test('getUpdatedDealObject({ }) === getUpdatedDealObject', () => {
    expect(selectors.getUpdatedDealObject(state)).toEqual(state.ui.updatedDealObject);
  });
});

describe('getDeal returns the correct part of the state for test', () => {
  test('getDeal() === {}', () => {
    expect(selectors.getDeal({})).toEqual({});
  });

  test('getDeal(state) === state.deal', () => {
    expect(selectors.getDeal(state)).toEqual(state.deal);
  });
});

describe('getOriginalDeal returns the correct part of the state for test', () => {
  test('getOriginalDeal() === {}', () => {
    expect(selectors.getOriginalDeal({})).toEqual(null);
  });

  test('getOriginalDeal(state) === state.deal', () => {
    expect(selectors.getOriginalDeal(state)).toEqual(state.originalDeal);
  });
});

describe('getBuyerPrimaryBroker returns the correct part of the state for test', () => {
  test('getBuyerPrimaryBroker() === {}', () => {
    expect(selectors.getBuyerPrimaryBroker({})).toEqual({});
  });

  test('getBuyerPrimaryBroker(state) === state.deal.trades[0].tradeEconomics.payer.{}', () => {
    expect(selectors.getBuyerPrimaryBroker(state)).toEqual({
      brokerGcdPostingId: state.deal.trades[0].tradeEconomics.payer.brokerGcdPostingId,
      brokerGcdPostingName: state.deal.trades[0].tradeEconomics.payer.brokerGcdPostingName,
    });
  });
});

describe('getSellerPrimaryBroker returns the correct part of the state for test', () => {
  test('getSellerPrimaryBroker() === {}', () => {
    expect(selectors.getSellerPrimaryBroker({})).toEqual({});
  });

  test('getSellerPrimaryBroker(state) === state.deal.trades[0].tradeEconomics.receiver.{}', () => {
    expect(selectors.getSellerPrimaryBroker(state)).toEqual({
      brokerGcdPostingId: state.deal.trades[0].tradeEconomics.receiver.brokerGcdPostingId,
      brokerGcdPostingName: state.deal.trades[0].tradeEconomics.receiver.brokerGcdPostingName,
    });
  });
});

const originalState = {
  originalDeal: {
    trades: [{
      tradeEconomics: {
        payer: { brokerage: { amount: 10, allocatoins: [] } },
        receiver: { brokerage: { amount: 20, allocatoins: [] } },
      },
    }],
  },
};

describe('getOriginalBuyerBrokerage returns the correct part of the state for test', () => {
  test('getOriginalBuyerBrokerage() === {}', () => {
    expect(selectors.getOriginalBuyerBrokerage({})).toEqual({});
  });

  test('getOriginalBuyerBrokerage(state) === getOriginalDeal(state).trades[0].tradeEconomics.payer.brokerage', () => {
    expect(selectors.getOriginalBuyerBrokerage(originalState)).toEqual({ amount: 10, allocatoins: [] });
  });
});

describe('getOriginalSellerBrokerage returns the correct part of the state for test', () => {
  test('getOriginalSellerBrokerage() === {}', () => {
    expect(selectors.getOriginalSellerBrokerage({})).toEqual({});
  });

  test('getOriginalSellerBrokerage(state) === getOriginalDeal(state).trades[0].tradeEconomics.receiver.brokerage', () => {
    expect(selectors.getOriginalSellerBrokerage(originalState)).toEqual({ amount: 20, allocatoins: [] });
  });
});
