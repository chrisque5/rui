import { renderWithProvider } from 'test-utils/testUtils';
import App from '../App';

const initialState = {};

describe('<App />', () => {
  test('renders snapshot as expected', () => {
    const { container } = renderWithProvider(<App />, { initialState });
    expect(container).toMatchSnapshot();
  });
});
