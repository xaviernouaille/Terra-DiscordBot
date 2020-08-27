const Discord = require('discord.js')
const client = new Discord.Client()
const dotenv = require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')

client.on('ready', () => {
    client.channels.cache.find(channel => channel.name === 'général').send("Terra is Online !!");
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(process.env.TOKEN);