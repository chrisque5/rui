import { actionTypes, userPermissions } from '../utils/constants';
import initialState from './initialState';

const {
  BLOTTER_EDIT, BLOTTER_VIEW, DESK_EDIT, TRADECAPTURE_FWD_ENTRY, TRADECAPTURE_SPT_ENTRY,
  SEF_DEAL_APPROVE, NONSEF_DEAL_APPROVE, TRADECAPTURE_NDF_ENTRY, TRADE_MANAGEMENT_VIEW,
} = userPermissions;

const mapPermissions = (props = []) => {
  const permissions = new Set(props);

  return {
    validForBlotterEdit: permissions.has(BLOTTER_EDIT),
    validForBlotterView: permissions.has(BLOTTER_VIEW) || permissions.has(BLOTTER_EDIT),
    validForFwd: permissions.has(TRADECAPTURE_FWD_ENTRY),
    validForNdf: permissions.has(TRADECAPTURE_NDF_ENTRY),
    validForSpt: permissions.has(TRADECAPTURE_SPT_ENTRY),
    validForDeskEdit: permissions.has(DESK_EDIT),
    validForSEFDealApprove: permissions.has(SEF_DEAL_APPROVE),
    validForNonSEFdealApprove: permissions.has(NONSEF_DEAL_APPROVE),
    validForDealEdit: permissions.has(TRADE_MANAGEMENT_VIEW),
  };
};

/**
 * User Reducer
 *
 * @param {object} state the state
 * @param {object} action the action that executed
 */
export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_SUCCESS: {
      const { user } = action;
      const {
        fullName, deskId, permissions = [], productTypes,
      } = user;
      return {
        ...state,
        fullName,
        deskId,
        productTypes,
        permissions: mapPermissions(permissions),
      };
    }
    case actionTypes.ADD_CLIENTTRADER_PREFERENCE_SUCCESS:
    case actionTypes.CHANGE_PREFERENCE_SUCCESS:
    case actionTypes.DELETE_BROKER_PREFERENCE_SUCCESS:
    case actionTypes.LOAD_PREFERENCES_SUCCESS:
      return { ...state, preferences: action.payload.preferences };
    case actionTypes.ADD_CLIENTTRADER_PREFERENCE_FAILED:
    case actionTypes.CHANGE_PREFERENCE_FAILED:
    case actionTypes.DELETE_BROKER_PREFERENCE_FAILED:
    case actionTypes.LOAD_PREFERENCES_FAILED:
    case actionTypes.LOAD_USER_FAILED:
    case actionTypes.UPDATE_DEFAULTS:
      return { ...state };
    default:
      return state;
  }
}
