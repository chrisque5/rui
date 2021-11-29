import * as constants from '../constants';

const {
  actionTypes, api, dealTypes, favorites, favouritesColours, favouritesIcons, ids,
  MAX_LIMITS, productTypes, settingsProperties, specialTermsPerStrategy, strategyOptions,
  strategyScopeMap, strategies, executionVenueColours, userPermissions,
  blotterStpStatusesMap, blotterApprovalsMap, navMenuItems,
} = constants;

test('constants returns correct number of keys', () => {
  expect(Object.keys(constants).length).toEqual(29);
});

test('actionTypes returns correct number of keys and correct values', () => {
  expect(Object.keys(actionTypes).length).toEqual(115);
  expect(actionTypes.CREATE_DEAL_SUCCESS).toEqual('CREATE_DEAL_SUCCESS');
  expect(actionTypes.CREATE_DEAL_FAILED).toEqual('CREATE_DEAL_FAILED');
  expect(actionTypes.LOAD_USER_SUCCESS).toEqual('LOAD_USER_SUCCESS');
  expect(actionTypes.LOAD_USER_FAILED).toEqual('LOAD_USER_FAILED');
  expect(actionTypes.LOAD_DATES_SUCCESS).toEqual('LOAD_DATES_SUCCESS');
  expect(actionTypes.LOAD_DATES_FAILED).toEqual('LOAD_DATES_FAILED');
  expect(actionTypes.LOAD_DATES_CANCELLED).toEqual('LOAD_DATES_CANCELLED');
  expect(actionTypes.LOAD_DATES_IN_PROGRESS).toEqual('LOAD_DATES_IN_PROGRESS');
  expect(actionTypes.LOAD_TERMS_SUCCESS).toEqual('LOAD_TERMS_SUCCESS');
  expect(actionTypes.LOAD_TERMS_FAILED).toEqual('LOAD_TERMS_FAILED');
  expect(actionTypes.LOAD_CURRENCIES_SUCCESS).toEqual('LOAD_CURRENCIES_SUCCESS');
  expect(actionTypes.LOAD_CURRENCIES_FAILED).toEqual('LOAD_CURRENCIES_FAILED');
  expect(actionTypes.LOAD_CURRENCIES_CANCELLED).toEqual('LOAD_CURRENCIES_CANCELLED');
  expect(actionTypes.RESET_CURRENCIES).toEqual('RESET_CURRENCIES');
  expect(actionTypes.UPDATE_CURRENCY_PAIR_CLS_SUCCESS).toEqual('UPDATE_CURRENCYPAIR_CLS_SUCCESS');
  expect(actionTypes.UPDATE_CURRENCY_PAIR_CLS_FAILED).toEqual('UPDATE_CURRENCYPAIR_CLS_FAILED');
  expect(actionTypes.LOAD_CLIENTDATA_SUCCESS).toEqual('LOAD_CLIENTDATA_SUCCESS');
  expect(actionTypes.LOAD_CLIENTDATA_FAILED).toEqual('LOAD_CLIENTDATA_FAILED');
  expect(actionTypes.LOAD_CLIENTDATA_CANCELLED).toEqual('LOAD_CLIENTDATA_CANCELLED');
  expect(actionTypes.RESET_CLIENTDATA).toEqual('RESET_CLIENTDATA');
  expect(actionTypes.LOAD_BROKERDATA_SUCCESS).toEqual('LOAD_BROKERDATA_SUCCESS');
  expect(actionTypes.LOAD_BROKERDATA_FAILED).toEqual('LOAD_BROKERDATA_FAILED');
  expect(actionTypes.LOAD_BROKERDATA_CANCELLED).toEqual('LOAD_BROKERDATA_CANCELLED');
  expect(actionTypes.RESET_BROKERDATA).toEqual('RESET_BROKERDATA');
  expect(actionTypes.UPDATE_COUNTERPARTY_SELECTION).toEqual('UPDATE_COUNTERPARTY_SELECTION');
  expect(actionTypes.UPDATE_PREFERENCE_BROKER_SELECTION).toEqual('UPDATE_PREFERENCE_BROKER_SELECTION');
  expect(actionTypes.UPDATE_LAST_TERM_SELECTION).toEqual('UPDATE_LAST_TERM_SELECTION');
  expect(actionTypes.CHANGE_TERMS).toEqual('CHANGE_TERMS');
  expect(actionTypes.CHANGE_DEALTYPE).toEqual('CHANGE_DEALTYPE');
  expect(actionTypes.CHANGE_PAGE).toEqual('CHANGE_PAGE');
  expect(actionTypes.CHANGE_STRATEGY).toEqual('CHANGE_STRATEGY');
  expect(actionTypes.LOAD_PREFERENCES_SUCCESS).toEqual('LOAD_PREFERENCES_SUCCESS');
  expect(actionTypes.LOAD_PREFERENCES_FAILED).toEqual('LOAD_PREFERENCES_FAILED');
  expect(actionTypes.CHANGE_PREFERENCE_SUCCESS).toEqual('CHANGE_PREFERENCE_SUCCESS');
  expect(actionTypes.CHANGE_PREFERENCE_FAILED).toEqual('CHANGE_PREFERENCE_FAILED');
  expect(actionTypes.DELETE_BROKER_PREFERENCE_SUCCESS).toEqual('DELETE_BROKER_PREFERENCE_SUCCESS');
  expect(actionTypes.DELETE_BROKER_PREFERENCE_FAILED).toEqual('DELETE_BROKER_PREFERENCE_FAILED');
  expect(actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS).toEqual('ADD_CLIENTTRADER_PREFERENCE_SUCCESS');
  expect(actionTypes.ADD_CLIENTTRADER_PREFERENCE_FAILED).toEqual('ADD_CLIENTTRADER_PREFERENCE_FAILED');
  expect(actionTypes.RESET_UI_STATE).toEqual('RESET_UI_STATE');
  expect(actionTypes.CHANGE_CLIENT_HOVER_DATA_SUCCESS).toEqual('CHANGE_CLIENT_HOVER_DATA_SUCCESS');
  expect(actionTypes.LOAD_RATES_SUCCESS).toEqual('LOAD_RATES_SUCCESS');
  expect(actionTypes.LOAD_RATES_FAILED).toEqual('LOAD_RATES_FAILED');
  expect(actionTypes.LOAD_RATES_CANCELLED).toEqual('LOAD_RATES_CANCELLED');
  expect(actionTypes.LOAD_RATES_IN_PROGRESS).toEqual('LOAD_RATES_IN_PROGRESS');
  expect(actionTypes.TOGGLE_THIRD_CP).toEqual('TOGGLE_THIRD_CP');
  expect(actionTypes.TOGGLE_SETTINGS_MODAL).toEqual('TOGGLE_SETTINGS_MODAL');
  expect(actionTypes.RESET_DATES).toEqual('RESET_DATES');
  expect(actionTypes.LOAD_AGENTDATA_SUCCESS).toEqual('LOAD_AGENTDATA_SUCCESS');
  expect(actionTypes.LOAD_AGENTDATA_FAILED).toEqual('LOAD_AGENTDATA_FAILED');
  expect(actionTypes.LOAD_AGENTDATA_CANCELLED).toEqual('LOAD_AGENTDATA_CANCELLED');
  expect(actionTypes.RESET_AGENTDATA).toEqual('RESET_AGENTDATA');
  expect(actionTypes.LOAD_EXECUTIONVENUES_SUCCESS).toEqual('LOAD_EXECUTIONVENUES_SUCCESS');
  expect(actionTypes.LOAD_EXECUTIONVENUES_FAILED).toEqual('LOAD_EXECUTIONVENUES_FAILED');
  expect(actionTypes.LOAD_EXECUTIONVENUES_CANCELLED).toEqual('LOAD_EXECUTIONVENUES_CANCELLED');
  expect(actionTypes.RESET_EXECUTIONVENUES).toEqual('RESET_EXECUTIONVENUES');
  expect(actionTypes.TOGGLE_RENAME_FAVORITES_POPUP).toEqual('TOGGLE_RENAME_FAVORITES_POPUP');
  expect(actionTypes.TOGGLE_CHANGE_FAVORITES_COLOUR).toEqual('TOGGLE_CHANGE_FAVORITES_COLOUR');
  expect(actionTypes.ENABLE_INTEREST).toEqual('ENABLE_INTEREST');
  expect(actionTypes.UPDATE_DEFAULTS).toEqual('UPDATE_DEFAULTS');
  expect(actionTypes.ACTIVE_TOGGLE_KEY).toEqual('ACTIVE_TOGGLE_KEY');
  expect(actionTypes.LOAD_USER_PERMISSIONS).toEqual('LOAD_USER_PERMISSIONS');
  expect(actionTypes.SELECT_PREFERRED_FIRM_COMPLETE).toEqual('SELECT_PREFERRED_FIRM_COMPLETE');
  expect(actionTypes.TOGGLE_TRADE_DATE_CONFIRM_POPUP).toEqual('TOGGLE_TRADE_DATE_CONFIRM_POPUP');
  expect(actionTypes.TOGGLE_IS_TRADE_DATE_ENABLED).toEqual('TOGGLE_IS_TRADE_DATE_ENABLED');
  expect(actionTypes.TOGGLE_IS_CLS_OVERRIDE).toEqual('TOGGLE_IS_CLS_OVERRIDE');
  expect(actionTypes.LOAD_DESKS_SUCCESS).toEqual('LOAD_DESKS_SUCCESS');
  expect(actionTypes.LOAD_DESKS_FAILED).toEqual('LOAD_DESKS_FAILED');
  expect(actionTypes.LOAD_DESKS_CANCELLED).toEqual('LOAD_DESKS_CANCELLED');
  expect(actionTypes.UPDATE_BROKER_SUCCESS).toEqual('UPDATE_BROKER_SUCCESS');
  expect(actionTypes.UPDATE_BROKER_FAILED).toEqual('UPDATE_BROKER_FAILED');
  expect(actionTypes.LOAD_GCD_BROKERDATA_SUCCESS).toEqual('LOAD_GCD_BROKERDATA_SUCCESS');
  expect(actionTypes.LOAD_GCD_BROKERDATA_FAILED).toEqual('LOAD_GCD_BROKERDATA_FAILED');
  expect(actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS).toEqual('LOAD_BLOTTER_DEALS_IN_PROGRESS');
  expect(actionTypes.LOAD_BLOTTER_DEALS_CANCELLED).toEqual('LOAD_BLOTTER_DEALS_CANCELLED');
  expect(actionTypes.LOAD_BLOTTER_DEALS_SUCCESS).toEqual('LOAD_BLOTTER_DEALS_SUCCESS');
  expect(actionTypes.LOAD_BLOTTER_DEALS_FAILED).toEqual('LOAD_BLOTTER_DEALS_FAILED');
  expect(actionTypes.REMOVE_BLOTTER_NEW_DEAL_IDS).toEqual('REMOVE_BLOTTER_NEW_DEAL_IDS');
  expect(actionTypes.APPROVE_DEAL_STAGE_SUCCESS).toEqual('APPROVE_DEAL_STAGE_SUCCESS');
  expect(actionTypes.APPROVE_DEAL_STAGE_FAILED).toEqual('APPROVE_DEAL_STAGE_FAILED');
  expect(actionTypes.UPDATE_BLOTTER_GRID_DETAILS).toEqual('UPDATE_BLOTTER_GRID_DETAILS');
  expect(actionTypes.RESET_ADMIN_TAB_CHANGES).toEqual('RESET_ADMIN_TAB_CHANGES');
  expect(actionTypes.ENABLE_BROWSER_FORCE_REFRESH).toEqual('ENABLE_BROWSER_FORCE_REFRESH');
  expect(actionTypes.RESET_BLOTTER_SEARCH).toEqual('RESET_BLOTTER_SEARCH');
  expect(actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS).toEqual('LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS');
  expect(actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED).toEqual('LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED');
  expect(actionTypes.LOAD_LICENSE_KEY_SUCCESS).toEqual('LOAD_LICENSE_KEY_SUCCESS');
  expect(actionTypes.LOAD_LICENSE_KEY_FAILED).toEqual('LOAD_LICENSE_KEY_FAILED');
  expect(actionTypes.LOAD_BLOTTER_RTU_COUNT_SUCCESS).toEqual('LOAD_BLOTTER_RTU_COUNT_SUCCESS');
  expect(actionTypes.LOAD_BLOTTER_RTU_COUNT_FAILED).toEqual('LOAD_BLOTTER_RTU_COUNT_FAILED');
  expect(actionTypes.RESET_BLOTTER_RTU_COUNT_SUCCESS).toEqual('RESET_BLOTTER_RTU_COUNT_SUCCESS');
  expect(actionTypes.TERMINATE_SSE_SESSION_SUCCESS).toEqual('TERMINATE_SSE_SESSION_SUCCESS');
  expect(actionTypes.TERMINATE_SSE_SESSION_FAILED).toEqual('TERMINATE_SSE_SESSION_FAILED');
  expect(actionTypes.SSE_CONNECTING).toEqual('SSE:CONNECTING');
  expect(actionTypes.SSE_CONNECT).toEqual('SSE:CONNECT');
  expect(actionTypes.SSE_CONNECTED).toEqual('SSE:CONNECTED');
  expect(actionTypes.SSE_DISCONNECT).toEqual('SSE:DISCONNECT');
  expect(actionTypes.SSE_DISCONNECTING).toEqual('SSE:SSE_DISCONNECTING');
  expect(actionTypes.SSE_DISCONNECTED).toEqual('SSE:DISCONNECTED');
  expect(actionTypes.SSE_FAILED).toEqual('SSE:FAILED');
  expect(actionTypes.SSE_RESET).toEqual('SSE:RESET');
  expect(actionTypes.SSE_BLOTTER_UPDATE).toEqual('SSE:BLOTTER_UPDATE');
  expect(actionTypes.ENABLE_INVESTIGATION_FLAG_SUCCESS).toEqual('ENABLE_INVESTIGATION_FLAG_SUCCESS');
  expect(actionTypes.ENABLE_INVESTIGATION_FLAG_FAILURE).toEqual('ENABLE_INVESTIGATION_FLAG_FAILURE');
  expect(actionTypes.LOAD_BROKERAGE_STRATEGIES_SUCCESS).toEqual('LOAD_BROKERAGE_STRATEGIES_SUCCESS');
  expect(actionTypes.LOAD_BROKERAGE_STRATEGIES_FAILED).toEqual('LOAD_BROKERAGE_STRATEGIES_FAILED');
  expect(actionTypes.LOAD_BROKERAGE_STRATEGIES_CANCELLED).toEqual('LOAD_BROKERAGE_STRATEGIES_CANCELLED');
  expect(actionTypes.LOAD_DEAL_FAILED).toEqual('LOAD_DEAL_FAILED');
  expect(actionTypes.LOAD_DEAL_SUCCESS).toEqual('LOAD_DEAL_SUCCESS');
  expect(actionTypes.CHANGE_DEAL_EDIT_STATUS).toEqual('CHANGE_DEAL_EDIT_STATUS');
  expect(actionTypes.CHANGE_RE_ALLOCATION_SIDE).toEqual('CHANGE_RE_ALLOCATION_SIDE');
  expect(actionTypes.UPDATE_DEAL_OBJECT).toEqual('UPDATE_DEAL_OBJECT');
  expect(actionTypes.EDIT_DEAL_SUCCESS).toEqual('EDIT_DEAL_SUCCESS');
  expect(actionTypes.EDIT_DEAL_FAILED).toEqual('EDIT_DEAL_FAILED');
  expect(actionTypes.UPDATE_ORIGINAL_DEAL).toEqual('UPDATE_ORIGINAL_DEAL');
});

