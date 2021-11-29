import {
  approvalsCellRenderer, dateFilterComparator,
  dateFormatter, formatDate, isUnderInvestigationCellRenderer,
  numberFilterComparitor, numberFormatter, stpCellRenderer,
  stpFilterCellRenderer, timeFilterComparator, timeFormatter,
  priceFormatter, brokerageFormatter,
} from '../index';

test('imports are defined', () => {
  expect(approvalsCellRenderer).toBeDefined();
  expect(dateFilterComparator).toBeDefined();
  expect(dateFormatter).toBeDefined();
  expect(formatDate).toBeDefined();
  expect(isUnderInvestigationCellRenderer).toBeDefined();
  expect(numberFilterComparitor).toBeDefined();
  expect(numberFormatter).toBeDefined();
  expect(stpCellRenderer).toBeDefined();
  expect(stpFilterCellRenderer).toBeDefined();
  expect(timeFilterComparator).toBeDefined();
  expect(timeFormatter).toBeDefined();
  expect(priceFormatter).toBeDefined();
  expect(brokerageFormatter).toBeDefined();
});

test('imports are functions', () => {
  expect(typeof approvalsCellRenderer).toBe('function');
  expect(typeof dateFilterComparator).toBe('function');
  expect(typeof dateFormatter).toBe('function');
  expect(typeof formatDate).toBe('function');
  expect(typeof isUnderInvestigationCellRenderer).toBe('function');
  expect(typeof numberFilterComparitor).toBe('function');
  expect(typeof numberFormatter).toBe('function');
  expect(typeof stpCellRenderer).toBe('function');
  expect(typeof stpFilterCellRenderer).toBe('function');
  expect(typeof timeFilterComparator).toBe('function');
  expect(typeof timeFormatter).toBe('function');
  expect(typeof priceFormatter).toBe('function');
  expect(typeof brokerageFormatter).toBe('function');
});
