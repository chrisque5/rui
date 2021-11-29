import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function currencyReducer(state = initialState.currencies, action) {
  switch (action.type) {
    case actionTypes.LOAD_CURRENCIES_SUCCESS:
      return action.currencies;
    case actionTypes.RESET_CURRENCIES:
      return initialState.currencies;
    case actionTypes.LOAD_CURRENCIES_FAILED:
    case actionTypes.LOAD_CURRENCIES_CANCELLED:
    default:
      return state;
  }
}
