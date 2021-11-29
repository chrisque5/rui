import { actionTypes, navMenuItems } from '../utils/constants';
import dealApi from '../api/dealApi';
import { getCurrentPage, getSSESessionId } from '../utils/selectors';
import { changeDealEditStatus } from './uiActions';

export function createDealSuccess(deal) {
  return { type: actionTypes.CREATE_DEAL_SUCCESS, deal };
}

export function createDealFailed(error) {
  return { type: actionTypes.CREATE_DEAL_FAILED, error };
}

export function createDeal(formValues) {
  return ((dispatch) => dealApi.createDeal(formValues)
    .then((response) => {
      dispatch(createDealSuccess(response));
    })
    .catch((error) => {
      dispatch(createDealFailed(error));
    })
  );
}

export function updateOriginalDeal(originalDeal) {
  return { type: actionTypes.UPDATE_ORIGINAL_DEAL, payload: { originalDeal } };
}

export function loadDealSuccess(deal) {
  return { type: actionTypes.LOAD_DEAL_SUCCESS, payload: { deal } };
}

export function loadDealFailed(error) {
  return { type: actionTypes.LOAD_DEAL_FAILED, error };
}

export function loadDeal(dealId) {
  return async (dispatch) => {
    try {
      const response = await dealApi.getDeal(dealId);
      return dispatch(loadDealSuccess(response));
    } catch (error) {
      return dispatch(loadDealFailed(error));
    }
  };
}

export const loadBlotterDealsInProgress = () => ({ type: actionTypes.LOAD_BLOTTER_DEALS_IN_PROGRESS });
export const loadBlotterDealsCancelled = () => ({ type: actionTypes.LOAD_BLOTTER_DEALS_CANCELLED });
export const loadBlotterDealsSuccess = (payload) => ({ type: actionTypes.LOAD_BLOTTER_DEALS_SUCCESS, payload });
export const loadBlotterDealsFailed = (payload) => ({ type: actionTypes.LOAD_BLOTTER_DEALS_FAILED, payload });

export function loadBlotterDeals(searchParams) {
  return async (dispatch, getState) => {
    try {
      dispatch(loadBlotterDealsInProgress());

      const response = await dealApi.getBlotterDeals(searchParams);

      const actionPayload = {
        data: [...response],
        searchParams,
        lastUpdated: new Date().toISOString(),
      };

      const { sessionId = null } = searchParams;

      if (getCurrentPage(getState()) !== navMenuItems.BLOTTER.key || getSSESessionId(getState()) !== sessionId) {
        return dispatch(loadBlotterDealsCancelled());
      }

      return dispatch(loadBlotterDealsSuccess(actionPayload));
    } catch (error) {
      return dispatch(loadBlotterDealsFailed(error));
    }
  };
}

/**
 * Remove a specific dealId from the array
 */
export const removeBlotterNewDealIds = (ids = []) => ({ type: actionTypes.REMOVE_BLOTTER_NEW_DEAL_IDS, payload: { dealIds: [...ids] } });

export const approveDealStageBlotterSuccess = () => ({ type: actionTypes.APPROVE_DEAL_STAGE_SUCCESS });
export const approveDealStageBlotterFailed = (payload) => ({ type: actionTypes.APPROVE_DEAL_STAGE_FAILED, payload });

export function approveStageBlotter(payload) {
  return async (dispatch) => {
    try {
      await dealApi.approveDealStage({ ...payload });
      return dispatch(approveDealStageBlotterSuccess());
    } catch (error) {
      return dispatch(approveDealStageBlotterFailed(error));
    }
  };
}

export const enableInvestigationChkFlagSuccess = () => ({ type: actionTypes.ENABLE_INVESTIGATION_FLAG_SUCCESS });
export const enableInvestigationChkFlagFailed = (payload) => ({ type: actionTypes.ENABLE_INVESTIGATION_FLAG_FAILURE, payload });

export function enableInvestigationChkFlag(payload) {
  return async (dispatch) => {
    try {
      await dealApi.enableInvestigationChkFlag({ ...payload });
      return dispatch(enableInvestigationChkFlagSuccess());
    } catch (error) {
      return dispatch(enableInvestigationChkFlagFailed(error));
    }
  };
}

export function editDealSuccess(deal) {
  return { type: actionTypes.EDIT_DEAL_SUCCESS, payload: { deal } };
}

export function editDealFailed(error) {
  return { type: actionTypes.EDIT_DEAL_FAILED, payload: { error } };
}

export function editDeal(dealId, patch) {
  return async (dispatch) => {
    try {
      const response = await dealApi.editDeal(dealId, patch);
      await dispatch(changeDealEditStatus(false));
      return dispatch(editDealSuccess(response));
    } catch (error) {
      return dispatch(editDealFailed(error));
    }
  };
}
