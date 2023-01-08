import getQuotes from "./main.js"
let n = 0, avg = []
do {
const start = performance.now()

// const keywords = await new Promise( 
//     resolve => rl.question(
//         'I do listen, human: ', resolve))
const okcomputer = await getQuotes('love flowers', 10)
console.log(okcomputer)
const end = performance.now()
const elapsedTime = end - start
console.log(`Elapsed time: ${elapsedTime}ms`)
avg.push(elapsedTime); n++
} while (n < 1)

avg = avg.reduce((acc, val) => acc + val, 0) / avg.length
console.log('\nas it is, your code roughly takes', avg, 'ms')