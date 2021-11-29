import moment from 'moment';
import {
  renderWithForm, waitFor, getByTitle, fireEvent,
} from 'test-utils/testUtils';
import * as helper from '../../../../utils/helper';
import FixingDate from '../FixingDate';

jest.mock('../../../../utils/helper', () => ({ setTodayOnNull: jest.fn() }));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-04-04T00:00:00.000Z'));

const setTodayOnNullSpy = jest.spyOn(helper, 'setTodayOnNull');

describe('<FixingDate/>', () => {
  const mockForm = {
    resetFields: () => { },
  };

  const defaultProps = {
    form: mockForm,
    id: 'fixingDate1',
    initialValue: moment(),
    testId: 'dtpFixingDate1',
    label: 'Fixing Date',
  };

  test('verify snapshot', () => {
    const { container } = renderWithForm(<FixingDate {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  test('verify change event', async () => {
    const { getByTestId } = renderWithForm(<FixingDate {...defaultProps} />);

    await (async () => {
      const dateInput = await waitFor(() => getByTestId('dtpFixingDate1'));
      fireEvent.mouseDown(dateInput);

      const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-04-11'));
      fireEvent.click(selectedDateElem);
      expect(setTodayOnNullSpy).toHaveBeenCalled();
    });
  });
});
