const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `roleinfo`,
    desc: `Shows information of the mentioned role`,
    usage: `\`${Prefix}roleinfo <role name|@role|ID>\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["roleinfo", "rinfo"],
    cooldown: 10,
    details: `[roleinfo](${CommandsHyoerlink} 'Shows information of the mentioned role')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!args[0]) return message.channel.send("Please mention the role or provide role name/id!")
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
            if (!role) return message.channel.send("Please provide a valid role!");
    
            const status = {
                false: "No",
                true: "Yes"
            }
    
            const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setColor(`${role.hexColor || "GREEN"}`)
            .setTitle("Role Info")
            .setDescription(
                `**ID**: \`${role.id}\`\n`+
                `**Name**: ${role.name}\n`+
                `**Mention**: <@&${role.id}>\n`+
                `**Created at**: ${role.createdAt.toDateString()}\n`+
                `**Hex**: ${role.hexColor}\n`+
                `**Members**: ${role.members.size}\n`+
                `**Position**: ${role.position}\n`+
                `**Mentionable**: ${status[role.mentionable]}`
            )
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
    
            message.channel.send(embed);
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
