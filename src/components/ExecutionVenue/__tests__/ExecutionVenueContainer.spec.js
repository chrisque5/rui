import {
  renderWithForm, fireEvent, waitFor,
} from 'test-utils/testUtils';
import { Modal } from 'antd';
import ExecutionVenueContainer from '../ExecutionVenueContainer';
import userActions from '../../../actions/userActions';

jest.mock('../../../actions/userActions', () => ({
  addExecutionVenuePreference: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

jest.mock('../../../actions/executionVenueActions', () => ({
  loadExecutionVenues: jest.fn(() => jest.fn().mockResolvedValue([
    {
      id: null,
      lockSequence: null,
      venueId: 'TPSEF',
      productType: 'FX',
      venueType: 'SEF',
      reportingRegime: 'DoddFrankAct',
    },
    {
      id: null,
      lockSequence: null,
      venueId: 'XOFF',
      productType: 'FX',
      venueType: 'OffFacility',
      reportingRegime: 'DoddFrankAct',
    },
  ])),
}));

const mockForm = {
  getFieldValue: () => 'TPSEF',
  setFieldsValue: () => null,
};
const addPreferenceSpy = jest.spyOn(userActions, 'addExecutionVenuePreference');
const modalSpy = jest.spyOn(Modal, 'warning');
const formSpy = jest.spyOn(mockForm, 'setFieldsValue');

const executionVenues = [
  {
    id: null,
    lockSequence: null,
    venueId: 'TPSEF',
    productType: 'FX',
    venueType: 'SEF',
    reportingRegime: 'DoddFrankAct',
  },
  {
    id: null,
    lockSequence: null,
    venueId: 'XOFF',
    productType: 'FX',
    venueType: 'OffFacility',
    reportingRegime: 'DoddFrankAct',
  },
];

const dealType = 'FWD';
const defaultProps = {
  form: mockForm,
  dealType,
  testId: 'ddlExecutionVenue',
  label: 'Execution Venue',
};

describe('<ExecutionVenueContainer />', () => {
  const renderComponent = (initialState) => renderWithForm(<ExecutionVenueContainer {...defaultProps} />, { initialState });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('Add to favorites without Broker', async () => {
    const defaultState = {
      ui: {
        selectedPreferenceBroker: '',
      },
      executionVenues,
    };

    const { getByTestId } = renderComponent(defaultState);
    const addPreference = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(addPreference);
    await expect(modalSpy).toHaveBeenCalledTimes(1);
  });

  test('Add to favorites', async () => {
    const defaultState = {
      ui: {
        selectedPreferenceBroker: '8158,100114',
      },
      executionVenues,
    };
    const { getByTestId } = renderComponent(defaultState);
    const addPreference = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(addPreference);
    expect(addPreferenceSpy).toHaveBeenCalledTimes(1);
  });

  test('Set default Execution Venue', async () => {
    const initialState = {
      ui: {
        selectedPreferenceBroker: '8158,100114',
      },
      executionVenues,
    };

    const props = {
      ...defaultProps,
      form: {
        ...mockForm,
        getFieldValue: jest.fn(),
      },
    };
    renderWithForm(<ExecutionVenueContainer {...props} />, { initialState });
    await waitFor(() => expect(formSpy).toHaveBeenCalledWith({ executionVenue: 'TPSEF' }));
  });
});
