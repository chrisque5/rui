import moment from 'moment';
import RestApi from './restApi';
import { strategies, api } from '../utils/constants';

class RateApi {
  static getRate(NotionalAmountCurrency, ContraCurrency, Tenor, AdjustedEndDate, DealType, StartDate) {
    const request = {
      StartDate: StartDate ? moment(StartDate).format('YYYY-MM-DD') : null,
      Strategy: strategies.NDF.OUTRIGHT.toLowerCase(),
      NotionalAmountCurrency,
      ContraCurrency,
      Tenor,
      AdjustedEndDate: moment(AdjustedEndDate).format('YYYY-MM-DD'),
      DealType,
    };

    return RestApi.request(api.GET_PRICING, 'POST', request)
      .then((response) => (response ? response.data : {}));
  }

  static getSpreadRate(
    NotionalAmountCurrency, ContraCurrency, Tenor, Tenor2,
    AdjustedEndDate, AdjustedEndDate2, DealType, StartDate,
  ) {
    const request = {
      StartDate: StartDate ? moment(StartDate).format('YYYY-MM-DD') : null,
      Strategy: strategies.NDF.SPREAD.toLowerCase(),
      NotionalAmountCurrency,
      ContraCurrency,
      Tenor,
      Tenor2,
      AdjustedEndDate: moment(AdjustedEndDate).format('YYYY-MM-DD'),
      AdjustedEndDate2: moment(AdjustedEndDate2).format('YYYY-MM-DD'),
      DealType,
    };

    return RestApi.request(api.GET_PRICING, 'POST', request)
      .then((response) => (response ? response.data : {}));
  }
}

export default RateApi;
