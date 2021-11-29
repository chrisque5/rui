import moment from 'moment';
import * as math from 'mathjs';
import { Modal } from 'antd';

export const isValidTerm = (termToTest, selections) => {
  if (termToTest.length < 2) return false;

  const lowerCaseTermToTest = termToTest.toLowerCase();

  const endsWithPeriod = (term) => {
    const periods = ['d', 'w', 'm', 'y'];
    return (periods.includes(term.charAt(term.length - 1)));
  };

  const firstCharacterIsNumber = (term) => {
    const result = term.substring(0, term.length - 1).match(/^[0-9]*$/);
    return result ? result.length > 0 : false;
  };

  const isStaticSelectionValid = (term) => {
    const validStaticTerms = selections.map((x) => x.toLowerCase());
    if (validStaticTerms.includes(term)) {
      return true;
    }

    if (term.startsWith('bmf') || term.startsWith('imm')) {
      let termDaysOnly = term.replace('bmf', '');
      termDaysOnly = termDaysOnly.replace('imm', '');
      const beforeConversion = termDaysOnly;
      termDaysOnly = parseInt(termDaysOnly, 10);
      if (beforeConversion.length === termDaysOnly.toString().length) {
        return (termDaysOnly % 1 === 0 && termDaysOnly > 0 && termDaysOnly < 101);
      }
    }
    return false;
  };

  return isStaticSelectionValid(lowerCaseTermToTest)
    || (endsWithPeriod(lowerCaseTermToTest) && firstCharacterIsNumber(lowerCaseTermToTest));
};

export const doesArrayExistWithValue = (array, index = 0) => {
  if (Array.isArray(array)) {
    if (array && array.length > 0 && array[index]) {
      return true;
    }
  }
  return false;
};

export const setTodayOnNull = (form, id, value) => {
  if (!value) {
    setTimeout(() => {
      form.setFieldsValue({ [id]: moment() });
    });
  }
};

export const dayDifferenceIgnoreHours = (earlierDateMoment, laterDateMoment) => {
  const date1 = earlierDateMoment.clone().startOf('day');
  const date2 = laterDateMoment.clone().startOf('day');
  const dayCount = date1.diff(date2, 'days');

  return dayCount;
};

export const getDateInLocalTZ = () => moment().tz(moment.tz.guess(true)).format('YYYY-MM-DD');
export const getDateTimeInLocalTZ = () => moment().tz(moment.tz.guess(true));

export const parseValueAsBigNumber = (value) => {
  try {
    return math.bignumber(value);
  } catch (err) {
    return null;
  }
};

export const formatAmount = (val) => {
  const inputValue = val.replace(/\s/g, '');
  let multiplier = 1;
  const oneM = 1000000;
  const oneB = 1000000000;
  let amt = inputValue;

  if (Number.isNaN(Number(inputValue)) && inputValue.length > 1) {
    const lastChar = inputValue.charAt(inputValue.length - 1).toLowerCase();
    amt = Number(inputValue.substring(0, inputValue.length - 1));
    if (lastChar === 'm') {
      multiplier = oneM;
    } else if (lastChar === 'b') {
      multiplier = oneB;
    } else {
      return inputValue;
    }
  } else if (Number(inputValue) < oneM) {
    multiplier = oneM;
  }

  const calculatedAmount = math.multiply(math.bignumber(amt), math.bignumber(multiplier));
  return calculatedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const isValidDate = (date, dateFormat) => moment(date, dateFormat || 'L', true).isValid();

export const findCurrencyPair = (ccy1, ccy2, currencies) => (
  currencies.find(
    (currency) => currency.baseCurrency === ccy1 && currency.counterCurrency === ccy2,
  )
);

export const filterSpotExecutionVenues = (execVenues) => execVenues.filter((i) => i.venueId === 'XOFF');

export const isDealTypeSame = (dealType1, dealType2) => (dealType1 === dealType2);

export const isStrategyTypeSame = (strategyType1, strategyType2) => (strategyType1 === strategyType2);

export const ConfirmUnsavedChanges = (message, onYes, onNo) => {
  Modal.confirm({
    title: 'Confirm',
    content: message,
    okText: 'Yes',
    cancelText: 'No',
    onOk: () => {
      if (onYes) {
        setTimeout(() => {
          onYes();
        });
      }
    },
    onCancel: () => {
      if (onNo) {
        setTimeout(() => {
          onNo();
        });
      }
    },
  });
};

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}`;
};

export const showPreviousValueToolTip = (currentValue, previousValue) => {
  if (currentValue !== previousValue) {
    return { title: `Previous Value: ${previousValue || 'N/A'}`, className: 'deal-input-dirty' };
  }
  return { title: '', className: '' };
};
