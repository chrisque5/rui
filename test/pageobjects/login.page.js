const page = require('./page');

const loginPage = Object.create(page, {

  // Client Manager
  username: { get: () => browser.element('#inputEmail') },
  password: { get: () => browser.element('#inputPassword') },
  btnSignIn: { get: () => browser.element('#btnSignIn') },


  // functions
  login: {
    value: (UserName, Password) => {
      loginPage.username.setValue(UserName);
      loginPage.password.setValue(Password);
      loginPage.btnSignIn.click();
    },
  },
});

module.exports = loginPage;
