const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `age`,
    desc: `Get info about how old someone born in a certain year is.`,
    usage: `\`${Prefix}age <year>\``,
    category: `Analyze`,
    accessibly: `Everyone`,
    aliases: ["age"],
    cooldown: 5,
    details: `[age](${CommandsHyoerlink} 'Get info about how old someone born in a certain year is')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const inputYear =  args[0];
            // Get time
            const today = new Date()
            const currentYear = today.getFullYear();
            // Show
            if (!inputYear) return await message.channel.send("What year would you like to get the age for?")
            if (inputYear) {
                const age = currentYear - inputYear;
                const embed = new Discord.MessageEmbed()
                .setColor("GREY").setDescription(`${age} years old. <@!${message.author.id}>`)
                await message.channel.send(embed)
            } 
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
