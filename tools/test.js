var should = require("should")
var module = require("./createNestedJSON")
const fs = require('fs');
const _ = require('lodash');

describe("error testing", function () {
  it("should throw an error", function (done) {



    var configDataFileName = 'config.json';

    var dataBaseFileName = "../database/data.json";
    var dictionaryFileName = 'blacklist_dictionary.json';

    var searchIndexFileName = '../database/search_index.json';
    var autocompleteFileName = '../database/autocomplete_index.json';

    var landscapeDataFileName = '../database/structure.json';


    var config = JSON.parse(fs.readFileSync(configDataFileName));
    console.log("Reading database file " + dataBaseFileName + "...")
    var data = JSON.parse(fs.readFileSync(dataBaseFileName));
    console.log("Succsess: " + data.length + " objects loaded.")
    console.log("Reading dictionary file " + dictionaryFileName + "...")
    var dictionary = JSON.parse(fs.readFileSync(dictionaryFileName)).small;
    console.log("Succsess: " + dictionary.length + " words in dictionary.")


    var keyOne = config.keyOne;
    var keyTwo = config.keyTwo;
    var keyOneIcon = config.keyOneIcon;
    var itemNodeKey = config.itemNodeKey;
    var categoryOneClass = unique(data, keyOne);
    var categoryTwoClass = uniqueFlat(data, keyTwo);

    var searchList = [];
    var idMap = [[]];
    var uData = [];
    var allKeyWordsSet = new Set();
    var allKeyWordsList;

    module.should.throw();
    done();
  })
})