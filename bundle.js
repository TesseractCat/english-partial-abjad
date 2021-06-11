(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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

},{"./radicals.json":4,"fs":1}],3:[function(require,module,exports){
const c = require('./character');

//https://stackoverflow.com/questions/566203/changing-css-values-with-javascript?noredirect=1&lq=1
function CCSStylesheetRuleStyle(stylesheet, selectorText, style, value){
    /* returns the value of the element style of the rule in the stylesheet
    *    If no value is given, reads the value
    *    If value is given, the value is changed and returned
    *    If '' (empty string) is given, erases the value.
    *    The browser will apply the default one
    *
    * string stylesheet: part of the .css name to be recognized, e.g. 'default'
    * string selectorText: css selector, e.g. '#myId', '.myClass', 'thead td'
    * string style: camelCase element style, e.g. 'fontSize'
    * string value optionnal : the new value
    */
    var CCSstyle = undefined, rules;
    
    rules = document.styleSheets[stylesheet][document.all ? 'rules' : 'cssRules'];
    for(var n in rules){
        if(rules[n].selectorText == selectorText){
            CCSstyle = rules[n].style;
            break;
        }
    }
    
    if(value == undefined)
        return CCSstyle[style]
    else
        return CCSstyle[style] = value
}

function addSvg(paths) {
    return c.pathsToSvg(paths);
}

function addText(text) {
    return "<span>" + text + "</span>";
}

function parseWord(word) {
    var punctuation = {
        ".":"。",
        ",":"，",
        "!":"！",
        "?":"？",
        "-":"-",
        "s":"⠁",
    };
    
    if (word == "")
        return "";
    
    if (word[0] == "'") {
        return addText(word.substring(1));
    } else if (word.length == 1 && punctuation[word[0]] !== undefined) {
        return addText(punctuation[word[0]]);
    }
    
    var final = "";
    
    var info = word.split(";");
    
    var radicals = info[0].split("'");
    
    var compounds = [];
    radicals.forEach(function (r) {
        var components = r.split(",");
        var p;
        if (components.length == 2) {
            p = c.textCompound(components[0], components[1]);
        } else {
            p = c.textLarge(components[0]);
        }
        
        if (radicals.length == 1) {
            p = c.createSmaller(p,
                components.length == 1 && info.length == 1 ? 0.6 : 0.8);
        }
        compounds.push(p);
    });
    
    if (compounds.length == 1) {
        final = compounds[0];
    } else if (compounds.length >= 2) {
        final = c.createSplit(compounds[0], compounds[1]);
    }
    
    if (info.length == 2) {
        markers = info[1].split(",");
        if (markers[0] != '')
            final = c.addBottomMarker(final, c.textMarkerBottom(markers[0]));
        if (markers.length == 2) {
            if (markers[1] != '')
                final = c.addTopMarker(final, c.textMarkerBottom(markers[1]));
        }
    }
    
    return addSvg([c.roundPath(final, 0.25)]);
}

var cached_words = {};

function inputChanged() {
    var finalHTML = "";
    
    character_input.value.split("\n").forEach(function (l) {
        l.split(" ").forEach(function (w) {
            var parsed_word = '';
            if (cached_words[w] == undefined) {
                parsed_word = parseWord(w);
                cached_words[w] = parsed_word;
            } else {
                parsed_word = cached_words[w];
            }
                
            if (parsed_word != '')
                finalHTML += parsed_word;
        });
        finalHTML += "<br>";
    });
    
    preview.innerHTML = finalHTML;
}

window.onload = function () {
    character_input.addEventListener("keyup", inputChanged);
    inputChanged();
    
    const updatePixelRatio = () => {
        let pr = window.devicePixelRatio;
        
        var stroke_width = 1/(window.devicePixelRatio || 1);
        CCSStylesheetRuleStyle(0, "path", "stroke-width", stroke_width.toString() + "px");
        
        matchMedia(`(resolution: ${pr}dppx)`).addEventListener("change", updatePixelRatio, { once: true })
    }

    updatePixelRatio();
    
};

},{"./character":2}],4:[function(require,module,exports){
module.exports={
    "radicals":{
        "n":{
            "large":"M 0 10 L 0 0 L 10 0",
            "small":"M 0 10 L 0 0 L 10 0"
        },
        "t":{
            "large":"M 5 10 L 5 0 M 0 0 L 10 0",
            "small":"M 0 5 L 10 5"
        },
        "s":{
            "large":"M 0 0 L 10 0 Q 10 8 0 10",
            "small":"M 0 0 L 10 0 L 10 10"
        },
        "r":{
            "large":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8",
            "small":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 10 L 10 10"
        },
        "d":{
            "large":"M 0.5 0 L 10 0 Q 10 8 0 10 M -0.5 1.5 L 1.5 -1.5",
            "small":"M 0 10 L 0 0 M 0 5 L 10 5 L 10 10"
        },
        "l":{
            "large":"M 5 10 L 5 0",
            "small":"M 2 8 L 8 2"
        },
        "c":{
            "large":"M 5 10 L 5 0 M 0 0 L 10 0 M 0 10 L 10 10",
            "small":"M 5 10 L 5 0 M 0 0 L 10 0 M 0 10 L 10 10"
        },
        "m":{
            "large":"M 6 6 L 2 6 M 2 6 L 8 0 M 2 10 L 8 4 M 2 10 L 10 10",
            "small":"M 9 0 L 1 5 L 9 10"
        },
        "v":{
            "large":"M 0 0 L 10 0 Q 10 5 0 5 M 5 4.5 L 5 10",
            "small":"M 0 1 L 5 9 L 10 1"
        },
        "b":{
            "large":"M 0 10 L 0 0 L 10 0 L 10 10",
            "small":"M 0 2 L 3 8 M 10 2 L 7 8"
        },
        "f":{
            "large":"M 5 10 L 5 0 L 10 0 M 0 5 L 10 5",
            "small":"M 0 10 L 10 10 M 5 10 L 5 0 L 10 0"
        },
        "g":{
            "large":"M 0 5 L 10 5 M 5 0 L 5 10 M 0 10 L 10 10",
            "small":"M 5 10 L 5 0 M 0 10 L 10 10"
        },
        "h":{
            "large":"M 0 5 L 10 5 M 5 0 L 5 10",
            "small":"M 0 5 L 10 5 M 5 0 L 5 10"
        },
        "x":{
            "large":"M 0 0 L 10 10 M 10 0 L 0 10",
            "small":"M 0 0 L 10 10 M 10 0 L 0 10"
        },
        "p":{
            "large":"M 5 0 L 5 5 Q 5 10 1 10",
            "small":"M 2 2 L 8 8"
        },
        "q":{
            "large":"M 0 3 L 10 3 M 5 0 L 5 10 M 0 7 L 10 7",
            "small":"M 0 3 L 10 3 M 0 7 L 10 7"
        },
        "j":{
            "large":"M 0 0 L 0 10 M 0 5 L 10 5",
            "small":"M 0 0 L 0 10 M 0 5 L 10 5"
        },
        "th":{
            "large":"M 0 0 L 10 0 M 5 0 L 5 10 M 5 5 L 8 5",
            "small":"M 0 0 L 10 0 M 5 0 L 5 10 M 5 5 L 8 5"
        },
        "sh":{
            "large":"M 0 0 L 10 0 M 5 0 Q 5 8 0 10",
            "small":"M 5 10 L 5 0 M 0 0 L 10 0"
        },
        "ch":{
            "large-comment":"M 5 10 L 5 0 M 0 0 L 10 0 M 0 10 L 10 10 M 7.5 10 L 7.5 7",
            "large":"M 5 10 L 5 0 M 0 0 L 10 0 M 10 0 L 10 10",
            "small":"M 5 10 L 5 0 M 0 0 L 10 0 M 10 0 L 10 10"
        }
    },
    "combos": {
        "th,r": {
            "default":"M 0 4 L 10 4 M 5 4 L 5 10 M 5 7 L 8 7 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "t,r": {
            "default":"M 0 4 L 10 4 M 5 4 L 5 10 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "t,c": {
            "default":"M 0 4 L 10 4 M 5 0 L 5 10 M 1 0 L 9 0"
        },
        "v,r": {
            "default":"M 0 4 L 10 4 Q 10 8 0 8 M 5 7.5 L 5 10 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "v,c": {
            "default":"M 0 3 L 10 3 Q 10 7 0 8 M 5 7 L 5 10 M 1 0 L 9 0 M 5 3 L 5 0"
        }
    },
    "markers": {
        "ay":{
            "bottom":"M 1.5 0 L 0 2 M 8.5 0 L 10 2 M 3 0 L 3 2 L 7 2 L 7 0"
        },
        "ah":{
            "bottom":"M 2 0 L 0.5 2 M 8 0 L 9.5 2 M 5 0 L 5 2"
        },
        "oo": {
            "bottom":"M 1.5 0 L 0 2 M 8.5 0 L 10 2 M 3 0 L 3 2 L 7 2 L 7 0 M 5 -0.5 L 5 1.5"
        },
        "ow":{
            "bottom":"M 2 0 L 0.5 2 M 8 0 L 9.5 2 M 4 0 L 4 2 M 6 0 L 6 2"
        },
        "oh":{
            "bottom":"M 0 1 L 4 1 M 6 1 L 10 1"
        },
        "ih":{
            "bottom":"M 4 0 L 2 2 M 6 0 L 8 2"
        },
        "ai":{
            "bottom":"M 5 0 L 5 2"
        },
        "eh":{
            "bottom":"M 2 0 L 5 1.5 M 8.5 0 L 10 2 M 0 0 L 0 2 L 7 2 L 7 0"
        },
        "ee":{
            "bottom":"M 1 0 L 3 1.5 M 4 0 L 6 1.5 M 8.5 0 L 10 2 M 0 0 L 0 2 L 7 2 L 7 0"
        },
        "uh":{
            "bottom":"M 0 1 L 10 1"
        }
    }
}

},{}]},{},[3]);
