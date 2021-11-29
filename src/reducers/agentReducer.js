import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function agentReducer(state = initialState.agents, action) {
  switch (action.type) {
    case actionTypes.LOAD_AGENTDATA_SUCCESS:
      return action.agents;
    case actionTypes.RESET_AGENTDATA:
      return initialState.agents;
    case actionTypes.LOAD_AGENTDATA_FAILED:
    case actionTypes.LOAD_AGENTDATA_CANCELLED:
    default:
      return state;
  }
}
