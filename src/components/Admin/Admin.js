import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { initUserData } from '../../actions/userActions';
import { resetAdminTabChanges, changePage } from '../../actions/uiActions';
import { getUser, getIsBrowserForceRefreshEnabled } from '../../utils/selectors';
import ConfirmBeforeUnload from '../../utils/ConfirmBeforeUnload';
import { ConfirmUnsavedChanges } from '../../utils/helper';
import { navMenuItems } from '../../utils/constants';

import NavbarContainer from '../Navbar/NavbarContainer';
import Forbidden from '../Error/Forbidden';
import BrokerOverrideContainer from '../BrokerOverride/BrokerOverrideContainer';
import CurrencyOverrideContainer from '../CurrencyOverride/CurrencyOverrideContainer';

const { TabPane } = Tabs;

const Admin = () => {
  const adminTabs = {
    BROKERS: 'Brokers',
    CURRENCIES: 'Currencies',
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(adminTabs.BROKERS);
  const [isTabDirty, setIsTabDirty] = useState(false);
  const { fullName, permissions = {} } = useSelector(getUser);
  const { validForDeskEdit, validForFwd } = permissions;
  const isBrowserForceRefreshEnabled = useSelector(getIsBrowserForceRefreshEnabled);

  useEffect(() => {
    dispatch(initUserData());
    dispatch(changePage(navMenuItems.ADMIN.key));

    return () => {
      dispatch(changePage(''));
    };
  }, [dispatch]);

  const checkDirtyTab = (nextTab) => {
    if (isTabDirty) {
      ConfirmUnsavedChanges(
        'You have unsaved changes in this tab. Are you sure you want to switch?',
        () => {
          dispatch(resetAdminTabChanges(true));
          setActiveTab(nextTab);
        },
      );
      return false;
    }
    setActiveTab(nextTab);
    return true;
  };

  const confirmNavigation = (location) => {
    ConfirmUnsavedChanges(
      'You have unsaved changes. Are you sure you want to leave the Admin screen?',
      () => {
        setIsTabDirty(false);
        history.push(location.pathname);
      },
    );
    return false;
  };

  return (
    <>
      {!isBrowserForceRefreshEnabled && isTabDirty && <ConfirmBeforeUnload />}
      <Prompt when={isTabDirty} message={confirmNavigation} />
      <NavbarContainer selectedKey="ADMIN" />
      {validForDeskEdit ? (
        <div className="dms-web-admin">
          <Tabs activeKey={activeTab} type="card" onChange={(nextTab) => checkDirtyTab(nextTab)}>
            <TabPane test-id={adminTabs.BROKERS} tab="Brokers" key={adminTabs.BROKERS}>
              <BrokerOverrideContainer setIsTabDirty={setIsTabDirty} />
            </TabPane>
            {validForFwd && (
              <TabPane test-id={adminTabs.CURRENCIES} tab="Currencies" key={adminTabs.CURRENCIES}>
                <CurrencyOverrideContainer setIsTabDirty={setIsTabDirty} />
              </TabPane>
            )}
          </Tabs>
        </div>
      ) : fullName && <Forbidden />}
    </>
  );
};

export default Admin;
