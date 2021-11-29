import { renderWithProvider, waitFor } from 'test-utils/testUtils';
import SSEConnectionStatusRenderer from '../renderers/SSEConnectionStatusRenderer';

describe('<SSEConnectionStatusRenderer />', () => {
  const renderSSEConnectionStatus = (initialState) => renderWithProvider(
    <SSEConnectionStatusRenderer />, { initialState },
  );

  test('renders snapshot as expected when no last updated date set in state', () => {
    const initialState = {};

    const { container } = renderSSEConnectionStatus(initialState);
    expect(container).toMatchSnapshot();
  });

  test('Real Time update status connected', async () => {
    const initialState = { sse: { status: 'Connected' } };

    const { getByTestId } = renderSSEConnectionStatus(initialState);
    const connectedIcon = await waitFor(() => getByTestId('connectedIcon'));
    expect(connectedIcon).toBeTruthy();
  });

  test('Real Time update status connecting', async () => {
    const initialState = { sse: { status: 'Connecting' } };

    const { getByTestId } = renderSSEConnectionStatus(initialState);
    const connectingIcon = await waitFor(() => getByTestId('connectingIcon'));
    expect(connectingIcon).toBeTruthy();
  });

  test('Real Time update status not connected', async () => {
    const initialState = { sse: { status: '' } };

    const { getByTestId } = renderSSEConnectionStatus(initialState);
    const notConnectedIcon = await waitFor(() => getByTestId('notConnectedIcon'));
    expect(notConnectedIcon).toBeTruthy();
  });
});
