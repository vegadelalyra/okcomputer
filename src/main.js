import { load } from 'cheerio'

export default async function getQuotes(keyword, wordsPerPhrase = 9) {
    console.time('Quote scraped from web on')
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
    let URL = multiWords 
    ? `${baseURL}/search_results?q=${multiWords}` 
    : `${baseURL}/topics/${keyword}-quotes`

    // fetch and parse the target website
    async function fet(u) {
        const res = await fetch(u)
        const html = await res.text()
        const $ = load(html)
        return $
    }; let $ = await fet(URL)
    
    // Required variables
    const end = "\nTry changing your quote's length\
    \x1b[33m(okcomputer -w)\x1b[37m\n", epistle = []

    // In first place xd guard clause: Do we have your word?
    const guardClause = $('.bq-subnav-h1').text() 
    const badNews =`\nBad news! We haven't written quotes for ${keyword}\n`
    if (guardClause === '\nPage Not Found\n') return badNews + guardClause 
    
    // Second guard clause: does thou word have pages? 
    let havePages = $('.pagination-sm').text()
    if (!havePages) return closure(URL)
    
    // pagination (code will scrape a random page)
    havePages = havePages.split('\n').findLast(n => !isNaN(n) && !!n)
    const splittedPages = Array.from({length: havePages}, (_, i) => i + 1)

    // get random page
    function random(arr) {return arr[Math.floor(Math.random()*arr.length)]}
    function rP() { return Number(random(splittedPages)) }
    function pageGen() {
        let chosenPage = randomPage == 1 ? '' : `_${randomPage}` 
        return URL + chosenPage
    }; let randomPage = rP()
    let page = pageGen()

    return closure()

    async function closure(next) {
        // update fetched link
        $ = await fet(next || page)
        
        // get the elements that matches your conditions
        const quotes = $(".oncl_q:nth-child(1) div")
        quotes.each(function() {   
            if ($(this)
                .text()
                .split(' ')
                .length <= wordsPerPhrase
            ) epistle.push($(this).text())
        }) 
        
        // GUARD CLAUSE: Did you catch any? 
        if (!epistle.length) return innerClosure()
        
        // output
        let chosenOne = random(epistle)
        chosenOne = chosenOne.slice(0, -1)
        console.timeEnd('Quote scraped from web on')
        return '\x1b[33m' + chosenOne + '\x1b[37m'

        function innerClosure() {
            // Pagination's Guard Clause: non-matching quote on page
            splittedPages?.splice(splittedPages.indexOf(randomPage), 1)
            if (!havePages || !splittedPages.length) return end

            // Callback to next page
            randomPage = rP()
            page = pageGen()
            return closure(page)
        }
    }
}