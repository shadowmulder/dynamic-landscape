
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
    normalizeHeight("#cContainer", "#cContainer");
    normalizeHeight("#cContainer", "#vHeader", 2);
    normalizeHeight("#hHeader", "#hHeader");
}

function updateLefHandHeader() {
    leftHeaderPositions = distinctYPos("#catColumn");
    var c = 1;
    document.getElementById("leftContainer").innerHTML = '';
    d3.selectAll("#providerColumn").remove();
    leftHeaderPositions.forEach(p => {
        var pos = (p - 1) / c;
        pos = 10;
        providerColumn = leftContainer
            .append("div")
            .attr("class", "col header")
            .attr("id", "providerColumn")
            .style("margin-top", pos + "px");


        providerColumn
            .append("div")
            .attr("class", "row")
            .attr("id", "hHeader");

        data.forEach(d => {

            var providerName = providerColumn
                .append("div")
                .attr("class", "row")
                .attr("id", "vHeader")
                .style("font-size", fontSize * zoomFactor + "px")
                .datum(d)
                .text(d.provider);

        });
        c++;
    });

}

/**
* normalizeHeight finds the max height of the elements
* in the source group and applies it to all elements in the target group
* @Params:
*   sID: id of the elements in the source group
*   tID: id of the elements in the target group
*   padding: can be added as an offset to the max height h
*/
function normalizeHeight(sID, tID, padding) {

    padding = padding || 0;

    var source = d3.selectAll(sID);
    var target = d3.selectAll(tID);
    var h = 0;
    source._groups[0].forEach(function (g) {
        _h = g.clientHeight;

        if (_h > h) {
            h = _h;
        }
    })

    d3.selectAll(tID).style("height", h + padding + "px");
}

/*
* zoom changes the size of images and text in the grid larger or smaller
* and adjusts the size of the parent elements if necessary
*/
function zoom(scale) {
    menu.close();

    zoomFactor = zoomFactor + scale;

    // keep zoom factor between zoomMin and zoomMax
    zoomFactor = Math.min(Math.max(zoomFactor, zoomMin), zoomMax);
    iconScale = imgMinSize * zoomFactor;
    unlockResizing();

    var images = d3.selectAll(".serviceIcon").selectAll("img");
    images
        .attr("height", iconScale + "px");
    images
        .attr("width", iconScale + "px");

    var iconContainers = d3.selectAll(".serviceIcon");
    iconContainers
        .style("height", iconScale + "px");
    iconContainers
        .style("width", iconScale + "px");

    d3.selectAll(".categories")
        .style("grid-template-rows", "repeat(4," + iconScale + "px)");
    d3.selectAll("#vHeader").style("font-size", fontSize * zoomFactor + "px");
    d3.selectAll("#hHeader").style("font-size", fontSize * zoomFactor + "px");


    d3.selectAll("#zoomIndicator").text("ZOOM: " + Math.floor(zoomFactor * 100) + "%");
    updateLefHandHeader();
    lockResizing();
    jsPlumb.repaintEverything();
    adjustSVGOverlay();
    jsPlumb.repaintEverything();
    //showDependencies();
}


/**
* resets image and text size inside the grid
*/
function zoomReset() {

    zoomFactor = 1.0;
    zoom(0);

}

/**
* distinctYPos returns a list of y-positions of all elements with the given id
* the returned list only contains distinct values, redundand values are removed
*/
function distinctYPos(id) {
    var elements = d3.selectAll(id)._groups[0];
    var cYPositions = new Set();
    elements.forEach(el => {
        cYPositions.add(posY(el));

    })

    var result = [...cYPositions];
    return result;
}

function posY(el) {
    for (var ly = 0; el != null; ly += el.offsetTop, el = el.offsetParent);
    return ly;
}

function posX(el) {
    for (var lx = 0; el != null; lx += el.offsetLeft, el = el.offsetParent);
    return lx;
}


function adjustContainers() {
    unlockResizing();
    updateLefHandHeader();
    lockResizing();
    jsPlumb.repaintEverything();
    adjustSVGOverlay();
    jsPlumb.repaintEverything();

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


function showDetails() {
    updateDetailsView(currentElementId);
    detailsView.attr("class", "modal-dialog modal-lg");
    d3.select("body").style("overflow-y", "hidden")
    d3.select("#overlay").style("display", "block");
}

function hideDetails() {
    detailsView.attr("class", "null");
    d3.select("body").style("overflow-y", "auto")
    d3.select("#overlay").style("display", "none");
}

function updateDetailsView(id) {

    var logoSize = 100;
    var leftMargin = logoSize + 30;

    var item = searchIndex.find(x => x.id === id);
    console.log(item);

    detailsViewBody.html("")
    var imageColumn = detailsViewBody.append("div").style("position", "absolute").style("position", "fixed").style("padding-left","10px");

    var lorem = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   =)))))";

    imageColumn.append("img")
        .attr("src", item.img)
        .attr("height", logoSize)
        .attr("width", logoSize);

    var detailsText = detailsViewBody
        .append("div")
        .attr("id", "detailsText")
        .attr("class", "detailsView")
        .style("position", "absolute")
        .style("margin-left", leftMargin + "px")
        .style("overflow-y", "scroll")
        .style("padding-right","20px");
        
    detailsText.append("h5").style("margin-top","10px").html("<b>Service: </b><i>" + item.service + "</i>");
    detailsText.append("h5").html("<b>Provider: </b><i>" + item.provider + "</i>");
    detailsText.append("h5").html("<b>Category: </b><i>" + item.category + "</i>");

    detailsText.append("h5").html("<b>Description</b>").style("margin-top","50px");;
    detailsText.append("span").html("<i>" + item.description + "</i>");




    /**
     * Generation of the details-view goes here.
     */


}

var detailsView;
var detailsViewBody;

function createDetailsView() {
    detailsView = d3.select("body").append("div").attr("class", "null").attr("id", "detailsView").attr("role", "document").style("overflow-x", "hidden")
    var modalContent = detailsView.append("div").attr("class", "modal-content");
    var detailsViewHeader = modalContent.append("div").attr("class", "modal-header");
    detailsViewHeader.append("h4").attr("class", "modal-title").text("SERVICE DETAILS");
    detailsViewHeader.append("button").attr("type", "button").attr("class", "close").on("click", hideDetails);
    detailsViewBody = modalContent.append("div").attr("class", "modal-body").attr("id", "detailsViewBody").style("overflow-x", "hidden");
    modalContent.append("div").attr("class", "modal-footer").append("button").attr("class", "btn btn-primary").text("Close").on("click", hideDetails);
}