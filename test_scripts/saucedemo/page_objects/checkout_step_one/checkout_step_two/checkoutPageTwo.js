let locatorCheckoutPageTwo = require('./locator.js');
let checkoutPageComplete = require('./checkout_complete/checkoutPageComplete.js');
class CheckoutPageTwo{
    async confirmCheckout(){
        await $(locatorCheckoutPageTwo.finishBtnElement).waitForClickable({ timeout: 3000 })
        await $(locatorCheckoutPageTwo.finishBtnElement).click();
        return checkoutPageComplete;
    }

    async getNameProduct(){
        return await $(locatorCheckoutPageTwo.nameProductElement).getText();
    }

    async getDescProduct(){
        return await $(locatorCheckoutPageTwo.descriptionElement).getText();
    }

    async getPriceProduct(){
        return await $(locatorCheckoutPageTwo.priceProductElement).getText();
    }

    async getPriceTotalNoTax(){
        return await $(locatorCheckoutPageTwo.priceTotalNoTaxElement).getText();
    }

    async getPriceTax(){
        return await $(locatorCheckoutPageTwo.priceTaxElement).getText();
    }

    async getPriceTotalWithTax(){
        return await $(locatorCheckoutPageTwo.priceTotalWithTaxElement).getText();
    }


}
module.exports = new CheckoutPageTwo();