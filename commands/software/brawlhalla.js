const Discord = require('discord.js')
module.exports = async(client, message) => {
    const embedSoftware = new Discord.MessageEmbed()
    .setColor('#62fcd4')
    .setTitle('BNC Software')
    .setDescription('Brawlhalla - Combo Simplified - by NC - Version 0.3')
    .addField('Information', 
        `📥 | [Download](https://cdn.discordapp.com/attachments/806504563052904448/811024522711007242/Brawlhalla_-_Combo_Simplified_-_by_NC_-_Version_0.3.rar)\n`+
        `ℹ️ | Version : \`0.3\`\n`+
        `⚙️ | Created by <@&806521838854733844>\n`+
        `💻 | Tested on \`Windows 8\``
    )
    .setFooter(`Reqested by ${message.author.username}`, message.author.displayAvatarURL()).setTimestamp()
    await message.channel.send(embedSoftware)
}