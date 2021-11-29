import { api, favorites } from '../../utils/constants';
import restApi from '../restApi';
import userApi from '../userApi';

const {
  addClientTraderPreference, addCurrencyPairPreference, addExecutionVenuePreference, addTermPreference,
  changePreference, deleteBrokerPreference, deleteCurrencyPairPreference, deleteClientTraderPreference,
  deleteExecutionVenuePreference, deleteTermPreference, editBrokerOrderPreference,
  editClientTraderPreference, getPreferences, getUser, modifyUserSettings, updateDefaults,
} = userApi;

const mockResolvedReturn = { data: { id: 1 } };
const mockRejectedReturn = new Error('error');

describe('userApi.getUser request', () => {
  test('returns correct response when the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await getUser();
    expect(response).toEqual(mockResolvedReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.GET_USER_ACCESS_INFORMATION}`, 'GET', null);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('returns correct response when the request is resolved and no API response returned', async () => {
    restApi.request = jest.fn().mockResolvedValue();

    const response = await getUser();
    expect(response).toEqual({});
    expect(restApi.request).toBeCalledWith(`${api.GET_USER_ACCESS_INFORMATION}`, 'GET', null);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error when the request is called and rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await getUser();
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.GET_USER_ACCESS_INFORMATION}`, 'GET', null);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('userApi.getPreferences request', () => {
  test('returns correct response when the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await getPreferences();
    expect(response).toEqual(mockResolvedReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.READ_USER_PREFERENCES}`, 'GET', null);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('returns correct response when the request is resolved and no API response returned', async () => {
    restApi.request = jest.fn().mockResolvedValue();

    const response = await getPreferences();
    expect(response).toEqual({});
    expect(restApi.request).toBeCalledWith(`${api.READ_USER_PREFERENCES}`, 'GET', null);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error when the request is called and rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await getPreferences();
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.READ_USER_PREFERENCES}`, 'GET', null);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('userApi.changePreference request', () => {
  test('returns correct response when the request is resolved and data exists', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await changePreference({ someObject: 1 }, 'PUT');
    expect(response).toEqual(mockResolvedReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.READ_USER_PREFERENCES}`, 'PUT', { someObject: 1 });
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('returns correct response when the request is resolved and no API response returned', async () => {
    restApi.request = jest.fn().mockResolvedValue();

    const response = await changePreference({ someObject: 2 }, 'PUT');
    expect(response).toEqual({});
    expect(restApi.request).toBeCalledWith(`${api.READ_USER_PREFERENCES}`, 'PUT', { someObject: 2 });
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error when the request is called and rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await changePreference({ someOtherObject: true }, 'GET');
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.READ_USER_PREFERENCES}`, 'GET', { someOtherObject: true });
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('userApi.addClientTraderPreference request', () => {
  const settingsObj = { settings: { displayClientFavourites: true } };

  test('calls the correct API URL, HTTP method & params when broker ids not passed, client trader ids not passed in and agentId not passed in',
    async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const response = await addClientTraderPreference([], [], null);
      expect(response).toEqual(mockResolvedReturn.data);
      expect(restApi.request).toBeCalledWith(
        `${api.CHANGE_USER_PREFERENCES}`,
        'PUT',
        { preferredBrokers: [{ deskId: undefined, id: undefined }], ...settingsObj },
      );

      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

  test('calls the correct API URL, HTTP method & paramswhen broker ids passed, client trader ids not passed in and agentId not passed in',
    async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const response = await addClientTraderPreference([1111, 9999], [], null);
      expect(response).toEqual(mockResolvedReturn.data);
      expect(restApi.request).toBeCalledWith(
        `${api.CHANGE_USER_PREFERENCES}`,
        'PUT',
        { preferredBrokers: [{ deskId: 1111, id: 9999 }], ...settingsObj },
      );
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

  test('calls the correct API URL, HTTP method & paramswhen broker ids passed, client trader ids passed in and agentId not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addClientTraderPreference([1111, 9999], [2222, '3333,4444'], null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [
        {
          deskId: 1111,
          id: 9999,
          favourites: {
            clients: [{
              agentCustomerId: 0, executingCustomerId: 4444, traderPostingId: 3333, tradingCustomerId: 2222,
            }],
          },
        }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & paramswhen broker ids passed, client trader ids passed in and agentId passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addClientTraderPreference([1111, 9999], [2222, '3333,4444'], 5555);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [
        {
          deskId: 1111,
          id: 9999,
          favourites: {
            clients: [{
              agentCustomerId: 5555, executingCustomerId: 4444, traderPostingId: 3333, tradingCustomerId: 2222,
            }],
          },
        }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error when the request is called and rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await addClientTraderPreference([1111, 9999], [2222, '3333,4444'], 5555);
    } catch (error) {
      const expectedParamObject = {
        preferredBrokers: [
          {
            deskId: 1111,
            id: 9999,
            favourites: {
              clients: [{
                agentCustomerId: 5555, executingCustomerId: 4444, traderPostingId: 3333, tradingCustomerId: 2222,
              }],
            },
          }],
        ...settingsObj,
      };
      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('userApi.deleteClientTraderPreference request', () => {
  const baseExpectedParamObject = {
    preferredBrokers: [{
      deskId: undefined,
      id: undefined,
      favourites: {
        clients: [{
          agentCustomerId: NaN, executingCustomerId: NaN, traderPostingId: NaN, tradingCustomerId: NaN,
        }],
      },
    }],
  };

  test('calls the correct API URL, HTTP method & params when broker ids not passed, client ids not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteClientTraderPreference([], {});
    expect(response).toEqual(mockResolvedReturn.data);
    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', baseExpectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids passed, client ids not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteClientTraderPreference([1111, 9999], {});
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: 1111,
        id: 9999,
        favourites: {
          clients: [{
            agentCustomerId: NaN, executingCustomerId: NaN, traderPostingId: NaN, tradingCustomerId: NaN,
          }],
        },
      }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids passed, client ids passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteClientTraderPreference(
      [1111, 9999],
      {
        agentCustomerId: 2222, executingCustomerId: 3333, traderPostingId: 4444, tradingCustomerId: 5555,
      },
      null,
    );

    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [
        {
          deskId: 1111,
          id: 9999,
          favourites: {
            clients: [{
              agentCustomerId: 2222, executingCustomerId: 3333, traderPostingId: 4444, tradingCustomerId: 5555,
            }],
          },
        }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error when the request is called and rejected', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteClientTraderPreference(
        [1111, 9999],
        {
          agentCustomerId: 2222, executingCustomerId: 3333, traderPostingId: 4444, tradingCustomerId: 5555,
        },
        null,
      );
    } catch (error) {
      const expectedParamObject = {
        preferredBrokers: [
          {
            deskId: 1111,
            id: 9999,
            favourites: {
              clients: [{
                agentCustomerId: 2222, executingCustomerId: 3333, traderPostingId: 4444, tradingCustomerId: 5555,
              }],
            },
          }],
      };
      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('userApi.editClientTraderPreference request', () => {
  test('calls the correct API URL, HTTP method & params when broker desk ids passed in and client trader not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await editClientTraderPreference('1111,2222', null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = { preferredBrokers: [{ deskId: '1111', id: '2222', favourites: { clients: [null] } }] };
    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids passed in and client trader passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await editClientTraderPreference('1111,2222', { id: 7777 });
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = { preferredBrokers: [{ deskId: '1111', id: '2222', favourites: { clients: [{ id: 7777 }] } }] };
    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error and does not call API when broker desk ids not passed in and client trader not passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await editClientTraderPreference(null, null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });

  test('throws an error and does not call API  when broker desk ids not ids passed in and client trader passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await editClientTraderPreference(null, { id: 1 });
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});

describe('userApi.deleteBrokerPreference request', () => {
  test('calls the correct API URL, HTTP method & params when broker ids passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteBrokerPreference([1111, 9999]);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = { preferredBrokers: [{ deskId: 1111, id: 9999 }] };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error and does not call API when broker desk ids not passed in in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteBrokerPreference(null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});

describe('userApi.editBrokerOrderPreference request', () => {
  test('calls the correct API URL, HTTP method & params when favType is null and broker ids match ', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const newOrderDeskIds = ['4444,7777', '1111,3333'];
    const existingOrder = [{ id: 12345, favourites: { clients: [] } }];
    const selectedBroker = { brokerId: 12345 };

    const response = await editBrokerOrderPreference(newOrderDeskIds, existingOrder, null, selectedBroker);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{ id: '7777', deskId: '4444' }, { id: '3333', deskId: '1111' }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  const favouritesForTest = [
    { type: favorites.CLIENT_TRADER, property: 'clients' },
    { type: favorites.CCY_PAIR, property: 'currencyPairs' },
    { type: favorites.TERM, property: 'terms' },
    { type: favorites.EXECUTION_VENUE, property: 'executionVenues' },
  ];

  favouritesForTest.forEach((item) => {
    const { type, property } = item;
    const otherBroker = { id: 98765, favourites: { [property]: [{ item: 'ITEM1' }, { item: 'ITEM2' }, { item: 'ITEM3' }, { item: 'ITEM4' }] } };

    test(`when favType = ${type} and broker ids match`, async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const existingOrder = [
        { id: 12345, favourites: { [property]: [{ item: 'ITEM1' }, { item: 'ITEM2' }, { item: 'ITEM3' }, { item: 'ITEM4' }] } },
        otherBroker,
      ];

      const newOrder = [
        { id: 0, favItem: { item: 'ITEM1' } },
        { id: 1, favItem: { item: 'ITEM3' } },
        { id: 2, favItem: { item: 'ITEM2' } },
        { id: 3, favItem: { item: 'ITEM4' } },
      ];

      const selectedBroker = { brokerId: 12345 };

      const response = await editBrokerOrderPreference(newOrder, existingOrder, type, selectedBroker);
      expect(response).toEqual(mockResolvedReturn.data);

      const expectedParamObject = {
        preferredBrokers: [
          { id: 12345, favourites: { [property]: [{ item: 'ITEM1' }, { item: 'ITEM3' }, { item: 'ITEM2' }, { item: 'ITEM4' }] } },
        ],
      };

      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

    test(`when favType = ${type} and no broker ids match`, async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const existingOrder = [
        { id: 12345, favourites: { [property]: [{ item: 'ITEM1' }, { item: 'ITEM2' }, { item: 'ITEM3' }, { item: 'ITEM4' }] } },
        otherBroker,
      ];

      const newOrder = [
        { id: 0, favItem: { item: 'ITEM1' } },
        { id: 1, favItem: { item: 'ITEM3' } },
        { id: 2, favItem: { item: 'ITEM2' } },
        { id: 3, favItem: { item: 'ITEM4' } },
      ];

      const selectedBroker = { brokerId: 45678 };

      const response = await editBrokerOrderPreference(newOrder, existingOrder, type, selectedBroker);
      expect(response).toEqual(mockResolvedReturn.data);

      const expectedParamObject = {
        preferredBrokers: [],
      };

      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });
  });
});

describe('userApi.addCurrencyPairPreference request', () => {
  const settingsObj = { settings: { displayCurrencyFavourites: true } };

  test('calls the correct API URL, HTTP method & params when broker ids passed in but currency1, currency2 and dealtCurrency not passed in',
    async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const response = await addCurrencyPairPreference('1111,2222', null, null, null);
      expect(response).toEqual(mockResolvedReturn.data);

      const expectedParamObject = {
        preferredBrokers: [{
          deskId: '1111',
          id: '2222',
          favourites: { currencyPairs: [{ baseCurrency: null, counterCurrency: null, dealtCurrency: null }] },
        }],
        ...settingsObj,
      };

      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

  test('calls the correct API URL, HTTP method & params when broker ids, currency1 passed in but currency2 and dealtCurrency not passed in',
    async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const response = await addCurrencyPairPreference('1111,2222', 'USD', null, null);
      expect(response).toEqual(mockResolvedReturn.data);

      const expectedParamObject = {
        preferredBrokers: [{
          deskId: '1111',
          id: '2222',
          favourites: { currencyPairs: [{ baseCurrency: 'USD', counterCurrency: null, dealtCurrency: null }] },
        }],
        ...settingsObj,
      };

      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

  test('calls the correct API URL, HTTP method & params when broker ids, currency2 passed in but currency1 and dealtCurrency not passed in',
    async () => {
      restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

      const response = await addCurrencyPairPreference('1111,2222', null, 'USD', null);
      expect(response).toEqual(mockResolvedReturn.data);

      const expectedParamObject = {
        preferredBrokers: [{
          deskId: '1111',
          id: '2222',
          favourites: { currencyPairs: [{ baseCurrency: null, counterCurrency: 'USD', dealtCurrency: null }] },
        }],
        ...settingsObj,
      };

      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

  test('calls the correct API URL, HTTP method & paramswhen broker ids, currency1, currency2 passed in but dealtCurrency not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addCurrencyPairPreference('1111,2222', 'EUR', 'USD', null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { currencyPairs: [{ baseCurrency: 'EUR', counterCurrency: 'USD', dealtCurrency: null }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & paramswhen broker ids, dealtCurrency, currency1 passed in but currency2 not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addCurrencyPairPreference('1111,2222', 'USD', null, 'EUR');
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { currencyPairs: [{ baseCurrency: 'USD', counterCurrency: null, dealtCurrency: 'EUR' }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & paramswhen broker ids, dealtCurrency, currency2 passed in but currency1 not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addCurrencyPairPreference('1111,2222', null, 'USD', 'EUR');
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { currencyPairs: [{ baseCurrency: null, counterCurrency: 'USD', dealtCurrency: 'EUR' }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & paramswhen broker ids, dealtCurrency passed in but currency1, currency2 not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addCurrencyPairPreference('1111,2222', null, null, 'EUR');
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { currencyPairs: [{ baseCurrency: null, counterCurrency: null, dealtCurrency: 'EUR' }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & paramswhen broker ids, currency1, currency2 and dealtCurrency passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addCurrencyPairPreference('1111,2222', 'EUR', 'USD', 'GBP');
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { currencyPairs: [{ baseCurrency: 'EUR', counterCurrency: 'USD', dealtCurrency: 'GBP' }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });
});

test('throws an error and does not call API when broker desk ids not passed in in', async () => {
  restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

  try {
    await addCurrencyPairPreference(null, null, null, null);
  } catch (error) {
    expect(restApi.request).toHaveBeenCalledTimes(0);
  }
});

describe('userApi.deleteCurrencyPairPreference request', () => {
  test('calls the correct API URL, HTTP method & params when broker ids and currencyPair passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteCurrencyPairPreference([1111, 2222], { baseCurrency: 'USD', counterCurrency: 'EUR', dealtCurrency: 'GBP' });
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: 1111,
        id: 2222,
        favourites: { currencyPairs: [{ baseCurrency: 'USD', counterCurrency: 'EUR', dealtCurrency: 'GBP' }] },
      }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error and does not call API when broker desk ids, currency pair not passed in in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteCurrencyPairPreference(null, null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });

  test('throws an error and does not call API when broker desk ids passed in in and currency pair not passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteCurrencyPairPreference('1111,2222', null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });

  test('throws an error and does not call API when currency pair passed in in and broker desk ids not passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteCurrencyPairPreference(null, { baseCurrency: 'USD', counterCurrency: 'EUR', dealtCurrency: 'GBP' });
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});

describe('userApi.addTermPreference request', () => {
  const settingsObj = { settings: { displayTermFavourites: true } };

  test('calls the correct API URL, HTTP method & params when broker ids passed in but term and valueDate not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addTermPreference('1111,2222', null, null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{ deskId: '1111', id: '2222', favourites: { terms: [{ term: null, valueDate: null }] } }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids and term passed in but valueDate not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addTermPreference('1111,2222', 'TOM', null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{ deskId: '1111', id: '2222', favourites: { terms: [{ term: 'TOM', valueDate: null }] } }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids, term, and valueDate passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const date = new Date();

    const response = await addTermPreference('1111,2222', 'TOM', date);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{ deskId: '1111', id: '2222', favourites: { terms: [{ term: 'TOM', valueDate: date }] } }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });
});

test('throws an error and does not call API when broker desk ids not passed in in', async () => {
  restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

  try {
    await addTermPreference(null, null, null);
  } catch (error) {
    expect(restApi.request).toHaveBeenCalledTimes(0);
  }
});

describe('userApi.deleteTermPreference request', () => {
  test('calls the correct API URL, HTTP method & params when broker ids and term passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteTermPreference([1111, 2222], { term: 'TOD' });
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: 1111,
        id: 2222,
        favourites: { terms: [{ term: 'TOD' }] },
      }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids and valueDate passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const date = new Date();

    const response = await deleteTermPreference([1111, 2222], { valueDate: date });
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: 1111,
        id: 2222,
        favourites: { terms: [{ valueDate: date }] },
      }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error and does not call API when broker ids and no second parameter passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteTermPreference([1111, 2222], null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });

  test('throws an error and does not call API when no broker ids and no term/valueDate passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteTermPreference(null, null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});

describe('userApi.modifyUserSettings request', () => {
  const settings = { settings: { setting1: 'settign1', setting2: false } };

  test('calls the correct API URL, HTTP method & params when broker desk ids passed in and client trader not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await modifyUserSettings(settings);
    expect(response).toEqual(mockResolvedReturn.data);

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', settings);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('returns correct response when the request is resolved and no API response returned', async () => {
    restApi.request = jest.fn().mockResolvedValue();

    const response = await modifyUserSettings(settings);
    expect(response).toEqual({});
    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', settings);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error if response rejected ', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await modifyUserSettings(settings);
    } catch (error) {
      expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', settings);
      expect(restApi.request).toHaveBeenCalledTimes(1);
    }
  });
});

describe('userApi.updateDefaults request', () => {
  test('calls the correct API URL, HTTP method & params when defaults passed in and includes lastUsedDealType', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await updateDefaults({ lastUsedDealType: 'TYPE1', someOtherParam: true });

    expect(response).toEqual(mockResolvedReturn.data);
    expect(restApi.request).toBeCalledWith(
      `${api.CHANGE_USER_PREFERENCES}`,
      'PUT',
      { defaults: { lastDealType: 'TYPE1', dealDefaults: [{ lastUsedDealType: 'TYPE1', someOtherParam: true }] } },
    );

    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params returns correct response when the request is resolved and no API response returned',
    async () => {
      restApi.request = jest.fn().mockResolvedValue();

      const response = await updateDefaults({ lastUsedDealType: 'TYPE1', someOtherParam: true });
      expect(response).toEqual({});
      expect(restApi.request).toBeCalledWith(
        `${api.CHANGE_USER_PREFERENCES}`,
        'PUT',
        { defaults: { lastDealType: 'TYPE1', dealDefaults: [{ lastUsedDealType: 'TYPE1', someOtherParam: true }] } },
      );
      expect(restApi.request).toHaveBeenCalledTimes(1);
    });

  test('calls the correct API URL, HTTP method & params when defaults passed in and does not include lastUsedDealType', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await updateDefaults({ someOtherParam: true });
    expect(response).toEqual(mockResolvedReturn.data);
    expect(restApi.request).toBeCalledWith(
      `${api.CHANGE_USER_PREFERENCES}`,
      'PUT',
      { defaults: { lastUsedDealType: undefined, dealDefaults: [{ someOtherParam: true }] } },
    );
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error adn API not called if response rejected when no defaults passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await updateDefaults(null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});

describe('userApi.addExecutionVenuePreference request', () => {
  const settingsObj = { settings: { displayExecutionVenueFavourites: true } };

  test('calls the correct API URL, HTTP method & params when broker ids passed in but execution venue not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addExecutionVenuePreference('1111,2222', null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { executionVenues: [{ executionVenue: null }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids and execution venue passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await addExecutionVenuePreference('1111,2222', 'XOFF');
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: '1111',
        id: '2222',
        favourites: { executionVenues: [{ executionVenue: 'XOFF' }] },
      }],
      ...settingsObj,
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'PUT', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error and does not call API when broker desk ids not passed in in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await addExecutionVenuePreference(null, null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});

describe('userApi.deleteExecutionVenuePreference request', () => {
  test('calls the correct API URL, HTTP method & params when broker ids and execution venue passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteExecutionVenuePreference([1111, 2222], 'XOFF');
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: 1111,
        id: 2222,
        favourites: { executionVenues: ['XOFF'] },
      }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('calls the correct API URL, HTTP method & params when broker ids and exectution venue not passed in', async () => {
    restApi.request = jest.fn().mockResolvedValue(mockResolvedReturn);

    const response = await deleteExecutionVenuePreference([1111, 2222], null);
    expect(response).toEqual(mockResolvedReturn.data);

    const expectedParamObject = {
      preferredBrokers: [{
        deskId: 1111,
        id: 2222,
        favourites: { executionVenues: [null] },
      }],
    };

    expect(restApi.request).toBeCalledWith(`${api.CHANGE_USER_PREFERENCES}`, 'DELETE', expectedParamObject);
    expect(restApi.request).toHaveBeenCalledTimes(1);
  });

  test('throws an error and does not call API when no broker ids passed in', async () => {
    restApi.request = jest.fn().mockRejectedValue(mockRejectedReturn);

    try {
      await deleteTermPreference(null, null);
    } catch (error) {
      expect(restApi.request).toHaveBeenCalledTimes(0);
    }
  });
});
