const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `emoji`,
    desc: `Displays and provides information on custom emoji in Discord.`,
    usage: `\`${Prefix}emoji [name|id]\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["emoji"],
    cooldown: 5,
    details: `[emoji](${CommandsHyoerlink} 'Displays and provides information a custom emoji in this server.')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            let userInput = args[0]
            if (!userInput) return message.channel.send(`❌ | Please provide an id or name of custom emoji!`)
            let guildEmojis = message.guild.emojis.cache;
            let getEmojis = guildEmojis.find(e => e.name === userInput) || guildEmojis.find(e => e.id === userInput)
            if (!getEmojis) return message.channel.send(`❌ | Unable to find that emoji.`)
            const emEmojiInfo = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setThumbnail(getEmojis.url)
            .addField(`Emoji Information`,
                `Name: ${getEmojis.name}\n`+
                `ID: ${getEmojis.id}\n`+
                `Animated: ${getEmojis.animated}\n`+
                `Created at: ${getEmojis.createdAt.toDateString()}\n`+
                `Link: [Emoji URL](${getEmojis.url})\n`
            )
            .setFooter(`Requested by ${message.author.tag}`).setTimestamp()
            message.channel.send(emEmojiInfo)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
