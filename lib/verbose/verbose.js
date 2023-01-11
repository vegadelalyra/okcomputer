export default async function verbose (num = 10) {   
    const how_many_words = `
        const howManyWords = new Uint8Array([${num}])[0]
        export default howManyWords
    `
    import('fs').then( mod => {
        mod.writeFile(
            './howManyWords.js', 
            how_many_words, 
            err => { if (err) throw err }
        )
    })
}