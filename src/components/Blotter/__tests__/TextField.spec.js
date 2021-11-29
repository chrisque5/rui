import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import TextField from '../filters/TextField';

const handleKeyDown = jest.fn();

const defaultProps = {
  id: 'broker',
  label: 'Broker',
  testId: 'broker',
  handleKeyDown,
};

describe('<TextField />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<TextField {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('TextField on Keydown', async () => {
    const { getByTestId } = renderWithForm(<TextField {...defaultProps} />);
    const textField = await waitFor(() => getByTestId('broker'));
    fireEvent.keyDown(textField, { value: '123', key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalled();
  });
});
