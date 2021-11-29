import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import Navbar from './Navbar';
import * as uiActions from '../../actions/uiActions';
import * as sseActions from '../../actions/sseActions';
import * as notification from '../../utils/notifications';
import { navMenuItems, APPLICATION_TITLE } from '../../utils/constants';
import { saveCurrentPageAndRedirect } from '../../utils/windowHelper';
import { cancel } from '../../api/restApi';

class NavbarContainer extends Component {
  refreshPageAfterDateChange = () => {
    const now = new Date();
    const midNight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const msTillMidNight = midNight - now;
    if (msTillMidNight > 0) {
      this.refreshTimeOut = setTimeout(() => {
        this.props.uiActions.enableBrowserForceRefresh(true);
        // make sure date changes before refresh
        setTimeout(() => {
          window.location.reload(true);
        }, 100);
      },
      msTillMidNight);
    }
  };

  componentDidMount = () => {
    this.refreshPageAfterDateChange();
  };

  logout = () => {
    cancel();

    fetch(`${process.env.REACT_APP_API_URL}/services/user/expireSession`, {
      credentials: 'include',
    }).then(() => {
      notification.showSuccessNotification('Logged Out', `User ${this.props.fullName} logged out`);
    }).then(() => {
      setTimeout(() => {
        localStorage.removeItem('loggedInUser');
        // Capturing the current page to use if user login in another window
        saveCurrentPageAndRedirect(this.props.fullName);
      }, 500);
    });
  };

  confirmLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      okText: 'Logout',
      okButtonProps: { 'data-testid': 'btnLogoutConfirm' },
      cancelText: 'Cancel',
      onOk: this.logout,
    });
  }

  showSettings = () => {
    this.props.uiActions.toggleSettingsModal();
  };

  setDocumentTitle = () => {
    const navMenuItem = navMenuItems[this.props.selectedKey];
    if (navMenuItem && this.props.selectedKey !== 'EDIT') {
      document.title = `${navMenuItem.documentTitle} - ${APPLICATION_TITLE}`;
    }
  };

  componentWillUnmount = () => {
    if (this.refreshTimeOut) {
      clearTimeout(this.refreshTimeOut);
    }
  };

  onNavMenuItemChange = ({ key }) => {
    const sessionId = this.props.sessionId;
    if (navMenuItems[key] && key !== 'BLOTTER' && sessionId) {
      this.props.sseActions.terminateSSESession(sessionId);
    }
  }

  render() {
    this.setDocumentTitle();
    return (
      <Navbar
        selectedKey={this.props.selectedKey}
        fullName={this.props.fullName}
        logout={this.confirmLogout}
        settings={this.showSettings}
        permissions={this.props.permissions}
        shouldRenderLinks={this.props.shouldRenderLinks}
        onNavMenuItemChange={this.onNavMenuItemChange}
      />
    );
  }
}

NavbarContainer.defaultProps = {
  selectedKey: '',
  fullName: '',
  permissions: {},
  shouldRenderLinks: true,
  sessionId: '',
};

NavbarContainer.propTypes = {
  selectedKey: PropTypes.string,
  fullName: PropTypes.string,
  uiActions: PropTypes.shape().isRequired,
  permissions: PropTypes.objectOf(PropTypes.bool),
  shouldRenderLinks: PropTypes.bool,
  sessionId: PropTypes.string,
  sseActions: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ user = {}, sse = {} }) => ({
  fullName: user.fullName,
  permissions: user.permissions,
  sessionId: sse.sessionId,
});

const mapDispatchToProps = (dispatch) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  sseActions: bindActionCreators(sseActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
