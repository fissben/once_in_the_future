'use strict';

const redisService = require("./../redis/index");
const {promisify} = require("util");

class MessagesService {

    constructor() {
        this.redisClientInstance = redisService.getClientInstance();
        this.namespace = 'MSGS';
        //todo: move to redis service
        this.zrangebyscoreAsync = promisify(this.redisClientInstance.zrangebyscore).bind(this.redisClientInstance);
        this.zaddAsync = promisify(this.redisClientInstance.zadd).bind(this.redisClientInstance);
        this.zremAsync = promisify(this.redisClientInstance.zrem).bind(this.redisClientInstance);

    }

    /**
     *  Add msg to redis
     * @param msg {messageVO}
     * @returns {Promise<void>}
     */
    async addMessage(msg) {
        return await this.zaddAsync(this.namespace, msg.ts, JSON.stringify(msg));
    }

    /**
     * Get few messages from redis server
     * @param limit {Number}
     * @returns {Promise<void>}
     */
    async getMessages(limit = 10, ts = Date.now() + 1000) {

        return await this.zrangebyscoreAsync(this.namespace, 0, ts, 'LIMIT', '0', limit)
            .then((res) => {
                return res
            })
            .catch((e) => console.error(e))
    }

    /**
     * Delete msg from redis
     * @param msg
     * @returns {Promise<T | void>}
     */
    async deleteMessage(msg) {

        return await this.zremAsync(this.namespace, msg)
            .then((res) => {
                return res
            })
            .catch((e) => console.error(e))
    }

    quit() {
        return this.redisClientInstance.quit();
    }
}


module.exports = new MessagesService();
