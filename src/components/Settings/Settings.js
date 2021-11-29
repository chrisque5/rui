import PropTypes from 'prop-types';
import {
  Modal, Button, Switch, Select, Tabs,
} from 'antd';
import { settingsProperties } from '../../utils/constants';

const Settings = ({
  visible, onSave, onBack, settings, userDefaults, getUserDefault,
  getDefaultSetting, onChanged, onUserDefaultChanged, firmSettingOnCallback,
}) => {
  // if displayClientFavourites determine whether to disable it or not
  // else return default idasbled flag
  const isControlDisabled = (disabled, key, firmSettingOnValue) => {
    if (key === 'displayClientFavourites') {
      // if the display clients setting has been updated before save use that setting
      // else use the displayClients value
      // else use the default disabled value
      return firmSettingOnValue !== undefined ? firmSettingOnValue : getDefaultSetting('displayClients') || disabled;
    }

    return disabled;
  };

  // callback to update the firm setting on value
  const firmSettingOn = firmSettingOnCallback();

  const renderSelect = (item, options) => (
    <Select
      style={{ minWidth: 60 }}
      onChange={(value, event) => onUserDefaultChanged(value, event, item)}
      data-testid={`select-${item}`}
      defaultValue={getUserDefault(item)}
    >
      { Object.entries(options).map(
        ([, { key, text }]) => (
          <Select.Option key={key} value={key}>{text}</Select.Option>
        ),
      )}
    </Select>
  );

  /**
   * Render a specific control type
   *
   * @param {string} type the contol type
   * @param {string} key the setting key
   */
  const renderControl = (key, type, disabled) => {
    const defaultSetting = getDefaultSetting(key);

    if (type === 'switch') {
      return (
        <Switch
          disabled={disabled}
          data-testid={`chkSwitch-${key}`}
          checkedChildren="on"
          unCheckedChildren="off"
          defaultChecked={defaultSetting}
          onChange={(value, event) => onChanged(value, event, key)}
        />
      );
    }

    if (type === 'select') {
      return renderSelect(key, userDefaults[key].options);
    }

    return (<span>{defaultSetting}</span>);
  };

  /**
   * Render all the settings. Loop through all the entries in the
   * settingsProperties map and create a setting
   */
  const renderSettings = () => {
    if (settings && settingsProperties) {
      return (
        <Tabs tabPosition="left">
          {
            settingsProperties.map(({ tabKey, tabLabel, items }) => (
              <Tabs.TabPane tab={tabLabel} key={tabKey} className="setting-section">
                {Object.entries(items).map(
                  ([key, { disabled = false, label, type }]) => {
                    const isDisabled = isControlDisabled(disabled, key, firmSettingOn);
                    return (
                      <div className="setting" key={key}>
                        <span>{label}</span>
                        { renderControl(key, type, isDisabled)}
                      </div>
                    );
                  },
                )}
              </Tabs.TabPane>
            ))
          }
        </Tabs>
      );
    }

    return (
      <span>Failed to retrieve favorites from server, please reload the page.</span>
    );
  };

  return (
    <Modal
      className="settings-modal"
      title="User settings"
      visible={visible}
      onOk={onSave}
      onCancel={onBack}
      bodyStyle={{ padding: '10px', minHeight: 150 }}
      footer={[
        <Button data-testid="btnBack" key="back" onClick={onBack}>Back</Button>,
        <Button data-testid="btnSave" key="submit" type="primary" onClick={onSave}>Save</Button>,
      ]}
      destroyOnClose
    >
      {renderSettings()}
    </Modal>
  );
};

Settings.defaultProps = {
  firmSettingOnCallback: null,
};

Settings.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onChanged: PropTypes.func.isRequired,
  onUserDefaultChanged: PropTypes.func.isRequired,
  settings: PropTypes.shape().isRequired,
  userDefaults: PropTypes.shape().isRequired,
  getDefaultSetting: PropTypes.func.isRequired,
  getUserDefault: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  firmSettingOnCallback: PropTypes.func,
};

export default Settings;
