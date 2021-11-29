import { fireEvent, renderWithForm, waitFor } from 'test-utils/testUtils';
import { act } from 'react-dom/test-utils';
import BrokerageContainer from '../brokerage/BrokerageContainer';
import { deal as mockDeal } from './MockDeal.json';
import * as uiActions from '../../../actions/uiActions';
import * as dealActions from '../../../actions/dealActions';
import { getOriginalBuyerBrokerage } from '../../../utils/selectors';

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

jest.mock('../../../utils/selectors.js', () => ({
  ...jest.requireActual('../../../utils/selectors.js'),
  getDeal: jest.fn().mockImplementation(() => mockDeal),
  getBuyerBrokerage: jest.fn().mockImplementation(() => mockDeal.trades[0].tradeEconomics.payer.brokerage),
  getOriginalBuyerBrokerage: jest.fn(),
  getSellerBrokerage: jest.fn().mockImplementation(() => mockDeal.trades[0].tradeEconomics.receiver.brokerage),
  getUserFullName: jest.fn().mockReturnValue('Test User'),
  getIsDealEditInProgress: jest.fn().mockReturnValue(true),
  getSelectedDealType: jest.fn().mockReturnValue('NDF'),
  getUpdatedDealObject: jest.fn().mockReturnValue({ value: 123, path: 'amount', side: 'payer' }),
  getCurrencies: jest.fn().mockReturnValue([
    {
      code: 'USD', name: 'USA DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'BB ', deletionFlag: ' ',
    },
    {
      code: 'SGD', name: 'SINGAPORE DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'AF ', deletionFlag: ' ',
    }]),
}));

jest.mock('../../../utils/helper', () => ({
  ...jest.requireActual('../../../utils/helper.js'),
  getUniqueID: jest.fn().mockReturnValue('1'),
}));

describe('<BrokerageContainer />', () => {
  const updateDealObjectSpy = jest.spyOn(uiActions, 'updateDealObject');
  const loadDealSuccessSpy = jest.spyOn(dealActions, 'loadDealSuccess');
  const changeReAllocationSpy = jest.spyOn(uiActions, 'changeReAllocation');

  afterEach(() => {
    jest.clearAllMocks();
    updateDealObjectSpy.mockClear();
    loadDealSuccessSpy.mockClear();
    changeReAllocationSpy.mockClear();
  });

  const defaultProps = { form: mockForm };

  const renderBrokerageContainer = () => renderWithForm(<BrokerageContainer {...defaultProps} />);

  test('renders snapshot as expected', () => {
    const { container } = renderBrokerageContainer();
    expect(container).toMatchSnapshot();
  });

  test('verify updateDealObject has been called on ccy change', async () => {
    await act(async () => {
      const { getByTestId, getAllByText } = await renderBrokerageContainer();

      const ccyDropDown = await waitFor(() => getByTestId('payer-currency').firstElementChild);
      fireEvent.mouseDown(ccyDropDown);

      const selectedCurrency = await waitFor(() => getAllByText('SGD', document.body));
      fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);
      expect(updateDealObjectSpy).toHaveBeenCalled();
    });
  });

  test('verify updateDealObject has been called on amount change', async () => {
    await act(async () => {
      const { getByTestId } = await renderBrokerageContainer();
      const amountInput = await waitFor(() => getByTestId('payer-amount'));
      fireEvent.change(amountInput, { target: { value: 123 } });
      fireEvent.blur(amountInput);
      expect(updateDealObjectSpy).toHaveBeenCalledTimes(1);
      expect(loadDealSuccessSpy).toHaveBeenCalledTimes(1);
      expect(changeReAllocationSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('verify previous value tool tip on amount change', async () => {
    await act(async () => {
      const originalBuyerBrokerage = {
        id: 401,
        brokerageInfo: 'calcBroFXSingleDeal',
        brokerageType: 'Auto',
        brokerageRequirement: 'ManualBrokerageRequired',
        strategyId: 401,
        currency: 'USD',
        amount: 100,
        stdAmount: 4,
        stdCurrency: 'AUD',
      };

      getOriginalBuyerBrokerage.mockImplementation(() => originalBuyerBrokerage);
      const { getByTestId, getByText } = await renderBrokerageContainer();
      const amountInput = await waitFor(() => getByTestId('payer-amount'));
      fireEvent.change(amountInput, { target: { value: 123 } });
      fireEvent.blur(amountInput);
      expect(updateDealObjectSpy).toHaveBeenCalledTimes(1);
      expect(loadDealSuccessSpy).toHaveBeenCalledTimes(1);
      expect(changeReAllocationSpy).toHaveBeenCalledTimes(1);

      fireEvent.mouseOver(amountInput);
      const toolTip = await waitFor(() => getByText('Previous Value: 100', document.body));
      expect(toolTip).toBeTruthy();
    });
  });
});