test('ids returns the correct number of keys and correct values', () => {
  expect(ids.STRATEGY).toEqual('strategy');
  expect(ids.CURRENCY_1).toEqual('currency1');
  expect(ids.CURRENCY_2).toEqual('currency2');
  expect(ids.RATE_1).toEqual('rate1');
  expect(ids.RATE_2).toEqual('rate2');
  expect(ids.POINTS).toEqual('points');
  expect(ids.TERM_1).toEqual('term1');
  expect(ids.TERM_2).toEqual('term2');
  expect(ids.AMOUNT_1).toEqual('amount1');
  expect(ids.AMOUNT_2).toEqual('amount2');
  expect(ids.INTEREST).toEqual('interest');
  expect(ids.VALUE_DATE_1).toEqual('valueDate1');
  expect(ids.VALUE_DATE_2).toEqual('valueDate2');
  expect(ids.PUBLISH_DATE_1).toEqual('publishDate1');
  expect(ids.PUBLISH_DATE_2).toEqual('publishDate2');
  expect(ids.FIXING_DATE_1).toEqual('fixingDate1');
  expect(ids.FIXING_DATE_2).toEqual('fixingDate2');
  expect(ids.SPOT_DATE).toEqual('spotDate');
  expect(ids.DAY_COUNT_1).toEqual('dayCount1');
  expect(ids.DAY_COUNT_2).toEqual('dayCount2');
  expect(ids.DEALT_CURRENCY).toEqual('dealtCurrency');
  expect(ids.BUYER_AGENT).toEqual('buyerAgent');
  expect(ids.SELLER_AGENT).toEqual('sellerAgent');
  expect(ids.CP2_BUYER_AGENT).toEqual('cp2BuyerAgent');
  expect(ids.CP2_SELLER_AGENT).toEqual('cp2SellerAgent');
  expect(ids.BUYER_CLIENT_TRADER).toEqual('buyerClientTrader');
  expect(ids.SELLER_CLIENT_TRADER).toEqual('sellerClientTrader');
  expect(ids.CP2_SELLER_CLIENT_TRADER).toEqual('cp2SellerClientTrader');
  expect(ids.CP2_BUYER_CLIENT_TRADER).toEqual('cp2BuyerClientTrader');
  expect(ids.BUYER_BROKER).toEqual('buyerBroker');
  expect(ids.SELLER_BROKER).toEqual('sellerBroker');
  expect(ids.IS_AGENT).toEqual('agent');
  expect(ids.EXECUTION_VENUE).toEqual('executionVenue');
  expect(ids.VOLUME_MATCH).toEqual('volumeMatch');
  expect(ids.IS_TRADE_DATE_ENABLED).toEqual('isTradeDateEnabled');
  expect(ids.TRADE_DATE).toEqual('tradeDate');
  expect(ids.TRADE_TIME).toEqual('tradeTime');
  expect(ids.TURN_TRADE).toEqual('turnTrade');
  expect(ids.DEAL_TYPE).toEqual('dealType');
  expect(ids.CANCEL).toEqual('cancel');
  expect(ids.SUBMIT).toEqual('submit');
  expect(ids.SELECTED_BROKERS).toEqual('selectedBrokers');
  expect(ids.DESK).toEqual('desk');
  expect(ids.TRADE_DURATION).toEqual('tradeDuration');
  expect(ids.SCALING_FACTOR).toEqual('scalingFactor');
  expect(ids.FORWARD_START).toEqual('forwardStart');
  expect(ids.DURATION_SPOT_TO_END).toEqual('durationSpotToEnd');
  expect(ids.INSTRUMENT_ID).toEqual('instrumentId');
  expect(ids.CLS_1).toEqual('cls1');
  expect(ids.CLS_2).toEqual('cls2');
  expect(ids.PRIMARY_DELIVERY_CURRENCIES).toEqual('primaryDeliveryCurrencies');
  expect(ids.PRIMARY_EXERCISE_CURRENCIES).toEqual('primaryExerciseCurrencies');
  expect(ids.SECONDARY_DELIVERY_CURRENCIES).toEqual('secondaryDeliveryCurrencies');
  expect(ids.SECONDARY_EXERCISE_CURRENCIES).toEqual('secondaryExerciseCurrencies');
  expect(ids.DATE_FROM).toEqual('dateFrom');
  expect(ids.DATE_TO).toEqual('dateTo');
  expect(ids.DEAL_ID).toEqual('dealId');
  expect(ids.BROKER).toEqual('broker');
  expect(ids.CUSTOMER).toEqual('customer');
  expect(ids.TRADER).toEqual('trader');
  expect(ids.BROKERAGE_STRATEGY).toEqual('brokerageStrategy');

  expect(Object.keys(ids).length).toEqual(63);
});

