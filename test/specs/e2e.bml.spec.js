/* eslint-disable no-undef */
const DealModel = require('../models/DealModel.js');
const LoginModel = require('../models/LoginModel.js');
const SettingsModel = require('../models/SettingsModel.js');
const E2EModel = require('../models/E2EModel.js');
const Logs = require('../core/utility/Logs.js');
const LocalUsers = require('../data/qa/UserDetails.js');
const LocalInstrument = require('../data/qa/InstrumentDetails.js');
const Constants = require('../data/Constants.js');

let users = null;
let instrument = null;

const ENV = Constants.ENV;
switch (ENV) {
  case 'LOCAL':
    users = null;
    instrument = null;
    break;
  case 'QA':
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
  default:
    users = LocalUsers;
    instrument = LocalInstrument;
    break;
}

const dealModel = new DealModel();
const loginModel = new LoginModel();
const settingsModel = new SettingsModel();
const e2e = new E2EModel();
const log = new Logs();
let dateFormat = '';

before(() => {
  loginModel.openUrl('/DMSWeb');
  loginModel.login(users.USER_A.UserName, users.USER_A.PassWord);
  dateFormat = dealModel.getDateFormat();
  // e2eApi.startListener('qa');
  log.log(`Final Date format according to the browser is : ${dateFormat}`);
});
// Setup - Run before each test
beforeEach(() => { loginModel.openUrl('/DMSWeb/reactjs'); });

