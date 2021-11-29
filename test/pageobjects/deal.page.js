/* eslint-disable no-undef */
const page = require('./page');
const loginPage = require('../pageobjects/login.page.js');
const errorPage = require('../pageobjects/error.page.js');

const dealPage = Object.create(page, {

  // Header
  ddlUserDropdown: { get: () => browser.element('[data-testid="ddlUserDropdown"]') },
  // btnSettings: { get: () => browser.element('#btnSettings') },
  btnLogout: { get: () => browser.element('[data-testid="btnLogout"]') },

  // trade capture
  rdoStrategyOutright: { get: () => browser.element('[data-testid="rdoStrategyOutright"]') },
  rdoStrategySpread: { get: () => browser.element('[data-testid="rdoStrategySpread"]') },
  ddlExec: { get: () => browser.element('[data-testid="ddlExecutionVenue"]') },

  ddlCurrency1: { get: () => browser.element('[data-testid="ddlCurrency1"]') },
  ddlCurrency2: { get: () => browser.element('[data-testid="ddlCurrency2"]') },
  txtInputTerm1: { get: () => browser.element('#term1 > div > div > ul > li > div > input') },
  txtPrice1: { get: () => browser.element('[data-testid="txtPrice1"]') },
  txtAmount1: { get: () => browser.element('[data-testid="txtAmount1"]') },
  dtpFixingDate1: { get: () => browser.element('[data-testid="dtpFixingDate1"]') },
  dtpValueDate1: { get: () => browser.element('[data-testid="dtpValueDate1"]') },
  numDayCount1: { get: () => browser.element('[data-testid="numDayCount1"]') },

  // spread trade economics
  txtInputTerm2: { get: () => browser.element('#term2 > div > div > ul > li > div > input') },
  txtPrice2: { get: () => browser.element('[data-testid="txtPrice2"]') },
  txtAmount2: { get: () => browser.element('[data-testid="txtAmount2"]') },
  txtPoints: { get: () => browser.element('[data-testid="txtPoints"]') },
  dtpFixingDate2: { get: () => browser.element('[data-testid="dtpFixingDate2"]') },
  dtpValueDate2: { get: () => browser.element('[data-testid="dtpValueDate2"]') },
  numDayCount2: { get: () => browser.element('[data-testid="numDayCount2"]') },

  // Client/Trader/Broker
  btnBuyer: { get: () => browser.element('[data-testid="btnBuyer"]') },
  btnSeller: { get: () => browser.element('[data-testid="btnSeller"]') },
  ddlBuyerClientTrader: { get: () => browser.element('[data-testid="ddlbuyerClientTrader"]') },
  ddlSellerClientTrader: { get: () => browser.element('[data-testid="ddlsellerClientTrader"]') },
  ddlBuyerBroker: { get: () => browser.element('[data-testid="ddlbuyerBroker"]') },
  ddlSellerBroker: { get: () => browser.element('[data-testid="ddlsellerBroker"]') },
  btnBuyerFave: { get: () => browser.element('[data-testid="btnBuyerFave"]') },
  btnSellerFave: { get: () => browser.element('[data-testid="btnSellerFave"]') },

  btnSubmit: { get: () => browser.element('[data-testid="btnSubmit"]') },
  btnReset: { get: () => browser.element('[data-testid="btnReset"]') },

  // functions
  logout: {
    value: () => {
      dealPage.ddlUserDropdown.click();
      dealPage.btnLogout.waitForVisible();
      dealPage.btnLogout.click();
    },
  },

  changeUser: {
    value: (UserName, Password) => {
      if (UserName === 'belfasttpeur4') {
        dealPage.logout();
        loginPage.btnSignIn.waitForVisible();
        loginPage.login(UserName, Password);
        errorPage.txtError.waitForVisible();
      } else {
        dealPage.logout();
        loginPage.btnSignIn.waitForVisible();
        loginPage.login(UserName, Password);
        dealPage.ddlUserDropdown.waitForVisible();
      }
    },
  },

  tradeEconomics: {
    value: (dealType, currency2, term1, price1, amount1, term2, price2, amount2) => {
      if (dealType === 'outright') {
        dealPage.enterField(dealPage.ddlCurrency2, currency2);
        dealPage.enterField(dealPage.txtInputTerm1, term1);
        dealPage.enterField(dealPage.txtPrice1, price1);
        dealPage.enterField(dealPage.txtAmount1, amount1);
      } else if (dealType === 'spread') {
        dealPage.enterField(dealPage.ddlCurrency2, currency2);
        dealPage.enterField(dealPage.txtInputTerm1, term1);
        dealPage.enterField(dealPage.txtInputTerm2, term2);
        dealPage.enterField(dealPage.txtPrice1, price1);
        dealPage.enterField(dealPage.txtPrice2, price2);
        dealPage.enterField(dealPage.txtAmount1, amount1);
        dealPage.enterField(dealPage.txtAmount2, amount2);
      }
    },
  },

  clientData: {
    value: (field, searchTerm, itemToClick) => {
      field.waitForVisible();
      field.click();
      field.setValue(searchTerm);
      $(`.ant-cascader-menu-item*=${itemToClick}`).waitForVisible();
      $(`.ant-cascader-menu-item*=${itemToClick}`).click();
    },
  },

  changeField: {
    value: (field, valueOne, valueTwo) => {
      // console.log(dealPage[field], valueOne, valueTwo);
      dealPage.enterField(dealPage[field], valueOne, valueTwo);
    },
  },

  enterField: {
    value: (field, valueOne, valueTwo) => {
      // console.log(`field selector = ${field.selector}`);
      // console.log(`field = ${field.selector}, valueOne = ${valueOne}, valueTwo = ${valueTwo}`);
      if (JSON.stringify(field) === JSON.stringify(dealPage.ddlCurrency1)
          || JSON.stringify(field) === JSON.stringify(dealPage.ddlCurrency2)
          || JSON.stringify(field) === JSON.stringify(dealPage.ddlBuyerBroker)
          || JSON.stringify(field) === JSON.stringify(dealPage.ddlSellerBroker)) {
        field.waitForVisible();
        field.click();
        browser.keys([valueOne]);
        browser.keys(['Enter']);
      } else if (JSON.stringify(field) === JSON.stringify(dealPage.dtpFixingDate1)
        || JSON.stringify(field) === JSON.stringify(dealPage.dtpValueDate1)
        || JSON.stringify(field) === JSON.stringify(dealPage.dtpFixingDate2)
        || JSON.stringify(field) === JSON.stringify(dealPage.dtpValueDate2)) {
        field.waitForVisible();
        dealPage.setDate(field, valueOne);
      } else if (JSON.stringify(field) === JSON.stringify(dealPage.ddlBuyerClientTrader)
      || JSON.stringify(field) === JSON.stringify(dealPage.ddlSellerClientTrader)) {
        dealPage.clientData(field, valueOne, valueTwo);
      } else if (JSON.stringify(field) === JSON.stringify(dealPage.txtPrice1)
      || JSON.stringify(field) === JSON.stringify(dealPage.txtPrice2)
      || JSON.stringify(field) === JSON.stringify(dealPage.txtPoints)) {
        dealPage.clearField(field);
        browser.keys([valueOne]);
        browser.keys(['Tab']);
      } else {
        dealPage.clearField(field);
        field.setValue(valueOne);
        browser.keys(['Tab']);
      }
    },
  },

  // function to clear fields manually calling setValue()
  clearField: {
    value: (field) => {
      field.waitForVisible();
      if (field.getValue() === null) {
      //  console.log(`text of field = ${field.getValue()}`);
      } else {
        field.click();
        const fieldLength = field.getValue().length;
        for (let i = 0; i <= fieldLength; i += 1) {
          browser.keys(['Backspace']); // delete text
          browser.keys(['Delete']);
        }
      }
    },
  },

  selectRadioButton: {
    value: (rdoButton) => {
      rdoButton.click();
    },
  },

  setDate: {
    value: (datePicker, date) => {
      dealPage.clearField(datePicker);
      browser.keys([date]);
      browser.keys(['Tab']);
      browser.keys(['Return']);
    },
  },

  getDate: {
    value: datePicker => datePicker.getValue(),
  },

  calculateDateFromToday: {
    value: (daysToAdd) => {
      const today = new Date();
      const newDate = new Date();
      newDate.setDate(today.getDate() + daysToAdd);

      let dd = newDate.getDate();
      let mm = newDate.getMonth() + 1; // Jan = 0
      const yyyy = newDate.getFullYear();

      if (dd < 10) { dd = `0${dd}`; }
      if (mm < 10) { mm = `0${mm}`; }

      const date = `${dd}/${mm}/${yyyy}`;
      return date;
    },
  },

  findNotification: {
    value: (message) => {
      $(`.ant-notification-notice-message=${message}`).waitForVisible(); // finds AntD notification using class name and text
      return $(`.ant-notification-notice-message=${message}`).getText();
    },
  },
  // extracts deal IDs from success message -
  dealNotification: {
    value: (message) => {
      $(`.ant-notification-notice-message*=${message}`).waitForVisible(); // finds AntD notification using class name and text
      const msg = $(`.ant-notification-notice-message*=${message}`).getText();
      // const desc = $('.ant-notification-notice-description*=Deal successfully created').getText();
      // console.log(desc); commented out until we need to use deal IDs for E2E testing
      // const temp = desc.replace(/\D/g, '');
      // const dealId = temp.split(','); // need to add in something to extract the numbers separated by commas
      // console.log(dealId); commented out until we need to use deal IDs for E2E testing
      // return dealId;
      return msg;
    },
  },

  validationNotification: {
    value: (message, description) => {
      $(`.ant-notification-notice-message*=${message}`).waitForVisible(); // finds AntD notification using class name and text
      const msg = $(`.ant-notification-notice-message*=${message}`).getText();
      const desc = $(`.ant-notification-notice-description*=${description}`).getText();
      // console.log(`${msg} : ${desc}`);
      return { msg, desc };
    },
  },

  closeNotification: {
    value: () => {
      $('.ant-notification-notice-close').waitForVisible();
      $('.ant-notification-notice-close').click(); // finds AntD notification close button using class name
    },
  },
});


module.exports = dealPage;
