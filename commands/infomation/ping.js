const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `ping`,
    desc: `Check the bot response time.`,
    usage: `\`${Prefix}ping\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ['ping'],
    cooldown: 10,
    details: `[ping](${CommandsHyoerlink} 'Check the bot response time')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            message.channel.send(':ping_pong: | Pong...').then(sent => {
                let ping = sent.createdTimestamp - message.createdTimestamp
                let choices = [":ping_pong: | Here is my ping right now"]
                let response = choices[Math.floor(Math.random() * choices.length)]
                const embeds = new Discord.MessageEmbed()
                //.setTitle(response)
                .setDescription(`Client Latency: \`${ping}\`, API Latency: \`${Math.round(client.ws.ping)}\``)
                sent.edit(embeds);
            });
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
