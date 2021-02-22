const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `channel`,
    desc: `Shows info about a channel.`,
    usage: `\`${Prefix}channel [#channel]\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["channel"],
    cooldown: 10,
    details: `[channel](${CommandsHyoerlink} 'Display info about a channel')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const findChannelInfo = message.mentions.channels.first()
            if (!findChannelInfo) {
                const emChannelInfo = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Channel Info")
                .setDescription(`<#${message.channel.id}>\nID: ${message.channel.id}`)
                .addField(`Type`, `${String(message.channel.type).toLowerCase()}`,true)
                .addField(`NSFW`, `${String(message.channel.nsfw).toLowerCase()}`,true)
                .addField(`Created at`,`${message.channel.createdAt.toDateString()}, ${message.channel.createdAt.toLocaleTimeString()}`)
                .addField(`Channel Topic`, `\`\`\`${message.channel.topic || `No Topic`}\`\`\``)
                message.channel.send(emChannelInfo)
            } else {
                const emTargChannelInfo = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Channel Info")
                .setDescription(`<#${findChannelInfo.id}>\nID: ${findChannelInfo.id}`)
                .addField(`Type`, `${String(findChannelInfo.type).toLowerCase()}`,true)
                .addField(`NSFW`, `${String(findChannelInfo.nsfw).toLowerCase()}`,true)
                .addField(`Created at`,`${findChannelInfo.createdAt.toDateString()}, ${findChannelInfo.createdAt.toLocaleTimeString()}`)
                .addField(`Channel Topic`, `\`\`\`${findChannelInfo.topic || `No Topic`}\`\`\``)
                message.channel.send(emTargChannelInfo)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
