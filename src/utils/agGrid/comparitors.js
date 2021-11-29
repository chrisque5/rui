/**
 * Returns whether an date is greater, lower or equal to the other
 * @param {string} date1 the first date
 * @param {string} date2 the second date
 * @returns {number} the comparitor int
 */
const dateFilterComparator = (date1 = null, date2 = null) => {
  if (date2 === null) return 1;
  if (date1 === null) return -1;

  const date1Parts = date1.split('/');
  const date2Parts = date2.split('/');

  const date1Date = new Date(Number(date1Parts[2]), Number(date1Parts[1]) - 1, Number(date1Parts[0]));
  const date2Date = new Date(Number(date2Parts[2]), Number(date2Parts[1]) - 1, Number(date2Parts[0]));

  if (date1Date.getTime() === date2Date.getTime()) return 0;

  return date1Date > date2Date ? 1 : -1;
};

/**
 * Returns whether an time is greater, lower or equal to the other
 * @param {string} time1 the first time
 * @param {string} time2 the second time
 * @returns {number} the comparitor int
 */
const timeFilterComparator = (time1, time2 = null) => {
  if (time2 === null) return 1;

  const time1time = time1.split(':').reduce((a, b) => a + b);
  const time2time = time2.split(':').reduce((a, b) => a + b);

  if (time1time === time2time) return 0;

  return time1time > time2time ? 1 : -1;
};

/**
 * Returns whether a number is greater, lower or equal to the other
 * @param {string} num1 the first number
 * @param {string} num2 the second number
 * @returns {number} the comparitor int
 */
const numberFilterComparitor = (num1, num2 = null) => {
  if (num2 === null) return 1;
  if (+num1 === +num2) return 0;

  return +num1 > +num2 ? 1 : -1;
};

export {
  dateFilterComparator,
  numberFilterComparitor,
  timeFilterComparator,
};
