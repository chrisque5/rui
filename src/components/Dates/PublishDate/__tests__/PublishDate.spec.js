import moment from 'moment';
import {
  renderWithForm, waitFor, getByTitle, fireEvent,
} from 'test-utils/testUtils';
import * as helper from '../../../../utils/helper';
import PublishDate from '../PublishDate';

jest.mock('../../../../utils/helper', () => ({ setTodayOnNull: jest.fn() }));
jest.mock('moment', () => () => jest.requireActual('moment')('2020-04-04T00:00:00.000Z'));

const setTodayOnNullSpy = jest.spyOn(helper, 'setTodayOnNull');

describe('<PublishDate/>', () => {
  const mockForm = {
    resetFields: () => { },
  };

  const defaultProps = {
    form: mockForm,
    id: 'fixingDate1',
    initialValue: moment(),
    testId: 'dtpPublishDate1',
    label: 'Publish Date',
  };

  test('verify snapshot', () => {
    const { container } = renderWithForm(<PublishDate {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  test('verify change event', async () => {
    const { getByTestId } = renderWithForm(<PublishDate {...defaultProps} />);

    await (async () => {
      const dateInput = await waitFor(() => getByTestId('dtpPublishDate1'));
      fireEvent.mouseDown(dateInput);

      const selectedDateElem = await waitFor(() => getByTitle(document.body, '2020-04-11'));
      fireEvent.click(selectedDateElem);
      expect(setTodayOnNullSpy).toHaveBeenCalled();
    });
  });
});
