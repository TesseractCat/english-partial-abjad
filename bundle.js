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

function createCompound(large, small, touching) {
    /*return mergePaths(
        translatePath(scalePath(large, 1.0, 0.55), 0.0, 4.5),
        translatePath(scalePath(small, 0.9, 0.3), 0.5, 0.0)
    );*/
    return mergePaths(
        translatePath(
            scalePath(large, 1.0, touching ? 0.65 : 0.55), 0.0,
            touching ? 3.5 : 4.5),
        translatePath(scalePath(small, 0.9, 0.3), 0.5, 0.0)
    );
}
function createCompoundInverse(large, small) {
    return mergePaths(
        translatePath(scalePath(large, 1.0, 0.65), 0.0, 0),
        translatePath(scalePath(small, 0.9, 0.3), 0.5, 7.5)
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
function addModifier(path, modifier) {
    return mergePaths(
        path,
        data.modifiers[modifier]
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
    
    var easy_combo = data.easy_combos.includes(large + "," + small);
    
    return createCompound(textLarge(large), textSmall(small), easy_combo);
}

function pathToSvg(path) {
    //let svgStyle = "fill:none; stroke:#000; stroke-linecap: square; stroke-linejoin: round;"
    let svgStyle = " ";
    return "<path d='" + path + "' style='" + svgStyle + "' />";
}
function pathsToSvg(pathArr, style) {
    style = style || '';
    let svgOut =
        "<svg viewBox='-1 -1 12 12' xmlns='http://www.w3.org/2000/svg' style='" + style + "'>";
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
    createCompoundInverse,
    createSmaller,
    createSplit,
    
    textMarkerBottom,
    addBottomMarker,
    addTopMarker,
    addModifier,
    
    textLarge,
    textSmall,
    textCompound,
    
    pathToSvg,
    pathsToSvg
}

},{"./radicals.json":5,"fs":1}],3:[function(require,module,exports){
module.exports={
    "the":"th",
    "of":"f",
    "to":"t",
    "and":"n,d",
    "a":"",
    "in":"n",
    "is":"b",
    "it":"t;,ih",
    "you":"",
    "that":"th,t",
    "he":"h;ee",
    "was":"b",
    "for":"f",
    "on":"n;,ah",
    "are":"b",
    "with":"v'th",
    "as":"s;,ah",
    "I":"",
    "his":"h's",
    "they":"th;ay",
    "be":"b",
    "at":"t;,ah",
    "one":"",
    "have":"h'v;ah",
    "this":"th,s",
    "from":"f,r'm;uh",
    "or":"r",
    "had":"h,d",
    "by":"b;ai",
    "hot":"h't;ah",
    "but":"b,t",
    "some":"s,m",
    "what":"v,t;ah",
    "there":"th,r",
    "we":"v;ee",
    "can":"c,n",
    "out":"t;,ow",
    "other":"th,r;,uh",
    "were":"v'r;eh",
    "all":"l;,ah",
    "your":"",
    "when":"v'n;eh",
    "up":"p;,uh",
    "use":"s;,oo",
    "word":"v'r,d;ih",
    "how":"h;ow",
    "said":"s'd;eh",
    "an":"n;,ah",
    "each":"ch;,ee",
    "she":"sh;ee",
    "which":"v'ch;ih",
    "do":"d",
    "their":"th'r",
    "time":"t'm;ai",
    "if":"f;,ih",
    "will":"v'l;ih",
    "way":"v;ay",
    "about":"b't;ow,ah",
    "many":"m,n;ay",
    "then":"th,n",
    "them":"th,m",
    "would":"v'd;uh",
    "write":"r't;ai",
    "like":"l'c;ai",
    "so":"s;oh",
    "these":"th's;ee",
    "her":"h,r",
    "long":"l'n,g;oh",
    "make":"m'c;ay",
    "thing":"th'n,g;ee",
    "see":"s;ee",
    "him":"h'm",
    "two":"",
    "has":"h's;ah",
    "look":"l'c;uh",
    "more":"m'r;oh",
    "day":"d;ay",
    "could":"c,d",
    "go":"g",
    "come":"c'm;uh",
    "did":"d,d",
    "my":"m;ai",
    "sound":"s'n,d;ow",
    "no":"n;oh",
    "most":"m's,t;oh",
    "number":"n,m'b,r",
    "who":"h;oo",
    "over":"v,r;,oh",
    "know":"n;oh",
    "water":"v't,r;ah",
    "than":"th,n",
    "call":"c'l;ah",
    "first":"f,r's,t",
    "people":"p'p,l;ee",
    "may":"m;ay",
    "down":"d'n;ow",
    "side":"s'd;ai",
    "been":"b'n;eh",
    "now":"n;ow",
    "find":"f'n,d;ai",
    "any":"n;ee,ah",
    "new":"n;oo",
    "work":"v'r,c;ih",
    "part":"p'r,t;ah",
    "take":"t'c;ay",
    "get":"g,t",
    "place":"p,l's;ay",
    "made":"m'd;ay",
    "live":"l,v",
    "where":"v'r;eh",
    "after":"f,t'r;,ah",
    "back":"b'c;ah",
    "little":"l,t'l",
    "only":"n,l;ay,oh",
    "round":"r'n,d;ow",
    "man":"m'n;ah",
    "year":"",
    "came":"c'm;ay",
    "show":"sh;ow",
    "every":"v,r;ay,eh",
    "good":"g'd;uh",
    "me":"m;ee",
    "give":"g,v",
    "our":"r;,ow",
    "under":"n,d'r;,uh",
    "name":"n'm;ay",
    "very":"v,r;ay",
    "through":"th,r;oo",
    "just":"j,s't",
    "form":"f'r,m;oh",
    "much":"m,ch",
    "great":"g,r't;ay",
    "think":"th,n'c",
    "say":"s;ay",
    "help":"h'l,p;eh",
    "low":"l;ow",
    "line":"l'n;ai",
    "before":"b'f,r;ee",
    "turn":"t,r'n",
    "cause":"c,s",
    "same":"s'm;ay",
    "mean":"m'n;ee",
    "differ":"d,f'f,r",
    "move":"m'v;oo",
    "right":"r't;ai",
    "boy":"",
    "old":"l,d;,oh",
    "too":"t;oo",
    "does":"d's;uh",
    "tell":"t'l",
    "sentence":"s,t'n,s",
    "set":"s't;eh",
    "three":"th,r;ee",
    "want":"v'n,t;ah",
    "air":"r;,ah",
    "well":"v'l;eh",
    "also":"l,s;oh,ah",
    "play":"p,l;ay",
    "small":"s,m'l",
    "end":"n,d;,eh",
    "put":"p't;uh",
    "home":"h'm;oh",
    "read":"r'd;ee",
    "hand":"h'n,d;ah",
    "port":"p'r,t;oh",
    "large":"l'r,j",
    "spell":"s,p'l;eh",
    "add":"d;,ah",
    "even":"v,n;,ee",
    "land":"l'n,d;ah",
    "here":"h'r;ee",
    "must":"m's,t;uh",
    "big":"b,g",
    "high":"h;ai",
    "such":"s,ch",
    "follow":"f,l;ow",
    "act":"c,t;,ah",
    "why":"v;ai",
    "ask":"s,c;,ah",
    "men":"m'n;eh",
    "change":"ch,n'j",
    "went":"v,n't",
    "light":"l't;ai",
    "kind":"c'n,d;ai",
    "off":"f;,ah",
    "need":"n'd;ee",
    "house":"h's;ow",
    "picture":"p,c'ch,r",
    "try":"t,r;ai",
    "us":"s;,uh",
    "again":"g,n;,ah",
    "animal":"n,m'l;,ah",
    "point":"p,n't",
    "mother":"m'th,r;uh",
    "world":"v,r'l,d",
    "near":"n'r;ee",
    "build":"b'l,d;ih",
    "self":"s'l,f;eh",
    "earth":"r,th;,eh",
    "father":"f,th'r",
    "head":"h,d",
    "stand":"s,t'n,d",
    "own":"n;,ow",
    "page":"p'j;ay",
    "should":"sh,d",
    "country":"c,n't,r",
    "found":"f'n,d;ow",
    "answer":"n's,r;,ah",
    "school":"s,c'l;oo",
    "grow":"g,r;ow",
    "study":"",
    "still":"",
    "learn":"",
    "plant":"",
    "cover":"",
    "food":"",
    "sun":"",
    "four":"",
    "thought":"",
    "let":"",
    "keep":"",
    "eye":"",
    "never":"",
    "last":"",
    "door":"",
    "between":"",
    "city":"",
    "tree":"",
    "cross":"",
    "since":"",
    "hard":"",
    "start":"",
    "might":"",
    "story":"",
    "saw":"",
    "far":"",
    "sea":"",
    "draw":"",
    "left":"",
    "late":"",
    "run":"",
    "don't":"",
    "while":"",
    "press":"",
    "close":"",
    "night":"",
    "real":"",
    "life":"",
    "few":"",
    "stop":"",
    "open":"",
    "seem":"",
    "together":"",
    "next":"",
    "white":"",
    "children":"",
    "begin":"",
    "got":"",
    "walk":"",
    "example":"",
    "ease":"",
    "paper":"",
    "often":"",
    "always":"",
    "music":"",
    "those":"",
    "both":"",
    "mark":"",
    "book":"",
    "letter":"",
    "until":"",
    "mile":"",
    "river":"",
    "car":"",
    "feet":"",
    "care":"",
    "second":"",
    "group":"",
    "carry":"",
    "took":"",
    "rain":"",
    "eat":"",
    "room":"",
    "friend":"",
    "began":"",
    "idea":"",
    "fish":"",
    "mountain":"",
    "north":"",
    "once":"",
    "base":"",
    "hear":"",
    "horse":"",
    "cut":"",
    "sure":"",
    "watch":"",
    "color":"",
    "face":"",
    "wood":"",
    "main":"",
    "enough":"",
    "plain":"",
    "girl":"",
    "usual":"",
    "young":"",
    "ready":"",
    "above":"",
    "ever":"",
    "red":"",
    "list":"",
    "though":"",
    "feel":"",
    "talk":"",
    "bird":"",
    "soon":"",
    "body":"",
    "dog":"",
    "family":"",
    "direct":"",
    "pose":"",
    "leave":"",
    "song":"",
    "measure":"",
    "state":"",
    "product":"",
    "black":"",
    "short":"",
    "numeral":"",
    "class":"",
    "wind":"",
    "question":"",
    "happen":"",
    "complete":"",
    "ship":"",
    "area":"",
    "half":"",
    "rock":"",
    "order":"",
    "fire":"",
    "south":"",
    "problem":"",
    "piece":"",
    "told":"",
    "knew":"",
    "pass":"",
    "farm":"",
    "top":"",
    "whole":"",
    "king":"",
    "size":"",
    "heard":"",
    "best":"",
    "hour":"",
    "better":"",
    "TRUE":"",
    "during":"",
    "hundred":"",
    "am":"",
    "remember":"",
    "step":"",
    "early":"",
    "hold":"",
    "west":"",
    "ground":"",
    "interest":"",
    "reach":"",
    "fast":"",
    "five":"",
    "sing":"",
    "listen":"",
    "six":"",
    "table":"",
    "travel":"",
    "less":"",
    "morning":"",
    "ten":"",
    "simple":"",
    "several":"",
    "vowel":"",
    "toward":"",
    "war":"",
    "lay":"",
    "against":"",
    "pattern":"",
    "slow":"",
    "center":"",
    "love":"",
    "person":"",
    "money":"",
    "serve":"",
    "appear":"",
    "road":"",
    "map":"",
    "science":"",
    "rule":"",
    "govern":"",
    "pull":"",
    "cold":"",
    "notice":"",
    "voice":"",
    "fall":"",
    "power":"",
    "town":"",
    "fine":"",
    "certain":"",
    "fly":"",
    "unit":"",
    "lead":"",
    "cry":"",
    "dark":"",
    "machine":"",
    "note":"",
    "wait":"",
    "plan":"",
    "figure":"",
    "star":"",
    "box":"",
    "noun":"",
    "field":"",
    "rest":"",
    "correct":"",
    "able":"",
    "pound":"",
    "done":"",
    "beauty":"",
    "drive":"",
    "stood":"",
    "contain":"",
    "front":"",
    "teach":"",
    "week":"",
    "final":"",
    "gave":"",
    "green":"",
    "oh":"",
    "quick":"",
    "develop":"",
    "sleep":"",
    "warm":"",
    "free":"",
    "minute":"",
    "strong":"",
    "special":"",
    "mind":"",
    "behind":"",
    "clear":"",
    "tail":"",
    "produce":"",
    "fact":"",
    "street":"",
    "inch":"",
    "lot":"",
    "nothing":"",
    "course":"",
    "stay":"",
    "wheel":"",
    "full":"",
    "force":"",
    "blue":"",
    "object":"",
    "decide":"",
    "surface":"",
    "deep":"",
    "moon":"",
    "island":"",
    "foot":"",
    "yet":"",
    "busy":"",
    "test":"",
    "record":"",
    "boat":"",
    "common":"",
    "gold":"",
    "possible":"",
    "plane":"",
    "age":"",
    "dry":"",
    "wonder":"",
    "laugh":"",
    "thousand":"",
    "ago":"",
    "ran":"",
    "check":"",
    "game":"",
    "shape":"",
    "yes":"j's;eh",
    "hot":"h't;ah",
    "miss":"m's;ih",
    "brought":"b,r't;ah",
    "heat":"h't;ee",
    "snow":"s,n;ow",
    "bed":"",
    "bring":"",
    "sit":"",
    "perhaps":"",
    "fill":"",
    "east":"",
    "weight":"",
    "language":"",
    "among":""
}

},{}],4:[function(require,module,exports){
const c = require('./character');
const dictionary = require('./common');

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

function addSvg(paths, style) {
    return c.pathsToSvg(paths, style);
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
        //"s":"⠁",
    };
    
    if (word == "")
        return "";
    
    if (word[0] == "'") {
        return addText(word.substring(1));
    } else if (word.length == 1 && punctuation[word[0]] !== undefined) {
        return addText(punctuation[word[0]]);
    }
    
    var final = "";
    var style = "";
    
    var info = word.split(";");
    
    var radicals = info[0].split("'");
    
    var compounds = [];
    radicals.forEach(function (r) {
        var components = r.split(",");
        var p;
        if (components.length == 3) {
            p = c.textCompound(components[0], components[1]);
            p = c.createCompoundInverse(p, c.textSmall(components[2]));
        } else if (components.length == 2) {
            p = c.textCompound(components[0], components[1]);
        } else if (components.length == 1) {
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
    
    var to_add_modifiers = [];
    if (info.length == 2) {
        markers = info[1].split(",");
        if (markers[0] != '') {
            if (markers[0].startsWith('.')) {
                to_add_modifiers.push("bottomLast");
                style += "margin-right: 5px;";
                markers[0] = markers[0].substring(1);
            }
            final = c.addBottomMarker(final, c.textMarkerBottom(markers[0]));
        }
        if (markers.length == 2) {
            if (markers[1].startsWith('.')) {
                to_add_modifiers.push("topLast");
                style += "margin-right: 5px;";
                markers[1] = markers[1].substring(1);
            }
            if (markers[1] != '') {
                final = c.addTopMarker(final, c.textMarkerBottom(markers[1]));
            }
        }
    }
    
    to_add_modifiers.forEach(function (m) {
        final = c.addModifier(final, m);
    });
    
    return addSvg([c.roundPath(final, 0.25)], style);
}

var cached_words = {};

function inputChanged() {
    var finalHTML = "";
    
    character_input.value.split("\n").forEach(function (l) {
        l.split(" ").forEach(function (w) {
            if (dictionary[w] != undefined)
                w = dictionary[w];
            
            var parsed_word = '';
            if (cached_words[w] == undefined) {
                try {
                    parsed_word = parseWord(w);
                    cached_words[w] = parsed_word;
                } catch (err) {
                    return;
                }
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

},{"./character":2,"./common":3}],5:[function(require,module,exports){
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
            "large":"M 0.5 0 L 10 0 Q 10 8 0 10 M -1 3 Q 1 0 1 -3",
            "small":"M 0 10 L 0 0 M 0 5 L 10 5 L 10 12"
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
            "large-comment":"M 5.5 6 L 0.5 6 M 0.5 6 L 6.5 0 M 1.5 10 L 7.5 4 M 1.5 10 L 9.5 10",
            "small-comment":"M 9 0 L 1 5 L 9 10",
            "large":"M 5 10 L 5 0 M 0 0 L 10 0 M 0 0 L 0 10",
            "small":"M 5 10 L 5 0 M 0 0 L 10 0 M 0 0 L 0 10"
        },
        "v":{
            "large":"M 0 0 L 10 0 Q 10 5 0 5 M 5 4.5 L 5 10",
            "small":"M 0 1 L 5 9 L 10 1"
        },
        "b":{
            "large":"M 1 10 L 1 0 L 9 0 L 9 10",
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
            "large":"M 0 0 L 10 0 M 5 0 L 5 10 M 5 5 L 9 5",
            "small":"M 0 0 L 10 0 M 5 0 L 5 10 M 5 5 L 9 5"
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
            "default":"M 0 4 L 10 4 M 5 4 L 5 10 M 5 7 L 9 7 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "t,r": {
            "default":"M 0 4 L 10 4 M 5 4 L 5 10 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "t,c": {
            "default":"M 0 4 L 10 4 M 5 0 L 5 10 M 1 0 L 9 0"
        },
        "p,r": {
            "default":"M 5 0 L 5 5 Q 5 10 1 10 M 0 5 L 0 0 L 10 0 L 10 5 M 0 4 L 10 4"
        },
        "v,r": {
            "default":"M 0 4 L 10 4 Q 10 8 0 8 M 5 7.5 L 5 10 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "v,c": {
            "default":"M 0 3 L 10 3 Q 10 7 0 8 M 5 7 L 5 10 M 1 0 L 9 0 M 5 3 L 5 0"
        },
        "f,r": {
            "default":"M 5 10 L 5 2 L 10 2 M 0 7 L 10 7 M 0 4 L 0 0 L 10 0 L 10 4 L 0 4"
        },
        "r,c": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 0 2 L 10 2 M 5 2 L 5 6 M 0 6 L 10 6"
        },
        "r,n": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 5 8 L 5 3 L 10 3"
        },
        "r,s": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 5 8 L 5 3 L 0 3"
        },
        "r,d": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 3 4 L 7 4 M 3 2 L 3 6 M 7 4 L 7 8"
        },
        "r,t": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 0 3 L 10 3 M 5 3 L 5 8"
        },
        "r,l": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 3 6 L 7 2"
        },
        "r,p": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 7 6 L 3 2"
        },
        "n,g": {
            "default":"M 0 10 L 0 4 L 10 4 M 5 4 L 5 0"
        },
        "n,d": {
            "default":"M 0 10 L 0 5 L 10 5 M 2 5 L 2 0 M 2 2.5 L 8 2.5 L 8 5"
        },
        "c,r": {
            "default":"M 5 10 L 5 4 M 0 4 L 10 4 M 0 10 L 10 10 M 1 4 L 1 0 L 9 0 L 9 4"
        },
        "b,r": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 2 8 L 2 2 L 8 2 L 8 8 L 2 8"
        },
        "b,l": {
            "default":"M 0 10 L 0 0 L 10 0 L 10 10 M 3 7 L 7 3"
        },
        "sh,n": {
            "default":"M 0 4 L 10 4 M 5 4 Q 5 8 0 10 M 1 0 L 9 0 L 9 4"
        },
        "l,n": {
            "default":"M 0 5 L 0 0 L 10 0 M 5 10 L 5 0"
        },
        "l,s": {
            "default":"M 10 5 L 10 0 L 0 0 M 5 10 L 5 0"
        }
    },
    "easy_combos":
        [ "s,n", "s,s", "c,n", "c,s", "t,n", "t,s", "l,f", "c,sh", "j,r", "l,r", "r,sh",
            "g,v", "j,n", "p,n", "p,s", "n,sh", "v,th", "d,s", "r,th", "m,p", "m,l", "g,f",
            "m,s", "m,n", "m,sh", "n,th", "g,r", "g,j", "j,s"],
    "markers": {
        "ay":{
            "bottom":"M 1.5 0 L 0 2 M 8.5 0 L 10 2 M 3 0 L 3 2 L 7 2 L 7 0"
        },
        "ah":{
            "bottom":"M 2 0 L 0.5 2 M 8 0 L 9.5 2 M 5 0 L 5 2"
        },
        "au":{
            "bottom":"M 1 0 L 1 2 L 9 2"
        },
        "oi":{
            "bottom":"M 2 0 L 0.5 2 M 8 0 L 9.5 2 M 4 0 L 4 2 M 6 0 L 6 2"
        },
        "oo": {
            "bottom":"M 1.5 0 L 0 2 M 8.5 0 L 10 2 M 3 0 L 3 2 L 7 2 L 7 0 M 5 -0.5 L 5 1.5"
        },
        "ow":{
            "bottom":"M 1 2 L 1 2 L 9 2 L 9 0"
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
            "bottom":"M 3.5 0 L 6.5 1.5 M 1 0 L 1 2 L 9 2 L 9 0"
        },
        "uh":{
            "bottom-comment":"M 1 0 L 3 1.5 M 4 0 L 6 1.5 M 8.5 0 L 10 2 M 0 0 L 0 2 L 7 2 L 7 0",
            "bottom":"M 1 0 L 1 2 L 9 2 L 9 0"
        },
        "ee":{
            "bottom":"M 0 1 L 10 1"
        },
        "#":{
            "bottom":"M 0 1 L 4 1 M 6 1 L 10 1 M 5 -1 L 5 3"
        }
    },
    "modifiers": {
        "plural": "M 11 2 L 11 3",
        "topLast": "M 11 1 L 13 1",
        "bottomLast": "M 11 9 L 13 9"
    }
}

},{}]},{},[4]);
