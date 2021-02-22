const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const fetch = require('node-fetch');

module.exports = {
    name: `tweet`,
    desc: `Sends A Tweet`,
    usage: `\`${Prefix}tweet [username] <text>\``,
    category: `Fun`,
    accessibly: `Everyone`,
    aliases: ["tweet"],
    cooldown: 10,
    details: `[tweet](${CommandsHyoerlink} 'Sends A Tweet')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            let user = args[0];
            let text = args.slice(1).join(" ");
            let msg = await message.channel.send("Please wait...");
    
            if(!user) return await msg.edit("You Have To Enter Someone's Twitter Nickname!");
            if(!text) return await msg.edit("You must enter a message!");
    
            try {
                let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
                let json = await res.json();
                const embed = new Discord.MessageEmbed()
                .setImage(json.message).setFooter(`${message.author.tag}`)
                .setTimestamp().setColor("BLUE")
                await message.channel.send(embed).catch(()=>{});;
                await msg.delete({ timeout: 5000 });
            } catch(e){
                await msg.edit("Error, Try Again!");
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
