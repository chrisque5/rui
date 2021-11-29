import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function brokerReducer(state = initialState.brokers, action) {
  switch (action.type) {
    case actionTypes.LOAD_BROKERDATA_SUCCESS:
      return action.brokers;
    case actionTypes.RESET_BROKERDATA:
      return initialState.brokers;
    case actionTypes.LOAD_BROKERDATA_FAILED:
    case actionTypes.LOAD_BROKERDATA_CANCELLED:
    default:
      return state;
  }
}
