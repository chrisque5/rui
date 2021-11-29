import { transformPreferences } from '../index';

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

test('transformPreferences returns empty object when no parmeters passed in ', () => {
  const allPreferences = transformPreferences({});
  expect(allPreferences).toEqual({ selectedPreferenceBroker: '' });
});

test('allPreferences returns empty object when no preferredBrokers passed in ', () => {
  const allPreferences = transformPreferences({ brokerId: null, deskId: null, tradingCustomerCodeLocationCode: null });
  expect(allPreferences).toEqual({ selectedPreferenceBroker: '' });
});

//
// selectedPreferenceBroker
//
test('transformPreferences returns default selectedPreferenceBroker when brokerId is null and deskId is null', () => {
  const allPreferences = transformPreferences({ preferredBrokers });
  expect(allPreferences.selectedPreferenceBroker).toEqual('8159,100120');
});

test('transformPreferences returns default selectedPreferenceBroker when brokerId is null and deskId is not null', () => {
  const allPreferences = transformPreferences({ preferredBrokers, deskId: 8519 });
  expect(allPreferences.selectedPreferenceBroker).toEqual('8159,100120');
});

test('transformPreferences returns default selectedPreferenceBroker when brokerId is not null and deskId is null', () => {
  const allPreferences = transformPreferences({ preferredBrokers, brokerId: 100120 });
  expect(allPreferences.selectedPreferenceBroker).toEqual('8159,100120');
});

test('transformPreferences returns selected selectedPreferenceBroker when brokerId is not null and deskId is not null', () => {
  const allPreferences = transformPreferences({ preferredBrokers, brokerId: 60807, deskId: 2024 });
  expect(allPreferences.selectedPreferenceBroker).toEqual('2024,60807');
});

//
// selectedPreferenceFirm
//
test('transformPreferences returns empty selectedPreferenceFirm when tradingCustomerCodeLocationCode is null', () => {
  const allPreferences = transformPreferences({ preferredBrokers });
  expect(allPreferences.selectedPreferenceFirm).toEqual(null);
});

test('transformPreferences returns empty selectedPreferenceFirm when tradingCustomerCodeLocationCode is not null', () => {
  const allPreferences = transformPreferences({ preferredBrokers, tradingCustomerCodeLocationCode: 'DEUT.SIN' });
  expect(allPreferences.selectedPreferenceFirm).toEqual('DEUT.SIN');
});

//
// selectedPreferenceFirms
//
test('transformPreferences returns correct selectedPreferenceFirms, in aplhabetical order for the default broker', () => {
  const allPreferences = transformPreferences({
    preferredBrokers,
  });

  const { selectedPreferenceFirms } = allPreferences;

  expect(selectedPreferenceFirms.length).toEqual(3);
  expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
  expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
  expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');
});

test('transformPreferences returns correct selectedPreferenceFirms, in aplhabetical order for the selected broker', () => {
  const allPreferences = transformPreferences({
    preferredBrokers, brokerId: 63278, deskId: 2059, tradingCustomerCodeLocationCode: null,
  });

  const { selectedPreferenceFirms } = allPreferences;

  expect(selectedPreferenceFirms.length).toEqual(2);
  expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.LON');
  expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
});

//
// selectedPreferenceClients
//
test('transformPreferences returns correct selectedPreferenceClients, all clients, when tradingCustomerCodeLocationCode is null', () => {
  const allPreferences = transformPreferences({ preferredBrokers, brokerId: 100120, deskId: 8159 });
  const { selectedPreferenceClients } = allPreferences;

  expect(selectedPreferenceClients.length).toEqual(13);
  expect(selectedPreferenceClients[0].nickName).toEqual('BOON-KIT LIM');
  expect(selectedPreferenceClients[1].nickName).toEqual('ALL TRAD COFIDEM LUX');
  expect(selectedPreferenceClients[2].nickName).toEqual('BILL CLINTON');
  expect(selectedPreferenceClients[3].nickName).toEqual('Test BRian');
  expect(selectedPreferenceClients[4].nickName).toEqual('TULLETT MANILA');
  expect(selectedPreferenceClients[5].nickName).toEqual('ADS SEC AGENT');
  expect(selectedPreferenceClients[6].nickName).toEqual('ALL TRAD BKRS EUR AV');
  expect(selectedPreferenceClients[7].nickName).toEqual('A-J STEVENS');
  expect(selectedPreferenceClients[8].nickName).toEqual('EQUISEC TSY SERV');
  expect(selectedPreferenceClients[9].nickName).toEqual('PARIBELLO');
  expect(selectedPreferenceClients[10].nickName).toEqual('SIG ENERGY LLLP');
  expect(selectedPreferenceClients[11].nickName).toEqual('222222');
  expect(selectedPreferenceClients[12].nickName).toEqual('DAVY MONEYBROKERS');
});

