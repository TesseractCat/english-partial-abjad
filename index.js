const fs = require('fs');
const readline = require('readline');
const c = require('./character');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Word: ", function (word) {
    var paths = [];
    var word = c.textCompound("p", "r");
    word = c.createSplit(c.textLarge("t"), word);
    paths.push(word);
    
    var characterSvg = c.pathsToSvg(paths);
    console.log(characterSvg);
    fs.writeFile('out.svg', characterSvg, function() {});
    
    rl.close();
});