test('strategies returns the correct number of keys and correct values', () => {
  expect(Object.keys(strategies).length).toEqual(3);

  expect(Object.keys(strategies.NDF).length).toEqual(2);
  expect(strategies.NDF.OUTRIGHT).toEqual('Outright');
  expect(strategies.NDF.SPREAD).toEqual('Spread');

  expect(Object.keys(strategies.FWD).length).toEqual(4);
  expect(strategies.FWD.OUTRIGHT).toEqual('Outright');
  expect(strategies.FWD.FORWARD).toEqual('Forward');
  expect(strategies.FWD.FORWARD_FORWARD).toEqual('Forward Forward');
  expect(strategies.FWD.FORWARD_SPREAD).toEqual('Forward Spread');

  expect(Object.keys(strategies.SPT).length).toEqual(1);
  expect(strategies.SPT.SPOT).toEqual('Spot');
});

test('strategyOptions returns the correct number of keys and correct values', () => {
  expect(Object.keys(strategyOptions).length).toEqual(3);

  expect(strategyOptions.NDF.length).toEqual(2);
  expect(strategyOptions.NDF[0].name).toEqual('Outright');
  expect(strategyOptions.NDF[0].isDisabled).toBeFalsy();
  expect(strategyOptions.NDF[1].name).toEqual('Spread');
  expect(strategyOptions.NDF[1].isDisabled).toBeFalsy();

  expect(strategyOptions.FWD.length).toEqual(3);
  expect(strategyOptions.FWD[0].name).toEqual('Forward');
  expect(strategyOptions.FWD[0].isDisabled).toBeFalsy();
  expect(strategyOptions.FWD[1].name).toEqual('Forward Forward');
  expect(strategyOptions.FWD[1].isDisabled).toBeFalsy();
  expect(strategyOptions.FWD[2].name).toEqual('Outright');
  expect(strategyOptions.FWD[2].isDisabled).toBeFalsy();

  expect(strategyOptions.SPT.length).toEqual(1);
  expect(strategyOptions.SPT[0].name).toEqual('Spot');
  expect(strategyOptions.SPT[0].isDisabled).toBeFalsy();
});

