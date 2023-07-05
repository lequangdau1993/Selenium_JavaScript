exports.config = {
    maxInstances: 2,
    specs: [
        './test_scripts/saucedemo/test_script/testPurchase.js',
        './test_scripts/saucedemo/test_script/testLogin.js',
    ],
    host: 'localhost',
    port: 9515,
    path:'/',
    capabilities: [
        {
            browserName: 'chrome'
        }
    ],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    logLevel: 'info',
    reporters: ['spec'],
}