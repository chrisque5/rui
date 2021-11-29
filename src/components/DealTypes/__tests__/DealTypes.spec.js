import { renderWithForm } from 'test-utils/testUtils';
import DealTypes from '../DealTypes';
import { dealTypeOptions } from '../../../utils/constants';

describe('<DealTypes/>', () => {
  const dealTypeChange = jest.fn();
  const defaultProps = {
    id: 'dealType',
    options: dealTypeOptions,
    dealTypeChange,
  };

  test('renders snapshot as expected', () => {
    const { container } = renderWithForm(<DealTypes {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
