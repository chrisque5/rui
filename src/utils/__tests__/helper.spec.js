import moment from 'moment';
import 'moment-timezone';
import * as helper from '../helper';

const form = {
  setFieldsValue: jest.fn(() => ({})),
};

describe('isValidTerm() => ', () => {
  let validTerm = false;
  const selections = ['TOM', 'TOD'];

  test('tests valid length > 2', () => {
    validTerm = helper.isValidTerm('1', selections);
    expect(validTerm).toBe(false);
  });

  test('tests endsWithPeriod ', () => {
    validTerm = helper.isValidTerm('1M', selections);
    expect(validTerm).toBe(true);
  });

  test('tests firstCharacterIsNumber', () => {
    validTerm = helper.isValidTerm('1M', selections);
    expect(validTerm).toBe(true);
  });

  test('tests isStaticSelectionValid ', () => {
    validTerm = helper.isValidTerm('TOM', selections);
    expect(validTerm).toBe(true);
  });

  test('tests isStaticSelectionValid imm ', () => {
    validTerm = helper.isValidTerm('imm', selections);
    expect(validTerm).toBe(false);
  });

  test('tests isStaticSelectionValid imm false ', () => {
    validTerm = helper.isValidTerm('imm1', selections);
    expect(validTerm).toBe(true);
  });
});

describe('doesArrayExistWithValue => ', () => {
  test('tests if array exists', () => {
    const doesExist = helper.doesArrayExistWithValue();
    expect(doesExist).toBe(false);
  });

  test('tests if array is valid', () => {
    const doesExist = helper.doesArrayExistWithValue([]);
    expect(doesExist).toBe(false);
  });

  test('tests if value exists in array', () => {
    const doesExist = helper.doesArrayExistWithValue([1, 2, 3, 4], 1);
    expect(doesExist).toBe(true);
  });
});

describe('setTodayOnNull => ', () => {
  jest.useFakeTimers();
  test('tests form.setFieldsValue not called', () => {
    helper.setTodayOnNull(form, 'id', 'DUMMY');
    expect(form.setFieldsValue).not.toBeCalled();
  });

  test('tests form.setFieldsValue called', () => {
    helper.setTodayOnNull(form, 'id', null);
    jest.runAllTimers();
    expect(form.setFieldsValue).toBeCalled();
  });
});

describe('dayDifferenceIgnoreHours => ', () => {
  test('tests dayDifferenceIgnoreHours ', () => {
    const today = moment();
    const tomorrow = moment().add(1, 'days');
    const dayDiff = helper.dayDifferenceIgnoreHours(tomorrow, today);
    expect(dayDiff).toBe(1);
  });
});

describe('getDateInLocalTZ => ', () => {
  test('tests getDateInLocalTZ', () => {
    moment.tz('Asia/Singapore');
    const today = moment().format('YYYY-MM-DD');
    const tzDate = helper.getDateInLocalTZ();
    expect(tzDate).toBe(today);
  });
});

describe('parseValueAsBigNumber =>', () => {
  test('tests parseValueAsBigNumber', () => {
    const value = 10;
    const parsedValue = helper.parseValueAsBigNumber(value);
    expect(parsedValue.toNumber()).toBe(value);
  });

  test('tests parseValueAsBigNumber with a big number', () => {
    const value = 99999.99999;
    const parsedValue = helper.parseValueAsBigNumber(value);
    expect(parsedValue.toNumber()).toBe(value);
  });

  test('tests parseValueAsBigNumber with DUMMY', () => {
    const value = 'DUMMY';
    const parsedValue = helper.parseValueAsBigNumber(value);
    expect(parsedValue).toBeNull();
  });
});

