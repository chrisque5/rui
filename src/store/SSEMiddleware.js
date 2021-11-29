import restApi from '../api/restApi';
import {
  actionTypes, api, sseStatuses, SSE_RE_CONNECT_DELAY, SSE_MAX_RE_CONNECT_TRIES,
} from '../utils/constants';
import {
  sseConnected, sseConnecting, sseDisconnected, sseDisconnecting, sseConnectionFailed, sseConnect,
} from '../actions/sseActions';

const {
  SSE_CONNECT, SSE_DISCONNECT, SSE_CONNECTED, SSE_FAILED,
} = actionTypes;
const {
  CONNECTED,
} = sseStatuses;
/**
 * SSE middleware
 * When invoked as an enhancer all store actions will pass through this
 * If a SSE action is found it will be processes
 *   If SSE_CONNECT set up a conncection and bind events
 *   If SSE_DISCONNECT dispose of the connection
 * If no matchhing action is found it will pass through
 */
export default function SSEMiddleware() {
  let socket = null;
  let noOfReConnectTries = 0;
  /**
   * Returns uniqId to be used as sessionid for SSE connection
   */
  const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4() + s4()}-${s4()}`;
  };

  /**
   * Close a connection and reset to null
   */
  const closeAndResetSocket = () => {
    if (socket !== null) {
      socket.close();
      socket = null;
    }
  };

  /**
   * Echo response to server to keep session alive
   * @param data
   */
  const echoResponse = (data) => {
    restApi.request(`${api.SSE_ECHO_RESPONSE}${data}`, 'PUT', null, false, null);
  };

  /**
   * On error display a notification
   */
  const onError = (store) => () => {
    // Do not remove
    // const { sse: { isReconnecting } } = store.getState();
    // if (!isReconnecting) {
    //   showWarningNotification('SSE Disconnected', 'SSE connection closed. Please wait while we connect');
    // }
    closeAndResetSocket();
    store.dispatch(sseConnectionFailed());
  };

  /**
   * On receipt of a SSE message process it
   * If there is a type then fire a SSE action with the payload
   *   Action is namespaced with SSE: to prevent collisions
   *   i.e. for incoming ntype = THE_INCOMING_TYPE
   *      Reducer will listen for action of the folllowing type
   *        'SSE:THE_INCOMING_TYPE'
   *
   * @param {Object} store the redux store
   * @param {Object} event the SSE event
   */
  const onMessage = (store) => (event) => {
    const parsedData = JSON.parse(event.data);
    const { blotter: { searchParams }, sse: { status } } = store.getState();

    const sessionId = socket.uniqId;

    // Expecting this will gets executed after sse connection open and on first ping
    if (status !== '' && status !== CONNECTED) {
      store.dispatch(sseConnected(sessionId));
    }

    const { type: actionType = '', payload } = parsedData;
    // if there is an actionType then fire of an action and add in the payload
    if (actionType === '') {
      echoResponse(sessionId);
    } else {
      store.dispatch({ type: `SSE:${actionType}`, payload: { ...payload, timestamp: new Date().toISOString(), searchParams } });
    }
  };

  /**
   * Open a socket and bind the SSE events
   */
  const initializeSocket = (store) => {
    closeAndResetSocket();
    const uniqueId = getUniqueID();

    socket = new EventSource(`${api.BLOTTER_SSE_URL}?id=${uniqueId}`, { withCredentials: true });
    socket.uniqId = uniqueId;
    socket.onmessage = onMessage(store);
    socket.onerror = onError(store);
  };

  // redux middleware, listen for SSE actions and process if found
  return (store) => (next) => (action) => {
    switch (action.type) {
      case SSE_CONNECT: {
        store.dispatch(sseConnecting(action.isReconnecting));
        initializeSocket(store);
        break;
      }
      case SSE_CONNECTED: {
        noOfReConnectTries = 0;
        break;
      }
      case SSE_DISCONNECT: {
        store.dispatch(sseDisconnecting());
        closeAndResetSocket();
        store.dispatch(sseDisconnected());
        break;
      }
      case SSE_FAILED: {
        const location = window.location.href;
        if (location.indexOf('blotter') !== -1) {
          setTimeout(() => {
            const { sse: { status } } = store.getState();
            if (noOfReConnectTries !== SSE_MAX_RE_CONNECT_TRIES && status !== CONNECTED) {
              noOfReConnectTries += 1;
              store.dispatch(sseConnect(true));
            }
          }, SSE_RE_CONNECT_DELAY);
        }
        break;
      }
      default:
        break;
    }

    return next(action);
  };
}
