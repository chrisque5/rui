import { actionTypes } from '../../utils/constants';
import reducer from '../clientReducer';

const testClients1 = [{
  id: '100114_43633_164918_164922_FWD',
  tradingCustomerId: 164922,
  tradingCustomerLegalName: 'AMERICAN PRESIDENT BANK, HKG',
  tradingCustomerDisplayName: 'AMERICAN PRESIDENT B',
  tradingCustomerLeiCode: null,
  tradingCustomerReutersCode: 'APBH',
  traders: [{
    traderPostingId: 43633,
    traderPostingDisplayName: 'BILL CLINTON',
    executingCustomerId: 164918,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, NYK',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBN',
  }, {
    traderPostingId: 43637,
    traderPostingDisplayName: 'DWIGHT EISENHOWER',
    executingCustomerId: 164922,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, HKG',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBH',
  }, {
    traderPostingId: 43635,
    traderPostingDisplayName: 'JOHN KENNEDY',
    executingCustomerId: 164918,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, NYK',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBN',
  }, {
    traderPostingId: 43635,
    traderPostingDisplayName: 'JOHN KENNEDY',
    executingCustomerId: 164920,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBL',
  }],
}, {
  id: '100114_43633_164918_164920_FWD',
  tradingCustomerId: 164920,
  tradingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
  tradingCustomerDisplayName: 'AMERICAN PRESIDENT B',
  tradingCustomerLeiCode: null,
  tradingCustomerReutersCode: 'APBL',
  traders: [{
    traderPostingId: 43638,
    traderPostingDisplayName: 'ABRAHAM LINCOLN',
    executingCustomerId: 164920,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBL',
  }, {
    traderPostingId: 43633,
    traderPostingDisplayName: 'BILL CLINTON',
    executingCustomerId: 164918,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, NYK',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBN',
  }, {
    traderPostingId: 43633,
    traderPostingDisplayName: 'BILL CLINTON',
    executingCustomerId: 164920,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBL',
  }, {
    traderPostingId: 43633,
    traderPostingDisplayName: 'BILL CLINTON',
    executingCustomerId: 164922,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, HKG',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBH',
  }, {
    traderPostingId: 43637,
    traderPostingDisplayName: 'DWIGHT EISENHOWER',
    executingCustomerId: 164920,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBL',
  }, {
    traderPostingId: 43635,
    traderPostingDisplayName: 'JOHN KENNEDY',
    executingCustomerId: 164920,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBL',
  }, {
    traderPostingId: 43635,
    traderPostingDisplayName: 'JOHN KENNEDY',
    executingCustomerId: 174338,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK_AUTO, PAR',
    executingCustomerDisplayName: 'AMERICAN PRES_AUTO',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: ' ',
  }],
}];

const testClients2 = [{
  id: '100114_43633_164918_164922_FWD',
  tradingCustomerId: 164922,
  tradingCustomerLegalName: 'AMERICAN PRESIDENT BANK, HKG',
  tradingCustomerDisplayName: 'AMERICAN PRESIDENT B',
  tradingCustomerLeiCode: null,
  tradingCustomerReutersCode: 'APBH',
  traders: [{
    traderPostingId: 43633,
    traderPostingDisplayName: 'BILL CLINTON',
    executingCustomerId: 164918,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, NYK',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBN',
  }, {
    traderPostingId: 43637,
    traderPostingDisplayName: 'DWIGHT EISENHOWER',
    executingCustomerId: 164922,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, HKG',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBH',
  }, {
    traderPostingId: 43635,
    traderPostingDisplayName: 'JOHN KENNEDY',
    executingCustomerId: 164918,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, NYK',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBN',
  }, {
    traderPostingId: 43635,
    traderPostingDisplayName: 'JOHN KENNEDY',
    executingCustomerId: 164920,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, LON',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: null,
    executingCustomerReutersCode: 'APBL',
  }],
}];

test('LOAD_CLIENTDATA_SUCCESS action returns clients from action.', () => {
  const reducerOutput = reducer(testClients1, { type: actionTypes.LOAD_CLIENTDATA_SUCCESS, clientData: testClients2 });
  expect(reducerOutput).toEqual(testClients2);
});

test('LOAD_CLIENTDATA_FAILED action returns current state.', () => {
  const reducerOutput = reducer(testClients1, { type: actionTypes.LOAD_CLIENTDATA_FAILED, error: {} });
  expect(reducerOutput).toEqual(testClients1);
});

test('LOAD_CLIENTDATA_CANCELLED action returns current state.', () => {
  const reducerOutput = reducer(testClients1, { type: actionTypes.LOAD_CLIENTDATA_CANCELLED });
  expect(reducerOutput).toEqual(testClients1);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(testClients1, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(testClients1);
});

test('DEFAULT action sets correct initial state [] for clients.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, clientData: undefined });
  expect(reducerOutput).toEqual([]);
});

test('RESET_CLIENTDATA action returns initial state.', () => {
  const reducerOutput = reducer(testClients1, { type: actionTypes.RESET_CLIENTDATA });
  expect(reducerOutput).toEqual([]);
});
