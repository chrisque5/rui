import brokerageStrategyApi from '../brokerageStrategyApi';
import restApi from '../restApi';
import * as notifications from '../../utils/notifications';
import { api } from '../../utils/constants';

const mockReturn = { data: ['Brokerage Strategy 1', 'Brokerage Strategy 2', 'Brokerage Strategy 3'] };

const showErrorNotificationSpy = jest.spyOn(notifications, 'showErrorNotification');

afterEach(() => {
  showErrorNotificationSpy.mockClear();
});

describe('brokerageStrategyApi =>', () => {
  const dummyDealType = 'dummyDealType';
  const dummyStrategyType = 'dummyStrategyType';

  test('getBrokerageStrategyData should return expected data', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockReturn);
    const response = await brokerageStrategyApi.getBrokerageStrategyData(dummyDealType, dummyStrategyType);
    expect(response).toEqual(mockReturn.data);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(
      `${api.GET_BROKERAGE_STRATEGIES}?dealType=${dummyDealType}&strategyType=${dummyStrategyType}`,
      'GET',
      null,
      true,
    );
  });

  test('getBrokerageStrategyData should faile and show error notification', async () => {
    restApi.request = jest.fn().mockResolvedValue({ data: { error: 'Dummy Error' } });

    const response = await brokerageStrategyApi.getBrokerageStrategyData(dummyDealType, dummyStrategyType);
    expect(response.length).toBe(0);
    expect(restApi.request).toHaveBeenCalledTimes(1);
    expect(restApi.request).toBeCalledWith(
      `${api.GET_BROKERAGE_STRATEGIES}?dealType=${dummyDealType}&strategyType=${dummyStrategyType}`,
      'GET',
      null,
      true,
    );

    expect(showErrorNotificationSpy).toHaveBeenCalledTimes(1);
    expect(showErrorNotificationSpy).toBeCalledWith('Brokerage Strategy Error', 'No Brokerage Strategies received from server.');
  });
});
