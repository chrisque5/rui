import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import DealId from '../filters/DealId';

const onChange = jest.fn();
const validator = jest.fn();
const handleKeyDown = jest.fn();

const defaultProps = {
  id: 'dealId',
  label: 'Deal Id',
  testId: 'dealId',
  onChange,
  validator,
  handleKeyDown,
};

describe('<DealId />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<DealId {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('DealId on Keydown', async () => {
    const { getByTestId } = renderWithForm(<DealId {...defaultProps} />);
    const dealIdInput = await waitFor(() => getByTestId('dealId'));
    fireEvent.keyDown(dealIdInput, { value: '123', key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalled();
  });
});
