import { actionTypes } from '../utils/constants';
import { getSelectedDealType } from '../utils/selectors';
import { isDealTypeSame } from '../utils/helper';
import clientApi from '../api/clientApi';

export const loadClientDataSuccess = (clientData) => ({
  type: actionTypes.LOAD_CLIENTDATA_SUCCESS,
  clientData,
});

export const loadClientDataFailed = (error) => ({
  type: actionTypes.LOAD_CLIENTDATA_FAILED,
  error,
});

export const loadClientDataCancelled = () => ({ type: actionTypes.LOAD_CLIENTDATA_CANCELLED });

export const resetClientDataAction = () => ({ type: actionTypes.RESET_CLIENTDATA });

export const loadClientData = (dealType) => (dispatch, getState) => (
  clientApi.getClientData(dealType)
    .then((response) => (
      isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(loadClientDataSuccess(response))
        : dispatch(loadClientDataCancelled())
    ))
    .catch((error) => {
      dispatch(loadClientDataFailed(error));
    })
);

export const resetClientData = () => (dispatch) => dispatch(resetClientDataAction());
