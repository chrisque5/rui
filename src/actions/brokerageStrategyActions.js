import { actionTypes } from '../utils/constants';
import brokerageStrategyApi from '../api/brokerageStrategyApi';
import { isDealTypeSame, isStrategyTypeSame } from '../utils/helper';
import { getSelectedDealType, getSelectedStrategyType } from '../utils/selectors';

export const loadBrokerageStrategiesSuccess = (brokerageStrategies) => ({ type: actionTypes.LOAD_BROKERAGE_STRATEGIES_SUCCESS, brokerageStrategies });
export const loadBrokerageStrategiesFailed = (error) => ({ type: actionTypes.LOAD_BROKERAGE_STRATEGIES_FAILED, error });
export const loadBrokerageStrategiesCancelled = () => ({ type: actionTypes.LOAD_BROKERAGE_STRATEGIES_CANCELLED });

export const loadBrokerageStrategies = (dealType, strategyType) => (dispatch, getState) => (
  brokerageStrategyApi.getBrokerageStrategyData(dealType, strategyType)
    .then((response) => ((
      isDealTypeSame(dealType, getSelectedDealType(getState()))
      && isStrategyTypeSame(strategyType, getSelectedStrategyType(getState()))
    ) ? dispatch(loadBrokerageStrategiesSuccess(response))
      : dispatch(loadBrokerageStrategiesCancelled())
    ))
    .catch((error) => dispatch(loadBrokerageStrategiesFailed(error)))
);
