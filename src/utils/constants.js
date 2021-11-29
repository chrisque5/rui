export const actionTypes = {
  CREATE_DEAL_SUCCESS: 'CREATE_DEAL_SUCCESS',
  CREATE_DEAL_FAILED: 'CREATE_DEAL_FAILED',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAILED: 'LOAD_USER_FAILED',
  LOAD_DATES_SUCCESS: 'LOAD_DATES_SUCCESS',
  LOAD_DATES_FAILED: 'LOAD_DATES_FAILED',
  LOAD_DATES_CANCELLED: 'LOAD_DATES_CANCELLED',
  LOAD_DATES_IN_PROGRESS: 'LOAD_DATES_IN_PROGRESS',
  LOAD_TERMS_SUCCESS: 'LOAD_TERMS_SUCCESS',
  LOAD_TERMS_FAILED: 'LOAD_TERMS_FAILED',
  LOAD_CURRENCIES_SUCCESS: 'LOAD_CURRENCIES_SUCCESS',
  LOAD_CURRENCIES_FAILED: 'LOAD_CURRENCIES_FAILED',
  RESET_CURRENCIES: 'RESET_CURRENCIES',
  LOAD_CURRENCIES_CANCELLED: 'LOAD_CURRENCIES_CANCELLED',
  UPDATE_CURRENCY_PAIR_CLS_SUCCESS: 'UPDATE_CURRENCYPAIR_CLS_SUCCESS',
  UPDATE_CURRENCY_PAIR_CLS_FAILED: 'UPDATE_CURRENCYPAIR_CLS_FAILED',
  LOAD_CLIENTDATA_SUCCESS: 'LOAD_CLIENTDATA_SUCCESS',
  LOAD_CLIENTDATA_FAILED: 'LOAD_CLIENTDATA_FAILED',
  LOAD_CLIENTDATA_CANCELLED: 'LOAD_CLIENTDATA_CANCELLED',
  RESET_CLIENTDATA: 'RESET_CLIENTDATA',
  LOAD_BROKERDATA_SUCCESS: 'LOAD_BROKERDATA_SUCCESS',
  LOAD_BROKERDATA_FAILED: 'LOAD_BROKERDATA_FAILED',
  LOAD_BROKERDATA_CANCELLED: 'LOAD_BROKERDATA_CANCELLED',
  RESET_BROKERDATA: 'RESET_BROKERDATA',
  UPDATE_COUNTERPARTY_SELECTION: 'UPDATE_COUNTERPARTY_SELECTION',
  UPDATE_PREFERENCE_BROKER_SELECTION: 'UPDATE_PREFERENCE_BROKER_SELECTION',
  UPDATE_LAST_TERM_SELECTION: 'UPDATE_LAST_TERM_SELECTION',
  CHANGE_TERMS: 'CHANGE_TERMS',
  CHANGE_DEALTYPE: 'CHANGE_DEALTYPE',
  CHANGE_PAGE: 'CHANGE_PAGE',
  CHANGE_STRATEGY: 'CHANGE_STRATEGY',
  LOAD_PREFERENCES_SUCCESS: 'LOAD_PREFERENCES_SUCCESS',
  LOAD_PREFERENCES_FAILED: 'LOAD_PREFERENCES_FAILED',
  CHANGE_PREFERENCE_SUCCESS: 'CHANGE_PREFERENCE_SUCCESS',
  CHANGE_PREFERENCE_FAILED: 'CHANGE_PREFERENCE_FAILED',
  DELETE_BROKER_PREFERENCE_SUCCESS: 'DELETE_BROKER_PREFERENCE_SUCCESS',
  DELETE_BROKER_PREFERENCE_FAILED: 'DELETE_BROKER_PREFERENCE_FAILED',
  ADD_CLIENTTRADER_PREFERENCE_SUCCESS: 'ADD_CLIENTTRADER_PREFERENCE_SUCCESS',
  ADD_CLIENTTRADER_PREFERENCE_FAILED: 'ADD_CLIENTTRADER_PREFERENCE_FAILED',
  RESET_UI_STATE: 'RESET_UI_STATE',
  CHANGE_CLIENT_HOVER_DATA_SUCCESS: 'CHANGE_CLIENT_HOVER_DATA_SUCCESS',
  LOAD_RATES_SUCCESS: 'LOAD_RATES_SUCCESS',
  LOAD_RATES_CANCELLED: 'LOAD_RATES_CANCELLED',
  LOAD_RATES_FAILED: 'LOAD_RATES_FAILED',
  LOAD_RATES_IN_PROGRESS: 'LOAD_RATES_IN_PROGRESS',
  TOGGLE_THIRD_CP: 'TOGGLE_THIRD_CP',
  TOGGLE_SETTINGS_MODAL: 'TOGGLE_SETTINGS_MODAL',
  RESET_DATES: 'RESET_DATES',
  LOAD_AGENTDATA_SUCCESS: 'LOAD_AGENTDATA_SUCCESS',
  LOAD_AGENTDATA_FAILED: 'LOAD_AGENTDATA_FAILED',
  LOAD_AGENTDATA_CANCELLED: 'LOAD_AGENTDATA_CANCELLED',
  RESET_AGENTDATA: 'RESET_AGENTDATA',
  LOAD_EXECUTIONVENUES_SUCCESS: 'LOAD_EXECUTIONVENUES_SUCCESS',
  LOAD_EXECUTIONVENUES_FAILED: 'LOAD_EXECUTIONVENUES_FAILED',
  LOAD_EXECUTIONVENUES_CANCELLED: 'LOAD_EXECUTIONVENUES_CANCELLED',
  RESET_EXECUTIONVENUES: 'RESET_EXECUTIONVENUES',
  TOGGLE_RENAME_FAVORITES_POPUP: 'TOGGLE_RENAME_FAVORITES_POPUP',
  TOGGLE_CHANGE_FAVORITES_COLOUR: 'TOGGLE_CHANGE_FAVORITES_COLOUR',
  ENABLE_INTEREST: 'ENABLE_INTEREST',
  UPDATE_DEFAULTS: 'UPDATE_DEFAULTS',
  ACTIVE_TOGGLE_KEY: 'ACTIVE_TOGGLE_KEY',
  LOAD_USER_PERMISSIONS: 'LOAD_USER_PERMISSIONS',
  SELECT_PREFERRED_FIRM_COMPLETE: 'SELECT_PREFERRED_FIRM_COMPLETE',
  TOGGLE_TRADE_DATE_CONFIRM_POPUP: 'TOGGLE_TRADE_DATE_CONFIRM_POPUP',
  TOGGLE_IS_TRADE_DATE_ENABLED: 'TOGGLE_IS_TRADE_DATE_ENABLED',
  TOGGLE_IS_CLS_OVERRIDE: 'TOGGLE_IS_CLS_OVERRIDE',
  LOAD_DESKS_SUCCESS: 'LOAD_DESKS_SUCCESS',
  LOAD_DESKS_FAILED: 'LOAD_DESKS_FAILED',
  LOAD_DESKS_CANCELLED: 'LOAD_DESKS_CANCELLED',
  UPDATE_BROKER_SUCCESS: 'UPDATE_BROKER_SUCCESS',
  UPDATE_BROKER_FAILED: 'UPDATE_BROKER_FAILED',
  LOAD_GCD_BROKERDATA_SUCCESS: 'LOAD_GCD_BROKERDATA_SUCCESS',
  LOAD_GCD_BROKERDATA_FAILED: 'LOAD_GCD_BROKERDATA_FAILED',
  LOAD_BLOTTER_DEALS_IN_PROGRESS: 'LOAD_BLOTTER_DEALS_IN_PROGRESS',
  LOAD_BLOTTER_DEALS_CANCELLED: 'LOAD_BLOTTER_DEALS_CANCELLED',
  LOAD_BLOTTER_DEALS_SUCCESS: 'LOAD_BLOTTER_DEALS_SUCCESS',
  LOAD_BLOTTER_DEALS_FAILED: 'LOAD_BLOTTER_DEALS_FAILED',
  SSE_CONNECTING: 'SSE:CONNECTING',
  SSE_CONNECT: 'SSE:CONNECT',
  SSE_CONNECTED: 'SSE:CONNECTED',
  SSE_DISCONNECT: 'SSE:DISCONNECT',
  SSE_DISCONNECTING: 'SSE:SSE_DISCONNECTING',
  SSE_DISCONNECTED: 'SSE:DISCONNECTED',
  SSE_FAILED: 'SSE:FAILED',
  SSE_RESET: 'SSE:RESET',
  SSE_BLOTTER_UPDATE: 'SSE:BLOTTER_UPDATE',
  REMOVE_BLOTTER_NEW_DEAL_IDS: 'REMOVE_BLOTTER_NEW_DEAL_IDS',
  APPROVE_DEAL_STAGE_SUCCESS: 'APPROVE_DEAL_STAGE_SUCCESS',
  APPROVE_DEAL_STAGE_FAILED: 'APPROVE_DEAL_STAGE_FAILED',
  UPDATE_BLOTTER_GRID_DETAILS: 'UPDATE_BLOTTER_GRID_DETAILS',
  RESET_ADMIN_TAB_CHANGES: 'RESET_ADMIN_TAB_CHANGES',
  ENABLE_BROWSER_FORCE_REFRESH: 'ENABLE_BROWSER_FORCE_REFRESH',
  RESET_BLOTTER_SEARCH: 'RESET_BLOTTER_SEARCH',
  LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS: 'LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS',
  LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED: 'LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED',
  LOAD_LICENSE_KEY_SUCCESS: 'LOAD_LICENSE_KEY_SUCCESS',
  LOAD_LICENSE_KEY_FAILED: 'LOAD_LICENSE_KEY_FAILED',
  LOAD_BLOTTER_RTU_COUNT_SUCCESS: 'LOAD_BLOTTER_RTU_COUNT_SUCCESS',
  LOAD_BLOTTER_RTU_COUNT_FAILED: 'LOAD_BLOTTER_RTU_COUNT_FAILED',
  RESET_BLOTTER_RTU_COUNT_SUCCESS: 'RESET_BLOTTER_RTU_COUNT_SUCCESS',
  TERMINATE_SSE_SESSION_SUCCESS: 'TERMINATE_SSE_SESSION_SUCCESS',
  TERMINATE_SSE_SESSION_FAILED: 'TERMINATE_SSE_SESSION_FAILED',
  ENABLE_INVESTIGATION_FLAG_SUCCESS: 'ENABLE_INVESTIGATION_FLAG_SUCCESS',
  ENABLE_INVESTIGATION_FLAG_FAILURE: 'ENABLE_INVESTIGATION_FLAG_FAILURE',
  LOAD_BROKERAGE_STRATEGIES_SUCCESS: 'LOAD_BROKERAGE_STRATEGIES_SUCCESS',
  LOAD_BROKERAGE_STRATEGIES_FAILED: 'LOAD_BROKERAGE_STRATEGIES_FAILED',
  LOAD_BROKERAGE_STRATEGIES_CANCELLED: 'LOAD_BROKERAGE_STRATEGIES_CANCELLED',
  LOAD_DEAL_SUCCESS: 'LOAD_DEAL_SUCCESS',
  LOAD_DEAL_FAILED: 'LOAD_DEAL_FAILED',
  CHANGE_DEAL_EDIT_STATUS: 'CHANGE_DEAL_EDIT_STATUS',
  CHANGE_RE_ALLOCATION_SIDE: 'CHANGE_RE_ALLOCATION_SIDE',
  UPDATE_DEAL_OBJECT: 'UPDATE_DEAL_OBJECT',
  EDIT_DEAL_SUCCESS: 'EDIT_DEAL_SUCCESS',
  EDIT_DEAL_FAILED: 'EDIT_DEAL_FAILED',
  UPDATE_ORIGINAL_DEAL: 'UPDATE_ORIGINAL_DEAL',
};

