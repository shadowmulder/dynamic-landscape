/**
 * @name pdf
 *
 * @desc Renders a PDF of the Puppeteer API spec. This is a pretty long page and will generate a nice, A4 size multi-page PDF.
 *
 * @see {@link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf}
 */

const puppeteer = require('puppeteer');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = mm + '/' + dd + '/' + yyyy;
var ouputPath =  '../offline/landscape_'+today+'.pdf';
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()

    await page.goto('http://localhost:8080/');
    await page.setViewport({ width: 1536, height: 824, deviceScaleFactor: 1 });

    await page.emulateMedia('print');
    await page.evaluate(x => {
        generatePDFHeadless();
    });
    await page.pdf(
        {
            path:ouputPath,

            displayHeaderFooter: false,
            printBackground: true,
            preferCSSPageSize: true
        }
    )
    await page.on('console', (msg) => { })
    await browser.close()
})()