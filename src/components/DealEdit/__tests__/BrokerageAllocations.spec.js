import { fireEvent, renderWithForm, waitFor } from 'test-utils/testUtils';
import { act } from 'react-dom/test-utils';
import BrokerageAllocations from '../brokerage/BrokerageAllocations';
import { deal as mockDeal } from './MockDeal.json';
import * as uiActions from '../../../actions/uiActions';
import * as notifications from '../../../utils/notifications';

const mockForm = {
  getFieldValue: jest.fn().mockImplementation((field) => {
    if (field === 'payer-amount') {
      return 123;
    }
    return 'dummy';
  }),
  setFieldsValue: (field) => field,
  validateFields: () => jest.fn().mockReturnValue(true),
};

jest.mock('moment', () => () => jest.requireActual('moment')('2021-07-12'));

jest.mock('../../../utils/helper', () => ({
  getUniqueID: jest.fn().mockReturnValue('1'),
  showPreviousValueToolTip: jest.fn().mockReturnValue({}),
}));

jest.mock('../../../utils/selectors.js', () => ({
  getIsDealEditInProgress: jest.fn().mockReturnValue(true),
  getCurrencies: jest.fn().mockReturnValue([
    {
      code: 'USD', name: 'USA DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'BB ', deletionFlag: ' ',
    },
    {
      code: 'SGD', name: 'SINGAPORE DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'AF ', deletionFlag: ' ',
    }]),
  getSelectedDealType: jest.fn().mockReturnValue('NDF'),
  getReAllocationSide: jest.fn().mockReturnValue('payer'),
  getBrokers: jest.fn().mockReturnValue([{
    id: 13660,
    name: 'IAN GABLE',
    profitCentres: [
      {
        profitCentreId: 441,
        profitCentreName: 'LONDON NDF',
        defaultMapping: true,
      },
      {
        profitCentreId: 442,
        profitCentreName: 'HKG NDF',
        defaultMapping: false,
      },
    ],
    owningAgent: 'TP (EUROPE)LTD X TD LON',
    owningAgentId: 105825,
  }, {
    id: 51508,
    name: 'ALICE LIM',
    profitCentres: [
      {
        profitCentreId: 100,
        profitCentreName: 'NON DELIVERY FORWARD',
        defaultMapping: true,
      },
      {
        profitCentreId: 442,
        profitCentreName: 'HKG NDF',
        defaultMapping: false,
      },
    ],
    owningAgent: 'TULLETT PREBON SGP SIN',
    owningAgentId: 105817,
  }]),
  getUserFullName: jest.fn().mockReturnValue('Test User'),
  getBuyerPrimaryBroker: jest.fn().mockReturnValue({ brokerGcdPostingId: 13660, brokerGcdPostingName: 'IAN GABLE' }),
  getSellerPrimaryBroker: jest.fn().mockReturnValue({ brokerGcdPostingId: 13660, brokerGcdPostingName: 'IAN GABLE' }),
}));

