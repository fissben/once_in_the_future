'use strict';
const messagesService = require('../message');
const logger = require('../logger')
const process = require('process');

class Dispatcher {
    constructor() {
        this.interval = null;
        this.limitPerRequest = 10;
        this.logger = logger.createLogger(process.env.LOGGER);
    }

    registerLoop(interval = 500) {
        this.interval = setInterval(() => {
            this.loop()
        }, interval);
    }

    stopLoop(){
        clearInterval(this.interval);
    }

    async loop() {
        let doJob = true;

        while (doJob) {
            await messagesService.getMessages(this.limitPerRequest)
                .then((msgs) => {
                    if (msgs && msgs.length) {
                        msgs.forEach((msg) => {
                            this.logger.log({pid: process.pid, msg});
                            messagesService.deleteMessage(msg);
                        });
                    } else doJob = false;
                })
                .catch((e) => {
                    console.error(e);
                })
        }

    }
}


module.exports = new Dispatcher();
