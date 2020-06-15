

const messagesService = require('../../services/message');
const messageVO = require('../../services/message/VO/messageVO');



module.exports = {
    async test() {
        let msg = new messageVO(
            Date.now() + 1000,
            'Test hello world!'
        );


        return messagesService.addMessage(msg).then(() => {
            return true;
        }).catch((e) => {
            return false;
        })

    }
}
