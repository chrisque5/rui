import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import RateContainer from '../RateContainer';

const form = {
  getFieldValue: () => '1',
  setFieldsValue: () => null,
  getFieldInstance: () => ({ focus: jest.fn() }),
};

const rateOnChange = jest.fn();
const defaultProps = {
  form,
  id: 'rate1',
  label: 'Rate',
  testId: 'txtRate1',
  rateOnChange,
  dealType: 'FWD',
};

describe('<RateContainer />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<RateContainer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('Enter Rates', async () => {
    const { getByTestId } = renderWithForm(<RateContainer {...defaultProps} />);
    const rate = await waitFor(() => getByTestId('txtRate1'));
    fireEvent.blur(rate, { value: 1 });
    fireEvent.keyDown(rate, { value: 1, key: 'Enter' });
    fireEvent.keyDown(rate, { value: 1 });
    fireEvent.click(rate);
  });
});
