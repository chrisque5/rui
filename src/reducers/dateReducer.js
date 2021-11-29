import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function dateReducer(state = initialState.dates, action) {
  switch (action.type) {
    case actionTypes.LOAD_DATES_IN_PROGRESS:
      return { ...state, isDateResponsePending: true };
    case actionTypes.LOAD_DATES_SUCCESS:
      return { ...action.dates, isDateResponsePending: false };
    case actionTypes.LOAD_DATES_FAILED:
    case actionTypes.LOAD_DATES_CANCELLED:
      return { ...state, isDateResponsePending: false };
    case actionTypes.RESET_DATES:
      return { ...initialState.dates };
    default:
      return state;
  }
}
