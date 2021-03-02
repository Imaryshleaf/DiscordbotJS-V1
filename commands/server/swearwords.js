const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const { swearWords } = require('../../schema')

module.exports = {
    name: `swearword`,
    desc: `Delete swear words by creating swear words collection`,
    usage: `\`${Prefix}swearword <create|swear|collection|delete|help>\``,
    category: `Server`,
    accessibly: `Administrator`,
    aliases: ["swearword", "swearw"],
    cooldown: 5,
    details: `[swearword](${CommandsHyoerlink} 'Delete swear words by creating swear words collection')`,
    permissions: [ "Administrator", "Server Manager" ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return; // await console.log("Only owner, administrator and server manager can setup command whitelist")
            const options = args[0];
            const input = args[1];
            if (options === "create") {
                swearWords.findOne({
                    serverID: `${message.guild.id}_swearWords`
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    if (!data) {
                        const newBlockedWord = new swearWords({
                            serverID: `${message.guild.id}_swearWords`,
                            callbackMessage: "No swear words",
                            blockedWords: []
                        })
                        await newBlockedWord.save().then(rest => console.log(rest)).catch(err => console.log(err)).then(async function() {
                            await message.channel.send("✅ | Successfully create new \`swear words collection\` for this server").catch(()=>{})
                        })
                    } else {
                        console.log(data)
                        await message.channel.send("❌ | \`swear words collection\` already exist in this server").catch(()=>{})
                    }
                })
            } else if (options === "swear") {
                if (!input) return message.channel.send("Please provide at least 1 word!")
                swearWords.findOne({
                    serverID: `${message.guild.id}_swearWords`
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    if (!data) {
                        return await message.channel.send(`❌ | This server don't have \`swear words collection\`. Run command \`${Prefix}swearword create\` to create new one`)
                    } else {
                        try {
                            if (!data.blockedWords.includes(input)) {
                                await data.blockedWords.push(input)
                                await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                                await message.channel.send(`✅ | Added ||${input}|| to swear words collection.`)
                            } else {
                                data.blockedWords.shift(input)
                                await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                                await message.channel.send(`✅ | Removed ||${input}|| from swear words collection.`)
                            }
                        } catch (error) {
                            return await message.channel.send(`❌ | This server don't have \`swear words collection\`. Run command \`${Prefix}swearword create\` to create new one`)
                        }
                    }
                })
            } else if (options === "collection") {
                swearWords.find({ serverID: `${message.guild.id}_swearWords`}).sort([['descending']]).exec(async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    try {
                        let collection = undefined;
                        await data.forEach(data => (collection = data));
                        const blockedWordsList = collection.blockedWords.map(data => `${data}`);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name} - List of Blocked Words`)
                        if (data.length === 0) {
                            embed.setColor("RED")
                            embed.setDescription("No data found")
                            embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
                            embed.setTimestamp()
                        } else {
                            embed.setColor("GREEN")
                            embed.setDescription(`${blockedWordsList.join(" ") || "None"}`)
                            embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
                            embed.setTimestamp()
                        }
                        return await message.channel.send(embed)
                    } catch (error) {
                        return await message.channel.send(`❌ | This server don't have \`swear words collection\`. Run command \`${Prefix}swearword create\` to create new one`)
                    }
                })
            } else if (options === "delete") {
                swearWords.findOneAndDelete({ serverID: `${message.guild.id}_swearWords`}, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    if (data) return message.channel.send("✅ | Successfully delete \`swear words collection\` from this server")
                    console.log(data)
                })
            } else if (options === "help") {
                const embed = new Discord.MessageEmbed()
                .setColor("GOLD").setTitle("Swear Words - Help").setTimestamp()
                .addField("⚒️ | Commands", 
                    `:one: | \`${Prefix}swearword create\` : create new collection.\n`+
                    `:two: | \`${Prefix}swearword swear <word>\` : add/remove swear words\n`+
                    `:three: | \`${Prefix}swearword collection\` : display swear words collection\n`+
                    `:four: | \`${Prefix}swearword delete\` : erase the entire collection of swear words\n`+
                    `:five: | \`${Prefix}swearword help\` : display help for using this command`
                )
                .setFooter(`Powered by ${client.user.username}`, client.user.displayAvatarURL())
                await message.channel.send(embed).catch(()=>{})
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
