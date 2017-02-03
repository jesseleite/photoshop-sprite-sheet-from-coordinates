#target photoshop

#include "includes/underscore.jsinc"

app.preferences.rulerUnits = Units.PIXELS;

var document = activeDocument;
var activeLayer = document.activeLayer;
var spriteWidth = document.width;
var spriteHeight = document.height;
var layerDepth = 25;
var flattenedLayers = flattenLayersWithDepth(document.layers, layerDepth);

document.resizeCanvas(5*spriteWidth, 5*spriteHeight, AnchorPosition.TOPLEFT);

_.each(getLayersWithCoordinates(flattenedLayers), function (layer) {
    translateX = (layer.name.substring(0, 1) - 1) * spriteWidth;
    translateY = (layer.name.substring(2, 3) - 1) * spriteHeight;
    layer.translate(translateX, translateY);
});

_.each(flattenedLayers, function (layer) {
    layer.visible = 1;
});

function mapLayersWithDepth(layers, depth) {
    return _.union(_.toArray(layers), _.map(layers, function (layer) {
        if (depth > 0) {
            return mapLayersWithDepth(_.toArray(layer.layers), depth - 1);
        } else {
            return _.toArray(layer.layers);
        }
    }));
}

function flattenLayersWithDepth(layers, depth) {
    return _.flatten(mapLayersWithDepth(layers, depth));
}

function getLayersWithCoordinates(layers) {
    return _.filter(flattenedLayers, function (layer) {
        return layer.name.match(/[0-9],[0-9]/);
    });
}
