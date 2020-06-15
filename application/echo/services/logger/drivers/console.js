'use strict';
const AbstractLogger = require('./abstractLogger');

class Console extends AbstractLogger {
    log(msg) {
        console.log(msg);
    }
    error(error){
        console.error(msg);
    }
}

module.exports = Console;
