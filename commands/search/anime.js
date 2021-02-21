const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `anime`,
    desc: `Searches for returns details of anime`,
    usage: `\`${Prefix}anime <search terms>\``,
    category: `Search`,
    accessibly: `Everyone`,
    aliases: ["anime"],
    cooldown: 5,
    details: `[anime](${CommandsHyoerlink} 'Searches for returns details of anime')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const input =  args.slice(0).join(' ')
            if (!input) return await message.channel.send("Please provide a query!")
			
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
