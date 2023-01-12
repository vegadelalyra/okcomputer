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
    
    return closure()
    
    async function closure(url) {
        // fetch and parse the target website
        const res = await fetch(url || URL)
        const html = await res.text()
        const $ = cheerio.load(html)
        
        if (fetchSucceed) return innerClosure()
        
        // In first place xd guard clause: Do we have your word?
        const guardClause = $('.bq-subnav-h1').text() 
        const badNews =`\nBad news! We haven't written quotes for ${keyword}\n`
        if (guardClause === '\nPage Not Found\n') return badNews + guardClause 
        
        // Second guard clause: does thou word have pages? 
        const random = arr => arr[Math.floor(Math.random() * arr.length)]
        let havePages = $('.pagination-sm').text()
        if (!havePages) return innerClosure()

        // pagination (code will scrape a random page)
        havePages = havePages.split('\n').filter(n => !isNaN(n) && !!n)
        havePages = Number(random(havePages)) + 1
        let button = nth => $(`.page-item:nth-child(${nth}) .page-link`)
        let clickButton = a => button(a).attr('href')
        let page = baseURL + clickButton(havePages)

        fetchSucceed = true; return closure(page)
        
        function innerClosure() {
            // CSS-selector  of the desired HTML element
            const quotes = $(".oncl_q:nth-child(1) div")
            
            // get the elements that matches your conditions
            const epistle = [] 
            quotes.each(function() {   
            if ($(this)
            .text()
            .split(' ')
            .length < wordsPerPhrase
            ) epistle.push($(this).text())
            }) 
            
            // output
            const chosenOne = random(epistle)
            return '\x1b[33m' + chosenOne + '\x1b[37m'
        }
    }
}