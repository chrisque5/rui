import { dateFilterComparator, numberFilterComparitor, timeFilterComparator } from '../index';

test('dateFilterComparator(value1, value2) returns the correctly sorted values', () => {
  expect(dateFilterComparator('24/09/2099', '24/09/2099')).toEqual(0);
  expect(dateFilterComparator('24/10/2099', '24/10/2099')).toEqual(0);

  expect(dateFilterComparator('25/09/2099', '24/09/2099')).toEqual(1);
  expect(dateFilterComparator('25/10/2099', '24/09/2099')).toEqual(1);
  expect(dateFilterComparator('24/09/2099')).toEqual(1);

  expect(dateFilterComparator('24/09/2099', '25/09/2099')).toEqual(-1);
  expect(dateFilterComparator('24/09/2099', '25/10/2099')).toEqual(-1);
});

test('timeFilterComparator(value1, value2) returns the correctly sorted values', () => {
  expect(timeFilterComparator('00:00:00', '00:00:00')).toEqual(0);
  expect(timeFilterComparator('11:11:11', '11:11:11')).toEqual(0);
  expect(timeFilterComparator('23:00:00', '23:00:00')).toEqual(0);

  expect(timeFilterComparator('00:00:01', '00:00:00')).toEqual(1);
  expect(timeFilterComparator('11:11:12', '11:11:11')).toEqual(1);
  expect(timeFilterComparator('23:11:12', '11:11:12')).toEqual(1);
  expect(timeFilterComparator('23:59:59', '00:00:00')).toEqual(1);
  expect(timeFilterComparator('00:00:00')).toEqual(1);

  expect(timeFilterComparator('00:00:00', '00:00:01')).toEqual(-1);
  expect(timeFilterComparator('11:11:11', '11:11:12')).toEqual(-1);
  expect(timeFilterComparator('11:11:12', '2:11:12')).toEqual(-1);
  expect(timeFilterComparator('00:00:00', '23:59:59')).toEqual(-1);
});

test('numberFilterComparitor(value1, value2) returns the correctly sorted values', () => {
  expect(numberFilterComparitor(1, 1)).toEqual(0);
  expect(numberFilterComparitor(10, 10)).toEqual(0);
  expect(numberFilterComparitor(1.1, 1.1)).toEqual(0);
  expect(numberFilterComparitor(10.01, 10.01)).toEqual(0);
  expect(numberFilterComparitor(100, 100.0)).toEqual(0);

  expect(numberFilterComparitor(2, 1)).toEqual(1);
  expect(numberFilterComparitor(11, 10)).toEqual(1);
  expect(numberFilterComparitor(1.1, 1.01)).toEqual(1);
  expect(numberFilterComparitor(10.01, 10.001)).toEqual(1);
  expect(numberFilterComparitor(101, 100.0)).toEqual(1);
  expect(numberFilterComparitor(10)).toEqual(1);

  expect(numberFilterComparitor(1, 2)).toEqual(-1);
  expect(numberFilterComparitor(10, 20)).toEqual(-1);
  expect(numberFilterComparitor(10.1, 10.11)).toEqual(-1);
  expect(numberFilterComparitor(100.001, 100.01)).toEqual(-1);
  expect(numberFilterComparitor(10, 10.1)).toEqual(-1);
});
