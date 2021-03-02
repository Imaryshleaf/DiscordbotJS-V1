module.exports = class AI {
    constructor(client) {
        this.client = client;
        this.onEventCreate = true;
        this.onEventDelete = true;
    }
    async try(){
        let self = {}
        console.log("Event")
        function messageCreated(messageID) {
            console.log("Message Created")
            return self;
        }
        function messageDeleted(messageID) {
            console.log("Message Deleted")
            return self;
        }
        self.messageCreated = messageCreated;
        self.messageDeleted = messageDeleted;
        return self;
    }
}