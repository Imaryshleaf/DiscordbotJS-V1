const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')

class Awaiting {
    constructor(client){
        this.client = client;
    }
    /**
     * Create quick await reaction collector.
     * @param {*} message Default listener
     * @param {*} input Message Content (Text / Embed) to wait for reaction
     * @param {*} array Collection ["❤","💙"]. emoji[0] = ❤ and emoji[1] = 💙
     * @param {*} timeout Wait duration in miliseconds (1000ms = 1 second)
     * @param {*} output1 Message Content [0] (Text / Embed). Response after reaction [0] added
     * @param {*} output2 Message Content [1] (Text / Embed). Response after reaction [1] added
     * @param {*} output3 Message Content [2] (Text / Embed). Response after reaction [2] added
     * @param {*} output4 Message Content [3] (Text / Embed). Response after reaction [3] added
     * @param {*} output5 Message Content [4] (Text / Embed). Response after reaction [4] added
     */
    async reaction(message, input, array, timeout, output1, output2, output3, output4, output5) {
        let content = await message.channel.send(input)
        let listOfEmoji = array;

        const filter = (reaction, user) => {
            return (
                array.includes(reaction.emoji.name) && user.id === message.author.id
            );
        };
        
        array.forEach(async(emoji) => await content.react(emoji))

        const collector = await content.createReactionCollector(filter, {
            idle: timeout,
            errors: ["time"],
        });

        collector.on("collect", async function(reaction, user) {
            await reaction.users.remove(user.id);
                switch (reaction.emoji.name) {
                    case `${listOfEmoji[0]}`:
                        await message.channel.send(output1)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[1]}`:
                        await message.channel.send(output2)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[2]}`:
                        await message.channel.send(output3)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[3]}`:
                        await message.channel.send(output4)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[4]}`:
                        await message.channel.send(output5)
                        await collector.emit("end");
                    break;
                }
            }
        )
        collector.on("end", function(reaction, user) {
            content.delete().catch(()=>{})
            // content.reactions.removeAll().catch(()=>{})
        })
    }
    /**
     * Create quick await message collector. (FOR OPTIONS)
     * @param {*} message Default listener
     * @param {*} input Message Content (Text / Embed) to wait for reaction
     * @param {*} array Collection ["yes","no"]. option[0] = yes and option[1] = no
     * @param {*} timeout Wait duration in miliseconds (1000ms = 1 second)
     * @param {*} output1 Message Content [0] (Text / Embed). An output after response [0] given
     * @param {*} output2 Message Content [1] (Text / Embed). An output after response [1] given
     * @param {*} output3 Message Content [2] (Text / Embed). An output after response [2] given
     * @param {*} output4 Message Content [3] (Text / Embed). An output after response [3] given
     * @param {*} output5 Message Content [4] (Text / Embed). An output after response [4] given
     */
    async response(message, input, array, timeout, output1, output2, output3, output4, output5) {
        let content = await message.channel.send(input)

        let listOfOption = array;

        const filter = (m) => { 
            return (
                array.some(word => m.content.toLowerCase().startsWith(word)) && m.author.id === message.author.id
            );
        }

        const collector = await message.channel.createMessageCollector(filter, {
            //max: 1, // --- collector.emit("end");
            //time: timeout,
            idle: timeout,
            errors: ["time"],
        });

        collector.on("collect", async function(message) {
            let options = message.content.toLowerCase()
                if (options === listOfOption[0]) {
                    await message.channel.send(output1)
                    await collector.emit("end");
                } else if (options === listOfOption[1]) {
                    await message.channel.send(output2)
                    await collector.emit("end");
                } else if (options === listOfOption[2]) {
                    await message.channel.send(output3)
                    await collector.emit("end");
                } else if (options === listOfOption[3]) {
                    await message.channel.send(output4)
                    await collector.emit("end");
                } else if (options === listOfOption[4]) {
                    await message.channel.send(output5)
                    await collector.emit("end");
                }
            }
        )
        collector.on("end", function(message) {
            content.delete().catch(()=>{})
        })
    }
}
module.exports = Awaiting;