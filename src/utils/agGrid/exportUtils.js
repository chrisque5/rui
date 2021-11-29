const VISIBLE = 'Visible';
const ALL = 'All';

const processCellCallback = (cell) => {
  const valueFormatter = cell.column.colDef.valueFormatter;
  if (valueFormatter) {
    const params = cell;
    params.data = cell.node.data;// This is mandatory for valueFormatter
    return valueFormatter(params);
  }
  return cell.value;
};

const exportData = (params, type) => {
  const exportParams = params;
  const excludeCols = ['payerSTPStatusGroup', 'receiverSTPStatusGroup'];
  let selectedCols = [];
  if (type === VISIBLE) {
    selectedCols = exportParams.columnApi.getAllDisplayedColumns();
  } else {
    selectedCols = exportParams.columnApi.getAllColumns();
  }

  const exportCols = selectedCols.map(({ colId }) => colId).filter((colName) => !excludeCols.includes(colName));
  exportParams.columnKeys = exportCols;
  exportParams.columnGroups = true;
  exportParams.processCellCallback = processCellCallback;
  exportParams.api.exportDataAsExcel(exportParams);
};

const getExportMenuItems = (params) => {
  const menu = [
    {
      name: 'Export To Excel',
      subMenu: [
        {
          name: 'Visible Columns',
          action: () => exportData(params, VISIBLE),
        },
        {
          name: 'All Columns',
          action: () => exportData(params, ALL),
        },
      ],
    },
  ];
  return menu;
};

export {
  getExportMenuItems,
  exportData,
};
