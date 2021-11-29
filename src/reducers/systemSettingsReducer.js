import { actionTypes } from '../utils/constants';
import initialState from './initialState';

export default function systemSettingsReducer(state = initialState.systemSettings, action) {
  switch (action.type) {
    case actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS:
    case actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED:
      return { ...state, blotterSearchDateRangeLimit: action.blotterSearchDateRangeLimit };
    case actionTypes.LOAD_LICENSE_KEY_SUCCESS:
    case actionTypes.LOAD_LICENSE_KEY_FAILED:
      return { ...state, licenseKey: action.licenseKey };
    default:
      return state;
  }
}
