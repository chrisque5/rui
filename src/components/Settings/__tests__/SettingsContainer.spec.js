import { useState as useStateMock } from 'react';
import { render, waitFor, fireEvent } from 'test-utils/testUtils';
import redux from 'react-redux';
import SettingsContainer from '../SettingsContainer';

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
    validForBlotterEdit: true,
    validForBlotterView: true,
    validForFwd: true,
    validForNdf: true,
    validForSpt: true,
    validForDeskEdit: true,
    validForSEFDealApprove: true,
    validForNonSEFdealApprove: true,
  }),
  getUserPreferencesDefaults: jest.fn().mockReturnValue({
    defaultEntryPage: 'FWD',
  }),
}));

describe('<SettingsContainer/>', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setState]);
  });

  test('onBack', async () => {
    const { getByTestId } = render(<SettingsContainer dealType="FWD" />);
    const btnBack = await waitFor(() => getByTestId('btnBack'));
    fireEvent.click(btnBack);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test.skip('onChanged', async () => {
    const { getByTestId, getByText } = render(<SettingsContainer dealType="NDF" />);
    fireEvent.click(getByText(/Tailor Rates Feed/i));
    const button = getByTestId('chkSwitch-ratesFeed');
    expect(button.textContent).toBe('on');
    fireEvent.click(button);
    const btnSave = await waitFor(() => getByTestId('btnSave'));
    fireEvent.click(btnSave);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('onSave', async () => {
    const { getByTestId } = render(<SettingsContainer dealType="NDF" />);
    const btnSave = await waitFor(() => getByTestId('btnSave'));
    fireEvent.click(btnSave);
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
