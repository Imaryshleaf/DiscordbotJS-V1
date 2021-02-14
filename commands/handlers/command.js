const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const chalk = require('chalk')
let table = new ascii();
    table.setHeading(chalk.whiteBright("Data"), chalk.whiteBright("Status"));
    table.removeBorder()
    table.setTitle(chalk.yellowBright("Commands"))

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(chalk.cyanBright(file), chalk.greenBright('Available'));
            } else {
                table.addRow(chalk.cyanBright(file), chalk.redBright('Unavailable'));
                continue; 
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}