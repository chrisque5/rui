import {
  renderWithForm, waitFor, fireEvent, getByText,
} from 'test-utils/testUtils';
import Desks from '../Desks';

describe('<Desks/>', () => {
  const deskOnSelect = jest.fn();
  const defaultProps = {
    id: 'desks',
    desks: [{ key: 1234, displayValue: 'TP BELFAST EUR NDF' }],
    deskOnSelect,
  };

  test('renders snapshot as expected', () => {
    const { container } = renderWithForm(<Desks {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('verify change event', async () => {
    const { getByTestId } = renderWithForm(<Desks {...defaultProps} />);
    const dropdown = await waitFor(() => getByTestId('ddDesk').firstElementChild);
    fireEvent.mouseDown(dropdown);

    const selectedDeskElem = await waitFor(() => getByText(document.body, 'TP BELFAST EUR NDF - 1234'));
    fireEvent.click(selectedDeskElem);

    expect(deskOnSelect).toHaveBeenCalledTimes(1);
  });
});
