import { renderWithForm } from 'test-utils/testUtils';
import SpreadTradeEconomics from '../SpreadTradeEconomics';

jest.mock('moment', () => () => jest.requireActual('moment')('2020-06-01T00:00:00.000Z'));
const mockForm = {
  getFieldValue: () => {},
  resetFields: () => {},
};

const initialState = {
  ui: { isInterestEnabled: false },
  currencies: [],
};

const defaultProps = {
  form: mockForm,
  termOnBlur: jest.fn(),
  currencyOnChange: jest.fn(),
  valueDateOnChange: jest.fn(),
};

describe('<SpreadTradeEconomics />', () => {
  test('<SpreadTradeEconomics /> renders snapshot as expected', () => {
    const { container } = renderWithForm(<SpreadTradeEconomics {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
