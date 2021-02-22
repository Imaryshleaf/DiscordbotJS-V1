const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const request = require('node-superfetch');

module.exports = {
    name: `iss`,
    desc: `Tell the Internation Space Station currently is`,
    usage: `\`${Prefix}iss\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["iss", "international-space-station"],
    cooldown: 5,
    details: `[iss](${CommandsHyoerlink} 'Tell the Internation Space Station currently is')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            try {
                const { body } = await request.get('http://api.open-notify.org/iss-now.json');
                const position = body.iss_position;
                const embed = new Discord.MessageEmbed()
                .setTitle("ISS Current Location").setColor("BLUE")
                .setDescription(`**Currently at**: ${position.latitude}, ${position.longitude}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
                await message.channel.send(embed);
            } catch (err) {
                return message.channel.send("Sorry, I cannot complete your request.")
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
