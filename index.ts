import request = require('request')
import cheerio = require('cheerio')
import fs = require('fs')
import yaml = require('js-yaml')

const JavaDocUrl = 'https://papermc.io/javadocs/paper/1.16/'
const AllClassesNoFrame = 'allclasses-noframe.html'
const EventsYaml = 'events.yaml'

const main = () => {
    request(JavaDocUrl + AllClassesNoFrame, function (e, response, body) {
        if (e) {
            console.error(e)
        }

        try {
            // javadoc から イベント一覧を作成
            const $ = cheerio.load(body)
            const eventLinks = []
            $('a').each(function (_, element) {
                const a = $(element)
                const href = a.prop("href")
                if (href.endsWith('Event.html')) {
                    eventLinks.push(href)
                }
            })

            // events.yaml をロード
            const data = yaml.load(fs.readFileSync(EventsYaml, 'utf8'))

            // events.yaml に存在しない新しいイベントを追加
            eventLinks.forEach((href) => {
                if (!(href in data)) {
                    data[href] = ''
                }
            })

            // events.yaml に保存
            fs.writeFile(EventsYaml, yaml.dump(data, { sortKeys: true }), 'utf8', (err) => {
                if (err) {
                    console.error(err.message);
                }
            })

        } catch (e) {
            console.error(e)
        }
    })
}

main()