export const ids = {
  STRATEGY: 'strategy',
  CURRENCY_1: 'currency1',
  CURRENCY_2: 'currency2',
  PRIMARY_EXERCISE_CURRENCIES: 'primaryExerciseCurrencies',
  SECONDARY_EXERCISE_CURRENCIES: 'secondaryExerciseCurrencies',
  PRIMARY_DELIVERY_CURRENCIES: 'primaryDeliveryCurrencies',
  SECONDARY_DELIVERY_CURRENCIES: 'secondaryDeliveryCurrencies',
  RATE_1: 'rate1',
  RATE_2: 'rate2',
  POINTS: 'points',
  TERM_1: 'term1',
  TERM_2: 'term2',
  AMOUNT_1: 'amount1',
  AMOUNT_2: 'amount2',
  INTEREST: 'interest',
  VALUE_DATE_1: 'valueDate1',
  VALUE_DATE_2: 'valueDate2',
  PUBLISH_DATE_1: 'publishDate1',
  PUBLISH_DATE_2: 'publishDate2',
  FIXING_DATE_1: 'fixingDate1',
  FIXING_DATE_2: 'fixingDate2',
  SPOT_DATE: 'spotDate',
  DAY_COUNT_1: 'dayCount1',
  DAY_COUNT_2: 'dayCount2',
  DEALT_CURRENCY: 'dealtCurrency',
  BUYER_AGENT: 'buyerAgent',
  SELLER_AGENT: 'sellerAgent',
  CP2_BUYER_AGENT: 'cp2BuyerAgent',
  CP2_SELLER_AGENT: 'cp2SellerAgent',
  BUYER_CLIENT_TRADER: 'buyerClientTrader',
  SELLER_CLIENT_TRADER: 'sellerClientTrader',
  CP2_SELLER_CLIENT_TRADER: 'cp2SellerClientTrader',
  CP2_BUYER_CLIENT_TRADER: 'cp2BuyerClientTrader',
  BUYER_BROKER: 'buyerBroker',
  SELLER_BROKER: 'sellerBroker',
  IS_AGENT: 'agent',
  EXECUTION_VENUE: 'executionVenue',
  VOLUME_MATCH: 'volumeMatch',
  TURN_TRADE: 'turnTrade',
  IS_TRADE_DATE_ENABLED: 'isTradeDateEnabled',
  TRADE_DATE: 'tradeDate',
  TRADE_TIME: 'tradeTime',
  DEAL_TYPE: 'dealType',
  CANCEL: 'cancel',
  SUBMIT: 'submit',
  SELECTED_BROKERS: 'selectedBrokers',
  DESK: 'desk',
  TRADE_DURATION: 'tradeDuration',
  SCALING_FACTOR: 'scalingFactor',
  FORWARD_START: 'forwardStart',
  DURATION_SPOT_TO_END: 'durationSpotToEnd',
  INSTRUMENT_ID: 'instrumentId',
  CLS_1: 'cls1',
  CLS_2: 'cls2',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  DEAL_ID: 'dealId',
  BROKER: 'broker',
  CUSTOMER: 'customer',
  TRADER: 'trader',
  BROKERAGE_STRATEGY: 'brokerageStrategy',
  BUYER_NETT_BROKERAGE: 'buyerNettBrokerage',
  SELLER_NETT_BROKERAGE: 'sellerNettBrokerage',
};

