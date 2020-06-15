'use strict';
const AbstractLogger = require('./abstractLogger');
const pino = require('pino')(process.env.LOG_PATH);


class File extends AbstractLogger {
    constructor() {
        super();
        this.logger = pino;
    }

    log(msg) {
        this.logger.info({msg : JSON.parse(msg)});
    }

    error(msg) {
        this.logger.error({msg : JSON.parse(msg)})
    }
}

module.exports = File;
