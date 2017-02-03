#target photoshop
#include "includes/underscore.jsinc"

app.preferences.rulerUnits = Units.PIXELS;

var document = activeDocument;
var activeLayer = document.activeLayer;
var spriteWidth = document.width;
var spriteHeight = document.height;
var recursionDepth = 25;
var flattenedLayers = flattenLayersWithDepth(document.layers, recursionDepth);

// Move layers with coordinates.
_.each(filterLayersWithCoordinates(flattenedLayers), function (layer) {
    resizeCanvasAndMoveLayer(layer);
});

// Make all layers visible.
_.each(flattenedLayers, function (layer) {
    setLayerVisibility(layer);
});

// Map layers using recursion.
function mapLayersWithDepth(layers, depth) {
    return _.union(_.toArray(layers), _.map(layers, function (layer) {
        if (depth > 0) {
            return mapLayersWithDepth(_.toArray(layer.layers), depth - 1);
        } else {
            return _.toArray(layer.layers);
        }
    }));
}

// Map layers using recursion and flatten.
function flattenLayersWithDepth(layers, depth) {
    return _.flatten(mapLayersWithDepth(layers, depth));
}

// Filter layers with coordinates in name.
function filterLayersWithCoordinates(layers) {
    return _.filter(flattenedLayers, function (layer) {
        return layer.name.match(/[0-9],[0-9]/);
    });
}

// Resize canvas and move layer.
function resizeCanvasAndMoveLayer(layer) {
    translateX = (layer.name.substring(0, 1) - 1) * spriteWidth;
    translateY = (layer.name.substring(2, 3) - 1) * spriteHeight;
    updateCanvasWidth(translateX + spriteWidth);
    updateCanvasHeight(translateY + spriteHeight);
    layer.translate(translateX, translateY);
}

// Update canvas width if necessary.
function updateCanvasWidth(requiredWidth) {
    if (document.width < requiredWidth) {
        document.resizeCanvas(requiredWidth, document.height, AnchorPosition.TOPLEFT);
    }
}

// Update canvas height if necessary.
function updateCanvasHeight(requiredHeight) {
    if (document.height < requiredHeight) {
        document.resizeCanvas(document.width, requiredHeight, AnchorPosition.TOPLEFT);
    }
}

// Set layer to visible, unless it has (hidden) in name.
function setLayerVisibility(layer) {
    if (! layer.name.match(/\(hidden\)/)) {
        layer.visible = 1;
    } else {
        layer.visible = 0;
    }
}
