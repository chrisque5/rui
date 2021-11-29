import { renderWithProvider } from 'test-utils/testUtils';
import SptTradeCaptureContainer from '../SptTradeCaptureContainer';
import { ids } from '../../../../utils/constants';

jest.mock('../../TradeCapture', () => (component) => component);
jest.mock('../../../../utils/helper', () => ({
  doesArrayExistWithValue: jest.fn().mockReturnValue(true),
  getDateTimeInLocalTZ: jest.fn().mockReturnValue({ momentTz: 1586386800000 }),
  filterSpotExecutionVenues: jest.fn().mockReturnValue([]),
  findCurrencyPair: jest.fn().mockReturnValue({}),
}));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-06-01T00:00:00.000Z'));
const mockForm = {
  getFieldValue: (field) => (field === ids.IS_TRADE_DATE_ENABLED ? false : null),
  resetFields: () => { },
};

const initialState = {
  agents: [],
  brokers: [],
  clients: [],
  currencies: [],
  executionVenues: [],
  ui: { isInterestEnabled: false, clientHoverInfo: {}, isThirdCPChecked: false },
  user: { preferences: { settings: { displayExecutionVenueColours: false }, preferredBrokers: [] } },
};

const getSubmitButtonStyle = jest.fn().mockReturnValue({
  marginLeft: 3, backgroundColor: '#199bbe', borderColor: '#199bbe', btnText: 'Submit',
});

const defaultProps = {
  form: mockForm,
  resetForm: jest.fn(),
  isSubmitInProgress: false,
  getSubmitButtonStyle,
  setDefaults: jest.fn(),
  getDefaultsForDeal: jest.fn(),
  validateDeal: jest.fn(),
  submitDeal: jest.fn(),
  isSubmitButtonDisabled: jest.fn().mockReturnValue(false),
};

describe('<SptTradeCaptureContainer />', () => {
  test('<SptTradeCaptureContainer /> renders snapshot as expected', () => {
    const { container } = renderWithProvider(<SptTradeCaptureContainer {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
