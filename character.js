const fs = require('fs');
let data = require('./radicals.json');

function executeOnPoints(path, pointCallback) {
    return path.replace(/(-?[\d\.]+) (-?[\d\.]+)/gi, function (match, p1, p2) {
        let point = {x: parseFloat(p1), y: parseFloat(p2)};
        point = pointCallback(point);
        return point.x + " " + point.y;
    });
}

function scalePath(path, sx, sy) {
    return executeOnPoints(path, function (p) {
        p.x = p.x * sx;
        p.y = p.y * sy;
        return p;
    });
}

function roundPath(path, step) {
    step || (step = 1.0);
    var inv = 1/step;
    return executeOnPoints(path, function (p) {
        p.x = Math.round(p.x * inv)/inv;
        p.y = Math.round(p.y * inv)/inv;
        return p;
    });
}

function translatePath(path, tx, ty) {
    return executeOnPoints(path, function (p) {
        p.x = p.x + tx;
        p.y = p.y + ty;
        return p;
    });
}

function mergePaths(a, b) {
    return a + " " + b;
}

function createCompound(large, small) {
    return mergePaths(
        translatePath(scalePath(large, 1.0, 0.55), 0.0, 4.5),
        translatePath(scalePath(small, 0.9, 0.3), 0.5, 0.0)
    );
}
function createSplit(left, right) {
    return mergePaths(
        scalePath(left, 0.45, 1.0),
        translatePath(scalePath(right, 0.4, 1.0), 6.00, 0.0)
    );
}
function createSmaller(path, sf) {
    var t = (10 - (sf * 10)) / 2;
    return translatePath(scalePath(path, sf, sf), t, t);
}
function addBottomMarker(path, marker) {
    return mergePaths(
        translatePath(scalePath(path, 0.9, 0.7), 0.5, 0.0),
        translatePath(scalePath(marker, 1.0, 1.0), 0.0, 8.25)
    );
}
function addTopMarker(path, marker) {
    return mergePaths(
        translatePath(scalePath(path, 0.9, 0.7), 0.5, 3.0),
        translatePath(scalePath(marker, 1.0, 1.0), 0.0, 0.0)
    );
}

function textMarkerBottom(text) {
    return data.markers[text].bottom;
}
function textLarge(text) {
    return data.radicals[text].large;
}
function textSmall(text) {
    return data.radicals[text].small;
}
function textCompound(large, small) {
    if (data.combos[large + "," + small] != undefined)
        return data.combos[large + "," + small].default;
    return createCompound(textLarge(large), textSmall(small));
}

function pathToSvg(path) {
    //let svgStyle = "fill:none; stroke:#000; stroke-linecap: square; stroke-linejoin: round;"
    let svgStyle = " ";
    return "<path d='" + path + "' style='" + svgStyle + "' />";
}
function pathsToSvg(pathArr) {
    let svgOut = "<svg viewBox='-1 -1 12 12' xmlns='http://www.w3.org/2000/svg'>";
    for (var i = 0; i < pathArr.length; i++) {
        svgOut += pathToSvg(pathArr[i]);
    }
    svgOut += "</svg>";
    return svgOut;
}

module.exports = {
    executeOnPoints,
    
    scalePath,
    translatePath,
    roundPath,
    mergePaths,
    
    createCompound,
    createSmaller,
    createSplit,
    
    textMarkerBottom,
    addBottomMarker,
    addTopMarker,
    
    textLarge,
    textSmall,
    textCompound,
    
    pathToSvg,
    pathsToSvg
}
