import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import Rate from '../Rate';

const form = {
  getFieldValue: () => '1',
  setFieldsValue: () => null,
  getFieldInstance: () => ({ focus: jest.fn() }),
};
const rateOnChange = jest.fn();
const handleKeyDown = jest.fn();
const validator = jest.fn();

const defaultProps = {
  form,
  id: 'rate1',
  label: 'Rate',
  testId: 'txtRate1',
  rateOnChange,
  handleKeyDown,
  validator,
  isRatePending: false,
};

describe('<Rate />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<Rate {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('Rate on Change', async () => {
    const { getByTestId } = renderWithForm(<Rate {...defaultProps} />);
    const rate = await waitFor(() => getByTestId('txtRate1'));
    fireEvent.blur(rate, { value: '0.1' });
    expect(rateOnChange).toHaveBeenCalled();
  });

  test('Rate on Keydown', async () => {
    const { getByTestId } = renderWithForm(<Rate {...defaultProps} />);
    const rate = await waitFor(() => getByTestId('txtRate1'));
    fireEvent.keyDown(rate, { value: '0.1' });
    expect(handleKeyDown).toHaveBeenCalled();
  });
});