test('transformPreferences returns correct selectedPreferenceClients, specific clients, when tradingCustomerCodeLocationCode is not null', () => {
  const allPreferences = transformPreferences({
    preferredBrokers, brokerId: 100120, deskId: 8159, tradingCustomerCodeLocationCode: 'TULF.FFT',
  });

  const { selectedPreferenceClients } = allPreferences;

  expect(selectedPreferenceClients.length).toEqual(4);
  expect(selectedPreferenceClients[0].nickName).toEqual('ADS SEC AGENT');
  expect(selectedPreferenceClients[1].nickName).toEqual('A-J STEVENS');
  expect(selectedPreferenceClients[2].nickName).toEqual('EQUISEC TSY SERV');
  expect(selectedPreferenceClients[3].nickName).toEqual('DAVY MONEYBROKERS');
});

//
// full payload test
//
test('transformPreferences returns correct payload with defaults', () => {
  const allPreferences = transformPreferences({
    preferredBrokers, brokerId: 100120, deskId: 8159, tradingCustomerCodeLocationCode: 'TULF.FFT',
  });

  const {
    selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
  } = allPreferences;

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

test('transformPreferences returns correct payload with selected values', () => {
  const allPreferences = transformPreferences({
    preferredBrokers, brokerId: 100120, deskId: 8159, tradingCustomerCodeLocationCode: 'TULF.FFT',
  });

  const {
    selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
  } = allPreferences;

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

test('transformPreferences returns correct payload when client have different tradingCustomerId but same tradingCustomerCodeLocationCode', () => {
  const preferredBrokersWithDuplicatedFirm = JSON.parse(JSON.stringify(preferredBrokers));
  const additionalClient = {
    nickName: 'BOON-KIT LIM',
    backgroundColour: '5',
    executingCustomerId: 104579,
    executingCustomerDisplayName: 'DEUTSCHE BANK AG',
    tradingCustomerId: 104580, // Different trading Customer Id
    tradingCustomerDisplayName: 'DEUTSCHE BANK AG',
    tradingCustomerCodeLocationCode: 'DEUT.SIN', // Same firm
    traderPostingId: 59813,
    traderDisplayName: 'BOON-KIT LIM', // Same name
    agentCustomerId: 0,
    status: 'OK',
  };

  preferredBrokersWithDuplicatedFirm[0].favourites.clients.push(additionalClient);

  const allPreferences = transformPreferences({
    preferredBrokers: preferredBrokersWithDuplicatedFirm, brokerId: 100120, deskId: 8159, tradingCustomerCodeLocationCode: 'DEUT.SIN',
  });

  const {
    selectedPreferenceBroker, selectedPreferenceClients, selectedPreferenceFirm, selectedPreferenceFirms,
  } = allPreferences;

  expect(selectedPreferenceBroker).toEqual('8159,100120');

  expect(selectedPreferenceFirm).toEqual('DEUT.SIN');

  expect(selectedPreferenceFirms.length).toEqual(3);
  expect(selectedPreferenceFirms[0].tradingCustomerCodeLocationCode).toEqual('APBK.NYK');
  expect(selectedPreferenceFirms[1].tradingCustomerCodeLocationCode).toEqual('DEUT.SIN');
  expect(selectedPreferenceFirms[2].tradingCustomerCodeLocationCode).toEqual('TULF.FFT');
  expect(selectedPreferenceClients.length).toEqual(3);
  expect(selectedPreferenceClients[0].nickName).toEqual('BOON-KIT LIM');
  expect(selectedPreferenceClients[1].nickName).toEqual('ALL TRAD COFIDEM LUX');
  expect(selectedPreferenceClients[2].nickName).toEqual('BOON-KIT LIM');
});
