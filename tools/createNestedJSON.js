'use strict';

const fs = require('fs');
const _ = require('lodash');

var dataBaseFileName = "../database/cloud_services_flat_mc.json";
var dictionaryFileName = '../database/dict.json';

var searchIndexFileName = '../database/search_index.json';
var autocompleteFileName = '../database/autocomplete_index.json';

var landscapeDataFileName = '../database/cloud_services_nested_mc.json';



console.log("Reading database file " + dataBaseFileName + "...")
var data = JSON.parse(fs.readFileSync(dataBaseFileName));
console.log("Succsess: " + data.length + " objects loaded.")
console.log("Reading dictionary file " + dictionaryFileName + "...")
var dictionary = JSON.parse(fs.readFileSync(dictionaryFileName)).small;
console.log("Succsess: " + dictionary.length + " words in dictionary.")


var keyOne = 'provider';
var keyTwo = 'category';
var categoryClassOne = unique(data, keyOne);
var categoryClassTwo = uniqueFlat(data, keyTwo);

var searchList = [];
var idMap = [[]];
var uData = [];
var allKeyWordsSet = new Set();
var allKeyWordsList;


_.each(data, function (d, i) {
    var ids = [];
    _.each(d.category, function (c, j) {
        var id_prefix = d.service;
        id_prefix = id_prefix.substring(0, Math.min(3, id_prefix.length));
        var id = id_prefix + "_" + i + "_" + j;
        //_.assign(nd, { "id": id });
        ids.push(id);
       

        var newEntry = {
            id:id,
            provider:d.provider,
            providerIcon: d.providerIcon,
            category:d.category[j],
            service:d.service,
            img:d.img,
            description:d.description,
            keywords:d.keywords,
            dependencies:d.dependencies
        }

        uData.push(newEntry);
        
    });
    idMap[d.service] = ids;
});



_.each(uData, function (d, i) {


    /**
     * BEGIN: search index
     */

    var keyWordList = d.keywords;
    var keyWordsCategory = d.category.split(" ");
    var keyWordsService = d.service.split(" ");
    var keyWordsProvider = d.provider.split(" ");


    // remove punctuation from description string
    var keyWordsDescription = d.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
    var keyWordsDescriptionFiltered = keyWordsDescription.filter(function (item) {
        return !dictionary.includes(item);
    })

    keyWordList = [...(new Set(keyWordList.concat(keyWordsProvider, keyWordsCategory, keyWordsService, keyWordsDescriptionFiltered)))];

    _.each(keyWordList, function (w, i) {
        keyWordList[i] = w.toLowerCase();
    });

    /**
     * END: search index generation
     */

    /**
     * BEGIN: dependency list refactoring
     */

    _.each(d.dependencies.in, function (dep) {
        dep.dname = idMap[dep.dname] || "";
    })

    _.each(d.dependencies.out, function (dep) {
        dep.dname = idMap[dep.dname] || "";
    })

    /**
     * END: dependency list refactoring
     */

    var sEl =
    {
        id: d.id,
        service: d.service,
        provider: d.provider,
        category: d.category,
        providerIcon: d.providerIcon,
        description: d.description,
        img: d.img,
        dependencies: d.dependencies,
        keywords: keyWordList
    };

    _.each(keyWordList,function(w){
        allKeyWordsSet.add(w);
    })
    allKeyWordsList = [...allKeyWordsSet];
    searchList.push(sEl);

})




require('fs').writeFileSync(searchIndexFileName, JSON.stringify(searchList, null, 2));
require('fs').writeFileSync(autocompleteFileName, JSON.stringify(allKeyWordsList, null, 2));
console.log("Search index file created: " + searchIndexFileName);

var landscape = _.map(categoryClassOne, function (u) {
    var providerIcon =_.find(uData, {'provider': u}).providerIcon;
    
    var categories = [];
    _.each(categoryClassTwo, function (v, i) {
        categories.push(getRecords(u, v));
    })
    return {
        provider: u,
        providerIcon: providerIcon,
        categories: categories
    }
}
);


require('fs').writeFileSync(landscapeDataFileName, JSON.stringify(landscape, null, 2));
console.log("Landscape data created: " + landscapeDataFileName);

function getRecords(key1, key2) {
    var records = (_.filter(uData, function (item) {
        return (item[keyOne] == key1) && ((item[keyTwo] == key2));
    }));
    var reduced_records = [];
    _.each(records, function (record) {
        var small_record = {
            id: record.id,
            service: record.service,
            img: record.img,
            
        }
        reduced_records.push(small_record);
    });
    return {
        category: key2,
        members: reduced_records
    }
}


function unique(arr, key) {

    var m = _.map(arr, key);
    return _.uniq(m.sort());
}

function uniqueFlat(arr, key) {
    var c = [];
    _.each(arr, function (v, i) {
        var catArr = v[key];
        _.each(catArr, function (w, j) {
            c.push(w);
        })
    })

    return _.uniq(c.sort());
}
