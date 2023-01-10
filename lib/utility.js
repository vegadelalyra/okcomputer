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
        resolve => rl.question('I do listen, human: ', resolve))
    rl.close()    

    // fetch and display quote
    console.log(`...${keyword}? Let me jump in, human...`)
    okcomputer = await getQuotes(keyword, 15)
    return console.log(okcomputer)
}; export { okcomputer }