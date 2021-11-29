import { renderWithForm, fireEvent, waitFor } from 'test-utils/testUtils';
import * as userActions from '../../../actions/userActions';
import CurrencyPairContainer from '../CurrencyPairContainer';
import { ids, dealTypes } from '../../../utils/constants';

jest.mock('../../../utils/helper', () => ({
  doesArrayExistWithValue: jest.fn().mockReturnValue(true),
  findCurrencyPair: jest.fn().mockReturnValue({}),
}));

const mockForm = {
  getFieldValue: (field) => {
    if (field === ids.CURRENCY_1) {
      return 'USD';
    }
    if (field === ids.CURRENCY_2) {
      return 'CAD';
    }
    if (field === ids.DEALT_CURRENCY) {
      return 'USD';
    }
    return 'dummy';
  },
  setFieldValue: () => jest.fn(),
  setFieldsValue: () => jest.fn(),
  getFieldInstance: () => ({ focus: jest.fn() }),
  resetFields: () => {},
};

const resetFieldsSpy = jest.spyOn(mockForm, 'resetFields');
const addCurrencyPairPreferenceSpy = jest.spyOn(userActions, 'addCurrencyPairPreference');

const onChangeAfterEffects = jest.fn();
const dealType = dealTypes.FWD;
const defaultProps = {
  form: mockForm,
  onChangeAfterEffects,
  dealType,
  testId: 'ddlCurrency',
  label: 'Currency',
};
const currencies = [
  {
    baseCurrency: 'USD',
    counterCurrency: 'CAD',
    instrumentId: 10602,
    baseCurrencyDayCountYear: '360',
    counterCurrencyDayCountYear: '360',
    scalingFactor: 0.0001,
  },
  {
    baseCurrency: 'EUR',
    counterCurrency: 'GBP',
    instrumentId: 10301,
    baseCurrencyDayCountYear: '360',
    counterCurrencyDayCountYear: '360',
    scalingFactor: 0.0001,
  },
];

const createStore = (ratesFeed = false, isTradeDateEnabled = false) => ({
  user: { preferences: { settings: { ratesFeed } } },
  ui: {
    isTradeDateEnabled,
    selectedPreferenceBroker: '8158,100115',
  },
  currencies,
  currencyActions: {
    loadCurrencies: jest.fn()
      .mockReturnValue(currencies),
  },
});

describe('<CurrencyPairContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('addToPreference()', () => {
    const initialState = createStore();
    const { getByTestId } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });
    const addPreference = getByTestId('addPreference');
    fireEvent(
      addPreference,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(addCurrencyPairPreferenceSpy).toHaveBeenCalledTimes(1);
    expect(addCurrencyPairPreferenceSpy).toHaveBeenCalledWith('8158,100115', 'USD', 'CAD', 'USD');
  });

  test('currency1OnChange() resets fields if rates feed disabled', async () => {
    const initialState = createStore();
    const { getByTestId, getAllByText } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });

    const currency1 = await waitFor(() => getByTestId('ddlCurrency1').firstElementChild);
    fireEvent.mouseDown(currency1);

    const selectedCurrency = await waitFor(() => getAllByText('USD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(resetFieldsSpy).toHaveBeenCalledTimes(1);
    expect(resetFieldsSpy).toHaveBeenCalledWith([ids.RATE_1, ids.RATE_2, ids.POINTS]);
  });

  test('currency1OnChange() resets fields if trade date enabled', async () => {
    const initialState = createStore(true, true);
    const { getByTestId, getAllByText } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });

    const currency1 = await waitFor(() => getByTestId('ddlCurrency1').firstElementChild);
    fireEvent.mouseDown(currency1);

    const selectedCurrency = await waitFor(() => getAllByText('USD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(resetFieldsSpy).toHaveBeenCalledTimes(1);
    expect(resetFieldsSpy).toHaveBeenCalledWith([ids.RATE_1, ids.RATE_2, ids.POINTS]);
  });

  test('currency1OnChange() does not reset fields if rates feed enabled', async () => {
    const initialState = createStore(true);
    const { getByTestId, getAllByText } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });

    const currency1 = await waitFor(() => getByTestId('ddlCurrency1').firstElementChild);
    fireEvent.mouseDown(currency1);

    const selectedCurrency = await waitFor(() => getAllByText('USD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(resetFieldsSpy).toHaveBeenCalledTimes(0);
  });

  test('currency2OnChange() resets fields if rates feed disabled', async () => {
    const initialState = createStore();
    const { getByTestId, getAllByText } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });

    const currency2 = await waitFor(() => getByTestId('ddlCurrency2').firstElementChild);
    fireEvent.mouseDown(currency2);

    const selectedCurrency = await waitFor(() => getAllByText('CAD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(resetFieldsSpy).toHaveBeenCalledTimes(1);
    expect(resetFieldsSpy).toHaveBeenCalledWith([ids.RATE_1, ids.RATE_2, ids.POINTS]);
  });

  test('currency2OnChange() resets fields if trade date enabled', async () => {
    const initialState = createStore(true, true);
    const { getByTestId, getAllByText } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });

    const currency2 = await waitFor(() => getByTestId('ddlCurrency2').firstElementChild);
    fireEvent.mouseDown(currency2);

    const selectedCurrency = await waitFor(() => getAllByText('CAD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(resetFieldsSpy).toHaveBeenCalledTimes(1);
    expect(resetFieldsSpy).toHaveBeenCalledWith([ids.RATE_1, ids.RATE_2, ids.POINTS]);
  });

  test('currency2OnChange() does not reset fields if rates feed enabled', async () => {
    const initialState = createStore(true);
    const { getByTestId, getAllByText } = renderWithForm(<CurrencyPairContainer {...defaultProps} />, { initialState });

    const currency2 = await waitFor(() => getByTestId('ddlCurrency2').firstElementChild);
    fireEvent.mouseDown(currency2);

    const selectedCurrency = await waitFor(() => getAllByText('CAD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(resetFieldsSpy).toHaveBeenCalledTimes(0);
  });
});
