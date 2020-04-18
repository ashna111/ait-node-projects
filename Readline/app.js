const fs = require('fs')
const readline = require('readline')

// const readInterface = readline.createInterface({
//     input: fs.createReadStream('file.txt'),
//     output: process.stdout,
//     console: false
// })

// readInterface.on('line', function (line) {
//     console.log(line);
// })

//OR

const lineReader = require('line-reader');

lineReader.eachLine('file.txt', function (line) {
    console.log(line);
});