const messagesService = require('../../services/message');
const messageVO = require('../../services/message/VO/messageVO');


module.exports = {
    async test() {

        let ts = Date.now() + 60000;
        let msg = new messageVO(
            ts,
            'Test hello world (send test)!'
        );
        let msgToCompater = JSON.stringify(msg);

        return messagesService.addMessage(msg)
            .then(async () => {
                return await messagesService.getMessages(1, ts)
                    .then((remoteMsg) => {
                        return msgToCompater === remoteMsg[0];
                    })
                    .catch(() => {
                        return false
                    })
                // return true;

            }).catch((e) => {
                return false;
            })

    }
}
