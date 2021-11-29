import { actionTypes } from '../utils/constants';
import systemSettingsApi from '../api/systemSettingsApi';

export const loadBlotterSearchDateRangeLimitSuccess = (blotterSearchDateRangeLimit) => ({
  type: actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_SUCCESS,
  blotterSearchDateRangeLimit,
});

export const loadBlotterSearchDateRangeLimitFailed = () => ({
  type: actionTypes.LOAD_BLOTTER_SEARCH_DATE_RANGE_LIMIT_FAILED,
  blotterSearchDateRangeLimit: '365',
});

export const loadBlotterSearchDateRangeLimit = () => (dispatch) => (
  systemSettingsApi.getBlotterSearchDateRangeLimit()
    .then((response) => dispatch(loadBlotterSearchDateRangeLimitSuccess(response.dateRangeLimit)))
    .catch(() => dispatch(loadBlotterSearchDateRangeLimitFailed()))
);

export const loadLicenseKeySuccess = (licenseKey) => ({
  type: actionTypes.LOAD_LICENSE_KEY_SUCCESS,
  licenseKey,
});

export const loadLicenseKeyFailed = () => ({
  type: actionTypes.LOAD_LICENSE_KEY_FAILED,
  licenseKey: '',
});

export const loadLicenseKey = () => (dispatch) => (
  systemSettingsApi.getLicenseKey()
    .then((response) => dispatch(loadLicenseKeySuccess(response.licenseKey)))
    .catch(() => dispatch(loadLicenseKeyFailed()))
);
