import RestApi from './restApi';
import { api } from '../utils/constants';
import * as notifications from '../utils/notifications';
import { doesArrayExistWithValue } from '../utils/helper';

class ExecutionVenueApi {
  static getExecutionVenues(dealType) {
    return RestApi.request(`${api.GET_EXECUTION_VENUES}?dealtype=${dealType}`, 'GET', null)
      .then((response) => {
        if (doesArrayExistWithValue(response.data)) {
          return response.data;
        }
        notifications.showErrorNotification('Execution Venue Error', 'No Execution Venues received from server.');
        return [];
      });
  }
}

export default ExecutionVenueApi;
