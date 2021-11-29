import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function brokerUpdateReducer(state = initialState.brokerUpdateStatus, action) {
  switch (action.type) {
    case actionTypes.UPDATE_BROKER_SUCCESS:
      return action.brokerUpdateStatus;
    case actionTypes.UPDATE_BROKER_FAILED:
      return state;
    default:
      return state;
  }
}
