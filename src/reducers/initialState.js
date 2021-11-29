const initialState = {
  currencies: [],
  dates: {
    fixingDate: {},
    valueDate: {},
    spotDate: {},
    publishDate: {},
    forwardStart: {},
    dayCount: {},
    tradeDuration: {},
    isDateResponsePending: false,
  },
  rates: {
    rate: '',
    points: '',
    isRateResponsePending: false,
  },
  clients: [],
  brokers: [],
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
  },
  userInterface: {
    isThirdCPChecked: false,
    isInterestEnabled: false,
    selectedTradeSide: 'buyer', // tracks what tradeside was selected either manually or programmatically in counterparties
    selectedPreferenceBroker: '', // tracks which broker tab is currently selected
    selectedPreferenceFirms: [], // tracks which clients are selected for the firm
    selectedPreferenceClients: [], // tracks which firm tag is currently selected
    selectedPreferenceFirm: null, // tracks which clients are selected for the firm
    lastSetTerm: '', // tracks what term was selected last when there's more than 1 term
    termValues: {}, // needed to share termContainer local values with other components. ble.
    clientHoverInfo: {}, // shared between Counterparties and Client Manager
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
    permissions: {},
    fullName: '',
    preferences: {
      settings: {},
      defaults: { defaultEntryPage: 'NA' },
    },
  },
  desks: [],
  brokerUpdateStatus: false,
  blotter: {
    data: [],
    insertedDealIds: [],
    isDataLoading: false,
    lastUpdated: null,
    rtuBlotterCount: '',
    searchParams: {},
  },
  systemSettings: {
    blotterSearchDateRangeLimit: '365',
    licenseKey: '',
  },
  sse: {
    status: '',
    sessionId: null,
    isReconnecting: false,
  },
  brokerageStrategies: [],
};

export default initialState;
