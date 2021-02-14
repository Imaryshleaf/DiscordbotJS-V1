const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const { whitelist } = require('../../schema')

module.exports = {
    name: `whitelist`,
    desc: `Enable/Disable channel whitelisting. Only whitelisted channels can use commands.`,
    usage: `\`${Prefix}whitelist\``,
    category: `Utilities`,
    accessibly: `Administrator`,
    aliases: ['whitelist'],
    cooldown: 10,
    details: `[whitelist](${CommandsHyoerlink} 'Enable/Disable channel whitelisting. Only whitelisted channels can use commands.')`,
    permissions: [ "Administrator", "Server Manager" ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const input = args[0];
            if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return; //await console.log("Only owner, administrator and server manager can setup command whitelist")
            if (input === 'collection') {
                whitelist.find({ serverID: message.guild.id, }).sort([['descending']]).exec(async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Commands - Channel Whitelist")
                    if (data.length === 0) {
                        embed.setColor("RED")
                        embed.setDescription("No data found")
                        embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
                        embed.setTimestamp()
                    } else if (data.length < 31) {
                        const ChannelData = []; data.map(data => data.ChannelID).forEach(data => ChannelData.push(`<#${data}>`));
                        const ChannelDataID = []; data.map(data => data.ChannelID).forEach(data => ChannelDataID.push(`${data}`));
                        embed.setColor("GREEN")
                        embed.setDescription(`\`\`\`List of channel that allow ${client.user.username} to execute the commands.\`\`\``)
                        embed.addField(`Channel Mention`, `${ChannelData.join('\n') || "None"}`,true)
                        embed.addField(`Channel ID`, `${ChannelDataID.join('\n') || "None"}`,true)
                        embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
                        embed.setTimestamp();
                    }
                    return await message.channel.send(embed)
                })
            } else {
                whitelist.findOne({
                    serverID: message.guild.id,
                    ChannelID: message.channel.id,
                }, async(error, data) => {
                    // Enable
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    if (!data) {
                        const newWhitelist = new whitelist({
                            serverID: message.guild.id,
                            ChannelID: message.channel.id,
                        })
                        await newWhitelist.save().then(rest => console.log(rest)).catch(err => console.log(err)).then(message.react('🔒'))
                    } else {
                        // Disable
                        whitelist.findOneAndDelete({
                            serverID: message.guild.id,
                            ChannelID: message.channel.id,
                        }, async(error, data) => {
                            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                            if (!data) return console.log("Data not exists.")
                            console.log(data); await message.react('🔓')
                        })
                    }
                })
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
