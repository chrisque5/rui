import {
  renderWithForm, waitFor, fireEvent,
} from 'test-utils/testUtils';
import Term from '../Term';

const form = {
  getFieldValue: () => 'TPSEF',
  setFieldsValue: () => null,
  getFieldInstance: () => ({ focus: jest.fn() }),
};

const searchResults = [];
const termSearch = jest.fn();
const termOnSelect = jest.fn();
const termOnBlur = jest.fn();
const addPreferenceClick = jest.fn();
const handleKeyDown = jest.fn();
const validator = jest.fn();

const defaultProps = {
  form,
  id: 'term1',
  label: 'Term',
  testId: 'ddlTerm1',
  termSearch,
  searchResults,
  termOnSelect,
  termOnBlur,
  addPreferenceClick,
  handleKeyDown,
  validator,
};

describe('<Term />', () => {
  const renderComponent = () => renderWithForm(<Term {...defaultProps} />);

  test('It Renders ', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('Add to favorites', async () => {
    const { getByTestId } = renderComponent();
    const star = await waitFor(() => getByTestId('addPreference'));
    fireEvent.click(star);
    expect(addPreferenceClick).toHaveBeenCalledTimes(1);
  });

  test('Select Term', async () => {
    const { getByTestId } = renderComponent();
    const term1 = await waitFor(() => getByTestId('ddlTerm1'));
    const input = term1.getElementsByClassName('ant-select-selection-search-input')[0];
    fireEvent.change(input, { target: { value: '1W' } });
    expect(input.value).toBe('1W');
  });
});
