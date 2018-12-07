/**
 * This file stores all global variables and constants
 */


var searchIndex;
var allKeyWords = [];
var catColumns = [];
var categories = [];
var data;
var zoomFactor = 1.0;
var fontZoomFactor = 1.0;
var imgMinSize = 24;
var catImgMinSize = imgMinSize + 10;
var iconScale = imgMinSize * zoomFactor;
var fontSize = imgMinSize / 2;
var leftHeaderPositions;
var leftContainer;
var providerColumn;
var currentElementId = null;
var landscape;
var cursorOutsideIcon = true;
const zoomMin = 0.3;
const zoomMax = 3.0;
var detailsView;
var detailsViewBody;
var lastSelectedItemPos = { "x": null, "y": null };
var tooltip;
var menuNode;