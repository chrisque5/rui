import { renderWithProvider } from 'test-utils/testUtils';
import Home from '../Home';

describe('<Home/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const initialState = { permissions: [] };
  const renderUI = () => renderWithProvider(<Home />, { initialState });

  test('Render Component', async () => {
    const { container } = await renderUI();
    expect(container).toMatchSnapshot();
  });
});
