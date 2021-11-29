import RestApi from './restApi';
import { favorites, api } from '../utils/constants';

/* eslint-disable no-throw-literal */

function constructBrokerClientJson({
  brokerDeskIds, clientTraderIds, agentId, updateSettings = false,
}) {
  const settings = updateSettings ? { settings: { displayClientFavourites: true } } : null;

  const preferenceChange = {
    preferredBrokers: [
      {
        id: brokerDeskIds[1],
        deskId: brokerDeskIds[0],
      },
    ],
    ...settings,
  };

  if (clientTraderIds && clientTraderIds.length > 0) {
    preferenceChange.preferredBrokers[0].favourites = {
      clients: [
        {
          tradingCustomerId: Number(clientTraderIds[0]),
          traderPostingId: Number(clientTraderIds[1].split(',')[0]),
          executingCustomerId: Number(clientTraderIds[1].split(',')[1]),
          agentCustomerId: Number(agentId),
        },
      ],
    };
  }

  return preferenceChange;
}

function constructEditBrokerOrderJson(newOrder, existingOrder, favType, selectedBroker) {
  if (!favType) {
    return {
      preferredBrokers: newOrder.reduce((items, item) => {
        const [deskId, id] = item.split(',');
        items.push({ id, deskId });

        return items;
      }, []),
    };
  }

  const existingBroker = existingOrder.find((b) => b.deskId === selectedBroker.deskId && b.id === selectedBroker.brokerId);

  // if there is no matching broker return default
  if (!existingBroker) {
    return { preferredBrokers: [] };
  }

  // reorder the items and set the relevant property
  const reorderedItems = newOrder.reduce((items, item) => {
    items.push(item.favItem);
    return items;
  }, []);

  if (favType === favorites.CLIENT_TRADER) {
    existingBroker.favourites.clients = reorderedItems;
  } else if (favType === favorites.CCY_PAIR) {
    existingBroker.favourites.currencyPairs = reorderedItems;
  } else if (favType === favorites.TERM) {
    existingBroker.favourites.terms = reorderedItems;
  } else if (favType === favorites.EXECUTION_VENUE) {
    existingBroker.favourites.executionVenues = reorderedItems;
  }

  return {
    preferredBrokers: [existingBroker],
  };
}

function constructAddCurrencyJson(brokerDeskIds, baseCurrency, counterCurrency, dealtCurrency) {
  return {
    preferredBrokers: [
      {
        id: brokerDeskIds.split(',')[1],
        deskId: brokerDeskIds.split(',')[0],
        favourites: {
          currencyPairs: [{
            baseCurrency,
            counterCurrency,
            dealtCurrency,
          }],
        },
      },
    ],
    settings: {
      displayCurrencyFavourites: true,
    },
  };
}

function constructEditCurrencyJson(brokerDeskIds, currencyPair) {
  return {
    preferredBrokers: [
      {
        id: brokerDeskIds[1],
        deskId: brokerDeskIds[0],
        favourites: {
          currencyPairs: [
            {
              baseCurrency: currencyPair.baseCurrency,
              counterCurrency: currencyPair.counterCurrency,
              dealtCurrency: currencyPair.dealtCurrency,
            }],
        },
      },
    ],
  };
}

function constructTermJson(brokerDeskIds, term, valueDate) {
  return {
    preferredBrokers: [
      {
        id: brokerDeskIds.split(',')[1],
        deskId: brokerDeskIds.split(',')[0],
        favourites: {
          terms: [{
            term,
            valueDate,
          }],
        },
      },
    ],
    settings: {
      displayTermFavourites: true,
    },
  };
}

function constructEditTermJson(brokerDeskIds, term) {
  const termName = term.term ? 'term' : 'valueDate';
  const termValue = term.term ? term.term : term.valueDate;

  return {
    preferredBrokers: [
      {
        id: brokerDeskIds[1],
        deskId: brokerDeskIds[0],
        favourites: {
          terms: [{
            [termName]: termValue,
          }],
        },
      },
    ],
  };
}

function constructEditClientTraderJson(brokerDeskIds, clientTrader) {
  return {
    preferredBrokers: [
      {
        id: brokerDeskIds.split(',')[1],
        deskId: brokerDeskIds.split(',')[0],
        favourites: {
          clients: [
            clientTrader],
        },
      },
    ],
  };
}

