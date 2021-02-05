async function index(){
    // Basic
    const Discord = require('discord.js');
    const client = new Discord.Client({disableMentions: 'everyone', ws: { intents: Discord.Intents.ALL }});
    const { redBright,greenBright,yellowBright,blueBright,magentaBright,cyanBright,whiteBright } = require('chalk')

    // Custom Module
    const Moderation = require('./simplified')
    const Mod = new Moderation(client);
    const Listener = require('./listener')
    const Listen = new Listener(client); Listen.Now(true);
    const { messageFilter } = require('./schema')

    // Online Database
    const mongoose = require("mongoose");
    async function MongoDB() {
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
    client.on('ready', ()=>{
        Print(`[DB-JS] :: Name:     : ${client.user.username}.`)
        Print(`[DB-JS] :: ID        : ${client.user.id}`)
        Print(`[DB-JS] :: Prefix    : ${Prefix}`)
        client.user.setStatus('dnd')
        const users = client.users.cache.size;
        client.user.setActivity(`${users.toString()} users with ${Prefix}`, {
            type: 'LISTENING',
        }) 
        // client.user.setActivity(`Constructing code`, {
        //     type: 'STREAMING',
        //     url: "https://www.twitch.tv/akashi"
        // })
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
            // Embeds
            const HelpEmbed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} commands`).setColor('GOLD').setTimestamp().setFooter(message.author.username, message.author.avatarURL())
            .setDescription(`\`\`\`Commands can only be used by 'Moderators' and 'Bot developer'. Current prefix '${Prefix}'\`\`\``)
            .addField("Moderator", 
                `✅ | \`${Prefix}mute <@mention|id|username>\`\n`+
                `✅ | \`${Prefix}unmute <@mention|id|username>\`\n`+
                `✅ | \`${Prefix}purge [text|old|link] <amount[1-100]>\`\n`+
                `✅ | \`${Prefix}enable filter <@role|roleid>\`\n`+
                `✅ | \`${Prefix}disable filter <@role|roleid>\`\n`+
                `✅ | \`${Prefix}data filter\`\n`
            )
            .addField("Developer", 
                `✅ | \`${Prefix}uptime\`\n`+
                `✅ | \`${Prefix}args <input>\`\n`+
                `✅ | \`${Prefix}password\`\n`
            )

            const args = message.content.slice(Prefix.length).trim().split(/ +/);
            // Developer and Moderator
            if (await hasID(message, '802906117318770688') || await hasRole(message, 'Moderator')) {
                if (await Command(message, Prefix, 'help')) {
                    await message.channel.send(HelpEmbed).catch(()=>{});
                }
                if (await Command(message, Prefix, 'mute')) {
                    await Mod.Mute(message, args[1]).catch(err => message.channel.send(err).catch(()=>{}));
                }
                if (await Command(message, Prefix, 'unmute')) {
                    await Mod.Unmute(message, args[1]).catch(err => message.channel.send(err).catch(()=>{}));
                }
                if (await Command(message, Prefix, 'prune')) {
                    await Mod.Prune(message, args[1], args[2]).catch(err => message.channel.send(err).catch(()=>{}));
                }
                if (await Command(message, Prefix, 'enable filter')) {
                    await Mod.EnableFilter(message, args[2])
                }
                if (await Command(message, Prefix, 'disable filter')) {
                    await Mod.DisableFilter(message, args[2])
                }
                if (await Command(message, Prefix, 'data filter')) {
                    await Mod.DataFilter(message)
                }
            }
            // Developer
            if (await hasID(message, '802906117318770688')) {
                if (await Command(message, Prefix, 'args')) {
                    message.channel.send(`- Args 1: '${args[1] || 'Null'}'\n- Args 2: '${args[2] || 'Null'}'\n- Args 3: '${args[3] || 'Null'}'\n- Args 4: '${args[4] || 'Null'}'\n- Args 5: '${args[5] || 'Null'}'`, { code: 'fix' })
                }
                if (await Command(message, Prefix, 'password')) {
                    await message.channel.send(`${await Mod.Password(16) || "I broke the code"}`)
                }
                if (await Command(message, Prefix, 'uptime')) {
                    await message.channel.send(`\`${await Mod.Uptime() || "I broke the time"}\``)
                }
            }
            // Everyone
            if (await Command(message, Prefix, 'brawlhalla') && await inChannel(message, '806139190164717568')) {
                await Importer('softwareBNC', 'miscellaneous', client, message).catch(()=>{})
            }

        } Messages().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
    })
    // Delete DM History
    client.on('message', async (message) => {
        if (message.author.bot) return;
        if (message.channel.type !== 'dm' && message.content.startsWith('clear')) {
            message.react('🆗').catch(()=>{})
            let fetchDMChannel = message.channel.messages.fetch({limit:10})
            fetchDMChannel.then(msgs=>msgs.filter(m => m.author.id === client.user.id).map(r => r.delete())).then(
                await message.author.deleteDM().catch(() => {})
            )
        }
        messageFilter.find({
            ChannelID: message.channel.id,
            serverID: message.guild.id,
        }, (error, data) => {
            if (error) return console.log('Unable to filter messages. Error :: '+error)
            const RoleData = data.map(data => data.IgnoreRole)
            const CheckRole = RoleData.some(roleID => message.member.roles.cache.find(role => role.id === roleID))
            const ServerData = data.map(data => data.serverID)
            const CheckServer = ServerData.some(server_ID => message.guild.id === server_ID)
            const Links = message.content.startsWith('http') || message.content.startsWith('https') || message.content.includes('http') || message.content.includes('https');
            if (!CheckServer) return;// Print(`From ${message.guild.name} in ${message.channel.name} filter not enabled`);
            if (Links && !CheckRole) {
                message.delete().then(message.reply('no links are allowed here.').then(msg=>msg.delete({timeout:5000})))
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
    client.login(process.env.TOKEN)
} index().catch(err => console.log(`Index Error :: ${err} :: Please go back to the file and find the problem!`))