describe('formatAmount => ', () => {
  test('tests formatAmount', () => {
    const formattedAmount = helper.formatAmount('1');
    expect(formattedAmount).toBe('1,000,000');
  });

  test('tests formatAmount 1M', () => {
    const formattedAmount = helper.formatAmount('1M');
    expect(formattedAmount).toBe('1,000,000');
  });

  test('tests formatAmount 1B', () => {
    const formattedAmount = helper.formatAmount('1B');
    expect(formattedAmount).toBe('1,000,000,000');
  });

  test('tests formatAmount 1,000,000', () => {
    const formattedAmount = helper.formatAmount('1,000,000');
    expect(formattedAmount).toBe('1,000,000');
  });

  test('tests formatAmount 1', () => {
    const formattedAmount = helper.formatAmount('1');
    expect(formattedAmount).toBe('1,000,000');
  });

  test('tests formatAmount 100000', () => {
    const formattedAmount = helper.formatAmount('1000000');
    expect(formattedAmount).toBe('1,000,000');
  });
});

describe('isValidDate =>', () => {
  test('tests isValidDate', () => {
    moment.locale('en-GB');
    expect(helper.isValidDate('01/01/2020', 'DD/MM/YYYY')).toBeTruthy();
    expect(helper.isValidDate('01/01/2020')).toBeTruthy();
  });
});

describe('filterSpotExecutionVenues =>', () => {
  const executionVenues = [
    {
      id: null,
      lockSequence: null,
      venueId: 'TPSEF',
      productType: 'FX',
      venueType: 'SEF',
      reportingRegime: 'DoddFrankAct',
    },
    {
      id: null,
      lockSequence: null,
      venueId: 'XOFF',
      productType: 'FX',
      venueType: 'OffFacility',
      reportingRegime: 'DoddFrankAct',
    },
  ];

  test('tests filterSpotExecutionVenues', () => {
    const filteredVenues = helper.filterSpotExecutionVenues(executionVenues);

    expect(executionVenues.length).toBe(2);
    expect(filteredVenues.length).toBe(1);
    expect(filteredVenues[0].venueId).toBe('XOFF');
  });
});

describe('isDealTypeSame =>', () => {
  const dealType1 = 'NDF';
  const dealType2 = 'FWD';

  test('tests if true when deal types match', () => {
    const result = helper.isDealTypeSame(dealType1, dealType1);
    expect(result).toBe(true);
  });

  test('tests if false when deal types do not match', () => {
    const result = helper.isDealTypeSame(dealType1, dealType2);
    expect(result).toBe(false);
  });
});

describe('isStrategyTypeSame =>', () => {
  const strategyType1 = 'Outright';
  const strategyType2 = 'Spread';

  test('tests if true when strategy types match', () => {
    const result = helper.isStrategyTypeSame(strategyType1, strategyType1);
    expect(result).toBe(true);
  });

  test('tests if false when strategy types do not match', () => {
    const result = helper.isStrategyTypeSame(strategyType1, strategyType2);
    expect(result).toBe(false);
  });
});

describe('isObjectEmpty =>', () => {
  const obj1 = {};
  const obj2 = { key: 'value' };

  test('test if isObjectEmpty returns true for empty Object', () => {
    const result = helper.isObjectEmpty(obj1);
    expect(result).toBe(true);
  });

  test('test if isObjectEmpty returns fasle for non-empty Object', () => {
    const result = helper.isObjectEmpty(obj2);
    expect(result).toBe(false);
  });
});

describe('showPreviousValueToolTip =>', () => {
  test('test showPreviousValueToolTip returns { title: \'\', className: \'\' } if both values same', () => {
    const result = helper.showPreviousValueToolTip(100, 100);
    expect(result).toEqual({ title: '', className: '' });
  });

  test('test showPreviousValueToolTip returns previous value tooltip when both values not equal', () => {
    const result = helper.showPreviousValueToolTip(100, 200);
    expect(result).toEqual({ title: 'Previous Value: 200', className: 'deal-input-dirty' });
  });

  test('test showPreviousValueToolTip returns previous value tooltip when both values not equal', () => {
    const result = helper.showPreviousValueToolTip('USD', 'SGD');
    expect(result).toEqual({ title: 'Previous Value: SGD', className: 'deal-input-dirty' });
  });

  test('test showPreviousValueToolTip returns previous value N/A when previous value undefined', () => {
    const result = helper.showPreviousValueToolTip(100);
    expect(result).toEqual({ title: 'Previous Value: N/A', className: 'deal-input-dirty' });
  });
});
