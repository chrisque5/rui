/* eslint-disable no-undef */
const expect = require('chai').expect;
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const Logs = require('../core/utility/Logs.js');

const LocalUsers = require('../data/UserDetails.js');
const QaUsers = require('../data/qa/UserDetails.js');
const Constants = require('../data/Constants.js');

let users = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = LocalUsers;
    break;
  case 'QA':
  case 'DEV':
    users = QaUsers;
    break;
  default:
    users = LocalUsers;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const log = new Logs();
const count = 50;

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  loginModel.openUrl(Constants.NDFURL);
  expect(dealModel.isPageLoadComplete()).to.be.equal(true);
  expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
});

beforeEach(() => {
  log.log(`Logged in user is : ${loginModel.getDdlUserDropdownText()}`);
});

describe('Login Logout test: Testing multiple login and logout sequences in a loop', () => {
  it('C29386 Verify users can login and logout successfully multiple times.', () => {
    for (let i = 0; i < count; i += 1) {
      loginModel.changeUser(users.USER_A.UserName, users.USER_A.PassWord);
      expect(loginModel.waitForDdlUserDropdownText()).to.equal(true);
      expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_A.FullName);
      loginModel.changeUser(users.USER_E.UserName, users.USER_E.PassWord);
      expect(loginModel.waitForDdlUserDropdownText()).to.equal(true);
      expect(loginModel.getDdlUserDropdownText()).to.equal(users.USER_E.FullName);
    }
  }).timeout(600000);
});
