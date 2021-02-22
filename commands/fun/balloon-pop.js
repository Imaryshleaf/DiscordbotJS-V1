const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const Collection = require('@discordjs/collection');
const { randomRange, verify, awaitPlayers } = require("../../resources/modules/utility");

module.exports = {
    name: `balloon-pop`,
    desc: `Ballon pop games`,
    usage: `\`${Prefix}balloon-pop <playersCount>\``,
    category: `Fun`,
    accessibly: `Everyone`,
    aliases: ["balloon-pop"],
    cooldown: 10,
    details: `[balloon-pop](${CommandsHyoerlink} 'Ballon pop games')`,
    permissions: [ ],
    status: "Disabled",
    launch: async(client, message, args) => {
        try {
            if (this.status !== "Active") return await message.channel.send("Sorry, this command is disabled by developer.")
            // Put this on index.js
            client.games = new Discord.Collection();

            let playersCount = parseInt(args[0])
            if (!playersCount) return await message.channel.send("Please tell how many player asked to play!")
            if (isNaN(playersCount)) return await message.channel.send("Please provide valid numeric number!")
            const current = client.games.get(message.channel.id);
            if (current) return message.channel.send(`Please wait until the current game of \`${current.name}\` is finished.`);
            client.games.set(message.channel.id, { name: this.name });
            try {
                const awaitedPlayers = await awaitPlayers(message, playersCount, 2);
                if (!awaitedPlayers) {
                    client.games.delete(message.channel.id);
                    return message.channel.send('Game could not be started...');
                }
                const players = new Collection();
                for (const player of awaitedPlayers) {
                    players.set(player, {
                        pumps: 0,
                        id: player,
                        user: await client.users.fetch(player)
                    });
                }
                let loser = null;
                let remains = players.size * 250;
                let turns = 0;
                const rotation = players.map(player => player.id);
                while (!loser) {
                    const user = players.get(rotation[0]);
                    let pump;
                    ++turns;
                    if (turns === 1) {
                        await message.channel.send(`${user.user} pumps the balloon!`);
                        pump = true;
                    } else {
                        await message.channel.send(`${user.user}, do you pump the balloon again?`);
                        pump = await verify(message.channel, user.user);
                    }
                    if (pump) {
                        remains -= randomRange(10, 100);
                        const popped = Math.floor(Math.random() * remains);
                        if (popped <= 0) {
                            await message.channel.send('The balloon pops!');
                            loser = user;
                            break;
                        }
                        if (turns >= 5) {
                            await message.channel.send(`${user.user} steps back!`);
                            turns = 0;
                            rotation.shift();
                            rotation.push(user.id);
                        }
                    } else {
                        await message.channel.send(`${user.user} steps back!`);
                        turns = 0;
                        rotation.shift();
                        rotation.push(user.id);
                    }
                }
                client.games.delete(message.channel.id);
                return message.channel.send(`And the loser is... ${loser.user}! Great job everyone else!`);
            } catch (err) {
                client.games.delete(message.channel.id);
                throw err;
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
