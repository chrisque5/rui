import { renderWithForm, fireEvent, waitFor } from 'test-utils/testUtils';
import TurnTrade from '../TurnTrade';

const mockForm = {};
const defaultProps = { form: mockForm, id: 'turnTrade', label: 'Turn Trade' };

describe('<TurnTrade />', () => {
  it('should render snapshot as expected', () => {
    const { container } = renderWithForm(<TurnTrade {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should handle clicking of the checkbox', async () => {
    const { getByLabelText } = renderWithForm(<TurnTrade {...defaultProps} />);
    const checkbox = await waitFor(() => getByLabelText('Turn Trade'));
    expect(checkbox.checked).toEqual(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
});
