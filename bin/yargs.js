import yargs from "yargs"   

const argv = yargs(process.argv.slice(2))
.usage('\nTalk with your computer!') 
.usage('Ask her about any topic, provided that she knows, she will answer.')
.command('$0', 'call your computer, then ask it anything')
.option('words', { 
    default: false, alias: 'w',
    description: "Define your quote's length. Max: 30 words" 
}).alias('h', 'help')
.help().argv

// if (!!argv.words) return import('../lib/verbose/verbose.js')
console.log(argv.words)
export default argv

// import('./utility.js')
//     .then(mod => mod.okcomputer(
//         process.argv.slice(2).join(' ')
//     ))