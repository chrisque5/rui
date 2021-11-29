import axios from 'axios';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

jest.mock('axios');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('Successful request() call', () => {
  const mockedAxiosResponse = { data: ['cheese'], headers: { 'content-type': 'application/json' } };
  const mockedAxios = axios.mockResolvedValue(mockedAxiosResponse);
  const url = 'testUrl';
  const method = 'GET';
  const data = 'data';
  const params = 'params';

  test('calls Axios with no cache adapter and with other parameters that passed in', async () => {
    await restApi.request(url, method, data, false, params);
    expect(axios).toBeCalledWith({
      withCredentials: true,
      adapter: null,
      cancelToken: null,
      data,
      method,
      url,
      params,
    });
    mockedAxios.mockClear();
  });

  test('calls Axios with default POST method', async () => {
    await restApi.request(url, null, data, false, params);
    expect(axios).toBeCalledWith({
      withCredentials: true, adapter: null, data, method: 'POST', url, params, cancelToken: null,
    });
    mockedAxios.mockClear();
  });

  test('calls handleResponse() with response parameter', async () => {
    jest.spyOn(
      restApi,
      'handleResponse',
    ).mockImplementationOnce(() => ({ data: 'mockResponseData' }));

    await restApi.request(url, method, data, false);
    expect(restApi.handleResponse).toBeCalledWith(mockedAxiosResponse);
    mockedAxios.mockClear();
  });
});

describe('Failed request() call', () => {
  test('shows error notification on status code 200', async () => {
    const mockedAxiosError = { status: 200, headers: { 'content-type': 'application/json' } };
    const mockedAxios = axios.mockRejectedValue(mockedAxiosError);

    await expect(restApi.request('testUrl', 'GET', 'data', false)).rejects.toEqual(mockedAxiosError);
    expect(notificationSpy).toBeCalledWith('Session Terminated', 'Please log back into the system.');

    mockedAxios.mockClear();
  });

  test('shows error notification when response object received', async () => {
    const mockedAxiosError = { response: 'exampleRequest', headers: { 'content-type': 'application/json' } };
    const mockedAxios = axios.mockRejectedValue(mockedAxiosError);
    const url = 'testUrl';
    jest.spyOn(
      restApi,
      'handleServerError',
    ).mockImplementationOnce(() => ({}));

    await expect(restApi.request(url, 'GET', 'data', false)).rejects.toEqual(mockedAxiosError);
    expect(restApi.handleServerError).toBeCalledWith(mockedAxiosError);

    mockedAxios.mockClear();
  });

  test('shows error notification when request object received', async () => {
    const mockedAxiosError = { request: 'exampleRequest', headers: { 'content-type': 'application/json' } };
    const mockedAxios = axios.mockRejectedValue(mockedAxiosError);
    const url = 'testUrl';

    await expect(restApi.request(url, 'GET', 'data', false)).rejects.toEqual(mockedAxiosError);
    expect(notificationSpy).toBeCalledWith('Network Error', `No response was received from the server at ${url}`);

    mockedAxios.mockClear();
  });

  test('shows error notification when unknown error received', async () => {
    const mockedAxiosError = { unknown: 'test', headers: { 'content-type': 'application/json' } };
    const mockedAxios = axios.mockRejectedValue(mockedAxiosError);
    const url = 'testUrl';

    await expect(restApi.request(url, 'GET', 'data', false)).rejects.toEqual(mockedAxiosError);
    expect(notificationSpy).toBeCalledWith('Application Error', `Could not make request to server at ${url}`);

    mockedAxios.mockClear();
  });
});

describe('handleResponse()', () => {
  test('returns response for application/json content-type.', () => {
    const exampleResponse = { headers: { 'content-type': 'application/json' } };
    const result = restApi.handleResponse(exampleResponse);
    expect(result).toEqual(exampleResponse);
  });

  test('throws exception for NON-application/json content-type.', () => {
    const exampleResponse = { headers: { 'content-type': 'text/html' } };
    expect(() => {
      restApi.handleResponse(exampleResponse).toThrow(exampleResponse);
    });
  });
});

