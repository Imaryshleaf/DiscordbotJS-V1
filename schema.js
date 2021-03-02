const mongoose = require("mongoose");
const blacklist = new mongoose.Schema({
    serverID: String,
    ChannelID: String
})

const whitelist = new mongoose.Schema({
    serverID: String,
    ChannelID: String
})

const messageFilter = new mongoose.Schema({
    serverID: String,
    callbackMessageFText: String,
    callbackMessageFLink: String,
    allowRolestoText: Array,
    allowRolestoLink: Array,
    filterText: Array,
    filterLink: Array,
})

const swearWords = new mongoose.Schema({
    serverID: String,
    callbackMessage: String,
    blockedWords: Array
})

module.exports = 
{ 
    messageFilter:mongoose.model("messageFilter", messageFilter),
    blacklist:mongoose.model("blacklist", blacklist),
    whitelist:mongoose.model("whitelist", whitelist),
    swearWords:mongoose.model("swearWords", swearWords)
}