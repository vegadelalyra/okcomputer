/* lines you want to uncomment are
** 33, 43, 56, 61 they all are CLGs
*/ import cheerio from 'cheerio'


const baseURL = "https://www.brainyquote.com", epistle = []

export default async function getQuotes(keyword, wordsPerPhrase = 9, url) {
    // guard clause for keyword: must be only letters.
    const invalid = '\nError: Please insert valid keywords\
        \n(neither numbers, voids nor signs).\n'
    if ( /[^a-zA-Z\s]/.test(keyword) || !keyword ) return invalid

    // handling multiple words inputs
    const splin = keyword.split(' ')
    let multiWords = splin.length > 1 ? splin.join('+') : undefined 

    // dynamic URL and vital resources for code to succeed
    const singleWord = `${baseURL}/topics/${keyword}-quotes`
    const variousWords = splin.length > 1 ? `${baseURL}/search_results?q=${multiWords}` : undefined
    let URL = !!variousWords ? variousWords : singleWord

    // fetch and parse the target website
    const res = await fetch(url || URL)
    const html = await res.text()
    const $ = cheerio.load(html)

    // In first place xd guard clause: Do we have your word?
    const guardClause = $('.bq-subnav-h1').text() 
    const badNews =`\nBad news! We haven't written quotes for ${keyword}\n`
    if (guardClause === '\nPage Not Found\n') return badNews + guardClause 
    // console.log(url || URL)

    // CSS-selector and filter of the desired HTML element
    const quotes = $(".oncl_q:nth-child(1) div")
    // if (!multiWords) console.log(guardClause)

    quotes.each(function() {   
        const quote = $(this).text()

        if (quote.split(' ').length < wordsPerPhrase) {
            // console.log(quote, quote.split(' ').length, 'words')
            epistle.push(quote)
        }
    })

    // pagination (code will scrape until the last page)
    let button = nth => $(`.page-item:nth-child(${nth}) .page-link`)
    let curated = a => button(a).attr('href')
    let nextPage = button(8).text() === 'Next' ? curated(8): curated(9)

    if ($(".disabled").text() !== '..Next') return getQuotes(keyword, wordsPerPhrase, baseURL + nextPage)
    
    // output
    // console.log('\n', epistle.length, 'phrases scraped from web!\n...and the chosen one is:')
    const chosenOne = epistle[Math.floor(Math.random() * epistle.length)]
    return chosenOne
}
// const phrase = await getQuotes('what is love', 20)
// console.log(phrase)