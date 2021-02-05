const mongoose = require("mongoose");
const messageFilter = new mongoose.Schema({
    ChannelID: String,
    IgnoreRole: String,
    serverID: String
})

const channelFilter = new mongoose.Schema({
    ChannelID: String,
    serverID: String
})

module.exports = 
{ 
    messageFilter:mongoose.model("MessageFilter", messageFilter),
    channelFilter:mongoose.model("ChannelFilter", channelFilter)
}