import * as _ from 'lodash';
import * as scopeHelper from '../scopeHelper';

const mockPreferences = {
  preferredBrokers: [
    {
      nickName: 'ANGIE LOW',
      id: 59596,
      name: 'ANGIE LOW',
      deskId: 2040,
      favourites: {
        clients: [
          {
            nickName: '42 FIN SERV S.R.O',
            executingCustomerId: 0,
            tradingCustomerId: 164940,
            tradingCustomerDisplayName: 'FORD BANK',
            tradingCustomerCodeLocationCode: 'FORD.NYK',
            traderPostingId: 0,
            agentCustomerId: 170447,
            agentDisplayShortName: '42 FIN SERV S.R.O',
          },
          {
            nickName: 'HENRY FORD',
            executingCustomerId: 164940,
            executingCustomerDisplayName: 'FORD BANK',
            tradingCustomerId: 164940,
            tradingCustomerDisplayName: 'FORD BANK',
            tradingCustomerCodeLocationCode: 'FORD.NYK',
            traderPostingId: 43648,
            traderDisplayName: 'HENRY FORD',
            agentCustomerId: 0,
          }, {
            nickName: 'BOON-KIT LIM',
            executingCustomerId: 164940,
            executingCustomerDisplayName: 'DEUTSCHE BANK AG',
            tradingCustomerId: 164940,
            tradingCustomerDisplayName: 'DEUTSCHE BANK AG',
            tradingCustomerCodeLocationCode: 'DEUT.LON',
            traderPostingId: 59834,
            traderDisplayName: 'BOON-KIT LIM',
            agentCustomerId: 0,
            status: 'OK',
          },
        ],
        currencyPairs: [
          {
            nickName: 'USDBRL',
            baseCurrency: 'USD',
            counterCurrency: 'BRL',
            dealtCurrency: 'USD',
          },
        ],
        terms: [
          {
            nickName: '9M',
            term: '9M',
          }, {
            nickName: '02/25/2020',
            valueDate: '02/25/2020',
          },
        ],
        executionVenues: [
          {
            nickName: 'TPSEF',
            executionVenue: 'TPSEF',
          },
          {
            nickName: 'XOFF',
            executionVenue: 'XOFF',
          },
        ],
      },
      editable: true,
    },
  ],
  settings: {
    ratesFeed: true,
    displayClientFavourites: true,
    displayCurrencyFavourites: true,
    displayTermFavourites: true,
    dealSubmitSound: 'ka-ching',
    colourScheme: 'light',
    displayClients: true,
    displayExecutionVenueFavourites: true,
    lrMode: null,
    displayExecutionVenueColours: true,
  },
  defaults: {
    lastDealType: 'NDF',
    dealDefaults: [
      {
        executionVenue: 'TPSEF',
        counterCurrency: 'CNY',
        dealtCurrency: 'USD',
        key: 'NDF',
        baseCurrency: 'USD',
      },
      {
        executionVenue: 'XOFF',
        counterCurrency: 'CNH',
        dealtCurrency: 'USD',
        key: 'FWD',
        baseCurrency: 'USD',
      },
    ],
  },
};

