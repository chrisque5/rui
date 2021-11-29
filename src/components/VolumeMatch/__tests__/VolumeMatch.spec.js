import { renderWithForm, fireEvent, waitFor } from 'test-utils/testUtils';
import VolumeMatch from '../VolumeMatch';

const mockForm = {};
const defaultProps = { form: mockForm, id: 'volumeMatch', label: 'Volume Match' };

describe('<VolumeMatch />', () => {
  it('should render snapshot as expected', () => {
    const { container } = renderWithForm(<VolumeMatch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should handle clicking of the checkbox', async () => {
    const { getByLabelText } = renderWithForm(<VolumeMatch {...defaultProps} />);
    const checkbox = await waitFor(() => getByLabelText('Volume Match'));
    expect(checkbox.checked).toEqual(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
});
