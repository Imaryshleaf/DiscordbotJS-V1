const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `blacklist`,
    desc: `Enable/Disable channel blacklisting.`,
    usage: `\`${Prefix}blacklist\``,
    category: `Server`,
    accessibly: `Administrator`,
    aliases: ['blacklist'],
    cooldown: 10,
    details: `[blacklist](${CommandsHyoerlink} 'Enable/Disable channel blacklisting.')`,
    permissions: [ "Administrator", "Server Manager" ],
    status: "Inactive",
    launch: async(client, message, args) => {
        try {
            await message.channel.send("Sorry, this command is disabed for future update.")
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
