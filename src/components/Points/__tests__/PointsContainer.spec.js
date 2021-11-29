import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import PointsContainer from '../PointsContainer';

const form = {
  getFieldValue: () => '1',
  setFieldsValue: () => null,
  getFieldInstance: () => ({ focus: jest.fn() }),
};

const pointsOnChange = jest.fn();

const defaultProps = {
  form,
  id: 'points',
  label: 'Points',
  testId: 'txtPoints',
  pointsOnChange,
  dealType: 'FWD',
};

describe('<PointsContainer />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<PointsContainer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('Enter points', async () => {
    const { getByTestId } = renderWithForm(<PointsContainer {...defaultProps} />);
    const points = await waitFor(() => getByTestId('txtPoints'));
    fireEvent.blur(points, { value: '0.1' });
    fireEvent.change(points, { value: 'dummy' });
    fireEvent.keyDown(points, { value: '0.1', key: 'Enter' });
    fireEvent.keyDown(points, { value: '0.1' });
    fireEvent.click(points);
  });
});
