import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function executionVenueReducer(state = initialState.executionVenues, action) {
  switch (action.type) {
    case actionTypes.LOAD_EXECUTIONVENUES_SUCCESS:
      return action.executionVenues;
    case actionTypes.RESET_EXECUTIONVENUES:
      return initialState.executionVenues;
    case actionTypes.LOAD_EXECUTIONVENUES_FAILED:
    case actionTypes.LOAD_EXECUTIONVENUES_CANCELLED:
    default:
      return state;
  }
}
