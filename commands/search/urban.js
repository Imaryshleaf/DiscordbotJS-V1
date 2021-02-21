const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const urban = require('relevant-urban');

module.exports = {
    name: `urban`,
    desc: `Search and return Urban Dictionary definitions. Fetching the information may take few seconds and sometimes failed.`,
    usage: `\`${Prefix}urban <search terms>\``,
    category: `Search`,
    accessibly: `Everyone`,
    aliases: ["ud", "urbandictionary"],
    cooldown: 5,
    details: `[urban](${CommandsHyoerlink} 'Search and return Urban Dictionary definitions.')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (message.channel.nsfw == false) return await message.channel.send("Please run this command in `nsfw` channel!")
            if(!args[0]) return await message.channel.send("Please type any terms to get results from Urban Dictionary!");
    
            let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
            try {
                let res = await urban(args.join(' '))
                if (!res) return message.channel.send("No results found!");
                let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;
    
                const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setThumbnail(image)
                .setAuthor(`urban by ${author || "unknown"}`)
                .setDescription(`**Defintion:**\n*${definition || "No definition"}*\n\n**Example:**\n*${example || "No Example"}*`)
                .addField('**Rating:**', `**👍 ${thumbsUp} | 👎 ${thumbsDown}**\n**_[link to ${word}](${urbanURL})_**`)
                .setFooter(`Word - ${word}`)
                .setTimestamp()
                message.channel.send(embed).catch(()=>{})
            } catch (error) {
                await message.channel.send("Error, Try Again!");
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
