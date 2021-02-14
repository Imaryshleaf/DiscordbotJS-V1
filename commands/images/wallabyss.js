const Discord = require('discord.js')
const { Prefix, CommandsHyoerlink } = require('../../settings.json')
const cheerio = require('cheerio')
const request = require('request') // Deprecated

module.exports = {
    name: `wallabyss`,
    desc: `Get a random wallpaper from wallpaper-abyss. Fetching the images may take few seconds and sometimes failed.`,
    usage: `\`${Prefix}wallpaper <name>\``,
    category: `Images`,
    accessibly: `Everyone`,
    aliases: ["wallabyss", "wallpaper-abyss"],
    cooldown: 5,
    details: `[wallabyss](${CommandsHyoerlink} 'Get a random wallpaper from wallpaper-abyss')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            // User input
            const search = args.slice(0).join('+');
            if (!search) return await message.channel.send("Please provide the query!")
            // Pages
            const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
            const index = Math.floor(Math.random() * pages.length)
            const post = pages[index]
            // Search
            await getTarget(`https://wall.alphacoders.com/search.php?search=${search}&page=${post}`)
            async function getTarget(target){
                request(target, async(error, response, html) => {
                    if (!error) {
                        let $ = cheerio.load(html)
                        const list = $('div[class="boxgrid"]').find('a').toArray().map(element => $(element).attr('href'));
                        list.forEach(async urlData => {
                            return await scrapeTarget(`https://wall.alphacoders.com/${urlData}`)
                        })
                    }
                })
            }
            // Open the url for each fetched url
            const collectedUrl = [] 
            async function scrapeTarget(urlData){
                request(urlData, async(error, response, html) => {
                    if (!error) {
                        let $ = cheerio.load(html)
                        let imageSrc = $(".center.img-container-desktop a").attr("href")
                        if (!collectedUrl.includes(imageSrc)) {
                            collectedUrl.push(imageSrc)
                            if (collectedUrl.length === 20) {
                                const index = Math.floor(Math.random() * collectedUrl.length)
                                const post = collectedUrl[index]; // -- Pick one
                                const embed = new Discord.MessageEmbed()
                                .setImage(post || "Sorry, I'm unable to process the image")
                                .setAuthor("Donwload Wallpaper", message.guild.iconURL(), `${post}`)
                                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                                .setTimestamp().setColor('BLUE')
                                await message.channel.send(embed)
                            }
                        }
                    } else {
                        await message.channel.send("Sorry, something wrong while fetching data")
                    }
                })
            }
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
