import { actionTypes } from '../utils/constants';
import initialState from './initialState';
import { transformBlotterChains } from '../utils/transformers/index';

export default function blotterReducer(state = initialState.blotter, action) {
  const {
    LOAD_BLOTTER_DEALS_IN_PROGRESS,
    LOAD_BLOTTER_DEALS_CANCELLED,
    LOAD_BLOTTER_DEALS_FAILED,
    LOAD_BLOTTER_DEALS_SUCCESS,
    REMOVE_BLOTTER_NEW_DEAL_IDS,
    SSE_BLOTTER_UPDATE,
    LOAD_BLOTTER_RTU_COUNT_SUCCESS,
    LOAD_BLOTTER_RTU_COUNT_FAILED,
    RESET_BLOTTER_RTU_COUNT_SUCCESS,
  } = actionTypes;

  const { payload = {}, type } = action;

  switch (type) {
    case LOAD_BLOTTER_DEALS_IN_PROGRESS:
      return { ...state, isDataLoading: true };
    case LOAD_BLOTTER_DEALS_SUCCESS: {
      const { data = [], lastUpdated = null, searchParams } = payload;

      return {
        ...state,
        lastUpdated,
        insertedDealIds: [],
        isDataLoading: false,
        searchParams,
        data: [...transformBlotterChains(data, searchParams)],
      };
    }
    case LOAD_BLOTTER_DEALS_CANCELLED:
    case LOAD_BLOTTER_DEALS_FAILED:
      return { ...state, isDataLoading: false };
    case SSE_BLOTTER_UPDATE: {
      const { data = [], insertedDealIds = [], searchParams } = state;
      const { executionChains = [], timestamp } = payload;

      if (!executionChains.length) {
        return { ...state };
      }

      let newData = [...data];
      const newinsertedDealIds = [...insertedDealIds];
      const [incomingDeal] = transformBlotterChains(executionChains, searchParams);
      if (incomingDeal) {
        const { dmsDealReference } = incomingDeal;
        // Going to flash the row for every RTU
        newinsertedDealIds.push(dmsDealReference);
        newData = [...data.filter((deal) => deal.dmsDealReference !== incomingDeal.dmsDealReference), { ...incomingDeal }];
      }
      return {
        insertedDealIds: [...newinsertedDealIds],
        isDataLoading: false,
        lastUpdated: timestamp,
        data: [...newData.sort((a, b) => b.tradeDateTimeMilli - a.tradeDateTimeMilli)],
        searchParams,
      };
    }
    case REMOVE_BLOTTER_NEW_DEAL_IDS: {
      const { insertedDealIds = [] } = state;
      const { dealIds = [] } = payload;

      return { ...state, insertedDealIds: [...insertedDealIds.filter((dmsDealReference) => !dealIds.includes(dmsDealReference))] };
    }
    case LOAD_BLOTTER_RTU_COUNT_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }
    case RESET_BLOTTER_RTU_COUNT_SUCCESS:
      return { ...state, rtuBlotterCount: '' };
    case LOAD_BLOTTER_RTU_COUNT_FAILED:
      return { ...state, rtuBlotterCount: 'NA' };
    default:
      return state;
  }
}
