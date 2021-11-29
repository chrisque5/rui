import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function originalDealReducer(state = initialState.originalDeal, action) {
  switch (action.type) {
    case actionTypes.UPDATE_ORIGINAL_DEAL:
      return action.payload.originalDeal;
    default:
      return state;
  }
}
