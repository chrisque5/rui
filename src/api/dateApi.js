import RestApi from './restApi';
import { api } from '../utils/constants';
import { getDateInLocalTZ } from '../utils/helper';
import * as transformDates from '../utils/transformers/transformDates';

class DateApi {
  static parseIMM = (value) => value.substring(3, value.length)
    .concat('I');

  static getNdfOutrightDatesByTerm(term, instrumentId, tradeDate) {
    const request = {
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
      displayTenor: term,
    };

    return RestApi.request(api.GET_NDF_OUTRIGHT_DATES_BY_TENOR, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for term.');
        }
        return transformDates.mapNdfOutrightTenorResponseToState(response.data);
      });
  }

  static getNdfOutrightDatesByValueDate(valueDate, instrumentId, tradeDate) {
    const request = {
      valueDate: valueDate.format('YYYY-MM-DD'),
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
    };

    return RestApi.request(api.GET_NDF_OUTRIGHT_DATES_BY_VALUE_DATE, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for value date.');
        }
        return transformDates.mapNdfOutrightDatesResponseToState(response.data);
      });
  }

  static getNdfSpreadDatesByTerm(nearTerm, farTerm, instrumentId, tradeDate) {
    const request = {
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
      nearDisplayTenor: nearTerm,
      farDisplayTenor: farTerm,
    };

    return RestApi.request(api.GET_NDF_SPREAD_DATES_BY_TENOR, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for term.');
        }
        return transformDates.mapNdfSpreadTenorResponseToState(response.data);
      });
  }

  static getNdfSpreadDatesByValueDate(nearValueDate, farValueDate, instrumentId, tradeDate, isTreatedAsTom) {
    const request = {
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
      nearValueDate: nearValueDate.format('YYYY-MM-DD'),
      farValueDate: farValueDate.format('YYYY-MM-DD'),
      treatedAsTom: isTreatedAsTom,
    };

    return RestApi.request(api.GET_NDF_SPREAD_DATES_BY_VALUE_DATE, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for value date.');
        }
        return transformDates.mapNdfSpreadDatesResponseToState(response.data);
      });
  }

  static getFwdDatesByTerm(nearTerm = '', farTerm = '', tradeDate, instrumentId) {
    const request = {
      nearDisplayTenor: nearTerm || '0D',
      farDisplayTenor: farTerm || '0D',
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
    };

    if (nearTerm.startsWith('IMM')) {
      request.nearDisplayTenor = this.parseIMM(nearTerm);
    }

    if (farTerm.startsWith('IMM')) {
      request.farDisplayTenor = this.parseIMM(farTerm);
    }

    return RestApi.request(api.GET_FWD_DATES_BY_TENOR, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for term.');
        }
        return transformDates.mapFwdDatesResponseToState(response.data);
      });
  }

  static getFwdTermsByValueDate(nearValueDate, farValueDate, tradeDate, instrumentId) {
    const request = {
      nearValueDate: nearValueDate.format('YYYY-MM-DD'),
      farValueDate: farValueDate.format('YYYY-MM-DD'),
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
    };

    return RestApi.request(api.GET_FWD_TERMS_BY_VALUE_DATE, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No terms received from server for date.');
        }
        return transformDates.mapFwdTenorResponseToState(response.data);
      });
  }

  static getFwdOutrightDatesByTerm(term, tradeDate, instrumentId) {
    const request = {
      displayTenor: term,
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
    };

    if (term.startsWith('IMM')) {
      request.displayTenor = this.parseIMM(term);
    }

    return RestApi.request(api.GET_FWD_OUTRIGHT_DATES_BY_TENOR, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for term.');
        }
        return transformDates.mapFwdOutrightDatesResponseToState(response.data);
      });
  }

  static getFwdOutrightTermsByValueDate(valueDate, tradeDate, instrumentId) {
    const request = {
      valueDate: valueDate.format('YYYY-MM-DD'),
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
    };

    return RestApi.request(api.GET_FWD_OUTRIGHT_TERMS_BY_VALUE_DATE, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No terms received from server for date.');
        }
        return transformDates.mapFwdOutrightTenorResponseToState(response.data);
      });
  }

  static getSptValueDate(tradeDate, instrumentId) {
    const request = {
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      fxOptionId: instrumentId,
    };

    return RestApi.request(api.GET_SPT_VALUE_DATE, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No dates received from server for trade date and currency pair.');
        }
        return transformDates.mapSptTenorResponseToState(response.data);
      });
  }

  static getSptDayCounts(tradeDate, valueDate, instrumentId) {
    const request = {
      tradeDate: tradeDate !== null ? tradeDate.format('YYYY-MM-DD') : getDateInLocalTZ(),
      valueDate: valueDate.format('YYYY-MM-DD'),
      fxOptionId: instrumentId,
    };

    return RestApi.request(api.GET_SPT_DAY_COUNTS, 'POST', request)
      .then((response) => {
        if (!response.data) {
          throw new Error('No day counts received from server for dates.');
        }
        return transformDates.mapSptDateResponseToState(response.data, valueDate);
      });
  }
}

export default DateApi;
