import { renderWithProvider } from 'test-utils/testUtils';
import OutrightTradeSides from '../OutrightTradeSide/OutrightTradeSides';
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

const initialState = {
  ui,
  user,
  clients,
  brokers,
  agents,
};

const defaultProps = {
  form,
  dealType: 'NDF',
};

describe('<OutrightTradeSides />', () => {
  test('<OutrightTradeSides /> renders snapshot as expected', () => {
    const { container } = renderWithProvider(<OutrightTradeSides {...defaultProps} />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
