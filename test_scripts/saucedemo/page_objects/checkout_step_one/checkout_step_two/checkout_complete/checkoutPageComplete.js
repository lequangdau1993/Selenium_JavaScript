let locatorCheckoutPageComplete = require('./locator.js');
class CheckoutPageComplete{
    async getHeaderTextOrder(){
        return await $(locatorCheckoutPageComplete.headerTextOrder).getText();
    }

    async getTextOrder(){
        return await $(locatorCheckoutPageComplete.textOrder).getText();
    }
}
module.exports = new CheckoutPageComplete();