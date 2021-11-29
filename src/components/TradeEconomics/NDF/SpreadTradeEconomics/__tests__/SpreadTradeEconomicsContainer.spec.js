import { renderWithForm } from 'test-utils/testUtils';
import SpreadTradeEconomicsContainer from '../SpreadTradeEconomicsContainer';

jest.mock('../../../TradeEconomics.js', () => (component) => component);
jest.mock('moment', () => () => jest.requireActual('moment')('2020-06-01T00:00:00.000Z'));
const mockForm = {
  getFieldValue: () => {},
  resetFields: () => {},
};

const initialState = {
  currencies: [],
  ui: { isInterestEnabled: false },
};

const defaultProps = {
  form: mockForm,
  pointsOnChange: jest.fn(),
  rate1OnChange: jest.fn(),
  rate2OnChange: jest.fn(),
};

describe('<SpreadTradeEconomicsContainer />', () => {
  test('<SpreadTradeEconomicsContainer /> renders snapshot as expected', () => {
    const { container } = renderWithForm(<SpreadTradeEconomicsContainer {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
