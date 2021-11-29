import { actionTypes } from '../utils/constants';
import { isDealTypeSame } from '../utils/helper';
import { getSelectedDealType } from '../utils/selectors';
import executionVenueApi from '../api/executionVenueApi';

export const loadExecutionVenuesSuccess = (executionVenues) => ({ type: actionTypes.LOAD_EXECUTIONVENUES_SUCCESS, executionVenues });
export const loadExecutionVenuesFailed = (error) => ({ type: actionTypes.LOAD_EXECUTIONVENUES_FAILED, error });
export const loadExecutionVenuesCancelled = () => ({ type: actionTypes.LOAD_EXECUTIONVENUES_CANCELLED });
export const resetExecutionVenuesAction = () => ({ type: actionTypes.RESET_EXECUTIONVENUES });

export const loadExecutionVenues = (dealType) => (dispatch, getState) => (
  executionVenueApi.getExecutionVenues(dealType)
    .then((response) => (
      isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(loadExecutionVenuesSuccess(response))
        : dispatch(loadExecutionVenuesCancelled())
    ))
    .catch((error) => dispatch(loadExecutionVenuesFailed(error)))
);

export const resetExecutionVenues = () => (dispatch) => dispatch(resetExecutionVenuesAction());
