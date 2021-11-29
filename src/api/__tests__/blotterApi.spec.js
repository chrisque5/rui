import * as notifications from '../../utils/notifications';
import blotterApi from '../blotterApi';
import restApi from '../restApi';
import { api } from '../../utils/constants';

const notificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  notificationSpy.mockClear();
});

describe('blotterApi.getRtuBlotterCount request', () => {
  test('returns correct response "ZERO" when request is resolved and count is zero', async () => {
    const mockReturn = { data: { numberOfBlotters: 0 } };
    restApi.request = jest.fn().mockResolvedValue(mockReturn);

    const response = await blotterApi.getRtuBlotterCount();
    expect(response).toEqual('ZERO');
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_RTU_COUNT}`, 'GET', null, false);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('returns correct response  when request is resolved and count is more', async () => {
    const mockReturn = { data: { numberOfBlotters: 4 } };
    restApi.request = jest.fn().mockResolvedValue(mockReturn);

    const response = await blotterApi.getRtuBlotterCount();
    expect(response).toEqual(4);
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_RTU_COUNT}`, 'GET', null, false);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });
  test('returns no response  when request is failed and count becomes zero', async () => {
    restApi.request = jest.fn().mockResolvedValue(null);

    const response = await blotterApi.getRtuBlotterCount();
    expect(notificationSpy).toHaveBeenCalled();
    expect(response).toEqual('ZERO');
    expect(restApi.request).toBeCalledWith(`${api.GET_BLOTTER_RTU_COUNT}`, 'GET', null, false);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });
});
