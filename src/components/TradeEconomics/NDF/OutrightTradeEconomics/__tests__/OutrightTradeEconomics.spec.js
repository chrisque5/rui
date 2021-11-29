import { renderWithForm } from 'test-utils/testUtils';
import OutrightTradeEconomics from '../OutrightTradeEconomics';

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
  rateOnChange: jest.fn(),
  valueDateOnChange: jest.fn(),
};

describe('<OutrightTradeEconomics />', () => {
  test('<OutrightTradeEconomics /> renders snapshot as expected', () => {
    const { container } = renderWithForm(<OutrightTradeEconomics {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
