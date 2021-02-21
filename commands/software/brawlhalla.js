const Discord = require('discord.js')
module.exports = async(client, message) => {
    const embedSoftware = new Discord.MessageEmbed()
    .setColor('#62fcd4')
    .setTitle('BNC Software')
    .setDescription('Brawlhalla - Combo Simplified - by NC - Version 0.4 [FINAL]')
    .addField('Information', 
        `📥 | [Download](https://cdn.discordapp.com/attachments/806504563052904448/812948001202765834/Brawlhalla_-_Combo_Simplified_-_by_NC-_Version_0.4_FINAL.rar)\n`+
        `ℹ️ | Version : \`0.4\`\n`+
        `⚙️ | Created by <@!802906117318770688>\n`+
        `💻 | Tested on \`Windows 8\``
    )
    .setFooter(`Reqested by ${message.author.username}`, message.author.displayAvatarURL()).setTimestamp()
    await message.channel.send(embedSoftware)
}