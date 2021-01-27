import fs = require('fs')
import yaml = require('js-yaml')
import Handlebars = require('handlebars')

const EventsYaml = 'events.yaml'
const EventsTemplateHtml = 'events-template.html'
const EventsHtml = 'events.html'

const main = () => {
    // events.yaml をロード
    const data = yaml.load(fs.readFileSync(EventsYaml, 'utf8'))

    // テンプレートをロード
    const template = Handlebars.compile(fs.readFileSync(EventsTemplateHtml, 'utf8'))

    // テンプレートに値を当てはめて保存
    fs.writeFileSync(EventsHtml, template({
        list: data
    }), 'utf8')
}

main()