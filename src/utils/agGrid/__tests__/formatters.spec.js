import {
  dateFormatter, formatDate, numberFormatter,
  valueDateFormatter, fixingDateFormatter, publishDateFormatter,
  priceFormatter, brokerageFormatter,
} from '../index';

describe('Formatters', () => {
  test('dateFormatter returns the correctly formatted values', () => {
    expect(dateFormatter()).toEqual('');
    expect(dateFormatter({ value: '2010-07-06T02:03:03.298Z' })).toEqual('07/06/2010');
    expect(dateFormatter({ value: '2020-07-06T02:03:03.298Z' })).toEqual('07/06/2020');
    expect(dateFormatter({ value: '2030-07-06T02:03:03.298Z' })).toEqual('07/06/2030');
  });

  test('valueDateFormatter returns the correctly formatted values', () => {
    expect(valueDateFormatter()).toEqual('');
    expect(valueDateFormatter({ value: '2010-07-06T02:03:03.298Z' })).toEqual('07/06/2010');
    expect(valueDateFormatter({ value: '2020-07-06T02:03:03.298Z' })).toEqual('07/06/2020');
    expect(valueDateFormatter({ value: '2030-07-06T02:03:03.298Z' })).toEqual('07/06/2030');
  });

  test('fixingDateFormatter returns the correctly formatted values', () => {
    expect(fixingDateFormatter()).toEqual('');
    expect(fixingDateFormatter({ value: '2010-07-06T02:03:03.298Z' })).toEqual('07/06/2010');
    expect(fixingDateFormatter({ value: '2020-07-06T02:03:03.298Z' })).toEqual('07/06/2020');
    expect(fixingDateFormatter({ value: '2030-07-06T02:03:03.298Z' })).toEqual('07/06/2030');
  });

  test('publishDateFormatter returns the correctly formatted values', () => {
    expect(publishDateFormatter()).toEqual('');
    expect(publishDateFormatter({ value: '2010-07-06T02:03:03.298Z' })).toEqual('07/06/2010');
    expect(publishDateFormatter({ value: '2020-07-06T02:03:03.298Z' })).toEqual('07/06/2020');
    expect(publishDateFormatter({ value: '2030-07-06T02:03:03.298Z' })).toEqual('07/06/2030');
  });

  test('formatDate returns the correctly formatted values', () => {
    expect(formatDate()).toEqual('');
    expect(formatDate('2010-07-06T02:03:03.298Z')).toEqual('07/06/2010');
    expect(formatDate('2020-07-06T02:03:03.298Z', 'L')).toEqual('07/06/2020');
  });

  test('numberFormatter returns the correctly formatted values', () => {
    expect(numberFormatter()).toEqual('');
    expect(numberFormatter({ value: null })).toEqual('');
    expect(numberFormatter({ value: null }, 2)).toEqual('');
    expect(numberFormatter({ value: '' })).toEqual('');
    expect(numberFormatter({ value: '' }, 3)).toEqual('');
    expect(numberFormatter({ value: 1 })).toEqual('1');
    expect(numberFormatter({ value: 1 }, 1)).toEqual('1');
    expect(numberFormatter({ value: 1 }, 2)).toEqual('1');
    expect(numberFormatter({ value: 1 }, 3)).toEqual('1');
    expect(numberFormatter({ value: 99.123 })).toEqual('99.12');
    expect(numberFormatter({ value: 99.123 }, 1)).toEqual('99.1');
    expect(numberFormatter({ value: 99.123 }, 2)).toEqual('99.12');
    expect(numberFormatter({ value: 99.123 }, 3)).toEqual('99.123');
    expect(numberFormatter({ value: 99.123 }, 4)).toEqual('99.123');
    expect(numberFormatter({ value: 1 })).toEqual('1');
    expect(numberFormatter({ value: '1' }, 1)).toEqual('1');
    expect(numberFormatter({ value: '1' }, 2)).toEqual('1');
    expect(numberFormatter({ value: '1' }, 3)).toEqual('1');
    expect(numberFormatter({ value: '99.123' })).toEqual('99.12');
    expect(numberFormatter({ value: '99.123' }, 1)).toEqual('99.1');
    expect(numberFormatter({ value: '99.123' }, 2)).toEqual('99.12');
    expect(numberFormatter({ value: '99.123' }, 3)).toEqual('99.123');
    expect(numberFormatter({ value: '99.123' }, 4)).toEqual('99.123');
  });

  test('priceFormatter returns the correctly formatted values', () => {
    expect(priceFormatter()).toEqual('');
    expect(priceFormatter({ value: null })).toEqual('');
    expect(priceFormatter({ value: '' })).toEqual('');
    expect(priceFormatter({ value: 1 })).toEqual('1.0');
    expect(priceFormatter({ value: 99.123 })).toEqual('99.123');
    expect(priceFormatter({ value: '99999.1234' })).toEqual('99,999.1234');
    expect(priceFormatter({ value: -99.123 })).toEqual('-99.123');
    expect(priceFormatter({ value: -0.123 })).toEqual('-0.123');
    expect(priceFormatter({ value: -123 })).toEqual('-123.0');
  });

  test('brokerageFormatter returns the correctly formatted values', () => {
    expect(brokerageFormatter()).toEqual('');
    expect(brokerageFormatter({ value: null })).toEqual('');
    expect(brokerageFormatter({ value: '' })).toEqual('');
    expect(brokerageFormatter({ value: 1 })).toEqual('1');
    expect(brokerageFormatter({ value: 99.123 })).toEqual('99.12');
    expect(brokerageFormatter({ value: '99999.1234' })).toEqual('99,999.12');
    expect(brokerageFormatter({ value: '99999.1' })).toEqual('99,999.10');
    expect(brokerageFormatter({ value: '7899999' })).toEqual('7,899,999');
  });
});
