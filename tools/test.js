var should = require("should")
var mut = require("../tools/createDatabase")
var pdfP = require("../tools/headlessPrint")
const chai = require('chai')
const expect = chai.expect;
const validUrl = require('valid-url');



describe("Testing the json converter", function () {

  it("create new database files", function (done) {
    
    expect(mut.convert()).to.be.true;
    done();
  })

  it("should produce valid database entries.", function (done) {


    mut.list_for_test.forEach(entry => {
      expect(entry).to.have.property('id')
      expect(entry).to.have.property('itemNode')
      expect(entry).to.have.property('categoryOne')
      expect(entry).to.have.property('categoryTwo')
      expect(entry).to.have.property('categoryOneIcon')
      expect(entry).to.have.property('description')
      expect(entry).to.have.property('img')
      expect(entry).to.have.property('connections')
      expect(entry).to.have.property('keywords')
      expect(entry).to.have.property('metadata')

      expect(entry.metadata).to.be.an('array')
      expect(entry.keywords).to.be.an('array')

      if (typeof entry.webLink !== 'undefined') {

        var isValidURL = false;
        if (validUrl.isUri(entry.webLink)) {
          isValidURL = true;
        }

        expect(isValidURL).to.be.true;
      }



      expect(entry.itemNode).to.not.equal("");
      expect(entry.categoryOne).to.not.equal("");
      expect(entry.categoryTwo).to.not.equal("");
    })
    done();
  })
})

describe("Testing headless chrome printer", function () {

  it("should create a new PDF file", async function () {
    this.timeout(5000);
    //setTimeout(done, 3000);
      var res = await pdfP.printPDF();
      expect(res).to.be.true;

    
  })
})