describe('<BrokerageAllocations />', () => {
  const updateDealObjectSpy = jest.spyOn(uiActions, 'updateDealObject');
  const warningNotificationSpy = jest.spyOn(notifications, 'showWarningNotification');

  afterEach(() => {
    jest.clearAllMocks();
    updateDealObjectSpy.mockClear();
    warningNotificationSpy.mockClear();
  });

  const defaultProps = {
    form: mockForm,
    brokerage: mockDeal.trades[0].tradeEconomics.payer.brokerage,
    side: 'payer',
  };
  const renderBrokerageAllocations = () => renderWithForm(<BrokerageAllocations {...defaultProps} />);

  test('renders snapshot as expected', () => {
    const { container } = renderBrokerageAllocations();
    expect(container).toMatchSnapshot();
  });

  test('verify Primary Broker cannot be removed', async () => {
    await act(async () => {
      const { getAllByRole } = await renderBrokerageAllocations();
      const addRowBtns = await waitFor(() => getAllByRole('button', { name: /plus-circle/i }));
      expect(addRowBtns.length).toBe(2);

      const deleteRowBtns = await waitFor(() => getAllByRole('button', { name: /minus-circle/i }));
      expect(deleteRowBtns.length).toBe(1);
    });
  });

  test('verify updateDealObject has been called on add or remove row', async () => {
    await act(async () => {
      const { getByTestId } = await renderBrokerageAllocations();

      const addRowBtn = await waitFor(() => getByTestId('btn-300-Add'));
      fireEvent.click(addRowBtn);
      expect(updateDealObjectSpy).toHaveBeenCalled();

      const deleteRowBtn = await waitFor(() => getByTestId('btn-301-Delete'));
      fireEvent.click(deleteRowBtn);
      expect(updateDealObjectSpy).toHaveBeenCalled();
    });
  });

  test('verify updateDealObject has been called on amount change', async () => {
    await act(async () => {
      const { getByTestId, getByText } = await renderBrokerageAllocations();
      const brokerageInput = await waitFor(() => getByTestId('300-brokerage'));

      fireEvent.change(brokerageInput, { target: { value: '' } });
      await fireEvent.blur(brokerageInput);
      let errorTxt = await waitFor(() => getByText('Brokerage required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(brokerageInput, { target: { value: 'abcd' } });
      await fireEvent.blur(brokerageInput);
      errorTxt = await waitFor(() => getByText('Brokerage required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(brokerageInput, { target: { value: 0 } });
      await fireEvent.blur(brokerageInput);
      errorTxt = await waitFor(() => getByText('Brokerage required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(brokerageInput, { target: { value: 1 } });
      await fireEvent.blur(brokerageInput);
      expect(updateDealObjectSpy).toHaveBeenCalled();

      fireEvent.change(brokerageInput, { target: { value: 123 } });
      await fireEvent.blur(brokerageInput);
      errorTxt = await waitFor(() => getByText('Receive Brokerage should not be larger than 1'));
      expect(errorTxt).toBeTruthy();
    });
  });

  test('verify updateDealObject has been called on percentage change', async () => {
    await act(async () => {
      const { getByTestId, getByText } = await renderBrokerageAllocations();
      const percentageInput = await waitFor(() => getByTestId('300-percentage'));

      fireEvent.change(percentageInput, { target: { value: '' } });
      await fireEvent.blur(percentageInput);
      let errorTxt = await waitFor(() => getByText('Allocation % required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(percentageInput, { target: { value: 'abcd' } });
      await fireEvent.blur(percentageInput);
      errorTxt = await waitFor(() => getByText('Allocation % required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(percentageInput, { target: { value: 0 } });
      await fireEvent.blur(percentageInput);
      errorTxt = await waitFor(() => getByText('Allocation % required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(percentageInput, { target: { value: 1 } });
      await fireEvent.blur(percentageInput);
      expect(updateDealObjectSpy).toHaveBeenCalled();

      fireEvent.change(percentageInput, { target: { value: 123 } });
      await fireEvent.blur(percentageInput);
      errorTxt = await waitFor(() => getByText('Allocation % should not be larger than 100'));
      expect(errorTxt).toBeTruthy();
    });
  });

  test('verify updateDealObject has been called on Broker change', async () => {
    await act(async () => {
      const { getByTestId, getAllByText } = await renderBrokerageAllocations();

      const brokerDropDown = await waitFor(() => getByTestId('301-brokerGcdPostingName').firstElementChild);
      fireEvent.mouseDown(brokerDropDown);

      const selectedBroker = await waitFor(() => getAllByText('ALICE LIM', document.body));
      fireEvent.click(selectedBroker[selectedBroker.length - 1]);
      expect(updateDealObjectSpy).toHaveBeenCalled();
    });
  });

  test('verify updateDealObject has been called on Profit Center change', async () => {
    await act(async () => {
      const { getByTestId, getAllByText } = await renderBrokerageAllocations();

      const brokerDropDown = await waitFor(() => getByTestId('301-profitCenter').firstElementChild);
      fireEvent.mouseDown(brokerDropDown);

      const selectedProfitCenter = await waitFor(() => getAllByText('HKG NDF', document.body));
      fireEvent.click(selectedProfitCenter[selectedProfitCenter.length - 1]);
      expect(updateDealObjectSpy).toHaveBeenCalled();
    });
  });
});
