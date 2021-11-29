import {
  renderWithProvider, fireEvent, waitFor,
} from 'test-utils/testUtils';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import BrokersTab from '../BrokersTab';
import {
  panes, preferences, currencyScope, termScope, counterPartyScope, executionVenueScope,
} from './FavoriteTestData.json';

describe('<BrokersTab/>', () => {
  const onChange = jest.fn();
  const onEdit = jest.fn();
  const onClientTraderClick = jest.fn();
  const onClientTraderRemove = jest.fn();
  const onCurrencyRemove = jest.fn();
  const onCurrencyClick = jest.fn();
  const onTermRemove = jest.fn();
  const onTermClick = jest.fn();
  const onFirmClick = jest.fn();
  const onOrderChanged = jest.fn();
  const onExecutionVenueRemove = jest.fn();
  const onExecutionVenueClick = jest.fn();
  const initialState = {
    user: {
      preferences,
    },
  };

  const mockForm = {
    resetFields: () => {},
  };

  const defaultProps = {
    form: mockForm,
    panes,
    tabOrder: ['8158,100114', '8158,100115'],
    activeTabKey: '8158,100114',
    currencyScope,
    termScope,
    counterPartyScope,
    executionVenueScope,
    onChange,
    onEdit,
    onClientTraderClick,
    onClientTraderRemove,
    onCurrencyRemove,
    onCurrencyClick,
    onTermRemove,
    onTermClick,
    onOrderChanged,
    onExecutionVenueRemove,
    onExecutionVenueClick,
    onFirmClick,
  };

  test('renders snapshot as expected', () => {
    const { container } = renderWithProvider(
      <DndProvider backend={TestBackend}><BrokersTab {...defaultProps} /></DndProvider>, { initialState },
    );
    expect(container).toMatchSnapshot();
  });

  test('verify click events on favorites ', async () => {
    const { getByText } = renderWithProvider(
      <DndProvider backend={TestBackend}><BrokersTab {...defaultProps} /></DndProvider>, { initialState },
    );
    const clientTraderFav = await waitFor(() => getByText('BILL CLINTON'));
    fireEvent.click(clientTraderFav);
    expect(onClientTraderClick).toHaveBeenCalledTimes(1);

    const firmFav = await waitFor(() => getByText('APBK.LON'));
    fireEvent.click(firmFav);
    expect(onFirmClick).toHaveBeenCalledTimes(1);

    const ccyFav = await waitFor(() => getByText('USDCNY'));
    fireEvent.click(ccyFav);
    expect(onCurrencyClick).toHaveBeenCalledTimes(1);

    const termFav = await waitFor(() => getByText('1M'));
    fireEvent.click(termFav);
    expect(onTermClick).toHaveBeenCalledTimes(1);

    const execVenueFav = await waitFor(() => getByText('XOFF'));
    fireEvent.click(execVenueFav);
    expect(onExecutionVenueClick).toHaveBeenCalledTimes(1);
  });
});
