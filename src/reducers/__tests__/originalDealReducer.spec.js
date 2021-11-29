import { actionTypes } from '../../utils/constants';
import reducer from '../originalDealReducer';

const initialDealState = {
  originalDeal: null,
};

const originalDeal = {
  trades: [{
    tradeEconomics: {
      payer: { brokerage: { amount: 10, allocatoins: [] } },
      receiver: { brokerage: { amount: 20, allocatoins: [] } },
    },
  }],
};

test('UPDATE_ORIGINAL_DEAL action returns deals from action.', () => {
  const reducerOutput = reducer(initialDealState, { type: actionTypes.UPDATE_ORIGINAL_DEAL, payload: { originalDeal } });
  expect(reducerOutput).toEqual(originalDeal);
});
