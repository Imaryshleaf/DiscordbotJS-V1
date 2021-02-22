const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink, Developers } = require('../../settings.json')

module.exports = {
    name: `evaluate`,
    desc: `Evaluates js code`,
    usage: `\`${Prefix}evaluate <input>\``,
    category: `Developer`,
    accessibly: `Developer`,
    aliases: ["evaluate","eval"],
    cooldown: 0,
    details: `[evaluate](${CommandsHyoerlink} 'Evaluates js code')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            function clean(text) {
                if (typeof text === "string")
                    return text
                        .replace(/`/g, "`" + String.fromCharCode(8203))
                        .replace(/@/g, "@" + String.fromCharCode(8203));
                else return text;
            }
    
            if (!Developers.includes(message.author.id)) return;
    
            try {
                const code = args.join(" ").replace("```js", "").replace("```", "")
                let evaled = eval(code);

                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    
                message.react("✅");
                let emb = new Discord.MessageEmbed()
                    .setTitle('Result')
                    .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
                    .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("#eb3e83").setTimestamp()
                message.channel.send(emb);
            } catch (err) {
                message.react("⚠");
                let emb = new Discord.MessageEmbed()
                    .setTitle('Result')
                    .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                    .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("#eb3e83").setTimestamp()
                message.channel.send(emb);
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
