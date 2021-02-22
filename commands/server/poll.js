const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

module.exports = {
    name: `poll`,
    desc: `Create poll for server`,
    usage: `\`${Prefix}poll <#channel> <text>\``,
    category: `Server`,
    accessibly: `Administrator`,
    aliases: ["poll", "polling"],
    cooldown: 5,
    details: `[poll](${CommandsHyoerlink} 'Create poll for server')`,
    permissions: [ "Administrator", "Server Manager" ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return; // await console.log("Only owner, administrator and server manager can setup command whitelist")
            
            const InputChannel = String(args[0]).replace("<#", "").replace(">", "")
            const content = args.slice(1).join(' ');

            const channel = await client.channels.cache.get(InputChannel)
            if (!channel) return message.channel.send("Please mention a valid channel!")

            if (!InputChannel) return message.channel.send("Please provide a channel id")
            if (!content) return message.channel.send("Please provide poll description!")

            try {
                const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(content)
                .setFooter(`By ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
                let msg = await channel.send(embed)
                await msg.react('⬆️');
                await msg.react('⬇️');
                
                const done = new Discord.MessageEmbed()
                .setColor("GREEN").setTitle("Poll successfully created!")
                .addField("❯ Jump",`[Click Here to Jump](${msg.url})`)
                .setFooter(message.author.username, message.author.displayAvatarURL()).setTimestamp()
                await message.channel.send(done)
            } catch (error) {
                await message.channel.send(`Sorry, I failed to send message for ${args[0]} channel`)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
