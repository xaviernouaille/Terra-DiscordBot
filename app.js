const Discord = require('discord.js')
const client = new Discord.Client()
const dotenv = require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')

client.on('ready', () => {
    function sendEmbed(i, color, img) {
        i.forEach((o) => {
            let embed = new Discord.MessageEmbed()
                .setURL(o.link)
                .setTitle(o.title)
                .addField('Location', o.location)
                .addField('Company', o.company)
                .setDescription(o.description)
                .setFooter(o.date)
                .setColor(color)
                .setThumbnail(img)

            client.channels.cache.find(channel => channel.name === 'alternance').send(embed);
        })
    }

    setInterval(() => {

        // Indeed -> Developpeur Web, Ile de France, contrat d'apprentissage
        axios.get('https://www.indeed.fr/jobs?q=Developpeur&l=%C3%8Ele-de-France&jt=apprenticeship&sort=date').then(response => {
            const $ = cheerio.load(response.data)

            let json = []
            $('.jobsearch-SerpJobCard').each(function (i, elem) {
                let link = 'https://www.indeed.fr/jobs?q=Developpeur&l=Île-de-France&jt=apprenticeship&sort=date&vjk=' + $(this).attr('data-jk');
                let title = $(this).find('h2 > a').text();
                let company = $(this).find('.sjcl > div > .company').text();
                let location = $(this).find('.sjcl > .location').text();
                let description = $(this).find('.summary > ul li').text();
                let date = $(this).find('.date').text();

                if (date == 'Aujourd\'hui') {
                    json.push({
                        "link": link,
                        "title": title.replace(/[\n\r]/g, ''),
                        "company": company.replace(/[\n\r]/g, ''),
                        "location": location.replace(/[\n\r]/g, ''),
                        "description": description.replace(/[\n\r]/g, ''),
                        "date": date
                    })
                }
            });
            sendEmbed(json, '#2164f3', 'https://lh3.googleusercontent.com/gUyHrmCpcy5rRMY68W5csIEj60ORJmoqvTr8_WWYL8bDv6hlnKeE_twq5Pw1Y4X3FzI');
        })

    }, 1000 * 60 * 60 * 24);

    console.log(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.TOKEN);