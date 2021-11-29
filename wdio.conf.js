/* eslint-disable no-unused-vars */
const path = require('path');

const downloadDir = path.join(__dirname, 'tempDownload');
global.downloadDir = downloadDir;

exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  port: 9515,
  path: '/',
  sync: true,
  debug: true,
  //
  // Override default path ('/wd/hub') for chromedriver service.

  // For Debug:
  // execArgv: ['--inspect-brk=127.0.0.1:5859'],
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    './test/specs/**/*.js',
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files',
    './test/specs/e2e.bml.spec.js',
  ],
  suites: {
    e2eSuite: [
    // e2eNdf
      './test/specs/e2e/e2e.outright.spec.js',
      './test/specs/e2e/e2e.spread.spec.js',
      './test/specs/e2e/e2e.tom.spec.js',
      './test/specs/e2e/e2e.tod.spec.js',
      './test/specs/e2e/e2e.dealt.ccy.spec.js',
      './test/specs/e2e/e2e.agent.spec.js',
      './test/specs/e2e/e2e.ccy1.eur.spec.js',
      './test/specs/e2e/e2e.3cp.spec.js',
      './test/specs/e2e/e2e.backdate.spec.js',
      './test/specs/e2e/e2e.exe.venue.spec.js',

      // e2eFwd
      // run a single instance at a time
      './test/specs/e2e/fwd/forward/e2e.forward.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.dealt.ccy.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.agent.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.mifid.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.ccy1.gbp.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.backdate.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.lr.spec.js',
      './test/specs/e2e/fwd/forward/e2e.forward.turn.trade.spec.js',

      // e2eFwdFwd
      // run a single instance at a time
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.dealt.ccy.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.agent.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.mifid.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.ccy1.gbp.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.backdate.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.lr.spec.js',
      './test/specs/e2e/fwd/fwdForward/e2e.fwd.forward.turn.trade.spec.js',

      // e2eFwdOut
      // run a single instance at a time
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.spec.js',
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.dealt.ccy.spec.js',
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.agents.spec.js',
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.mifid.spec.js',
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.ccy1.gbp.spec.js',
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.backdate.spec.js',
      './test/specs/e2e/fwd/outright/e2e.fwd.outright.lr.spec.js',

      // e2eSpt
      // run a single instance at a time
      './test/specs/e2e/spt/e2e.spt.spec.js',
      './test/specs/e2e/spt/e2e.spt.dealt.ccy.spec.js',
      './test/specs/e2e/spt/e2e.spt.agents.spec.js',
      './test/specs/e2e/spt/e2e.spt.ccy1.spec.js',
      './test/specs/e2e/spt/e2e.spt.backdate.spec.js',
      './test/specs/e2e/spt/e2e.spt.rtns.spec.js',
      './test/specs/e2e/spt/e2e.spt.mbs2.spec.js',
      './test/specs/e2e/spt/e2e.spt.dealPrinter.spec.js',
      './test/specs/e2e/e2e.dealPrinter.spec.js',
    ],
    common: [
      './test/specs/clientManager.spec.js',
      './test/specs/defaults.spec.js',
      './test/specs/client.functionality.spec.js',
      './test/specs/swapButton.spec.js',
      './test/specs/common.functionality.spec.js',
      './test/specs/error.functionality.spec.js',
      './test/specs/pageNavigation.spec.js',
      './test/specs/loginLogout.spec.js',
    ],
    ndf: [
      './test/specs/outright.spec.js',
      './test/specs/spread.spec.js',
      './test/specs/functionality.spec.js',
      './test/specs/dates/ndf.dates.spec.js',
    ],
    fwd: [
      './test/specs/fwd/forward.forward.spec.js',
      './test/specs/fwd/forward.forward.functionality.spec.js',
      './test/specs/fwd/forward.spec.js',
      './test/specs/fwd/forward.functionality.spec.js',
      './test/specs/fwd/outright.spec.js',
      './test/specs/fwd/outright.functionality.spec.js',
      './test/specs/fwd/clientManager.spec.js',
    ],
    spt: [
      './test/specs/spt/spt.spec.js',
      './test/specs/spt/spt.functionality.spec.js',
      './test/specs/spt/clientManager.spec.js',
    ],
    admin: [
      './test/specs/admin/broker.admin.spec.js',
      './test/specs/admin/currencies.admin.spec.js',
    ],
    blotter: [
      './test/specs/blotter/blotter.spec.js',
      './test/specs/blotter/blotter.functionality.spec.js',
      './test/specs/blotter/blotter.search.spec.js',
      './test/specs/blotter/blotter.rtu.spec.js',
      './test/specs/blotter/blotter.localStp.spec.js',
    ],
  },
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 1,
    //
    browserName: 'chrome',
    browserVersion: '94.0.0',
    // platformName: 'Windows 10',
    // platformName: 'Windows 10',
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],
    'goog:chromeOptions': {
      prefs: {
        directory_upgrade: true,
        prompt_for_download: false,
        'download.default_directory': downloadDir,
      },
      w3c: false,
      args: [
        '--headless',
        '--window-size=1680,800',
        '--disable-gpu',
        '--mute-audio',

        // ---- Optional ---- //
        // '--window-position=2000,-150', // uncomment to open chrome on second monitor
        // uncomment to open to right of screen:
        // '--window-position=900,0',
        // '--window-size=1000,900',
        // '--auto-open-devtools-for-tabs',
      ],
    },
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'silent',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner, @wdio/lambda-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Warns when a deprecated command is used
  deprecationWarnings: true,

  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.

  // Comment out baseURL as appropriate:
  baseUrl: 'http://localhost:8080/DMSWeb',
  // baseUrl: 'http://ldndmstestapp:8080/DMSWeb',
  // baseUrl: 'http://ldndmsdevapp:8080/DMSWeb',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 900000,

  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 900000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [
    'chromedriver',
    'shared-store',
  ],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html

  reporters: ['spec', 'dot', ['allure', {
    outputDir: './results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true,
  }],
  ['junit', {
    outputDir: './results',
    outputFileFormat(options) { // optional
      return `results-${options.cid}.Spec.Result.xml`;
    },
    errorOptions: {
      error: 'message',
      failure: 'message',
      stacktrace: 'stack',
    },
  }]],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 14400000,
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
  // onPrepare: function (config, capabilities) {
  // },
  /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
  // before: function (capabilities, specs) {
  // },
  /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
  // beforeCommand: function (commandName, args) {
  // },
  /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
  // beforeSuite: function (suite) {
  // },
  /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
  // beforeTest: function (test, context) {
  // },
  /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
  // beforeHook: function (test, context) {
  // },
  /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },
  /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
  // afterTest: function(test, context, { error, result, duration, passed, retries }) {
  // },
  /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
  // afterSuite: function (suite) {
  // },
  /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
  // after: function (result, capabilities, specs) {
  // },
  /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
  // onComplete() {
  //   const reportError = new Error('Could not generate Allure report');
  //   const generation = allure(['generate', 'allure-results', '--clean']);
  //   return new Promise((resolve, reject) => {
  //     const generationTimeout = setTimeout(
  //       () => reject(reportError),
  //       5000,
  //     );

  //     generation.on('exit', (exitCode) => {
  //       clearTimeout(generationTimeout);

  //       if (exitCode !== 0) {
  //         return reject(reportError);
  //       }

  //       console.log('Allure report successfully generated');
  //       resolve();
  //     });
  //   });
  // },

  /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
  // onReload: function(oldSessionId, newSessionId) {
  // }
};
