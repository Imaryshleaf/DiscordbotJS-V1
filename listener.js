const Discord = require('discord.js');
const userLog = [];
let MessageLog = [];
const swearWords = ["nigga", "nigger", "NIGGA", "NIGGER", "N1gga", "N1GGA"];
const maxDuplicatesMute = (3);
let WarningLog = []
let MuteLog = []
class Listener {
    constructor(client) {
        this.client = client;
        // Member traffic
        const VCTopicWelcome = ['welcome']
        const VCTopicFarewell = ['farewell']
        // -- Send welcome message for new member
        this.client.on('guildMemberAdd', async (member) => {
            try {
                if (member.user.bot) return;
                const CTopic = function CTopic(topic) {
                    return member.guild.channels.cache.find(c => c.topic === topic);
                }
                const message = `<@!${member.user.id}> joined ${member.guild.name} <a:wavers:800341569227325460>`
                VCTopicWelcome.some(async(topic) => {
                    if (CTopic(topic)) {
                        const welconeMsg = new Discord.MessageEmbed()
                        .setColor('#4bf7e4').setThumbnail(member.user.avatarURL())
                        .setAuthor(`Welcome to ${member.guild.name}!`, member.guild.iconURL())
                        .setDescription(
                            `> 🔹 Read the <#777525104711434261>\n`+
                            `> 🔹 Join to <#799804033320878090>\n`+
                            `> 🔹 Enjoy your stay <a:loliRub:800349475436232704>`
                        ).setTimestamp().setImage('https://media.discordapp.net/attachments/769808348589064222/800336613082660874/Welcome_-_Anishrine.gif')
                        await CTopic(topic).send(message, welconeMsg)
                    }
                })
            } catch (error) {
                return;
            }
        })
        this.client.on('guildMemberRemove', async (member) =>{
            try {
                if (member.user.bot) return;
                const CTopic = function CTopic(topic) {
                    return member.guild.channels.cache.find(c => c.topic === topic);
                }
                const message = `${member.user.username} leave ${member.guild.name} <a:AquaCry:800348253232037899>`
                VCTopicFarewell.some(async(topic) => {
                    if (CTopic(topic)) {
                        const farewellMsg = new Discord.MessageEmbed()
                        .setColor('#fba0ff').setThumbnail(member.user.avatarURL())
                        .setAuthor(`Farewell ${member.user.username}!`, member.guild.iconURL())
                        .setDescription(
                            `> 🌹 Thank you for leaving \n> memories in ${member.guild.name} <a:cry:800275451913568256>\n`+
                            `> ❤️ Have a nice day.`
                        ).setTimestamp().setImage('https://media.discordapp.net/attachments/769808348589064222/800336628459372551/Farewell_-_Anishrine.gif')
                        await CTopic(topic).send(message, farewellMsg)
                    }
                })
            } catch (error) {
                return;
            }
        })
        // Racist words detector
        this.client.on('message', async(message)=>{
            if (message.author.bot) return;
            if (message.channel.type === 'dm') return;
            if (message.author.id != this.client.user.id){
                if (swearWords.some(word => message.content.includes(word))) {
                    if (!message.channel.permissionsFor(this.client.user.id).has(['MANAGE_MESSAGES'])) return console.log('Swear words disabled in Channel: '+message.channel.name);
                    let findAutoModChannels = await message.guild.channels.cache.find(channel => {
                        if (channel.type === 'category' && channel.name === "「👑」moderator") {
                            return true;
                        }
                    })
                    if (!findAutoModChannels) return;
                    // Track user
                    let now = Math.floor(Date.now());
                    userLog.push({
                    "time": now,
                    "author": message.author.id
                    });
                    MessageLog.push({
                    "message": message.content,
                    "author": message.author.id
                    });
                    // Check how many times the same message has been sent.
                    let msgMatch = 0;
                    for (let i = 0; i < MessageLog.length; i++) {
                    if (MessageLog[i].message == message.content && (MessageLog[i].author == message.author.id) && (message.author.id !== this.client.user.id)) {
                        msgMatch++;
                    }
                    }

                    // Delete message immediately 
                    await message.delete().catch(()=>{}).then(async function(){
                        // Mute user
                        if (msgMatch == maxDuplicatesMute && !MuteLog.includes(message.author.id)) {
                            for (var i = 0; i < MessageLog.length; i++) { // Delete user message history
                                if (MessageLog[i].author == message.author.id) {
                                    MessageLog.splice(i);
                                }
                            }
                            MuteLog.push(message.author.id); // Add user to mute list
                            await message.delete().catch(()=>{})
                            let user = message.channel.guild.members.cache.find(member => member.user.id === message.author.id)
                            let MutedRole = await message.guild.roles.cache.find(role => role.name === "Muted")
                            if (user) {
                                if (!user.roles.cache.has(MutedRole)) {
                                    user.roles.add(MutedRole).catch(()=>{}).then(message.channel.send(`<@!${message.author.id}> has been automatically muted due multiple racist words.`))
                                    const embedReport = new Discord.MessageEmbed()
                                    .setTitle("Muted User").setColor("RED").setTimestamp()
                                    .setDescription(`User automatically muted by ${client.user.username} due multiple racist words.`)
                                    .addField("Information", 
                                        `:one: | User: ${user}\n`+
                                        `:two: | ID : ${user.id}\n`+
                                        `:three: | In channel : <#${message.channel.id}>`
                                    )
                                    message.guild.channels.cache.find(reportChannel=>{
                                        if (reportChannel.name === "🔕┇muted") {
                                            try {
                                                reportChannel.send(embedReport)
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        } else {
                                            return;
                                        }
                                    })
                                }
                            }
                            // Clear logs
                            for (var i = 0; i < userLog.length; i++) {
                                userLog.splice(i);
                                WarningLog.splice(WarningLog.indexOf(userLog[i]));
                                MuteLog.splice(MuteLog.indexOf(userLog[i]));
                                if (MessageLog.length >= 200) {
                                    MessageLog.shift();
                                }
                            }
                        }
                    })
                }
            }
        })
    }
    async Now(force){
        if (!typeof force == 'boolean') return console.error('Invalid Input')
        return Boolean(force);
    }
}

module.exports = Listener;