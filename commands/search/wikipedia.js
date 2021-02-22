const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const wiki = require('wikipedia')

module.exports = {
    name: `wiki`,
    desc: `Search an information from wikipedia article.`,
    usage: `\`${Prefix}wiki <search terms>\``,
    category: `Search`,
    accessibly: `Everyone`,
    aliases: ["wikipedia", "wiki"],
    cooldown: 5,
    details: `[wiki](${CommandsHyoerlink} 'Search an information from wikipedia article')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const input =  args.slice(0).join(' ')
            if (!input) return await message.channel.send("Please provide a query!")
            await wikipediaSearch(input)
            async function wikipediaSearch(query){
                try {
                    const page = await wiki.page(query);
                    const summary = await page.summary();
                    const title = await summary.title;
                    const thumbnail = "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png";
                    const timestamp = await summary.timestamp;
                    const content_url = await summary.content_urls.desktop.page;
                    const extract = await summary.extract;
                    const embed = new Discord.MessageEmbed()
                    .setColor("#726c6c")
                    .setAuthor(`Wikipedia - ${title}`, thumbnail, content_url)
                    .setDescription(`${extract || "No information provided"}`)
                    .setFooter(`By wikipedia - Article Last Updated`, `${thumbnail}`)
                    .setTimestamp(`${timestamp}`)
                    await message.channel.send(embed)
                } catch (error) {
                    await message.channel.send("Sorry, no result were found.")
                }
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
