"use strict";

const messagesService = require('../../message');
const messageVO = require('./../../message/VO/messageVO');


class ControllerIndex {

    constructor() {

    }

    async index(request, response) {
        let msg = new messageVO(
            request.query.time,
            request.query.message
        );
        await messagesService.addMessage(msg).then(() => {
            return response.type('application/json').send({"status": "received", "id": msg.id}, 200);

        }).catch((e) => {
            return response.type('text/html').send(e.toString(), 500);
        })
    }
}

module.exports = new ControllerIndex();
