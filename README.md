# Sprite Sheet From Coordinates

A photoshop script to generate a sprite sheet from cell coordinates on layer names.

## Demonstration

![demo](images/demo.gif)

## Installation

- Download this repository and place the folder in your Photoshop `Presets/Scripts` folder.

## How It Works

- A sprite sheet will be broken into "cells", with coordinate 1,1 starting at the top left of the canvas.
- Each cell will be the exact dimensions of your starting canvas size.
- Any layer/group name beginning with a coordinate (ie. "_**1,2**_") will be moved to that corresponding cell on the generated sprite sheet.
- All layers will be made visible, unless they contain "_**(hidden)**_" in the layer/group name.
