import RestApi from './restApi';
import { api } from '../utils/constants';

class SystemSettingsApi {
  static getBlotterSearchDateRangeLimit() {
    return RestApi.request(`${api.GET_BLOTTER_SEARCH_DATE_RANGE_LIMIT}`, 'GET', null, false)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        throw new Error('No settings received from server for blotter date range limit.');
      });
  }

  static getLicenseKey() {
    return RestApi.request(`${api.GET_LICENSE_KEY}`, 'GET', null, false)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        throw new Error('No settings received from server for license key.');
      });
  }
}

export default SystemSettingsApi;
