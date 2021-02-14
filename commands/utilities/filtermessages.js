const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const { messageFilter } = require('../../schema')

module.exports = {
    name: `filter`,
    desc: `Enable/Disable filter messages. If filter text/link enabled in channel, no one allowed to send text/link messages except whitelisted roles.`,
    usage: `\`${Prefix}filter <create | text | link | role | delete | help | collection>\``,
    category: `Utilities`,
    accessibly: `Administrator`,
    aliases: ['filter', "filtermessages"],
    cooldown: 10,
    details: `[filter](${CommandsHyoerlink} 'Enable/Disable filter messages. If filter text/link enabled in channel, no one allowed to send text/link messages except whitelisted roles.')`,
    permissions: [ "Administrator", "Server Manager" ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return; // await console.log("Only owner, administrator and server manager can setup command whitelist")
            const option = args[0];
            const input = args[1];
            if (option === 'create') {
                messageFilter.findOne({
                    serverID: `${message.guild.id}_MessageFilter`,
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                    if (!data) {
                        const newFilter = new messageFilter({
                            serverID: `${message.guild.id}_MessageFilter`,
                            allowRolestoText: [],
                            allowRolestoLink: [],
                            filterText: [],
                            filterLink: []
                        })
                        await newFilter.save().then(rest => console.log(rest)).catch(err => console.log(err)).then(async function() {
                            await message.channel.send("✅ | Successfully create new \`Message Filter\` for this server").catch(()=>{})
                        })
                    } else {
                        console.log(data)
                        await message.channel.send("❌ | \`Message Filter\` already exist in this server").catch(()=>{})
                    }
                })
            } else if (option === 'text') {
                messageFilter.findOne({
                    serverID: `${message.guild.id}_MessageFilter`,
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                    if (!data) {
                        return await message.channel.send(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
                    } else {
                        if (!data.filterText.includes(message.channel.id)) {
                            await data.filterText.push(message.channel.id)
                            await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                            await message.channel.send(`\`Filter Text Enabled\` - <#${message.channel.id}> - \`Enable\` delete text messages.`)
                        } else {
                            data.filterText.shift(message.channel.id)
                            await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                            await message.channel.send(`\`Filter Text Disabled\` - <#${message.channel.id}> - \`Disable\` delete text messages.`)
                        }
                    }
                })
            } else if (option === 'link') {
                messageFilter.findOne({
                    serverID: `${message.guild.id}_MessageFilter`,
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                    if (!data) {
                        return await message.channel.send(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
                    } else {
                        if (!data.filterLink.includes(message.channel.id)) {
                            await data.filterLink.push(message.channel.id)
                            await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                            await message.channel.send(`\`Filter Link Enabled\` - <#${message.channel.id}> - \`Enable\` delete Link messages.`)
                        } else {
                            data.filterLink.shift(message.channel.id)
                            await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                            await message.channel.send(`\`Filter Link Disabled\` - <#${message.channel.id}> - \`Disable\` delete Link messages.`)
                        }
                    }
                })
            } else if (option === 'role') {
                if (!input) return await message.channel.send("Please \`mention a role\` or \`a role id\`!")
                const checkRole = await message.guild.roles.cache.get(String(input).replace("<@&", "").replace(">", ""))
                if (!checkRole) return await message.channel.send("Please provide \`mention a valid role` or \`a valid role id\`")
                if (message.content.endsWith("-text")) {
                    messageFilter.findOne({
                        serverID: `${message.guild.id}_MessageFilter`,
                    }, async(error, data) => {
                        if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                        if (!data) {
                            return await message.channel.send(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
                        } else {
                            if (!data.allowRolestoText.includes(checkRole.id)) {
                                await data.allowRolestoText.push(checkRole.id)
                                await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                                await message.channel.send(`\`Filter Role Enabled\` - \`${checkRole.id}\` - \`Allow\` a user to bypass from \`Filter Text\`.`)
                            } else {
                                data.allowRolestoText.shift(checkRole.id)
                                await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                                await message.channel.send(`\`Filter Role Disabled\` - \`${checkRole.id}\` - \`Disallow\` a user to bypass from \`Filter Text\`.`)
                            }
                        }
                    })
                } else if (message.content.endsWith("-link")) {
                    messageFilter.findOne({
                        serverID: `${message.guild.id}_MessageFilter`,
                    }, async(error, data) => {
                        if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                        if (!data) {
                            return await message.channel.send(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
                        } else {
                            if (!data.allowRolestoLink.includes(checkRole.id)) {
                                await data.allowRolestoLink.push(checkRole.id)
                                await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                                await message.channel.send(`\`Filter Role Enabled\` - \`${checkRole.id}\` - \`Allow\` a user to bypass from \`Filter Link\`.`)
                            } else {
                                data.allowRolestoLink.shift(checkRole.id)
                                await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                                await message.channel.send(`\`Filter Role Disabled\` - \`${checkRole.id}\` - \`Disallow\` a user to bypass from \`Filter Link\`.`)
                            }
                        }
                    })
                } else {
                    await message.channel.send("Please provide the suffix \`<-text|-link>\`")
                }
            } else if (option === 'delete') {
                messageFilter.findOneAndDelete({
                    serverID: `${message.guild.id}_MessageFilter`,
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                    if (data) return message.channel.send("✅ | Successfully delete \`Message Filter\` from this server")
                    console.log(data)
                })
            } else if (option === 'help') {
                const embed = new Discord.MessageEmbed()
                .setColor("GOLD").setTitle("Message Filter - Help").setTimestamp()
                .setDescription(`\`${Prefix}filter create\` to create new \`Message Filter\`. \`${Prefix}filter delete\` to delete whole \`Message Filter\` data. \`${Prefix}filter text\` to \`enable\` and \`disable\` filter text messages. Note: \`Filter Role\` will give a user permission to bypass \`Filter Text\` or \`Filter Link\` and it apply in every channels. \`Filter Messages\` will delete \`text messages\` and \`links\` **except** for all **attachments**.`)
                .addField("⚒️ | Commands", 
                    `:one: | \`${Prefix}filter create\`\n`+
                    `:two: | \`${Prefix}filter <text|link>\`\n`+
                    `:three: | \`${Prefix}filter role <role|roleID> <-text|-link>\`\n`+
                    `:four: | \`${Prefix}filter delete\`\n`+
                    `:five: | \`${Prefix}filter help\`\n`+
                    `:six: | \`${Prefix}filter collection\``
                )
                .setFooter(`Powered by ${client.user.username}`, client.user.displayAvatarURL())
                await message.channel.send(embed).catch(()=>{})
            } else if (option === 'collection') {
                messageFilter.find({ serverID: `${message.guild.id}_MessageFilter` }).sort([['descending']]).exec(async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
                    try {
                        let collection = undefined;
                        await data.forEach(data => (collection = data));
                        const allowedRolestoText = collection.allowRolestoText.map(data => `<@&${data}>`);
                        const allowedRolestoLink = collection.allowRolestoLink.map(data => `<@&${data}>`);
                        const channeltofilterText = collection.filterText.map(data => `<#${data}>`);
                        const channeltofilterLink = collection.filterLink.map(data => `<#${data}>`);
                        // Show the collection
                        const embed = new Discord.MessageEmbed()
                        .setTitle("Commands - Channel Whitelist")
                        .setDescription(`Deleting data may not fully deleted from database. If \`@deleted-role\` or \`#deleted-channel\` still exist, please run \`${Prefix}filter delete\` to delete the entire data.`)
                        if (data.length === 0) {
                            embed.setColor("RED")
                            embed.setDescription("No data found")
                            embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
                            embed.setTimestamp()
                        } else if (data.length < 31) {
                            embed.setColor("GREEN")
                            embed.addField("ℹ️ | Role whitelist", `> Enable/disable whitelisted roles, run \`${Prefix}filter role <role|roleID> <-text|-link>\`. If \`a role is in list\`, user/members \`allowed to bypass\` from message filter in every channels.`)
                            embed.addField(`Bypass Filter Text`, `${allowedRolestoText.join("\n") || "None"}`,true)
                            embed.addField(`Bypass Filter Link`, `${allowedRolestoLink.join("\n") || "None"}`,true)
                            embed.addField("ℹ️ | Message Filter", `> Enable/disable Message Filter, run \`${Prefix}filter <text|link>\`. If \`Message Filter\` enabled, \`text/link\` messages will be deleted except for a user/members who have the whitelisted role.`)
                            embed.addField(`Channel Filter Text`, `${channeltofilterText.join("\n") || "None"}`,true)
                            embed.addField(`Channel Filter Link`, `${channeltofilterLink.join("\n") || "None"}`,true)
                            embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
                            embed.setTimestamp();
                        }
                        return await message.channel.send(embed)
                    } catch (error) {
                        return message.channel.send(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
                    }
                })
            } else if (option === 'prune-choose') {
                if (!input) return await message.channel.send("Please provide a role id!")
                messageFilter.findOne({ // -- Not delete but update
                    serverID: `${message.guild.id}_MessageFilter`,
                }, async(error, data) => {
                    if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
                    if (!data) {
                        return await console.log(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
                    } else {
                        if (data.filterText.includes(input)) {
                            data.filterText.shift(input); // -- Delete channel id - Text
                            await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                            console.log("Manualy delete Filter Messages - Fiter Text & Filter Link")    
                        } else if (data.filterLink.includes(input)) {
                            data.filterLink.shift(input); // -- Delete channel id - Link
                            await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                            console.log("Manualy delete Filter Messages - Fiter Text & Filter Link")
    
                        }
                    }
                })
            } else {
                await message.channel.send("❌ | Please add at least one option.")
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
