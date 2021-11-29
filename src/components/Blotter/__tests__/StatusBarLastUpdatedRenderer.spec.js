import { renderWithProvider } from 'test-utils/testUtils';
import StatusBarLastUpdatedRenderer from '../renderers/StatusBarLastUpdatedRenderer';

describe('<StatusBarLastUpdatedRenderer />', () => {
  test('renders snapshot as expected when no last updated date set in state', () => {
    const initialState = {};

    const { container } = renderWithProvider(
      <StatusBarLastUpdatedRenderer />, { initialState },
    );
    expect(container).toMatchSnapshot();
  });

  test('renders snapshot as expected when last updated date is set in state', () => {
    const initialState = { blotter: { lastUpdated: '12/07/2030 12:34:56' } };

    const { container } = renderWithProvider(<StatusBarLastUpdatedRenderer />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
