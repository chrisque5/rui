import fxColumnDefs from '../columnDefs/fxColumnDefs';

test('fxColumnDefs has the correct number of groups', () => {
  expect(fxColumnDefs().length).toEqual(4);
});

test('fxColumnDefs deal has the correct properties', () => {
  const [col] = fxColumnDefs();
  const {
    children = [], headerClass, headerName, marryChildren, groupId,
  } = col;

  expect(headerName).toEqual('Deal');
  expect(headerClass).toEqual('deal-group-header');
  expect(marryChildren).toEqual(true);

  expect(children.length).toEqual(29);
  expect(groupId).toEqual('deal');

  const [
    c1, c2, c3, c4, c5, c6,
    c7, c8, c9, c10, c11, c12,
    c13, c14, c15, c16, c17, c18,
    c19, c20, c21, c22, c23, c24,
    c25, c26, c27, c28, c29,
  ] = children;

  expect(c1.headerName).toEqual('Chk');
  expect(c1.field).toEqual('isDealUnderInvestigation');
  expect(c1.colId).toEqual('isDealUnderInvestigation');
  expect(typeof c1.cellRenderer).toBe('function');
  expect(c1.cellClass).toEqual('centered');

  expect(c2.headerName).toEqual('ID');
  expect(c2.colId).toEqual('dmsDealReference');
  expect(c2.tooltipField).toEqual('dmsDealReference');
  expect(c2.tooltipField).toEqual('dmsDealReference');
  expect(c2.lockVisible).toBeTruthy();

  expect(c3.headerName).toEqual('Action');
  expect(c3.field).toEqual('dealAction');
  expect(c3.colId).toEqual('dealAction');
  expect(c3.tooltipField).toEqual('dealAction');

  expect(c4.headerName).toEqual('Type');
  expect(c4.field).toEqual('dealType');
  expect(c4.colId).toEqual('dealType');
  expect(c4.tooltipField).toEqual('dealType');
  expect(c4.lockVisible).toBeTruthy();

  expect(c5.headerName).toEqual('Strategy');
  expect(c5.field).toEqual('tradeStrategy');
  expect(c5.field).toEqual('tradeStrategy');
  expect(c5.tooltipField).toEqual('tradeStrategy');

  expect(c6.headerName).toEqual('Chain Reference');
  expect(c6.field).toEqual('chainId');
  expect(c6.colId).toEqual('chainId');
  expect(c6.tooltipField).toEqual('chainId');
  expect(c6.columnGroupShow).toEqual('open');

  expect(c7.headerName).toEqual('Trade Date');
  expect(c7.field).toEqual('tradeDate');
  expect(c7.colId).toEqual('tradeDate');
  expect(c7.tooltipField).toEqual('tradeDate');
  expect(c7.columnGroupShow).toEqual('open');
  expect(typeof c7.filterParams.comparator).toBe('function');
  expect(c7.filterParams.comparator()).toEqual(1);

  expect(c8.headerName).toEqual('Trade Time');
  expect(c8.field).toEqual('tradeTime');
  expect(c8.colId).toEqual('tradeTime');
  expect(c8.tooltipField).toEqual('tradeTime');
  expect(c8.columnGroupShow).toEqual('open');
  expect(typeof c8.filterParams.comparator).toBe('function');
  expect(c8.filterParams.comparator()).toEqual(1);

  expect(c9.headerName).toEqual('Value Date');
  expect(c9.field).toEqual('valueDate');
  expect(c9.colId).toEqual('valueDate');
  expect(c9.tooltipField).toEqual('valueDate');
  expect(c9.columnGroupShow).toEqual('open');
  expect(typeof c9.filterParams.comparator).toBe('function');
  expect(c9.filterParams.comparator()).toEqual(1);

  expect(c10.headerName).toEqual('Fixing Date');
  expect(c10.field).toEqual('fixingDate');
  expect(c10.colId).toEqual('fixingDate');
  expect(c10.tooltipField).toEqual('fixingDate');
  expect(c10.columnGroupShow).toEqual('open');
  expect(typeof c10.filterParams.comparator).toBe('function');
  expect(c10.filterParams.comparator()).toEqual(1);

  expect(c11.headerName).toEqual('Publish Date');
  expect(c11.field).toEqual('publishDate');
  expect(c11.colId).toEqual('publishDate');
  expect(c11.tooltipField).toEqual('publishDate');
  expect(c11.columnGroupShow).toEqual('open');
  expect(typeof c11.filterParams.comparator).toBe('function');
  expect(c11.filterParams.comparator()).toEqual(1);

  expect(c12.headerName).toEqual('Venue Type');
  expect(c12.field).toEqual('executionVenueType');
  expect(c12.colId).toEqual('executionVenueType');
  expect(c12.columnGroupShow).toEqual('open');

  expect(c13.headerName).toEqual('Amount');
  expect(c13.field).toEqual('notionalAmount');
  expect(c13.colId).toEqual('notionalAmount');
  expect(c13.tooltipField).toEqual('notionalAmount');
  expect(typeof c13.tooltipValueGetter).toEqual('function');
  expect(c13.tooltipValueGetter({ value: { value: 12.345 } })).toEqual('12.35');
  expect(c13.columnGroupShow).toEqual('open');
  expect(typeof c13.valueFormatter).toBe('function');
  expect(c13.valueFormatter({ value: 12.3456 })).toEqual('12.35');
  expect(typeof c13.filterParams.comparator).toBe('function');
  expect(c13.filterParams.comparator()).toEqual(1);

  expect(c14.headerName).toEqual('Price');
  expect(c14.field).toEqual('price');
  expect(c14.colId).toEqual('price');
  expect(typeof c14.tooltipValueGetter).toBe('function');
  expect(c14.columnGroupShow).toEqual('open');
  expect(typeof c14.valueFormatter).toEqual('function');
  expect(c14.valueFormatter({ value: 12.3456 })).toEqual('12.3456');
  expect(typeof c14.filterParams.comparator).toBe('function');
  expect(c14.filterParams.comparator()).toEqual(1);

  expect(c15.headerName).toEqual('Buy Broker');
  expect(c15.field).toEqual('payerBrokerName');
  expect(c15.colId).toEqual('payerBrokerName');
  expect(c15.tooltipField).toEqual('payerBrokerName');

  expect(c16.headerName).toEqual('Buy Broker Long Name');
  expect(c16.field).toEqual('payerBrokerLongName');
  expect(c16.colId).toEqual('payerBrokerLongName');
  expect(c16.tooltipField).toEqual('payerBrokerLongName');

  expect(c17.headerName).toEqual('Buy Customer');
  expect(c17.field).toEqual('payerCustomerName');
  expect(c17.colId).toEqual('payerCustomerName');
  expect(c17.tooltipField).toEqual('payerCustomerName');

  expect(c18.headerName).toEqual('Buy Customer Long Name');
  expect(c18.field).toEqual('payerCustomerLongName');
  expect(c18.colId).toEqual('payerCustomerLongName');
  expect(c18.tooltipField).toEqual('payerCustomerLongName');

  expect(c19.headerName).toEqual('Buy Trader');
  expect(c19.field).toEqual('payerTraderName');
  expect(c19.colId).toEqual('payerTraderName');
  expect(c19.tooltipField).toEqual('payerTraderName');

  expect(c20.headerName).toEqual('Buy Trader Long Name');
  expect(c20.field).toEqual('payerTraderLongName');
  expect(c20.colId).toEqual('payerTraderLongName');
  expect(c20.tooltipField).toEqual('payerTraderLongName');

  expect(c21.headerName).toEqual('Buy Third Party Agent Name');
  expect(c21.field).toEqual('payerThirdPartyAgentName');
  expect(c21.colId).toEqual('payerThirdPartyAgentName');
  expect(c21.tooltipField).toEqual('payerThirdPartyAgentName');

  expect(c22.headerName).toEqual('Sell Broker');
  expect(c22.field).toEqual('receiverBrokerName');
  expect(c22.colId).toEqual('receiverBrokerName');
  expect(c22.tooltipField).toEqual('receiverBrokerName');

  expect(c23.headerName).toEqual('Sell Broker Long Name');
  expect(c23.field).toEqual('receiverBrokerLongName');
  expect(c23.colId).toEqual('receiverBrokerLongName');
  expect(c23.tooltipField).toEqual('receiverBrokerLongName');

  expect(c24.headerName).toEqual('Sell Customer');
  expect(c24.field).toEqual('receiverCustomerName');
  expect(c24.colId).toEqual('receiverCustomerName');
  expect(c24.tooltipField).toEqual('receiverCustomerName');

  expect(c25.headerName).toEqual('Sell Customer Long Name');
  expect(c25.field).toEqual('receiverCustomerLongName');
  expect(c25.colId).toEqual('receiverCustomerLongName');
  expect(c25.tooltipField).toEqual('receiverCustomerLongName');

  expect(c26.headerName).toEqual('Sell Trader');
  expect(c26.field).toEqual('receiverTraderName');
  expect(c26.colId).toEqual('receiverTraderName');
  expect(c26.tooltipField).toEqual('receiverTraderName');

  expect(c27.headerName).toEqual('Sell Trader Long Name');
  expect(c27.field).toEqual('receiverTraderLongName');
  expect(c27.colId).toEqual('receiverTraderLongName');
  expect(c27.tooltipField).toEqual('receiverTraderLongName');

  expect(c28.headerName).toEqual('Sell Third Party Agent Name');
  expect(c28.field).toEqual('receiverThirdPartyAgentName');
  expect(c28.colId).toEqual('receiverThirdPartyAgentName');
  expect(c28.tooltipField).toEqual('receiverThirdPartyAgentName');

  expect(c29.headerName).toEqual('Status');
  expect(c29.field).toEqual('dealStatus');
  expect(c29.colId).toEqual('dealStatus');
  expect(c29.tooltipField).toEqual('dealStatus');
});

