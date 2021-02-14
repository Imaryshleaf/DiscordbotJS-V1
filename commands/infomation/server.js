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
                verificationLevel = `Very High (Must verify phone number)`
            }
            if (message.guild.verificationLevel === "HIGH") {
                verificationLevel = `High (Stay locked for 10 Minutes)`
            }
            if (message.guild.verificationLevel === "MEDIUM") {
                verificationLevel = `Medium (Must wait for 5 Minutes)`
            }
            if (message.guild.verificationLevel === "LOW") {
                verificationLevel = `Low (Must verify email address)`
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
            const EmServer = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setThumbnail(message.guild.iconURL())
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle(`ID: ${message.guild.id}`)
            .addField(`Verification Level`,`${verificationLevel}`)
            .addField("Region", message.guild.region, true)
            .addField("Roles", message.guild.roles.cache.size, true)
            .addField("Members", message.guild.memberCount, true)
            .addField(`Channels [${message.guild.channels.cache.size}]`, 
                `Text: \`[${ChannelText.length}]\`\n`+
                `Voice: \`[${ChannelVoice.length}]\`\n`+
                `Category: \`[${ChannelCategory.length}]\``
            )
            .addField("Server Owner", `${message.guild.owner.user.tag} | ${message.guild.owner.user.id}`)
            .addField("Created At", `${message.guild.createdAt.toString()}`)
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
