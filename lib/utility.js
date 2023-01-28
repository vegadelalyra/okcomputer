import readline from 'readline'
import getQuotes from '../src/main.js'

// readLine interface
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    historySize: 0,
    prompt: ''
}); export default rl

// ask user input
async function okcomputer(input) {
    // handle user input
    let keyword; !!input
    ? keyword = input
    : keyword = await new Promise(
        resolve => rl.question(
            '\x1b[37mI do listen, human:\x1b[93m ', resolve))
    rl.close()    

    // fetch and display quote
    console
    .log(`\x1b[37m...\x1b[32m${keyword}\x1b[0m? Let me jump in, human!`)
    let words = await import('./verbose/howManyWords.js')
    .then(w => w.default)
    okcomputer = await getQuotes(keyword, words)
    return console.log(okcomputer)
}; export { okcomputer }