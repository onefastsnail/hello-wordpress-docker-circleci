describe('search', function () {
    let page;

    // as we have a browser in the global node object, for this test lets spin up a new page/tab to work with
    before(async function () {
        page = await browser.newPage();
        await page.goto('https://google.com');
    });

    // after the test close that page/tab
    after(async function () {
        await page.close();
    })

    it('should have links', async function () {

        await page.waitFor('input[name=q]');
        // Type our query into the search bar
        await page.type('input[name=q]', 'onefastsnail');

        await page.click('input[type="submit"]');

        // Wait for the results to show up
        await page.waitForSelector('h3 a');

        // Extract the results from the page
        const links = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('h3 a'));
            return anchors.map(anchor => anchor.textContent);
        });

        expect(links).to.be.an('array');

    });

});
