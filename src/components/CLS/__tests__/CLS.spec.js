import { renderWithForm, fireEvent, waitFor } from 'test-utils/testUtils';
import { ids } from '../../../utils/constants';
import CLS from '../CLS';

const form = {
  getFieldValue: () => false,
  setFieldsValue: () => jest.fn(),
};
const onChange = jest.fn();

const defaultProps = {
  form,
  id: ids.CLS_1,
  label: 'CLS',
  testId: 'checkCLS1',
  onChange,
};

describe('<CLS />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<CLS {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('Toggle First Leg CLS', async () => {
    const { getByTestId } = renderWithForm(<CLS {...defaultProps} />);
    const CLS1 = await waitFor(() => getByTestId('checkCLS1'));
    fireEvent.click(CLS1);
  });
});
