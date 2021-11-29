import moment from 'moment';

import RestApi from './restApi';
import { api, dealTypes } from '../utils/constants';
import { getUniqueID } from '../utils/helper';
import { mapFormToFwdChain, mapFormToNdfChain, mapFormToSptChain } from '../utils/dealSubmit/index';
import { showErrorNotification, showWarningNotification, showSuccessNotification } from '../utils/notifications';

export default class DealApi {
  static async createDeal(formValues) {
    let request;
    switch (formValues.dealType) {
      case dealTypes.NDF:
        request = mapFormToNdfChain(formValues);
        break;
      case dealTypes.FWD:
        request = mapFormToFwdChain(formValues);
        break;
      case dealTypes.SPT:
        request = mapFormToSptChain(formValues);
        break;
      default:
        break;
    }

    const { data } = await RestApi.request(api.ADD_DEAL, 'POST', request);

    return data;
  }

  static async getBlotterDeals(params) {
    const {
      dealId, dateFrom, dateTo, sessionId, subscribeToUpdates,
    } = params;

    const searchParams = {
      sessionId, subscribeToUpdates,
    };

    if (dealId) {
      searchParams.dmsDealReference = dealId;
    } else if (dateFrom && dateTo) {
      searchParams.dateFrom = `${moment(dateFrom).format('YYYY-MM-DD')}T00:00:00.000Z`;
      searchParams.dateTo = `${moment(dateTo).format('YYYY-MM-DD')}T23:59:59.999Z`;
    }

    const {
      data: {
        executionChains = [],
        returnCode = 0,
        returnMessage,
      } = {},
    } = await RestApi.request(`${api.GET_BLOTTER_DEALS}`, 'GET', null, false, searchParams);

    if (returnCode < 0) {
      showErrorNotification('Error', `An error occurred with the request - ${returnMessage}`);
      return [];
    }

    if (!executionChains.length) {
      showWarningNotification('No results', 'No deals were found. Please check your search criteria');
      return [];
    }

    return [...executionChains];
  }

  static async approveDealStage(payload) {
    const { data } = await RestApi.request(api.APPROVE_DEAL_STAGE, 'POST', { ...payload });
    const errors = data ? data.errors : [];
    if (errors.length > 0) {
      showWarningNotification('Warning', errors.join(''));
    }
    return data || {};
  }

  static async enableInvestigationChkFlag(payload) {
    const { data } = await RestApi.request(api.TOGGLE_DEAL_INVESTIGATION_FLAG, 'PUT', { ...payload });
    const errors = data ? data.errors : [];
    if (errors.length > 0) {
      showWarningNotification('Warning', errors.join(''));
    }
    return data || {};
  }

  static async getDeal(dealId) {
    const { data } = await RestApi.request(`${api.LOAD_DEAL}/${dealId}`, 'GET');
    if (data.returnMessage === 'OK' && data.deal) {
      return data.deal;
    }
    showErrorNotification('Error', 'Deal Not found');

    return {};
  }

  static async editDeal(dealId, patch) {
    const url = `${api.EDIT_DEAL}${dealId}/update`;
    const { data } = await RestApi.request(url, 'PATCH', patch);
    if (data.returnMessage === 'OK' && data.deal) {
      const { dmsDealReference } = data.deal;
      showSuccessNotification('Deal Updated', `Deal(${dmsDealReference}) updated successfully`);
      return data.deal;
    }
    if (data.errors && data.errors.length > 0) {
      const errors = data.errors.map((err) => <li key={getUniqueID()}>{err}</li>);
      const errorMsg = (
        <>
          <p>{data.returnMessage}</p>
          {errors}
        </>
      );
      showErrorNotification('Deal Error', errorMsg, 10);
    } else {
      showErrorNotification('Deal Error', `${data.returnMessage}`, 10);
    }

    throw data.errors;
  }
}
