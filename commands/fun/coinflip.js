const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `coinflip`,
    desc: `Flips a coin`,
    usage: `\`${Prefix}coinflip\``,
    category: `Fun`,
    accessibly: `Everyone`,
    aliases: ["coinflip"],
    cooldown: 5,
    details: `[coinflip](${CommandsHyoerlink} 'Flips a coin')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const n = Math.floor(Math.random() * 2);
            let result;
            if (n === 1) result = 'Heads';
            else result = 'Tails';
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN").setDescription(`**${message.member.displayName} Flipped ${result}**!`)
            message.channel.send(embed)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
