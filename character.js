import data from "./radicals.json";

export function executeOnPoints(path, pointCallback) {
    return path.replace(/(-?[\d\.]+) (-?[\d\.]+)/gi, function (match, p1, p2) {
        let point = {x: parseFloat(p1), y: parseFloat(p2)};
        point = pointCallback(point);
        return point.x + " " + point.y;
    });
}

export function scalePath(path, sx, sy) {
    return executeOnPoints(path, function (p) {
        p.x = p.x * sx;
        p.y = p.y * sy;
        return p;
    });
}

export function roundPath(path, step) {
    step || (step = 1.0);
    var inv = 1/step;
    return executeOnPoints(path, function (p) {
        p.x = Math.round(p.x * inv)/inv;
        p.y = Math.round(p.y * inv)/inv;
        return p;
    });
}

export function translatePath(path, tx, ty) {
    return executeOnPoints(path, function (p) {
        p.x = p.x + tx;
        p.y = p.y + ty;
        return p;
    });
}

export function mergePaths(a, b) {
    return a + " " + b;
}

export function createCompound(large, small, touching) {
    return mergePaths(
        translatePath(
            scalePath(large, 1.0, touching ? 0.65 : 0.55), 0.0,
            touching ? 3.5 : 4.5),
        translatePath(scalePath(small, 0.9, 0.3), 0.5, 0.0)
    );
}
export function createCompoundInverse(large, small) {
    return mergePaths(
        translatePath(scalePath(large, 1.0, 0.65), 0.0, 0),
        translatePath(scalePath(small, 0.9, 0.3), 0.5, 7.5)
    );
}
export function createSplit(left, right) {
    return mergePaths(
        scalePath(left, 0.45, 1.0),
        translatePath(scalePath(right, 0.4, 1.0), 6.00, 0.0)
    );
}
export function createSmaller(path, sf) {
    var t = (10 - (sf * 10)) / 2;
    return translatePath(scalePath(path, sf, sf), t, t);
}
export function addBottomMarker(path, marker) {
    return mergePaths(
        translatePath(scalePath(path, 0.9, 0.7), 0.5, 0.0),
        translatePath(scalePath(marker, 1.0, 1.0), 0.0, 8.25)
    );
}
export function addTopMarker(path, marker) {
    return mergePaths(
        translatePath(scalePath(path, 0.9, 0.7), 0.5, 3.0),
        translatePath(scalePath(marker, 1.0, 1.0), 0.0, 0.0)
    );
}
export function addModifier(path, modifier) {
    return mergePaths(
        path,
        data.modifiers[modifier]
    );
}

export function textMarkerBottom(text) {
    return data.markers[text].bottom;
}
export function textLarge(text) {
    return data.radicals[text].large;
}
export function textSmall(text) {
    return data.radicals[text].small;
}
export function textCompound(large, small) {
    if (data.combos[large + "," + small] != undefined)
        return data.combos[large + "," + small].default;
    
    var easy_combo = data.easy_combos.includes(large + "," + small);
    
    return createCompound(textLarge(large), textSmall(small), easy_combo);
}

export function pathToSvg(path) {
    //let svgStyle = "fill:none; stroke:#000; stroke-linecap: square; stroke-linejoin: round;"
    let svgStyle = " ";
    return "<path d='" + path + "' style='" + svgStyle + "' />";
}
export function pathsToSvg(pathArr, style) {
    style = style || '';
    let svgOut =
        "<svg viewBox='-1 -1 12 12' xmlns='http://www.w3.org/2000/svg' style='" + style + "'>";
    for (var i = 0; i < pathArr.length; i++) {
        svgOut += pathToSvg(pathArr[i]);
    }
    svgOut += "</svg>";
    return svgOut;
}
