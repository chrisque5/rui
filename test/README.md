# DMSWeb Client Webdriver Tests

## Introduction

The UI tests for DMSWeb client are tests focussing primarily on the front-end React Web Application for DMS based on Selenium Webdriver using the Mocha framework and Chai for assertions.

## Prerequisites
In order to run the tests the user must have WebdriverIO and Chromedriver installed. Instructions on setup and running tests can be found on the DMS [Wiki](https://wiki.tpicapcloud.com/display/BEL/Automated+Testing+With+WebdriverIO).
To get started, download Chromedriver zip from [here](https://chromedriver.chromium.org/downloads) ensuring that you download the same version as the Chrome installed on your PC. Extract the zip file and add it to Path (instructions can be found in the WebdriverIO Getting Started link above).

## Chrome Updates
The version of Chrome on your local machine will change as updates get pushed, when the Chrome version changes, it is necessary to update the Chromedriver version as well. 
When Chrome & Chromedriver versions are updated, the referenced versions should also be updated in the files and locations below. 

wdio.conf.js - Update the browser Version at line 171
package.json - Update the Chrome version at line 66
package-lock.json - Update ChromeDriver version at lines 5542 and 5543


## Setting Up The Tests
Currently the tests can be ran against a local test environment or against QA. In order to setup the tests for running against either environment there are two options that must be set:

BaseURL must be set in ```./react-ui/wdio.conf.js```:

```javascript
  // Comment out baseURL as appropriate:
  baseUrl: 'http://localhost:8080/DMSWeb',
  // baseUrl: 'http://ldndmstestapp:8080/DMSWeb',
```


Test data constants files must be chosen in ```./react-ui/test/data/Constants.js```:

```javascript
  // Change ENV string to 'LOCAL', 'DEV' or 'QA' depending on which environment you want to test
  ENV: 'LOCAL',
```

## Running The Tests
When running the tests we can either run a single test spec file or a suite of spec files. Suites are configured in ```wdio.conf.js```. There are suites for _Common_, _NDF_, _FWD_, _SPT_, _Blotter_, _Admin_ and _E2E_.

The Common suite covers common functionality across each screen and should be ran in addition to the screen under test.  For example, if testing a change on the NDF trade capture screen you should execute both the _Common_ and _NDF_ suites.  If testing a change on the Admin screen you should excute both _Common_ and _Admin_ suites.

To run a spec file:

```bash
# equivalent to running automation with no parameters - will execute every spec file in the ./specs folder
npm run automation

# specify a spec file (note first -- is important!)
npm run automation -- --spec [enter spec file name here]

# e.g.
npm run automation -- --spec blotter.spec.js
```

The following will run any spec file with "blotter" in the filename:

```bash
npm run automation -- --spec blotter
```

Relative paths can be given:

```bash
npm run automation -- --spec '.\test\specs\blotter\blotter.rtu.spec.js
```

Multiple spec files can be given:

```bash
npm run automation -- --spec pageNavigation.spec.js loginLogout.spec.js
```

To run a suite of tests:

```bash
# specify a suite (note first -- is important!)
npm run automation -- --suite common

# can specify multiple suites
npm run automation -- --suite common ndf

## Run tests in Debug
In VS Code,  select the forth icon on the left hand side 
Select the dropdown box at the top of debug view (beside Run)
Select the value 'Debug Current Spec'
To run tests in debug mode, click on the spec to be run in debug and click the green arrow in the Debug view

# set breakpoints
breakpoints allow you to step through the code and is useful for troubleshooting failures
You can set breakpoints in the spec file and in any of the classes called from the spec file
It is good practice to remove breakpoints once you have finished debugging by selecting 
Run> Remove All Breakpoints 
```