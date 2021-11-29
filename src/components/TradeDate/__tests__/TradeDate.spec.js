import {
  renderWithForm, waitFor, fireEvent, getByTitle,
} from 'test-utils/testUtils';
import * as helpers from '../../../utils/helper';
import TradeDate from '../TradeDate';

jest.mock('moment', () => () => jest.requireActual('moment')('2020-07-22T00:00:00.000Z'));

const mockForm = {};
const tradeDateOnChange = jest.fn();
const defaultProps = {
  form: mockForm,
  id: 'tradeDate',
  isTradeDateEnabled: false,
  initialTime: '01012020',
  tradeDateOnChange,
};
describe('<TradeDate/>', () => {
  const renderComponent = () => renderWithForm(<TradeDate {...defaultProps} />);
  const setTodayOnNullSpy = jest.spyOn(helpers, 'setTodayOnNull');
  test('<TradeDate /> renders snapshot as expected', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('<TradeDate /> with prop.isTradeDateEnabled = false renders the DatePicker disabled', async () => {
    const { getByPlaceholderText } = renderComponent();
    const datePicker = await waitFor(() => getByPlaceholderText('Trade Date'));
    expect(datePicker.disabled).toBe(true);
  });

  test('<TradeDate /> with prop.isTradeDateEnabled = true renders the DatePicker enabled', async () => {
    const props = { ...defaultProps, isTradeDateEnabled: true };
    const { getByPlaceholderText } = renderWithForm(<TradeDate {...props} />);
    const datePicker = await waitFor(() => getByPlaceholderText('Trade Date'));
    expect(datePicker.disabled).toBe(false);
  });

  test('<TradeDate /> calls onChange functions when date selected', async () => {
    const props = { ...defaultProps, isTradeDateEnabled: true };
    const { getByPlaceholderText } = renderWithForm(<TradeDate {...props} />);

    const datePicker = await waitFor(() => getByPlaceholderText('Trade Date'));
    fireEvent.mouseDown(datePicker);

    const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-07-22'));
    fireEvent.click(selectedDateElem);

    expect(tradeDateOnChange).toHaveBeenCalledTimes(1);
    expect(setTodayOnNullSpy).toHaveBeenCalledTimes(1);
  });
});
