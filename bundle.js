(() => {
  // radicals.json
  var radicals = {
    n: {
      large: "M 0 10 L 0 0 L 10 0",
      small: "M 0 10 L 0 0 L 10 0"
    },
    t: {
      large: "M 5 10 L 5 0 M 0 0 L 10 0",
      small: "M 0 5 L 10 5"
    },
    s: {
      large: "M 0 0 L 10 0 Q 10 8 0 10",
      small: "M 0 0 L 10 0 L 10 10"
    },
    r: {
      large: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8",
      small: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 10 L 10 10"
    },
    d: {
      large: "M 0.5 0 L 10 0 Q 10 8 0 10 M -1 3 Q 1 0 1 -3",
      small: "M 0 10 L 0 0 M 0 5 L 10 5 L 10 12"
    },
    l: {
      large: "M 5 10 L 5 0",
      small: "M 2 8 L 8 2"
    },
    c: {
      large: "M 5 10 L 5 0 M 0 0 L 10 0 M 0 10 L 10 10",
      small: "M 5 10 L 5 0 M 0 0 L 10 0 M 0 10 L 10 10"
    },
    m: {
      "large-comment": "M 5.5 6 L 0.5 6 M 0.5 6 L 6.5 0 M 1.5 10 L 7.5 4 M 1.5 10 L 9.5 10",
      "small-comment": "M 9 0 L 1 5 L 9 10",
      large: "M 5 10 L 5 0 M 0 0 L 10 0 M 0 0 L 0 10",
      small: "M 5 10 L 5 0 M 0 0 L 10 0 M 0 0 L 0 10"
    },
    v: {
      large: "M 0 0 L 10 0 Q 10 5 0 5 M 5 4.5 L 5 10",
      small: "M 0 1 L 5 9 L 10 1"
    },
    b: {
      large: "M 1 10 L 1 0 L 9 0 L 9 10",
      small: "M 0 2 L 3 8 M 10 2 L 7 8"
    },
    f: {
      large: "M 5 10 L 5 0 L 10 0 M 0 5 L 10 5",
      small: "M 0 10 L 10 10 M 5 10 L 5 0 L 10 0"
    },
    g: {
      large: "M 0 5 L 10 5 M 5 0 L 5 10 M 0 10 L 10 10",
      small: "M 5 10 L 5 0 M 0 10 L 10 10"
    },
    h: {
      large: "M 0 5 L 10 5 M 5 0 L 5 10",
      small: "M 0 5 L 10 5 M 5 0 L 5 10"
    },
    x: {
      large: "M 0 0 L 10 10 M 10 0 L 0 10",
      small: "M 0 0 L 10 10 M 10 0 L 0 10"
    },
    p: {
      large: "M 5 0 L 5 5 Q 5 10 1 10",
      small: "M 2 2 L 8 8"
    },
    q: {
      large: "M 0 3 L 10 3 M 5 0 L 5 10 M 0 7 L 10 7",
      small: "M 0 3 L 10 3 M 0 7 L 10 7"
    },
    j: {
      large: "M 0 0 L 0 10 M 0 5 L 10 5",
      small: "M 0 0 L 0 10 M 0 5 L 10 5"
    },
    th: {
      large: "M 0 0 L 10 0 M 5 0 L 5 10 M 5 5 L 9 5",
      small: "M 0 0 L 10 0 M 5 0 L 5 10 M 5 5 L 9 5"
    },
    sh: {
      large: "M 0 0 L 10 0 M 5 0 Q 5 8 0 10",
      small: "M 5 10 L 5 0 M 0 0 L 10 0"
    },
    ch: {
      "large-comment": "M 5 10 L 5 0 M 0 0 L 10 0 M 0 10 L 10 10 M 7.5 10 L 7.5 7",
      large: "M 5 10 L 5 0 M 0 0 L 10 0 M 10 0 L 10 10",
      small: "M 5 10 L 5 0 M 0 0 L 10 0 M 10 0 L 10 10"
    }
  };
  var combos = {
    "th,r": {
      default: "M 0 4 L 10 4 M 5 4 L 5 10 M 5 7 L 9 7 M 1 4 L 1 0 L 9 0 L 9 4"
    },
    "t,r": {
      default: "M 0 4 L 10 4 M 5 4 L 5 10 M 1 4 L 1 0 L 9 0 L 9 4"
    },
    "t,c": {
      default: "M 0 4 L 10 4 M 5 0 L 5 10 M 1 0 L 9 0"
    },
    "p,r": {
      default: "M 5 0 L 5 5 Q 5 10 1 10 M 0 5 L 0 0 L 10 0 L 10 5 M 0 4 L 10 4"
    },
    "v,r": {
      default: "M 0 4 L 10 4 Q 10 8 0 8 M 5 7.5 L 5 10 M 1 4 L 1 0 L 9 0 L 9 4"
    },
    "v,c": {
      default: "M 0 3 L 10 3 Q 10 7 0 8 M 5 7 L 5 10 M 1 0 L 9 0 M 5 3 L 5 0"
    },
    "f,r": {
      default: "M 5 10 L 5 2 L 10 2 M 0 7 L 10 7 M 0 4 L 0 0 L 10 0 L 10 4 L 0 4"
    },
    "r,c": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 0 2 L 10 2 M 5 2 L 5 6 M 0 6 L 10 6"
    },
    "r,n": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 5 8 L 5 3 L 10 3"
    },
    "r,s": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 5 8 L 5 3 L 0 3"
    },
    "r,d": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 3 4 L 7 4 M 3 2 L 3 6 M 7 4 L 7 8"
    },
    "r,t": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 0 3 L 10 3 M 5 3 L 5 8"
    },
    "r,l": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 3 6 L 7 2"
    },
    "r,p": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 0 8 L 10 8 M 7 6 L 3 2"
    },
    "n,g": {
      default: "M 0 10 L 0 4 L 10 4 M 5 4 L 5 0"
    },
    "n,d": {
      default: "M 0 10 L 0 5 L 10 5 M 2 5 L 2 0 M 2 2.5 L 8 2.5 L 8 5"
    },
    "n,s": {
      default: "M 0 4 L 10 4 M 1 0 L 9 0 L 9 4 M 0 10 L 0 4"
    },
    "n,n": {
      default: "M 0 4 L 10 4 M 9 0 L 1 0 L 1 4 M 0 10 L 0 4"
    },
    "c,r": {
      default: "M 5 10 L 5 4 M 0 4 L 10 4 M 0 10 L 10 10 M 1 4 L 1 0 L 9 0 L 9 4"
    },
    "b,r": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 2 8 L 2 2 L 8 2 L 8 8 L 2 8"
    },
    "b,l": {
      default: "M 0 10 L 0 0 L 10 0 L 10 10 M 3 7 L 7 3"
    },
    "sh,s": {
      default: "M 0 4 L 10 4 M 5 4 Q 5 8 0 10 M 1 0 L 9 0 L 9 4"
    },
    "sh,n": {
      default: "M 0 4 L 10 4 M 5 4 Q 5 8 0 10 M 9 0 L 1 0 L 1 4"
    },
    "l,n": {
      default: "M 0 5 L 0 0 L 10 0 M 5 10 L 5 0"
    },
    "l,s": {
      default: "M 10 5 L 10 0 L 0 0 M 5 10 L 5 0"
    }
  };
  var easy_combos = [
    "s,n",
    "s,s",
    "c,n",
    "c,s",
    "t,n",
    "t,s",
    "l,f",
    "c,sh",
    "j,r",
    "l,r",
    "r,sh",
    "g,v",
    "j,n",
    "p,n",
    "p,s",
    "n,sh",
    "v,th",
    "d,s",
    "r,th",
    "m,p",
    "m,l",
    "g,f",
    "m,s",
    "m,n",
    "m,sh",
    "n,th",
    "g,r",
    "g,j",
    "j,s"
  ];
  var markers2 = {
    ai: {
      bottom: "M 5 0 L 5 2"
    },
    ih: {
      bottom: "M 4 0 L 2 2 M 6 0 L 8 2"
    },
    ah: {
      bottom: "M 2 0 L 0.5 2 M 8 0 L 9.5 2 M 5 0 L 5 2"
    },
    oi: {
      bottom: "M 2 0 L 0.5 2 M 8 0 L 9.5 2 M 4 0 L 4 2 M 6 0 L 6 2"
    },
    uh: {
      "bottom-comment": "M 1 0 L 3 1.5 M 4 0 L 6 1.5 M 8.5 0 L 10 2 M 0 0 L 0 2 L 7 2 L 7 0",
      bottom: "M 1 0 L 1 2 L 9 2 L 9 0"
    },
    eh: {
      bottom: "M 3.5 0 L 6.5 1.5 M 1 0 L 1 2 L 9 2 L 9 0"
    },
    ay: {
      bottom: "M 1.5 0 L 0 2 M 8.5 0 L 10 2 M 3 0 L 3 2 L 7 2 L 7 0"
    },
    oo: {
      bottom: "M 1.5 0 L 0 2 M 8.5 0 L 10 2 M 3 0 L 3 2 L 7 2 L 7 0 M 5 -0.5 L 5 1.5"
    },
    au: {
      bottom: "M 1 0 L 1 2 L 9 2"
    },
    ow: {
      bottom: "M 1 2 L 1 2 L 9 2 L 9 0"
    },
    ee: {
      bottom: "M 0 1 L 10 1"
    },
    oh: {
      bottom: "M 0 1 L 4 1 M 6 1 L 10 1"
    },
    "#": {
      bottom: "M 0 1 L 4 1 M 6 1 L 10 1 M 5 -1 L 5 3"
    }
  };
  var modifiers = {
    plural: "M 11 2 L 11 3",
    topLast: "M 11 1 L 13 1",
    bottomLast: "M 11 9 L 13 9"
  };
  var radicals_default = {
    radicals,
    combos,
    easy_combos,
    markers: markers2,
    modifiers
  };

  // character.js
  function executeOnPoints(path, pointCallback) {
    return path.replace(/(-?[\d\.]+) (-?[\d\.]+)/gi, function(match, p1, p2) {
      let point2 = { x: parseFloat(p1), y: parseFloat(p2) };
      point2 = pointCallback(point2);
      return point2.x + " " + point2.y;
    });
  }
  function scalePath(path, sx, sy) {
    return executeOnPoints(path, function(p) {
      p.x = p.x * sx;
      p.y = p.y * sy;
      return p;
    });
  }
  function roundPath(path, step2) {
    step2 || (step2 = 1);
    var inv = 1 / step2;
    return executeOnPoints(path, function(p) {
      p.x = Math.round(p.x * inv) / inv;
      p.y = Math.round(p.y * inv) / inv;
      return p;
    });
  }
  function translatePath(path, tx, ty) {
    return executeOnPoints(path, function(p) {
      p.x = p.x + tx;
      p.y = p.y + ty;
      return p;
    });
  }
  function mergePaths(a2, b) {
    return a2 + " " + b;
  }
  function createCompound(large2, small2, touching) {
    return mergePaths(translatePath(scalePath(large2, 1, touching ? 0.65 : 0.55), 0, touching ? 3.5 : 4.5), translatePath(scalePath(small2, 0.9, 0.3), 0.5, 0));
  }
  function createCompoundInverse(large2, small2) {
    return mergePaths(translatePath(scalePath(large2, 1, 0.65), 0, 0), translatePath(scalePath(small2, 0.9, 0.3), 0.5, 7.5));
  }
  function createSplit(left2, right2) {
    return mergePaths(scalePath(left2, 0.45, 1), translatePath(scalePath(right2, 0.4, 1), 6, 0));
  }
  function createSmaller(path, sf) {
    var t = (10 - sf * 10) / 2;
    return translatePath(scalePath(path, sf, sf), t, t);
  }
  function addBottomMarker(path, marker) {
    return mergePaths(translatePath(scalePath(path, 0.9, 0.7), 0.5, 0), translatePath(scalePath(marker, 1, 1), 0, 8.25));
  }
  function addTopMarker(path, marker) {
    return mergePaths(translatePath(scalePath(path, 0.9, 0.7), 0.5, 3), translatePath(scalePath(marker, 1, 1), 0, 0));
  }
  function addModifier(path, modifier) {
    return mergePaths(path, radicals_default.modifiers[modifier]);
  }
  function textMarkerBottom(text) {
    return radicals_default.markers[text].bottom;
  }
  function textLarge(text) {
    return radicals_default.radicals[text].large;
  }
  function textSmall(text) {
    return radicals_default.radicals[text].small;
  }
  function textCompound(large2, small2) {
    if (radicals_default.combos[large2 + "," + small2] != void 0)
      return radicals_default.combos[large2 + "," + small2].default;
    var easy_combo = radicals_default.easy_combos.includes(large2 + "," + small2);
    return createCompound(textLarge(large2), textSmall(small2), easy_combo);
  }
  function pathToSvg(path) {
    let svgStyle = " ";
    return "<path d='" + path + "' style='" + svgStyle + "' />";
  }
  function pathsToSvg(pathArr, style) {
    style = style || "";
    let svgOut = "<svg viewBox='-1 -1 12 12' xmlns='http://www.w3.org/2000/svg' style='" + style + "'>";
    for (var i = 0; i < pathArr.length; i++) {
      svgOut += pathToSvg(pathArr[i]);
    }
    svgOut += "</svg>";
    return svgOut;
  }

  // common.json
  var the = "th";
  var of = "f";
  var to = "t";
  var and = "n,d";
  var a = "";
  var in2 = "n";
  var is = "b";
  var it = "t;,ih";
  var you = "";
  var that = "th,t";
  var he = "h;ee";
  var was = "b";
  var for2 = "f";
  var on = "n;,ah";
  var are = "b";
  var with2 = "v'th";
  var as = "s;,ah";
  var I = "";
  var his = "h's";
  var they = "th;ay";
  var be = "b";
  var at = "t;,ah";
  var one = "";
  var have = "h'v;ah";
  var this2 = "th,s";
  var from = "f,r'm;uh";
  var or = "r";
  var had = "h,d";
  var by = "b;ai";
  var hot = "h't;ah";
  var but = "b,t";
  var some = "s,m";
  var what = "v,t;ah";
  var there = "th,r";
  var we = "v;ee";
  var can = "c,n";
  var out = "t;,ow";
  var other = "th,r;,uh";
  var were = "v'r;eh";
  var all = "l;,ah";
  var your = "";
  var when = "v'n;eh";
  var up = "p;,uh";
  var use = "s;,oo";
  var word = "v'r,d;ih";
  var how = "h;ow";
  var said = "s'd;eh";
  var an = "n;,ah";
  var each = "ch;,ee";
  var she = "sh;ee";
  var which = "v'ch;ih";
  var do2 = "d";
  var their = "th'r";
  var time = "t'm;ai";
  var if2 = "f;,ih";
  var will = "v'l;ih";
  var way = "v;ay";
  var about = "b't;ow,ah";
  var many = "m,n;ay";
  var then = "th,n";
  var them = "th,m";
  var would = "v'd;uh";
  var write = "r't;ai";
  var like = "l'c;ai";
  var so = "s;oh";
  var these = "th's;ee";
  var her = "h,r";
  var long = "l'n,g;oh";
  var make = "m'c;ay";
  var thing = "th'n,g;ee";
  var see = "s;ee";
  var him = "h'm";
  var two = "";
  var has = "h's;ah";
  var look = "l'c;uh";
  var more = "m'r;oh";
  var day = "d;ay";
  var could = "c,d";
  var go = "g";
  var come = "c'm;uh";
  var did = "d,d";
  var my = "m;ai";
  var sound = "s'n,d;ow";
  var no = "n;oh";
  var most = "m's,t;oh";
  var number = "n,m'b,r";
  var who = "h;oo";
  var over = "v,r;,oh";
  var know = "n;oh";
  var water = "v't,r;ah";
  var than = "th,n";
  var call = "c'l;ah";
  var first = "f,r's,t";
  var people = "p'p,l;ee";
  var may = "m;ay";
  var down = "d'n;ow";
  var side = "s'd;ai";
  var been = "b'n;eh";
  var now = "n;ow";
  var find = "f'n,d;ai";
  var any = "n;ee,ah";
  var new2 = "n;oo";
  var work = "v'r,c;ih";
  var part = "p'r,t;ah";
  var take = "t'c;ay";
  var get = "g,t";
  var place = "p,l's;ay";
  var made = "m'd;ay";
  var live = "l,v";
  var where = "v'r;eh";
  var after = "f,t'r;,ah";
  var back = "b'c;ah";
  var little = "l,t'l";
  var only = "n,l;ay,oh";
  var round = "r'n,d;ow";
  var man = "m'n;ah";
  var year = "";
  var came = "c'm;ay";
  var show = "sh;ow";
  var every = "v,r;ay,eh";
  var good = "g'd;uh";
  var me = "m;ee";
  var give = "g,v";
  var our = "r;,ow";
  var under = "n,d'r;,uh";
  var name = "n'm;ay";
  var very = "v,r;ay";
  var through = "th,r;oo";
  var just = "j,s't";
  var form = "f'r,m;oh";
  var much = "m,ch";
  var great = "g,r't;ay";
  var think = "th,n'c";
  var say = "s;ay";
  var help = "h'l,p;eh";
  var low = "l;ow";
  var line = "l'n;ai";
  var before = "b'f,r;ee";
  var turn = "t,r'n";
  var cause = "c,s";
  var same = "s'm;ay";
  var mean = "m'n;ee";
  var differ = "d,f'f,r";
  var move = "m'v;oo";
  var right = "r't;ai";
  var boy = "";
  var old = "l,d;,oh";
  var too = "t;oo";
  var does = "d's;uh";
  var tell = "t'l";
  var sentence = "s,t'n,s";
  var set = "s't;eh";
  var three = "th,r;ee";
  var want = "v'n,t;ah";
  var air = "r;,ah";
  var well = "v'l;eh";
  var also = "l,s;oh,ah";
  var play = "p,l;ay";
  var small = "s,m'l";
  var end = "n,d;,eh";
  var put = "p't;uh";
  var home = "h'm;oh";
  var read = "r'd;ee";
  var hand = "h'n,d;ah";
  var port = "p'r,t;oh";
  var large = "l'r,j";
  var spell = "s,p'l;eh";
  var add = "d;,ah";
  var even = "v,n;,ee";
  var land = "l'n,d;ah";
  var here = "h'r;ee";
  var must = "m's,t;uh";
  var big = "b,g";
  var high = "h;ai";
  var such = "s,ch";
  var follow = "f,l;ow";
  var act = "c,t;,ah";
  var why = "v;ai";
  var ask = "s,c;,ah";
  var men = "m'n;eh";
  var change = "ch,n'j";
  var went = "v,n't";
  var light = "l't;ai";
  var kind = "c'n,d;ai";
  var off = "f;,ah";
  var need = "n'd;ee";
  var house = "h's;ow";
  var picture = "p,c'ch,r";
  var try2 = "t,r;ai";
  var us = "s;,uh";
  var again = "g,n;,ah";
  var animal = "n,m'l;,ah";
  var point = "p,n't";
  var mother = "m'th,r;uh";
  var world = "v,r'l,d";
  var near = "n'r;ee";
  var build = "b'l,d;ih";
  var self = "s'l,f;eh";
  var earth = "r,th;,eh";
  var father = "f,th'r";
  var head = "h,d";
  var stand = "s,t'n,d";
  var own = "n;,ow";
  var page = "p'j;ay";
  var should = "sh,d";
  var country = "c,n't,r";
  var found = "f'n,d;ow";
  var answer = "n's,r;,ah";
  var school = "s,c'l;oo";
  var grow = "g,r;ow";
  var study = "";
  var still = "";
  var learn = "";
  var plant = "";
  var cover = "";
  var food = "";
  var sun = "";
  var four = "";
  var thought = "";
  var let2 = "";
  var keep = "";
  var eye = "";
  var never = "";
  var last = "";
  var door = "";
  var between = "";
  var city = "";
  var tree = "";
  var cross = "";
  var since = "";
  var hard = "";
  var start = "";
  var might = "";
  var story = "";
  var saw = "";
  var far = "";
  var sea = "";
  var draw = "";
  var left = "";
  var late = "";
  var run = "";
  var don_t = "";
  var while2 = "";
  var press = "";
  var close = "";
  var night = "";
  var real = "";
  var life = "";
  var few = "";
  var stop = "";
  var open = "";
  var seem = "";
  var together = "";
  var next = "";
  var white = "";
  var children = "";
  var begin = "";
  var got = "";
  var walk = "";
  var example = "";
  var ease = "";
  var paper = "";
  var often = "";
  var always = "";
  var music = "";
  var those = "";
  var both = "";
  var mark = "";
  var book = "";
  var letter = "";
  var until = "";
  var mile = "";
  var river = "";
  var car = "";
  var feet = "";
  var care = "";
  var second = "";
  var group = "";
  var carry = "";
  var took = "";
  var rain = "";
  var eat = "";
  var room = "";
  var friend = "";
  var began = "";
  var idea = "";
  var fish = "";
  var mountain = "";
  var north = "";
  var once = "";
  var base = "";
  var hear = "";
  var horse = "";
  var cut = "";
  var sure = "";
  var watch = "";
  var color = "";
  var face = "";
  var wood = "";
  var main = "";
  var enough = "";
  var plain = "";
  var girl = "";
  var usual = "";
  var young = "";
  var ready = "";
  var above = "";
  var ever = "";
  var red = "";
  var list = "";
  var though = "";
  var feel = "";
  var talk = "";
  var bird = "";
  var soon = "";
  var body = "";
  var dog = "";
  var family = "";
  var direct = "";
  var pose = "";
  var leave = "";
  var song = "";
  var measure = "";
  var state = "";
  var product = "";
  var black = "";
  var short = "";
  var numeral = "";
  var class2 = "";
  var wind = "";
  var question = "";
  var happen = "";
  var complete = "";
  var ship = "";
  var area = "";
  var half = "";
  var rock = "";
  var order = "";
  var fire = "";
  var south = "";
  var problem = "";
  var piece = "";
  var told = "";
  var knew = "";
  var pass = "";
  var farm = "";
  var top = "";
  var whole = "";
  var king = "";
  var size = "";
  var heard = "";
  var best = "";
  var hour = "";
  var better = "";
  var TRUE = "";
  var during = "";
  var hundred = "";
  var am = "";
  var remember = "";
  var step = "";
  var early = "";
  var hold = "";
  var west = "";
  var ground = "";
  var interest = "";
  var reach = "";
  var fast = "";
  var five = "";
  var sing = "";
  var listen = "";
  var six = "";
  var table = "";
  var travel = "";
  var less = "";
  var morning = "";
  var ten = "";
  var simple = "";
  var several = "";
  var vowel = "";
  var toward = "";
  var war = "";
  var lay = "";
  var against = "";
  var pattern = "";
  var slow = "";
  var center = "";
  var love = "";
  var person = "";
  var money = "";
  var serve = "";
  var appear = "";
  var road = "";
  var map = "";
  var science = "";
  var rule = "";
  var govern = "";
  var pull = "";
  var cold = "";
  var notice = "";
  var voice = "";
  var fall = "";
  var power = "";
  var town = "";
  var fine = "";
  var certain = "";
  var fly = "";
  var unit = "";
  var lead = "";
  var cry = "";
  var dark = "";
  var machine = "";
  var note = "";
  var wait = "";
  var plan = "";
  var figure = "";
  var star = "";
  var box = "";
  var noun = "";
  var field = "";
  var rest = "";
  var correct = "";
  var able = "";
  var pound = "";
  var done = "";
  var beauty = "";
  var drive = "";
  var stood = "";
  var contain = "";
  var front = "";
  var teach = "";
  var week = "";
  var final = "";
  var gave = "";
  var green = "";
  var oh = "";
  var quick = "";
  var develop = "";
  var sleep = "";
  var warm = "";
  var free = "";
  var minute = "";
  var strong = "";
  var special = "";
  var mind = "";
  var behind = "";
  var clear = "";
  var tail = "";
  var produce = "";
  var fact = "";
  var street = "";
  var inch = "";
  var lot = "";
  var nothing = "";
  var course = "";
  var stay = "";
  var wheel = "";
  var full = "";
  var force = "";
  var blue = "";
  var object = "";
  var decide = "";
  var surface = "";
  var deep = "";
  var moon = "";
  var island = "";
  var foot = "";
  var yet = "";
  var busy = "";
  var test = "";
  var record = "";
  var boat = "";
  var common = "";
  var gold = "";
  var possible = "";
  var plane = "";
  var age = "";
  var dry = "";
  var wonder = "";
  var laugh = "";
  var thousand = "";
  var ago = "";
  var ran = "";
  var check = "";
  var game = "";
  var shape = "";
  var yes = "j's;eh";
  var miss = "m's;ih";
  var brought = "b,r't;ah";
  var heat = "h't;ee";
  var snow = "s,n;ow";
  var bed = "";
  var bring = "";
  var sit = "";
  var perhaps = "";
  var fill = "";
  var east = "";
  var weight = "";
  var language = "";
  var among = "";
  var common_default = {
    the,
    of,
    to,
    and,
    a,
    in: in2,
    is,
    it,
    you,
    that,
    he,
    was,
    for: for2,
    on,
    are,
    with: with2,
    as,
    I,
    his,
    they,
    be,
    at,
    one,
    have,
    this: this2,
    from,
    or,
    had,
    by,
    hot,
    but,
    some,
    what,
    there,
    we,
    can,
    out,
    other,
    were,
    all,
    your,
    when,
    up,
    use,
    word,
    how,
    said,
    an,
    each,
    she,
    which,
    do: do2,
    their,
    time,
    if: if2,
    will,
    way,
    about,
    many,
    then,
    them,
    would,
    write,
    like,
    so,
    these,
    her,
    long,
    make,
    thing,
    see,
    him,
    two,
    has,
    look,
    more,
    day,
    could,
    go,
    come,
    did,
    my,
    sound,
    no,
    most,
    number,
    who,
    over,
    know,
    water,
    than,
    call,
    first,
    people,
    may,
    down,
    side,
    been,
    now,
    find,
    any,
    new: new2,
    work,
    part,
    take,
    get,
    place,
    made,
    live,
    where,
    after,
    back,
    little,
    only,
    round,
    man,
    year,
    came,
    show,
    every,
    good,
    me,
    give,
    our,
    under,
    name,
    very,
    through,
    just,
    form,
    much,
    great,
    think,
    say,
    help,
    low,
    line,
    before,
    turn,
    cause,
    same,
    mean,
    differ,
    move,
    right,
    boy,
    old,
    too,
    does,
    tell,
    sentence,
    set,
    three,
    want,
    air,
    well,
    also,
    play,
    small,
    end,
    put,
    home,
    read,
    hand,
    port,
    large,
    spell,
    add,
    even,
    land,
    here,
    must,
    big,
    high,
    such,
    follow,
    act,
    why,
    ask,
    men,
    change,
    went,
    light,
    kind,
    off,
    need,
    house,
    picture,
    try: try2,
    us,
    again,
    animal,
    point,
    mother,
    world,
    near,
    build,
    self,
    earth,
    father,
    head,
    stand,
    own,
    page,
    should,
    country,
    found,
    answer,
    school,
    grow,
    study,
    still,
    learn,
    plant,
    cover,
    food,
    sun,
    four,
    thought,
    let: let2,
    keep,
    eye,
    never,
    last,
    door,
    between,
    city,
    tree,
    cross,
    since,
    hard,
    start,
    might,
    story,
    saw,
    far,
    sea,
    draw,
    left,
    late,
    run,
    "don't": don_t,
    while: while2,
    press,
    close,
    night,
    real,
    life,
    few,
    stop,
    open,
    seem,
    together,
    next,
    white,
    children,
    begin,
    got,
    walk,
    example,
    ease,
    paper,
    often,
    always,
    music,
    those,
    both,
    mark,
    book,
    letter,
    until,
    mile,
    river,
    car,
    feet,
    care,
    second,
    group,
    carry,
    took,
    rain,
    eat,
    room,
    friend,
    began,
    idea,
    fish,
    mountain,
    north,
    once,
    base,
    hear,
    horse,
    cut,
    sure,
    watch,
    color,
    face,
    wood,
    main,
    enough,
    plain,
    girl,
    usual,
    young,
    ready,
    above,
    ever,
    red,
    list,
    though,
    feel,
    talk,
    bird,
    soon,
    body,
    dog,
    family,
    direct,
    pose,
    leave,
    song,
    measure,
    state,
    product,
    black,
    short,
    numeral,
    class: class2,
    wind,
    question,
    happen,
    complete,
    ship,
    area,
    half,
    rock,
    order,
    fire,
    south,
    problem,
    piece,
    told,
    knew,
    pass,
    farm,
    top,
    whole,
    king,
    size,
    heard,
    best,
    hour,
    better,
    TRUE,
    during,
    hundred,
    am,
    remember,
    step,
    early,
    hold,
    west,
    ground,
    interest,
    reach,
    fast,
    five,
    sing,
    listen,
    six,
    table,
    travel,
    less,
    morning,
    ten,
    simple,
    several,
    vowel,
    toward,
    war,
    lay,
    against,
    pattern,
    slow,
    center,
    love,
    person,
    money,
    serve,
    appear,
    road,
    map,
    science,
    rule,
    govern,
    pull,
    cold,
    notice,
    voice,
    fall,
    power,
    town,
    fine,
    certain,
    fly,
    unit,
    lead,
    cry,
    dark,
    machine,
    note,
    wait,
    plan,
    figure,
    star,
    box,
    noun,
    field,
    rest,
    correct,
    able,
    pound,
    done,
    beauty,
    drive,
    stood,
    contain,
    front,
    teach,
    week,
    final,
    gave,
    green,
    oh,
    quick,
    develop,
    sleep,
    warm,
    free,
    minute,
    strong,
    special,
    mind,
    behind,
    clear,
    tail,
    produce,
    fact,
    street,
    inch,
    lot,
    nothing,
    course,
    stay,
    wheel,
    full,
    force,
    blue,
    object,
    decide,
    surface,
    deep,
    moon,
    island,
    foot,
    yet,
    busy,
    test,
    record,
    boat,
    common,
    gold,
    possible,
    plane,
    age,
    dry,
    wonder,
    laugh,
    thousand,
    ago,
    ran,
    check,
    game,
    shape,
    yes,
    miss,
    brought,
    heat,
    snow,
    bed,
    bring,
    sit,
    perhaps,
    fill,
    east,
    weight,
    language,
    among
  };

  // main.js
  function CCSStylesheetRuleStyle(stylesheet, selectorText, style, value) {
    var CCSstyle = void 0, rules;
    rules = document.styleSheets[stylesheet][document.all ? "rules" : "cssRules"];
    for (var n in rules) {
      if (rules[n].selectorText == selectorText) {
        CCSstyle = rules[n].style;
        break;
      }
    }
    if (value == void 0)
      return CCSstyle[style];
    else
      return CCSstyle[style] = value;
  }
  function addSvg(paths, style) {
    return pathsToSvg(paths, style);
  }
  function addText(text) {
    return "<span>" + text + "</span>";
  }
  function parseWord(word2) {
    var punctuation = {
      ".": "\u3002",
      ",": "\uFF0C",
      "!": "\uFF01",
      "?": "\uFF1F",
      "-": "-"
    };
    if (word2 == "")
      return "";
    if (word2[0] == "'") {
      return addText(word2.substring(1));
    } else if (word2.length == 1 && punctuation[word2[0]] !== void 0) {
      return addText(punctuation[word2[0]]);
    }
    var final2 = "";
    var style = "";
    var info = word2.split(";");
    var radicals2 = info[0].split("'");
    var compounds = [];
    radicals2.forEach(function(r) {
      var components = r.split(",");
      var p;
      if (components.length == 3) {
        p = textCompound(components[0], components[1]);
        p = createCompoundInverse(p, textSmall(components[2]));
      } else if (components.length == 2) {
        p = textCompound(components[0], components[1]);
      } else if (components.length == 1) {
        p = textLarge(components[0]);
      }
      if (radicals2.length == 1) {
        p = createSmaller(p, components.length == 1 && info.length == 1 ? 0.6 : 0.8);
      }
      compounds.push(p);
    });
    if (compounds.length == 1) {
      final2 = compounds[0];
    } else if (compounds.length >= 2) {
      final2 = createSplit(compounds[0], compounds[1]);
    }
    var to_add_modifiers = [];
    if (info.length == 2) {
      markers = info[1].split(",");
      if (markers[0] != "") {
        if (markers[0].startsWith(".")) {
          to_add_modifiers.push("bottomLast");
          style += "margin-right: 5px;";
          markers[0] = markers[0].substring(1);
        }
        final2 = addBottomMarker(final2, textMarkerBottom(markers[0]));
      }
      if (markers.length == 2) {
        if (markers[1].startsWith(".")) {
          to_add_modifiers.push("topLast");
          style += "margin-right: 5px;";
          markers[1] = markers[1].substring(1);
        }
        if (markers[1] != "") {
          final2 = addTopMarker(final2, textMarkerBottom(markers[1]));
        }
      }
    }
    to_add_modifiers.forEach(function(m) {
      final2 = addModifier(final2, m);
    });
    return addSvg([roundPath(final2, 0.25)], style);
  }
  var cached_words = {};
  function inputChanged() {
    var finalHTML = "";
    character_input.value.split("\n").forEach(function(l) {
      l.split(" ").forEach(function(w) {
        if (common_default[w] != void 0)
          w = common_default[w];
        var parsed_word = "";
        if (cached_words[w] == void 0) {
          try {
            parsed_word = parseWord(w);
            cached_words[w] = parsed_word;
          } catch (err) {
            return;
          }
        } else {
          parsed_word = cached_words[w];
        }
        if (parsed_word != "")
          finalHTML += parsed_word;
      });
      finalHTML += "<br>";
    });
    preview.innerHTML = finalHTML;
  }
  window.onload = function() {
    character_input.addEventListener("keyup", inputChanged);
    inputChanged();
    const updatePixelRatio = () => {
      let pr = window.devicePixelRatio;
      var stroke_width = 1 / (window.devicePixelRatio || 1);
      CCSStylesheetRuleStyle(0, "path", "stroke-width", stroke_width.toString() + "px");
      matchMedia(`(resolution: ${pr}dppx)`).addEventListener("change", updatePixelRatio, { once: true });
    };
    updatePixelRatio();
  };
})();