describe('scopeHelper.isInScope', () => {
  const mockBroker = '2039,13660';
  const mockScopes = {
    counterPartyScope: [
      {
        counterPartyScope: [
          {
            favoriteClient: {
              nickName: 'HENRY FORD',
              executingCustomerId: 164940,
              executingCustomerDisplayName: 'FORD BANK',
              tradingCustomerId: 164942,
              tradingCustomerDisplayName: 'FERRARI BANK',
              tradingCustomerCodeLocationCode: 'FERR.ROM',
              traderPostingId: 43648,
              traderDisplayName: 'HENRY FORD',
              agentCustomerId: 0,
              status: 'OK',
            },
            allowedInScope: true,
          },
          {
            favoriteClient: {
              nickName: 'HAROLD WILSON',
              backgroundColour: '5',
              executingCustomerId: 164927,
              executingCustomerDisplayName: 'BRITISH PRIME MINISTER BANK',
              tradingCustomerId: 164934,
              tradingCustomerDisplayName: 'FRENCH PRESIDENTIAL BANK',
              tradingCustomerCodeLocationCode: 'FRPR.LON',
              traderPostingId: 43640,
              traderDisplayName: 'HAROLD WILSON',
              agentCustomerId: 0,
              status: 'OK',
            },
            allowedInScope: true,
          },
          {
            favoriteClient: {
              nickName: 'HENRY FORD',
              backgroundColour: '2',
              executingCustomerId: 164940,
              executingCustomerDisplayName: 'FORD BANK',
              tradingCustomerId: 164942,
              tradingCustomerDisplayName: 'FERRARI BANK',
              tradingCustomerCodeLocationCode: 'FERR.ROM',
              traderPostingId: 43648,
              traderDisplayName: 'HENRY FORD',
              agentCustomerId: 0,
              status: 'OK',
            },
            allowedInScope: true,
          },
        ],
        deskBroker: '2039,13660',
      },
    ],
    executionVenueScope: [
      {
        executionVenueScope: [
          {
            executionVenue: 'TPSEF',
            allowedInScope: true,
          },
        ],
        deskBroker: '2039,13660',
      },
    ],
    currencyScope: [
      {
        currencyScope: [
          {
            baseCurrency: 'USD',
            counterCurrency: 'CNY',
            allowedInScope: true,
          },
        ],
        deskBroker: '2039,13660',
      },
    ],
    termScope: [
      {
        termScope: [
          {
            term: '1M',
            allowedInScope: true,
          },
        ],
        deskBroker: '2039,13660',
      },
    ],
  };

  const mockFavItems = {
    counterParty: {
      nickName: 'HENRY FORD',
      executingCustomerId: 164940,
      executingCustomerDisplayName: 'FORD BANK',
      tradingCustomerId: 164942,
      traderPostingId: 43648,
      traderDisplayName: 'HENRY FORD',
      agentCustomerId: 0,
      status: 'OK',
    },
    executionVenue: {
      nickName: 'TPSEF',
      executionVenue: 'TPSEF',
    },
    ccyPair: {
      nickName: 'USDCNY',
      baseCurrency: 'USD',
      counterCurrency: 'CNY',
      dealtCurrency: 'USD',
    },
    term: {
      nickName: '1M',
      term: '1M',
    },
    termWithValDt: {
      nickName: '02/25/2020',
      valueDate: '02/25/2020',
    },
  };

  test('returns false for null scope ', () => {
    const response = scopeHelper.isInScope();
    expect(response).toEqual(false);
  });

  test('returns false for invalidScopes ', () => {
    const response = scopeHelper.isInScope(null, { invalidScopes: [] }, null);
    expect(response).toEqual(false);
  });

  test('returns true for empty scope', () => {
    const response = scopeHelper.isInScope(null, {}, null);
    expect(response).toEqual(true);
  });

  test('returns true for Counterparty in scope', () => {
    const response = scopeHelper.isInScope(mockFavItems.counterParty, mockScopes, mockBroker);
    expect(response).toEqual(true);
  });

  test('returns false for Counterparty not in scope', () => {
    const cpNotInScope = { ...mockScopes };
    (cpNotInScope.counterPartyScope[0]).counterPartyScope[0].allowedInScope = false;
    const response = scopeHelper.isInScope(mockFavItems.counterParty, cpNotInScope, mockBroker);
    expect(response).toEqual(false);
  });

  test('returns true for executionVenue in scope', () => {
    const response = scopeHelper.isInScope(mockFavItems.executionVenue, mockScopes, mockBroker);
    expect(response).toEqual(true);
  });

  test('returns false for executionVenue not in scope', () => {
    const venueNotInScope = { ...mockScopes };
    (venueNotInScope.executionVenueScope[0]).executionVenueScope[0].allowedInScope = false;
    const response = scopeHelper.isInScope(mockFavItems.executionVenue, venueNotInScope, mockBroker);
    expect(response).toEqual(false);
  });

  test('returns true for currency in scope', () => {
    const response = scopeHelper.isInScope(mockFavItems.ccyPair, mockScopes, mockBroker);
    expect(response).toEqual(true);
  });

  test('returns false for currency not in scope', () => {
    const ccyNotInScope = { ...mockScopes };
    (ccyNotInScope.currencyScope[0]).currencyScope[0].allowedInScope = false;
    const response = scopeHelper.isInScope(mockFavItems.ccyPair, ccyNotInScope, mockBroker);
    expect(response).toEqual(false);
  });

  test('returns true for term in scope', () => {
    const response = scopeHelper.isInScope(mockFavItems.term, mockScopes, mockBroker);
    expect(response).toEqual(true);
  });

  test('returns true for term in scope', () => {
    const response = scopeHelper.isInScope(mockFavItems.termWithValDt, mockScopes, mockBroker);
    expect(response).toEqual(true);
  });

  test('returns false for term not in scope', () => {
    const termNotInScope = { ...mockScopes };
    (termNotInScope.termScope[0]).termScope[0].allowedInScope = false;
    const response = scopeHelper.isInScope(mockFavItems.term, termNotInScope, mockBroker);
    expect(response).toEqual(false);
  });
});

