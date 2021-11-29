import { actionTypes } from '../utils/constants';
import { isDealTypeSame } from '../utils/helper';
import brokerApi from '../api/brokerApi';
import { getSelectedDealType } from '../utils/selectors';

export const loadBrokersSuccess = (brokers) => ({ type: actionTypes.LOAD_BROKERDATA_SUCCESS, brokers });
export const loadBrokersFailed = (error) => ({ type: actionTypes.LOAD_BROKERDATA_FAILED, error });
export const loadBrokersCancelled = () => ({ type: actionTypes.LOAD_BROKERDATA_CANCELLED });
export const loadGcdBrokersSuccess = (gcdBrokers) => ({ type: actionTypes.LOAD_GCD_BROKERDATA_SUCCESS, gcdBrokers });
export const loadGcdBrokersFailed = (error) => ({ type: actionTypes.LOAD_GCD_BROKERDATA_FAILED, error });
export const updateBrokersSuccess = (brokerUpdateStatus) => ({ type: actionTypes.UPDATE_BROKER_SUCCESS, brokerUpdateStatus });
export const updateBrokersFailed = (error) => ({ type: actionTypes.UPDATE_BROKER_FAILED, error });
export const resetBrokerDataAction = () => ({ type: actionTypes.RESET_BROKERDATA });

export const loadBrokers = (dealType, deskId) => (dispatch, getState) => (
  brokerApi.getBrokers(dealType, deskId)
    .then((response) => (
      isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(loadBrokersSuccess(response))
        : dispatch(loadBrokersCancelled())
    ))
    .catch((error) => dispatch(loadBrokersFailed(error)))
);

export const loadGcdBrokers = (dealType, deskId) => (dispatch) => (
  brokerApi.getBrokers(dealType, deskId, true)
    .then((response) => dispatch(loadGcdBrokersSuccess(response)))
    .catch((error) => dispatch(loadGcdBrokersFailed(error)))
);

export const updateBrokers = (formValues) => (dispatch) => (
  brokerApi.updateBrokers(formValues)
    .then((response) => dispatch(updateBrokersSuccess(response)))
    .catch((error) => dispatch(updateBrokersFailed(error)))
);

export const loadDealBrokers = (dealType) => (dispatch, getState) => (
  brokerApi.getDealBrokers(dealType)
    .then((response) => (
      isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(loadBrokersSuccess(response))
        : dispatch(loadBrokersCancelled())
    ))
    .catch((error) => dispatch(loadBrokersFailed(error)))
);

export const resetBrokerData = () => (dispatch) => dispatch(resetBrokerDataAction());
