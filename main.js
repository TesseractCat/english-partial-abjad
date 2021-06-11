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
    preview.innerHTML += c.pathsToSvg(paths);
}

function addText(text) {
    preview.innerHTML += "<span>" + text + "</span>";
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
    
    if (word[0] == "'") {
        addText(word.substring(1));
        return;
    } else if (word.length == 1 && punctuation[word[0]] !== undefined) {
        addText(punctuation[word[0]]);
        return;
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
    
    addSvg([c.roundPath(final, 0.25)]);
    //addSvg([final]);
}

function inputChanged() {
    preview.innerHTML = "";
    
    character_input.value.split(" ").forEach(function (w) {
        parseWord(w);
    });
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
