let productPageLocator = require('./locator.js');
let cartPage = require('../cart_page/cartPage.js');
let expect = require('chai').expect;
class ProductPage{

    async verifyHeaderText(expectHeaderText){
        let actualHeaderText = await $(productPageLocator.headerElement).getText();        
        expect(actualHeaderText).to.equal(expectHeaderText, 
            "ERR: Actual Title {"+actualHeaderText+"} should be equal expectHeaderText {"+expectHeaderText+"}");
    }

    async addToCart(locator_btn){
        await $(locator_btn).waitForClickable({ timeout: 3000 });
        await $(locator_btn).click();
    }

    async addProductToCart(index){
        let add_btn = await $$(productPageLocator.addToCartElement)[index];
        await add_btn.waitForClickable({ timeout: 3000 });
        await add_btn.click();
    }

    async getProductName(index){
        return await $$(productPageLocator.productNameElement)[index].getText();
    }

    async getProductPrice(index){
        return await $$(productPageLocator.productPriceElement)[index].getText();
    }

    async getProductDescription(index){
        return await $$(productPageLocator.productDescriptionElement)[index].getText();
    }

    async getProductList(){
        return await $$(productPageLocator.productListElement);
    }

    async navigateToCart(){
        await $(productPageLocator.navigateCartElement).waitForClickable({ timeout: 3000 });
        await $(productPageLocator.navigateCartElement).click();
        return cartPage;
    }
}
module.exports = new ProductPage();