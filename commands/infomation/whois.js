const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	PARTNERED_SERVER_OWNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	EARLY_VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
};
const deprecated = ['DISCORD_PARTNER', 'VERIFIED_DEVELOPER'];


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
                const authorFlags = message.author.flags ? message.author.flags.toArray().filter(flag => !deprecated.includes(flag)) : [];
                const emMyInfo = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(message.author.displayAvatarURL())
                .setAuthor(message.author.tag, message.author.displayAvatarURL(), message.author.avatarURL())
                .addField("❯ ID", message.author.id, true)
                .addField("❯ Nickname", `${message.member.nickname || "None"}`, true)
                .addField("❯ Account Created", `${message.author.createdAt.toDateString()} at ${message.author.createdAt.toLocaleTimeString()}`)
                .addField("❯ Joined Date", `${message.member.joinedAt.toDateString()} at ${message.member.joinedAt.toLocaleTimeString()}`)
                .addField('❯ Flags', authorFlags.length ? authorFlags.map(flag => flags[flag]).join(', ') : 'None')
                .addField('❯ Bot?', message.author.bot ? 'Yes' : 'No', true)
                .addField("❯ Roles", `\`\`${myrole}\`\``)
                message.channel.send(emMyInfo)
            } else {
                const userrole = await GuildMember.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.name).join(", ")|| 'none';
                const userFlags = GuildMember.user.flags ? GuildMember.user.flags.toArray().filter(flag => !deprecated.includes(flag)) : [];
                const emUserInfo = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(GuildMember.user.displayAvatarURL())
                .setAuthor(GuildMember.user.tag, GuildMember.user.displayAvatarURL(), GuildMember.user.avatarURL())
                .addField("❯ ID", GuildMember.id, true)
                .addField("❯ Nickname", `${GuildMember.nickname || "None"}`, true)
                .addField("❯ Account Created", `${GuildMember.user.createdAt.toDateString()} at ${GuildMember.user.createdAt.toLocaleTimeString()}`)
                .addField("❯ Joined Date", `${GuildMember.joinedAt.toDateString()} at ${GuildMember.joinedAt.toLocaleTimeString()}`)
                .addField('❯ Flags', userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None')
                .addField('❯ Bot?', GuildMember.user.bot ? 'Yes' : 'No', true)
                .addField("❯ Roles", `\`\`${userrole}\`\``)
                message.channel.send(emUserInfo)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
