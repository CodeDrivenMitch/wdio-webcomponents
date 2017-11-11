require("babel-register");

var path = require('path');

exports.config = {
    specs: [
        path.join(__dirname, '/specs/*.spec.js')
    ],
    capabilities: [{
        browserName: 'chrome'
    }],
    sync: false,
    logLevel: 'silent',
    coloredLogs: true,
    baseUrl: 'https://shop.polymer-project.org/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
        compilers: [
            'js:babel-register'
        ],
    },
    before: function () {
        require('../../src').init(browser, {})
    },
    services: ['selenium-standalone'],
    seleniumArgs: {
        version: '3.0.1'
    },
    seleniumInstallArgs: {
        version: '3.0.1',
        logger: console.log
    }
};