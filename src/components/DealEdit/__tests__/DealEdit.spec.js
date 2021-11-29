import { HashRouter, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent, renderWithProvider, waitFor } from 'test-utils/testUtils';
import { compare } from 'fast-json-patch';
import * as uiActions from '../../../actions/uiActions';
import * as dealActions from '../../../actions/dealActions';
import * as notifications from '../../../utils/notifications';
import DealEdit from '../DealEdit';
import { deal as mockDeal } from './MockDeal.json';
import { getIsDealEditInProgress } from '../../../utils/selectors';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('moment', () => () => jest.requireActual('moment')('2021-07-12'));

jest.mock('fast-json-patch', () => ({
  ...jest.requireActual('fast-json-patch'),
  compare: jest.fn(),
}));

jest.mock('../../../utils/helper', () => ({
  getUniqueID: jest.fn().mockReturnValue('1'),
  showPreviousValueToolTip: jest.fn().mockReturnValue({ toolTip: '', cls: '' }),
}));

jest.mock('../../../utils/selectors.js', () => ({
  ...jest.requireActual('../../../utils/selectors.js'),
  getDeal: jest.fn().mockImplementation(() => mockDeal),
  getBuyerBrokerage: jest.fn().mockImplementation(() => mockDeal.trades[0].tradeEconomics.payer.brokerage),
  getSellerBrokerage: jest.fn().mockImplementation(() => mockDeal.trades[0].tradeEconomics.receiver.brokerage),
  getIsDealEditInProgress: jest.fn(),
  getSelectedDealType: jest.fn().mockReturnValue('NDF'),
  getCurrencies: jest.fn().mockReturnValue([
    {
      code: 'USD', name: 'USA DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'BB ', deletionFlag: ' ',
    },
    {
      code: 'SGD', name: 'SINGAPORE DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'AF ', deletionFlag: ' ',
    }]),
  getBrokers: jest.fn().mockReturnValue([]),
  getUser: jest.fn().mockReturnValue({
    permissions: {
      validForDealEdit: true,
      validForNdf: true,
    },
    fullName: 'Test User',
    preferences: {
      settings: {},
      defaults: { defaultEntryPage: 'NDF' },
    },
  }),
  getUserPermissions: jest.fn().mockReturnValue({
    validForDealEdit: true,
    validForNdf: true,
  }),
  getUserFullName: jest.fn().mockReturnValue('Test User'),
  getUserPreferenceSettings: jest.fn().mockReturnValue({}),
  getIsSettingsModalVisible: jest.fn().mockReturnValue(true),
  getUserPreferencesDefaults: jest.fn().mockReturnValue({
    lastDealType: 'NDF',
    dealDefaults: [],
    defaultEntryPage: 'NDF',
  }),
}));

