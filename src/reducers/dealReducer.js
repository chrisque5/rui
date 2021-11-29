import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function dealReducer(state = initialState.deal, action) {
  switch (action.type) {
    case actionTypes.CREATE_DEAL_SUCCESS:
      return { ...action.deal, success: true };
    case actionTypes.CREATE_DEAL_FAILED:
      return { ...state, success: false };
    case actionTypes.LOAD_DEAL_SUCCESS:
    case actionTypes.EDIT_DEAL_SUCCESS:
      return { ...action.payload.deal };
    case actionTypes.LOAD_DEAL_FAILED:
    case actionTypes.EDIT_DEAL_FAILED:
    default:
      return state;
  }
}
