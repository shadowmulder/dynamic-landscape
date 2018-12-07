/*
* createLandscape creates the main grid in the right layout div based on the data from json file
* IMPORTANT NOTES:
* - The grid technically consists of ONLY ONE ROW to enable automatical wraping provided by the bootstrap lib 
* - Every column consists of further rows. The amount of these rows depends on the amount of key1-categories (in this example: providers)
*   The height of theses rows must be normalized manually to provide the table like appearance. This can be done with the normalizeHeight function.
* - The very left column with the key1-category names (= providers) is technically not a part of the main grid. 
*   It is detached to an extra column. This is done to keep it on the very left while cloning it along with the main grid wraps.
*/

function createLandscape(d) {


    landscape = d3.select("body")
        .append("div")
        .attr("class", "container-fluid")
        .attr("id", "landscape")
        .append("div")
        .attr("class", "row master");

    d3.select("body").append("div").attr("id", "overlay");

    var arrowLayer = d3.selectAll("body")
        .append("div")
        .attr("class", "svgContainer")
        .attr("id", "svgContainer")
        .append("svg")
        .attr("id", "arrowlayer")
        .attr("height", "100%")
        .attr("width", "100%")
        .style("position", "absolute");

    leftContainer = landscape
        .append("div")
        .attr("class", "col-md-auto")
        .attr("id", "leftContainer");

    var rightContainer = landscape
        .append("div")
        .attr("class", "col-sm")
        .attr("id", "elementTable")


    var grid = rightContainer
        .append("div")
        .attr("class", "row master");


    data[0].categories.forEach(d => {
        var gV = Math.random() / 10;
        var bgA = "rgb(0,0,0," + gV + ")";
        var bg = "linear-gradient(" + bgA + ", transparent)";

        var column = grid
            .append("div")
            .attr("class", "col header")
            .attr("id", "catColumn")
            .style("background-image", bg);

        catColumns.push(column);


        column
            .append("div")
            .attr("class", "row")
            .attr("id", "hHeader")
            .append("div")
            .attr("class", "textBox")
            //.style("font-size", fontSize * fontZoomFactor + "px")
            .html("<b>"+d.category+"</b>");
    });

    data.forEach(d => {

        var cc = 0;
        var id_index = 0;

        catColumns.forEach(c => {
            var cat = c
                .append("div")
                .attr("class", "row")
                .attr("id", "cCell")
                .append("div")
                .attr("class", "categories")
                .attr("id", "cContainer");


            categories.push(cat);
            d.categories[cc].members.forEach(m => {
                var service = cat.append("div")
                    .attr("class", "serviceIcon")
                    .attr("id", m.id)
                    .append("img")
                    .attr("class", "iconImg")
                    .attr("src", m.img)
                    .attr("height", imgMinSize)
                    .attr("width", imgMinSize);


                service
                    .on("mousemove", function () {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .text(m.service);

                        this.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
                        cursorOutsideIcon = false;
                    })
                    .on("mouseout", function (d, i) {
                        tooltip.style("display", "none");
                        this.style.boxShadow = "";
                        cursorOutsideIcon = true;
                    })
                    .on("click", function () {
                        currentElementId = m.id;
                        processItemClick(this);
                    });

            });
            cc++;
        });


    });

    unlockResizing();
    updateLefHandHeader();
    lockResizing();

    jsPlumb.bind("ready", function () {

    });
    jsPlumb.importDefaults({
        Endpoint: "Blank",
        Container: "svgContainer",
        Anchors: ["Top", "Bottom", "Left", "Right"],

    });

}


var windowWidth = $(window).width();



/*
* unlockResizing sets the width and height parameters of grid columns to auto 
* so they automatically adjust to the size of their content without further calculations
*/
function unlockResizing() {
    d3.selectAll("#cContainer").style("height", "auto");
    d3.selectAll("#vHeader").style("height", "auto");
    d3.selectAll("#hHeader").style("height", "auto");

    d3.selectAll("#cContainer").style("width", "auto");
    d3.selectAll("#vHeader").style("width", "auto");
    d3.selectAll("#hHeader").style("width", "auto");
}

/*
* lockResizing normalizes the height of grid elements. This is very important to keep the height
* of all rows at the same value
*/
function lockResizing() {
    normalizeHeight("#cContainer", "#cContainer", "height");
    //normalizeHeight("#cContainer", "#vHeader", "width", 2);
    normalizeHeight("#cContainer", "#vHeader", "height", 2);
    normalizeHeight("#hHeader", "#hHeader", "height");

}

function updateLefHandHeader() {
    leftHeaderPositions = distinctYPos("#catColumn");

    var c = 1;
    document.getElementById("leftContainer").innerHTML = '';
    d3.selectAll("#providerColumn").remove();
    for (i = 0; i < leftHeaderPositions; i++) {

        pos = 20;
        providerColumn = leftContainer
            .append("div")
            .attr("id", "providerColumn")
            .style("margin-top", pos + "px");

        providerColumn
            .append("div")
            .attr("id", "hHeader")
            .style("border", "0px");


        data.forEach(d => {
            var providerName = providerColumn
                .append("div")
                .attr("id", "vHeader")
                .style("font-size", fontSize * fontZoomFactor + "px")
                .datum(d)
                .append("div")
                .attr("class", "vContainer");

            providerName
                .append("div")
                .attr("class", "providerIcon")
                .append("img")
                .attr("src", d.providerIcon)
                .attr("height", catImgMinSize * zoomFactor)
                .attr("width", catImgMinSize * zoomFactor);

            providerName.append("div")
                .attr("class", "textBoxRot").text(d.provider);
        });



        c++;
    }

}

