const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const math = require('mathjs')

module.exports = {
    name: `calculate`,
    desc: `Shows Calculated Answers Of User's Query`,
    usage: `\`${Prefix}calculate <mathematical>\``,
    category: `Utilities`,
    accessibly: `Everyone`,
    aliases: ["calculate", "math"],
    cooldown: 5,
    details: `[calculate](${CommandsHyoerlink} 'Shows Calculated Answers Of User's Query')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!args[0]) return message.channel.send("**Enter Something To Calculate**");

            let result;
            try {
                result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
            } catch (e) {
                const embedHelp = new Discord.MessageEmbed()
                .setAuthor("Please input an expression to evaluate!", `${client.user.displayAvatarURL({ dynamic: true })}`)
                .addField("**Example:**",
                    `:one: **sqrt equation**\n》 \`sqrt(3^2 + 4^2) = 5\`\n`+
                    `:two: **Units to Units**\n》 \`2 inch to cm = 0.58\`\n`+
                    `:three: **Complex Expressions**\n》 \`cos(45 deg) = 0.7071067811865476\`\n`+
                    `:four: **Basic Maths Expressions**\n》 \`+, -, ^, /, decimals\` = **2.5 - 2 = 0.5**`
                ).setColor("GREEN").setTimestamp().setFooter(`${message.author.tag}`);
                return message.channel.send(embedHelp)
            }
    
            const embed = new Discord.MessageEmbed()
            .setColor("#15a54a")
            .addField("**Operation**", `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField("**Result**", `\`\`\`Js\n${result}\`\`\``)
            .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp().setFooter(`${message.author.tag}`);
            message.channel.send(embed);

        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
