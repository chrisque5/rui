import { actionTypes } from '../utils/constants';
import { isDealTypeSame } from '../utils/helper';
import { getSelectedDealType } from '../utils/selectors';
import deskApi from '../api/deskApi';

export function loadDeskDataSuccess(desks) {
  return { type: actionTypes.LOAD_DESKS_SUCCESS, payload: { desks } };
}

export function loadDeskDataCancelled() {
  return { type: actionTypes.LOAD_DESKS_CANCELLED };
}

export function loadDeskDataFailed(error) {
  return { type: actionTypes.LOAD_DESKS_FAILED, error };
}

export function loadDesks(dealType) {
  return ((dispatch, getState) => deskApi.getDeskData(dealType)
    .then((response) => (isDealTypeSame(dealType, getSelectedDealType(getState()))
      ? dispatch(loadDeskDataSuccess(response))
      : dispatch(loadDeskDataCancelled())))
    .catch((error) => dispatch(loadDeskDataFailed(error)))
  );
}
