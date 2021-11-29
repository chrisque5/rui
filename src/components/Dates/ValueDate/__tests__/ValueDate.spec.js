import moment from 'moment';
import {
  renderWithForm, waitFor, getByTitle, fireEvent,
} from 'test-utils/testUtils';
import ValueDate from '../ValueDate';
import { ids } from '../../../../utils/constants';

jest.mock('../../../../utils/helper', () => ({ setTodayOnNull: jest.fn() }));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-04-04T00:00:00.000Z'));

describe('<ValueDate/>', () => {
  const mockForm = {
    resetFields: () => { },
  };

  const valueDateOnChange = jest.fn();
  const addPreferenceClick = jest.fn();
  const defaultProps = {
    form: mockForm,
    id: ids.VALUE_DATE_1,
    valueDateOnChange,
    addPreferenceClick,
    initialValue: moment(),
    testId: 'dtpValueDate1',
    label: 'Value Date',
  };

  test('verify change event', async () => {
    const { getByTestId } = renderWithForm(<ValueDate {...defaultProps} />);

    const dateInput = await waitFor(() => getByTestId('dtpValueDate1'));
    fireEvent.mouseDown(dateInput);

    const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-04-11'));
    fireEvent.click(selectedDateElem);

    expect(valueDateOnChange).toHaveBeenCalledTimes(1);
  });

  test('verify onclick event on star', async () => {
    const { getByTestId } = renderWithForm(<ValueDate {...defaultProps} />);
    const star = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(star);
    expect(addPreferenceClick).toHaveBeenCalledTimes(1);
  });
});
