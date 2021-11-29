import {
  loadBlotterSearchDateRangeLimitSuccess,
  loadBlotterSearchDateRangeLimitFailed,
  loadLicenseKeySuccess,
  loadLicenseKeyFailed,
} from '../systemSettingsActions';
import { actionTypes } from '../../utils/constants';

describe('ACTION', () => {
  test('loadBlotterSearchDateRangeLimitSuccess should create a LOAD_BLOTTER_DATE_RANGE_LIMIT_FAILED action with correct payload', () => {
    const expectedAction = {
      type: actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS,
      blotterSearchDateRangeLimit: { blotterSearchDateRangeLimit: '30' },
    };
    expect(loadBlotterSearchDateRangeLimitSuccess({ blotterSearchDateRangeLimit: '30' })).toEqual(expectedAction);
  });

  test('loadBlotterSearchDateRangeLimitFailed should create a LOAD_BLOTTER_DATE_RANGE_LIMIT_FAILED action with correct payload', () => {
    const expectedAction = {
      type: actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED,
      blotterSearchDateRangeLimit: '365',
    };
    expect(loadBlotterSearchDateRangeLimitFailed()).toEqual(expectedAction);
  });

  test('loadLicenseKeySuccess should create a LOAD_LICENSE_KEY_SUCCESS action with correct payload', () => {
    const expectedAction = {
      type: actionTypes.LOAD_LICENSE_KEY_SUCCESS,
      licenseKey: { licenseKey: 'key' },
    };
    expect(loadLicenseKeySuccess({ licenseKey: 'key' })).toEqual(expectedAction);
  });

  test('loadLicenseKeyFailed should create a LOAD_LICENSE_KEY_FAILED action with correct payload', () => {
    const expectedAction = {
      type: actionTypes.LOAD_LICENSE_KEY_FAILED,
      licenseKey: '',
    };
    expect(loadLicenseKeyFailed()).toEqual(expectedAction);
  });
});
