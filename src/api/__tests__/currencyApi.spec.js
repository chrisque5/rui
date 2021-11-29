import currencyApi from '../currencyApi';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('currencyApi.getCurrencies request', () => {
  ['FWD'].forEach(((type) => {
    test(`shows an error notification when deal type is ${type}, the request is resolved and no data exists, `, async () => {
      const errorDescription = 'Currency Error';
      const errorMessage = 'No currencies received from server.';

      restApi.request = jest.fn().mockResolvedValue({ data: [] });

      const response = await currencyApi.getCurrencies(type);
      expect(response.length).toBe(0);
      expect(restApi.request).toBeCalledWith(`${api.GET_CURRENCY_PAIR_LIST}?dealType=${type}`, 'GET', null, false);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toBeCalledWith(errorDescription, errorMessage);
    });

    test(`returns correct response when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockReturn = {
        data: [
          {
            baseCurrency: 'EUR',
            counterCurrency: 'COP',
            instrumentId: 4314,
            baseCurrencyDayCountYear: '360',
            counterCurrencyDayCountYear: '360',
            scalingFactor: 0.01,
            isCLS: true,
          },
          {
            baseCurrency: 'USD',
            counterCurrency: 'AED',
            instrumentId: 4307,
            baseCurrencyDayCountYear: '360',
            counterCurrencyDayCountYear: '360',
            scalingFactor: 0.0001,
            isCLS: false,
          },
        ],
      };

      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await currencyApi.getCurrencies(type);
      expect(response.length).toBe(2);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.GET_CURRENCY_PAIR_LIST}?dealType=${type}`, 'GET', null, false);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });

    test(`throws an error when deal type is ${type} and the request is rejected`, async () => {
      restApi.request = jest.fn().mockRejectedValue(new Error('error'));

      try {
        await currencyApi.getCurrencies(type);
      } catch (error) {
        expect(restApi.request).toBeCalledWith(`${api.GET_CURRENCY_PAIR_LIST}?dealType=${type}`, 'GET', null, false);
        expect(restApi.request).toHaveBeenCalledTimes(1);
      }
    });

    test(`returns correct response when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockData = [{
        dealType: 'FWD', currency1: 'GBP', currency2: 'USD', cls: false,
      }];
      const mockReturn = {
        data: [{
          clsInstruction: {
            dirty: false, dealType: 'FWD', currency1: 'USD', currency2: 'SGD', cls: true,
          },
          message: 'Successful Update',
          success: true,
        }],
      };
      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await currencyApi.updateCLSFlags(mockData);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.UPDATE_CURRENCY_PAIR_CLS}`, 'POST', mockData);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });
  }));
});
