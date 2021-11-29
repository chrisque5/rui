const axios = require('axios');
const Log = require('../core/utility/Logs.js');

class ApiClient {
  constructor() {
    this.log = new Log();
  }

  async request(url, method, data) {
    const result = await axios({
      method: method || 'POST',
      url,
      data,
      withCredentials: true,
    }).then((response) => this.handleResponse(response))
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          this.handleServerError(error);
        } else if (error.request) {
          // The request was made but no response was received
          this.showErrorNotification('Network Error', `No response was received from the server at ${url}`);
        } else {
          // Something happened setting up the request that triggered an Error
          this.showErrorNotification('Application Error', `Could not make request to server at ${url}`);
        }
        throw error;
      });

    return result;
  }

  async requestWithHeader(url, method, data, header) {
    const result = await axios({
      method: method || 'POST',
      url,
      data,
      headers: header,
      withCredentials: true,
    }).then((response) => response)
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          this.handleServerError(error);
        } else if (error.request) {
          // The request was made but no response was received
          this.showErrorNotification('Network Error', `No response was received from the server at ${url}`);
        } else {
          // Something happened setting up the request that triggered an Error
          this.showErrorNotification('Application Error', `Could not make request to server at ${url}`);
        }
        throw error;
      });

    return result;
  }

  async requestWithoutBody(url, method, header) {
    const result = await axios({
      method: method || 'POST',
      url,
      headers: header,
      withCredentials: true,
    }).then((response) => response)
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code outside the 2xx range
          this.handleServerError(error);
        } else if (error.request) {
          // The request was made but no response was received
          this.showErrorNotification('Network Error', `No response was received from the server at ${url}`);
        } else {
          // Something happened setting up the request that triggered an Error
          this.showErrorNotification('Application Error', `Could not make request to server at ${url}`);
        }
        throw error;
      });

    return result;
  }

  handleResponse(response) {
    this.log.log('Handeling the response.');
    if (response.headers['content-type'].includes('application/json')) {
      return response;
    }
    throw response;
  }

  handleServerError(error) {
    switch (error.response.status) {
      case 401:
        this.showErrorNotification(
          error.response.statusText,
          `${error.response.data.message}`,
        );
        break;
      case 404:
        this.showErrorNotification(
          error.response.statusText,
          `${error.request.responseURL} not found.`,
        );
        break;
      case 422:
        if (Array.isArray(error.response.data)) {
          error.response.data.forEach((err) => {
            this.showErrorNotification('Validation Error', err.message);
          });
        }
        break;
      default:
        this.showErrorNotification(`${error.response.status} Error`, `A ${error.response.status} error occurred.`);
        break;
    }
  }

  showErrorNotification(message, description) {
    this.log.log(message + description);
  }
}

module.exports = ApiClient;
