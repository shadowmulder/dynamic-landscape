/**
 * @name pdf
 *
 * @desc Renders a PDF of the Puppeteer API spec. This is a pretty long page and will generate a nice, A4 size multi-page PDF.
 *
 * @see {@link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf}
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
/*
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
*/


var outputPath = '../offline/landscape_latest.pdf';

exports.removeOldFile = function(){
    fs.unlink(outputPath, (err) => {
        if (err) throw err;
    });
    return fs.existsSync(outputPath);
}


exports.printPDF = async function () {

    const browser = await puppeteer.launch();
    const page = await browser.newPage()


    await page.goto('http://localhost:8080/');
    await page.setViewport({ width: 1536, height: 824, deviceScaleFactor: 1 });

    await page.emulateMedia('print');
    await page.evaluate(x => {
        gridscape.generatePDFHeadless();
    });

    await page.pdf(
        {
            path: outputPath,

            displayHeaderFooter: false,
            printBackground: true,
            preferCSSPageSize: true
        }
    )
    await page.on('console', (msg) => { })
    await browser.close();

    return fs.existsSync(outputPath);

}


//exports.removeOldFile();
exports.printPDF();

