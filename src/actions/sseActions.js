import { actionTypes } from '../utils/constants';
import blotterApi from '../api/blotterApi';

const {
  SSE_CONNECT, SSE_CONNECTING, SSE_CONNECTED, SSE_DISCONNECT, SSE_DISCONNECTED, SSE_DISCONNECTING,
  SSE_FAILED, SSE_RESET, TERMINATE_SSE_SESSION_SUCCESS, TERMINATE_SSE_SESSION_FAILED,
} = actionTypes;

const sseConnect = (isReconnecting) => ({ type: SSE_CONNECT, isReconnecting });
const sseConnecting = (isReconnecting) => ({ type: SSE_CONNECTING, isReconnecting });
const sseConnected = (sessionId) => ({ type: SSE_CONNECTED, sessionId });
const sseDisconnect = () => ({ type: SSE_DISCONNECT });
const sseDisconnecting = () => ({ type: SSE_DISCONNECTING });
const sseDisconnected = () => ({ type: SSE_DISCONNECTED });
const sseConnectionFailed = () => ({ type: SSE_FAILED });
const sseReset = () => ({ type: SSE_RESET });
const terminateSSESessionSuccess = () => ({ type: TERMINATE_SSE_SESSION_SUCCESS });
const terminateSSESessionFailed = (error) => ({ type: TERMINATE_SSE_SESSION_FAILED, error });

const terminateSSESession = (sessionId) => ((dispatch) => blotterApi.terminateSSESession(sessionId)
  .then((response) => dispatch(terminateSSESessionSuccess(response)))
  .catch((error) => dispatch(terminateSSESessionFailed(error)))
);

export {
  sseConnect, sseConnecting, sseConnected,
  sseDisconnect, sseDisconnecting, sseDisconnected,
  sseConnectionFailed, sseReset,
  terminateSSESessionSuccess, terminateSSESessionFailed, terminateSSESession,
};