test('strategyScopeMap returns the correct number of keys and correct values', () => {
  expect(Object.keys(strategyScopeMap).length).toEqual(6);
  expect(strategyScopeMap.NDF_OUTRIGHT).toEqual('Outright');
  expect(strategyScopeMap.NDF_SPREAD).toEqual('Spread');
  expect(strategyScopeMap.FWD_FORWARD).toEqual('Forward');
  expect(strategyScopeMap.FWD_FORWARD_FORWARD).toEqual('Forward Forward');
  expect(strategyScopeMap.FWD_SPREAD).toEqual('Forward Spread');
  expect(strategyScopeMap.FWD_OUTRIGHT).toEqual('Outright');
});

test('dealTypes returns the correct number of keys and correct values', () => {
  expect(Object.keys(dealTypes).length).toEqual(3);
  expect(dealTypes.NDF).toEqual('NDF');
  expect(dealTypes.FWD).toEqual('FWD');
  expect(dealTypes.SPT).toEqual('SPT');
});

test('productTypes returns the correct number of keys and correct values', () => {
  expect(Object.keys(productTypes).length).toEqual(1);
  expect(productTypes.FX).toEqual('FX');
});

test('favorites returns the correct number of keys and correct values', () => {
  expect(Object.keys(favorites).length).toEqual(6);
  expect(favorites.CLIENT_TRADER).toEqual('Client/Trader');
  expect(favorites.BROKER).toEqual('Broker');
  expect(favorites.CCY_PAIR).toEqual('Currency Pair');
  expect(favorites.TERM).toEqual('Term');
  expect(favorites.EXECUTION_VENUE).toEqual('Execution Venue');
  expect(favorites.FIRMS).toEqual('Firm');
});

