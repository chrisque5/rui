import { actionTypes, dealTypes, strategies } from '../utils/constants';
import { isDealTypeSame, isStrategyTypeSame } from '../utils/helper';
import { getSelectedDealType, getSelectedStrategyType } from '../utils/selectors';
import dateApi from '../api/dateApi';

export const getDatesInProgress = () => ({ type: actionTypes.LOAD_DATES_IN_PROGRESS });
export const getDatesSuccess = (dates) => ({ type: actionTypes.LOAD_DATES_SUCCESS, dates });
export const getDatesFailed = (error) => ({ type: actionTypes.LOAD_DATES_FAILED, error });
export const getDatesCancelled = () => ({ type: actionTypes.LOAD_DATES_CANCELLED });
export const resetDatesAction = () => ({ type: actionTypes.RESET_DATES });

export function getNdfOutrightDatesByTerm(term, instrumentId, tradeDate) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getNdfOutrightDatesByTerm(term, instrumentId, tradeDate)
      .then((response) => (
        isDealTypeSame(dealTypes.NDF, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategies.NDF.OUTRIGHT, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getNdfOutrightDatesByValueDate(valueDate, instrumentId, tradeDate) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getNdfOutrightDatesByValueDate(valueDate, instrumentId, tradeDate)
      .then((response) => (
        isDealTypeSame(dealTypes.NDF, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategies.NDF.OUTRIGHT, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getNdfSpreadDatesByTerm(term1, term2, instrumentId, tradeDate) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getNdfSpreadDatesByTerm(term1, term2, instrumentId, tradeDate)
      .then((response) => (
        isDealTypeSame(dealTypes.NDF, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategies.NDF.SPREAD, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getNdfSpreadDatesByValueDate(valueDate1, valueDate2, instrumentId, tradeDate, isTreatedAsTom) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getNdfSpreadDatesByValueDate(valueDate1, valueDate2, instrumentId, tradeDate, isTreatedAsTom)
      .then((response) => (
        isDealTypeSame(dealTypes.NDF, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategies.NDF.SPREAD, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getFwdDatesByTerm(nearTerm, farTerm, tradeDate, instrumentId) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    const strategyType = getSelectedStrategyType(getState());
    return dateApi.getFwdDatesByTerm(nearTerm, farTerm, tradeDate, instrumentId)
      .then((response) => (
        isDealTypeSame(dealTypes.FWD, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategyType, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getFwdTermsByValueDate(nearValueDate, farValueDate, tradeDate, instrumentId) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    const strategyType = getSelectedStrategyType(getState());
    return dateApi.getFwdTermsByValueDate(nearValueDate, farValueDate, tradeDate, instrumentId)
      .then((response) => (
        isDealTypeSame(dealTypes.FWD, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategyType, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getFwdOutrightDatesByTerm(term, tradeDate, instrumentId) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getFwdOutrightDatesByTerm(term, tradeDate, instrumentId)
      .then((response) => (
        isDealTypeSame(dealTypes.FWD, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategies.FWD.OUTRIGHT, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getFwdOutrightTermByValueDate(valueDate, tradeDate, instrumentId) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getFwdOutrightTermsByValueDate(valueDate, tradeDate, instrumentId)
      .then((response) => (
        isDealTypeSame(dealTypes.FWD, getSelectedDealType(getState()))
        && isStrategyTypeSame(strategies.FWD.OUTRIGHT, getSelectedStrategyType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getSptValueDate(tradeDate, instrumentId) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getSptValueDate(tradeDate, instrumentId)
      .then((response) => (
        isDealTypeSame(dealTypes.SPT, getSelectedDealType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function getSptDayCounts(tradeDate, valueDate, instrumentId) {
  return ((dispatch, getState) => {
    dispatch(getDatesInProgress());
    return dateApi.getSptDayCounts(tradeDate, valueDate, instrumentId)
      .then((response) => (
        isDealTypeSame(dealTypes.SPT, getSelectedDealType(getState()))
          ? dispatch(getDatesSuccess(response))
          : dispatch(getDatesCancelled())
      ))
      .catch((error) => dispatch(getDatesFailed(error)));
  });
}

export function resetDates() {
  return (dispatch) => dispatch(resetDatesAction());
}