test('fxColumnDefs Approvals has the correct properties', () => {
  const [, col] = fxColumnDefs();
  const {
    children = [], headerClass, headerName, marryChildren, groupId,
  } = col;

  expect(headerName).toEqual('Approvals');
  expect(headerClass).toEqual('approvals-group-header');
  expect(marryChildren).toEqual(true);
  expect(children.length).toEqual(8);
  expect(groupId).toEqual('approvals');

  const [c1, c2, c3, c4, c5, c6, c7, c8] = children;

  expect(c1.headerClass).toEqual('approvals-group-header');
  expect(c1.marryChildren).toEqual(true);
  expect(c1.headerName).toEqual('Buy');
  expect(c1.field).toEqual('payerOverallApprovalStatus');
  expect(c1.colId).toEqual('payerOverallApprovalStatus');
  expect(c1.columnGroupShow).toEqual('closed');
  expect(typeof c1.cellRenderer).toBe('function');
  expect(c1.cellRenderer({})).not.toEqual('');
  expect(c1.cellRendererParams.side).toEqual('PAYER');
  expect(c1.lockPinned).toEqual(true);

  expect(c2.headerClass).toEqual('approvals-group-header');
  expect(c2.marryChildren).toEqual(true);
  expect(c2.headerName).toEqual('Sell');
  expect(c2.field).toEqual('receiverOverallApprovalStatus');
  expect(c2.colId).toEqual('receiverOverallApprovalStatus');
  expect(c2.columnGroupShow).toEqual('closed');
  expect(typeof c2.cellRenderer).toBe('function');
  expect(c2.cellRenderer({})).not.toEqual('');
  expect(c2.cellRendererParams.side).toEqual('RECEIVER');
  expect(c2.lockPinned).toEqual(true);

  expect(c3.headerClass).toEqual('approvals-group-header');
  expect(c3.marryChildren).toEqual(true);
  expect(c3.headerName).toEqual('Buy Broker');
  expect(c3.field).toEqual('payerBrokerApprovalState');
  expect(c3.colId).toEqual('payerBrokerApprovalState');
  expect(c3.columnGroupShow).toEqual('open');
  expect(typeof c3.cellRenderer).toBe('function');
  expect(c3.cellRenderer({})).not.toEqual('');

  expect(c4.headerClass).toEqual('approvals-group-header');
  expect(c4.marryChildren).toEqual(true);
  expect(c4.headerName).toEqual('Buy Mid-Office');
  expect(c4.field).toEqual('payerMidOfficeApprovalState');
  expect(c4.colId).toEqual('payerMidOfficeApprovalState');
  expect(c4.columnGroupShow).toEqual('open');
  expect(typeof c4.cellRenderer).toBe('function');
  expect(c4.cellRenderer({})).not.toEqual('');

  expect(c5.headerClass).toEqual('approvals-group-header');
  expect(c5.marryChildren).toEqual(true);
  expect(c5.headerName).toEqual('Buy Trader');
  expect(c5.field).toEqual('payerTraderApprovalState');
  expect(c5.field).toEqual('payerTraderApprovalState');
  expect(c5.columnGroupShow).toEqual('open');
  expect(typeof c5.cellRenderer).toBe('function');
  expect(c5.cellRenderer({})).not.toEqual('');

  expect(c6.headerClass).toEqual('approvals-group-header');
  expect(c6.marryChildren).toEqual(true);
  expect(c6.headerName).toEqual('Sell Broker');
  expect(c6.field).toEqual('receiverBrokerApprovalState');
  expect(c6.colId).toEqual('receiverBrokerApprovalState');
  expect(c6.columnGroupShow).toEqual('open');
  expect(typeof c6.cellRenderer).toBe('function');
  expect(c6.cellRenderer({})).not.toEqual('');

  expect(c7.headerClass).toEqual('approvals-group-header');
  expect(c7.marryChildren).toEqual(true);
  expect(c7.headerName).toEqual('Sell Mid-Office');
  expect(c7.field).toEqual('receiverMidOfficeApprovalState');
  expect(c7.colId).toEqual('receiverMidOfficeApprovalState');
  expect(c7.columnGroupShow).toEqual('open');
  expect(typeof c7.cellRenderer).toBe('function');
  expect(c7.cellRenderer({})).not.toEqual('');

  expect(c8.headerClass).toEqual('approvals-group-header');
  expect(c8.marryChildren).toEqual(true);
  expect(c8.headerName).toEqual('Sell Trader');
  expect(c8.field).toEqual('receiverTraderApprovalState');
  expect(c8.colId).toEqual('receiverTraderApprovalState');
  expect(c8.columnGroupShow).toEqual('open');
  expect(typeof c8.cellRenderer).toBe('function');
  expect(c8.cellRenderer({})).not.toEqual('');
});

