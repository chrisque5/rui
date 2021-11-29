import {
  render, fireEvent, waitFor,
} from 'test-utils/testUtils';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import DraggableTag from '../DraggableTag';
import { favorites } from '../../../utils/constants';

const defaultProps = {
  id: 0,
  backgroundColour: '1',
  onClick: jest.fn(),
  onClose: jest.fn(),
  dropEnded: jest.fn(),
  moveTag: jest.fn(),
  openRenamePopUp: jest.fn(),
  openColourPopUp: jest.fn(),
  isInScope: () => true,
  canDrag: true,
  selectedBroker: {
    title: 'ALICE LIM',
    clients: [
      {
        nickName: 'DWIGHT EISENHOWER',
        executingCustomerId: 164922,
        executingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
        tradingCustomerId: 164922,
        traderPostingId: 43637,
        traderDisplayName: 'DWIGHT EISENHOWER',
        agentCustomerId: 0,
      },
    ],
    currencyPairs: [
      {
        nickName: 'EURCOP',
        baseCurrency: 'EUR',
        counterCurrency: 'COP',
        dealtCurrency: 'EUR',
      },
    ],
    terms: [],
    executionVenues: [],
    key: '2040,51508',
    brokerId: 51508,
    brokerName: 'ALICE LIM',
    deskId: 2040,
    firms: [
      {
        nickName: 'APBK.HKG',
        tradingCustomerCodeLocationCode: 'APBK.HKG',
        tradingCustomerId: 164922,
        tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
        isActive: false,
      },
    ],
    userSettings: {
      ratesFeed: true,
      displayClientFavourites: true,
      displayCurrencyFavourites: true,
      displayTermFavourites: true,
      dealSubmitSound: 'ka-ching',
      colourScheme: 'light',
      displayClients: false,
      displayExecutionVenueFavourites: true,
      lrMode: false,
      displayExecutionVenueColours: false,
      displayClsDefaults: false,
    },
  },
  settings: {
    ratesFeed: true,
    displayClientFavourites: false,
    displayCurrencyFavourites: true,
    displayTermFavourites: true,
    dealSubmitSound: 'ka-ching',
    colourScheme: 'light',
    displayClients: true,
    displayExecutionVenueFavourites: true,
    lrMode: true,
    displayExecutionVenueColours: true,
    displayClsDefaults: true,
  },
};

const favItems = {
  [favorites.FIRMS]: {
    nickName: 'APBK.HKG',
    tradingCustomerCodeLocationCode: 'APBK.HKG',
    tradingCustomerId: 164922,
    tradingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
    isActive: false,
  },
  [favorites.CLIENT_TRADER]: {
    nickName: 'DWIGHT EISENHOWER',
    executingCustomerId: 164922,
    executingCustomerDisplayName: 'AMERICAN PRESIDENT BANK',
    tradingCustomerId: 164922,
    traderPostingId: 43637,
    traderDisplayName: 'DWIGHT EISENHOWER',
    agentCustomerId: 0,
  },
  [favorites.CCY_PAIR]: {
    nickName: 'EURCOP',
    baseCurrency: 'EUR',
    counterCurrency: 'COP',
    dealtCurrency: 'EUR',
  },
  [favorites.TERM]: {
    nickName: '1W',
    term: '1W',
  },
  [favorites.EXECUTION_VENUE]: {
    nickName: 'TPSEF',
    executionVenue: 'TPSEF',
  },
};

describe('<DraggableTag/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  Object.keys(favItems).forEach((favType) => {
    const nickName = favItems[favType].nickName;
    const props = {
      ...defaultProps,
      favType,
      text: nickName,
      favItem: favItems[favType],
    };

    test(`renders ${favType} favorite as expected`, async () => {
      const { container } = render(
        <DndProvider backend={TestBackend}><DraggableTag {...props} /></DndProvider>,
      );

      expect(container).toMatchSnapshot();
    });

    test(`Click ${favType} favorite`, async () => {
      const { getByText } = render(
        <DndProvider backend={TestBackend}><DraggableTag {...props} /></DndProvider>,
      );

      const favItemTag = await waitFor(() => getByText(nickName));
      fireEvent.click(favItemTag);
      expect(defaultProps.onClick).toHaveBeenCalled();
    });
  });
});
