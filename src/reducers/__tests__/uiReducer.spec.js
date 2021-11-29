import { actionTypes } from '../../utils/constants';
import reducer from '../uiReducer';

const {
  ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
  CHANGE_CLIENT_HOVER_DATA_SUCCESS,
  CHANGE_DEALTYPE,
  CHANGE_PREFERENCE_SUCCESS,
  CHANGE_STRATEGY,
  CHANGE_TERMS,
  DELETE_BROKER_PREFERENCE_SUCCESS,
  ENABLE_INTEREST,
  LOAD_PREFERENCES_SUCCESS,
  RESET_UI_STATE,
  SELECT_PREFERRED_FIRM_COMPLETE,
  TOGGLE_CHANGE_FAVORITES_COLOUR,
  TOGGLE_RENAME_FAVORITES_POPUP,
  TOGGLE_SETTINGS_MODAL,
  TOGGLE_THIRD_CP,
  UPDATE_COUNTERPARTY_SELECTION,
  UPDATE_LAST_TERM_SELECTION,
  UPDATE_PREFERENCE_BROKER_SELECTION,
  ENABLE_BROWSER_FORCE_REFRESH,
  RESET_BLOTTER_SEARCH,
  CHANGE_DEAL_EDIT_STATUS,
  CHANGE_RE_ALLOCATION_SIDE,
  UPDATE_DEAL_OBJECT,
} = actionTypes;

const actionsGroup1 = [
  ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
  LOAD_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCE_BROKER_SELECTION,
  DELETE_BROKER_PREFERENCE_SUCCESS,
  SELECT_PREFERRED_FIRM_COMPLETE,
];

const initialState = {
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
};

const defaultUserPreferencePayload = {
  preferences: {},
  brokerDeskIds: '',
  preferredBrokers: [],
  brokerId: '',
  deskId: '',
  tradingCustomerId: '',
  tradingCustomerCodeLocationCode: '',
};

