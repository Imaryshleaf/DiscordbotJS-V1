const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const request = require('node-superfetch');

module.exports = {
    name: `gender`,
    desc: `Determines the gender from a name`,
    usage: `\`${Prefix}gender <name>\``,
    category: `Analyze`,
    accessibly: `Everyone`,
    aliases: ["gender"],
    cooldown: 5,
    details: `[gender](${CommandsHyoerlink} 'Determines the gender from a name')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const input = args[0];
            if (!input) return await message.channel.send("Please provide a name to determine the gender of!")
            try {
                const { body } = await request.get(`https://api.genderize.io/?name=${input}`);
                if (!body.gender) {
                    await message.channel.send(`I can't predict what gender ${body.name} is`);
                } else {
                    const validName = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Gender Predicted")
                    .setDescription(
                        `**Name**: ${body.name}\n`+
                        `**Gender**: ${body.gender}\n`+
                        `**Probability**: ${Math.round(body.probability * 100)}%\n`+
                        `**Counts**: ${body.count}\n`+
                        `**By**: [Genderize.io](https://genderize.io/)`
                    )
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp()
                    await message.channel.send(validName);
                }
            } catch (err) {
                return message.channel.send("Sorry, I cannot predict the name for now.")
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
