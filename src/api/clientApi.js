import RestApi from './restApi';
import { api } from '../utils/constants';
import * as notifications from '../utils/notifications';
import { doesArrayExistWithValue } from '../utils/helper';

class ClientApi {
  static getClientData(dealType) {
    return RestApi.request(`${api.GET_CLIENTS}?dealtype=${dealType}`, 'GET', null, true)
      .then((response) => {
        if (response && doesArrayExistWithValue(response.data)) {
          return response.data;
        }
        notifications.showErrorNotification('Client Error', 'No Client/Trader received from server.');
        return [];
      });
  }
}

export default ClientApi;
