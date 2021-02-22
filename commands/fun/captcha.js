const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const fetch = require('node-fetch');

module.exports = {
    name: `captcha`,
    desc: `Gets a user's Captcha Image.`,
    usage: `\`${Prefix}captcha [name|nick|@mention|ID]\``,
    category: `Fun`,
    accessibly: `Everyone`,
    aliases: ["captcha"],
    cooldown: 10,
    details: `[captcha](${CommandsHyoerlink} 'Gets a user's Captcha Image.')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
            let msg = await message.channel.send("Please Wait...");
            try {
                let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${user.user.username}&url=${user.user.displayAvatarURL({ format: "png", size: 512 })}`));
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
