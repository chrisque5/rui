const page = require('./page');

const errorPage = Object.create(page, {

  // Client Manager
  txtError: { get: () => browser.element('#txtError') },
  lnkReturnLogin: { get: () => browser.element('#lnkReturnLogin') },

});

module.exports = errorPage;
