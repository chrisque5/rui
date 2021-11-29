import { renderWithForm, fireEvent, waitFor } from 'test-utils/testUtils';
import ExecutionVenue from '../ExecutionVenue';

const form = {};
const addPreferenceClick = jest.fn();
const options = [{
  id: null,
  lockSequence: null,
  venueId: 'TPSEF',
  productType: 'FX',
  venueType: 'SEF',
  reportingRegime: 'DoddFrankAct',
},
{
  id: null,
  lockSequence: null,
  venueId: 'XOFF',
  productType: 'FX',
  venueType: 'OffFacility',
  reportingRegime: 'DoddFrankAct',
}];

const defaultProps = {
  form,
  addPreferenceClick,
  options,
  isLoading: false,
};

describe('<ExecutionVenue/>', () => {
  test('It Renders ', () => {
    const { container } = renderWithForm(<ExecutionVenue {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('Add to favorites', async () => {
    const { getByTestId } = renderWithForm(<ExecutionVenue {...defaultProps} />);
    const star = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(star);
    expect(addPreferenceClick).toHaveBeenCalledTimes(1);
  });
});
