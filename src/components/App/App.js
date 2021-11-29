import moment from 'moment-timezone';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { LicenseManager } from 'ag-grid-enterprise';
import { initUserData } from '../../actions/userActions';
import { loadLicenseKey } from '../../actions/systemSettingsActions';
import { getLocale } from '../../utils/localeHelper';
import { getUserFullName, getLicenseKey } from '../../utils/selectors';
import { saveCurrentPageAndRedirect, clearWindowName } from '../../utils/windowHelper';

import Home from '../Home/Home';
import Deal from '../Deal/Deal';
import DealEdit from '../DealEdit/DealEdit';
import Admin from '../Admin/Admin';
import NotFound from '../Error/NotFound';
import ErrorBoundary from '../Error/ErrorBoundary';
import BlotterContainer from '../Blotter/BlotterContainer';

const App = () => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserFullName);
  const AG_GRID_LICENSE = useSelector(getLicenseKey);

  useEffect(() => {
    moment.locale(navigator.language || navigator.languages[0] || 'en-GB');
    moment.tz.setDefault('Europe/London');
    dispatch(loadLicenseKey());

    async function fetchUserData() {
      await dispatch(initUserData());
    }
    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    if (AG_GRID_LICENSE) { LicenseManager.setLicenseKey(AG_GRID_LICENSE); }
  }, [AG_GRID_LICENSE]);

  useEffect(() => {
    // Clearining window name if previously exists
    clearWindowName();
    if (userName !== '' && localStorage.getItem('loggedInUser') !== userName) {
      localStorage.setItem('loggedInUser', userName);
    }
    // It will trigger when local storage changed in another window
    window.onstorage = () => {
      if (!localStorage.getItem('loggedInUser')) {
        window.close();
        // Capturing the current page if window not closed
        saveCurrentPageAndRedirect(userName);
      }
    };
  }, [userName]);

  const routes = [
    { path: '/', exact: true, component: Home },
    { path: '/deal/:dealType', component: Deal },
    { path: '/dealedit/:dealId', component: DealEdit },
    { path: '/admin', component: Admin },
    { path: '/blotter', component: BlotterContainer },
    { path: '*', component: NotFound },
  ];

  return (
    <ConfigProvider locale={getLocale()}>
      <ErrorBoundary>
        <HashRouter>
          <Switch>
            {
              routes.map((route) => {
                const { component, exact, path } = route;
                return (<Route key={path} path={path} exact={exact} component={component} />);
              })
            }
          </Switch>
        </HashRouter>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
