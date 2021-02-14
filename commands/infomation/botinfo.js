const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `botinfo`,
    desc: `Show bot information`,
    usage: `\`${Prefix}botinfo\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ['botinfo'],
    cooldown: 10,
    details: `[botinfo](${CommandsHyoerlink} 'Display bot information')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            // -- Up Time
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            let uptime = `${days}D:${hours}H:${minutes}M:${seconds}S`;
            // -- Close
            const Embed = new Discord.MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setColor("PURPLE")
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`${client.user.username}'s Info`)
            .setDescription(
                `***Stats***\n`+
                `Created At: \`\`${client.user.createdAt.toLocaleString()}\`\`\n`+
                `Joined Date: \`\`${message.guild.me.joinedAt.toLocaleString()}\`\`\n`+
                `Uptime: \`\`${uptime}\`\`\n`+
                `Hosted on: \`\`Windows 8\`\``
            )
            .addField("Developer", `- [Github](https://github.com/alxevia)\nDev. Server:\n- [Sashimi Temple](https://discord.gg/NmHWB8n94q)\n- [Discord.kyz](https://discord.gg/Eb5XztSWx3)`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL()).setTimestamp()
            message.channel.send(Embed)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
