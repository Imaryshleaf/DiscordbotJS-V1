const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink, DanbooruLogin, DanooruApiKey } = require('../../settings.json')
const Danbooru = require('danbooru')
const booru = new Danbooru(`https://${DanbooruLogin}:${DanooruApiKey}@danbooru.donmai.us`) /* @sonohara */

module.exports = {
    name: `booru.random`,
    desc: `Get a random image post from danbooru by tags. [Develper only]`,
    usage: `\`${Prefix}booru.random <tag1|tag2>\``,
    category: `Danbooru`,
    accessibly: `Choosen`,
    aliases: ["booru.random"],
    cooldown: 5,
    details: `[booru.random](${CommandsHyoerlink} 'Get a random image post from danbooru by tags. [Develper only]')`,
    permissions: ["Developer"],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.author.id === '802906117318770688' || !message.author.id === '714486020594204754') return;
            // if (!message.channel.topic.includes('Sacred danbooru images')) return; -- Dev only
            if (message.channel.nsfw == false) return await message.channel.send("Please run this command in `nsfw` channel!")
            if (!args[0]) return await message.channel.send("Please provide at least 1 tag!")
            const postTags = args.slice(0).join(' ');
            const tempLogURL = []
            booru.posts({ tags: 'rating:safe order:rank', tags: postTags }).then(async posts => {
                // Select a random post from posts array
                const index = Math.floor(Math.random() * posts.length)
                const post = posts[index]
                if (post === undefined) return await message.channel.send("Sorry, I'm unable to process the image")
                // Get post's url and create a filename for it
                const url = booru.url(`${post.file_url}`)
                const name = `${post.md5}.${post.file_ext}`
                /*Get log information about the post*/ // console.log(url.origin); console.log(post.tag_string);
                // Create embed
                const embed = new Discord.MessageEmbed()
                .setDescription(`[Danbooru](${url.href} '${post.tag_string}')`)
                .setImage(url).setTimestamp().setColor('#c0af68')
                // Evaluate the output
                if (url === 'https://danbooru.donmai.us/') return await message.channel.send("Please provide another tags!")
                if (!tempLogURL.includes(url)) {
                    await tempLogURL.push(url)
                    await message.channel.send(embed).catch(()=>message.channel.send("Sorry, it seems the image doesn't exist."))
                    async function clearTempLogURL(){
                        await tempLogURL.shift();
                    } setTimeout(clearTempLogURL, 500)
                }
            })
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
