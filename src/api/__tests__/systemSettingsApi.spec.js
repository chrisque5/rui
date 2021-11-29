import systemSettingsApi from '../systemSettingsApi';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('systemSettingsApi', () => {
  test('Get Date Range Limit from server', async () => {
    const mockReturn = { data: { dateRangeLimit: '365' } };

    restApi.request = jest.fn().mockResolvedValue(mockReturn);

    const response = await systemSettingsApi.getBlotterSearchDateRangeLimit();
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_SEARCH_DATE_RANGE_LIMIT}`, 'GET', null, false);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('Get License Key from server', async () => {
    const mockReturn = { data: { licenseKey: 'key' } };

    restApi.request = jest.fn().mockResolvedValue(mockReturn);

    const response = await systemSettingsApi.getLicenseKey();
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.GET_LICENSE_KEY}`, 'GET', null, false);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });
});
