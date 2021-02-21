const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const fetch = require('node-fetch');

module.exports = {
    name: `love`,
    desc: `Shows Image of 2 Lovers, 3 persons!`,
    usage: `\`${Prefix}love <user(1)|user(2)>\``,
    category: `Fun`,
    accessibly: `Everyone`,
    aliases: ["love"],
    cooldown: 10,
    details: `[love](${CommandsHyoerlink} 'Shows Image of 2 Lovers, 3 persons!')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            let user =  await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.find(mp => mp.displayName === args[0]);
            let user2 =  await message.mentions.members.array()[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.user.username === args[1]) || message.guild.members.cache.find(mp => mp.displayName === args[1]);
            if(!args[0]) return message.channel.send("Enter Name Of Lover!")
            if(!args[1]) return message.channel.send("Enter Name Of Another Lover!")
            
            if (!user) return message.channel.send("Please Enter A Valid User!")
            if (!user2) return message.channel.send("Please Enter A Valid User!")
    
            let msg = await message.channel.send("Please Wait..");
            try {
                let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user.user.displayAvatarURL({ format: "png", size: 512 })}&user2=${user2.user.displayAvatarURL({ format: "png", size: 512 })}`));
                let json = await res.json();
                const embed = new Discord.MessageEmbed()
                .setImage(json.message).setFooter(`${message.author.tag}`)
                .setTimestamp().setColor("BLUE")
                await message.channel.send(embed).catch(()=>{});;
            } catch(e){
                msg.edit("Error, Please Try Again!");
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
