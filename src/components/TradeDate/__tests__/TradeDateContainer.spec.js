import { renderWithForm, waitFor, fireEvent } from 'test-utils/testUtils';
import TradeDateContainer from '../TradeDateContainer';
import { ids } from '../../../utils/constants';
import * as notifications from '../../../utils/notifications';

jest.mock('../../../utils/helper', () => ({ getDateTimeInLocalTZ: jest.fn().mockReturnValue({ momentTz: 1586386800000 }) }));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-06-01T00:00:00.000Z'));

const mockForm = {
  getFieldValue: (field) => {
    if (field === ids.IS_TRADE_DATE_ENABLED) {
      return true;
    }
    return 'dummy';
  },
  resetFields: () => {},
  setFieldsValue: () => jest.fn(),
};

const setFieldsValueSpy = jest.spyOn(mockForm, 'setFieldsValue');
const resetFieldsSpy = jest.spyOn(mockForm, 'resetFields');
const showWarningNotificationSpy = jest.spyOn(notifications, 'showWarningNotification');

const tradeDateOnChange = jest.fn();
const submitDealWithCustomDate = jest.fn();
const defaultProps = { form: mockForm, submitDealWithCustomDate, tradeDateOnChange };
const initialState = {
  user: { preferences: { settings: { ratesFeed: true } } },
  ui: { isTradeDateConfirmModalVisible: false, isTradeDateEnabled: false },
};

describe('<TradeDateContainer />', () => {
  afterEach(() => {
    setFieldsValueSpy.mockClear();
    resetFieldsSpy.mockClear();
    showWarningNotificationSpy.mockClear();
  });

  test('renders snapshot as expected', () => {
    const { container } = renderWithForm(<TradeDateContainer {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });

  test('initialises trade date/time when checkbox is enabled', async () => {
    const { getByTestId } = renderWithForm(<TradeDateContainer {...defaultProps} />, { initialState });
    const chkTradeDateEnabled = await waitFor(() => getByTestId(`chk-${ids.IS_TRADE_DATE_ENABLED}`));
    fireEvent.click(chkTradeDateEnabled);
    expect(setFieldsValueSpy).toHaveBeenCalledTimes(1);
    expect(setFieldsValueSpy).toHaveBeenCalledWith({
      [ids.TRADE_DATE]: { momentTz: 1586386800000 },
      [ids.TRADE_TIME]: { momentTz: 1586386800000 },
    });
  });

  test('shows warning message when checkbox is enabled and rates feed enabled', async () => {
    const { getByTestId } = renderWithForm(<TradeDateContainer {...defaultProps} />, { initialState });
    const chkTradeDateEnabled = await waitFor(() => getByTestId(`chk-${ids.IS_TRADE_DATE_ENABLED}`));
    fireEvent.click(chkTradeDateEnabled);
    expect(showWarningNotificationSpy).toHaveBeenCalledTimes(1);
  });

  test('does not show warning message when checkbox is enabled and rates feed disabled', async () => {
    const updatedState = {
      ...initialState,
      user: { preferences: { settings: { ratesFeed: false } } },
    };
    const { getByTestId } = renderWithForm(<TradeDateContainer {...defaultProps} />, { updatedState });
    const chkTradeDateEnabled = await waitFor(() => getByTestId(`chk-${ids.IS_TRADE_DATE_ENABLED}`));
    fireEvent.click(chkTradeDateEnabled);
    expect(showWarningNotificationSpy).toHaveBeenCalledTimes(0);
  });

  test('resets trade date/time when checkbox is disabled', async () => {
    const { getByTestId } = renderWithForm(<TradeDateContainer {...defaultProps} />, { initialState });
    const chkTradeDateEnabled = await waitFor(() => getByTestId(`chk-${ids.IS_TRADE_DATE_ENABLED}`));
    fireEvent.click(chkTradeDateEnabled);
    fireEvent.click(chkTradeDateEnabled);
    expect(resetFieldsSpy).toHaveBeenCalledTimes(1);
    expect(resetFieldsSpy).toHaveBeenCalledWith([ids.TRADE_DATE, ids.TRADE_TIME]);
    expect(tradeDateOnChange).toHaveBeenCalledTimes(1);
  });
});
