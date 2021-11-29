import { actionTypes, sseStatuses } from '../utils/constants';
import initialState from './initialState';

const {
  CONNECTED, CONNECTING, DISCONNECTING, DISCONNECTED, FAILED,
} = sseStatuses;

export default function sseReducer(state = initialState.sse, action) {
  switch (action.type) {
    case actionTypes.SSE_CONNECTED:
      return {
        ...state,
        status: CONNECTED,
        sessionId: action.sessionId,
        isReconnecting: false,
      };
    case actionTypes.SSE_CONNECTING:
      return { ...state, status: CONNECTING, isReconnecting: action.isReconnecting };
    case actionTypes.SSE_DISCONNECTED:
      return {
        ...state, status: DISCONNECTED,
      };
    case actionTypes.SSE_FAILED:
      return {
        ...state, status: FAILED, isReconnecting: true,
      };
    case actionTypes.SSE_DISCONNECTING:
      return { ...state, status: DISCONNECTING, sessionId: '' };
    case actionTypes.SSE_RESET:
      return { ...state, status: '' };
    case actionTypes.TERMINATE_SSE_SESSION_SUCCESS:
    case actionTypes.TERMINATE_SSE_SESSION_FAILED:
    default:
      return state;
  }
}
