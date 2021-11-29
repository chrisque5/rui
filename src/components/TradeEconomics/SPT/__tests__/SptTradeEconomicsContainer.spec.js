import { renderWithForm } from 'test-utils/testUtils';
import SptTradeEconomicsContainer from '../SptTradeEconomicsContainer';

jest.mock('../../TradeEconomics.js', () => (component) => component);
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
};

describe('<SptTradeEconomicsContainer />', () => {
  test('<SptTradeEconomicsContainer /> renders snapshot as expected', () => {
    const { container } = renderWithForm(<SptTradeEconomicsContainer {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
