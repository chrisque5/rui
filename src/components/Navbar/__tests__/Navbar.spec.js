import { useState as useStateMock } from 'react';
import { render, waitFor, fireEvent } from 'test-utils/testUtils';
import { HashRouter, Route } from 'react-router-dom';
import redux from 'react-redux';
import SettingsContainer from '../../Settings/SettingsContainer';
import Navbar from '../Navbar';
import { user } from './UserData.json';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: () => () => { },
  useCallback: () => () => { },
  useEffect: () => () => { },
}));

const dispatchSpy = jest.spyOn(redux, 'useDispatch');
afterEach(() => {
  dispatchSpy.mockClear();

  // clear all mocked functions
  jest.clearAllMocks();
});

jest.mock('../../../utils/selectors.js', () => ({
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
    validForNdf: true,
  }),
  getUserPreferencesDefaults: jest.fn().mockReturnValue({
    lastDealType: 'FWD',
    dealDefaults: [],
    defaultEntryPage: 'NDF',
  }),
}));

const defaultProps = {
  selectedKey: 'FWD',
  fullName: 'User Fullname',
  logout: jest.fn(),
  settings: jest.fn(),
  permissions: { ...user.permissions },
  shouldRenderLinks: true,
  onNavMenuItemChange: jest.fn(),
};

describe('<Navbar />', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });

  describe('with links enabled', () => {
    test('renders snapshot as expected', () => {
      const { container } = render(
        <HashRouter>
          <Route>
            <Navbar {...defaultProps}><SettingsContainer dealType="FWD" /></Navbar>
          </Route>
        </HashRouter>,
      );
      expect(container).toMatchSnapshot();
    });

    test('clicking settings works as expected', async () => {
      const { getByTestId } = render(
        <HashRouter>
          <Route>
            <Navbar {...defaultProps}><SettingsContainer dealType="FWD" /></Navbar>
          </Route>
        </HashRouter>,
      );
      const userDropdown = await waitFor(() => getByTestId('ddlUserDropdown'));
      fireEvent.mouseOver(userDropdown);
      const btnSettings = await waitFor(() => getByTestId('btnSettings'));
      fireEvent.click(btnSettings);
      expect(defaultProps.settings).toHaveBeenCalledTimes(1);
    });

    test.skip('clicking Logout works as expected', async () => {
      const { getByTestId } = render(
        <HashRouter>
          <Route>
            <Navbar {...defaultProps}><SettingsContainer dealType="FWD" /></Navbar>
          </Route>
        </HashRouter>,
      );
      const userDropdown = await waitFor(() => getByTestId('ddlUserDropdownContainer'));
      fireEvent.mouseOver(userDropdown);
      const btnLogout = await waitFor(() => getByTestId('btnLogout'));
      fireEvent.click(btnLogout);
      expect(defaultProps.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('with links not enabled', () => {
    test('renders snapshot as expected', () => {
      const { container } = render(
        <HashRouter>
          <Route>
            <Navbar {...defaultProps} shouldRenderLinks={false}><SettingsContainer dealType="FWD" /></Navbar>
          </Route>
        </HashRouter>,
      );
      expect(container).toMatchSnapshot();
    });

    test('clicking settings works as expected', async () => {
      const { getByTestId } = render(
        <HashRouter>
          <Route>
            <Navbar {...defaultProps} shouldRenderLinks={false}><SettingsContainer dealType="FWD" /></Navbar>
          </Route>
        </HashRouter>,
      );
      const userDropdown = await waitFor(() => getByTestId('ddlUserDropdown'));
      fireEvent.mouseOver(userDropdown);
      const btnSettings = await waitFor(() => getByTestId('btnSettings'));
      fireEvent.click(btnSettings);
      expect(defaultProps.settings).toHaveBeenCalledTimes(1);
    });

    test.skip('clicking Logout works as expected', async () => {
      const { getByTestId } = render(
        <HashRouter>
          <Route>
            <Navbar {...defaultProps} shouldRenderLinks={false}><SettingsContainer dealType="FWD" /></Navbar>
          </Route>
        </HashRouter>,
      );
      const userDropdown = await waitFor(() => getByTestId('ddlUserDropdown'));
      fireEvent.mouseOver(userDropdown);
      const btnLogout = await waitFor(() => getByTestId('btnLogout'));
      fireEvent.click(btnLogout);
      expect(defaultProps.logout).toHaveBeenCalledTimes(1);
    });
  });
});
