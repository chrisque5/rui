import moment from 'moment';
import { Modal } from 'antd';
import {
  renderWithForm, waitFor, getByTitle, fireEvent,
} from 'test-utils/testUtils';
import ValueDateContainer from '../ValueDateContainer';
import { ids } from '../../../../utils/constants';
import userActions from '../../../../actions/userActions';

jest.mock('../../../../utils/helper', () => ({ setTodayOnNull: jest.fn() }));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-04-04T00:00:00.000Z'));
jest.mock('../../../../actions/userActions', () => ({
  addTermPreference: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

describe('<ValueDateContainer/>', () => {
  const mockForm = {
    getFieldValue: (field) => {
      if (field === ids.VALUE_DATE_1) {
        return moment();
      }
      return 'dummy';
    },
    setFieldValue: (field) => field,

    resetFields: () => { },
  };

  const modalSpy = jest.spyOn(Modal, 'warning');
  const onChangeAfterEffects = jest.fn();
  const addTermPreferenceSpy = jest.spyOn(userActions, 'addTermPreference');

  const defaultProps = {
    form: mockForm,
    id: ids.VALUE_DATE_1,
    onChangeAfterEffects,
    initialValue: moment(),
    testId: 'dtpValueDate1',
    label: 'Value Date',
  };
  let defaultState = {
    ui: {
      selectedPreferenceBroker: '',
    },
  };

  const renderComponent = (initialState) => renderWithForm(<ValueDateContainer {...defaultProps} />, { initialState });

  test('renders snapshot as expected', () => {
    const { container } = renderComponent(defaultState);
    expect(container).toMatchSnapshot();
  });

  test('verify valueDateOnChange', async () => {
    const { getByTestId } = renderComponent(defaultState);

    const dateInput = await waitFor(() => getByTestId('dtpValueDate1'));
    fireEvent.mouseDown(dateInput);

    const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-04-11'));
    fireEvent.click(selectedDateElem);

    expect(onChangeAfterEffects).toHaveBeenCalledTimes(1);
  });

  test('verify onclick event on star without broker', async () => {
    const { getByTestId } = renderComponent(defaultState);
    const star = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(star);
    expect(modalSpy).toHaveBeenCalledTimes(1);
  });

  test('verify onclick event on star with broker', async () => {
    defaultState = {
      ui: {
        selectedPreferenceBroker: {},
      },
    };
    const { getByTestId } = renderComponent(defaultState);
    const star = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(star);
    expect(addTermPreferenceSpy).toHaveBeenCalledTimes(1);
  });
});
