import {
  renderWithProvider, waitFor, fireEvent, getByText, getByTestId,
} from 'test-utils/testUtils';
import { HashRouter, Route } from 'react-router-dom';
import NavbarContainer from '../NavbarContainer';
import { user } from './UserData.json';
import uiActions from '../../../actions/uiActions';

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({}));
jest.mock('../../../actions/uiActions', () => ({
  toggleSettingsModal: jest.fn(() => jest.fn(() => Promise.resolve(true))),
}));

const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({}));
const toggleSettingsSpy = jest.spyOn(uiActions, 'toggleSettingsModal');

const initialState = { user };

describe('<NavbarContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It renders', () => {
    const { container } = renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="FWD" /></Route></HashRouter>, { initialState });
    expect(container).toMatchSnapshot();
    expect(global.window.document.title).toBe('FWD - DMSWeb');
  });

  test('It renders correct document title', () => {
    renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="NDF" /></Route></HashRouter>, { initialState });
    expect(global.window.document.title).toBe('NDF - DMSWeb');
    renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="ADMIN" /></Route></HashRouter>, { initialState });
    expect(global.window.document.title).toBe('Admin - DMSWeb');
    renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="BLOTTER" /></Route></HashRouter>, { initialState });
    expect(global.window.document.title).toBe('Blotter - DMSWeb');
    renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="SPT" /></Route></HashRouter>, { initialState });
    expect(global.window.document.title).toBe('Spot - DMSWeb');
  });

  test.only('click Settings', async () => {
    const { container } = renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="FWD" /></Route></HashRouter>, { initialState });
    const userDropdown = await waitFor(() => getByTestId(container, 'ddlUserDropdown'));
    fireEvent.mouseOver(userDropdown);
    const btnSettings = await waitFor(() => getByTestId(container, 'btnSettings'));
    fireEvent.click(btnSettings);
    expect(toggleSettingsSpy).toHaveBeenCalledTimes(1);
  });

  test('Click Logout Cancel', async () => {
    const { container } = renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="FWD" /></Route></HashRouter>, { initialState });
    const userDropdown = await waitFor(() => getByTestId(container, 'ddlUserDropdown'));
    fireEvent.mouseOver(userDropdown);
    const btnLogout = await waitFor(() => getByTestId(document.body, 'btnLogout'));
    fireEvent.click(btnLogout);

    const cancelBtn = await waitFor(() => getByText(document.body, 'Cancel'));
    fireEvent.click(cancelBtn);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });

  test('Click Logout Success', async () => {
    const { container } = renderWithProvider(<HashRouter><Route><NavbarContainer selectedKey="FWD" /></Route></HashRouter>, { initialState });
    const userDropdown = await waitFor(() => getByTestId(container, 'ddlUserDropdown'));
    fireEvent.mouseOver(userDropdown);
    const btnLogout = await waitFor(() => getByTestId(document.body, 'btnLogout'));
    fireEvent.click(btnLogout);

    const logoutBtnConfirm = await waitFor(() => getByTestId(document.body, 'btnLogoutConfirm'));
    fireEvent.click(logoutBtnConfirm);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
    delete global.fetch;
  });
});
