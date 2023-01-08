import getQuotes from "./main.js"
import readline from 'readline'

// readLine interface
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
    historySize: 0,
    prompt: ''
}) 

let n = 0, avg = []
do {
    const start = performance.now()

    // const keywords = await new Promise(
    //     resolve => rl.question(
    //         'I do listen, human: ',
    //         resolve
    //     )
    // )
    // rl.close()
    // console.log('...' + keywords + '?')
    const okcomputer = await getQuotes('loneliness', 10)
    console.log(okcomputer)
    const end = performance.now()
    const elapsedTime = end - start
    console.log(`Elapsed time: ${elapsedTime}ms`)
    avg.push(elapsedTime); n++
} while (n < 1)

avg = avg.reduce((acc, val) => acc + val, 0) / avg.length
console.log('\nas it is, your code roughly takes', avg, 'ms')