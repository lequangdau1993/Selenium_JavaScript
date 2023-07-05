class PageBase{
    async openPage(url){
        await browser.url(url);
        return this;
    }
}
module.exports = PageBase;