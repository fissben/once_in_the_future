"use strict";
require('dotenv').config();

const messagesService = require('../services/message');
const messageVO = require('../services/message/VO/messageVO');


class SendDummyTask {

    execute() {
        let msg = new messageVO(
            Date.now() + 500,
            'Dummy hello-world !'
        );
        console.log(msg);
        messagesService.addMessage(msg).then(() => {
            console.log('msg added to redis');
            messagesService.quit();
        }).catch((e) => {
            console.log('msg cannot be sent, please check it:\n' + e.toString());

        })
    }


}

(new SendDummyTask()).execute();
