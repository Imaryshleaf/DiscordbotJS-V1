const Discord = require('discord.js')
module.exports = async(client, message) => {
    const embedSoftware = new Discord.MessageEmbed()
    .setColor('#62fcd4')
    .setTitle('BNC Software')
    .setDescription('Brawlhalla - Combo Simplified - by NC - Version 0.2')
    .addField('Information', 
        `📥 | [Download](https://cdn.discordapp.com/attachments/806504563052904448/807095279974744084/Brawlhalla_-_Combo_Simplified_-_by_NC_-_Version_0.2.rar)\n`+
        `ℹ️ | Version : \`0.2\`\n`+
        `⚙️ | Created by <@&806521838854733844>\n`+
        `💻 | Tested on \`Windows 8\``
    )
    .setFooter(`Reqested by ${message.author.username}`, message.author.displayAvatarURL()).setTimestamp()
    await message.channel.send(embedSoftware)
}