const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const { readdirSync } = require('fs')
const path = '../../'

module.exports = {
    name: "help",
    desc: `Showing all available commands.`,
    usage: `\`${Prefix}help [command]\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["help"],
    cooldown: 5,
    details: `[help](${CommandsHyoerlink} 'Help menu')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const cmdInformation = [];
            const cmdDanbooru = [];
            const cmdImages = [];
            const cmdSearch = [];
            const cmdUtilities = [];
            const cmdServer = [];
            const cmdFun = [];
            const cmdAnalyze = [];
            if (!args[0]) {
                readdirSync("./commands/").forEach(dir => {
                    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
                    for (const data of commands) {
                        let Command = require(`${path}commands/${dir}/${data}`);
                        let CommandKey = [Command]
                        for (const key of CommandKey) {
                            if (key.category == "Information") {
                                cmdInformation.push(key.details)
                            }
                            if (key.category == "Danbooru") {
                                cmdDanbooru.push(key.details)
                            }
                            if (key.category == "Images") {
                                cmdImages.push(key.details)
                            }
                            if (key.category == "Search") {
                                cmdSearch.push(key.details)
                            }
                            if (key.category == "Utilities") {
                                cmdUtilities.push(key.details)
                            }
                            if (key.category == "Server") {
                                cmdServer.push(key.details)
                            }
                            if (key.category == "Fun") {
                                cmdFun.push(key.details)
                            }
                            if (key.category == "Analyze") {
                                cmdAnalyze.push(key.details)
                            }
                        }
                    }
                })
                const embedHelp = new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setAuthor(`${client.user.username}'s Help Menu`, client.user.displayAvatarURL())
                .setTitle(`${Prefix}help`)
                .setDescription(`Type \`${Prefix}help [command]\` to show detailed information.`)
                .addField("🔍 | Search", `${cmdSearch.join(" ")|| "None"}`, true)
                .addField("🌇 | Images", `${cmdImages.join(" ")|| "None"}`, true)
                .addField("ℹ️ | Information", `${cmdInformation.join(" ")|| "None"}`, false) // -- Mid
                .addField("🔧 | Utilities ", `${cmdUtilities.join(" ")|| "None"}`, true)
                .addField("💬 | Server", `${cmdServer.join(" ")|| "None"}`, true)
                .addField("👒 | Danbooru", `${cmdDanbooru.join(" ")|| "None"}`, false) // -- Mid
                .addField("🎲 | Fun", `${cmdFun.join(" ")|| "None"}`, true)
                .addField("🔎 | Analyze", `${cmdAnalyze.join(" ")|| "None"}`, true)
                .setFooter(`©️ ${client.user.username} - ${client.commands.size} commands • Hover over commands for info!`,`${client.user.displayAvatarURL()}`)
                await message.channel.send(embedHelp) 
            } else {
                // Detailed information about the command.
                let CommandInfo = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                if (!CommandInfo) return message.channel.send(`❌ | That is an incorrect input.`).catch(() => {});
                const CommandInformations = new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setAuthor(`${client.user.username}'s Help Menu`, client.user.displayAvatarURL())
                .setTitle(`${Prefix}${CommandInfo.name.slice(0, 1).toLowerCase() + CommandInfo.name.slice(1)}`)
                .setDescription(`\`\`\`${CommandInfo.desc || `No Description provided.`}\`\`\``)
                .addField("❓ | **Usages**", `${CommandInfo.usage ? `\`${CommandInfo.usage}\`` : "No Usage"}`)
                .addField("⏰ | **Cooldown**", `• **${CommandInfo.cooldown || "Unknown"}** second(s)`, true)
                .addField("👥 | **Accessible**", `• _${CommandInfo.accessibly || "Members"}_`, true)
                .addField("📎 | **Category**", `• _${CommandInfo.category || "No Category"}_`, true)
                .addField("🔐 | **Permissions**",`• _${CommandInfo.permissions.join(", ") || "None"}_`, true)
                .addField("💡 | **Aliases**",`• _${CommandInfo.aliases ? CommandInfo.aliases.join(", ") : "None."}_`, true)
                .addField("⚙️ | **Status**",`• _${CommandInfo.status || "None"}_`, true)
                .setFooter(`Requested by ${message.author.tag}`,`${message.author.displayAvatarURL()}`)
                message.channel.send(CommandInformations)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
