import {
  renderWithForm, waitFor,
} from 'test-utils/testUtils';
import TradeStatusDetails from '../tradestatus/TradeStatusDetails';
import { deal as mockDeal } from './MockDeal.json';

jest.mock('moment', () => () => jest.requireActual('moment')('2021-07-12'));

jest.mock('../../../utils/selectors.js', () => ({
  ...jest.requireActual('../../../utils/selectors.js'),
  getDeal: jest.fn().mockImplementation(() => mockDeal),
}));

describe('<TradeStatusDetails/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders snapshot as expected', () => {
    const { container } = renderWithForm(<TradeStatusDetails />);
    expect(container).toMatchSnapshot();
  });

  test('Verify Deal status details rendered properly', async () => {
    const { getByText, getAllByText } = renderWithForm(<TradeStatusDetails />);
    const dmsRefNo = await waitFor(() => getByText('404'));// 404 is ref no
    expect(dmsRefNo).toBeTruthy();
    const dealType = await waitFor(() => getByText('NDF'));
    expect(dealType).toBeTruthy();
    const dealStatus = await waitFor(() => getByText('VALIDATED'));
    expect(dealStatus).toBeTruthy();
    const dmsAction = await waitFor(() => getByText('AMEND'));
    expect(dmsAction).toBeTruthy();
    const dateFields = await waitFor(() => getAllByText('12/07/2021 12:00:00'));
    expect(dateFields).toBeTruthy();
  });
});
