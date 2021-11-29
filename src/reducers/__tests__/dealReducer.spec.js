import { actionTypes } from '../../utils/constants';
import reducer from '../dealReducer';

const initialDealState = {
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
};

const inputDeal = {
  chainId: 0,
  deals: [
    {
      dmsDealId: 207,
      dmsState: 'Approved',
      id: 202,
      lockSequence: 1,
      executionChainId: 202,
    },
  ],
  brokerage: [
    {
      grossBrokerageCharge: null,
      explanation: 'Failed FX conversion. Failed! Used sub-agreement #18, v6.'
        + ' Restrictions: None. Duration period 8 Day(s) [Incl] to 6 Month(s) [Incl]. Value-based charge 15 GBP per 1000000 USD. ',
      currency: null,
      id: 164923,
    },
    {
      grossBrokerageCharge: null,
      explanation: 'Failed FX conversion. Failed! Used sub-agreement #18, v6.'
        + ' Restrictions: None. Duration period 8 Day(s) [Incl] to 6 Month(s) [Incl]. Value-based charge 15 GBP per 1000000 USD. ',
      currency: null,
      id: 164942,
    },
  ],
};

const resultDealState = {
  chainId: 0,
  deals: [
    {
      dmsDealId: 207,
      dmsState: 'Approved',
      id: 202,
      lockSequence: 1,
      executionChainId: 202,
    },
  ],
  brokerage: [
    {
      grossBrokerageCharge: null,
      explanation: 'Failed FX conversion. Failed! Used sub-agreement #18, v6.'
        + ' Restrictions: None. Duration period 8 Day(s) [Incl] to 6 Month(s) [Incl]. Value-based charge 15 GBP per 1000000 USD. ',
      currency: null,
      id: 164923,
    },
    {
      grossBrokerageCharge: null,
      explanation: 'Failed FX conversion. Failed! Used sub-agreement #18, v6.'
        + ' Restrictions: None. Duration period 8 Day(s) [Incl] to 6 Month(s) [Incl]. Value-based charge 15 GBP per 1000000 USD. ',
      currency: null,
      id: 164942,
    },
  ],
  success: true,
};

test('CREATE_DEAL_SUCCESS action returns deals from action.', () => {
  const reducerOutput = reducer(initialDealState, { type: actionTypes.CREATE_DEAL_SUCCESS, deal: inputDeal });
  expect(reducerOutput).toEqual(resultDealState);
});

test('CREATE_DEAL_FAILED action returns current state.', () => {
  const reducerOutput = reducer(initialDealState, { type: actionTypes.CREATE_DEAL_FAILED, error: {} });
  expect(reducerOutput).toEqual(initialDealState);
});

test('DEFAULT action returns current state.', () => {
  const reducerOutput = reducer(initialDealState, { type: actionTypes.LOAD_USER_SUCCESS, user: { permissions: { validForNdf: true } } });
  expect(reducerOutput).toEqual(initialDealState);
});

test('DEFAULT action sets correct initial state for deals.', () => {
  const reducerOutput = reducer(undefined, { type: undefined, deal: undefined });
  expect(reducerOutput).toEqual(initialDealState);
});
