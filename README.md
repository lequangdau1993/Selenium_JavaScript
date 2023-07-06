# Selenium_JavaScript

INSTALLATION

STEP 1: Install Node.js 
- Download Node.js from the official website: https://nodejs.org/en/download
- Follow the installation instructions for your operating system.

STEP 2: Set up automation libraries and frameworks

- Iniation packet.json file
$ npm init -y

- Install WebdriverIO
$ npm install --save-dev webdriverio

- Install adapter for Mochajs Framework 
$ npm install --save-dev wdio-mocha-framework 

- Install all lib base on packet.json defined
$ npm install 

- If errors occured let try this command
$ npx wdio config -y

STEP 3: 

Use case 1: Running scripts on a Selenium Server for a remote machine or localhost
- Download the Selenium Driver compatible with your current version of Chrome for your Windows OS from: https://chromedriver.chromium.org/downloads
- Manually run the Selenium Server and note the listening port (by default, it is 9515).
  ![image](https://github.com/lequangdau1993/Selenium_JavaScript/assets/43399313/e691dd8e-b7be-4e6e-b14f-ad3142004611)

- Modify the test.config.js file to adapt to the Selenium Server configuration
  ![image](https://github.com/lequangdau1993/Selenium_JavaScript/assets/43399313/8579d064-6b23-4975-8425-17557d7abc73)


Use case 2: Running scripts with the Selenium service (does not require a Selenium server and starts automatically, only for local machine)
- Install the following packages:
$ npm install wdio-chromedriver-service --save-dev
$ npm install chromedriver --save-dev
- Modify the test.config.js file to adapt to the Selenium service configuration
![image](https://github.com/lequangdau1993/Selenium_JavaScript/assets/43399313/98cd65c0-5dc9-4921-b897-e831439a7921)

- The version current is using in this project:
- ![image](https://github.com/lequangdau1993/Selenium_JavaScript/assets/43399313/305d1320-f7ba-4c86-87ee-e599e389d718)

FRAMEWORK IN USE:

- The directory structure of the test_scripts directory as below:
- ![image](https://github.com/lequangdau1993/Selenium_JavaScript/assets/43399313/dd30d675-7f2e-44dd-baf4-543e52ec7251)

- We have two test scripts running on two features: Login and Purchase features. The steps below will help you run them easily using the Mocha framework.
- Configure the test.config.js file as shown in the screenshot:
![image](https://github.com/lequangdau1993/Selenium_JavaScript/assets/43399313/1dfeebc9-ceb2-44c8-b539-0f98c7d2bbd7)
- The "specs" array defines the paths of the features that need to be run. If you want to run only one feature, include only one path in this array.
- If you want to run two or more features simultaneously (in parallel), you can define the paths of those features and increase the "maxInstances" parameter accordingly.

RUN TEST SCRIPT
- Open your terminal or command prompt.
- Navigate to the root directory of your project where the test.conf.js file is located.
- Run the following command: $ npm test .\test.conf.js
- Observe the results after the test execution.
- The test framework will provide output indicating the status of each test case (e.g., passed, failed) and any error messages or assertions.

