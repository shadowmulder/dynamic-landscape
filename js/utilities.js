
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
    return result.length;
}

function posY(el) {
    for (var ly = 0; el != null; ly += el.offsetTop, el = el.offsetParent);
    return ly;
}

function posX(el) {
    for (var lx = 0; el != null; lx += el.offsetLeft, el = el.offsetParent);
    return lx;
}


function showDetails() {
    var currentScrollOffset = document.documentElement.scrollTop;
    updateDetailsView(currentElementId);
    detailsView.attr("class", "modal-dialog modal-lg");
    detailsView.style("top",currentScrollOffset+"px")
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

    detailsViewBody.html("")
    var imageColumn = detailsViewBody.append("div").attr("class","detailsViewIcon");

    var lorem = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   =)))))";

    imageColumn.append("img")
        .attr("src", item.img)
        .attr("height", logoSize)
        .attr("width", logoSize);

    var detailsText = detailsViewBody
        .append("div")
        .attr("id", "detailsText")
        .attr("class", "detailsView")
        .style("margin-left", leftMargin + "px");

    detailsText.append("h5").style("margin-top", "10px").html("<b>Service: </b><i>" + item.service + "</i>");
    detailsText.append("h5").html("<b>Provider: </b><i>" + item.provider + "</i>");
    detailsText.append("h5").html("<b>Category: </b><i>" + item.category + "</i>");

    detailsText.append("h5").html("<b>Description</b>").style("margin-top", "50px");;
    detailsText.append("span").html("<i>" + item.description + "</i>");

}



function createDetailsView() {
    
    detailsView = d3.select("body").append("div").attr("class", "null").attr("id", "detailsView").attr("role", "document").style("overflow-x", "hidden")
    var modalContent = detailsView.append("div").attr("class", "modal-content");
    var detailsViewHeader = modalContent.append("div").attr("class", "modal-header");
    detailsViewHeader.append("h4").attr("class", "modal-title").text("SERVICE DETAILS");
    detailsViewHeader.append("button").attr("type", "button").attr("class", "close").on("click", hideDetails);
    detailsViewBody = modalContent.append("div").attr("class", "modal-body").attr("id", "detailsViewBody").style("overflow-x", "hidden");
    modalContent.append("div").attr("class", "modal-footer").append("button").attr("class", "btn btn-primary").text("Close").on("click", hideDetails);

}






function generatePDF() {
    var originalZoom = zoomFactor;
    var originalFontZoom = fontZoomFactor;
    zoomReset();
    //d3.select("#landscape").style("border","5mm solid rgb(230, 230, 230)")
    
    while (getLandscapeHeight() > 20){
        zoom(zoomFactor-0.1)
    }
    window.print();
    //d3.select("#landscape").style("border","0")
    zoom(originalZoom);
    zoomFont(originalFontZoom);

}


function generatePDFHeadless() {

    while (getLandscapeHeight() > 20){
        zoom(zoomFactor-0.1)
    }
    
}


$(window).click(function () {
   if (cursorOutsideIcon)  menu.close();
});


function getLandscapeHeight(){

    var dpi_y = document.getElementById('dpi').offsetHeight;
    var height = document.getElementById('landscape').offsetHeight / dpi_y;
    return height*leftHeaderPositions;
}