const preferredBrokers = [{
  nickName: 'BELFAST TPSIN TEST BROKER 3',
  id: 100120,
  name: 'BELFAST TPSIN TEST BROKER 3',
  deskId: 8159,
  deskName: 'BELFAST RATES TPSIN DESK',
  favourites: {
    clients: [{
      nickName: 'BOON-KIT LIM',
      backgroundColour: '5',
      executingCustomerId: 104579,
      executingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerId: 104579,
      tradingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerCodeLocationCode: 'DEUT.SIN',
      traderPostingId: 59813,
      traderDisplayName: 'BOON-KIT LIM',
      agentCustomerId: 0,
      status: 'OK',
    }, {
      nickName: 'ALL TRAD COFIDEM LUX',
      backgroundColour: '2',
      executingCustomerId: 0,
      tradingCustomerId: 104579,
      tradingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerCodeLocationCode: 'DEUT.SIN',
      traderPostingId: 0,
      agentCustomerId: 103382,
      agentDisplayShortName: 'ALL TRAD COFIDEM LUX',
      status: 'OK',
    }, {
      nickName: 'BILL CLINTON',
      backgroundColour: '8',
      executingCustomerId: 164918,
      executingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 43633,
      traderDisplayName: 'BILL CLINTON',
      agentCustomerId: 0,
      status: 'OK',
    }, {
      nickName: 'Test BRian',
      backgroundColour: '2',
      executingCustomerId: 0,
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 0,
      agentCustomerId: 165885,
      agentDisplayShortName: 'PING AN TRAD - SHENZ',
      status: 'OK',
    }, {
      nickName: 'TULLETT MANILA',
      executingCustomerId: 0,
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 0,
      agentCustomerId: 141639,
      agentDisplayShortName: 'TULLETT MANILA',
      status: 'OK',
    }, {
      nickName: 'ADS SEC AGENT',
      backgroundColour: '6',
      executingCustomerId: 0,
      tradingCustomerId: 111229,
      tradingCustomerDisplayName: 'TULLETT PREBON SECURITIES LTD FRANKFURT BRANCH',
      tradingCustomerCodeLocationCode: 'TULF.FFT',
      traderPostingId: 0,
      agentCustomerId: 172896,
      agentDisplayShortName: 'ADS SEC AGENT',
      status: 'OK',
    }, {
      nickName: 'ALL TRAD BKRS EUR AV',
      backgroundColour: '4',
      executingCustomerId: 0,
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 0,
      agentCustomerId: 103381,
      agentDisplayShortName: 'ALL TRAD BKRS EUR AV',
      status: 'OK',
    }, {
      nickName: 'A-J STEVENS',
      backgroundColour: '2',
      executingCustomerId: 0,
      tradingCustomerId: 111229,
      tradingCustomerDisplayName: 'TULLETT PREBON SECURITIES LTD FRANKFURT BRANCH',
      tradingCustomerCodeLocationCode: 'TULF.FFT',
      traderPostingId: 0,
      agentCustomerId: 103309,
      agentDisplayShortName: 'A-J STEVENS',
      status: 'OK',
    }, {
      nickName: 'EQUISEC TSY SERV',
      backgroundColour: '5',
      executingCustomerId: 0,
      tradingCustomerId: 111229,
      tradingCustomerDisplayName: 'TULLETT PREBON SECURITIES LTD FRANKFURT BRANCH',
      tradingCustomerCodeLocationCode: 'TULF.FFT',
      traderPostingId: 0,
      agentCustomerId: 145144,
      agentDisplayShortName: 'EQUISEC TSY SERV',
      status: 'OK',
    }, {
      nickName: 'PARIBELLO',
      backgroundColour: '8',
      executingCustomerId: 0,
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 0,
      agentCustomerId: 110408,
      agentDisplayShortName: 'PARIBELLO',
      status: 'OK',
    }, {
      nickName: 'SIG ENERGY LLLP',
      executingCustomerId: 0,
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 0,
      agentCustomerId: 134638,
      agentDisplayShortName: 'SIG ENERGY LLLP',
      status: 'OK',
    }, {
      nickName: '222222',
      executingCustomerId: 0,
      tradingCustomerId: 164918,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.NYK',
      traderPostingId: 0,
      agentCustomerId: 105416,
      agentDisplayShortName: 'TP EUROPE LTD LUX BR',
      status: 'OK',
    }, {
      nickName: 'DAVY MONEYBROKERS',
      executingCustomerId: 0,
      tradingCustomerId: 111229,
      tradingCustomerDisplayName: 'TULLETT PREBON SECURITIES LTD FRANKFURT BRANCH',
      tradingCustomerCodeLocationCode: 'TULF.FFT',
      traderPostingId: 0,
      agentCustomerId: 104539,
      agentDisplayShortName: 'DAVY MONEYBROKERS',
      status: 'OK',
    }],
    currencyPairs: [{
      nickName: 'USDBRL', baseCurrency: 'USD', counterCurrency: 'BRL', dealtCurrency: 'USD',
    }, {
      nickName: 'USDCAD', baseCurrency: 'USD', counterCurrency: 'CAD', dealtCurrency: 'USD',
    }, {
      nickName: 'USDAED', baseCurrency: 'USD', counterCurrency: 'AED', dealtCurrency: 'USD',
    }],
    terms: [],
    executionVenues: [{ nickName: 'TPSEF', executionVenue: 'TPSEF' }],
  },
  editable: true,
}, {
  nickName: 'JOHN ZABALA',
  id: 63278,
  name: 'JOHN ZABALA',
  deskId: 2059,
  deskName: 'MXN SWAPS MEX',
  favourites: {
    clients: [{
      nickName: 'BOON-KIT LIM',
      executingCustomerId: 104579,
      executingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerId: 104579,
      tradingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerCodeLocationCode: 'DEUT.SIN',
      traderPostingId: 59813,
      traderDisplayName: 'BOON-KIT LIM',
      agentCustomerId: 0,
      status: 'OK',
    }, {
      nickName: 'JOHN KENNEDY',
      backgroundColour: '2',
      executingCustomerId: 164920,
      executingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerId: 164920,
      tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
      tradingCustomerCodeLocationCode: 'APBK.LON',
      traderPostingId: 43635,
      traderDisplayName: 'JOHN KENNEDY',
      agentCustomerId: 0,
      status: 'OK',
    }],
    currencyPairs: [],
    terms: [],
    executionVenues: [],
  },
  editable: true,
}, {
  nickName: 'JOHN ZABALA',
  id: 60807,
  name: 'JOHN ZABALA',
  deskId: 2024,
  deskName: 'NYK MXN SWAPS',
  favourites: {
    clients: [{
      nickName: 'BOON-KIT LIM',
      executingCustomerId: 104579,
      executingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerId: 104579,
      tradingCustomerDisplayName: 'DEUTSCHE BANK AG',
      tradingCustomerCodeLocationCode: 'DEUT.SIN',
      traderPostingId: 59813,
      traderDisplayName: 'BOON-KIT LIM',
      agentCustomerId: 0,
      status: 'OK',
    }],
    currencyPairs: [{
      nickName: 'USDCAD', baseCurrency: 'USD', counterCurrency: 'CAD', dealtCurrency: 'USD',
    }],
    terms: [],
    executionVenues: [{ nickName: 'TPSEF', executionVenue: 'TPSEF' }],
  },
  editable: true,
}, {
  nickName: 'BELFAST TPSIN TEST BROKER 1',
  id: 100118,
  name: 'BELFAST TPSIN TEST BROKER 1',
  deskId: 8159,
  deskName: 'BELFAST RATES TPSIN DESK',
  favourites: {
    clients: [{
      nickName: 'FOREX ENTERPRISE',
      executingCustomerId: 0,
      tradingCustomerId: 111229,
      tradingCustomerDisplayName: 'TULLETT PREBON SECURITIES LTD FRANKFURT BRANCH',
      tradingCustomerCodeLocationCode: 'TULF.FFT',
      traderPostingId: 0,
      agentCustomerId: 152402,
      agentDisplayShortName: 'FOREX ENTERPRISE',
      status: 'OK',
    }],
    currencyPairs: [],
    terms: [],
    executionVenues: [],
  },
  editable: true,
}];

