import executionVenueApi from '../executionVenueApi';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('executionVenueApi.getExecutionVenues request', () => {
  ['NDF', 'FWD'].forEach(((type) => {
    test(`shows an error notification when deal type is ${type}, the request is resolved and no data exists, `, async () => {
      const errorDescription = 'Execution Venue Error';
      const errorMessage = 'No Execution Venues received from server.';

      restApi.request = jest.fn().mockResolvedValue({ data: [] });

      const response = await executionVenueApi.getExecutionVenues(type);
      expect(response.length).toBe(0);
      expect(restApi.request).toBeCalledWith(`${api.GET_EXECUTION_VENUES}?dealtype=${type}`, 'GET', null);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toHaveBeenCalledTimes(1);
      expect(notificationSpy).toBeCalledWith(errorDescription, errorMessage);
    });

    test(`returns correct response when deal type is ${type}, the request is resolved and data exists`, async () => {
      const mockReturn = {
        data: [
          {
            baseExecutionVenue: 'USD',
            baseExecutionVenueDayCountYear: '360',
            counterExecutionVenue: 'BRL',
            counterExecutionVenueDayCountYear: '360',
            instrumentId: 4303,
            scalingFactor: 0.0001,
          },
          {
            baseExecutionVenue: 'USD',
            baseExecutionVenueDayCountYear: '360',
            counterExecutionVenue: 'CAD',
            counterExecutionVenueDayCountYear: '360',
            instrumentId: 4309,
            scalingFactor: 0.0001,
          },
        ],
      };

      restApi.request = jest.fn().mockResolvedValue(mockReturn);

      const response = await executionVenueApi.getExecutionVenues(type);
      expect(response.length).toBe(2);
      expect(response).toEqual(mockReturn.data);
      expect(restApi.request).toBeCalledWith(`${api.GET_EXECUTION_VENUES}?dealtype=${type}`, 'GET', null);
      expect(restApi.request).toHaveBeenCalledTimes(1);
      expect(notificationSpy).not.toHaveBeenCalled();
    });

    test(`throws an error when deal type is ${type} and the request is rejected`, async () => {
      restApi.request = jest.fn().mockRejectedValue(new Error('error'));

      try {
        await executionVenueApi.getExecutionVenues(type);
      } catch (error) {
        expect(restApi.request).toBeCalledWith(`${api.GET_EXECUTION_VENUES}?dealtype=${type}`, 'GET', null);
        expect(restApi.request).toHaveBeenCalledTimes(1);
      }
    });
  }));
});
