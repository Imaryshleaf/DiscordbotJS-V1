const Discord = require('discord.js');
class Moderation {
    constructor(client) {
        this.client = client;
    }
    async Mute(listener, args) {
        if (!listener.guild.me.hasPermission('MANAGE_ROLES')) return listener.channel.send(`Missing Permission to \`Manage Roles\`.`)
        if (!args) return listener.channel.send(`Please provide an <ID|Nickname|Username> to mute!`)
        const userCache = (listener.guild.members.cache.find(member => member.user.tag === args) || listener.guild.members.cache.find(member => member.user.id === args) || listener.guild.members.cache.find(member => member.user.username === args) || listener.guild.members.cache.find(member => member.nickname === args))
        const guidMember = listener.guild.member(userCache);
        const ModeratorRole = await guidMember.roles.cache.find(role => {
            if (role.name === 'Moderator') {
                return listener.channel.send(`**${guidMember.user.tag}** can't be muted !!`)
            }
        })
        const MuteRole = await listener.guild.roles.cache.find(role => role.name === 'Muted');
        if (!MuteRole) return listener.channel.send(`Unable to find \`Muted\` role!`)
        if (!ModeratorRole) {
            if (guidMember.id === listener.author.id) return console.log(`Unable to mute ${listener.author.username}`);
            if (guidMember.id === this.client.user.id) return console.log(`Unable to mute ${this.client.user.username}`);
            const MuteMember = await guidMember.roles.cache.find(role => {
                if (role.name === 'Muted') {
                    return listener.channel.send(`**${guidMember.user.tag}** already muted.`);
                }
            })
            if (!MuteMember) return guidMember.roles.add(MuteRole).then(listener.channel.send(`**${guidMember.user.tag}** has been muted by **${listener.author.username}**`)).catch(e=>listener.channel.send(`Error encountered :: **${e}**`).catch(()=>{}))    
        }
    }
    async Unmute(listener, args) {
        if (!listener.guild.me.hasPermission('MANAGE_ROLES')) return listener.channel.send(`Missing Permission to \`Manage Roles\`.`)
        if (!args) return listener.channel.send(`Please provide an <ID|Nickname|Username> to mute!`)
        const userCache = (listener.guild.members.cache.find(member => member.user.tag === args) || listener.guild.members.cache.find(member => member.user.id === args) || listener.guild.members.cache.find(member => member.user.username === args) || listener.guild.members.cache.find(member => member.nickname === args))
        const guidMember = listener.guild.member(userCache);
        const MuteRole = await listener.guild.roles.cache.find(role => role.name === 'Muted');
        if (!MuteRole) return listener.channel.send(`Unable to find \`Muted\` role!`)
        if (guidMember.id === listener.author.id) return console.log(`Unable to unmute ${listener.author.username}`);
        if (guidMember.id === this.client.user.id) return console.log(`Unable to unmute ${this.client.user.username}`);
        const MuteMember = await guidMember.roles.cache.find(role => {
            if (role.name === 'Muted') {
                return guidMember.roles.remove(MuteRole).then(listener.channel.send(`**${guidMember.user.tag}** has been unmuted by **${listener.author.username}**`)).catch(e=>listener.channel.send(`Error encountered :: **${e}**`).catch(()=>{}))
            }
        })
        if (!MuteMember) return listener.channel.send(`**${guidMember.user.tag}** not muted.`);
    }
    async Prune(listener, args1, args2) {
        if (!listener.guild.me.hasPermission("MANAGE_MESSAGES")) return listener.channel.send(`Missing Permission to \`Manage Messages\``) 
        const Options = args1;
        const Amount = args2;
        if (Options === 'text') {
            if (!Amount) return listener.channel.send('Please provide a numeric input!');
            if (isNaN(Amount)) return listener.channel.send('Please provide a valid numeric input!');
            if (Amount > 100) return listener.channel.send('Uh oh, the amout you provided too high.');
            const fetchChannel = await listener.channel.messages.fetch({limit:Amount})
            fetchChannel.filter(msg => {if (typeof msg.content === 'string') return msg.content}).map(msg => msg.delete().catch(()=>{}))
        } else if (Options === 'old') {
            if (!Amount) return listener.channel.send('Please provide a numeric input!');
            if (isNaN(Amount)) return listener.channel.send('Please provide a valid numeric input!');
            if (Amount > 100) return listener.channel.send('Uh oh, the amout you provided too high.');
            const fetchChannel = await listener.channel.messages.fetch({limit:Amount})
            fetchChannel.map(msg => msg.delete().catch(()=>{}))
        } else if (Options === 'link') {
            if (!Amount) return listener.channel.send('Please provide a numeric input!');
            if (isNaN(Amount)) return listener.channel.send('Please provide a valid numeric input!');
            if (Amount > 100) return listener.channel.send('Uh oh, the amout you provided too high.');
            const fetchChannel = await listener.channel.messages.fetch({limit:Amount})
            fetchChannel.filter(msg => msg.content.includes('http') || msg.content.includes('https')).map(msg => msg.delete().catch(()=>{}))
        } else {
            if (!Options) return listener.channel.send('Please provide a numeric input!');
            if (isNaN(Options)) return listener.channel.send('Please provide a valid numeric input!');
            if (Options > 100) return listener.channel.send('Uh oh, the amout you provided too high.');
            await listener.delete().catch(()=>{})
            await listener.channel.bulkDelete(Options, true).catch(e => {}).then(messages => listener.channel.send(`🚮 | Deleted ${messages.size}/${Options} messages.`)).then(lastMsg => lastMsg.delete({timeout: 2000}))
        }
    }
    async Uptime() {
        let totalSeconds = (this.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} Days ${hours} Hours ${minutes} Mminutes ${seconds} Seconds`;
        return uptime;
    }
    async Password(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = Moderation;