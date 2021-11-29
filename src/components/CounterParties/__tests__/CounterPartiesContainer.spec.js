import {
  fireEvent, renderWithForm, waitFor, within,
} from 'test-utils/testUtils';
import * as userActions from '../../../actions/userActions';
import { dealTypes } from '../../../utils/constants';
import CounterPartiesContainer from '../CounterPartiesContainer';
import {
  agents, brokers, clients, columnData, user,
} from './CounterPartiesData.json';

jest.mock('lodash', () => {
  const actualLodash = jest.requireActual('lodash');
  return actualLodash;
});

jest.mock('../../../utils/helper', () => ({ doesArrayExistWithValue: jest.fn().mockReturnValue(true) }));

jest.mock('../../../actions/userActions', () => ({
  addClientTraderPreference: jest.fn(() => jest.fn(() => Promise.resolve())),
  changePreference: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

jest.mock('../../../actions/uiActions', () => ({
  changeCounterPartySelection: jest.fn(() => jest.fn(() => Promise.resolve())),
  changeClientHoverData: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

jest.mock('../../../actions/clientActions', () => ({
  loadClientData: jest.fn(() => jest.fn().mockResolvedValue([])),
}));

jest.mock('../../../actions/agentActions', () => ({
  loadAgents: jest.fn(() => jest.fn().mockResolvedValue([])),
}));

jest.mock('../../../actions/brokerActions', () => ({
  loadBrokers: jest.fn(() => jest.fn().mockResolvedValue([])),
}));

const clientHoverinfo = {
  id: '100114_43633_164918_164922_NDF',
  tradingCustomerId: 164922,
  tradingCustomerLegalName: 'AMERICAN PRESIDENT BANK, HKG',
  tradingCustomerDisplayName: 'AMERICAN PRESIDENT B',
  tradingCustomerLeiCode: 'TESTS0HNZRZODZE35N63',
  tradingCustomerReutersCode: 'APBH',
  tradingCustomerCodeLocationCode: 'APBK.HKG',
  traders: [{
    traderPostingId: 43633,
    traderPostingDisplayName: 'BILL CLINTON',
    executingCustomerId: 164918,
    executingCustomerLegalName: 'AMERICAN PRESIDENT BANK, NYK',
    executingCustomerDisplayName: 'AMERICAN PRESIDENT B',
    executingCustomerLeiCode: 'TESTS0HNZRZODZE35N63',
    executingCustomerReutersCode: 'APBN',
  }],
};

const form = {
  getFieldInstance: () => ({ focus: jest.fn(), handlePopupVisibleChange: jest.fn() }),
  getFieldValue: (field) => field,
  setFieldValue: (field) => field,
  setFieldsValue: (field) => field,
  resetFields: () => { },
};

const getClientTraderBroker = (field) => {
  switch (field) {
    case 'buyerClientTrader':
    case 'sellerClientTrader':
    case 'cp2BuyerClientTrader':
    case 'cp2SellerClientTrader':
      return [164922, '43633,164918'];
    case 'buyerBroker':
    case 'sellerBroker':
    case 'cp2BuyerBroker':
    case 'cp2SellerBroker':
      return [2039, 27581];
    case 'buyerAgent':
    case 'sellerAgent':
    case 'cp2BuyerAgent':
    case 'cp2SellerAgent':
      return undefined;
    default:
      return field;
  }
};

const getClientTraderAgent = (field) => {
  switch (field) {
    case 'buyerClientTrader':
    case 'sellerClientTrader':
    case 'cp2BuyerClientTrader':
    case 'cp2SellerClientTrader':
      return [164922, 'agent'];
    case 'buyerBroker':
    case 'sellerBroker':
    case 'cp2BuyerBroker':
    case 'cp2SellerBroker':
      return [2039, 27581];
    case 'buyerAgent':
    case 'sellerAgent':
    case 'cp2BuyerAgent':
    case 'cp2SellerAgent':
      return 170447;
    default:
      return field;
  }
};

const dealType = dealTypes.FWD;
const defaultProps = { form, columnData, dealType };
const addClientTraderPreferenceSpy = jest.spyOn(userActions, 'addClientTraderPreference');
const changePreferenceSpy = jest.spyOn(userActions, 'changePreference');

const defaultState = {
  user,
  clients,
  brokers,
  agents,
  ui: {
    clientHoverInfo: {
      buyer: clientHoverinfo,
      seller: clientHoverinfo,
      cp2Buyer: clientHoverinfo,
      cp2Seller: clientHoverinfo,
    },
    isThirdCPChecked: true,
  },
};
const renderComponent = (initialState) => renderWithForm(<CounterPartiesContainer {...defaultProps} />, { initialState });

describe('<CounterPartiesContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Check initialValues', () => {
    const { container } = renderComponent(defaultState);
    expect(container).toMatchSnapshot();
  });

  ['buyer', 'seller', 'cp2Buyer', 'cp2Seller'].forEach(((type) => {
    test(`Click ${type} Counter Party Sides`, async () => {
      const { getByTestId } = renderComponent(defaultState);
      const btnCounterPartySide = await waitFor(() => getByTestId(`btn${type}CounterPartySide`));
      fireEvent.click(btnCounterPartySide);
    });

    test(`Select ${type} Client/Trader, Broker and add to Favorite`, async () => {
      defaultProps.form.getFieldValue = getClientTraderBroker;
      const { getByTestId, getByText } = renderComponent(defaultState);
      const btnFavorite = await waitFor(() => getByTestId(`btn${type}Favorite`));

      const clientTraderList = await waitFor(() => getByTestId(`ddl${type}ClientTrader`));
      fireEvent.click(clientTraderList);

      const client = await waitFor(() => getByText('AMERICAN PRESIDENT BANK, HKG'));
      fireEvent.click(client);

      const trader = await waitFor(() => getByText('BILL CLINTON (NYK)'));
      fireEvent.click(trader);

      const infoIcon = clientTraderList.parentElement.getElementsByClassName('client-data-tip')[0];
      fireEvent.mouseOver(infoIcon);

      const brokerList = await waitFor(() => getByTestId(`ddl${type}Broker`));
      fireEvent.click(brokerList);

      const deskName = await waitFor(() => getByText('LON ASIAN NDF'));
      fireEvent.click(deskName);

      const broker = await waitFor(() => getByText('ADEM ZIA'));
      fireEvent.click(broker);

      fireEvent.click(btnFavorite);
      expect(addClientTraderPreferenceSpy).toHaveBeenCalled();
    });

    test(`Select ${type} Client/Trader, Agent and add to Favorite`, async () => {
      defaultProps.form.getFieldValue = getClientTraderAgent;
      const { getByTestId, getByText } = renderComponent(defaultState);
      const btnFavorite = await waitFor(() => getByTestId(`btn${type}Favorite`));

      const clientTraderList = await waitFor(() => getByTestId(`ddl${type}ClientTrader`));
      fireEvent.click(clientTraderList);

      const client = await waitFor(() => getByText('AMERICAN PRESIDENT BANK, HKG'));
      fireEvent.click(client);

      const selectAgent = await waitFor(() => getByText('Select agent instead'));
      fireEvent.click(selectAgent);

      const brokerList = await waitFor(() => getByTestId(`ddl${type}Broker`));
      fireEvent.click(brokerList);

      const deskName = await waitFor(() => getByText('LON ASIAN NDF'));
      fireEvent.click(deskName);

      const broker = await waitFor(() => getByText('ADEM ZIA'));
      fireEvent.click(broker);

      const agentList = await waitFor(() => getByTestId(`ddl${type}Agent`).firstElementChild);
      fireEvent.mouseDown(agentList);

      const agent = await waitFor(() => getByText('42 FIN SERV S.R.O (PRA)'));
      fireEvent.click(agent);

      fireEvent.click(btnFavorite);
      expect(addClientTraderPreferenceSpy).toHaveBeenCalled();
    });

    test(`Select ${type} Client/Trader, Agent and pin Agent`, async () => {
      const { getByTestId, getByText } = renderComponent(defaultState);

      const clientTraderList = await waitFor(() => getByTestId(`ddl${type}ClientTrader`));
      fireEvent.click(clientTraderList);

      const client = await waitFor(() => getByText('AMERICAN PRESIDENT BANK, HKG'));
      fireEvent.click(client);

      const selectAgent = await waitFor(() => getByText('Select agent instead'));
      fireEvent.click(selectAgent);

      const agentList = await waitFor(() => getByTestId(`ddl${type}Agent`).firstElementChild);
      fireEvent.click(agentList);

      const agent = await waitFor(() => getByText('42 FIN SERV S.R.O (PRA)'));
      const pinAgent = within(agent).getByTestId('lnkPinAgent');
      fireEvent.click(pinAgent);

      expect(changePreferenceSpy).toHaveBeenCalledWith({ pinnedAgents: [170447] });
    });

    test(`Select ${type} Client/Trader, Agent and unpin Agent`, async () => {
      const state = { ...defaultState, user: { preferences: { pinnedAgents: [170447] } } };
      const { getByTestId, getByText } = renderComponent(state);

      const clientTraderList = await waitFor(() => getByTestId(`ddl${type}ClientTrader`));
      fireEvent.click(clientTraderList);

      const client = await waitFor(() => getByText('AMERICAN PRESIDENT BANK, HKG'));
      fireEvent.click(client);

      const selectAgent = await waitFor(() => getByText('Select agent instead'));
      fireEvent.click(selectAgent);

      const agentList = await waitFor(() => getByTestId(`ddl${type}Agent`).firstElementChild);
      fireEvent.click(agentList);

      const agent = await waitFor(() => getByText('42 FIN SERV S.R.O (PRA)'));
      const unpinAgent = within(agent).getByTestId('lnkPinAgent');
      fireEvent.click(unpinAgent);

      expect(changePreferenceSpy).toHaveBeenCalledWith({ pinnedAgents: [] });
    });
  }));

  test('Swap Sides', async () => {
    const { getByTestId } = renderComponent(defaultState);
    const btnSwap = await waitFor(() => getByTestId('btnSwap'));
    fireEvent.click(btnSwap);
  });
});