describe('<DealEdit />', () => {
  const initialState = {};
  const defaultProps = { match: { params: { dealId: 400 } } };

  const changeDealEditStatusSpy = jest.spyOn(uiActions, 'changeDealEditStatus');
  const updateDealObjectSpy = jest.spyOn(uiActions, 'updateDealObject');
  const loadDealSuccessSpy = jest.spyOn(dealActions, 'loadDealSuccess');
  const updateOriginalDealSpy = jest.spyOn(dealActions, 'updateOriginalDeal');
  const loadDealSpy = jest.spyOn(dealActions, 'loadDeal');
  const editDealSpy = jest.spyOn(dealActions, 'editDeal');
  const errorNotificationSpy = jest.spyOn(notifications, 'showErrorNotification');

  afterEach(() => {
    jest.clearAllMocks();
    changeDealEditStatusSpy.mockClear();
    updateDealObjectSpy.mockClear();
    loadDealSuccessSpy.mockClear();
    updateOriginalDealSpy.mockClear();
    loadDealSpy.mockClear();
    editDealSpy.mockClear();
    errorNotificationSpy.mockClear();
  });

  const renderDealEdit = () => renderWithProvider(
    <HashRouter>
      <Route>
        <DealEdit {...defaultProps} />
      </Route>
    </HashRouter>,
    { initialState },
  );

  test('renders snapshot as expected', () => {
    const { container } = renderDealEdit();
    expect(container).toMatchSnapshot();
  });

  test('verify save enabled/disabled after edit, Refresh', async () => {
    await act(async () => {
      const { getByTestId } = await renderDealEdit();
      getIsDealEditInProgress.mockImplementation(() => false);
      const saveBtn = await waitFor(() => getByTestId('btnDealSave'));
      const editBtn = await waitFor(() => getByTestId('btnEditDeal'));
      const refreshBtn = await waitFor(() => getByTestId('btnRefresh'));
      const discardBtn = await waitFor(() => getByTestId('btnDiscard'));
      expect(loadDealSpy).toHaveBeenCalledTimes(1);
      expect(saveBtn.getAttribute('disabled')).toBe('');
      expect(editBtn.getAttribute('disabled')).toBe(null);
      expect(refreshBtn.getAttribute('disabled')).toBe(null);
      expect(discardBtn.getAttribute('style').indexOf('display: none')).toBe(19);

      fireEvent.click(editBtn);
      expect(changeDealEditStatusSpy).toHaveBeenCalledTimes(1);
      fireEvent.click(discardBtn);
      expect(loadDealSuccessSpy).toHaveBeenCalledTimes(1);
      expect(updateOriginalDealSpy).toHaveBeenCalled();
      expect(changeDealEditStatusSpy).toHaveBeenCalledTimes(2);

      expect(saveBtn.getAttribute('disabled')).toBe('');
      expect(editBtn.getAttribute('style').indexOf('display: block')).toBe(19);
      expect(discardBtn.getAttribute('style').indexOf('display: none')).toBe(19);

      fireEvent.click(refreshBtn);
      expect(changeDealEditStatusSpy).toHaveBeenCalledTimes(3);
      expect(loadDealSuccessSpy).toHaveBeenCalledTimes(2);
      expect(updateOriginalDealSpy).toHaveBeenCalled();
      expect(loadDealSpy).toHaveBeenCalledTimes(2);
    });
  });

  test('verify notification when nothing changes to save', async () => {
    await act(async () => {
      getIsDealEditInProgress.mockImplementation(() => true);
      const { getByTestId } = await renderDealEdit();
      const editBtn = await waitFor(() => getByTestId('btnEditDeal'));
      fireEvent.click(editBtn);
      expect(changeDealEditStatusSpy).toHaveBeenCalledTimes(1);
      expect(updateOriginalDealSpy).toHaveBeenCalledTimes(1);

      const saveBtn = await waitFor(() => getByTestId('btnDealSave'));
      fireEvent.click(saveBtn);
    });
    expect(errorNotificationSpy).toHaveBeenCalled();
    const errorDescription = 'Validation Error';
    const errorMessage = 'At least one field must be changed before submitting deal';
    expect(errorNotificationSpy).toBeCalledWith(errorDescription, errorMessage);
  });

  test('verify notification when mandatory fields missing', async () => {
    await act(async () => {
      getIsDealEditInProgress.mockImplementation(() => true);
      const { getByTestId } = await renderDealEdit();

      const addRowBtn = await waitFor(() => getByTestId('btn-300-Add'));
      fireEvent.click(addRowBtn);

      const input = await waitFor(() => getByTestId('payer-amount'));
      fireEvent.change(input, { target: { value: '' } });

      const saveBtn = await waitFor(() => getByTestId('btnDealSave'));
      fireEvent.click(saveBtn);
    });
    expect(errorNotificationSpy).toHaveBeenCalled();
    const errorDescription = 'Validation Error';
    const errorMessage = 'Please review validation errors';
    expect(errorNotificationSpy).toBeCalledWith(errorDescription, errorMessage);
  });

  test('verify updateDealObject has been called on ccy change', async () => {
    await act(async () => {
      getIsDealEditInProgress.mockImplementation(() => true);
      const { getByTestId, getAllByText } = await renderDealEdit();

      const ccyDropDown = await waitFor(() => getByTestId('payer-currency').firstElementChild);
      fireEvent.mouseDown(ccyDropDown);

      const selectedCurrency = await waitFor(() => getAllByText('SGD', document.body));
      fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);
      expect(updateDealObjectSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('verify validationAllocations and save modal description visible when all values are correct', async () => {
    await act(async () => {
      getIsDealEditInProgress.mockImplementation(() => true);
      compare.mockImplementation(() => ['Diff found']);
      const { getByTestId, getAllByText, getByText } = await renderDealEdit();

      const ccyDropDown = await waitFor(() => getByTestId('payer-currency').firstElementChild);
      fireEvent.mouseDown(ccyDropDown);

      const selectedCurrency = await waitFor(() => getAllByText('SGD', document.body));
      fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);
      expect(updateDealObjectSpy).toHaveBeenCalledTimes(1);

      const saveBtn = await waitFor(() => getByTestId('btnDealSave'));
      fireEvent.click(saveBtn);

      const saveDescText = await waitFor(() => getByText('Save Description', document.body));
      expect(saveDescText).toBeTruthy();

      const inputText = await waitFor(() => getByTestId('editDescription'));
      fireEvent.change(inputText, { target: { value: 'edit' } });

      const okBtn = await waitFor(() => getByTestId('btnOk'));
      fireEvent.click(okBtn);
      expect(editDealSpy).toHaveBeenCalledTimes(1);
    });
  });
});
