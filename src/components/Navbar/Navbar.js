import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LogoutOutlined, SettingFilled, CaretDownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import logo from '../../img/tpicap.png';
import SettingsContainer from '../Settings/SettingsContainer';
import { navMenuItems } from '../../utils/constants';

const {
  ADMIN, BLOTTER, FWD, NDF, SPT, EDIT,
} = navMenuItems;

const Navbar = (props) => {
  const [openKeys, setOpenKeys] = useState([]);
  const {
    logout,
    selectedKey,
    settings,
    fullName = '',
    permissions = {},
    shouldRenderLinks,
    onNavMenuItemChange,
  } = props;

  const {
    validForDeskEdit,
    validForFwd,
    validForNdf,
    validForSpt,
    validForBlotterView,
    validForDealEdit,
  } = permissions;

  /**
   * Render a menu item
   * @param {boolean} isValid
   * @param {Object} link
   */
  const renderMenuItem = (isValid, link) => {
    const {
      key, to, text, target,
    } = link;

    return shouldRenderLinks && isValid ? (
      <Menu.Item key={key} disabled={key === 'EDIT'}>
        <Link to={to} target={target}>
          <span>{text}</span>
        </Link>
      </Menu.Item>
    ) : null;
  };

  const isSettingVisible = () => validForNdf || validForFwd || validForSpt;
  const onOpenChange = (items) => setOpenKeys(items);

  return (
    <div className="dms-trade-capture-navbar ant-menu-dark">
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        selectable={false}
        onClick={onNavMenuItemChange}
        className="navbar-menu"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Menu.Item key="home" className="ant-menu-item-no-link">
          <img src={logo} width="30" height="30" alt="logo" style={{ marginRight: 15 }} />
          <span>Deal Management System</span>
        </Menu.Item>

        {renderMenuItem(validForNdf, NDF)}
        {renderMenuItem(validForFwd, FWD)}
        {renderMenuItem(validForSpt, SPT)}
        {renderMenuItem(validForDeskEdit, ADMIN)}
        {renderMenuItem(validForBlotterView, BLOTTER)}
        {renderMenuItem(validForDealEdit, EDIT)}
        <Menu.SubMenu
          key="submenu"
          title={(
            <span data-testid="ddlUserDropdown" id="ddlUserDropdown" className="submenu-title-wrapper">
              {fullName}
              <CaretDownOutlined />
            </span>
          )}
          className="user-name"
        >
          <Menu.Item
            onClick={logout}
            data-testid="btnLogout"
            id="btnLogout"
            key="logout"
          >
            <LogoutOutlined />
            Logout
          </Menu.Item>
        </Menu.SubMenu>
        {isSettingVisible() && (
        <Menu.Item
          onClick={settings}
          data-testid="btnSettings"
          id="btnSettings"
          className="btn-settings"
          key="settings"
        >
          <SettingFilled />
        </Menu.Item>
        )}
      </Menu>
      <SettingsContainer dealType={selectedKey} />
    </div>
  );
};

Navbar.defaultProps = {
  permissions: {},
  fullName: '',
  shouldRenderLinks: true,
};

Navbar.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  settings: PropTypes.func.isRequired,
  permissions: PropTypes.objectOf(PropTypes.bool),
  fullName: PropTypes.string,
  shouldRenderLinks: PropTypes.bool,
  onNavMenuItemChange: PropTypes.func.isRequired,
};

export default Navbar;
