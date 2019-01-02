(function () {
    'use strict'
    const zoomMax = 2.0;
    const zoomMin = 0.3;

    var allKeyWords = [];
    var categoryOneColumn;
    var categories = [];
    var catColumns = [];
    var config = {
        itemName: "Item",
        verticalCategoryName: "Category A",
        horizontalCategoryName: "Category B",
        detailedViewHeaderText: "ITEM DETAILS",
        showHelp: false,
        showPrint: false,
        showPDF: false,
        showFeedback: false,
        corporateIdentity: null
    };
    var cursorOutsideIcon = true;
    var currentElementId = null;
    var data;
    var detailsActive = false;
    var depsActive = false;
    var landscape;
    var lastSelectedItemPos = { "x": null, "y": null };
    var leftHeaderPositions;
    var leftContainer;
    var leavingDetails = false;
    var menu;
    var menuNode;
    var modalView;
    var modalViewBody;
    var mouseOnOverlay = false;
    var modalViewTitle;
    var modalViewHeader;
    var modalViewFooter;
    var modalViewHeaderIcon;
    var settings;
    var searchIndex;
    var tooltip;
    var windowWidth = $(window).width();

    var zoomFactor = 1.0;
    var fontZoomFactor = 1.0;
    var imgMinSize = 24;
    var catImgMinSize = imgMinSize + 10;
    var iconScale = imgMinSize * zoomFactor;
    var fontSize = imgMinSize / 2;





    function DynamicLandscape(props) {
        config.itemName = props.itemName || config.itemName;
        config.verticalCategoryName = props.verticalCategoryName || config.verticalCategoryName;
        config.horizontalCategoryName = props.horizontalCategoryName || config.horizontalCategoryName;
        config.detailedViewHeaderText = props.detailedViewHeaderText || config.detailedViewHeaderText;
        config.showHelp = props.showHelp || config.showHelp;
        config.showPrint = props.showPrint || config.showPrint;
        config.showPDF = props.showPDF || config.showPDF;
        config.showFeedback = props.showFeedback || config.showFeedback;
        config.corporateIdentity = props.corporateIdentity || config.corporateIdentity;

        var isFirefox = typeof InstallTrigger !== 'undefined';
        console.log("Is Firefox: " + isFirefox)
        if (!(this instanceof DynamicLandscape)) {
            return new DynamicLandscape()
        }

        /**
        * BEGIN STATIC BODY SECTION
        */

        createHeader();
        if (config.showHelp ||
            config.showPrint ||
            config.showPDF ||
            config.showFeedback) { createFooter(); }

        tooltip = d3.select("body").append("div").attr("class", "toolTip");
        /**
        * END STATIC BODY SECTION
        */

        $.ajax({
            url: '/database/autocomplete_index.json',
            async: false,
            dataType: 'json',
            success: function (json) {

                allKeyWords = json;
            }
        });

        d3.json("./database/structure.json", function (d) {
            data = d;
            createLandscape(d);
        });


        $.getJSON("/database/search_index.json", function (json) {
            searchIndex = json;
            d3.select("#resultCount").html(searchIndex.length);

        });

    }

    DynamicLandscape.prototype.generatePDFHeadless = function () {

        while (getLandscapeHeight() > 20) {
            zoom(-0.1)
        }
        jsPlumb.repaintEverything();

    }

    function createHeader() {
        d3.select("body").append("div").attr("id", "dpi");
        var pageHeader = d3.select("body")
            .append("div")
            .attr("id", "topnav")
            .attr("class", "topnav")
            .on("mousemove", function () {
                cursorOutsideIcon = false;
            })
            .on("mouseout", function (d, i) {
                cursorOutsideIcon = true;
            });


        pageHeader.append("div")
            .attr("class", "toolbox")
            .append("img")
            .attr("class", "iconImg")
            .attr("src", "/img/DL_Logo.svg")
            .attr("height", "40px");
        //            .attr("width", imgMinSize);

        var searchTB = pageHeader
            .append("div")
            .attr("class", "toolbox")


        searchTB.append("form")
            .attr("id", "searchForm")
            .style("overflow", "hidden")
            .append("input")
            .attr("id", "search-input")
            .attr("name", "search")
            .attr("type", "text");

        searchTB.append("button")
            .on("click", function () {
                search();
            })
            .attr("type", "button")
            .append("span")
            .attr("class", "oi oi-magnifying-glass");

        var resultDisplay = pageHeader.append("div").attr("class", "toolbox");
        resultDisplay.append("div").text("Matches:")
        resultDisplay.append("div").attr("id", "resultCount").text("0");

        var zoomTB = pageHeader.append("div").attr("class", "toolbox");

        zoomTB.append("button")
            .attr("id", "zoomOutButton")
            .on("click", function () {
                zoom(-0.1);
            })
            .append("span")
            .attr("class", "oi oi-zoom-out");

        zoomTB.append("form")
            .attr("id", "zoomForm")
            .style("overflow", "hidden")
            .append("input")
            .attr("id", "zoomIndicator")
            .attr("type", "number")
            .attr("value", "100")
            .on("change", function () {
                absoluteZoom(this.value / 100);
            })

        zoomTB.append("button")
            .attr("id", "zoomInButton")
            .on("click", function () {
                zoom(0.1);
            })
            .append("span")
            .attr("class", "oi oi-zoom-in");

        zoomTB.append("button")
            .attr("id", "zoomResetButton")
            .style("margin", "0px 5px 0px 5px")
            .on("click", function () {
                zoomReset();
            })
            .append("span")
            .attr("class", "bbg")
            .style("background", "url(./img/noun_Reset_Zoom_54041.svg) no-repeat top left");

        zoomTB.append("button")
            .attr("id", "zoomFOutButton")
            .on("click", function () {
                zoomFont(-0.1);
            })
            .append("span")
            .attr("class", "bbg")
            .style("background", "url(./img/font_zoom_out.svg) no-repeat top left")
            .style("height", "20px")
            .style("width", "20px")
            .style("top", "5px");;

        zoomTB.append("form")
            .attr("id", "zoomFForm")
            .style("overflow", "hidden")
            .append("input")
            .attr("id", "zoomFIndicator")
            .attr("type", "number")
            .attr("value", "100")
            .on("change", function () {
                absoluteFontZoom(this.value / 100);
            });


        zoomTB.append("button")
            .attr("id", "zoomFInButton")
            .on("click", function () {
                zoomFont(0.1);
            })
            .append("span")
            .attr("class", "bbg")
            .style("background", "url(./img/font_zoom_in.svg) no-repeat top left")
            .style("height", "20px")
            .style("width", "20px")
            .style("top", "5px");


        document.getElementById('zoomForm').addEventListener(
            "submit", function (e) {
                e.preventDefault();
            });

        document.getElementById('zoomFForm').addEventListener(
            "submit", function (e) {
                e.preventDefault();
            });

        if (config.corporateIdentity != null) {
            pageHeader.append("div")
                .attr("class", "toolbox")
                .style("padding-left","100px")
                .append("span")
                .style("white-space","pre-line")
                .style("right","0")
                .text(config.corporateIdentity);
        }


        d3.select("body")
            .append("div")
            .attr("id", "printHeader")
            .append("div")
            .attr("class", "row")
            .append("div")
            .attr("class", "col")
            .append("span")
            .attr("id", "headerText")
            .style("font-size", "10mm")
            .text("DYNAMIC LANDSCAPE");

    }

    function createFooter() {
        var leftPadding = 50;

        var footerContainer = d3.select("body")
            .append("div")
            .attr("class", "footer")
            .style("padding-left", "25%");

        var footer = footerContainer.append("div")
            .attr("class", "row")
            .on("mousemove", function () {
                cursorOutsideIcon = false;
            })
            .on("mouseout", function (d, i) {
                cursorOutsideIcon = true;
            });;


        /**
         * Help button
         */
        if (config.showHelp) {
            leftPadding -= 10;
            footer.append("div")
                .attr("class", "col")
                .append("button")
                .attr("class", "footer-button")
                .on("click", function () {
                    window.open('https://github.com/MaibornWolff/dynamic-landscape/blob/master/README.md#Getting-started', '_blank');
                })
                .append("span")
                .text("Help");
        }


        /**
         * Print button
         */
        if (config.showPrint) {
            leftPadding -= 10;
            footer.append("div")
                .attr("class", "col")
                .append("button")
                .attr("class", "footer-button")
                .on("click", function () {
                    generatePDF();
                })
                .append("span")
                .text("Print");
        }





        if (config.showPDF) {
            leftPadding -= 10;
            footer.append("div")
                .attr("class", "col")
                .append("form")
                .attr("method", "get")
                .attr("action", "/offline/landscape_latest.pdf")
                .append("button")
                .attr("class", "footer-button")
                .append("span")
                .text("PDF");
        }


        /**
         * Feedback button
         */
        if (config.showFeedback) {
            leftPadding -= 10;
            footer.append("div")
                .attr("class", "col")
                .append("button")
                .attr("class", "footer-button")
                .on("click", function () {
                    createFeedBackView();
                })
                .append("span")
                .text("Feedback");
        }

        footerContainer.style("padding-left", leftPadding + "%");

        /**
         * Impress button
         
        footer.append("div")
            .attr("class", "col")
            .append("button")
            .attr("class", "footer-button")
            .on("click", function () {

            })
            .append("span")
            .text("Impress");
            */
    }


    function showDetails() {
        if (currentElementId === null) return;
        var currentScrollOffset = document.documentElement.scrollTop;
        modalView.attr("class", "modal-dialog modal-lg");
        updatemodalView(currentElementId);
        modalView.style("top", currentScrollOffset + "px")
        d3.select("body").style("overflow-y", "hidden")
        d3.select("#overlay").style("display", "block");
        detailsActive = true;
        depsActive = true;
        leavingDetails = false;
    }


    function hideDetails() {

        modalView.attr("class", "null");
        d3.select("body").style("overflow-y", "auto")
        d3.select("#overlay").style("display", "none");
        detailsActive = false;
        leavingDetails = true;
    }


    //REMOVED FUNCTIONS FROM HERE



    /*
  * createLandscape creates the main grid in the right layout div based on the data from json file
  * IMPORTANT NOTES:
  * - The grid technically consists of ONLY ONE ROW to enable automatical wraping provided by the bootstrap lib 
  * - Every column consists of further rows. The amount of these rows depends on the amount of key1-categories (in this example: proveder)
  *   The height of theses rows must be normalized manually to provide the table like appearance. This can be done with the normalizeHeight function.
  * - The very left column with the key1-category names (= providers) is technically not a part of the main grid. 
  *   It is detached to an extra column. This is done to keep it on the very left while cloning it along with the main grid wraps.
  */

    function createLandscape(d) {


        landscape = d3.select("body")
            .append("div")
            .attr("class", "container-xs")
            .attr("id", "landscape")
            .append("div")
            .attr("class", "row master");

        d3.select("body")
            .append("div")
            .attr("id", "overlay")
            .on("mousemove", function () {
                mouseOnOverlay = true;
            })
            .on("mouseout", function () {
                mouseOnOverlay = false;
            });

        var arrowLayer = d3.selectAll("body")
            .append("div")
            .attr("class", "svgContainer")
            .attr("id", "svgContainer")
            .style("position", "absolute");

        leftContainer = landscape
            .append("div")
            .attr("class", "col-xs-auto")
            .attr("id", "leftContainer");

        var rightContainer = landscape
            .append("div")
            .attr("class", "col")
            .attr("id", "elementTable")


        var grid = rightContainer
            .append("div")
            .attr("class", "row master");

        var gV = 0;
        data[0].categories.forEach(d => {
            //var gV = Math.random() / 10;
            gV = ((gV + 1) % 5);
            var bgA = "rgba(0,0,0," + ((gV + 1) / 60) + ")";
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
                .html("<b>" + d.categoryTwo + "</b>");
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
                        .attr("class", "itemIcon")
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
                                .text(m.itemNode);


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
        var padding = 2;
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) padding = 1.87;
        normalizeHeight("#cContainer", "#cContainer", "height");
        //normalizeHeight("#cContainer", "#vHeader", "width", 2);
        normalizeHeight("#cContainer", "#vHeader", "height", padding);
        normalizeHeight("#hHeader", "#hHeader", "height");

    }


    function updateLefHandHeader() {
        leftHeaderPositions = distinctYPos("#catColumn");

        var c = 1;
        leftContainer._groups[0][0].innerHTML = '';
        d3.selectAll("#categoryOneColumn").remove();
        for (var i = 0; i < leftHeaderPositions; i++) {

            var pos = 20;
            categoryOneColumn = leftContainer
                .append("div")
                .attr("id", "categoryOneColumn")
                .style("margin-top", pos + "px");

            categoryOneColumn
                .append("div")
                .attr("id", "hHeader")
                .style("border", "0px");


            data.forEach(d => {
                var categoryOneName = categoryOneColumn
                    .append("div")
                    .attr("id", "vHeader")
                    .style("font-size", fontSize * fontZoomFactor + "px")
                    .datum(d)
                    .append("div")
                    .attr("class", "vContainer");

                categoryOneName
                    .append("div")
                    .attr("class", "categoryOneIcon")
                    .append("img")
                    .attr("src", d.categoryOneIcon)
                    .attr("height", catImgMinSize * zoomFactor)
                    .attr("width", catImgMinSize * zoomFactor);

                categoryOneName.append("div")
                    .attr("class", "textBoxRot").text(d.categoryOne);
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
        var isFirefox = typeof InstallTrigger !== 'undefined';
        padding = padding || 0;

        var source = d3.selectAll(sID);
        var h = 0;
        source._groups[0].forEach(function (g) {
            var _h = g.clientHeight;

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


        zoomFactor += newFactor;
        zoomFactor = Math.round(zoomFactor * 10) / 10;
        fontZoomFactor += newFactor;
        fontZoomFactor = Math.round(fontZoomFactor * 10) / 10;

        // keep zoom factor between zoomMin and zoomMax
        zoomFactor = Math.min(Math.max(zoomFactor, zoomMin), zoomMax);
        fontZoomFactor = Math.min(Math.max(fontZoomFactor, zoomMin), zoomMax);


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
        iconScale = Math.round(imgMinSize * zoomFactor);
        unlockResizing();
        d3.selectAll(".categories").style("padding", 15 * zoomFactor + "px")
        var images = d3.selectAll(".itemIcon").selectAll("img");


        images.attr("height", iconScale + "px");
        images.attr("width", iconScale + "px");


        var iconContainers = d3.selectAll(".itemIcon");
        iconContainers.style("height", iconScale + "px");
        iconContainers.style("width", iconScale + "px");

        d3.selectAll(".categories").style("grid-template-rows", "repeat(4," + iconScale + "px)");
        d3.selectAll("#hHeader").style("font-size", fontSize * zoomFactor + "px");



        document.getElementById("zoomIndicator").value = Math.floor(zoomFactor * 100);
        updateLefHandHeader();
        lockResizing();
        jsPlumb.repaintEverything();
        adjustSVGOverlay();
        jsPlumb.repaintEverything();
        getLandscapeHeight();
    }


    function zoomFont(newFactor) {

        fontZoomFactor += newFactor;
        fontZoomFactor = Math.round(fontZoomFactor * 10) / 10;
        // keep zoom factor between zoomMin and zoomMax
        fontZoomFactor = Math.min(Math.max(fontZoomFactor, zoomMin), zoomMax);
        var zoomInB = d3.select("#zoomFInButton");
        var zoomOutB = d3.select("#zoomFOutButton");


        if (fontZoomFactor == zoomMin) {
            zoomOutB.style("background-color", "grey");
        } else if (fontZoomFactor == zoomMax) {
            zoomInB.style("background-color", "grey");
        } else {
            zoomInB.style("background-color", "#008688");
            zoomOutB.style("background-color", "#008688");
        }
        unlockResizing();
        d3.selectAll("#hHeader").style("font-size", Math.round(fontSize * fontZoomFactor) + "px");
        d3.selectAll(".connectorLabelOut").style("font-size", Math.round(fontSize * fontZoomFactor) + "px");
        d3.selectAll(".connectorLabelIn").style("font-size", Math.round(fontSize * fontZoomFactor) + "px");
        updateLefHandHeader();
        lockResizing();
        jsPlumb.repaintEverything();
        adjustSVGOverlay();
        jsPlumb.repaintEverything();
        //showconnections();
        getLandscapeHeight();
        document.getElementById("zoomFIndicator").value = Math.floor(fontZoomFactor * 100);
    }


    function absoluteZoom(scale) {
        zoomFactor = scale;
        zoom(0);
    }


    function absoluteFontZoom(scale) {
        fontZoomFactor = scale;
        zoomFont(0);
    }


    /**
    * resets image and text size inside the grid
    */
    function zoomReset() {
        zoomFactor = 1.0;
        fontZoomFactor = 1.0;
        zoomFont(0);
        zoom(0);
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
        leftContainer._groups[0][0].style.maxWidth = (catImgMinSize * zoomFactor) + 4;


    }


    function adjustSVGOverlay() {
        var svgContainer = document.getElementById("svgContainer");
        var parentContainer = document.getElementById("landscape");
        svgContainer.style.width = parentContainer.clientWidth + "px";
        svgContainer.style.height = parentContainer.clientHeight + "px";
    }


    function processItemClick(node) {
        showconnections();

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
        search();
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


    function createFeedBackView() {
        alert("THERE IS NO FUNCTIONALITY BEHIND THE FEEDBACK FUNCTION (YET), SO PLEASE DO NOT MAKE AN EFFORT TO TYPE TEXT IN THERE!")
        var currentScrollOffset = document.documentElement.scrollTop;
        modalView.attr("class", "modal-dialog modal-lg");
        modalViewTitle.text("FEEDBACK");

        modalViewBody.html("");
        modalViewHeaderIcon.html("");
        modalViewFooter.html("");
        modalViewFooter.append("button")
            .text("Submit")
            .on("click", hideDetails);
        modalViewFooter.append("button")
            .text("Close")
            .on("click", hideDetails);
        var form = modalViewBody.append("form").attr("method", "post");
        form.append("label").attr("for", "user").text("Name or / and E-Mail");
        form.append("input").attr("type", "text").attr("id", "userID").attr("name", "usercontact");
        form.append("label").attr("for", "textArea").text("Feedback");
        form.append("textarea").attr("id", "feedbackText").attr("placeholder", "Your feedback goes here").attr("name", "textArea")
            .style("height", modalViewBody._groups[0][0].clientHeight - 200 + "px")
            .style("width", modalViewBody._groups[0][0].clientWidth - 30 + "px");



        modalView.style("top", currentScrollOffset + "px")
        d3.select("body").style("overflow-y", "hidden")
        d3.select("#overlay").style("display", "block");

    }

    function updatemodalView(id) {

        var logoSize = 100;
        var leftMargin = logoSize + 30;

        var categoryOneIconSize = modalViewHeader._groups[0][0].clientHeight;

        var item = searchIndex.find(x => x.id === id);

        modalViewTitle.text(config.detailedViewHeaderText);
        var categoryOneIconSize = modalViewTitle._groups[0][0].clientHeight;

        modalViewBody.html("");
        modalViewHeaderIcon.html("");
        modalViewFooter.html("");
        modalViewFooter.append("button")
            .text("Close")
            .on("click", hideDetails);

        var imageColumn = modalViewBody.append("div").attr("class", "modalViewIcon");

        modalViewHeaderIcon.append("img")
            .attr("src", item.categoryOneIcon)
            .attr("height", categoryOneIconSize)
            .attr("width", categoryOneIconSize);


        imageColumn.append("img")
            .attr("src", item.img)
            .attr("height", logoSize)
            .attr("width", logoSize);

        var detailsText = modalViewBody
            .append("div")
            .attr("id", "detailsText")
            .attr("class", "modalView")
            .style("margin-left", leftMargin + "px");

        if (typeof item.webLink !== 'undefined') {
            detailsText.append("h5").html("<b>Service: </b><i><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + item.webLink + "\">" + item.itemNode + "</i>");
        } else {
            detailsText.append("h5").html("<b>" + config.itemName + ": </b><i>" + item.itemNode + "</i>");
        }


        detailsText.append("h5").style("margin-top", "10px").html("<b>" + config.verticalCategoryName + ": </b><i>" + item.categoryOne + "</a></i>");
        detailsText.append("h5").html("<b>" + config.horizontalCategoryName + ": </b><i>" + item.categoryTwo + "</i>");
        detailsText.append("h5").html("<b>Description</b>").style("margin-top", "50px");;
        detailsText.append("span").html("<i>" + item.description + "</i>");

        item.metadata.forEach(md => {
            if (md.type == "tags") {
                detailsText.append("h5").html(md.title).style("margin-top", "50px");
                md.content.forEach(tag => {
                    detailsText.append("div").attr("class", "tag").html("<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + tag.link + "\">" + tag.text + "</a>");
                })
            } else if (md.type == "text") {
                detailsText.append("h5").html(md.title).style("margin-top", "50px");
                detailsText.append("span").html("<i>" + md.content + "</i>");
            }
        })




    }


    function createmodalView() {

        modalView = d3.select("body")
            .append("div")
            .attr("class", "null")
            .attr("id", "modalView")
            .attr("role", "document")
            .style("overflow-x", "hidden");

        var modalContent = modalView.append("div")
            .attr("class", "modal-content");

        modalViewHeader = modalContent.append("div")
            .attr("class", "modal-header")
            .attr("id", "modal-header")
            .style("display", "inline-block");


        modalViewHeaderIcon = modalViewHeader.append("div")
            .attr("id", "modalTitleIcon")
            .style("display", "inline-block")
            .style("float", "left")
            .style("margin-right", "10px");

        modalViewTitle = modalViewHeader.append("span")
            .attr("class", "modal-title")
            .style("float", "left")
            .style("font-size", "1ex");

        modalViewHeader.append("button")
            .attr("type", "button")
            .attr("class", "close")
            .on("click", hideDetails);

        modalViewBody = modalContent.append("div")
            .attr("class", "modal-body")
            .attr("id", "modalViewBody")
            .style("overflow-x", "hidden");

        modalViewFooter = modalContent.append("div")
            .attr("class", "modal-footer")




    }


    function generatePDF() {
        var originalZoom = zoomFactor;
        var originalFontZoom = fontZoomFactor;

        zoomReset();

        while (getLandscapeHeight() > 20) {
            zoom(-0.1)
        }

        jsPlumb.repaintEverything();

        window.print();
        zoomReset();
        jsPlumb.repaintEverything();

    }


    function getLandscapeHeight() {
        var dpi_y = document.getElementById('dpi').offsetHeight;
        var height = document.getElementById('landscape').offsetHeight / dpi_y;
        return height * leftHeaderPositions;
    }


    function search() {
        jsPlumb.deleteEveryEndpoint();

        currentElementId = null;
        document.getElementById("svgContainer").innerHTML = '';
        var searchElements = d3.selectAll(".tag-text");
        var keyWordSet = new Set();
        searchElements._groups[0].forEach(e => {
            var query = e.innerText.split(" ");
            query.forEach(q => {
                keyWordSet.add(q.toLowerCase());
            });

        });
        var keyWords = [...keyWordSet];

        var searchResults = [];

        searchIndex.forEach(e => {
            var isResult = keyWords.every(val => e.keywords.includes(val));
            if (isResult) searchResults.push(e.id);
        });
        var resultCount = searchResults.length;
        var searchResCounter = d3.select("#resultCount");


        if (resultCount == 0) {
            searchResCounter.style("color", "red")
            searchResCounter.html("NONE")
        } else {
            searchResCounter.style("color", "black");
            searchResCounter.html(resultCount)
        }

        adjustIconOpacityById(searchResults);

    }


    function adjustIconOpacityById(idList) {

        d3.selectAll(".itemIcon").select("img").style("opacity", "0.1");
        idList.forEach(r => {
            var node = d3.selectAll("#" + r).select("img");
            node.style("opacity", "1");
        });
    }


    function showconnections() {
        if (currentElementId === null) return;

        jsPlumb.deleteEveryEndpoint();
        var connections = searchIndex.filter(node => node.id == currentElementId)[0].connections;
        var nodesToHighlight = [];
        var con_in = [];
        var con_out = [];

        nodesToHighlight.push(currentElementId);

        connections.out.forEach(item => {

            item.dname.forEach(id => {
                con_in.push(id);
                jsPlumb.connect({
                    anchor: "AutoDefault",
                    source: currentElementId,
                    target: id,
                    paintStyle: { stroke: "green", strokeWidth: 2 },
                    connector: ["Bezier", { curviness: 50 }],
                    overlays: [
                        ["PlainArrow", { width: 6, length: 6, location: 1.0 }],
                        ["Label", { label: item.dtype, location: 0.6, cssClass: "connectorLabelOut" }]
                    ]
                });
            });


        });

        connections.in.forEach(item => {

            item.dname.forEach(id => {
                con_in.push(id);
                jsPlumb.connect({
                    anchor: "AutoDefault",
                    source: id,
                    target: currentElementId,
                    paintStyle: { stroke: "blue", strokeWidth: 2 },
                    connector: ["Bezier", { curviness: 50 }],
                    overlays: [
                        ["PlainArrow", { width: 6, length: 6, location: 1.0 }],
                        ["Label", { label: item.dtype, location: 0.6, cssClass: "connectorLabelIn" }]
                    ]
                });
            });

        });

        nodesToHighlight = nodesToHighlight.concat(con_in, con_out);
        adjustIconOpacityById(nodesToHighlight);

        depsActive = true;
    }


    $(window).click(function () {
        if (cursorOutsideIcon) {

            menu.close();
            if (leavingDetails) {
                leavingDetails = false;
                detailsActive = false;
                depsActive = true;
                return;
            }
        }

        if (mouseOnOverlay) {
            hideDetails();
        }

        if (depsActive && cursorOutsideIcon && !(detailsActive || leavingDetails)) {

            search();
            depsActive = false;
        }


    });


    $(function () {
        $('#search-input').tagsInput({
            'autocomplete': {
                source: allKeyWords
            }
        });

    });


    /**
     * Enable autocomplete only for the firs letters
     */
    $.ui.autocomplete.filter = function (array, term) {
        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function (value) {
            return matcher.test(value.label || value.value || value);
        });
    };


    /* jQuery Tags Input Revisited Plugin
     *
     * Copyright (c) Krzysztof Rusnarczyk
     * Licensed under the MIT license */
    (function ($) {
        var delimiter = [];
        var inputSettings = [];
        var callbacks = [];

        $.fn.addTag = function (value, options) {
            options = jQuery.extend({
                focus: false,
                callback: true
            }, options);

            this.each(function () {
                var id = $(this).attr('id');

                var tagslist = $(this).val().split(_getDelimiter(delimiter[id]));
                if (tagslist[0] === '') tagslist = [];

                value = jQuery.trim(value);

                if ((inputSettings[id].unique && $(this).tagExist(value)) || !_validateTag(value, inputSettings[id], tagslist, delimiter[id])) {
                    $('#' + id + '_tag').addClass('error');
                    return false;
                }

                $('<span>', { class: 'tag' }).append(
                    $('<span>', { class: 'tag-text' }).text(value),
                    $('<button>', { class: 'tag-remove' }).click(function () {
                        return $('#' + id).removeTag(encodeURI(value));
                    })
                ).insertBefore('#' + id + '_addTag');

                tagslist.push(value);

                $('#' + id + '_tag').val('');
                if (options.focus) {
                    $('#' + id + '_tag').focus();
                } else {
                    $('#' + id + '_tag').blur();
                }

                $.fn.tagsInput.updateTagsField(this, tagslist);

                if (options.callback && callbacks[id] && callbacks[id]['onAddTag']) {
                    var f = callbacks[id]['onAddTag'];
                    f.call(this, this, value);
                }

                if (callbacks[id] && callbacks[id]['onChange']) {
                    var i = tagslist.length;
                    var f = callbacks[id]['onChange'];
                    f.call(this, this, value);
                }
            });
            search();
            return false;
        };

        $.fn.removeTag = function (value) {
            value = decodeURI(value);

            this.each(function () {
                var id = $(this).attr('id');

                var old = $(this).val().split(_getDelimiter(delimiter[id]));

                $('#' + id + '_tagsinput .tag').remove();

                var str = '';
                for (var i = 0; i < old.length; ++i) {
                    if (old[i] != value) {
                        str = str + _getDelimiter(delimiter[id]) + old[i];
                    }
                }

                $.fn.tagsInput.importTags(this, str);

                if (callbacks[id] && callbacks[id]['onRemoveTag']) {
                    var f = callbacks[id]['onRemoveTag'];
                    f.call(this, this, value);
                }
            });
            search();
            return false;
        };

        $.fn.tagExist = function (val) {
            var id = $(this).attr('id');
            var tagslist = $(this).val().split(_getDelimiter(delimiter[id]));
            return (jQuery.inArray(val, tagslist) >= 0);
        };

        $.fn.importTags = function (str) {
            var id = $(this).attr('id');
            $('#' + id + '_tagsinput .tag').remove();
            $.fn.tagsInput.importTags(this, str);
        };

        $.fn.tagsInput = function (options) {
            settings = jQuery.extend({
                interactive: true,
                placeholder: 'Search... (e.g. speech, cloud, aws)',
                minChars: 0,
                maxChars: null,
                limit: null,
                validationPattern: null,
                width: 'auto',
                height: '40px',
                autocomplete: null,
                hide: true,
                delimiter: ',',
                unique: true,
                removeWithBackspace: true
            }, options);

            var uniqueIdCounter = 0;

            this.each(function () {
                if (typeof $(this).data('tagsinput-init') !== 'undefined') return;

                $(this).data('tagsinput-init', true);

                if (settings.hide) $(this).hide();

                var id = $(this).attr('id');
                if (!id || _getDelimiter(delimiter[$(this).attr('id')])) {
                    id = $(this).attr('id', 'tags' + new Date().getTime() + (++uniqueIdCounter)).attr('id');
                }

                var data = jQuery.extend({
                    pid: id,
                    real_input: '#' + id,
                    holder: '#' + id + '_tagsinput',
                    input_wrapper: '#' + id + '_addTag',
                    fake_input: '#' + id + '_tag'
                }, settings);



                delimiter[id] = data.delimiter;
                inputSettings[id] = {
                    minChars: settings.minChars,
                    maxChars: settings.maxChars,
                    limit: settings.limit,
                    validationPattern: settings.validationPattern,
                    unique: settings.unique
                };

                if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
                    callbacks[id] = [];
                    callbacks[id]['onAddTag'] = settings.onAddTag;
                    callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
                    callbacks[id]['onChange'] = settings.onChange;
                }

                var markup = $('<div>', { id: id + '_tagsinput', class: 'tagsinput' }).append(
                    $('<div>', { id: id + '_addTag' }).append(
                        settings.interactive ? $('<input>', { id: id + '_tag', class: 'tag-input', value: '', placeholder: settings.placeholder }) : null
                    )
                );

                $(markup).insertAfter(this);

                $(data.holder).css('width', settings.width);
                $(data.holder).css('min-height', settings.height);
                $(data.holder).css('height', settings.height);

                if ($(data.real_input).val() !== '') {
                    $.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val());
                }

                // Stop here if interactive option is not chosen
                if (!settings.interactive) return;

                $(data.fake_input).val('');
                $(data.fake_input).data('pasted', false);

                $(data.fake_input).on('focus', data, function (event) {
                    $(data.holder).addClass('focus');

                    if ($(this).val() === '') {
                        $(this).removeClass('error');
                    }
                });

                $(data.fake_input).on('blur', data, function (event) {
                    $(data.holder).removeClass('focus');
                });

                if (settings.autocomplete !== null && jQuery.ui.autocomplete !== undefined) {
                    $(data.fake_input).autocomplete(settings.autocomplete);
                    $(data.fake_input).on('autocompleteselect', data, function (event, ui) {
                        $(event.data.real_input).addTag(ui.item.value, {
                            focus: true,
                            unique: settings.unique
                        });

                        return false;
                    });

                    $(data.fake_input).on('keypress', data, function (event) {
                        if (_checkDelimiter(event)) {
                            $(this).autocomplete("close");
                        }
                    });
                } else {
                    $(data.fake_input).on('blur', data, function (event) {
                        $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                            focus: true,
                            unique: settings.unique
                        });

                        return false;
                    });
                }

                // If a user types a delimiter create a new tag
                $(data.fake_input).on('keypress', data, function (event) {
                    if (_checkDelimiter(event)) {
                        event.preventDefault();

                        $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                            focus: true,
                            unique: settings.unique
                        });

                        return false;
                    }
                });

                $(data.fake_input).on('paste', function () {
                    $(this).data('pasted', true);
                });

                // If a user pastes the text check if it shouldn't be splitted into tags
                $(data.fake_input).on('input', data, function (event) {
                    if (!$(this).data('pasted')) return;

                    $(this).data('pasted', false);

                    var value = $(event.data.fake_input).val();

                    value = value.replace(/\n/g, '');
                    value = value.replace(/\s/g, '');

                    var tags = _splitIntoTags(event.data.delimiter, value);

                    if (tags.length > 1) {
                        for (var i = 0; i < tags.length; ++i) {
                            $(event.data.real_input).addTag(tags[i], {
                                focus: true,
                                unique: settings.unique
                            });
                        }

                        return false;
                    }
                });

                // Deletes last tag on backspace
                data.removeWithBackspace && $(data.fake_input).on('keydown', function (event) {
                    if (event.keyCode == 8 && $(this).val() === '') {
                        event.preventDefault();
                        var lastTag = $(this).closest('.tagsinput').find('.tag:last > span').text();
                        var id = $(this).attr('id').replace(/_tag$/, '');
                        $('#' + id).removeTag(encodeURI(lastTag));
                        $(this).trigger('focus');
                    }
                });

                // Removes the error class when user changes the value of the fake input
                $(data.fake_input).keydown(function (event) {
                    // enter, alt, shift, esc, ctrl and arrows keys are ignored
                    if (jQuery.inArray(event.keyCode, [13, 37, 38, 39, 40, 27, 16, 17, 18, 225]) === -1) {
                        $(this).removeClass('error');
                    }
                });
            });

            return this;
        };

        $.fn.tagsInput.updateTagsField = function (obj, tagslist) {
            var id = $(obj).attr('id');
            $(obj).val(tagslist.join(_getDelimiter(delimiter[id])));
        };

        $.fn.tagsInput.importTags = function (obj, val) {
            $(obj).val('');

            var id = $(obj).attr('id');
            var tags = _splitIntoTags(delimiter[id], val);

            for (var i = 0; i < tags.length; ++i) {
                $(obj).addTag(tags[i], {
                    focus: false,
                    callback: false
                });
            }

            if (callbacks[id] && callbacks[id]['onChange']) {
                var f = callbacks[id]['onChange'];
                f.call(obj, obj, tags);
            }
        };

        var _getDelimiter = function (delimiter) {
            if (typeof delimiter === 'undefined') {
                return delimiter;
            } else if (typeof delimiter === 'string') {
                return delimiter;
            } else {
                return delimiter[0];
            }
        };

        var _validateTag = function (value, inputSettings, tagslist, delimiter) {
            var result = true;

            if (value === '') result = false;
            if (value.length < inputSettings.minChars) result = false;
            if (inputSettings.maxChars !== null && value.length > inputSettings.maxChars) result = false;
            if (inputSettings.limit !== null && tagslist.length >= inputSettings.limit) result = false;
            if (inputSettings.validationPattern !== null && !inputSettings.validationPattern.test(value)) result = false;

            if (typeof delimiter === 'string') {
                if (value.indexOf(delimiter) > -1) result = false;
            } else {
                $.each(delimiter, function (index, _delimiter) {
                    if (value.indexOf(_delimiter) > -1) result = false;
                    return false;
                });
            }

            return result;
        };

        var _checkDelimiter = function (event) {
            var found = false;

            if (event.which === 13) {
                return true;
            }

            if (typeof event.data.delimiter === 'string') {
                if (event.which === event.data.delimiter.charCodeAt(0)) {
                    found = true;
                }
            } else {
                $.each(event.data.delimiter, function (index, delimiter) {
                    if (event.which === delimiter.charCodeAt(0)) {
                        found = true;
                    }
                });
            }

            return found;
        };

        var _splitIntoTags = function (delimiter, value) {
            if (value === '') return [];

            if (typeof delimiter === 'string') {
                return value.split(delimiter);
            } else {
                var tmpDelimiter = '∞';
                var text = value;

                $.each(delimiter, function (index, _delimiter) {
                    text = text.split(_delimiter).join(tmpDelimiter);
                });

                return text.split(tmpDelimiter);
            }

            return [];
        };
    })(jQuery);

    $(window).ready(function () {
        windowWidth = $(window).width();
        d3.select("#searchForm").style("width", windowWidth * 0.5 + "px");
        var zoomIndicator = document.getElementById("zoomIndicator");
        zoomIndicator.setAttribute("min", Math.floor(zoomMin * 100));
        zoomIndicator.setAttribute("max", Math.floor(zoomMax * 100));
        var zoomFIndicator = document.getElementById("zoomFIndicator");
        zoomFIndicator.setAttribute("min", Math.floor(zoomMin * 100));
        zoomFIndicator.setAttribute("max", Math.floor(zoomMax * 100));

        createmodalView();
        menu = new BloomingMenu({
            itemsNum: 1,
            radius: 40,
            startAngle: 0,
            endAngle: 180,
            itemWidth: 50
        });


        menu.render();

        menuNode = d3.selectAll(".blooming-menu__container");

        menuNode.style("z-index", "4");
        menuNode
            .on("click", function () {
                menuCloseAdapter();
            });

        document.getElementById("menu_button_0").addEventListener("click", showDetails);

        //document.getElementById("menu_button_1").addEventListener("click", showDetails);

        d3.select("body")
            .on("keydown", function () {
                if (d3.event.key == "Escape") {
                    resetView();
                }
            })

    });

    window.addEventListener("resize", adjustContainers);

    if (typeof module !== 'undefined' &&
        typeof module.exports !== 'undefined') {
        module.exports = DynamicLandscape
    } else if (typeof window !== 'undefined') {
        window.DynamicLandscape = DynamicLandscape
    }

}())