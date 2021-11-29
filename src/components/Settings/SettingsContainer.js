import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Settings from './Settings';
import { changeCounterPartySelection, toggleSettingsModal } from '../../actions/uiActions';
import { changePreference } from '../../actions/userActions';
import {
  getIsSettingsModalVisible, getUserPreferenceSettings, getUserPermissions, getUserPreferencesDefaults,
} from '../../utils/selectors';
import { dealTypes, navMenuItems } from '../../utils/constants';
import { isObjectEmpty } from '../../utils/helper';

const SettingsContainer = (props) => {
  const dispatch = useDispatch();
  const [changedSettings, setChangedSettings] = useState({});
  const [changedDefaults, setChangedDefaults] = useState({});

  const settings = useSelector(getUserPreferenceSettings);
  const visible = useSelector(getIsSettingsModalVisible);
  const permissions = useSelector(getUserPermissions);
  const defaults = useSelector(getUserPreferencesDefaults);

  const {
    validForDeskEdit, validForFwd, validForNdf, validForSpt, validForBlotterView,
  } = permissions;
  const { dealType } = props;

  // when the settings change notify the child
  const firmSettingOnCallback = useCallback(() => changedSettings.displayClients, [changedSettings]);

  const onBack = () => {
    setChangedDefaults({});
    setChangedSettings({});
    dispatch(toggleSettingsModal());
  };

  const onSave = () => {
    const newSettings = {
      ...((settings && !isObjectEmpty(changedSettings)) && { settings: changedSettings }),
      ...((defaults && !isObjectEmpty(changedDefaults)) && { defaults: changedDefaults }),
    };

    if (!isObjectEmpty(newSettings)) {
      dispatch(changePreference(newSettings));

      if (!isObjectEmpty(changedSettings) && dealType === dealTypes.FWD) {
        if (changedSettings.lrMode === true) {
          dispatch(changeCounterPartySelection('seller'));
        } else if (changedSettings.lrMode === false) {
          dispatch(changeCounterPartySelection('buyer'));
        }
      }
    }
    onBack();
  };

  const onChanged = (value, event, propertyName) => {
    const newSettings = {
      ...changedSettings,
      [propertyName]: value,
    };

    setChangedSettings(newSettings);
  };

  const onUserDefaultChanged = (value, event, propertyName) => {
    const newDefaults = {
      ...changedDefaults,
      [propertyName]: value,
    };

    setChangedDefaults(newDefaults);
  };

  const {
    ADMIN, BLOTTER, FWD, NDF, SPT,
  } = navMenuItems;

  const userDefaults = {
    defaultEntryPage: {
      options: {
        ...(validForBlotterView && { BLOTTER }),
        ...(validForNdf && { NDF }),
        ...(validForFwd && { FWD }),
        ...(validForSpt && { SPT }),
        ...(validForDeskEdit && { ADMIN }),
      },
    },
  };

  const getDefaultSetting = (property) => (settings ? settings[property] : null);
  const getUserDefault = (property) => (defaults && userDefaults[property].options[defaults[property]] ? defaults[property] : null);

  return (
    <Settings
      visible={visible}
      onSave={onSave}
      onBack={onBack}
      settings={settings}
      userDefaults={userDefaults}
      getUserDefault={getUserDefault}
      getDefaultSetting={getDefaultSetting}
      onChanged={onChanged}
      onUserDefaultChanged={onUserDefaultChanged}
      firmSettingOnCallback={firmSettingOnCallback}
    />
  );
};

SettingsContainer.propTypes = {
  dealType: PropTypes.string.isRequired,
};

export default SettingsContainer;
