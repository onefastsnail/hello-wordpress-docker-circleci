describe('search', function () {
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

    it('should have results', async function () {

        await page.waitFor('input[name=s]');
        // Type our query into the search bar
        await page.type('input[name=s]', 's');

        await page.click('input[type="submit"]');

        // Wait for the results to show up
        await page.waitForSelector('.c-item');

        // Extract the results from the page
        const items = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.c-item'));
        });

        console.log(`${items.length} items found`);

        expect(items).to.be.an('array');

    });

});
