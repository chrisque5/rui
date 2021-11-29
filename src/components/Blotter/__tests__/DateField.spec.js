import moment from 'moment';
import {
  renderWithForm, waitFor, getByTitle, fireEvent,
} from 'test-utils/testUtils';
import DateField from '../filters/DateField';
import { ids } from '../../../utils/constants';

jest.mock('moment', () => () => jest.requireActual('moment')('2020-09-02T00:00:00.000Z'));

describe('<ValueDate/>', () => {
  const mockForm = {
    resetFields: () => { },
    validateFields: () => jest.fn(),
  };

  const defaultProps = {
    form: mockForm,
    id: ids.DATE_FROM,
    initialValue: moment(),
    testId: 'dateFrom',
    label: 'Value Date',
  };

  test('verify date change event', async () => {
    const { getByTestId } = renderWithForm(<DateField {...defaultProps} />);

    const dateInput = await waitFor(() => getByTestId('dateFrom'));
    fireEvent.mouseDown(dateInput);

    const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-09-02'));
    fireEvent.click(selectedDateElem);

    expect(dateInput.value).toBe('09/02/2020');
  });
});
