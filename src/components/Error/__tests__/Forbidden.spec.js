import { HashRouter } from 'react-router-dom';
import { render } from 'test-utils/testUtils';
import Forbidden from '../Forbidden';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/forbidden/path',
  }),
  useHistory: () => ({
    goBack: jest.fn(),
  }),
}));

describe('<Forbidden>', () => {
  test('should match the snapshot', () => {
    const { container } = render(<HashRouter><Forbidden /></HashRouter>);
    expect(container).toMatchSnapshot();
  });
});
