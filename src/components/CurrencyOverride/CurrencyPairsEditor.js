import { forwardRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import CLSRenderer from './renderers/CLSRenderer';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.min.css';
import '../../styles/ag-theme-fusion-light.css';
import '../../styles/ag-theme-fusion-light-overrides.css';
// eslint-disable-next-line import/no-unresolved
import '../../styles/compiled/ag-grid-custom.css';

const CurrencyPairsEditor = forwardRef(({ currencyPairsData, onDataChange, isLoading }, ref) => {
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    if (gridApi) {
      if (!isLoading) {
        gridApi.hideOverlay();
      } else {
        gridApi.showLoadingOverlay();
      }
    }
  }, [gridApi, isLoading]);

  useEffect(() => {
    if (gridApi) {
      gridApi.setRowData(currencyPairsData);
    }
  }, [currencyPairsData, gridApi]);

  const onModelUpdated = ({ api }) => {
    api.sizeColumnsToFit();
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const gridConfig = {
    onGridReady,
    columnDefs: [{
      headerName: 'Currency 1',
      field: 'baseCurrency',
      width: 120,
      suppressSizeToFit: true,
    }, {
      headerName: 'Currency 2',
      field: 'counterCurrency',
      width: 120,
      suppressSizeToFit: true,
    }, {
      headerName: 'CLS',
      field: 'isCLS',
      valueFormatter: ({ value }) => (value === 'true' ? 'Enabled' : 'Disabled'),
      width: 100,
      cellRenderer: CLSRenderer,
    }],
    defaultColDef: {
      menuTabs: [],
      cellClass: 'centered',
      enableCellChangeFlash: false,
    },
    rowData: currencyPairsData,
    rowHeight: 25,
    headerHeight: 25,
    overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while the data is loading</span>',
    onModelUpdated,
    onCellValueChanged: onDataChange,
    suppressContextMenu: true,
  };
  return (
    <div className="currency-pair-editor ag-theme-balham" style={{ height: '250px', width: '100%' }}>
      <AgGridReact ref={ref} {...gridConfig} />
    </div>
  );
});

CurrencyPairsEditor.propTypes = {
  currencyPairsData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDataChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CurrencyPairsEditor;
