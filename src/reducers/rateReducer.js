import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function rateReducer(state = initialState.rates, action) {
  switch (action.type) {
    case actionTypes.LOAD_RATES_IN_PROGRESS:
      return { ...state, isRateResponsePending: true };
    case actionTypes.LOAD_RATES_SUCCESS:
      return { ...action.rates, isRateResponsePending: false };
    case actionTypes.LOAD_RATES_FAILED:
    case actionTypes.LOAD_RATES_CANCELLED:
      return { ...state, isRateResponsePending: false };
    default:
      return state;
  }
}
