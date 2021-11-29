import RestApi from './restApi';
import { api } from '../utils/constants';
import { showErrorNotification } from '../utils/notifications';
import { doesArrayExistWithValue } from '../utils/helper';

class BrokerageStrategyApi {
  static getBrokerageStrategyData(dealType, strategyType) {
    return RestApi.request(`${api.GET_BROKERAGE_STRATEGIES}?dealType=${dealType}&strategyType=${strategyType}`, 'GET', null, true)
      .then((response) => {
        if (response && doesArrayExistWithValue(response.data)) {
          return response.data;
        }
        showErrorNotification('Brokerage Strategy Error', 'No Brokerage Strategies received from server.');
        return [];
      });
  }
}

export default BrokerageStrategyApi;
