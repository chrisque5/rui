import * as notifications from '../../utils/notifications';
import rateApi from '../rateApi';
import restApi from '../restApi';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

const mockReturn = { data: [{ id: 1, name: 'Mock Data 1' }, { id: 2, name: 'Mock Data 2' }] };
const date = '2040-01-01';
const request = {
  AdjustedEndDate: date,
  AdjustedEndDate2: date,
  ContraCurrency: 'USD',
  DealType: 'NDF',
  NotionalAmountCurrency: 'GBP',
  StartDate: date,
  Strategy: 'spread',
  Tenor: '1M',
  Tenor2: '1D',
};

describe('rateApi.getRate request', () => {
  test('returns correct response when all parameters passed in, StartDate is not null, the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const { AdjustedEndDate2, Tenor2, ...rest } = request;
    const response = await rateApi.getRate('GBP', 'USD', '1M', date, 'NDF', date);

    expect(response.length).toBe(2);
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(api.GET_PRICING, 'POST', { ...rest, Strategy: 'outright' });
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  test('returns correct response when all parameters passed in, StartDate is null, the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const { AdjustedEndDate2, Tenor2, ...rest } = request;
    const response = await rateApi.getRate('GBP', 'USD', '1M', date, 'NDF', null);

    expect(response.length).toBe(2);
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(api.GET_PRICING, 'POST', { ...rest, StartDate: null, Strategy: 'outright' });
  });

  test('throws error when request rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(new Error('error'));

    try {
      await rateApi.getRate('GBP', 'USD', '1M', date, 'NDF', null);
    } catch (error) {
      const { AdjustedEndDate2, Tenor2, ...rest } = request;
      expect(restApi.request).toBeCalledWith(api.GET_PRICING, 'POST', { ...rest, StartDate: null, Strategy: 'outright' });
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('rateApi.getSpreadRate request', () => {
  test('returns correct response when all parameters passed in, StartDate is not null, the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await rateApi.getSpreadRate('GBP', 'USD', '1M', '1D', date, date, 'NDF', date);

    expect(response.length).toBe(2);
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(api.GET_PRICING, 'POST', request);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  test('returns correct response when all parameters passed in, StartDate is null, the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await rateApi.getSpreadRate('GBP', 'USD', '1M', '1D', date, date, 'NDF', null);

    expect(response.length).toBe(2);
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(api.GET_PRICING, 'POST', { ...request, StartDate: null });
    expect(notificationSpy).not.toHaveBeenCalled();
  });
});
