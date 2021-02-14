const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const Danbooru = require('danbooru')
const login = 'alxevia'
const key = 'uPDiWM4Dj35tXJ9FXMuSpF8Z'
const booru = new Danbooru(`https://${login}:${key}@danbooru.donmai.us`) /* @sonohara */

module.exports = {
    name: `booru.post`,
    desc: `Get an image post from danbooru by post id. [Developer only]`,
    usage: `\`${Prefix}booru.post <postID>\``,
    category: `Danbooru`,
    accessibly: `Choosen`,
    aliases: ["booru.post"],
    cooldown: 5,
    details: `[booru.post](${CommandsHyoerlink} 'Get an image post from danbooru by post id. [Develper only]')`,
    permissions: ["Developer"],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.author.id === '802906117318770688' || !message.author.id === '714486020594204754') return;
            // if (!message.channel.topic.includes('Sacred danbooru images')) return; -- Dev only
            if (message.channel.nsfw == false) return await message.channel.send("Please run this command in `nsfw` channel!")
            if (!args[0]) return await message.channel.send("Please provide a post id!")
            if (isNaN(args[0])) return await message.channel.send("Please provide valid numeric input!")
            const postID = parseInt(args[0])
            const tempLogURL = []
            const post = await booru.posts(postID)
            const url = booru.url(post.file_url)
            if (url === undefined) return await message.channel.send("Sorry, I'm unable to process the image")
            const embed = new Discord.MessageEmbed()
            .setDescription(`[Danbooru - Post#${postID}](${url.origin} '${post.tag_string}')`)
            .setImage(url).setTimestamp().setColor('#fff497')
            // Evaluate the output
            if (url === 'https://danbooru.donmai.us/') return await message.channel.send("Please provide another tags!")
            if (!tempLogURL.includes(url)) {
                await tempLogURL.push(url)
                await message.channel.send(embed)
                async function clearTempLogURL(){
                    await tempLogURL.shift();
                } setTimeout(clearTempLogURL, 500)
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
