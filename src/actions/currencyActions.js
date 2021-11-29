import { actionTypes } from '../utils/constants';
import { isDealTypeSame } from '../utils/helper';
import { getSelectedDealType } from '../utils/selectors';
import currencyApi from '../api/currencyApi';

export const loadCurrenciesSuccess = (currencies) => ({ type: actionTypes.LOAD_CURRENCIES_SUCCESS, currencies });
export const loadCurrenciesFailed = (error) => ({ type: actionTypes.LOAD_CURRENCIES_FAILED, error });
export const loadCurrenciesCancelled = () => ({ type: actionTypes.LOAD_CURRENCIES_CANCELLED });
export const updateCLSFlagsSuccess = (currencies) => ({ type: actionTypes.UPDATE_CURRENCY_PAIR_CLS_SUCCESS, currencies });
export const updateCLSFlagsFailed = (error) => ({ type: actionTypes.UPDATE_CURRENCY_PAIR_CLS_FAILED, error });
export const resetCurrenciesAction = () => ({ type: actionTypes.RESET_CURRENCIES });

export const loadCurrencies = (dealType, enableCaching) => (dispatch, getState) => (
  currencyApi.getCurrencies(dealType, enableCaching)
    .then((response) => (
      isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(loadCurrenciesSuccess(response))
        : dispatch(loadCurrenciesCancelled())
    ))
    .catch((error) => dispatch(loadCurrenciesFailed(error)))
);

export const loadDealCurrencies = (dealType, enableCaching = true) => (dispatch) => (
  currencyApi.getDealCurrencies(dealType, enableCaching)
    .then((response) => (
      dispatch(loadCurrenciesSuccess(response))
    ))
    .catch((error) => dispatch(loadCurrenciesFailed(error)))
);

export const updateCLSFlags = (currencies) => (dispatch) => (
  currencyApi.updateCLSFlags(currencies)
    .then((updatedCurrencies) => dispatch(updateCLSFlagsSuccess(updatedCurrencies)))
    .catch((error) => dispatch(updateCLSFlagsFailed(error)))
);

export const resetCurrencies = () => (dispatch) => dispatch(resetCurrenciesAction());
