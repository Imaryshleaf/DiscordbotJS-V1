const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const weather = require('weather-js');

module.exports = {
    name: `weather`,
    desc: `Shows weather info of a city`,
    usage: `\`${Prefix}weather <city name>\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["weather"],
    cooldown: 5,
    details: `[weather](${CommandsHyoerlink} 'Shows weather info of a city')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if(!args[0]) return message.channel.send('Please provide a city name!')

            weather.find({search: args.join(" "), degreeType: 'C'}, async function(err, result){
            if (err) return await message.channel.send("Please provide a valid location!");
            
            if (result.length === 0) {
                message.channel.send('Sorry, no result were found.')
                return undefined;
            }

            let current = result[0].current;
            let location = result[0].location;

            const embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`**${current.skytext}**`)
            .setThumbnail(current.imageUrl)
            .addField(`Weather in ${current.observationpoint}`, 
                `**Timezone**: UTC ${location.timezone}\n`+
                `**Degree Type**: ${location.degreetype}\n`+
                `**Temperature**: ${current.temperature} Degrees\n`+
                `**Feels Like**: ${current.feelslike} Degrees\n`+
                `**Winds**: ${current.winddisplay}\n`+
                `**Humidity**: ${current.humidity}\n`+
                `**Date**: ${current.date}\n`+
                `**Day**: ${current.day}`
            )
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            await message.channel.send({embed})
        });
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
