const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const axios = require('axios')

module.exports = {
    name: `booru_random`,
    desc: `Get a random image post from danbooru by tags.`,
    usage: `\`${Prefix}booru_random <tag1|tag2>\``,
    category: `Danbooru`,
    accessibly: `Everyone`,
    aliases: ["booru-random"],
    cooldown: 5,
    details: `[booru_random](${CommandsHyoerlink} 'Get a random image post from danbooru by tags')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (message.channel.nsfw == false) return await message.channel.send("Please run this command in `nsfw` channel!")
            // User input
            let inp1 = args[0]; let inp2 = args[1];
            if (!inp1) return await message.channel.send("Please provide at least 1 tag!")
            if (inp2 === undefined) { inp2 = '' } else { inp2 = `%20${inp2}` }
            const url = `https://danbooru.donmai.us/posts/random.json?tags=${inp1}${inp2}&limit=1`
            await axios.get(url).then(async resp => {
                const result = resp.data;
                const embed = new Discord.MessageEmbed()
                .setDescription(`[Danbooru - Post#${result.id}](${result.file_url} '${result.tag_string}')`)
                .setImage(result.file_url).setTimestamp().setColor('#ac8c3b')
                await message.channel.send(embed)
            }).catch(async(err) => {
                await message.channel.send("Please provide the valid tags!")
            })
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
