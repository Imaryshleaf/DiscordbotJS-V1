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
    allowRolestoText: Array,
    allowRolestoLink: Array,
    filterText: Array,
    filterLink: Array
})

module.exports = 
{ 
    messageFilter:mongoose.model("messageFilter", messageFilter),
    blacklist:mongoose.model("blacklist", blacklist),
    whitelist:mongoose.model("whitelist", whitelist)
}