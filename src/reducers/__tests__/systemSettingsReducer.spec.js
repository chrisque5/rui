import { actionTypes } from '../../utils/constants';
import reducer from '../systemSettingsReducer';

test('LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS action returns the right data from the action.', () => {
  const blotterSearchDateRangeLimit = '30';
  const reducerOutput = reducer(
    { blotterSearchDateRangeLimit: '365' },
    { type: actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS, blotterSearchDateRangeLimit },
  );
  expect(reducerOutput).toEqual({ blotterSearchDateRangeLimit });
});

test('LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED action returns the right data from the action.', () => {
  const blotterSearchDateRangeLimit = '365';
  const reducerOutput = reducer(
    { blotterSearchDateRangeLimit: '30' },
    { type: actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED, blotterSearchDateRangeLimit },
  );
  expect(reducerOutput).toEqual({ blotterSearchDateRangeLimit });
});

test('LOAD_LICENSE_KEY_SUCCESS action returns the right data from the action.', () => {
  const licenseKey = 'key';
  const reducerOutput = reducer(
    { licenseKey: '' },
    { type: actionTypes.LOAD_LICENSE_KEY_SUCCESS, licenseKey },
  );
  expect(reducerOutput).toEqual({ licenseKey });
});

test('LOAD_LICENSE_KEY_FAILED action returns the right data from the action.', () => {
  const licenseKey = '';
  const reducerOutput = reducer(
    { licenseKey: 'key' },
    { type: actionTypes.LOAD_LICENSE_KEY_FAILED, licenseKey },
  );
  expect(reducerOutput).toEqual({ licenseKey });
});
