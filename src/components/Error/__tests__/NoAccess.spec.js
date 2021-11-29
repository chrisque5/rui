import { render } from 'test-utils/testUtils';
import NoAccess from '../NoAccess';

jest.mock('react-router-dom', () => (jest.requireActual('react-router-dom')));

describe('<NoAccess>', () => {
  test('should match the snapshot', () => {
    const { container } = render(<NoAccess />);
    expect(container).toMatchSnapshot();
  });
});
