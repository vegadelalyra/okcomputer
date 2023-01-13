export default function verbose (num = 10) {
    let a = process.argv.slice(2)
    let b = a.reduce((acc, val, index) => {
        if ( val.includes('-w') ) acc = index
        return acc
    }, 0) + 1

    const regEx = /^(?:[1-9]|[1-2][0-9]|30)$/
    if (typeof num === 'boolean') num = Number(a[b]) 
    if (!regEx.test(num)) return askUser()

    async function askUser() {
        let n = await import('./howManyWords.js').then(m => m.default)
        let s = n === 1 ? '' : 's'

        console.log('Current length of quotes:', n, `word${s}`)
        const l = await new Promise(
            resolve => import('../../lib/utility.js')
            .then( m => m.default.question (
            '\x1b[33mChange length? (max. 30):\x1b[37m ', 
            resolve)))
        
        if (l === '') return process.exit()
        if (!regEx.test(l) || l == n) return askUser()
        return verbose(l)
    }; if (typeof num === 'boolean') num = a[b]

    const how_many_words = `const howManyWords = new Uint8Array([${num}])[0]
export default howManyWords`

    import('path').then(path => {
        const filePath = path.join(process.cwd(), 'lib', 'verbose', 'howManyWords.js')

        import('fs').then(fs => {
            fs.promises.mkdir(path.dirname(filePath), { recursive: true })
            fs.promises.writeFile(filePath, how_many_words)
        })
    })

    const s = num == 1 ? '' : 's'
    console.log (
        '\x1b[37mQuotes length changed:\x1b[33m', 
        num, `\x1b[37mword${s}`
    ); import('../../lib/utility.js').then( m => m.default.close() )
}