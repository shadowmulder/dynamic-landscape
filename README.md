# Dynamic Landscape
[![Build Status](https://travis-ci.com/MaibornWolff/dynamic-landscape.svg?branch=master)](https://travis-ci.com/MaibornWolff/dynamic-landscape)
> Dynamic Landscape by [MaibornWolff](https://www.maibornwolff.de/)

## Jump to Section
 - [What is Dynamic Landscape](#What-is-Dynamic-Landscape)
 - [Getting started](#Getting-started)
 - [Using your own data](#Using-your-own-data)
 - [Further dependencies](#Further-dependencies)
 - [Used libraries](#Used-libraries)

## What is Dynamic Landscape
Dynamic Landscape is a web-based visualization tool. It was initially designed to visualize the set of cloud services 
provided by Microsoft (Azure), Amazon (AWS) and Google (GCP). This project includes the respective database for 
demonstration purposes. Our Dynamic Landscape tool also provides a basic search functionality for the items in your 
database as well as the possibility to show connections between items. In the context of cloud services these 
connections represent service dependencies for different scenarios. 


## Getting started

### Installation
In order to run the tool with the database provided by us you only need a http server of your choice. Using Node.js this 
would look like this:

- Download or clone the repo
- Install third party dependencies `yarn` 
- run server in projects root dir `yarn http-server`

### Functionality overview
At the top of the page you will find the search input. The search runs using the logical “AND” so an item has to match 
all of the entered keywords. In order to zoom the contents of the page use the zoom buttons to the left of the search 
bar. You can either zoom everything (left toolbox) or only the text (right toolbox). Press the button between the two 
toolboxes to reset the zoom.

![Dynamic Landscape](https://github.com/MaibornWolff/dynamic-landscape/blob/master/screenshots/screenshot_1.png)

If you click on any of the icons the page will show the outputs and inputs of this service. Currently this functionality 
can only be observed for AWS Lambda and Elastic Beanstalk. Additionally, an icon with a document will pop up. By 
clicking on it you will open a detailed view of the selected service.

![Dynamic Landscape Dependencies](https://github.com/MaibornWolff/dynamic-landscape/blob/master/screenshots/screenshot_2.png)


![Dynamic Landscape Details](https://github.com/MaibornWolff/dynamic-landscape/blob/master/screenshots/screenshot_3.png)


## Using your own data
In order to you use your own data each entry in your database must be assignable to exactly two categories. In the 
provided example these are the cloud service providers (e.g. Amazon) and the actual cloud service category (e.g. 
“Storage”). Every entry must match the following JSON format:

    {
        "categoryA": "Name for the first category (y-axis)",
        "categoryAIcon": "./img/CategoryALogo.svg",
        "categoryB": [
            "Name for the second category (x-axis)"
        ],
        "item": "Name of the item",
        "webLink": "https://maibornwolff.de",
        "img": ".\\img\\logos\\ItemLogo.svg",
        "description": "Item description goes here",
        "keywords": [],
        "metadata": [],
        "connections": {
            "in": [],
            "out": []
        }
    }

Or taking an actual example from our database:

    {
        "provider": "Amazon",
        "providerIcon": "./img/logos/AWS/General/AWS_Simple_Icons_AWS_Cloud.svg",
        "category": [
            "Analytics"
        ],
        "service": "Amazon Athena",
        "webLink": "https://aws.amazon.com/athena/?nc2=h_mo",
        "img": ".\\img\\logos\\AWS\\Analytics\\Analytics_AmazonAthena.svg",
        "description": "Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.",
        "keywords": [],
        "metadata": [],
        "connections": {
            "in": [],
            "out": []
        }
    }

Please use the **data.json** as an example. You also have to set the name for the keys in the **config.json** in order 
to run the **convertDatabase.js** properly. Name your database file **"data.json"** and place it in the database dir. 
The database converter is located in the tools dir. In order to run it, you need to install **lodash** module inside 
this dir:

`npm i lodash`

Then you can run `node createDatabase.js`

## Further dependencies
_All of these go into the tools dir._

 - backend PDF generator (**headlessPrint.js**) requiers **puppeteer** module: `npm i puppeteer`
 - we use **colors** to provide better readability for console messages: `npm i colors`


## Used libraries
- D3 (v.4): <https://github.com/d3/d3>
- jsPlumb Community Edition: <https://jsplumbtoolkit.com/>
- blooming-menu: <https://github.com/caiogondim/blooming-menu.js>
- jQuery: <https://jquery.com/>
- jQuery UI: <https://jqueryui.com/>
- jQuery Tags Input Plugin (revisited): <https://github.com/underovsky/jquery-tagsinput-revisited>


