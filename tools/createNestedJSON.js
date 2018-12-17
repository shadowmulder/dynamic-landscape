'use strict';

const fs = require('fs');
const _ = require('lodash');

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


_.each(data, function (d, i) {
    var ids = [];
    _.each(d[keyTwo], function (c, j) {
        var id_prefix = (d[itemNodeKey]).trim();
        id_prefix = id_prefix.substring(0, Math.min(3, id_prefix.length));
        var id = id_prefix + "_" + i + "_" + j;
        id = id.replace(" ","");

        ids.push(id);
       


        var newEntry = {
            id:id,
            categoryOne:(d[keyOne]).trim(),
            categoryOneIcon: d[keyOneIcon],
            categoryTwo:d[keyTwo][j],
            itemNode:(d[itemNodeKey]).trim(),
            webLink:d.webLink,
            img:d.img,
            description:(d.description).trim(),
            keywords:d.keywords,
            metadata: d.metadata,
            connections:d.connections
        }

        uData.push(newEntry);

        
    });
    idMap[d[itemNodeKey]] = ids;
});



_.each(uData, function (d, i) {


    /**
     * BEGIN: search index
     */

    var keyWordList = d.keywords;
    var keyWordscategoryTwo = d.categoryTwo.split(" ");
    var keyWordsitemNode = d.itemNode.split(" ");
    var keyWordscategoryOne = d.categoryOne.split(" ");
    var keyWordsMetaData = [];

    _.each(d.metadata, function(md,i){
        if (md.type == "tag") {
            _.each(md.content, function(entry,i){

                keyWordsMetaData = keyWordsMetaData.concat(keyWordsMetaData, entry.text.split(" "));

            })

        } else if (md.type == "text") {
            keyWordsMetaData = keyWordsMetaData.concat(keyWordsMetaData, md.content.split(" "));
        }
    })


    // remove punctuation from description string
    var keyWordsDescription = d.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
    var keyWordsDescriptionFiltered = keyWordsDescription.filter(function (item) {
        return !dictionary.includes(item);
    })

    keyWordList = [...(new Set(keyWordList.concat(keyWordscategoryOne, keyWordscategoryTwo, keyWordsitemNode, keyWordsDescriptionFiltered, keyWordsMetaData)))];

    _.each(keyWordList, function (w, i) {
        //console.log(keyWordList[i]);
        keyWordList[i] = w.toLowerCase();
    });

    /**
     * END: search index generation
     */

    /**
     * BEGIN: dependency list refactoring
     */

    var connections = {
        in:[],
        out:[]
    }

    _.each(d.connections.in, function (con) {
        var name = idMap[con.dname] || "";
        if (name == "") {
            console.error("\n>>> No object found for \""+con.dname+"\"\n");
        } else {
            var validConnection = {
                dname: name,
                dtype: con.dtype
            }
            connections.in.push(validConnection);
        }
    })

    _.each(d.connections.out, function (con) {
        var name = idMap[con.dname] || "";
        if (name == "") {
            console.error("\n>>> No object found for \""+con.dname+"\"\n");
        } else {
            var validConnection = {
                dname: name,
                dtype: con.dtype
            }
            connections.out.push(validConnection);
        }
    })


    /**
     * END: dependency list refactoring
     */

    var sEl =
    {
        id: d.id,
        itemNode: d.itemNode,
        webLink: d.webLink,
        categoryOne: d.categoryOne,
        categoryTwo: d.categoryTwo,
        categoryOneIcon: d.categoryOneIcon,
        description: d.description,
        img: d.img,
        connections: connections,
        keywords: keyWordList,
        metadata: d.metadata
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

var landscape = _.map(categoryOneClass, function (u) {
    var categoryOneIcon =_.find(uData, {'categoryOne': u}).categoryOneIcon;
    
    var categories = [];
    _.each(categoryTwoClass, function (v, i) {
        categories.push(getRecords(u, v));
    })
    return {
        categoryOne: u,
        categoryOneIcon: categoryOneIcon,
        categories: categories
    }
}
);


require('fs').writeFileSync(landscapeDataFileName, JSON.stringify(landscape, null, 2));
console.log("Landscape data created: " + landscapeDataFileName);

function getRecords(key1, key2) {
    var records = (_.filter(uData, function (item) {
        return (item.categoryOne == key1) && ((item.categoryTwo == key2));
    }));
    var reduced_records = [];
    _.each(records, function (record) {
        var small_record = {
            id: record.id,
            itemNode: record.itemNode,
            img: record.img,
            
        }
        reduced_records.push(small_record);
    });
    return {
        categoryTwo: key2,
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
