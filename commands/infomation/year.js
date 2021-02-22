const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `year`,
    desc: `Tell the progress of the current year`,
    usage: `\`${Prefix}year\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["year-progress", "year"],
    cooldown: 5,
    details: `[year](${CommandsHyoerlink} 'Tell the progress of the current year')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const today = new Date();
            const start = new Date(today.getFullYear(), 0, 1);
            const end = new Date(today.getFullYear() + 1, 0, 1);
            const percent = (Math.abs(today - start) / Math.abs(end - start)) * 100;
            const embed = new Discord.MessageEmbed()
            .setColor("YELLOW").setDescription(`<@!${message.author.id}>, ${percent}%`)
            await message.channel.send(embed);
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