describe('scopeHelper.getCurrencyScope', () => {
  const mockCcyPairs = [
    {
      baseCurrency: 'USD',
      counterCurrency: 'ARS',
      instrumentId: 9600,
      baseCurrencyDayCountYear: '360',
      counterCurrencyDayCountYear: '360',
      scalingFactor: 0.0001,
    },
    {
      baseCurrency: 'USD',
      counterCurrency: 'BRL',
      instrumentId: 10200,
      baseCurrencyDayCountYear: '365',
      counterCurrencyDayCountYear: '365',
      scalingFactor: 0.0001,
    },
  ];

  test('returns valid output for valid ccy pair ', () => {
    const mockValidReturn = [
      {
        currencyScope: [
          {
            allowedInScope: true,
            baseCurrency: 'USD',
            counterCurrency: 'BRL',
          },
        ],
        deskBroker: '2040,59596',
      },
    ];
    const response = scopeHelper.getCurrencyScope(mockCcyPairs, mockPreferences);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns null empty favorites ', () => {
    const invalidPreferences = _.cloneDeep(mockPreferences);
    (invalidPreferences.preferredBrokers[0]).favourites = null;
    const response = scopeHelper.getCurrencyScope(mockCcyPairs, invalidPreferences);
    expect(response).toEqual([null]);
  });
});

describe('scopeHelper.getTermScope', () => {
  test('returns valid output for valid term', () => {
    const mockValidReturn = [
      {
        termScope: [
          {
            allowedInScope: true,
            term: '9M',
          },
          {
            allowedInScope: true,
            term: '02/25/2020',
          },
        ],
        deskBroker: '2040,59596',
      },
    ];
    const response = scopeHelper.getTermScope(mockPreferences, 'Outright', 'NDF');
    expect(response).toEqual(mockValidReturn);
  });

  test('returns [null] for empty favorites ', () => {
    const invalidPreferences = _.cloneDeep(mockPreferences);
    invalidPreferences.preferredBrokers[0].favourites = null;
    const response = scopeHelper.getTermScope(invalidPreferences, 'Outright', 'NDF');
    expect(response).toEqual([null]);
  });

  test('returns null for no data input ', () => {
    const response = scopeHelper.getTermScope();
    expect(response).toEqual(null);
  });
});

