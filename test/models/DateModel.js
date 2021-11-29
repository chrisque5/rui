/* eslint-disable no-undef */
const Logs = require('../core/utility/Logs');
const moment = require('../../node_modules/moment/moment.js');

const holidayFormat = 'YYYY/MM/DD';

class DateModel {
  constructor() {
    this.log = new Logs();
  }

  // Holiday Dates below have been based off the QA Database.

  getCNYHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2020/02/11', '2020/02/12', '2021/02/13', '2021/02/14', '2021/02/15', '2021/02/16', '2021/02/17', '2021/04/05', '2021/05/01', '2021/05/03', '2021/06/14', '2021/09/20', '2020/09/21', '2021/10/01', '2021/10/02', '2021/10/03', '2021/10/04', '2021/10/05', '2021/10/06', '2021/10/07'];
    this.log.log(`CNY Holiday List : ${holiday}`);
    return holiday;
  }

  getCNHHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/02/11', '2021/02/12', '2021/02/13', '2021/02/14', '2021/02/15', '2021/02/16', '2021/02/17', '2021/04/02', '2021/04/03', '2021/04/04', '2021/04/05', '2021/04/06', '2021/05/01', '2021/05/03', '2020/05/19', '2021/06/14', '2021/07/01', '2021/09/20', '2021/09/21', '2021/09/22', '2021/10/01', '2021/10/02', '2021/10/03', '2021/10/04', '2021/10/05', '2021/10/06', '2010/10/07', '2021/10/14', '2021/12/25', '2021/12/27'];
    this.log.log(`CNH Holiday List : ${holiday}`);
    return holiday;
  }

  getUSDHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/01/18', '2021/02/15', '2021/05/31', '2021/07/05', '2021/09/06', '2021/10/11', '2021/11/11', '2021/11/25', '2021/12/25'];
    this.log.log(`USD Holiday List : ${holiday}`);
    return holiday;
  }

  getPHPHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/04/01', '2021/04/02', '2021/04/09', '2021/05/01', '2021/05/13', '2021/06/12', '2021/07/20', '2021/08/21', '2021/08/30', '2021/11/01', '2021/11/30', '2021/12/25', '2021/12/30', '2021/12/31'];
    this.log.log(`PHP Holiday List : ${holiday}`);
    return holiday;
  }

  getKRWHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/02/11', '2021/02/12', '2021/02/13', '2021/03/01', '2021/05/01', '2021/05/05', '2021/05/19', '2021/06/06', '2021/08/15', '2021/09/20', '2021/09/21', '2021/09/22', '2021/10/03', '2021/10/09', '2021/12/25'];
    this.log.log(`KRW Holiday List : ${holiday}`);
    return holiday;
  }

  getHKDHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2020/01/01', '2021/02/12', '2021/02/13', '2021/02/14', '2021/02/15', '2021/04/02', '2021/04/03', '2021/04/05', '2021/04/06', '2021/05/01', '2021/05/19', '2021/06/14', '2021/07/01', '2021/09/22', '2021/10/01', '2021/10/14', '2021/12/25', '2021/12/27'];
    this.log.log(`HKD Holiday List : ${holiday}`);
    return holiday;
  }

  getGBPHolidayList() {
    const holiday = ['2021/01/01', '2021/04/02', '2021/04/05', '2021/05/03', '2021/05/31', '2021/08/30', '2021/12/27', '2021/12/28'];
    this.log.log(`GBP Holiday List : ${holiday}`);
    return holiday;
  }

  getSGDHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/02/12', '2021/02/13', '2021/04/02', '2021/05/01', '2021/05/13', '2021/05/26', '2021/07/20', '2021/08/09', '2021/11/04', '2021/12/25'];
    this.log.log(`SGD Holiday List : ${holiday}`);
    return holiday;
  }

  getAEDHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/05/13', '2021/05/14', '2021/05/15', '2021/07/19', '2021/07/20', '2021/08/10', '2021/10/19', '2021/11/30', '2021/12/02'];
    this.log.log(`AED Holiday List : ${holiday}`);
    return holiday;
  }

  getBRLHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/02/15', '2021/02/16', '2021/05/15', '2021/04/02', '2021/04/21', '2021/05/01', '2021/06/03', '2021/09/07', '2021/10/12', '2021/11/02', '2021/11/15', '2021/12/25'];
    this.log.log(`BRL Holiday List : ${holiday}`);
    return holiday;
  }

  getCADHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/02/15', '2021/04/02', '2021/05/24', '2021/07/01', '2021/08/02', '2021/09/06', '2021/10/11', '2021/11/11', '2021/12/27', '2021/12/28'];
    this.log.log(`CAD Holiday List : ${holiday}`);
    return holiday;
  }

  getJPYHolidayList() {
    // eslint-disable-next-line max-len
    const holiday = ['2021/01/01', '2021/01/02', '2021/01/03', '2021/01/11', '2021/02/11', '2021/02/23', '2021/03/20', '2021/04/29', '2021/05/03', '2021/05/04', '2021/05/05', '2021/07/19', '2021/08/11', '2021/09/20', '2021/09/23', '2021/10/11', '2021/11/03', '2021/11/23', '2021/12/31'];
    this.log.log(`JPY Holiday List : ${holiday}`);
    return holiday;
  }

  isDateOnHoliday(date, currency) {
    const holiday = this.getHolidayList(currency);
    return holiday.includes(date.format('YYYY/MM/DD'));
  }

  getHolidayInBetweenDate(currency, startDate, endDate) {
    const holiday = this.getHolidayList(currency);
    const sDate = moment(startDate).format(holidayFormat);
    const eDate = moment(endDate).format(holidayFormat);
    return this.getDateRange(holiday, sDate, eDate);
  }

  getDateRange(dateList, start, end) {
    let counter = 0;
    const hlist = [];
    dateList.forEach((date) => {
      const dd = moment(date).format(holidayFormat);
      if (dd >= start && dd <= end) {
        this.log.log(`Date included as a part of the holiday ${dd}`);
        hlist[counter] = dd;
        counter += 1;
      }
    });
    return hlist;
  }

  getHolidayList(currency) {
    let holiday;
    if (currency === 'CNY') {
      holiday = this.getCNYHolidayList();
    } else if (currency === 'USD') {
      holiday = this.getUSDHolidayList();
    } else if (currency === 'CNH') {
      holiday = this.getCNHHolidayList();
    } else if (currency === 'PHP') {
      holiday = this.getPHPHolidayList();
    } else if (currency === 'KRW') {
      holiday = this.getKRWHolidayList();
    } else if (currency === 'HKD') {
      holiday = this.getHKDHolidayList();
    } else if (currency === 'GBP') {
      holiday = this.getGBPHolidayList();
    } else if (currency === 'SGD') {
      holiday = this.getSGDHolidayList();
    } else if (currency === 'AED') {
      holiday = this.getAEDHolidayList();
    } else if (currency === 'BRL') {
      holiday = this.getBRLHolidayList();
    } else if (currency === 'CAD') {
      holiday = this.getCADHolidayList();
    } else if (currency === 'JPY') {
      holiday = this.getJPYHolidayList();
    }

    return holiday;
  }

  testDates() {
    const tradeDate = this.getTradeDate('CNY');
    const valueDate = this.getValueDate(tradeDate.clone(), '1Y');
    const fixingDate = this.getFixingDate(valueDate.clone(), 'CNY');
    const dFormat = 'DD/MM/YYYY';

    this.log.log(`Trade Date for CNY : ${tradeDate.format(dFormat)}`);
    this.log.log(`Value Date for CNY : ${valueDate.format(dFormat)}`);
    this.log.log(`Fixing Date for CNY : ${fixingDate.format(dFormat)}`);
  }

  getTradeDate(currency1, currency2) {
    /* let date = this.addBusinessDays(moment(), this.getDaysDifference(currency));
    while (this.isDateOnHoliday(date, currency)) {
      date = this.addBusinessDays(date, 1);
    }
    return date; */
    const date = this.addBusinessDaysFromGivenDay(moment(), this.getDaysDifference(currency2), currency1, currency2);
    return date;
  }

  getTomTradeDate(currency1, currency2) {
    let daycount = this.getDaysDifference(currency2);
    daycount += 1;
    const date = this.addBusinessDaysFromGivenDay(moment(), daycount, currency1, currency2);
    /* while (this.isDateOnHoliday(date, currency)) {
      date = this.addBusinessDays(date, 1);
    } */
    return date;
  }

  getValueDate(date, addValue, currency) {
    let date1 = this.getNextBusinessDate(date, addValue, currency);
    while (this.isDateOnHoliday(date1, currency)) {
      date1 = this.addBusinessDays(date1, 1);
    }
    return date1;
  }

  getFixingDate(date, currency) {
    let date1 = this.subtractBusinessDaysFromDate(date, this.getDaysDifference(currency), currency);
    while (this.isDateOnHoliday(date1, currency)) {
      date1 = this.subtractBusinessDays(date1, 1);
    }
    return date1;
  }

  getPublishDate(date, currency) {
    let date1 = this.subtractBusinessDaysFromDate(date, this.getPublishDaysDifference(currency), currency);
    while (this.isDateOnHoliday(date1, currency)) {
      date1 = this.subtractBusinessDays(date1, 1);
    }
    return date1;
  }

  getDaysDifference(currency) {
    const value = currency.toLowerCase();
    if (value === 'cny' || value === 'cnh' || value === 'krw') {
      this.log.log('Currency Difference for CNY is 2 days.');
      return 2;
    } if (value === 'php') {
      this.log.log('Currency Difference for PHP is 1 days.');
      return 1;
    }
    return null;
  }

  getPublishDaysDifference(currency) {
    const value = currency.toLowerCase();
    if (value === 'cny' || value === 'cnh') {
      this.log.log('Currency Difference for CNY is 2 days.');
      return 2;
    } if (value === 'php' || value === 'krw') {
      this.log.log('Currency Difference for PHP is 1 days.');
      return 1;
    }
    return null;
  }

  getNextBusinessDate(date, addValue, currency) {
    const dd = date;
    const newDate = this.addDate(dd, addValue);
    if (newDate.isoWeekday() === 6) {
      if (addValue.includes('M')) {
        return this.subtractBusinessDaysFromDate(newDate, 1, currency);
      }
      return this.addDays(newDate, 2);
    } if (newDate.isoWeekday() === 7) {
      if (addValue.includes('M')) {
        return this.subtractBusinessDaysFromDate(newDate, 2, currency);
      }
      return this.addDays(newDate, 1);
    }
    return newDate;
  }

  getPreviousBusinessDate(date, subDays) {
    const newDate = this.subtractDate(date, subDays);
    if (newDate.isoWeekday() === 6) {
      return this.subtractDate(newDate, 2);
    } if (newDate.isoWeekday() === 7) {
      return this.subtractDate(newDate, 4);
    }
    return newDate;
  }

  getNextNonBusinessDateFromToday() {
    const dd = moment();
    let diff = moment().isoWeekday(6).diff(dd, 'd'); // days to saturday
    let newDate = '';
    if (dd.isoWeekday() >= 3) {
      diff += 7;
      newDate = dd.add(diff, 'd');
    } else {
      newDate = dd.add(diff, 'd');
    }

    this.log.log(`New date calculated is ${newDate}`);
    return newDate;
  }

  getNextNonBusinessDateFromDate(date, format) {
    this.log.log(`date from valuedate is ${date}`);
    const dd = moment(date, format);
    this.log.log(`date from valuedate is ${dd}`);
    let diff = moment().isoWeekday(6).diff(dd, 'd'); // days to saturday
    let newDate = '';
    if (dd.isoWeekday() >= 3) {
      diff += 7;
      newDate = dd.add(diff, 'd');
    } else {
      newDate = dd.add(diff, 'd');
    }

    this.log.log(`New date calculated is ${newDate}`);
    return newDate;
  }

  getBusinessDateFromToday(days) {
    const dd = moment();
    /* let newDate = dd.add(days, 'd'); // add 3 days to ensure new day count and term are >0

    if (newDate.isoWeekday() === 6) {
      newDate = newDate.add(2, 'd');
      this.log.log(`New date calculated is ${newDate}`);
      return newDate;
    } if (newDate.isoWeekday() === 7) {
      newDate = newDate.add(1, 'd');
      this.log.log(`New date calculated is ${newDate}`);
      return newDate;
    }
    this.log.log(`New date calculated is ${newDate}`);
    return newDate; */
    const newDate = this.addBusinessDays(dd, days);
    this.log.log(`New date calculated is ${newDate}`);
    return newDate;
  }

  addBusinessDateFromToday(days, currency1, currency2) {
    const dd = moment();
    const newDate = this.addWorkingDays(dd, days, currency1, currency2);
    this.log.log(`New date calculated is ${newDate}`);
    return newDate;
  }

  subtractBusinessDateFromToday(days, currency1, currency2) {
    const dd = moment();
    const newDate = this.subtractWorkingDays(dd, days, currency1, currency2);
    this.log.log(`New date calculated is ${newDate}`);
    return newDate;
  }

  subtractHoursFromCurrentTime(hours) {
    const dd = moment();
    const newTime = dd.subtract(hours, 'hours').format('HH:mm:ss');
    this.log.log(`New time calculated is ${newTime}`);
    return newTime;
  }

  addBusinessDaysFromGivenDay(date, days, currency1, currency2) {
    const newDate = this.addWorkingDays(date, days, currency1, currency2);
    this.log.log(`New date calculated is ${newDate}`);
    return newDate;
  }

  addDate(datedd, addValue) {
    try {
      const date = datedd;
      const value = addValue.toLowerCase();
      if (value.includes('d')) {
        return date.add(value.replace('d', ''), 'd');
      } if (value.includes('m')) {
        return date.add(value.replace('m', ''), 'month');
      } if (value.includes('w')) {
        return date.add(value.replace('w', ''), 'w');
      } if (value.includes('y')) {
        return date.add(value.replace('y', ''), 'y');
      }
      this.log.log('Wrong Option for date.');
    } catch (error) {
      this.log.log(`Error while adding the date.${error}`);
    }
    return null;
  }

  addDays(date, addDays) {
    try {
      const newdate = date.add(addDays, 'd');
      return newdate;
    } catch (error) {
      this.log.log(`Error while adding the days. ${error}`);
    }
    return null;
  }

  addBusinessDays(date, addDays) {
    this.log.log(`Date to add business days to equals: ${date}`);
    const d = date.clone().add('d', Math.floor(addDays / 5) * 7);
    let remaining = addDays % 5;
    while (remaining) {
      d.add(1, 'd');
      if (d.day() !== 0 && d.day() !== 6) {
        remaining -= 1;
      }
    }
    this.log.log(`final added business date is : ${d}`);
    return d;
  }

  addWorkingDays(date, addDays, currency1, currency2) {
    this.log.log(`Date to add business days to equals: ${date}`);
    const d = date.clone().add('d', Math.floor(addDays / 5) * 7);
    const remaining = addDays % 5;
    const holidayRemaining = this.getNumberOfWorkingDays(currency1, date, d) + this.getNumberOfWorkingDays(currency2, date, d);
    let finalAddValue = remaining + holidayRemaining;
    while (finalAddValue) {
      d.add(1, 'd');
      if (d.day() !== 0 && d.day() !== 6 && (!this.isDateOnHoliday(d, currency1)) && (!this.isDateOnHoliday(d, currency2))) {
        finalAddValue -= 1;
      }
    }
    this.log.log(`final added business date is : ${d}`);
    return d;
  }

  subtractWorkingDays(date, subtractDays, currency1, currency2) {
    this.log.log(`Date to subtract business days to equals: ${date}`);
    const d = date.clone().subtract('d', Math.floor(subtractDays / 5) * 7);
    const remaining = subtractDays % 5;
    const holidayRemaining = this.getNumberOfWorkingDays(currency1, date, d) + this.getNumberOfWorkingDays(currency2, date, d);
    let finalsubtractValue = remaining + holidayRemaining;
    while (finalsubtractValue) {
      d.subtract(1, 'd');
      if (d.day() !== 0 && d.day() !== 6 && (!this.isDateOnHoliday(d, currency1)) && (!this.isDateOnHoliday(d, currency2))) {
        finalsubtractValue -= 1;
      }
    }
    this.log.log(`final subtracted business date is : ${d}`);
    return d;
  }

  getNumberOfWorkingDays(currency, startDate, endDate) {
    this.log.log('Validating number of holiday in between days');
    const hCurrency = this.getHolidayInBetweenDate(currency, startDate, endDate);
    return this.getNumberOfWeekDaysInHolidayList(hCurrency);
  }

  getNumberOfWeekDaysInHolidayList(holidayList) {
    this.log.log('Validaing if any holiday on week day');
    let counter = 0;
    holidayList.forEach((date) => {
      const dd = moment(date);
      if (dd.day() !== 0 && dd.day() !== 6) {
        counter += 1;
      }
    });
    return counter;
  }

  subtractDate(date, subDays) {
    try {
      return date.subtract(subDays, 'days');
    } catch (error) {
      this.log.log(`Error while subtracting the date.${error}`);
    }
    return null;
  }

  subtractDateFromToday(subDays) {
    const dd = moment();
    try {
      return dd.subtract(subDays, 'days');
    } catch (error) {
      this.log.log(`Error while subtracting the date.${error}`);
    }
    return null;
  }

  subtractYearsFromToday(subYears) {
    const dd = moment();
    try {
      return dd.subtract(subYears, 'years');
    } catch (error) {
      this.log.log(`Error while subtracting the date.${error}`);
    }
    return null;
  }

  subtractBusinessDays(date, addDays) {
    const d = date.clone().subtract(Math.floor(addDays / 5) * 7, 'd');
    let remaining = addDays % 5;
    while (remaining) {
      d.subtract(1, 'd');
      if (d.day() !== 0 && d.day() !== 6) {
        remaining -= 1;
      }
    }
    this.log.log(`final added business date is : ${d}`);
    return d;
  }

  subtractBusinessDaysFromDate(date, addDays, currency) {
    const d = date.clone().subtract(Math.floor(addDays / 5) * 7, 'd');
    const remaining = addDays % 5;
    const holidayRemaining = this.getNumberOfWorkingDays(currency, d, date);
    let finalAddValue = remaining + holidayRemaining;
    while (finalAddValue) {
      d.subtract(1, 'd');
      if (d.day() !== 0 && d.day() !== 6 && (!this.isDateOnHoliday(d, currency))) {
        finalAddValue -= 1;
      }
    }
    this.log.log(`final added business date is : ${d}`);
    return d;
  }

  calculateDaysIfLeapYear(days) {
    if (moment().isLeapYear()) {
      this.log.log(`Returning date : ${days + 1}`);
      return days + 1;
    }
    return days;
  }

  convertToUnixStartOfDay(dateString, dateFormat) {
    const epoch = moment(`${dateString}`, dateFormat).startOf('day').valueOf();
    this.log.log(`Converted ${dateString} to Unix Epoch time : ${epoch}`);
    return epoch;
  }

  convertToUnixEndOfDay(dateString, dateFormat) {
    const epoch = moment(`${dateString}`, dateFormat).endOf('day').valueOf();
    this.log.log(`Converted ${dateString} to Unix Epoch time : ${epoch}`);
    return epoch;
  }

  convertToUnixEpoch(dateString, time) {
    const epoch = moment(`${dateString} ${time}`, 'DD/MM/YYYY HH:mm:ss:SSS').valueOf();
    this.log.log(`Converted ${dateString} ${time} to Unix Epoch : ${epoch}`);
    return epoch;
  }
}
module.exports = DateModel;
