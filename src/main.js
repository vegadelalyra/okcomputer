import cheerio from 'cheerio'

export default function getQuotes(keyword, wordsPerPhrase = 9) {
    // guard clause for keyword: must be only letters.
    if ( /[^a-zA-Z\s]/.test(keyword) || !keyword ) {
        return '\nError: Please insert valid keywords\
        \n(neither numbers, voids nor signs).\n'
    }

    // handling multiple words inputs
    let multiWords = keyword.split(' ').length > 1 
    ? keyword.split(' ').join('+') 
    : undefined 
    
    // dynamic URL and vital resources for code to succeed
    const baseURL = "https://www.brainyquote.com" 
    let epistle = [], fetchSucceed = false

    const URL = multiWords 
    ? `${baseURL}/search_results?q=${multiWords}` 
    : `${baseURL}/topics/${keyword}-quotes`
    
    // Let's start the crazziness
    return closure()

    async function closure(url) {
        // fetch and parse the target website
        const res = await fetch(url || URL)
        const html = await res.text()
        const $ = cheerio.load(html)
        console.log(url || URL)
        
        // CSS-selector  of the desired HTML element
        const quotes = $(".oncl_q:nth-child(1) div")
        // if (!multiWords) console.log(guardClause)
        
        if (fetchSucceed) return innerClosure()
        
        // In first place xd guard clause: Do we have your word?
        const guardClause = $('.bq-subnav-h1').text() 
        const badNews =`\nBad news! We haven't written quotes for ${keyword}\n`
        if (guardClause === '\nPage Not Found\n') return badNews + guardClause 
        fetchSucceed = true; return innerClosure()        
        
        async function innerClosure () {
            // get the elements that matches your conditions
            quotes.each(function() {   
                if ($(this)
                .text()
                .split(' ')
                .length < wordsPerPhrase
                ) epistle.push($(this).text())
            }) // console.log(quote, quote.split(' ').length, 'words')
            
            // pagination (code will scrape until the last page)
            let button = nth => $(`.page-item:nth-child(${nth}) .page-link`)
            let curated = a => button(a).attr('href')
            let nextPage = button(8).text() === 'Next' ? curated(8): curated(9)
            
            if (!$(".disabled").text().includes('Next')) return closure(baseURL + nextPage)
            
            // output
            // console.log('\n', epistle.length, 'phrases scraped from web!\n...and the chosen one is:')
            const chosenOne = epistle[Math.floor(Math.random() * epistle.length)]
            return '\x1b[33m' + chosenOne + '\x1b[37m'
        }
    }
}