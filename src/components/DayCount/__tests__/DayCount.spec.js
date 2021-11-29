import { renderWithForm } from 'test-utils/testUtils';
import DayCount from '../DayCount';

const form = {
  resetFields: () => { },
};

const defaultProps = {
  form,
  id: 'dayCount',
  label: 'Day Count',
  testId: 'txtDayCount',
};

describe('<DayCount />', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<DayCount {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
