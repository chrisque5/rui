import {
  renderWithForm, fireEvent, waitFor,
} from 'test-utils/testUtils';
import { Modal } from 'antd';
import TermContainer from '../TermContainer';
import userActions from '../../../actions/userActions';

const mockForm = {
  getFieldValue: () => 'TPSEF',
  setFieldsValue: () => null,
  getFieldInstance: () => ({ focus: jest.fn() }),
};

jest.mock('../../../utils/helper', () => ({ isValidTerm: jest.fn().mockReturnValue(true) }));

jest.mock('../../../actions/userActions', () => ({
  addTermPreference: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

jest.mock('../../../actions/uiActions', () => ({
  changeTermValues: jest.fn(() => jest.fn().mockResolvedValue([
    {
      id: null,
      term1: '1Y',
    },
  ])),
  changeLastTermSelection: jest.fn(() => jest.fn().mockResolvedValue([])),
}));

const addPreferenceSpy = jest.spyOn(userActions, 'addTermPreference');
const modalSpy = jest.spyOn(Modal, 'warning');

const calculateInterest = jest.fn();
const onBlurAfterEffects = jest.fn();
const setDefaultExecutionVenue = jest.fn();

const defaultProps = {
  id: 'term1',
  label: 'Term',
  testId: 'ddlTerm1',
  additionalTerms: [],
  form: mockForm,
  calculateInterest,
  onBlurAfterEffects,
  setDefaultExecutionVenue,
};

describe('<TermContainer />', () => {
  const renderComponent = (initialState) => renderWithForm(<TermContainer {...defaultProps} />, { initialState });

  test('Add to favorites without Broker', async () => {
    const defaultState = {
      ui: {
        selectedPreferenceBroker: '',
      },
    };

    const { getByTestId } = renderComponent(defaultState);
    const addPreference = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(addPreference);
    expect(modalSpy).toHaveBeenCalledTimes(1);
  });

  test('Add to favorites', async () => {
    const defaultState = {
      ui: {
        selectedPreferenceBroker: '8158,100114',
      },
    };
    const { getByTestId } = renderComponent(defaultState);
    const term1 = await waitFor(() => getByTestId('ddlTerm1').firstElementChild);
    fireEvent.mouseDown(term1);

    const input = term1.getElementsByClassName('ant-select-selection-search-input')[0];
    fireEvent.change(input, { target: { value: '1W' } });

    const addPreference = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(addPreference);
    expect(addPreferenceSpy).toHaveBeenCalledTimes(1);
  });

  test('Trigger Change', async () => {
    const defaultState = {
      ui: {
        selectedPreferenceBroker: '8158,100114',
      },
    };

    const { getByTestId } = renderComponent(defaultState);
    const term1 = await waitFor(() => getByTestId('ddlTerm1'));
    const input = term1.getElementsByClassName('ant-select-selection-search-input')[0];
    fireEvent.change(input, { target: { value: 'IMM' } });
    fireEvent.change(input, { target: { value: 'DUMMY' } });
    fireEvent.change(input, { target: { value: '1M' } });
    fireEvent.keyDown(input, { target: { value: '1M', key: 'tab' } });
    fireEvent.blur(term1);
    expect(input.value).toBe('1M');
  });
});
