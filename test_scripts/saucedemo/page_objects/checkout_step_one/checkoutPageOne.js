let locatorCartPage = require('./locator.js');
let checkoutPageTwo = require('./checkout_step_two/checkoutPageTwo.js');

class CheckoutPageOne{
    async inputInfoCheckout(firstname, lastname, postalcode) {
        await $(locatorCartPage.firstNameInputElement).setValue(firstname);     
        await $(locatorCartPage.lastNameInputElement).setValue(lastname);     
        await $(locatorCartPage.postalCodeInputElement).setValue(postalcode);
        return this;     
    }

    async clickContinue(){
        await $(locatorCartPage.continueBtnElement).waitForClickable({ timeout: 3000 });
        await $(locatorCartPage.continueBtnElement).click();
        return checkoutPageTwo;
    }
}
module.exports = new CheckoutPageOne();