function constructExecutionVenueJson(brokerDeskIds, executionVenue) {
  return {
    preferredBrokers: [
      {
        id: brokerDeskIds.split(',')[1],
        deskId: brokerDeskIds.split(',')[0],
        favourites: {
          executionVenues: [{ executionVenue }],
        },
      },
    ],
    settings: {
      displayExecutionVenueFavourites: true,
    },
  };
}

function constructEditExecutionVenueJson(brokerDeskIds, executionVenue) {
  return {
    preferredBrokers: [
      {
        id: brokerDeskIds[1],
        deskId: brokerDeskIds[0],
        favourites: {
          executionVenues: [executionVenue],
        },
      },
    ],
  };
}

class UserApi {
  static getUser() {
    return RestApi.request(api.GET_USER_ACCESS_INFORMATION, 'GET', null)
      .then((response) => (response ? response.data : {}));
  }

  static getPreferences() {
    return RestApi.request(api.READ_USER_PREFERENCES, 'GET', null)
      .then((response) => (response ? response.data : {}));
  }

  static changePreference(objectWithPath, httpMethod) {
    return RestApi.request(api.CHANGE_USER_PREFERENCES, httpMethod, objectWithPath)
      .then((response) => (response ? response.data : {}));
  }

  static addClientTraderPreference(brokerDeskIds, clientTraderIds, agentId) {
    return UserApi.changePreference(
      constructBrokerClientJson({
        brokerDeskIds, clientTraderIds, agentId, updateSettings: true,
      }),
      'PUT',
    );
  }

  static deleteClientTraderPreference(brokerDeskIds, clientIds) {
    return UserApi.changePreference(
      constructBrokerClientJson({
        brokerDeskIds,
        clientTraderIds: [
          `${clientIds.tradingCustomerId}`,
          `${clientIds.traderPostingId},${clientIds.executingCustomerId}`,
        ],
        agentId: clientIds.agentCustomerId,
      }),
      'DELETE',
    );
  }

  static editClientTraderPreference(brokerDeskIds, clientTraderId) {
    return UserApi.changePreference(
      constructEditClientTraderJson(brokerDeskIds, clientTraderId),
      'PUT',
    );
  }

  static deleteBrokerPreference(brokerDeskIds) {
    return UserApi.changePreference(
      constructBrokerClientJson({ brokerDeskIds }),
      'DELETE',
    );
  }

  static editBrokerOrderPreference(newOrder, existingOrder, favType, selectedBroker) {
    return UserApi.changePreference(
      constructEditBrokerOrderJson(newOrder, existingOrder, favType, selectedBroker),
      'PUT',
    );
  }

  static addCurrencyPairPreference(brokerDeskIds, currency1, currency2, dealtCurrency) {
    return UserApi.changePreference(
      constructAddCurrencyJson(brokerDeskIds, currency1, currency2, dealtCurrency),
      'PUT',
    );
  }

  static deleteCurrencyPairPreference(brokerDeskIds, currencyPair) {
    return UserApi.changePreference(
      constructEditCurrencyJson(brokerDeskIds, currencyPair),
      'DELETE',
    );
  }

  static addTermPreference(brokerDeskIds, term, valueDate) {
    return UserApi.changePreference(
      constructTermJson(brokerDeskIds, term, valueDate),
      'PUT',
    );
  }

  static deleteTermPreference(brokerDeskIds, term) {
    return UserApi.changePreference(
      constructEditTermJson(brokerDeskIds, term),
      'DELETE',
    );
  }

  static modifyUserSettings(newSettings) {
    return RestApi.request(api.CHANGE_USER_PREFERENCES, 'PUT', newSettings)
      .then((response) => (response ? response.data : {}));
  }

  static updateDefaults(newDefaults) {
    const defaults = {
      defaults: {
        lastDealType: newDefaults.lastUsedDealType,
        dealDefaults: [{ ...newDefaults }],
      },
    };

    return RestApi.request(api.CHANGE_USER_PREFERENCES, 'PUT', defaults)
      .then((response) => (response ? response.data : {}));
  }

  static addExecutionVenuePreference(brokerDeskIds, executionVenue) {
    return UserApi.changePreference(
      constructExecutionVenueJson(brokerDeskIds, executionVenue),
      'PUT',
    );
  }

  static deleteExecutionVenuePreference(brokerDeskIds, executionVenue) {
    return UserApi.changePreference(
      constructEditExecutionVenueJson(brokerDeskIds, executionVenue),
      'DELETE',
    );
  }
}

export default UserApi;
