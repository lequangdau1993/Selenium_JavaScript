let loginPage = require('../page_objects/login_page/loginPage.js');
let loginData = require('../test_data/login/accountLogin.json');
let msgErrLogin = require('../test_data/login/msgLogin.json');
let expectCommonPage = require('../test_data/common_page/textCommonPage.json');
let checkList = require('chai').expect;
describe('Test Login Feature', function(){
    let pageUrl = 'https://www.saucedemo.com/';

    beforeEach('Open new browser', function(){
        loginPage.openPage(pageUrl);
    });

    afterEach('Reload session browser', async function(){
        await browser.reloadSession();
    });

    it('Login page should login with correct user/password successfully', async function(){
        await loginPage.inputUsername(loginData.accountLoginCorrect.username);
        await loginPage.inputPassword(loginData.accountLoginCorrect.password);
        let productPage = await loginPage.clickOnLoginBtn();
        //check title page
        await productPage.verifyHeaderText(expectCommonPage.productPage.headerText);
    });

    it('Login page should Not login with incorrect both user/password', async function(){
        await loginPage.inputUsername(loginData.accountLoginInCorrect.username);
        await loginPage.inputPassword(loginData.accountLoginInCorrect.password);
        await loginPage.clickOnLoginBtn();
        let actualErrorMgs = await loginPage.getErrorMgs();
        let expectErrorMgs = msgErrLogin.alertUsernamePasswordIncorrect;
        //Check error mgs
        checkList(actualErrorMgs).to.equal(expectErrorMgs,
            "ERR: Actual error message {"+actualErrorMgs+"} should be {"+expectErrorMgs+"}");
    });   
    
    
    it('Login page should Not login when user is in blocked list', async function(){
        await loginPage.inputUsername(loginData.accountLoginBlocked.username);
        await loginPage.inputPassword(loginData.accountLoginBlocked.password);
        await loginPage.clickOnLoginBtn();
        let actualErrorMgs = await loginPage.getErrorMgs();
        let expectErrorMgs = msgErrLogin.alertUsernamePasswordBlocked;
        //Check error mgs
        checkList(actualErrorMgs).to.equal(expectErrorMgs,
            "ERR: Actual error message {"+actualErrorMgs+"} should be {"+expectErrorMgs+"}");
    }); 
})