export const strategies = {
  NDF: {
    OUTRIGHT: 'Outright',
    SPREAD: 'Spread',
  },
  FWD: {
    OUTRIGHT: 'Outright',
    FORWARD: 'Forward',
    FORWARD_FORWARD: 'Forward Forward',
    FORWARD_SPREAD: 'Forward Spread',
  },
  SPT: {
    SPOT: 'Spot',
  },
};

export const strategyOptions = {
  NDF: [
    { name: 'Outright', isDisabled: false },
    { name: 'Spread', isDisabled: false },
  ],
  FWD: [
    { name: 'Forward', isDisabled: false },
    { name: 'Forward Forward', isDisabled: false },
    { name: 'Outright', isDisabled: false },
  ],
  SPT: [
    { name: 'Spot', isDisabled: false },
  ],
};

export const strategyScopeMap = {
  NDF_OUTRIGHT: 'Outright',
  NDF_SPREAD: 'Spread',
  FWD_FORWARD: 'Forward',
  FWD_FORWARD_FORWARD: 'Forward Forward',
  FWD_SPREAD: 'Forward Spread',
  FWD_OUTRIGHT: 'Outright',
};

export const dealTypes = {
  NDF: 'NDF',
  FWD: 'FWD',
  SPT: 'SPT',
};

