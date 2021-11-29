import {
  render, fireEvent, waitFor, getByText,
} from 'test-utils/testUtils';
import { Form } from 'antd';
import BrokersTransfer from '../BrokersTransfer';
import { ids } from '../../../utils/constants';

// The below part of the code is to fix the issue
// TypeError: window.matchMedia is not a function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

delete window.matchMedia;
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  backendFactory: jest.fn(),
  dispatch: jest.fn(),
});

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
}));

jest.mock('../../../utils/selectors.js', () => ({
  getBrokers: jest.fn().mockReturnValue([
    { id: 100120, name: 'BELFAST TPSIN TEST BROKER 3' },
    { id: 100121, name: 'BELFAST TPSIN TEST BROKER 4' }]),
  getGcdBrokers: jest.fn().mockReturnValue([
    { id: 100118, name: 'BELFAST TPSIN TEST BROKER 1' },
    { id: 100119, name: 'BELFAST TPSIN TEST BROKER 2' },
    { id: 100120, name: 'BELFAST TPSIN TEST BROKER 3' },
    { id: 100121, name: 'BELFAST TPSIN TEST BROKER 4' },
    { id: 100122, name: 'BELFAST TPSIN TEST BROKER 5' }]),
}));

describe('<BrokersTransfer/>', () => {
  const defaultProps = {
    id: ids.SELECTED_BROKERS,
    setIsFormDirty: jest.fn(),
  };
  test('renders snapshot as expected', () => {
    const { container } = render(<Form><BrokersTransfer {...defaultProps} /></Form>);
    expect(container).toMatchSnapshot();
  });

  test('verify search event', async () => {
    const { getAllByPlaceholderText, container } = render(<Form><BrokersTransfer {...defaultProps} /></Form>);

    const gcdBrokerText = await waitFor(() => getByText(container, '3 items'));
    expect(gcdBrokerText).toBeTruthy();
    // Filter the remaining data 3 items in GCD brokers and expected result is 1
    const searchFields = await waitFor(() => getAllByPlaceholderText('Search here'));
    fireEvent.change(searchFields[0], { target: { value: 12 } });

    const filteredGcdBrokerText = await waitFor(() => getByText(container, '1 item'));
    expect(filteredGcdBrokerText).toBeTruthy();
  });
});
