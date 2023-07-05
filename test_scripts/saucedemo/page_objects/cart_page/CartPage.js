let cartPageLocator = require('./Locator.js');
let checkoutPageOne = require('../checkout_step_one/checkoutPageOne.js');
let checkList = require('chai').expect;
class CartPage{

    async checkoutProduct(){
        await $(cartPageLocator.checkoutElement).waitForClickable({ timeout: 3000 });
        await $(cartPageLocator.checkoutElement).click();
        return checkoutPageOne;
    }

    async checkHeaderText(expectHeaderText){
        let actualHeaderText = await $(cartPageLocator.headerTextElement).getText();
        checkList(actualHeaderText).to.equal(expectHeaderText, 
            "ERR: actualHeaderText{"+actualHeaderText+"} should be {"+expectHeaderText+"}");
    }

    async getProductName(){
        return await $(cartPageLocator.productNameElement).getText();
    }

    async getProductPrice(){
        return await $(cartPageLocator.productPriceElement).getText();
    }
    
    async getProductDescription(){
        return await $(cartPageLocator.productDescriptionElement).getText();
    }
}
module.exports = new CartPage();