import yargs from "yargs"   

const argv = yargs(process.argv.slice(2))
.usage('\nTalk with your computer!') 
.usage('Ask her about any topic, provided that she knows, she will answer.')
.command('$0',
    'call your computer, then ask it anything',
    import('./utility.js')
    .then(module => module.okcomputer(
        process.argv.slice(2).join(' ')))
)
.alias('h', 'help')
.help()
.argv


export default argv