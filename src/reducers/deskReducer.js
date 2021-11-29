import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function deskReducer(state = initialState.desks, action) {
  switch (action.type) {
    case actionTypes.LOAD_DESKS_SUCCESS: {
      const { desks = [] } = action.payload;

      const newDesks = desks.map((desk) => {
        const { deskId, deskName } = desk;
        return {
          key: deskId,
          displayValue: deskName,
        };
      });

      return [...newDesks];
    }
    case actionTypes.LOAD_DESKS_FAILED:
    case actionTypes.LOAD_DESKS_CANCELLED:
    default:
      return state;
  }
}
