/**
 * @name pdf
 *
 * @desc Renders a PDF of the Puppeteer API spec. This is a pretty long page and will generate a nice, A4 size multi-page PDF.
 *
 * @see {@link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf}
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const colors = require('colors');
/*
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
*/


var outputPath = '../offline/landscape_latest.pdf';
var host = 'http://localhost:8080/';



exports.printPDF = async function () {
    console.log("Launching puppeteer...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage()

    try {
        console.log("Connecting to host "+host);
        await page.goto(host);
    } catch (err) {
        console.error("FATAL ERROR: Connection to host ".red+ host +" could not be established".red);
        browser.close();
        return false;
    }
    
    await page.setViewport({ width: 1536, height: 824, deviceScaleFactor: 1 });

    await page.emulateMedia('print');

    try {
        console.log("Calling page preparation adapter at host "+host);
        await page.evaluate(x => {
            gridscape.generatePDFHeadless();
        });
    } catch (err){
        console.error("FATAL ERROR: There is something wrong with the front-end print handler (Gridscape.prototype.generatePDFHeadless)".red);
        console.error(err)
        browser.close();
        return false;
    }

    try {
        console.log("Generating PDF...");
        await page.pdf(
            {
                path: outputPath,
    
                displayHeaderFooter: false,
                printBackground: true,
                preferCSSPageSize: true
            }
        )
    } catch (err) {
        console.error("FATAL ERROR: PDF file could not be generated.)".red);
        console.error(err)
        browser.close();
        return false;
    }

    

    await browser.close();
    console.log("PDF generated successfully.".green)
    return fs.existsSync(outputPath);

}



exports.printPDF();

