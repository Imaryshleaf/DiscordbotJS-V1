async function index(){
    // Basic
    const Discord = require('discord.js');
    const client = new Discord.Client({disableMentions: 'everyone', ws: { intents: Discord.Intents.ALL }});
    const { redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright } = require('chalk')
    
    // Commands
    const fs = require('fs')
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    const cooldowns = new Discord.Collection();
    client.categories = fs.readdirSync("./commands/");
    ["command"].forEach(handler => { require(`./commands/handlers/${handler}`)(client);});
    
    // Custom Module
    const Moderation = require('./simplified')
    const Mod = new Moderation(client);
    const Listener = require('./listener')
    const Listen = new Listener(client); Listen.Now(true);
    const { messageFilter, whitelist } = require('./schema')
    const Awaiting = require('./resources/modules/awaiting')
    const waitFor = new Awaiting()

    // Online Database
    const mongoose = require("mongoose");
    async function MongoDB() {
        console.log(yellowBright('Connecting to MongoDB ...'));
        mongoose.connect("mongodb+srv://Mavfymongodbcluster:Mavfymongodbcluster@mavfy-cluster.cqqt5.mongodb.net/Mavydb", { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(`MavyDB - Error: Failed to connect MongoDB [Error :: ${err}]`));
        mongoose.connection.on('error', function (err) { console.log('MavyDB: Failed to connect to MongoDB. [Disconnected : True]'); mongoose.disconnect().catch(()=>{}); });
        mongoose.connection.once('open', function (d) { console.log("\x1b[32mMavyDB:\x1b[0m connected to \x1b[31m" + mongoose.connection.host + " \x1b[0m"); })
    } MongoDB().catch(err => {console.log(`"MongoDB - Error: ${redBright(err)}`)})
    
    // Custom settings
    const Prefix = '!'
    const DeveloperID = ['802906117318770688', '714486020594204754']
    const ServerID = []
    const CooldownLog = []
    const whiteListChannel = []
    const blackListChannel = []
    const Emoji = { Happy1:'<a:eName:eID>', Happy2:'<a:eName:eID>', Sad1:'<a:eName:eID>', Sad2:'<a:eName:eID>' }
    const Topics = ['Welcome to the server!']

    // Custom functions
    let Print = function Print(callback)                                        { return console.log(callback); }
    let Randomized = async function Randomized(Arr)                             { let Picky = Math.floor(Math.random() * Arr.length); return await Arr[Picky];}
    let inChannel = async function inChannel(listener, id)                      { return await listener.channel.id === id; }
    let hasRole = async function hasRole(listener, name)                        { return await listener.member.roles.cache.find(role => role.name === name); }
    let hasID = async function hasID(listener, id)                              { return await listener.author.id === id; }
    let Command = async function Command(listener, prefix, command)             { return await listener.content.startsWith(prefix + command); }
    let dmChannel = async function dmChannel(listener)                          { return await listener.channel.type === 'dm'; }
    let ChannelTopic = async function ChannelTopic(listener, Arr)               { return await Arr.some(content => listener.channel.topic === content); }
    let Importer = async function Importer(data, category, client, message)     { try { return require(`./commands/${category}/${data}.js`)(client, message) } catch (error) { return; } }

    // Client Event
    client.on('ready', () => {
        Print(`[DB-JS] :: Name:     : ${client.user.username}.`)
        Print(`[DB-JS] :: ID        : ${client.user.id}`)
        Print(`[DB-JS] :: Prefix    : ${Prefix}`)
        client.user.setStatus('dnd')
        const users = client.users.cache.size;
        const owner = '714486020594204754'
        const developer = '802906117318770688'
        const participant = '786158878005919764'
        const ownerName = client.users.cache.get(owner)
        const developerName = client.users.cache.get(developer)
        const participantName = client.users.cache.get(participant)
	    //client.user.setActivity(`${users.toString()} users with ${Prefix} | Currently is underdevelopment by ${developerName.username}, ${ownerName.username} and ${participantName.username}`, {
        client.user.setActivity(`${users.toString()} users with ${Prefix} - LU:2/22/21`, {
            type: 'LISTENING',
        })
        readyLog('811756217453117461')
        async function readyLog(channelLogs) {
            const now = new Date(Date.now())
            const channel = client.channels.cache.get(channelLogs)
            const embed = new Discord.MessageEmbed()
            .setColor('#70f7c1')
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            .setDescription(`System has been restarted at \`${now}\`.\nPossible causes:\n> ・ Dyno restarted\n> ・ Development process`)
            await channel.send(embed)
        }
    })
    
    // Raw event -- Helper
    client.on('raw', packet => {
        let eventT = packet.t
        let eventD = packet.d
        if (!['MESSAGE_CREATE'].includes(eventT)) return;
        // Code;
    })
    
    // Messaging
    client.on('message', async (message) => {
        async function Messages() {
            if (message.author.bot) return false;
            if (await dmChannel(message)) return false; // ignore message content from DM Channel.
            if (!message.guild.me.permissions.has(['VIEW_CHANNEL','SEND_MESSAGES'])) return console.log('Error! Missing permission: < View channel | Send Message >')
            if (!message.guild.me.permissions.has(['ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJIS'])) return message.channel.send("Missing Permissions \`[Add reactions - Embed links - Attach files - Use external emojis]\`").catch(()=>{})
            // Simplified commands
            const args = message.content.slice(Prefix.length).trim().split(/ +/);
            // Developer and Moderator
            if (await hasID(message, '802906117318770688') || await hasRole(message, 'Moderator')) {

                if (await Command(message, Prefix, 'mute')) {
                    await Mod.Mute(message, args[1]).catch(err => message.channel.send(err).catch(()=>{}));
                }
                if (await Command(message, Prefix, 'unmute')) {
                    await Mod.Unmute(message, args[1]).catch(err => message.channel.send(err).catch(()=>{}));
                }
                if (await Command(message, Prefix, 'prune')) {
                    await Mod.Prune(message, args[1], args[2]).catch(err => message.channel.send(err).catch(()=>{}));
                }
            }
            // Developer
            if (await hasID(message, '802906117318770688') || await hasID(message, '714486020594204754')) {
                if (await Command(message, Prefix, 'args')) {
                    message.channel.send(`- Args 1: '${args[1] || 'Null'}'\n- Args 2: '${args[2] || 'Null'}'\n- Args 3: '${args[3] || 'Null'}'\n- Args 4: '${args[4] || 'Null'}'\n- Args 5: '${args[5] || 'Null'}'`, { code: 'fix' })
                }
                if (await Command(message, Prefix, 'password')) {
                    await message.channel.send(`${await Mod.Password(16) || "I broke the code"}`)
                }
                if (await Command(message, Prefix, 'uptime')) {
                    await message.channel.send(`${await Mod.Uptime() || "I broke the time"}`, {code:'diff'})
                }
                if (await Command(message, Prefix, 'restart')) {
                    MongoDB().then(message.react('✅').catch(()=>{}))
                }
            }
            if (await Command(message, Prefix, 'brawlhalla')) {
                await Importer("brawlhalla", "software", client, message)
            }
        } Messages().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
    })
    
    // Functions
    client.on('message', async (message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm' && message.content.startsWith('clear')) { // -- Delete DM History
            message.react('🆗').catch(()=>{})
            let fetchDMChannel = message.channel.messages.fetch({limit:50})
            fetchDMChannel.then(msgs=>msgs.filter(m => m.author.id === client.user.id).map(r => r.delete())).then(
                await message.author.deleteDM().catch(() => {})
            )
        }
        // Filter Messages
        messageFilter.findOne({
            serverID: `${message.guild.id}_MessageFilter`,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
            try {
                const allowedRolestoText = data.allowRolestoText;
                const allowedRolestoLink = data.allowRolestoLink;
                const channeltofilterText = data.filterText;
                const channeltofilterLink = data.filterLink;
                const thisGuild = String(data.serverID).replace("MessageFilter", "").replace("_", "")
                if (message.guild.id === thisGuild) {
                    // Text
                    if (channeltofilterText.includes(message.channel.id)) {
                        if (allowedRolestoText.some(role => message.member.roles.cache.has(role))) {
                            console.log(`User ${message.author.username} allowed to bypass Filter Text`)
                        } else {
                            if (message.content !== "") { // Allow all attachments
                                await message.delete().catch(()=>{}).then(async function() { // Delete any messages including links
                                    await message.channel.send(`<@!${message.author.id}> text messages are not allowed in this channel.`).then(reply =>reply.delete({timeout:5000}).catch(()=>{}))
                                })
                            }
                        }
                    }
                    // Link
                    if (channeltofilterLink.includes(message.channel.id)) {
                        if (allowedRolestoLink.some(role => message.member.roles.cache.has(role))) {
                            console.log(`User ${message.author.username} allowed to bypass Filter Link`)
                        } else {
                            if (message.content.includes("http://") || message.content.includes("https://")) {
                                await message.delete().catch(()=>{}).then(async function() {
                                    await message.channel.send(`<@!${message.author.id}> links are not allowed in this channel.`).then(reply =>reply.delete({timeout:5000}).catch(()=>{}))
                                })
                            }
                        }
                    }
                }
            } catch (error) {
                return;
            }
        })
    })
    
    // Commands
    client.on('message', async(message) => {
        async function Messages() {
            // Argument --- Latest
            const args = message.content.slice(Prefix.length).trim().split(/ +/);
            // Command handlers
            const commandName = args.shift().toLowerCase();
            if (commandName.length === 0) return;
            if (!commandName) return;
            // Commands aliases.
            let getcommand = client.commands.get(client.aliases.get(commandName)||commandName);
            if (!getcommand) return; //console.log(`${commandName} from ${getcommand}`)
            // Commands cooldown.
            if(!cooldowns.has(getcommand.name)){
                cooldowns.set(getcommand.name, new Discord.Collection());
            }
            const now = Date.now();
            const timestamps = cooldowns.get(getcommand.name);
            const cooldownAmount = (getcommand.cooldown || 2 /*3sec*/) * 1000
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now)/1000;
                    await message.delete().catch(()=>{});
                    return message.channel.send(`${message.member.nickname||message.author.username}, please cool down! **(** \`${getcommand.name}\` | **${timeLeft.toFixed(1)}** second(s) left **)** `).then(replies => replies.delete({timeout:5000}));
                }
            } else {
                timestamps.set(message.author.id, now); // -- Add cooldown
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // -- Remove cooldown
            }
            // Launch the commands
            try {
                whitelist.find({ // -- Whitelist channel so the bot can execute the commands
                    serverID: message.guild.id,
                    ChannelID: message.channel.id,
                }, async (error, data) => {
                    if (error) return console.log('Whitelist Channels - Error :: '+error)
                    const whitelistedinServer = data.map(data => data.serverID)
                    const whitelistedChannel = data.map(data => data.ChannelID)
                    if (whitelistedinServer.some(dataServerID => message.guild.id === dataServerID) && whitelistedChannel.some(dataChannelID => message.channel.id === dataChannelID)) {
                        // For all members - enable (including developers)
                        if (timestamps.has(message.author.id)) {
                            await getcommand.launch(client, message, args);
                        }
                        console.log("Executed")
                    } else {
                        console.log("Cannot execute commands")
                        // // For all developers - enable (except members) 
                        if (DeveloperID.includes(message.author.id)) {
                            if (timestamps.has(message.author.id)) {
                                await getcommand.launch(client, message, args);
                            }
                        }
                    }
                })
            } catch (err) { 
                return; 
            }
        } Messages().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
    })
    
    // Auto delete garbage
    client.on("channelDelete", async(channel) => {
        let targetChannel = channel;
        messageFilter.findOne({ // -- Not delete but update
            serverID: `${channel.guild.id}_MessageFilter`,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
            if (!data) {
                return await console.log(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
            } else {
                if (data.filterText.includes(targetChannel)) {
                    await data.filterText.shift(targetChannel); // -- Delete channel id - Text
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Text")    
                } else {
                    return; // Don't do anything
                }
                if (data.filterLink.includes(targetChannel)) {
                    await data.filterLink.shift(targetChannel); // -- Delete channel id - Link
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Link")    
                } else {
                    return; // Don't do anything
                }
            }
        })
        whitelist.findOneAndDelete({ // -- Find and Delete
            serverID: channel.guild.id,
            ChannelID: channel.id,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
            if (!data) return; // console.log("Data not exists.") // -- Delete
            console.log("Whitelisted channels are automatically deleted from database")
        })
    })
    
    // Auto delete garbage
    client.on("roleDelete", async(role) => {
        let targetRole = role;
        messageFilter.findOne({
            serverID: `${role.guild.id}_MessageFilter`,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
            if (!data) {
                return await console.log(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
            } else {
                if (data.allowRolestoText.includes(targetRole)) {
                    await data.allowRolestoText.shift(targetRole)
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Role")
                } else {
                    return
                }
                if (data.allowRolestoLink.includes(targetRole)) {
                    await data.allowRolestoLink.shift(targetRole)
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Role")
                } else {
                    return
                }
            }
        })
    })
    
    // Handle shard error
    client.on('shardError', m =>                    { Print(`Shard Error: ${m}`) })
    client.on('shardReconnecting', m =>             { Print(`Shard ${m}: Reconnecting`) })
    client.on('shardDisconnect', m =>               { Print(`Shard ${m}: Disconnected`) })
    client.on('shardReady', m =>                    { Print(`Shard ${m}: Connected`) })
    client.on('shardResume', m =>                   { Print(`Shard ${m}: Disconected`) })
    
    // Warning and Error
    client.on('warn', w =>                          { Print('Warn', `Warning: ${w}`) })
    client.on('error', e =>                         { Print('Error', `Error: ${e}`) })
    
    // Connection Error
    client.on('disconnect', () =>                   { Print(`\x1b[32m${client.user.username}\x1b[0m : Disconected.`) });
    client.on('reconnecting', () =>                 { Print(`\x1b[32m${client.user.username}\x1b[0m  : Reconnecting.`) })
    
    // Error Messages
    process.on('uncaughtException', error =>        { Print(`Uncaught-exception: ${error}`)});
    process.on('unhandledRejection', error =>       { Print(`Unhandled-promise-rejection: ${error}`)})
    process.on('uncaughtExceptionMonitor', error => { Print(`Uncaught-exception-monitor: ${error}`)})
    
    // Login
    const { Key } = require('./settings.json')
    client.login(process.env.TOKEN || Key)
    
} index().catch(err => console.log(`Index Error :: ${err} :: Please go back to the file and find the problem!`))