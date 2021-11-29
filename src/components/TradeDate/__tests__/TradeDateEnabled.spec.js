import { renderWithForm, fireEvent, waitFor } from 'test-utils/testUtils';
import TradeDateEnabled from '../TradeDateEnabled';

const mockForm = {};
const defaultProps = { form: mockForm, id: 'tradeDateEnabled', onChange: () => jest.fn() };

test('<TradeDateEnabled /> renders snapshot as expected', () => {
  const { container } = renderWithForm(<TradeDateEnabled {...defaultProps} />);
  expect(container).toMatchSnapshot();
});

test('<TradeDateEnabled /> handles clicking of checkbox', async () => {
  const { getByLabelText } = renderWithForm(<TradeDateEnabled {...defaultProps} />);
  const checkbox = await waitFor(() => getByLabelText('Override Trade Date'));
  expect(checkbox.checked).toEqual(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toEqual(false);
});
