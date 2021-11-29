import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import _ from 'lodash';
import { removeBlotterNewDealIds } from '../../actions/dealActions';
import { updateBlotterGridDetails } from '../../actions/uiActions';
import {
  getBlotterDeals, getBlotterInsertedDealIds, getBlotterIsDataLoading, getUserPermissions,
} from '../../utils/selectors';
import StatusBarLastUpdatedRenderer from './renderers/StatusBarLastUpdatedRenderer';
import SSEConnectionStatusRenderer from './renderers/SSEConnectionStatusRenderer';
import SearchCriteriaLabelRenderer from './renderers/SearchCriteriaLabelRenderer';
import fxColumnDefs from './columnDefs/fxColumnDefs';
import { getExportMenuItems } from '../../utils/agGrid/index';
import getClearColumnFiltersMenu from './filters/ClearColumnFilters';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.min.css';
import '../../styles/ag-theme-fusion-light.css';
import '../../styles/ag-theme-fusion-light-overrides.css';
// eslint-disable-next-line import/no-unresolved
import '../../styles/compiled/ag-grid-custom.css';

const BlotterTable = ({ quickFilterText }) => {
  const dispatch = useDispatch();
  const blotterDeals = useSelector(getBlotterDeals);
  const isDataLoading = useSelector(getBlotterIsDataLoading);
  const insertedDealIds = useSelector(getBlotterInsertedDealIds);
  const permissions = useSelector(getUserPermissions);
  const [gridApi, setGridApi] = useState(null);
  const [columnsApi, setColumnsApi] = useState(null);
  const [columns, setColumns] = useState([]);
  const { validForDealEdit } = permissions;
  /**
   * When the grid is ready set local state for the grid and column apis
   *
   * @param {Object} params  the grid params
   */
  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnsApi(params.columnApi);
  };

  const getCols = useCallback(() => {
    const uiCols = fxColumnDefs(dispatch, permissions);
    const savedCols = JSON.parse(localStorage.getItem('blotterColumnState'));

    let newUICols = _.cloneDeep(uiCols);
    if (savedCols && savedCols.length > 0) {
      // Re arrange groups first
      const newGroupsArr = [];
      let previousGrpName = '';
      savedCols.forEach(({ colId }) => {
        uiCols.forEach(((grpDef) => {
          const { children, groupId } = grpDef;
          if (children.filter((col) => col.field === colId).length > 0) {
            if (previousGrpName === '' || previousGrpName !== groupId) {
              newGroupsArr[newGroupsArr.length] = _.cloneDeep(grpDef);
              previousGrpName = groupId;
            }
          }
        }));
      });
      // Re arrange columns inside each group
      newUICols = _.cloneDeep(newGroupsArr);
      newGroupsArr.forEach((grp, grpIndex) => {
        newUICols[grpIndex].children = [];
        savedCols.forEach((saveCol) => {
          newGroupsArr[grpIndex].children.forEach((col, orignalIndex) => {
            if (col.field === saveCol.colId) {
              const newPositionindex = newUICols[grpIndex].children.length;
              newUICols[grpIndex].children[newPositionindex] = { ...newGroupsArr[grpIndex].children[orignalIndex], ...saveCol };
            }
          });
        });
        // add new items directly to new Array
        const addedArray = _.differenceBy(_.sortBy(newGroupsArr[grpIndex].children, ['field']),
          _.sortBy(newUICols[grpIndex].children, ['field']), 'field');
        addedArray.forEach((colDef) => {
          colDef.hide = true;// eslint-disable-line no-param-reassign
        });
        newUICols[grpIndex].children = [...newUICols[grpIndex].children, ...addedArray];
      });
    }

    return newUICols;
  }, [dispatch, permissions]);

  useEffect(() => {
    if (permissions) {
      setColumns(getCols());
    }
  }, [permissions, getCols]);

  useEffect(() => {
    if (gridApi === null) {
      return;
    }

    if (!isDataLoading) {
      gridApi.hideOverlay();
      gridApi.onFilterChanged();
    } else {
      gridApi.showLoadingOverlay();
    }
  }, [blotterDeals, columnsApi, isDataLoading, gridApi]);

  /**
   * When insertedDealIds changes loop through the array
   * and flash the row to signal that it's a new entry
   */
  useEffect(() => {
    if (!insertedDealIds.length) {
      return;
    }

    const rowNodes = [];
    const processedDealIds = [];

    // loop through the ids and if there's a rownode flash the row
    for (let i = 0; i < insertedDealIds.length; i += 1) {
      const dealId = insertedDealIds[i];
      const rowNode = gridApi.getRowNode(dealId);

      if (rowNode !== undefined) {
        rowNodes.push(rowNode);
      }

      processedDealIds.push(dealId);
    }

    // flash the new row(s)
    gridApi.refreshCells({ force: true, rowNodes: [...rowNodes] });
    gridApi.flashCells({ rowNodes: [...rowNodes] });

    // remove processed deal ids from the state
    dispatch(removeBlotterNewDealIds([...processedDealIds]));
  }, [dispatch, gridApi, insertedDealIds]);

  const saveColumnState = () => {
    const columnState = JSON.stringify(columnsApi.getColumnState());
    localStorage.setItem('blotterColumnState', columnState);
  };

  const rowStyleFormatter = ({ data = {} }) => {
    if (data.dealAction === 'CANCEL') {
      return { color: '#DB0505' };
    } if (data.isDealUnderInvestigation) {
      return { color: '#FFBF00' };
    }
    return { color: '#6E777C' };
  };

  const onFilterChanged = (event) => {
    const api = event.api;
    if (api) {
      const fitleredDeals = [];
      api.forEachNodeAfterFilter((node) => fitleredDeals.push(node.data));
      dispatch(updateBlotterGridDetails({ fitleredDeals }));
    }
  };

  const getMainMenuItems = (params) => {
    const defaulMenuOptions = params.defaultItems.map((menuItem) => {
      if (menuItem === 'resetColumns') {
        return {
          name: 'Reset Columns',
          action: () => {
            localStorage.removeItem('blotterColumnState');
            setColumns([]);// remove all first
            setColumns(getCols());// render again
          },
        };
      }
      return menuItem;
    });

    const clearFiltersMenu = getClearColumnFiltersMenu(params);
    const mainMenuItems = defaulMenuOptions.concat(clearFiltersMenu);
    return mainMenuItems;
  };

  const openEditDealWindow = (params) => {
    if (validForDealEdit) {
      const { dealEntityId } = params.node.data;
      const url = `${window.location.origin}/DMSWeb/reactjs/#/dealedit/${dealEntityId}`;
      window.open(url);
    }
  };

  const getContextMenuItems = (params) => {
    const clearFiltersMenu = getClearColumnFiltersMenu(params);
    const exportMenu = getExportMenuItems(params);
    const gridContextMenu = exportMenu.concat(clearFiltersMenu);
    if (validForDealEdit) {
      const viewDealMenu = {
        name: 'View Deal',
        action: () => openEditDealWindow(params),
      };
      gridContextMenu.push('separator');
      gridContextMenu.push(viewDealMenu);
    }

    return gridContextMenu;
  };

  /**
   * Set the grid options
   *  onGridReady - function to call onGridReady, formats column widths, initialises the gridApi state, etc
   *  animateRows- whether to animate rows on filtering, sorting, etc
   *  columnDefs - defines the column structure for the grid
   *  defaultColDef - sets the default column properties, specified below
   *    menuTabs - sets the menu tabs to show, and the order
   *    resizable - set column resizing on
   *    sortable - set column sorting on
   *    filter - set column filtering on
   *    cellClass - set cells to centered
        cellTooltip - show cell tooltips
   *  enableBrowserTooltips - use the browser tooltips
   *  frameworkComponents = specifies any framework components, like custom cell renderers
   *  immutableData - set data as immutible
   *  getRowNodeId - set the dealId as the id for the row
   *  onColumnGroupOpened - resize columns when column group opened
   *  onColumnMoved - fire event when column moved
   *  onColumnVisible - fire event when column hidden/unhidden
   *  overlayLoadingTemplate - the template shown when data is loading
   *  rowHeight - the height of each row in the grid
   *  statusBar - the footer of the table
   *  tooltipShowDelay - the delay on the tooltip showing
   */
  const gridOptions = {
    onGridReady,
    animateRows: true,
    columnDefs: columns,
    defaultColDef: {
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
      resizable: true,
      sortable: true,
      filter: true,
      cellClass: 'centered',
      cellTooltip: true,
      enableCellChangeFlash: true,
      width: 100,
    },
    deltaRowDataMode: true,
    enableBrowserTooltips: true,
    frameworkComponents: {
      statusBarLastUpdatedRenderer: StatusBarLastUpdatedRenderer,
      sseConnectionStatusRenderer: SSEConnectionStatusRenderer,
      SearchCriteriaLabelRenderer,
    },
    immutableData: true,
    getRowNodeId: (data) => data.dmsDealReference,
    getRowStyle: rowStyleFormatter,
    getContextMenuItems,
    suppressDragLeaveHidesColumns: true,
    onColumnMoved: saveColumnState,
    onColumnVisible: saveColumnState,
    onColumnPinned: saveColumnState,
    onFilterChanged,
    onRowDoubleClicked: openEditDealWindow,
    overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while the data is loading</span>',
    rowHeight: 25,
    rowSelection: 'single',
    statusBar: {
      statusPanels: [
        { statusPanel: 'SearchCriteriaLabelRenderer', align: 'left' },
        { statusPanel: 'agFilteredRowCountComponent', align: 'center' },
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'center' },
        { statusPanel: 'statusBarLastUpdatedRenderer', align: 'right' },
        { statusPanel: 'sseConnectionStatusRenderer', align: 'right' },
      ],
    },
    tooltipShowDelay: 0,
    quickFilterText,
    getMainMenuItems,
  };

  return (
    <div className="blotter-table">
      <div className="ag-theme-balham" style={{ height: 'calc(100% - 25px)' }}>
        <div style={{ height: '500px' }}>
          <AgGridReact rowData={blotterDeals} {...gridOptions} />
        </div>
      </div>
    </div>
  );
};

BlotterTable.defaultProps = {
  quickFilterText: '',
};
BlotterTable.propTypes = {
  quickFilterText: PropTypes.string,
};

export default BlotterTable;
