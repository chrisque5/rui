import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function gcdBrokerReducer(state = initialState.gcdBrokers, action) {
  switch (action.type) {
    case actionTypes.LOAD_GCD_BROKERDATA_SUCCESS:
      return action.gcdBrokers;
    case actionTypes.LOAD_GCD_BROKERDATA_FAILED:
      return state;
    default:
      return state;
  }
}
