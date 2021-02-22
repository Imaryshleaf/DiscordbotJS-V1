const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `first-msg`,
    desc: `Tell the first message ever sent in current channel`,
    usage: `\`${Prefix}first-msg\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ["first-msg","first-message"],
    cooldown: 5,
    details: `[first-msg](${CommandsHyoerlink} 'Tell the first message ever sent in current channel')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, msg, args) => {
        try {
            const channel = msg.channel;
            if (channel.guild && !channel.permissionsFor(client.user).has('READ_MESSAGE_HISTORY')) {
                return channel.send(`Sorry, I don't have permission to read message history.`);
            }
            const messages = await channel.messages.fetch({ after: 1, limit: 1 });
            const message = messages.first();
            const embed = new Discord.MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : 0x00AE86)
            .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setDescription(message.content)
            .setTimestamp(message.createdAt)
            .setFooter(`ID: ${message.id}`)
            .addField('❯ Jump', `[Click Here to Jump](${message.url})`);
            await message.channel.send(embed)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
