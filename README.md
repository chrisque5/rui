# DMSWeb Client
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Build](#build)
- [Start \(Optional\)](#start-optional)
- [Test \(Optional\)](#test-optional)
- [Permissions](#permissions)

## Introduction
The DMSWeb client is a React web application for booking and managing FX deals.  The currently supported deal types are NDF, FWD and SPT.

## Prerequisites
* WildFly 13 Server
* Node.js v12 LTS

Before attempting to build and run the DMSWeb Client you need to first setup your WildFly 13 Server.  Instructions for this can be found on [tpWiki](https://wiki.tpicapcloud.com/display/BEL/Wildfly+Tips+and+Tricks).

To build and run DMSWeb we require Node.js, which includes the _npm_ package manager.  It is recommended you install the most recent [Node.js v12 LTS](https://nodejs.org/dist/latest-v12.x/) package.  Newer versions may cause build errors that are not immediately obvious.

After downloading and running the Node.js installer ensure you check the option to add Node to your ```PATH``` automatically.  Once the installer has completed you can run the following in Command Prompt to ensure  both _node_ and _npm_ are available:

```bash
node --version
v12.18.3

npm --version
v6.14.6
```

## Install
To install the packages required for DMSWeb we use the _npm_ package manager that is bundled with Node.js.  By default _npm_ will attempt to install packages from the public registry which cannot be accessed on the _CORP_ domain.  A ```.npmrc``` file is provided in this project directory that ensures the TP ICAP Nexus registry is used instead.

To install the required packages run the following from Command Prompt:

```bash
# change path below as appropriate
cd C:/source/tpDMS/dev/react-ui

npm install
```

## Build
After the installation has completed we can run the build step.  This will create a ```build``` directory with the static assets for the web app.  The contents of this folder can be copied to the ```war-ui``` directory which is how the web app is configured in the Production environment.

```bash
# change path below as appropriate
cd C:/source/tpDMS/dev/react-ui

npm run build

# change paths below as appropriate
cp -r c:/source/tpDMS/dev/react-ui/build/* c:/source/tpDMS/dev/war-ui/src/main/webapp/reactjs
```

Once the build directory has been copied we can start the WildFly server and access the DMSWeb login page at ```http://localhost:8080/DMSWeb```.  On successful login you will be redirected to the React web app.  If instead you see a page titled "Wrong configuration alert" it indicates the build assets have not been copied to the ```reactjs``` directory correctly and you should review the steps above.

To prevent having to copy the ```build``` directory after each successful build we can instead configure our WildFly server to return the contents of this directory when any request is made to ```/DMSWeb/reactjs```.  Full instructions for this can be found on [tpWiki](https://wiki.tpicapcloud.com/display/BEL/Development+Setup+for+React+with+WildFly#DevelopmentSetupforReactwithWildFly-2.ConfigureReactapptoworkwithWildFly).

## Start (Optional)
This is an optional step to allow you to run the React web app locally with Node.js to make use of features such as _hot reloading_.

```bash
# change path below as appropriate
cd C:/source/tpDMS/dev/react-ui

npm start
```

Once the Node.js server has started a browser window should automatically open and redirect to ```http://localhost:3000```.  For the web app to be displayed you will need to have a valid session ID, which you can get by first logging in through ```http://localhost:8080/DMSWeb```.

Extra configuration will be required to allow CORS requests between the client (port 3000) and the server (port 8080).  Full instructions for this can be found on [tpWiki](https://wiki.tpicapcloud.com/display/BEL/Development+Setup+for+React+with+WildFly#DevelopmentSetupforReactwithWildFly-5.RunningReactwithNode.js).

## Test (Optional)
A suite of unit tests exist for most of our JavaScript classes and React Components using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).  These can be found in ```__tests__``` directories at the same path as the file under test, and have the naming convention ```[filename].spec.js```.

For React Components we also have [snapshot tests](https://jestjs.io/docs/snapshot-testing) that capture a reference snapshot file for each rendered UI component.  These are kept in ```__snapshots__``` directories along with the other unit tests, and have the naming convention ```[filename].spec.js.snap```.

The following scripts allow you to run a test suite:

```bash
# change path below as appropriate
cd c:/source/tpDMS/dev/react-ui

# run tests in watch mode
npm run test

# run tests with coverage report
npm run test:coverage

# run tests with linting and coverage before pushing a branch
npm run prepush
```

## Permissions
A series of roles and permissions determine which parts of the DMSWeb app a user can access, and what actions they can carry out.  These also determine which page a user sees after login, depending on whether or not they have set a _Default Entry Page_ in the _User Settings_ menu.

The roles, permissions and user login flow are fully documented on [tpwiki](https://wiki.tpicapcloud.com/display/BEL/DMS+Web+Login+Permissions+and+Roles).  If you run the script to create your local database as part of the server setup then you will have a test user account with some roles already assigned.  Additional roles and permissions can be assigned through the [DMS Administration](https://wiki.tpicapcloud.com/display/GD/DMS+Client+Install+Locations) client application if required.
