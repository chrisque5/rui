import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import Points from '../Points';

const form = {
  getFieldValue: () => '1',
  setFieldsValue: () => null,
  getFieldInstance: () => ({ focus: jest.fn() }),
};
const pointsOnChange = jest.fn();
const handleKeyDown = jest.fn();
const validator = jest.fn();
const defaultProps = {
  form,
  id: 'points',
  label: 'Points',
  testId: 'txtPoints',
  pointsOnChange,
  handleKeyDown,
  validator,
};

describe('<Points />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<Points {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('Points on Change', async () => {
    const { getByTestId } = renderWithForm(<Points {...defaultProps} />);
    const points = await waitFor(() => getByTestId('txtPoints'));
    fireEvent.blur(points, { value: '0.1' });
    expect(pointsOnChange).toHaveBeenCalled();
  });

  test('Points on Keydown', async () => {
    const { getByTestId } = renderWithForm(<Points {...defaultProps} />);
    const points = await waitFor(() => getByTestId('txtPoints'));
    fireEvent.keyDown(points, { value: '0.1' });
    expect(handleKeyDown).toHaveBeenCalled();
  });
});
