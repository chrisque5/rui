import { actionTypes } from '../utils/constants';
import { isDealTypeSame } from '../utils/helper';
import { getSelectedDealType } from '../utils/selectors';
import agentApi from '../api/agentApi';

export const loadAgentsSuccess = (agents) => ({ type: actionTypes.LOAD_AGENTDATA_SUCCESS, agents });
export const loadAgentsFailed = (agents) => ({ type: actionTypes.LOAD_AGENTDATA_FAILED, agents });
export const loadAgentsCancelled = () => ({ type: actionTypes.LOAD_AGENTDATA_CANCELLED });
export const resetAgentDataAction = () => ({ type: actionTypes.RESET_AGENTDATA });

export const loadAgents = (dealType) => (dispatch, getState) => (
  agentApi.getAgents(dealType)
    .then((response) => (
      isDealTypeSame(dealType, getSelectedDealType(getState()))
        ? dispatch(loadAgentsSuccess(response))
        : dispatch(loadAgentsCancelled())
    ))
    .catch((error) => dispatch(loadAgentsFailed(error)))
);

export const resetAgentData = () => (dispatch) => dispatch(resetAgentDataAction());
