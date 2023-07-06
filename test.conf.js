exports.config = {
    maxInstances: 2,
    specs: [
        './test_scripts/saucedemo/test_script/testPurchase.js',
        './test_scripts/saucedemo/test_script/testLogin.js',
    ],
    /**This config for Selenium Server (can run on both localhost and remote machine) **/
    // host: 'localhost',
    // port: 9515,
    /********************************************************************************** */
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
    outputDir: 'all-logs',
    /**     this use for Selenium service (only run on localhost)     **/
    services: [
        ['chromedriver', {
            logFileName: 'wdio-chromedriver.log', // default
            outputDir: 'driver-logs', // overwrites the config.outputDir
            args: ['--silent']
        }]
    ],
    /***************************************************************** */
}