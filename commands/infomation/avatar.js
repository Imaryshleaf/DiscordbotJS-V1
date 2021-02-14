const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `avatar`,
    desc: `Gets a user's avatar.`,
    usage: `\`${Prefix}avatar [@mention]\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["avatar"],
    cooldown: 5,
    details: `[avatar](${CommandsHyoerlink} 'Gets a user's avatar')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const GetInput = args[0]
            const AllMembers = message.guild.members.cache;
            const GuildMember = message.mentions.members.first() || AllMembers.find(member => member.nickname === GetInput) || AllMembers.find(member => member.id === GetInput) || AllMembers.find(member => member.user.username === GetInput)
            //if (!GuildMember) return; // -- Ignore if the member not found.
            if (!GetInput) {
                const myAvatar = new Discord.MessageEmbed()
                .setColor("PURPLE")
                .setAuthor(`Download`, message.author.displayAvatarURL(), message.author.avatarURL())
                .setImage(message.author.displayAvatarURL({dynamic:true, size: 512}))
                message.channel.send(myAvatar)
            } else {
                const YourAvatar = new Discord.MessageEmbed()
                .setColor("PURPLE")
                .setAuthor(`Download`, GuildMember.user.displayAvatarURL(), GuildMember.user.avatarURL())
                .setImage(GuildMember.user.displayAvatarURL({dynamic:true, size: 512}))
                message.channel.send(YourAvatar)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
