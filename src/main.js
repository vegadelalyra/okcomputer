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
    let fetchSucceed = false, URL = multiWords 
    ? `${baseURL}/search_results?q=${multiWords}` 
    : `${baseURL}/topics/${keyword}-quotes`
    
    function random(arr) {return arr[Math.floor(Math.random()*arr.length)]}

    return closure()
    
    async function closure(url, msg, pages) {
        // fetch and parse the target website
        const res = await fetch(url || URL)
        const html = await res.text()
        const $ = cheerio.load(html)
        
        if (fetchSucceed) return innerClosure(msg, pages)
        
        // In first place xd guard clause: Do we have your word?
        const guardClause = $('.bq-subnav-h1').text() 
        const badNews =`\nBad news! We haven't written quotes for ${keyword}\n`
        if (guardClause === '\nPage Not Found\n') return badNews + guardClause 
        fetchSucceed = true
        
        // Second guard clause: does thou word have pages? 
        let havePages = $('.pagination-sm').text()
        if (!havePages) return innerClosure()
        
        // pagination (code will scrape a random page)
        havePages = Number(havePages.split('\n').findLast(n => !isNaN(n) && !!n))
        const splittedPages = Array.from({length: havePages}, (_, i) => i + 1)
        
        return checkPoint_banUnquotedLinks(splittedPages)

        function checkPoint_banUnquotedLinks(splittedPages, ban) {

            // Pagination's Guard Clause: non-matching quote on page
            if (ban) splittedPages.splice(splittedPages.indexOf(ban), 1) 
            if (!splittedPages.length) return "\nTry changing your quote's length\n"

            // Guard Clause: if first page is met
            let randomPage = Number(random(splittedPages))
            if (randomPage == 1) return closure(null, randomPage)

            // Guard clause: if any other page is met
            let page = URL + `_${randomPage}`
            return closure(page, randomPage, splittedPages)
        }
        
        function innerClosure(uselessPage = 0) {
            // CSS-selector  of the desired HTML element
            const quotes = $(".oncl_q:nth-child(1) div")
            
            // get the elements that matches your conditions
            const epistle = [] 
            quotes.each(function() {   
            if ($(this)
                .text()
                .split(' ')
                .length <= wordsPerPhrase
                ) epistle.push($(this).text())
            }) 
            
            // GUARD CLAUSE: Did you catch any? 
            if (!epistle.length && !uselessPage) return "\nTry changing your quote's length\n"
            if (!epistle.length) return checkPoint_banUnquotedLinks(uselessPage)

            // output
            let chosenOne = random(epistle)
            chosenOne = chosenOne.slice(0, -1)
            return '\x1b[33m' + chosenOne + '\x1b[37m'
        }
    }
}