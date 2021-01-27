import request = require('request')
import cheerio = require('cheerio')

const JavaDocUrl = 'https://papermc.io/javadocs/paper/1.16/'
const AllClassesNoFrame = 'allclasses-noframe.html'

const main = () => {
    request(JavaDocUrl + AllClassesNoFrame, function (e, response, body) {
        if (e) {
            console.error(e)
        }

        try {
            const $ = cheerio.load(body)
            const eventLinks = []
            $('a').each(function (_, element) {
                const a = $(element)
                const href = a.prop("href")
                if (href.endsWith('Event.html')) {
                    eventLinks.push(href)
                }
            })
            console.log(eventLinks)
        } catch (e) {
            console.error(e)
        }
    })
}

main()