export const productTypes = {
  FX: 'FX',
};

export const favorites = {
  CLIENT_TRADER: 'Client/Trader',
  BROKER: 'Broker',
  CCY_PAIR: 'Currency Pair',
  TERM: 'Term',
  EXECUTION_VENUE: 'Execution Venue',
  FIRMS: 'Firm',
};

export const brokerageTypes = {
  GAP_SPREAD: 'Gap Spread',
  LIQUIDITY_SWAP: 'Liquidity Swap',
  FIX: 'Fix',
};

export const api = {
  ADD_DEAL: `${process.env.REACT_APP_API_URL}/services/deals`,
  LOAD_DEAL: `${process.env.REACT_APP_API_URL}/services/deal`,
  GET_BROKERS: `${process.env.REACT_APP_API_URL}/services/brokers/`,
  GET_CURRENCY_PAIR_LIST: `${process.env.REACT_APP_API_URL}/services/currencyPairList`,
  UPDATE_CURRENCY_PAIR_CLS: `${process.env.REACT_APP_API_URL}/services/currencyPairList/CLS/createOrUpdate`,
  GET_CLIENTS: `${process.env.REACT_APP_API_URL}/services/clients/`,
  GET_PRICING: `${process.env.REACT_APP_API_URL}/services/pricing/`,
  GET_USER_ACCESS_INFORMATION: `${process.env.REACT_APP_API_URL}/services/user/accessInformation`,
  READ_USER_PREFERENCES: `${process.env.REACT_APP_API_URL}/services/user/preferences`,
  CHANGE_USER_PREFERENCES: `${process.env.REACT_APP_API_URL}/services/user/preferences`,
  GET_NDF_DATES: `${process.env.REACT_APP_API_URL}/services/dates/ndf/dates/for/`,
  GET_NDF_OUTRIGHT_DATES_BY_TENOR: `${process.env.REACT_APP_API_URL}/services/dates/ndf/outright/tenors`,
  GET_NDF_OUTRIGHT_DATES_BY_VALUE_DATE: `${process.env.REACT_APP_API_URL}/services/dates/ndf/outright/dates`,
  GET_NDF_SPREAD_DATES_BY_TENOR: `${process.env.REACT_APP_API_URL}/services/dates/ndf/tenors`,
  GET_NDF_SPREAD_DATES_BY_VALUE_DATE: `${process.env.REACT_APP_API_URL}/services/dates/ndf/dates`,
  GET_FWD_DATES: `${process.env.REACT_APP_API_URL}/services/dates/fwd/`,
  GET_FWD_TERMS_BY_VALUE_DATE: `${process.env.REACT_APP_API_URL}/services/dates/fwd/dates`,
  GET_FWD_DATES_BY_TENOR: `${process.env.REACT_APP_API_URL}/services/dates/fwd/tenors`,
  GET_FWD_OUTRIGHT_TERMS_BY_VALUE_DATE: `${process.env.REACT_APP_API_URL}/services/dates/fwd/outright/dates`,
  GET_FWD_OUTRIGHT_DATES_BY_TENOR: `${process.env.REACT_APP_API_URL}/services/dates/fwd/outright/tenors`,
  GET_SPT_VALUE_DATE: `${process.env.REACT_APP_API_URL}/services/dates/spt/tenors`,
  GET_SPT_DAY_COUNTS: `${process.env.REACT_APP_API_URL}/services/dates/spt/dates`,
  GET_AGENTS: `${process.env.REACT_APP_API_URL}/services/agents/`,
  GET_EXECUTION_VENUES: `${process.env.REACT_APP_API_URL}/services/executionVenues/`,
  GET_DESKS: `${process.env.REACT_APP_API_URL}/services/desks`,
  UPDATE_BROKERS: `${process.env.REACT_APP_API_URL}/services/brokers/`,
  GET_BLOTTER_DEALS: `${process.env.REACT_APP_API_URL}/services/deals/`,
  BLOTTER_SSE_URL: `${process.env.REACT_APP_API_URL}/ssesubscribe`,
  SSE_ECHO_RESPONSE: `${process.env.REACT_APP_API_URL}/services/sse/pong/`,
  APPROVE_DEAL_STAGE: `${process.env.REACT_APP_API_URL}/services/approvals/`,
  GET_BLOTTER_SEARCH_DATE_RANGE_LIMIT: `${process.env.REACT_APP_API_URL}/services/systemSettings/blotterDateRangeLimit`,
  GET_LICENSE_KEY: `${process.env.REACT_APP_API_URL}/services/systemSettings/licenseKey`,
  GET_BLOTTER_RTU_COUNT: `${process.env.REACT_APP_API_URL}/services/rtu/blottercount/`,
  TERMINATE_SSE_SESSION: `${process.env.REACT_APP_API_URL}/services/rtu/terminate/`,
  TOGGLE_DEAL_INVESTIGATION_FLAG: `${process.env.REACT_APP_API_URL}/services/deals/setInvestigationFlag`,
  GET_BROKERAGE_STRATEGIES: `${process.env.REACT_APP_API_URL}/services/brokerage/fx/brokerageStrategy`,
  GET_DEAL_CURRENCIES: `${process.env.REACT_APP_API_URL}/services/currency/all`,
  GET_DEAL_BROKERS: `${process.env.REACT_APP_API_URL}/services/brokers/allDetails`,
  EDIT_DEAL: `${process.env.REACT_APP_API_URL}/services/deal/`,
};

