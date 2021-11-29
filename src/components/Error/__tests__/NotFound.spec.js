import { render } from 'test-utils/testUtils';
import NotFound from '../NotFound';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: {
      pathname: 'localhost:3000/unknown/path',
    },
  }),
}));

describe('<NotFound>', () => {
  test('should match the snapshot', () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });
});
