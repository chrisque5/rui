import { fireEvent, renderWithProvider, waitFor } from 'test-utils/testUtils';
import uiActions from '../../../actions/uiActions';
import SpreadTradeSides from '../SpreadTradeSide/SpreadTradeSides';
import {
  agents, brokers, clients, ui, user,
} from './mockData.json';

const form = {
  getFieldInstance: () => ({ focus: jest.fn() }),
  getFieldsValue: (field) => field,
  getFieldValue: (field) => field,
  setFieldValue: (field) => field,
  setFieldsValue: (field) => field,
  resetFields: () => { },
  randomCheck: () => { },
};

jest.mock('../../../actions/uiActions', () => ({
  toggleThirdCP: jest.fn(() => jest.fn(() => Promise.resolve())),
  changeCounterPartySelection: jest.fn(() => jest.fn(() => Promise.resolve())),
  changeClientHoverData: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

const toggle3CPSpy = jest.spyOn(uiActions, 'toggleThirdCP');

const initialState = {
  ui,
  user,
  clients,
  brokers,
  agents,
};

const defaultProps = {
  form,
  isThirdCPChecked: false,
  dealType: 'NDF',
};

describe('<SpreadTradeSides />', () => {
  test('NDF <SpreadTradeSides /> renders snapshot as expected', () => {
    const { container } = renderWithProvider(<SpreadTradeSides {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });

  test('<SpreadTradeSides /> Third CP Enabled', () => {
    const props = { ...defaultProps, isThirdCPChecked: true };
    const { container } = renderWithProvider(<SpreadTradeSides {...props} />, { initialState });
    expect(container).toMatchSnapshot();
  });

  test('<SpreadTradeSides /> Enable Third CP', async () => {
    const { getByTestId } = renderWithProvider(<SpreadTradeSides {...defaultProps} />, { initialState });
    const checkbox = await waitFor(() => getByTestId('chkThreeCp'));

    fireEvent.click(checkbox);
    expect(toggle3CPSpy).toHaveBeenCalledTimes(1);
  });
});