export const MAX_LIMITS = {
  NDF: {
    RATE: { INTEGER: 5, PRECISION: 6 },
    POINTS: { INTEGER: 5, PRECISION: 6 },
    AMOUNT: { INTEGER: 11, PRECISION: 3 },
    AMOUNT_EXT: { INTEGER: 12, PRECISION: 3 },
    BROKERAGE_AMOUNT: { INTEGER: 12, PRECISION: 4 },
    ALLOCATION_PERCENTAGE: { INTEGER: 3, PRECISION: 2 },
  },
  FWD: {
    RATE: { INTEGER: 5, PRECISION: 8 },
    POINTS: { INTEGER: 5, PRECISION: 8 },
    AMOUNT: { INTEGER: 11, PRECISION: 3 },
    AMOUNT_EXT: { INTEGER: 12, PRECISION: 3 },
    INTEREST: { INTEGER: 3, PRECISION: 3 },
    BROKERAGE_AMOUNT: { INTEGER: 12, PRECISION: 4 },
    ALLOCATION_PERCENTAGE: { INTEGER: 3, PRECISION: 2 },
  },
  SPT: {
    RATE: { INTEGER: 5, PRECISION: 8 },
    AMOUNT: { INTEGER: 11, PRECISION: 3 },
    AMOUNT_EXT: { INTEGER: 12, PRECISION: 3 },
    BROKERAGE_AMOUNT: { INTEGER: 12, PRECISION: 4 },
    ALLOCATION_PERCENTAGE: { INTEGER: 3, PRECISION: 2 },
  },
};