test('fxColumnDefs STP has the correct properties', () => {
  const [, , col] = fxColumnDefs();
  const {
    children = [], headerClass, headerName, marryChildren, groupId,
  } = col;

  expect(headerName).toEqual('STP');
  expect(headerClass).toEqual('stp-group-header');
  expect(marryChildren).toEqual(true);
  expect(children.length).toEqual(2);
  expect(groupId).toEqual('stp');

  const [c1, c2] = children;

  expect(c1.headerClass).toEqual('stp-group-header');
  expect(c1.marryChildren).toEqual(true);
  expect(c1.headerName).toEqual('Buy');
  expect(c1.field).toEqual('payerSTPStatusGroup');
  expect(c1.colId).toEqual('payerSTPStatusGroup');
  expect(typeof c1.cellRenderer).toBe('function');
  expect(c1.cellRenderer({})).toEqual('<span class="stp-traffic-icon" title="N/A">&nbsp;</span>');
  expect(c1.cellRendererParams.side).toEqual('PAYER');
  expect(typeof c1.filterParams.cellRenderer).toBe('function');
  expect(c1.filterParams.cellRenderer({})).not.toEqual('');

  expect(c2.headerClass).toEqual('stp-group-header');
  expect(c2.marryChildren).toEqual(true);
  expect(c2.headerName).toEqual('Sell');
  expect(c2.field).toEqual('receiverSTPStatusGroup');
  expect(c2.colId).toEqual('receiverSTPStatusGroup');
  expect(typeof c2.cellRenderer).toBe('function');
  expect(c2.cellRenderer({})).toEqual('<span class="stp-traffic-icon" title="N/A">&nbsp;</span>');
  expect(c2.cellRendererParams.side).toEqual('RECEIVER');
  expect(typeof c2.filterParams.cellRenderer).toBe('function');
  expect(c2.filterParams.cellRenderer({})).not.toEqual('');
});

