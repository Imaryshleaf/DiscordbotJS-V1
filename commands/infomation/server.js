const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `server`,
    desc: `Shows info about the current server.`,
    usage: `\`${Prefix}server\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["server"],
    cooldown: 20,
    details: `[server](${CommandsHyoerlink} 'Shows the info about the current server')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            let verificationLevel = '';
            if (message.guild.verificationLevel === "VERY_HIGH") {
                verificationLevel = `Very High (Must have a verified phone on their Discord account)`
            }
            if (message.guild.verificationLevel === "HIGH") {
                verificationLevel = `High (Must be a member of this server for longer than 10 minutes)`
            }
            if (message.guild.verificationLevel === "MEDIUM") {
                verificationLevel = `Medium (Must be registered on Discord for longer than 5 minutes)`
            }
            if (message.guild.verificationLevel === "LOW") {
                verificationLevel = `Low (Must have a verified email on their Discord account)`
            }
            if (message.guild.verificationLevel === "NONE") {
                verificationLevel = `None (Unrestricted)`
            }
            const ChannelText = []
            const ChannelVoice = []
            const ChannelCategory= []
            message.guild.channels.cache.forEach(c => {
                if (c.type === 'text') {
                    ChannelText.push(c.id)
                }
                if (c.type === 'voice') {
                    ChannelVoice.push(c.id)
                }
                if (c.type === 'category') {
                    ChannelCategory.push(c.id)
                }
            })
            const AnimatedEmojis = []
            const CommonEmojis = []
            message.guild.emojis.cache.forEach(e => {
                if (e.animated === true) {
                    AnimatedEmojis.push(e.id)
                }
                if (e.animated === false) {
                    CommonEmojis.push(e.id)
                }
            })
            const createdDate = message.guild.createdAt.toLocaleDateString()
            const createdTime = message.guild.createdAt.toLocaleTimeString()

            const EmServer = new Discord.MessageEmbed()
            .setColor("GOLD")
            .setThumbnail(message.guild.iconURL())
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(
                `**ID**: \`${message.guild.id}\`\n`+
                `**Owner**: <@!${message.guild.ownerID}>\n`+
                `**Region**: ${String(message.guild.region).toUpperCase()}\n`+
                `**Roles**: \`${message.guild.roles.cache.size}\`\n`+
                `**Members**: \`${message.guild.memberCount}\`\n`+
                `**Channels**: \`[${message.guild.channels.cache.size}]\`\n`+
                `**Text**: \`[${ChannelText.length}]\`\n`+
                `**Voice**: \`[${ChannelVoice.length}]\`\n`+
                `**Category**: \`[${ChannelCategory.length}]\`\n`+
                `**Date**: \`${createdDate}\` at \`${createdTime}\`\n`+
                `**Verification Level**: ${verificationLevel}`
            )
            .addField(`Emojis`,
                `Normal: \`\`${CommonEmojis.length}\`\`\n`+
                `Animated: \`\`${AnimatedEmojis.length}\`\``
            , true)
            .addField("Server Boosts", 
                `Level: \`\`${message.guild.premiumTier}\`\`\n`+
                `No. of boosts: \`\`${message.guild.premiumSubscriptionCount}\`\``
            , true)
            message.channel.send(EmServer)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
