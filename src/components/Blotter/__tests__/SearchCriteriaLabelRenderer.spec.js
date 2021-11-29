import {
  renderWithProvider, waitFor,
} from 'test-utils/testUtils';

import SearchCriteriaLabelRenderer from '../renderers/SearchCriteriaLabelRenderer';

describe('<SearchCriteriaLabelRenderer />', () => {
  let initialState = { };

  test('renders snapshot as expected when no last updated date set in state', () => {
    const { container } = renderWithProvider(
      <SearchCriteriaLabelRenderer />, { initialState },
    );
    expect(container).toMatchSnapshot();
  });

  test('verify showing label as TODAY if no search params', async () => {
    const { getByText } = renderWithProvider(<SearchCriteriaLabelRenderer />, { initialState });
    const todayText = await waitFor(() => getByText('TODAY'));
    expect(todayText).toBeTruthy();
    const searchLabel = await waitFor(() => getByText('Showing the results for:'));
    expect(searchLabel).toBeTruthy();
  });

  test('verify showing label for Deal ID search', async () => {
    initialState = {
      blotter: {
        searchParams: {
          valid: true,
          dealId: 1234,
        },
      },
    };
    const { getByText } = renderWithProvider(<SearchCriteriaLabelRenderer />, { initialState });
    const dealIdText = await waitFor(() => getByText('Deal ID: 1234'));
    expect(dealIdText).toBeTruthy();
    const searchLabel = await waitFor(() => getByText('Search results for:'));
    expect(searchLabel).toBeTruthy();
  });

  test('verify showing label for same date with broker search', async () => {
    const date = new Date('03 March 2021 15:49:11 UTC');
    initialState = {
      blotter: {
        searchParams: {
          valid: true,
          dateFrom: date,
          dateTo: date,
          broker: 'TEST BROKER',
        },
      },
    };

    const { getByText } = renderWithProvider(<SearchCriteriaLabelRenderer />, { initialState });
    const searchCriteriaText = await waitFor(() => getByText('Trade Date From: 03/03/2021 To: 03/03/2021, Broker: TEST BROKER'));
    expect(searchCriteriaText).toBeTruthy();
    const searchLabel = await waitFor(() => getByText('Search results for:'));
    expect(searchLabel).toBeTruthy();
  });

  test('verify showing label for different date with customer, trader search', async () => {
    initialState = {
      blotter: {
        searchParams: {
          valid: true,
          dateFrom: new Date('02 March 2021 15:49:11 UTC'),
          dateTo: new Date('03 March 2021 15:49:11 UTC'),
          trader: 'ABC',
          customer: 'DEF',
        },
      },
    };

    const { getByText } = renderWithProvider(<SearchCriteriaLabelRenderer />, { initialState });
    const searchCriteriaText = await waitFor(() => getByText('Customer: DEF, Trader: ABC'));
    expect(searchCriteriaText).toBeTruthy();
    const searchLabel = await waitFor(() => getByText('Search results for:'));
    expect(searchLabel).toBeTruthy();
  });
});
