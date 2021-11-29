/**
 * Get the selected preferences for a broker, firm, desk and client
 *
 * @param {object} preferences the user preferences
 * @param {number} selectedBrokerId the broker id
 * @param {number} selectedDeskId the brokers's desk id
 * @param {number} selectedTradingCustomerId the selected client
 */
const transformPreferences = ({
  preferredBrokers = [], brokerId = null, deskId = null, tradingCustomerCodeLocationCode = null,
}) => {
  // if there are no preferred brokers return
  if (preferredBrokers.length < 1) {
    return { selectedPreferenceBroker: '' };
  }

  let selectedBroker = {};

  // if selectedBrokerId and deskId are populated, get that broker else get the first broker
  if (brokerId && deskId) {
    selectedBroker = preferredBrokers.find((b) => b.deskId === +deskId && b.id === +brokerId) || null;
  } else {
    const [broker] = preferredBrokers;
    selectedBroker = broker;
  }

  if (selectedBroker === null) {
    return {};
  }

  const { id, deskId: brokerDeskId, favourites: { clients = [] } = {} } = selectedBroker;

  // get the distinct firms from the data using reduce to map by code
  const mappedFirms = clients.reduce((client, key) => ({
    ...client,
    [key.tradingCustomerCodeLocationCode]: key,
  }), {});

  // sort the codes alphabetically and return array
  const selectedPreferenceFirms = Object.keys(mappedFirms)
    .sort((a, b) => a.localeCompare(b))
    .map((a) => {
      const firm = mappedFirms[a];

      return {
        nickName: firm.tradingCustomerCodeLocationCode,
        tradingCustomerCodeLocationCode: firm.tradingCustomerCodeLocationCode,
        tradingCustomerId: firm.tradingCustomerId,
        tradingCustomerDisplayName: firm.tradingCustomerDisplayName,
        isActive: firm.tradingCustomerCodeLocationCode === tradingCustomerCodeLocationCode,
      };
    });

  let clientsCopy = [...clients];

  if (tradingCustomerCodeLocationCode !== null && tradingCustomerCodeLocationCode !== '') {
    clientsCopy = clientsCopy.filter((client) => client.tradingCustomerCodeLocationCode === tradingCustomerCodeLocationCode);
  }

  const selectedPreferenceClients = clientsCopy.map((client) => {
    const {
      firm, tradingCustomerDisplayName, ...rest
    } = client;

    return rest;
  });
  return {
    selectedPreferenceFirm: tradingCustomerCodeLocationCode || null,
    selectedPreferenceFirms,
    selectedPreferenceClients,
    selectedPreferenceBroker: selectedBroker !== null ? `${brokerDeskId},${id}` : '',
  };
};

export default transformPreferences;
