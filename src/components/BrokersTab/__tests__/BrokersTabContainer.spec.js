import {
  renderWithProvider, fireEvent, waitFor, getByText,
} from 'test-utils/testUtils';
import { act } from 'react-dom/test-utils';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import { Modal } from 'antd';
import * as userActions from '../../../actions/userActions';
import BrokersTabContainer from '../BrokersTabContainer';
import * as notifications from '../../../utils/notifications';
import {
  preferences, brokers, clients, agents, currencies, executionVenues,
  selectedPreferenceFirms, selectedPreferenceClients,

} from './FavoriteTestData.json';
import { ids } from '../../../utils/constants';

describe('<BrokersTabContainer/>', () => {
  const setFieldsValue = jest.fn();
  const onSelect = jest.fn();
  const onChange = jest.fn();
  const createStore = (selectedDealType, selectedStrategyType, selectedTradeSide) => ({
    user: {
      preferences,
    },
    ui: {
      isFavRenamePopupVisible: false,
      selectedFavItem: {},
      selectedTradeSide,
      isThirdCPChecked: false,
      selectedPreferenceBroker: '8158,100114',
      selectedPreferenceFirms,
      selectedPreferenceClients,
      lastSetTerm: '',
      selectedDealType,
      selectedStrategyType,
    },
    brokers,
    clients,
    agents,
    currencies,
    executionVenues,
  });
  const getFieldInstance = (type) => {
    let retVal = {};
    switch (type) {
      case ids.CURRENCY_1:
      case ids.CURRENCY_2:
      case ids.DEALT_CURRENCY:
        retVal = {
          props:
            {
              onChange,
            },
        };
        break;
      case ids.TERM_1:
      case ids.TERM_2:
        retVal = {
          props: {
            onSelect,
          },
        };
        break;
      case ids.EXECUTION_VENUE:
        retVal = {
          props: {
            children: executionVenues,
          },
        };
        break;
      case ids.VALUE_DATE_1:
      case ids.VALUE_DATE_2:
        retVal = {
          props: {
            onChange,
          },
        };
        break;
      default:
        retVal = {};
        break;
    }
    return retVal;
  };

  const getFieldValueOutright = (type) => {
    if (type === ids.STRATEGY) {
      return 'Outright';
    }
    return 'dummy';
  };
  const getFieldValueSpread = (type) => {
    if (type === ids.STRATEGY) {
      return 'Spread';
    }
    return 'dummy';
  };

  const createDefaults = (selectedStrategyType) => {
    const mockForm = {
      setFieldsValue,
      getFieldValue: getFieldValueOutright,
      getFieldInstance,
    };
    if (selectedStrategyType === 'Spread') {
      mockForm.getFieldValue = getFieldValueSpread;
    }

    return {
      form: mockForm,
      tabOrder: ['8158,100114', '8158,100115'],
      activeTabKey: '8158,100114',
      selectedPreferenceBroker: '8158,100114',
      visible: false,
      selectedTradeSide: 'buyer',
    };
  };

  const modalSpy = jest.spyOn(Modal, 'confirm');
  const deleteClientTraderPreferenceSpy = jest.spyOn(userActions, 'deleteClientTraderPreference');
  const deleteCurrencyPairPreferenceSpy = jest.spyOn(userActions, 'deleteCurrencyPairPreference');
  const deleteTermPreferenceSpy = jest.spyOn(userActions, 'deleteTermPreference');
  const deleteExecutionVenuePreferenceSpy = jest.spyOn(userActions, 'deleteExecutionVenuePreference');
  const editBrokerOrderSpy = jest.spyOn(userActions, 'editBrokerOrder');
  const notificationSpy = jest.spyOn(notifications, 'showWarningNotification');

  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderComponent = (deal) => {
    const initialState = createStore(deal.dealType, deal.strategy, deal.tradeSide);

    const { container } = renderWithProvider(
      <DndProvider backend={TestBackend}>
        <BrokersTabContainer {...createDefaults(deal.strategy)} />
      </DndProvider>, { initialState },
    );
    return container;
  };
  test('renders snapshot as expected', () => {
    const deal = { dealType: 'NDF', strategy: 'Outright', tradeSide: 'buyer' };
    const container = renderComponent(deal);
    expect(container).toMatchSnapshot();
  });

  [{ dealType: 'NDF', strategy: 'Outright', tradeSide: 'buyer' },
    { dealType: 'NDF', strategy: 'Spread', tradeSide: 'buyer' },
    { dealType: 'NDF', strategy: 'Spread', tradeSide: 'seller' },
  ].forEach((deal) => {
    test('verify click events to select Client favorites ', async () => {
      const container = renderComponent(deal);
      const clientTraderFav = await waitFor(() => getByText(container, 'BILL CLINTON'));
      fireEvent.click(clientTraderFav);
      expect(setFieldsValue).toHaveBeenCalledTimes(3);

      const firmFav = await waitFor(() => getByText(container, 'APBK.LON'));
      fireEvent.click(firmFav);

      const ccyFav = await waitFor(() => getByText(container, 'USDCNY'));
      fireEvent.click(ccyFav);
      expect(setFieldsValue).toHaveBeenCalledTimes(4);

      let termFav = await waitFor(() => getByText(container, '1M'));
      fireEvent.click(termFav);
      expect(onSelect).toHaveBeenCalledTimes(1);

      termFav = await waitFor(() => getByText(container, '05/28/2020'));
      fireEvent.click(termFav);
      expect(onSelect).toHaveBeenCalledTimes(1);

      const execVenueFav = await waitFor(() => getByText(container, 'XOFF'));
      fireEvent.click(execVenueFav);
      expect(setFieldsValue).toHaveBeenCalledTimes(5);
    });

    test('verify click events to remove clientTrader favorites ', async () => {
      const container = renderComponent(deal);
      const clientTraderFav = await waitFor(() => getByText(container, 'BILL CLINTON'));
      fireEvent.click(clientTraderFav.childNodes[1]);
      expect(modalSpy).toHaveBeenCalledTimes(1);
      const yesBtn = await waitFor(() => getByText(document.body, 'Yes'));
      fireEvent.click(yesBtn);
      expect(deleteClientTraderPreferenceSpy).toHaveBeenCalledTimes(1);
      modalSpy.mockClear();
    });

    test('verify click events to remove CCY favorites ', async () => {
      const container = renderComponent(deal);
      const ccyFav = await waitFor(() => getByText(container, 'USDCNY'));
      fireEvent.click(ccyFav.childNodes[1]);
      expect(modalSpy).toHaveBeenCalledTimes(1);
      const yesBtn = await waitFor(() => getByText(document.body, 'Yes'));
      fireEvent.click(yesBtn);
      expect(deleteCurrencyPairPreferenceSpy).toHaveBeenCalledTimes(1);
      modalSpy.mockClear();
    });

    test('verify click events to remove Term favorites ', async () => {
      const container = renderComponent(deal);
      const termFav = await waitFor(() => getByText(container, '1M'));
      fireEvent.click(termFav.childNodes[1]);
      expect(modalSpy).toHaveBeenCalledTimes(1);
      const yesBtn = await waitFor(() => getByText(document.body, 'Yes'));
      fireEvent.click(yesBtn);
      expect(deleteTermPreferenceSpy).toHaveBeenCalledTimes(1);
      modalSpy.mockClear();
    });

    test('verify click events to remove ExecutionVenue favorites ', async () => {
      const container = renderComponent(deal);
      const execVenueFav = await waitFor(() => getByText(container, 'XOFF'));
      fireEvent.click(execVenueFav.childNodes[1]);
      expect(modalSpy).toHaveBeenCalledTimes(1);
      const yesBtn = await waitFor(() => getByText(document.body, 'Yes'));
      fireEvent.click(yesBtn);
      expect(deleteExecutionVenuePreferenceSpy).toHaveBeenCalledTimes(1);
      modalSpy.mockClear();
    });

    test.skip('verify drag and drop ', async () => {
      const initialState = createStore(deal.dealType, deal.strategy, deal.tradeSide);
      act(() => {
        renderWithProvider(
          <DndProvider backend={TestBackend}>
            <BrokersTabContainer {...createDefaults(deal.strategy)} />
          </DndProvider>, { initialState },
        );
      });
      const dragSource = await waitFor(() => getByText(document.body, 'BILL CLINTON'));
      const dropTarget = await waitFor(() => getByText(document.body, 'DWIGHT EISENHOWER'));

      fireEvent.dragStart(dragSource);
      fireEvent.dragOver(dropTarget);
      fireEvent.drop(dropTarget);
      fireEvent.dragEnd(dragSource);
      expect(editBrokerOrderSpy).toHaveBeenCalledTimes(1);

      editBrokerOrderSpy.mockClear();

      const brokerDragSource = await waitFor(() => getByText(document.body, 'belfast tpeur test broker 1'));
      const brokerDropTarget = await waitFor(() => getByText(document.body, 'belfast tpeur test broker 2'));

      fireEvent.dragStart(brokerDragSource);
      fireEvent.dragOver(brokerDropTarget);
      fireEvent.drop(brokerDropTarget);
      fireEvent.dragEnd(brokerDragSource);

      expect(editBrokerOrderSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('verify click events to for invalid scope ', async () => {
    const initialState = {
      user: {
        preferences,
      },
      ui: {
        isFavRenamePopupVisible: false,
        selectedFavItem: {},
        selectedTradeSide: 'buyer',
        isThirdCPChecked: false,
        selectedPreferenceBroker: '8158,100114',
        selectedPreferenceFirms,
        selectedPreferenceClients,
        lastSetTerm: '',
        selectedDealType: null,
        selectedStrategyType: null,
      },
    };
    const { container } = renderWithProvider(
      <DndProvider backend={TestBackend}>
        <BrokersTabContainer {...createDefaults('Outright')} />
      </DndProvider>, { initialState },
    );

    let clientTraderFav = await waitFor(() => getByText(container, 'BILL CLINTON'));
    fireEvent.click(clientTraderFav);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    notificationSpy.mockClear();

    clientTraderFav = await waitFor(() => getByText(container, 'DWIGHT EISENHOWER'));
    fireEvent.click(clientTraderFav);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toHaveBeenCalledWith('Warning', 'Selected client/trader has been marked as deleted.');
    notificationSpy.mockClear();

    clientTraderFav = await waitFor(() => getByText(container, 'RONALD REAGAN'));
    fireEvent.click(clientTraderFav);
    expect(notificationSpy).toHaveBeenCalledWith('Warning', 'Selected client/trader is not available for selection.');
    notificationSpy.mockClear();

    const ccyFav = await waitFor(() => getByText(container, 'USDCNY'));
    fireEvent.click(ccyFav);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    notificationSpy.mockClear();

    const termFav = await waitFor(() => getByText(container, '1M'));
    fireEvent.click(termFav);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    notificationSpy.mockClear();

    const execVenueFav = await waitFor(() => getByText(container, 'XOFF'));
    fireEvent.click(execVenueFav);
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    notificationSpy.mockClear();
  });
});
