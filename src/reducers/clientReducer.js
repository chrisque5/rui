import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function clientReducer(state = initialState.clients, action) {
  switch (action.type) {
    case actionTypes.LOAD_CLIENTDATA_SUCCESS:
      return action.clientData;
    case actionTypes.RESET_CLIENTDATA:
      return initialState.clients;
    case actionTypes.LOAD_CLIENTDATA_FAILED:
    case actionTypes.LOAD_CLIENTDATA_CANCELLED:
    default:
      return state;
  }
}
