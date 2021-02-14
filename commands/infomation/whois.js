const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `whois`,
    desc: `Shows info about a user.`,
    usage: `\`${Prefix}whois [@mention]\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["userinfo", "whois"],
    cooldown: 5,
    details: `[whois](${CommandsHyoerlink} 'Shows info about a user')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            const GetInput = args[0]
            const AllMembers = message.guild.members.cache;
            const GuildMember = message.mentions.members.first() || AllMembers.find(member => member.nickname === GetInput) || AllMembers.find(member => member.id === GetInput) || AllMembers.find(member => member.user.username === GetInput)
            if (!GetInput) {
                const myrole = message.member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.name).join(", ")|| 'none';
                const emMyInfo = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(message.author.tag, message.author.displayAvatarURL(), message.author.avatarURL())
                .addField("ID", message.author.id, true)
                .addField("Nickname", `${message.member.nickname || "None"}`, true)
                .addField("Account Created", `${message.author.createdAt.toDateString()}. ${message.author.createdAt.toLocaleTimeString()}`)
                .addField("Joined Date", `${message.member.joinedAt.toDateString()}. ${message.member.joinedAt.toLocaleTimeString()}`)
                .addField("Roles", `\`\`${myrole}\`\``)
                message.channel.send(emMyInfo)
            } else {
                const userrole = await GuildMember.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.name).join(", ")|| 'none';
                const emUserInfo = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(GuildMember.user.displayAvatarURL())
                .setAuthor(GuildMember.user.tag, GuildMember.user.displayAvatarURL(), GuildMember.user.avatarURL())
                .addField("ID", GuildMember.id, true)
                .addField("Nickname", `${GuildMember.nickname || "None"}`, true)
                .addField("Account Created", `${GuildMember.user.createdAt.toDateString()}. ${GuildMember.user.createdAt.toLocaleTimeString()}`)
                .addField("Joined Date", `${GuildMember.joinedAt.toDateString()}. ${GuildMember.joinedAt.toLocaleTimeString()}`)
                .addField("Roles", `\`\`${userrole}\`\``)
                message.channel.send(emUserInfo)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
