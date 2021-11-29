import {
  render, fireEvent, waitFor, getByText,
} from 'test-utils/testUtils';
import redux from 'react-redux';
import BrokerOverrideContainer from '../BrokerOverrideContainer';
import { ids } from '../../../utils/constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: () => jest.fn(),
}));

jest.mock('../../../utils/selectors.js', () => ({
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
}));

describe('<BrokerOverrideContainer/>', () => {
  const mockForm = {
    getFieldValue: (field) => {
      if (field === ids.DESK) {
        return 8160;
      }

      return 'dummy';
    },
    resetFields: () => {},
    validateFields: () => {},
    getFieldInstance: () => ({ focus: jest.fn() }),
  };

  const defaultProps = { form: mockForm, setIsTabDirty: jest.fn() };
  const dispatchSpy = jest.spyOn(redux, 'useDispatch');
  afterEach(() => {
    dispatchSpy.mockClear();
  });

  test('verify search event', async () => {
    const { getAllByPlaceholderText, container } = await render(
      <BrokerOverrideContainer {...defaultProps} />,
    );

    const gcdBrokerText = await waitFor(() => getByText(container, '3 items'));
    expect(gcdBrokerText).toBeTruthy();
    // Filter the remaining data 3 items in GCD brokers and expected result is 1
    const searchFields = await waitFor(() => getAllByPlaceholderText('Search here'));
    fireEvent.change(searchFields[0], { target: { value: 12 } });

    const filteredGcdBrokerText = await waitFor(() => getByText(container, '1 item'));
    expect(filteredGcdBrokerText).toBeTruthy();
  });

  test('verify reset event', async () => {
    const { getByTestId } = await render(
      <BrokerOverrideContainer {...defaultProps} />,
    );
    const cancelBtn = await waitFor(() => getByTestId('bocBtnReset'));
    fireEvent.submit(cancelBtn);

    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('verify apply event', async () => {
    const { getByTestId } = await render(
      <BrokerOverrideContainer {...defaultProps} />,
    );
    const applyBtn = await waitFor(() => getByTestId('bocBtnApply'));
    fireEvent.submit(applyBtn);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('verify Desk on load event', async () => {
    const { getByTestId, container } = await render(
      <BrokerOverrideContainer {...defaultProps} />,
    );

    const dropdown = await waitFor(() => getByTestId('ddDesk').firstElementChild);
    fireEvent.mouseDown(dropdown);

    const selectedDeskElem = await waitFor(() => getByText(document.body, 'BELFAST RATES TPUS DESK - 8160'));
    fireEvent.click(selectedDeskElem);

    const dropDownValue = await waitFor(() => getByText(container, 'BELFAST RATES TPUS DESK - 8160'));
    expect(dropDownValue).toBeTruthy();
  });

  test('verify DealType on load event', async () => {
    const { getByLabelText } = await render(
      <BrokerOverrideContainer {...defaultProps} />,
    );
    const radio = getByLabelText('NDF');
    fireEvent.change(radio, { target: { value: 'FWD' } });
    expect(radio.value).toBe('FWD');
  });
});
