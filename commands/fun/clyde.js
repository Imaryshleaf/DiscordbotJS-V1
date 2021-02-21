const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const fetch = require('node-fetch');

module.exports = {
    name: `clyde`,
    desc: `Shows Embed Send By Clyde Bot`,
    usage: `\`${Prefix}clyde <text>\``,
    category: `Fun`,
    accessibly: `Everyone`,
    aliases: ["clyde"],
    cooldown: 10,
    details: `[clyde](${CommandsHyoerlink} 'Shows Embed Send By Clyde Bot')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            let text = args.join(" ");
            if (!text) return await message.channel.send("Please type any text!");
            let msg = await message.channel.send("Please Wait...");
            try {
                let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
                let json = await res.json();
                const embed = new Discord.MessageEmbed()
                .setImage(json.message).setFooter(`${message.author.tag}`)
                .setTimestamp().setColor("BLUE")
                await message.channel.send(embed).catch(()=>{});;
                await msg.delete({ timeout: 5000 });
            } catch (e) {
                await msg.edit("Error, Try Again!");
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
