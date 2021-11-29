import RestApi from './restApi';
import { api } from '../utils/constants';
import * as notifications from '../utils/notifications';
import { doesArrayExistWithValue } from '../utils/helper';

class AgentApi {
  static getAgents(dealType) {
    return RestApi.request(`${api.GET_AGENTS}?dealtype=${dealType}`, 'GET', null, true)
      .then((response) => {
        if (doesArrayExistWithValue(response.data)) {
          return response.data;
        }
        notifications.showErrorNotification('Agent Error', 'No Agent received from server.');
        return [];
      });
  }
}

export default AgentApi;
