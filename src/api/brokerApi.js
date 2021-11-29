import RestApi from './restApi';
import { api } from '../utils/constants';
import * as notifications from '../utils/notifications';
import { doesArrayExistWithValue } from '../utils/helper';

class BrokerApi {
  static getBrokers(dealType, deskId, gcdFlag) {
    let url = `${api.GET_BROKERS}?dealtype=${dealType}`;
    if (deskId) {
      url += `&deskid=${deskId}`;
    }
    if (gcdFlag) {
      url += `&all=${gcdFlag}`;
    }
    return RestApi.request(url, 'GET', null, false)
      .then((response) => {
        if (response && doesArrayExistWithValue(response.data)) {
          return response.data;
        }
        // Suppressing empty data notification if the call from admin
        if (!deskId) {
          notifications.showErrorNotification('Broker Error', 'No Desk/Broker received from server.');
        }

        return [];
      });
  }

  static async getDealBrokers(dealType) {
    let serverDealType = dealType;
    if (dealType === 'OUT') {
      serverDealType = 'FWD';
    }

    const { data } = await RestApi.request(`${api.GET_DEAL_BROKERS}?dealtype=${serverDealType}`, 'GET', null, true);
    if (doesArrayExistWithValue(data)) {
      return data;
    }
    notifications.showErrorNotification('Broker Error', 'No Desk/Broker received from server.');
    return [];
  }

  static updateBrokers({ desk, dealType, brokers }) {
    const url = `${api.UPDATE_BROKERS}?dealtype=${dealType}&deskId=${desk}`;
    return RestApi.request(url, 'POST', brokers, false)
      .then((response) => response.data);
  }
}

export default BrokerApi;
