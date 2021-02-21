const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `character-count`,
    desc: `Counting how much total character from your text`,
    usage: `\`${Prefix}character-count <text>\``,
    category: `analyze`,
    accessibly: `Everyone`,
    aliases: ['character-count', 'chars'],
    cooldown: 5,
    details: `[character-count](${CommandsHyoerlink} 'Counting how much total character from your text')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const text =  args.slice(0).join(' ');
            // Show
            if (!text) return await message.channel.send("Please type any text!")
            const embed = new Discord.MessageEmbed()
            .setColor("#8aa280").setDescription(`${text.length} characters. <@!${message.author.id}>`)
            await message.channel.send(embed)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
