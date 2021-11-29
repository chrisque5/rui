import { renderWithForm, waitFor } from 'test-utils/testUtils';
import TradeDateTime from '../TradeDateTime';

// move this out to a mocks file to be reused
const mockForm = {};
const tradeDateTimeOnChange = jest.fn();
const defaultProps = {
  form: mockForm,
  id: 'TradeDateTime',
  isTradeTimeEnabled: false,
  initialTime: '01012020',
  tradeDateTimeOnChange,
};

test('<TradeDateTime /> renders snapshot as expected', () => {
  const { container } = renderWithForm(<TradeDateTime {...defaultProps} />);
  expect(container).toMatchSnapshot();
});

test('<TradeDateTime /> with prop.isTradeDateTimeEnabled = false renders the DatePicker disabled', async () => {
  const { getByPlaceholderText } = renderWithForm(<TradeDateTime {...defaultProps} />);
  const datePicker = await waitFor(() => getByPlaceholderText('Trade Time'));
  expect(datePicker.disabled).toBe(true);
});

test('<TradeDateTime /> with prop.isTradeDateTimeEnabled = true renders the DatePicker enabled', async () => {
  const props = { ...defaultProps, isTradeTimeEnabled: true };
  const { getByPlaceholderText } = renderWithForm(<TradeDateTime {...props} />);
  const datePicker = await waitFor(() => getByPlaceholderText('Trade Time'));
  expect(datePicker.disabled).toBe(false);
});