export const specialTermsPerStrategy = [
  { dealType: 'NDF', strategy: 'Outright', terms: ['TOM', 'TOD'] },
  { dealType: 'NDF', strategy: 'Spread', terms: ['TOM', 'TOD'] },
  { dealType: 'FWD', strategy: 'Forward', terms: ['ON', 'TN', 'SN'] },
  { dealType: 'FWD', strategy: 'Forward Forward', terms: [] },
  { dealType: 'FWD', strategy: 'Outright', terms: [] },
];

export const favouritesColours = [
  { ID: 1, NAME: 'Default', VALUE: '#199bbe' },
  { ID: 2, NAME: 'Red', VALUE: '#f5222d' },
  { ID: 3, NAME: 'Orange', VALUE: '#fa541c' },
  { ID: 4, NAME: 'Yellow', VALUE: '#faad14' },
  { ID: 5, NAME: 'Green', VALUE: '#389e0d' },
  { ID: 6, NAME: 'Blue', VALUE: '#1890ff' },
  { ID: 7, NAME: 'Indigo', VALUE: '#2f54eb' },
  { ID: 8, NAME: 'Purple', VALUE: '#722ed1' },
  { ID: 9, NAME: 'Magenta', VALUE: '#eb2f96' },
];

export const settingsProperties = [{
  tabKey: 'tailorRatesFeed',
  tabLabel: 'Tailor Rates Feed',
  items: {
    ratesFeed: { type: 'switch', label: 'Rates feed' },
  },
}, {
  tabKey: 'clientManager',
  tabLabel: 'Client Manager',
  items: {
    displayClients: { type: 'switch', label: 'Grouping by Firm' },
    displayClientFavourites: { type: 'switch', label: 'Client/Traders Favourites' },
    displayCurrencyFavourites: { type: 'switch', label: 'Currency Favourites' },
    displayTermFavourites: { type: 'switch', label: 'Term Favourites' },
    displayExecutionVenueFavourites: { type: 'switch', label: 'Execution Venue Favourites' },
  },
}, {
  tabKey: 'general',
  tabLabel: 'General',
  items: {
    displayExecutionVenueColours: { type: 'switch', label: 'Enable Execution Venue Colours' },
    displayClsDefaults: { type: 'switch', label: 'Use CLS default values' },
    defaultEntryPage: { type: 'select', label: 'Default Entry Page' },
  },
}, {
  tabKey: 'FWDTradeCapture',
  tabLabel: 'FWD Trade Capture',
  items: {
    lrMode: { type: 'switch', label: 'Counterparty L/R Mode' },
  },
}];

