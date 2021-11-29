import { fireEvent, renderWithForm, waitFor } from 'test-utils/testUtils';
import { act } from 'react-dom/test-utils';
import BrokerageAmount from '../brokerage/BrokerageAmount';
import { deal as mockDeal } from './MockDeal.json';
import * as uiActions from '../../../actions/uiActions';

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
  getIsDealEditInProgress: jest.fn().mockReturnValue(true),
  getCurrencies: jest.fn().mockReturnValue([
    {
      code: 'USD', name: 'USA DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'BB ', deletionFlag: ' ',
    },
    {
      code: 'SGD', name: 'SINGAPORE DOLLAR', decimalPlaces: 2, roundingMethod: 'ROUND_NEAREST', dayCountBasisCode: 'AF ', deletionFlag: ' ',
    }]),
  getSelectedDealType: jest.fn().mockReturnValue('NDF'),
}));

describe('<BrokerageAmount />', () => {
  const updateDealObjectSpy = jest.spyOn(uiActions, 'updateDealObject');

  afterEach(() => {
    jest.clearAllMocks();
    updateDealObjectSpy.mockClear();
  });

  const defaultProps = {
    form: mockForm,
    brokerage: mockDeal.trades[0].tradeEconomics.payer.brokerage,
    side: 'payer',
  };
  const renderBrokerageAmount = () => renderWithForm(<BrokerageAmount {...defaultProps} />);

  test('renders snapshot as expected', () => {
    const { container } = renderBrokerageAmount();
    expect(container).toMatchSnapshot();
  });

  test('verify updateDealObject has been called on ccy change', async () => {
    await act(async () => {
      const { getByTestId, getAllByText, getByText } = await renderBrokerageAmount();

      const ccyDropDown = await waitFor(() => getByTestId('payer-currency').firstElementChild);
      fireEvent.mouseDown(ccyDropDown);

      const selectedCurrency = await waitFor(() => getAllByText('SGD', document.body));
      fireEvent.click(selectedCurrency[selectedCurrency.length - 1]);
      expect(updateDealObjectSpy).toHaveBeenCalled();
      fireEvent.mouseOver(ccyDropDown);
      const toolTip = await waitFor(() => getByText('Previous Value: N/A', document.body));// No prevoius brokerage provided
      expect(toolTip).toBeTruthy();
    });
  });

  test('verify updateDealObject has been called on amount change', async () => {
    await act(async () => {
      const { getByTestId, getByText } = await renderBrokerageAmount();
      const amountInput = await waitFor(() => getByTestId('payer-amount'));

      fireEvent.change(amountInput, { target: { value: '' } });
      await fireEvent.blur(amountInput);
      let errorTxt = await waitFor(() => getByText('Amount required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(amountInput, { target: { value: 'abcd' } });
      await fireEvent.blur(amountInput);
      errorTxt = await waitFor(() => getByText('Amount required'));
      expect(errorTxt).toBeTruthy();

      fireEvent.change(amountInput, { target: { value: 123 } });
      await fireEvent.blur(amountInput);
      expect(updateDealObjectSpy).toHaveBeenCalled();
    });
  });

  test('verify updateDealObject has been called on amount change for zero value', async () => {
    await act(async () => {
      const mockForm2 = {
        getFieldValue: jest.fn().mockImplementation((field) => {
          if (field === 'payer-amount') {
            return 0;
          }
          return 'dummy';
        }),
        setFieldsValue: (field) => field,
        validateFields: () => jest.fn().mockReturnValue(true),
      };
      const defaultProps2 = {
        form: mockForm2,
        brokerage: mockDeal.trades[0].tradeEconomics.payer.brokerage,
        side: 'payer',
      };

      const { getByTestId } = await renderWithForm(<BrokerageAmount {...defaultProps2} />);
      const amountInput = await waitFor(() => getByTestId('payer-amount'));

      fireEvent.change(amountInput, { target: { value: 0 } });
      await fireEvent.blur(amountInput);
      expect(updateDealObjectSpy).toHaveBeenCalled();
      expect(updateDealObjectSpy).toHaveBeenCalledWith({ value: 'ZERO', path: 'amount', side: 'payer' });
    });
  });
});
