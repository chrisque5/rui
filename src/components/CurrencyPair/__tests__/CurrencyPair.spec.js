import {
  renderWithForm, fireEvent, waitFor,
} from 'test-utils/testUtils';
import * as _ from 'lodash';
import CurrencyPair from '../CurrencyPair';
import { ids } from '../../../utils/constants';

const mockForm = {
  getFieldValue: (field) => {
    if (field === ids.CURRENCY_1) {
      return 'USD';
    }
    if (field === ids.CURRENCY_2) {
      return 'GBP';
    }
    if (field === ids.DEALT_CURRENCY) {
      return 'USD';
    }
    return 'dummy';
  },
  setFieldValue: (field) => field,

  resetFields: () => { },
};

const addPreferenceClick = jest.fn();
const currency1OnChange = jest.fn();
const currency2OnChange = jest.fn();
const dealtCurrencyOnChange = jest.fn();

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

const baseCurrencies = _.uniq(_.map(currencies, (currencyPair) => currencyPair.baseCurrency));
const counterCurrencies = currencies.map((currencyPair) => (currencyPair.baseCurrency === 'USD' ? currencyPair.counterCurrency : null));
const dealtCurrencies = ['USD', 'EUR'];

const defaultProps = {
  form: mockForm,
  addPreferenceClick,
  currency1Id: ids.CURRENCY_1,
  currency2Id: ids.CURRENCY_2,
  dealtCurrencyId: ids.DEALT_CURRENCY,
  testId: 'ddlCurrency',
  label: 'Currency Pair',
  currency1OnChange,
  currency2OnChange,
  dealtCurrencyOnChange,
  currencies,
  baseCurrencies,
  counterCurrencies,
  dealtCurrencies,
  isLoading: false,
};

describe('<CurrencyPair/>', () => {
  const renderComponent = () => renderWithForm(<CurrencyPair {...defaultProps} />);

  test('Currency 1 on change', async () => {
    const { getByTestId, getAllByText } = renderComponent();

    const currency1 = await waitFor(() => getByTestId('ddlCurrency1').firstElementChild);
    fireEvent.mouseDown(currency1);

    const selectedCurrency = await waitFor(() => getAllByText('USD', document.body));
    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(currency1OnChange).toHaveBeenCalledTimes(1);
  });

  test('Currency 2 on change', async () => {
    const { getByTestId, getAllByText } = renderComponent();

    const currency2 = await waitFor(() => getByTestId('ddlCurrency2').firstElementChild);
    fireEvent.mouseDown(currency2);

    const selectedCurrency = await waitFor(() => getAllByText('CAD', document.body));

    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(currency2OnChange).toHaveBeenCalledTimes(1);
  });

  test('Dealt Currency on change', async () => {
    const { getByTestId, getAllByText } = renderComponent();

    const dealtCurrency = await waitFor(() => getByTestId('ddlCurrency3').firstElementChild);
    fireEvent.mouseDown(dealtCurrency);

    const selectedCurrency = await waitFor(() => getAllByText('USD', document.body));

    fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);

    expect(dealtCurrencyOnChange).toHaveBeenCalledTimes(1);
  });

  test('Add to favorites', async () => {
    const { getByTestId } = renderComponent();
    const star = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(star);
    expect(addPreferenceClick).toHaveBeenCalledTimes(1);
  });
});