/**
 * move these in to favourites?
 */
export const favouritesIcons = [
  { text: 'Client/Trader', icon: 'user' },
  { text: 'Currency Pair', icon: 'dollar' },
  { text: 'Term', icon: 'calendar' },
  { text: 'Execution Venue', icon: 'book' },
  { text: 'Firm', icon: 'bank' },
];

export const executionVenueColours = [
  {
    ID: 1, NAME: 'Red', VALUE: '#ff0000', executionVenue: 'TPSEF',
  },
  {
    ID: 2, NAME: 'Blue', VALUE: '#1890ff', executionVenue: 'XOFF',
  },
  {
    ID: 3, NAME: 'Indigo', VALUE: '#2f54eb', executionVenue: 'IMMM',
  },
  {
    ID: 4, NAME: 'Cyan', VALUE: '#00bcd4', executionVenue: 'IOMM',
  },
  {
    ID: 5, NAME: 'Orange', VALUE: '#ff9800', executionVenue: 'TEFD',
  },
  {
    ID: 6, NAME: 'Olive', VALUE: '#808000', executionVenue: 'TEIR',
  },
  {
    ID: 7, NAME: 'Magenta', VALUE: '#eb2f96', executionVenue: 'TEMM',
  },
  {
    ID: 8, NAME: 'Purple', VALUE: '#722ed1', executionVenue: 'TIRD',
  },
  {
    ID: 9, NAME: 'Green', VALUE: '#389e0d', executionVenue: 'TPIR',
  },
  {
    ID: 10, NAME: 'Teal', VALUE: '#009688', executionVenue: 'TPSD',
  },
];

export const dealTypeOptions = [
  { name: 'NDF', isDisabled: false },
  { name: 'FWD', isDisabled: false },
  { name: 'SPT', isDisabled: false },
];