describe('handleServerError()', () => {
  test('shows error notification for 401 error status.', () => {
    const errorDescription = 'testStatusText';
    const errorMessage = 'testErrorMessage';

    const exampleError = { response: { status: 401, statusText: errorDescription, data: { message: errorMessage } } };
    restApi.handleServerError(exampleError);

    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith(errorDescription, errorMessage);
  });

  test('shows error notification for 404 error status.', () => {
    const errorDescription = 'testStatusText';
    const exampleResponseURL = 'testErrorMessage';

    const exampleError = {
      response: { status: 404, statusText: errorDescription },
      request: { responseURL: exampleResponseURL },
    };
    restApi.handleServerError(exampleError);

    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith(errorDescription, `${exampleResponseURL} not found.`);
  });

  test('shows error Notification for 422 when response is an array', () => {
    const validationError1 = 'message1';
    const validationError2 = 'message2';

    const exampleError = { response: { status: 422, data: [{ message: validationError1 }, { message: validationError2 }] } };

    restApi.handleServerError(exampleError);
    expect(notificationSpy).toHaveBeenCalledTimes(2);
    expect(notificationSpy).toBeCalledWith('Validation Error', validationError1);
    expect(notificationSpy).toBeCalledWith('Validation Error', validationError2);
  });

  test('shows error Notification for 422 when response is one message', () => {
    const validationError = 'message1';

    const exampleError = { response: { status: 422, data: { message: validationError } } };

    restApi.handleServerError(exampleError);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith('Validation Error', validationError);
  });

  test('does not show error Notification for 422 when response unknown', () => {
    const exampleError = { response: { status: 422, data: { testProperty: 'testValue' } } };

    restApi.handleServerError(exampleError);
    expect(notificationSpy).toHaveBeenCalledTimes(0);
  });

  test('shows error Notification for default case', () => {
    const exampleResponseURL = 'testErrorMessage';
    const unknownStatusCode = 123;

    const exampleError = {
      response: { status: unknownStatusCode },
      request: { responseURL: exampleResponseURL },
    };

    restApi.handleServerError(exampleError);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith(`${unknownStatusCode} Error`, `A ${unknownStatusCode} error occurred at ${exampleResponseURL}`);
  });
  /* eslint-disable-next-line max-len */
  const errormsg50X = 'The DMS Server has experienced a problem. Please refresh the DMS Web screen. If problems persist, please contact DMS L2 Support quoting E';
  test('shows error notification for 502 error status.', () => {
    const errorDescription = 'Server Error';
    const errorCode = 502;
    const exampleResponseMessage = `${errormsg50X}${errorCode}.`;

    const exampleError = {
      response: { status: errorCode, statusText: errorDescription },
      request: { responseURL: exampleResponseMessage },
    };
    restApi.handleServerError(exampleError);

    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith(errorDescription, exampleResponseMessage);
  });

  test('shows error notification for 503 error status.', () => {
    const errorDescription = 'Server Error';
    const errorCode = 503;
    const exampleResponseMessage = `${errormsg50X}${errorCode}.`;

    const exampleError = {
      response: { status: errorCode, statusText: errorDescription },
      request: { responseURL: exampleResponseMessage },
    };
    restApi.handleServerError(exampleError);

    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith(errorDescription, exampleResponseMessage);
  });

  test('shows error notification for 504 error status.', () => {
    const errorDescription = 'Server Error';
    const errorCode = 504;
    const exampleResponseMessage = `${errormsg50X}${errorCode}.`;

    const exampleError = {
      response: { status: errorCode, statusText: errorDescription },
      request: { responseURL: exampleResponseMessage },
    };
    restApi.handleServerError(exampleError);

    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toBeCalledWith(errorDescription, exampleResponseMessage);
  });
});
