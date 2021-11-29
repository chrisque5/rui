import {
  render, fireEvent, waitFor,
} from 'test-utils/testUtils';
import Settings from '../Settings';

const getDefaultSetting = jest.fn();
const getUserDefault = jest.fn();

const onBack = jest.fn();
const onSave = jest.fn();
const onChanged = jest.fn();
const onUserDefaultChanged = jest.fn();
const firmSettingOnCallback = jest.fn();

const defaultProps = {
  visible: false,
  onSave,
  onBack,
  settings: {},
  userDefaults: {
    defaultEntryPage: {
      options: {
        ADMIN: {
          key: 'ADMIN', text: 'Admin', to: '/admin', documentTitle: 'Admin',
        },
        BLOTTER: {
          key: 'BLOTTER', target: '_blank', text: 'Blotter', to: '/blotter', documentTitle: 'Blotter',
        },
      },
    },
  },
  getDefaultSetting,
  getUserDefault,
  onChanged,
  onUserDefaultChanged,
  firmSettingOnCallback,
};

afterEach(() => {
  jest.clearAllMocks();
});

const renderUI = (props = {}) => {
  const rtlProps = render(<Settings {...defaultProps} {...props} />);

  return {
    ...rtlProps,
    rerender: (newProps) => rtlProps.rerender(<Settings {...defaultProps} {...props} {...newProps} />),
  };
};

test('<Settings /> renders snapshot as expected', () => {
  const { container } = renderUI();
  expect(container).toMatchSnapshot();
});

test('<Settings /> modal is displayed when the visible flag is set to true', () => {
  const { queryByText, rerender } = renderUI();
  let modal = queryByText('User settings');
  expect(modal).toBeNull();
  rerender({ visible: true });
  modal = queryByText('User settings');
  expect(modal).not.toBeNull();
});

test('<Settings /> Back button calls onBack function', () => {
  const { getByText } = renderUI({ visible: true });
  fireEvent.click(getByText(/Back/i));
  expect(onBack).toHaveBeenCalledTimes(1);
});

test('<Settings /> Save button calls onSave function', () => {
  const { getByText } = renderUI({ visible: true });
  fireEvent.click(getByText(/Save/i));
  expect(onSave).toHaveBeenCalledTimes(1);
});

describe('<Settings /> Tailor Rates Feed Section', () => {
  ['ratesFeed'].forEach((setting) => {
    test(`${setting} button click switches the button off and calls onChange function with false when default setting is true`,
      () => {
        getDefaultSetting.mockReturnValue(true);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/Tailor Rates Feed/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('on');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(false, expect.anything(), setting);
        expect(button.textContent).toBe('off');
      });

    test(`${setting} button click switches the button on and calls onChange function with true when default setting is false`,
      () => {
        getDefaultSetting.mockReturnValue(false);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/Tailor Rates Feed/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('off');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(true, expect.anything(), setting);
        expect(button.textContent).toBe('on');
      });
  });
});

describe('<Settings /> Client Manager Section', () => {
  [
    'displayClients', 'displayCurrencyFavourites',
    'displayTermFavourites', 'displayExecutionVenueFavourites',
  ].forEach((setting) => {
    test(`${setting} button click switches the button off and calls onChange function with false when default setting is true`,
      () => {
        getDefaultSetting.mockReturnValue(true);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/Client Manager/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('on');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(false, expect.anything(), setting);
        expect(button.textContent).toBe('off');
      });

    test(`${setting} button click switches the button on and calls onChange function with true when default setting is false`,
      () => {
        getDefaultSetting.mockReturnValue(false);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/Client Manager/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('off');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(true, expect.anything(), setting);
        expect(button.textContent).toBe('on');
      });
  });
});

describe('<Settings /> General Section', () => {
  ['displayExecutionVenueColours', 'displayClsDefaults'].forEach((setting) => {
    test(`${setting} button click switches the button off and calls onChange function with false when default setting is true`,
      () => {
        getDefaultSetting.mockReturnValue(true);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/General/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('on');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(false, expect.anything(), setting);
        expect(button.textContent).toBe('off');
      });

    test(`${setting} button click switches the button on and calls onChange function with true when default setting is false`,
      () => {
        getDefaultSetting.mockReturnValue(false);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/General/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('off');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(true, expect.anything(), setting);
        expect(button.textContent).toBe('on');
      });
  });

  test('Default Entry Page verify change event', async () => {
    const { getByTestId, getByText } = renderUI({ visible: true });
    fireEvent.click(getByText(/General/i));
    const dropdown = await waitFor(() => getByTestId('select-defaultEntryPage').firstElementChild);
    fireEvent.mouseDown(dropdown);

    const selectedElem = await waitFor(() => getByText(/Admin/));
    fireEvent.click(selectedElem);

    expect(onUserDefaultChanged).toHaveBeenCalledTimes(1);
  });
});

describe('<Settings /> FWD Trade Capture Section', () => {
  ['lrMode'].forEach((setting) => {
    test(`${setting} button click switches the button off and calls onChange function with false when default setting is true`,
      () => {
        getDefaultSetting.mockReturnValue(true);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/FWD Trade Capture/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('on');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(false, expect.anything(), setting);
        expect(button.textContent).toBe('off');
      });

    test(`${setting} button click switches the button on and calls onChange function with true when default setting is false`,
      () => {
        getDefaultSetting.mockReturnValue(false);
        const { getByText, getByTestId } = renderUI({ visible: true });
        fireEvent.click(getByText(/FWD Trade Capture/i));

        const button = getByTestId(`chkSwitch-${setting}`);

        expect(button.textContent).toBe('off');
        fireEvent.click(getByTestId(`chkSwitch-${setting}`));
        expect(onChanged).toHaveBeenCalledTimes(1);
        expect(onChanged).toHaveBeenCalledWith(true, expect.anything(), setting);
        expect(button.textContent).toBe('on');
      });
  });
});