/**
* normalizeHeight finds the max height of the elements
* in the source group and applies it to all elements in the target group
* @Params:
*   sID: id of the elements in the source group
*   tID: id of the elements in the target group
*   padding: can be added as an offset to the max height h
*/
function normalizeHeight(sID, tID, hw, padding) {

    padding = padding || 0;

    var source = d3.selectAll(sID);
    var h = 0;
    source._groups[0].forEach(function (g) {
        _h = g.clientHeight;

        if (_h > h) {
            h = _h;
        }
    })

    d3.selectAll(tID).style(hw, h + padding + "px");
}

/*
* zoom changes the size of images and text in the grid larger or smaller
* and adjusts the size of the parent elements if necessary
*/
function zoom(newFactor) {
    menu.close();


    zoomFactor = newFactor;
    // keep zoom factor between zoomMin and zoomMax
    zoomFactor = Math.min(Math.max(zoomFactor, zoomMin), zoomMax);

    var zoomInB = d3.select("#zoomInButton");
    var zoomOutB = d3.select("#zoomOutButton");

    if (zoomFactor == zoomMin) {
        zoomOutB.style("background-color", "grey");
    } else if (zoomFactor == zoomMax) {
        zoomInB.style("background-color", "grey");
    } else {
        zoomInB.style("background-color", "#008688");
        zoomOutB.style("background-color", "#008688");
    }
    iconScale = imgMinSize * zoomFactor;
    unlockResizing();
    d3.selectAll(".categories").style("padding", 15 * zoomFactor + "px")
    var images = d3.selectAll(".serviceIcon").selectAll("img");


    images.attr("height", iconScale + "px");
    images.attr("width", iconScale + "px");


    var iconContainers = d3.selectAll(".serviceIcon");
    iconContainers.style("height", iconScale + "px");
    iconContainers.style("width", iconScale + "px");

    d3.selectAll(".categories").style("grid-template-rows", "repeat(4," + iconScale + "px)");
    d3.selectAll("#hHeader").style("font-size", fontSize * zoomFactor + "px");


    //d3.selectAll("#zoomIndicator").text("ZOOM: " + Math.floor(zoomFactor * 100) + "%");
    document.getElementById("zoomIndicator").value = Math.floor(zoomFactor * 100);
    updateLefHandHeader();
    lockResizing();
    jsPlumb.repaintEverything();
    adjustSVGOverlay();
    jsPlumb.repaintEverything();
    //showDependencies();
    getLandscapeHeight();
}

function zoomFont(newFactor) {

    fontZoomFactor = newFactor;
    // keep zoom factor between zoomMin and zoomMax
    //fontZoomFactor = Math.min(Math.max(fontZoomFactor, zoomMin), zoomMax);
    fontZoomFactor = Math.min(Math.max(fontZoomFactor, zoomMin), zoomMax/2);
    var zoomInB = d3.select("#zoomFInButton");
    var zoomOutB = d3.select("#zoomFOutButton");


    if (fontZoomFactor == zoomMin) {
        zoomOutB.style("background-color", "grey");
    } else if (fontZoomFactor == zoomMax/2) {
        zoomInB.style("background-color", "grey");
    } else {
        zoomInB.style("background-color", "#008688");
        zoomOutB.style("background-color", "#008688");
    }
    unlockResizing();
    d3.selectAll("#hHeader").style("font-size", fontSize * fontZoomFactor + "px");
    updateLefHandHeader();
    lockResizing();
    jsPlumb.repaintEverything();
    adjustSVGOverlay();
    jsPlumb.repaintEverything();
    //showDependencies();
    getLandscapeHeight();
    document.getElementById("zoomFIndicator").value = Math.floor(fontZoomFactor * 100);
}


/**
* resets image and text size inside the grid
*/
function zoomReset() {
    zoomFont(1);
    zoom(1);


}


function adjustContainers() {
    windowWidth = $(window).width();
    unlockResizing();
    updateLefHandHeader();
    lockResizing();
    jsPlumb.repaintEverything();
    adjustSVGOverlay();
    jsPlumb.repaintEverything();
    
    var topPadding = document.getElementById("topnav").clientHeight;
    d3.select("#landscape").style("padding-top", topPadding + "px")
    d3.select("#searchForm").style("width", windowWidth * 0.5 + "px")

}

function adjustSVGOverlay() {
    var svgContainer = document.getElementById("svgContainer");
    var parentContainer = document.getElementById("landscape");
    svgContainer.style.width = parentContainer.clientWidth + "px";
    svgContainer.style.height = parentContainer.clientHeight + "px";
}

function processItemClick(node) {

    menuNode.style("display", "inline-block");

    var x = posX(node) + iconScale / 2;
    var y = posY(node) + iconScale / 2;


    if (!((lastSelectedItemPos.x == x) && (lastSelectedItemPos.y == y))) {
        lastSelectedItemPos.x = x;
        lastSelectedItemPos.y = y;
        menu.close();

        menu.setPos(x, y);
    }

    if (menu.isOpen()) {
        menu.close();
    } else {
        menu.open();
    }

}

function menuCloseAdapter() {
    menu.close();
    setTimeout(function () { menuNode.style("display", "none"); }, 400);
}

function resetView() {
    menuCloseAdapter();
    hideDetails();
    //d3.select("#form-tags-1_tagsinput").selectAll("span").remove();
    search();
}