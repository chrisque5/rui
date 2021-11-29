import RestApi from './restApi';
import { api } from '../utils/constants';
import { showErrorNotification } from '../utils/notifications';
import { doesArrayExistWithValue } from '../utils/helper';

class DeskApi {
  static getDeskData(dealType) {
    return RestApi.request(`${api.GET_DESKS}?dealtype=${dealType}`, 'GET', null, true)
      .then((response) => {
        if (response && doesArrayExistWithValue(response.data)) {
          return response.data;
        }
        showErrorNotification('Desk Error', 'No Desks received from server.');
        return [];
      });
  }
}

export default DeskApi;
