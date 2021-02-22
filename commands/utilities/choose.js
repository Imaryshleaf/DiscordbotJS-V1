const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const math = require('mathjs')

module.exports = {
    name: `choose`,
    desc: `Get help to makes a choice for you`,
    usage: `\`${Prefix}choose <option1 | option2>\``,
    category: `Utilities`,
    accessibly: `Everyone`,
    aliases: ["choose"],
    cooldown: 5,
    details: `[choose](${CommandsHyoerlink} 'Get help to makes a choice for you')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!args[1]) return message.channel.send("You need to provide at least 2 options!");
            const splitted = args.join(" ").split(" | ");
            if (!args.join(" ").includes("|") || args[0] == "|") return message.channel.send("Please provide 2 options!");
                const answers = Math.floor(Math.random() * splitted.length)
                const choices_1 = 
                [
                    "I'd choose",
                    "I think I'll choose",
                    "I'll pick",
                    "Not really sure, but...",
                    "I think it's"
                ]
                const choices_2 = [
                    ".",
                    ".",
                    "."
                ]
                const choices_3 = [
                    ":thinking:", 
                    ":face_with_monocle:", 
                ]
        
            const radnChoose_1 = Math.floor(Math.random() * choices_1.length)
            const radnChoose_2 = Math.floor(Math.random() * choices_2.length)
            const radnChoose_3 = Math.floor(Math.random() * choices_3.length)
            
            const embed = new Discord.MessageEmbed()
            .setColor("#e8ee5b")
            .setDescription(`${choices_3[radnChoose_3]} ${message.author.username}, ${choices_1[radnChoose_1]} **${splitted[answers]}**${choices_2[radnChoose_2]}`)
            await message.channel.send(embed).catch(()=>{});

        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
