#!/usr/bin/env node
import yargs from "yargs"   

const argv = yargs(process.argv.slice(2))
.usage('\nTalk with your computer!') 
.usage('Ask her about any topic, provided that she knows, she will answer.')
.command('$0', 'call your computer, then ask it anything')
.option('words', { 
    alias: 'w',
    description: "Define your quote's length. Max: 30 words" 
}).alias('h', 'help')
.help().argv

if (!!argv.w) import('../lib/verbose/verbose.js')
.then(m => m.default(argv.words))
else import('./utility.js')
.then(mod => mod.okcomputer(process.argv.slice(2).join(' ')))

export default argv