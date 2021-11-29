import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function deskReducer(state = initialState.brokerageStrategies, action) {
  switch (action.type) {
    case actionTypes.LOAD_BROKERAGE_STRATEGIES_SUCCESS:
      return action.brokerageStrategies;
    case actionTypes.LOAD_BROKERAGE_STRATEGIES_FAILED:
    case actionTypes.LOAD_BROKERAGE_STRATEGIES_CANCELLED:
    default:
      return state;
  }
}