test('api returns the correct number of keys and correct values', () => {
  expect(Object.keys(api).length).toEqual(39);
  expect(api.ADD_DEAL).toEqual(`${process.env.REACT_APP_API_URL}/services/deals`);
  expect(api.LOAD_DEAL).toEqual(`${process.env.REACT_APP_API_URL}/services/deal`);
  expect(api.GET_BROKERS).toEqual(`${process.env.REACT_APP_API_URL}/services/brokers/`);
  expect(api.GET_CURRENCY_PAIR_LIST).toEqual(`${process.env.REACT_APP_API_URL}/services/currencyPairList`);
  expect(api.UPDATE_CURRENCY_PAIR_CLS).toEqual(`${process.env.REACT_APP_API_URL}/services/currencyPairList/CLS/createOrUpdate`);
  expect(api.GET_CLIENTS).toEqual(`${process.env.REACT_APP_API_URL}/services/clients/`);
  expect(api.GET_PRICING).toEqual(`${process.env.REACT_APP_API_URL}/services/pricing/`);
  expect(api.GET_USER_ACCESS_INFORMATION).toEqual(`${process.env.REACT_APP_API_URL}/services/user/accessInformation`);
  expect(api.READ_USER_PREFERENCES).toEqual(`${process.env.REACT_APP_API_URL}/services/user/preferences`);
  expect(api.CHANGE_USER_PREFERENCES).toEqual(`${process.env.REACT_APP_API_URL}/services/user/preferences`);
  expect(api.GET_NDF_DATES).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/ndf/dates/for/`);
  expect(api.GET_NDF_OUTRIGHT_DATES_BY_TENOR).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/ndf/outright/tenors`);
  expect(api.GET_NDF_OUTRIGHT_DATES_BY_VALUE_DATE).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/ndf/outright/dates`);
  expect(api.GET_NDF_SPREAD_DATES_BY_TENOR).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/ndf/tenors`);
  expect(api.GET_NDF_SPREAD_DATES_BY_VALUE_DATE).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/ndf/dates`);
  expect(api.GET_FWD_DATES).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/fwd/`);
  expect(api.GET_FWD_TERMS_BY_VALUE_DATE).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/fwd/dates`);
  expect(api.GET_FWD_DATES_BY_TENOR).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/fwd/tenors`);
  expect(api.GET_FWD_OUTRIGHT_TERMS_BY_VALUE_DATE).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/fwd/outright/dates`);
  expect(api.GET_FWD_OUTRIGHT_DATES_BY_TENOR).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/fwd/outright/tenors`);
  expect(api.GET_AGENTS).toEqual(`${process.env.REACT_APP_API_URL}/services/agents/`);
  expect(api.GET_EXECUTION_VENUES).toEqual(`${process.env.REACT_APP_API_URL}/services/executionVenues/`);
  expect(api.GET_DESKS).toEqual(`${process.env.REACT_APP_API_URL}/services/desks`);
  expect(api.UPDATE_BROKERS).toEqual(`${process.env.REACT_APP_API_URL}/services/brokers/`);
  expect(api.GET_SPT_VALUE_DATE).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/spt/tenors`);
  expect(api.GET_SPT_DAY_COUNTS).toEqual(`${process.env.REACT_APP_API_URL}/services/dates/spt/dates`);
  expect(api.GET_BLOTTER_DEALS).toEqual(`${process.env.REACT_APP_API_URL}/services/deals/`);
  expect(api.BLOTTER_SSE_URL).toEqual(`${process.env.REACT_APP_API_URL}/ssesubscribe`);
  expect(api.SSE_ECHO_RESPONSE).toEqual(`${process.env.REACT_APP_API_URL}/services/sse/pong/`);
  expect(api.APPROVE_DEAL_STAGE).toEqual(`${process.env.REACT_APP_API_URL}/services/approvals/`);
  expect(api.GET_BLOTTER_SEARCH_DATE_RANGE_LIMIT).toEqual(`${process.env.REACT_APP_API_URL}/services/systemSettings/blotterDateRangeLimit`);
  expect(api.GET_LICENSE_KEY).toEqual(`${process.env.REACT_APP_API_URL}/services/systemSettings/licenseKey`);
  expect(api.GET_BLOTTER_RTU_COUNT).toEqual(`${process.env.REACT_APP_API_URL}/services/rtu/blottercount/`);
  expect(api.TERMINATE_SSE_SESSION).toEqual(`${process.env.REACT_APP_API_URL}/services/rtu/terminate/`);
  expect(api.TOGGLE_DEAL_INVESTIGATION_FLAG).toEqual(`${process.env.REACT_APP_API_URL}/services/deals/setInvestigationFlag`);
  expect(api.GET_BROKERAGE_STRATEGIES).toEqual(`${process.env.REACT_APP_API_URL}/services/brokerage/fx/brokerageStrategy`);
  expect(api.GET_DEAL_CURRENCIES).toEqual(`${process.env.REACT_APP_API_URL}/services/currency/all`);
  expect(api.GET_DEAL_BROKERS).toEqual(`${process.env.REACT_APP_API_URL}/services/brokers/allDetails`);
  expect(api.EDIT_DEAL).toEqual(`${process.env.REACT_APP_API_URL}/services/deal/`);
});

test('MAX_LIMITS returns the correct number of keys and correct values', () => {
  // NDF LIMITS
  expect(Object.keys(MAX_LIMITS).length).toEqual(3);

  expect(Object.keys(MAX_LIMITS.NDF).length).toEqual(6);
  expect(Object.keys(MAX_LIMITS.NDF.RATE).length).toEqual(2);
  expect(MAX_LIMITS.NDF.RATE.INTEGER).toEqual(5);
  expect(MAX_LIMITS.NDF.RATE.PRECISION).toEqual(6);

  expect(Object.keys(MAX_LIMITS.NDF.POINTS).length).toEqual(2);
  expect(MAX_LIMITS.NDF.POINTS.INTEGER).toEqual(5);
  expect(MAX_LIMITS.NDF.POINTS.PRECISION).toEqual(6);

  expect(Object.keys(MAX_LIMITS.NDF.AMOUNT).length).toEqual(2);
  expect(MAX_LIMITS.NDF.AMOUNT.INTEGER).toEqual(11);
  expect(MAX_LIMITS.NDF.AMOUNT.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.NDF.AMOUNT_EXT).length).toEqual(2);
  expect(MAX_LIMITS.NDF.AMOUNT_EXT.INTEGER).toEqual(12);
  expect(MAX_LIMITS.NDF.AMOUNT_EXT.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.NDF.BROKERAGE_AMOUNT).length).toEqual(2);
  expect(MAX_LIMITS.NDF.BROKERAGE_AMOUNT.INTEGER).toEqual(12);
  expect(MAX_LIMITS.NDF.BROKERAGE_AMOUNT.PRECISION).toEqual(4);

  expect(Object.keys(MAX_LIMITS.NDF.ALLOCATION_PERCENTAGE).length).toEqual(2);
  expect(MAX_LIMITS.NDF.ALLOCATION_PERCENTAGE.INTEGER).toEqual(3);
  expect(MAX_LIMITS.NDF.ALLOCATION_PERCENTAGE.PRECISION).toEqual(2);

  // FWD LIMITS
  expect(Object.keys(MAX_LIMITS.FWD).length).toEqual(7);

  expect(Object.keys(MAX_LIMITS.FWD.RATE).length).toEqual(2);
  expect(MAX_LIMITS.FWD.RATE.INTEGER).toEqual(5);
  expect(MAX_LIMITS.FWD.RATE.PRECISION).toEqual(8);

  expect(Object.keys(MAX_LIMITS.FWD.POINTS).length).toEqual(2);
  expect(MAX_LIMITS.FWD.POINTS.INTEGER).toEqual(5);
  expect(MAX_LIMITS.FWD.POINTS.PRECISION).toEqual(8);

  expect(Object.keys(MAX_LIMITS.FWD.AMOUNT).length).toEqual(2);
  expect(MAX_LIMITS.FWD.AMOUNT.INTEGER).toEqual(11);
  expect(MAX_LIMITS.FWD.AMOUNT.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.FWD.AMOUNT_EXT).length).toEqual(2);
  expect(MAX_LIMITS.FWD.AMOUNT_EXT.INTEGER).toEqual(12);
  expect(MAX_LIMITS.FWD.AMOUNT_EXT.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.FWD.INTEREST).length).toEqual(2);
  expect(MAX_LIMITS.FWD.INTEREST.INTEGER).toEqual(3);
  expect(MAX_LIMITS.FWD.INTEREST.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.FWD.BROKERAGE_AMOUNT).length).toEqual(2);
  expect(MAX_LIMITS.FWD.BROKERAGE_AMOUNT.INTEGER).toEqual(12);
  expect(MAX_LIMITS.FWD.BROKERAGE_AMOUNT.PRECISION).toEqual(4);

  expect(Object.keys(MAX_LIMITS.FWD.ALLOCATION_PERCENTAGE).length).toEqual(2);
  expect(MAX_LIMITS.FWD.ALLOCATION_PERCENTAGE.INTEGER).toEqual(3);
  expect(MAX_LIMITS.FWD.ALLOCATION_PERCENTAGE.PRECISION).toEqual(2);

  // SPT LIMITS
  expect(Object.keys(MAX_LIMITS.SPT).length).toEqual(5);

  expect(Object.keys(MAX_LIMITS.SPT.RATE).length).toEqual(2);
  expect(MAX_LIMITS.SPT.RATE.INTEGER).toEqual(5);
  expect(MAX_LIMITS.SPT.RATE.PRECISION).toEqual(8);

  expect(Object.keys(MAX_LIMITS.SPT.AMOUNT).length).toEqual(2);
  expect(MAX_LIMITS.SPT.AMOUNT.INTEGER).toEqual(11);
  expect(MAX_LIMITS.SPT.AMOUNT.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.SPT.AMOUNT_EXT).length).toEqual(2);
  expect(MAX_LIMITS.SPT.AMOUNT_EXT.INTEGER).toEqual(12);
  expect(MAX_LIMITS.SPT.AMOUNT_EXT.PRECISION).toEqual(3);

  expect(Object.keys(MAX_LIMITS.SPT.BROKERAGE_AMOUNT).length).toEqual(2);
  expect(MAX_LIMITS.SPT.BROKERAGE_AMOUNT.INTEGER).toEqual(12);
  expect(MAX_LIMITS.SPT.BROKERAGE_AMOUNT.PRECISION).toEqual(4);

  expect(Object.keys(MAX_LIMITS.SPT.ALLOCATION_PERCENTAGE).length).toEqual(2);
  expect(MAX_LIMITS.SPT.ALLOCATION_PERCENTAGE.INTEGER).toEqual(3);
  expect(MAX_LIMITS.SPT.ALLOCATION_PERCENTAGE.PRECISION).toEqual(2);
});

test('specialTermsPerStrategy returns the correct number of keys and correct values', () => {
  expect(specialTermsPerStrategy.length).toEqual(5);

  const [first, second, third, fourth, fifth] = specialTermsPerStrategy;

  expect(Object.keys(first).length).toEqual(3);

  expect(first.dealType).toEqual('NDF');
  expect(first.strategy).toEqual('Outright');
  expect(first.terms[0]).toEqual('TOM');
  expect(first.terms[1]).toEqual('TOD');

  expect(second.dealType).toEqual('NDF');
  expect(second.strategy).toEqual('Spread');
  expect(second.terms[0]).toEqual('TOM');
  expect(second.terms[1]).toEqual('TOD');

  expect(third.dealType).toEqual('FWD');
  expect(third.strategy).toEqual('Forward');
  expect(third.terms[0]).toEqual('ON');
  expect(third.terms[1]).toEqual('TN');
  expect(third.terms[2]).toEqual('SN');

  expect(fourth.dealType).toEqual('FWD');
  expect(fourth.strategy).toEqual('Forward Forward');
  expect(fourth.terms.length).toEqual(0);

  expect(fifth.dealType).toEqual('FWD');
  expect(fifth.strategy).toEqual('Outright');
  expect(fifth.terms.length).toEqual(0);
});

test('favouritesColours returns the correct number of keys and correct values', () => {
  expect(favouritesColours.length).toEqual(9);

  expect(Object.keys(favouritesColours[0]).length).toEqual(3);

  expect(favouritesColours[0].ID).toEqual(1);
  expect(favouritesColours[0].NAME).toEqual('Default');
  expect(favouritesColours[0].VALUE).toEqual('#199bbe');

  expect(favouritesColours[1].ID).toEqual(2);
  expect(favouritesColours[1].NAME).toEqual('Red');
  expect(favouritesColours[1].VALUE).toEqual('#f5222d');

  expect(favouritesColours[2].ID).toEqual(3);
  expect(favouritesColours[2].NAME).toEqual('Orange');
  expect(favouritesColours[2].VALUE).toEqual('#fa541c');

  expect(favouritesColours[3].ID).toEqual(4);
  expect(favouritesColours[3].NAME).toEqual('Yellow');
  expect(favouritesColours[3].VALUE).toEqual('#faad14');

  expect(favouritesColours[4].ID).toEqual(5);
  expect(favouritesColours[4].NAME).toEqual('Green');
  expect(favouritesColours[4].VALUE).toEqual('#389e0d');

  expect(favouritesColours[5].ID).toEqual(6);
  expect(favouritesColours[5].NAME).toEqual('Blue');
  expect(favouritesColours[5].VALUE).toEqual('#1890ff');

  expect(favouritesColours[6].ID).toEqual(7);
  expect(favouritesColours[6].NAME).toEqual('Indigo');
  expect(favouritesColours[6].VALUE).toEqual('#2f54eb');

  expect(favouritesColours[7].ID).toEqual(8);
  expect(favouritesColours[7].NAME).toEqual('Purple');
  expect(favouritesColours[7].VALUE).toEqual('#722ed1');

  expect(favouritesColours[8].ID).toEqual(9);
  expect(favouritesColours[8].NAME).toEqual('Magenta');
  expect(favouritesColours[8].VALUE).toEqual('#eb2f96');
});

test('settingsProperties returns the correct number of keys and correct values', () => {
  expect(Object.keys(settingsProperties).length).toEqual(4);

  expect(settingsProperties[0].tabKey).toEqual('tailorRatesFeed');
  expect(settingsProperties[0].tabLabel).toEqual('Tailor Rates Feed');
  expect(Object.keys(settingsProperties[0].items).length).toEqual(1);

  expect(settingsProperties[0].items.ratesFeed.type).toEqual('switch');
  expect(settingsProperties[0].items.ratesFeed.label).toEqual('Rates feed');

  expect(settingsProperties[1].tabKey).toEqual('clientManager');
  expect(settingsProperties[1].tabLabel).toEqual('Client Manager');
  expect(Object.keys(settingsProperties[1].items).length).toEqual(5);

  expect(settingsProperties[1].items.displayClients.type).toEqual('switch');
  expect(settingsProperties[1].items.displayClients.label).toEqual('Grouping by Firm');
  expect(settingsProperties[1].items.displayClientFavourites.type).toEqual('switch');
  expect(settingsProperties[1].items.displayClientFavourites.label).toEqual('Client/Traders Favourites');
  expect(settingsProperties[1].items.displayCurrencyFavourites.type).toEqual('switch');
  expect(settingsProperties[1].items.displayCurrencyFavourites.label).toEqual('Currency Favourites');
  expect(settingsProperties[1].items.displayTermFavourites.type).toEqual('switch');
  expect(settingsProperties[1].items.displayTermFavourites.label).toEqual('Term Favourites');
  expect(settingsProperties[1].items.displayExecutionVenueFavourites.type).toEqual('switch');
  expect(settingsProperties[1].items.displayExecutionVenueFavourites.label).toEqual('Execution Venue Favourites');

  expect(settingsProperties[2].tabKey).toEqual('general');
  expect(settingsProperties[2].tabLabel).toEqual('General');
  expect(Object.keys(settingsProperties[2].items).length).toEqual(3);

  expect(settingsProperties[2].items.displayExecutionVenueColours.type).toEqual('switch');
  expect(settingsProperties[2].items.displayExecutionVenueColours.label).toEqual('Enable Execution Venue Colours');
  expect(settingsProperties[2].items.displayClsDefaults.type).toEqual('switch');
  expect(settingsProperties[2].items.displayClsDefaults.label).toEqual('Use CLS default values');
  expect(settingsProperties[2].items.defaultEntryPage.type).toEqual('select');
  expect(settingsProperties[2].items.defaultEntryPage.label).toEqual('Default Entry Page');

  expect(settingsProperties[3].tabKey).toEqual('FWDTradeCapture');
  expect(settingsProperties[3].tabLabel).toEqual('FWD Trade Capture');
  expect(Object.keys(settingsProperties[3].items).length).toEqual(1);

  expect(settingsProperties[3].items.lrMode.type).toEqual('switch');
  expect(settingsProperties[3].items.lrMode.label).toEqual('Counterparty L/R Mode');
});

test('favouritesIcons returns the correct number of keys and correct values', () => {
  expect(favouritesIcons.length).toEqual(5);
  expect(Object.keys(favouritesIcons[0]).length).toEqual(2);
  expect(favouritesIcons[0].text).toEqual('Client/Trader');
  expect(favouritesIcons[0].icon).toEqual('user');
  expect(favouritesIcons[1].text).toEqual('Currency Pair');
  expect(favouritesIcons[1].icon).toEqual('dollar');
  expect(favouritesIcons[2].text).toEqual('Term');
  expect(favouritesIcons[2].icon).toEqual('calendar');
  expect(favouritesIcons[3].text).toEqual('Execution Venue');
  expect(favouritesIcons[3].icon).toEqual('book');
  expect(favouritesIcons[4].text).toEqual('Firm');
  expect(favouritesIcons[4].icon).toEqual('bank');
});

test('Execution Venue Colours returns the correct number of keys and correct values', () => {
  expect(executionVenueColours.length).toEqual(10);

  expect(Object.keys(executionVenueColours[0]).length).toEqual(4);

  expect(executionVenueColours[0].ID).toEqual(1);
  expect(executionVenueColours[0].NAME).toEqual('Red');
  expect(executionVenueColours[0].VALUE).toEqual('#ff0000');
  expect(executionVenueColours[0].executionVenue).toEqual('TPSEF');

  expect(executionVenueColours[1].ID).toEqual(2);
  expect(executionVenueColours[1].NAME).toEqual('Blue');
  expect(executionVenueColours[1].VALUE).toEqual('#1890ff');
  expect(executionVenueColours[1].executionVenue).toEqual('XOFF');

  expect(executionVenueColours[2].ID).toEqual(3);
  expect(executionVenueColours[2].NAME).toEqual('Indigo');
  expect(executionVenueColours[2].VALUE).toEqual('#2f54eb');
  expect(executionVenueColours[2].executionVenue).toEqual('IMMM');

  expect(executionVenueColours[3].ID).toEqual(4);
  expect(executionVenueColours[3].NAME).toEqual('Cyan');
  expect(executionVenueColours[3].VALUE).toEqual('#00bcd4');
  expect(executionVenueColours[3].executionVenue).toEqual('IOMM');

  expect(executionVenueColours[4].ID).toEqual(5);
  expect(executionVenueColours[4].NAME).toEqual('Orange');
  expect(executionVenueColours[4].VALUE).toEqual('#ff9800');
  expect(executionVenueColours[4].executionVenue).toEqual('TEFD');

  expect(executionVenueColours[5].ID).toEqual(6);
  expect(executionVenueColours[5].NAME).toEqual('Olive');
  expect(executionVenueColours[5].VALUE).toEqual('#808000');
  expect(executionVenueColours[5].executionVenue).toEqual('TEIR');

  expect(executionVenueColours[6].ID).toEqual(7);
  expect(executionVenueColours[6].NAME).toEqual('Magenta');
  expect(executionVenueColours[6].VALUE).toEqual('#eb2f96');
  expect(executionVenueColours[6].executionVenue).toEqual('TEMM');

  expect(executionVenueColours[7].ID).toEqual(8);
  expect(executionVenueColours[7].NAME).toEqual('Purple');
  expect(executionVenueColours[7].VALUE).toEqual('#722ed1');
  expect(executionVenueColours[7].executionVenue).toEqual('TIRD');

  expect(executionVenueColours[8].ID).toEqual(9);
  expect(executionVenueColours[8].NAME).toEqual('Green');
  expect(executionVenueColours[8].VALUE).toEqual('#389e0d');
  expect(executionVenueColours[8].executionVenue).toEqual('TPIR');

  expect(executionVenueColours[9].ID).toEqual(10);
  expect(executionVenueColours[9].NAME).toEqual('Teal');
  expect(executionVenueColours[9].VALUE).toEqual('#009688');
  expect(executionVenueColours[9].executionVenue).toEqual('TPSD');
});

test('User permissions returns the correct number of keys and correct values', () => {
  expect(Object.keys(userPermissions).length).toEqual(9);

  expect(userPermissions.BLOTTER_EDIT).toEqual('BLOTTER.EDIT');
  expect(userPermissions.BLOTTER_VIEW).toEqual('BLOTTER.VIEW');
  expect(userPermissions.DESK_EDIT).toEqual('DESK.EDIT');
  expect(userPermissions.TRADECAPTURE_FWD_ENTRY).toEqual('TRADECAPTURE.FWD.ENTRY');
  expect(userPermissions.TRADECAPTURE_NDF_ENTRY).toEqual('TRADECAPTURE.NDF.ENTRY');
  expect(userPermissions.TRADECAPTURE_SPT_ENTRY).toEqual('TRADECAPTURE.SPT.ENTRY');
  expect(userPermissions.SEF_DEAL_APPROVE).toEqual('SEF.DEAL.APPROVE');
  expect(userPermissions.NONSEF_DEAL_APPROVE).toEqual('NONSEF.DEAL.APPROVE');
  expect(userPermissions.TRADE_MANAGEMENT_VIEW).toEqual('TRADE.MANAGEMENT.VIEW');
});

test('Blotter Stp Statuses Map returns the correct number of keys and correct values', () => {
  expect(Object.keys(blotterStpStatusesMap).length).toEqual(14);

  expect(Object.keys(blotterStpStatusesMap.TMMSENT).length).toEqual(2);
  expect(blotterStpStatusesMap.TMMSENT.color).toEqual('lightgray');
  expect(blotterStpStatusesMap.TMMSENT.title).toEqual('TMMSENT');

  expect(Object.keys(blotterStpStatusesMap.REJECT).length).toEqual(2);
  expect(blotterStpStatusesMap.REJECT.color).toEqual('red');
  expect(blotterStpStatusesMap.REJECT.title).toEqual('REJECT, CANCELLED, WITHDRAWN, REJECTED');

  expect(Object.keys(blotterStpStatusesMap.CANCELLED).length).toEqual(2);
  expect(blotterStpStatusesMap.CANCELLED.color).toEqual('red');
  expect(blotterStpStatusesMap.CANCELLED.title).toEqual('REJECT, CANCELLED, WITHDRAWN, REJECTED');

  expect(Object.keys(blotterStpStatusesMap.WITHDRAWN).length).toEqual(2);
  expect(blotterStpStatusesMap.WITHDRAWN.color).toEqual('red');
  expect(blotterStpStatusesMap.WITHDRAWN.title).toEqual('REJECT, CANCELLED, WITHDRAWN, REJECTED');

  expect(Object.keys(blotterStpStatusesMap.REJECTED).length).toEqual(2);
  expect(blotterStpStatusesMap.REJECTED.color).toEqual('red');
  expect(blotterStpStatusesMap.REJECTED.title).toEqual('REJECT, CANCELLED, WITHDRAWN, REJECTED');

  expect(Object.keys(blotterStpStatusesMap.TMMSENT).length).toEqual(2);
  expect(blotterStpStatusesMap.DELIVERED.color).toEqual('yellow');
  expect(blotterStpStatusesMap.DELIVERED.title).toEqual('DELIVERED, PICKEDUP, PENDING');

  expect(Object.keys(blotterStpStatusesMap.PICKEDUP).length).toEqual(2);
  expect(blotterStpStatusesMap.PICKEDUP.color).toEqual('yellow');
  expect(blotterStpStatusesMap.PICKEDUP.title).toEqual('DELIVERED, PICKEDUP, PENDING');

  expect(Object.keys(blotterStpStatusesMap.PICKEDUP).length).toEqual(2);
  expect(blotterStpStatusesMap.PENDING.color).toEqual('yellow');
  expect(blotterStpStatusesMap.PENDING.title).toEqual('DELIVERED, PICKEDUP, PENDING');

  expect(Object.keys(blotterStpStatusesMap.TMMSENDFAILURE).length).toEqual(2);
  expect(blotterStpStatusesMap.TMMSENDFAILURE.color).toEqual('black');
  expect(blotterStpStatusesMap.TMMSENDFAILURE.title).toEqual('TMMSENDFAILURE');

  expect(Object.keys(blotterStpStatusesMap.UNKNOWN).length).toEqual(2);
  expect(blotterStpStatusesMap.UNKNOWN.color).toEqual('darkgray');
  expect(blotterStpStatusesMap.UNKNOWN.title).toEqual('UNKNOWN');

  expect(Object.keys(blotterStpStatusesMap.AFFIRMED).length).toEqual(2);
  expect(blotterStpStatusesMap.AFFIRMED.color).toEqual('green');
  expect(blotterStpStatusesMap.AFFIRMED.title).toEqual('AFFIRMED, CLEARED, CONFIRM, REPORTED');

  expect(Object.keys(blotterStpStatusesMap.CLEARED).length).toEqual(2);
  expect(blotterStpStatusesMap.CLEARED.color).toEqual('green');
  expect(blotterStpStatusesMap.CLEARED.title).toEqual('AFFIRMED, CLEARED, CONFIRM, REPORTED');

  expect(Object.keys(blotterStpStatusesMap.CONFIRM).length).toEqual(2);
  expect(blotterStpStatusesMap.CONFIRM.color).toEqual('green');
  expect(blotterStpStatusesMap.CONFIRM.title).toEqual('AFFIRMED, CLEARED, CONFIRM, REPORTED');

  expect(Object.keys(blotterStpStatusesMap.REPORTED).length).toEqual(2);
  expect(blotterStpStatusesMap.REPORTED.color).toEqual('green');
  expect(blotterStpStatusesMap.REPORTED.title).toEqual('AFFIRMED, CLEARED, CONFIRM, REPORTED');
});

test('Blotter approvals Map returns the correct number of keys and correct values', () => {
  expect(Object.keys(blotterApprovalsMap).length).toEqual(3);

  expect(Object.keys(blotterApprovalsMap.APPROVED).length).toEqual(2);
  expect(blotterApprovalsMap.APPROVED.value).toEqual('APPROVED');
  expect(blotterApprovalsMap.APPROVED.className).toEqual('success approved');

  expect(Object.keys(blotterApprovalsMap.PENDING).length).toEqual(2);
  expect(blotterApprovalsMap.PENDING.value).toEqual('PENDING');
  expect(blotterApprovalsMap.PENDING.className).toEqual('warning pending');

  expect(Object.keys(blotterApprovalsMap.REJECTED).length).toEqual(2);
  expect(blotterApprovalsMap.REJECTED.value).toEqual('REJECTED');
  expect(blotterApprovalsMap.REJECTED.className).toEqual('error rejected');
});

test('Nav Menu Items Map returns the correct number of keys and correct values', () => {
  expect(Object.keys(navMenuItems).length).toEqual(6);

  expect(Object.keys(navMenuItems.ADMIN).length).toEqual(4);
  expect(navMenuItems.ADMIN.key).toEqual('ADMIN');
  expect(navMenuItems.ADMIN.text).toEqual('Admin');
  expect(navMenuItems.ADMIN.to).toEqual('/admin');
  expect(navMenuItems.ADMIN.documentTitle).toEqual('Admin');

  expect(Object.keys(navMenuItems.BLOTTER).length).toEqual(4);
  expect(navMenuItems.BLOTTER.key).toEqual('BLOTTER');
  expect(navMenuItems.BLOTTER.text).toEqual('Blotter');
  expect(navMenuItems.BLOTTER.to).toEqual('/blotter');
  expect(navMenuItems.BLOTTER.documentTitle).toEqual('Blotter');

  expect(Object.keys(navMenuItems.FWD).length).toEqual(4);
  expect(navMenuItems.FWD.key).toEqual('FWD');
  expect(navMenuItems.FWD.text).toEqual('FWD');
  expect(navMenuItems.FWD.to).toEqual('/deal/FWD');
  expect(navMenuItems.FWD.documentTitle).toEqual('FWD');

  expect(Object.keys(navMenuItems.NDF).length).toEqual(4);
  expect(navMenuItems.NDF.key).toEqual('NDF');
  expect(navMenuItems.NDF.text).toEqual('NDF');
  expect(navMenuItems.NDF.to).toEqual('/deal/NDF');
  expect(navMenuItems.NDF.documentTitle).toEqual('NDF');

  expect(Object.keys(navMenuItems.SPT).length).toEqual(4);
  expect(navMenuItems.SPT.key).toEqual('SPT');
  expect(navMenuItems.SPT.text).toEqual('SPT');
  expect(navMenuItems.SPT.to).toEqual('/deal/SPT');
  expect(navMenuItems.SPT.documentTitle).toEqual('Spot');

  expect(Object.keys(navMenuItems.EDIT).length).toEqual(4);
  expect(navMenuItems.EDIT.key).toEqual('EDIT');
  expect(navMenuItems.EDIT.text).toEqual('EDIT');
  expect(navMenuItems.EDIT.to).toEqual('/dealedit');
  expect(navMenuItems.EDIT.documentTitle).toEqual('Deal Edit');
});
