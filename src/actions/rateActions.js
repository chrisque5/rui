import { actionTypes } from '../utils/constants';
import { isDealTypeSame } from '../utils/helper';
import { getSelectedDealType } from '../utils/selectors';
import rateApi from '../api/rateApi';

export const getRatesInProgress = () => ({ type: actionTypes.LOAD_RATES_IN_PROGRESS });

export function getRatesSuccess(rates) {
  return { type: actionTypes.LOAD_RATES_SUCCESS, rates };
}

export function getRatesFailed(error) {
  return { type: actionTypes.LOAD_RATES_FAILED, error };
}

export function getRatesCancelled() {
  return { type: actionTypes.LOAD_RATES_CANCELLED };
}

export function getRate(
  notionalAmountCurrency, contraCurrency, tenor, adjustedEndDate, dealType, startDate,
) {
  return ((dispatch, getState) => {
    dispatch(getRatesInProgress());
    return rateApi.getRate(
      notionalAmountCurrency, contraCurrency, tenor, adjustedEndDate, dealType, startDate,
    )
      .then((response) => {
        if (!(response.rate || response.statusCode || response.statusText)) {
          throw (response);
        }
        const rate = response.rate;
        const statusCode = response.statusCode;
        const statusText = response.statusText;

        return {
          rate,
          statusCode,
          statusText,
        };
      })
      .then((rates) => (isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(getRatesSuccess(rates))
        : dispatch(getRatesCancelled())))
      .catch((error) => dispatch(getRatesFailed(error)));
  });
}

export function getSpreadRate(
  notionalAmountCurrency, contraCurrency,
  tenor, tenor2, adjustedEndDate, adjustedEndDate2, dealType, startDate,
) {
  return ((dispatch) => {
    dispatch(getRatesInProgress());
    return rateApi.getSpreadRate(
      notionalAmountCurrency, contraCurrency,
      tenor, tenor2, adjustedEndDate, adjustedEndDate2, dealType, startDate,
    )
      .then((response) => {
        if (!(response.rate || response.statusCode || response.statusText)) {
          throw (response);
        }
        const rate = response.rate;
        const rate2 = response.rate2;
        const points = response.points;
        const statusCode = response.statusCode;
        const statusText = response.statusText;
        return {
          rate,
          rate2,
          points,
          statusCode,
          statusText,
        };
      })
      .then((rates) => dispatch(getRatesSuccess(rates)))
      .catch((error) => dispatch(getRatesFailed(error)));
  });
}
