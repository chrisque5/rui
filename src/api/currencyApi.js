import RestApi from './restApi';
import { api } from '../utils/constants';
import { showErrorNotification } from '../utils/notifications';

function sortCurrencyPairs(currencies) {
  if (Object.keys(currencies).length === 0) {
    showErrorNotification('Currency Error', 'No currencies received from server.');
  }
  return currencies;
}

class CurrencyApi {
  static getCurrencies(dealType, enableCaching = false) {
    return RestApi.request(`${api.GET_CURRENCY_PAIR_LIST}?dealType=${dealType}`, 'GET', null, enableCaching)
      .then((response) => sortCurrencyPairs(response.data));
  }

  static async updateCLSFlags(currencies) {
    const response = await RestApi.request(api.UPDATE_CURRENCY_PAIR_CLS, 'POST', currencies);
    return response.data || [];
  }

  static async getDealCurrencies(dealType, enableCaching = true) {
    const { data } = await RestApi.request(`${api.GET_DEAL_CURRENCIES}?dealType=${dealType}`, 'GET', null, enableCaching);
    if (data.returnMessage === 'OK' && data.currencyDtos) {
      return data.currencyDtos;
    }
    showErrorNotification('Currency Error', 'No currencies received from server.');
    return [];
  }
}

export default CurrencyApi;
