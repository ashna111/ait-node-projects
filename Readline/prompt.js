const prompt = require('prompt-sync')({ sigint: true }) // needed to prompt user input
const number = prompt('enter a number:')

console.log(number)