describe('scopeHelper.getCounterPartyScope', () => {
  const mockBrokers = [{
    id: 59596,
    name: 'ANGIE LOW',
    deskId: 2040,
    deskName: 'SIN NDF DESK',
  }, {
    id: 43638,
    name: 'ABRAHAM LINCOLN',
    deskId: 164930,
    deskName: 'SIN NDF DESK',
  }];
  const mockAgents = [{
    shortName: '42 FIN SERV S.R.O', locationName: 'PRA', companyName: '42 FINANCIAL SERVICES S.R.O, PRA', leiCode: null, reutersCode: ' ', id: 170447,
  }];
  const mockClients = [{
    id: '100114_43648_164940_164940_NDF',
    tradingCustomerId: 164940,
    tradingCustomerLegalName: 'FORD BANK, NYK',
    tradingCustomerDisplayName: 'FORD BANK',
    tradingCustomerLeiCode: 'TESTC8BVG1BCZB3JH189',
    tradingCustomerReutersCode: 'FORD',
    tradingCustomerCodeLocationCode: 'FORD.NYK',
    traders: [
      {
        traderPostingId: 59813,
        traderPostingDisplayName: 'BOON-KIT LIM',
        executingCustomerId: 164940,
        executingCustomerLegalName: 'DEUTSCHE BANK AG, SIN',
        executingCustomerDisplayName: 'DEUTSCHE BK AG',
        executingCustomerLeiCode: '7LTWFZYICNSX8D621K86',
        executingCustomerReutersCode: 'DEUS',
      },
      {
        traderPostingId: 43648,
        traderPostingDisplayName: 'HENRY FORD',
        executingCustomerId: 164940,
        executingCustomerLegalName: 'FORD BANK, NYK',
        executingCustomerDisplayName: 'FORD BANK',
        executingCustomerLeiCode: 'TESTC8BVG1BCZB3JH189',
        executingCustomerReutersCode: 'FORD',
      }, {
        traderPostingId: 43627,
        traderPostingDisplayName: 'FRED FLINTSTONE',
        executingCustomerId: 164905,
        executingCustomerLegalName: 'FLINTSTONE FAMILY BANK, LON',
        executingCustomerDisplayName: 'FLINTSTONE FAMILY BK',
        executingCustomerLeiCode: 'TEST14NMZDUA8XT73U42',
        executingCustomerReutersCode: 'FLIN',
      },
    ],
  }];

  test('returns null output for no brokers', () => {
    const response = scopeHelper.getCounterPartyScope({});
    expect(response).toEqual(null);
  });

  test('retruns null for empty favorites ', () => {
    const invalidPreferences = _.cloneDeep(mockPreferences);
    invalidPreferences.preferredBrokers[0].favourites = null;
    const [response] = scopeHelper.getCounterPartyScope(mockBrokers, mockAgents, mockClients, invalidPreferences);
    expect(response).toEqual(null);
  });

  test('matched broker not found so not in scope', () => {
    const [response] = scopeHelper.getCounterPartyScope([mockBrokers[1]], mockAgents, mockClients, mockPreferences);
    expect(response.counterPartyScope[0].allowedInScope).toEqual(false);
    expect(response.counterPartyScope[1].allowedInScope).toEqual(false);
  });

  test('matched client found in scope', () => {
    const [response] = scopeHelper.getCounterPartyScope([mockBrokers[0]], mockAgents, mockClients, mockPreferences);
    expect(response.counterPartyScope[0].allowedInScope).toEqual(true);
    expect(response.counterPartyScope[1].allowedInScope).toEqual(true);
  });

  test('matched client not found in scope', () => {
    const [response] = scopeHelper.getCounterPartyScope([mockBrokers[0]], mockAgents, [], mockPreferences);
    expect(response.counterPartyScope[0].allowedInScope).toEqual(false);
    expect(response.counterPartyScope[1].allowedInScope).toEqual(false);
  });

  test('matched agent not found ', () => {
    const [response] = scopeHelper.getCounterPartyScope(mockBrokers, [], mockClients, mockPreferences);
    expect(response.counterPartyScope[0].allowedInScope).toEqual(false);
    expect(response.counterPartyScope[0].allowedInScope).toEqual(false);
  });
});

describe('scopeHelper.getExecutionVenueScope', () => {
  const mockExeVenues = [
    {
      id: null,
      lockSequence: null,
      venueId: 'TPSEF',
      productType: 'FX',
      venueType: 'SEF',
      reportingRegime: 'DoddFrankAct',
    },
    {
      id: null,
      lockSequence: null,
      venueId: 'XOFF',
      productType: 'FX',
      venueType: 'OffFacility',
      reportingRegime: 'DoddFrankAct',
    },
  ];

  test('returns valid output for valid execVenue', () => {
    const mockValidReturn = [
      {
        executionVenueScope: [
          {
            allowedInScope: true,
            executionVenue: 'TPSEF',
          },
          {
            allowedInScope: true,
            executionVenue: 'XOFF',
          },
        ],
        deskBroker: '2040,59596',
      },
    ];
    const response = scopeHelper.getExecutionVenueScope(mockExeVenues, mockPreferences);
    expect(response).toEqual(mockValidReturn);
  });

  test('returns [null] for empty favorites ', () => {
    const invalidPreferences = _.cloneDeep(mockPreferences);
    invalidPreferences.preferredBrokers[0].favourites = null;
    const response = scopeHelper.getExecutionVenueScope(mockExeVenues, invalidPreferences);
    expect(response).toEqual([null]);
  });
});
