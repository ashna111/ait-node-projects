const fs = require('fs')
const readline = require('readline')

//Read file
const contents = fs.readFileSync('file.txt', 'utf8');
console.log(contents);

//Append content to file
fs.appendFile('file.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Append Saved!');
});

//Writing file
//The specified file is open for writing
fs.open('file.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
});

//Writes 'Hello content in the file
fs.writeFile('file.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Write Saved!');
});

//Delete files - ye sirf reference ke liye hai
// fs.unlink('file.txt', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
// });

//Rename files - ye sirf reference ke liye hai
// fs.rename('file.txt', 'newfile.txt', function (err) {
//     if (err) throw err;
//     console.log('File Renamed!');
// }); 


//To check if a file or directory exists or not
const file = 'file.txt'
fs.access(file, fs.constants.F_OK, err => {
    console.log(`${file} ${err ? "does not exist" : "exists"}`);
});

//To check file permissions
//Read
fs.access(file, fs.constants.R_OK, err => {
    console.log(`${file} ${err ? "is not readable" : "is readable"}`);
});

//Write
fs.access(file, fs.constants.W_OK, err => {
    console.log(`${file} ${err ? "is not writable" : "is writable"}`);
});

//Execute
fs.access(file, fs.constants.X_OK, err => {
    console.log(`${file} ${err ? "is not executable" : "is executable"}`);
});

//Count the number of lines of file
const data = fs.readFileSync('file.txt')
const res = data.toString().split('\n').length
console.log("Number of lines: " + res);