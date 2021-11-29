import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Layout, Row, Input, Drawer,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getUserPermissions, getSSESessionId,
  getRtuBlotterCount, getSSEStatus,
} from '../../utils/selectors';
import { showWarningNotification } from '../../utils/notifications';

import { loadBlotterDeals, loadBlotterDealsSuccess } from '../../actions/dealActions';
import { resetBlotterSearch, changePage } from '../../actions/uiActions';
import {
  sseConnect, sseDisconnect, sseReset, terminateSSESession,
} from '../../actions/sseActions';
import { loadRtuBlotterCount, resetRtuBlotterCount } from '../../actions/blotterActions';
import TotalBrokerageRenderer from './renderers/TotalBrokerageRenderer';
import { MAX_BLOTTER_RTU, navMenuItems } from '../../utils/constants';

import BlotterTable from './BlotterTable';
import BlotterFilters from './filters/BlotterFilters';
import Forbidden from '../Error/Forbidden';
import NavbarContainer from '../Navbar/NavbarContainer';

const { Content } = Layout;

const BlotterContainer = () => {
  const dispatch = useDispatch();
  const permissions = useSelector(getUserPermissions);
  const { validForBlotterView } = permissions;
  const sessionId = useSelector(getSSESessionId);
  const rtuBlotterCount = useSelector(getRtuBlotterCount);
  const sseStatus = useSelector(getSSEStatus);
  const [quickFilterText, setQuickFilterText] = useState();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    const handleWindowOnFocus = () => {
      if (!document.hidden && rtuBlotterCount === '') {
        dispatch(loadRtuBlotterCount());
      }
    };

    if (rtuBlotterCount === '') {
      handleWindowOnFocus();
      document.addEventListener('visibilitychange', handleWindowOnFocus);
    }
    return () => {
      document.removeEventListener('visibilitychange', handleWindowOnFocus);
    };
  }, [dispatch, rtuBlotterCount]);

  useEffect(() => {
    // Reset the sse connection status to make sure previous status cleared.
    dispatch(sseReset());
    dispatch(changePage(navMenuItems.BLOTTER.key));

    return () => {
      dispatch(resetRtuBlotterCount());
      dispatch(changePage(''));
    };
  }, [dispatch]);

  const handleWindowBeforeUnload = useCallback(() => {
    async function terminateSession() {
      if (sessionId) {
        await dispatch(terminateSSESession(sessionId));
      }
    }
    if (localStorage.getItem('loggedInUser')) {
      terminateSession();
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (validForBlotterView && sseStatus === '') {
      if (rtuBlotterCount >= MAX_BLOTTER_RTU) {
        showWarningNotification('Max Blotter Limit',
          'Max no of browser tabs opened for Blotter. RTU will not be available. Please refresh blotter to get updates.');
        dispatch(loadBlotterDeals({ subscribeToUpdates: false }));
      } else if (rtuBlotterCount !== '') {
        dispatch(sseConnect());
      }
    }
  }, [dispatch, validForBlotterView, sseStatus, rtuBlotterCount]);

  useEffect(() => {
    if (sseStatus === 'Connected') {
      window.addEventListener('beforeunload', handleWindowBeforeUnload, { once: true });
      dispatch(loadBlotterDeals({ sessionId, subscribeToUpdates: true }));
    }

    return () => {
      window.removeEventListener('beforeunload', handleWindowBeforeUnload);
      if (sessionId && localStorage.getItem('loggedInUser')) {
        dispatch(sseDisconnect());
      }
    };
  }, [dispatch, sseStatus, sessionId, handleWindowBeforeUnload]);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const refreshData = () => {
    dispatch(loadBlotterDealsSuccess({ data: [] }));// For cell renderers to be refreshed with new data
    dispatch(resetBlotterSearch(true));
  };

  const onQuickFilterText = (event) => {
    setQuickFilterText(event.target.value);
  };

  const renderHelperControls = () => (
    <Row justify="space-between" className="blotter-helper-controls">
      <Col>
        <Button icon={<SearchOutlined />} onClick={showDrawer} type="primary" size="large" data-testid="btnShowSearch">Search</Button>
        <Button type="primary" size="large" onClick={() => refreshData()} style={{ marginLeft: 5 }} data-testid="btnToday">Today</Button>
      </Col>
      <Col>
        <div>
          <span style={{ float: 'left', marginRight: 10 }}>
            <Input
              allowClear
              data-testid="txtQuickFilter"
              id="quickFilter"
              onChange={onQuickFilterText}
              placeholder="Enter text to filter blotter"
              style={{ width: 200 }}
            />
          </span>
          <span style={{ float: 'left', marginRight: 10 }}><TotalBrokerageRenderer /></span>
        </div>
      </Col>
    </Row>
  );

  const renderBlotterTable = () => (
    <Layout>
      <Drawer
        title="Blotter Search"
        placement="left"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        closable={false}
        forceRender
      >
        <BlotterFilters closeDrawer={closeDrawer} />
      </Drawer>
      <Layout style={{ padding: '0 1rem', maxHeight: '100vh' }}>
        <Content style={{ margin: '0' }}>
          {renderHelperControls()}
          <BlotterTable quickFilterText={quickFilterText} />
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <>
      <NavbarContainer selectedKey="BLOTTER" />
      {
        Object.entries(permissions).length && (
        <div className="dms-blotter">
          {
          validForBlotterView ? renderBlotterTable() : <Forbidden />
        }
        </div>
        )
      }
    </>
  );
};

export default BlotterContainer;
