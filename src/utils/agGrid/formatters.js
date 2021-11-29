import moment from 'moment';

/**
 * Get the local value of a date
 * @param {Object} date the local date
 */
const getLocalDate = (date) => moment(date).local();

/**
 * Formats a string to a date
 * @param {string} date the date
 * @param {string} format the date format
 * @returns {Object} the formatted date
 */
const formatDate = (date = null, format = 'L') => {
  if (date === null || date === '') {
    return '';
  }

  return getLocalDate(date).format(format);
};

/**
 * Formats a string to a date
 * @param {string} date the date
 * @param {string} format the date format
 * @returns {Object} the formatted date
 */
const formatOnlyDate = (date = null, format = 'L') => {
  if (date === null || date === '') {
    return '';
  }

  return moment(date).format(format);
};

/**
 * Formats a number
 * @param {string} number the number
 * @param {string} decimalPlaces the number of decimal places
 * @returns {number} the formatted number
 */
const formatNumber = (number = null, decimalPlaces = 2) => {
  if (number === null || number === '' || Number.isNaN(number)) {
    return '';
  }

  return Number(number).toFixed(decimalPlaces) * 1;
};

/**
 * Formats an aggrid date cell
 * @param {string} value the date
 * @returns {Object} the formatted date
 */
const dateFormatter = ({ value = null } = {}, format = 'L') => formatDate(value, format);

/**
 * Formats an aggrid date cell
 * @param {string} value the date
 * @returns {Object} the formatted date
 */
const valueDateFormatter = ({ value = null } = {}, format = 'L') => formatOnlyDate(value, format);
const fixingDateFormatter = ({ value = null } = {}, format = 'L') => formatOnlyDate(value, format);
const publishDateFormatter = ({ value = null } = {}, format = 'L') => formatOnlyDate(value, format);

/**
 * Formats an aggrid time cell
 * @param {string} value the time
 * @returns {Object} the formatted time
 */
const timeFormatter = ({ value } = {}) => formatDate(value, 'LTS');

// No need of null validations
const commaSeperator = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * Formats an aggrid number cell
 * @param {string} value the number
 * @returns {number} the decimal places to format to
 */
const numberFormatter = ({ value } = {}, decimalPlaces) => commaSeperator(formatNumber(value, decimalPlaces));

const priceFormatter = ({ value } = {}) => {
  if (!value || Number.isNaN(value)) {
    return '';
  }

  const numArr = Number(value).toString().split('.');
  let retVal = value;
  if (numArr.length === 1) {
    retVal = commaSeperator(Number(numArr[0]).toFixed(1));
  } else if (numArr[0] === '-0') {
    retVal = `-0.${numArr[1]}`;
  } else {
    retVal = `${commaSeperator(Number(numArr[0]))}.${numArr[1]}`;
  }
  return retVal;
};

const brokerageFormatter = ({ value } = {}) => {
  if (!value || Number.isNaN(value)) {
    return '';
  }
  const numArr = formatNumber(value, 2).toString().split('.');
  let retVal = `${commaSeperator(Number(numArr[0]))}`;
  if (numArr.length > 1) {
    let decimal = numArr[1];
    if (decimal.length === 1) {
      decimal += '0';
    }
    retVal = `${commaSeperator(Number(numArr[0]))}.${decimal}`;
  }
  return retVal;
};

export {
  dateFormatter,
  formatDate,
  getLocalDate,
  numberFormatter,
  priceFormatter,
  timeFormatter,
  valueDateFormatter,
  publishDateFormatter,
  fixingDateFormatter,
  brokerageFormatter,
};