export const userPermissions = {
  BLOTTER_EDIT: 'BLOTTER.EDIT',
  BLOTTER_VIEW: 'BLOTTER.VIEW',
  DESK_EDIT: 'DESK.EDIT',
  TRADECAPTURE_FWD_ENTRY: 'TRADECAPTURE.FWD.ENTRY',
  TRADECAPTURE_NDF_ENTRY: 'TRADECAPTURE.NDF.ENTRY',
  TRADECAPTURE_SPT_ENTRY: 'TRADECAPTURE.SPT.ENTRY',
  SEF_DEAL_APPROVE: 'SEF.DEAL.APPROVE',
  NONSEF_DEAL_APPROVE: 'NONSEF.DEAL.APPROVE',
  TRADE_MANAGEMENT_VIEW: 'TRADE.MANAGEMENT.VIEW',
};

const stpGroupedStatusMap = {
  lg: { color: 'lightgray', title: 'TMMSENT' },
  r: { color: 'red', title: 'REJECT, CANCELLED, WITHDRAWN, REJECTED' },
  y: { color: 'yellow', title: 'DELIVERED, PICKEDUP, PENDING' },
  b: { color: 'black', title: 'TMMSENDFAILURE' },
  dg: { color: 'darkgray', title: 'UNKNOWN' },
  g: { color: 'green', title: 'AFFIRMED, CLEARED, CONFIRM, REPORTED' },
};

export const blotterStpStatusesMap = {
  TMMSENT: { ...stpGroupedStatusMap.lg },
  REJECT: { ...stpGroupedStatusMap.r },
  CANCELLED: { ...stpGroupedStatusMap.r },
  WITHDRAWN: { ...stpGroupedStatusMap.r },
  REJECTED: { ...stpGroupedStatusMap.r },
  DELIVERED: { ...stpGroupedStatusMap.y },
  PICKEDUP: { ...stpGroupedStatusMap.y },
  PENDING: { ...stpGroupedStatusMap.y },
  TMMSENDFAILURE: { ...stpGroupedStatusMap.b },
  UNKNOWN: { ...stpGroupedStatusMap.dg },
  AFFIRMED: { ...stpGroupedStatusMap.g },
  CLEARED: { ...stpGroupedStatusMap.g },
  CONFIRM: { ...stpGroupedStatusMap.g },
  REPORTED: { ...stpGroupedStatusMap.g },
};

export const blotterApprovalsMap = {
  APPROVED: { value: 'APPROVED', className: 'success approved' },
  PENDING: { value: 'PENDING', className: 'warning pending' },
  REJECTED: { value: 'REJECTED', className: 'error rejected' },
};

export const navMenuItems = {
  ADMIN: {
    key: 'ADMIN', text: 'Admin', to: '/admin', documentTitle: 'Admin',
  },
  BLOTTER: {
    key: 'BLOTTER', text: 'Blotter', to: '/blotter', documentTitle: 'Blotter',
  },
  FWD: {
    key: 'FWD', text: 'FWD', to: '/deal/FWD', documentTitle: 'FWD',
  },
  NDF: {
    key: 'NDF', text: 'NDF', to: '/deal/NDF', documentTitle: 'NDF',
  },
  SPT: {
    key: 'SPT', text: 'SPT', to: '/deal/SPT', documentTitle: 'Spot',
  },
  EDIT: {
    key: 'EDIT', text: 'EDIT', to: '/dealedit', documentTitle: 'Deal Edit',
  },
};

export const sseStatuses = {
  CONNECTED: 'Connected',
  CONNECTING: 'Connecting',
  DISCONNECTING: 'Disconnecting',
  DISCONNECTED: 'Disconnected',
  FAILED: 'Failed',
};

export const STD_BROKERAGE_CCY = 'USD';

export const SSE_RE_CONNECT_DELAY = 3000;
export const SSE_MAX_RE_CONNECT_TRIES = 40; // 3000 * 40 = 2mins

export const APPLICATION_TITLE = 'DMSWeb';

export const MAX_DEAL_ID_VAL = '9223372036854775807';

export const MAX_BLOTTER_RTU = 5;

export const dealStatusArr = ['Incomplete', 'Validated', 'Approved', 'Released', 'Complete'];
