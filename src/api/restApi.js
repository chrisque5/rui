import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import * as notification from '../utils/notifications';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const cancel = () => {
  source.cancel('Operation canceled');
};

const cache = setupCache({
  maxAge: 12 * 60 * 60 * 1000, // Caching for 12 hrs
  exclude: {
    query: false,
  },
});

export default class restApi {
  static request(url, method, data, enableCaching, params) {
    return axios({
      cancelToken: source ? source.token : null,
      method: method || 'POST',
      url,
      data,
      params,
      withCredentials: true,
      adapter: enableCaching ? cache.adapter : null,
    })
      .then((response) => this.handleResponse(response))
      .catch((error) => {
        if (error.status === 200) {
          // The server responded with the login page
          notification.showErrorNotification('Session Terminated', 'Please log back into the system.');
        } else if (error.response) {
          // The server responded with a status code outside the 2xx range
          this.handleServerError(error);
        } else if (error.request) {
          // The request was made but no response was received
          notification.showErrorNotification('Network Error', `No response was received from the server at ${url}`);
        } else {
          // Something happened setting up the request that triggered an Error
          notification.showErrorNotification('Application Error', `Could not make request to server at ${url}`);
        }
        throw error;
      });
  }

  static handleResponse(response) {
    if (response.headers['content-type'].includes('application/json')) {
      return response;
    }
    throw response;
  }

  static handleServerError(error) {
    switch (error.response.status) {
      case 401:
        notification.showErrorNotification(
          error.response.statusText,
          `${error.response.data.message}`,
        );
        break;
      case 404:
        notification.showErrorNotification(
          error.response.statusText,
          `${error.request.responseURL} not found.`,
        );
        break;
      case 422:
        if (Array.isArray(error.response.data)) {
          error.response.data.forEach((err) => {
            notification.showErrorNotification('Validation Error', err.message);
          });
        } else if (error.response.data.message) {
          notification.showErrorNotification('Validation Error', error.response.data.message);
        }
        break;
      case 502:
      case 503:
      case 504:
        notification.showErrorNotification(
          'Server Error',
          /* eslint-disable-next-line max-len */
          `The DMS Server has experienced a problem. Please refresh the DMS Web screen. If problems persist, please contact DMS L2 Support quoting E${error.response.status}.`,
        );
        break;
      case 500:
        if (error.response.data.Error && error.response.data.Error.includes('Deal not saved')) {
          notification.showErrorNotification('Error', `${error.response.data.Error}`);
          break;
        }
      default: // eslint-disable-line no-fallthrough
        notification.showErrorNotification(`${error.response.status} Error`,
          `A ${error.response.status} error occurred at ${error.request.responseURL}`);
        break;
    }
  }
}
