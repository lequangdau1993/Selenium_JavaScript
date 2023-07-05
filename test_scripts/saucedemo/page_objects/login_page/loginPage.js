let PageBase = require('../pageBase.js');
let ProductPage = require('../product_page/productPage.js');
let LoginLocator = require('./locator.js');

class LoginPage extends PageBase{
    async inputUsername(username){
        await $(LoginLocator.usernameElement).setValue(username);
        return this;
    }

    async inputPassword(password){
        await $(LoginLocator.passwordElement).setValue(password);
        return this;
    }

    async clickOnLoginBtn(){
        // Explicit wait
        await $(LoginLocator.loginElement).waitForClickable({ timeout: 3000 })
        await $(LoginLocator.loginElement).click();
        return ProductPage;
    }

    async getErrorMgs(){
        await $(LoginLocator.errorMgsElement).waitForDisplayed({ timeout: 3000 });
        return await $(LoginLocator.errorMgsElement).getText();
    }
}
module.exports = new LoginPage();