test('fxColumnDefs Brokerage has the correct properties', () => {
  const [, , , col] = fxColumnDefs();
  const {
    children = [], headerClass, headerName, marryChildren, groupId,
  } = col;

  expect(headerName).toEqual('Brokerage');
  expect(headerClass).toEqual('brokerage-group-header');
  expect(marryChildren).toEqual(true);
  expect(children.length).toEqual(8);
  expect(groupId).toEqual('brokerage');

  const [c1, c2, c3, c4, c5, c6, c7, c8] = children;

  expect(c1.headerClass).toEqual('brokerage-group-header');
  expect(c1.marryChildren).toEqual(true);
  expect(c1.headerName).toEqual('Buy CCY');
  expect(c1.field).toEqual('payerBrokerageCurrency');
  expect(c1.colId).toEqual('payerBrokerageCurrency');
  expect(c1.tooltipField).toEqual('payerBrokerageCurrency');

  expect(c2.headerClass).toEqual('brokerage-group-header');
  expect(c2.marryChildren).toEqual(true);
  expect(c2.headerName).toEqual('Buy Amount');
  expect(c2.field).toEqual('payerBrokerageAmount');
  expect(c2.colId).toEqual('payerBrokerageAmount');
  expect(c2.tooltipField).toEqual('payerBrokerageAmount');
  expect(typeof c2.cellRenderer).toBe('function');
  expect(c2.cellRenderer({ data: null, value: '123' })).toEqual('123');
  expect(c2.cellRenderer({ value: '123.123' })).toEqual('123.12');
  expect(c2.cellRenderer({ value: '123.1' })).toEqual('123.10');

  expect(c3.headerClass).toEqual('brokerage-group-header');
  expect(c3.marryChildren).toEqual(true);
  expect(c3.headerName).toEqual('Buy Std CCY');
  expect(c3.field).toEqual('payerBrokerageStdCurrency');
  expect(c3.colId).toEqual('payerBrokerageStdCurrency');
  expect(c3.tooltipField).toEqual('payerBrokerageStdCurrency');

  expect(c4.headerClass).toEqual('brokerage-group-header');
  expect(c4.marryChildren).toEqual(true);
  expect(c4.headerName).toEqual('Buy Std Amount');
  expect(c4.field).toEqual('payerBrokerageStdAmount');
  expect(c4.colId).toEqual('payerBrokerageStdAmount');
  expect(c4.tooltipField).toEqual('payerBrokerageStdAmount');
  expect(typeof c4.cellRenderer).toBe('function');
  expect(c4.cellRenderer({ data: null, value: '123' })).toEqual('123');
  expect(c4.cellRenderer({ value: '34123.123' })).toEqual('34,123.12');

  expect(c5.headerClass).toEqual('brokerage-group-header');
  expect(c5.marryChildren).toEqual(true);
  expect(c5.headerName).toEqual('Sell CCY');
  expect(c5.field).toEqual('receiverBrokerageCurrency');
  expect(c5.colId).toEqual('receiverBrokerageCurrency');
  expect(c5.tooltipField).toEqual('receiverBrokerageCurrency');

  expect(c6.headerClass).toEqual('brokerage-group-header');
  expect(c6.marryChildren).toEqual(true);
  expect(c6.headerName).toEqual('Sell Amount');
  expect(c6.field).toEqual('receiverBrokerageAmount');
  expect(c6.colId).toEqual('receiverBrokerageAmount');
  expect(c6.tooltipField).toEqual('receiverBrokerageAmount');
  expect(typeof c6.cellRenderer).toBe('function');
  expect(c6.cellRenderer({ data: null, value: '123' })).toEqual('123');
  expect(c6.cellRenderer({ value: 345.123 })).toEqual('345.12');

  expect(c7.headerClass).toEqual('brokerage-group-header');
  expect(c7.marryChildren).toEqual(true);
  expect(c7.headerName).toEqual('Sell Std CCY');
  expect(c7.field).toEqual('receiverBrokerageStdCurrency');
  expect(c7.colId).toEqual('receiverBrokerageStdCurrency');
  expect(c7.tooltipField).toEqual('receiverBrokerageStdCurrency');

  expect(c8.headerClass).toEqual('brokerage-group-header');
  expect(c8.marryChildren).toEqual(true);
  expect(c8.headerName).toEqual('Sell Std Amount');
  expect(c8.field).toEqual('receiverBrokerageStdAmount');
  expect(c8.colId).toEqual('receiverBrokerageStdAmount');
  expect(c8.tooltipField).toEqual('receiverBrokerageStdAmount');
  expect(typeof c8.cellRenderer).toBe('function');
  expect(c8.cellRenderer({ data: null, value: '123' })).toEqual('123');
  expect(c8.cellRenderer({ value: 345.123 })).toEqual('345.12');
});
