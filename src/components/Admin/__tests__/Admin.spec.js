import { HashRouter, Route } from 'react-router-dom';
import { fireEvent, renderWithProvider, waitFor } from 'test-utils/testUtils';
import Admin from '../Admin';
import {} from '../../../utils/constants';

const initialState = {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('../../../utils/selectors.js', () => ({
  getUser: jest.fn().mockReturnValue({
    permissions: {
      validForDeskEdit: true,
      validForFwd: true,
    },
    fullName: 'Test User',
    preferences: {
      settings: {},
      defaults: { defaultEntryPage: 'NA' },
    },
  }),
  getIsBrowserForceRefreshEnabled: jest.fn().mockReturnValue(false),
  getUserPreferenceSettings: jest.fn().mockReturnValue({
    colourScheme: 'light',
    dealSubmitSound: 'ka-ching',
    displayClientFavourites: true,
    displayClients: true,
    displayCurrencyFavourites: true,
    displayExecutionVenueColours: true,
    displayExecutionVenueFavourites: true,
    displayTermFavourites: true,
    lrMode: false,
    ratesFeed: true,
  }),
  getIsSettingsModalVisible: jest.fn().mockReturnValue(true),
  getUserPermissions: jest.fn().mockReturnValue({
    validForDeskEdit: true,
    validForFwd: true,
  }),
  getUserPreferencesDefaults: jest.fn().mockReturnValue({
    lastDealType: 'FWD',
    dealDefaults: [],
    defaultEntryPage: 'NDF',
  }),
  getDesks: jest.fn().mockReturnValue([
    { key: 8159, displayValue: 'BELFAST RATES TPSIN DESK' },
    { key: 8160, displayValue: 'BELFAST RATES TPUS DESK' },
  ]),
  getBrokers: jest.fn().mockReturnValue([
    { id: 100120, name: 'BELFAST TPSIN TEST BROKER 3' },
    { id: 100121, name: 'BELFAST TPSIN TEST BROKER 4' }]),
  getGcdBrokers: jest.fn().mockReturnValue([
    { id: 100118, name: 'BELFAST TPSIN TEST BROKER 1' },
    { id: 100119, name: 'BELFAST TPSIN TEST BROKER 2' },
    { id: 100120, name: 'BELFAST TPSIN TEST BROKER 3' },
    { id: 100121, name: 'BELFAST TPSIN TEST BROKER 4' },
    { id: 100122, name: 'BELFAST TPSIN TEST BROKER 5' }]),
  getBrokerUpdateStatus: jest.fn().mockReturnValue(true),
  getResetAdminTabChanges: jest.fn().mockReturnValue(false),
  getCurrencies: jest.fn().mockReturnValue([{
    baseCurrency: 'GBP',
    counterCurrency: 'USD',
    instrumentId: 4315,
    baseCurrencyDayCountYear: '365',
    counterCurrencyDayCountYear: '365',
    scalingFactor: 0.00010000,
    primaryExerciseCurrencies: '',
    secondaryExerciseCurrencies: '',
    primaryDeliveryCurrencies: 'GBP',
    secondaryDeliveryCurrencies: 'USD',
    isCLS: false,
  }, {
    baseCurrency: 'USD',
    counterCurrency: 'CNH',
    instrumentId: 4310,
    baseCurrencyDayCountYear: '360',
    counterCurrencyDayCountYear: '360',
    scalingFactor: 0.00010000,
    primaryExerciseCurrencies: 'USD',
    secondaryExerciseCurrencies: 'CNH',
    primaryDeliveryCurrencies: 'USD',
    secondaryDeliveryCurrencies: 'CNH',
    isCLS: true,
  }]),
}));

describe('<Admin />', () => {
  test('renders snapshot as expected', () => {
    const defaultProps = { isTabDirty: true };
    const { container } = renderWithProvider(
      <HashRouter>
        <Route>
          <Admin {...defaultProps} />
        </Route>
      </HashRouter>,
      { initialState },
    );
    expect(container).toMatchSnapshot();
  });

  test('switch tabs', async () => {
    const defaultProps = { isTabDirty: true };
    const { getByText } = renderWithProvider(
      <HashRouter>
        <Route>
          <Admin {...defaultProps} />
        </Route>
      </HashRouter>,
      { initialState },
    );
    const currenciesTab = await waitFor(() => getByText('Brokers'));
    fireEvent.click(currenciesTab);
  });
});
