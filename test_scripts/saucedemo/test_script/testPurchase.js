let loginPage = require('../page_objects/login_page/loginPage.js');
let expectCommonPage = require('../test_data/common_page/textCommonPage.json');
let infoCheckout = require('../test_data/login/accountLogin.json');
let loginData = require('../test_data/login/accountLogin.json');
let checkList = require('chai').expect;
describe('Test Purchase Feature', function(){
    let pageUrl = 'https://www.saucedemo.com/';

    beforeEach('Open new browser', function(){
        loginPage.openPage(pageUrl);
    });

    afterEach('Reload session browser', async function(){
        await browser.reloadSession();
    });

    it('Validate product can purchase successfully', async function(){
        await loginPage.inputUsername(loginData.accountLoginCorrect.username);
        await loginPage.inputPassword(loginData.accountLoginCorrect.password);
        let productPage = await loginPage.clickOnLoginBtn();
        //Verify title page
        await productPage.verifyHeaderText(expectCommonPage.productPage.headerText);
        let productList = await productPage.getProductList();
        // Pick one product randomly
        let productIndex = Math.floor(Math.random()*productList.length);
        
        await productPage.addProductToCart(productIndex);
        // Navigate to Cart page
        let cartPage = await productPage.navigateToCart();
        
        // Checkout and fill info
        let checkoutPageOne = await cartPage.checkoutProduct();
        await checkoutPageOne.inputInfoCheckout(
            infoCheckout.infoUserCheckout.firstName, 
            infoCheckout.infoUserCheckout.lastName,
            infoCheckout.infoUserCheckout.postalCoce);
        let checkoutPageTwo = await checkoutPageOne.clickContinue();
        
        // Confirm for oder
        let checkoutPageComplete = await checkoutPageTwo.confirmCheckout();
        
        // get order message
        let actualHeaderTextOrder = await checkoutPageComplete.getHeaderTextOrder();
        let actualTextOrder = await checkoutPageComplete.getTextOrder();
        
        // Verify order message
        checkList(actualHeaderTextOrder).to.equal(expectCommonPage.orderPage.headerTextOrder,
            'ERR: actualHeaderOrder{'+actualHeaderTextOrder+'} should be {'+expectCommonPage.orderPage.headerTextOrder+'}');
        checkList(actualTextOrder).to.equal(expectCommonPage.orderPage.textOrder,
            'ERR: actualTextOrder{'+actualTextOrder+'} should be {'+expectCommonPage.orderPage.textOrder+'}');

    });

            
    it('Validate infomation of product in cart page', async function(){
        await loginPage.inputUsername(loginData.accountLoginCorrect.username);
        await loginPage.inputPassword(loginData.accountLoginCorrect.password);
        let productPage = await loginPage.clickOnLoginBtn();
        //check title pageexpectCommonPage.productPage.headerText
        await productPage.verifyHeaderText(expectCommonPage.productPage.headerText);

        // Get all product
        let productList = await productPage.getProductList();

        // Pick one product randomly
        let productIndex = Math.floor(Math.random()*productList.length);
        
        await productPage.addProductToCart(productIndex);

        // Get product name
        let nameProductAtProductPage = await productPage.getProductName(productIndex);
        let priceProductAtProductPage = await productPage.getProductPrice(productIndex);
        let descriptionProductAtProductPage = await productPage.getProductDescription(productIndex);

        // Navigate to Cart page
        let cartPage = await productPage.navigateToCart();

        // Validate title Cart page
        await cartPage.checkHeaderText(expectCommonPage.cartPage.headerTextCart);

        // Validate name product in cartPage        
        let nameProductAtCartPage =  await cartPage.getProductName();
        checkList(nameProductAtCartPage).to.equal(nameProductAtProductPage, 
            "ERR: nameProductAtCartPage{"+nameProductAtCartPage+"} should be {"+nameProductAtProductPage+"}");

        // Validate price product
        let priceProductAtCartPage =  await cartPage.getProductPrice();
        checkList(priceProductAtCartPage).to.equal(priceProductAtProductPage, 
            "ERR: priceProductAtCartPage{"+priceProductAtCartPage+"} should be {"+priceProductAtProductPage+"}");

        // Validate description of product
        let descriptionProductAtCartPage =  await cartPage.getProductDescription();
        checkList(descriptionProductAtCartPage).to.equal(descriptionProductAtProductPage, 
            "ERR: descriptionProductAtCartPage{"+descriptionProductAtCartPage+"} should be {"+descriptionProductAtProductPage+"}");
        
    });


    it('Validate price in 8% tax included of single product in checkout page', async function(){
        await loginPage.inputUsername(loginData.accountLoginCorrect.username);
        await loginPage.inputPassword(loginData.accountLoginCorrect.password);
        let productPage = await loginPage.clickOnLoginBtn();
        //check title pageexpectCommonPage.productPage.headerText
        await productPage.verifyHeaderText(expectCommonPage.productPage.headerText);

        // Get all product
        let productList = await productPage.getProductList();

        // Pick one product randomly
        let productIndex = Math.floor(Math.random()*productList.length);
        
        await productPage.addProductToCart(productIndex);
        

        let tax = 0.08; //tax 8% given
        let numberDigit = 2; // round the number of digit
        let regexPattern = /^\D+/g; // pattern regex use for convert price from string to float

        // convertPrice

        let expectNameProduct = await productPage.getProductName(productIndex);
        let expectDescriptionProduct = await productPage.getProductDescription(productIndex);
        let expectPriceProduct = _convertPrice(await productPage.getProductPrice(productIndex), regexPattern, numberDigit);
        let expectPriceTax = _convertPrice(expectPriceProduct*tax, regexPattern, numberDigit);
        let expectedTotalPriceWithTax = _convertPrice(expectPriceProduct + expectPriceTax, regexPattern, numberDigit);

        // Navigate to Cart page
        let cartPage = await productPage.navigateToCart();
                
        // Checkout and fill info
        let checkoutPageOne = await cartPage.checkoutProduct();
        await checkoutPageOne.inputInfoCheckout(
            infoCheckout.infoUserCheckout.firstName, 
            infoCheckout.infoUserCheckout.lastName,
            infoCheckout.infoUserCheckout.postalCoce);
        let checkoutPageTwo = await checkoutPageOne.clickContinue();

        //Get data price on checkout page
        let actualNameProduct = await checkoutPageTwo.getNameProduct();
        let actualDescProduct = await checkoutPageTwo.getDescProduct();

        let actualPriceSingleProduct = _convertPrice(await checkoutPageTwo.getPriceProduct(), regexPattern, numberDigit);
        let actualPriceTotalNoTax = _convertPrice(await checkoutPageTwo.getPriceTotalNoTax(), regexPattern, numberDigit);     
        let actualPriceTax = _convertPrice(await checkoutPageTwo.getPriceTax(), regexPattern, numberDigit);       
        let actualPriceTotalWithTax = _convertPrice(await checkoutPageTwo.getPriceTotalWithTax(), regexPattern, numberDigit);

        // Validate name product        
        checkList(actualNameProduct).to.equal(expectNameProduct, 
            "ERR: actualNameProduct{"+actualNameProduct+"} should be {"+expectNameProduct+"}");

        // Validate description product
        checkList(actualDescProduct).to.equal(expectDescriptionProduct, 
            "ERR: actualDescProduct{"+actualDescProduct+"} should be {"+expectDescriptionProduct+"}");
        
        // Validate price product
        checkList(actualPriceSingleProduct).to.equal(expectPriceProduct, 
            "ERR: actualPriceSingleProduct{"+actualPriceSingleProduct+"} should be {"+expectPriceProduct+"}");

        // Validate price tax
        checkList(actualPriceTax).to.equal(expectPriceTax, 
            "ERR: actualPriceTax{"+actualPriceTax+"} should be {"+expectPriceTax+"}");

        // Validate total price witout tax
        checkList(actualPriceTotalNoTax).to.equal(expectPriceProduct, 
            "ERR: actualPriceTotalNoTax{"+actualPriceTotalNoTax+"} should be {"+expectPriceProduct+"}");

        // Validate total price with tax
        checkList(actualPriceTotalWithTax).to.equal(expectedTotalPriceWithTax, 
            "ERR: actualPriceTotalWithTax{"+actualPriceTotalWithTax+"} should be {"+expectedTotalPriceWithTax+"}");
    });


    function _convertPrice(inputPrice, regexPattern, numberDigit){
        
        /*************************************************************************
         * USEAGE: Convert price
         * Input: price = "$9.99" or "Item total: $9.98888" or Tax: $9.99
         * Output: price = 9.99
         ************************************************************************/

        if(typeof(inputPrice)=='string'){
            return parseFloat(parseFloat(inputPrice.replace(regexPattern, '')).toFixed(numberDigit));
        }
        else{
            return parseFloat(inputPrice.toFixed(numberDigit));
        }    
    };

})