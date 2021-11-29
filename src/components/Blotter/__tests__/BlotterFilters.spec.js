import {
  render, fireEvent, waitFor, getByTitle, getAllByTitle,
} from 'test-utils/testUtils';
import redux from 'react-redux';
import BlotterFilters from '../filters/BlotterFilters';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-09-02T00:00:00.000Z'));

describe('<BlotterFilters/>', () => {
  const dispatchSpy = jest.spyOn(redux, 'useDispatch');
  const closeDrawer = jest.fn();
  afterEach(() => {
    dispatchSpy.mockClear();
  });
  const renderBloterFilters = () => render(
    <BlotterFilters closeDrawer={closeDrawer} />,
  );
  test('renders snapshot as expected', async () => {
    const { container } = await renderBloterFilters();
    expect(container).toMatchSnapshot();
  });

  test('verify search event', async () => {
    const { getByTestId } = await renderBloterFilters();
    const searchBtn = await waitFor(() => getByTestId('blotterSearch'));
    fireEvent.submit(searchBtn);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('verify date change event', async () => {
    const { getByTestId } = await renderBloterFilters();

    const dateInput = await waitFor(() => getByTestId('dateFrom'));
    fireEvent.mouseDown(dateInput);

    const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-09-01'));
    fireEvent.click(selectedDateElem);

    expect(dateInput.value).toBe('09/01/2020');

    const dateToInput = await waitFor(() => getByTestId('dateTo'));
    fireEvent.mouseDown(dateToInput);

    const dates = await waitFor(() => getAllByTitle(document.body, '2020-09-02'));
    fireEvent.mouseDown(dates[0]);

    expect(dateToInput.value).toBe('09/02/2020');
  });
});
