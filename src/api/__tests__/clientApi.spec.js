import clientApi from '../clientApi';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('clientApi.getClientData request', () => {
  ['NDF', 'FWD'].forEach(((type) => {
    test(`shows an error notification when deal type is ${type}, the request is resolved and no data exists, `, async () => {
      const errorDescription = 'Client Error';
      const errorMessage = 'No Client/Trader received from server.';

      restApi.request = jest.fn().mockResolvedValue({ data: [] });

      const response = await clientApi.getClientData(type);
      expect(response.length).toBe(0);
      expect(restApi.request).toBeCalledWith(`${api.GET_CLIENTS}?dealtype=${type}`, 'GET', null, true);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toBeCalledWith(errorDescription, errorMessage);
    });

    test(`returns correct response when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockReturn = { data: [{ id: 1, name: 'Mock Client 1' }, { id: 2, name: 'Mock Client 2' }] };

      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await clientApi.getClientData(type);
      expect(response.length).toBe(2);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.GET_CLIENTS}?dealtype=${type}`, 'GET', null, true);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });

    test(`throws an error when deal type is ${type} and the request is rejected`, async () => {
      restApi.request = jest.fn().mockRejectedValue(new Error('error'));

      try {
        await clientApi.getClientData(type);
      } catch (error) {
        expect(restApi.request).toBeCalledWith(`${api.GET_CLIENTS}?dealtype=${type}`, 'GET', null, true);
        expect(restApi.request).toHaveBeenCalledTimes(1);
      }
    });
  }));
});