// ////////////////////////////////////////////////////////
//  default reducer
// ////////////////////////////////////////////////////////
test('default reducer should return the initial state', () => {
  const state = undefined;
  const action = {};
  const reducerOutput = reducer(state, action);
  expect(reducerOutput).toEqual(initialState);
});

// ////////////////////////////////////////////////////////
//  UPDATE_COUNTERPARTY_SELECTION
// ////////////////////////////////////////////////////////
describe('UPDATE_COUNTERPARTY_SELECTION should return correct state', () => {
  test('when default UI properties exist in state and buyer passed in', () => {
    const state = undefined;
    const action = { type: UPDATE_COUNTERPARTY_SELECTION, selectedRow: 'buyer' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedTradeSide: 'buyer' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and buyer passed in', () => {
    const state = { ...initialState, selectedTradeSide: 'buyer' };
    const action = { type: UPDATE_COUNTERPARTY_SELECTION, selectedRow: 'seller' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedTradeSide: 'seller' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and seller passed in', () => {
    const state = { ...initialState, selectedTradeSide: 'seller' };
    const action = { type: UPDATE_COUNTERPARTY_SELECTION, selectedRow: 'buyer' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedTradeSide: 'buyer' };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
// ADD_CLIENTTRADER_PREFERENCE_SUCCESS,
// LOAD_PREFERENCES_SUCCESS,
// UPDATE_PREFERENCE_BROKER_SELECTION,
// DELETE_BROKER_PREFERENCE_SUCCESS,
// SELECT_PREFERRED_FIRM_COMPLETE,
// ////////////////////////////////////////////////////////
describe('when default UI details exist in state', () => {
  const state = {
    ...initialState,
    selectedPreferenceBroker: '', // tracks which broker tab is currently selected
    selectedPreferenceFirms: [{ id: 1, name: 'Firm 1' }, { id: 2, name: 'Firm 2' }, { id: 3, name: 'Firm 3' }],
    selectedPreferenceClients: [{ id: 1, name: 'Client 1' }, { id: 2, name: 'Client 2' }],
    selectedPreferenceFirm: 3333,
  };

  actionsGroup1.forEach((act) => {
    it(`${act} should return correct state when default UI properties exist in state and payload defaults`, () => {
      const action = { type: act, payload: { ...defaultUserPreferencePayload } };
      const reducerOutput = reducer(state, action);
      const expectedOutput = { ...state };
      expect(reducerOutput).toEqual(expectedOutput);
    });

    it(`${act}  should return correct state when payload has brokers and no other parameters`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is null and deskId is null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: '',
        deskId: '',
      };
      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is null and deskId is not null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        deskId: 8519,
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is not null and deskId is null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 100120,
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is not null and deskId is not null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 60807,
        deskId: 2024,
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('2024,60807');
      expect(selectedPreferenceClients.length).toEqual(1);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(1);
    });

    it(`${act} returns correct state when tradingCustomerCodeLocationCode is not null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: '',
        deskId: '',
        tradingCustomerId: '',
        tradingCustomerCodeLocationCode: 'DEUT.SIN',
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(2);
      expect(selectedPreferenceFirm).toEqual('DEUT.SIN');
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when all params passed in`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 100120,
        deskId: 8159,
        tradingCustomerId: 111229,
        tradingCustomerCodeLocationCode: 'TULF.FFT',
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');

      expect(selectedPreferenceFirm).toEqual('TULF.FFT');

      expect(selectedPreferenceFirms.length).toEqual(3);
      expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
      expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
      expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');

      expect(selectedPreferenceClients.length).toEqual(4);
      expect(selectedPreferenceClients[0].nickName).toEqual('ADS SEC AGENT');
      expect(selectedPreferenceClients[1].nickName).toEqual('A-J STEVENS');
      expect(selectedPreferenceClients[2].nickName).toEqual('EQUISEC TSY SERV');
      expect(selectedPreferenceClients[3].nickName).toEqual('DAVY MONEYBROKERS');
    });

    it(`${act} returns correct state when different all params passed in`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 100120,
        deskId: 8159,
        tradingCustomerId: 111229,
        tradingCustomerCodeLocationCode: 'TULF.FFT',
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');

      expect(selectedPreferenceFirm).toEqual('TULF.FFT');

      expect(selectedPreferenceFirms.length).toEqual(3);
      expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
      expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
      expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');

      expect(selectedPreferenceClients.length).toEqual(4);
      expect(selectedPreferenceClients[0].nickName).toEqual('ADS SEC AGENT');
      expect(selectedPreferenceClients[1].nickName).toEqual('A-J STEVENS');
      expect(selectedPreferenceClients[2].nickName).toEqual('EQUISEC TSY SERV');
      expect(selectedPreferenceClients[3].nickName).toEqual('DAVY MONEYBROKERS');
    });
  });
});

describe('when non default UI details exist in state', () => {
  const state = undefined;

  actionsGroup1.forEach((act) => {
    it(`${act} should return correct state and payload defaults`, () => {
      const action = { type: act, payload: { ...defaultUserPreferencePayload } };
      const reducerOutput = reducer(state, action);
      const expectedOutput = { ...initialState };
      expect(reducerOutput).toEqual(expectedOutput);
    });

    it(`${act}  should return correct state when payload has brokers and no other parameters`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is null and deskId is null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: '',
        deskId: '',
      };
      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is null and deskId is not null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        deskId: 8519,
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is not null and deskId is null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 100120,
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(13);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when brokerId is not null and deskId is not null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 60807,
        deskId: 2024,
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('2024,60807');
      expect(selectedPreferenceClients.length).toEqual(1);
      expect(selectedPreferenceFirm).toEqual(null);
      expect(selectedPreferenceFirms.length).toEqual(1);
    });

    it(`${act} returns correct state when tradingCustomerCodeLocationCode is not null`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: '',
        deskId: '',
        tradingCustomerId: 104579,
        tradingCustomerCodeLocationCode: 'DEUT.SIN',
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');
      expect(selectedPreferenceClients.length).toEqual(2);
      expect(selectedPreferenceFirm).toEqual('DEUT.SIN');
      expect(selectedPreferenceFirms.length).toEqual(3);
    });

    it(`${act} returns correct state when all params passed in`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 100120,
        deskId: 8159,
        tradingCustomerId: 111229,
        tradingCustomerCodeLocationCode: 'TULF.FFT',
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');

      expect(selectedPreferenceFirm).toEqual('TULF.FFT');

      expect(selectedPreferenceFirms.length).toEqual(3);
      expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
      expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
      expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');

      expect(selectedPreferenceClients.length).toEqual(4);
      expect(selectedPreferenceClients[0].nickName).toEqual('ADS SEC AGENT');
      expect(selectedPreferenceClients[1].nickName).toEqual('A-J STEVENS');
      expect(selectedPreferenceClients[2].nickName).toEqual('EQUISEC TSY SERV');
      expect(selectedPreferenceClients[3].nickName).toEqual('DAVY MONEYBROKERS');
    });

    it(`${act} returns correct state when different all params passed in`, () => {
      const payload = {
        ...defaultUserPreferencePayload,
        preferredBrokers: [
          ...preferredBrokers,
        ],
        brokerId: 100120,
        deskId: 8159,
        tradingCustomerId: 111229,
        tradingCustomerCodeLocationCode: 'TULF.FFT',
      };

      const action = { type: act, payload };
      const reducerOutput = reducer(state, action);

      const {
        selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
      } = reducerOutput;

      expect(selectedPreferenceBroker).toEqual('8159,100120');

      expect(selectedPreferenceFirm).toEqual('TULF.FFT');

      expect(selectedPreferenceFirms.length).toEqual(3);
      expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
      expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
      expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');

      expect(selectedPreferenceClients.length).toEqual(4);
      expect(selectedPreferenceClients[0].nickName).toEqual('ADS SEC AGENT');
      expect(selectedPreferenceClients[1].nickName).toEqual('A-J STEVENS');
      expect(selectedPreferenceClients[2].nickName).toEqual('EQUISEC TSY SERV');
      expect(selectedPreferenceClients[3].nickName).toEqual('DAVY MONEYBROKERS');
    });
  });
});

