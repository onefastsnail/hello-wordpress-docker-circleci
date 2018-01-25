describe('blog items', function () {
    let page;

    // as we have a browser in the global node object, for this test lets spin up a new page/tab to work with
    before(async function () {
        page = await browser.newPage();
        await page.goto(appUrl);
    });

    // after the test close that page/tab
    after(async function () {
        await page.close();
    })

    it('should have paragraphs', async function () {

        // Extract the results from the page
        const paragraphs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('p'));
        });

        console.log(`${paragraphs.length} blog items found`);
        expect(paragraphs).to.be.an('array');

    });

});
