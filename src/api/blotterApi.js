import RestApi from './restApi';
import { api } from '../utils/constants';
import { showErrorNotification } from '../utils/notifications';

export default class BlotterApi {
  static async getRtuBlotterCount() {
    const response = await RestApi.request(api.GET_BLOTTER_RTU_COUNT, 'GET', null, false);
    if (response) {
      const { numberOfBlotters } = response.data;
      if (numberOfBlotters === 0) {
        return 'ZERO';
      }
      return numberOfBlotters;
    }
    showErrorNotification('Rtu Blotter Count Error', 'No data received from server.');
    return 'ZERO';
  }

  static async terminateSSESession(sessionId) {
    const response = await RestApi.request(`${api.TERMINATE_SSE_SESSION}${sessionId}`, 'DELETE');
    if (response) {
      return response.data;
    }
    showErrorNotification('SSE terminate Session Error', 'No data received from server.');
    return 'Failed';
  }
}
