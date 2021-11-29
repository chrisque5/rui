import {
  renderWithForm, waitFor, fireEvent,
} from 'test-utils/testUtils';
import { Simulate } from 'react-dom/test-utils';
import SaveDesriptionModal from '../savedescription/SaveDesriptionModal';

describe('<SaveDesriptionModal/>', () => {
  const defaultProps = {
    visible: true,
    onOk: jest.fn(),
    onBack: jest.fn(),
    onDescriptionChange: jest.fn(),
  };

  const renderModal = () => renderWithForm(<SaveDesriptionModal {...defaultProps} />);

  test('renders snapshot as expected', () => {
    const { container } = renderModal();
    expect(container).toMatchSnapshot();
  });

  test('verify onOk button is disabled by default', async () => {
    const { getByTestId } = renderModal();
    const okBtn = await waitFor(() => getByTestId('btnOk'));
    expect(okBtn.getAttribute('disabled')).toBe('');
  });

  test('verify on description change onOk will be enabled/disabled', async () => {
    const { getByTestId } = renderModal();
    const okBtn = await waitFor(() => getByTestId('btnOk'));
    expect(okBtn.getAttribute('disabled')).toBe('');// Disabled

    const inputText = await waitFor(() => getByTestId('editDescription'));
    fireEvent.change(inputText, { target: { value: 'edit' } });
    Simulate.blur(inputText);
    expect(okBtn.getAttribute('disabled')).toBe(null);// Enabled

    fireEvent.change(inputText, { target: { value: '' } });
    expect(okBtn.getAttribute('disabled')).toBe('');// Disabled
  });
});
