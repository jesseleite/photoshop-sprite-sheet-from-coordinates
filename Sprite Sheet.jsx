﻿#target photoshop#include "includes/underscore.jsinc"app.preferences.rulerUnits = Units.PIXELS;var document = activeDocument;var activeLayer = document.activeLayer;var spriteWidth = document.width;var spriteHeight = document.height;document.resizeCanvas(5*spriteWidth, 5*spriteHeight, AnchorPosition.TOPLEFT);function getFlattenedLayers(layers, depth) {    layersArray = _.map(layers, function (layer) {        return _.toArray(layer.layers);    });    return _.flatten(layersArray);}function getLayersWithCoordinates(layers, depth) {    layers = getFlattenedLayers(layers, depth);    return _.filter(layers, function (layer) {        return layer.name.match(/[0-9],[0-9]/);    });}var moveableLayers = getLayersWithCoordinates(document.layers, 10);_.each(moveableLayers, function (layer) {    translateX = layer.name.substring(0, 1) * spriteWidth;    translateY = layer.name.substring(2, 3) * spriteHeight;    layer.visible = 1;    layer.translate(translateX, translateY);});