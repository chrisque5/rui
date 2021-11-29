import { actionTypes } from '../utils/constants';
import blotterApi from '../api/blotterApi';

export const loadRtuBlotterCountSuccess = (payload) => ({ type: actionTypes.LOAD_BLOTTER_RTU_COUNT_SUCCESS, payload });
export const loadRtuBlotterCountFailed = (payload) => ({ type: actionTypes.LOAD_BLOTTER_RTU_COUNT_FAILED, payload });
export const resetRtuBlotterCountSuccess = () => ({ type: actionTypes.RESET_BLOTTER_RTU_COUNT_SUCCESS });
export const loadRtuBlotterCount = () => (dispatch) => (
  blotterApi.getRtuBlotterCount()
    .then((rtuBlotterCount) => {
      dispatch(loadRtuBlotterCountSuccess({ rtuBlotterCount }));
    })
    .catch((error) => dispatch(loadRtuBlotterCountFailed(error)))
);

export const resetRtuBlotterCount = () => (dispatch) => dispatch(resetRtuBlotterCountSuccess());
