import getQuotes from "./main.js"
import rl from "../lib/utility.js"

// Reads user input
const keywords = await new Promise(
    resolve => rl.question(
        'I do listen, human: ',
        resolve
    )
); rl.close()

let n = 0, avg = []; do {
    // fetchs and displays random phrase from scraped web
    console.log('...' + keywords + '? Let me jump in, human...')
    const start = performance.now()
    const okcomputer = await getQuotes(keywords, 8)
    console.log(okcomputer)

    // record time performance
    const end = performance.now()
    const elapsedTime = end - start
    console.log(`Elapsed time: ${elapsedTime}ms`)
    avg.push(elapsedTime); n++
} while (n < 1)

avg = avg.reduce((acc, val) => acc + val, 0) / avg.length
console.log('\nas it is, your code roughly takes', avg, 'ms')