// ////////////////////////////////////////////////////////
//  CHANGE_PREFERENCE_SUCCESS
// ////////////////////////////////////////////////////////
describe('CHANGE_PREFERENCE_SUCCESS, with default UI details in state', () => {
  const state = {
    ...initialState,
  };

  it('should return correct state with payload defaults', () => {
    const action = {
      type: CHANGE_PREFERENCE_SUCCESS,
      payload: {
        preferences: { preferredBrokers: [...preferredBrokers] },
      },
    };
    const reducerOutput = reducer(state, action);

    const {
      selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
    } = reducerOutput;

    expect(selectedPreferenceBroker).toEqual('8159,100120');
    expect(selectedPreferenceClients.length).toEqual(13);
    expect(selectedPreferenceFirm).toEqual(null);
    expect(selectedPreferenceFirms.length).toEqual(3);
  });
});

describe('CHANGE_PREFERENCE_SUCCESS when non default UI details exist in state', () => {
  const state = undefined;

  it('should return correct state and payload defaults', () => {
    const action = { type: CHANGE_PREFERENCE_SUCCESS, payload: { ...defaultUserPreferencePayload } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  it('should return correct state when payload has brokers when selectedPreferenceBroker and selectedPreferenceFirm not set in state', () => {
    const payload = {
      ...defaultUserPreferencePayload,
      preferredBrokers: [
        ...preferredBrokers,
      ],
      payload: {
        preferences: preferredBrokers,
      },
    };

    const action = { type: CHANGE_PREFERENCE_SUCCESS, payload };
    const reducerOutput = reducer(state, action);

    const {
      selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
    } = reducerOutput;

    expect(selectedPreferenceBroker).toEqual('');
    expect(selectedPreferenceClients.length).toEqual(0);
    expect(selectedPreferenceFirm).toEqual(null);
    expect(selectedPreferenceFirms.length).toEqual(0);
  });

  it('CHANGE_PREFERENCE_SUCCESS returns correct state when selectedPreferenceBroker in state', () => {
    const newState = {
      ...initialState,
      selectedPreferenceBroker: '2024:60807',
    };

    const payload = {
      ...defaultUserPreferencePayload,
      preferredBrokers: [
        ...preferredBrokers,
      ],
      preferences: {
        preferredBrokers: [
          ...preferredBrokers,
        ],
      },
      selectedPreferenceBroker: '2024:60807',
    };

    const action = { type: CHANGE_PREFERENCE_SUCCESS, payload };
    const reducerOutput = reducer(newState, action);

    const {
      selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
    } = reducerOutput;

    expect(selectedPreferenceBroker).toEqual('8159,100120');
    expect(selectedPreferenceClients.length).toEqual(13);
    expect(selectedPreferenceFirm).toEqual(null);
    expect(selectedPreferenceFirms.length).toEqual(3);
  });

  it('CHANGE_PREFERENCE_SUCCESS returns correct state when selectedPreferenceBroker and selectedPreferenceFirm in state', () => {
    const newState = {
      ...initialState,
      selectedPreferenceBroker: '8159,100120',
      selectedPreferenceFirm: 104579,
    };

    const payload = {
      ...defaultUserPreferencePayload,
      preferredBrokers: [
        ...preferredBrokers,
      ],
      preferences: {
        preferredBrokers: [
          ...preferredBrokers,
        ],
      },
    };

    const action = { type: CHANGE_PREFERENCE_SUCCESS, payload };
    const reducerOutput = reducer(newState, action);

    const {
      selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
    } = reducerOutput;

    expect(selectedPreferenceBroker).toEqual('8159,100120');
    expect(selectedPreferenceFirm).toEqual(null);

    expect(selectedPreferenceFirms.length).toEqual(3);
    expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
    expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
    expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');

    expect(selectedPreferenceClients.length).toEqual(13);
    expect(selectedPreferenceClients[0].nickName).toEqual('BOON-KIT LIM');
    expect(selectedPreferenceClients[1].nickName).toEqual('ALL TRAD COFIDEM LUX');
  });
});

// ////////////////////////////////////////////////////////
//  UPDATE_LAST_TERM_SELECTION
// ////////////////////////////////////////////////////////
describe('UPDATE_LAST_TERM_SELECTION should return correct state ', () => {
  test('when default UI properties exist in state and selectedTermId passed in', () => {
    const state = undefined;
    const action = { type: UPDATE_LAST_TERM_SELECTION, selectedTermId: 'termid1' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, lastSetTerm: 'termid1' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and selectedTermId passed in', () => {
    const state = { ...initialState, lastSetTerm: 'termid1' };
    const action = { type: UPDATE_LAST_TERM_SELECTION, selectedTermId: 'termid2' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, lastSetTerm: 'termid2' };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  CHANGE_TERMS
// ////////////////////////////////////////////////////////
describe('CHANGE_TERMS should return correct state ', () => {
  test('when default UI properties exist in state and termValues not passed in', () => {
    const state = undefined;
    const action = { type: CHANGE_TERMS, terms: { } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, termValues: { } };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and termValues passed in', () => {
    const state = undefined;
    const action = { type: CHANGE_TERMS, terms: { term1: '2Y' } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = {
      ...initialState, lastSetTerm: '', termValues: { term1: '2Y' },
    };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and termValues passed in', () => {
    const state = { ...initialState, lastTerm: 'term1', termValues: { term1: '2Y' } };
    const action = { type: CHANGE_TERMS, terms: { term1: 'TOD' } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = {
      ...initialState, lastSetTerm: '', lastTerm: 'term1', termValues: { term1: 'TOD' },
    };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  CHANGE_DEALTYPE
// ////////////////////////////////////////////////////////
describe('CHANGE_DEALTYPE should return correct state ', () => {
  test('when default UI properties exist in state and strategy is null', () => {
    const state = undefined;
    const action = { type: CHANGE_DEALTYPE, dealType: null };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedDealType: null };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and strategy passed in', () => {
    const state = undefined;
    const action = { type: CHANGE_DEALTYPE, dealType: 'deal type 1' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedDealType: 'deal type 1' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and strategy not passed in', () => {
    const state = { ...initialState, selectedDealType: 'test1' };
    const action = { type: CHANGE_DEALTYPE, dealType: '' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedDealType: '' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and strategy passed in', () => {
    const state = { ...initialState, selectedDealType: 'deal type 2' };
    const action = { type: CHANGE_DEALTYPE, dealType: 'deal type 1' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedDealType: 'deal type 1' };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  CHANGE_STRATEGY
// ////////////////////////////////////////////////////////
describe('CHANGE_STRATEGY should return correct state ', () => {
  test('when default UI properties exist in state and strategy is null', () => {
    const state = undefined;
    const action = { type: CHANGE_STRATEGY, strategy: null };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedStrategyType: null };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and strategy passed in', () => {
    const state = undefined;
    const action = { type: CHANGE_STRATEGY, strategy: 'test2' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedStrategyType: 'test2' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and strategy not passed in', () => {
    const state = { ...initialState, selectedStrategyType: 'test1' };
    const action = { type: CHANGE_STRATEGY, strategy: '' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedStrategyType: '' };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and strategy passed in', () => {
    const state = { ...initialState, selectedStrategyType: 'test1' };
    const action = { type: CHANGE_STRATEGY, strategy: 'test2' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedStrategyType: 'test2' };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  RESET_UI_STATE
// ////////////////////////////////////////////////////////
describe('RESET_UI_STATE should return correct state ', () => {
  test('when default UI properties exist in state ', () => {
    const state = undefined;
    const action = { type: RESET_UI_STATE };
    const reducerOutput = reducer(state, action);
    const expectedOutput = {
      ...initialState,
      isThirdCPChecked: false,
      isInterestEnabled: false,
      selectedTradeSide: 'buyer',
      lastSetTerm: '',
      termValues: {},
      clientHoverInfo: {},
    };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state', () => {
    const state = {
      ...initialState,
      isThirdCPChecked: true,
      isInterestEnabled: true,
      selectedTradeSide: 'seller',
      lastSetTerm: 'term1',
      termValues: { term1: 'test' },
      clientHoverInfo: { id: 1 },
    };

    const action = { type: RESET_UI_STATE };
    const reducerOutput = reducer(state, action);

    const expectedOutput = {
      ...initialState,
      isThirdCPChecked: false,
      isInterestEnabled: false,
      selectedTradeSide: 'buyer',
      lastSetTerm: '',
      termValues: {},
      clientHoverInfo: {},
    };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  CHANGE_CLIENT_HOVER_DATA_SUCCESS
// ////////////////////////////////////////////////////////
describe('CHANGE_CLIENT_HOVER_DATA_SUCCESS should return correct state ', () => {
  describe('when default UI properties exist in state', () => {
    test('and selectedClientData != null and matchedClient.traders = true', () => {
      const state = undefined;
      const action = {
        type: CHANGE_CLIENT_HOVER_DATA_SUCCESS,
        selectedClientData: {
          tradingCustomerId: 1,
          executingCustomerId: 2,
          traderPostingId: 3,
          side: null,
        },
        clients: [
          {
            tradingCustomerId: 1,
            traders: [{ executingCustomerId: 2, traderPostingId: 3 }],
          },
        ],
      };
      const reducerOutput = reducer(state, action);
      const expectedOutput = {
        ...initialState,
        clientHoverInfo: {
          ...initialState.clientHoverInfo,
          buyer: { tradingCustomerId: 1, traders: [{ executingCustomerId: 2, traderPostingId: 3 }] },
        },
      };
      expect(reducerOutput).toEqual(expectedOutput);
    });

    test('and selectedClientData != null and no matchedClient.traders', () => {
      const state = undefined;
      const action = {
        type: CHANGE_CLIENT_HOVER_DATA_SUCCESS,
        selectedClientData: {
          tradingCustomerId: 4,
          executingCustomerId: 2,
          traderPostingId: 3,
          side: null,
        },
        clients: [
          {
            tradingCustomerId: 1,
            traders: [{ executingCustomerId: 2, traderPostingId: 3 }],
          },
        ],
      };
      const reducerOutput = reducer(state, action);
      const expectedOutput = {
        ...initialState,
        clientHoverInfo: {
          ...initialState.clientHoverInfo,
          buyer: null,
        },
      };
      expect(reducerOutput).toEqual(expectedOutput);
    });
  });

  describe('when non default UI properties exist in state', () => {
    test('and selectedClientData != null and matchedClient.traders = true', () => {
      const state = { ...initialState, selectedTradeSide: 'seller' };

      const action = {
        type: CHANGE_CLIENT_HOVER_DATA_SUCCESS,
        selectedClientData: {
          tradingCustomerId: 1,
          executingCustomerId: 2,
          traderPostingId: 3,
          side: null,
        },
        clients: [
          {
            tradingCustomerId: 1,
            traders: [{ executingCustomerId: 2, traderPostingId: 3 }],
          },
        ],
      };
      const reducerOutput = reducer(state, action);
      const expectedOutput = {
        ...initialState,
        clientHoverInfo: {
          ...initialState.clientHoverInfo,
          seller: { tradingCustomerId: 1, traders: [{ executingCustomerId: 2, traderPostingId: 3 }] },
        },
        selectedTradeSide: 'seller',
      };
      expect(reducerOutput).toEqual(expectedOutput);
    });

    test('and selectedClientData != null and no matchedClient.traders', () => {
      const state = { ...initialState, selectedTradeSide: 'seller' };
      const action = {
        type: CHANGE_CLIENT_HOVER_DATA_SUCCESS,
        selectedClientData: {
          tradingCustomerId: 4,
          executingCustomerId: 2,
          traderPostingId: 3,
          side: null,
        },
        clients: [
          {
            tradingCustomerId: 1,
            traders: [{ executingCustomerId: 2, traderPostingId: 3 }],
          },
        ],
      };
      const reducerOutput = reducer(state, action);
      const expectedOutput = {
        ...initialState,
        clientHoverInfo: {
          ...initialState.clientHoverInfo,
          seller: null,
        },
        selectedTradeSide: 'seller',
      };
      expect(reducerOutput).toEqual(expectedOutput);
    });
  });
});

// ////////////////////////////////////////////////////////
//  TOGGLE_THIRD_CP
// ////////////////////////////////////////////////////////
describe('TOGGLE_THIRD_CP should return correct state ', () => {
  test('when default UI properties exist in state and value is null', () => {
    const state = undefined;
    const action = { type: TOGGLE_THIRD_CP, value: null };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: null };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and value is passed in', () => {
    const state = undefined;
    const action = { type: TOGGLE_THIRD_CP, value: false };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and value is passed in', () => {
    const state = undefined;
    const action = { type: TOGGLE_THIRD_CP, value: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and value not passed in', () => {
    const state = { ...initialState, isThirdCPChecked: true };
    const action = { type: TOGGLE_THIRD_CP, value: null };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: null };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, isThirdCPChecked: false };
    const action = { type: TOGGLE_THIRD_CP, value: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, isThirdCPChecked: true };
    const action = { type: TOGGLE_THIRD_CP, value: false };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  TOGGLE_SETTINGS_MODAL
// ////////////////////////////////////////////////////////
describe('TOGGLE_SETTINGS_MODAL should return correct state ', () => {
  test('when default UI properties exist in state', () => {
    const state = undefined;
    const action = { type: TOGGLE_SETTINGS_MODAL };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isSettingsModalVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and isSettingsModalVisible is true', () => {
    const state = { ...initialState, isSettingsModalVisible: true };
    const action = { type: TOGGLE_SETTINGS_MODAL };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isSettingsModalVisible: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and isSettingsModalVisible is false', () => {
    const state = { ...initialState, isSettingsModalVisible: false };
    const action = { type: TOGGLE_SETTINGS_MODAL };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isSettingsModalVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  TOGGLE_RENAME_FAVORITES_POPUP
// ////////////////////////////////////////////////////////
describe('TOGGLE_RENAME_FAVORITES_POPUP should return correct state ', () => {
  test('when default UI properties exist in state and no fav item passed in', () => {
    const state = undefined;
    const action = { type: TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem: {} };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isFavRenamePopupVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and fav item passed in', () => {
    const state = undefined;
    const action = { type: TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem: { id: 1 } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedFavItem: { id: 1 }, isFavRenamePopupVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and isSettingsModalVisible is true', () => {
    const state = { ...initialState, isFavRenamePopupVisible: true };
    const action = { type: TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem: { id: 1 } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedFavItem: { id: 1 }, isFavRenamePopupVisible: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and isSettingsModalVisible is false', () => {
    const state = { ...initialState, isFavRenamePopupVisible: false };
    const action = { type: TOGGLE_RENAME_FAVORITES_POPUP, selectedFavItem: { id: 2 } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedFavItem: { id: 2 }, isFavRenamePopupVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  TOGGLE_CHANGE_FAVORITES_COLOUR
// ////////////////////////////////////////////////////////
describe('TOGGLE_CHANGE_FAVORITES_COLOUR should return correct state ', () => {
  test('when default UI properties exist in state and no fav item passed in', () => {
    const state = undefined;
    const action = { type: TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem: {} };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isColourChangePopUpVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and fav item passed in', () => {
    const state = undefined;
    const action = { type: TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem: { id: 1 } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedFavItem: { id: 1 }, isColourChangePopUpVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and isSettingsModalVisible is true', () => {
    const state = { ...initialState, isColourChangePopUpVisible: true };
    const action = { type: TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem: { id: 1 } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedFavItem: { id: 1 }, isColourChangePopUpVisible: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and isSettingsModalVisible is false', () => {
    const state = { ...initialState, isColourChangePopUpVisible: false };
    const action = { type: TOGGLE_CHANGE_FAVORITES_COLOUR, selectedFavItem: { id: 2 } };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, selectedFavItem: { id: 2 }, isColourChangePopUpVisible: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

// ////////////////////////////////////////////////////////
//  ENABLE_INTEREST
// ////////////////////////////////////////////////////////
describe('ENABLE_INTEREST should return correct state ', () => {
  test('when default UI properties exist in state and value is null', () => {
    const state = undefined;
    const action = { type: ENABLE_INTEREST, value: null };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isInterestEnabled: null };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and value is passed in', () => {
    const state = undefined;
    const action = { type: ENABLE_INTEREST, value: false };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isInterestEnabled: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when default UI properties exist in state and value is passed in', () => {
    const state = undefined;
    const action = { type: ENABLE_INTEREST, value: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isInterestEnabled: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and value not passed in', () => {
    const state = { ...initialState, isInterestEnabled: true };
    const action = { type: ENABLE_INTEREST, value: null };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isInterestEnabled: null };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, isInterestEnabled: false };
    const action = { type: ENABLE_INTEREST, value: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isInterestEnabled: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });

  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, isThirdCPChecked: true };
    const action = { type: TOGGLE_THIRD_CP, value: false };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isThirdCPChecked: false };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

describe('ENABLE_BROWSER_FORCE_REFRESH should return correct state ', () => {
  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, isBrowserForceRefreshEnabled: false };
    const action = { type: ENABLE_BROWSER_FORCE_REFRESH, isBrowserForceRefreshEnabled: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isBrowserForceRefreshEnabled: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

describe('RESET_BLOTTER_SEARCH should return correct state ', () => {
  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, resetBlotterSearch: false };
    const action = { type: RESET_BLOTTER_SEARCH, reset: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, resetBlotterSearch: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

describe('CHANGE_DEAL_EDIT_STATUS should return correct state ', () => {
  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, isDealEditInProgress: false };
    const action = { type: CHANGE_DEAL_EDIT_STATUS, isDealEditInProgress: true };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, isDealEditInProgress: true };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

describe('CHANGE_RE_ALLOCATION_SIDE should return correct state ', () => {
  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, reAllocationSide: '' };
    const action = { type: CHANGE_RE_ALLOCATION_SIDE, reAllocationSide: 'payer' };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, reAllocationSide: 'payer' };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});

describe('UPDATE_DEAL_OBJECT should return correct state ', () => {
  test('when non default UI properties exist in state and value passed in', () => {
    const state = { ...initialState, updatedDealObject: {} };
    const action = { type: UPDATE_DEAL_OBJECT, updatedDealObject: {} };
    const reducerOutput = reducer(state, action);
    const expectedOutput = { ...initialState, updatedDealObject: {} };
    expect(reducerOutput).toEqual(expectedOutput);
  });
});
