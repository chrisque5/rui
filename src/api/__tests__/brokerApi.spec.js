import brokerApi from '../brokerApi';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('brokerApi.getBrokers request', () => {
  const deskId = 8160;
  const gcdFlag = true;
  ['NDF', 'FWD'].forEach(((type) => {
    test(`shows an error notification when deal type is ${type}, the request is resolved and no data exists, `, async () => {
      const errorDescription = 'Broker Error';
      const errorMessage = 'No Desk/Broker received from server.';

      restApi.request = jest.fn().mockResolvedValue({ data: [] });

      const response = await brokerApi.getBrokers(type);
      expect(response.length).toBe(0);
      expect(restApi.request).toBeCalledWith(`${api.GET_BROKERS}?dealtype=${type}`, 'GET', null, false);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toBeCalledWith(errorDescription, errorMessage);
    });

    test(`returns correct response when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockReturn = { data: [{ id: 1, name: 'Mock Broker 1' }, { id: 2, name: 'Mock Broker 2' }] };
      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await brokerApi.getBrokers(type, deskId, gcdFlag);
      expect(response.length).toBe(2);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.GET_BROKERS}?dealtype=${type}&deskid=${deskId}&all=${gcdFlag}`, 'GET', null, false);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });

    test(`throws an error when deal type is ${type} and the request is rejected`, async () => {
      restApi.request = jest.fn().mockRejectedValue(new Error('error'));

      try {
        await brokerApi.getBrokers(type);
      } catch (error) {
        expect(restApi.request).toBeCalledWith(`${api.GET_BROKERS}?dealtype=${type}`, 'GET', null, false);
        expect(restApi.request).toHaveBeenCalledTimes(1);
      }
    });

    test(`returns correct response when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockReturn = true;
      const brokers = [];
      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await brokerApi.updateBrokers({ desk: deskId, dealType: type, brokers });
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.UPDATE_BROKERS}?dealtype=${type}&deskId=${deskId}`, 'POST', brokers, false);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });

    test(`returns correct response for getDealBrokers when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockReturn = { data: [{ id: 1, name: 'Mock Broker 1' }, { id: 2, name: 'Mock Broker 2' }] };
      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await brokerApi.getDealBrokers(type);
      expect(response.length).toBe(2);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.GET_DEAL_BROKERS}?dealtype=${type}`, 'GET', null, true);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });

    test(`throws an error for getDealBrokers when deal type is ${type} and the request is rejected`, async () => {
      restApi.request = jest.fn().mockRejectedValue(new Error('error'));

      try {
        await brokerApi.getDealBrokers(type);
      } catch (error) {
        expect(restApi.request).toBeCalledWith(`${api.GET_DEAL_BROKERS}?dealtype=${type}`, 'GET', null, true);
        expect(restApi.request).toHaveBeenCalledTimes(1);
      }
    });

    test(`throws an error for getDealBrokers when deal type is ${type} and no data received from server`, async () => {
      const mockReturn = { data: [] };
      restApi.request = jest.fn().mockResolvedValue(mockReturn);
      const response = await brokerApi.getDealBrokers(type);
      expect(response.length).toBe(0);
      expect(restApi.request).toBeCalledWith(`${api.GET_DEAL_BROKERS}?dealtype=${type}`, 'GET', null, true);
      expect(notificationSpy).toHaveBeenCalled();
    });

    test('returns correct response for getDealBrokers when deal type is FWD Outright(OUT), the request is resolved and data exists', async () => {
      const mockReturn = { data: [{ id: 1, name: 'Mock Broker 1' }, { id: 2, name: 'Mock Broker 2' }] };
      restApi.request = jest.fn().mockResolvedValue(mockReturn);
      const response = await brokerApi.getDealBrokers('OUT');
      expect(response.length).toBe(2);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.GET_DEAL_BROKERS}?dealtype=FWD`, 'GET', null, true);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });
  }));
});
