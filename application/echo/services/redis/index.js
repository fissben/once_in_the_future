'use strict';

const redis = require("redis");

class RedisService {

    constructor() {
        this.redisInstance = null;
    }

    /**
     * Create singleton of redis to avoid multiple connection creation
     * todo: add pool of connection if needed
     * @return RedisClient
     */
    getClientInstance() {

        if (this.redisInstance === null) {
            this.redisInstance = redis.createClient({
                detect_buffers: true,
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            });
        }

        return this.redisInstance;

    }
}


module.exports = new RedisService();
